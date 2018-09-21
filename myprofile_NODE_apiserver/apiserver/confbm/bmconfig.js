/*******************************************************************************************************
File    : bmconfig.js
Author	: Sathrak paldurai K
Date	: 12-11-2017	
********************************************************************************************************/
	dbconfig = {	 
		port_http: '8080',
		port_https: '8081',
		poolLimit:10,
		dbConTimeOut:4000000,
		sphConTimeOut:4000000,
		memcache_server_count : 10,
		LOADTIME:0,
		memcache_port: '1234',	
		profile_RTsphinx_port:9306,
		femalematrimonyprofileindex:"femalematrimonyprofileindex",
		malematrimonyprofileindex:"malematrimonyprofileindex",
		bookmarkedindex:"bookmarkedindex",
		contactstatusindex:"contactstatusindex",
		malematchwatchmemppindex:"malematchwatchmemppindex",
		femalematchwatchmemppindex:"femalematchwatchmemppindex",
		malematchwatchsysppindex:"malematchwatchsysppindex",
		femalematchwatchsysppindex:"femalematchwatchsysppindex",
		onlinemembersdeltaindex:"onlinemembersdelta",
		onlinemembersdeltaindex_update : {'HPUSA':'onlinemembersdelta_hpusa','EC':'onlinemembersdelta_ec','MD':'onlinemembersdelta_md','BGR':'onlinemembersdelta_bgr','TKY':'onlinemembersdelta_kty'}
	};	
	
	uilityconfig = {
		admin : {username:'nodeapi',password:'node@123'}
	};

	exports.dbconfig = dbconfig;