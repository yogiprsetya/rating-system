const router = require('express').Router(),
      db = require('../firebase-init');

router.post('/rate', (req, res) => {
  (async () => {
    try {
      await db.collection(req.body.slug).doc()
        .create({
          rates: req.body.rate
        })
      return res.status(200).send()
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })()
});

router.get('/rating/:slug', (req, res) => {
  (async () => {
    try {
      let response = []

      await db.collection(req.params.slug).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          response.push(doc.data().rates)
        })
        return res.status(200).send(response)
      })
    } catch (error) {
      return res.status(500).send(error)
    }
  })()
})

module.exports = router;
