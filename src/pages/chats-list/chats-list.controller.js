angular
  .module('macChat')
  .controller('chatsListPageCtrl', function($state, $stateParams, states, socketService, SOCKET_EVENTS) {
    var vm = this;

    vm.onActiveIdChanged = onActiveIdChanged;
    vm.chats = [];
    vm.activeChatId = $stateParams.partnerName;

    init();

    function init() {
      socketService.socket.emit(SOCKET_EVENTS.JOINED_CHAT);
      updateChats();
    }

    function onActiveIdChanged(chatId) {
      $state.go(states.chat.data.name, {partnerName: chatId});
    }

    function updateChats() {
      socketService.socket.on(SOCKET_EVENTS.UPDATE_CHATS, function(chats){
        vm.chats = chats;
      });
    }
  });