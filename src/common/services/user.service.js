angular
  .module('macChat')
  .service('userService', function($http, BE_API) {
    var userId = sessionStorage.getItem('userId');

    this.signInAsUser = signInAsUser;
    this.getUserId = getUserId;
    this.setUserId = setUserId;

    function signInAsUser(userName) {
      return $http.post(BE_API + '/api/SignInAsUser', {userName})
        .then(res => {
          console.log(res.data);
          userId = res.data;
          return userId;
        });
    }

    function setUserId(userId) {
      sessionStorage.setItem('userId', userId);
    }

    function getUserId() {
      return userId;
    }
  });