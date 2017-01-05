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

let User = require('./user.model');
const CONSTANTS = require('./constants');
const SOCKET_EVENTS = CONSTANTS.SOCKET_EVENTS;
let users = [];
let userConversationMap = {};
let conversations = {};

app.post('/api/SignInAsUser', function(req, res) {
  console.log('SignInAsUser > ', req.body);

  users.push(new User(null, req.body.userName));
  res.send(req.body.userName);
});

socket.on(SOCKET_EVENTS.CONNECT, function(socketInstance) {
  console.log(socketInstance.id);
  
  socketInstance.on(SOCKET_EVENTS.AUTH, onAuth.bind(null, socketInstance));
  socketInstance.on(SOCKET_EVENTS.DISCONNECT, onDisconnect.bind(null, socketInstance));
  socketInstance.on(SOCKET_EVENTS.JOINED_CHAT, onJoinedChat);
  socketInstance.on(SOCKET_EVENTS.INIT_CONVERSATION, onInitConversation.bind(null, socketInstance));
  socketInstance.on(SOCKET_EVENTS.MESSAGE_SEND, onMessageSend.bind(null, socketInstance));
});

function onAuth(socketInstance, name, clientCallback) {
  let existingUser = users.findIndex(user => user.name === name);
  if (existingUser > -1) {
    existingUser.socketId = socketInstance.id;
    console.log('AUTH: Existing username: ', name, ' ', socketInstance.id);
  } else {
    users.push(new User(socketInstance.id, name));
    console.log('AUTH: New username: ', name, ' ', socketInstance.id);
  }
  clientCallback();
}

function onDisconnect(socketInstance) {
  let userToDeleteIndex = users.findIndex(user => user.socketId === socketInstance.id);
  if (userToDeleteIndex > -1) {
    users.splice(userToDeleteIndex, 1);
  }
  socketInstance.removeAllListeners();
  console.log('DISCONNECT: Index user to delete: ', userToDeleteIndex);
}

function onJoinedChat() {
  let connectedSockets = socket.sockets.connected;
  for (socketId in connectedSockets) {
    if (connectedSockets.hasOwnProperty(socketId)) {
      let connectedInstance = connectedSockets[socketId];
      let chats = users.filter(user => user.socketId !== socketId);
      connectedInstance.emit(SOCKET_EVENTS.UPDATE_CHATS, chats);
    }
  }
}

function onInitConversation(socketInstance, partnerName) {
  let currentUser = users.find(user => user.socketId === socketInstance.id);
  let userMessages = getConversation(currentUser.name, partnerName);
  socketInstance.emit(SOCKET_EVENTS.UPDATE_MESSAGES, userMessages);
}

function getConversation(firstUserName, secondUserName) {
  let compositeKey = firstUserName + secondUserName;
  let conversationKey = getConversationKey(compositeKey);
  if (!conversationKey) {
    conversationKey = initConversationKey(firstUserName, secondUserName);
    conversations[conversationKey] = [];
  }
  return conversations[conversationKey];
}

function getConversationKey(compositeKey) {
  return userConversationMap[compositeKey];
}

function initConversationKey(firstUserName, secondUserName) {
  let conversationKey = new Date().valueOf();
  userConversationMap[firstUserName + secondUserName] = conversationKey;
  userConversationMap[secondUserName + firstUserName] = conversationKey;
  return conversationKey;
}

function onMessageSend(socketInstance, data) {
  let currentUser = users.find(user => user.socketId === socketInstance.id);
  let messages = getConversation(currentUser.name, data.partnerName);
  let partner = users.find(user => user.name === data.partnerName);
  let partnerSocketInstance = socket.sockets.connected[partner.socketId];
  messages.push({
    authorName: currentUser.name,
    text: data.messageText,
    time: new Date()
  });
  socketInstance.emit(SOCKET_EVENTS.UPDATE_MESSAGES, messages);
  partnerSocketInstance.emit(SOCKET_EVENTS.UPDATE_MESSAGES, messages);
}