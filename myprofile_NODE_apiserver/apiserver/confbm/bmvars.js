/**********************************************************************************************
File    : bmvars.js
Author  : Sathrak Paldurai k
Date    : 12-June-2017
************************************************************************************************
Description: This inc file have mysql class and functions.
***********************************************************************************************/
	// Global vaiable declaration //
	global.LANGGROUP1 = [7,5,6]; //DB4 Server B,G,R-I
	global.LANGGROUP2 = [10,8,15,9,13]; //DB1 Server H,P,U,S,A
	global.LANGGROUP3 = [2,12,4,3,11]; //DB2 Server T,C,K,E,Y
	global.LANGGROUP4 = [1,14]; //DB10 Server M,D-N
	global.USD4CONVERSION = 46;
	global.IDSTARTLETTERHASH={7:"B",6:"R",5:"G",8:"P",10:"H",9:"S",4:"K",3:"E",2:"T",1:"M",14:"D",12:"C",13:"A",11:"Y",15:"U"};
	global.MATRIIDMAP = {107:"B",106:"R",105:"G",108:"P",110:"H",109:"S",104:"K",103:"E",102:"T",101:"M",114:"D",112:"C",113:"A",111:"Y",115:"U"};
	global.DOMAINNAMECAPITAL ={"M":"TAMIL","T":"TELUGU","E":"KERALA","K":"KANNADA","G":"GUJARATI","R":"MARATHI","B":"BENGALI","P":"PUNJABI","S":"SINDHI", "H":"HINDI","Y":"ORIYA","C":"PARSI","A":"ASSAMESE","D":"MARWADI","U":"URDU"};
	global.DOMAINID ={1:"tamil",2:"telugu",3:"kerala",4:"kannada",5:"gujarati",6:"marathi",7:"bengali",8:"punjabi",9:"sindhi", 10:"hindi",11:"oriya",12:"parsi",13:"assamese",14:"marwadi",15:"urdu"};
	global.DOMAINNAME = {"M":"tamil","T":"telugu","E":"kerala","K":"kannada","G":"gujarati","R":"marathi","B":"bengali","P":"punjabi","S":"sindhi", "H":"hindi","Y":"oriya","C":"parsi","A":"assamese","D":"marwadi","U":"urdu"};
	global.CURDATETIME = "fadshs8c2sbf&3fjkas";
	global.CURDATE = "sakjf3&fbs2c8shdaf";
	global.CURRTIMESTAMP = "f2Uou4UcAiYksHsKeM";
	
	global.DOMAINPREFFIXWITHSUBDOMAINS = ["\/www.\/","\/weddingdirectory.\/","\/profile.\/","\/bmser.\/","\/bmimage.\/","\/image.\/","\/bmimg.\/","\/img.\/","\/matrimony\/","\/.com\/","\/yahoo.\/","\/galatta.\/","\/\\\/\/"];
	
	bmvars = {
		VPLIMITFlag:1,
		VPcountFlag:1000,
		SUSPENDED:2,
		FREEPROFILE : 'F',
		PAIDPROFILE : 'R',
		OPEN : 0,
		HIDDEN : 1,
		SERVERTYPE : 'S',
		MAX_FREE_BOOKMARK : 1000,
		MAX_PAID_BOOKMARK : 5000,
		//BM auth key for push notification from google
		ANDROIDPUSHNOTIFYAUTHKEY : 'DQAAALAAAAB_aoGSvmCZy-VGyvepBrRM8lAcJhTzJQrFGV7lODc7lEOcaf3ntDyHGXir_QiWFO2hIvs_OpHArQoakrE-oqtc1F6mHKzwLFQNIcJxEePEckFV2s36Q3-U0_F0cRBUEg33V3xhRvI7BpBk90YXvj1lQ7SsmwoS-2kP9tZiTGW_vcij4Sg38yx3zQwxRi1O4TlkHiypqthNqcgOZk0fizjizQCSZM8v3rqErOvrOQa0_Q',
		//ANDROID PUSH NOTIFICATION MESSAGE KEY IN GCM FROM GOOGLE
		ANDROIDPUSHNOTIFYAUTHKEYGCM : 'AIzaSyAsGyOrFmdEbgQ-z3sEfEpUA9Ja8WlreK0',
		MOENGAGE_ENABLE_FLAG:0,
		//push notification max attempts
		PUSHNOTIFYMAXATTEMPTS : 5,
		//is push notification enabled for android
		PUSHNOTIFICATIONENABLEDFORANDROID : 1,
		//is push notification enabled for android in GCM 1:>on 0:>off
		PUSHNOTIFICATIONGCM : 1,
		//LB IP to connect node to populate newmatches in mongoDB
		wappushnotLBip : "http://172.22.1.94:80",
		// chrome notification flag
		CHROMENOTIFICATIONFLAG : 1,
		// Nokia version upgrade url
		//define("APPDOWNLOADURL",GLOBALS['SECUREURL']."oviapps.bharatmatrimony.com/version/Bharat_Matrimony.jad"),
		//define("APPDOWNLOADURL",GLOBALS['SECUREURL']."oviapps.bharatmatrimony.com/version"),
		//for iphone push notification
		//Whether push notification is enabled for Iphone
		IPHONEPUSHNOTIFICATIONENABLED : 1,
		//Whether push notification is enabled for Ipad
		IPADPUSHNOTIFICATIONENABLED : 1,
		//Whether push notification is enabled for Ipod
		IPODPUSHNOTIFICATIONENABLED : 1,
		//mode of notification wheteher testing or production. should be production when in live
		IPHONENOTIFICATIONMODE : 'production',  //production or sandbox
		//specify the sandbox certicate path 
		IPHONESANDBOXCERTIFICATE : '/home/apps/bin/apppushnotification/BMPushDevCertSSL.pem',
		//specify the live site certicate path 
		IPHONEPRODCERTIFICATE : '/home/apps/bin/apppushnotification/BMPushProductionCertSSL.pem',
		//for BlackBerry push notification
		//Whether push notification is enabled for BlackBerry
		BBPUSHNOTIFICATIONENABLED : 1,
		//BlackBerry application id
		BBPUSHNOTIFYAPPID : '859-55110e3101ryMM1coMio6070RR4599155540',
		//BlackBerry application password
		BBPUSHNOTIFYPWD : 'MGH33C7d',
		//Blackberry url
		BBPUSHSANDBOX : "https://pushapi.eval.blackberry.com/mss/PD_pushRequest",
		BBPUSHLIVE : "https://pushapi.na.blackberry.com/mss/PD_pushRequest",
		BBNOTIFICATIONMODE : 'production',  //production or sandbox
		//iphone upgrade page
		IPHONEUPGRADESENDMAILTO : 'prabhur@bharatmatrimony.com',
		IPHONEUPGRADESENDMAILCC : 'karthi@bharatmatrimony.com, rrohini@bharatmatrimony.com',
		//windows push notification
		WINDOWSPUSHNOTIFICATIONENABLED : 1,
		//mobileappphoffer days extension value
		DaysExtensionValue : 5,
		IVRSNO : '1-800-3000-3344 / 1-800-425-3344 (BSNL/MTNL Users)', //IVRS number for phone verify and voice
		BSNLIVRNO : '1-800-425-3344', //IVRS number for phone verify and voice
		RELIANCEIVRNO : '0-814-499-8877', //IVRS number for phone verify and voice
		// Variable for Pinned free and paid count //
		FREETOTALPINSENTCOUNT : 1000,
		PAIDTOTALPINSENTCOUNT : 6000,
		PAIDPINDAILYLIMIT : 25,
		FREEPINDAILYLIMIT : 10,
		//Windows APP version
		WINDOWSAPPVERSION	: 2.0,
		// APP & WAP send sms path
		MAILBOX : {'APIPATH' : '/home/apps/'},
		//Flags for showing the webp and 300x300 images for APP
		APPVPWEBPIMGFLAG :1,
		APPWEBPIMGFLAG : 1,
		//Flags for showing the webp and 300x300 images for WAP
		WAPVPWEBPIMGFLAG : 1,
		WAPVP300WEBPIMGFLAG : 1,
		WAPVP300IMGFLAG : 1,
		WAPWEBPIMGFLAG : 1,
		SOCKETIOFLAG : 1, // 1 :> Enable the Socket IO connection for Chat, 0:> Enable the AJAX Request for Chat (Android)
		//IOS APP version
		IOSAPPVERSION	: 2.0,
		DOMAINWITHLETTER : {"M":"TAMIL","T":"TELUGU","E":"KERALA","K":"KANNADA","G":"GUJARATI","R":"MARATHI","B":"BENGALI","P":"PUNJABI","S":"SINDHI", "H":"HINDI","Y":"ORIYA","C":"PARSI","A":"ASSAMESE","D":"MARWADI","U":"URDU"},
	
		SAVEHEIGHT:{1:"4-0",2:"4-1",3:"4-2",4:"4-3",5:"4-4",6:"4-5",7:"4-6",8:"4-7",9:"4-8",10:"4-9",11:"4-10",12:"4-11",13:"5-0",14:"5-1",15:"5-2",16:"5-3",17:"5-4",18:"5-5",19:"5-6",20:"5-7",21:"5-8",22:"5-9",23:"5-10",24:"5-11",25:"6-0",26:"6-1",27:"6-2",28:"6-3",29:"6-4",30:"6-5",31:"6-6",32:"6-7",33:"6-8",34:"6-9",35:"6-10",36:"6-11",37:"7-0"},
			
		PHONEENCKEY : 'iErTmJn14eaRakHiAr6sOA0o8AnM2hS',	
		MAILER_RETURNPATH : '-f noreply@bounces.bharatmatrimony.com', //return path for all mailers
		// This will be added in all transaction mailer. - Added this line on <13-02-2014> by ArunVijay
		MAILER_FROMSERVER : 'mail.bharatmatrimony.com',
		//New mailer Dlt values
		mailerDlt : {1:"EISND",2:"EIACC",3:"EINI",4:"EIREM",5:"EINMI",6:"EINMT",7:"PMSND",8:"PMNI",9:"RSWP",10:"RSWH",11:"RSWR",12:"RSWS",13:"RSAP",14:"RSAH",15:"RSAR",16:"RSAS",17:"RADP",18:"RADH",19:"RADR",20:"RADS",21:"MREQW",22:"MREQA",23:"PIN",24:"PMRPLY",25:"EIACCBYMAIL",26:"EIACCBYCALL",27:"PMREM",28:"PMNMT",29:"SMS",31:"PINREP",32:"PINDEC",40:"REQINFO"},		
		/******************************************************************************************/ 
		//|List of salt keys used for matriid encryption     
		/*****************************************************************************************/
		APPSALT : {
			'0':['phUsPE7aVazabU6reTrudrArEChexA', 'frUzEY5pha2evuxeBuMuchusweyu6e'],
			'1':['ruqutenuMa5usuP6Acr8P48D7DreDr', 'ruqutenuMa5usuP6Acr8P48D7DreDr'],
			'2':['thuyu8ajakut23m3crewusw7met4AS', '7r6FruNU8ufa3ApremEFReSeZ7wU8r'],
			'3':['xUjAdRUChaphabraKUbudeSweRAdr3', 'qacr4Pha2e6ay6xewrechec85abexe'],
			'4':['tRexAvUc7ujephuNeQetUtHavATHaN', 'nepAtE9Ruwreh6gApHuwrA97wraN95'],
			'5':['hAphaf6ubuPrAwEtukuthufrUCutUh', '8ExeFevapaBePhufaquzAcravachac'],
			'6':['Ba9huFuP9GaDRaxAthe4tA6EFaVeve', 'x4phAcrACh8weduhufrakEvudEha2p'],
			'7':['q5pRes6ucrEdraspEprufA6pAspej9', 'wre4atheQ2cRApej2hUprenufEvus4'],
			'8':['Cr35tEnAs3ukUN8QUya3r3wUtA5reV', 'frayav3frestunusTAprUnujEchaYe'],
			'9':['4uwad77QaPefUtreCU8ujEKas52u8p', '2ReT6av75EvubeMU9rE5AcrAKec4TE']			
		},		
		AKKAMI_SERVER_PREFFIX : 'imgs',		
		TRACKINGMODULELIST : {0 : 'New Message Sent', 1 : 'Message Read', 2 : 'Registration',3 : 'View Profile',4:'View Horoscope',5:'Manage Photo',6:'Main Photo',7:'Enlarge Photo',8:'Delete Photo',9:'Add Photo',10:"View Phone Number",11:"Forgot Password",12:"View Short List",13:"ExpInt Send Option",14:"ExpInt Send",15:"ExpInt Accept",16:"ExpInt Decline Option",17:"ExpInt Decline",18:"ExpInt Delete",19:"Received ExpInt Listing",20:"Sent ExpInt Listing",21:"Get Partner Preference",22:"Search Result",23:"GPS City Search",24:"Search Previous Results",25:"Reply Message",26:"Decline Message",27:"Delete Message",28:"Insert Short List",29:"Delete Short List",30:"Login",31 : "Package Listing", 32 : "Payment Options Listing",33 :"Check Filter", 34 : 'Push Notification Register Id Save', 35 : 'Push Notification Register Id Remove',36:'Populate Caste',37:'Show more country',38:'Upgrade profile',39:'Nokia Version upgrade',40:'Contact Us', 41 : 'Redeived Msg listing', 42 : 'Send Msg listing', 43 : 'BlackBerry PIN flag update', 44:'EPR Request', 45 : 'Update User Latitude Longitude', 46 : 'Iphone payment upgrade request',47:'Plain text password Request',48:'Pinprofile',49:'Send Reminder',50:'Save Search',51:'View Profile Actions',52:'Need More Info/Time',53:'Notification', 54:'Delete SaveSearch', 55:'Edit Profile',57:'Generate Horoscope',58:'Check Phone Verification',59:'Feedback Form'},

		RELATIONSHIP : {1:"Parents",2:"Brother",3:"Sister",4:"Aunt / Uncle",5:"Friend",6:"Self"},
		//for push notification		
		PUSHNOTIFYHASH : {"1":"New Message","2":"Reply Message","3":"New Interest","4":"Interest Accepted","5":"New Matches","6":"chat"},
		//push notifcation failure message alret
		ANDROIDPUSHNOTIFYFAILALERT : ["karthi@bharatmatrimony.com","rrohini@bharatmatrimony.com","sathrakpaldurai.kalep@matrimony.com"],
		//response 0 to 7 is for android
		ANDROIDPUSHNOTIFYAUTHKEYGCMRARRAY : {"104":"AIzaSyAsGyOrFmdEbgQ-z3sEfEpUA9Ja8WlreK0","131":" AIzaSyBPmZtr1U08W3BtCbjjMyHrrnceI9h4LwU","132":"AIzaSyDzUOzVBW0oZpld-OcBM_iEo0YVqblllLI","133":"AIzaSyC96Ht_AYtpIjgPsqBcMCpwL6g_YCGW-48","134":"AIzaSyBsXs7VCfiAtsPnTX1BvA3lnRtOTYL3Y1o","135":"AIzaSyD8OlId6dddimtoavxXg6mpuRIfBqpm3lw","136":"AIzaSyDWKiAgMhe-D6RZZsX77e-8_3ZTZq4EIv0","137":"AIzaSyCeDf4IqMsTzdHCYd-5KszsxL8YId9Ahok","138":"AIzaSyCVCBJNywoBtjd-KOLnELe7kncaP7bBptw","139":"AIzaSyBWUIDbRfI783-b_8LpAt5RGfGA3aNynhI","140":"AIzaSyBavmId8SutFEjTl3Vn7MtKM8Bb3tBhJNg"},
		
		ANDROIDPUSHNOTIFYAUTHKEY_MOENGAGE_ARRAY : {"131":{"APPID":"QG2J221Z25T279BBGNQ6SNC2","APPSECRET":"IEGNLVIUP9AY"}},
		MOENGAGE_ENABLE_APPWISE_FLAG : {"104":0,"131":1,"132":0,"133":0,"134":0,"135":0,"136":0,"137":0,"138":0,"139":0},
		MOENGAGE_MSGTYPE_FLAG : [11],
		MOENGAGE_CAMPAIGN : {"11":"Daily Recommendations"},
		PUSHNOTIFYRESPONSE : ["QuotaExceeded","DeviceQuotaExceeded","InvalidRegistration","NotRegistered","MessageTooBig","MissingCollapseKey","UnAuthorized","Google Server Error, Retry-After"],
		
		IPHONEPRODCERTIFICATEBM : {"101":"\/home\/apps\/bin\/apppushnotification\/BMPushProductionCertSSL.pem","102":"\/home\/apps\/bin\/apppushnotification\/BMPushProductionCertSSL.pem","103":"\/home\/apps\/bin\/apppushnotification\/BMPushProductionCertSSL.pem"},
		IPHONEPRODCERTIFICATETAMIL : {"301":"\/home\/apps\/bin\/apppushnotification\/tamilmatrimony_production.pem","302":"\/home\/apps\/bin\/apppushnotification\/tamilmatrimony_production.pem","303":"\/home\/apps\/bin\/apppushnotification\/tamilmatrimony_production.pem"},
		IPHONEPRODCERTIFICATEKERELA : {"304":"\/home\/apps\/bin\/apppushnotification\/KerelaMatrimonyNewPushDis.pem","305":"\/home\/apps\/bin\/apppushnotification\/KerelaMatrimonyNewPushDis.pem","306":"\/home\/apps\/bin\/apppushnotification\/KerelaMatrimonyNewPushDis.pem"},
		IPHONEPRODCERTIFICATEBENGALI : {"307":"\/home\/apps\/bin\/apppushnotification\/BengaliMatrimonyNewPushDis.pem","308":"\/home\/apps\/bin\/apppushnotification\/BengaliMatrimonyNewPushDis.pem","309":"\/home\/apps\/bin\/apppushnotification\/BengaliMatrimonyNewPushDis.pem"},
		IPHONEPRODCERTIFICATETELUGU : {"310":"\/home\/apps\/bin\/apppushnotification\/TeluguMatDisNewPush.pem","311":"\/home\/apps\/bin\/apppushnotification\/TeluguMatDisNewPush.pem","312":"\/home\/apps\/bin\/apppushnotification\/TeluguMatDisNewPush.pem"},
		IPHONEPRODCERTIFICATEMARATHI : {"313":"\/home\/apps\/bin\/apppushnotification\/MarathiMatDisNewPush.pem","314":"\/home\/apps\/bin\/apppushnotification\/MarathiMatDisNewPush.pem","315":"\/home\/apps\/bin\/apppushnotification\/MarathiMatDisNewPush.pem"},
		IPHONEPRODCERTIFICATEKANNADA : {"316":"\/home\/apps\/bin\/apppushnotification\/KannadaMatrimonyProd.pem","317":"\/home\/apps\/bin\/apppushnotification\/KannadaMatrimonyProd.pem","318":"\/home\/apps\/bin\/apppushnotification\/KannadaMatrimonyProd.pem"},
		IPHONEPRODCERTIFICATEORIYA : {"319":"\/home\/apps\/bin\/apppushnotification\/OriyaMatrimonyProd.pem","320":"\/home\/apps\/bin\/apppushnotification\/OriyaMatrimonyProd.pem","321":"\/home\/apps\/bin\/apppushnotification\/OriyaMatrimonyProd.pem"},
		IPHONEPRODCERTIFICATEGUJARATI : {"322":"\/home\/apps\/bin\/apppushnotification\/GujaratiMatrimonyProd.pem","323":"\/home\/apps\/bin\/apppushnotification\/GujaratiMatrimonyProd.pem","324":"\/home\/apps\/bin\/apppushnotification\/GujaratiMatrimonyProd.pem"},
		IPHONEPRODCERTIFICATEPUNJABI : {"325":"\/home\/apps\/bin\/apppushnotification\/PunjabiMatrimonyProd.pem","326":"\/home\/apps\/bin\/apppushnotification\/PunjabiMatrimonyProd.pem","327":"\/home\/apps\/bin\/apppushnotification\/PunjabiMatrimonyProd.pem"},
		IPHONEPRODCERTIFICATEHINDI : {"328":"\/home\/apps\/bin\/apppushnotification\/HindiMatProdProv.pem","329":"\/home\/apps\/bin\/apppushnotification\/HindiMatProdProv.pem","330":"\/home\/apps\/bin\/apppushnotification\/HindiMatProdProv.pem"},
		IPHONEPRODCERTIFICATEARRAY : {"101":"\/home\/apps\/bin\/apppushnotification\/BMPushProductionCertSSL.pem","102":"\/home\/apps\/bin\/apppushnotification\/BMPushProductionCertSSL.pem","103":"\/home\/apps\/bin\/apppushnotification\/BMPushProductionCertSSL.pem","301":"\/home\/apps\/bin\/apppushnotification\/tamilmatrimony_production.pem","302":"\/home\/apps\/bin\/apppushnotification\/tamilmatrimony_production.pem","303":"\/home\/apps\/bin\/apppushnotification\/tamilmatrimony_production.pem","304":"\/home\/apps\/bin\/apppushnotification\/KerelaMatrimonyNewPushDis.pem","305":"\/home\/apps\/bin\/apppushnotification\/KerelaMatrimonyNewPushDis.pem","306":"\/home\/apps\/bin\/apppushnotification\/KerelaMatrimonyNewPushDis.pem","307":"\/home\/apps\/bin\/apppushnotification\/BengaliMatrimonyNewPushDis.pem","308":"\/home\/apps\/bin\/apppushnotification\/BengaliMatrimonyNewPushDis.pem","309":"\/home\/apps\/bin\/apppushnotification\/BengaliMatrimonyNewPushDis.pem","310":"\/home\/apps\/bin\/apppushnotification\/TeluguMatDisNewPush.pem","311":"\/home\/apps\/bin\/apppushnotification\/TeluguMatDisNewPush.pem","312":"\/home\/apps\/bin\/apppushnotification\/TeluguMatDisNewPush.pem","313":"\/home\/apps\/bin\/apppushnotification\/MarathiMatDisNewPush.pem","314":"\/home\/apps\/bin\/apppushnotification\/MarathiMatDisNewPush.pem","315":"\/home\/apps\/bin\/apppushnotification\/MarathiMatDisNewPush.pem","316":"\/home\/apps\/bin\/apppushnotification\/KannadaMatrimonyProd.pem","317":"\/home\/apps\/bin\/apppushnotification\/KannadaMatrimonyProd.pem","318":"\/home\/apps\/bin\/apppushnotification\/KannadaMatrimonyProd.pem","319":"\/home\/apps\/bin\/apppushnotification\/OriyaMatrimonyProd.pem","320":"\/home\/apps\/bin\/apppushnotification\/OriyaMatrimonyProd.pem","321":"\/home\/apps\/bin\/apppushnotification\/OriyaMatrimonyProd.pem","322":"\/home\/apps\/bin\/apppushnotification\/GujaratiMatrimonyProd.pem","323":"\/home\/apps\/bin\/apppushnotification\/GujaratiMatrimonyProd.pem","324":"\/home\/apps\/bin\/apppushnotification\/GujaratiMatrimonyProd.pem","325":"\/home\/apps\/bin\/apppushnotification\/PunjabiMatrimonyProd.pem","326":"\/home\/apps\/bin\/apppushnotification\/PunjabiMatrimonyProd.pem","327":"\/home\/apps\/bin\/apppushnotification\/PunjabiMatrimonyProd.pem","328":"\/home\/apps\/bin\/apppushnotification\/HindiMatProdProv.pem","329":"\/home\/apps\/bin\/apppushnotification\/HindiMatProdProv.pem","330":"\/home\/apps\/bin\/apppushnotification\/HindiMatProdProv.pem"},
		//#New directory structure for user images must be domainnameshort
		PHOTO_PATH_DATE : {"tamil":"2013-06-03 12:00:00","telugu":"2013-06-11 15:00:00","kerala":"2013-06-11 15:00:00","kannada":"2013-06-11 15:00:00","gujarati":"2013-06-11 15:00:00","marathi":"2013-06-11 15:00:00","bengali":"2013-05-30 12:00:00","punjabi":"2013-06-11 15:00:00","sindhi":"2013-06-11 15:00:00","hindi":"2013-06-11 15:00:00","oriya":"2013-06-11 15:00:00","assamese":"2013-06-11 15:00:00","marwadi":"2013-06-11 15:00:00","urdu":"2013-06-11 15:00:00","parsi":"2013-04-25 11:00:00"},
		MobileAppType : [104,101,102,103,114,151,107,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345],
		MobileAppDetails : {"104":"Android","101":"Iphone","102":"Ipad","103":"Ipod","114":"Nokio - Android","115":"WAP","151":"Amazon - Android","107":"Windows"},
		ANDROIDAPPTYPE : [104,114,151,224,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145],
		regionalAppTypeArr : [131,132,133,134,135,136,137,138,139,140,141,142,143,144,145],
		WindowsAppType : [107],
		IOSAPPTYPE : [101,102,103,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345],
		regionalAppTypeArr : [131,132,133,134,135,136,137,138,139,140,141,142,143,144,145],
		UNIFIEDAPPTYPE : [104,115,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145],
		UNIFIEDIOSAPPTYPE : [101,102,103,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345],
		LANGUAGECLUSTERING1 : {"164":"2","6":"2","71":"2","832":"4","131":"4","204":"4","144":"4","257":"4","989":"4","95":"4","11":"4","206":"4","16":"4","78":"4","172":"4","171":"4","213":"4","143":"4","14":"4","256":"4","10":"4","254":"4","12":"4","114":"4","255":"4","787":"4","57":"4","703":"14","675":"14","726":"14","947":"14","718":"14","949":"14","853":"14","266":"14","736":"14","835":"14","209":"14","856":"14","946":"14","265":"14","854":"14","860":"14","859":"14","24":"14","855":"14","260":"14","154":"14","403":"14","720":"14","263":"14","130":"14","857":"14","151":"14","227":"14","861":"14","251":"14","261":"14","252":"14","612":"14","223":"14","858":"14","993":"17","725":"17","923":"17","976":"17","604":"17","994":"17","865":"17","870":"17","873":"17","878":"17","321":"17","728":"17","733":"17","332":"17","316":"17","724":"17","58":"17","981":"17","320":"17","980":"17","867":"17","880":"17","328":"17","686":"17","705":"17","352":"17","708":"17","690":"17","877":"17","358":"17","605":"17","874":"17","978":"17","719":"17","866":"17","695":"17","849":"17","760":"17","731":"17","977":"17","979":"17","864":"17","862":"17","875":"17","868":"17","312":"17","217":"17","290":"17","680":"17","303":"17","759":"17","268":"17","72":"17","126":"17","299":"17","249":"17","691":"17","601":"17","118":"17","31":"17","735":"17","155":"17","267":"17","327":"17","34":"17","89":"17","150":"17","65":"17","247":"17","210":"17","15":"17","62":"17","29":"17","296":"17","684":"17","793":"17","148":"17","863":"17","313":"19","782":"19","349":"19","276":"19","991":"19","38":"19","274":"19","738":"19","211":"19","272":"19","102":"19","48":"19","271":"19","145":"19","693":"19","721":"19","961":"19","280":"19","613":"26","734":"31","506":"31","508":"31","758":"31","507":"31","996":"31","717":"31","311":"31","775":"31","91":"31","516":"31","995":"31","353":"31","233":"31","7":"31","982":"31","258":"31","730":"31","234":"31","985":"31","510":"31","518":"31","515":"31","44":"31","331":"31","505":"31","511":"31","517":"31","990":"31","411":"31","212":"31","49":"31","152":"31","351":"31","120":"32","306":"33","800":"33","933":"33","934":"33","741":"33","307":"33","297":"33","727":"33","807":"33","51":"33","80":"33","806":"33","197":"33","304":"33","801":"33","704":"33","295":"33","309":"33","284":"33","732":"33","714":"33","722":"33","203":"33","803":"33","86":"33","808":"33","689":"33","273":"33","805":"33","253":"33","322":"33","37":"33","179":"33","147":"33","226":"33","125":"33","5":"33","283":"33","43":"33","30":"33","99":"33","797":"33","804":"33","340":"33","694":"34","146":"39","318":"40","302":"40","702":"40","739":"40","945":"40","948":"40","983":"40","707":"40","344":"40","700":"40","75":"40","94":"40","288":"40","158":"40","201":"40","46":"40","61":"40","68":"40","32":"40","287":"40","289":"40","286":"40","77":"40","83":"40","975":"41","56":"41","659":"41","167":"41","672":"41","45":"41","282":"41","653":"41","654":"41","651":"41","671":"41","669":"41","660":"41","661":"41","1":"41","657":"41","664":"41","667":"41","665":"41","666":"41","347":"41","190":"45","191":"45","181":"45","186":"45","188":"45","187":"45","193":"45","189":"45","182":"45","192":"45","195":"45","184":"45","781":"47","779":"47","891":"47","412":"47","770":"47","890":"47","769":"47","788":"47","971":"47","696":"47","896":"47","963":"47","26":"47","900":"47","903":"47","813":"47","814":"47","898":"47","355":"47","966":"47","103":"47","308":"47","841":"47","177":"47","688":"47","127":"47","350":"47","79":"47","780":"47","845":"47","93":"47","777":"47","8":"47","228":"47","124":"47","153":"47","811":"47","136":"47","40":"47","139":"47","341":"47","342":"47","133":"47","59":"47","87":"47","935":"47","135":"47","229":"47","968":"47","937":"47","772":"47","521":"47","936":"47","812":"47","324":"47","810":"47","723":"47","973":"47","1008":"47","1007":"47","843":"47","357":"48","751":"48","314":"48","338":"48","683":"48","301":"48","685":"48","755":"48","225":"48","329":"48","294":"48","750":"48","682":"48","889":"48","343":"48","330":"48","743":"48","219":"48","729":"48","112":"48","356":"48","298":"48","744":"48","52":"48","336":"48","346":"48","70":"48","157":"48","692":"48","928":"48","748":"48","348":"48","291":"48","354":"48","98":"48","293":"48","149":"48","785":"48","207":"48","162":"48","121":"48","134":"48","231":"48","742":"48","235":"48","116":"48","285":"48","292":"48","76":"48","74":"48","687":"48","958":"48","836":"48","404":"51","325":"4~40","107":"14~26","606":"14~26","104":"14~26","82":"17~4","81":"17~4","244":"17~5","246":"17~5","241":"17~5","100":"17~7","992":"17~8","169":"17~12","54":"17~12","245":"17~12","218":"17~14","156":"17~14","602":"17~14","851":"17~14","839":"17~14","310":"17~14","408":"17~14","199":"17~14","161":"17~14","264":"17~14","248":"17~25","974":"17~25","123":"17~33","198":"17~33","111":"17~33","41":"17~33","984":"17~33","242":"17~34","869":"17~34","706":"17~34","84":"17~34","113":"17~34","36":"17~39","97":"17~40","205":"17~40","701":"17~40","174":"17~41","656":"17~41","281":"17~41","168":"17~41","110":"17~41","658":"17~41","128":"17~41","166":"17~41","652":"17~41","73":"17~41","180":"17~45","138":"17~48","222":"17~48","33":"17~48","737":"17~48","415":"17~51","402":"17~51","413":"17~51","401":"17~51","417":"17~51","421":"17~51","414":"17~51","416":"17~51","53":"19~50","141":"19~50","764":"19~50","92":"19~50","22":"19~50","119":"19~50","277":"19~50","178":"19~50","132":"19~50","39":"19~50","987":"31~40","202":"33~14","20":"33~14","96":"33~19","270":"33~19","269":"33~23","88":"33~23","221":"33~23","802":"33~40","163":"34~42","2":"47~19","237":"47~19","27":"47~19","673":"47~19","230":"47~31","142":"47~31","509":"47~31","137":"47~31","902":"47~31","232":"47~31","159":"47~31","852":"47~31","175":"47~31","418":"47~31","988":"47~31","938":"47~31","200":"47~46","766":"47~48","892":"47~48","816":"47~48","771":"47~48","339":"47~48","55":"47~48","893":"47~48","819":"47~48","23":"47~48","818":"47~48","409":"47~51","4":"48~4","129":"48~14","60":"48~19","278":"48~19","42":"48~19","275":"48~19","238":"48~19","279":"48~19","13":"48~19","215":"48~19","101":"48~19","21":"48~19","17":"48~19","105":"48~19","109":"48~19","699":"48~19","768":"48~31","850":"48~31","216":"48~33","250":"48~40","319":"48~40","405":"48~51","410":"17~4~51","407":"17~4~51","422":"17~4~51","823":"17~4~40","944":"17~4~40","243":"17~7~30","240":"17~7~5","326":"17~7~5","943":"17~14~4","608":"17~14~34","827":"17~14~34","610":"17~14~34","165":"17~14~41","85":"17~14~41","19":"17~14~41","986":"17~14~42","317":"17~33~4","262":"17~33~14","677":"17~33~14","323":"17~34~42","173":"17~40~8","67":"17~41~42","69":"17~47~33","220":"17~48~40","18":"33~40~23","28":"47~31~19","140":"47~48~19","888":"47~48~19","170":"47~48~19","886":"47~48~19","224":"47~33~31","502":"47~48~31","9":"47~48~33","106":"48~33~19","3":"17~4~41~34","406":"17~31~4~51","400":"17~31~4~51","90":"17~33~4~40","47":"17~33~19~4","208":"17~33~40~7","117":"17~33~40~42","259":"17~33~41~23","419":"17~47~31~51","236":"17~47~31~19","501":"17~47~48~31","513":"17~47~48~31","504":"17~47~48~31","239":"17~47~48~40","929":"17~48~4~40","834":"17~48~4~40","420":"17~48~4~51"},
		RESIDINGCITYSTATEMAPPINGHASH : {"1":"Andaman","2":"AndhraPradesh","3":"ArunachalPradesh","4":"Assam","5":"Bihar","6":"Chandigarh","7":"Chhattisgarh","8":"Dadra","9":"Daman","10":"Delhi","11":"Goa","12":"Gujarat","13":"Haryana","14":"HimachalPradesh","15":"Jammu","16":"Jharkand","17":"Karnataka","18":"Kerala","19":"Lakshadeep","20":"MadhyaPradesh","21":"Maharashtra","22":"Manipur","23":"Meghalaya","24":"Mizoram","25":"Nagaland","26":"Orissa","27":"Pondicherry","28":"Punjab","29":"Rajasthan","30":"Sikkim","31":"TamilNadu","36":"Telangana","32":"Tripura","33":"UttarPradesh","34":"Uttarakhand","35":"WestBengal"},
		ANDAMAN : {"1":"Port Blair","2":"Andaman Nicobar"},
		ANDHRAPRADESH : {"4":"Hyderabad","6":"Anantapur","7":"Chittoor","8":"Cuddapah","9":"Godavari","10":"Guntur","13":"Krishna","14":"Kurnool","18":"Nellore","20":"Prakasam","22":"Srikakulam","23":"Visakhapatnam","24":"Vizianagaram","610":"East Godavari","611":"West Godavari"},
		ARUNACHALPRADESH : {"27":"Itanagar","28":"Changlang","29":"Dibang Valley","30":"Kameng","31":"Kurung Kumey","32":"Lohit","33":"Subansiri","34":"Papum Pare","35":"Siang","36":"Tawang","37":"Tirap"},
		ASSAM : {"39":"Guwahati","40":"Barpeta","41":"Bongaigaon","42":"Cachar","43":"Darrang","44":"Dhemaji","45":"Dhubri","46":"Dibrugarh","47":"Goalpara","48":"Golaghat","49":"Hailakandi","50":"Jorhat","51":"Kamrup","52":"Karbi Anglong","53":"Karimganj","54":"Kokrajhar","55":"Lakhimpur","56":"Marigaon","57":"Nagaon","58":"Nalbari","59":"Sivasagar","60":"Sonitpur","61":"Tinsukia"},
		BIHAR : {"63":"Patna","64":"Araria","65":"Aurangabad","66":"Banka","67":"Begusarai","68":"Bhagalpur","69":"Bhojpur","70":"Buxar","71":"Champaran","72":"Darbhanga","73":"Gaya","74":"Gopalganj","75":"Jamui","76":"Jehanabad","77":"Kaimur (Bhabua)","78":"Katihar","79":"Khagaria","80":"Kishanganj","81":"Lakhisarai","82":"Madhepura","83":"Madhubani","84":"Munger","85":"Muzaffarpur","86":"Nalanda","87":"Nawada","88":"Purnia","89":"Rohtas","90":"Saharsa","91":"Samastipur","92":"Saran","93":"Sheikhpura","94":"Sheohar","95":"Sitamarhi","96":"Siwan","97":"Supaul","98":"Vaishali"},
		CHANDIGARH : {"100":"Chandigarh"},
		CHHATTISGARH : {"101":"Raipur","102":"Bastar","103":"Bilaspur","104":"Dantewada","105":"Dhamtari","106":"Durg","107":"Janjgir-Champa","108":"Jashpur","109":"Kanker","110":"Kawardha","111":"Korba","112":"Koriya","113":"Mahasamund","114":"Raigarh","115":"Rajnandgaon","116":"Surguja"},
		DADRA : {"118":"Silvassa","119":"Dadra and Nagar Haveli"},
		DAMAN : {"120":"Daman","121":"Daman and Diu"},
		DELHI : {"122":"Delhi"},
		GOA : {"123":"Panaji","124":"Goa"},
		GUJARAT : {"125":"Gandhinagar","126":"Ahmedabad","127":"Amreli","128":"Anand","129":"Banas Kantha","130":"Bharuch","131":"Bhavnagar","132":"Dohad","133":"Jamnagar","134":"Junagadh","135":"Kachchh","136":"Kheda","137":"Mahesana","138":"Narmada","139":"Navsari","140":"Panch Mahals","141":"Patan","142":"Porbandar","143":"Rajkot","144":"Sabar Kantha","145":"Surat","146":"Surendranagar","147":"The Dangs","148":"Vadodara","149":"Valsad"},
		HARYANA : {"100":"Chandigarh","151":"Ambala","152":"Bhiwani","153":"Faridabad","154":"Fatehabad","155":"Gurgaon","156":"Hisar","157":"Jhajjar","158":"Jind","159":"Kaithal","160":"Karnal","161":"Kurukshetra","162":"Mahendragarh","163":"Panchkula","164":"Panipat","165":"Rewari","166":"Rohtak","167":"Sirsa","168":"Sonipat","169":"Yamunanagar"},
		HIMACHALPRADESH : {"171":"Shimla","172":"Bilaspur","173":"Chamba","174":"Hamirpur","175":"Kangra","176":"Kinnaur","177":"Kullu","178":"Lahaul & Spiti","179":"Mandi","180":"Sirmaur","181":"Solan","182":"Una"},
		JAMMU : {"184":"Jammu","185":"Srinagar","186":"Anantnag","187":"Baramulla","188":"Budgam","189":"Doda","190":"Kargil","191":"Kathua","192":"Kupwara","193":"Leh","194":"Poonch","195":"Pulwama","196":"Rajauri","197":"Udhampur"},
		JHARKAND : {"199":"Ranchi","200":"Bokaro","201":"Chatra","202":"Deoghar","203":"Dhanbad","204":"Dumka","205":"Garhwa","206":"Giridih","207":"Godda","208":"Gumla","209":"Hazaribag","210":"Jamtara","211":"Koderma","212":"Latehar","213":"Lohardaga","214":"Pakur","215":"Palamu","216":"Sahibganj","217":"Seraikela","218":"Simdega","219":"Singhbhum"},
		KARNATAKA : {"221":"Bangalore","222":"Bagalkot","223":"Belgaum","224":"Bellary","225":"Bidar","226":"Bijapur","227":"Chamrajnagar","228":"Chickmagalur","229":"Chitradurga","230":"Davangere","231":"Hubli-Dharwad","232":"Gadag","233":"Gulbarga","234":"Hassan","235":"Haveri","236":"Uttar Kannada","237":"Dakshin Kannada","238":"Kodagu","239":"Kolar","240":"Koppal","241":"Mandya","242":"Mysore","243":"Raichur","244":"Shimoga","245":"Tumkur","246":"Udupi"},
		KERALA : {"248":"Thiruvananthapuram","249":"Alappuzha","250":"Ernakulam","251":"Idukki","252":"Kannur","253":"Kasargod","254":"Kollam","255":"Kottayam","256":"Kozhikode","257":"Malappuram","258":"Palakkad","259":"Pathanamthitta","260":"Thrissur","261":"Wayanad"},
		LAKSHADEEP : {"263":"Kavaratti","264":"Lakshadweep"},
		MADHYAPRADESH : {"265":"Bhopal","266":"Anuppur","267":"Ashoknagar","268":"Balaghat","269":"Barwani","270":"Betul","271":"Bhind","272":"Burhanpur","273":"Chhatarpur","274":"Chhindwara","275":"Damoh","276":"Datia","277":"Dewas","278":"Dhar","279":"Dindori","280":"Guna","281":"Gwalior","282":"Harda","283":"Hoshangabad","284":"Indore","285":"Jabalpur","286":"Jhabua","287":"Katni","288":"Khandwa","289":"Khargone","290":"Mandla","291":"Mandsaur","292":"Morena","293":"Narsinghpur","294":"Neemuch","295":"Panna","296":"Raisen","297":"Rajgarh","298":"Ratlam","299":"Rewa","300":"Sagar","301":"Satna","302":"Sehore","303":"Seoni","304":"Shahdol","305":"Shajapur","306":"Sheopur","307":"Shivpuri","308":"Sidhi","309":"Tikamgarh","310":"Ujjain","311":"Umaria","312":"Vidisha"},
		MAHARASHTRA : {"314":"Mumbai","315":"Ahmednagar","316":"Akola","317":"Amravati","318":"Aurangabad","319":"Bandra Suburban","320":"Beed","321":"Bhandara","322":"Buldhana","323":"Chandrapur","324":"Dhule","325":"Gadchiroli","326":"Gondia","327":"Hingoli","328":"Jalgaon","329":"Jalna","330":"Kolhapur","331":"Latur","332":"Nagpur","333":"Nanded","334":"Nandurbar","335":"Nashik","336":"Osmanabad","337":"Parbhani","338":"Pune","339":"Raigarh","340":"Ratnagiri","341":"Sangli","342":"Satara","343":"Sindhudurg","344":"Solapur","345":"Thane","346":"Wardha","347":"Washim","348":"Yavatmal"},
		MANIPUR : {"350":"Imphal","351":"Bishnupur","352":"Chandel","353":"Churachandpur","354":"Senapati","355":"Tamenglong","356":"Thoubal","357":"Ukhrul"},
		MEGHALAYA : {"359":"Shillong","360":"Garo Hills","361":"Jaintia Hills","362":"Khasi Hills","363":"Ri Bhoi"},
		MIZORAM : {"365":"Aizawl","366":"Champhai","367":"Kolasib","368":"Lawngtlai","369":"Lunglei","370":"Mamit","371":"Saiha","372":"Serchhip"},
		NAGALAND : {"374":"Kohima","375":"Dimapur","376":"Mokokchung","377":"Mon","378":"Phek","379":"Tuensang","380":"Wokha","381":"Zunheboto"},
		ORISSA : {"383":"Bhubaneshwar","384":"Angul","385":"Balangir","386":"Baleswar","387":"Bargarh","388":"Bhadrak","389":"Boudh","390":"Cuttack","391":"Debagarh","392":"Dhenkanal","393":"Gajapati","394":"Ganjam","395":"Jagatsinghapur","396":"Jajapur","397":"Jharsuguda","398":"Kalahandi","399":"Kandhamal","400":"Kendrapara","401":"Kendujhar","402":"Khordha","403":"Koraput","404":"Malkangiri","405":"Mayurbhanj","406":"Nabarangapur","407":"Nayagarh","408":"Nuapada","409":"Puri","410":"Rayagada","411":"Sambalpur","412":"Sonapur","413":"Sundergarh"},
		PONDICHERRY : {"415":"Pondicherry","416":"Karaikal","417":"Mahe","418":"Yanam"},
		PUNJAB : {"100":"Chandigarh","419":"Amritsar","420":"Bathinda","421":"Faridkot","422":"Fatehgarh Sahib","423":"Firozpur","424":"Gurdaspur","425":"Hoshiarpur","426":"Jalandhar","427":"Kapurthala","428":"Ludhiana","429":"Mansa","430":"Moga","431":"Muktsar","432":"Nawanshahr","433":"Patiala","434":"Rupnagar","435":"Sangrur","608":"SAS Nagar"},
		RAJASTHAN : {"437":"Jaipur","438":"Ajmer","439":"Alwar","440":"Banswara","441":"Baran","442":"Barmer","443":"Bharatpur","444":"Bhilwara","445":"Bikaner","446":"Bundi","447":"Chittorgarh","448":"Churu","449":"Dausa","450":"Dholpur","451":"Dungarpur","452":"Ganganagar","453":"Hanumangarh","454":"Jaisalmer","455":"Jalor","456":"Jhalawar","457":"Jhunjhunu","458":"Jodhpur","459":"Karauli","460":"Kota","461":"Nagaur","462":"Pali","463":"Rajsamand","464":"Sawai Madhopur","465":"Sikar","466":"Sirohi","467":"Tonk","468":"Udaipur"},
		SIKKIM : {"470":"Gangtok","471":"Sikkim"},
		TAMILNADU : {"472":"Chennai","473":"Coimbatore","474":"Cuddalore","475":"Dharmapuri","476":"Dindigul","477":"Erode","478":"Kanchipuram","479":"Kanyakumari","480":"Karur","481":"Krishnagiri","482":"Madurai","483":"Nagapattinam","484":"Namakkal","485":"Nilgiris","486":"Perambalur","487":"Pudukkottai","488":"Ramanathapuram","489":"Salem","490":"Sivaganga","491":"Thanjavur","492":"Theni","493":"Thoothukudi","494":"Tiruchirappalli","495":"Tirunelveli","496":"Tiruvallur","497":"Tiruvannamalai","498":"Tiruvarur","499":"Vellore","500":"Viluppuram","501":"Virudhunagar","607":"Ariyalur"},
		TRIPURA : {"503":"Agartala","504":"Dhalai","505":"Tripura"},
		UTTARPRADESH : {"506":"Lucknow","507":"Agra","508":"Aligarh","509":"Allahabad","510":"Ambedkar Nagar","511":"Auraiya","512":"Azamgarh","513":"Bagpat","514":"Bahraich","515":"Ballia","516":"Balrampur","517":"Banda","518":"Barabanki","519":"Bareilly","520":"Basti","521":"Bijnor","522":"Budaun","523":"Bulandshahr","524":"Chandauli","525":"Chitrakoot","526":"Deoria","527":"Etah","528":"Etawah","529":"Faizabad","530":"Farrukhabad","531":"Fatehpur","532":"Firozabad","533":"Gautam Buddha Nagar","534":"Ghaziabad","535":"Ghazipur","536":"Gonda","537":"Gorakhpur","538":"Hamirpur","539":"Hardoi","540":"Hathras","541":"Jalaun","542":"Jaunpur","543":"Jhansi","544":"Jyotiba Phule Nagar","545":"Kannauj","546":"Kanpur Dehat","547":"Kanpur Nagar","548":"Kaushambi","549":"Kheri","550":"Kushinagar","551":"Lalitpur","552":"Maharajganj","553":"Mahoba","554":"Mainpuri","555":"Mathura","556":"Mau","557":"Meerut","558":"Mirzapur","559":"Moradabad","560":"Muzaffarnagar","561":"Pilibhit","562":"Pratapgarh","563":"RaeBareli","564":"Rampur","565":"Saharanpur","566":"Sant Kabir Nagar","567":"Sant Ravidas Nagar","568":"Sahanpur","569":"Shrawasti","570":"Siddharthnagar","571":"Sitapur","572":"Sonbhadra","573":"Sultanpur","574":"Unnao","575":"Varanasi"},
		UTTARAKHAND : {"577":"Dehradun","578":"Almora","579":"Bageshwar","580":"Chamoli","581":"Champawat","582":"Haridwar","583":"Nainital","584":"Pauri Garhwal","585":"Pithoragarh","586":"Rudraprayag","587":"Tehri Garhwal","588":"Udham Singh Nagar","589":"Uttarkashi"},
		WESTBENGAL : {"591":"Kolkata","592":"24 Parganas","593":"Bankura","594":"Bardhaman","595":"Birbhum","596":"CoochBehar","597":"Darjiling","598":"Dinajpur","599":"Hooghly","600":"Howrah","601":"Jalpaiguri","602":"Malda","603":"Midnapore","604":"Murshidabad","605":"Nadia","606":"Puruliya"},
		TELANGANA : {"4":"Hyderabad","5":"Adilabad","11":"Karimnagar","12":"Khammam","15":"Mahbubnagar","16":"Medak","17":"Nalgonda","19":"Nizamabad","21":"Rangareddi","25":"Warangal"},
		//Toll Free No
		HELPLINENO : {"IN":["0-8144-99-88-77"],"IN_PAY":["1800-3000-6622"],"AU":["+61388205478"],"CA":["818-688-3593","888-824-6146"],"US":["818-688-3593","888-824-6146"],"SG":["8001012537"],"UK":["+442036080267","808-168-3055"],"MY":["1800815588"],"AE":["+971-4-3968637"],"OTHERS":["91-44-39115000"]},

		HEIGHTSRCHHASH :{"1":"121.92","2":"124.46","3":"127.00","4":"129.54","5":"132.08","6":"134.62","7":"137.16","8":"139.70","9":"142.24","10":"144.78","11":"147.32","12":"149.86","13":"152.40","14":"154.94","15":"157.48","16":"160.02","17":"162.56","18":"165.10","19":"167.64","20":"170.18","21":"172.72","22":"175.26","23":"177.80","24":"180.34","25":"182.88","26":"185.42","27":"187.96","28":"190.50","29":"193.04","30":"195.58","31":"198.12","32":"200.66","33":"203.20","34":"205.74","35":"208.28","36":"210.82","37":"213.36","38":"215.90","39":"218.44","40":"220.98","41":"223.52","42":"226.06","43":"228.60","44":"231.14","45":"233.68","46":"236.22","47":"238.76","48":"241.30"},

		AndroidVersionUpdateArray : {"VERSIONNO":126,"HEADING":"Android Update 5.6","CONTENT":["Discover Matches - You can now find matches based on your preferred location\/profession\/star\/education","Revamped Edit Profile Section","Bug Fixes & Performance Enhancements"],"CONTENT1":["Additional search criteria included for better matches","Get to know the profiles with parent's contact details","Critical bug, crash fixes & enhanced App performance for seamless experience"],"CONTENT2":["In-app Notifications - Don't miss out on any updates about your matches","Managing and adding photos is now easier than ever","Bug Fixes & Performance Enhancements"]},

		AndroidVersionForceUpdateArray : {"CONTENT":["You are missing out a lot on this outdated app. Our 'Good' app just got Better! Update and feel the difference."]},

		iOSVersionUpdateArray : {"VERSIONNO":2,"HEADING":"iOS Update 2.0","CONTENT":["Lorem Ipsum is simply dummy text of the printing and typesetting industry","It was popularised in the 1960s","will uncover many web sites still in their infancy","have evolved over the years, sometimes by accident"]},

		APPTMIOS : ['301','302','303'],
	};
	
	sphinxindexname = {
		STATSINFO :{"assamese":"assamesestatsinfo","bengali":"bengalistatsinfo","gujarati":"gujaratistatsinfo","hindi":"hindistatsinfo","kannada":"kannadastatsinfo","kerala":"keralastatsinfo","marathi":"marathistatsinfo","marwadi":"marwadistatsinfo","oriya":"oriyastatsinfo","parsi":"parsistatsinfo","punjabi":"punjabistatsinfo","sindhi":"sindhistatsinfo","tamil":"tamilstatsinfo","telugu":"telugustatsinfo","urdu":"urdustatsinfo"},
		PROFILEDETAILSINDEX : {"assamese":"assameseprofiledetailsindex","bengali":"bengaliprofiledetailsindex","gujarati":"gujaratiprofiledetailsindex","hindi":"hindiprofiledetailsindex","kannada":"kannadaprofiledetailsindex","kerala":"keralaprofiledetailsindex","marathi":"marathiprofiledetailsindex","marwadi":"marwadiprofiledetailsindex","oriya":"oriyaprofiledetailsindex","parsi":"parsiprofiledetailsindex","punjabi":"punjabiprofiledetailsindex","sindhi":"sindhiprofiledetailsindex","tamil":"tamilprofiledetailsindex","telugu":"teluguprofiledetailsindex","urdu":"urduprofiledetailsindex"},
		MEMBERLISTINDEX : {"assamese":"assamesememberlistindex","bengali":"bengalimemberlistindex","gujarati":"gujaratimemberlistindex","hindi":"hindimemberlistindex","kannada":"kannadamemberlistindex","kerala":"keralamemberlistindex","marathi":"marathimemberlistindex","marwadi":"marwadimemberlistindex","oriya":"oriyamemberlistindex","parsi":"parsimemberlistindex","punjabi":"punjabimemberlistindex","sindhi":"sindhimemberlistindex","tamil":"tamilmemberlistindex","telugu":"telugumemberlistindex","urdu":"urdumemberlistindex"},
		DECLINEDSTATUSINDEX : {"assamese":"assamesedeclinestatusindex","bengali":"bengalideclinestatusindex","gujarati":"gujaratideclinestatusindex","hindi":"hindideclinestatusindex","kannada":"kannadadeclinestatusindex","kerala":"keraladeclinestatusindex","marathi":"marathideclinestatusindex","marwadi":"marwadideclinestatusindex","oriya":"oriyadeclinestatusindex","parsi":"parsideclinestatusindex","punjabi":"punjabideclinestatusindex","sindhi":"sindhideclinestatusindex","tamil":"tamildeclinestatusindex","telugu":"telugudeclinestatusindex","urdu":"urdudeclinestatusindex"},
		BOOKMARKEDINDEX : {13:"assamesebookmarkedindex",7:"bengalibookmarkedindex",5:"gujaratibookmarkedindex",10:"hindibookmarkedindex",4:"kannadabookmarkedindex",3:"keralabookmarkedindex",6:"marathibookmarkedindex",14:"marwadibookmarkedindex",11:"oriyabookmarkedindex",12:"parsibookmarkedindex",8:"punjabibookmarkedindex",9:"sindhibookmarkedindex",1:"tamilbookmarkedindex",2:"telugubookmarkedindex",15:"urdubookmarkedindex"},
		PINMASTERINDEX : {13:"assamesepinmasterindex",7:"bengalipinmasterindex",5:"gujaratipinmasterindex",10:"hindipinmasterindex",4:"kannadapinmasterindex",3:"keralapinmasterindex",6:"marathipinmasterindex",14:"marwadipinmasterindex",11:"oriyapinmasterindex",12:"parsipinmasterindex",8:"punjabipinmasterindex",9:"sindhipinmasterindex",1:"tamilpinmasterindex",2:"telugupinmasterindex",15:"urdupinmasterindex"}
	};
	
	global.APPVPWEBPIMGFLAG =1;
	
	//Mobile APP type array
	MOBILEAPPTYPE : [104,101,102,103,114,151,107,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345]; //131,301,302,303  Tamilmatrimony Apptypes

	//Android APP type array
	ANDROIDAPPTYPE : [104,114,151,224,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145]; // 104 for common android device, 114 for nokia android, 151 for kindle fire(Amazon}, 224 for celkon android

	//Android regional app type
	regionalAppTypeArr : [131,132,133,134,135,136,137,138,139,140,141,142,143,144,145];

	//Windows APP type array
	WindowsAppType : [107]; // 107 for windows mobiles

	//IOS APP type array
	IOSAPPTYPE : [101,102,103,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345]; 
			
	MobileAppDetails = {104:"Android",101:"Iphone",102:"Ipad",103:"Ipod",114:"Nokio - Android",115:"WAP", 151:"Amazon - Android",107:"Windows"};
	
	exports.bmvars = bmvars;