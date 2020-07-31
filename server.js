const express = require('express');
const path = require('path');
const compression = require('compression');
const app = express();

app.use(require('prerender-node').set('prerenderServiceUrl', 'https://service.prerender.io/').set('prerenderToken', 'ZEMgevYifWek4VEY5VEU'));

// gzip compression
app.use(compression());

// Serve static files....
app.use(express.static(__dirname + '/dist/-Shopfront'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/-Shopfront/index.html'));
});

// default Heroku PORT
app.listen(process.env.PORT || 3000);
