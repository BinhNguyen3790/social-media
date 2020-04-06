const admin = require(`firebase-admin`);

const serviceAccount = require("../sociallappp-firebase-adminsdk-ojwss-91c63dcd88.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sociallappp.firebaseio.com"
});

const db = admin.firestore();

module.exports = {admin, db};