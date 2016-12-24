angular
  .module('macChat')
  .controller('chatCtrl', function(Message) {
    var vm = this;

    vm.messages = [];

    vm.onSubmitMessage = onSubmitMessage;

    function onSubmitMessage() {
      if (!vm.currentMessageText) return;

      vm.messages.push(new Message(vm.currentMessageText, new Date(), true));
      vm.currentMessageText = '';
    }
  });