/**********************************************************************************************
 *	Filename	: index.js							
 *	Author		: Sathrak paldurai K
 *	Date		: 28-09-2017								
 *	Description	: Viewed member details display.
 *  Versions    : Node - v8.2.0 & NPM  - 5.3.0
***********************************************************************************************/
	//pm2 start index.js -i 4
	/* Global Modules */
	fs				= require('fs');	
	mysql 			= require('mysql'); //mysql@2.14.1
	async 			= require('async'); // async@2.3.0
	crypto 			= require('crypto');
	CRC32 			= require('crc-32'); //crc-32@1.1.1
	request 		= require('request'); // request@2.82.0
	express 		= require('express'); // express@4.15.2
	strtotime 		= require('strtotime');//strtotime@1.0.0	
	dateFormat 		= require('dateformat'); // dateformat@3.0.2
	basicbauth 		= require('basic-auth'); // basic-auth@1.1.0
	bodyParser 		= require('body-parser');//body-parser@1.17.1
	vsprintf 		= require('sprintf').vsprintf; //sprintf@0.1.5
	preventxss 		= require('node-xss').clean; 	
	compression 	= require('compression');
	jwt 			= require('jsonwebtoken');
			
	var heapUsed = process.memoryUsage().heapUsed;
	console.log("Program is using " + heapUsed + " bytes of Heap.")
	
	process.on('uncaughtException', function (err) {
		console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
		console.error(err.stack)
	})
		
	const unhandledRejections = new Map();
	process.on('unhandledRejection', (reason, p) => {
		console.error('Unhandled Rejection at:', p, 'reason:', reason);
		unhandledRejections.set(p, reason);
	});
	
	process.on('rejectionHandled', (p) => {
		unhandledRejections.delete(p);
	});
	
	console.log = function(){};	
	
	/* Config & Generic files included */
	bminitvar 		= require('./confbm/bminit.js');
	bmvarsval		= require('./confbm/bmvars.js');	
	bmconfig 		= require('./confbm/bmconfig.js');
	sphinxvars 		= require('./confbm/bmsphinxvars.js');
	bmvarslable 	= require('./confbm/bmvarslable.js');
	bmcommlable 	= require('./confbm/bmcommuntitles.js');	
	bmdbip 			= require('./confbm/bmdbip.js');
	bmdbinfo 		= require('./confbm/bmdbinfo.js');
	partprefconf 	= require('./confbm/partnerprefconf.js');
	bmgenericarray 	= require('./confbm/bmgenericarrays.js');
	appbmvplabel 	= require('./confbm/bmvarsviewprofilelabel.js');	
	appbmgenarrays 	= require('./confbm/bmvarssearcharrincen.js');
	appbmviewarren 	= require('./confbm/bmvarsviewarren.js');
	appbmvarssearcharr = require('./confbm/bmvarssearchformarren.js');
	
	/* Libbm & Generic files included */
	bmgeneric 		= require('./libbm/bmfuncgeneric.js');
	bmphpfunc 		= require('./libbm/bmdefphpfunc.js');
	bmdbfunc 		= require('./libbm/bmdbfunction.js');
	bmCommonFunc 	= require('./libbm/bmfunccommon.js');	
	//bmSphinxRtDb 	= require('./libbm/bmsphinxrtclass.js');
	bmSphinxRtDb 	= require('./libbm/bmsphinxrtpoolclass.js');
	//bmSphinxDb 	= require('./libbm/bmsphinxclass.js');
	bmSphinxDb 		= require('./libbm/bmsphinxpoolclass.js');
	bmMergeMSdb 	= require('./libbm/bmsqlmmslaveclass.js');
	bmDb 			= require('./libbm/bmmysqlclass.js');
	sphinxcommfunc 	= require('./libbm/bmsphinxfunctions.js');
	bmmemcachefunc 	= require('./libbm/bmmemcacheclass.js');
	bmfuncmemcache 	= require('./libbm/bmmemcachefunc.js');
	bmClredis 		= require('./libbm/bmredisclass.js');
	bmlatestupd		= require('./libbm/bmlatestupdate.js');
	
	app = express();
	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});

	// parse application/json
	app.use(bodyParser.json());
	
	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({extended: true}));
	
	// parse application/vnd.api+json as json
	app.use(bodyParser.json({type: 'application/vnd.api+json' }));
	
	// compress all requests
	app.use(compression());
		
	/*var options = {
		key: fs.readFileSync('/etc/httpd/conf/ssl.key/2017-w1.matrimony.com.key'),
		cert: fs.readFileSync('/etc/httpd/conf/ssl.crt/2017-w1.matrimony.com.crt'),
		ca: fs.readFileSync('/etc/httpd/conf/ssl.crt/2016-intermediate-devapps.bharatmatrimony.com.crt'),
		requestCert: false,
		rejectUnauthorized: false
	};*/
	
	//app.all('*', bmgeneric.checkAuth);
	var port_http  	= dbconfig.port_http;
	var port_https 	= dbconfig.port_https;	
	var http  		= require('http').createServer(app);
	var https 		= require('http').createServer(app);
	var port 		= (!bmgeneric.empty(process.env.PORT)) ? process.env.PORT : port_http;
	
	//View Profile
	require('./www/viewprofile/index.js');
	
	//express interest
	require('./www/expressinterest/index.js');	
		
	app.get('/', function(req, res){
		console.log("Welcome to bharatmatrimony API");
		return res.send("Welcome to bharatmatrimony API");
	});
	
	http.listen(port, function () {
		console.log('http listening at port %d', port);
	});
	
	https.listen(port_https, function () {
		console.log('https listening at port %d', port_https);
	});