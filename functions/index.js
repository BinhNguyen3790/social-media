const functions = require('firebase-functions');
const admin = require('firebase-admin');

// const serviceAccount = require("./sociallappp-firebase-adminsdk-ojwss-91c63dcd88.json");

admin.initializeApp({
  // credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://sociallappp.firebaseio.com"
});

const express = require('express');
const app = express();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


app.get('/screams', (req, res) => {
  admin
    .firestore()
    .collection('screams')
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
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
    createdAt: admin.firestore.Timestamp.fromDate(new Date())
  };

  admin
    .firestore()
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

exports.api = functions.https.onRequest(app);