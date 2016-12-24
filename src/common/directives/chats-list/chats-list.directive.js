angular
  .module('macChat')
  .directive('chatsList', function() {
    return {
      restrict: 'E',
      templateUrl: 'src/common/directives/chats-list/chats-list.template.html',
      scope: {},
      bindToController: {
        chats: '=',
        activeChatId: '=',
        onActiveIdChanged: '&?'
      },
      controllerAs: 'vm',
      controller: function() {},
      link: function(scope, element, attrs, ctrl) {
        ctrl.selectChat = selectChat;

        function selectChat(chatId) {
          if (ctrl.activeChatId !== chatId) {
            ctrl.activeChatId = chatId;
            ctrl.onActiveIdChanged({chatId});
          }
        }
      }
    };
  });