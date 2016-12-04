let express = require('express');
let bodyParser = require('body-parser');
let socketIO = require('socket.io');
let app = express();
let server = require('http').createServer(app);
let socket = socketIO(server);

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
server.listen(3000);

app.post('/api/SignInAsUser', function(req, res) {
  console.log('SignInAsUser > ', req.body);

  res.send(req.body.userName);
});