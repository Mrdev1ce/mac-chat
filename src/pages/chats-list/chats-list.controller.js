angular
  .module('macChat')
  .controller('chatsListPageCtrl', function($state, states) {
    var vm = this;

    vm.onActiveIdChanged = onActiveIdChanged;

    vm.chats = [{
      userId: 1,
      userName: 'Person One'
    }, {
      userId: 2,
      userName: 'Person Two'
    }];
    vm.activeChatId = null;

    function onActiveIdChanged(chatId) {
      $state.go(states.chat.data.name, {userId: chatId});
    }
  });