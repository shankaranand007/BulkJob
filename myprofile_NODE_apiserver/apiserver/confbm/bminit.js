/**********************************************************************************************
File    : bminit.js
Author  : Sathrak Paldurai k
Date    : 12-June-2017
************************************************************************************************
Description	: Configuration file used in bm
***********************************************************************************************/

	bminit = {
		//Live API Authentication
		APPUSER : "appsadmin",
		APPPWD : "A7jgPjuK",
		
		//Stg API Authentication
		//APPUSER : "appsadmin",
		//APPPWD : "A7jgPjuK",
		
		//Dev. API Authentication
		//APPUSER : "apps",
		//APPPWD : "D#v@pp$",
		
		APPSURL :"apps.bharatmatrimony.com",
		//APPSURL :"stgapps.bharatmatrimony.com",
		//APPSURL :"devapps.bharatmatrimony.com",		
		
		//SECRET_KEY :'XYZ123$BHARAT#MATRIMONY$PWA987ABC', //Local
		//SECRET_KEY :'ABCDEFGHIJKLMNOPQRSTUVWZYZMATRIMONY', //Staging
		SECRET_KEY :'XYZ123$BHARAT#MATRIMONY$PWA987ABC', //Live
		
		//APP 5.3 changes
		UPDATEACTIVITYTIMER : 60000,
		//CBS promo flag 
		cbspromoflag : 1,

		// Gamooga dashboard flags
		GAMOOGA_FLAG : 0,
		GAMOOGA_WINDOW_FLAG : 1,

		// online delta index update
		APPSUCCEEDLOGFLG : 0,
		//Phone No and Email free text insert Stop Flag
		PHONESTOPFLAG : 0,
		EMAILSTOPFLAG : 0,

		INTERRELIGIONFLAG:1,
		INTERRELIGION_ANDROID :0,
		INTERRELIGION_IOS:0,
		INTERRELIGION_WINDOWS :0,

		MEMCACHELIMIT : 20000,

		//Sphinxupdate time limit(in seconds) - Used in memstats.php
		SPHINXUPDATEINTERVAL : 600,

		WVAVSOLARFLAG:1,
		SEARCHLOGICFLAG:0,
		NMLOGICFLAG:1,

		WhoViewedAlsoViewedFlag : 1,
		DETECTFACE : 1,
		SORTVAL : 1,
		PREMMATCNT:5,
		ENABLEHTTPS:0,
		ENABLEFCM:0,
		deviceTrackingFlag : 1,
		BITGRAVITYPURGEFLAG : 1,
		
		//City list Mapping flag
		CITYLISTFLAG : 1,
		DAILY6MAILLOG : 1,
		//To generate encrypted image for photo protected image based on flag
		PHOTOECNRYPTFLAG : 1,

		//FLAG for Dailysix log debuging
		dailysix_log:1,

		// Flag for mysql to mysqli redirect
		isMysqlClass : 0,

		// Flag for query display
		debugdisplay : 1,

		//Flag for sphinx RT log display
		connectionlog:1,
		duplicateidlog:1,

		//Notification Enabled for PIN
		WEBNOTIFYNODEALERTENABLED:1,

		NAMEDISPLAYFLAG:0,
		//Basic template/mailer basic template from sphinx instead of DB
		ISBASICTEMPLATESPHINXENABLED : 0, //1 - from sphinx || 0 - from DB

		//newly added
		// Enable / Disable sendremainder sms
		EXPPMREQSMSFLAG : 1,
		// Enable / Disable mobilealert for classic plus/super/assist[Send Reminder]
		MOBILEALERTFLAG : 1,

		// This line added by Arun Annamalai - Enable / Disable mobilealert for Free and Classic members.
		MOBILEALERTFLAGFORFREE : 1,

		//Search Log entry ip
		SRCHTRKIP : 'lt.bharatmatrimony.com',
		 
		//support mail ids
		BMCONTACTMAILID 	: 'contact@bharatmatrimony.com',
		BMINFOMAILID 	: 'info@bharatmatrimony.com',
		BMREPLYMAILID 	: 'no-reply@bharatmatrimony.com',

		/*
		define("ALSALT1","Bs1PqWmd93"),
		define("ALSALT2","BZ47ki9Iwq"),
		define("ALSALT3","zK0pX68woH"),
		define("ALSALT4","mBAC502fcn"),
		*/

		//Used to enable or disble Mobile chat : 1 :> enable, 0 :> disable
		CHATENABLE : 1,
		// Encrypt-Decrypt key for login//
		encfpkey : "fdf2d34k8gcd39ucvgigd4265cssi",

		//While member login to the Wap site we are updating the onlinestatus/powerpackstatus to 6 (for wap chat purpose)
		WAPLOGINONLINESTATUS : 6,

		//while member online now status update on mongo db (using for WAP only).
		ONLINECHATFLAG : 1,

		//Critical field updation process
		CRITICALFIELDHIDDEN : 1,

		//100% mobile verify flags - starts
		mobileverifysuperflag : 1,
		blockuseractionflag : 1,

		//view similar profile flag
		appviewsimilarprofileflag : 1,

		//Myhome Latest updates flag
		MYHOMELATESTUPDATESFLAG : 1, //0-Disable , 1 -Enable

		// Display Webpimages flag for app users
		WEBPFLAG : 0,

		//In APP Notification flag
		INAPPNOTIFICATIONFLAG : 1, //0-Disable , 1 -Enable

		//Free Text Encrypted flags
		FREETXTMOBFLAG:1, // SENDALERTS Table Flag
		FREETXTKEYWORDCAPFLAG:1, // KEYWORDCAPTURE Table Flag
		FREETXTEMAILBOUNCEFLAG:0, // EMAILBOUNCE Table Flag
		FREETXTFACEBOOKPARTLYREGFLAG:1, // FACEBOOKPARTLYREG Table Flag
		FREETXTPARTLYREGFLAG:1, // PARTLYREGCASE1 Table Flag
		MOBILEALERTSFLAG:1, // MOBILEALERTS Table Flag
		ONLINEPAYMENTFAILURESFLAG:1, // ONLINEPAYMENTFAILURES Table Flag
		PAYPALTRACKFLAG:1, // PAYPALTRACK Table Flag
		PRIVILEGEINVITEINFOFLAG:1, // PRIVILEGEINVITEINFO Table Flag
		MATRIMONYDAYUSERSFLAG:1, // MATRIMONYDAYUSERS Table Flag
		MATRIMONYDAYFLAG:1, // MATRIMONYDAY Table Flag
		USECONTACTDETONLY : 1,//0 - Assured contact, contactinfo, contactdet tables will be updated, If the flag is set to 1, then we will update only the contactdet table.

		CONTACTFILTERFLAG : 0,
		
		osarray: {"1":"android","2":"mac","3":"symbian","4":"symbianos","5":"dopod","6":"windows phone os 7.5","7":"helio","8":"hosin","9":"huawei","10":"novarra","11":"webos","12":"techfaith","13":"palmsource","14":"ubuntu","15":"win16","16":"windows 95","17":"droid","18":"win95","19":"windows 98","20":"win98","21":"windows nt 5.0","22":"windows 2000","23":"windows nt 5.1","24":"windows xp","25":"windows nt 5.2","26":"windows nt 6.0","27":"windows nt 6.1","28":"windows nt 7.0","29":"windows nt 4.0","30":"winnt4.0","31":"palmos","32":"windows nt","33":"microsoft windows","34":"windows me","35":"x11","36":"mac_powerpc","37":"macintosh","38":"qnx","39":"beos","40":"bb10","41":"rim tablet os","42":"avantgo","43":"blazer","44":"elaine","45":"hiptop","46":"palm","47":"plucker","48":"xiino","49":"symbian","50":"symbos","51":"windows ce","52":"ppc","53":"smartphone","54":"window mobile","55":"windows phone","56":"wce","57":"windows phone os","58":"xblwp7","59":"zunewp7","60":"meego","61":"maemo","62":"j2me","63":"java","64":"midp","65":"cldc","66":"webos","67":"hpwos","68":"bada","69":"brew","70":"openbsd","71":"bsd","72":"sunos","73":"coolpad","74":"wos","75":"portalmmm"},

		Mongoentrytype : ["101","102", "103", "104","115","114","151","131","132","133","134","135","136","137","138","139","140","141","142","143","144","145","301","302","303","304","305","306","307","308","309","310","311","312","313","314","315","316","317","318","319","320","321","322","323","324","325","326","327","328","329","330","331","332","333","334","335","336","337","338","339","340","341","342","343","344","345"],

		//Inter-religion flag 1 - Enable , 0- disable
		ARRINTERRELIGIONFLAG : {"tamil":0,"telugu":0,"kerala":0,"kannada":0,"gujarati":0,"marathi":0,"bengali":0,"punjabi":0,"sindhi":0,"hindi":0,"oriya":0,"parsi":0,"assamese":0,"marwadi":0,"urdu":0},



		//Android App Hide photo enable Flag (for enlargephoto.php)
		APPHIDEPHOTOFLAG : {"tamil":0,"telugu":0,"kerala":0,"kannada":0,"gujarati":0,"marathi":0,"bengali":0,"punjabi":0,"sindhi":0,"hindi":0,"oriya":0,"parsi":1,"assamese":0,"marwadi":0,"urdu":0},//0-Disable , 1 -Enable

		//Google Analytic tracking array
		googleAnalyticsAcc : {'bharat':'33448923','assamese':'33409280','bengali':'33410757','gujarati':'33433390','hindi':'33082638','kannada':'33452102','kerala':'33450812','marathi':'33449423','marwadi':'33451312','oriya':'33428494','parsi':'33450122','punjabi':'33449820','sindhi':'33452132','tamil':'33451436','telugu':'33448971','urdu':'33454235'},

		// ProfileComplete Value
		// Muslim
		PROFILECOMPLETESCORE : {1: {"DEFAULTVAL":40,"FAMILY":8,"HOBBIES":5,"PARTNERPREF":8,"REFERENCE":8,"PHONE":10,"VERIPROFILE":5,"PHOTO":10,"VIDEO":3,"VOICE":3},2: {"DEFAULTVAL":30,"FAMILY":8,"HOBBIES":5,"PARTNERPREF":8,"REFERENCE":8,"PHONE":10,"VERIPROFILE":5,"PHOTO":10,"VIDEO":3,"VOICE":3,"HORO":10}},

		// For new length password check

		APPBUILDTYPE : {101:'IPHONE',102:'IPAD',103:'IPOD',104:'ANDROID',105:'ANDROIDTAB',106:'BLACKBERRY',107:'WINDOWS',301:'IPHONETAMIL',302:'IPADTAMIL',303:'IPODTAMIL',304:'IPHONEKERALA',305:'IPADKERALA',306:'IPODKERALA',307:'IPHONEBENGALI',308:'IPADBENGALI',309:'IPODBENGALI',310:'IPHONETELUGU',311:'IPADTELUGU',312:'IPODTELUGU',313:'IPHONEMARATHI',314:'IPADMARATHI',315:'IPODMARATHI',316:'IPHONEKANNADA',317:'IPADKANNADA',318:'IPODKANNADA',319:'IPHONEORIYA',320:'IPADORIYA',321:'IPODORIYA',322:'IPHONEGUJARATI',323:'IPADGUJARATI',324:'IPODGUJARATI',325:'IPHONEPUNJABI',326:'IPADPUNJABI',327:'IPODPUNJABI',328:'IPHONEHINDI',329:'IPADHINDI',330:'IPODHINDI',331:'IPHONEMARWADI',332:'IPADMARWADI',333:'IPODMARWADI',334:'IPHONEURDU',335:'IPADURDU',336:'IPODURDU',337:'IPHONEASSAMESE',338:'IPADASSAMESE',339:'IPODASSAMESE',340:'IPHONEPARSI',341:'IPADPARSI',342:'IPODPARSI',343:'IPHONESINDHI',344:'IPADSINDHI',345:'IPODSINDHI',131:'TAMILANDROID',132:'KERALAANDROID',133:'BENGALIANDROID',134:'TELUGUANDROID',135:'MARATHIANDROID',136:'KANNADAANDROID',137:'ORIYAANDROID',138:'GUJARATIANDROID',139:'PUNJABIANDROID',140:'HINDIANDROID',141:'MARWADIANDROID',142:'URDUANDROID',143:'ASSAMESEANDROID',144:'PARSIANDROID',145:'SINDHIANDROID'},

		COMMONVARS: {'FREETEXT_WORDCOUNT' : {"SubCaste":12,"Education":12,"Occupation":12,"ResidingArea":12,"Name":23,"MotherTongueOthers":12,"CasteOthers":12}},

		//Myhome Latest updates enabled domains
		MYHOMELATESTUPDATESDOMAIN : {"tamil":1,"telugu":1,"kerala":1,"kannada":1,"gujarati":1,"marathi":1,"bengali":1,"punjabi":1,"sindhi":1,"hindi":1,"oriya":1,"parsi":1,"assamese":1,"marwadi":1,"urdu":1},//0-Disable , 1 -Enable

		// Search log entry domain enable
		SRCHTRLKOGDOMAIN : {"tamil":1,"telugu":1,"kerala":1,"kannada":1,"gujarati":1,"marathi":1,"bengali":1,"punjabi":1,"sindhi":1,"hindi":1,"oriya":1,"parsi":1,"assamese":1,"marwadi":1,"urdu":1},//0-Disable , 1 -Enable


		REGIONALIOSAPPINFO : {
		301:{'feeback':'IPHONE-TAMILMATRIMONY','paymentpackage':'com.matrimony.tamilmatrimony.'},
		302:{'feeback':'IPAD-TAMILMATRIMONY','paymentpackage':'com.matrimony.tamilmatrimony.'},
		303:{'feeback':'IPOD-TAMILMATRIMONY','paymentpackage':'com.matrimony.tamilmatrimony.'},
		304:{'feeback':'IPHONE-KERALAMATRIMONY','paymentpackage':'com.matrimony.keralamatrimony.'},
		305:{'feeback':'IPAD-KERALAMATRIMONY','paymentpackage':'com.matrimony.keralamatrimony.'},
		306:{'feeback':'IPOD-KERALAMATRIMONY','paymentpackage':'com.matrimony.keralamatrimony.'},
		307:{'feeback':'IPHONE-BENGALIMATRIMONY','paymentpackage':'com.matrimony.bengalimatrimony.'},
		308:{'feeback':'IPAD-BENGALIMATRIMONY','paymentpackage':'com.matrimony.bengalimatrimony.'},
		309:{'feeback':'IPOD-BENGALIMATRIMONY','paymentpackage':'com.matrimony.bengalimatrimony.'},
		310:{'feeback':'IPHONE-TELUGUMATRIMONY','paymentpackage':'com.matrimony.telugumatrimony.'},
		311:{'feeback':'IPAD-TELUGUMATRIMONY','paymentpackage':'com.matrimony.telugumatrimony.'},
		312:{'feeback':'IPOD-TELUGUMATRIMONY','paymentpackage':'com.matrimony.telugumatrimony.'},
		313:{'feeback':'IPHONE-MARATHIMATRIMONY','paymentpackage':'com.matrimony.marathimatrimony.'},
		314:{'feeback':'IPAD-MARATHIMATRIMONY','paymentpackage':'com.matrimony.marathimatrimony.'},
		315:{'feeback':'IPOD-MARATHIMATRIMONY','paymentpackage':'com.matrimony.marathimatrimony.'},
		316:{'feeback':'IPHONE-KANNADAMATRIMONY','paymentpackage':'com.matrimony.kannadamatrimony.'},
		317:{'feeback':'IPAD-KANNADAMATRIMONY','paymentpackage':'com.matrimony.kannadamatrimony.'},
		318:{'feeback':'IPOD-KANNADAMATRIMONY','paymentpackage':'com.matrimony.kannadamatrimony.'},
		319:{'feeback':'IPHONE-ORIYAMATRIMONY','paymentpackage':'com.matrimony.oriyamatrimony.'},
		320:{'feeback':'IPAD-ORIYAMATRIMONY','paymentpackage':'com.matrimony.oriyamatrimony.'},
		321:{'feeback':'IPOD-ORIYAMATRIMONY','paymentpackage':'com.matrimony.oriyamatrimony.'},
		322:{'feeback':'IPHONE-GUJARATIMATRIMONY','paymentpackage':'com.matrimony.gujaratimatrimony.'},
		323:{'feeback':'IPAD-GUJARATIMATRIMONY','paymentpackage':'com.matrimony.gujaratimatrimony.'},
		324:{'feeback':'IPOD-GUJARATIMATRIMONY','paymentpackage':'com.matrimony.gujaratimatrimony.'},
		325:{'feeback':'IPHONE-PUNJABIMATRIMONY','paymentpackage':'com.matrimony.punjabimatrimony.'},
		326:{'feeback':'IPAD-PUNJABIMATRIMONY','paymentpackage':'com.matrimony.punjabimatrimony.'},
		327:{'feeback':'IPOD-PUNJABIMATRIMONY','paymentpackage':'com.matrimony.punjabimatrimony.'},
		328:{'feeback':'IPHONE-HINDIMATRIMONY','paymentpackage':'com.matrimony.hindimatrimony.'},
		329:{'feeback':'IPAD-HINDIMATRIMONY','paymentpackage':'com.matrimony.hindimatrimony.'},
		330:{'feeback':'IPOD-HINDIMATRIMONY','paymentpackage':'com.matrimony.hindimatrimony.'},
		331:{'feeback':'IPHONE-MARWADIMATRIMONY','paymentpackage':'com.matrimony.marwadimatrimony.'},
		332:{'feeback':'IPAD-MARWADIMATRIMONY','paymentpackage':'com.matrimony.marwadimatrimony.'},
		333:{'feeback':'IPOD-MARWADIMATRIMONY','paymentpackage':'com.matrimony.marwadimatrimony.'},
		334:{'feeback':'IPHONE-URDUMATRIMONY','paymentpackage':'com.matrimony.urdumatrimony.'},
		335:{'feeback':'IPAD-URDUMATRIMONY','paymentpackage':'com.matrimony.urdumatrimony.'},
		336:{'feeback':'IPOD-URDUMATRIMONY','paymentpackage':'com.matrimony.urdumatrimony.'},
		337:{'feeback':'IPHONE-ASSAMESEMATRIMONY','paymentpackage':'com.matrimony.assamesematrimony.'},
		338:{'feeback':'IPAD-ASSAMESEMATRIMONY','paymentpackage':'com.matrimony.assamesematrimony.'},
		339:{'feeback':'IPOD-ASSAMESEMATRIMONY','paymentpackage':'com.matrimony.assamesematrimony.'},
		340:{'feeback':'IPHONE-PARSIMATRIMONY','paymentpackage':'com.matrimony.parsimatrimony.'},
		341:{'feeback':'IPAD-PARSIMATRIMONY','paymentpackage':'com.matrimony.parsimatrimony.'},
		342:{'feeback':'IPOD-PARSIMATRIMONY','paymentpackage':'com.matrimony.parsimatrimony.'},
		343:{'feeback':'IPHONE-SINDHIMATRIMONY','paymentpackage':'com.matrimony.sindhimatrimony.'},
		344:{'feeback':'IPAD-SINDHIMATRIMONY','paymentpackage':'com.matrimony.sindhimatrimony.'},
		345:{'feeback':'IPOD-SINDHIMATRIMONY','paymentpackage':'com.matrimony.sindhimatrimony.'}},

		APPFEEDBACKANDROID : {131:{'feeback':'TAMILMATRIMONY-ANDROID'},132:{'feeback':'KERALAMATRIMONY-ANDROID'},
		133:{'feeback':'BENGALIMATRIMONY-ANDROID'},134:{'feeback':'TELUGUMATRIMONY-ANDROID'},
		135:{'feeback':'MARATHIMATRIMONY-ANDROID'},136:{'feeback':'KANNADAMATRIMONY-ANDROID'},
		137:{'feeback':'ORIYAMATRIMONY-ANDROID'},138:{'feeback':'GUJARATIMATRIMONY-ANDROID'},
		139:{'feeback':'PUNJABIMATRIMONY-ANDROID'},140:{'feeback':'HINDIMATRIMONY-ANDROID'},
		141:{'feeback':'MARWADIMATRIMONY-ANDROID'},142:{'feeback':'URDUMATRIMONY-ANDROID'},
		143:{'feeback':'ASSAMESEMATRIMONY-ANDROID'},144:{'feeback':'PARSIMATRIMONY-ANDROID'},
		145:{'feeback':'SINDHIMATRIMONY-ANDROID'}},

		CURRENCYVARAIABLEHASH : {"MYR":"myrtoinr","GDP":"gbptoinr","SGD":"sgdtoinr","AFA":"afatoinr","ALL":"alltoinr","DZD":"dzdtoinr","USD":"usdtoinr","EUR":"eurtoinr","AON":"aontoinr","XCD":"xcdtoinr","ARS":"arstoinr","AMD":"amdtoinr","AWG":"awgtoinr","AUD":"audtoinr","AZM":"azmtoinr","BSD":"bsdtoinr","BHD":"bhdtoinr","BDT":"bdttoinr","BBD":"bbdtoinr","BYB":"bybtoinr","BZD":"bzdtoinr","XOF":"xoftoinr","BMD":"bmdtoinr","BTN":"btntoinr","BOB":"bobtoinr","BAM":"bamtoinr","BWP":"bwptoinr","NOK":"noktoinr","BRL":"brltoinr","BND":"bndtoinr","BGL":"bgltoinr","BIF":"biftoinr","KHR":"khrtoinr","XAF":"xaftoinr","CAD":"cadtoinr","CVE":"cvetoinr","KYD":"kydtoinr","CLP":"clptoinr","CNY":"cnytoinr","COP":"coptoinr","KMF":"kmftoinr","NZD":"nzdtoinr","CRC":"crctoinr","HRK":"hrktoinr","CUP":"cuptoinr","CYP":"cyptoinr","CZK":"czktoinr","DKK":"dkktoinr","DJF":"djftoinr","DOP":"doptoinr","TPE":"tpetoinr","ECS":"ecstoinr","EGP":"egptoinr","SVC":"svctoinr","ERN":"erntoinr","EEK":"eektoinr","ETB":"etbtoinr","FKP":"fkptoinr","FJD":"fjdtoinr","XPF":"xpftoinr","GMD":"gmdtoinr","GEL":"geltoinr","GHC":"ghctoinr","GIP":"giptoinr","GNF":"gnftoinr","GWP":"gnftoinr","GYD":"gydtoinr","HTG":"htgtoinr","HNL":"hnltoinr","HKD":"hkdtoinr","HUF":"huftoinr","ISK":"isktoinr","IDR":"idrtoinr","IRR":"irrtoinr","IQD":"iqdtoinr","ILS":"ilstoinr","JMD":"jmdtoinr","JPY":"jpytoinr","JOD":"jodtoinr","KZT":"kzttoinr","KES":"kestoinr","KPW":"kpwtoinr","KRW":"krwtoinr","KWD":"kwdtoinr","KGS":"kgstoinr","LAK":"laktoinr","LVL":"lvltoinr","LBP":"lbptoinr","LSL":"lsltoinr","LRD":"lrdtoinr","LYD":"lydtoinr","CHF":"chftoinr","LTL":"ltltoinr","MOP":"moptoinr","MKD":"mkdtoinr","MGF":"mgftoinr","MWK":"mwktoinr","MVR":"mvrtoinr","MTL":"mtltoinr","MRO":"mrotoinr","MUR":"murtoinr","MXN":"mxntoinr","MDL":"mdltoinr","MNT":"mnttoinr","MAD":"madtoinr","MMK":"mmktoinr","NAD":"nadtoinr","NPR":"nprtoinr","ANG":"angtoinr","NGN":"ngntoinr","OMR":"omrtoinr","PKR":"pkrtoinr","PAB":"pabtoinr","PGK":"pgktoinr","PYG":"pygtoinr","PEN":"pentoinr","PHP":"phptoinr","PLZ":"plztoinr","QAR":"qartoinr","ROL":"roltoinr","RUR":"rurtoinr","RWF":"rwftoinr","GBP":"gbptoinr","WST":"wsttoinr","ITL":"itltoinr","STD":"stdtoinr","SAR":"sartoinr","SCR":"scrtoinr","SLL":"slltoinr","SKK":"skktoinr","SIT":"sittoinr","ZAR":"zartoinr","LKR":"lkrtoinr","SHP":"shptoinr","SRG":"srgtoinr","SZL":"szltoinr","SEK":"sektoinr","SYP":"syptoinr","TWD":"twdtoinr","TZS":"tzstoinr","THB":"thbtoinr","TOP":"toptoinr","TTD":"ttdtoinr","TND":"tndtoinr","TMM":"tmmtoinr","UGS":"ugstoinr","UAG":"uagtoinr","AED":"aedtoinr","UZS":"uzstoinr","VUV":"vuvtoinr","VND":"vndtoinr","YER":"yertoinr","YUN":"yuntoinr","CDF":"cdftoinr","ZMK":"zmktoinr","ZWD":"zwdtoinr"}
	};
	
	var today = new Date();
	var date = dateFormat(today,'Y-m-d H:i:s');
	if(date >= '2015-03-03 13:00:00' && date <= '2015-03-04 16:00:00')
		global.DAILY6APPLOG = 1;
	else
		global.DAILY6APPLOG = 0;
	
	global.IDSTARTLETTERHASH = {7:"B",6:"R",5:"G",8:"P",10:"H",9:"S",4:"K",3:"E",2:"T",1:"M",14:"D",12:"C",13:"A",11:"Y",15:"U"};
	global.DOMAINNAME = {1:"tamil",2:"telugu",3:"kerala",4:"kannada",5:"gujarati",6:"marathi",7:"bengali",8:"punjabi",9:"sindhi",10:"hindi",11:"oriya",12:"parsi",13:"assamese",14:"marwadi",15:"urdu"};
	
	//global.DOMAINPREFFIXWITHSUBDOMAINS = {'/www./','/weddingdirectory./','/profile./','/bmser./','/bmimage./','/image./','/bmimg./','/img./','/matrimony/','/.com/','/yahoo./','/galatta./',"/\//"};
	
	//global.DOMAINPREFFIX = {'/www./','/weddingdirectory./','/profile./','/bmser./','/bmimage./','/image./','/bmimg./','/img./','/matrimony/','/.com/',"/\//"};
	
	global.RIGHTPANELQS_DOMAINMOTHERTONGUE = {47:"tamil",48:"telugu",31:"kerala",19:"kannada",14:"gujarati",33:"marathi",4:"bengali",41:"punjabi",45:"sindhi",17:"hindi",40:"oriya",14:"parsi",2:"assamese",34:"marwadi",51:"urdu"};
		
	global.PWADOMAINFLAG = {"B":0,"R":0,"G":0,"P":0,"H":0,"S":0,"K":0,"E":0,"T":0,"M":0,"D":0,"C":0,"A":1,"Y":0,"U":0};
	
	// Global Variables //
	global.DEBUGVALUE = 'bmUIdev';
	//  Sphinx Dashboard flag activate / Deactivate
	global.DASHBOARDOPTIONFLAG="1";
	global.DASHBOARDMEMCACHEFLAG="0";
	global.DASHBOARDENTRYTYPEFLAG="all";

	//added for mobile app profile highlighter offer file
	global.DATEADD = "~DATEADD~";
	global.MULT_OPT = "~MULT~";
	global.AESENC = "~AESENC~";
	global.AESDEC = "~AESDEC~";
	global.DATESUB = "~DATESUB~";
	global.CONCAT = "~CONCAT~";
	global.CONCATWS = "~CONCATWS~";
	// Global Usage Domain Module Prefix Variables // For express interest mailers
	global.DOMAINMODULEPREFIX = 'profile.';
	global.IMGDOMAINPREFIX = 'img.';
	global.IMAGEDOMAINPREFIX = 'image.';
	global.BMIMAGEDOMAINPREFIX = 'image.'; 
	global.AKAMAIJSPREFIX = 'imgs.';
	global.PWAIDARRAY = ['M3239095','M3686573','M3445167','M4550007','M4841456','M4819520','M4830053','E3670783','M2637926','M4759366','T2488813','M3573143','M3858892','M4886309','M2414547','H5636367','H6539545','M4505459','M4518832','M4700474','M4066110','M5051561','M3700948','T4041683','M5048840','E3953861','M4479164','H6160735','E3813064','M5051743','M5051749','M5051606','M5051970','M5051938','M5051939','A384131'];

	global.PWAHOSTURL = 'mobile'; //LIVE

	global.WAPHOSTURL = 'm';//LIVE
	
	global.PROMOHIGHLIGHTDAYS = 14;
	
	// Global vaiable declaration //
	global.LANGGROUP1 = [7,5,6]; //DB4 Server B,G,R-I
	global.LANGGROUP2 = [10,8,15,9,13]; //DB1 Server H,P,U,S,A
	global.LANGGROUP3 = [2,12,4,3,11]; //DB2 Server T,C,K,E,Y
	global.LANGGROUP4 = [1,14]; //DB10 Server M,D-N
	
	exports.bminit = bminit;