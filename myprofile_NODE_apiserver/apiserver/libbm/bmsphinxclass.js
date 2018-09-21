/**********************************************************************************************
File    : bmsphinxclass.js
Author  : Sathrak Paldurai k
Date    : 30-Aug-2016
************************************************************************************************
Description: Get member online status from SphinxRT
***********************************************************************************************/
	global.SPHINXCONN = {};
	/* Create sphinxcluster Connection Function*/
	SearchCluseter = function (sphinxip,sphinxkey){		
		//- Destroy the current connection variable
		if(SPHINXCONN[sphinxkey]) 
			SPHINXCONN[sphinxkey].destroy();
		
		//- Create the connection variable
		SPHINXCONN[sphinxkey] = mysql.createConnection({
			host     : sphinxip, 
			port	 : SPHINXIPCONFPORT['SPHINX_PORT'],
			user     : '',
			password : '',
			dateStrings: true,
			connectionLimit     : 10,
			defaultSelector     : 'RR',
			multipleStatements  : true,
			removeNodeErrorCount: 1
		});		
	
		//- Establish a new connection
		SPHINXCONN[sphinxkey].connect(function(err){
			if(!err) {
				console.log(sphinxkey + " - Sphinx Cluster is connected ...",APPSPHINXIPCONF[sphinxkey]);   
			} else {
				//console.log(sphinxkey + " - Sphinx Cluster Connection Error at :",err);    
				SearchCluseter(sphinxip,sphinxkey);
			}
		});
		
		//- Mysql Error listener
		SPHINXCONN[sphinxkey].on('error', function(err) {
			//- The server close the connection.
			if(err.code === "PROTOCOL_CONNECTION_LOST"){    
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
				SearchCluseter(sphinxip,sphinxkey);  
			}

			//- Connection in closing
			else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
				SearchCluseter(sphinxip,sphinxkey);  
			}

			//- Fatal error : connection variable must be recreated
			else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			    SearchCluseter(sphinxip,sphinxkey);  
			}

			//- Error because a connection is already being established
			else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
				console.error("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			}
			//- Anything else
			else{
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			    SearchCluseter(sphinxip,sphinxkey);  
			}			
		});
	}
	
	global.SPHINXCONNLB = {};
	/* Create SearchCluseterLP Connection Function*/
	SearchCluseterLP = function (sphinxip,sphinxkey){		
		//- Destroy the current connection variable
		if(SPHINXCONNLB[sphinxkey]) 
			SPHINXCONNLB[sphinxkey].destroy();
		
		//- Create the connection variable
		SPHINXCONNLB[sphinxkey] = mysql.createConnection({
			host     : sphinxip, 
			port	 : SPHINXLBIPPORT['SPHINX_PORT'],
			user     : '',
			password : ''
		});
		
		//- Establish a new connection
		SPHINXCONNLB[sphinxkey].connect(function(err){
			if(!err) {
				console.log(sphinxkey + " - SPHINXCONNLB - Sphinx Cluster is connected ...",SPHINXLBIPCONF[sphinxkey]);   
			} else {
				//console.log(sphinxkey + " - Sphinx Cluster Connection Error at :",err);    
				SearchCluseterLP(sphinxip,sphinxkey);
			}
		});
		
		//- Mysql Error listener
		SPHINXCONNLB[sphinxkey].on('error', function(err) {
			//- The server close the connection.
			if(err.code === "PROTOCOL_CONNECTION_LOST"){    
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
				SearchCluseterLP(sphinxip,sphinxkey);  
			}

			//- Connection in closing
			else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
				SearchCluseterLP(sphinxip,sphinxkey);  
			}

			//- Fatal error : connection variable must be recreated
			else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			    SearchCluseterLP(sphinxip,sphinxkey);  
			}

			//- Error because a connection is already being established
			else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
				console.error("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			}
			//- Anything else
			else{
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			    SearchCluseterLP(sphinxip,sphinxkey);  
			}			
		});
	}
	
	global.SPHXCOMNOTCON = {};
	/* Create ComNotInfoCluseter Connection Function*/
	ComNotInfoCluseter = function (sphinxip,sphinxkey){		
		//- Destroy the current connection variable
		if(SPHXCOMNOTCON[sphinxkey]) 
			SPHXCOMNOTCON[sphinxkey].destroy();
		
		//- Create the connection variable
		SPHXCOMNOTCON[sphinxkey] = mysql.createConnection({
			host     : sphinxip, 
			port	 : APPSPHINXDBPORT['SPHINX_PORT'],
			user     : '',
			password : ''
		});
	
		//- Establish a new connection
		SPHXCOMNOTCON[sphinxkey].connect(function(err){
			if(!err) {
				console.log(sphinxkey + " - SPHXCOMNOTCON - Sphinx Cluster is connected ...",APPSPHINXDBCONIP[sphinxkey]);   
			} else {
				ComNotInfoCluseter(sphinxip,sphinxkey);
			}
		});
		
		//- Mysql Error listener
		SPHXCOMNOTCON[sphinxkey].on('error', function(err) {
			//- The server close the connection.
			if(err.code === "PROTOCOL_CONNECTION_LOST"){    
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
				ComNotInfoCluseter(sphinxip,sphinxkey);  
			}

			//- Connection in closing
			else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
				ComNotInfoCluseter(sphinxip,sphinxkey);  
			}

			//- Fatal error : connection variable must be recreated
			else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			    ComNotInfoCluseter(sphinxip,sphinxkey);  
			}

			//- Error because a connection is already being established
			else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
				console.error("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			}
			//- Anything else
			else{
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			    ComNotInfoCluseter(sphinxip,sphinxkey);  
			}			
		});
	}
	
	global.SPHXWVAVCON = {};
	/* Create whoviewedalsoviewed Connection Function*/
	whoviewedalsoviewed = function (sphinxip,sphinxkey){		
		//- Destroy the current connection variable
		if(SPHXWVAVCON[sphinxkey]) 
			SPHXWVAVCON[sphinxkey].destroy();
		
		//- Create the connection variable
		SPHXWVAVCON[sphinxkey] = mysql.createConnection({
			host     : sphinxip, 
			port	 : global.SPHINXDBCONIPPORT,
			user     : '',
			password : ''
		});
		
		//- Establish a new connection
		SPHXWVAVCON[sphinxkey].connect(function(err){
			if(!err) {
				console.log(sphinxkey + " - SPHXWVAVCON - Sphinx Cluster is connected ...",SPHINXDBCONIP[sphinxkey]);   
			} else {
				whoviewedalsoviewed(sphinxip,sphinxkey);
			}
		});
		
		//- Mysql Error listener
		SPHXWVAVCON[sphinxkey].on('error', function(err) {
			//- The server close the connection.
			if(err.code === "PROTOCOL_CONNECTION_LOST"){    
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
				whoviewedalsoviewed(sphinxip,sphinxkey);  
			}

			//- Connection in closing
			else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
				whoviewedalsoviewed(sphinxip,sphinxkey);  
			}

			//- Fatal error : connection variable must be recreated
			else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			    whoviewedalsoviewed(sphinxip,sphinxkey);  
			}

			//- Error because a connection is already being established
			else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
				console.error("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			}
			//- Anything else
			else{
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			    whoviewedalsoviewed(sphinxip,sphinxkey);  
			}			
		});
	}
	
/*===============Start=================matchSummary Cluster() & Search LoadBalancer=========Start================*/
	global.SPHXMATCHSUMCON = {};
	/* Create matchSummaryCluster Connection Function*/
	matchSummaryCluster = function (sphinxip,sphinxkey){		
		//- Destroy the current connection variable
		if(SPHXMATCHSUMCON[sphinxkey]) 
			SPHXMATCHSUMCON[sphinxkey].destroy();
		
		//- Create the connection variable
		SPHXMATCHSUMCON[sphinxkey] = mysql.createConnection({
			host     : sphinxip, 
			port	 : global.SPHINXMATCHSUMPORT,
			user     : '',
			password : ''
		});
	
		//- Establish a new connection
		SPHXMATCHSUMCON[sphinxkey].connect(function(err){
			if(!err) {
				console.log(sphinxkey + " - SPHXMATCHSUMCON - Sphinx Cluster is connected ...",sphinxip);   
			} else {
				matchSummaryCluster(sphinxip,sphinxkey);
			}
		});
		
		//- Mysql Error listener
		SPHXMATCHSUMCON[sphinxkey].on('error', function(err) {
			//- The server close the connection.
			if(err.code === "PROTOCOL_CONNECTION_LOST"){    
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
				matchSummaryCluster(sphinxip,sphinxkey);  
			}

			//- Connection in closing
			else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
				matchSummaryCluster(sphinxip,sphinxkey);  
			}

			//- Fatal error : connection variable must be recreated
			else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			    matchSummaryCluster(sphinxip,sphinxkey);  
			}

			//- Error because a connection is already being established
			else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
				console.error("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			}
			//- Anything else
			else{
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			    matchSummaryCluster(sphinxip,sphinxkey);  
			}			
		});
	}
	
	/*===============Start=================mvmpCluster() & Members viewed my profile=========Start================*/
	global.SPHXMVMPCON = {};
	/* Create mvmpCluster Connection Function*/
	mvmpCluster = function (sphinxip,sphinxkey){		
		//- Destroy the current connection variable
		if(SPHXMVMPCON[sphinxkey]) 
			SPHXMVMPCON[sphinxkey].destroy();
		
		//- Create the connection variable
		SPHXMVMPCON[sphinxkey] = mysql.createConnection({
			host     : sphinxip, 
			port	 : global.SPHINXMATCHSUMPORT,
			user     : '',
			password : ''
		});
		
		//- Establish a new connection
		SPHXMVMPCON[sphinxkey].connect(function(err){
			if(!err) {
				console.log(sphinxkey + " - SPHXMVMPCON - Sphinx Cluster is connected ...",sphinxip);   
			} else {
				mvmpCluster(sphinxip,sphinxkey);
			}
		});
		
		//- Mysql Error listener
		SPHXMVMPCON[sphinxkey].on('error', function(err) {
			//- The server close the connection.
			if(err.code === "PROTOCOL_CONNECTION_LOST"){    
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
				mvmpCluster(sphinxip,sphinxkey);  
			}

			//- Connection in closing
			else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
				mvmpCluster(sphinxip,sphinxkey);  
			}

			//- Fatal error : connection variable must be recreated
			else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			    mvmpCluster(sphinxip,sphinxkey);  
			}

			//- Error because a connection is already being established
			else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
				console.error("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			}
			//- Anything else
			else{
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			    mvmpCluster(sphinxip,sphinxkey);  
			}			
		});
	}	
		
/*==============Start==============SearchCluseterLP()===========Start==================*/
	async.eachOfSeries(SPHINXLBIPCONF,function(sphinxip, sphinxkey, next){
		console.log("SPHINXLBIPCONF :",sphinxip,sphinxkey);
		SearchCluseterLP(sphinxip,sphinxkey);
		next(null);
	},function(err){
		if(err){
			console.error("SPHINXLBIPCONF at Error",err);
		}
	});	
/*==============End==============SearchCluseterLP()===========End==================*/
	
/*==============Start==============SearchCluseter()===========start==================*/
	async.eachOfSeries(APPSPHINXIPCONF,function(sphinxip, sphinxkey, next){
		console.log(sphinxip,sphinxkey);
		SearchCluseter(sphinxip,sphinxkey);
		next(null);
	},function(err){
		if(err){
			console.error("APPSPHINXIPCONF at Error",err);
		}
	});		
/*==============End==============SearchCluseter()===========End==================*/
	
/*================Start================ComNotInfoCluseter()=========Start================*/	
	async.eachOfSeries(APPSPHINXDBCONIP,function(sphinxip, sphinxkey, next){
		console.log("APPSPHINXDBCONIP :",sphinxip,sphinxkey);
		ComNotInfoCluseter(sphinxip,sphinxkey);
		next(null);
	},function(err){
		if(err){
			console.error("APPSPHINXIPCONF at Error",err);
		}		
	});		
/*=================End===============ComNotInfoCluseter()=========End================*/

/*===============Start=================Who Viewed Also Viewed =========Start================*/
	async.eachOfSeries(SPHINXDBCONIP,function(sphinxip, sphinxkey, next){
		console.log("SPHINXDBCONIP :",sphinxip,sphinxkey);
		whoviewedalsoviewed(sphinxip,sphinxkey);
		next(null);
	},function(err){
		if(err){
			console.error("whoviewedalsoviewed - SPHINXDBCONIP at Error",err);
		}
	});	

/*===============Start=================matchSummaryCluster() & Search LoadBalancer=========Start================*/
	async.eachOfSeries(SPHINXMATCHSUMIP,function(sphinxip, sphinxkey, next){
		console.log("SPHINXMATCHSUMIP :",sphinxip,sphinxkey);
		matchSummaryCluster(sphinxip,sphinxkey);
		next(null);
	},function(err){
		if(err){
			console.error("SPHINXMATCHSUMIP at Error",err);
		}
	});	

	/*===============Start============mvmpCluster() & Members viewed my profile=========Start================*/
	async.eachOfSeries(SPHINXMVMPIP,function(sphinxip, sphinxkey, next){
		console.log("SPHINXMVMPIP :",sphinxip,sphinxkey);
		mvmpCluster(sphinxip,sphinxkey);
		next(null);
	},function(err){
		if(err){
			console.error("SPHINXMVMPIP at Error",err);
		}
	});	
	
	xs =1;
	exports.bmDbSelect = function(objType,hostName,indexName,selectFields,whereClause,whereValueArr,maxMatchQry,qrycomt,cntflag,next){
		try{
			if (objType=='' && objType != '') {
				var viewprofileOutput = {};							
				viewprofileOutput['responsecode'] = 1;
				viewprofileOutput['errcode'] = 2;						
				viewprofileOutput['Error'] = "INVALID_CONNECTION_PARAMETERS_HOST";
				return next(viewprofileOutput, {});
			}			
							
			var start = bmgeneric.UnixTimeStamp();
			var writeTxtFile = "Time :"+start;
			writeTxtFile += "\nInside Select Qry "+bmgeneric.getDate("HH:MM:ss");			
			var sphinxql_execQuery  = "SELECT "+selectFields+ " FROM "+indexName+" WHERE "+whereClause +" option "+maxMatchQry+", comment="+mysql.escape(qrycomt)+"";		
			var totalfound = "SELECT count(*) as total_found FROM "+indexName+" WHERE "+whereClause +" option "+maxMatchQry+" ";
			var wherevalarr1 = '';
			if(cntflag==1){
				var Query  = sphinxql_execQuery;
			} else if(cntflag==2){
				var Query  = sphinxql_execQuery+';SHOW META;';
			} else {
				var Query  = 'SHOW META;';
			}
			//console.log("sphinxql_execQuery:",Query);
			if(whereClause != '' && selectFields != '' && !bmgeneric.empty(indexName) && !bmgeneric.empty(hostName)){
				//objType -> Based Get the Sphinx connection object.
				//objType -> 1 : Search and View Profile LB Cluster Connection
				//objType -> 2 : Search Cluster Connection
				//objType -> 3 : Communication Cluster Connection
				//objType -> 4 : Matchsummary Cluster Connection
				//objType -> 5 : Members viewed my profile Cluster Connection
				//objType -> 6 : Who Viewed Also Viewed Cluster Connection
						
				var SPHINXQLCONN = {};
				if(objType ==1){
					SPHINXQLCONN = global.SPHINXCONNLB[hostName];
				} else if(objType ==2){
					SPHINXQLCONN = global.SPHINXCONN[hostName];
				} else if(objType ==3){
					SPHINXQLCONN = global.SPHXCOMNOTCON[hostName];
				} else if(objType ==4){
					SPHINXQLCONN = global.SPHXMATCHSUMCON[hostName];
				} else if(objType ==5){
					SPHINXQLCONN = global.SPHXMVMPCON[hostName];			
				} else if(objType ==6){
					SPHINXQLCONN = global.SPHXWVAVCON[hostName];
				}
				if(typeof(SPHINXQLCONN) == "object"){
					SPHINXQLCONN.ping(function (err) {
						if (err) {
							console.log("SPHINX_CONNECTION_ERR:",err);
							var viewprofileOutput = {};							
							viewprofileOutput['responsecode'] = 1;
							viewprofileOutput['errcode'] = 2;
							viewprofileOutput['ErrorResponse'] = err;
							viewprofileOutput['Error'] = "SPHINX_UNABLE_TO_PING_ERR_IN_SELECT_QRY_ERR";
							viewprofileOutput['PARAMETER'] = sphinxql_execQuery;
							next(viewprofileOutput, viewprofileOutput);
							writeTxtFile += "; \nExecQry : "+whereValueArr;
							writeTxtFile += "; \nQry : "+Query;
							writeTxtFile += "; \nDb Host : "+SPHINXQLCONN.config.host;
							writeTxtFile += "; \nSPHINX_UNABLE_TO_PING_ERR_IN_SELECT_QRY_ERR: "+err;
							writeTxtFile += "\n=====================================================";
							bmSphinxDb.bmSphinxLogError("Sphinx_SelectQry-ERR",writeTxtFile,1,function(err,wrcallback){});
						} else {						
							SPHINXQLCONN.query(Query,whereValueArr, function(err, rows) {
								if (err) {
									console.log("SPHINX_CONNECTION_ERROR_OR_SELECT_QRY_ERR:",err);
									var viewprofileOutput = {};							
									viewprofileOutput['responsecode'] = 1;
									viewprofileOutput['errcode'] = 2;
									viewprofileOutput['ErrorResponse'] = err;
									viewprofileOutput['Error'] = "SPHINX_CONNECTION_ERROR_OR_SELECT_QRY_ERR";viewprofileOutput['PARAMETER'] = sphinxql_execQuery;
									next(viewprofileOutput, viewprofileOutput);
									writeTxtFile += "; \nExecQry : "+whereValueArr;
									writeTxtFile += "; \nQry : "+Query;
									writeTxtFile += "; \nDb Host : "+SPHINXQLCONN.config.host;
									writeTxtFile += "; \nSPHINX_CONNECTION_ERROR_OR_SELECT_QRY_ERR : "+err;
									writeTxtFile += "\n=====================================================";
									bmSphinxDb.bmSphinxLogError("Sphinx_SelectQry-ERR",writeTxtFile,1,function(err,wrcallback){});
								} else {
									var end = bmgeneric.UnixTimeStamp();
									console.log("BM Sphinx Select Query Time :" + (end-start) + " Seconds - Count :",xs);
									xs++;
									if(cntflag==2){										
										var resultdata = {};
										resultdata['RESULTS'] = rows[0];
										resultdata['TOTAL_FOUND'] = rows[1][0]['Value'];
										next(null, resultdata);
									} else {
										next(null, rows);
									}
									
									/****For SELECT query log delay ***/
									if(end - start > 6)	{
										writeTxtFile += "; After Execute "+bmgeneric.getDate("HH:MM:ss");
										writeTxtFile += "; \nExecQry : "+whereValueArr;
										writeTxtFile += "; \nQry : "+Query;										
										writeTxtFile += "; \nDb Host : "+SPHINXQLCONN.config.host;
										writeTxtFile += "\n=====================================================";
										bmSphinxDb.bmSphinxLogError("Sphinx_Select_SlowQry",writeTxtFile,1,function(err,wrcallback){});
									}			
								}			
							});
						}		  
					});
				} else {				
					var viewprofileOutput = {};							
					viewprofileOutput['responsecode'] = 1;
					viewprofileOutput['errcode'] = 2;
					viewprofileOutput['Error'] = err;
					viewprofileOutput['PARAMETER'] = sphinxql_execQuery;
					next(viewprofileOutput, {});
					writeTxtFile += "; \nExecQry : "+sphinxql_execQuery;
					writeTxtFile += "; \nQry : "+Query;
					writeTxtFile += "; \nSPHINX Host : undefined";
					writeTxtFile += "\n=====================================================";
					bmSphinxDb.bmSphinxLogError("Sphinx_SelectQry-ERR",writeTxtFile,1,function(err,wrcallback){});
				}
			} else {			
				var viewprofileOutput = {};							
				viewprofileOutput['responsecode'] = 1;
				viewprofileOutput['errcode'] = 2;
				viewprofileOutput['Error'] = "SELECT_QRY_WHERE-CLAUSE-ERR__DB-TBL-ERR__SELECT-FIELD-NOTARRAY";
				viewprofileOutput['PARAMETER'] = sphinxql_execQuery;					
				console.error("SELECT_QRY_WHERE-CLAUSE-ERR__DB-TBL-ERR__SELECT-FIELD-NOTARRAY");
				next(viewprofileOutput,viewprofileOutput);
			}
		}catch(err){
			console.error("Error On SphinxSRConn - bmDbSelect: File Name - Bmsphinxclass.js:",err);
			var viewprofileOutput = {};							
			viewprofileOutput['responsecode'] = 1;
			viewprofileOutput['errcode'] = 2;
			viewprofileOutput['Error'] = err;
			viewprofileOutput['PARAMETER'] = sphinxql_execQuery;
			next(viewprofileOutput,viewprofileOutput);
		}
	}
	
	exports.getViewProfileDomainInfo = function(){
		return 'VIEWPROFILELB_SPHINXRC2';
	}
	
	exports.getSphinxDomainInfo = function(type,gettype=0)//appsphinxgetDomainTransInfo
	{        
		var type= bmgeneric.allucwords(type);
		var ip = '';
		if(type=="10" || type=="H" || type=="HINDI")
		{
			if(gettype == 1)
				ip = 'DB1_SPHINXTRANS';
			else
				ip = 'DB1_LB_SPHINXTRANS';
		}
		else if(type=="8" || type=="P" || type=="PUNJABI")
		{
			if(gettype == 1)
				ip = 'DB1_SPHINXTRANS';
			else
				ip = 'DB1_LB_SPHINXTRANS';           
		}
		else if(type=="15" || type=="U" || type=="URDU")
		{
			if(gettype == 1)
				ip = 'DB1_SPHINXTRANS';
			else
				ip = 'DB1_LB_SPHINXTRANS';
		}
		else if(type=="9" || type=="S" || type=="SINDHI")
		{
			if(gettype == 1)
				ip = 'DB1_SPHINXTRANS';
			else
				ip = 'DB1_LB_SPHINXTRANS';
		}
		else if(type=="13" || type=="A" || type=="ASSAMESE")
		{
			if(gettype == 1)
				ip = 'DB1_SPHINXTRANS';
			else
				ip = 'DB1_LB_SPHINXTRANS';
		}
		else if(type=="4" || type=="K" || type=="KANNADA")
		{
		   if(gettype == 1)
				ip = 'DB2_SPHINXTRANS';
			else
				ip = 'DB2_LB_SPHINXTRANS';
		}
		else if(type=="2" || type=="T" || type=="TELUGU")
		{
		   if(gettype == 1)
				ip = 'DB2_SPHINXTRANS';
			else
				ip = 'DB2_LB_SPHINXTRANS';
		}
		else if(type=="11" || type=="Y" || type=="ORIYA")
		{
			if(gettype == 1)
				ip = 'DB2_SPHINXTRANS';
			else
				ip = 'DB2_LB_SPHINXTRANS';
		}
		else if(type=="3" || type=="E" || type=="KERALA")
		{
			if(gettype == 1)
				ip = 'DB5_SPHINXTRANS';
			else
				ip = 'DB5_LB_SPHINXTRANS';
		}
		else if(type=="12" || type=="C" || type=="PARSI")
		{
			if(gettype == 1)
				ip = 'DB5_SPHINXTRANS';
			else
				ip = 'DB5_LB_SPHINXTRANS';
		}
		else if(type=="7" || type=="B" || type=="BENGALI")        
		{
			if(gettype == 1)
				ip = 'DB3_SPHINXTRANS';
			else
				ip = 'DB3_LB_SPHINXTRANS';
		}
		else if(type=="5" || type=="G" || type=="GUJARATI")
		{
			if(gettype == 1)
				ip = 'DB3_SPHINXTRANS';
			else
				ip = 'DB3_LB_SPHINXTRANS';
		}
		else if(type=="6" || type=="R" || type=="MARATHI")
		{
			if(gettype == 1)
				ip = 'DB3_SPHINXTRANS';
			else
				ip = 'DB3_LB_SPHINXTRANS';
		}
		else if(type=="1" || type=="M" || type=="TAMIL")
		{
			if(gettype == 1)
				ip = 'DB4_SPHINXTRANS';
			else
				ip = 'DB4_LB_SPHINXTRANS';
		}
		else if(type=="14" || type=="D" || type=="MARWADI")
		{
			if(gettype == 1)
				ip = 'DB4_SPHINXTRANS';
			else
				ip = 'DB4_LB_SPHINXTRANS';
		}	
		return ip;
	}
	
	exports.sphinxgetDomainInfo = function() 
	{  
		return 'SPX_SEARCH_LB';
	}
	
	exports.sphinxgetWVAVDomainInfo = function(MatriId)  // for who viewed also viewed
	{	
		var ip = '';
		var domain_prefix = bmgeneric.ucwords(bmgeneric.substr(MatriId,0,1));
		SphinxWVAVbmVP = ['M','K','P','S','C']; //tamil - M,Kannda - K,punjabi - P,sindhi - S,Parsi - C
		SphinxWVAVbmVP2 = ['E','B','R','A','U']; //Kerala - E,Bengali - B,Marathi - R,assamese - A,urdu - U
		SphinxWVAVbmVP3 = ['H','T','D','Y','G']; //hindi - H,Telugu - T,marwadi - D,oriya - Y,Gujarati - G  

		if(bmgeneric.in_array(domain_prefix,SphinxWVAVbmVP))
		{
			ip = 'SphinxWVAVbmVP';
		}
		else if(bmgeneric.in_array(domain_prefix,SphinxWVAVbmVP2))
		{
			ip = 'SphinxWVAVbmVP2';
		}
		else if(bmgeneric.in_array(domain_prefix,SphinxWVAVbmVP3))
		{
			ip = 'SphinxWVAVbmVP3';
		}
		return ip;
	}
	
	exports.bmSphinxLogError = function(queName,writeTxtFile,type,next){
		var selectQrylog = bmgeneric.Log_Filename(queName);
		if(!bmgeneric.empty(selectQrylog)) {
			var filename = "/var/log/apilog/sphinxerrorlog/"+selectQrylog;			
			fs.open(filename, 'a', function(err, id) {
				if(!err){
					fs.write(id, writeTxtFile, null, 'utf8', function(){
						fs.close(id, function(){
							console.log('file closed');
						});
					});
				}
			});
		}
		return next(null,true);
	}	
