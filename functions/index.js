const functions = require('firebase-functions');
const app = require('express')();
const fbAuth = require('./until/fbAuth');
const { getAllScreams, postOneScream } = require('./handles/screams');
const { signUp, login, uploadImage, addUserDetails, getAuthenticatedUser } = require('./handles/users');

// Scream routers
app.get('/screams', getAllScreams);
app.post('/scream', fbAuth, postOneScream);

// User route
app.post('/signup', signUp);
app.post('/login', login);
app.post('/user/image', fbAuth, uploadImage);
app.post('/user', fbAuth, addUserDetails);
app.get('/user', fbAuth, getAuthenticatedUser);

exports.api = functions.region('asia-east2').https.onRequest(app);
