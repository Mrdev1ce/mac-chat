angular
  .module('macChat')
  .controller('loginCtrl', function($state, userService, states) {
    let vm = this;

    vm.signIn = signIn;

    function signIn() {
      userService.signInAsUser(vm.userName)
        .then(() => $state.go(states.chat.data.name));
    }
  })