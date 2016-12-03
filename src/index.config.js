angular
  .module('macChat')
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('login', {
        url: '/login',
        controller: 'loginCtrl as loginCtrl',
        templateUrl: 'src/login/login.template.html'
      });
  });