const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();

const serviceAccount = require("./sociallappp-firebase-adminsdk-ojwss-91c63dcd88.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sociallappp.firebaseio.com"
});

const firebaseConfig = {
  apiKey: "AIzaSyCZfymvaBx0tjNZv83VsPYMNzcZMF6owEg",
  authDomain: "sociallappp.firebaseapp.com",
  databaseURL: "https://sociallappp.firebaseio.com",
  projectId: "sociallappp",
  storageBucket: "sociallappp.appspot.com",
  messagingSenderId: "323111202808",
  appId: "1:323111202808:web:d9df120698010a721fb00d",
  measurementId: "G-LNJ1DGK5G3"
};

const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


app.get('/screams', (req, res) => {
  db
    .collection('screams')
    .orderBy('createAt', 'desc')
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createAt
        });
      });
      return res.json(screams);
    })
    .catch((err) => console.error(err));
})

app.post('/scream', (req, res) => {
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString()
  };

  db
    .collection('screams')
    .add(newScream)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong' });
      console.error(err);
    })
});

// SignUp route
app.post('/signup', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  };

  // TODO validate data
  let token, userId;
  db.doc(`/users/${newUser.handle}`).get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({ handle: `this handle is already taken` });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(IdToken => {
      token = IdToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createAt: new Date().toISOString(),
        userId
      };
      db.doc(`/users/${newUser.handle}`).set(userCredentials);
      // return res.status(201).json({token});
    })
    .then(() => {
      return res.status(201).json({ token });
    })

    // firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
    // .then(data => {
    //   return res.status(201).json({message: `user ${data.user.uid} signed up successfully`});
    // }) 
    .catch((err) => {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        return res.status(400).json({ email: 'Email is already is use' });
      } else {
        return res.status(500).json({ error: err.code });
      }
    })
})

exports.api = functions.region('asia-east2').https.onRequest(app);


