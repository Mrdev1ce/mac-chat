let express = require('express');
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.post('/api/SignInAsUser', function(req, res) {
  console.log('SignInAsUser > ', req.body);

  res.send(req.body.userName);
});

app.listen(3000);