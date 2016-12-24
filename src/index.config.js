angular
  .module('macChat')
  .constant('BE_API', 'https://localhost:3443')
  .provider('states', function() {
    var states = {};

    states.login = {
      url: '/login',
      controller: 'loginCtrl as vm',
      templateUrl: 'src/pages/login/login.template.html',
      data: {
        name: 'login'
      }
    };

    states.shell = {
      url: '',
      controller: 'shellCtrl as vm',
      template: '<ui-view />',
      data: {
        name: 'shell'
      }
    };

    states.chat = {
      url: '/chat',
      controller: 'chatCtrl as vm',
      templateUrl: 'src/pages/chat/chat.template.html',
      data: {
        name: `${states.shell.data.name}.chat`
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
    // $rootScope.$on('$stateChangeStart', (event, toState) => {
    //   if (toState.name === states.login.data.name && userService.getUserId()) {
    //     event.preventDefault();
    //     $state.go(states.chat.data.name);
    //   } else if (toState.name !== states.login.data.name && !userService.getUserId()) {
    //     event.preventDefault();
    //     $state.go(states.login.data.name);
    //   }
    // });
  });