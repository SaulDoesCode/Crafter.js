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
- DOM Manipulation
- Functional Data Manipulation
- Two Way Data Binding
- Type assertion methods
- JSON based WebComponent format (.wc)
- Custom Element Creation system
- Custom Attributes each with their own functionality
- Web Components
- Form Validation
- Resource loader for Scripts and Style sheets
- Front End Router
- Event Handling system
- Shorthand functions such as forEach, query/queryAll/queryEach
- Promise based WhenReady method to execute code after everything has loaded

### The optional CrafterWidgets extension
 adds several useful CSS classes and effects such as grids, ripple effects, sidebar , notifications , custom context menus,
 tooltips and more.

### Crafter Code Example

```javascript
  Craft.WhenReady().then(() => {

    queryEach('.menu-items',element => On(element).Click(ev => dom('.page-view').append(dom().span('Hello!')));
    // or same thing differently
    On('click','.menu-items',ev => dom('.page-view').append(dom().span('Hello!'));

    // Element Methods
    dom('.text').prepend('Prepend Some Text to an element').append('Append Text to Same Element');
    // make div , span and other elements via dom()
    // add attributes with an object { title : 'x' , id : 'mydiv' }
    dom().div('New div',{ class : 'page-element'}) // -> `<div class="page-element">New div</div>`

    // for less common elements or custom elements use Craft.make_element
    // you could also add attributes URI style

    Craft.make_element('aside','text to go inside','id=aside2&class=side-content',true)
    // -> <aside id="aside2" class="side-content"> text to go inside </aside>

  })
```
#### Custom Elements
Create a new Custom Element using the Craft.newComponent method
```javascript
  // has to be a hyphenated tag name
  Craft.newComponent('news-element',{
  // optionally manage each stage of the element's lifecycle
    created() {
      // hypothetically fetch a news article
      fetch('/news/latest-article').then(response => response.json().then(news => this.news = news));
    },
    inserted() {
      // when the news-element is insterted fill it with content
      dom(this)
      .prepend( dom().h(3, this.news.headline) )
      .append( dom().div(this.news.article) );

    },
    attr(name, oldValue , newValue) {
      // optionally handle Attibute changes on the element
    },
    destroyed() {
      // executed when the element is no more
      // useful for stopping event listeners
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
// The Changes will be instantly reflected
Craft.newBind('HeaderText','New Headline , this Just in...');
// Changes will also be reflected
Craft.setBind('HeaderText','New information, data-binding is a thing');
// You can also optionally add a chance handler function
Craft.newBind('HeaderText','New Headline , this Just in...', (oldVal,newVal) => {
  if(!Craft.tabActive) Craft.router.setTitle(document.title + '(1)');
});
```
should a bind not exist and Crafter.js sees a view-bind / input-bind the bind will be created
and the Value or innerHTML of the element will become the initial the Bind value.

You can bind `<input>` and `<textarea>` elements with the input-bind attribute,
this is useful for forms and validation

```html
<textarea input-bind="truestory">  
  All Changes gets reflected instantly
</textarea>

<article view-bind="truestory">
  All Changes gets reflected instantly
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
