const express = require('express'),
      cors = require('cors'),
      functions = require('firebase-functions'),
      app = express();

app.use(cors({ origin: true }));

app.use(require('./components/client'))
app.use(require('./components/dashboard'))

exports.app = functions.https.onRequest(app)