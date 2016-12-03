angular
  .module('macChat')
  .constant('BE_API', 'http://localhost:3000/api')
  .provider('states', function() {
    var states = {};

    states.login = {
      url: '/login',
      controller: 'loginCtrl as vm',
      templateUrl: 'src/login/login.template.html',
      data: {
        name: 'login'
      }
    };

    states.chat = {
      url: '/chat',
      controller: 'chatCtrl as vm',
      templateUrl: 'src/chat/chat.template.html',
      data: {
        name: 'chat'
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
    //states.forEach(state => $stateProvider.state(state.data.name, state));
  });