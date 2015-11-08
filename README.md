### Crafter.js
Front End Library / Toolkit for the Modern Web

Crafter.js is W.I.P , so tread carefully

##### Crafter.js makes use of
* Promises
* Fetch API
* Latest ES6 Features
* Object.Observe
* WebComponents
* Babel and Polyfills to make backward compatible

## Crafter.js Offers

* Easy DOM Manipulation , $() with chained methods
* Type Testing (is.Arr , is.Def , is.Func , is.Null...)
* WebComponents
* Custom Elements
* Data Binding
* re-usable Widgets
* Useful CSS classes
* Form Validation
* Module loader for CSS and JS
* Data Manipulation
* Front End Router
* Awesome shorthand functions such as forEach , query/queryAll , log('err','msg') , log('msg')
* On / Off Event Handling functions
* Custom Context Menus
* Ripple Effects



##### TODO
* DOCUMENTATION!!!
* Feature standardisation
* Templating
* Fully featured CSS / Widgets library
* More WebComponents

### Crafter Code Example

```javascript
  $('.menu-items').forEach(element => element.On('click',event => $('.page-view').show(200)));
  // or same thing differently
  On('click','.menu-items',(event , element) => $('.page-view').show(200));

  // chainable Element Methods
  $('.text').prepend('Prepend Some Text to an element').append('Append Text to Same Element');
```
Data Bind an Element
```html
<header view-bind='HeaderText'> </header>
```
```javascript
// The HTML will instantly reflect it
Crafter.Scope.HeaderText = 'New Headline , this Just in...';
//TODO bind to custom Scopes
```

#### MIT LICENSE
