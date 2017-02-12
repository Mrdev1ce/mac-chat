angular
  .module('macChat')
  .controller('chatPageCtrl', function($scope, $stateParams, Message, socketService, SOCKET_EVENTS, userService) {
    var vm = this;

    vm.messages = [];

    vm.onSubmitMessage = onSubmitMessage;

    $scope.$on('$destroy', unsubscribeSocketListners);

    init();

    function init() {
      socketService.socket.emit(SOCKET_EVENTS.INIT_CONVERSATION, $stateParams.partnerName);
      socketService.socket.on(SOCKET_EVENTS.UPDATE_MESSAGES, onUpdateMessages);
    }

    function unsubscribeSocketListners() {
      socketService.socket.removeListener(SOCKET_EVENTS.UPDATE_MESSAGES, onUpdateMessages);
    }

    function onUpdateMessages(messages) {
      let currentUserName = userService.getUserId();
        vm.messages = messages;
        vm.messages.forEach(message => {
          message.isMyMessage = currentUserName === message.authorName;
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