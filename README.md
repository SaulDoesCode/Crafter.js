# Crafter.js
a Toolkit for the Modern Web

Crafter.js is still very W.I.P , so tread carefully

## Crafter.js makes use of
- Promises
- Fetch API
- Latest ES6 Features
- WebComponents

Crafter.js also remains backward compatible using the Babel transpiler and Polyfills.     
it will run on -
* Chrome 43.0 and up
* Firefox 41 and up
* Opera 33+
* Edge Browser 13+
* Vivaldi and other Blink based browsers

## Crafter.js Offers
- DOM Manipulation sytem with useful methods ``dom('selector'/Node).append(), dom().query(), dom().setWidth()...``
- lodash like Data Manipulation methods
- Scoped **Two Way Data Binding** through code or simple attributes
- **Type assertion**, accepts multiple arguments is.Node(el1,el2) (is.Arr,is.Def,is.Object,is.Func, is.Null...)
- JSON based WebComponent format (.wc) imported with `<fetch-webcomponent src="xyz.wc"></fetch-webcomponent>`
- Methods for creating **Custom Elements** in a steamlined easy manner
- Several Custom Attributes each with their own functionality
- **WebComponents** ,optional pre-made webcomponents such as sidebars,forms and media carousel
- Form Validation
- **Module loader** for CSS and JS
- **Front End Router**
- EventHandler functions like On/Once example ``On('css-selector').Click(ev => ...)``
- Awesome Shorthand functions such as forEach, query/queryAll/queryEach
- Promise based way to call code after everything has loaded -> ``Craft.WhenReady().then(...)``

### The optional CrafterWidgets extension
 adds several useful CSS classes and effects such as grids, ripple effects, custom context menus,
 tooltips and more.

### Crafter Code Example

```javascript
  queryEach('.menu-items',element => On(element).Click(ev => dom('.page-view').append(dom().span('Hello!')));
  // or same thing differently
  On('click','.menu-items',(ev,element) => dom('.page-view').append(dom().span('Hello!'));

  // Element Methods
  dom('.text').prepend('Prepend Some Text to an element').append('Append Text to Same Element');
  // make div , span and other elements via dom()
  // add attributes with an object { title : 'x' , id : 'mydiv' }
  dom().div('I am a new div',{ class : 'page-element'}) // -> `<div class="page-element">I am a new div</div>`
  // for other elements unlisted in dom() use Craft.make_element
  // you could also add attributes URI style
  Craft.make_element('aside','text to go inside','id=aside2&class=side-content',true)
  // optional bool at the end for node or string form output
```
#### Custom Elements
Create a new Custom Element using the Craft.newComponent method
```javascript
  // has to be a hyphenated tag name
  Craft.newComponent('news-element',{
  // optionally manage each stage of the element's lifecycle
    created() {
      // create an instance of domMethods for the news-element
      // if we used dom(element).somemethod every time it would be less memory effective
      this.manipulator = dom(this); // gives access to all the dom methods

      // hypothetically fetch a news article
      fetch('/news/latest-article').then(response => response.json().then(news => this.currentNews = news));
    },
    inserted() {
      // when the news-element is insterted into the DOM append a <h3></h3> element
      this.manipulator.append( dom().h(3, this.currentNews.headline) );

      this.manipulator.text( this.currentNews.article );
    },
    attr(name, oldValue , newValue) {

    },
    destroyed() {

    }
  });

  // or Extend an existing element
  Craft.newComponent('red-button',{
    extends : "button"
  });

```

#### Data Binding

```html
<header view-bind='HeaderText'> </header>
```

```javascript
// The HTML will instantly reflect it
Craft.newBind('HeaderText','New Headline , this Just in...');
// Changes will also be reflected
Craft.setBind('HeaderText','New information, data-binding is a thing');
// You can also optionally add a chance handler function
Craft.newBind('HeaderText','New Headline , this Just in...', (oldVal,newVal) => {
  if(!Craft.tabActive) Craft.router.setTitle(document.title + '(1)');
});
```
if a bind does not exist and Crafter.js sees a view-bind or input-bind the bind will be created
and the Value or innerHTML of the element will become the initial the Bind value.

You can bind `<input>` and `<textarea>` elements with the input-bind attribute,
this is useful for forms and validation

```html
<textarea input-bind="truestory">  
  Everything gets reflected instantly
</textarea>

<article view-bind="truestory">
  Everything gets reflected instantly
</article>

```
Optionally Bind in your own Binding Scope
```javascript
let myScope = new Map;

Craft.newBind('Stats', { Health : 32 , Mana : 22 }, myScope);

Craft.setBind('Stats',{ Health : 0 , Mana : 100}, myScope)

```

#### TODO
- DOCUMENTATION!!!
- Feature standardisation
- Fully featured CSS / Widgets library
- More WebComponents

#### MIT LICENSE
