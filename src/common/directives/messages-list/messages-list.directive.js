angular
  .module('macChat')
  .directive('messagesList', function() {
    return {
      restrict: 'E',
      templateUrl: 'src/common/directives/messages-list/messages-list.template.html',
      scope: {},
      bindToController: {
        messages: '='
      },
      controllerAs: 'vm',
      controller: function() {},
      link: function(scope, element, attrs, ctrl) {
        scope.$watchCollection('vm.messages', onMessagesChanged);

        function onMessagesChanged() {
          let domElement = element[0];
          domElement.scrollTop = domElement.scrollHeight;
        }
      }
    };
  });