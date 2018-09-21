/**********************************************************************************************
File    : bmsphinxclass.js
Author  : Sathrak Paldurai k
Date    : 30-Aug-2016
************************************************************************************************
Description: Get member online status from SphinxRT
***********************************************************************************************/

	global.sqlPatternArr = [" UNION ALL "," INTO OUTFILE "," LOAD_FILE "," INFORMATION_SCHEMA "," SHOW TABLES "," SHOW DATABASES "," CHAR("," @@VERSION"," -999.9"," -9.9"," x=x"," x=y"," WAITFOR DELAY"," hex(","(1=1"," 1=1"];
	
	global.SPHINXRTCONN = {};
	/* Create sphinxcluster Connection Function*/
	sphinxRTServer = function (sphinxip,sphinxkey){
		//- Destroy the current connection variable
		if(SPHINXRTCONN[sphinxkey]) 
			SPHINXRTCONN[sphinxkey].end();
		
		//- Create the connection variable
		SPHINXRTCONN[sphinxkey]  = mysql.createPool({
			connectionLimit : dbconfig.poolLimit,
			host     : sphinxip, 
			port	 : SPHINXONLINDEXPORT['SPHINX_PORT'],
			user     : '',
			password : ''
		});	
		
		//- Mysql Error listener
		SPHINXRTCONN[sphinxkey].on('error', function(err) {		
			//- The server close the connection.
			if(err.code === "PROTOCOL_CONNECTION_LOST"){    
				console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
				sphinxRTServer(sphinxip,sphinxkey);  
			}
			//- Connection in closing
			else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
				console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
				sphinxRTServer(sphinxip,sphinxkey);  
			}
			//- Fatal error : connection variable must be recreated
			else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
				console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			    sphinxRTServer(sphinxip,sphinxkey);  
			}
			//- Error because a connection is already being established
			else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
				console.error("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			}
			//- Anything else
			else{
				console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			    sphinxRTServer(sphinxip,sphinxkey);  
			}			
		});
	}
	
	global.SPHINXLTUPCONN = {};
	/* Create sphinxcluster Connection Function*/
	SphinxLATUPFun = function (sphinxip,sphinxkey){
		//- Destroy the current connection variable
		if(SPHINXLTUPCONN[sphinxkey]) 
			SPHINXLTUPCONN[sphinxkey].end();
		
		//- Create the connection variable
		SPHINXLTUPCONN[sphinxkey]  = mysql.createPool({
			connectionLimit : dbconfig.poolLimit,
			host     : sphinxip, 
			port	 : SPHINXONLINDEXPORT['SPHINX_PORT'],
			user     : '',
			password : ''
		});			
		
		//- Mysql Error listener
		SPHINXLTUPCONN[sphinxkey].on('error', function(err) {
			//- The server close the connection.
			if(err.code === "PROTOCOL_CONNECTION_LOST"){    
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
				SphinxLATUPFun(sphinxip,sphinxkey);  
			}
			//- Connection in closing
			else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
				SphinxLATUPFun(sphinxip,sphinxkey);  
			}
			//- Fatal error : connection variable must be recreated
			else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			    SphinxLATUPFun(sphinxip,sphinxkey);  
			}
			//- Error because a connection is already being established
			else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
				console.error("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			}
			//- Anything else
			else{
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			    SphinxLATUPFun(sphinxip,sphinxkey);  
			}			
		});
	}
	
	global.SPHINXRTINUPCONN = {};
	/* Create sphinxcluster Connection Function*/
	SphinxRTUpdate = function (sphinxip, sphinxkey){
		if(SPHINXRTINUPCONN[sphinxkey]) 
			SPHINXRTINUPCONN[sphinxkey].end();
		
		//- Create the connection variable
		SPHINXRTINUPCONN[sphinxkey]  = mysql.createPool({
			connectionLimit : dbconfig.poolLimit,
			host     : sphinxip, 
			port	 : SPHINXONLINDEXPORT['SPHINX_PORT'],
			user     : '',
			password : ''
		});			
		
		//- Mysql Error listener
		SPHINXRTINUPCONN[sphinxkey].on('error', function(err) {
			//- The server close the connection.
			if(err.code === "PROTOCOL_CONNECTION_LOST"){    
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
				SphinxRTUpdate(sphinxip,sphinxkey);  
			}
			//- Connection in closing
			else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
				SphinxRTUpdate(sphinxip,sphinxkey);  
			}
			//- Fatal error : connection variable must be recreated
			else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			    SphinxRTUpdate(sphinxip,sphinxkey);  
			}
			//- Error because a connection is already being established
			else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
				console.error("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			}
			//- Anything else
			else{
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			    SphinxRTUpdate(sphinxip,sphinxkey);  
			}			
		});
	}
		
	global.SPHINXONLINUPCONN = {};
	/* Create Online Update/Insert sphinxcluster Connection Function*/
	SphinxONLUpdate = function (sphinxip, sphinxkey){	
		if(SPHINXONLINUPCONN[sphinxkey]) 
			SPHINXONLINUPCONN[sphinxkey].end();
		
		//- Create the connection variable
		SPHINXONLINUPCONN[sphinxkey]  = mysql.createPool({
			connectionLimit : dbconfig.poolLimit,
			host     : sphinxip, 
			port	 : SPHINXONLINDEXPORT['SPHINX_PORT'],
			user     : '',
			password : ''
		});	
		
		//- Mysql Error listener
		SPHINXONLINUPCONN[sphinxkey].on('error', function(err) {
			//- The server close the connection.
			if(err.code === "PROTOCOL_CONNECTION_LOST"){    
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
				SphinxONLUpdate(sphinxip,sphinxkey);  
			}
			//- Connection in closing
			else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
				SphinxONLUpdate(sphinxip,sphinxkey);  
			}
			//- Fatal error : connection variable must be recreated
			else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			    SphinxONLUpdate(sphinxip,sphinxkey);  
			}
			//- Error because a connection is already being established
			else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
				console.error("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			}
			//- Anything else
			else{
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			    SphinxONLUpdate(sphinxip,sphinxkey);  
			}			
		});
	}
	
	/*************************Online status Select **********************/
	async.eachOfSeries(SPHINXONLINDEX,function(sphinxip, sphinxkey, next){
		sphinxRTServer(sphinxip,sphinxkey);
		next(null);
	},function(err){
		if(err){
			console.error("Error:",err);
		}
	});	
	
	/*************************Latest Update Select **********************/
	async.eachOfSeries(SPHINXLATSTUPIP,function(sphinxip, sphinxkey, next){
		SphinxLATUPFun(sphinxip,sphinxkey);
		next(null);
	},function(err){
		if(err){
			console.error("SPHINXLATSTUPIP at Error",err);
		}
	});
	
	/************************* Online delta Insert / Update *****************/
	async.eachOfSeries(SPHINXONLINDEXARR,function(sphinxIpArr, sphinxkey, next){
		async.each(Object.keys(sphinxIpArr),function(key, cb){
			SphinxONLUpdate(sphinxIpArr[key],sphinxkey+key);
			cb(null);
		},function(err){
			next(null);
		});	
	},function(err){
		if(err){
			console.error("SPHINXONLINDEXARR at Error",err);
		}
	});	

	/************************* Latest Update Insert / Update *****************/
	async.eachOfSeries(APPSPHINXDBCONIPARR,function(sphinxIpArr, sphinxkey, next){
		async.each(Object.keys(sphinxIpArr),function(key, cb){
			SphinxRTUpdate(sphinxIpArr[key],sphinxkey+key);
			cb(null);
		},function(err){
			next(null);
		});	
	},function(err){
		if(err){
			console.error("APPSPHINXDBCONIPARR at Error",err);
		}
	});		
	
	exports.bmDbSelect = function(objType,hostName,indexName,selectFields,whereClause,whereValueArr,maxMatchQry,qrycomt,cntflag,next){
		try{
			if (objType=='') {
				var viewprofileOutput = {};							
				viewprofileOutput['responsecode'] = 0;
				viewprofileOutput['errcode'] = 1;						
				viewprofileOutput['Error'] = "INVALID_CONNECTION_PARAMETERS_HOST";
				return next(viewprofileOutput, {});
			} 
		
			//objType -> Based Get the Sphinx connection object.
			//objType -> 1 : Online dalta Index Connection
			//objType -> 2 : Latest Update Index Connection					
			var DELTARTCONNT = {};
			if(objType ==1){
				DELTARTCONNT = global.SPHINXRTCONN[hostName];
			} else if(objType ==2){
				DELTARTCONNT = global.SPHINXLTUPCONN[hostName];
			} 
			
			var start = bmgeneric.UnixTimeStamp();	
			var writeTxtFile = "Time :"+start;
			var sphinxql_execQuery  = "SELECT "+selectFields+ " FROM "+indexName+" WHERE "+whereClause +" option "+maxMatchQry+" ";		
			var totalfound = "SELECT count(*) as total_found FROM "+indexName+" WHERE "+whereClause +" option "+maxMatchQry+" ";
			if(cntflag==1){
				var Query  = sphinxql_execQuery;
			} else if(cntflag==2){
				var Query  = sphinxql_execQuery+';SHOW META;';
			} else {
				var Query  = totalfound;
			}
			
			var ErrTxt = "Select";
			if(whereClause != '' && selectFields != '' && indexName != ''){
				writeTxtFile += "\nInside "+ErrTxt+" Qry "+bmgeneric.getDate("HH:MM:ss");
				if(typeof(DELTARTCONNT) == "object"){
					DELTARTCONNT.getConnection(function (err,RTCONNECTION) {
						if (err) {
							console.error("SPHINXRT_CONNECTION_ERROR__ERR_IN_"+ErrTxt+"_QRY:",err);
							var viewprofileOutput = {};							
							viewprofileOutput['responsecode'] = 2;
							viewprofileOutput['errcode'] = 1;
							viewprofileOutput['Error'] = "SPHINXRT_CONNECTION_ERROR__ERR_IN_"+ErrTxt+"_QRY";
							viewprofileOutput['PARAMETER'] = Query;
							next(err, viewprofileOutput);
							writeTxtFile += "; \nExecQry : "+whereValueArr;
							writeTxtFile += "; \nQry : "+Query;
							writeTxtFile += "; \nDb Host : "+RTCONNECTION.config.host;
							writeTxtFile += "; \nDb SPHINXRT_CONNECTION_ERROR__ERR_IN_"+ErrTxt+"_QRY :"+err;
							writeTxtFile += "\n=====================================================";
							bmSphinxRtDb.bmSphinxLogError(ErrTxt+"Qry-RT-ERR",writeTxtFile,1,function(err,rtlogger){});
							return;
						}
						RTCONNECTION.query(Query,whereValueArr, function(err, rows) {
							RTCONNECTION.release();
							if (err) {
								console.log("SPHINXRT_CONNECTION_ERROR_OR_"+ErrTxt+"_QRY_ERR:",err.code);
								var viewprofileOutput = {};							
								viewprofileOutput['responsecode'] = 2;
								viewprofileOutput['errcode'] = 1;
								viewprofileOutput['Error'] = "SPHINXRT_CONNECTION_ERROR_OR_"+ErrTxt+"_QRY_ERR";
								viewprofileOutput['PARAMETER'] = Query;
								next(err, viewprofileOutput);
								writeTxtFile += "; \nExecQry : "+whereValueArr;
								writeTxtFile += "; \nQry : "+Query;
								writeTxtFile += "; \nDb Host : "+RTCONNECTION.config.host;
								writeTxtFile += "; \nDb SPHINXRT_CONNECTION_ERROR_OR_"+ErrTxt+"_QRY_ERR :"+err;
								writeTxtFile += "\n=====================================================";
								bmSphinxRtDb.bmSphinxLogError(ErrTxt+"Qry-RT-ERR",writeTxtFile,1,function(err,rtlogger){});
								return;
							} 														
							if(cntflag==2){										
								var resultdata = {};
								resultdata['RESULTS'] = rows[0];
								resultdata['TOTAL_FOUND'] = rows[1][0]['Value'];
								next(null, resultdata);
							} else {
								next(null, rows);
							}							
							var end = bmgeneric.UnixTimeStamp();
							/****For SELECT query log delay ****/
							if(end - start > 12){
								writeTxtFile += "; After Execute "+bmgeneric.getDate("HH:MM:ss");
								writeTxtFile += "; \nExecQry : "+whereValueArr;
								writeTxtFile += "; \nQry : "+Query;						
								writeTxtFile += "; \nDb Host : "+RTCONNECTION.config.host;
								writeTxtFile += "\n=====================================================";
								bmSphinxRtDb.bmSphinxLogError(ErrTxt+"Qry-RT_SlowQuert",writeTxtFile,1,function(err,rtlogger){});
							}	
						});
					});
				} else {
					var err = "SPHINXRT_UNABLE_TO_PING_ERR_IN_"+ErrTxt+"_QRY:undefined";
					console.error(err);
					var viewprofileOutput = {};							
					viewprofileOutput['responsecode'] = 0;
					viewprofileOutput['errcode'] = 1;
					viewprofileOutput['Error'] = err;
					viewprofileOutput['PARAMETER'] = Query;
					next(viewprofileOutput, {});
					writeTxtFile += "; \nExecQry : "+whereValueArr;
					writeTxtFile += "; \nQry : "+Query;
					writeTxtFile += "; \nDb Host : undefined";
					writeTxtFile += "\n=====================================================";
					bmSphinxRtDb.bmSphinxLogError(ErrTxt+"Qry-RT-ERR",writeTxtFile,1,function(err,rtlogger){});
				}			
			} else {
				var viewprofileOutput = {};							
				viewprofileOutput['responsecode'] = 0;
				viewprofileOutput['errcode'] = 1;
				viewprofileOutput['Error'] = "SELECT_QRY_WHERE-CLAUSE-ERR__DB-TBL-ERR__SELECT-FIELD-NOTARRAY";
				viewprofileOutput['PARAMETER'] = sphinxql_execQuery;
				next(viewprofileOutput,{});
			}
		}catch(err){
			console.error("Error On SphinxRTConn - bmDbSelect: File Name - Bmsphinxclass.js:",err);
			var viewprofileOutput = {};							
			viewprofileOutput['responsecode'] = 0;
			viewprofileOutput['errcode'] = 1;
			viewprofileOutput['Error'] = err;		
			next(viewprofileOutput,{});
		}
	}
	
	// function to insert the array values to the table //25038395//$insertData, $insertType = 1, $returnType = 1,
	exports.bmDbInsert = function(dbhost,tableName,insertData,insertType=1,returnType=1,primaryKeyFields={},next){
		var start = bmgeneric.UnixTimeStamp();
		var writeTxtFile = "";
		writeTxtFile += "\nInside INSERT Qry "+bmgeneric.getDate("HH:MM:ss");
		var field_list = value_list = u_query = updateFieldValue = "";
		var insertValueArr =[]; var updateValueArr = [];
		
		//objType -> Based Get the Sphinx connection object.
		//objType -> 1 : Online dalta Index Connection
		//objType -> 2 : Latest Update Index Connection					
		var SPHINXQLRTCONN = {};
		if(dbhost.HOSTTYPE ==1){
			SPHINXQLRTCONN = global.SPHINXONLINUPCONN[dbhost.DBHOST];
		} else {
			SPHINXQLRTCONN = global.SPHINXRTINUPCONN[dbhost.DBHOST];
		} 		
		
		if(bmgeneric.empty(insertData)){	
			next({'ERROR':'INVALID_INSERT_DATA'},{});
		} else {
			async.forEachOf(insertData, function (value, field, feock) {
				field_list += bmgeneric.trim(field)+", ";
				if(bmgeneric.is_array(value))
				{				
					if(value[0] == global.AESENC)
					{							
						value_list += "AES_ENCRYPT('"+bmgeneric.trim(value[1])+"','"+bmgeneric.trim(value[2])+"'), ";
					}else if(value[0] == global.AESDEC)
					{							
						value_list += "AES_DECRYPT('"+bmgeneric.trim(value[1])+"','"+bmgeneric.trim(value[2])+"'), ";
					}else if(value[0] == global.DATEADD || value[0] == global.DATESUB)
					{		
						keyWordDate = (value[0] == global.DATEADD) ? "DATE_ADD" : "DATE_SUB";
						value_list += keyWordDate+"("+bmgeneric.trim(value[1])+","+bmgeneric.trim(value[2])+"), ";
						insertValueArr.push(value[3]);
					} else {
						//+, - operator used as field=field+1 in insert on duplicate key update	
						value_list += "?, ";
						if(value[0] == '-')
							insertValueArr.push(0);
						else if(value[0] == '+')
							insertValueArr.push(1);
					}
				} else {						
					if(bmgeneric.trim(value) == global.CURDATETIME)
					{
						value_list += "NOW(), ";
					} else if(bmgeneric.trim(value) == global.CURDATE)
					{
						value_list += "CURDATE(), ";
					} else if(bmgeneric.trim(value) == global.CURRTIMESTAMP)
					{
						value_list += "UNIX_TIMESTAMP(NOW()), ";
					} else {
						value_list += "?, ";
						insertValueArr.push(value);
					}
				}
				
				if(insertType == 3 && ! bmgeneric.in_array(field,primaryKeyFields))	//Only for INSERT ON DUPLICATE KEY UPDATE
				{					
					if(bmgeneric.is_array(value))
					{
						//TO handle insert on duplicate key like field = field+1 OR field = field-1 OR CONCAT(field, '~3')
						if(bmgeneric.strtoupper(value[0]) == global.CONCATWS)
						{
							u_query += field+"= CONCAT_WS('"+value[2]+"',"+field+",'"+value[1]+"'), ";
						}
						else if(bmgeneric.strtoupper(value[0]) == global.CONCAT)
						{
							u_query += field+"= CONCAT("+field+",'"+value[1]+"'), ";
						}
						else if(value[0] == global.AESENC)
						{
							u_query += field+"= AES_ENCRYPT('"+bmgeneric.trim(value[1])+"','"+bmgeneric.trim(value[2])+"'), ";
						}
						else if(value[0] == global.AESDEC)
						{							
							u_query += field+"= AES_DECRYPT('"+bmgeneric.trim(value[1])+"','"+bmgeneric.trim(value[2])+"'), ";
						}
						else if(value[0] == global.DATEADD || value[0] == global.DATESUB)
						{		
							keyWordDate = (value[0] == GLOBALS['DATEADD'])?"DATE_ADD":"DATE_SUB";
							u_query += field+" = "+keyWordDate+"("+bmgeneric.trim(value[1])+","+bmgeneric.trim(value[2])+"), ";
							updateValueArr.push(value[3]);
						} else {
							if(value[0] == '-')						
								u_query += field+"= IF("+field+" > "+value[1]+","+field+value[0]+value[1]+",0)"+", ";
							else if(value[0] == '+')
								u_query += field+"="+field+value[0]+value[1]+", ";
						}
					} else {
						if(bmgeneric.trim(value) == global.CURDATETIME)
						{
							u_query += field+"= NOW(), ";
						}
						else if(bmgeneric.trim(value) == global.CURDATE)
						{
							u_query += field+"= CURDATE(), ";
						}
						else if(bmgeneric.trim(value) == global.CURRTIMESTAMP)
						{
							u_query += field+"= UNIX_TIMESTAMP(NOW()), ";
						} else {
							u_query += field+" = ?, ";
							updateValueArr.push(value);
						}
					}					
				}				
				feock(null);				
			},function(err){
				async.parallel({
					CKINQUERY : function(callback){
						bmSphinxRtDb.chkForSqlInjection(insertValueArr, function(err,ipBindArr){
							if(ipBindArr === true)
								callback(err,insertValueArr);
							else
								callback({ERROR:"INVALID_WHERECLAUSE_ARR"},[]);
						});
					},
					CKUPQUERY : function(callback){
						if(insertType == 3 && !bmgeneric.empty(updateValueArr)) {
							bmSphinxRtDb.chkForSqlInjection(updateValueArr, function(err,ipBindArr){
								if(ipBindArr === true)
									callback(err,updateValueArr);
								else
									callback({ERROR:"INVALID_WHERECLAUSE_ARR"},[]);
							});
						} else {
							callback(null,[]);
						}
					},
					FROMQUERY : function(callback){
						bmSphinxRtDb.execQueryIn(tableName,field_list,value_list,u_query,insertType, function(err,execQuery){
							callback(err,execQuery);
						});					
					}
				},function(err,preQuery){
					if(!err) {
						if(!bmgeneric.empty(preQuery.CKINQUERY) ){
							var bindDataValue = preQuery.CKINQUERY.concat(preQuery.CKUPQUERY);
							bmSphinxRtDb.bmPreparedQuery(preQuery.FROMQUERY,bindDataValue,function(err,query){
								bmSphinxRtDb.mysqli_query(SPHINXQLRTCONN,query,preQuery.FROMQUERY,insertValueArr,"INSERT",function(err,insetdata){
									var InsertData = {};
									if(!err){
										if(returnType ==2)
											InsertData = insetdata.insertId;	
										else
											InsertData = insetdata.affectedRows;
									}									
									next(err,InsertData); 
								});
							 });
						}else {
							next(err,false); 
						}
					} else {
						next(err,false); 
					}
				});
			});	
		}
	}		
		
	// function to update the table with passed array value with where condition //
	exports.bmDbUpdate = function(dbhost,dbName,tableName,updateData,whereClause,whereValueArr,next)
	{
		var start = bmgeneric.UnixTimeStamp();
		var writeTxtFile = "";
		writeTxtFile += "\nInside Update Qry "+bmgeneric.getDate("HH:MM:ss");		
		if(bmgeneric.trim(whereClause) == "" || bmgeneric.stripos(whereClause," limit") > 0){
			console.error("Mysql Master Err : UPDATE_QRY_WHERE-CLAUSE-ERR__LIMIT-NOT-AVAIL");
			var viewprofileOutput = {};							
			viewprofileOutput['responsecode'] = 2;
			viewprofileOutput['errcode'] = 1;
			viewprofileOutput['Error'] = "UPDATE_QRY_WHERE-CLAUSE-ERR__LIMIT-NOT-AVAIL";
			viewprofileOutput['PARAMETER'] = whereClause;
			return next(viewprofileOutput,{});
		} else if(!bmgeneric.is_array(whereValueArr) && whereValueArr.length == 0)
		{
			console.error("Mysql Master Err : INVALID_WHERECLAUSE_ARR");
			var viewprofileOutput = {};							
			viewprofileOutput['responsecode'] = 2;
			viewprofileOutput['errcode'] = 1;
			viewprofileOutput['Error'] = "INVALID_WHERECLAUSE_ARR";
			viewprofileOutput['PARAMETER'] = whereClause;
			return next(viewprofileOutput,{});
		} else if (bmgeneric.is_array(updateData)){	
			var u_query = "";	
			var ipBindValueArr = [];			
			async.forEachOf(updateData, function (value, field, nextbk) {
				if(bmgeneric.is_array(value))
				{
					//TO handle insert on duplicate key like field = field+1 OR field = field-1 OR CONCAT(field, '~3')
					if(bmgeneric.strtoupper(value[0]) == global.CONCATWS)
					{
						u_query += field+"= CONCAT_WS('"+value[2]+"',"+field+",'"+value[1]+"'), ";
					}
					else if(bmgeneric.strtoupper(value[0]) == global.CONCAT)
					{
						u_query += field+"= CONCAT("+field+",'"+value[1]+"'), ";
					}
					else if(value[0] == global.AESENC)
					{
						u_query += field+"= AES_ENCRYPT('"+bmgeneric.trim(value[1])+"','"+bmgeneric.trim(value[2])+"'), ";
					}
					else if(value[0] == global.AESDEC)
					{							
						u_query += field+"= AES_DECRYPT('"+bmgeneric.trim(value[1])+"','"+bmgeneric.trim(value[2])+"'), ";
					}
					else if(value[0] == global.DATEADD || value[0] == global.DATESUB)
					{		
						keyWordDate = (value[0] == GLOBALS['DATEADD'])?"DATE_ADD":"DATE_SUB";
						u_query += field+" = "+keyWordDate+"("+bmgeneric.trim(value[1])+","+bmgeneric.trim(value[2])+"), ";
						ipBindValueArr.push(value[3]);
					} else {
						if(value[0] == '-')						
							u_query += field+"= IF("+field+" > "+value[1]+","+field+value[0]+value[1]+",0)"+", ";
						else if(value[0] == '+')
							u_query += field+"="+field+value[0]+value[1]+", ";
					}
				} else {
					if(bmgeneric.trim(value) == global.CURDATETIME)
					{
						u_query += field+"= NOW(), ";
					}
					else if(bmgeneric.trim(value) == global.CURDATE)
					{
						u_query += field+"= CURDATE(), ";
					}
					else if(bmgeneric.trim(value) == global.CURRTIMESTAMP)
					{
						u_query += field+"= UNIX_TIMESTAMP(NOW()), ";
					} else {
						u_query += field+" = ?, ";
						ipBindValueArr.push(value);
					}
				}	
				
				nextbk(null);				
			},function(err){
				async.parallel({
					CHKUPTFILDS : function(callback){
						bmSphinxRtDb.chkForSqlInjection(ipBindValueArr, function(err,ipBindArr){
							if(ipBindArr === true)
								callback(err,ipBindValueArr);
							else
								callback({ERROR:"INVALID_WHERECLAUSE_ARR"},[]);
						});
					},
					CHKSELFILDS : function(callback){						
						bmSphinxRtDb.chkForSqlInjection(whereValueArr, function(err,ipBindArr){
							if(ipBindArr === true)
								callback(err,whereValueArr);
							else
								callback({ERROR:"INVALID_WHERECLAUSE_ARR"},[]);
						});
					}
				},function(err,preQuery){
					if(!err) {
						var execQuery = "UPDATE "+dbName+"."+tableName+" SET "+bmgeneric.rtrim(u_query,', ')+" WHERE "+whereClause;
						if(!bmgeneric.empty(preQuery.CHKUPTFILDS)){
							var bindDataValue = preQuery.CHKUPTFILDS.concat(preQuery.CHKSELFILDS);
							bmSphinxRtDb.bmPreparedQuery(execQuery,bindDataValue,function(err,query){
								bmSphinxRtDb.mysqli_query(global.MysqlMaster[dbhost.DBHOST],query,execQuery,ipBindValueArr,"UPDATE",function(err,UpData){
									next(err,UpData); 
								});
							 });
						}else {
							next(err,false); 
						}
					} else {
						next(err,false); 
					}
				});
			});
		}
	}
	
	//DELETE QUERY EXECUTE METHOD //
	exports.bmDbDelete = function(dbhost, dbName, tableName, whereClause, whereValueArr,next)
	{
		var start = bmgeneric.UnixTimeStamp();
		var writeTxtFile = "\nInside Delete Qry "+bmgeneric.getDate("HH:MM:ss");
		if(bmgeneric.trim(whereClause) == "" || bmgeneric.stripos(whereClause," limit") > 0){
			console.error("Mysql Master Err : DEL_QRY_WHERE-CLAUSE-ERR__LIMIT-AVAIL");
			var viewprofileOutput = {};							
			viewprofileOutput['responsecode'] = 2;
			viewprofileOutput['errcode'] = 1;
			viewprofileOutput['Error'] = "DEL_QRY_WHERE-CLAUSE-ERR__LIMIT-AVAIL";
			viewprofileOutput['PARAMETER'] = whereClause;
			return next(viewprofileOutput,{});
		} else if(!bmgeneric.is_array(whereValueArr) && whereValueArr.length == 0)
		{
			console.error("Mysql Master Err : INVALID_WHERECLAUSE_ARR");
			var viewprofileOutput = {};							
			viewprofileOutput['responsecode'] = 2;
			viewprofileOutput['errcode'] = 1;
			viewprofileOutput['Error'] = "INVALID_WHERECLAUSE_ARR";
			viewprofileOutput['PARAMETER'] = whereClause;
			return next(viewprofileOutput,{});
		} else if (bmgeneric.trim(whereClause) != ""){
			if(((bmgeneric.substr_count(tableName, 'viewedmyprofilestats') != 1) && (bmgeneric.substr_count(tableName, 'astrologyrequestinfo') != 1) && (bmgeneric.substr_count(tableName, 'unvalidaterequestinfo') != 1) && (bmgeneric.substr_count(tableName, 'requestinfopending') != 1)) && ((bmgeneric.substr_count(tableName, 'profilenotes') > 0) || (bmgeneric.substr_count(tableName, 'profilestats') >0 ) || (bmgeneric.substr_count(tableName, 'sentlog') > 0) || (bmgeneric.substr_count(tableName, 'receivelog') > 0)|| (bmgeneric.substr_count(tableName, 'sentinterest') > 0) || (bmgeneric.substr_count(tableName, 'receiveinterest') > 0) || (bmgeneric.substr_count(tableName, 'requestinfo') > 0))){
				var now = new Date();	
				var message = "From: Mysqli; File Name: "+__filename+"; <br> Query Type : Delete <br> Table Name: "+tableName+" <br> Mem ID : "+whereValueArr+"; <br>Time : "+dateFormat(now, "d-M-Y H:i:s")+"\n"+process.env+"\n";
				bmSphinxRtDb.bmSphinxLogError("DeleteQry-M",message,1,function(err,wrcallback){});
			}
			
			bmSphinxRtDb.chkForSqlInjection(whereValueArr, function(err,ipBindArr){
				if(ipBindArr === false){
					var viewprofileOutput = {};							
					viewprofileOutput['responsecode'] = 2;
					viewprofileOutput['errcode'] = 1;
					viewprofileOutput['Error'] = "INVALID_WHERECLAUSE_ARR";
					viewprofileOutput['PARAMETER'] = whereClause;
					next(viewprofileOutput,{});
					return false;
				} else {						
					var execQuery = "DELETE FROM "+dbName+"."+tableName+" WHERE "+whereClause;
					bmSphinxRtDb.bmPreparedQuery(execQuery,whereValueArr,function(err,query){
						bmSphinxRtDb.mysqli_query(global.MysqlMaster[dbhost.DBHOST],query,execQuery,whereValueArr,"DELETE",function(err,InData){
							return next(err,InData); 
						});
					});
				}
			});
		}
	}
	
	exports.mysql_real_escape_string = function(str) {
		return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
			switch (char) {
				case "\0":
					return "\\0";
				case "\x08":
					return "\\b";
				case "\x09":
					return "\\t";
				case "\x1a":
					return "\\z";
				case "\n":
					return "\\n";
				case "\r":
					return "\\r";
				case "\"":
				case "'":
				case "\\":
				case "%":
					return "\\"+char; // prepends a backslash to backslash, percent,
									  // and double/single quotes
			}
		});
	}
	
	exports.chkForSqlInjection = function(chkValue, next){
		var ValCheck = true;
		for (let patVal of global.sqlPatternArr) {
			for (let chkVal of chkValue) {
				if(bmgeneric.stripos(chkValue, patVal) > 0){
					ValCheck = false;
				} 
			}	
		}		
		return next(null,ValCheck);
	}
	
	exports.bmPreparedQuery = function(sql,params,next){
		var paramCount = bmgeneric.count(params);
		var sqlQuery = bmgeneric.str_replace("%", "#~#", sql);
		for (i=0; i < paramCount; i++) {		
			if(params[i] !='' && bmgeneric.is_array(params[i]))
			{
				if(params[i][1] !='' && typeof params[i][1] ==='string'){					
					params[i] = mysql.escape(bmgeneric.trim(params[i][1]));
						
				}else{
					params[i] = params[i][1];
				}
			} else if(params[i] !='' && typeof params[i] ==='string'){
				params[i] = mysql.escape(params[i]);			
			} 
			sqlQuery = bmgeneric.str_replace('?','%s',sqlQuery);
		}
		var output = vsprintf(sqlQuery, params);
		return next(null,bmgeneric.str_replace("#~#", "%", output));
	}
	
	exports.execQueryIn = function(tableName,fieldlist,valuelist,u_query,insertType,next){
		var field_list = bmgeneric.rtrim(fieldlist,", ");
		var value_list = bmgeneric.rtrim(valuelist,", ");
		if(insertType == 4) {
			var execQuery = "REPLACE INTO "+tableName+"("+field_list+") VALUES ("+value_list+")";
		}else if(insertType == 3) {
			var $u_query = bmgeneric.rtrim(u_query,", ");
			var execQuery = "INSERT INTO "+tableName+"("+field_list+") VALUES ("+value_list+") ON DUPLICATE KEY UPDATE "+$u_query;
		} else if (insertType == 2){
			var execQuery = "INSERT IGNORE INTO "+tableName+"("+field_list+") VALUES ("+value_list+")";
		} else {
			var execQuery = "INSERT INTO "+tableName+"("+field_list+") VALUES ("+value_list+")";
		}
		return next(null,execQuery);
	}
	
	exports.mysqli_query = function(DBCONNECT,Query,execQuery,bindDataValue,ErrTxt,resolve){
		var start = bmgeneric.UnixTimeStamp();
		var writeTxtFile = "Time :"+start;
		writeTxtFile += "\nInside "+ErrTxt+" Qry "+bmgeneric.getDate("HH:MM:ss");
		if(typeof(DBCONNECT) == "object"){
			DBCONNECT.getConnection(function (err,RTCONNECT) {
				if (err) {
					console.error("SPHINXRT_CONNECTION_ERROR_IN_"+ErrTxt+"_QRY:",err);
					var viewprofileOutput = {};							
					viewprofileOutput['responsecode'] = 2;
					viewprofileOutput['errcode'] = 1;
					viewprofileOutput['Error'] = "SPHINXRT_CONNECTION_ERROR_ERR_IN_"+ErrTxt+"_QRY";
					viewprofileOutput['PARAMETER'] = Query;
					resolve(err, viewprofileOutput);
					writeTxtFile += "; \nExecQry : "+bindDataValue;
					writeTxtFile += "; \nQry : "+Query;
					writeTxtFile += "; \nDb Host : "+DBCONNECT.config.host;
					writeTxtFile += "; \nDb SPHINXRT_CONNECTION_ERROR_ERR_IN_"+ErrTxt+"_QRY :"+err;
					writeTxtFile += "\n=====================================================";
					bmSphinxRtDb.bmSphinxLogError(ErrTxt+"Qry-RT-ERR",writeTxtFile,1,function(err,rtlogger){});
					return;
				}
				RTCONNECT.query(Query,bindDataValue, function(err, rows) {
					RTCONNECT.release();
					if (err) {
						console.log("SPHINXRT_CONNECTION_ERROR_OR_"+ErrTxt+"_QRY_ERR:",err.code);
						var viewprofileOutput = {};							
						viewprofileOutput['responsecode'] = 2;
						viewprofileOutput['errcode'] = 1;
						viewprofileOutput['Error'] = "SPHINXRT_CONNECTION_ERROR_OR_"+ErrTxt+"_QRY_ERR";
						viewprofileOutput['PARAMETER'] = Query;
						resolve(err, viewprofileOutput);
						writeTxtFile += "; \nExecQry : "+bindDataValue;
						writeTxtFile += "; \nQry : "+Query;
						writeTxtFile += "; \nDb Host : "+RTCONNECT.config.host;
						writeTxtFile += "; \nDb SPHINXRT_CONNECTION_ERROR_OR_"+ErrTxt+"_QRY_ERR :"+err;
						writeTxtFile += "\n=====================================================";
						bmSphinxRtDb.bmSphinxLogError(ErrTxt+"Qry-RT-ERR",writeTxtFile,1,function(err,rtlogger){});
						return;
					} 
					
					var end = bmgeneric.UnixTimeStamp();
					resolve(null, rows);
					/****For SELECT query log delay ****/
					if(end - start > 12){
						writeTxtFile += "; After Execute "+bmgeneric.getDate("HH:MM:ss");
						writeTxtFile += "; \nExecQry : "+bindDataValue;
						writeTxtFile += "; \nQry : "+Query;						
						writeTxtFile += "; \nDb Host : "+RTCONNECT.config.host;
						writeTxtFile += "\n=====================================================";
						bmSphinxRtDb.bmSphinxLogError(ErrTxt+"Qry-RT_SlowQuert",writeTxtFile,1,function(err,rtlogger){});
					}	
				});
			});
		} else {
			var err = "SPHINXRT_UNABLE_TO_PING_ERR_IN_"+ErrTxt+"_QRY:undefined";
			console.error(err);
			var viewprofileOutput = {};							
			viewprofileOutput['responsecode'] = 0;
			viewprofileOutput['errcode'] = 1;
			viewprofileOutput['Error'] = err;
			viewprofileOutput['PARAMETER'] = execQuery;
			resolve(viewprofileOutput, {});
			writeTxtFile += "; \nExecQry : "+execQuery;
			writeTxtFile += "; \nQry : "+query;
			writeTxtFile += "; \nDb Host : undefined";
			writeTxtFile += "\n=====================================================";
			bmSphinxRtDb.bmSphinxLogError(ErrTxt+"Qry-RT-ERR",writeTxtFile,1,function(err,rtlogger){});
		}
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