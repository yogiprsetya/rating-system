const router = require('express').Router();
const Firestore = require('@google-cloud/firestore');

var firestore = new Firestore({
  projectId: 'ratingsystem-d54ce',
  keyFilename: './permissions.js'
});

router.get('/rated', (res) => {
   (async () => {
    try {
      let response = [];

      await firestore.listCollections().then(collections => {
        for (let collection of collections) {
          response.push(collection.id)
        }

        return res.status(200).send(response)
      })

    } catch (error) {
      console.log(error)
      return res.status(500).send(error)
    }

  })()
})

module.exports = router;
