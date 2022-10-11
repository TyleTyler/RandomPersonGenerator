random.js
============

javascript random numbers and string generation library

### usage:

use it from your html page:

```
	<script type="text/javascript" src="random.js"></script>
```

or from a [node.js](nodejs.org) project

```
	// in your package.json
	dependencies: [
		"random.js": "0.1.0"
	]
	// in your js file
	var random = require('random')
```

### functions:

* `randomInt([options])`: _generate random integers_  
	* parameters:
		* `options:Object`
			* `min:Int`:  
			_the minimum value (default: `0`)_
			* `max:Int`:  
			_the maximum value (default: `4294967295`)_
	* returns: an integer between the min/max bounds

* `randomFloat([options])`: _generate random floats_
	* parameters:
		* `options:Object`:
			* `min:Float`:  
			_the minimum value (default: `0.0`)_
			* `max:Float`:  
			_the maximum value (default: `1.0`)_
	* returns an integer between the min/max bounds

* `randomString([options])`: _generate random strings_
	* parameters:
		* `options:Object`
			* `length:Int`:  
			_the length of the string to generate (default: `20`)_
			* `set:String`:  
			_one of `"alpha"` | `"numeric"` | `"alphanum"` | `"hex"` | `"custom"` (default: `"alphanum"`)_
			* `custom:String/Array<char>`:  
			_if `set` is `"custom"`, provides a set of characters used for the string generation_
			* returns a string containing random characters from the selected set of the given `length`
			* _note_: when generating hexadecimal strings, the alpha-characters are uppercase, use `.toLowerCase()` on the result to switch to lowercase