const functions = require('firebase-functions');
const app = require('express')();
const fbAuth = require('./until/fbAuth');
const { db } = require('./until/admin');
const { getAllScreams, postOneScream, getScream, commentOnScream, likeScream, unlikeScream, deleteScream } = require('./handles/screams');
const { signUp, login, uploadImage, addUserDetails, getAuthenticatedUser, getUserDetails, markNotificationsRead } = require('./handles/users');

// Scream routers
app.get('/screams', getAllScreams);
app.post('/scream', fbAuth, postOneScream);
app.get('/scream/:screamId', getScream);
app.delete('/scream/:screamId', fbAuth, deleteScream);
app.get('/scream/:screamId/like', fbAuth, likeScream)
app.get('/scream/:screamId/unlike', fbAuth, unlikeScream)
app.post('/scream/:screamId/comment', fbAuth, commentOnScream)

// User route
app.post('/signup', signUp);
app.post('/login', login);
app.post('/user/image', fbAuth, uploadImage);
app.post('/user', fbAuth, addUserDetails);
app.get('/user', fbAuth, getAuthenticatedUser);
app.get('/user/:handle', getUserDetails);
app.post('/notifications', fbAuth, markNotificationsRead);

exports.api = functions.region('asia-east2').https.onRequest(app);

exports.createNotificationOnLike = functions.region('asia-east2').firestore.document('likes/{id}')
  .onCreate((snapshot) => {
    db.doc(`/screams/${snapshot.data().screamId}`).get()
      .then(doc => {
        if (doc.exists) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: 'like',
            read: false,
            screamId: doc.id
          })
        }
      })
      .then(() => {
        return;
      })
      .catch(err => {
        console.error(err);
        return;
      })
  })

exports.deleteNotificationOnUnLike = functions.region('asia-east2').firestore.document('likes/{id}')
  .onDelete((snapshot) => {
    db.doc(`/notifications/${snapshot.id}`)
      .delete()
      .then(() => {
        return;
      })
      .catch((err) => {
        console.error(err);
        return;
      })
  })

exports.createNotificationOnComment = functions.region('asia-east2').firestore.document('comments/{id}')
  .onCreate((snapshot) => {
    db.doc(`/screams/${snapshot.data().screamId}`).get()
      .then(doc => {
        if (doc.exists) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: 'comment',
            read: false,
            screamId: doc.id
          })
        }
      })
      .then(() => {
        return;
      })
      .catch(err => {
        console.error(err);
        return;
      })
  })
