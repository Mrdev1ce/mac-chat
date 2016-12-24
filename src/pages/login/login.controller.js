angular
  .module('macChat')
  .controller('loginPageCtrl', function($state, userService, states) {
    let vm = this;

    vm.signIn = signIn;

    function signIn() {
      userService.signInAsUser(vm.userName)
        .then(() => $state.go(states.chatsList.data.name));
    }
  })