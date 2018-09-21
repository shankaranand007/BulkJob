/*****************************************************************************************************
* 	Filename	: bmgeneric.js	
*	Author		: Sathrak Paldurai K
*	Date		: 12-June-2017								
*	Description	: File contains generic functions which are exported to call other node chat files  
******************************************************************************************************/
	/*************************************************************************************	
	
				php predefined functions like in node js functions - Start 
				
	*************************************************************************************/
	function htmlspecialchars (string, quoteStyle, charset, doubleEncode) {
	  //        example 1: htmlspecialchars("<a href='test'>Test</a>", 'ENT_QUOTES')
	  //        returns 1: '&lt;a href=&#039;test&#039;&gt;Test&lt;/a&gt;'
	  //        example 2: htmlspecialchars("ab\"c'd", ['ENT_NOQUOTES', 'ENT_QUOTES'])
	  //        returns 2: 'ab"c&#039;d'
	  //        example 3: htmlspecialchars('my "&entity;" is still here', null, null, false)
	  //        returns 3: 'my &quot;&entity;&quot; is still here'
	  var optTemp = 0
	  var i = 0
	  var noquotes = false
	  if (typeof quoteStyle === 'undefined' || quoteStyle === null) {
		quoteStyle = 2
	  }
	  string = string || ''
	  string = string.toString()
	  if (doubleEncode !== false) {
		// Put this first to avoid double-encoding
		string = string.replace(/&/g, '&amp;')
	  }
	  string = string
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
	  var OPTS = {
		'ENT_NOQUOTES': 0,
		'ENT_HTML_QUOTE_SINGLE': 1,
		'ENT_HTML_QUOTE_DOUBLE': 2,
		'ENT_COMPAT': 2,
		'ENT_QUOTES': 3,
		'ENT_IGNORE': 4
	  }
	  if (quoteStyle === 0) {
		noquotes = true
	  }
	  if (typeof quoteStyle !== 'number') {
		// Allow for a single string or an array of string flags
		quoteStyle = [].concat(quoteStyle)
		for (i = 0; i < quoteStyle.length; i++) {
		  // Resolve string input to bitwise e.g. 'ENT_IGNORE' becomes 4
		  if (OPTS[quoteStyle[i]] === 0) {
			noquotes = true
		  } else if (OPTS[quoteStyle[i]]) {
			optTemp = optTemp | OPTS[quoteStyle[i]]
		  }
		}
		quoteStyle = optTemp
	  }
	  if (quoteStyle & OPTS.ENT_HTML_QUOTE_SINGLE) {
		string = string.replace(/'/g, '&#039;')
	  }
	  if (!noquotes) {
		string = string.replace(/"/g, '&quot;')
	  }
	  return string
	}
	
	function array_diff (arr1) {
	  //   example 1: array_diff(['Kevin', 'van', 'Zonneveld'], ['van', 'Zonneveld'])
	  //   returns 1: {0:'Kevin'}
	  var retArr = {}
	  var argl = arguments.length
	  var k1 = ''
	  var i = 1
	  var k = ''
	  var arr = {}
	  arr1keys: for (k1 in arr1) { // eslint-disable-line no-labels
		for (i = 1; i < argl; i++) {
		  arr = arguments[i]
		  for (k in arr) {
			if (arr[k] === arr1[k1]) {
			  // If it reaches here, it was found in at least one array, so try next value
			  continue arr1keys // eslint-disable-line no-labels
			}
		  }
		  retArr[k1] = arr1[k1]
		}
	  }
	  return retArr
	}
	
	function str_split (string, splitLength) {
	  //example 1: str_split('Hello Friend', 3)
	  //returns 1: ['Hel', 'lo ', 'Fri', 'end']
	  if (empty(splitLength)) {
		 splitLength = 1
	  }
	  if (empty(string) || splitLength < 1) {
		return false
	  }
	 
	  string += ''
	  var chunks = []
	  var pos = 0
	  var len = string.length
	  
	  while (pos < len) {		 
		chunks.push(string.slice(pos, pos += splitLength))
	  }	
	  return chunks
	}
	
	function number_format (number, decimals, decPoint, thousandsSep) {
	  //  example 13: number_format('1 000,50', 2, '.', ' ')
	  //  returns 13: '100 050.00'
	  //  example 14: number_format(1e-8, 8, '.', '')
	  //  returns 14: '0.00000001'
	  number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
	  var n = !isFinite(+number) ? 0 : +number
	  var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
	  var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
	  var dec = (typeof decPoint === 'undefined') ? '.' : decPoint
	  var s = ''
	  var toFixedFix = function (n, prec) {
		var k = Math.pow(10, prec)
		return '' + (Math.round(n * k) / k)
		  .toFixed(prec)
	  }
	  // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
	  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
	  if (s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
	  }
	  if ((s[1] || '').length < prec) {
		s[1] = s[1] || ''
		s[1] += new Array(prec - s[1].length + 1).join('0')
	  }
	  return s.join(dec)
	}
	
	function array_filter (arr, func) {
	  //   example 1: var odd = function (num) {return (num & 1);}
	  //   example 1: array_filter({"a": 1, "b": 2, "c": 3, "d": 4, "e": 5}, odd)
	  //   returns 1: {"a": 1, "c": 3, "e": 5}
	  //   example 2: var even = function (num) {return (!(num & 1));}
	  //   example 2: array_filter([6, 7, 8, 9, 10, 11, 12], even)
	  //   returns 2: [ 6, , 8, , 10, , 12 ]
	  //   example 3: array_filter({"a": 1, "b": false, "c": -1, "d": 0, "e": null, "f":'', "g":undefined})
	  //   returns 3: {"a":1, "c":-1}
	  var retObj = {}
	  var k
	  func = func || function (v) {
		return v
	  }
	  // @todo: Issue #73
	  if (Object.prototype.toString.call(arr) === '[object Array]') {
		retObj = []
	  }
	  for (k in arr) {
		if (func(arr[k])) {
		  retObj[k] = arr[k]
		}
	  }
	  return retObj
	}
	
	function isset () {
		//example 1: isset( undefined, true)
		//returns 1: false
		//example 2: isset( 'Kevin van Zonneveld' )
		//returns 2: true
		var a = arguments
		var l = a.length
		var i = 0
		var undef
		if (l === 0) {
			console.error('Empty isset')
		}
		while (i !== l) {
			if (a[i] === undef || a[i] === null) {
				return false
			}
			i++
		}
		return true
	}
	
	function stripslashes (str) { 
		//example 1: stripslashes('Kevin\'s code')
		//returns 1: "Kevin's code"
		//example 2: stripslashes('Kevin\\\'s code')
		//returns 2: "Kevin\'s code"
		return (str + '')
		.replace(/\\(.?)/g, function (s, n1) {
		  switch (n1) {
			case '\\':
			  return '\\'
			case '0':
			  return '\u0000'
			case '':
			  return ''
			default:
			  return n1
		  }
		})
	}
	
	function nl2br (str, isXhtml) {
	  //   example 1: nl2br('Kevin\nvan\nZonneveld')
	  //   returns 1: 'Kevin<br />\nvan<br />\nZonneveld'
	  //   example 2: nl2br("\nOne\nTwo\n\nThree\n", false)
	  //   returns 2: '<br>\nOne<br>\nTwo<br>\n<br>\nThree<br>\n'
	  //   example 3: nl2br("\nOne\nTwo\n\nThree\n", true)
	  //   returns 3: '<br />\nOne<br />\nTwo<br />\n<br />\nThree<br />\n'
	  //   example 4: nl2br(null)
	  //   returns 4: ''
	  // Some latest browsers when str is null return and unexpected null value
	  if (typeof str === 'undefined' || str === null) {
		return ''
	  }
	  // Adjust comment to avoid issue on locutus.io display
	  var breakTag = (isXhtml || typeof isXhtml === 'undefined') ? '<br ' + '/>' : '<br>'
	  return (str + '')
		.replace(/(\r\n|\n\r|\r|\n)/g, breakTag + '$1')
	}
	
	function is_numeric (mixedVar) {
	  //example 5: is_numeric([])
	  //returns 5: false
	  //example 6: is_numeric('1 ')
	  //returns 6: false
	  var whitespace = [
		' ',
		'\n',
		'\r',
		'\t',
		'\f',
		'\x0b',
		'\xa0',
		'\u2000',
		'\u2001',
		'\u2002',
		'\u2003',
		'\u2004',
		'\u2005',
		'\u2006',
		'\u2007',
		'\u2008',
		'\u2009',
		'\u200a',
		'\u200b',
		'\u2028',
		'\u2029',
		'\u3000'
	  ].join('')
	  // @todo: Break this up using many single conditions with early returns
	  return (typeof mixedVar === 'number' ||
		(typeof mixedVar === 'string' &&
		whitespace.indexOf(mixedVar.slice(-1)) === -1)) &&
		mixedVar !== '' &&
		!isNaN(mixedVar)
	}
	// By using Object.keys we support both, arrays and objects
	function array_rand (array, num) { 
	  //example 1: array_rand( ['Kevin'], 1 )
	  //returns 1: '0'
	  // By using Object.keys we support both, arrays and objects
	 
		var keys = Object.keys(array)
		if (typeof num === 'undefined' || num === null) {
			num = 1
		} else {
			num = +num
		}
		if (isNaN(num) || num < 1 || num > keys.length) {
			return null
		}
		// shuffle the array of keys
		for (var i = keys.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1)) // 0 ≤ j ≤ i
			var tmp = keys[j]
			keys[j] = keys[i]
			keys[i] = tmp
		}
		return num === 1 ? keys[0] : keys.slice(0, num)
	}
	
	function urlencode (str) {
		//example 2: urlencode('http://kvz.io/')
		//returns 2: 'http%3A%2F%2Fkvz.io%2F'
		//example 3: urlencode('http://www.google.nl/search?q=Locutus&ie=utf-8')
		//returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3DLocutus%26ie%3Dutf-8'
		str = (str + '')
		// Tilde should be allowed unescaped in future versions of PHP (as reflected below),
		// but if you want to reflect current
		// PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
		return encodeURIComponent(str)
		.replace(/!/g, '%21')
		.replace(/'/g, '%27')
		.replace(/\(/g, '%28')
		.replace(/\)/g, '%29')
		.replace(/\*/g, '%2A')
		.replace(/%20/g, '+')
	}
	
	function array_walk_recursive (array, funcname, userdata) {
		//   example 1: array_walk_recursive([3, 4], function () {}, 'userdata')
		//   returns 1: true
		//   example 2: array_walk_recursive([3, [4]], function () {}, 'userdata')
		//   returns 2: true
		//   example 3: array_walk_recursive([3, []], function () {}, 'userdata')
		//   returns 3: true
		if (!array || typeof array !== 'object') {
			return false
		}
		if (typeof funcname !== 'function') {
			return false
		}
		for (var key in array) {
			// apply "funcname" recursively only on arrays
			if (Object.prototype.toString.call(array[key]) === '[object Array]') {
				var funcArgs = [array[key], funcname]
				if (arguments.length > 2) {
					funcArgs.push(userdata)
				}
				if (array_walk_recursive.apply(null, funcArgs) === false) {
					return false
				}
				continue
			}
			try {
				if (arguments.length > 2) {
					funcname(array[key], key, userdata)
				} else {
					funcname(array[key], key)
				}
			} catch (e) {
				return false
			}
		}
		return true
	}	
	
	function substr (str, start, len) {
		// *       example 1: substr('abcdef', 0, -1);
		// *       returns 1: 'abcde'
		var i = 0,
			allBMP = true,
			es = 0,
			el = 0,
			se = 0,
			ret = '';
		str += '';
		var end = str.length;

		// BEGIN REDUNDANT
		this.php_js = this.php_js || {};
		this.php_js.ini = this.php_js.ini || {};
		// END REDUNDANT
		switch ((this.php_js.ini['unicode.semantics'] && this.php_js.ini['unicode.semantics'].local_value.toLowerCase())) {
		case 'on':
			// Full-blown Unicode including non-Basic-Multilingual-Plane characters
			// strlen()
			for (i = 0; i < str.length; i++) {
				if (/[\uD800-\uDBFF]/.test(str.charAt(i)) && /[\uDC00-\uDFFF]/.test(str.charAt(i + 1))) {
					allBMP = false;
					break;
				}
			}

			if (!allBMP) {
				if (start < 0) {
					for (i = end - 1, es = (start += end); i >= es; i--) {
						if (/[\uDC00-\uDFFF]/.test(str.charAt(i)) && /[\uD800-\uDBFF]/.test(str.charAt(i - 1))) {
							start--;
							es--;
						}
					}
				} else {
					var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
					while ((surrogatePairs.exec(str)) != null) {
						var li = surrogatePairs.lastIndex;
						if (li - 2 < start) {
							start++;
						} else {
							break;
						}
					}
				}

				if (start >= end || start < 0) {
					return false;
				}
				if (len < 0) {
					for (i = end - 1, el = (end += len); i >= el; i--) {
						if (/[\uDC00-\uDFFF]/.test(str.charAt(i)) && /[\uD800-\uDBFF]/.test(str.charAt(i - 1))) {
							end--;
							el--;
						}
					}
					if (start > end) {
						return false;
					}
					return str.slice(start, end);
				} else {
					se = start + len;
					for (i = start; i < se; i++) {
						ret += str.charAt(i);
						if (/[\uD800-\uDBFF]/.test(str.charAt(i)) && /[\uDC00-\uDFFF]/.test(str.charAt(i + 1))) {
							se++; // Go one further, since one of the "characters" is part of a surrogate pair
						}
					}
					return ret;
				}
				break;
			}
			// Fall-through
		case 'off':
			// assumes there are no non-BMP characters;
			//    if there may be such characters, then it is best to turn it on (critical in true XHTML/XML)
		default:
			if (start < 0) {
				start += end;
			}
			end = typeof len === 'undefined' ? end : (len < 0 ? len + end : len + start);
			// PHP returns false if start does not fall within the string.
			// PHP returns false if the calculated end comes before the calculated start.
			// PHP returns an empty string if start and end are the same.
			// Otherwise, PHP returns the portion of the string from start to end.
			return start >= str.length || start < 0 || start > end ? !1 : str.slice(start, end);
		}
		return undefined;
	}

	//Create Md5 Format string
	function md5 (str) {
		//   example 1: md5('Kevin van Zonneveld')
		//   returns 1: '6e658d4bfcb59cc13f96c14450ac40b9'
		var hash
		try {			
			var md5sum = crypto.createHash('md5')
			md5sum.update(str)
			hash = md5sum.digest('hex')
		} catch (e) {
			hash = '';
		}	  
		return hash;
	}
	
	function  emptyNull(mixed_var) {
		// *     example 3: empty([]);
		// *     returns 3: true
		var key;
		if (mixed_var === "" || mixed_var === null || mixed_var === false || typeof mixed_var === 'undefined') {
			return true;
		}
		
		if (typeof mixed_var == 'object') {
			for (key in mixed_var) {
				if (mixed_var.hasOwnProperty(key)) {
					return false;
				}
			}
			return true;
		}
		return false;
	}
	
	function empty (mixedVar) {
		// *     example 3: empty([]);
		// *     returns 3: true
		var undef
		var key
		var i
		var len
		var emptyValues = [undef, null, false, 0, '', '0']
		for (i = 0, len = emptyValues.length; i < len; i++) {
			if (mixedVar === emptyValues[i]) {
				return true
			}
		}
		if (typeof mixedVar === 'object') {
			for (key in mixedVar) {
				if (mixedVar.hasOwnProperty(key)) {
					return false
				}
			}
			return true
		}
		return false
	}

	function strip_tags (input, allowed) {
		// *     example 1: strip_tags('<p>bharat</p> <br /><b>van</b> <i>Fieldstudy</i>', '<i><b>');
		// *     returns 1: 'bharat <b>van</b> <i>Fieldstudy</i>'
		allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
		var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
			commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
		return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
			return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
		});
	}

	function is_array (mixed_var) {
		// *     example 1: is_array(['bm', 'consim', 'techteam']);
		// *     returns 1: true
		var ini,
			_getFuncName = function (fn) {
				var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
				if (!name) {
					return '(Anonymous)';
				}
				return name[1];
			},
			_isArray = function (mixed_var) {
				// return Object.prototype.toString.call(mixed_var) === '[object Array]';
				// The above works, but let's do the even more stringent approach: (since Object.prototype.toString could be overridden)
				// Null, Not an object, no length property so couldn't be an Array (or String)
				if (!mixed_var || typeof mixed_var !== 'object' || typeof mixed_var.length !== 'number') {
					return false;
				}
				var len = mixed_var.length;
				mixed_var[mixed_var.length] = 'bogus';
				// The only way I can think of to get around this (or where there would be trouble) would be to have an object defined 
				// with a custom "length" getter which changed behavior on each call (or a setter to mess up the following below) or a custom 
				// setter for numeric properties, but even that would need to listen for specific indexes; but there should be no false negatives 
				// and such a false positive would need to rely on later JavaScript innovations like __defineSetter__
				if (len !== mixed_var.length) { // We know it's an array since length auto-changed with the addition of a 
				// numeric property at its length end, so safely get rid of our bogus element
					mixed_var.length -= 1;
					return true;
				}
				// Get rid of the property we added onto a non-array object; only possible 
				// side-effect is if the user adds back the property later, it will iterate 
				// this property in the older order placement in IE (an order which should not 
				// be depended on anyways)
				delete mixed_var[mixed_var.length];
				return false;
			};

		if (!mixed_var || typeof mixed_var !== 'object') {
			return false;
		}

		// BEGIN REDUNDANT
		this.php_js = this.php_js || {};
		this.php_js.ini = this.php_js.ini || {};
		// END REDUNDANT
		
		ini = this.php_js.ini['phpjs.objectsAsArrays'];

		return _isArray(mixed_var) ||
			// Allow returning true unless user has called
			// ini_set('phpjs.objectsAsArrays', 0) to disallow objects as arrays
			((!ini || ( // if it's not set to 0 and it's not 'off', check for objects as arrays
			(parseInt(ini.local_value, 10) !== 0 && (!ini.local_value.toLowerCase || ini.local_value.toLowerCase() !== 'off')))
			) && (
			Object.prototype.toString.call(mixed_var) === '[object Object]' && _getFuncName(mixed_var.constructor) === 'Object' // Most likely a literal and intended as assoc. array
			));
	}
	
	function array_search (needle, haystack, argStrict) 
	{
		var strict = !!argStrict,
			key = '';    

		for (key in haystack) {
			if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
				return key;
			}
		}

		return false;
	}
	
	function substr (str, start, len) {
		// *       example 1: substr('abcdef', 0, -1);
		// *       returns 1: 'abcde'
		var i = 0,
			allBMP = true,
			es = 0,
			el = 0,
			se = 0,
			ret = '';
		str += '';
		var end = str.length;

		// BEGIN REDUNDANT
		this.php_js = this.php_js || {};
		this.php_js.ini = this.php_js.ini || {};
		// END REDUNDANT
		switch ((this.php_js.ini['unicode.semantics'] && this.php_js.ini['unicode.semantics'].local_value.toLowerCase())) {
		case 'on':
			// Full-blown Unicode including non-Basic-Multilingual-Plane characters
			// strlen()
			for (i = 0; i < str.length; i++) {
				if (/[\uD800-\uDBFF]/.test(str.charAt(i)) && /[\uDC00-\uDFFF]/.test(str.charAt(i + 1))) {
					allBMP = false;
					break;
				}
			}

			if (!allBMP) {
				if (start < 0) {
					for (i = end - 1, es = (start += end); i >= es; i--) {
						if (/[\uDC00-\uDFFF]/.test(str.charAt(i)) && /[\uD800-\uDBFF]/.test(str.charAt(i - 1))) {
							start--;
							es--;
						}
					}
				} else {
					var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
					while ((surrogatePairs.exec(str)) != null) {
						var li = surrogatePairs.lastIndex;
						if (li - 2 < start) {
							start++;
						} else {
							break;
						}
					}
				}

				if (start >= end || start < 0) {
					return false;
				}
				if (len < 0) {
					for (i = end - 1, el = (end += len); i >= el; i--) {
						if (/[\uDC00-\uDFFF]/.test(str.charAt(i)) && /[\uD800-\uDBFF]/.test(str.charAt(i - 1))) {
							end--;
							el--;
						}
					}
					if (start > end) {
						return false;
					}
					return str.slice(start, end);
				} else {
					se = start + len;
					for (i = start; i < se; i++) {
						ret += str.charAt(i);
						if (/[\uD800-\uDBFF]/.test(str.charAt(i)) && /[\uDC00-\uDFFF]/.test(str.charAt(i + 1))) {
							se++; // Go one further, since one of the "characters" is part of a surrogate pair
						}
					}
					return ret;
				}
				break;
			}
			// Fall-through
		case 'off':
			// assumes there are no non-BMP characters;
			//    if there may be such characters, then it is best to turn it on (critical in true XHTML/XML)
		default:
			if (start < 0) {
				start += end;
			}
			end = typeof len === 'undefined' ? end : (len < 0 ? len + end : len + start);
			// PHP returns false if start does not fall within the string.
			// PHP returns false if the calculated end comes before the calculated start.
			// PHP returns an empty string if start and end are the same.
			// Otherwise, PHP returns the portion of the string from start to end.
			return start >= str.length || start < 0 || start > end ? !1 : str.slice(start, end);
		}
		return undefined; // Please Netbeans
	}	
	
	function intval (mixed_var, base) {
		// *     example 2: intval(4.2);
		// *     returns 2: 4
		var tmp;
		var type = typeof(mixed_var);
		if (type === 'boolean') {
			return +mixed_var;
		} else if (type === 'string') {
			tmp = parseInt(mixed_var, base || 10);
			return (isNaN(tmp) || !isFinite(tmp)) ? 0 : tmp;
		} else if (type === 'number' && isFinite(mixed_var)) {
			return mixed_var | 0;
		} else {
			return 0;
		}
	}
		
	function strlen (string) {
		// *     example 1: strlen('bharat van Fieldstudy');
		// *     returns 1: 19
		var str = string + '';
		var i = 0,
			chr = '',
			lgth = 0;

		if (!this.php_js || !this.php_js.ini || !this.php_js.ini['unicode.semantics'] || this.php_js.ini['unicode.semantics'].local_value.toLowerCase() !== 'on') {
			return string.length;
		}

		var getWholeChar = function (str, i) {
			var code = str.charCodeAt(i);
			var next = '',
				prev = '';
			if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
				if (str.length <= (i + 1)) {
					throw 'High surrogate without following low surrogate';
				}
				next = str.charCodeAt(i + 1);
				if (0xDC00 > next || next > 0xDFFF) {
					throw 'High surrogate without following low surrogate';
				}
				return str.charAt(i) + str.charAt(i + 1);
			} else if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
				if (i === 0) {
					throw 'Low surrogate without preceding high surrogate';
				}
				prev = str.charCodeAt(i - 1);
				if (0xD800 > prev || prev > 0xDBFF) { //(could change last hex to 0xDB7F to treat high private surrogates as single characters)
					throw 'Low surrogate without preceding high surrogate';
				}
				return false; // We can pass over low surrogates now as the second component in a pair which we have already processed
			}
			return str.charAt(i);
		};

		for (i = 0, lgth = 0; i < str.length; i++) {
			if ((chr = getWholeChar(str, i)) === false) {
				continue;
			} // Adapt this line at the top of any loop, passing in the whole string and the current iteration and returning a variable to represent the individual character; purpose is to treat the first part of a surrogate pair as the whole character and then ignore the second part
			lgth++;
		}
		return lgth;
	}

	function ucwords (str) {
		// *     example 1: ucwords('bharat van  fieldstudy');
		// *     returns 1: 'bharat Van  Fieldstudy'
		return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
			return $1.toUpperCase();
		});
	}
	
	function allucwords (str) {
		if(typeof str === "string")
			return str.toUpperCase();
		else
			return '';
	}
	
	function lcwords (str) {		
		return (str + '').replace(/^([A-Z])|\s+([A-Z])/g, function ($1) {
			return str.toLowerCase();
		});
	}
	
	function strtolower (str) {
		//   example 1: strtolower('Kevin van Zonneveld')
		//   returns 1: 'kevin van zonneveld'
		return (str + '').toLowerCase()
	}
	
	function explode (delimiter, string, limit) {

		if ( arguments.length < 2 || typeof delimiter == 'undefined' || typeof string == 'undefined' ) return null;
		if ( delimiter === '' || delimiter === false || delimiter === null) return false;
		if ( typeof delimiter == 'function' || typeof delimiter == 'object' || typeof string == 'function' || typeof string == 'object'){
			return { 0: '' };
		}
		if ( delimiter === true ) delimiter = '1';	
		delimiter += '';
		string += '';	
		var s = string.split( delimiter );
		if ( typeof limit === 'undefined' ) return s;
		if ( limit === 0 ) limit = 1;
		if ( limit > 0 ){
			if ( limit >= s.length ) return s;
			return s.slice( 0, limit - 1 ).concat( [ s.slice( limit - 1 ).join( delimiter ) ] );
		}
		if ( -limit >= s.length ) return [];	
		s.splice( s.length + limit );
		return s;
	}
	
	function rtrim (str, charlist) {
		//   example 1: rtrim('    Kevin van Zonneveld    ')
		//   returns 1: '    Kevin van Zonneveld'
		charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
		.replace(/([[\]().?/*{}+$^:])/g, '\\$1')
		var re = new RegExp('[' + charlist + ']+$', 'g')
		return (str + '').replace(re, '')
	}

	function trim (str, charlist) {
		// *     example 1: trim('    bharat matrimony    ');
		// *     returns 1: 'bharat matrimony'
		var whitespace, l = 0,
			i = 0;
		str += '';

		if (!charlist) {
			// default list
			whitespace = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
		} else {
			// preg_quote custom list
			charlist += '';
			whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
		}

		l = str.length;
		for (i = 0; i < l; i++) {
			if (whitespace.indexOf(str.charAt(i)) === -1) {
				str = str.substring(i);
				break;
			}
		}

		l = str.length;
		for (i = l - 1; i >= 0; i--) {
			if (whitespace.indexOf(str.charAt(i)) === -1) {
				str = str.substring(0, i + 1);
				break;
			}
		}

		return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
	}

	function strToTile(title){
		if(title!=undefined && title!=null && title!=''){
			var key;
			var wordpush = [];
			var title = str_replace(".",". ",title);
			var title = title.toLowerCase();
			var words = explode(" ",title);
			for (key in words){
				wordpush.push(ucwords(words[key]));
			}
			var impString = implode(' ',wordpush);
			var newTitle = str_replace(". ",".",impString);
			return newTitle;
		}else{
			return false;	
		}
	}

	function str_replace (search, replace, subject, count) {
		//example 3: str_replace(Array('S','F'),'x','ASDFASDF')
		//returns 3: 'AxDxAxDx'
		//returns 1: 'Kevin.van.Zonneveld'
		//example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
		//returns 2: 'hemmo, mars'
		var i = 0,
			j = 0,
			temp = '',
			repl = '',
			sl = 0,
			fl = 0,
			f = [].concat(search),
			r = [].concat(replace),
			s = subject,
			ra = Object.prototype.toString.call(r) === '[object Array]',
			sa = Object.prototype.toString.call(s) === '[object Array]';
		s = [].concat(s);
		if (count) {
			this.window[count] = 0;
		}

		for (i = 0, sl = s.length; i < sl; i++) {
			if (s[i] === '') {
				continue;
			}
			for (j = 0, fl = f.length; j < fl; j++) {
				temp = s[i] + '';
				repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
				s[i] = (temp).split(f[j]).join(repl);
				if (count && s[i] !== temp) {
					this.window[count] += (temp.length - s[i].length) / f[j].length;
				}
			}
		}
		return sa ? s : s[0];
	}

	function implode(glue, pieces) {
		var i = '',
			retVal = '',
			tGlue = '';
		if (arguments.length === 1) {
			pieces = glue;
			glue = '';
		}
		if (typeof(pieces) === 'object') {
			if (Object.prototype.toString.call(pieces) === '[object Array]') {
				return pieces.join(glue);
			} 
			for (i in pieces) {
				retVal += tGlue + pieces[i];
				tGlue = glue;
			}
			return retVal;
		}
		return pieces;
	}
		
	function html_entity_decode (string, quote_style) {
		var hash_map = {},
			symbol = '',
			tmp_str = '',
			entity = '';
		tmp_str = string.toString();

		if (false === (hash_map = get_html_translation_table('HTML_ENTITIES', quote_style))) {
			return false;
		}

		delete(hash_map['&']);
		hash_map['&'] = '&amp;';

		for (symbol in hash_map) {
			entity = hash_map[symbol];
			tmp_str = tmp_str.split(entity).join(symbol);
		}
		tmp_str = tmp_str.split('&#039;').join("'");

		return tmp_str;
	}
	
	function get_html_translation_table (table, quote_style) {
		var entities = {},
			hash_map = {},
			decimal;
		var constMappingTable = {},
			constMappingQuoteStyle = {};
		var useTable = {},
			useQuoteStyle = {};

		// Translate arguments
		constMappingTable[0] = 'HTML_SPECIALCHARS';
		constMappingTable[1] = 'HTML_ENTITIES';
		constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
		constMappingQuoteStyle[2] = 'ENT_COMPAT';
		constMappingQuoteStyle[3] = 'ENT_QUOTES';

		useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
		useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';

		if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
			throw new Error("Table: " + useTable + ' not supported');
			// return false;
		}

		entities['38'] = '&amp;';
		if (useTable === 'HTML_ENTITIES') {
			entities['160'] = '&nbsp;';
			entities['161'] = '&iexcl;';
			entities['162'] = '&cent;';
			entities['163'] = '&pound;';
			entities['164'] = '&curren;';
			entities['165'] = '&yen;';
			entities['166'] = '&brvbar;';
			entities['167'] = '&sect;';
			entities['168'] = '&uml;';
			entities['169'] = '&copy;';
			entities['170'] = '&ordf;';
			entities['171'] = '&laquo;';
			entities['172'] = '&not;';
			entities['173'] = '&shy;';
			entities['174'] = '&reg;';
			entities['175'] = '&macr;';
			entities['176'] = '&deg;';
			entities['177'] = '&plusmn;';
			entities['178'] = '&sup2;';
			entities['179'] = '&sup3;';
			entities['180'] = '&acute;';
			entities['181'] = '&micro;';
			entities['182'] = '&para;';
			entities['183'] = '&middot;';
			entities['184'] = '&cedil;';
			entities['185'] = '&sup1;';
			entities['186'] = '&ordm;';
			entities['187'] = '&raquo;';
			entities['188'] = '&frac14;';
			entities['189'] = '&frac12;';
			entities['190'] = '&frac34;';
			entities['191'] = '&iquest;';
			entities['192'] = '&Agrave;';
			entities['193'] = '&Aacute;';
			entities['194'] = '&Acirc;';
			entities['195'] = '&Atilde;';
			entities['196'] = '&Auml;';
			entities['197'] = '&Aring;';
			entities['198'] = '&AElig;';
			entities['199'] = '&Ccedil;';
			entities['200'] = '&Egrave;';
			entities['201'] = '&Eacute;';
			entities['202'] = '&Ecirc;';
			entities['203'] = '&Euml;';
			entities['204'] = '&Igrave;';
			entities['205'] = '&Iacute;';
			entities['206'] = '&Icirc;';
			entities['207'] = '&Iuml;';
			entities['208'] = '&ETH;';
			entities['209'] = '&Ntilde;';
			entities['210'] = '&Ograve;';
			entities['211'] = '&Oacute;';
			entities['212'] = '&Ocirc;';
			entities['213'] = '&Otilde;';
			entities['214'] = '&Ouml;';
			entities['215'] = '&times;';
			entities['216'] = '&Oslash;';
			entities['217'] = '&Ugrave;';
			entities['218'] = '&Uacute;';
			entities['219'] = '&Ucirc;';
			entities['220'] = '&Uuml;';
			entities['221'] = '&Yacute;';
			entities['222'] = '&THORN;';
			entities['223'] = '&szlig;';
			entities['224'] = '&agrave;';
			entities['225'] = '&aacute;';
			entities['226'] = '&acirc;';
			entities['227'] = '&atilde;';
			entities['228'] = '&auml;';
			entities['229'] = '&aring;';
			entities['230'] = '&aelig;';
			entities['231'] = '&ccedil;';
			entities['232'] = '&egrave;';
			entities['233'] = '&eacute;';
			entities['234'] = '&ecirc;';
			entities['235'] = '&euml;';
			entities['236'] = '&igrave;';
			entities['237'] = '&iacute;';
			entities['238'] = '&icirc;';
			entities['239'] = '&iuml;';
			entities['240'] = '&eth;';
			entities['241'] = '&ntilde;';
			entities['242'] = '&ograve;';
			entities['243'] = '&oacute;';
			entities['244'] = '&ocirc;';
			entities['245'] = '&otilde;';
			entities['246'] = '&ouml;';
			entities['247'] = '&divide;';
			entities['248'] = '&oslash;';
			entities['249'] = '&ugrave;';
			entities['250'] = '&uacute;';
			entities['251'] = '&ucirc;';
			entities['252'] = '&uuml;';
			entities['253'] = '&yacute;';
			entities['254'] = '&thorn;';
			entities['255'] = '&yuml;';
		}

		if (useQuoteStyle !== 'ENT_NOQUOTES') {
			entities['34'] = '&quot;';
		}
		if (useQuoteStyle === 'ENT_QUOTES') {
			entities['39'] = '&#39;';
		}
		entities['60'] = '&lt;';
		entities['62'] = '&gt;';
		// ascii decimals to real symbols
		for (decimal in entities) {
			if (entities.hasOwnProperty(decimal)) {
				hash_map[String.fromCharCode(decimal)] = entities[decimal];
			}
		}
		return hash_map;
	}
		
	function count (mixed_var, mode) {
		var key, cnt = 0;
		if (JSON.stringify(mixed_var) == "['']" || JSON.stringify(mixed_var) == '[""]' || mixed_var === null || typeof mixed_var === 'undefined') {
			return 0;
		} else if (mixed_var.constructor !== Array && mixed_var.constructor !== Object) {
			return 1;
		}
		
		if (mode === 'COUNT_RECURSIVE') {
			mode = 1;
		}
		if (mode != 1) {
			mode = 0;
		}
		
		for(key in mixed_var) {
			if (mixed_var.hasOwnProperty(key)) {
				cnt++;
				if (mode == 1 && mixed_var[key] && (mixed_var[key].constructor === Array || mixed_var[key].constructor === Object)) {
					cnt += this.count(mixed_var[key], 1);
				}
			}
		}
		return cnt;
	}
	
	function array_intersect (arr1) {
	  //   example 1: var $array1 = {'a' : 'green', 0:'red', 1: 'blue'}
	  //   example 1: var $array2 = {'b' : 'green', 0:'yellow', 1:'red'}
	  //   example 1: var $array3 = ['green', 'red']
	  //   example 1: var $result = array_intersect($array1, $array2, $array3)
	  //   returns 1: {0: 'red', a: 'green'}
	  var retArr = {}
	  var argl = arguments.length
	  var arglm1 = argl - 1
	  var k1 = ''
	  var arr = {}
	  var i = 0
	  var k = ''
	  arr1keys: for (k1 in arr1) { // eslint-disable-line no-labels
		arrs: for (i = 1; i < argl; i++) { // eslint-disable-line no-labels
		  arr = arguments[i]
		  for (k in arr) {
			if (arr[k] === arr1[k1]) {
			  if (i === arglm1) {
				retArr[k1] = arr1[k1]
			  }
			  // If the innermost loop always leads at least once to an equal value,
			  // continue the loop until done
			  continue arrs// eslint-disable-line no-labels
			}
		  }
		  // If it reaches here, it wasn't found in at least one array, so try next value
		  continue arr1keys// eslint-disable-line no-labels
		}
	  }
	  return retArr
	}
	
	function array_unique (inputArr) {
		var key = '',        tmp_arr2 = {},
			val = '';	 
		var __array_search = function (needle, haystack) {
			var fkey = '';        for (fkey in haystack) {
				if (haystack.hasOwnProperty(fkey)) {
					if ((haystack[fkey] + '') === (needle + '')) {
						return fkey;
					}            }
			}
			return false;
		};

		temp_count = 0;
		 for (key in inputArr) {
			if (inputArr.hasOwnProperty(key)) {
				val = inputArr[key];
				if (false === __array_search(val, tmp_arr2)) {
					tmp_arr2[temp_count] = val; 
					temp_count++;
					}
			}
		}
		var result_arr = [];
		for(var i in tmp_arr2) {
			if(tmp_arr2.hasOwnProperty(i) && !isNaN(+i)) {
				if(tmp_arr2[i]!=null && tmp_arr2[i]!=undefined && tmp_arr2[i]!='null')
				result_arr[+i] = tmp_arr2[i];
			}
		} 
		return result_arr;
	}

	function array_key_exists (key, search) {
	   if (!search || (search.constructor !== Array && search.constructor !== Object)) {
			return false;
		}	 
		return key in search;
	}

	function array_keys (input, search_value, argStrict) {
		var search = typeof search_value !== 'undefined',tmp_arr = [],
			strict = !!argStrict,
			include = true,
			key = '';
		 if (input && typeof input === 'object' && input.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
			return input.keys(search_value, argStrict);
		}
	 
		for (key in input) {        
			if (input.hasOwnProperty(key)) {
				include = true;
				if (search) {
					if (strict && input[key] !== search_value) {
						include = false;                }
					else if (input[key] != search_value) {
						include = false;
					}
				} 
				if (include) {
					tmp_arr[tmp_arr.length] = key;
				}
			}    
		}	 
		return tmp_arr;
	}

	function array_reverse (array, preserve_keys) {
		// *     example 1: array_reverse( [ 'php5', '5.0', ['green', 'red'] ], true);
		// *     returns 1: { 2: ['green', 'red'], 1: 5, 0: 'php5'}
		var isArray = Object.prototype.toString.call(array) === "[object Array]",
			tmp_arr = preserve_keys ? {} : [],
			key;
			
		if (isArray && !preserve_keys) {
			return array.slice(0).reverse();
		}

		if (preserve_keys) {
			var keys = [];
			for (key in array) {
				// if (array.hasOwnProperty(key)) {
				keys.push(key);
				// }
			}
			
			var i = keys.length;
			while (i--) {
				key = keys[i];
				// FIXME: don't rely on browsers keeping keys in insertion order
				// it's implementation specific
				// eg. the result will differ from expected in Google Chrome
				tmp_arr[key] = array[key];
			}
		} else {
			for (key in array) {
				// if (array.hasOwnProperty(key)) {
				tmp_arr.unshift(array[key]);
				// }
			}
		}

		return tmp_arr;
	}

	function in_array (needle, haystack, argStrict) {
		// *     example 2: in_array('outlets', {0: 'bharat', outlets: 'van', 1: 'Fieldstudy'});
		// *     returns 2: false
		var key = '',
			strict = !! argStrict;

		if (strict) {
			for (key in haystack) {
				if (haystack[key] === needle) {
					return true;
				}
			}
		} else {
			for (key in haystack) {
				if (haystack[key] == needle) {
					return true;
				}
			}
		}
		return false;
	}
	
	function array_merge (arguments) {
		var args = Array.prototype.slice.call(arguments),
			argl = args.length,
			arg,retObj = {},
			k = '', 
			argil = 0,
			j = 0,
			i = 0,        ct = 0,
			toStr = Object.prototype.toString,
			retArr = true;	 		
		for (i = 0; i < argl; i++) { 
			if (toStr.call(args[i]) !== '[object Array]') {
				retArr = false;
				break;
			}
		} 
		if (retArr) {
			retArr = [];
			for (i = 0; i < argl; i++) {
				retArr = retArr.concat(args[i]);        }
			return retArr;
		}	 
		for (i = 0, ct = 0; i < argl; i++) {        
			arg = args[i];
			if (toStr.call(arg) === '[object Array]') {
				for (j = 0, argil = arg.length; j < argil; j++) {
					retObj[ct++] = arg[j];
				}        
			}
			else {
				for (k in arg) {
					if (arg.hasOwnProperty(k)) {
						if (parseInt(k, 10) + '' === k) { 
							retObj[ct++] = arg[k];
						}
						else {
							retObj[k] = arg[k];
						}                
					}
				}
			}
		}
		return retObj;	
	}
	
	function strpos (haystack, needle, offset) {
		// *     example 1: strpos('bharat van Fieldstudy', 'e', 5);
		// *     returns 1: 14
		var i = (haystack + '').indexOf(needle, (offset || 0));
		return i === -1 ? false : i;
	}
	
	function strrev (string) {
	  //returns 1: 'dlevennoZ nav niveK'
	  //example 2: strrev('a\u0301haB')
	  //returns 2: 'Baha\u0301' // combining
	  //example 3: strrev('A\uD87E\uDC04Z')
	  //returns 3: 'Z\uD87E\uDC04A' // surrogates
	  //test: 'skip-3'
	  string = string + '' 
	  var chars = [
		'\uDC00-\uDFFF',
		'\u0300-\u036F',
		'\u0483-\u0489',
		'\u0591-\u05BD',
		'\u05BF',
		'\u05C1',
		'\u05C2',
		'\u05C4',
		'\u05C5',
		'\u05C7',
		'\u0610-\u061A',
		'\u064B-\u065E',
		'\u0670',
		'\u06D6-\u06DC',
		'\u06DE-\u06E4',
		'\u06E7\u06E8',
		'\u06EA-\u06ED',
		'\u0711',
		'\u0730-\u074A',
		'\u07A6-\u07B0',
		'\u07EB-\u07F3',
		'\u0901-\u0903',
		'\u093C',
		'\u093E-\u094D',
		'\u0951-\u0954',
		'\u0962',
		'\u0963',
		'\u0981-\u0983',
		'\u09BC',
		'\u09BE-\u09C4',
		'\u09C7',
		'\u09C8',
		'\u09CB-\u09CD',
		'\u09D7',
		'\u09E2',
		'\u09E3',
		'\u0A01-\u0A03',
		'\u0A3C',
		'\u0A3E-\u0A42',
		'\u0A47',
		'\u0A48',
		'\u0A4B-\u0A4D',
		'\u0A51',
		'\u0A70',
		'\u0A71',
		'\u0A75',
		'\u0A81-\u0A83',
		'\u0ABC',
		'\u0ABE-\u0AC5',
		'\u0AC7-\u0AC9',
		'\u0ACB-\u0ACD',
		'\u0AE2',
		'\u0AE3',
		'\u0B01-\u0B03',
		'\u0B3C',
		'\u0B3E-\u0B44',
		'\u0B47',
		'\u0B48',
		'\u0B4B-\u0B4D',
		'\u0B56',
		'\u0B57',
		'\u0B62',
		'\u0B63',
		'\u0B82',
		'\u0BBE-\u0BC2',
		'\u0BC6-\u0BC8',
		'\u0BCA-\u0BCD',
		'\u0BD7',
		'\u0C01-\u0C03',
		'\u0C3E-\u0C44',
		'\u0C46-\u0C48',
		'\u0C4A-\u0C4D',
		'\u0C55',
		'\u0C56',
		'\u0C62',
		'\u0C63',
		'\u0C82',
		'\u0C83',
		'\u0CBC',
		'\u0CBE-\u0CC4',
		'\u0CC6-\u0CC8',
		'\u0CCA-\u0CCD',
		'\u0CD5',
		'\u0CD6',
		'\u0CE2',
		'\u0CE3',
		'\u0D02',
		'\u0D03',
		'\u0D3E-\u0D44',
		'\u0D46-\u0D48',
		'\u0D4A-\u0D4D',
		'\u0D57',
		'\u0D62',
		'\u0D63',
		'\u0D82',
		'\u0D83',
		'\u0DCA',
		'\u0DCF-\u0DD4',
		'\u0DD6',
		'\u0DD8-\u0DDF',
		'\u0DF2',
		'\u0DF3',
		'\u0E31',
		'\u0E34-\u0E3A',
		'\u0E47-\u0E4E',
		'\u0EB1',
		'\u0EB4-\u0EB9',
		'\u0EBB',
		'\u0EBC',
		'\u0EC8-\u0ECD',
		'\u0F18',
		'\u0F19',
		'\u0F35',
		'\u0F37',
		'\u0F39',
		'\u0F3E',
		'\u0F3F',
		'\u0F71-\u0F84',
		'\u0F86',
		'\u0F87',
		'\u0F90-\u0F97',
		'\u0F99-\u0FBC',
		'\u0FC6',
		'\u102B-\u103E',
		'\u1056-\u1059',
		'\u105E-\u1060',
		'\u1062-\u1064',
		'\u1067-\u106D',
		'\u1071-\u1074',
		'\u1082-\u108D',
		'\u108F',
		'\u135F',
		'\u1712-\u1714',
		'\u1732-\u1734',
		'\u1752',
		'\u1753',
		'\u1772',
		'\u1773',
		'\u17B6-\u17D3',
		'\u17DD',
		'\u180B-\u180D',
		'\u18A9',
		'\u1920-\u192B',
		'\u1930-\u193B',
		'\u19B0-\u19C0',
		'\u19C8',
		'\u19C9',
		'\u1A17-\u1A1B',
		'\u1B00-\u1B04',
		'\u1B34-\u1B44',
		'\u1B6B-\u1B73',
		'\u1B80-\u1B82',
		'\u1BA1-\u1BAA',
		'\u1C24-\u1C37',
		'\u1DC0-\u1DE6',
		'\u1DFE',
		'\u1DFF',
		'\u20D0-\u20F0',
		'\u2DE0-\u2DFF',
		'\u302A-\u302F',
		'\u3099',
		'\u309A',
		'\uA66F-\uA672',
		'\uA67C',
		'\uA67D',
		'\uA802',
		'\uA806',
		'\uA80B',
		'\uA823-\uA827',
		'\uA880',
		'\uA881',
		'\uA8B4-\uA8C4',
		'\uA926-\uA92D',
		'\uA947-\uA953',
		'\uAA29-\uAA36',
		'\uAA43',
		'\uAA4C',
		'\uAA4D',
		'\uFB1E',
		'\uFE00-\uFE0F',
		'\uFE20-\uFE26'
	  ]
	  var graphemeExtend = new RegExp('(.)([' + chars.join('') + ']+)', 'g')
	  // Temporarily reverse
	  string = string.replace(graphemeExtend, '$2$1')
	  return string.split('').reverse().join('')
	}

	function round (value, precision, mode) {
		// *     example 2: round(3.6);
		// *     returns 2: 4
		var m, f, isHalf, sgn; // helper variables
		precision |= 0; // making sure precision is integer
		m = Math.pow(10, precision);
		value *= m;
		sgn = (value > 0) | -(value < 0); // sign of the number
		isHalf = value % 1 === 0.5 * sgn;
		f = Math.floor(value);

		if (isHalf) {
			switch (mode) {
			case 'PHP_ROUND_HALF_DOWN':
				value = f + (sgn < 0); // rounds .5 toward zero
				break;
			case 'PHP_ROUND_HALF_EVEN':
				value = f + (f % 2 * sgn); // rouds .5 towards the next even integer
				break;
			case 'PHP_ROUND_HALF_ODD':
				value = f + !(f % 2); // rounds .5 towards the next odd integer
				break;
			default:
				value = f + (sgn > 0); // rounds .5 away from zero
			}
		}

		return (isHalf ? value : Math.round(value)) / m;
	}	
		
	function strstr (haystack, needle, bool) {
	  //   example 1: strstr('Kevin van Zonneveld', 'van')
	  //   returns 1: 'van Zonneveld'
	  //   example 2: strstr('Kevin van Zonneveld', 'van', true)
	  //   returns 2: 'Kevin '
	  //   example 3: strstr('name@example.com', '@')
	  //   returns 3: '@example.com'
	  //   example 4: strstr('name@example.com', '@', true)
	  //   returns 4: 'name'
		var pos = 0
		haystack += ''
		pos = haystack.indexOf(needle)
		if (pos === -1) {
			return false
		} else {
			if (bool) {
				return haystack.substr(0, pos)
			} else {
				return haystack.slice(pos)
			}
		}
	}
	
	function ord(string) {	  
		//    input by: incidence
		//   example 1: ord('K')
		//   returns 1: 75
		//   example 2: ord('\uD800\uDC00'); //create a single Unicode character
		//   returns 2: 65536
		var str = string + '';
		var code = str.charCodeAt(0);
		if (code >= 0xD800 && code <= 0xDBFF) {
			// High surrogate (could change last hex to 0xDB7F to treat
			// high private surrogates as single characters)
			var hi = code
			if (str.length === 1) {
			  // This is just a high surrogate with no following low surrogate,
			  // so we return its value;
				return code
			  // we could also throw an error as it is not a complete character,
			  // but someone may want to know
			}
			var low = str.charCodeAt(1)
			return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000
		}
		if (code >= 0xDC00 && code <= 0xDFFF) {
			// Low surrogate
			// This is just a low surrogate with no preceding high surrogate,
			// so we return its value;
				return code;
			// we could also throw an error as it is not a complete character,
			// but someone may want to know
		}
		return code;
	}
		
	isNumeric = (n) => {
		if (typeof(n)=="string") {
			n = n.replace(",", ".");
		}
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
	
	//Check MatriId Format or Not
	is_matriid = (usrid) => {		
		if(strlen(usrid)<=12 && array_search(allucwords(substr(usrid,0,1)),global.IDSTARTLETTERHASH) && isNumeric(substr(usrid,1,strlen(usrid)))==1)
		{
			return true;
		} else {
		  return false;
		}
	}	
	
	function substr_count (haystack, needle, offset, length) { 
		// eslint-disable-line camelcase
		//   example 1: substr_count('Kevin van Zonneveld', 'e')
		//   returns 1: 3
		//   example 2: substr_count('Kevin van Zonneveld', 'K', 1)
		//   returns 2: 0
		//   example 3: substr_count('Kevin van Zonneveld', 'Z', 0, 10)
		//   returns 3: false
		var cnt = 0
		haystack += ''
		needle += ''
		if (isNaN(offset)) {
			offset = 0
		}
		if (isNaN(length)) {
			length = 0
		}
		if (needle.length === 0) {
			return false;
		}
		offset--
		while ((offset = haystack.indexOf(needle, offset + 1)) !== -1) {
			if (length > 0 && (offset + needle.length) > length) {
				return false;
			}
			cnt++
		}
			return cnt;
	}
	
	function array_change_key_case (array, cs) { 		
		//   example 1: array_change_key_case(42)
		//   returns 1: false
		//   example 2: array_change_key_case([ 3, 5 ])
		//   returns 2: [3, 5]
		//   example 3: array_change_key_case({ FuBaR: 42 })
		//   returns 3: {"fubar": 42}
		//   example 4: array_change_key_case({ FuBaR: 42 }, 'CASE_LOWER')
		//   returns 4: {"fubar": 42}
		//   example 5: array_change_key_case({ FuBaR: 42 }, 'CASE_UPPER')
		//   returns 5: {"FUBAR": 42}
		//   example 6: array_change_key_case({ FuBaR: 42 }, 2)
		//   returns 6: {"FUBAR": 42}
		var caseFnc
		var key
		var tmpArr = {}
		if (Object.prototype.toString.call(array) === '[object Array]') {
			return array
		}
		if (array && typeof array === 'object') {
			caseFnc = (!cs || cs === 'CASE_LOWER') ? 'toLowerCase' : 'toUpperCase'
			for (key in array) {
				tmpArr[key[caseFnc]()] = array[key]
			}
			return tmpArr
		}
		return false
	}
	
	function basename (path, suffix) {
		  //   example 1: basename('/www/site/home.htm', '.htm')
		  //   returns 1: 'home'
		  //   example 2: basename('ecra.php?p=1')
		  //   returns 2: 'ecra.php?p=1'
		  //   example 3: basename('/some/path/')
		  //   returns 3: 'path'
		  //   example 4: basename('/some/path_ext.ext/','.ext')
		  //   returns 4: 'path_ext'
		var b = path
		var lastChar = b.charAt(b.length - 1)
		if (lastChar === '/' || lastChar === '\\') {
			b = b.slice(0, -1)
		}
		b = b.replace(/^.*[/\\]/g, '')
		if (typeof suffix === 'string' && b.substr(b.length - suffix.length) === suffix) {
			b = b.substr(0, b.length - suffix.length)
		}
		return b
	}
		

	
	function pathinfo (path, options) {
	  //   example 1: pathinfo('/www/htdocs/index.html', 1)
	  //   returns 1: '/www/htdocs'
	  //   example 2: pathinfo('/www/htdocs/index.html', 'PATHINFO_BASENAME')
	  //   returns 2: 'index.html'
	  //   example 3: pathinfo('/www/htdocs/index.html', 'PATHINFO_EXTENSION')
	  //   returns 3: 'html'
	  //   example 4: pathinfo('/www/htdocs/index.html', 'PATHINFO_FILENAME')
	  //   returns 4: 'index'
	  //   example 5: pathinfo('/www/htdocs/index.html', 2 | 4)
	  //   returns 5: {basename: 'index.html', extension: 'html'}
	  //   example 6: pathinfo('/www/htdocs/index.html', 'PATHINFO_ALL')
	  //   returns 6: {dirname: '/www/htdocs', basename: 'index.html', extension: 'html', filename: 'index'}
	  //   example 7: pathinfo('/www/htdocs/index.html')
	  //   returns 7: {dirname: '/www/htdocs', basename: 'index.html', extension: 'html', filename: 'index'}
	  //var basename = require('../filesystem/basename')
	  var opt = ''
	  var realOpt = ''
	  var optName = ''
	  var optTemp = 0
	  var tmpArr = {}
	  var cnt = 0
	  var i = 0
	  var haveBasename = false
	  var haveExtension = false
	  var haveFilename = false
	  // Input defaulting & sanitation
	  if (!path) {
		return false
	  }
	  if (!options) {
		options = 'PATHINFO_ALL'
	  }
	  // Initialize binary arguments. Both the string & integer (constant) input is
	  // allowed
	  var OPTS = {
		'PATHINFO_DIRNAME': 1,
		'PATHINFO_BASENAME': 2,
		'PATHINFO_EXTENSION': 4,
		'PATHINFO_FILENAME': 8,
		'PATHINFO_ALL': 0
	  }
	  // PATHINFO_ALL sums up all previously defined PATHINFOs (could just pre-calculate)
	  for (optName in OPTS) {
		if (OPTS.hasOwnProperty(optName)) {
		  OPTS.PATHINFO_ALL = OPTS.PATHINFO_ALL | OPTS[optName]
		}
	  }
	  if (typeof options !== 'number') {
		// Allow for a single string or an array of string flags
		options = [].concat(options)
		for (i = 0; i < options.length; i++) {
		  // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
		  if (OPTS[options[i]]) {
			optTemp = optTemp | OPTS[options[i]]
		  }
		}
		options = optTemp
	  }
	  // Internal Functions
	  var _getExt = function (path) {
		var str = path + ''
		var dotP = str.lastIndexOf('.') + 1
		return !dotP ? false : dotP !== str.length ? str.substr(dotP) : ''
	  }
	  // Gather path infos
	  if (options & OPTS.PATHINFO_DIRNAME) {
		var dirName = path
		  .replace(/\\/g, '/')
		  .replace(/\/[^/]*\/?$/, '') // dirname
		tmpArr.dirname = dirName === path ? '.' : dirName
	  }
	  if (options & OPTS.PATHINFO_BASENAME) {
		if (haveBasename === false) {
		  haveBasename = basename(path)
		}
		tmpArr.basename = haveBasename
	  }
	  if (options & OPTS.PATHINFO_EXTENSION) {
		if (haveBasename === false) {
		  haveBasename = basename(path)
		}
		if (haveExtension === false) {
		  haveExtension = _getExt(haveBasename)
		}
		if (haveExtension !== false) {
		  tmpArr.extension = haveExtension
		}
	  }
	  if (options & OPTS.PATHINFO_FILENAME) {
		if (haveBasename === false) {
		  haveBasename = basename(path)
		}
		if (haveExtension === false) {
		  haveExtension = _getExt(haveBasename)
		}
		if (haveFilename === false) {
		  haveFilename = haveBasename.slice(0, haveBasename.length - (haveExtension
			? haveExtension.length + 1
			: haveExtension === false
			  ? 0
			  : 1
			)
		  )
		}
		tmpArr.filename = haveFilename
	  }
	  // If array contains only 1 element: return string
	  cnt = 0
	  for (opt in tmpArr) {
		if (tmpArr.hasOwnProperty(opt)) {
		  cnt++
		  realOpt = opt
		}
	  }
	  if (cnt === 1) {
		return tmpArr[realOpt]
	  }
	  // Return full-blown array
	  return tmpArr
	}
	
	function urlencode (str) {		
		//        example 1: urlencode('Kevin van Zonneveld!')
		//        returns 1: 'Kevin+van+Zonneveld%21'
		//        example 2: urlencode('http://kvz.io/')
		//        returns 2: 'http%3A%2F%2Fkvz.io%2F'
		//        example 3: urlencode('http://www.google.nl/search?q=Locutus&ie=utf-8')
		//        returns 3: 'http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3DLocutus%26ie%3Dutf-8'
		str = (str + '')
		// Tilde should be allowed unescaped in future versions of PHP (as reflected below),
		// but if you want to reflect current
		// PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
		return encodeURIComponent(str)
			.replace(/!/g, '%21')
			.replace(/'/g, '%27')
			.replace(/\(/g, '%28')
			.replace(/\)/g, '%29')
			.replace(/\*/g, '%2A')
			.replace(/%20/g, '+')
	}
	
	function number_format (number, decimals, decPoint, thousandsSep) {
		//   example 1: number_format(1234.56)
		//   returns 1: '1,235'
		//   example 2: number_format(1234.56, 2, ',', ' ')
		//   returns 2: '1 234,56'
		//   example 3: number_format(1234.5678, 2, '.', '')
		//   returns 3: '1234.57'
		//   example 4: number_format(67, 2, ',', '.')
		//   returns 4: '67,00'
		//   example 5: number_format(1000)
		//   returns 5: '1,000'
		//   example 6: number_format(67.311, 2)
		//   returns 6: '67.31'
		//   example 7: number_format(1000.55, 1)
		//   returns 7: '1,000.6'
		//   example 8: number_format(67000, 5, ',', '.')
		//   returns 8: '67.000,00000'
		//   example 9: number_format(0.9, 0)
		//   returns 9: '1'
		//  example 10: number_format('1.20', 2)
		//  returns 10: '1.20'
		//  example 11: number_format('1.20', 4)
		//  returns 11: '1.2000'
		//  example 12: number_format('1.2000', 3)
		//  returns 12: '1.200'
		//  example 13: number_format('1 000,50', 2, '.', ' ')
		//  returns 13: '100 050.00'
		//  example 14: number_format(1e-8, 8, '.', '')
		//  returns 14: '0.00000001'
		number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
		var n = !isFinite(+number) ? 0 : +number
		var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
		var sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
		var dec = (typeof decPoint === 'undefined') ? '.' : decPoint
		var s = ''
		var toFixedFix = function (n, prec) {
			var k = Math.pow(10, prec)
			return '' + (Math.round(n * k) / k).toFixed(prec)
		}
		// @todo: for IE parseFloat(0.55).toFixed(0) = 0;
		s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
		if (s[0].length > 3) {
			s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
		}
		if ((s[1] || '').length < prec) {
			s[1] = s[1] || ''
			s[1] += new Array(prec - s[1].length + 1).join('0')
		}
		return s.join(dec)
	}

	function sha1 (str) {		
		//example 1: sha1('Kevin van Zonneveld')
		//returns 1: '54916d2e62f65b3afa6e192e6a601cdbe5cb5897'
		var hash
		try {			
			var sha1sum = crypto.createHash('sha1')
			sha1sum.update(str)
			hash = sha1sum.digest('hex')
		} catch (e) {
			hash = undefined
		}
		if (hash !== undefined) {
			return hash
		}
		var _rotLeft = function (n, s) {
			var t4 = (n << s) | (n >>> (32 - s))
			return t4
		}
		var _cvtHex = function (val) {
			var str = ''
			var i
			var v
			for (i = 7; i >= 0; i--) {
				v = (val >>> (i * 4)) & 0x0f
				str += v.toString(16)
			}
			return str
		}
		var blockstart
		var i, j
		var W = new Array(80)
		var H0 = 0x67452301
		var H1 = 0xEFCDAB89
		var H2 = 0x98BADCFE
		var H3 = 0x10325476
		var H4 = 0xC3D2E1F0
		var A, B, C, D, E
		var temp
		// utf8_encode
		str = unescape(encodeURIComponent(str))
		var strLen = str.length
		var wordArray = []
		for (i = 0; i < strLen - 3; i += 4) {
			j = str.charCodeAt(i) << 24 |
			  str.charCodeAt(i + 1) << 16 |
			  str.charCodeAt(i + 2) << 8 |
			  str.charCodeAt(i + 3)
			wordArray.push(j)
		}
		switch (strLen % 4) {
			case 0:
			  i = 0x080000000
			  break
			case 1:
			  i = str.charCodeAt(strLen - 1) << 24 | 0x0800000
			  break
			case 2:
			  i = str.charCodeAt(strLen - 2) << 24 | str.charCodeAt(strLen - 1) << 16 | 0x08000
			  break
			case 3:
			  i = str.charCodeAt(strLen - 3) << 24 |
				str.charCodeAt(strLen - 2) << 16 |
				str.charCodeAt(strLen - 1) <<
			  8 | 0x80
			  break
		}
		wordArray.push(i)
		while ((wordArray.length % 16) !== 14) {
			wordArray.push(0)
		}
		wordArray.push(strLen >>> 29)
		wordArray.push((strLen << 3) & 0x0ffffffff)
		for (blockstart = 0; blockstart < wordArray.length; blockstart += 16) {
			for (i = 0; i < 16; i++) {
			  W[i] = wordArray[blockstart + i]
			}
			for (i = 16; i <= 79; i++) {
			  W[i] = _rotLeft(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1)
			}
			A = H0
			B = H1
			C = H2
			D = H3
			E = H4
			for (i = 0; i <= 19; i++) {
			  temp = (_rotLeft(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff
			  E = D
			  D = C
			  C = _rotLeft(B, 30)
			  B = A
			  A = temp
			}
			for (i = 20; i <= 39; i++) {
			  temp = (_rotLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff
			  E = D
			  D = C
			  C = _rotLeft(B, 30)
			  B = A
			  A = temp
			}
			for (i = 40; i <= 59; i++) {
			  temp = (_rotLeft(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff
			  E = D
			  D = C
			  C = _rotLeft(B, 30)
			  B = A
			  A = temp
			}
			for (i = 60; i <= 79; i++) {
			  temp = (_rotLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff
			  E = D
			  D = C
			  C = _rotLeft(B, 30)
			  B = A
			  A = temp
			}
			H0 = (H0 + A) & 0x0ffffffff
			H1 = (H1 + B) & 0x0ffffffff
			H2 = (H2 + C) & 0x0ffffffff
			H3 = (H3 + D) & 0x0ffffffff
			H4 = (H4 + E) & 0x0ffffffff
		}
		temp = _cvtHex(H0) + _cvtHex(H1) + _cvtHex(H2) + _cvtHex(H3) + _cvtHex(H4)
		return temp.toLowerCase()
	}
		
	function unserialize (data) {  
		//   example 1: unserialize('a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}')
		//   returns 1: ['Kevin', 'van', 'Zonneveld']
		//   example 2: unserialize('a:2:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";}')
		//   returns 2: {firstName: 'Kevin', midName: 'van'}
		//   example 3: unserialize('a:3:{s:2:"ü";s:2:"ü";s:3:"四";s:3:"四";s:4:"𠜎";s:4:"𠜎";}')
		//   returns 3: {'ü': 'ü', '四': '四', '𠜎': '𠜎'}
		var $global = (typeof window !== 'undefined' ? window : global)
		var utf8Overhead = function (str) {
			var s = str.length
			for (var i = str.length - 1; i >= 0; i--) {
			  var code = str.charCodeAt(i)
			  if (code > 0x7f && code <= 0x7ff) {
				s++
			  } else if (code > 0x7ff && code <= 0xffff) {
				s += 2
			  }
			  // trail surrogate
			  if (code >= 0xDC00 && code <= 0xDFFF) {
				i--
			  }
			}
			return s - 1
		}
		var error = function (type,msg, filename, line) {
			throw new $global[type](msg, filename, line)
		}
		var readUntil = function (data, offset, stopchr) {
			var i = 2
			var buf = []
			var chr = data.slice(offset, offset + 1)
			while (chr !== stopchr) {
			  if ((i + offset) > data.length) {
				error('Error', 'Invalid')
			  }
			  buf.push(chr)
			  chr = data.slice(offset + (i - 1), offset + i)
			  i += 1
			}
			return [buf.length, buf.join('')]
		}
		
		var readChrs = function (data, offset, length) {
			var i, chr, buf
			buf = []
			for (i = 0; i < length; i++) {
			  chr = data.slice(offset + (i - 1), offset + i)
			  buf.push(chr)
			  length -= utf8Overhead(chr)
			}
			return [buf.length, buf.join('')]
		}
		
		function _unserialize (data, offset) {
			var dtype
			var dataoffset
			var keyandchrs
			var keys
			var contig
			var length
			var array
			var readdata
			var readData
			var ccount
			var stringlength
			var i
			var key
			var kprops
			var kchrs
			var vprops
			var vchrs
			var value
			var chrs = 0
			var typeconvert = function (x) {
			  return x
			}
			if (!offset) {
			  offset = 0
			}
			dtype = (data.slice(offset, offset + 1)).toLowerCase()
			dataoffset = offset + 2
			switch (dtype) {
			  case 'i':
				typeconvert = function (x) {
				  return parseInt(x, 10)
				}
				readData = readUntil(data, dataoffset, ';')
				chrs = readData[0]
				readdata = readData[1]
				dataoffset += chrs + 1
				break
			  case 'b':
				typeconvert = function (x) {
				  return parseInt(x, 10) !== 0
				}
				readData = readUntil(data, dataoffset, ';')
				chrs = readData[0]
				readdata = readData[1]
				dataoffset += chrs + 1
				break
			  case 'd':
				typeconvert = function (x) {
				  return parseFloat(x)
				}
				readData = readUntil(data, dataoffset, ';')
				chrs = readData[0]
				readdata = readData[1]
				dataoffset += chrs + 1
				break
			  case 'n':
				readdata = null
				break
			  case 's':
				ccount = readUntil(data, dataoffset, ':')
				chrs = ccount[0]
				stringlength = ccount[1]
				dataoffset += chrs + 2
				readData = readChrs(data, dataoffset + 1, parseInt(stringlength, 10))
				chrs = readData[0]
				readdata = readData[1]
				dataoffset += chrs + 2
				if (chrs !== parseInt(stringlength, 10) && chrs !== readdata.length) {
				  error('SyntaxError', 'String length mismatch')
				}
				break
			  case 'a':
				readdata = {}
				keyandchrs = readUntil(data, dataoffset, ':')
				chrs = keyandchrs[0]
				keys = keyandchrs[1]
				dataoffset += chrs + 2
				length = parseInt(keys, 10)
				contig = true
				for (i = 0; i < length; i++) {
				  kprops = _unserialize(data, dataoffset)
				  kchrs = kprops[1]
				  key = kprops[2]
				  dataoffset += kchrs
				  vprops = _unserialize(data, dataoffset)
				  vchrs = vprops[1]
				  value = vprops[2]
				  dataoffset += vchrs
				  if (key !== i) {
					contig = false
				  }
				  readdata[key] = value
				}
				if (contig) {
				  array = new Array(length)
				  for (i = 0; i < length; i++) {
					array[i] = readdata[i]
				  }
				  readdata = array
				}
				dataoffset += 1
				break
			  default:
				error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype)
				break
			}
			return [dtype, dataoffset - offset, typeconvert(readdata)]
		}
		return _unserialize((data + ''), 0)[2]
	}
	
	function serialize (mixedValue) {	  
		//   example 1: serialize(['Kevin', 'van', 'Zonneveld'])
		//   returns 1: 'a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}'
		//   example 2: serialize({firstName: 'Kevin', midName: 'van'})
		//   returns 2: 'a:2:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";}'
		var val, key, okey
		var ktype = ''
		var vals = ''
		var count = 0
		var _utf8Size = function (str) {
			var size = 0
			var i = 0
			var l = str.length
			var code = ''
			for (i = 0; i < l; i++) {
			  code = str.charCodeAt(i)
			  if (code < 0x0080) {
				size += 1
			  } else if (code < 0x0800) {
				size += 2
			  } else {
				size += 3
			  }
			}
			return size
		}
		
		var _getType = function (inp) {
			var match
			var key
			var cons
			var types
			var type = typeof inp
			if (type === 'object' && !inp) {
			  return 'null'
			}
			if (type === 'object') {
			  if (!inp.constructor) {
				return 'object'
			  }
			  cons = inp.constructor.toString()
			  match = cons.match(/(\w+)\(/)
			  if (match) {
				cons = match[1].toLowerCase()
			  }
			  types = ['boolean', 'number', 'string', 'array']
			  for (key in types) {
				if (cons === types[key]) {
				  type = types[key]
				  break
				}
			  }
			}
			return type
		}
		
		var type = _getType(mixedValue)
		switch (type) {
			case 'function':
			  val = ''
			  break
			case 'boolean':
			  val = 'b:' + (mixedValue ? '1' : '0')
			  break
			case 'number':
			  val = (Math.round(mixedValue) === mixedValue ? 'i' : 'd') + ':' + mixedValue
			  break
			case 'string':
			  val = 's:' + _utf8Size(mixedValue) + ':"' + mixedValue + '"'
			  break
			case 'array':
			case 'object':
			  val = 'a'
			  /*
			  if (type === 'object') {
				var objname = mixedValue.constructor.toString().match(/(\w+)\(\)/);
				if (objname === undefined) {
				  return;
				}
				objname[1] = serialize(objname[1]);
				val = 'O' + objname[1].substring(1, objname[1].length - 1);
			  }
			  */
			  for (key in mixedValue) {
				if (mixedValue.hasOwnProperty(key)) {
				  ktype = _getType(mixedValue[key])
				  if (ktype === 'function') {
					continue
				  }
				  okey = (key.match(/^[0-9]+$/) ? parseInt(key, 10) : key)
				  vals += serialize(okey) + serialize(mixedValue[key])
				  count++
				}
			  }
			  val += ':' + count + ':{' + vals + '}'
			  break
			case 'undefined':
			default:
			  // Fall-through
			  // if the JS object has a property which contains a null value,
			  // the string cannot be unserialized by PHP
			  val = 'N'
			  break
		}
		if (type !== 'object' && type !== 'array') {
			val += ';'
		}
		return val
	}
	
	function stripos (fHaystack, fNeedle, fOffset) {
		//   example 1: stripos('ABC', 'a')
		//   returns 1: 0
		if(typeof fNeedle === 'number')
			return false
		else {
			var haystack = (fHaystack + '').toLowerCase()
			var needle = (fNeedle + '').toLowerCase()
			var index = 0
			if ((index = haystack.indexOf(needle, fOffset)) !== -1) {
				return index
			}
			return false
		}
	}
	
	/************************************************************************************************
	
				Matrimony Common Functions for nodejs - Start
	
	************************************************************************************************/
	//For Basic Authentication Middleware Func
	checkAuth = function (req, res, next) {
	    var user = basicbauth(req);
	    if (!user || !user.name || !user.pass) {
			res.set('WWW-Authenticate', 'Basic realm=Authorization Required');		
			return res.sendStatus(401);
		};
		if (user.name === uilityconfig.admin.username && user.pass === uilityconfig.admin.password) {
			return next();
		} else {
			res.set('WWW-Authenticate', 'Basic realm=Authorization Required');		
			return res.sendStatus(401);
		};
	}
	
	//Function To basic verification / Authentication fro Logged Member
	function BasicAuth(matriId, encID)
	{
		if (bmgeneric.getEncryptpass(matriId, encID) == encID) {
			if (bmvars.LOGINCONSOLE == 1) {
				console.log('Login Authentication success');
			}
			return true;
		} else {
			if (bmvars.LOGINCONSOLE == 1) {
				console.log('Login Authentication failed');
			}
			return false;
		}
	}
	//Check Encrypted MatriId Value
	function getEncryptpass(res,data){	
		var outputArray = {};
		if(bmgeneric.empty(data.ENCID))
		{
			outputArray['RESPONSECODE']	= 2;
			outputArray['ERRCODE']		= 61;
			res.send(outputArray);
			return false;
		} else {
			var saltkey = '', value = '', encryptdata  = '';
			saltkey		= parseInt(substr(data.ENCID, -1));
			value		= bmvars.APPSALT[saltkey][0] + data.ID + bmvars.APPSALT[saltkey][1];	
			encryptdata	= md5(value);
			var newEncid = encryptdata+saltkey; 
			if(data.ENCID==1)
				outputArray[data.ENCID]	= newEncid;
			if(newEncid != data.ENCID){
				outputArray['RESPONSECODE']	= 2;
				outputArray['ERRCODE']		= 61;				
				res.send(outputArray);	
				return false;
			} else {	
				if(data.APPTYPE == 115){					
					try {
						var decoded = jwt.verify(data.TOKENID, bminit.SECRET_KEY,{ignoreNotBefore:true});
						if(!bmgeneric.empty(decoded.data)){
							var id = decoded.data.id;
							if(id != data.ID){
								outputArray['RESPONSECODE']	=3;
								outputArray['ERRCODE']		= 61;				
								res.send(outputArray);
								return false;
							} else {
								return true;
							}
						}else {
							outputArray['RESPONSECODE']	= 4;
							outputArray['ERRCODE']		= 61;				
							res.send(outputArray);
							return false;
						}
					} catch(err) {
						outputArray['RESPONSECODE']	= 5;
						outputArray['ERRCODE']		= 61;
						outputArray['ERROR']		= err;						
						res.send(outputArray);
						return false;
					}				
				} else {
					return true;
				}
			}
		}	
	}

	function UnixTimeStamp() {
		return Math.floor(new Date().getTime() / 1000);
	}

	function millisecTime(){
		return new Date().getTime();
	}
	
	function find_mem_server (x_id) {
		var y_id = x_id.substring(1, x_id.length);
		var matriid_tot = 0;
		for (i = 0; i <= y_id.length - 1; i++) {
			matriid_tot += parseInt(y_id.substr(i, 1));
		}
		var server_arr_id = (matriid_tot) % (dbconfig.memcache_server_count);
		return server_arr_id;
	}

	function getProfileIndexName(indexGender,mothertounge)
	{
		if(indexGender==0)
			indexPrefixName = dbconfig.femalematrimonyprofileindex;
		else
			indexPrefixName = dbconfig.malematrimonyprofileindex;
		
		if(bmgeneric.count(mothertounge) == 1 && (mothertounge[0] == 4 || mothertounge[0] == 33 || mothertounge[0] == 14 || mothertounge[0] == 41 || mothertounge[0] == 17 || mothertounge[0] == 45 || mothertounge[0] == 19 ||mothertounge[0] == 31 || mothertounge[0] == 47 || mothertounge[0] == 48 || mothertounge[0] == 34 || mothertounge[0] == 2 || mothertounge[0] == 40|| mothertounge[0] == 51))
			mem_prof_index = indexPrefixName+mothertounge[0];
		else if(mothertounge == "" || bmgeneric.count(mothertounge) > 1 || (bmgeneric.count(mothertounge) == 1 &&  mothertounge[0] == 0)) // If MotherTongue is Any OR more than 1 MotherTongue is selected
			mem_prof_index = indexPrefixName;
		else
			mem_prof_index = indexPrefixName+"99";
		return mem_prof_index;
	}

	function covertToSphinxId(bmid)
	{		
		var domainCap = bmid.substring(0,1);
		var sphinxCap = bmgeneric.array_search(domainCap, global.MATRIIDMAP);
		var sphinxId = bmid.replace(domainCap, sphinxCap);
		return sphinxId;
	}

	function converToMatriId(sphinxId)
	{
		var sphinxId = sphinxId.toString();
		var sphinxCap = parseInt(sphinxId.substring(0,3));
		var MatriIdCap = global.MATRIIDMAP[sphinxCap];	
		if(MatriIdCap!=undefined){
			var restPart = sphinxId.substring(3,sphinxId.length);
			var MatriId = MatriIdCap+restPart;
			return MatriId;
		}else{
			return sphinxId; 		
		}
	}
		
	function checkMatchData(data, fromData) {
		if (!in_array(0, fromData) && fromData[0] != '') {
			if (!in_array(data, fromData)) {
				return false;
			} else return true;
		}else return true;
	}	
	
	function bmfuncSearchCasteMapping(mothertongue) // send mothertongue in string format separted by tild operator
	{
		var mothertong = explode("~",mothertongue);
		if(is_array(mothertong) && (count(mothertong)==1))
		{
			if(array_key_exists(mothertong[0],MAPCASTEHASH))
			{
				addcastehash = implode("~",MAPCASTEHASH[mothertong[0]]);
			}
		}else{
			var addcastehash='';
			var addcaste ='';
			for(cm=0,cmh=mothertong.length;cm<cmh; cm++)			
			{
				if(array_key_exists(mothertong[cm],MAPCASTEHASH))
				{
					addcaste = implode("~",MAPCASTEHASH[mothertong[cm]]);
				}
				addcastehash = addcastehash+'~'+addcaste;
			}
			addcastehash = trim(addcastehash,"~");
		}
		return implode("~",array_unique(explode("~",addcastehash)));
	}
	
	function btnArray(actVal){
		var btnArrayValues = {};	
		btnArrayValues['SENDMAIL'] = {"btn-label":ACTBTNLABEL[actVal]['sendmail'],"appurlid":appidURLs['SENDMAIL']};
		btnArrayValues['REPSENDMAIL'] = {"btn-label":ACTBTNLABEL[actVal]['reply'],"appurlid":appidURLs['SENDMAIL']};
		btnArrayValues['MESSAGEREPLY'] = {"btn-label":ACTBTNLABEL[actVal]['reply'],"appurlid":appidURLs['MESSAGEREPLY']};
		btnArrayValues['MESSAGEREPLYYES'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['MESSAGEREPLY']};
		btnArrayValues['MSGREPLYYN'] = {"btn-label":ACTBTNLABEL[actVal]['replymailyn'],"appurlid":appidURLs['MESSAGEACCY']};
		btnArrayValues['MESSAGENINO'] = {"btn-label":ACTBTNLABEL[actVal]['notInterestedNo'],"appurlid":appidURLs['MESSAGENI']};
		btnArrayValues['PAIDPROMOTION'] = {"btn-label":ACTBTNLABEL[actVal]['becomepaid'],"appurlid":appidURLs['PAIDPROMOTION']};
		btnArrayValues['PAIDPROMOTIONSENDMAIL'] = {"btn-label":ACTBTNLABEL[actVal]['sendmail'],"appurlid":appidURLs['PAIDPROMOTION']};
		btnArrayValues['MESSAGEREMINDER'] = {"btn-label":ACTBTNLABEL[actVal]['sendReminder'],"appurlid":appidURLs['MESSAGEREMINDER']};
		btnArrayValues['MESSAGENMT'] = {"btn-label":ACTBTNLABEL[actVal]['Decide'],"appurlid":appidURLs['MESSAGENMT']};
		btnArrayValues['MESSAGENI']  = {"btn-label":ACTBTNLABEL[actVal]['notInterested'],"appurlid":appidURLs['MESSAGENI']};
		btnArrayValues['VIEWMATCHES'] = {"btn-label":ACTBTNLABEL[actVal]['viewmatches'],"appurlid":appidURLs['VIEWMATCHES']} ;
		btnArrayValues['EI'] = {"btn-label":ACTBTNLABEL[actVal]['expint'],"appurlid":appidURLs['EI']};
		btnArrayValues['EIACCEPT'] = {"btn-label":ACTBTNLABEL[actVal]['accept'],"appurlid":appidURLs['EIACCEPT']} ;
		btnArrayValues['EIACCEPTYES'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['EIACCEPT']} ;
		btnArrayValues['EISNTACCEPT'] = {"btn-label":ACTBTNLABEL[actVal]['eisntaccept'],"appurlid":appidURLs['EIACCEPT']} ;
		btnArrayValues['EINMT'] = {"btn-label":ACTBTNLABEL[actVal]['Decide'],"appurlid":appidURLs['EINMT']} ;
		btnArrayValues['EINMI'] = {"btn-label":ACTBTNLABEL[actVal]['NMI'],"appurlid":appidURLs['EINMI']} ;
		btnArrayValues['EINI'] = {"btn-label":ACTBTNLABEL[actVal]['notInterested'],"appurlid":appidURLs['EINI']} ;
		btnArrayValues['EISNTNI'] = {"btn-label":ACTBTNLABEL[actVal]['eisntnotInterested'],"appurlid":appidURLs['EINI']} ;
		btnArrayValues['EISENDREMINDER']  = {"btn-label":ACTBTNLABEL[actVal]['sendReminder'],"appurlid":appidURLs['EISENDREMINDER']};
		btnArrayValues['ADDREF']  = {"btn-label":ACTBTNLABEL[actVal]['addref'],"appurlid":appidURLs['ADDREF']};

		btnArrayValues['ADDHORO']  = {"btn-label":ACTBTNLABEL[actVal]['addhoro'],"appurlid":appidURLs['ADDHORO']};
		btnArrayValues['VIEWHORO']  = {"btn-label":ACTBTNLABEL[actVal]['viewhoro'],"appurlid":appidURLs['VIEWHORO']};

		btnArrayValues['HOROAPPROVE']  = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['HOROAPPROVE']};
		
		btnArrayValues['HORONI']  = {"btn-label":ACTBTNLABEL[actVal]['notInterested'],"appurlid":appidURLs['HORONI']};

		btnArrayValues['ADDPHOTOYES']  = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDPHOTO']};
		btnArrayValues['ADDHOROYES']  = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDHORO']};
		
		btnArrayValues['ADDPHOTO']  = {"btn-label":ACTBTNLABEL[actVal]['addphoto'],"appurlid":appidURLs['ADDPHOTO']};
		btnArrayValues['VIEWPHOTO']  = {"btn-label":ACTBTNLABEL[actVal]['viewphoto'],"appurlid":appidURLs['VIEWPHOTO']};
		
		btnArrayValues['PHOTOPASSAPPROVE'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['PHOTOPASSAPPROVE']};
		
		btnArrayValues['PHOTOPASSNI']  = {"btn-label":ACTBTNLABEL[actVal]['notInterested'],"appurlid":appidURLs['PHOTOPASSNI']};
		btnArrayValues['CALLNOW'] = {"btn-label":ACTBTNLABEL[actVal]['callnow'],"appurlid":appidURLs['CALLNOW']};
		btnArrayValues['PINREPLY'] = {"btn-label":ACTBTNLABEL[actVal]['reply'],"appurlid":appidURLs['PINREPLY']};
		btnArrayValues['PINNI'] = {"btn-label":ACTBTNLABEL[actVal]['notInterested'],"appurlid":appidURLs['PINNI']};	
		btnArrayValues['VIEWNOW'] = {"btn-label":ACTBTNLABEL[actVal]['viewnow'],"appurlid":appidURLs['VIEWNOW']};
		btnArrayValues['VIEWREF'] = {"btn-label":ACTBTNLABEL[actVal]['viewref'],"appurlid":appidURLs['VIEWREF']};
		btnArrayValues['SEARCHNOW'] = {"btn-label":ACTBTNLABEL[actVal]['searchNow'],"appurlid":appidURLs['SEARCHNOW']};
		btnArrayValues['ADDPHOTONI'] = {"btn-label":ACTBTNLABEL[actVal]['addphotoni'],"appurlid":appidURLs['ADDPHOTONI']};
		btnArrayValues['ADDHORONI'] = {"btn-label":ACTBTNLABEL[actVal]['addhoroni'],"appurlid":appidURLs['ADDHORONI']};
		
		btnArrayValues['ADDINFO'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDINFO']};
		btnArrayValues['ADDINFODET'] = {"btn-label":ACTBTNLABEL[actVal]['adddetails'],"appurlid":appidURLs['ADDINFO']};
			
		btnArrayValues['ADDEHNI'] = {"btn-label":ACTBTNLABEL[actVal]['addOthReqsNI'],"appurlid":appidURLs['ADDEHNI']};
		btnArrayValues['ADDDHNI'] = {"btn-label":ACTBTNLABEL[actVal]['addOthReqsNI'],"appurlid":appidURLs['ADDDHNI']};
		btnArrayValues['ADDSHNI'] = {"btn-label":ACTBTNLABEL[actVal]['addOthReqsNI'],"appurlid":appidURLs['ADDSHNI']};
		btnArrayValues['ADDGTRANI'] = {"btn-label":ACTBTNLABEL[actVal]['addOthReqsNI'],"appurlid":appidURLs['ADDGTRANI']};
		btnArrayValues['ADDSTARNI'] = {"btn-label":ACTBTNLABEL[actVal]['addOthReqsNI'],"appurlid":appidURLs['ADDSTARNI']};
		btnArrayValues['ADDRASINI'] = {"btn-label":ACTBTNLABEL[actVal]['addOthReqsNI'],"appurlid":appidURLs['ADDRASINI']};
		btnArrayValues['ADDCINI'] = {"btn-label":ACTBTNLABEL[actVal]['addOthReqsNI'],"appurlid":appidURLs['ADDCINI']};
		btnArrayValues['ADDEDUNI'] = {"btn-label":ACTBTNLABEL[actVal]['addOthReqsNI'],"appurlid":appidURLs['ADDEDUNI']};
		btnArrayValues['ADDOCUPNI'] = {"btn-label":ACTBTNLABEL[actVal]['addOthReqsNI'],"appurlid":appidURLs['ADDOCUPNI']};
		btnArrayValues['ADDANINI'] = {"btn-label":ACTBTNLABEL[actVal]['addOthReqsNI'],"appurlid":appidURLs['ADDANINI']};
		btnArrayValues['ADDANSONI'] = {"btn-label":ACTBTNLABEL[actVal]['addOthReqsNI'],"appurlid":appidURLs['ADDANSONI']};
		btnArrayValues['ADDMFMLNI'] = {"btn-label":ACTBTNLABEL[actVal]['addOthReqsNI'],"appurlid":appidURLs['ADDMFMLNI']};
		btnArrayValues['ADDFDNI'] = {"btn-label":ACTBTNLABEL[actVal]['addOthReqsNI'],"appurlid":appidURLs['ADDFDNI']};
		btnArrayValues['ADDHBYNI'] = {"btn-label":ACTBTNLABEL[actVal]['addOthReqsNI'],"appurlid":appidURLs['ADDHBYNI']};
		btnArrayValues['ADDINTNI'] = {"btn-label":ACTBTNLABEL[actVal]['addOthReqsNI'],"appurlid":appidURLs['ADDINTNI']};
		btnArrayValues['VIEWPHYES'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['VIEWPHYES']};
		btnArrayValues['VIEWPHACC'] = {"btn-label":ACTBTNLABEL[actVal]['accept'],"appurlid":appidURLs['VIEWPHYES']};
		btnArrayValues['VIEWPHNI'] = {"btn-label":ACTBTNLABEL[actVal]['notinterest'],"appurlid":appidURLs['VIEWPHNI']};
		btnArrayValues['ADDEHACC'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDEHACC']};
		btnArrayValues['ADDEHNOTACC'] = {"btn-label":ACTBTNLABEL[actVal]['accept'],"appurlid":appidURLs['ADDEHACC']};
		btnArrayValues['ADDEHNOTACCYES'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDEHACC']};
		btnArrayValues['ADDDHACC'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDDHACC']};
		btnArrayValues['ADDDHNOTACC'] = {"btn-label":ACTBTNLABEL[actVal]['accept'],"appurlid":appidURLs['ADDDHACC']};
		btnArrayValues['ADDDHNOTACCYES'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDDHACC']};
		btnArrayValues['ADDSHACC'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDSHACC']};
		btnArrayValues['ADDSHNOTACC'] = {"btn-label":ACTBTNLABEL[actVal]['accept'],"appurlid":appidURLs['ADDSHACC']};
		btnArrayValues['ADDSHNOTACCYES'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDSHACC']};
		btnArrayValues['ADDGTRAACC'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDGTRAACC']};
		btnArrayValues['ADDGTRANOTACC'] = {"btn-label":ACTBTNLABEL[actVal]['accept'],"appurlid":appidURLs['ADDGTRAACC']};
		btnArrayValues['ADDGTRANOTACCYES'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDGTRAACC']};
		btnArrayValues['ADDSTARACC'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDSTARACC']};
		btnArrayValues['ADDSTARNOTACC'] = {"btn-label":ACTBTNLABEL[actVal]['accept'],"appurlid":appidURLs['ADDSTARACC']};
		btnArrayValues['ADDSTARNOTACCYES'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDSTARACC']};
		btnArrayValues['ADDRASIACC'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDRASIACC']};
		btnArrayValues['ADDRASINOTACC'] = {"btn-label":ACTBTNLABEL[actVal]['accept'],"appurlid":appidURLs['ADDRASIACC']};
		btnArrayValues['ADDCIACC'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDCIACC']};
		btnArrayValues['ADDCINOTACC'] = {"btn-label":ACTBTNLABEL[actVal]['accept'],"appurlid":appidURLs['ADDCIACC']};
		btnArrayValues['ADDEDUACC'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDEDUACC']};
		btnArrayValues['ADDEDUNOTACC'] = {"btn-label":ACTBTNLABEL[actVal]['accept'],"appurlid":appidURLs['ADDEDUACC']};
		btnArrayValues['ADDEDUNOTACCYES'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDEDUACC']};
		btnArrayValues['ADDOCUPACC'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDOCUPACC']};
		btnArrayValues['ADDOCUPNOTACC'] = {"btn-label":ACTBTNLABEL[actVal]['accept'],"appurlid":appidURLs['ADDOCUPACC']};
		btnArrayValues['ADDOCUPNOTACCYES'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDOCUPACC']};
		btnArrayValues['ADDANIACC'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDANIACC']};
		btnArrayValues['ADDANINOTACC'] = {"btn-label":ACTBTNLABEL[actVal]['accept'],"appurlid":appidURLs['ADDANIACC']};
		btnArrayValues['ADDANINOTACCYES'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDANIACC']};
		btnArrayValues['ADDANSOACC'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDANSOACC']};
		btnArrayValues['ADDANSONOTACC'] = {"btn-label":ACTBTNLABEL[actVal]['accept'],"appurlid":appidURLs['ADDANSOACC']};
		btnArrayValues['ADDANSONOTACCYES'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDANSOACC']};
		btnArrayValues['ADDMFMLACC'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDMFMLACC']};
		btnArrayValues['ADDMFMLNOTACC'] = {"btn-label":ACTBTNLABEL[actVal]['accept'],"appurlid":appidURLs['ADDMFMLACC']};
		btnArrayValues['ADDMFMLNOTACCYES'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDMFMLACC']};
		btnArrayValues['ADDFDACC'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDFDACC']};
		btnArrayValues['ADDFDNOTACC'] = {"btn-label":ACTBTNLABEL[actVal]['accept'],"appurlid":appidURLs['ADDFDACC']};
		btnArrayValues['ADDHBYACC'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDHBYACC']};
		btnArrayValues['ADDHBYNOTACC'] = {"btn-label":ACTBTNLABEL[actVal]['accept'],"appurlid":appidURLs['ADDHBYACC']};
		btnArrayValues['ADDINTACC'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDINTACC']};
		btnArrayValues['ADDINTNOTACC'] = {"btn-label":ACTBTNLABEL[actVal]['accept'],"appurlid":appidURLs['ADDINTACC']};
		btnArrayValues['ADDPHACC'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDPHNOTACC']};
		btnArrayValues['ADDPHNOTACC'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDPHNOTACC']};
		btnArrayValues['ADDHRACC'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDHRNOTACC']};
		btnArrayValues['ADDHRNOTACC'] = {"btn-label":ACTBTNLABEL[actVal]['yes'],"appurlid":appidURLs['ADDHRNOTACC']};
		btnArrayValues['ADDPHNOTNI'] = {"btn-label":ACTBTNLABEL[actVal]['notinterest'],"appurlid":appidURLs['ADDPHNOTNI']};
		btnArrayValues['ADDHRNOTNI'] = {"btn-label":ACTBTNLABEL[actVal]['notinterest'],"appurlid":appidURLs['ADDHRNOTNI']};
		btnArrayValues['ADDHRNOTNI'] = {"btn-label":ACTBTNLABEL[actVal]['notinterest'],"appurlid":appidURLs['ADDHRNOTNI']};
		btnArrayValues['ADDEHNNI'] = {"btn-label":ACTBTNLABEL[actVal]['notinterest'],"appurlid":appidURLs['ADDEHNNI']};
		btnArrayValues['ADDDHNNI'] = {"btn-label":ACTBTNLABEL[actVal]['notinterest'],"appurlid":appidURLs['ADDDHNNI']};
		btnArrayValues['ADDSHNNI'] = {"btn-label":ACTBTNLABEL[actVal]['notinterest'],"appurlid":appidURLs['ADDSHNNI']};
		btnArrayValues['ADDGTRANNI'] = {"btn-label":ACTBTNLABEL[actVal]['notinterest'],"appurlid":appidURLs['ADDGTRANNI']};
		btnArrayValues['ADDSTARNNI'] = {"btn-label":ACTBTNLABEL[actVal]['notinterest'],"appurlid":appidURLs['ADDSTARNNI']};
		btnArrayValues['ADDRASINNI'] = {"btn-label":ACTBTNLABEL[actVal]['notinterest'],"appurlid":appidURLs['ADDRASINNI']};
		btnArrayValues['ADDCINNI'] = {"btn-label":ACTBTNLABEL[actVal]['notinterest'],"appurlid":appidURLs['ADDCINNI']};
		btnArrayValues['ADDEDUNNI'] = {"btn-label":ACTBTNLABEL[actVal]['notinterest'],"appurlid":appidURLs['ADDEDUNNI']};
		btnArrayValues['ADDOCUPNNI'] = {"btn-label":ACTBTNLABEL[actVal]['notinterest'],"appurlid":appidURLs['ADDOCUPNNI']};
		btnArrayValues['ADDANINNI'] = {"btn-label":ACTBTNLABEL[actVal]['notinterest'],"appurlid":appidURLs['ADDANINNI']};
		btnArrayValues['ADDANSONNI'] = {"btn-label":ACTBTNLABEL[actVal]['notinterest'],"appurlid":appidURLs['ADDANSONNI']};
		btnArrayValues['ADDMFMLNNI'] = {"btn-label":ACTBTNLABEL[actVal]['notinterest'],"appurlid":appidURLs['ADDMFMLNNI']};
		btnArrayValues['ADDFDNNI'] = {"btn-label":ACTBTNLABEL[actVal]['notinterest'],"appurlid":appidURLs['ADDFDNNI']};
		btnArrayValues['ADDHBYNNI'] = {"btn-label":ACTBTNLABEL[actVal]['notinterest'],"appurlid":appidURLs['ADDHBYNNI']};
		btnArrayValues['ADDINTNNI'] = {"btn-label":ACTBTNLABEL[actVal]['notinterest'],"appurlid":appidURLs['ADDINTNNI']};
		return btnArrayValues;
	}
	
	function getUserImagePath(matriId,timestamp,imageName='',type='',server='',APPTYPE ='',accesstype=0,returnpath=1)
	{
		var domainInfo = getDomainInfo(1,matriId);
		if(accesstype == 1)
		{
			var newpath = "/home/"+domainInfo['domainnameshort']+"/www/photos/";
			if(timestamp >= strtotime(bmvars.PHOTO_PATH_DATE[domainInfo['domainnameshort']]))
			{
				//Sample path : http://imgs.tamilmatrimony.com/photos/2013-03-19-18/M2952166_jzefD_03154_TL.jpg
				var pp = new Date(timestamp * 1000);
				var pyear = pp.getFullYear();
				var pmonth = String(pp.getMonth() + 1);
				var pday = String(pp.getDate());
				var phour = String(pp.getHours());
				if(pmonth.length==1)
					pmonth = "0" + pmonth;
				if(pday.length==1)
					pday = "0" + pday;
				if(phour.length==1)
					phour = "0" + phour;			
				newpath += pyear + "/" + pmonth  + "/" + pday  + "/" + phour + "/" ;			
			} else {
				//Sample path : http://imgs.tamilmatrimony.com/photos/2/9/M2952166_jzefD_03154_TL.jpg
				main_dir = substr(matriId ,1,1);
				sub_dir	= substr(matriId ,2,1);
				newpath += main_dir+'/'+sub_dir+'/';
			}			
			return newpath;
		} else {
			if(type=='horogen'){
				if(APPTYPE == 115){
					httpPath = global.OTHERSECUREURL+domainInfo['domainnameimgs']+'/horoscopegen/';
				} else {
					httpPath = global.SECUREURL+domainInfo['domainnameimgs']+'/horoscopegen/';
				}
			} else {
				if(server == 'img')
				{
					httpPath = global.SECUREURL+domainInfo['domainnamecdnimg']+'/photos/';
				} else if(server == 'image'){
					httpPath = global.SECUREURL+domainInfo['domainnamebmimage']+'/photos/';
				} else {
					httpPath = global.SECUREURL+domainInfo['domainnamecdnimgs']+'/photos/';
				}
			}
			
			if(timestamp >= strtotime(bmvars.PHOTO_PATH_DATE[domainInfo['domainnameshort']]))
			{
				//Sample path : http://imgs.tamilmatrimony.com/photos/2013-03-19-18/M2952166_jzefD_03154_TL.jpg
				var pp = new Date(timestamp * 1000);
				var pyear = pp.getFullYear();
				var pmonth = String(pp.getMonth() + 1);
				var pday = String(pp.getDate());
				var phour = String(pp.getHours());
				if(pmonth.length==1)
					pmonth = "0" + pmonth;
				if(pday.length==1)
					pday = "0" + pday;
				if(phour.length==1)
					phour = "0" + phour;			
				httpPath += pyear + "/" + pmonth  + "/" + pday  + "/" + phour + "/" ;	
			} else {
				//Sample path : http://imgs.tamilmatrimony.com/photos/2/9/M2952166_jzefD_03154_TL.jpg
				main_dir = substr(matriId ,1,1);
				sub_dir	= substr(matriId ,2,1);
				httpPath += main_dir+'/'+sub_dir+'/';
			}
			
			if(imageName != "") {
				outPutImg = [];
				var imgs = explode(',',imageName);
				for(var key in imgs){ 
					outPutImg.push(httpPath+imgs[key]);
				}
			} else {
				if(returnpath == 1)
				{
					outPutImg = httpPath;
				} else {
					var outPutImg =[];
					outPutImg.push(httpPath);
				}
			}			
			return outPutImg;
		}
	}
	
	// Value Retrival from Array function - confbm/bmgenericarrays.js//
	function appgetFromArryHash (arryhashname, val) {
		if (array_key_exists(val,bmgenericarrys[arryhashname])) {
			out = bmgenericarrys[arryhashname][val];
			return ((out != '')?out:'-');
		} else {
			return '-';
		}
	}
	
	// Value Retrival from Array function - confbm/bmvarsviewarren.js//
	function appgetFromArryHashEn (arryhashname, val) {
		if (array_key_exists(val,bmvarsviewarren[arryhashname])) {
			var out = bmvarsviewarren[arryhashname][val];
			return ((out != '')? out : '-');
		} else {
			return '-';
		}
	}
	
	// Value Retrival from Array function - /confbm/bmvarssearcharrincen.js//
	function appgetFromArryHashSr (arryhashname, val) {
		if (array_key_exists(val,bmvarssearcharrincen[arryhashname])) {
			out = bmvarssearcharrincen[arryhashname][val];
			return ((out != '')?out:'-');
		} else {
			return '-';
		}
	}
	
	// Value Retrival from Array function - /confbm/bmvarssearchformarrincen.js//
	function appgetFromArryHashSrFom (arryhashname, val) {
		if (array_key_exists(val,bmvarssearchformarren[arryhashname])) {
			out = bmvarssearchformarren[arryhashname][val];
			return ((out != '')?out:'-');
		} else {
			return '-';
		}
	}
	
	function addAditionalEducationHash(education){		
		if (in_array(5, education)) {
			education.push(15);
			education.push(16);
		} 
		if (in_array(6, education)) {
			education.push(17);
			education.push(18);
		} 
		if (in_array(7, education)) {
			education.push(13);
			education.push(14);
		} 		
		return education;
	}
	//Function to get the Partner Preference Array Hash
	function appgetFromPartPrefArryHash(arryhashname, val='', mappedIds='') {
		var retarray = '';
		if (val == '' || val == 0 || val == undefined) {
			retarray = bmlable.l_any; //'Any';
		} else {			
			//console.log("appgetFromPartPrefArryHash:",val);
			get_params = (is_array(val)) ? val : val.split(",");
			retarrayAlt = [];
			for (var i = 0, len = get_params.length; i < len; i++) {
				// Religion all changes
				if (arryhashname == 'RELIGIONHASH' && bmgeneric.array_key_exists(get_params[i], RELIGIONALLMAPPING)) {								
					retarray += bmvarssearcharrincen[arryhashname][get_params[i]] + ' (';
					mappedIds = RELIGIONALLMAPPING[get_params[i]];
					for (map = 0; map < mappedIds.length; map++) {
						if (bmgeneric.array_key_exists(mappedIds[map], bmvarssearcharrincen[arryhashname])) {
							retarray += bmvarssearcharrincen[arryhashname][mappedIds[map]] + ", ";
						}
					} 								
					retarray = bmgeneric.trim(retarray, ', ');
					retarray += '), ';
				}else if (get_params[i] == 1000 && mappedIds != '') {
					retarray+='Brahmin - All (';					
					//mappid = mappedIds.split(",");
					for (map = 0; map < mappedIds.length; map++) {
						if (bmgeneric.array_key_exists(mappid[map], MAPCASTEHASH)) {
							retarrayAlt += MAPCASTEHASH[mappid[map]] + ",";
						}
					} 	
					retarrayAltf = bmgeneric.trim(retarrayAlt, ', ');			
					retarrayAlts = retarrayAltf.split(",");
					for (map = 0; map < retarrayAlts.length; map++) {
						if (bmgeneric.array_key_exists(retarrayAlts[map], bmvarssearcharrincen[arryhashname])) {
							retarray += bmvarssearcharrincen[arryhashname][retarrayAlts[map]] + ",";
						}
					} 									
					retarray = bmgeneric.trim(retarray, ', ');
					retarray+='), ';
				} else {
					if (array_key_exists(get_params[i], bmvarssearcharrincen[arryhashname])) {
						retarray += bmvarssearcharrincen[arryhashname][get_params[i]] + ", ";
					}
				}
			}		
			retarray = substr(retarray, 0, strlen(retarray) - 2);
		}
		if (retarray == '') {
			retarray = bmlable.l_any; //'Any';
		}
		return retarray;
	}
	
	//Function to check the Array value exists or not
	function appgetFromHobbiesArryHash(arryhashname,val,others,valuesrc) {
		var errflag = 0;
		var retarray ='';		
		if (!emptyNull(val)) {
			if(valuesrc ==1){
				get_params = explode(",", val);	
			} else {
				get_params = explode("~", val);
			}
			for(var akey in get_params){			
				if (array_key_exists(get_params[akey], bmvarsviewarren[arryhashname])) {
					retarray += bmvarsviewarren[arryhashname][get_params[akey]] + ", ";
				} else {
					errflag = 1;
				}
			}			
		}

		if (others != '') {
			retarray += others + ", ";
		}

		if(retarray!='')
			var retarray = substr(retarray, 0, strlen(retarray) - 2);
		
		if (errflag == 1) {
			retarray = '-';
		}
		return retarray;
	}
	
	function appcalRevFloatWeight (inkgs) {
		retweight = (inkgs / 2.2046);
		return Math.round(retweight);  // return in kgs...
	}
	
	function appcalRevFloatHeight(incms){
		if(incms < 137)
			incms = 137;
		if(incms > 213)
			incms = 213;			
		var qout = (incms/30.48);
		var qoutArr = explode(".",qout.toString());
		var decVal = parseFloat("0."+qoutArr[1]);
		var ft = parseInt(qoutArr[0]);
		var inchs = Math.round((decVal*30.48)/2.54);
		var retheight = {};
		if(inchs==12){
		   retheight['ft'] = ft+1;
		   retheight['inchs'] = '';
		}else{
		   retheight['ft'] = ft;
		   retheight['inchs'] = inchs;
		}
		return retheight; // return in ft and inch...
	}
	
	// height (cms to feet conversion)
	function calRevFloatHeight(incms){
		if(incms != undefined){		
			var qout = (incms/30.48);
			var qoutArr = explode(".",qout.toString());
			var decVal = parseFloat("0."+qoutArr[1]);
			var feet = parseInt(qoutArr[0]);
			var inches = Math.round((decVal*30.48)/2.54);

			if(inches == 12){
				var text = feet + 1 +"Ft / "+Math.round(incms)+" Cms";
			}else{
				var inchVal = '';
				if(inches!=0){
					var inchVal = inches + 'In ';
				}
				var text = feet + "Ft " + inchVal + '/ '+Math.round(incms)+" Cms";
			}
			return text;
		}else{
			return '';
		}
	}
	
	//Function to format digit to inr
	function appformatdigittoinr(digits) {
		var number = explode(".", digits);
		var numarr = str_split(strrev(number[0]));
		var first = 1;
		var i = 0;
		var totstring = '';
		for(var vall in numarr) {
			
			if (i == 3 && first == 1) {
				totstring+=',';
				i = 0;
				first = 0;
			} else if (i == 2 && first == 0) {
				totstring+=',';
				i = 0;
			}
			totstring+=numarr[vall];
			i++;
		}		
		if (!empty(number[1])) {
			return totstring = strrev(totstring) + '.' + number[1];
		} else {
			return totstring = strrev(totstring);
		}
	}
	
	function roundit(which){
		return Math.round(which*100)/100;
	}
	
	
	function covertdatetotimestamp(Datedet){
		pc = new Date(Datedet);
		datetimestamp = Math.floor(pc.getTime() / 1000);
		return datetimestamp;
	}
	
	function getSplitVal(MatriId){
		if(MatriId!=""){		
			var matrivalue 	= MatriId.substring(1);
			var modules 	= matrivalue % 20;
			return modules;	
		} else {
			return '';		
		}		
	}
	
		//Function to convert to comId
	function MatriIdConCat(senderId,receiverId)
	{
		var chkSenderId = substr(senderId,0,1);
		var chkReceiverId = substr(receiverId,0,1);
		if(ord(chkSenderId) > ord(chkReceiverId))
		{
		    return receiverId+senderId;
		}
		else if(ord(chkSenderId) < ord(chkReceiverId))
		{	
			return senderId+receiverId;
		}else if(chkSenderId == chkReceiverId)
		{
		    lenSenderId = strlen(senderId);
		    lenReceiverId = strlen(receiverId);
			var charchToTrim = (lenSenderId<lenReceiverId)?lenSenderId:lenReceiverId;
			var senderIdTrim = substr(chkSenderId,0,charchToTrim);
			var receiverIdTrim = substr(chkReceiverId,0,charchToTrim);
			if(senderIdTrim < receiverIdTrim)
			{	
				return senderId+receiverId;
			} else {
				return receiverId+senderId;
			}
		}
	}
	
	//format = "yyyy-mm-dd HH:MM:ss"
	getDate = (format)=>
	{
		var now = new Date();		
		return dateFormat(now, format);
	}
	
	Log_Filename = (filename)=>
	{
		var fname = "";
		if(bmgeneric.trim(filename)!=""){			
			fname = process.env.HOSTNAME+"-"+bmgeneric.getDate("yyyy-mm-dd")+"-"+filename+".txt";
		}
		return fname;
	}
	
	getDomainInfo = (type='', val='') =>{
		DOMAINARRAY = {};
		if(bmgeneric.trim(type)==1) { // val is matriid
			domainletter = ucwords(substr(val,0,1));
			domainid = array_search(domainletter,global.IDSTARTLETTERHASH);
			domainname = global.DOMAINNAME[domainletter];
		
			DOMAINARRAY['domainnamecdn'] = strtolower(global.IDSTARTLETTERHASH[domainid]);  // eg m
		} else if (type==2) { // val is domain id as int
			domainid = val;
			domainname = global.DOMAINNAME[val];
			DOMAINARRAY['domainnamecdn'] = strtolower(global.IDSTARTLETTERHASH[domainid]);  // eg m
		} else { // val is Domain name as like tamil
			domainname=strtolower(val);
			if (domainname=='bharat') {
				domainid = 5;
				DOMAINARRAY['domainnamecdn'] = 'bh';  // eg bh
			} else {
				domainid = array_search(strtolower(val),global.DOMAINNAME);
				DOMAINARRAY['domainnamecdn'] = strtolower(global.IDSTARTLETTERHASH[domainid]);  // eg m
			}
		} 

		DOMAINARRAY['domainid'] = domainid;  // eg 1
		DOMAINARRAY['domainnameshort'] = domainname; // eg tamil
		DOMAINARRAY['domainnamelong'] = domainname+'matrimony'; // eg tamilmatrimony
		DOMAINARRAY['domainnamebmser'] = 'bmser.'+domainname+'matrimony.com'; // eg bmser.tamilmatrimony.com
		DOMAINARRAY['domainmodule'] = 'profile.'+domainname+'matrimony.com'; // eg bmser.tamilmatrimony.com
		DOMAINARRAY['domainnameweb'] = 'www.'+domainname+'matrimony.com'; // eg www.tamilmatrimony.com
		DOMAINARRAY['domainnameimg'] = 'img.'+domainname+'matrimony.com'; // eg img.tamilmatrimony.com
		DOMAINARRAY['domainnameimgs'] = 'imgs.'+domainname+'matrimony.com'; // eg imgs.tamilmatrimony.com // akamai call temp

		/* CDN Image Sever PATH */
		DOMAINARRAY['domainnamecdnimg'] = DOMAINARRAY['domainnamecdn']+'-img.matrimonycdn.com'; // eg m-img.matrimonycdn.com
		DOMAINARRAY['domainnamecdnimgs'] = DOMAINARRAY['domainnamecdn']+'-imgs.matrimonycdn.com'; // eg m-imgs.matrimonycdn.com

		DOMAINARRAY['domainnameimage'] = 'image.'+domainname+'matrimony.com'; // eg image.tamilmatrimony.com
		DOMAINARRAY['domainnamebmimage'] = 'image.'+domainname+'matrimony.com'; // eg bmimage.tamilmatrimony.com
		DOMAINARRAY['domainnamebmimg'] = 'img.'+domainname+'matrimony.com'; // eg bmimg.tamilmatrimony.com
		DOMAINARRAY['AKAMAIJSPREFIX'] = 'imgs.'+domainname+'matrimony.com'; // eg bmimg.tamilmatrimony.com
		return DOMAINARRAY;
	}
				
	//checkContactedRespondedPrivacy
	function chkContedRespPry(memberLastInfo) {
		// Checking that scenario - logged member notesinfo details
		//  To check whether member has received any msg / interest / pin / pin replied / phone number / SMS from view member
		var memberNotesInfo = {};
		for (var arrkey in memberLastInfo){	
			memberNotesInfo[strtolower(arrkey)] = memberLastInfo[arrkey];
		}
		
		// Photo password request sent and receiver accepts it.
		if(memberNotesInfo['skipprivpwdreceived'] == 1 || memberNotesInfo['skipprivpwdreceived'] == 3 || memberNotesInfo['skipprivpwdreceived'] == 6){
			return 0;
		}else if (memberNotesInfo['messagecomstatus'] > 1 || memberNotesInfo['interestcomstatus'] > 1 || memberNotesInfo['pincomstatus'] == 2 || memberNotesInfo['pincomrepliedstatus']==1 || memberNotesInfo['smscomstatus'] > 1 || memberNotesInfo['viewphonecomStatus'] > 1 || memberNotesInfo['messagecomneedmoretime']==5 || memberNotesInfo['skipprivpwdreceived']==6){
			return 0;
		}
		//  Msg Sent and Receiver has declined
		else if (memberNotesInfo['messagecomstatus'] == 1 && in_array(memberNotesInfo['messagecomdeclined'],[2,3,5,7,9,11,13,15])) {
			 //  Opposite member has declined your message, hence you cannot view mobile number.
			return 114;
		} else if (memberNotesInfo['messagecomstatus'] == 1 && memberNotesInfo['messagecomrepliedstatus'] == 2) {
			 //  Reply received from opposite member
			return 0;
		} else if (memberNotesInfo['interestcomstatus'] == 1 && in_array(memberNotesInfo['interestcomdeclined'],[2,3,5,7,9,11,13,15])) {
			//  This member has declined your interest, hence you cannot view mobile number.
			return 114;
		}  else if (memberNotesInfo['interestcomstatus'] == 1 && ((memberNotesInfo['interestcomaccepted'] == 2 || memberNotesInfo['interestcomacceptedbyPhone'] == 2 || memberNotesInfo['interestcomacceptedbysendmail'] == 2))) {
			//  Accept received from opposite member
			return 0;
		} else if (memberNotesInfo['pincomstatus'] == 1 && memberNotesInfo['pincomdeclined'] == 2 && memberNotesInfo['pincomrepliedstatus'] == 0) {
			//  pin declined by receiver at initial stage
			return 114;
		} else { //  No communication		
			return 112; // Preferred to show mobile number only to those who have contacted/responded
		}  
	}
	
	function checkLangApptype(apptype){
		if (apptype == 121 || (in_array(apptype,bmvars.ANDROIDAPPTYPE))){
			return true;
		}else{
			return false;
		}
	}
	
	function bmfuncstrToTitle(title) { 
		var smallwordsarray = ['of','a','the','and','an','or','nor','but','is','if','then','else','when', 'at','from','by','on','off','for','in','out','over','to','into','with','.']; 
		var titles = str_replace(".",". ",title);
		var words = explode(' ',strtolower(titles));
		for(var key in words){
			if(key == 0 || !in_array(words[key], smallwordsarray)){
				words[key] = ucwords(words[key]); 
			}
		}		
		return str_replace(". ",".",implode(' ', words)); 
	}
		
	function getPhotoBlurImage(photopath,imagetype = '')
	{
		if(bminit.PHOTOECNRYPTFLAG == 1){
			var imgname = blur_photo = '';
			var photoarr = {}; var imgnamesplit = {};			
			var salt = '}#f4ga~g%7hjd4&j(5yb?/!bj30ab-wi=6^7-$^R9F|GK5J#E6WT;nisha[JN'; 
			var pos = (photopath + '').lastIndexOf("/");
			
			if(pos){				
				var getimgdetarr = {};
				getimgdetarr = pathinfo(photopath);					
				if(imagetype == 250)
					imgname = str_ireplace("TL","TL_TB",getimgdetarr['basename']);
				else if(imagetype == 300) // If the passed parameter is 300 we are constructing the 300x300 image name.
					imgname = str_ireplace("TL","TL_TE",getimgdetarr['basename']);
				else
					imgname = getimgdetarr['basename'];
				
				imgnamesplit = explode("_",imgname);
				photoarr = explode(".",imgname);
				
				if(imagetype == 75)
					imgval = '_TS_';
				if(imagetype == 150)
					imgval = '_TL_';
				if(imagetype == 250)
					imgval = '_TL_TB_';
				if(imagetype == 300) // If the passed parameter is 300 we are constructing the 300x300 image name for appending with blur image name.
					imgval = '_TL_TE_';				
				blur_photo = imgnamesplit[0]+imgval+md5(sha1(salt+photoarr[0]))+"."+photoarr[1];
				return getimgdetarr['dirname']+"/"+blur_photo;
			} else {
				if(imagetype == 250)
					imgname = str_ireplace("TL","TL_TB",photopath);
				else if(imagetype == 300) // If the passed parameter is 300 we are constructing the 300x300 image name.
					imgname = str_ireplace("TL","TL_TE",photopath);
				else
					imgname = photopath;
				
				imgnamesplit = explode("_",imgname);
				photoarr = explode(".",imgname);

				if(imagetype == 75)
					imgval = '_TS_';
				if(imagetype == 150)
					imgval = '_TL_';
				if(imagetype == 250)
					imgval = '_TL_TB_';
				if(imagetype == 300) // If the passed parameter is 300 we are constructing the 300x300 image name for appending with blur image name.
					imgval = '_TL_TE_';

				blur_photo = imgnamesplit[0]+imgval+md5(sha1(salt+photoarr[0]))+"."+photoarr[1];
				return blur_photo;
			}
		} else {
			blur_photo = '';
			if(imagetype == 250)
				blur_photo = str_ireplace("TL","TL_TB_BL",photopath);
			else if(imagetype == 150)
				blur_photo = str_ireplace("TL","TL_BL",photopath);
			else if(imagetype == 75)
				blur_photo = str_ireplace("TS","TS_BL",photopath);
			
			return blur_photo;
		}
	}
	
	function str_ireplace (search, replace, subject, countObj) { 
	  //   example 1: str_ireplace('M', 'e', 'name')
	  //   returns 1: 'naee'
	  //   example 2: var $countObj = {}
	  //   example 2: str_ireplace('M', 'e', 'name', $countObj)
	  //   example 2: var $result = $countObj.value
	  //   returns 2: 1
	  var i = 0
	  var j = 0
	  var temp = ''
	  var repl = ''
	  var sl = 0
	  var fl = 0
	  var f = ''
	  var r = ''
	  var s = ''
	  var ra = ''
	  var otemp = ''
	  var oi = ''
	  var ofjl = ''
	  var os = subject
	  var osa = Object.prototype.toString.call(os) === '[object Array]'
	  // var sa = ''
	  if (typeof (search) === 'object') {
		temp = search
		search = []
		for (i = 0; i < temp.length; i += 1) {
		  search[i] = temp[i].toLowerCase()
		}
	  } else {
		search = search.toLowerCase()
	  }
	  if (typeof (subject) === 'object') {
		temp = subject
		subject = []
		for (i = 0; i < temp.length; i += 1) {
		  subject[i] = temp[i].toLowerCase()
		}
	  } else {
		subject = subject.toLowerCase()
	  }
	  if (typeof (search) === 'object' && typeof (replace) === 'string') {
		temp = replace
		replace = []
		for (i = 0; i < search.length; i += 1) {
		  replace[i] = temp
		}
	  }
	  temp = ''
	  f = [].concat(search)
	  r = [].concat(replace)
	  ra = Object.prototype.toString.call(r) === '[object Array]'
	  s = subject
	  // sa = Object.prototype.toString.call(s) === '[object Array]'
	  s = [].concat(s)
	  os = [].concat(os)
	  if (countObj) {
		countObj.value = 0
	  }
	  for (i = 0, sl = s.length; i < sl; i++) {
		if (s[i] === '') {
		  continue
		}
		for (j = 0, fl = f.length; j < fl; j++) {
		  temp = s[i] + ''
		  repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0]
		  s[i] = (temp).split(f[j]).join(repl)
		  otemp = os[i] + ''
		  oi = temp.indexOf(f[j])
		  ofjl = f[j].length
		  if (oi >= 0) {
			os[i] = (otemp).split(otemp.substr(oi, ofjl)).join(repl)
		  }
		  if (countObj) {
			countObj.value += ((temp.split(f[j])).length - 1)
		  }
		}
	  }
	  return osa ? os : os[0]
	}
	
	//New bmfuncUnifiedVersion Function for unified version logic
	function bmfuncUnifiedVersion(APPTYPE){
		if((in_array(APPTYPE,bmvars.ANDROIDAPPTYPE)) || (in_array(APPTYPE,bmvars.IOSAPPTYPE)) || APPTYPE == 115)
			return true;
		else
			return false;
	}	
		
	//#Function to map other Religion and Caste
	function mwOtherReligionCasteMapping(castearr, religionarr) {
		var showother = {};
		var OTHERMAPPING = {};
		var OTHERCASTE ={};
		var OTHERRELIGION = {};
		var ink = 0;
		for (i = 0; i < count(castearr); i++) {
			for (j = 0; j < count(religionarr); j++) {
				otherprofilebox = castearr[i] + "~" + religionarr[j];
				findkey = array_key_exists(otherprofilebox, partprefconf.PARTNERPREFOTHERRELIGION);
				if (findkey >= 1) {
					showother = partprefconf.PARTNERPREFOTHERRELIGION[otherprofilebox];
					for (k = 0; k < count(showother); k++) {
						otherarr = explode("~", showother[k]);
						OTHERCASTE[ink] = otherarr[0];
						OTHERRELIGION[ink] = otherarr[1];
						ink++;
					}
				} else {
					OTHERCASTE[ink] = castearr[i];
					OTHERRELIGION[ink] = religionarr[j];
					ink++;
				}
			}
		}
		OTHERMAPPING['CASTE'] = OTHERCASTE
		OTHERMAPPING['RELIGION'] = OTHERRELIGION;
		return OTHERMAPPING;
	}
	
	exports.stripos = stripos;
	exports.basename = basename;
	exports.urlencode = urlencode;
	exports.mwOtherReligionCasteMapping = mwOtherReligionCasteMapping;
	exports.serialize  = serialize ;
	exports.unserialize = unserialize;
	exports.bmfuncUnifiedVersion = bmfuncUnifiedVersion;
	exports.getPhotoBlurImage = getPhotoBlurImage;
	exports.sha1 = sha1;
	exports.number_format = number_format;
	exports.chkContedRespPry = chkContedRespPry;
	exports.urlencode = urlencode;
	exports.pathinfo = pathinfo;
	exports.strstr = strstr;
	exports.bmfuncstrToTitle = bmfuncstrToTitle;
	exports.AppStrToTitle = bmfuncstrToTitle;
	exports.checkLangApptype = checkLangApptype;
	exports.array_change_key_case = array_change_key_case;
	exports.substr_count = substr_count;
	exports.Log_Filename = Log_Filename;
	exports.getDate = getDate;
	exports.is_matriid = is_matriid;
	exports.isNumeric = isNumeric;
	exports.MatriIdConCat = MatriIdConCat;
	exports.ord = ord;	
	exports.getDomainInfo = getDomainInfo;
	exports.getUserImagePath = getUserImagePath;
	exports.btnArray = btnArray;
	exports.bmfuncSearchCasteMapping = bmfuncSearchCasteMapping;
	exports.checkMatchData = checkMatchData;
	exports.appformatdigittoinr = appformatdigittoinr;
	exports.getSplitVal = getSplitVal;		
	exports.implode = implode;
	exports.covertdatetotimestamp = covertdatetotimestamp;
	exports.str_replace = str_replace;
	exports.str_ireplace = str_ireplace;
	exports.strrev = strrev;
	exports.strToTile = strToTile;
	exports.strpos = strpos;
	exports.substr = substr;
	exports.trim = trim;
	exports.rtrim = rtrim;
	exports.explode = explode;
	exports.ucwords = ucwords;
	exports.allucwords = allucwords;
	exports.strtoupper = allucwords;
	exports.lcwords = lcwords;
	exports.strtolower = strtolower;
	exports.strlen = strlen;
	exports.empty = empty;
	exports.emptyNull = emptyNull;
	exports.count = count;
	exports.round = round;
	exports.isset = isset;
	exports.is_array = is_array;
	exports.is_numeric = is_numeric;
	exports.array_key_exists = array_key_exists;
	exports.array_keys = array_keys;
	exports.array_reverse = array_reverse;
	exports.in_array = in_array;
	exports.array_unique = array_unique;
	exports.array_filter = array_filter;
	exports.array_merge = array_merge;
	exports.str_split = str_split;
	exports.calRevFloatHeight = calRevFloatHeight;
	exports.appcalRevFloatHeight = appcalRevFloatHeight;
	exports.appgetFromPartPrefArryHash = appgetFromPartPrefArryHash;
	exports.addAditionalEducationHash = addAditionalEducationHash;
	exports.appgetFromHobbiesArryHash = appgetFromHobbiesArryHash;
	exports.appgetFromArryHashEn = appgetFromArryHashEn;
	exports.appgetFromArryHashSr = appgetFromArryHashSr;
	exports.appgetFromArryHashSrFom = appgetFromArryHashSrFom;
	exports.appgetFromArryHash = appgetFromArryHash;
	exports.appcalRevFloatWeight = appcalRevFloatWeight;
	exports.covertToSphinxId = covertToSphinxId;//appConvertToSphinxMatriIdFormat
	exports.converToMatriId = converToMatriId;
	exports.array_search = array_search;
	exports.array_diff = array_diff;
	exports.getProfileIndexName = getProfileIndexName;
	exports.getEncryptpass = getEncryptpass;	
	exports.millisecTime = millisecTime;	
	exports.array_intersect = array_intersect;
	exports.strip_tags = strip_tags;
	exports.nl2br = nl2br;
	exports.stripslashes = stripslashes;
	exports.number_format = number_format;
	exports.UnixTimeStamp = UnixTimeStamp;
	exports.find_mem_server = find_mem_server;	
	exports.html_entity_decode = html_entity_decode;
	exports.htmlspecialchars = htmlspecialchars;
	exports.BasicAuth = BasicAuth;
	exports.checkAuth = checkAuth;
	exports.array_rand = array_rand;	
	exports.array_walk_recursive = array_walk_recursive;
	exports.get_html_translation_table = get_html_translation_table;