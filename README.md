# Crafter.js
a Toolkit for the Modern Web

Crafter.js is still very W.I.P , so tread carefully

## Crafter.js makes use of
- Promises
- Fetch API
- ES6
- WebComponents

## Crafter.js Offers
- DOM Manipulation
- Several useful functional programming methods
- Two Way Data Binding
- Type assertion methods
- JSON based WebComponent format (.wc)
- Streamlined Custom Element Creation
- Custom Attribute Definition and Handling
- Useful custom attributes
- Web Components
- WebSocket wrapper for ease of use
- Form Validation
- Resource loader for Scripts and Style sheets
- Front End Router
- Event Handling system
- Shorthand functions such as forEach, query/queryAll/queryEach
- WhenReady method to execute code after everything has loaded

### The CrafterWidgets extension
 adds several useful CSS classes and effects such as grids, ripple effects, sidebar , notifications , custom context menus,
 tooltips and more.

### Crafter Code Example

```javascript
  // WhenReady returns a promise when the DOM and WebComponents has loaded
  Craft.WhenReady.then(() => {

    queryEach('.menu-items',element => On('click',element,ev => dom('.page-view').append(dom().span('Hello!')));
    // or same thing differently
    On('.menu-items').Click(ev => dom('.page-view').append(dom().span('Hello!'));

    // Element Methods
    dom('.text').prepend('Prepend Some Text to an element').append('Append Text to Same Element');
    // make div , span and other elements via dom()
    // add attributes with an object { title : 'x' , id : 'mydiv' }
    dom().div('New div',{ class : 'page-element'}) // -> `<div class="page-element">New div</div>`

    // for less common elements or custom elements use dom().element
    // you could also add attributes URI style

    dom().element('aside','text to go inside','id=asidecontent&class=side-content');
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
      .prepend( dom().h(3, this.news.headline) /* -> <h3>News Headling...</h3> */ )
      .append( dom().div(this.news.article) );

    },
    attr(name, oldValue , newValue) {
      // handle Attibute changes on the element
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
<header bind='News.Headline'></header>
```

```javascript

// Craft.observer creates a reactive object
var News = Craft.observer({
  Headline : 'New Headline , this Just in...'
});
// The Changes will be instantly reflected in the DOM
News.Headline = 'New information, data-binding is a thing';

// You can also optionally add change listeners for a specific property or properties
News.addListener('Headline',(object,key,value) => {
  if(!Craft.tabActive) Craft.router.setTitle(document.title + '(1)');
});
```
If a bind does not exist it gets bound as a property of the gobal CraftScope
Binds on `input` and `textarea` will set the property when the value changes

```html
<textarea bind="truestory">
  All Changes gets reflected instantly
</textarea>

<article bind="truestory">
  All Changes gets reflected instantly
</article>
```

#### TODO
- DOCUMENTATION!!!
- Feature standardisation
- Fully featured CSS / Widgets library
- More WebComponents

#### MIT LICENSE
