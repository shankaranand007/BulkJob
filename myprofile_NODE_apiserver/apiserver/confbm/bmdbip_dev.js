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
//SLAVE Mysql Server IP Live
	/*
	$DBCONIP['DB1_SLAVE'] = '172.29.23.109'; //SDB1
	$DBCONIP['DB2_SLAVE'] = '172.22.0.66';  //SDB2 and SDB9 Added LB ip on Jun 21st (old ip 172.29.23.71)
	$DBCONIP['DB4_SLAVE'] = '172.22.1.89'; //SDB3 and SDB10 Added LB ip old ip - 172.29.23.110
	$DBCONIP['DB10_SLAVE'] ='172.29.23.111'; //SDB4
	*/	
	DBSLAVEIP['DB1_SLAVE'] = '192.168.20.184';//Slave IP for other database tables
	DBSLAVEIP['DB2_SLAVE'] = '192.168.20.184';
	DBSLAVEIP['DB4_SLAVE'] = '192.168.20.184';
	DBSLAVEIP['DB10_SLAVE'] = '192.168.20.184';
	
//SLAVE Mysql Server IP Live
	/*
	$DBCONIP['DB1_MASTER'] = '172.29.23.76';
	$DBCONIP['DB2_MASTER'] = '172.29.23.77';
	$DBCONIP['DB4_MASTER'] = '172.29.23.78';
	$DBCONIP['DB10_MASTER'] = '172.29.23.79';
	*/	
	DBMASTERIP['DB1_MASTER'] = '192.168.20.190';//Slave IP for other database tables
	DBMASTERIP['DB2_MASTER'] = '192.168.20.190';
	DBMASTERIP['DB4_MASTER'] = '192.168.20.190';
	DBMASTERIP['DB10_MASTER'] = '192.168.20.190';
	
//SLAVE Mysql Server IP Live 
	/*
	//Master IP for matrimonyms database tables
	$DBCONIP['DB1_MERGEMASTER'] = '172.29.23.68';
	$DBCONIP['DB2_MERGEMASTER'] = '172.29.23.68';
	$DBCONIP['DB4_MERGEMASTER'] = '172.29.23.68';
	$DBCONIP['DB10_MERGEMASTER'] = '172.29.23.68';
	*/
	//GLOBAL.DBMERGEMASTERIP = {};
	DBMASTERIP['DB1_MERGEMASTER'] = '192.168.20.195';//Slave IP for other database tables
	DBMASTERIP['DB2_MERGEMASTER'] = '192.168.20.195';
	DBMASTERIP['DB4_MERGEMASTER'] = '192.168.20.195';
	DBMASTERIP['DB10_MERGEMASTER'] = '192.168.20.195';
	
//BACKUP SLAVE SERVER IP'S 
	/*	
	$DBCONIP['DB1_BACKUP_SLAVE'] = '172.29.1.214'; //SDB7-1
	$DBCONIP['DB2_BACKUP_SLAVE'] = '172.29.2.214';  //SDB9
	$DBCONIP['DB4_BACKUP_SLAVE'] = '172.29.23.114'; //SDB10
	$DBCONIP['DB10_BACKUP_SLAVE'] ='172.29.23.40'; //SDB7-2	
	*/
	DBSLAVEIP['DB1_BACKUP_SLAVE'] = '192.168.20.190'; //SDB7-1
	DBSLAVEIP['DB2_BACKUP_SLAVE'] = '192.168.20.190';  //SDB9
	DBSLAVEIP['DB4_BACKUP_SLAVE'] = '192.168.20.190'; //SDB10
	DBSLAVEIP['DB10_BACKUP_SLAVE'] ='192.168.20.190'; //SDB7-2	
	/*

//STD_ALONE DB MASTER SERVER IP'S - DB 5/6/7/14 - MASTER
	/*
	$DBCONIP['DB5'] = '172.29.23.69'; // payment, astroproducts, assured contact, onlineswayamwaram ODB1 MASTER
	$DBCONIP['DB6'] = '172.29.23.70'; // Classified, events, franchisee, offers, sms, wedding directory, matriother, mobile alrests, match watch, wap matrimony, matrimony, profilematch, messenger ODB2 MASTER
	$DBCONIP['DB14'] = '172.29.23.72'; // Assuredcontact interface, TM, FO, CI, BMSupport, Mailsystem, Onlineswyavram log - ODB4 MASTER
	$DBCONIP['DB7'] = '172.29.23.178'; //odb6
	$DBCONIP['OMM_MASTER'] = '172.29.23.72'; //LB server for ODB4 - for omm
	*/
	DBMASTERIP['DB5'] = '192.168.20.196'; // payment, astroproducts, assured contact, onlineswayamwaram ODB1 MASTER
	DBMASTERIP['DB6'] = '192.168.20.191'; // Classified, events, franchisee, offers, sms, wedding directory, matriother, mobile alrests, match watch, wap matrimony, matrimony, profilematch, messenger ODB2 MASTER
	DBMASTERIP['DB14'] = '192.168.20.198'; // Assuredcontact interface, TM, FO, CI, BMSupport, Mailsystem, Onlineswyavram log - ODB4 MASTER
	DBMASTERIP['DB7'] = '192.168.20.199'; //odb6
	//DBMASTERIP['OMM_MASTER'] = '172.29.23.72'; //LB server for ODB4 - for omm
	
//STD_ALONE DB SLAVE SERVER IP'S - DB 5/6/7/14 - SLAVE	
	/*
	$DBCONIP['DB5_SLAVE'] = '172.29.2.114'; // ODB1 SLAVE
	$DBCONIP['DB6_SLAVE'] = '172.29.3.114'; // ODB2 SLAVE
	$DBCONIP['DB7_SLAVE'] = '172.29.23.179'; //odb7
	$DBCONIP['DB14_SLAVE'] = '172.22.1.176'; // Assuredcontact interface, TM, FO, CI, BMSupport, Mailsystem, Onlineswyavram log - ODB5 SLAVE Server //LB server for ODB3 and ODB5 SLAVE
	$DBCONIP['DB14_SLAVE3'] = '172.29.1.101'; //LB server for ODB3 SLAVE
	$DBCONIP['DB14_SLAVE_LB'] = '172.22.1.176'; //LB server for ODB3 SLAVE
	$DBCONIP['OMM_SLAVE'] = '172.22.1.176'; //LB server for ODB4 SLAVE - for omm
	*/
	DBSLAVEIP['DB5_SLAVE'] = '192.168.20.195'; // ODB1 SLAVE
	DBSLAVEIP['DB6_SLAVE'] = '192.168.20.195'; // ODB2 SLAVE
	DBSLAVEIP['DB7_SLAVE'] = '192.168.20.199'; //odb7
	DBSLAVEIP['DB14_SLAVE'] = '192.168.20.202'; // Assuredcontact interface, TM, FO, CI, BMSupport, Mailsystem, Onlineswyavram log
	DBSLAVEIP['DB14_SLAVE3'] = '192.168.20.202'; //LB server for ODB3 SLAVE
	DBSLAVEIP['DB14_SLAVE_LB'] = '192.168.20.202'; //LB server for ODB3 SLAVE
	//DBSLAVEIP['OMM_SLAVE'] = '172.22.1.176'; //LB server for ODB4 SLAVE - for omm
	
	
	//Common Masert and Slave Server
	
//Mail server ip for email id validation during registration
	/*
	$DBCONIP['MAIL1_SERVER'] = '172.22.0.85';
	$DBCONIP['MAIL2_SERVER'] = '172.22.0.86';
	$DBCONIP['MAIL3_SERVER'] = '172.22.0.87';
	$DBCONIP['MAIL4_SERVER'] = '172.22.0.88';
	*/
	/*MASTERSLAVEIP['MAIL1_SERVER'] = '172.22.0.85';
	MASTERSLAVEIP['MAIL2_SERVER'] = '172.22.0.86';
	MASTERSLAVEIP['MAIL3_SERVER'] = '172.22.0.87';
	MASTERSLAVEIP['MAIL4_SERVER'] = '172.22.0.88';*/
		
	/*
	//affiliate module track host ip
	$DBCONIP['DBTRACKHOST'] ='172.29.1.75';
	// Cloud MySql Authentication Details.
	$CLOUDDBCONIP['CLOUDIP'] ="50.57.49.75";
	//Myhome ips for latest updates and preferred section(cluster)
	$DBCONIP['MYHOME_LU_SERVER'] = '172.29.23.12';
	$DBCONIP['MYHOME_CLUSTER_SERVER'] = '172.29.23.12';
	*/	
	//MASTERSLAVEIP['DBTRACKHOST'] ='172.29.1.75';
	//MASTERSLAVEIP['CLOUDIP'] ="50.57.49.75";
	MASTERSLAVEIP['MYHOME_LU_SERVER'] = '192.168.20.195';
	MASTERSLAVEIP['MYHOME_CLUSTER_SERVER'] = '192.168.20.195';
	
// Members viewed my profile DB MASTER
	/*
	$DBCONIP['DBMVMPbmvm'] = "172.29.23.170"; // C - Parsi, K - Kannada, G - Gujarati, M - Tamil, P - Punjabi, S - Sindhi, Y - Oriya
	$DBCONIP['DBMVMPbmvm2'] = "172.29.23.171"; // D - Marwadi, A - Assame, B- Bengali, E - Kerala, U - Urdu, R - Marathi
	$DBCONIP['DBMVMPbmvm3'] = "172.29.23.172"; // H - Hindi, T - Telugu
	*/
	MASTERSLAVEIP['DBMVMPbmvm'] = "192.168.20.195"; // C - Parsi, K - Kannada, G - Gujarati, M - Tamil, P - Punjabi, S - Sindhi, Y - Oriya
	MASTERSLAVEIP['DBMVMPbmvm2'] = "192.168.20.195"; // D - Marwadi, A - Assame, B- Bengali, E - Kerala, U - Urdu, R - Marathi
	MASTERSLAVEIP['DBMVMPbmvm3'] = "192.168.20.195"; // H - Hindi, T - Telugu

// Some Common DB ips	
	/*
	$DBCONIP['BMC'] = '172.29.22.101'; // bmc db server - bmc
	$DBCONIP['PRIVILEGE'] = '172.29.22.101'; // privilege server
	$DBCONIP['PROFILEMATCHDBIP'] = '172.29.22.101'; // for profilematch. Pointing to BMC DB SERVER. Should be crosschecked and removed.
	$DBCONIP['PROFILEMATCH'] = '172.29.22.102'; // individual IP for PROFILE MATCH  NOT YET CHANGED TO NEW IP
	$DBCONIP['OPENFIRE'] = '172.29.22.102'; // OPENFIRE
	$DBCONIP['INDWEB'] = '172.29.22.103'; // Indweb db server - campaign - CAMP1 SERVER
	$DBCONIP['SERVICECLOUD'] = '184.106.173.239'; // For service.bharatmatrimony.com domain cloud server details 
	$DBCONIP['SPHINXFILE4'] = "172.29.22.108"; //equivalent to file4 - old IP 172.29.22.107
	*/	
	/*
	MASTERSLAVEIP['BMC'] = '172.29.22.101'; // bmc db server - bmc
	MASTERSLAVEIP['PRIVILEGE'] = '172.29.22.101'; // privilege server
	MASTERSLAVEIP['PROFILEMATCHDBIP'] = '172.29.22.101'; // for profilematch. Pointing to BMC DB SERVER. Should be crosschecked and removed.
	MASTERSLAVEIP['PROFILEMATCH'] = '172.29.22.102'; // individual IP for PROFILE MATCH  NOT YET CHANGED TO NEW IP
	MASTERSLAVEIP['OPENFIRE'] = '172.29.22.102'; // OPENFIRE
	MASTERSLAVEIP['INDWEB'] = '172.29.22.103'; // Indweb db server - campaign - CAMP1 SERVER
	MASTERSLAVEIP['SERVICECLOUD'] = '184.106.173.239'; // For service.bharatmatrimony.com domain cloud server details 
	MASTERSLAVEIP['SPHINXFILE4'] = "172.29.22.108"; //equivalent to file4 - old IP 172.29.22.107
	
	*/