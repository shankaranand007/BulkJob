/**********************************************************************************************
File    : sphinxvars.js
Author  : Sathrak Paldurai k
Date    : 12-June-2017
************************************************************************************************
Description: This inc file have Sphinx class and functions.
***********************************************************************************************/
	//# SphinxQL connection port
	bmsphinxvars = {
		SPHINXQLCONIPPORT:9306,
		SphinxAttribute : 'SPH_MATCH_FULLSCAN',
		MaxQueryTime : "30",	
		femaleInxNamePrefix:"femalematrimonyprofileindex",
		maleInxNamePrefix:"malematrimonyprofileindex",
		// Members Viewed My Mobile Number Index
		WVPIndexName:"phonerequestlistindex",

		//#recently updated profile sphinx name
		recentlyupdatedindex:"recentlyupdatedindex",	
		domainname:{"10":"hindi","8":"punjabi","15":"urdu","9":"sindhi","13":"assamese","2":"telugu","12":"parsi","4":"kannada","3":"kerala","11":"oriya","6":"marathi","5":"gujarati","7":"bengali","1":"tamil","14":"marwadi"},		
	
		languageArray : {"107":"B","106":"R","105":"G","108":"P","110":"H","109":"S","104":"K","103":"E","102":"T","101":"M","114":"D","112":"C","113":"A","111":"Y","115":"U"},
	
		languageDomainNameArray : {"107":"BENGALI","106":"MARATHI","105":"GUJARATI","108":"PUNJABI","110":"HINDI","109":"SINDHI","104":"KANNADA","103":"KERALA","102":"TELUGU","101":"TAMIL","114":"MARWADI","112":"PARSI","113":"ASSAMESE","111":"ORIYA","115":"URDU"},
	
		indexArray : {"B":"bengaliprofilenotesindex","R":"marathiprofilenotesindex","G":"gujaratiprofilenotesindex","P":"punjabiprofilenotesindex","H":"hindiprofilenotesindex","S":"sindhiprofilenotesindex","K":"kannadaprofilenotesindex","E":"keralaprofilenotesindex","T":"teluguprofilenotesindex","M":"tamilprofilenotesindex","D":"marwadiprofilenotesindex","C":"parsiprofilenotesindex","A":"assameseprofilenotesindex","Y":"oriyaprofilenotesindex","U":"urduprofilenotesindex"}
	};

/*==============Start==============SearchCluseterLP()===========Start==================*/
	//Sphinx Cluster LP IPs
	global.SPHINXLBIPCONF = {};
	global.SPHINXLBIPPORT = {};
	SPHINXLBIPCONF['SPX_SEARCH_LB'] = '172.22.0.51',//sphinxgetDomainInfo - sphinxViewProfileGetDomainInfo
	SPHINXLBIPCONF['VIEWPROFILELB_SPHINXRC2'] = '172.22.0.152', //getViewProfileDomainInfo	
	SPHINXLBIPPORT['SPHINX_PORT'] = 9306;
	
/*==============End==============SearchCluseterLP()===========End==================*/
	
/*==============Start==============SearchCluseter()===========start==================*/
	global.APPSPHINXIPCONF = {};
	global.SPHINXIPCONFPORT = {};
	//Search Cluster Sphinx IP Address - sphinxgetDomainInfoRand
	APPSPHINXIPCONF['DB3_SPHINXRC2'] = "172.29.23.84"; 
	APPSPHINXIPCONF['SPX12_SPHINXRC2'] = "172.29.23.127"; 
	APPSPHINXIPCONF['SPX14_SPHINXRC2'] = "172.29.23.128"; 
	APPSPHINXIPCONF['SPX15_SPHINXRC2'] = "172.29.23.129";
	APPSPHINXIPCONF['SPX16_SPHINXRC2'] = "172.29.23.130";
	APPSPHINXIPCONF['SPX17_SPHINXRC2'] = "172.29.23.131";
	APPSPHINXIPCONF['SPX25_SPHINXRC2'] ="172.29.23.120"; 
	APPSPHINXIPCONF['SPX26_SPHINXRC2'] ="172.29.23.121"; 
	APPSPHINXIPCONF['SPX30_SPHINXRC2'] ="172.29.23.126"; 
	APPSPHINXIPCONF['SPX36_SPHINXRC2'] ="172.29.22.38"; 
	APPSPHINXIPCONF['SPX37_SPHINXRC2'] ="172.29.22.52"; 
	APPSPHINXIPCONF['SPX39_SPHINXRC2'] ="172.29.23.223";
	APPSPHINXIPCONF['SPX40_SPHINXRC2'] ="172.29.23.226";
	APPSPHINXIPCONF['SPXSRCCH1_SPHINXRC2'] ="172.29.1.219";

	APPSPHINXIPCONF['LoadBalancer_SPHINXRC2'] = "172.22.0.51"; 
	APPSPHINXIPCONF['VIEWPROFILELB_SPHINXRC2'] = "172.22.0.152";
	//Sphinx10 server used for Recently Updated and All Mailers 
	APPSPHINXIPCONF['SPX10_RC2'] = "172.29.23.117"; //RecentMemberUpdates(not in LB )

	// Sphinx10 server LB IP 
	APPSPHINXIPCONF['SPX10_LB'] = "172.23.1.19";
	//Sphinx SEO IP Start 
	APPSPHINXIPCONF['SPHINX_SEO1'] = "172.22.0.197";  // Right now its not using anywhere
	APPSPHINXIPCONF['SPHINX_SEO2'] = "172.22.0.197";  // Right now its not using anywhere

	/*  LB Ip for Seo Cluster : 172.22.0.197    */
	APPSPHINXIPCONF['SPHINX_SEO_LB'] = "172.22.0.197"; 
	SPHINXIPCONFPORT['SPHINX_PORT'] = 9306;
/*==============End==============SearchCluseter()===========End==================*/
	
/*================================ComInfo/Notesinfo UPdate()=========Start================*/
	global.APPSPHINXDBCONIPARR = {};
	global.APPSPHINXDBARRPORT= 9306;
	APPSPHINXDBCONIPARR['DB1_SPHINXTRANS'] = ["172.29.23.165","172.29.23.190","172.29.22.67","172.29.22.215"]; 
	APPSPHINXDBCONIPARR['DB2_SPHINXTRANS'] = ["172.29.23.169","172.29.23.164","172.29.22.50","172.29.22.216","172.29.23.140","172.29.1.227"]; 
	APPSPHINXDBCONIPARR['DB3_SPHINXTRANS'] = ["172.29.23.167","172.29.23.191","172.29.22.68","172.29.22.218","172.29.1.218"]; 
	APPSPHINXDBCONIPARR['DB4_SPHINXTRANS'] = ["172.29.23.168","172.29.22.167","172.29.23.11","172.29.22.214","172.29.23.122","172.29.1.225"]; 
	APPSPHINXDBCONIPARR['DB5_SPHINXTRANS'] = ["172.29.23.166","172.29.23.163","172.29.22.217","172.29.22.69","172.29.23.137","172.29.22.45"]; 
/*================================ComInfo/Notesinfo UPdate()=========Start================*/

/*================================ComInfo/Notesinfo Cluseter()=========Start================*/
	global.APPSPHINXDBPORT = {};
	global.APPSPHINXDBCONIP = {};
	APPSPHINXDBPORT['SPHINX_PORT'] = 9306;
	//##################  ComInfo/Notesinfo Cluster Sphinx IP Address - Kumaran ################## 
	APPSPHINXDBCONIP['DB1_SPHINXTRANS'] = "172.29.23.165"; //HPUSA
	APPSPHINXDBCONIP['DB2_SPHINXTRANS'] = "172.29.23.169"; //KTY
	APPSPHINXDBCONIP['DB3_SPHINXTRANS'] = "172.29.23.167"; //BGR
	APPSPHINXDBCONIP['DB4_SPHINXTRANS'] = "172.29.23.168"; //MD
	APPSPHINXDBCONIP['DB5_SPHINXTRANS'] = "172.29.23.166"; //EC
	
	APPSPHINXDBCONIP['DB1_LB_SPHINXTRANS'] = "172.22.0.62"; 
	APPSPHINXDBCONIP['DB2_LB_SPHINXTRANS'] = "172.22.0.60"; 
	APPSPHINXDBCONIP['DB3_LB_SPHINXTRANS'] = "172.22.0.63"; 
	APPSPHINXDBCONIP['DB4_LB_SPHINXTRANS'] = "172.22.0.61"; 
	APPSPHINXDBCONIP['DB5_LB_SPHINXTRANS'] = "172.22.0.59";

/*===============End=================ComInfo/Notesinfo Cluseter()=========End================*/

/*===========Start==========matchSummary Cluster() & Search LoadBalancer=========Start=========*/
	//Matchsummary & Search LoadBalancer Ips for Ignore & Views & Contacts Index Server Variables -sphinxgetDomainInfoList -sphinxMatchSummarygetDomainInfo
	global.SPHINXMATCHSUMIP = {};
	global.SPHINXMATCHSUMPORT = 9306;
	SPHINXMATCHSUMIP['SphinxMSIP1'] = "172.22.0.54";		//HPUSA
	SPHINXMATCHSUMIP['SphinxMSIP2'] = "172.22.0.55";		//EC
	SPHINXMATCHSUMIP['SphinxMSIP3'] = "172.22.0.56";		//BGR
	SPHINXMATCHSUMIP['SphinxMSIP4'] = "172.22.0.57";		//MD
	SPHINXMATCHSUMIP['SphinxMSIP13'] = "172.22.0.58";		//KTY
		
	//Matchsummary & Search Individual IPs Ignore & Views & Contacts Index- sphinxgetDomainInfoListRand
	SPHINXMATCHSUMIP['SPX4_SPHINXRC2'] = "172.23.0.99";		//HPUSA
	SPHINXMATCHSUMIP['SPX5_SPHINXRC2'] = "172.23.0.97";		//EC
	SPHINXMATCHSUMIP['SPX6_SPHINXRC2'] = "172.23.0.65";		//BGR
	SPHINXMATCHSUMIP['SPX7_SPHINXRC2'] = "172.22.0.64";		//MD
	SPHINXMATCHSUMIP['SPX13_SPHINXRC2'] = "172.23.1.116";	//KTY
	SPHINXMATCHSUMIP['SPX18_SPHINXRC2'] = "172.23.0.132";	//HPUSA
	SPHINXMATCHSUMIP['SPX19_SPHINXRC2'] = "172.29.23.133";	//EC
	SPHINXMATCHSUMIP['SPX20_SPHINXRC2'] = "172.29.23.134";	//BGR
	SPHINXMATCHSUMIP['SPX21_SPHINXRC2'] = "172.29.23.135";	//MD
	SPHINXMATCHSUMIP['SPX22_SPHINXRC2'] = "172.29.23.136";	//KTY
/*===============End========matchSummaryCluster() & Search LoadBalancer=========End======*/	
		
/*===============Start======mvmpCluster() & Members viewed my profile=========Start=======*/
	//tamilviewedmyprofilestatsindex8
	global.SPHINXMVMPIP = {};
	global.SPHINXMVMPPORT = 9306;
	SPHINXMVMPIP['SphinxMVMPbmvm'] = "172.22.1.138"; //C - Parsi,K - Kannada,G - Gujarati,M - Tamil,P - Punjabi,S - Sindhi,Y - Oriya
	SPHINXMVMPIP['SphinxMVMPbmvm2'] = "172.22.1.139"; //D - Marwadi, A - Assame, B- Bengali, E - Kerala, U - Urdu, R - Marathi
	SPHINXMVMPIP['SphinxMVMPbmvm3'] = "172.22.1.142"; //H - Hindi, T - Telugu	
/*===============End=========mvmpCluster() & Members viewed my profile=========End======*/


/*===============Start========== For Who Viewed Also Viewed =========Start================*/
	global.SPHINXDBCONIP = {};
	global.SPHINXDBCONIPPORT= 9306;
	//SPHINXDBCONIP['SphinxWVAVbmVP'] = "184.106.92.174";//tamil - M,Kannda - K,punjabi - P,sindhi - S,Parsi - C
	//SPHINXDBCONIP['SphinxWVAVbmVP2'] = "184.106.92.174";//Kerala - E,Bengali - B,Marathi - R,assamese - A,urdu - U
	//SPHINXDBCONIP['SphinxWVAVbmVP3'] = "184.106.92.174"; //hindi - H,Telugu - T,marwadi - D,oriya - Y,Gujarati - G 
	//WVAV BMVP2 Server
	//K//14AUG15//$wvavcurlip="115.112.201.241:8080";
	global.wvavcurlip ="172.23.0.182:8080";
/*===============End================= Who Viewed Also Viewed =========End================*/

/*===============Start=================OnlineCluseter()=========Start================*/
	//################## Online Member Delta  ############### 
	global.SPHINXONLINDEX = {};
	global.SPHINXONLINDEXPORT = {};
	SPHINXONLINDEXPORT['SPHINX_PORT'] = 9306;	
	SPHINXONLINDEX['ONLINEMEMBERSDELTASELECTIP'] = '172.22.1.137';
	
	global.SPHINXONLINDEXARR = {};	
	global.SPHINXONLINDEXARRPORT = 9306;
	//################## Online Cluster Segmentation  ############### 	
	//SPHINXONLINDEXARR['ONLINEMEMBERSDELTAINSERTIP'] = ["172.29.22.27","172.29.22.28","172.29.22.138","172.29.22.139","172.29.22.140","172.29.22.142","172.29.22.143","172.29.22.144","172.29.22.145","172.29.22.146","172.29.22.147","172.29.22.148","172.29.22.149","172.29.22.150","172.29.22.151"];
	//################## Online Cluster Segmentation  ############### 
	/*SPHINXONLINDEXARR['DB1_ONLINEMEMBERSDELTASEGMENTIP'] = ["172.22.1.33","172.22.1.34","172.22.1.35"];   //HPUSA
	SPHINXONLINDEXARR['DB2_ONLINEMEMBERSDELTASEGMENTIP'] = ["172.22.1.39","172.22.1.41","172.22.1.42"];   //EC
	SPHINXONLINDEXARR['DB3_ONLINEMEMBERSDELTASEGMENTIP'] = ["172.22.1.43","172.22.1.44","172.22.1.45"];   //BGR
	SPHINXONLINDEXARR['DB4_ONLINEMEMBERSDELTASEGMENTIP'] = ["172.22.1.46","172.22.1.47","172.22.1.48"];    //MD
	SPHINXONLINDEXARR['DB5_ONLINEMEMBERSDELTASEGMENTIP'] = ["172.22.1.36","172.22.1.37","172.22.1.38"]; */  //KTY
/*===============End=================OnlineCluseter()=========End================*/

/*=======start========  MYHOME latest updates Index Server Variables ======start=======*/
	global.SPHINXLATSTUPIP = {};	
	global.SPHINXLTUPINDEXARR = {};
	SPHINXLATSTUPIP['SphinxMHLU_LB_IP'] = "172.22.0.245"; //select
	APPSPHINXDBCONIPARR['SphinxMHLU_IPS'] =  ["172.29.23.123","172.29.23.138","172.29.22.24","172.29.22.26"];//insert,update 

/*=========End======  MYHOME latest updates Index Server Variables ========End========*/

	APPSPHINXINDEXNAME = {
		  "ASSAMESE": {
			"COMINFOINDEX": "assamesecominfoindex",
			"COMINFODELTA": "assamesecominfodelta",
			"NOTESINFOINDEX": "assamesenotesinfoindex",
			"NOTESINFODELTA": "assamesenotesinfodelta",
			"FEMALEPROFILEINDEX": "femalematrimonyprofileindex",
			"MALEPROFILEINDEX": "malematrimonyprofileindex",
			"PROFILEDETAILSINDEX": "assameseprofiledetailsindex",
			"MATCHWATCH": "assamesematrimonymatchwatchindex",
			"HOBBIESINFO": "assamesematrimonyhobbiesinfoindex",
			"FAMILYINFO": "assamesematrimonyfamilyinfoindex",
			"MEMBERLISTINDEX": "assamesememberlistindex",
			"PROFILENOTESINDEX": "assameseprofilenotesindex",
			"VIEWSINDEX": "assameseviewsindex",
			"SHORTLISTINDEX": "assamesebookmarkedindex",
			"CONTACTSTATUSINDEX": "assamesecontactstatusindex",
			"MEMBERVIEWEDMYPROFILEINDEX": "assameseviewedmyprofilestatsindex",
			"MEMBERVIEWEDMYPROFILEDELTAINDEX": "assameseviewedmyprofilestatsdeltaindex",
			"REQUESTNOTESINFOINDEX": "assameserequestnotesinfoindex",
			"REQUESTNOTESINFODELTA": "assameserequestnotesinfodelta",
			"DECLINELISTINDEX": "assamesedeclinestatusindex"
		  },
		  "BENGALI": {
			"COMINFOINDEX": "bengalicominfoindex",
			"COMINFODELTA": "bengalicominfodelta",
			"NOTESINFOINDEX": "bengalinotesinfoindex",
			"NOTESINFODELTA": "bengalinotesinfodelta",
			"FEMALEPROFILEINDEX": "femalematrimonyprofileindex",
			"MALEPROFILEINDEX": "malematrimonyprofileindex",
			"PROFILEDETAILSINDEX": "bengaliprofiledetailsindex",
			"MATCHWATCH": "bengalimatrimonymatchwatchindex",
			"HOBBIESINFO": "bengalimatrimonyhobbiesinfoindex",
			"FAMILYINFO": "bengalimatrimonyfamilyinfoindex",
			"MEMBERLISTINDEX": "bengalimemberlistindex",
			"PROFILENOTESINDEX": "bengaliprofilenotesindex",
			"VIEWSINDEX": "bengaliviewsindex",
			"SHORTLISTINDEX": "bengalibookmarkedindex",
			"CONTACTSTATUSINDEX": "bengalicontactstatusindex",
			"MEMBERVIEWEDMYPROFILEINDEX": "bengaliviewedmyprofilestatsindex",
			"MEMBERVIEWEDMYPROFILEDELTAINDEX": "bengaliviewedmyprofilestatsdeltaindex",
			"REQUESTNOTESINFOINDEX": "bengalirequestnotesinfoindex",
			"REQUESTNOTESINFODELTA": "bengalirequestnotesinfodelta",
			"DECLINELISTINDEX": "bengalideclinestatusindex"
		  },
		  "GUJARATI": {
			"COMINFOINDEX": "gujaraticominfoindex",
			"COMINFODELTA": "gujaraticominfodelta",
			"NOTESINFOINDEX": "gujaratinotesinfoindex",
			"NOTESINFODELTA": "gujaratinotesinfodelta",
			"FEMALEPROFILEINDEX": "femalematrimonyprofileindex",
			"MALEPROFILEINDEX": "malematrimonyprofileindex",
			"PROFILEDETAILSINDEX": "gujaratiprofiledetailsindex",
			"MATCHWATCH": "gujaratimatrimonymatchwatchindex",
			"HOBBIESINFO": "gujaratimatrimonyhobbiesinfoindex",
			"FAMILYINFO": "gujaratimatrimonyfamilyinfoindex",
			"MEMBERLISTINDEX": "gujaratimemberlistindex",
			"PROFILENOTESINDEX": "gujaratiprofilenotesindex",
			"VIEWSINDEX": "gujarativiewsindex",
			"SHORTLISTINDEX": "gujaratibookmarkedindex",
			"CONTACTSTATUSINDEX": "gujaraticontactstatusindex",
			"MEMBERVIEWEDMYPROFILEINDEX": "gujarativiewedmyprofilestatsindex",
			"MEMBERVIEWEDMYPROFILEDELTAINDEX": "gujarativiewedmyprofilestatsdeltaindex",
			"REQUESTNOTESINFOINDEX": "gujaratirequestnotesinfoindex",
			"REQUESTNOTESINFODELTA": "gujaratirequestnotesinfodelta",
			"DECLINELISTINDEX": "gujaratideclinestatusindex"
		  },
		  "HINDI": {
			"COMINFOINDEX": "hindicominfoindex",
			"COMINFODELTA": "hindicominfodelta",
			"NOTESINFOINDEX": "hindinotesinfoindex",
			"NOTESINFODELTA": "hindinotesinfodelta",
			"FEMALEPROFILEINDEX": "femalematrimonyprofileindex",
			"MALEPROFILEINDEX": "malematrimonyprofileindex",
			"PROFILEDETAILSINDEX": "hindiprofiledetailsindex",
			"MATCHWATCH": "hindimatrimonymatchwatchindex",
			"HOBBIESINFO": "hindimatrimonyhobbiesinfoindex",
			"FAMILYINFO": "hindimatrimonyfamilyinfoindex",
			"MEMBERLISTINDEX": "hindimemberlistindex",
			"PROFILENOTESINDEX": "hindiprofilenotesindex",
			"VIEWSINDEX": "hindiviewsindex",
			"SHORTLISTINDEX": "hindibookmarkedindex",
			"CONTACTSTATUSINDEX": "hindicontactstatusindex",
			"MEMBERVIEWEDMYPROFILEINDEX": "hindiviewedmyprofilestatsindex",
			"MEMBERVIEWEDMYPROFILEDELTAINDEX": "hindiviewedmyprofilestatsdeltaindex",
			"REQUESTNOTESINFOINDEX": "hindirequestnotesinfoindex",
			"REQUESTNOTESINFODELTA": "hindirequestnotesinfodelta",
			"DECLINELISTINDEX": "hindideclinestatusindex"
		  },
		  "KANNADA": {
			"COMINFOINDEX": "kannadacominfoindex",
			"COMINFODELTA": "kannadacominfodelta",
			"NOTESINFOINDEX": "kannadanotesinfoindex",
			"NOTESINFODELTA": "kannadanotesinfodelta",
			"FEMALEPROFILEINDEX": "femalematrimonyprofileindex",
			"MALEPROFILEINDEX": "malematrimonyprofileindex",
			"PROFILEDETAILSINDEX": "kannadaprofiledetailsindex",
			"MATCHWATCH": "kannadamatrimonymatchwatchindex",
			"HOBBIESINFO": "kannadamatrimonyhobbiesinfoindex",
			"FAMILYINFO": "kannadamatrimonyfamilyinfoindex",
			"MEMBERLISTINDEX": "kannadamemberlistindex",
			"PROFILENOTESINDEX": "kannadaprofilenotesindex",
			"VIEWSINDEX": "kannadaviewsindex",
			"SHORTLISTINDEX": "kannadabookmarkedindex",
			"CONTACTSTATUSINDEX": "kannadacontactstatusindex",
			"MEMBERVIEWEDMYPROFILEINDEX": "kannadaviewedmyprofilestatsindex",
			"MEMBERVIEWEDMYPROFILEDELTAINDEX": "kannadaviewedmyprofilestatsdeltaindex",
			"REQUESTNOTESINFOINDEX": "kannadarequestnotesinfoindex",
			"REQUESTNOTESINFODELTA": "kannadarequestnotesinfodelta",
			"DECLINELISTINDEX": "kannadadeclinestatusindex"
		  },
		  "KERALA": {
			"COMINFOINDEX": "keralacominfoindex",
			"COMINFODELTA": "keralacominfodelta",
			"NOTESINFOINDEX": "keralanotesinfoindex",
			"NOTESINFODELTA": "keralanotesinfodelta",
			"FEMALEPROFILEINDEX": "femalematrimonyprofileindex",
			"MALEPROFILEINDEX": "malematrimonyprofileindex",
			"PROFILEDETAILSINDEX": "keralaprofiledetailsindex",
			"MATCHWATCH": "keralamatrimonymatchwatchindex",
			"HOBBIESINFO": "keralamatrimonyhobbiesinfoindex",
			"FAMILYINFO": "keralamatrimonyfamilyinfoindex",
			"MEMBERLISTINDEX": "keralamemberlistindex",
			"PROFILENOTESINDEX": "keralaprofilenotesindex",
			"VIEWSINDEX": "keralaviewsindex",
			"SHORTLISTINDEX": "keralabookmarkedindex",
			"CONTACTSTATUSINDEX": "keralacontactstatusindex",
			"MEMBERVIEWEDMYPROFILEINDEX": "keralaviewedmyprofilestatsindex",
			"MEMBERVIEWEDMYPROFILEDELTAINDEX": "keralaviewedmyprofilestatsdeltaindex",
			"REQUESTNOTESINFOINDEX": "keralarequestnotesinfoindex",
			"REQUESTNOTESINFODELTA": "keralarequestnotesinfodelta",
			"DECLINELISTINDEX": "keraladeclinestatusindex"
		  },
		  "MARATHI": {
			"COMINFOINDEX": "marathicominfoindex",
			"COMINFODELTA": "marathicominfodelta",
			"NOTESINFOINDEX": "marathinotesinfoindex",
			"NOTESINFODELTA": "marathinotesinfodelta",
			"FEMALEPROFILEINDEX": "femalematrimonyprofileindex",
			"MALEPROFILEINDEX": "malematrimonyprofileindex",
			"PROFILEDETAILSINDEX": "marathiprofiledetailsindex",
			"MATCHWATCH": "marathimatrimonymatchwatchindex",
			"HOBBIESINFO": "marathimatrimonyhobbiesinfoindex",
			"FAMILYINFO": "marathimatrimonyfamilyinfoindex",
			"MEMBERLISTINDEX": "marathimemberlistindex",
			"PROFILENOTESINDEX": "marathiprofilenotesindex",
			"VIEWSINDEX": "marathiviewsindex",
			"SHORTLISTINDEX": "marathibookmarkedindex",
			"CONTACTSTATUSINDEX": "marathicontactstatusindex",
			"MEMBERVIEWEDMYPROFILEINDEX": "marathiviewedmyprofilestatsindex",
			"MEMBERVIEWEDMYPROFILEDELTAINDEX": "marathiviewedmyprofilestatsdeltaindex",
			"REQUESTNOTESINFOINDEX": "marathirequestnotesinfoindex",
			"REQUESTNOTESINFODELTA": "marathirequestnotesinfodelta",
			"DECLINELISTINDEX": "marathideclinestatusindex"
		  },
		  "MARWADI": {
			"COMINFOINDEX": "marwadicominfoindex",
			"COMINFODELTA": "marwadicominfodelta",
			"NOTESINFOINDEX": "marwadinotesinfoindex",
			"NOTESINFODELTA": "marwadinotesinfodelta",
			"FEMALEPROFILEINDEX": "femalematrimonyprofileindex",
			"MALEPROFILEINDEX": "malematrimonyprofileindex",
			"PROFILEDETAILSINDEX": "marwadiprofiledetailsindex",
			"MATCHWATCH": "marwadimatrimonymatchwatchindex",
			"HOBBIESINFO": "marwadimatrimonyhobbiesinfoindex",
			"FAMILYINFO": "marwadimatrimonyfamilyinfoindex",
			"MEMBERLISTINDEX": "marwadimemberlistindex",
			"PROFILENOTESINDEX": "marwadiprofilenotesindex",
			"VIEWSINDEX": "marwadiviewsindex",
			"SHORTLISTINDEX": "marwadibookmarkedindex",
			"CONTACTSTATUSINDEX": "marwadicontactstatusindex",
			"MEMBERVIEWEDMYPROFILEINDEX": "marwadiviewedmyprofilestatsindex",
			"MEMBERVIEWEDMYPROFILEDELTAINDEX": "marwadiviewedmyprofilestatsdeltaindex",
			"REQUESTNOTESINFOINDEX": "marwadirequestnotesinfoindex",
			"REQUESTNOTESINFODELTA": "marwadirequestnotesinfodelta",
			"DECLINELISTINDEX": "marwadideclinestatusindex"
		  },
		  "ORIYA": {
			"COMINFOINDEX": "oriyacominfoindex",
			"COMINFODELTA": "oriyacominfodelta",
			"NOTESINFOINDEX": "oriyanotesinfoindex",
			"NOTESINFODELTA": "oriyanotesinfodelta",
			"FEMALEPROFILEINDEX": "femalematrimonyprofileindex",
			"MALEPROFILEINDEX": "malematrimonyprofileindex",
			"PROFILEDETAILSINDEX": "oriyaprofiledetailsindex",
			"MATCHWATCH": "oriyamatrimonymatchwatchindex",
			"HOBBIESINFO": "oriyamatrimonyhobbiesinfoindex",
			"FAMILYINFO": "oriyamatrimonyfamilyinfoindex",
			"MEMBERLISTINDEX": "oriyamemberlistindex",
			"PROFILENOTESINDEX": "oriyaprofilenotesindex",
			"VIEWSINDEX": "oriyaviewsindex",
			"SHORTLISTINDEX": "oriyabookmarkedindex",
			"CONTACTSTATUSINDEX": "oriyacontactstatusindex",
			"MEMBERVIEWEDMYPROFILEINDEX": "oriyaviewedmyprofilestatsindex",
			"MEMBERVIEWEDMYPROFILEDELTAINDEX": "oriyaviewedmyprofilestatsdeltaindex",
			"REQUESTNOTESINFOINDEX": "oriyarequestnotesinfoindex",
			"REQUESTNOTESINFODELTA": "oriyarequestnotesinfodelta",
			"DECLINELISTINDEX": "oriyadeclinestatusindex"
		  },
		  "PARSI": {
			"COMINFOINDEX": "parsicominfoindex",
			"COMINFODELTA": "parsicominfodelta",
			"NOTESINFOINDEX": "parsinotesinfoindex",
			"NOTESINFODELTA": "parsinotesinfodelta",
			"FEMALEPROFILEINDEX": "femalematrimonyprofileindex",
			"MALEPROFILEINDEX": "malematrimonyprofileindex",
			"PROFILEDETAILSINDEX": "parsiprofiledetailsindex",
			"MATCHWATCH": "parsimatrimonymatchwatchindex",
			"HOBBIESINFO": "parsimatrimonyhobbiesinfoindex",
			"FAMILYINFO": "parsimatrimonyfamilyinfoindex",
			"MEMBERLISTINDEX": "parsimemberlistindex",
			"PROFILENOTESINDEX": "parsiprofilenotesindex",
			"VIEWSINDEX": "parsiviewsindex",
			"SHORTLISTINDEX": "parsibookmarkedindex",
			"CONTACTSTATUSINDEX": "parsicontactstatusindex",
			"MEMBERVIEWEDMYPROFILEINDEX": "parsiviewedmyprofilestatsindex",
			"MEMBERVIEWEDMYPROFILEDELTAINDEX": "parsiviewedmyprofilestatsdeltaindex",
			"REQUESTNOTESINFOINDEX": "parsirequestnotesinfoindex",
			"REQUESTNOTESINFODELTA": "parsirequestnotesinfodelta",
			"DECLINELISTINDEX": "parsideclinestatusindex"
		  },
		  "PUNJABI": {
			"COMINFOINDEX": "punjabicominfoindex",
			"COMINFODELTA": "punjabicominfodelta",
			"NOTESINFOINDEX": "punjabinotesinfoindex",
			"NOTESINFODELTA": "punjabinotesinfodelta",
			"FEMALEPROFILEINDEX": "femalematrimonyprofileindex",
			"MALEPROFILEINDEX": "malematrimonyprofileindex",
			"PROFILEDETAILSINDEX": "punjabiprofiledetailsindex",
			"MATCHWATCH": "punjabimatrimonymatchwatchindex",
			"HOBBIESINFO": "punjabimatrimonyhobbiesinfoindex",
			"FAMILYINFO": "punjabimatrimonyfamilyinfoindex",
			"MEMBERLISTINDEX": "punjabimemberlistindex",
			"PROFILENOTESINDEX": "punjabiprofilenotesindex",
			"VIEWSINDEX": "punjabiviewsindex",
			"SHORTLISTINDEX": "punjabibookmarkedindex",
			"CONTACTSTATUSINDEX": "punjabicontactstatusindex",
			"MEMBERVIEWEDMYPROFILEINDEX": "punjabiviewedmyprofilestatsindex",
			"MEMBERVIEWEDMYPROFILEDELTAINDEX": "punjabiviewedmyprofilestatsdeltaindex",
			"REQUESTNOTESINFOINDEX": "punjabirequestnotesinfoindex",
			"REQUESTNOTESINFODELTA": "punjabirequestnotesinfodelta",
			"DECLINELISTINDEX": "punjabideclinestatusindex"
		  },
		  "SINDHI": {
			"COMINFOINDEX": "sindhicominfoindex",
			"COMINFODELTA": "sindhicominfodelta",
			"NOTESINFOINDEX": "sindhinotesinfoindex",
			"NOTESINFODELTA": "sindhinotesinfodelta",
			"FEMALEPROFILEINDEX": "femalematrimonyprofileindex",
			"MALEPROFILEINDEX": "malematrimonyprofileindex",
			"PROFILEDETAILSINDEX": "sindhiprofiledetailsindex",
			"MATCHWATCH": "sindhimatrimonymatchwatchindex",
			"HOBBIESINFO": "sindhimatrimonyhobbiesinfoindex",
			"FAMILYINFO": "sindhimatrimonyfamilyinfoindex",
			"MEMBERLISTINDEX": "sindhimemberlistindex",
			"PROFILENOTESINDEX": "sindhiprofilenotesindex",
			"VIEWSINDEX": "sindhiviewsindex",
			"SHORTLISTINDEX": "sindhibookmarkedindex",
			"CONTACTSTATUSINDEX": "sindhicontactstatusindex",
			"MEMBERVIEWEDMYPROFILEINDEX": "sindhiviewedmyprofilestatsindex",
			"MEMBERVIEWEDMYPROFILEDELTAINDEX": "sindhiviewedmyprofilestatsdeltaindex",
			"REQUESTNOTESINFOINDEX": "sindhirequestnotesinfoindex",
			"REQUESTNOTESINFODELTA": "sindhirequestnotesinfodelta",
			"DECLINELISTINDEX": "sindhideclinestatusindex"
		  },
		  "TAMIL": {
			"COMINFOINDEX": "tamilcominfoindex",
			"COMINFODELTA": "tamilcominfodelta",
			"NOTESINFOINDEX": "tamilnotesinfoindex",
			"NOTESINFODELTA": "tamilnotesinfodelta",
			"FEMALEPROFILEINDEX": "femalematrimonyprofileindex",
			"MALEPROFILEINDEX": "malematrimonyprofileindex",
			"PROFILEDETAILSINDEX": "tamilprofiledetailsindex",
			"MATCHWATCH": "tamilmatrimonymatchwatchindex",
			"HOBBIESINFO": "tamilmatrimonyhobbiesinfoindex",
			"FAMILYINFO": "tamilmatrimonyfamilyinfoindex",
			"MEMBERLISTINDEX": "tamilmemberlistindex",
			"PROFILENOTESINDEX": "tamilprofilenotesindex",
			"VIEWSINDEX": "tamilviewsindex",
			"SHORTLISTINDEX": "tamilbookmarkedindex",
			"CONTACTSTATUSINDEX": "tamilcontactstatusindex",
			"MEMBERVIEWEDMYPROFILEINDEX": "tamilviewedmyprofilestatsindex",
			"MEMBERVIEWEDMYPROFILEDELTAINDEX": "tamilviewedmyprofilestatsdeltaindex",
			"REQUESTNOTESINFOINDEX": "tamilrequestnotesinfoindex",
			"REQUESTNOTESINFODELTA": "tamilrequestnotesinfodelta",
			"DECLINELISTINDEX": "tamildeclinestatusindex"
		  },
		  "TELUGU": {
			"COMINFOINDEX": "telugucominfoindex",
			"COMINFODELTA": "telugucominfodelta",
			"NOTESINFOINDEX": "telugunotesinfoindex",
			"NOTESINFODELTA": "telugunotesinfodelta",
			"FEMALEPROFILEINDEX": "femalematrimonyprofileindex",
			"MALEPROFILEINDEX": "malematrimonyprofileindex",
			"PROFILEDETAILSINDEX": "teluguprofiledetailsindex",
			"MATCHWATCH": "telugumatrimonymatchwatchindex",
			"HOBBIESINFO": "telugumatrimonyhobbiesinfoindex",
			"FAMILYINFO": "telugumatrimonyfamilyinfoindex",
			"MEMBERLISTINDEX": "telugumemberlistindex",
			"PROFILENOTESINDEX": "teluguprofilenotesindex",
			"VIEWSINDEX": "teluguviewsindex",
			"SHORTLISTINDEX": "telugubookmarkedindex",
			"CONTACTSTATUSINDEX": "telugucontactstatusindex",
			"MEMBERVIEWEDMYPROFILEINDEX": "teluguviewedmyprofilestatsindex",
			"MEMBERVIEWEDMYPROFILEDELTAINDEX": "teluguviewedmyprofilestatsdeltaindex",
			"REQUESTNOTESINFOINDEX": "telugurequestnotesinfoindex",
			"REQUESTNOTESINFODELTA": "telugurequestnotesinfodelta",
			"DECLINELISTINDEX": "telugudeclinestatusindex"
		  },
		  "URDU": {
			"COMINFOINDEX": "urducominfoindex",
			"COMINFODELTA": "urducominfodelta",
			"NOTESINFOINDEX": "urdunotesinfoindex",
			"NOTESINFODELTA": "urdunotesinfodelta",
			"FEMALEPROFILEINDEX": "femalematrimonyprofileindex",
			"MALEPROFILEINDEX": "malematrimonyprofileindex",
			"PROFILEDETAILSINDEX": "urduprofiledetailsindex",
			"MATCHWATCH": "urdumatrimonymatchwatchindex",
			"HOBBIESINFO": "urdumatrimonyhobbiesinfoindex",
			"FAMILYINFO": "urdumatrimonyfamilyinfoindex",
			"MEMBERLISTINDEX": "urdumemberlistindex",
			"PROFILENOTESINDEX": "urduprofilenotesindex",
			"VIEWSINDEX": "urduviewsindex",
			"SHORTLISTINDEX": "urdubookmarkedindex",
			"CONTACTSTATUSINDEX": "urducontactstatusindex",
			"MEMBERVIEWEDMYPROFILEINDEX": "urduviewedmyprofilestatsindex",
			"MEMBERVIEWEDMYPROFILEDELTAINDEX": "urduviewedmyprofilestatsdeltaindex",
			"REQUESTNOTESINFOINDEX": "urdurequestnotesinfoindex",
			"REQUESTNOTESINFODELTA": "urdurequestnotesinfodelta",
			"DECLINELISTINDEX": "urdudeclinestatusindex"
		  },
		  "KASHMIRI": {
			"COMINFOINDEX": "kashmiricominfoindex",
			"COMINFODELTA": "kashmiricominfodelta",
			"NOTESINFOINDEX": "kashmirinotesinfoindex",
			"NOTESINFODELTA": "kashmirinotesinfodelta",
			"REQUESTNOTESINFOINDEX": "kashmirirequestnotesinfoindex",
			"REQUESTNOTESINFODELTA": "kashmirirequestnotesinfodelta"
		  },
		  "RAJASTANI": {
			"COMINFOINDEX": "rajastanicominfoindex",
			"COMINFODELTA": "rajastanicominfodelta",
			"NOTESINFOINDEX": "rajastaninotesinfoindex",
			"NOTESINFODELTA": "rajastaninotesinfodelta",
			"REQUESTNOTESINFOINDEX": "rajastanirequestnotesinfoindex",
			"REQUESTNOTESINFODELTA": "rajastanirequestnotesinfodelta"
		  },
		  "BHARAT": {
			"FEMALEPROFILEINDEX": "femalematrimonyprofileindex",
			"MALEPROFILEINDEX": "malematrimonyprofileindex"
		  },
		  "MATCHWATCH": {
			"MALEMEMPPINDEX": "malematchwatchmemppindex",
			"FEMALEMEMPPINDEX": "femalematchwatchmemppindex",
			"MALESYSPPINDEX": "malematchwatchsysppindex",
			"FEMALESYSPPINDEX": "femalematchwatchsysppindex"
		 }
	};
	
	SPHINXTABLENAME = {"ASSAMESE":{"FEMALEPROFILEINDEX":"femalematrimonyprofileindex","MALEPROFILEINDEX":"malematrimonyprofileindex"},"BENGALI":{"FEMALEPROFILEINDEX":"femalematrimonyprofileindex","MALEPROFILEINDEX":"malematrimonyprofileindex"},"GUJARATI":{"FEMALEPROFILEINDEX":"femalematrimonyprofileindex","MALEPROFILEINDEX":"malematrimonyprofileindex"},"HINDI":{"FEMALEPROFILEINDEX":"femalematrimonyprofileindex","MALEPROFILEINDEX":"malematrimonyprofileindex"},"KANNADA":{"FEMALEPROFILEINDEX":"femalematrimonyprofileindex","MALEPROFILEINDEX":"malematrimonyprofileindex"},"KERALA":{"FEMALEPROFILEINDEX":"femalematrimonyprofileindex","MALEPROFILEINDEX":"malematrimonyprofileindex"},"MARATHI":{"FEMALEPROFILEINDEX":"femalematrimonyprofileindex","MALEPROFILEINDEX":"malematrimonyprofileindex"},"MARWADI":{"FEMALEPROFILEINDEX":"femalematrimonyprofileindex","MALEPROFILEINDEX":"malematrimonyprofileindex"},"ORIYA":{"FEMALEPROFILEINDEX":"femalematrimonyprofileindex","MALEPROFILEINDEX":"malematrimonyprofileindex"},"PARSI":{"FEMALEPROFILEINDEX":"femalematrimonyprofileindex","MALEPROFILEINDEX":"malematrimonyprofileindex"},"PUNJABI":{"FEMALEPROFILEINDEX":"femalematrimonyprofileindex","MALEPROFILEINDEX":"malematrimonyprofileindex"},"SINDHI":{"FEMALEPROFILEINDEX":"femalematrimonyprofileindex","MALEPROFILEINDEX":"malematrimonyprofileindex"},"TAMIL":{"FEMALEPROFILEINDEX":"femalematrimonyprofileindex","MALEPROFILEINDEX":"malematrimonyprofileindex"},"TELUGU":{"FEMALEPROFILEINDEX":"femalematrimonyprofileindex","MALEPROFILEINDEX":"malematrimonyprofileindex"},"URDU":{"FEMALEPROFILEINDEX":"femalematrimonyprofileindex","MALEPROFILEINDEX":"malematrimonyprofileindex"},"KASHMIRI":{"FEMALEPROFILEINDEX":"femalematrimonyprofileindex","MALEPROFILEINDEX":"malematrimonyprofileindex"},"RAJASTANI":{"FEMALEPROFILEINDEX":"femalematrimonyprofileindex","MALEPROFILEINDEX":"malematrimonyprofileindex"},"BHARAT":{"FEMALEPROFILEINDEX":"femalematrimonyprofileindex","MALEPROFILEINDEX":"malematrimonyprofileindex"}};
	
	SPHINXINDEXNAME = {"ASSAMESE":{"VIEWSINDEX":"assameseviewsindex","PROFILENOTESINDEX":"assameseprofilenotesindex","MEMBERLISTINDEX":"assamesememberlistindex","DECLINELISTINDEX":"assamesedeclinestatusindex","SHORTLISTINDEX":"assamesebookmarkedindex","MEMBERTOOLSINDEX":"assamesemembertoolsindex","VIEWPROFILEPROMOINDEX":"viewprofilepromoindex","COMINFOINDEX":"assamesecominfoindex","COMINFODELTA":"assamesecominfodelta","NOTESINFOINDEX":"assamesenotesinfoindex","NOTESINFODELTA":"assamesenotesinfodelta","PROFILEDETAILSINDEX":"assameseprofiledetailsindex","FAMILYINFO":"assamesematrimonyfamilyinfoindex","HOBBIESINFO":"assamesematrimonyhobbiesinfoindex","MATCHWATCH":"assamesematrimonymatchwatchindex","CONTACTSTATUSINDEX":"assamesecontactstatusindex","WVAVINDEX":"assamesewvavindex","VIEWSTATSINDEX":"assameseviewstatsindex","PINMASTERINDEX":"assamesepinmasterindex","MEMBERVIEWEDMYPROFILEINDEX":"assameseviewedmyprofilestatsindex","MEMBERTOOLSRECENTUPDATEINDEX":"assamesemembertoolsrecentupdateindex","BMSUCCESSSTORIESINDEX":"bmsuccessstoriesindex","EPPINDEX":"eppindex"},"BENGALI":{"VIEWSINDEX":"bengaliviewsindex","PROFILENOTESINDEX":"bengaliprofilenotesindex","MEMBERLISTINDEX":"bengalimemberlistindex","DECLINELISTINDEX":"bengalideclinestatusindex","SHORTLISTINDEX":"bengalibookmarkedindex","MEMBERTOOLSINDEX":"bengalimembertoolsindex","VIEWPROFILEPROMOINDEX":"viewprofilepromoindex","COMINFOINDEX":"bengalicominfoindex","COMINFODELTA":"bengalicominfodelta","NOTESINFOINDEX":"bengalinotesinfoindex","NOTESINFODELTA":"bengalinotesinfodelta","PROFILEDETAILSINDEX":"bengaliprofiledetailsindex","FAMILYINFO":"bengalimatrimonyfamilyinfoindex","HOBBIESINFO":"bengalimatrimonyhobbiesinfoindex","MATCHWATCH":"bengalimatrimonymatchwatchindex","CONTACTSTATUSINDEX":"bengalicontactstatusindex","WVAVINDEX":"bengaliwvavindex","VIEWSTATSINDEX":"bengaliviewstatsindex","PINMASTERINDEX":"bengalipinmasterindex","MEMBERVIEWEDMYPROFILEINDEX":"bengaliviewedmyprofilestatsindex","MEMBERTOOLSRECENTUPDATEINDEX":"bengalimembertoolsrecentupdateindex","BMSUCCESSSTORIESINDEX":"bmsuccessstoriesindex","EPPINDEX":"eppindex"},"GUJARATI":{"VIEWSINDEX":"gujarativiewsindex","PROFILENOTESINDEX":"gujaratiprofilenotesindex","MEMBERLISTINDEX":"gujaratimemberlistindex","DECLINELISTINDEX":"gujaratideclinestatusindex","SHORTLISTINDEX":"gujaratibookmarkedindex","MEMBERTOOLSINDEX":"gujaratimembertoolsindex","VIEWPROFILEPROMOINDEX":"viewprofilepromoindex","COMINFOINDEX":"gujaraticominfoindex","COMINFODELTA":"gujaraticominfodelta","NOTESINFOINDEX":"gujaratinotesinfoindex","NOTESINFODELTA":"gujaratinotesinfodelta","PROFILEDETAILSINDEX":"gujaratiprofiledetailsindex","FAMILYINFO":"gujaratimatrimonyfamilyinfoindex","HOBBIESINFO":"gujaratimatrimonyhobbiesinfoindex","MATCHWATCH":"gujaratimatrimonymatchwatchindex","CONTACTSTATUSINDEX":"gujaraticontactstatusindex","WVAVINDEX":"gujaratiwvavindex","VIEWSTATSINDEX":"gujarativiewstatsindex","PINMASTERINDEX":"gujaratipinmasterindex","MEMBERVIEWEDMYPROFILEINDEX":"gujarativiewedmyprofilestatsindex","MEMBERTOOLSRECENTUPDATEINDEX":"gujaratimembertoolsrecentupdateindex","BMSUCCESSSTORIESINDEX":"bmsuccessstoriesindex","EPPINDEX":"eppindex"},"HINDI":{"VIEWSINDEX":"hindiviewsindex","PROFILENOTESINDEX":"hindiprofilenotesindex","MEMBERLISTINDEX":"hindimemberlistindex","DECLINELISTINDEX":"hindideclinestatusindex","SHORTLISTINDEX":"hindibookmarkedindex","MEMBERTOOLSINDEX":"hindimembertoolsindex","VIEWPROFILEPROMOINDEX":"viewprofilepromoindex","COMINFOINDEX":"hindicominfoindex","COMINFODELTA":"hindicominfodelta","NOTESINFOINDEX":"hindinotesinfoindex","NOTESINFODELTA":"hindinotesinfodelta","PROFILEDETAILSINDEX":"hindiprofiledetailsindex","FAMILYINFO":"hindimatrimonyfamilyinfoindex","HOBBIESINFO":"hindimatrimonyhobbiesinfoindex","MATCHWATCH":"hindimatrimonymatchwatchindex","CONTACTSTATUSINDEX":"hindicontactstatusindex","WVAVINDEX":"hindiwvavindex","VIEWSTATSINDEX":"hindiviewstatsindex","PINMASTERINDEX":"hindipinmasterindex","MEMBERVIEWEDMYPROFILEINDEX":"hindiviewedmyprofilestatsindex","MEMBERTOOLSRECENTUPDATEINDEX":"hindimembertoolsrecentupdateindex","BMSUCCESSSTORIESINDEX":"bmsuccessstoriesindex","EPPINDEX":"eppindex"},"KANNADA":{"VIEWSINDEX":"kannadaviewsindex","PROFILENOTESINDEX":"kannadaprofilenotesindex","MEMBERLISTINDEX":"kannadamemberlistindex","DECLINELISTINDEX":"kannadadeclinestatusindex","SHORTLISTINDEX":"kannadabookmarkedindex","MEMBERTOOLSINDEX":"kannadamembertoolsindex","VIEWPROFILEPROMOINDEX":"viewprofilepromoindex","COMINFOINDEX":"kannadacominfoindex","COMINFODELTA":"kannadacominfodelta","NOTESINFOINDEX":"kannadanotesinfoindex","NOTESINFODELTA":"kannadanotesinfodelta","PROFILEDETAILSINDEX":"kannadaprofiledetailsindex","FAMILYINFO":"kannadamatrimonyfamilyinfoindex","HOBBIESINFO":"kannadamatrimonyhobbiesinfoindex","MATCHWATCH":"kannadamatrimonymatchwatchindex","CONTACTSTATUSINDEX":"kannadacontactstatusindex","WVAVINDEX":"kannadawvavindex","VIEWSTATSINDEX":"kannadaviewstatsindex","PINMASTERINDEX":"kannadapinmasterindex","MEMBERVIEWEDMYPROFILEINDEX":"kannadaviewedmyprofilestatsindex","MEMBERTOOLSRECENTUPDATEINDEX":"kannadamembertoolsrecentupdateindex","BMSUCCESSSTORIESINDEX":"bmsuccessstoriesindex","EPPINDEX":"eppindex"},"KERALA":{"VIEWSINDEX":"keralaviewsindex","PROFILENOTESINDEX":"keralaprofilenotesindex","MEMBERLISTINDEX":"keralamemberlistindex","DECLINELISTINDEX":"keraladeclinestatusindex","SHORTLISTINDEX":"keralabookmarkedindex","MEMBERTOOLSINDEX":"keralamembertoolsindex","VIEWPROFILEPROMOINDEX":"viewprofilepromoindex","COMINFOINDEX":"keralacominfoindex","COMINFODELTA":"keralacominfodelta","NOTESINFOINDEX":"keralanotesinfoindex","NOTESINFODELTA":"keralanotesinfodelta","PROFILEDETAILSINDEX":"keralaprofiledetailsindex","FAMILYINFO":"keralamatrimonyfamilyinfoindex","HOBBIESINFO":"keralamatrimonyhobbiesinfoindex","MATCHWATCH":"keralamatrimonymatchwatchindex","CONTACTSTATUSINDEX":"keralacontactstatusindex","WVAVINDEX":"keralawvavindex","VIEWSTATSINDEX":"keralaviewstatsindex","PINMASTERINDEX":"keralapinmasterindex","MEMBERVIEWEDMYPROFILEINDEX":"keralaviewedmyprofilestatsindex","MEMBERTOOLSRECENTUPDATEINDEX":"keralamembertoolsrecentupdateindex","BMSUCCESSSTORIESINDEX":"bmsuccessstoriesindex","EPPINDEX":"eppindex"},"MARATHI":{"VIEWSINDEX":"marathiviewsindex","PROFILENOTESINDEX":"marathiprofilenotesindex","MEMBERLISTINDEX":"marathimemberlistindex","DECLINELISTINDEX":"marathideclinestatusindex","SHORTLISTINDEX":"marathibookmarkedindex","MEMBERTOOLSINDEX":"marathimembertoolsindex","VIEWPROFILEPROMOINDEX":"viewprofilepromoindex","COMINFOINDEX":"marathicominfoindex","COMINFODELTA":"marathicominfodelta","NOTESINFOINDEX":"marathinotesinfoindex","NOTESINFODELTA":"marathinotesinfodelta","PROFILEDETAILSINDEX":"marathiprofiledetailsindex","FAMILYINFO":"marathimatrimonyfamilyinfoindex","HOBBIESINFO":"marathimatrimonyhobbiesinfoindex","MATCHWATCH":"marathimatrimonymatchwatchindex","CONTACTSTATUSINDEX":"marathicontactstatusindex","WVAVINDEX":"marathiwvavindex","VIEWSTATSINDEX":"marathiviewstatsindex","PINMASTERINDEX":"marathipinmasterindex","MEMBERVIEWEDMYPROFILEINDEX":"marathiviewedmyprofilestatsindex","MEMBERTOOLSRECENTUPDATEINDEX":"marathimembertoolsrecentupdateindex","BMSUCCESSSTORIESINDEX":"bmsuccessstoriesindex","EPPINDEX":"eppindex"},"MARWADI":{"VIEWSINDEX":"marwadiviewsindex","PROFILENOTESINDEX":"marwadiprofilenotesindex","MEMBERLISTINDEX":"marwadimemberlistindex","DECLINELISTINDEX":"marwadideclinestatusindex","SHORTLISTINDEX":"marwadibookmarkedindex","MEMBERTOOLSINDEX":"marwadimembertoolsindex","VIEWPROFILEPROMOINDEX":"viewprofilepromoindex","COMINFOINDEX":"marwadicominfoindex","COMINFODELTA":"marwadicominfodelta","NOTESINFOINDEX":"marwadinotesinfoindex","NOTESINFODELTA":"marwadinotesinfodelta","PROFILEDETAILSINDEX":"marwadiprofiledetailsindex","FAMILYINFO":"marwadimatrimonyfamilyinfoindex","HOBBIESINFO":"marwadimatrimonyhobbiesinfoindex","MATCHWATCH":"marwadimatrimonymatchwatchindex","CONTACTSTATUSINDEX":"marwadicontactstatusindex","WVAVINDEX":"marwadiwvavindex","VIEWSTATSINDEX":"marwadiviewstatsindex","PINMASTERINDEX":"marwadipinmasterindex","MEMBERVIEWEDMYPROFILEINDEX":"marwadiviewedmyprofilestatsindex","MEMBERTOOLSRECENTUPDATEINDEX":"marwadimembertoolsrecentupdateindex","BMSUCCESSSTORIESINDEX":"bmsuccessstoriesindex","EPPINDEX":"eppindex"},"ORIYA":{"VIEWSINDEX":"oriyaviewsindex","PROFILENOTESINDEX":"oriyaprofilenotesindex","MEMBERLISTINDEX":"oriyamemberlistindex","DECLINELISTINDEX":"oriyadeclinestatusindex","SHORTLISTINDEX":"oriyabookmarkedindex","MEMBERTOOLSINDEX":"oriyamembertoolsindex","VIEWPROFILEPROMOINDEX":"viewprofilepromoindex","COMINFOINDEX":"oriyacominfoindex","COMINFODELTA":"oriyacominfodelta","NOTESINFOINDEX":"oriyanotesinfoindex","NOTESINFODELTA":"oriyanotesinfodelta","PROFILEDETAILSINDEX":"oriyaprofiledetailsindex","FAMILYINFO":"oriyamatrimonyfamilyinfoindex","HOBBIESINFO":"oriyamatrimonyhobbiesinfoindex","MATCHWATCH":"oriyamatrimonymatchwatchindex","CONTACTSTATUSINDEX":"oriyacontactstatusindex","WVAVINDEX":"oriyawvavindex","VIEWSTATSINDEX":"oriyaviewstatsindex","PINMASTERINDEX":"oriyapinmasterindex","MEMBERVIEWEDMYPROFILEINDEX":"oriyaviewedmyprofilestatsindex","MEMBERTOOLSRECENTUPDATEINDEX":"oriyamembertoolsrecentupdateindex","BMSUCCESSSTORIESINDEX":"bmsuccessstoriesindex","EPPINDEX":"eppindex"},"PARSI":{"VIEWSINDEX":"parsiviewsindex","PROFILENOTESINDEX":"parsiprofilenotesindex","MEMBERLISTINDEX":"parsimemberlistindex","DECLINELISTINDEX":"parsideclinestatusindex","SHORTLISTINDEX":"parsibookmarkedindex","MEMBERTOOLSINDEX":"parsimembertoolsindex","VIEWPROFILEPROMOINDEX":"viewprofilepromoindex","COMINFOINDEX":"parsicominfoindex","COMINFODELTA":"parsicominfodelta","NOTESINFOINDEX":"parsinotesinfoindex","NOTESINFODELTA":"parsinotesinfodelta","PROFILEDETAILSINDEX":"parsiprofiledetailsindex","FAMILYINFO":"parsimatrimonyfamilyinfoindex","HOBBIESINFO":"parsimatrimonyhobbiesinfoindex","MATCHWATCH":"parsimatrimonymatchwatchindex","CONTACTSTATUSINDEX":"parsicontactstatusindex","WVAVINDEX":"parsiwvavindex","VIEWSTATSINDEX":"parsiviewstatsindex","PINMASTERINDEX":"parsipinmasterindex","MEMBERVIEWEDMYPROFILEINDEX":"parsiviewedmyprofilestatsindex","MEMBERTOOLSRECENTUPDATEINDEX":"parsimembertoolsrecentupdateindex","BMSUCCESSSTORIESINDEX":"bmsuccessstoriesindex","EPPINDEX":"eppindex"},"PUNJABI":{"VIEWSINDEX":"punjabiviewsindex","PROFILENOTESINDEX":"punjabiprofilenotesindex","MEMBERLISTINDEX":"punjabimemberlistindex","DECLINELISTINDEX":"punjabideclinestatusindex","SHORTLISTINDEX":"punjabibookmarkedindex","MEMBERTOOLSINDEX":"punjabimembertoolsindex","VIEWPROFILEPROMOINDEX":"viewprofilepromoindex","COMINFOINDEX":"punjabicominfoindex","COMINFODELTA":"punjabicominfodelta","NOTESINFOINDEX":"punjabinotesinfoindex","NOTESINFODELTA":"punjabinotesinfodelta","PROFILEDETAILSINDEX":"punjabiprofiledetailsindex","FAMILYINFO":"punjabimatrimonyfamilyinfoindex","HOBBIESINFO":"punjabimatrimonyhobbiesinfoindex","MATCHWATCH":"punjabimatrimonymatchwatchindex","CONTACTSTATUSINDEX":"punjabicontactstatusindex","WVAVINDEX":"punjabiwvavindex","VIEWSTATSINDEX":"punjabiviewstatsindex","PINMASTERINDEX":"punjabipinmasterindex","MEMBERVIEWEDMYPROFILEINDEX":"punjabiviewedmyprofilestatsindex","MEMBERTOOLSRECENTUPDATEINDEX":"punjabimembertoolsrecentupdateindex","BMSUCCESSSTORIESINDEX":"bmsuccessstoriesindex","EPPINDEX":"eppindex"},"SINDHI":{"VIEWSINDEX":"sindhiviewsindex","PROFILENOTESINDEX":"sindhiprofilenotesindex","MEMBERLISTINDEX":"sindhimemberlistindex","DECLINELISTINDEX":"sindhideclinestatusindex","SHORTLISTINDEX":"sindhibookmarkedindex","MEMBERTOOLSINDEX":"sindhimembertoolsindex","VIEWPROFILEPROMOINDEX":"viewprofilepromoindex","COMINFOINDEX":"sindhicominfoindex","COMINFODELTA":"sindhicominfodelta","NOTESINFOINDEX":"sindhinotesinfoindex","NOTESINFODELTA":"sindhinotesinfodelta","PROFILEDETAILSINDEX":"sindhiprofiledetailsindex","FAMILYINFO":"sindhimatrimonyfamilyinfoindex","HOBBIESINFO":"sindhimatrimonyhobbiesinfoindex","MATCHWATCH":"sindhimatrimonymatchwatchindex","CONTACTSTATUSINDEX":"sindhicontactstatusindex","WVAVINDEX":"sindhiwvavindex","VIEWSTATSINDEX":"sindhiviewstatsindex","PINMASTERINDEX":"sindhipinmasterindex","MEMBERVIEWEDMYPROFILEINDEX":"sindhiviewedmyprofilestatsindex","MEMBERTOOLSRECENTUPDATEINDEX":"sindhimembertoolsrecentupdateindex","BMSUCCESSSTORIESINDEX":"bmsuccessstoriesindex","EPPINDEX":"eppindex"},"TAMIL":{"VIEWSINDEX":"tamilviewsindex","PROFILENOTESINDEX":"tamilprofilenotesindex","MEMBERLISTINDEX":"tamilmemberlistindex","DECLINELISTINDEX":"tamildeclinestatusindex","SHORTLISTINDEX":"tamilbookmarkedindex","MEMBERTOOLSINDEX":"tamilmembertoolsindex","VIEWPROFILEPROMOINDEX":"viewprofilepromoindex","COMINFOINDEX":"tamilcominfoindex","COMINFODELTA":"tamilcominfodelta","NOTESINFOINDEX":"tamilnotesinfoindex","NOTESINFODELTA":"tamilnotesinfodelta","PROFILEDETAILSINDEX":"tamilprofiledetailsindex","PROFILEDETAILSNEWINDEX":"tamilprofiledetailsnewindex","FAMILYINFO":"tamilmatrimonyfamilyinfoindex","HOBBIESINFO":"tamilmatrimonyhobbiesinfoindex","MATCHWATCH":"tamilmatrimonymatchwatchindex","CONTACTSTATUSINDEX":"tamilcontactstatusindex","WVAVINDEX":"tamilwvavindex","VIEWSTATSINDEX":"tamilviewstatsindex","PINMASTERINDEX":"tamilpinmasterindex","MEMBERVIEWEDMYPROFILEINDEX":"tamilviewedmyprofilestatsindex","MEMBERTOOLSRECENTUPDATEINDEX":"tamilmembertoolsrecentupdateindex","BMSUCCESSSTORIESINDEX":"bmsuccessstoriesindex","EPPINDEX":"tamileppindex"},"TELUGU":{"VIEWSINDEX":"teluguviewsindex","PROFILENOTESINDEX":"teluguprofilenotesindex","MEMBERLISTINDEX":"telugumemberlistindex","DECLINELISTINDEX":"telugudeclinestatusindex","SHORTLISTINDEX":"telugubookmarkedindex","MEMBERTOOLSINDEX":"telugumembertoolsindex","VIEWPROFILEPROMOINDEX":"viewprofilepromoindex","COMINFOINDEX":"telugucominfoindex","COMINFODELTA":"telugucominfodelta","NOTESINFOINDEX":"telugunotesinfoindex","NOTESINFODELTA":"telugunotesinfodelta","PROFILEDETAILSINDEX":"teluguprofiledetailsindex","FAMILYINFO":"telugumatrimonyfamilyinfoindex","HOBBIESINFO":"telugumatrimonyhobbiesinfoindex","MATCHWATCH":"telugumatrimonymatchwatchindex","CONTACTSTATUSINDEX":"telugucontactstatusindex","WVAVINDEX":"teluguwvavindex","VIEWSTATSINDEX":"teluguviewstatsindex","PINMASTERINDEX":"telugupinmasterindex","MEMBERVIEWEDMYPROFILEINDEX":"teluguviewedmyprofilestatsindex","MEMBERTOOLSRECENTUPDATEINDEX":"telugumembertoolsrecentupdateindex","BMSUCCESSSTORIESINDEX":"bmsuccessstoriesindex","EPPINDEX":"eppindex"},"URDU":{"VIEWSINDEX":"urduviewsindex","PROFILENOTESINDEX":"urduprofilenotesindex","MEMBERLISTINDEX":"urdumemberlistindex","DECLINELISTINDEX":"urdudeclinestatusindex","SHORTLISTINDEX":"urdubookmarkedindex","MEMBERTOOLSINDEX":"urdumembertoolsindex","VIEWPROFILEPROMOINDEX":"viewprofilepromoindex","COMINFOINDEX":"urducominfoindex","COMINFODELTA":"urducominfodelta","NOTESINFOINDEX":"urdunotesinfoindex","NOTESINFODELTA":"urdunotesinfodelta","PROFILEDETAILSINDEX":"urduprofiledetailsindex","FAMILYINFO":"urdumatrimonyfamilyinfoindex","HOBBIESINFO":"urdumatrimonyhobbiesinfoindex","MATCHWATCH":"urdumatrimonymatchwatchindex","CONTACTSTATUSINDEX":"urducontactstatusindex","WVAVINDEX":"urduwvavindex","VIEWSTATSINDEX":"urduviewstatsindex","PINMASTERINDEX":"urdupinmasterindex","MEMBERVIEWEDMYPROFILEINDEX":"urduviewedmyprofilestatsindex","MEMBERTOOLSRECENTUPDATEINDEX":"urdumembertoolsrecentupdateindex","BMSUCCESSSTORIESINDEX":"bmsuccessstoriesindex","EPPINDEX":"eppindex"},"KASHMIRI":{"VIEWSINDEX":"kashmiriviewsindex","PROFILENOTESINDEX":"kashmiriprofilenotesindex","MEMBERLISTINDEX":"kashmirimemberlistindex","DECLINELISTINDEX":"kashmirideclinestatusindex","SHORTLISTINDEX":"kashmiribookmarkedindex","COMINFOINDEX":"kashmiricominfoindex","COMINFODELTA":"kashmiricominfodelta","NOTESINFOINDEX":"kashmirinotesinfoindex","NOTESINFODELTA":"kashmirinotesinfodelta","PROFILEDETAILSINDEX":"kashmiriprofiledetailsindex","FAMILYINFO":"kashmirimatrimonyfamilyinfoindex","HOBBIESINFO":"kashmirimatrimonyhobbiesinfoindex","MATCHWATCH":"kashmirimatrimonymatchwatchindex","CONTACTSTATUSINDEX":"kashmiricontactstatusindex","WVAVINDEX":"kashmiriwvavindex","BMSUCCESSSTORIESINDEX":"bmsuccessstoriesindex"},"RAJASTANI":{"VIEWSINDEX":"rajastaniviewsindex","PROFILENOTESINDEX":"rajastaniprofilenotesindex","MEMBERLISTINDEX":"rajastanimemberlistindex","DECLINELISTINDEX":"rajastanideclinestatusindex","SHORTLISTINDEX":"rajastanibookmarkedindex","COMINFOINDEX":"rajastanicominfoindex","COMINFODELTA":"rajastanicominfodelta","NOTESINFOINDEX":"rajastaninotesinfoindex","NOTESINFODELTA":"rajastaninotesinfodelta","PROFILEDETAILSINDEX":"rajastaniprofiledetailsindex","FAMILYINFO":"rajastanimatrimonyfamilyinfoindex","HOBBIESINFO":"rajastanimatrimonyhobbiesinfoindex","MATCHWATCH":"rajastanimatrimonymatchwatchindex","CONTACTSTATUSINDEX":"rajastanicontactstatusindex","WVAVINDEX":"rajastaniwvavindex","BMSUCCESSSTORIESINDEX":"bmsuccessstoriesindex"},"MATCHWATCH":{"MALEMEMPPINDEX":"malematchwatchmemppindex","FEMALEMEMPPINDEX":"femalematchwatchmemppindex","MALESYSPPINDEX":"malematchwatchsysppindex","FEMALESYSPPINDEX":"femalematchwatchsysppindex","MALEPPINDEX":"malematchwatchsysppindex;malematchwatchmemppindex","FEMALEPPINDEX":"femalematchwatchsysppindex;femalematchwatchmemppindex","MALEINDEX":"malematchwatchindex","FEMALEINDEX":"femalematchwatchindex"},"RMVIEWSINDEX":"rmviewsindex","RMMEMBERLISTINDEX":"rmmemberlistindex4","RMPROFILENOTESINDEX":"rmprofilenotesindex","BOOKMARKINDEX":"bookmarkedindex","LATESTUPDATESDELTA":"latestupdatesdelta","LATESTUPDATESINDEX":"latestupdatesindex","ONLINEMEMBERSDELTA":"onlinemembersdelta","MYHOMECLUSTERDELTA":"myhomeclusterdelta","DB1_ONLINEMEMBERSDELTASEGMENTINDEX":"onlinemembersdelta_hpusa","DB2_ONLINEMEMBERSDELTASEGMENTINDEX":"onlinemembersdelta_ec","DB3_ONLINEMEMBERSDELTASEGMENTINDEX":"onlinemembersdelta_bgr","DB4_ONLINEMEMBERSDELTASEGMENTINDEX":"onlinemembersdelta_md","DB5_ONLINEMEMBERSDELTASEGMENTINDEX":"onlinemembersdelta_kty","ELITECUSTOMERREVIEWINDEX":"elitecustomerreviewindex","ASSISTEDCUSTOMERREVIEWINDEX":"assistedcustomerreviewindex"};
	
	exports.bmsphinxvars;
	exports.SPHINXINDEXNAME;
	exports.SPHINXTABLENAME;
	exports.APPSPHINXINDEXNAME;