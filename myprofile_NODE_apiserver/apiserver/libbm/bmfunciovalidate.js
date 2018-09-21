/******************************************************************************************************
| File Name			: bmfunciovalidate.js
| Author Name		: Sathrak paldurai k
| Description		: Filters a string for injection attempts and removes any suspicious data
| Created On		: 01 Nov, 2017
******************************************************************************************************/
module.exports = class bmIOValidate {
	sanitize(str){
		if (bmgeneric.is_array(str)){
			bmgeneric.array_walk_recursive(str, 'clean');
			while (list(key) = each(str)){
				str[key] = this.sanitize(str[key]);
			}
			return str;
		}else{
				str = bmgeneric.trim(str);
		}
	
		/*
		 * Remove Null Characters
		 *
		 * This prevents sandwiching null characters
		 * between ascii characters, like Java\0script.
         *
		 */
		str = preg_replace('/\0+/', '', str);
        str = preg_replace('/(\\\\0)+/', '', str);

		/*
		 * Validate standard character entities
		 *
		 * Add a semicolon if missing.  We do this to enable
		 * the conversion of entities to ASCII later.
         *
		 */
		str = preg_replace('#(&\#?[0-9a-z]+)[\x00-\x20]*;?#i', "\\1;", str);

		/*
		 * Validate UTF16 two byte encoding (x00)
		 *
		 * Just as above, adds a semicolon if missing.
         *
		 */
		str = preg_replace('#(&\#x?)([0-9A-F]+);?#i',"\\1\\2;",str);	
	
		str = preg_replace_callback("/[a-z]+=([\'\"]).*?\\1/si", array(this, 'attribute_conversion'), str);

		str = preg_replace_callback("/<([\w]+)[^>]*>/si", array(this, 'html_entity_decode_callback'), str);

		/*
		 * Not Allowed Under Any Conditions
		 */
		bad = array('document.cookie'=> '','document.write' => '','document.domain' => '','.parentNode' => '','.innerHTML' => '','window.location'	=> '','-moz-binding' => '','<!--' => '&lt;!--','-->' => '--&gt;','<!CDATA['=> '&lt;![CDATA[');

		foreach (bad as key => val) {
			str = str_replace(key, val, str);
		}
		
		bad = array("javascript\s*:"=> '',"expression\s*\("=> '',"Redirect\s+302"=> '');

		foreach (bad as key => val) {		
			str = preg_replace("#".key."#i", val, str);
        }

		/*
		 * Makes PHP tags safe		
		 */
		str = str_replace(array('<?php', '<?PHP', '<?', '?'.'>','<','>'),  array('&lt;?php', '&lt;?PHP', '&lt;?', '?&gt;','&lt;','&gt;'), str);

		/*
		 * Compact any exploded words
		 *
		 * This corrects words like:  j a v a s c r i p t
		 * These words are compacted back to their correct state.
		 *
		 */
		words = array('javascript', 'expression', 'vbscript', 'script', 'applet', 'alert', 'document', 'write', 'cookie', 'window','meta','confirm');
        foreach (words as word) {        
			temp = '';
			for (i = 0; i < strlen(word); i++) {			
				temp .= substr(word, i, 1)."\s*";
            }
			str = preg_replace('#('.substr(temp, 0, -3).')(\W)#ise', "preg_replace('/\s+/s', '', '\\1').'\\2'", str);
		}

		/*
		 * Remove disallowed Javascript in links or img tags
		 */
		do
		{
			original = str;
			if ((stripos(str, '</a>') !== FALSE) || preg_match("/<\/a>/i", str)) {            
				str = preg_replace_callback("#<a.*?</a>#si", array(this, 'js_link_removal'), str);				
			}
			if ((stripos(str, '<img') !== FALSE) || preg_match("/img/i", str)) {            
				str = preg_replace_callback("#<img.*?".">#si", array(this, 'js_img_removal'), str);				
			}

			if (((stripos(str, 'script') !== FALSE || stripos(str, 'xss') !== FALSE)) || preg_match("/(script|xss)/i", str)) {            
				str = preg_replace("#</*(script|xss).*?\>#si", "", str);
            }
		}
		
		while (original != str);
		unset(original);

		/*
		 * Remove JavaScript Event Handlers
		 */
		event_handlers = array('onblur','onchange','onclick','onfocus','onload','onmouseover','onmouseup','onmousedown','onselect','onsubmit','onunload','onkeypress','onkeydown','onkeyup','onresize','xmlns');
		str = preg_replace("#<([^>]+)(".implode('|', event_handlers).")([^>]*)>#iU", "&lt;\\1\\2\\3&gt;", str);
		/*
		 * Sanitize naughty HTML elements
		 *
		 * If a tag containing any of the words in the list
		 * below is found, the tag gets converted to entities.
		 *
		 * So this: <blink>
		 * Becomes: &lt;blink&gt;
		 *
		 */
		str = preg_replace('#<(/*\s*)(alert|applet|basefont|base|behavior|bgsound|blink|body|embed|expression|form|frameset|frame|head|html|ilayer|iframe|input|layer|link|meta|object|plaintext|style|script|textarea|title|xml|xss)([^>]*)>#is', "&lt;\\1\\2\\3&gt;", str);

		/*
		 * Sanitize naughty scripting elements(PhP and Javascript)
		 * For example:	eval('some code')
		 * Becomes:		eval&#40;'some code'&#41;
		 *
		 */
		str = preg_replace('#(alert|cmd|passthru|eval|exec|expression|system|fopen|fsockopen|file|file_get_contents|readfile|unlink)(\s*)\((.*?)\)#si', "\\1\\2&#40;\\3&#41;", str);

		/*
		 * Final clean up
		 *
		 * This adds a bit of extra precaution in case
		 * something got through the above filters
		 *
		 */
		bad = array(
			'document.cookie'	=> '',
			'document.write'	=> '',
			'document.domain'	=> '',
			'.parentNode'		=> '',
			'.innerHTML'		=> '',
			'window.location'	=> '',
			'-moz-binding'		=> '',
			'alert('			=> '',
			'alert&#40;'		=> '',
			'&lt;script'		=> '',
			'&lt;object'		=> '',
			'&lt;/object&gt;'	=> '',
			'&lt;/script&gt;'	=> '',
			'<!--'				=> '',
			'-->'				=> '',
			'<!CDATA['			=> '',
			'&lt;br&gt;'		=> '<br>',
			'&lt;meta'			=>	'',
			'confirm('			=> '',
			'confirm&#40;'			=> '',
			'prompt('			=>'',
			'prompt&#40;'			=> '',
			'sleep('			=>'',
			'sleep&#40;'			=> ''
			
		);

		foreach (bad as key => val) {
			str = str_ireplace(key, val, str);
		}

		bad = array("javascript\s*:"=> '',"expression\s*\("=> '',"Redirect\s+302"=> '');
		foreach (bad as key => val) {
			str = preg_replace("#".key."#i", val, str);
		}
		str = this->html_decode(str);
		return str;
	}

	js_link_removal(match){	
		return preg_replace("#<a.+?href=.*?(alert\(|alert&\#40;|javascript\:|window\.|document\.|\.cookie|<script|<xss).*?\>.*?</a>#si", "", match[0]);
    }	
	
	js_img_removal(match){
    	return preg_replace("#<img.+?src=.*?(alert\(|alert&\#40;|javascript\:|window\.|document\.|\.cookie|<script|<xss).*?\>#si", "", match[0]);
    }
	
	attribute_conversion(match){
		return str_replace('>', '&lt;', match[0]);	
	}
	
	html_entity_decode_callback(match){
		return this->html_decode(match[0]);
	}

	clean(item) {
		item = trim(item);
	}

	html_decode(str, charset='UTF-8'){
		if (stristr(str, '&') === FALSE) {
            return str;
        }
		if (function_exists('html_entity_decode') && (strtolower(charset) != 'utf-8' ||  version_compare(phpversion(), '5.0.0', '>=') ) ) {
        	str = htmlentities(str);        
			str = html_entity_decode(str);
			str = preg_replace('~&#x([0-9a-f]{2,5})~ei', 'chr(hexdec("\\1"))', str);
			return preg_replace('~&#([0-9]{2,4})~e', 'chr(\\1)', str);
		}

		// Numeric Entities
		str = preg_replace('~&#x([0-9a-f]{2,5});{0,1}~ei', 'chr(hexdec("\\1"))', str);
		str = preg_replace('~&#([0-9]{2,4});{0,1}~e', 'chr(\\1)', str);
		// Literal Entities - Slightly slow so we do another check
		if (stristr(str, '&') === FALSE) {
			str = strtr(str, array_flip(get_html_translation_table(HTML_ENTITIES)));
		}
		return str;		
	}

}