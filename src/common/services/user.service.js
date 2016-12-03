angular
  .module('macChat')
  .service('userService', function($http, BE_API) {
    var userId;

    this.signInAsUser = signInAsUser;
    this.getUserId = getUserId;

    function signInAsUser(userName) {
      return $http.post(BE_API + '/SignInAsUser', {userName})
        .then(res => {
          console.log(res.data);
          return res.data;
        });
    }

    function getUserId() {
      return userId;
    }
  });