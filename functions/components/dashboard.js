const router = require('express').Router(),
      Firestore = require('@google-cloud/firestore'),
      db = require('../firebase-init');

var firestore = new Firestore({
  projectId: 'ratingsystem-d54ce',
  keyFilename: './permissions.js'
});

router.get('/rated', (req, res) => {
  (async () => {
    try {
      let response = []

      await db.listCollections().then(collections => {
        for (let collection of collections) {
          response.push(collection.id)
        }
        res.set('Cache-Control', 'public, max-age=31557600')
        return res.status(200).send(response)

      })

    } catch (error) {
      console.log(error)
      return res.status(500).send(error)
    }
  })()
})

module.exports = router
