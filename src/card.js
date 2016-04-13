'use strict';

angular
  .module ('ui.card', [])
  .directive ( 'card', CardDirective );

/* @ngInject */
function CardDirective (Card) {
  return {
    restrict : 'E',
    tempate : '<div class="card-wrapper"></div>',
    replace : true,
    controllerAs : 'self',
    link : function ($scope, $element, $attributes) {

      var card = new Card({
          // a selector or DOM element for the form where users will
          // be entering their information
          form: 'form', // *required*
          // a selector or DOM element for the container
          // where you want the card to appear
          container: '.card-wrapper', // *required*

          formSelectors: {
              numberInput: 'input#number', // optional — default input[name="number"]
              expiryInput: 'input#expiry', // optional — default input[name="expiry"]
              cvcInput: 'input#cvc', // optional — default input[name="cvc"]
              nameInput: 'input#name' // optional - defaults input[name="name"]
          },

          width: 200, // optional — default 350px
          formatting: true, // optional - default true

          // Strings for translation - optional
          messages: {
              validDate: 'valid\ndate', // optional - default 'valid\nthru'
              monthYear: 'mm/yyyy', // optional - default 'month/year'
          },

          // Default placeholders for rendered fields - optional
          placeholders: {
              number: '•••• •••• •••• ••••',
              name: 'Full Name',
              expiry: '••/••',
              cvc: '•••'
          },

          // if true, will log helpful messages for setting up Card
          debug: false // optional - default false
      });

    }
  };
}
