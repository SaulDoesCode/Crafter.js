# Crafter.js
Toolkit for the Modern Web

Crafter.js is still very W.I.P , so tread carefully

## Crafter.js makes use of
- Promises
- Fetch API
- Latest ES6 Features
- WebComponents
- Babel and Polyfills for good backwards compatibility

## Crafter.js Offers
- Easy DOM Manipulation with several useful methods dom().append() , dom().find() , dom.setWidth() and more...
- Data Manipulation
- Data Binding
- Type Testing, accepts multiple arguments is.Node(el1,el2) (is.Arr, is.Def, is.Object, is.Func, is.Null...)
- Easy JSON based webcomponent format (.wc), with a special element to import them
- Custom Elements easy methods for creating custom Elements
- Custom Element attributes
- WebComponents ,optional pre-made webcomponents such as sidebars,forms and media carousel
- Form Validation
- Module loader for CSS and JS
- Front End Router
- On/Off/Once Event Handling systems
- Awesome Shorthand functions such as forEach, query/queryAll/queryEach, log('err','msg'), log('msg')
- Cool promise based way to call code after everything has loaded , Craft.WhenReady().then(...)

### The optional CrafterWidgets extension
 adds several useful CSS classes and effects such as grids, ripple effects, custom context menus,
 tooltips and more.

#### TODO
- DOCUMENTATION!!!
- Feature standardisation
- HTML Templating
- Fully featured CSS / Widgets library
- More WebComponents

### Crafter Code Example

```javascript
  queryEach('.menu-items',element => element.On('click', ev => dom('.page-view').append(dom().span('Hello!')));
  // or same thing differently
  On('click','.menu-items',(ev,element) => dom('.page-view').append(dom().span('Hello!'));

  // Element Methods
  dom('.text').prepend('Prepend Some Text to an element')
  dom('.text').append('Append Text to Same Element')
  // make div , span and other elements via dom()
  // add attributes with an object { title : 'x' , id : 'mydiv' }
  dom().div('I am a new div',{ class : 'page-element'}) // -> `<div class="page-element">I am a new div</div>`
  // or other elements unlisted in dom()
  // you could also add attributes URI style
  make_element('aside','text to go inside','id=aside2&class=side-content',true)
  // optional bool at the end for node or string form output
```

Data Bind an Element

```html
<header view-bind='HeaderText'> </header>
```

```javascript
// The HTML will instantly reflect it
Craft.newBind('HeaderText','New Headline , this Just in...');
// Changes will also be reflected
Craft.setBind('HeaderText','New information, data-binding is a thing');
// You can also optionally add a handler function
Craft.newBind('HeaderText','New Headline , this Just in...', (oldVal,newVal) => {
  if(!Craft.tabActive) Craft.router.setTitle(document.title + '(1)');
});
// These methods may still change
```

#### MIT LICENSE
