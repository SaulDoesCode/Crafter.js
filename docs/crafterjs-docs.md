# addClass

[src/Crafter.js:1134-1139](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1134-L1139 "Source code on GitHub")

Add a CSS class to the element

**Parameters**

-   `name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** of the class to add

# append

[src/Crafter.js:1009-1016](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1009-L1016 "Source code on GitHub")

append text or a Node to the element

**Parameters**

-   `String` **([Node](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)\|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))** or Node to append to the this.element

# appendTo

[src/Crafter.js:999-1003](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L999-L1003 "Source code on GitHub")

append the Element to another node using either a CSS selector or a Node

**Parameters**

-   `CSS` **([Node](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)\|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))** selector or Node to append the this.element to
-   `val`  
-   `within`  

# clone

[src/Crafter.js:993-993](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L993-L993 "Source code on GitHub")

replaces a Node with another node provided as a parameter/argument

**Parameters**

-   `Node` **[Node](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)** to replace with
-   `val`  

# css

[src/Crafter.js:1112-1118](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1112-L1118 "Source code on GitHub")

add CSS style rules to the Element or NodeList

**Parameters**

-   `styles` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** should contain all the styles you wish to add example { borderWidth : '5px solid red' , float : 'right'}...
-   `prop`  

# getRect

[src/Crafter.js:1252-1252](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1252-L1252 "Source code on GitHub")

gets all the element's dimentions (width,height,left,top,bottom,right)

# gotClass

[src/Crafter.js:1124-1126](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1124-L1126 "Source code on GitHub")

check if the element has got a specific CSS class

**Parameters**

-   `name` **...[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** of the class to check for

# hasAttr

[src/Crafter.js:848-851](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L848-L851 "Source code on GitHub")

checks if the element has a specific Attribute or Attributes

**Parameters**

-   `name` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)\|[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean))** of the Attribute or if true checks that it has some (||) of the attributes or if false checks that it has all of the attributes (&&)
-   `names` **...[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** of attributes to check for
-   `attr`  

# hasAttr

[src/Crafter.js:1179-1183](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1179-L1183 "Source code on GitHub")

checks if the element has a specific Attribute or Attributes

**Parameters**

-   `name` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)\|[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean))** of the Attribute or if true checks that it has some (||) of the attributes or if false checks that it has all of the attributes (&&)
-   `names` **...[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** of attributes to check for

# html

[src/Crafter.js:970-970](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L970-L970 "Source code on GitHub")

changes or returns the innerHTML value of a Node

**Parameters**

-   `sets` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** the innerHTML value or when undefined gets the innerHTML value

# img

[src/Crafter.js:732-735](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L732-L735 "Source code on GitHub")

creates an img element with the options provided

**Parameters**

-   `sets` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** src of the img
-   `sets` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** alt of the img
-   `sets` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)\|[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))=** p attributes with URL variable style string ("id=123&class=big-header") or Object with properties {id : 123 , class : 'big-header'}

# newSetGet

[src/Crafter.js:1258-1260](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1258-L1260 "Source code on GitHub")

sets or gets the element's pixel width

**Parameters**

-   `pixel` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)\|[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))=** value to set

# newSetGet

[src/Crafter.js:1268-1270](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1268-L1270 "Source code on GitHub")

sets or gets the element's pixel height

**Parameters**

-   `pixel` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)\|[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))=** value to set

# On

[src/Crafter.js:1068-1068](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1068-L1068 "Source code on GitHub")

Listen for Events on the element or on all the elements in the NodeList

**Parameters**

-   `string` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** indicating the type of event to listen for
-   `eventType`  
-   `func` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** handler function for the event

Returns **** handler (Off,Once,On)

# prepend

[src/Crafter.js:1022-1027](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1022-L1027 "Source code on GitHub")

prepend text or a Node to the element

**Parameters**

-   `String` **([Node](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)\|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))** or Node to prepend to the this.element

# query

[src/Crafter.js:1297-1297](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1297-L1297 "Source code on GitHub")

performs a query inside the element

**Parameters**

-   `CSS` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** selector
-   `selector`  

Returns **([Node](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)\|[Null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null))** 

# queryAll

[src/Crafter.js:1318-1318](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1318-L1318 "Source code on GitHub")

performs a queryAll inside the element

**Parameters**

-   `CSS` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** selector
-   `selector`  

Returns **([NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)\|[Null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null))** 

# replace

[src/Crafter.js:984-987](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L984-L987 "Source code on GitHub")

replaces a Node with another node provided as a parameter/argument

**Parameters**

-   `Node` **[Node](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)** to replace with
-   `val`  

# setAttr

[src/Crafter.js:870-884](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L870-L884 "Source code on GitHub")

Sets or adds an Attribute on the element

**Parameters**

-   `Name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** of the Attribute to add/set
-   `Value` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** of the Attribute to add/set
-   `attr`  
-   `val`  

# setAttr

[src/Crafter.js:1200-1208](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1200-L1208 "Source code on GitHub")

Sets or adds an Attribute on the element

**Parameters**

-   `Name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** of the Attribute to add/set
-   `Value` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** of the Attribute to add/set
-   `attr`  
-   `val`  

# stripAttr

[src/Crafter.js:1167-1172](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1167-L1172 "Source code on GitHub")

removes a specific Attribute from the this.element

**Parameters**

-   `name` **...[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** of the Attribute/s to strip

# stripAttr

[src/Crafter.js:834-841](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L834-L841 "Source code on GitHub")

removes a specific Attribute from the this.element

**Parameters**

-   `name` **...[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** of the Attribute/s to strip

# stripClass

[src/Crafter.js:1145-1150](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1145-L1150 "Source code on GitHub")

removes a specific CSS class from the element

**Parameters**

-   `name` **...[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** of the class to strip

# Text

[src/Crafter.js:978-978](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L978-L978 "Source code on GitHub")

changes or returns the textContent value of a Node

**Parameters**

-   `sets` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** the textContent value or when undefined gets the textContent value

# toggleClass

[src/Crafter.js:1157-1161](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1157-L1161 "Source code on GitHub")

Toggle a CSS class to the element

**Parameters**

-   `name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** of the class to add
-   `Class`  
-   `state` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)=** optionally toggle class either on or off with bool

# is

[src/Crafter.js:110-467](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L110-L467 "Source code on GitHub")

is - Type Testing / Assertion \*

## Alphanumeric

[src/Crafter.js:285-285](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L285-L285 "Source code on GitHub")

Determine if a String contains only characters and numbers (alphanumeric)

**Parameters**

-   `str` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** variable to test

## Args

[src/Crafter.js:255-255](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L255-L255 "Source code on GitHub")

Determine if a variable is of an arguments type

**Parameters**

-   `obj`  variables to test

## Arr

[src/Crafter.js:126-126](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L126-L126 "Source code on GitHub")

Test if something is an Array

**Parameters**

-   `args`  value/values to test

## Array

[src/Crafter.js:131-131](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L131-L131 "Source code on GitHub")

Array.isArray alias for convenience and performance when only one argument is present

**Parameters**

-   `val` **Any** value to test

## Arraylike

[src/Crafter.js:136-141](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L136-L141 "Source code on GitHub")

Test if something is an Array-Like

**Parameters**

-   `args`  value/values to test

## Between

[src/Crafter.js:380-380](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L380-L380 "Source code on GitHub")

Determines whether a Number is between a maximum and a minimum

**Parameters**

-   `val` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** number value to test
-   `max` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** maximum to compare the value with
-   `min` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** minimum to compare the value with

Returns **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** wether or not the value is between the max and min

## Blob

[src/Crafter.js:235-235](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L235-L235 "Source code on GitHub")

Determine if a variable is of Blob type

**Parameters**

-   `obj`  variable to test

## Bool

[src/Crafter.js:116-116](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L116-L116 "Source code on GitHub")

**Parameters**

-   `val`  value to test

## bt

[src/Crafter.js:437-437](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L437-L437 "Source code on GitHub")

Determines if a number is BIGGER than another

**Parameters**

-   `val` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** value to test
-   `other` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** num to test with value

## bte

[src/Crafter.js:443-443](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L443-L443 "Source code on GitHub")

Determines if a number is BIGGER than or equal to another

**Parameters**

-   `val` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** value to test
-   `other` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** num to test with value

## char

[src/Crafter.js:265-265](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L265-L265 "Source code on GitHub")

tests if a value is a single character

**Parameters**

-   `values` **...[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** to test

## Date

[src/Crafter.js:245-245](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L245-L245 "Source code on GitHub")

Determine if a variable is a Date type

**Parameters**

-   `variable` **...Any** to test

## dateString

[src/Crafter.js:372-372](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L372-L372 "Source code on GitHub")

Determines whether a String is a dateString

**Parameters**

-   `dateString` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** variable to test

## Def

[src/Crafter.js:153-153](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L153-L153 "Source code on GitHub")

Determine whether a variable is in fact defined

**Parameters**

-   `args`  value/values to test

## Element

[src/Crafter.js:200-200](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L200-L200 "Source code on GitHub")

Determine if a variable is a HTMLElement

**Parameters**

-   `args`  value/values to test

## Email

[src/Crafter.js:290-290](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L290-L290 "Source code on GitHub")

Determines whether a String is a valid Email

**Parameters**

-   `email` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** variable to test

## empty

[src/Crafter.js:448-453](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L448-L453 "Source code on GitHub")

Determine if a given collection or string is empty

**Parameters**

-   `val` **([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)\|[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))** value to test if empty

## eq

[src/Crafter.js:419-419](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L419-L419 "Source code on GitHub")

Determines if two variables are equal

**Parameters**

-   `a`  first value to compare
-   `b`  second value to compare

## even

[src/Crafter.js:390-390](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L390-L390 "Source code on GitHub")

checks if a number is an even number

**Parameters**

-   `val`  variable / value to test

## False

[src/Crafter.js:230-230](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L230-L230 "Source code on GitHub")

Determine if a variable/s are false

**Parameters**

-   `args`  value/values to test

## File

[src/Crafter.js:205-205](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L205-L205 "Source code on GitHub")

Determine if a variable is a File Object

**Parameters**

-   `args`  value/values to test

## FormData

[src/Crafter.js:210-210](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L210-L210 "Source code on GitHub")

Determine if a variable is of a FormData type

**Parameters**

-   `args`  value/values to test

## Func

[src/Crafter.js:220-220](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L220-L220 "Source code on GitHub")

Determine if a variable is a function

**Parameters**

-   `args`  value/values to test

## future

[src/Crafter.js:362-362](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L362-L362 "Source code on GitHub")

Determines if a date is in the future

**Parameters**

-   `obj`  Date to test

## hexadecimal

[src/Crafter.js:326-326](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L326-L326 "Source code on GitHub")

Determines whether a String is hexadecimal

**Parameters**

-   `hexadecimal` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** variable to test

## HexColor

[src/Crafter.js:306-306](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L306-L306 "Source code on GitHub")

Determines whether a String is a HEX-COLOR (#fff123)

**Parameters**

-   `HexColor` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** variable to test

## Input

[src/Crafter.js:466-466](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L466-L466 "Source code on GitHub")

Tests where a dom element is an input of some sort

## int

[src/Crafter.js:385-385](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L385-L385 "Source code on GitHub")

checks if a number is an integer

**Parameters**

-   `val`  variable / value to test

## ip

[src/Crafter.js:311-311](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L311-L311 "Source code on GitHub")

Determines whether a String is a ip

**Parameters**

-   `ip` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** variable to test

## ipv4

[src/Crafter.js:316-316](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L316-L316 "Source code on GitHub")

Determines whether a String is a ipv4

**Parameters**

-   `ipv4` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** variable to test

## ipv6

[src/Crafter.js:321-321](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L321-L321 "Source code on GitHub")

Determines whether a String is a ipv6

**Parameters**

-   `ipv6` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** variable to test

## Json

[src/Crafter.js:189-195](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L189-L195 "Source code on GitHub")

Determine if a sring is JSON

**Parameters**

-   `args`  value/values to test

## Lowercase

[src/Crafter.js:280-280](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L280-L280 "Source code on GitHub")

Determine if a String is LOWERCASE

**Parameters**

-   `char` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** variable to test

## lt

[src/Crafter.js:425-425](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L425-L425 "Source code on GitHub")

Determines if a number is LOWER than another

**Parameters**

-   `val` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** value to test
-   `other` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** num to test with value

## lte

[src/Crafter.js:431-431](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L431-L431 "Source code on GitHub")

Determines if a number is LOWER than or equal to another

**Parameters**

-   `val` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** value to test
-   `other` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** num to test with value

## Map

[src/Crafter.js:215-215](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L215-L215 "Source code on GitHub")

Determine if a variable is a Map

**Parameters**

-   `args`  value/values to test

## negative

[src/Crafter.js:405-405](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L405-L405 "Source code on GitHub")

checks if a number is positive

**Parameters**

-   `val`  variable / value to test

## Node

[src/Crafter.js:163-163](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L163-L163 "Source code on GitHub")

Determine whether a variable is a DOM Node

**Parameters**

-   `args`  value/values to test

## NodeList

[src/Crafter.js:174-174](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L174-L174 "Source code on GitHub")

Determine whether a variable is a DOM NodeList or Collection of Nodes

**Parameters**

-   `args`  value/values to test

## Null

[src/Crafter.js:158-158](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L158-L158 "Source code on GitHub")

Determine whether a variable is null

**Parameters**

-   `args`  value/values to test

## Num

[src/Crafter.js:179-179](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L179-L179 "Source code on GitHub")

Determine if a variable is a Number

**Parameters**

-   `args` **...Any** value/values to test

## Object

[src/Crafter.js:184-184](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L184-L184 "Source code on GitHub")

Determine if a variable is an Object

**Parameters**

-   `args`  value/values to test

## odd

[src/Crafter.js:395-395](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L395-L395 "Source code on GitHub")

checks if a number is an odd number

**Parameters**

-   `val`  variable / value to test

## positive

[src/Crafter.js:400-400](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L400-L400 "Source code on GitHub")

checks if a number is positive

**Parameters**

-   `val`  variable / value to test

## RegExp

[src/Crafter.js:240-240](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L240-L240 "Source code on GitHub")

Determine if a variable is a Regular Expression

**Parameters**

-   `obj`  variable to test

## Set

[src/Crafter.js:250-250](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L250-L250 "Source code on GitHub")

Determine if a variable is a Set

**Parameters**

-   `obj`  variable to test

## space

[src/Crafter.js:270-270](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L270-L270 "Source code on GitHub")

tests if a value is a space character

**Parameters**

-   `values` **...[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** to test

## String

[src/Crafter.js:121-121](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L121-L121 "Source code on GitHub")

Test if something is a String

**Parameters**

-   `args`  value/values to test

## Symbol

[src/Crafter.js:260-260](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L260-L260 "Source code on GitHub")

Determine if a variable is a Symbol

**Parameters**

-   `obj`  variables to test

## Tag

[src/Crafter.js:169-169](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L169-L169 "Source code on GitHub")

Test an element's tagname

**Parameters**

-   `element` **[Node](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)** node to test
-   `tag` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** tag to test node for

## time

[src/Crafter.js:367-367](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L367-L367 "Source code on GitHub")

Determines whether a String is a timeString

**Parameters**

-   `time`  variable to test

## today

[src/Crafter.js:331-331](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L331-L331 "Source code on GitHub")

checks wether a date is today

**Parameters**

-   `obj`  Date to test

## True

[src/Crafter.js:225-225](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L225-L225 "Source code on GitHub")

Determine if a variable/s are true

**Parameters**

-   `args`  value/values to test

## Uppercase

[src/Crafter.js:275-275](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L275-L275 "Source code on GitHub")

Determine if a String is UPPERCASE

**Parameters**

-   `char` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** variable to test

# Craft

[src/Crafter.js:1516-2384](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1516-L2384 "Source code on GitHub")

Craft is Crafter.js's Core containing most functionality.

## GenUID

[src/Crafter.js:2308-2308](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L2308-L2308 "Source code on GitHub")

similar to Craft.randomString in that it generates a unique string , in this case a Unique ID with random alphanumeric strings separated by hyphens
example 0ebf-c7d2-ef81-2667-08ef-4cde

**Parameters**

-   `len` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)=** optional length of uid sections

## randomString

[src/Crafter.js:2302-2302](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L2302-L2302 "Source code on GitHub")

method for generating random alphanumeric strings

## toArr

[src/Crafter.js:1563-1563](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1563-L1563 "Source code on GitHub")

Convert Arraylike variables to Array
{...\*} val - arraylike variable to convert to array

## toInt

[src/Crafter.js:1568-1568](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1568-L1568 "Source code on GitHub")

Convert numbers to integers
{number|string} val - number to convert to an integer

## URLfrom

[src/Crafter.js:1688-1688](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1688-L1688 "Source code on GitHub")

Converts any text to an inline URL code (good for images , svg , scripts or css)

**Parameters**

-   `string`  content to convert to an inline URL

# dom

[src/Crafter.js:1370-1385](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1370-L1385 "Source code on GitHub")

Function that returns many useful methods for interacting with and manipulating the DOM or creating elements
in the absence of parameters the function will return methods for created elements

**Parameters**

-   `element` **([Node](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)\|[NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)\|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))=** optional Node, NodeList or CSS Selector that will be affected by the methods returned
-   `within` **([Node](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)\|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))=** optional Node, NodeList or CSS Selector to search in for the element similar to query(element,within)
-   `one` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)=** even if there are more than one elements matching a selector only return the first one

# forEach

[src/Crafter.js:474-486](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L474-L486 "Source code on GitHub")

Easy way to loop through Collections and Objects and Numbers as well

**Parameters**

-   `iterable` **([Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\|[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)\|[NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)\|[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))** any collection that is either an Object or has a .length value
-   `func` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** function called on each iteration -> "function( value , indexOrKey ) {...}"

# On

[src/Crafter.js:680-680](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L680-L680 "Source code on GitHub")

Starts listening for an EventType on the Target/Targets

**Parameters**

-   `EventType` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** set the type of event to listen for example "click" or "scroll"
-   `Target` **([Node](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)\|[NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)\|[window](https://developer.mozilla.org/en-US/docs/Web/API/Window)\|[document](https://developer.mozilla.org/en-US/docs/Web/JavaScript))** the Event Listener's target , can be a NodeList to listen on multiple Nodes
-   `Func` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"

Returns **** Off - when On is defined as a variable "var x = On(...)" it allows you to access all the EventHandler interfaces Off,Once,On

# Once

[src/Crafter.js:689-689](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L689-L689 "Source code on GitHub")

Starts listening for an EventType on the Target/Targets ONCE after triggering the Once event Listener will stop listening

**Parameters**

-   `EventType` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** set the type of event to listen for example "click" or "scroll"
-   `Target` **([Node](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)\|[NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)\|[window](https://developer.mozilla.org/en-US/docs/Web/API/Window)\|[document](https://developer.mozilla.org/en-US/docs/Web/JavaScript))** the Event Listener's target , can be a NodeList to listen on multiple Nodes
-   `Func` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"

Returns **** On,Off,Once - when Once is defined as a variable "var x = Once(...)" it allows you to access all the EventHandler interfaces Off,Once,On

# query

[src/Crafter.js:592-595](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L592-L595 "Source code on GitHub")

Easy way to get a DOM Node or Node within another DOM Node using CSS selectors

**Parameters**

-   `selector` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** CSS selector to query the DOM Node with
-   `element` **([Node](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)\|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))=** Optional Node or CSS selector to search within insead of document

# queryAll

[src/Crafter.js:602-616](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L602-L616 "Source code on GitHub")

Easy way to get a DOM NodeList or NodeList within another DOM Node using CSS selectors

**Parameters**

-   `selector` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** CSS selector to query the DOM Nodes with
-   `element` **([Node](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)\|[NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)\|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))=** Optional Node or CSS selector to search within insead of document

# queryEach

[src/Crafter.js:624-629](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L624-L629 "Source code on GitHub")

Easy way to loop through Nodes in the DOM using a CSS Selector or a NodeList

**Parameters**

-   `selector` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)\|[NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)\|[Node](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling))** CSS selector to query the DOM Nodes with or NodeList to iterate through
-   `element` **([Node](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)\|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))=** Optional Node or CSS selector to search within insead of document
-   `func` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** function called on each iteration -> "function( Element , index ) {...}"
-   `returnList` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)=** should queryEach also return the list of nodes

# array

[src/Crafter.js:1590-1598](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1590-L1598 "Source code on GitHub")

Generates arrays of a set length , with values or values generated from functions

**Parameters**

-   `len` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the integer length of the array to be generated
-   `val` **...([function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)|Any)** value to set at each index , multiple value params after lenth will generate nested 2d arrays

# arrDiff

[src/Crafter.js:1525-1541](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1525-L1541 "Source code on GitHub")

Returns an object or calls a function with all the differences between two arrays

**Parameters**

-   `arr` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** array to be compared
-   `newArr` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** second array to be compared
-   `func` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)=** optional function that recieves all the info as parameters

# clone

[src/Crafter.js:1711-1713](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1711-L1713 "Source code on GitHub")

Simply clones/duplicates any object or array/arraylike object

**Parameters**

-   `val` **([Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\|[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))** array or object to be cloned

Returns **([Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\|[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))** cloned result

# concatObjects

[src/Crafter.js:1697-1702](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1697-L1702 "Source code on GitHub")

Method to merge the properties of multiple objects , it can handle getters or setters without breaking them

**Parameters**

-   `host` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** main object to merge with all subsequent objects
-   `objs` **...[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** other objects to be merged with host object

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** resulting object after merges

# cutdot

[src/Crafter.js:1550-1550](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1550-L1550 "Source code on GitHub")

Splits a string at dots "."

**Parameters**

-   `str` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** string to split at the dots

# flatten

[src/Crafter.js:1620-1620](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1620-L1620 "Source code on GitHub")

Flattens any multidimentional array or arraylike object

**Parameters**

-   `arr` **([Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)|Arraylike)** multidimentional array(like) object to flatten

# forEachDeep

[src/Crafter.js:1671-1683](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1671-L1683 "Source code on GitHub")

forEachDeep is used to loop through any multi layered object - (flattens and loops through all enumerable properties in a given object)

**Parameters**

-   `obj` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** the object to loop through
-   `object`  
-   `fn` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** function to handle each iteration
-   `path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** string to reference value by simple dot notation

**Examples**

```javascript
Craft.forEachDeep({ a : 1 , b : { c : 2}}, (value , key , object, currentPath) => { console.log(key) })
```

# getAllKeys

[src/Crafter.js:1606-1612](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1606-L1612 "Source code on GitHub")

Gets all the property keys in any object even the hiden ones

**Parameters**

-   `obj` **Any** object to list keys fromModel

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** array containing all the property keys

# getDeep

[src/Crafter.js:1629-1638](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1629-L1638 "Source code on GitHub")

Gets a value from inside an object using a reference string

**Parameters**

-   `obj` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** the object to extract values from
-   `path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** string to reference value by simple dot notation or array refference example Craft.getDeep({ a : { b : [1,2,3] }},"a.b[2]") -> 3

**Examples**

```javascript
Craft.getDeep(myObj,'Company.employees[16].person.name') -> Mr Smithers or Craft.getDeep(anObj,'Colony.Queen.brood') -> [...ants]
```

# joindot

[src/Crafter.js:1557-1557](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1557-L1557 "Source code on GitHub")

joins a string array with dots "."

**Parameters**

-   `arr` **([Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)|Arraylike)** array to join with dots

# omit

[src/Crafter.js:1739-1746](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1739-L1746 "Source code on GitHub")

Omits values from Objects or Arrays

**Parameters**

-   `val` **([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)\|[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array))** object from which things may be omitted
-   `args` **...Any** things to omit from Object or Array

Returns **([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)\|[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array))** 

# sameArray

[src/Crafter.js:1576-1582](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1576-L1582 "Source code on GitHub")

Compares two arrays and determines if they are the same array

**Parameters**

-   `arr1` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** array one
-   `arr2` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** array two

# setDeep

[src/Crafter.js:1648-1661](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1648-L1661 "Source code on GitHub")

Craft.setDeep  is similar to getDeep it uses a string to reference to a value

**Parameters**

-   `obj` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** the object to set values on
-   `path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** string to reference value by simple dot notation
-   `value` **Any** value to set
-   `val`  
-   `robj` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** should the function return the object

# css

[src/Crafter.js:792-801](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L792-L801 "Source code on GitHub")

add CSS style rules to NodeList

**Parameters**

-   `styles` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** should contain all the styles you wish to add example { borderWidth : '5px solid red' , float : 'right'}...

# On

[src/Crafter.js:787-787](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L787-L787 "Source code on GitHub")

Listen for Events on the NodeList

**Parameters**

-   `string` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** indicating the type of event to listen for
-   `eventType`  
-   `func` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** handler function for the event

Returns **** handler (Off,Once,On)

# toggleAttr

[src/Crafter.js:858-863](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L858-L863 "Source code on GitHub")

Toggles an attribute on element , optionally add value when toggle is adding attribute

**Parameters**

-   `name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** name of the attribute to toggle
-   `val` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** value to set attribute to
-   `rtst` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)=** optionally return a bool witht the toggle state otherwise returns the element

# customAttr

[src/Crafter.js:2232-2255](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L2232-L2255 "Source code on GitHub")

defines custom attributes

**Parameters**

-   `name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the name of your custom attribute
-   `handle` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** a function to handle how your custom attribute behaves

**Examples**

```javascript
Craft.customAttr('turngreen', element => element.css({ background : 'green'}));
```

# document

[src/Crafter.js:7-2488](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L7-L2488 "Source code on GitHub")

**Meta**

-   **author**: Saul van der Walt - https&#x3A;//github.com/SaulDoesCode/
-   **license**: MIT

# Dom

[src/Crafter.js:715-770](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L715-L770 "Source code on GitHub")

Contains several methods for Element Creation

# dp

[src/Crafter.js:520-534](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L520-L534 "Source code on GitHub")

Change the Event type to listen for
{string} type - the name of the event/s to listen for

# dp

[src/Crafter.js:573-583](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L573-L583 "Source code on GitHub")

Once the the Event has been triggered the EventHandler will stop listening for the EventType on the Target/Targets
the Handler function will be called only Once

# dp

[src/Crafter.js:538-550](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L538-L550 "Source code on GitHub")

Activates the EventHandler to start listening for the EventType on the Target/Targets

# dp

[src/Crafter.js:555-567](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L555-L567 "Source code on GitHub")

De-activates / turns off the EventHandler to stop listening for the EventType on the Target/Targets
can still optionally be re-activated with On again

# EventHandler

[src/Crafter.js:505-585](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L505-L585 "Source code on GitHub")

Event Handler

**Parameters**

-   `EventType` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** set the type of event to listen for example "click" or "scroll"
-   `Target` **([Node](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)\|[NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)\|[window](https://developer.mozilla.org/en-US/docs/Web/API/Window)\|[document](https://developer.mozilla.org/en-US/docs/Web/JavaScript))** the Event Listener's target , can also be a NodeList to listen on multiple Nodes
-   `Func` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Handler function that will be called when the event is triggered -> "function( event , event.srcElement ) {...}"
-   `func`  
-   `Within`  

Returns **** Interface On,Off,Once

# getAttr

[src/Crafter.js:1213-1213](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1213-L1213 "Source code on GitHub")

Gets the value of an attribute , short alias for element.getAttribute
{string} attr - name of attribute to get

# hide

[src/Crafter.js:1218-1220](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1218-L1220 "Source code on GitHub")

Hides and element by setting display none

# move

[src/Crafter.js:1279-1290](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1279-L1290 "Source code on GitHub")

move the element using either css transforms or plain css possitioning

**Parameters**

-   `x` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|num)** x-axis position in pixels
-   `y` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)|num)** y-axis position in pixels
-   `transform` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)=** should move set the position using css transforms or not
-   `position` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=** set the position style of the element absolute/fixed...
-   `chainable` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)=** should this method be chainable defaults to false for performance reasons

# removeAfter

[src/Crafter.js:1233-1238](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1233-L1238 "Source code on GitHub")

Remove the element after a time in milliseconds

**Parameters**

-   `time` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)=** time to wait before self destructing the element

# show

[src/Crafter.js:1225-1227](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1225-L1227 "Source code on GitHub")

Shows and element by setting display none

**Parameters**

-   `mode`  

# toggleAttr

[src/Crafter.js:1190-1193](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1190-L1193 "Source code on GitHub")

Toggles an attribute on element , optionally add value when toggle is adding attribute

**Parameters**

-   `name` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** name of the attribute to toggle
-   `val` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** value to set attribute to
-   `rtst` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)=** optionally return a bool witht the toggle state otherwise returns the element

# Import

[src/Crafter.js:1795-1811](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1795-L1811 "Source code on GitHub")

Crafter.js resource loader for Scripts and Style sheets,
each import option is an object with properties like 'script/css/wc : "location" ' for resource url
other options include 'cache' - determines wether to cache the resource or not , 'test' : usefull for conditional imports if test is false the resource won't load or execute ,
'key' custom name to cache the resource in localStorage with instead of the resource location, 'defer' optionally load the script when the dom is loaded or load when it's ready,
{...object} args - Objects containing options for Script/CSS/WebComponent import

**Parameters**

-   `Imports` **...[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Objects containing the properties neccesarry to import a resource

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** returns a promise after importing the resource

# Native

[src/Crafter.js:458-461](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L458-L461 "Source code on GitHub")

Test if something is a Native JavaScript feature

**Parameters**

-   `val`  value to test

# neither

[src/Crafter.js:411-413](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L411-L413 "Source code on GitHub")

tests that all parameters following the first are not the same as the first

**Parameters**

-   `value` **Any** inital value to compare all other params with
-   `arguments` **...Any** to compare with value

# newComponent

[src/Crafter.js:2315-2357](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L2315-L2357 "Source code on GitHub")

method for creating custom elements configuring their lifecycle's and inheritance
the config Object has 7 distinct options ( created , inserted , destroyed , attr, css, set_X and get_X )

**Parameters**

-   `tag` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** a hyphenated custom HTML tagname for the new element -> "custom-element"
-   `config` **[object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Object containing all the element's lifecycle methods / extends and attached methods or properties

# NodeOrQuerytoArr

[src/Crafter.js:493-496](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L493-L496 "Source code on GitHub")

Converts any Query/QueryAll to an Array of Nodes even if there is only one Node , this is error proof when no arguments are present it returns an empty array

**Parameters**

-   `val` **([Node](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)\|[NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)\|[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\|[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))** pass either a CSS Selector string , Node/NodeList or Array of Nodes
-   `within` **([Node](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)\|[NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)\|[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\|[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))** pass either a CSS Selector string , Node/NodeList or Array of Nodes to search for val in

# past

[src/Crafter.js:352-357](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L352-L357 "Source code on GitHub")

Determines if a date is in the past

**Parameters**

-   `obj`  Date to test

# Socket

[src/Crafter.js:1894-1957](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L1894-L1957 "Source code on GitHub")

Handles WebSockets in a contained manner with send and recieve methods

**Parameters**

-   `address` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the WebSocket address example "ws://localhost:3000/" but the ws:// or wss:// is optional
-   `protocols` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)=** the protocols to pass to the WebSocket Connection

# strongPassword

[src/Crafter.js:2281-2294](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L2281-L2294 "Source code on GitHub")

Usefull method for validating passwords , example Craft.strongPassword('#MyFancyPassword18',8,true,true,"#") -> true requirements met

**Parameters**

-   `pass` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** string containing the password
-   `length` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Character length in numbers (Minimum password length)
-   `caps` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Should the password contains Capital Letters
-   `number` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** should the password contain Numbers
-   `reasons` **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** should the function return a short string explaining the reason exept when it's a pass then it gives a bool;
-   `includeChars` **...[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** every extra argument should be a string containing a character you want the password to include

# tco

[src/Crafter.js:2081-2093](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L2081-L2093 "Source code on GitHub")

Tail Call Optimization for recursive functional functions

**Parameters**

-   `fn`  function that uses recursion inside

# toFormData

[src/Crafter.js:2144-2155](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L2144-L2155 "Source code on GitHub")

converts Objects or URL variable strings to a FormData object

**Parameters**

-   `val` **([object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)\|[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))** values to convert

# tomorrow

[src/Crafter.js:344-347](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L344-L347 "Source code on GitHub")

checks wether a date is tommorow

**Parameters**

-   `obj`  Date to test

# Undef

[src/Crafter.js:146-148](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L146-L148 "Source code on GitHub")

Determine whether a variable is undefined

**Parameters**

-   `args`  value/values to test

# URL

[src/Crafter.js:295-301](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L295-L301 "Source code on GitHub")

Determines whether a String is a URL

**Parameters**

-   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** variable to test

# WhenReady

[src/Crafter.js:2166-2180](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L2166-L2180 "Source code on GitHub")

returns a promise when the DOM and WebComponents are all finished loading

Returns **[promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** when everything is done loading WhenReady will return a promise

# yesterday

[src/Crafter.js:336-339](https://github.com/SaulDoesCode/Crafter.js/blob/d7921ec143c09e078a07436465d012b05ab29352/src/Crafter.js#L336-L339 "Source code on GitHub")

checks wether a date is yesterday

**Parameters**

-   `obj`  Date to test
