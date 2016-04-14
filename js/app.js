'use strict'

angular
  .module ('app', [
    'ui.card'
  ])
  .controller ('AppController', AppController);

function AppController ($scope) {

  $scope.card = {};
  $scope.$watch ('card', function () {
      console.log ($scope.card);
  }, true);

  $scope.submit = function () {
    alert ('Submitted the form!');
  };
}
