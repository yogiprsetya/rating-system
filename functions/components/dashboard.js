const router = require('express').Router(),
      Firestore = require('@google-cloud/firestore'),
      db = require('../firebase-init');

var firestore = new Firestore({
  projectId: 'ratingsystem-d54ce',
  keyFilename: './permissions.js'
});

router.get('/rateds', (req, res) => {
  (async () => {
    try {
      let response = []

      await db.listCollections().then(collections => {
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

router.get('/rated', (req, res) => {
  (async () => {
    try {
      let DbCollection = [], response = ['adi-sayang', 'bali']

      // db.listCollections().then(collections => {
        // for (let collection of collections) {
          // for (var i = 0; i > response.length; i++) {
          //   db.collection(response[i]).get().then(querySnapshot => {
          //     querySnapshot.forEach(doc => {
          //       console.log(doc.data().rates)
          //     })
          //   })
          // }
      //   }
      // })

      for (var i = 0; i < response.length; i++) {
        await db.collection(response[i]).get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              DbCollection[i] = {
                id: response[i],
                data: doc.id
              }
            });
            
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
      }
      return res.status(200).send(DbCollection)
    } catch (error) {
      console.log(error)
      return res.status(500).send(error)
    }
  })()
})

module.exports = router