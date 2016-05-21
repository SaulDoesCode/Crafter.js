# Crafter.js
a Toolkit for the Modern Web

Crafter.js is still very W.I.P , so tread carefully

## Crafter.js makes use of
- Promises
- Fetch API
- Proxy
- ES6
- WebComponents

Crafter.js uses Babel to ensure compatibility on older browsers

## Crafter.js Offers
- DOM Manipulation
- Observe elements and react to changes
- Models
- Several useful functional programming methods including currying
- Two Way Data Binding
- methods like setDeep , getDeep, forEachDeep , arrDiff ,flatten , omit... for manipulating objects and arrays
- Type assertion methods
- Plain Javascript WebComponents that work!
- Streamlined Custom Element Creation
- Methods for defining and handling Custom Attributes
- Useful custom attributes
- Web Components
- WebSocket wrapper for ease of use
- Form Validation methods
- Resource loader for Scripts and Style sheets
- Front End Router
- Easy to use Event Handling system with features such as .On , .Off , .Once , .Type
- Shorthand functions such as forEach, query/queryAll/queryEach
- Methods for units of getting time in milliseconds , Craft.millis.days(4)
- WhenReady method to execute code after everything has loaded

### The CrafterWidgets extension
 adds several useful CSS classes and effects such as grids, ripple effects, sidebar , notifications , custom context menus,  tooltips and more.

### Crafter Code Example
create elements on the fly with ease using the `dom` method!

```javascript

   let div = dom.div('div that haunts your dreams',{ class : 'fancy-div' , bind : 'model.hauntingDiv'})
   // div -> <div class="fancy-div" bind="model.hauntingDiv"> div that haunts your dreams </div>

   div.Click(evt => div.toggleClass('anim-wiggle'));

   div
   .prepend(dom.span().addClass('icon-haunting-div'}))
   .appendTo(document.body);
```

```javascript
  // WhenReady generates a promise when the DOM and WebComponents has loaded
  Craft.WhenReady.then(() => {

    queryEach('.menu-items',element => {
      On('click',element,ev => {
        dom('.page-view').append(dom.span('Hello!'))
      })
    });
    // or same thing differently
    On('.menu-items').Click(ev => dom('.page-view').append(dom.span('Hello!'));

    // Element Methods
    dom('.text').prepend('Prepend Some Text to an element').append('Append Text to Same Element');
    // make div , span and other elements via dom
    // add attributes with an object { title : 'x' , id : 'mydiv' }
    dom.div('New div',{ class : 'page-element'}) // -> `<div class="page-element">New div</div>`

    /* if your browser supports Proxy
     * then you may use this method to create elements that are not available by default in the dom object
    */
    // for hyphenated names use the square brackets and string notation
    dom['my-element']('inner html', { id : 'element-one', class : 'fancy-el'});
    // otherwise normal dot notation will work for more excentric tag names
    dom.address('2 mainstreet codeshire','class=address-fancy')

    // for less common elements or custom elements use dom.element
    // you could also add attributes URI style

    dom.element('aside','text to go inside','id=asidecontent&class=side-content');
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
      this
      .prepend( dom.h(3, this.news.headline) /* -> <h3>News Headling...</h3> */ )
      .append( dom.div(this.news.article) );

    },
    attr(name, oldValue , newValue) {
      // handle Attibute changes on the element
    },
    destroyed() {
      // executed when the element is no more
      // useful for stopping event listeners
    }
  });

  // You can add style to your custom element using the css property
  Craft.newComponent('check-box', {
      css : `
      check-box {
        box-sizing: border-box;
        position: relative;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        display: inline-block;
        width: 15px;
        height: 15px;
        line-height: 15px;
        margin: 0 2px;
        background: hsl(0, 0%, 90%);
        border: 1px solid silver;
        color: hsl(0, 0%, 30%);
        transition: all 100ms ease;
      }
      check-box[checked]:before {
        content: '✔';
      }
      check-box:hover {
        border: 1px solid #797979;
      }
      `,
      inserted() {
          this.check = this.Click(this.toggle.bind(this))
      },
      set_value(val) {
        this.toggleAttr('checked', val)
      },
      get_value() {
        return this.hasAttr('checked')
      },
      toggle(val) {
          this.value = is.Bool(val) ? val : !this.value
      },
      destroyed() {
          this.check.Off
      }
  });

```

#### Models and Views
Crafter.js allows the creation of scoped models to manipulate your app, models execute immediately then the views they return executes after the page has loaded

```javascript

  // Create models using Craft.model
  Craft.model('MyModel', scope => {
    scope.headline = 'New Headline , this Just in...';
    scope.articles = ['article1...','article2...','article3...','article4...','article5...'];


    // you can listen for changes on model scope variables
    scope.$set('newinfo',(key,value,object,isValueNew) => {
      if(isValueNew) console.log('new info recieved!')
    });

    scope.newinfo = 'I will change when there is new info';

  }).view(scope => {
    // do any dom manips or post DOM load code here
    dom.article('class=news-article').bind('MyModel.articles[2]').appendTo('div.news')
  })

  // You can assign to variables from the model scope via Craft.fromModel
  Craft.fromModel('MyModel').newinfo = 'a new piece of info!';

  // Easily access variables from a model's scope using Craft.fromModel
  Craft.fromModel('MyModel.headline') // -> 'New Headline , this Just in...'
  Craft.fromModel('MyModel.articles[3]') // -> 'article4...'
```

You can easily bind scope variables to the dom using the bind="ModelName.xyz" attribute and all your changes will reflect in the dom

```html
  <div class="news">
    <header bind='MyModel.headline' class='news'> New Headline , this Just in... </header>
    <article class="news-article"> article3... </article>
  </div>
```

#### EventHandling
  Event handeling has never been easier   On and Once are methods provided by Crafter.js to make Event Handling a breeze

  The EventHandlers can use either CSS selectors or Element variables to attatch listeners to   example
  `On('css-selector', ...) or On('css-selector', NodeToLookWithIn , ...)`

  these are the basic parameter layout options

```javascript

    // There are several .EventType methods for EventHandlers
    // it is most common to use it this way
    On(element).Click( handler_function )
    On('.widget').Mousemove( handler_function )

    //
    On('EventType','css-selector',OptionalNodeToRunCSSselectorOn , handler_function )

    // fullest example
    On(EventType, target_element_or_elements , parent_element /* optional */ , handler_function)
```

  an EventHandler always returns it self no matter how it's been accessed example

```javascript
  EventHandler.Off // -> EventHandler with .On , .Once , .Off and .Type methods
  EventHandler.On // -> EventHandler with .On , .Once , .Off and .Type methods
  EventHandler.Once // -> EventHandler with .On , .Once , .Off and .Type methods
```

  here's a simple example

```javascript
    let EventHandler = On('.css-class').Click(event => {
      // do something awesome when the element is clicked
    });

    EventHandler.Off; // turs off the listener
    EventHandler.On; // turs on the listener

    EventHandler.Type = 'mouseover'; // changes the type of event to listen for
```

  here's a more complex example

```javascript
    let NodeListEventHandler = On('mouseover,mouseout','.elements-in-list', evt => {
      // react to multiple event types with a single EventHandler
    });

    let NodeListEventHandler = On(['doubleclick','input'],DOMnode, evt => {
      // react to multiple event types with a single EventHandler
    });
```

#### Websocket example

```javascript

    // Craft a new socket , note the ws:// or wss:// and location is optional
    let Websocket = Craft.Socket('/socket');

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

```html
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
  Headline : 'New Headline , this Just in...',
  Article : `raw text article`
});
// The Changes will be instantly reflected in the DOM
News.Headline = 'New information, data-binding is a thing';

// you can change the output of any get by returning a value
News.$get('Article',(key,value,object) => {
  return dom.article(value);
});

// You can also optionally add change listeners for a specific property or properties
News.$set('Headline',(key,value,object) => {
  if(!Craft.tabActive) Craft.router.title = '(1) ' + document.title
});
```

If a bind does not exist it gets bound as a property of the gobal CraftScope Binds on `input` and `textarea` will set the property when the value changes

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
