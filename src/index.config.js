angular
  .module('macChat')
  .constant('BE_API', 'https://localhost:3443')
  .constant('SOCKET_EVENTS', {
    AUTH: 'auth',
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    JOINED_CHAT: 'joined_chat',
    UPDATE_CHATS: 'update_chats',
    INIT_CONVERSATION: 'init_conversation',
    UPDATE_MESSAGES: 'update_messages',
    MESSAGE_SEND: 'message_send',
    MESSAGE_RECIEVED: 'message_recieved'
  })
  .provider('states', function() {
    var states = {};

    states.login = {
      url: '/login',
      controller: 'loginPageCtrl as vm',
      templateUrl: 'src/pages/login/login.template.html',
      data: {
        name: 'login'
      }
    };

    states.shell = {
      url: '',
      controller: 'shellCtrl as vm',
      template: '<ui-view />',
      resolve: {
        socketConnection: function(socketService) {
          return socketService.initConnection();
        }
      },
      data: {
        name: 'shell'
      }
    };

    states.chatsList = {
      url: '/chats-list',
      controller: 'chatsListPageCtrl as vm',
      templateUrl: 'src/pages/chats-list/chats-list.template.html',
      data: {
        name: `${states.shell.data.name}.chatsList`
      }
    }

    states.chat = {
      url: '/chat/{partnerName:[a-zA-Z0-9]+}',
      controller: 'chatPageCtrl as vm',
      templateUrl: 'src/pages/chat/chat.template.html',
      data: {
        name: `${states.chatsList.data.name}.chat`
      }
    };

    return {
      states: states,
      $get: function() {
        return states;
      }
    }
  })
  .config(function($stateProvider, $urlRouterProvider, statesProvider) {
    let states = statesProvider.states;

    $urlRouterProvider.otherwise('/login');

    for (key in states) {
      if (states.hasOwnProperty(key)) {
        let state = states[key];
        $stateProvider.state(state.data.name, state);
      }
    }
  })
  .run(function($rootScope, $state, states, userService) {
    $rootScope.$on('$stateChangeStart', (event, toState) => {
      if (toState.name === states.login.data.name && userService.getUserId()) {
        event.preventDefault();
        $state.go(states.chatsList.data.name);
      } else if (toState.name !== states.login.data.name && !userService.getUserId()) {
        event.preventDefault();
        $state.go(states.login.data.name);
      }
    });
  });