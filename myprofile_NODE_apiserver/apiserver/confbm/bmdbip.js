/**********************************************************************************************
File    : bmdbip.js
Author  : Sathrak Paldurai k
Date    : 12-June-2017
************************************************************************************************
Description: This inc file have mysql class and functions.
***********************************************************************************************/
	global.DBSLAVEIP = {};
	global.DBMASTERIP = {};
	global.MASTERSLAVEIP = {};
	global.LATESTUPDATEIP = {};
	/*==================MASTER SERVER ============================*/	
	//Master IP for matrimonyms database tables
	DBMASTERIP['DB1_MERGEMASTER'] = '172.29.23.68';
	DBMASTERIP['DB2_MERGEMASTER'] = '172.29.23.68';
	DBMASTERIP['DB4_MERGEMASTER'] = '172.29.23.68';
	DBMASTERIP['DB10_MERGEMASTER'] = '172.29.23.68';

	//MASTER SERVER IP'S//
	DBMASTERIP['DB1_MASTER'] = '172.29.23.76';
	DBMASTERIP['DB2_MASTER'] = '172.29.23.77';
	DBMASTERIP['DB4_MASTER'] = '172.29.23.78';
	DBMASTERIP['DB10_MASTER'] = '172.29.23.79';
	
	DBMASTERIP['DB5'] = '172.29.23.69'; // payment, astroproducts, assured contact, onlineswayamwaram ODB1 MASTER 
	DBMASTERIP['DB6'] = '172.29.23.70'; // Classified, events, franchisee, offers, sms, wedding directory, matriother, mobile alrests, match watch, wap matrimony, matrimony, profilematch, messenger ODB2 MASTER
	//DBMASTERIP['DB14'] = '172.29.23.72'; // Assuredcontact interface, TM, FO, CI, BMSupport, Mailsystem, Onlineswyavram log - ODB4 MASTER
	DBMASTERIP['DB7'] = '172.29.23.178'; //odb6
		
/*==================SLAVE SERVER ============================*/		
		
	//SLAVE SERVER IP'S //
	DBSLAVEIP['DB1_SLAVE'] = '172.22.1.19'; //SDB1
	DBSLAVEIP['DB2_SLAVE'] = '172.22.0.66';  //SDB2
	DBSLAVEIP['DB4_SLAVE'] = '172.22.1.89'; //SDB3 (old IP - 172.29.23.110)
	DBSLAVEIP['DB10_SLAVE'] ='172.29.23.111'; //SDB4
	
	//STD_ALONE DB SLAVE SERVER IP'S - DB 5/6/7/14 - SLAVE	
	DBSLAVEIP['DB5_SLAVE'] = '172.29.2.114'; // ODB1 SLAVE
	DBSLAVEIP['DB6_SLAVE'] = '172.29.3.114'; // ODB2 SLAVE
	DBSLAVEIP['DB7_SLAVE'] = '172.29.23.179'; //odb7
	//DBSLAVEIP['DB14_SLAVE'] = '172.22.1.176'; // Assuredcontact interface, TM, FO, CI, BMSupport, Mailsystem, Onlineswyavram log
	
/*==================Common Masert and Slave Server ============================*/
	
// Members viewed my profile DB MASTER
	MASTERSLAVEIP['DBMVMPbmvm'] = "172.29.23.170"; // C - Parsi, K - Kannada, G - Gujarati, M - Tamil, P - Punjabi, S - Sindhi, Y - Oriya
	MASTERSLAVEIP['DBMVMPbmvm2'] = "172.29.23.171"; // D - Marwadi, A - Assame, B- Bengali, E - Kerala, U - Urdu, R - Marathi
	MASTERSLAVEIP['DBMVMPbmvm3'] = "172.29.23.172"; // H - Hindi, T - Telugu
	
	//MASTERSLAVEIP['DBTRACKHOST'] ='172.29.1.75';
	//MASTERSLAVEIP['CLOUDIP'] ="50.57.49.75";
		
	LATESTUPDATEIP['MYHOME_LU_SERVER'] = '172.29.23.12';