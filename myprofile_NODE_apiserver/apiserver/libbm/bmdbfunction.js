/**********************************************************************************************
File    : bmdbfunction.js
Author  : Sathrak Paldurai k
Date    : 12-June-2017
************************************************************************************************
Description: This inc file have mysql class and functions.
***********************************************************************************************/

	// Members viewed my profile//appDBGetMVMPDomainInfo
	exports.getDBMVMPDomainInfo = function(MatriId) 
	{	
		var ip = '';
		var domain_prefix = bmgeneric.ucwords(bmgeneric.substr(MatriId,0,1));
		SphinxMVMPbmvm = ['C', 'K', 'G', 'M', 'P', 'S', 'Y']; // C - Parsi, K - Kannada, G - Gujarati, M - Tamil, P - Punjabi, S - Sindhi, Y - Oriya
		SphinxMVMPbmvm2 = ['D','A','B','E','U','R']; // D - Marwadi, A - Assame, B- Bengali, E - Kerala, U - Urdu, R - Marathi
		SphinxMVMPbmvm3 = ['H','T']; //hindi - H,Telugu - T,

		if(bmgeneric.in_array(domain_prefix,SphinxMVMPbmvm))
		{
			ip = 'DBMVMPbmvm';
		}
		else if(bmgeneric.in_array(domain_prefix,SphinxMVMPbmvm2))
		{
			ip = 'DBMVMPbmvm2';
		}
		else if(bmgeneric.in_array(domain_prefix,SphinxMVMPbmvm3))
		{
			ip = 'DBMVMPbmvm3';
		}
		return ip;
	}