# 

# addClass

Add a CSS class to the element

**Parameters**

-   `name` **string** of the class to add
-   `Class`  

# append

append text or a Node to the element

**Parameters**

-   `String` **Node or string** or Node to append to the this.element
-   `val`  

# appendTo

append the Element to another node using either a CSS selector or a Node

**Parameters**

-   `CSS` **Node or string** selector or Node to append the this.element to
-   `val`  
-   `within`  

# css

add CSS style rules to the Element or NodeList

**Parameters**

-   `styles` **object** should contain all the styles you wish to add example { borderWidth : '5px solid red' , float : 'right'}...

# div

creates a div element with the options provided

**Parameters**

-   `sets` **string** innerHTML of the div
-   `sets` **[string or Object]** div attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
-   `inner`  
-   `attr`  

# getRect

gets all the element's dimentions (width,height,left,top,bottom,right)

# getSiblings

gets all the elements siblings within it's parentNode

# gotClass

check if the element has got a specific CSS class

**Parameters**

-   `name` **string** of the class to check for
-   `Class`  

# hasAttr

checks if the element has a specific Attribute or Attributes

**Parameters**

-   `name` **string or boolean** of the Attribute or if true checks that it has some (||) of the attributes or if false checks that it has all of the attributes (&&)
-   `names` **...string** of attributes to check for
-   `attr`  
-   `attributes` **...** 

# Height

sets or gets the element's pixel height

**Parameters**

-   `pixel` **[string or number]** value to set
-   `pixels`  

# html

changes or returns the innerHTML value of a Node

**Parameters**

-   `sets` **[string]** the innerHTML value or when undefined gets the innerHTML value
-   `val`  
-   `position`  

# img

creates an img element with the options provided

**Parameters**

-   `sets` **string** src of the img
-   `sets` **string** alt of the img
-   `sets` **[string or Object]** p attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
-   `src`  
-   `alt`  
-   `attr`  

# label

creates a label element with the options provided

**Parameters**

-   `sets` **string** innerHTML of the label
-   `sets` **[string or Object]** label attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
-   `inner`  
-   `attr`  

# On

Listen for Events on the element or on all the elements in the NodeList

**Parameters**

-   `string` **string** indicating the type of event to listen for
-   `eventType`  
-   `func` **function** handler function for the event

Returns **** handler (Off,Once,On)

# p

creates a p (paragraph) element with the options provided

**Parameters**

-   `sets` **string** innerHTML of the p
-   `sets` **[string or Object]** p attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
-   `inner`  
-   `attr`  

# prepend

prepend text or a Node to the element

**Parameters**

-   `String` **Node or string** or Node to prepend to the this.element
-   `val`  

# query

performs a query inside the element

**Parameters**

-   `CSS` **string** selector
-   `selector`  

Returns **Node or Null** 

# queryAll

performs a queryAll inside the element

**Parameters**

-   `CSS` **string** selector
-   `selector`  

Returns **NodeList or Null** 

# replace

replaces a Node with another node provided as a parameter/argument

**Parameters**

-   `Node` **Node** to replace with
-   `val`  

# setAttr

Sets or adds an Attribute on the element

**Parameters**

-   `Name` **string** of the Attribute to add/set
-   `Value` **string** of the Attribute to add/set
-   `attr`  
-   `val`  

# span

creates a span element with the options provided

**Parameters**

-   `sets` **string** innerHTML of the span
-   `sets` **[string or Object]** span attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}
-   `inner`  
-   `attr`  

# stripAttr

removes a specific Attribute from the this.element

**Parameters**

-   `name` **...string** of the Attribute/s to strip

# stripClass

removes a specific CSS class from the element

**Parameters**

-   `name` **...string** of the class to strip

# text

changes or returns the textContent value of a Node

**Parameters**

-   `sets` **[string]** the textContent value or when undefined gets the textContent value
-   `val`  

# Width

sets or gets the element's pixel width

**Parameters**

-   `pixel` **[string or number]** value to set
-   `pixels`  

# is

is - Type Testing / Assertion

## Alphanumeric

Determine if a String contains only characters and numbers (alphanumeric)

**Parameters**

-   `str` **string** variable to test

## Arr

Test if something is an Array

**Parameters**

-   `args`  value/values to test

## Arraylike

Test if something is an Array-Like

**Parameters**

-   `args`  value/values to test

## Between

Determines whether a Number is between a maximum and a minimum

**Parameters**

-   `val` **Number** number value to test
-   `max` **Number** maximum to compare the value with
-   `min` **Number** minimum to compare the value with

Returns **Boolean** wether or not the value is between the max and min

## Blob

Determine if a variable is of Blob type

**Parameters**

-   `obj`  variable to test

## Bool

Test if something is a boolean type

**Parameters**

-   `val`  value to test

## bt

Determines if a number is BIGGER than another

**Parameters**

-   `val` **Number** value to test
-   `other` **Number** num to test with value

## bte

Determines if a number is BIGGER than or equal to another

**Parameters**

-   `val` **Number** value to test
-   `other` **Number** num to test with value

## Date

Determine if a variable is a Date type

**Parameters**

-   `variable` **...Any** to test

## dateString

Determines whether a String is a dateString

**Parameters**

-   `dateString` **string** variable to test

## Def

Determine whether a variable is in fact defined

**Parameters**

-   `args`  value/values to test

## Element

Determine if a variable is a HTMLElement

**Parameters**

-   `args`  value/values to test

## Email

Determines whether a String is a valid Email

**Parameters**

-   `email` **string** variable to test

## empty

Determine if a given collection or string is empty

**Parameters**

-   `val` **Object or Array or string** value to test if empty

## eq

Determines if two variables are equal

**Parameters**

-   `a`  first value to compare
-   `b`  second value to compare

## even

checks if a number is an even number

**Parameters**

-   `val`  variable / value to test

## False

Determine if a variable/s are false

**Parameters**

-   `args`  value/values to test

## File

Determine if a variable is a File Object

**Parameters**

-   `args`  value/values to test

## FormData

Determine if a variable is of a FormData type

**Parameters**

-   `args`  value/values to test

## Func

Determine if a variable is a function

**Parameters**

-   `args`  value/values to test

## future

Determines if a date is in the future

**Parameters**

-   `obj`  Date to test

## hexadecimal

Determines whether a String is hexadecimal

**Parameters**

-   `hexadecimal` **string** variable to test

## HexColor

Determines whether a String is a HEX-COLOR (#fff123)

**Parameters**

-   `HexColor` **string** variable to test
-   `hexColor`  

## int

checks if a number is an integer

**Parameters**

-   `val`  variable / value to test

## ip

Determines whether a String is a ip

**Parameters**

-   `ip` **string** variable to test

## ipv4

Determines whether a String is a ipv4

**Parameters**

-   `ipv4` **string** variable to test

## ipv6

Determines whether a String is a ipv6

**Parameters**

-   `ipv6` **string** variable to test

## Json

Determine if a sring is JSON

**Parameters**

-   `args`  value/values to test

## Lowercase

Determine if a String is LOWERCASE

**Parameters**

-   `char` **string** variable to test
-   `str`  

## lt

Determines if a number is LOWER than another

**Parameters**

-   `val` **Number** value to test
-   `other` **Number** num to test with value

## lte

Determines if a number is LOWER than or equal to another

**Parameters**

-   `val` **Number** value to test
-   `other` **Number** num to test with value

## Map

Determine if a variable is a Map

**Parameters**

-   `args`  value/values to test

## Native

Test if something is a Native JavaScript feature

**Parameters**

-   `val`  value to test

## negative

checks if a number is positive

**Parameters**

-   `val`  variable / value to test

## Node

Determine whether a variable is a DOM Node

**Parameters**

-   `args`  value/values to test

## NodeList

Determine whether a variable is a DOM NodeList or Collection of Nodes

**Parameters**

-   `args`  value/values to test

## Null

Determine whether a variable is null

**Parameters**

-   `args`  value/values to test

## Num

Determine if a variable is a Number

**Parameters**

-   `args` **...Any** value/values to test

## Object

Determine if a variable is an Object

**Parameters**

-   `args`  value/values to test

## odd

checks if a number is an odd number

**Parameters**

-   `val`  variable / value to test

## past

Determines if a date is in the past

**Parameters**

-   `obj`  Date to test

## positive

checks if a number is positive

**Parameters**

-   `val`  variable / value to test

## RegExp

Determine if a variable is a Regular Expression

**Parameters**

-   `obj`  variable to test

## Set

Determine if a variable is a Set

**Parameters**

-   `obj`  variable to test

## String

Test if something is a String

**Parameters**

-   `args`  value/values to test

## Symbol

Determine if a variable is a Symbol

**Parameters**

-   `obj`  variable to test

## Tag

Test an element's tagname

**Parameters**

-   `element` **Node** node to test
-   `tag` **string** tag to test node for

## time

Determines whether a String is a timeString

**Parameters**

-   `time`  variable to test

## today

checks wether a date is today

**Parameters**

-   `obj`  Date to test

## tomorrow

checks wether a date is tommorow

**Parameters**

-   `obj`  Date to test

## True

Determine if a variable/s are true

**Parameters**

-   `args`  value/values to test

## Undef

Determine whether a variable is undefined

**Parameters**

-   `args`  value/values to test

## Uppercase

Determine if a String is UPPERCASE

**Parameters**

-   `char` **string** variable to test
-   `str`  

## URL

Determines whether a String is a URL

**Parameters**

-   `url` **string** variable to test

## yesterday

checks wether a date is yesterday

**Parameters**

-   `obj`  Date to test

# Craft

Craft is Crafter.js's Core containing most functionality.

**Parameters**

-   `arr`  

## ArrtoObj

Converts an Array to an Object

**Parameters**

-   `arr` **Array** array to be converted

## createWebComponent

Part of Crafter.js's own WebComponent format (.wc) it takes a json object that contains .css and .js values then imports and executes them

**Parameters**

-   `webcomponent` **string** JSON string from Crafter.js's (.wc) WebComponent format
-   `src`  

## GenUID

similar to Craft.randomString in that it generates a unique string , in this case a Unique ID with random alphanumeric strings separated by hyphens
example 0ebf-c7d2-ef81-2667-08ef-4cde

## Import

Crafter.js resource loader for Scripts and Style sheets,
each import option is an object with properties like 'script/css/wc : "location" ' for resource url
other options include 'cache' - determines wether to cache the resource or not , 'test' : usefull for conditional imports if test is false the resource won't load or execute ,
'key' custom name to cache the resource in localStorage with instead of the resource location, 'defer' optionally load the script when the dom is loaded or load when it's ready,
{...object} args - Objects containing options for Script/CSS/WebComponent import

## newComponent

method for creating custom elements configuring their lifecycle's and inheritance
the config Object has 5 distinct options ( created , inserted , destroyed , attr and extends )
Craft.newComponent('custom-element',{
// note : inside each lifecycle method the "this" is a reference to the element being created -> this === element
   created : function () { ... }, // this method gets called when the custom-element is first instanciated
   inserted : function () { ... }, // this method gets called when the custom-element is first inserted into the DOM
   destroyed : function () { ... }, // this method gets called when the custom-element removed from the DOM (AKA. destroyed)
   attr : function (attributeChangedName , oldValue , newValue) { ... }, // attr method gets called when attributes are changed on the element
   extends : 'button' //tagName of element being inherited from should you want to
});

**Parameters**

-   `tag` **string** a hyphenated custom HTML tagname for the new element -> "custom-element"
-   `config` **object** Object containing all the element's lifecycle methods / extends and attached methods or properties

## randomString

method for generating random alphanumeric strings

## sameArray

Compares two arrays and determines if they are the same array

**Parameters**

-   `arr1` **Array** array one
-   `arr2` **Array** array two

## Socket

Handles WebSockets in a contained manner with send and recieve methods

**Parameters**

-   `address` **string** the WebSocket address example "ws://localhost:3000/" but the ws:// or wss:// is optional
-   `protocols` **[Array]** the protocols to pass to the WebSocket Connection

## strongPassword

Usefull method for validating passwords , example Craft.strongPassword('#MyFancyPassword18',8,true,true,"#") -> true requirements met

**Parameters**

-   `pass` **string** string containing the password
-   `length` **Number** Character length in numbers (Minimum password length)
-   `caps` **Boolean** Should the password contains Capital Letters
-   `number` **Boolean** should the password contain Numbers
-   `reasons` **Boolean** should the function return a short string explaining the reason exept when it's a pass then it gives a bool;
-   `includeChars` **...string** every extra argument should be a string containing a character you want the password to include

## toFormData

converts Objects or URL variable strings to a FormData object

**Parameters**

-   `val` **object or string** values to convert

## WhenReady

returns a promise when the DOM and WebComponents are all finished loading

**Parameters**

-   `func` **function** function to execute when the DOM and webcomponents are ready

# dom

Function that returns many useful methods for interacting with and manipulating the DOM or creating elements
in the absence of parameters the function will return methods for created elements

**Parameters**

-   `element` **[Node or NodeList or string]** optional Node, NodeList or CSS Selector that will be affected by the methods returned
-   `within` **[Node or string]** optional Node, NodeList or CSS Selector to search in for the element similar to query(element,within)
-   `one`  

# On

Starts listening for an EventType on the Target/Targets

**Parameters**

-   `EventType` **string** set the type of event to listen for example "click" or "scroll"
-   `Target` **Node or NodeList or window or document** the Event Listener's target , can be a NodeList to listen on multiple Nodes
-   `Func` **function** Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
-   `element`  
-   `func`  

Returns **** Off - when On is defined as a variable "var x = On(...)" it allows you to access all the EventHandler interfaces Off,Once,On

# Once

Starts listening for an EventType on the Target/Targets ONCE after triggering the Once event Listener will stop listening

**Parameters**

-   `EventType` **string** set the type of event to listen for example "click" or "scroll"
-   `Target` **Node or NodeList or window or document** the Event Listener's target , can be a NodeList to listen on multiple Nodes
-   `Func` **function** Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
-   `element`  
-   `func`  

Returns **** On,Off,Once - when Once is defined as a variable "var x = Once(...)" it allows you to access all the EventHandler interfaces Off,Once,On

# query

Easy way to get a DOM Node or Node within another DOM Node using CSS selectors

**Parameters**

-   `selector` **string** CSS selector to query the DOM Node with
-   `element` **[Node or string]** Optional Node or CSS selector to search within insead of document

# queryAll

Easy way to get a DOM NodeList or NodeList within another DOM Node using CSS selectors

**Parameters**

-   `selector` **string** CSS selector to query the DOM Nodes with
-   `element` **[Node or string]** Optional Node or CSS selector to search within insead of document

# queryEach

Easy way to loop through Nodes in the DOM using a CSS Selector or a NodeList

**Parameters**

-   `selector` **string or NodeList** CSS selector to query the DOM Nodes with or NodeList to iterate through
-   `element` **[Node or string]** Optional Node or CSS selector to search within insead of document
-   `func` **function** function called on each iteration -> "function( Element , index ) {...}"

# EventHandler

Event Handling Class

**Parameters**

-   `EventType` **string** set the type of event to listen for example "click" or "scroll"
-   `Target` **Node or NodeList or window or document** the Event Listener's target , can also be a NodeList to listen on multiple Nodes
-   `Func` **function** Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
-   `Within`  
-   `args` **...Any** extra optional arguments/parameters to pass to the handler function

Returns **** Interface On,Off,Once

## ChangeType

Change the Event type to listen for
{string} type - the name of the event to listen for

**Parameters**

-   `type`  

## Off

De-activates / turns off the EventHandler to stop listening for the EventType on the Target/Targets
can still optionally be re-activated with On again

## On

Activates the EventHandler to start listening for the EventType on the Target/Targets

## Once

Once the the Event has been triggered the EventHandler will stop listening for the EventType on the Target/Targets
the Handler function will be called only Once

# css

add CSS style rules to NodeList

**Parameters**

-   `styles` **object** should contain all the styles you wish to add example { borderWidth : '5px solid red' , float : 'right'}...

# CustomAttribute

Define a Handler for a Custom Attribute on the element

**Parameters**

-   `name` **string** what you call the attribute
-   `handle` **function** called on creation and changes, arguments  = (value, element, mutation)
-   `death` **[function]** called on removal of the attribute , arguments  = (mutation, observer, element)

# move

move the element using either css transforms or plain css possitioning

**Parameters**

-   `x` **string or num** x-axis position in pixels
-   `y` **string or num** y-axis position in pixels
-   `transform` **[boolean]** should move set the position using css transforms or not
-   `position` **[string]** set the position style of the element absolute/fixed...
-   `chainable` **[boolean]** should this method be chainable defaults to false for performance reasons

# removeAfter

Remove the element after a time in milliseconds

**Parameters**

-   `time` **[number]** time to wait before self destructing the element

# toggleAttr

Toggles an attribute on element , optionally add value when toggle is adding attribute

**Parameters**

-   `name` **string** name of the attribute to toggle
-   `val` **string** value to set attribute to
-   `returnState` **[boolean]** optionally return a bool witht the toggle state otherwise returns the element

# forEach

Easy way to loop through Collections and Objects

**Parameters**

-   `iterable` **Array or Object or NodeList** any collection that is either an Object or has a .length value
-   `func` **function** function called on each iteration -> "function( value , indexOrKey ) {...}"

# includes

Checks wether a Node is in the NodeList with either a refference to the Node or a CSS selector

**Parameters**

-   `Node` **Node or string** or CSS selector
-   `selector`  

# NodeOrQuerytoArr

Converts any Query/QueryAll to an Array of Nodes even if there is only one Node , this is error proof when no arguments are present it returns an empty array

**Parameters**

-   `val` **Node or NodeList or Array or String** pass either a CSS Selector string , Node/NodeList or Array of Nodes
-   `within` **Node or NodeList or Array or String** pass either a CSS Selector string , Node/NodeList or Array of Nodes to search for val in

# On

Listen for Events on the NodeList

**Parameters**

-   `string` **string** indicating the type of event to listen for
-   `eventType`  
-   `func` **function** handler function for the event

Returns **** handler (Off,Once,On)
