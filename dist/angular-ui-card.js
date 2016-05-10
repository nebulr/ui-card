'use strict';

CardController.$inject = ["$scope"];
CardDirective.$inject = ["Card", "$timeout"];
CardNumberDirective.$inject = ["$compile"];
CardNameDirective.$inject = ["$compile"];
CardExpiryDirective.$inject = ["$compile"];
CardCvcDirective.$inject = ["$compile"];
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
function CardDirective (Card, $timeout) {
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

      angular.element($element).addClass($scope.uuid);

      var options = {
          // a selector or DOM element for the form where users will
          // be entering their information
          form: 'form.' + $scope.uuid, // *required*
          // a selector or DOM element for the container
          // where you want the card to appear
          container: '.' + $scope.uuid + ' div.card-wrapper' , // *required*

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

      // Need to add this so can wait for dialog to load before rendering
      $timeout(function () {
        var card = new Card(options);
      }, 0);

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

'use strict';

angular
  .module ('ui.card')
  .factory ('QJ', QJFactory);

/* @ngInject */
function QJFactory () {
  var QJ, rreturn, rtrim;

  QJ = function(selector) {
    if (QJ.isDOMElement(selector)) {
      return selector;
    }
    console.log (selector);
    var el = document.querySelector(selector);
    console.log (el);
    return el;
  };

  QJ.isDOMElement = function(el) {
    return el && (el.nodeName != null);
  };

  rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

  QJ.trim = function(text) {
    if (text === null) {
      return "";
    } else {
      return (text + "").replace(rtrim, "");
    }
  };

  rreturn = /\r/g;

  QJ.val = function(el, val) {
    var ret;
    if (arguments.length > 1) {
      return el.value = val;
    } else {
      ret = el.value;
      if (typeof ret === "string") {
        return ret.replace(rreturn, "");
      } else {
        if (ret === null) {
          return "";
        } else {
          return ret;
        }
      }
    }
  };

  QJ.preventDefault = function(eventObject) {
    if (typeof eventObject.preventDefault === "function") {
      eventObject.preventDefault();
      return;
    }
    eventObject.returnValue = false;
    return false;
  };

  QJ.normalizeEvent = function(e) {
    var original;
    original = e;
    e = {
      which: original.which != null ? original.which : void 0,
      target: original.target || original.srcElement,
      preventDefault: function() {
        return QJ.preventDefault(original);
      },
      originalEvent: original,
      data: original.data || original.detail
    };
    if (e.which == null) {
      e.which = original.charCode != null ? original.charCode : original.keyCode;
    }
    return e;
  };

  QJ.on = function(element, eventName, callback) {
    var el, i, j, len, len1, multEventName, originalCallback, ref;
    if (element.length) {
      for (i = 0, len = element.length; i < len; i++) {
        el = element[i];
        QJ.on(el, eventName, callback);
      }
      return;
    }
    if (eventName.match(" ")) {
      ref = eventName.split(" ");
      for (j = 0, len1 = ref.length; j < len1; j++) {
        multEventName = ref[j];
        QJ.on(element, multEventName, callback);
      }
      return;
    }
    originalCallback = callback;
    callback = function(e) {
      e = QJ.normalizeEvent(e);
      return originalCallback(e);
    };
    if (element.addEventListener) {
      return element.addEventListener(eventName, callback, false);
    }
    if (element.attachEvent) {
      eventName = "on" + eventName;
      return element.attachEvent(eventName, callback);
    }
    element['on' + eventName] = callback;
  };

  QJ.addClass = function(el, className) {
    var e;
    if (el.length) {
      return (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = el.length; i < len; i++) {
          e = el[i];
          results.push(QJ.addClass(e, className));
        }
        return results;
      })();
    }
    if (el.classList) {
      return el.classList.add(className);
    } else {
      return el.className += ' ' + className;
    }
  };

  QJ.hasClass = function(el, className) {
    var e, hasClass, i, len;
    if (el.length) {
      hasClass = true;
      for (i = 0, len = el.length; i < len; i++) {
        e = el[i];
        hasClass = hasClass && QJ.hasClass(e, className);
      }
      return hasClass;
    }
    if (el.classList) {
      return el.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
  };

  QJ.removeClass = function(el, className) {
    var cls, e, i, len, ref, results;
    if (el.length) {
      return (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = el.length; i < len; i++) {
          e = el[i];
          results.push(QJ.removeClass(e, className));
        }
        return results;
      })();
    }
    if (el.classList) {
      ref = className.split(' ');
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        cls = ref[i];
        results.push(el.classList.remove(cls));
      }
      return results;
    } else {
      return el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  };

  QJ.toggleClass = function(el, className, bool) {
    var e;
    if (el.length) {
      return (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = el.length; i < len; i++) {
          e = el[i];
          results.push(QJ.toggleClass(e, className, bool));
        }
        return results;
      })();
    }
    if (bool) {
      if (!QJ.hasClass(el, className)) {
        return QJ.addClass(el, className);
      }
    } else {
      return QJ.removeClass(el, className);
    }
  };

  QJ.append = function(el, toAppend) {
    var e;
    if (el.length) {
      return (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = el.length; i < len; i++) {
          e = el[i];
          results.push(QJ.append(e, toAppend));
        }
        return results;
      })();
    }
    return el.insertAdjacentHTML('beforeend', toAppend);
  };

  QJ.find = function(el, selector) {
    if (el instanceof NodeList || el instanceof Array) {
      el = el[0];
    }
    return el.querySelectorAll(selector);
  };

  QJ.trigger = function(el, name, data) {
    var e, error, ev;
    try {
      ev = new CustomEvent(name, {
        detail: data
      });
    } catch (error) {
      e = error;
      ev = document.createEvent('CustomEvent');
      if (ev.initCustomEvent) {
        ev.initCustomEvent(name, true, true, data);
      } else {
        ev.initEvent(name, true, true, data);
      }
    }
    return el.dispatchEvent(ev);
  };

  return QJ;
}

'use strict';

PaymentFactory.$inject = ["QJ"];
angular
  .module ('ui.card')
  .factory ('Payment', PaymentFactory);

/* @ngInject */
function PaymentFactory (QJ) {

  var self = this;

  var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  var defaultFormat = /(\d{1,4})/g;

  var cards = [
    {
      type: 'amex',
      pattern: /^3[47]/,
      format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
      length: [15],
      cvcLength: [4],
      luhn: true
    }, {
      type: 'dankort',
      pattern: /^5019/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'dinersclub',
      pattern: /^(36|38|30[0-5])/,
      format: defaultFormat,
      length: [14],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'discover',
      pattern: /^(6011|65|64[4-9]|622)/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'jcb',
      pattern: /^35/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'laser',
      pattern: /^(6706|6771|6709)/,
      format: defaultFormat,
      length: [16, 17, 18, 19],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'maestro',
      pattern: /^(5018|5020|5038|6304|6703|6759|676[1-3])/,
      format: defaultFormat,
      length: [12, 13, 14, 15, 16, 17, 18, 19],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'mastercard',
      pattern: /^5[1-5]/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'unionpay',
      pattern: /^62/,
      format: defaultFormat,
      length: [16, 17, 18, 19],
      cvcLength: [3],
      luhn: false
    }, {
      type: 'visaelectron',
      pattern: /^4(026|17500|405|508|844|91[37])/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'elo',
      pattern: /^4011|438935|45(1416|76)|50(4175|6699|67|90[4-7])|63(6297|6368)/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'visa',
      pattern: /^4/,
      format: defaultFormat,
      length: [13, 16],
      cvcLength: [3],
      luhn: true
    }
  ];

  var cardFromNumber = function(num) {
    var card, i, len;
    num = (num + '').replace(/\D/g, '');
    for (i = 0, len = cards.length; i < len; i++) {
      card = cards[i];
      if (card.pattern.test(num)) {
        return card;
      }
    }
  };

  var cardFromType = function(type) {
    var card, i, len;
    for (i = 0, len = cards.length; i < len; i++) {
      card = cards[i];
      if (card.type === type) {
        return card;
      }
    }
  };

  var luhnCheck = function(num) {
    var digit, digits, i, len, odd, sum;
    odd = true;
    sum = 0;
    digits = (num + '').split('').reverse();
    for (i = 0, len = digits.length; i < len; i++) {
      digit = digits[i];
      digit = parseInt(digit, 10);
      if ((odd = !odd)) {
        digit *= 2;
      }
      if (digit > 9) {
        digit -= 9;
      }
      sum += digit;
    }
    return sum % 10 === 0;
  };

  var hasTextSelected = function(target) {
    var ref;
    if ((target.selectionStart != null) && target.selectionStart !== target.selectionEnd) {
      return true;
    }
    if ((typeof document !== "undefined" && document !== null ? (ref = document.selection) != null ? ref.createRange : void 0 : void 0) != null) {
      if (document.selection.createRange().text) {
        return true;
      }
    }
    return false;
  };

  var reFormatCardNumber = function(e) {
    return setTimeout((function(_this) {
      return function() {
        var target, value;
        target = e.target;
        value = QJ.val(target);
        value = self.fns.formatCardNumber(value);
        return QJ.val(target, value);
      };
    })(this));
  };

  var formatCardNumber = function(e) {
    var card, digit, length, re, target, upperLength, value;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    target = e.target;
    value = QJ.val(target);
    card = cardFromNumber(value + digit);
    length = (value.replace(/\D/g, '') + digit).length;
    upperLength = 16;
    if (card) {
      upperLength = card.length[card.length.length - 1];
    }
    if (length >= upperLength) {
      return;
    }
    if ((target.selectionStart != null) && target.selectionStart !== value.length) {
      return;
    }
    if (card && card.type === 'amex') {
      re = /^(\d{4}|\d{4}\s\d{6})$/;
    } else {
      re = /(?:^|\s)(\d{4})$/;
    }
    if (re.test(value)) {
      e.preventDefault();
      return QJ.val(target, value + ' ' + digit);
    } else if (re.test(value + digit)) {
      e.preventDefault();
      return QJ.val(target, value + digit + ' ');
    }
  };

  var formatBackCardNumber = function(e) {
    var target, value;
    target = e.target;
    value = QJ.val(target);
    if (e.meta) {
      return;
    }
    if (e.which !== 8) {
      return;
    }
    if ((target.selectionStart != null) && target.selectionStart !== value.length) {
      return;
    }
    if (/\d\s$/.test(value)) {
      e.preventDefault();
      return QJ.val(target, value.replace(/\d\s$/, ''));
    } else if (/\s\d?$/.test(value)) {
      e.preventDefault();
      return QJ.val(target, value.replace(/\s\d?$/, ''));
    }
  };

  var formatExpiry = function(e) {
    var digit, target, val;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    target = e.target;
    val = QJ.val(target) + digit;
    if (/^\d$/.test(val) && (val !== '0' && val !== '1')) {
      e.preventDefault();
      return QJ.val(target, "0" + val + " / ");
    } else if (/^\d\d$/.test(val)) {
      e.preventDefault();
      return QJ.val(target, val + " / ");
    }
  };

  var formatMonthExpiry = function(e) {
    var digit, target, val;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    target = e.target;
    val = QJ.val(target) + digit;
    if (/^\d$/.test(val) && (val !== '0' && val !== '1')) {
      e.preventDefault();
      return QJ.val(target, "0" + val);
    } else if (/^\d\d$/.test(val)) {
      e.preventDefault();
      return QJ.val(target, "" + val);
    }
  };

  var formatForwardExpiry = function(e) {
    var digit, target, val;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    target = e.target;
    val = QJ.val(target);
    if (/^\d\d$/.test(val)) {
      return QJ.val(target, val + " / ");
    }
  };

  var formatForwardSlash = function(e) {
    var slash, target, val;
    slash = String.fromCharCode(e.which);
    if (slash !== '/') {
      return;
    }
    target = e.target;
    val = QJ.val(target);
    if (/^\d$/.test(val) && val !== '0') {
      return QJ.val(target, "0" + val + " / ");
    }
  };

  var formatBackExpiry = function(e) {
    var target, value;
    if (e.metaKey) {
      return;
    }
    target = e.target;
    value = QJ.val(target);
    if (e.which !== 8) {
      return;
    }
    if ((target.selectionStart != null) && target.selectionStart !== value.length) {
      return;
    }
    if (/\d(\s|\/)+$/.test(value)) {
      e.preventDefault();
      return QJ.val(target, value.replace(/\d(\s|\/)*$/, ''));
    } else if (/\s\/\s?\d?$/.test(value)) {
      e.preventDefault();
      return QJ.val(target, value.replace(/\s\/\s?\d?$/, ''));
    }
  };

  var restrictNumeric = function(e) {
    var input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return e.preventDefault();
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    if (!/[\d\s]/.test(input)) {
      return e.preventDefault();
    }
  };

  var restrictCardNumber = function(e) {
    var card, digit, target, value;
    target = e.target;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    if (hasTextSelected(target)) {
      return;
    }
    value = (QJ.val(target) + digit).replace(/\D/g, '');
    card = cardFromNumber(value);
    if (card) {
      if (!(value.length <= card.length[card.length.length - 1])) {
        return e.preventDefault();
      }
    } else {
      if (!(value.length <= 16)) {
        return e.preventDefault();
      }
    }
  };

  var restrictExpiry = function(e, length) {
    var digit, target, value;
    target = e.target;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    if (hasTextSelected(target)) {
      return;
    }
    value = QJ.val(target) + digit;
    value = value.replace(/\D/g, '');
    if (value.length > length) {
      return e.preventDefault();
    }
  };

  var restrictCombinedExpiry = function(e) {
    return restrictExpiry(e, 6);
  };

  var restrictMonthExpiry = function(e) {
    return restrictExpiry(e, 2);
  };

  var restrictYearExpiry = function(e) {
    return restrictExpiry(e, 4);
  };

  var restrictCVC = function(e) {
    var digit, target, val;
    target = e.target;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    if (hasTextSelected(target)) {
      return;
    }
    val = QJ.val(target) + digit;
    if (!(val.length <= 4)) {
      return e.preventDefault();
    }
  };

  var setCardType = function(e) {
    var allTypes, card, cardType, target, val;
    target = e.target;
    val = QJ.val(target);
    cardType = self.fns.cardType(val) || 'unknown';
    if (!QJ.hasClass(target, cardType)) {
      allTypes = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = cards.length; i < len; i++) {
          card = cards[i];
          results.push(card.type);
        }
        return results;
      })();
      QJ.removeClass(target, 'unknown');
      QJ.removeClass(target, allTypes.join(' '));
      QJ.addClass(target, cardType);
      QJ.toggleClass(target, 'identified', cardType !== 'unknown');
      return QJ.trigger(target, 'payment.cardType', cardType);
    }
  };

  self.fns = {
    cardExpiryVal: function(value) {
      var month, prefix, ref, year;
      value = value.replace(/\s/g, '');
      ref = value.split('/', 2), month = ref[0], year = ref[1];
      if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
        prefix = (new Date).getFullYear();
        prefix = prefix.toString().slice(0, 2);
        year = prefix + year;
      }
      month = parseInt(month, 10);
      year = parseInt(year, 10);
      return {
        month: month,
        year: year
      };
    },
    validateCardNumber: function(num) {
      var card, ref;
      num = (num + '').replace(/\s+|-/g, '');
      if (!/^\d+$/.test(num)) {
        return false;
      }
      card = cardFromNumber(num);
      if (!card) {
        return false;
      }
      return (ref = num.length, indexOf.call(card.length, ref) >= 0) && (card.luhn === false || luhnCheck(num));
    },
    validateCardExpiry: function(month, year) {
      var currentTime, expiry, prefix, ref;
      if (typeof month === 'object' && 'month' in month) {
        ref = month, month = ref.month, year = ref.year;
      }
      if (!(month && year)) {
        return false;
      }
      month = QJ.trim(month);
      year = QJ.trim(year);
      if (!/^\d+$/.test(month)) {
        return false;
      }
      if (!/^\d+$/.test(year)) {
        return false;
      }
      if (!(parseInt(month, 10) <= 12)) {
        return false;
      }
      if (year.length === 2) {
        prefix = (new Date).getFullYear();
        prefix = prefix.toString().slice(0, 2);
        year = prefix + year;
      }
      expiry = new Date(year, month);
      currentTime = new Date;
      expiry.setMonth(expiry.getMonth() - 1);
      expiry.setMonth(expiry.getMonth() + 1, 1);
      return expiry > currentTime;
    },
    validateCardCVC: function(cvc, type) {
      var ref, ref1;
      cvc = QJ.trim(cvc);
      if (!/^\d+$/.test(cvc)) {
        return false;
      }
      if (type && cardFromType(type)) {
        return ref = cvc.length, indexOf.call((ref1 = cardFromType(type)) != null ? ref1.cvcLength : void 0, ref) >= 0;
      } else {
        return cvc.length >= 3 && cvc.length <= 4;
      }
    },
    cardType: function(num) {
      var ref;
      if (!num) {
        return null;
      }
      return ((ref = cardFromNumber(num)) != null ? ref.type : void 0) || null;
    },
    formatCardNumber: function(num) {
      var card, groups, ref, upperLength;
      card = cardFromNumber(num);
      if (!card) {
        return num;
      }
      upperLength = card.length[card.length.length - 1];
      num = num.replace(/\D/g, '');
      num = num.slice(0, +upperLength + 1 || 9e9);
      if (card.format.global) {
        return (ref = num.match(card.format)) != null ? ref.join(' ') : void 0;
      } else {
        groups = card.format.exec(num);
        if (groups != null) {
          groups.shift();
        }
        return groups != null ? groups.join(' ') : void 0;
      }
    }
  };

  self.restrictNumeric = function(el) {
    return QJ.on(el, 'keypress', restrictNumeric);
  };

  self.cardExpiryVal = function(el) {
    return this.fns.cardExpiryVal(QJ.val(el));
  };

  self.formatCardCVC = function(el) {
    this.restrictNumeric(el);
    QJ.on(el, 'keypress', restrictCVC);
    return el;
  };

  self.formatCardExpiry = function(el) {
    var month, year;
    self.restrictNumeric(el);
    if (el.length && el.length === 2) {
      month = el[0], year = el[1];
      this.formatCardExpiryMultiple(month, year);
    } else {
      QJ.on(el, 'keypress', restrictCombinedExpiry);
      QJ.on(el, 'keypress', formatExpiry);
      QJ.on(el, 'keypress', formatForwardSlash);
      QJ.on(el, 'keypress', formatForwardExpiry);
      QJ.on(el, 'keydown', formatBackExpiry);
    }
    return el;
  };

  self.formatCardExpiryMultiple = function(month, year) {
    QJ.on(month, 'keypress', restrictMonthExpiry);
    QJ.on(month, 'keypress', formatMonthExpiry);
    return QJ.on(year, 'keypress', restrictYearExpiry);
  };

  self.formatCardNumber = function(el) {
    this.restrictNumeric(el);
    QJ.on(el, 'keypress', restrictCardNumber);
    QJ.on(el, 'keypress', formatCardNumber);
    QJ.on(el, 'keydown', formatBackCardNumber);
    QJ.on(el, 'keyup', setCardType);
    QJ.on(el, 'paste', reFormatCardNumber);
    return el;
  };

  self.getCardArray = function() {
    return cards;
  };

  self.setCardArray = function(cardArray) {
    cards = cardArray;
    return true;
  };

  self.addToCardArray = function(cardObject) {
    return cards.push(cardObject);
  };

  self.removeFromCardArray = function(type) {
    var key, value;
    for (key in cards) {
      value = cards[key];
      if (value.type === type) {
        cards.splice(key, 1);
      }
    }
    return true;
  };

  return self;
}

'use strict';

CardFactory.$inject = ["QJ", "Payment"];
angular
  .module ('ui.card')
  .factory ('Card', CardFactory);

/* ngInject */
function CardFactory (QJ, Payment) {
    var bindVal;

    function Card () {}

    Card.prototype.cardTemplate = '' + '<div class="jp-card-container">' + '<div class="jp-card">' + '<div class="jp-card-front">' + '<div class="jp-card-logo jp-card-elo">' + '<div class="e">e</div>' + '<div class="l">l</div>' + '<div class="o">o</div>' + '</div>' + '<div class="jp-card-logo jp-card-visa">visa</div>' + '<div class="jp-card-logo jp-card-mastercard">MasterCard</div>' + '<div class="jp-card-logo jp-card-maestro">Maestro</div>' + '<div class="jp-card-logo jp-card-amex"></div>' + '<div class="jp-card-logo jp-card-discover">discover</div>' + '<div class="jp-card-logo jp-card-dankort"><div class="dk"><div class="d"></div><div class="k"></div></div></div>' + '<div class="jp-card-lower">' + '<div class="jp-card-shiny"></div>' + '<div class="jp-card-cvc jp-card-display">{{cvc}}</div>' + '<div class="jp-card-number jp-card-display">{{number}}</div>' + '<div class="jp-card-name jp-card-display">{{name}}</div>' + '<div class="jp-card-expiry jp-card-display" data-before="{{monthYear}}" data-after="{{validDate}}">{{expiry}}</div>' + '</div>' + '</div>' + '<div class="jp-card-back">' + '<div class="jp-card-bar"></div>' + '<div class="jp-card-cvc jp-card-display">{{cvc}}</div>' + '<div class="jp-card-shiny"></div>' + '</div>' + '</div>' + '</div>';

    Card.prototype.template = function(tpl, data) {
      return tpl.replace(/\{\{(.*?)\}\}/g, function(match, key, str) {
        return data[key];
      });
    };

    Card.prototype.cardTypes = ['jp-card-amex', 'jp-card-dankort', 'jp-card-dinersclub', 'jp-card-discover', 'jp-card-jcb', 'jp-card-laser', 'jp-card-maestro', 'jp-card-mastercard', 'jp-card-unionpay', 'jp-card-visa', 'jp-card-visaelectron', 'jp-card-elo'];

    Card.prototype.defaults = {
      formatting: true,
      formSelectors: {
        numberInput: 'input[name="number"]',
        expiryInput: 'input[name="expiry"]',
        cvcInput: 'input[name="cvc"]',
        nameInput: 'input[name="name"]'
      },
      cardSelectors: {
        cardContainer: '.jp-card-container',
        card: '.jp-card',
        numberDisplay: '.jp-card-number',
        expiryDisplay: '.jp-card-expiry',
        cvcDisplay: '.jp-card-cvc',
        nameDisplay: '.jp-card-name'
      },
      messages: {
        validDate: 'valid\nthru',
        monthYear: 'month/year'
      },
      placeholders: {
        number: '&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull;',
        cvc: '&bull;&bull;&bull;',
        expiry: '&bull;&bull;/&bull;&bull;',
        name: 'Full Name'
      },
      classes: {
        valid: 'jp-card-valid',
        invalid: 'jp-card-invalid'
      },
      debug: false
    };

    function Card(opts) {
      this.options = angular.merge(this.defaults, opts);
      if (!this.options.form) {
        console.log("Please provide a form");
        return;
      }
      this.$el = QJ(this.options.form);
      if (!this.options.container) {
        console.log("Please provide a container");
        return;
      }
      this.$container = new QJ(this.options.container);
      this.render();
      this.attachHandlers();
      this.handleInitialPlaceholders();
    }

    Card.prototype.render = function() {
      var $cardContainer, baseWidth, name, obj, ref, ref1, selector, ua;
      QJ.append(this.$container, this.template(this.cardTemplate, angular.extend({}, this.options.messages, this.options.placeholders)));
      ref = this.options.cardSelectors;
      for (name in ref) {
        selector = ref[name];
        this["$" + name] = QJ.find(this.$container, selector);
      }
      ref1 = this.options.formSelectors;
      for (name in ref1) {
        selector = ref1[name];
        selector = this.options[name] ? this.options[name] : selector;
        obj = QJ.find(this.$el, selector);
        if (!obj.length && this.options.debug) {
          console.error("Card can't find a " + name + " in your form.");
        }
        this["$" + name] = obj;
      }
      if (this.options.formatting) {
        Payment.formatCardNumber(this.$numberInput);
        Payment.formatCardCVC(this.$cvcInput);
        Payment.formatCardExpiry(this.$expiryInput);
      }
      if (this.options.width) {
        $cardContainer = QJ(this.options.cardSelectors.cardContainer)[0];
        baseWidth = parseInt($cardContainer.clientWidth);
        $cardContainer.style.transform = "scale(" + (this.options.width / baseWidth) + ")";
      }
      if (typeof navigator !== "undefined" && navigator !== null ? navigator.userAgent : void 0) {
        ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1) {
          QJ.addClass(this.$card, 'jp-card-safari');
        }
      }
      if (/MSIE 10\./i.test(navigator.userAgent)) {
        QJ.addClass(this.$card, 'jp-card-ie-10');
      }
      if (/rv:11.0/i.test(navigator.userAgent)) {
        return QJ.addClass(this.$card, 'jp-card-ie-11');
      }
    };

    Card.prototype.attachHandlers = function() {
      var expiryFilters;
      bindVal(this.$numberInput, this.$numberDisplay, {
        fill: false,
        filters: this.validToggler('cardNumber')
      });
      QJ.on(this.$numberInput, 'payment.cardType', this.handle('setCardType'));
      expiryFilters = [
        function(val) {
          return val.replace(/(\s+)/g, '');
        }
      ];
      expiryFilters.push(this.validToggler('cardExpiry'));
      bindVal(this.$expiryInput, this.$expiryDisplay, {
        join: function(text) {
          if (text[0].length === 2 || text[1]) {
            return "/";
          } else {
            return "";
          }
        },
        filters: expiryFilters
      });
      bindVal(this.$cvcInput, this.$cvcDisplay, {
        filters: this.validToggler('cardCVC')
      });
      QJ.on(this.$cvcInput, 'focus', this.handle('flipCard'));
      QJ.on(this.$cvcInput, 'blur', this.handle('unflipCard'));
      return bindVal(this.$nameInput, this.$nameDisplay, {
        fill: false,
        filters: this.validToggler('cardHolderName'),
        join: ' '
      });
    };

    Card.prototype.handleInitialPlaceholders = function() {
      var el, name, ref, results, selector;
      ref = this.options.formSelectors;
      results = [];
      for (name in ref) {
        selector = ref[name];
        el = this["$" + name];
        if (QJ.val(el)) {
          QJ.trigger(el, 'paste');
          results.push(setTimeout(function() {
            return QJ.trigger(el, 'keyup');
          }));
        } else {
          results.push(void 0);
        }
      }
      return results;
    };

    Card.prototype.handle = function(fn) {
      return (function(_this) {
        return function(e) {
          var args;
          args = Array.prototype.slice.call(arguments);
          args.unshift(e.target);
          return _this.handlers[fn].apply(_this, args);
        };
      })(this);
    };

    Card.prototype.validToggler = function(validatorName) {
      var isValid;
      if (validatorName === "cardExpiry") {
        isValid = function(val) {
          var objVal;
          objVal = Payment.fns.cardExpiryVal(val);
          return Payment.fns.validateCardExpiry(objVal.month, objVal.year);
        };
      } else if (validatorName === "cardCVC") {
        isValid = (function(_this) {
          return function(val) {
            return Payment.fns.validateCardCVC(val, _this.cardType);
          };
        })(this);
      } else if (validatorName === "cardNumber") {
        isValid = function(val) {
          return Payment.fns.validateCardNumber(val);
        };
      } else if (validatorName === "cardHolderName") {
        isValid = function(val) {
          return val !== "";
        };
      }
      return (function(_this) {
        return function(val, $in, $out) {
          var result;
          result = isValid(val);
          _this.toggleValidClass($in, result);
          _this.toggleValidClass($out, result);
          return val;
        };
      })(this);
    };

    Card.prototype.toggleValidClass = function(el, test) {
      QJ.toggleClass(el, this.options.classes.valid, test);
      return QJ.toggleClass(el, this.options.classes.invalid, !test);
    };

    Card.prototype.handlers = {
      setCardType: function($el, e) {
        var cardType;
        cardType = e.data;
        if (!QJ.hasClass(this.$card, cardType)) {
          QJ.removeClass(this.$card, 'jp-card-unknown');
          QJ.removeClass(this.$card, this.cardTypes.join(' '));
          QJ.addClass(this.$card, "jp-card-" + cardType);
          QJ.toggleClass(this.$card, 'jp-card-identified', cardType !== 'unknown');
          return this.cardType = cardType;
        }
      },
      flipCard: function() {
        return QJ.addClass(this.$card, 'jp-card-flipped');
      },
      unflipCard: function() {
        return QJ.removeClass(this.$card, 'jp-card-flipped');
      }
    };

    bindVal = function(el, out, opts) {
      var joiner, o, outDefaults;
      if (opts == null) {
        opts = {};
      }
      opts.fill = opts.fill || false;
      opts.filters = opts.filters || [];
      if (!(opts.filters instanceof Array)) {
        opts.filters = [opts.filters];
      }
      opts.join = opts.join || "";
      if (!(typeof opts.join === "function")) {
        joiner = opts.join;
        opts.join = function() {
          return joiner;
        };
      }
      outDefaults = (function() {
        var j, len, results;
        results = [];
        for (j = 0, len = out.length; j < len; j++) {
          o = out[j];
          results.push(o.textContent);
        }
        return results;
      })();
      QJ.on(el, 'focus', function() {
        return QJ.addClass(out, 'jp-card-focused');
      });
      QJ.on(el, 'blur', function() {
        return QJ.removeClass(out, 'jp-card-focused');
      });
      QJ.on(el, 'keyup change paste', function(e) {
        var elem, filter, i, j, join, k, len, len1, outEl, outVal, ref, results, val;
        val = (function() {
          var j, len, results;
          results = [];
          for (j = 0, len = el.length; j < len; j++) {
            elem = el[j];
            results.push(QJ.val(elem));
          }
          return results;
        })();
        join = opts.join(val);
        val = val.join(join);
        if (val === join) {
          val = "";
        }
        ref = opts.filters;
        for (j = 0, len = ref.length; j < len; j++) {
          filter = ref[j];
          val = filter(val, el, out);
        }
        results = [];
        for (i = k = 0, len1 = out.length; k < len1; i = ++k) {
          outEl = out[i];
          if (opts.fill) {
            outVal = val + outDefaults[i].substring(val.length);
          } else {
            outVal = val || outDefaults[i];
          }
          results.push(outEl.textContent = outVal);
        }
        return results;
      });
      return el;
    };

    return Card;
}
