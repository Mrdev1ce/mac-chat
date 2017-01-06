let userConversationMap = {};
let conversations = {};

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

module.exports = {
  getConversation
}