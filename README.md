# Crafter.js
a Toolkit for the Modern Web

Crafter.js is still very W.I.P , so tread carefully

## Crafter.js makes use of
- Promises
- Fetch API
- ES6
- Animation API
- WebComponents

Crafter.js uses Babel to ensure compatibility on older browsers

## Crafter.js Offers
- DOM Manipulation
- Models
- Several useful functional programming methods including currying
- Two Way Data Binding
- Type assertion methods
- JSON based WebComponent format (.wc)
- Streamlined Custom Element Creation
- Methods for defining and handling Custom Attributes
- Useful custom attributes
- Web Components
- WebSocket wrapper for ease of use
- Form Validation methods
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
#### Models

Crafter.js allows the creation of scoped models to manipulate your app,
models execute after the page has loaded

```javascript

  // Create models using Craft.model
  Craft.model('MyModel', scope => {
    scope.headline = 'New Headline , this Just in...';
    scope.articles = ['article1...','article2...','article3...','article4...','article5...'];
    scope.newinfo = 'I will change when there is new info';

    // you can listen for changes on model scope variables
    scope.addListener('newinfo',(object,key,value,isValueNew) => {
      if(isValueNew) console.log('new info recieved!')
    })

  })

  // You can assign to variables from the model scope via Craft.fromModel
  Craft.fromModel('MyModel').newinfo = 'a new piece of info!';

  // Easily access variables from a model's scope using Craft.fromModel
  Craft.fromModel('MyModel.headline') // -> 'New Headline , this Just in...'
  Craft.fromModel('MyModel.articles[3]') // -> 'article4...'


```
You can easily bind scope variables to the dom using the bind="ModelName.xyz" attribute and all your changes will reflect in the dom
```html
  <div>
    <header bind='MyModel.headline'> New Headline , this Just in... </header>
  </div>
```
#### Websocket example

```javascript

    // Craft a new socket , note the ws:// or wss:// is optional
    let Websocket = Craft.Socket('192.168.10.108:3000/socket');

    Websocket.send = 'Hello'; // send via assignment
    // add a reciever function
    Ws.recieve = message => console.log(message);

    /// to get the last message recieved
    console.log(Ws.recieve);

    // Create an Observer to Bind to
    var MessageScope = Craft.observable({
      msg : ''
    });

    /// add another reciever to see output in DOM.
    Ws.recieve = message => MessageScope.msg = message;

    // Sync the value of the Input to the WebSocket
    dom("input").SyncInput(Websocket,'send');

```

Display the Websocket messages in the dom
``` html
  <div bind='MessageScope.msg'> </div>

  <input type='text'>
```


#### Data Binding

```html
<header bind='News.Headline'></header>
```

```javascript

// Craft.observer creates an observable object
var News = Craft.observable({
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
