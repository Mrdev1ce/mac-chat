angular
  .module('macChat')
  .factory('socketService', function ($state, $q, states, socketFactory, BE_API, userService, SOCKET_EVENTS) {
    var ioSocket = io.connect(BE_API);

    appSocket = socketFactory({
      ioSocket: ioSocket
    });

    appSocket.on(SOCKET_EVENTS.DISCONNECT, function() {
      $state.go(states.login.data.name);
    });

    return {
      socket: appSocket,
      initConnection
    };

    function initConnection() {
      let defer = $q.defer();

      appSocket.on(SOCKET_EVENTS.CONNECT, function() {
        console.log('yo connected');
        appSocket.emit(SOCKET_EVENTS.AUTH, userService.getUserId(), function() {
          defer.resolve();
        });
      });

      return defer.promise;
    }
  });