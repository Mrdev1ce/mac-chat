angular
  .module('macChat')
  .controller('chatPageCtrl', function($stateParams, Message, socketService, SOCKET_EVENTS, userService) {
    var vm = this;

    vm.messages = [];

    vm.onSubmitMessage = onSubmitMessage;

    init();

    function init() {
      socketService.socket.emit(SOCKET_EVENTS.INIT_CONVERSATION, $stateParams.partnerName);
      onUpdateMessages();
    }

    function onUpdateMessages() {
      socketService.socket.on(SOCKET_EVENTS.UPDATE_MESSAGES, function(messages) {
        let currentUserName = userService.getUserId();
        vm.messages = messages;
        vm.messages.forEach(message => {
          message.isMyMessage = currentUserName === message.authorName;
        });
      });
    }

    function onSubmitMessage() {
      if (!vm.currentMessageText) return;

      //vm.messages.push(new Message(vm.currentMessageText, new Date(), true));
      socketService.socket.emit(SOCKET_EVENTS.MESSAGE_SEND, {
        partnerName: $stateParams.partnerName,
        messageText: vm.currentMessageText
      });
      vm.currentMessageText = '';
    }
  });