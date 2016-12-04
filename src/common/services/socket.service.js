angular
  .module('macChat')
  .service('socketService', function (socketFactory, BE_API) {
    var ioSocket = io.connect(BE_API);

    appSocket = socketFactory({
      ioSocket: ioSocket
    });

    appSocket.on('connect', function() {
      console.log('yo connected');
    })

    return appSocket;
  });