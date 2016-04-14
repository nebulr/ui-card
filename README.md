# ui.card
A better credit card form in one line of code for angular js

This is an angular implementation of [http://jessepollak.github.io/card/](http://jessepollak.github.io/card/) This requires no dependencies and written entirely in angular! ( That means no card install or jquery install necessary ) For options usage and ability just look at that page.

# Install
`bower install angular-ui-card`

# Add files
```
<link rel="stylesheet" href="bower_components/angular-ui-card/dist/angular-ui-card.css"/>
<script src="bower_components/angular-ui-card/dist/angular-ui-card.js"></script>
```
#Usage
Add the module dependency to your project like so :

`angular.module('app', ['ui.card']);`

Sample Usage :

```
<card ng-submit="submit()" options="{}" disable="false">
  <input card-number placeholder="Card number" type="text">
  <input card-name placeholder="Full name" type="text"><br>
  <input card-expiry placeholder="MM/YY" type="text">
  <input card-cvc placeholder="CVC" type="text">
  <button type="submit">Submit</button>
<card/>
```

You can see it in action on the [demo page](http://nebulr.github.io/ui-card/)
