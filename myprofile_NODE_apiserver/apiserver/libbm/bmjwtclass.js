/*************************************************************************************************** 
* File		: bmjwtclass.js
* Author	: K.Sathrak paldurai k
* Date		: 02-Sep-2017
* ************************************************************************************************** 
* Description	: JWT Class file.
****************************************************************************************************/
	
	var jwt = require('jsonwebtoken');
	//var SECRET_KEY = 'XYZ123$BHARAT#MATRIMONY$PWA987ABC';
		
	module.exports = class JWT {
		constructor() {
			SECRET_KEY = 'XYZ123$BHARAT#MATRIMONY$PWA987ABC';
		}
		
		decode(TOKENID){
			// verify a token symmetric
			jwt.verify(TOKENID, SECRET_KEY, function(err, decoded) {
				console.log(err,"decoded:",decoded) // bar
			});
		}
		
		encode(mid){
			jwt.sign(mid, SECRET_KEY, { algorithm: 'RS256' }, function(err, token) {
			  console.log(token);
			});
		}	
	} 	
