const admin = require('firebase-admin')

admin.initializeApp({
  credential: admin.credential.cert(require("./permissions.js")),
  databaseURL: "https://ratingsystem-d54ce.firebaseio.com"
})

const db = admin.firestore()

module.exports = db
