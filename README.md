# Crafter.js

a Toolkit for the Modern Web

note Crafter.js is still a work in progress! feel free to explore, fork, contribute or offer constructive criticism, it would be much appreciated :+1:.

## Crafter.js makes use of

- Promises
- Fetch API
- Proxy (optional)
- ES6 Syntax
- ES6 Classes
- WebComponents

Crafter.js also uses Babel to ensure compatibility on older browsers

## Crafter.js offers

- DOM Manipulation
- Observe elements and react to changes
- Event emitter system
- Models/Controllers
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
- loader functions for Scripts, Style sheets and fonts
- Front End Router
- Easy to use Event Handling system with features such as .on , .off , .once , .Type
- Shorthand functions such as forEach, query/queryAll/queryEach
- Methods for units of getting time in milliseconds , Craft.millis.days(4)
- WhenReady method to execute code after everything has loaded

### The CrafterWidgets extension

adds several useful CSS classes and effects such as grids, ripple effects, sidebar , notifications , custom context menus, tooltips and more.

### Crafter Code Example

create elements on the fly with ease using the `dom` method!

#### at the top of your script use destructuring to

#### deglove usefull methods and features from the Craft object

```javascript
  const {dom,queryEach,on} = Craft;
```

Create and Use Custom Attributes AKA directives

```javascript
  Craft.directive('custom-attrib',{
    // called when the directive is attached or discovered
    bind(element,value,oldvalue) {
      console.log('custom-attrib added to:',this,value);
    },
    // called when the directive is changed
    update(element,value,oldvalue) {
      console.log('custom-attrib changed on:',this,value);
    },
    // called when the directive is removed
    unbind(element,value,oldvalue) {
      console.log('custom-attrib removed from:',this);
    },
  })
```

and in the dom

```html
  <div custom-attrib>I have a custom attribute</div>
```

```javascript

   const div = dom.div('div that haunts your dreams',{ class : 'fancy-div' , bind : 'model.hauntingDiv'});
   // div -> <div class="fancy-div" bind="model.hauntingDiv"> div that haunts your dreams </div>

   div.Click(evt => div.toggleClass('anim-wiggle'));

   div
   .prepend(dom.span().addClass('icon-haunting-div'}))
   .appendTo(document.body);
```

#### Using Crafter.js Models

Crafter.js allows the creation of scoped models to manipulate your app, models execute immediately then the views they return executes after the page has loaded

```javascript
  const {dom} = Craft;
  // Create models using Craft.model
  // Craft.model( name , object )
  Craft.model('MyModel', {
      init(scope) {

        scope.headline = 'New Headline , this Just in...';
        scope.articles = ['article1...','article2...','article3...','article4...','article5...'];


        // you can listen for changes on model scope variables
        scope.$set('newinfo',(key,value,object,isValueNew) => {
          if(isValueNew) console.log('new info recieved!')
        });

        // if your browser does not support Proxy and Reflect
        // you'd have to use ember observable style accessors
        // .get(key) and .set(key,val)
        scope.set('newinfo','I will change when there is new info');

        console.log(this === scope);
      },
      load() {
        const scope = this;
        // do any dom manips or post DOM load code here

        // create article element with class news-article,
        // bind it then append it to a <div class="news">...</div>
        dom.article('class=news-article').bind('MyModel.articles[2]').appendTo('div.news');
      }
  });

  // You can assign to variables from the model scope via Craft.M
  Craft.M('MyModel.newinfo','a new piece of info!');
  // this is also possible
  // however if proxy and reflect is not available in your browser
  Craft.M('MyModel').newinfo = 'a new piece of info!';
  // then you'd have to use the .set(key,val) method
  Craft.M('MyModel').set('newinfo','a new piece of info!');

  // Easily access variables from a model's scope using Craft.M
  Craft.M('MyModel.headline'); // -> 'New Headline , this Just in...'
  Craft.M('MyModel.articles[3]'); // -> 'article4...'
  // you may also use Craft.M to set values
  Craft.M('MyModel.headline','New Headline');
  Craft.M('MyModel.articles[3]','new article');
```

You can easily bind scope variables to the dom using the bind="ModelName.xyz" attribute and all your changes will reflect in the dom

```html
  <div class="news">
    <header bind='MyModel.headline' class='news'> New Headline , this Just in... </header>
    <article class="news-article"> article3... </article>
  </div>
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
News.$get('Article',(key,value,object) => dom.article(value));

// You can also optionally add change listeners for a specific property or properties
News.$set('Headline',(key,value,object) => {
  if(!Craft.tabActive) Craft.router.title = '(1) ' + document.title
});
```

If a bind does not exist it gets bound as a property of the gobal CraftScope Binds on inputs will set the property when the value changes

```html
<textarea bind="truestory">
  All Changes gets reflected instantly
</textarea>

<article bind="truestory">
  All Changes gets reflected instantly
</article>
```

```javascript
  // WhenReady generates a promise when the DOM and WebComponents has loaded
  Craft.WhenReady.then(() => {

    queryEach('.menu-items',element => {
      on('click',element,ev => {
        dom('.page-view').append(dom.span('Hello!'))
      })
    });
    // or same thing differently
    on('.menu-items').Click(ev => dom('.page-view').append(dom.span('Hello!'));

    // Element Methods
    dom('.text').prepend('Prepend Some Text to an element').append('Append Text to Same Element');
    // make div , span and other elements via dom
    // add attributes with an object { title : 'x' , id : 'mydiv' }
    dom.div('New div',{ class : 'page-element'}) // -> `<div class="page-element">New div</div>`

    // if your browser supports Proxy
    // then you may use this method to create elements that are not available by default in the Craft.dom object
    // for hyphenated names use square bracket string notation
    dom['my-element']('inner html goes here', { id : 'element-one', class : 'fancy-el'});
    // otherwise normal dot notation will work for more excentric tag names
    dom.address('2 mainstreet codeshire','class=address-fancy')

    // for less common elements or custom elements use dom.element
    // when Proxy is not available in your browser
    // you could also add attributes URI style for brevity
    dom.element('figcaption','description of some sort','id=figure-three&class=fig-description');
    // -> <aside id="aside2" class="side-content"> text to go inside </aside>

    // for hirarchies arrays with elements or strings are also accepted
    dom.table([
      dom.tr([
        dom.td('Row 1, Column 1'),
        dom.td('Row 1, Column 2')
      ]),
      dom.tr([
        dom.td('Row 2, Column 1'),
        dom.td('Row 2, Column 2')
      ])
    ]);

  });
```

import views using some of the built in directives in Crafter.js

```html
  <article importview="/views/article.html" class="fancy-article"></article>
```

or do it in code using dom methods

```javascript
  dom('article.fancy-article').importview('/views/article.html');
```

#### Custom Elements

Create a new Custom Element using the Craft.newComponent method

```javascript
  // has to be a hyphenated tag name
  Craft.newComponent('news-element', class {
  // optionally manage each stage of the element's lifecycle
    created() {
      // hypothetically fetch a news article
      fetch('/news/latest-article')
      .then(response => response.json())
      .then(news => this.news = news);
    }

    inserted() {
      // when the news-element is insterted fill it with content
      this
      .prepend( dom.h(3, this.news.headline) /* -> <h3>News Headling...</h3> */ )
      .append( dom.div(this.news.article) );

    }

    attr(name, value , oldvalue, hasAttr) {
      // handle Attibute changes on the element
    }

    destroyed() {
      // executed when the element is no more
      // useful for stopping event listeners
    }
  });
```

example using an plain object

```javascript
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
      }`,
      inserted() {
          this.check = this.Click(this.toggle.bind(this))
      },
      // to add getters or setters to the element
      // use underscores otherwise the getters and setters
      // are local to the config object
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
          this.check.off
      }
  });
```

#### EventHandling

Event handeling has never been easier on and once are methods provided by Crafter.js to make Event Handling a breeze

The EventHandlers can use either CSS selectors or Element variables to attatch listeners to example `on('css-selector', ...) or on('css-selector', NodeToLookWithIn , ...)`

these are the basic parameter layout options

```javascript
    let {on} = Craft;
    // There are several .EventType methods for EventHandlers
    // it is most common to use it this way
    on(element).Click( handler_function )
    on('.widget').Mousemove( handler_function )

    //
    on('EventType','css-selector',OptionalNodeToRunCSSselectoron , handler_function )

    // fullest example
    on(EventType, target_element_or_elements , parent_element /* optional */ , handler_function)
```

an EventHandler always returns it self no matter how it's been accessed example

```javascript
  EventHandler.off // -> EventHandler with .on , .once , .off and .Type methods
  EventHandler.on // -> EventHandler with .on , .once , .off and .Type methods
  EventHandler.once // -> EventHandler with .on , .once , .off and .Type methods
```

here's a simple example

```javascript
    let EventHandler = Craft.on('.css-class').Click(event => {
      // do something awesome when the element is clicked
    });

    EventHandler.off; // turs off the listener
    EventHandler.on; // turs on the listener

    EventHandler.Type = 'mouseover'; // changes the type of event to listen for
```

here's a more complex example

```javascript
    let NodeListEventHandler = on('mouseover,mouseout','.elements-in-list', evt => {
      // react to multiple event types with a single handler
    });

    let NodeListEventHandler = on(['doubleclick','input'],DOMnode, evt => {
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
    Ws.recieve = message => {
      MessageScope.msg = message;
    }

    // Sync the value of the Input to the WebSocket
    Craft.dom("input").SyncInput(Websocket,'send');
```

Display the Websocket messages in the dom

```html
  <div bind='MessageScope.msg'> </div>

  <input type='text'>
```

#### TODO

- DOCUMENTATION!!!
- Feature standardisation
- Fully featured CSS / Widgets library
- More WebComponents

#### MIT LICENSE
