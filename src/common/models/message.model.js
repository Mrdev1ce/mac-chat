angular
  .module('macChat')
  .factory('Message', function() {
    class Message {
      constructor(text, time, isMyMessage) {
        this.text = text;
        this.time = time;
        this.isMyMessage = isMyMessage;
      }
    }

    return Message;
  })