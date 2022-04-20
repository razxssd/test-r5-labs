const express = require('express');
var https = require('follow-redirects').https;
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.get('/', (req, res) => {
  res.send('The server is working, hello there, Eduard says hi to you!');
});

app.post('/get-locations', (req, res) => {
console.log(req.body)
  var options = {
    'method': 'POST',
    'hostname': 'dev-api.confidence.org',
    'path': '/v2/confidence/locations',
    'headers': {
      'Username': 'amitphatak$r5labs.com',
      'Content-Type': 'application/json'
    },
    'maxRedirects': 20
  };

  var _req = https.request(options, function (_res) {
    var chunks = [];

    _res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    _res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      console.log(body.toString());

      // res.sendStatus(200);
      res.end(body);
    });

    _res.on("error", function (error) {
      console.error(error);
    });
  });

  var postData = JSON.stringify(req.body);

  _req.write(postData);

  _req.end();
})

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))
