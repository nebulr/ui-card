'use strict';

angular
  .module ('ui.card', [])
  .controller( 'CardController', CardController )
  .directive ( 'card', CardDirective )
  .directive ( 'cardNumber', CardNumberDirective )
  .directive ( 'cardName', CardNameDirective )
  .directive ( 'cardExpiry', CardExpiryDirective )
  .directive ( 'cardCvc', CardCvcDirective );

/* @ngInject */
function CardController ($scope) {}

/* @ngInject */
function CardDirective (Card) {
  return {
    restrict : 'E',
    template : '<form>' +
    '<div class="card-wrapper"></div>' +
    '<fieldset ng-transclude class="form-wrapper" ng-disabled="disable"></fielset>' +
    '</form>',
    replace : true,
    scope : {
      disable : "=",
      options : "="
    },
    transclude : true,
    controller : 'CardController',
    controllerAs : 'self',
    link : function ($scope, $element, $attributes) {

      $scope.uuid = generateUUID();

      angular.element($element.children()[0]).addClass($scope.uuid);

      var options = {
          // a selector or DOM element for the form where users will
          // be entering their information
          form: 'form', // *required*
          // a selector or DOM element for the container
          // where you want the card to appear
          container: '.' + $scope.uuid, // *required*

          // Default placeholders for rendered fields - optional
          placeholders: {
              number: '•••• •••• •••• ••••',
              name: 'Full Name',
              expiry: '••/••',
              cvc: '•••'
          },

          // if true, will log helpful messages for setting up Card
          debug: false // optional - default false
      };
      angular.extend (options, $scope.options);

      var card = new Card(options);

    }
  };
}

/* @ngInject */
function CardNumberDirective ( $compile ) {
  return {
    restrict: 'A',
    scope: {
      ngModel: '='
    },
    require: [
      '^card',
      'ngModel'
    ],
    link: function (scope, element, attributes, ctrls) {
      var cardCtrl = ctrls[0];
      cardCtrl.numberInput = element;
      scope.$watch('ngModel', function (newVal, oldVal) {
        if (!oldVal && !newVal) {
          return;
        }
        if (oldVal === newVal && !newVal) {
          return;
        }

        var evt = document.createEvent('HTMLEvents');
        evt.initEvent('keyup', false, true);
        element[0].dispatchEvent(evt);
      });
    },
    priority:1005, // compiles first
    compile: function (el) {
      el.removeAttr('card-number'); // necessary to avoid infinite compile loop
      el.attr('name', 'number');
      var fn = $compile(el);
      return function(scope){
        fn(scope);
      };
    }
  };
}

/* @ngInject */
function CardNameDirective ( $compile ) {
  return {
    restrict: 'A',
    scope: {
      ngModel: '='
    },
    require: [
      '^card',
      'ngModel'
    ],
    link: function (scope, element, attributes, ctrls) {
      var cardCtrl = ctrls[0];
      cardCtrl.nameInput = element;
      scope.$watch('ngModel', function (newVal, oldVal) {
        if (!oldVal && !newVal) {
          return;
        }
        if (oldVal === newVal && !newVal) {
          return;
        }

        var evt = document.createEvent('HTMLEvents');
        evt.initEvent('keyup', false, true);
        element[0].dispatchEvent(evt);
      });
    },
    priority:1004, // compiles second
    compile: function (el) {
      el.removeAttr('card-name'); // necessary to avoid infinite compile loop
      el.attr('name', 'name');
      var fn = $compile(el);
      return function(scope){
        fn(scope);
      };
    }
  };
}

/* @ngInject */
function CardExpiryDirective ( $compile ) {
  return {
    restrict: 'A',
    scope: {
      ngModel: '='
    },
    require: [
      '^card',
      'ngModel'
    ],
    link: function (scope, element, attributes, ctrls) {
      var cardCtrl = ctrls[0];
      cardCtrl.expiryInput = element;
      scope.$watch('ngModel', function (newVal, oldVal) {
        if (!oldVal && !newVal) {
          return;
        }
        if (oldVal === newVal && !newVal) {
          return;
        }

        var evt = document.createEvent('HTMLEvents');
        evt.initEvent('keyup', false, true);
        element[0].dispatchEvent(evt);
      });
    },
    priority:1003, // compiles third
    compile: function (el) {
      el.removeAttr('card-expiry'); // necessary to avoid infinite compile loop
      el.attr('name', 'expiry');
      var fn = $compile(el);
      return function(scope){
        fn(scope);
      };
    }
  };
}

/* @ngInject */
function CardCvcDirective ( $compile ) {
  return {
    restrict: 'A',
    scope: {
      ngModel: '='
    },
    require: [
      '^card',
      'ngModel'
    ],
    link: function (scope, element, attributes, ctrls) {
      var cardCtrl = ctrls[0];
      cardCtrl.cvcInput = element;
      scope.$watch('ngModel', function (newVal, oldVal) {
        if (!oldVal && !newVal) {
          return;
        }
        if (oldVal === newVal && !newVal) {
          return;
        }

        var evt = document.createEvent('HTMLEvents');
        evt.initEvent('keyup', false, true);
        element[0].dispatchEvent(evt);
      });
    },
    priority:1002, // compiles last
    compile: function (el) {
      el.removeAttr('card-cvc'); // necessary to avoid infinite compile loop
      el.attr('name', 'cvc');
      var fn = $compile(el);
      return function(scope){
        fn(scope);
      };
    }
  };
}

function generateUUID () {
    var d = new Date().getTime();
    var uuid = 'axxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};
