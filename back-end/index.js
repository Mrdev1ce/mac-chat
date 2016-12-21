let fs = require('fs');
let http = require('http');
let https = require('https');
let express = require('express');
let bodyParser = require('body-parser');
let socketIO = require('socket.io');
let app = express();

let privateKey = fs.readFileSync('../../server.key', 'utf8');
let certificate = fs.readFileSync('../../server.pem', 'utf8');
let credentials = {key: privateKey, cert: certificate, passphrase: 'device', rejectUnauthorized: false, requestCert: true};

let httpServer = http.createServer(app);
let httpsServer = https.createServer(credentials, app);

let socket = socketIO(httpsServer);

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
httpServer.listen(3000);
httpsServer.listen(3443);

app.post('/api/SignInAsUser', function(req, res) {
  console.log('SignInAsUser > ', req.body);

  res.send(req.body.userName);
});