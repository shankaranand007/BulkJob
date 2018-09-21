/**********************************************************************************************
File    : bmmysqlslave.js
Author  : Sathrak Paldurai k
Date    : 15-May-2017
************************************************************************************************
Description: This inc file have mysql class and functions.
***********************************************************************************************/
	
	global.sqlPatternArr = [" UNION ALL "," INTO OUTFILE "," LOAD_FILE "," INFORMATION_SCHEMA "," SHOW TABLES "," SHOW DATABASES "," CHAR("," @@VERSION"," -999.9"," -9.9"," x=x"," x=y"," WAITFOR DELAY"," hex(","(1=1"," 1=1"];
	
	global.MRGEMYSQLMSCON = {};
	/* Create Mysql Slave Connection Function*/
	MergeMSConn = function (mysqlkey,mysqlip){		
		//- Destroy the current connection variable
		if(MRGEMYSQLMSCON[mysqlkey]) 
			MRGEMYSQLMSCON[mysqlkey].destroy();
		
		//- Create the connection variable
		MRGEMYSQLMSCON[mysqlkey] = mysql.createConnection({
			host     : mysqlip,
			user     : 'newjourney',
			password : 'matri10yrs',
			multipleStatements: true,
			connectTimeout:dbconfig.dbConTimeOut 
		});
		
		//- Establish a new connection
		MRGEMYSQLMSCON[mysqlkey].connect(function(err){
			if(!err) {
				console.log("Mysql Database Slave is connected ...",mysqlip);   
			} else {
				MergeMSConn(mysqlkey,mysqlip);
			}
		});
		
		//- Mysql Error listener
		MRGEMYSQLMSCON[mysqlkey].on('error', function(err) {
			//- The server close the connection.
			if(err.code === "PROTOCOL_CONNECTION_LOST"){    
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
				MergeMSConn(mysqlkey,mysqlip);  
			}

			//- Connection in closing
			else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
				MergeMSConn(mysqlkey,mysqlip);  
			}

			//- Fatal error : connection variable must be recreated
			else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			   MergeMSConn(mysqlkey,mysqlip);  
			}

			//- Error because a connection is already being established
			else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
				console.error("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			}
			//- Anything else
			else{
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			   MergeMSConn(mysqlkey,mysqlip);  
			}			
		});
	}	
		
	/* Create Mysql Slave Connection Function*/
	MysqlLatestConn = function (mysqlkey,mysqlip){
		//- Destroy the current connection variable
		if(MRGEMYSQLMSCON[mysqlkey]) 
			MRGEMYSQLMSCON[mysqlkey].destroy();
		
		//- Create the connection variable
		MRGEMYSQLMSCON[mysqlkey] = mysql.createConnection({
			host     : mysqlip,
			user     : 'usr_frm_ndlu',
			password : 'kwhenim7',
			multipleStatements: true,
			connectTimeout:dbconfig.dbConTimeOut 
		});
		
		//- Establish a new connection
		MRGEMYSQLMSCON[mysqlkey].connect(function(err){
			if(!err) {
				console.log("Mysql Database Slave is connected ...",mysqlip);   
			} else {				
				MysqlLatestConn(mysqlkey,mysqlip);
			}
		});
		
		//- Mysql Error listener
		MRGEMYSQLMSCON[mysqlkey].on('error', function(err) {
			//- The server close the connection.
			if(err.code === "PROTOCOL_CONNECTION_LOST"){    
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
				MysqlLatestConn(mysqlkey,mysqlip);  
			}
			//- Connection in closing
			else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
				MysqlLatestConn(mysqlkey,mysqlip);  
			}
			//- Fatal error : connection variable must be recreated
			else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			   MysqlLatestConn(mysqlkey,mysqlip);  
			}
			//- Error because a connection is already being established
			else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
				console.error("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			}
			//- Anything else
			else{
				//console.log("/!\\ Cannot establish a connection with the database. /!\\ ("+err.code+")");
			   MysqlLatestConn(mysqlkey,mysqlip);  
			}			
		});
	}
		
	async.eachOfSeries(MASTERSLAVEIP,function(mysqlip, mysqlkey, next){
		MergeMSConn(mysqlkey,mysqlip);
		next(null);
	},function(err){
		if(err){
			console.error("MergeMSConn at -Error :",err);
		}
	});	
	
	async.eachOfSeries(LATESTUPDATEIP,function(mysqlip, mysqlkey, next){
		MysqlLatestConn(mysqlkey,mysqlip);
		next(null);
	},function(err){
		if(err){
			console.error("MergeMSConn at -Error :",err);
		}
	});	
		
	// create mysql connection //
	exports.bmDbConnById = function(type='',value='',dbtype='') {
		if (type=='' || value=='' || dbtype=='') {
			var dbOutput = {};
			dbOutput['DBHOST'] ='';
			dbOutput['ERROR'] = "INVALID_CONNECTION_PARAMETERS - bmDbConnById";
			return dbOutput;
		} else{
			var dotrval = bmgeneric.trim(value);
			if (type==1) { // if type=1 assumption value params input as domain id eg. 3
				var domainid = dotrval;
			} else if (type==2) { // if type=2 assumption value params input as matriid eg. M123456
				var get_first_letter = bmgeneric.ucwords(bmgeneric.substr(dotrval,0,1));
				var domainid = bmgeneric.trim(bmgeneric.array_search(get_first_letter, global.IDSTARTLETTERHASH));
			} else if (type==3) { // if type=3 assumption value params input as language name eg. tamil
				var value = bmgeneric.lcwords(dotrval);
				if (value=='bharat') {
					var domainid = 5;
				} else {
					var domainid = bmgeneric.trim(bmgeneric.array_search(value, global.DOMAINID));
				}
			} 
			
			if (dbtype == 'MM') {
				var db1var = 'DB1_MERGEMASTER';
				var db2var = 'DB2_MERGEMASTER';
				var db3var = 'DB4_MERGEMASTER';
				var db4var = 'DB10_MERGEMASTER';
			} else if (dbtype == 'M') {
				var db1var = 'DB1_MASTER';
				var db2var = 'DB2_MASTER';
				var db3var = 'DB4_MASTER';
				var db4var = 'DB10_MASTER';
			} else if (dbtype ==  'S') {
				var db1var = 'DB1_SLAVE';
				var db2var = 'DB2_SLAVE';
				var db3var = 'DB4_SLAVE';
				var db4var = 'DB10_SLAVE';
			} else if (dbtype == 'O') {
				var db1var = 'DB1';
				var db2var = 'DB2';
				var db3var = 'DB4';
				var db4var = 'DB10';
			}
			var dbOutput ={};
			if (bmgeneric.in_array(domainid,global.LANGGROUP1)) {
				//BM DB4 Server / Group1 Connection details... 
				dbOutput ={DBHOST:db3var};
			} else if (bmgeneric.in_array(domainid,global.LANGGROUP2)) {
				//BM DB1 Server / Group2 Connection details...
				dbOutput ={DBHOST:db1var};
			} else if (bmgeneric.in_array(domainid,global.LANGGROUP3)) {
				//BM DB2 Server / Group3 Connection details...
				dbOutput ={DBHOST:db2var};				
			} else if (bmgeneric.in_array(domainid,global.LANGGROUP4)) {
				//BM DB10 Server / Group4 Connection details...
				dbOutput ={DBHOST:db4var};
			}			
			return dbOutput;
		}
	}	
		
	//Mysql Select Query Function	
	exports.bmDbSelect = function(conSelt, dbName, tableName, selectFields, whereClause, whereValueArr, next){
		var start = bmgeneric.UnixTimeStamp();
		var wherecl = bmgeneric.ucwords(whereClause);
		if(wherecl.indexOf("HAVING") > 0){
			var execQuery  = "SELECT "+selectFields+ " FROM "+dbName+"."+tableName+" "+whereClause;
		} else {
			var execQuery  = "SELECT "+selectFields+ " FROM "+dbName+"."+tableName+" WHERE "+whereClause;
		}
		
		var Query  = execQuery + whereValueArr;		
		if(whereClause != '' && selectFields != '' && tableName != '' && dbName !=''){
			bmMergeMSdb.mysqli_query(conSelt.DBHOST,execQuery,Query,whereValueArr,"SELECT",function(err,rows){
				var end = bmgeneric.UnixTimeStamp();
				console.error("BM MMSLAVE Select Query Time :" + (end-start));
				return next(err,rows); 
			});
		} else {
			console.error("SELECT_QRY_WHERE-CLAUSE-ERR__DB-TBL-ERR__SELECT-FIELD-NOTARRAY");
			var viewprofileOutput = {};							
			viewprofileOutput['responsecode'] = 2;
			viewprofileOutput['errcode'] = 1;
			viewprofileOutput['Error'] = "SELECT_QRY_WHERE-CLAUSE-ERR__DB-TBL-ERR__SELECT-FIELD-NOTARRAY";
			viewprofileOutput['PARAMETER'] = Query;	
			return next(viewprofileOutput,{});
		}
	}
		
	// function to insert the array values to the table //25038395//$insertData, $insertType = 1
	exports.bmDbInsert = function(dbhost, dbName, tableName, insertData, insertType=1, primaryKeyFields={}, next) {
		var start = bmgeneric.UnixTimeStamp();
		var writeTxtFile = "";
		writeTxtFile += "\nInside INSERT Qry "+bmgeneric.getDate("HH:MM:ss");
		var field_list = value_list = u_query = updateFieldValue = "";
		var insertValueArr =[]; var updateValueArr = [];
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
						bmMergeMSdb.chkForSqlInjection(insertValueArr, function(err,ipBindArr){
							if(ipBindArr === true)
								callback(err,insertValueArr);
							else
								callback({ERROR:"INVALID_WHERECLAUSE_ARR"},[]);
						});
					},
					CKUPQUERY : function(callback){
						if(insertType == 3 && !bmgeneric.empty(updateValueArr)) {
							bmMergeMSdb.chkForSqlInjection(updateValueArr, function(err,ipBindArr){
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
						bmMergeMSdb.execQueryIn(dbName,tableName,field_list,value_list,u_query,insertType, function(err,execQuery){
							callback(err,execQuery);
						});					
					}
				},function(err,preQuery){
					if(!err) {
						if(!bmgeneric.empty(preQuery.CKINQUERY) ){
							var bindDataValue = preQuery.CKINQUERY.concat(preQuery.CKUPQUERY);
							bmMergeMSdb.bmPreparedQuery(preQuery.FROMQUERY,bindDataValue,function(err,query){
								bmMergeMSdb.mysqli_query(dbhost.DBHOST,query,preQuery.FROMQUERY,insertValueArr,"INSERT",function(err,InData){
									next(err,InData); 
								});
							});
						}else {
							next(err,{}); 
						}
					} else {
						next(err,{}); 
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
						bmMergeMSdb.chkForSqlInjection(ipBindValueArr, function(err,ipBindArr){
							if(ipBindArr === true)
								callback(err,ipBindValueArr);
							else
								callback({ERROR:"INVALID_WHERECLAUSE_ARR"},[]);
						});
					},
					CHKSELFILDS : function(callback){						
						bmMergeMSdb.chkForSqlInjection(whereValueArr, function(err,ipBindArr){
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
							bmMergeMSdb.bmPreparedQuery(execQuery,bindDataValue,function(err,query){
								bmMergeMSdb.mysqli_query(dbhost.DBHOST,query,execQuery,ipBindValueArr,"UPDATE",function(err,UpData){
									next(err,UpData); 
								});
							 });
						}else {
							next(err,{}); 
						}
					} else {
						next(err,{}); 
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
				var message = "From: Mysqli; File Name: "+__filename+"; <br> Query Type : Delete <br> Table Name: "+tableName+" <br> Mem ID : "+whereValueArr+"; <br>Time : "+dateFormat(now, "yyyy-mm-dd HH:MM:ss")+"\n"+process.env+"\n";
				bmMergeMSdb.bmDbLogError("DeleteQry-M",message,1,function(err,wrcallback){});
			}
			
			bmMergeMSdb.chkForSqlInjection(whereValueArr, function(err,ipBindArr){
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
					bmMergeMSdb.bmPreparedQuery(execQuery,whereValueArr,function(err,query){
						bmMergeMSdb.mysqli_query(dbhost.DBHOST,query,execQuery,whereValueArr,"DELETE",function(err,InData){
							return next(err,InData); 
						});
					});
				}
			});
		}
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
	
	exports.execQueryIn = function(dbName,tableName,fieldlist,valuelist,u_query,insertType,next){
		var field_list = bmgeneric.rtrim(fieldlist,", ");
		var value_list = bmgeneric.rtrim(valuelist,", ");
		if(insertType == 3) {
			var $u_query = bmgeneric.rtrim(u_query,", ");
			var execQuery = "INSERT INTO "+dbName+"."+tableName+"("+field_list+") VALUES ("+value_list+") ON DUPLICATE KEY UPDATE "+$u_query;
		} else if (insertType == 2){
			var execQuery = "INSERT IGNORE INTO "+dbName+"."+tableName+"("+field_list+") VALUES ("+value_list+")";
		} else {
			var execQuery = "INSERT INTO "+dbName+"."+tableName+"("+field_list+") VALUES ("+value_list+")";
		}
		return next(null,execQuery);
	}
	
	exports.mysqli_query = function(dbHost,query,execQuery,bindDataValue,ErrTxt,resolve){
		var start = bmgeneric.UnixTimeStamp();
		var writeTxtFile = "Time:"+start;
		writeTxtFile += "\nInside "+ErrTxt+" Qry "+bmgeneric.getDate("HH:MM:ss");
		if(typeof(global.MRGEMYSQLMSCON[dbHost]) == "object"){
			global.MRGEMYSQLMSCON[dbHost].ping(function (err) {
				if (err) {					
					if(dbHost=="MYHOME_LU_SERVER")
						MysqlLatestConn(dbHost,global.MRGEMYSQLMSCON[dbHost].config.host);
					else 
						MergeMSConn(dbHost,global.MRGEMYSQLMSCON[dbHost].config.host);
					
					if(ErrTxt != 'PING'){
						console.error("DB_UNABLE_TO_PING_ERR_IN_"+ErrTxt+"_QRY_ERR:",err.code);
						setTimeout(function() { 
							bmMergeMSdb.mysqli_query(dbHost,query,execQuery,bindDataValue,"PING",function(err,reslt){
								return resolve(err, reslt);
							});
						}, 1000);	
					}else {
						var viewprofileOutput = {};							
						viewprofileOutput['responsecode'] = 2;
						viewprofileOutput['errcode'] = 1;
						viewprofileOutput['Error'] = "DB_UNABLE_TO_PING_ERR_IN_"+ErrTxt+"_QRY";
						viewprofileOutput['PARAMETER'] = query;
						resolve(err, viewprofileOutput);
						writeTxtFile += "; \nExecQry : "+execQuery;
						writeTxtFile += "; \nQry : "+query;
						writeTxtFile += "; \nDb Host : "+global.MRGEMYSQLMSCON[dbHost].config.host;
						writeTxtFile += "; \nDb DB_UNABLE_TO_PING_ERR_IN_"+ErrTxt+"_QRY:"+err;
						writeTxtFile += "\n=====================================================";
						bmMergeMSdb.bmDbLogError(ErrTxt+"Qry-MMS-ERR",writeTxtFile,1,function(err,wrcallback){});
					}	
				}
				global.MRGEMYSQLMSCON[dbHost].query(query,bindDataValue, function(err, rows) {
					if (err) {
						if(err.fatal){
							if(dbHost=="MYHOME_LU_SERVER")
								MysqlLatestConn(dbHost,global.MRGEMYSQLMSCON[dbHost].config.host);
							else 
								MergeMSConn(dbHost,global.MRGEMYSQLMSCON[dbHost].config.host);
							
							if(ErrTxt != 'PING'){
								console.error("DB_UNABLE_TO_PING_ERR_IN_"+ErrTxt+"_QRY_ERR:",err.code);
								setTimeout(function() { 
									bmMergeMSdb.mysqli_query(dbHost,query,execQuery,bindDataValue,"PING",function(err,reslt){
										return resolve(err, reslt);
									});
								}, 1000);	
							}else {								
								var viewprofileOutput = {};							
								viewprofileOutput['responsecode'] = 2;
								viewprofileOutput['errcode'] = 1;
								viewprofileOutput['Error'] = "DB_CONNECTION_ERROR_OR_"+ErrTxt+"_QRY_ERR";
								viewprofileOutput['PARAMETER'] = query;
								resolve(err, viewprofileOutput);
								writeTxtFile += "; \nExecQry : "+execQuery;
								writeTxtFile += "; \nQry : "+query;
								writeTxtFile += "; \nDb Host : "+global.MRGEMYSQLMSCON[dbHost].config.host;
								writeTxtFile += "; \nDb DB_CONNECTION_ERROR_OR_"+ErrTxt+"_QRY_ERR: :"+err;
								writeTxtFile += "\n=====================================================";
								bmMergeMSdb.bmDbLogError(ErrTxt+"Qry-MMS-ERR",writeTxtFile,1,function(err,wrcallback){});
							}
						} else {							
							var viewprofileOutput = {};							
							viewprofileOutput['responsecode'] = 2;
							viewprofileOutput['errcode'] = 1;
							viewprofileOutput['Error'] = "DB_CONNECTION_ERROR_OR_"+ErrTxt+"_QRY_ERR";
							viewprofileOutput['PARAMETER'] = query;
							resolve(err, viewprofileOutput);
							writeTxtFile += "; \nExecQry : "+execQuery;
							writeTxtFile += "; \nQry : "+query;
							writeTxtFile += "; \nDb Host : "+global.MRGEMYSQLMSCON[dbHost].config.host;
							writeTxtFile += "; \nDb DB_CONNECTION_ERROR_OR_"+ErrTxt+"_QRY_ERR: :"+err;
							writeTxtFile += "\n=====================================================";
							bmMergeMSdb.bmDbLogError(ErrTxt+"Qry-MMS-ERR",writeTxtFile,1,function(err,wrcallback){});
						}
					} 	
					var end = bmgeneric.UnixTimeStamp();
					console.log("BM "+ErrTxt+" Query Time :" + (end-start) + " Seconds");
					resolve(null, rows);
					
					/****For SELECT query log delay ****/
					if(end - start > 12){
						writeTxtFile += "; After Execute "+bmgeneric.getDate("HH:MM:ss");
						writeTxtFile += "; \nExecQry : "+execQuery;
						writeTxtFile += "; \nQry : "+query;						
						writeTxtFile += "; \nDb Host : "+global.MRGEMYSQLMSCON[dbHost].config.host;
						writeTxtFile += "\n=====================================================";
						bmMergeMSdb.bmDbLogError(ErrTxt+"Qry-M",writeTxtFile,1,function(err,wrcallback){});
					}
				
				});
			});
		} else {			
			var viewprofileOutput = {};							
			viewprofileOutput['responsecode'] = 0;
			viewprofileOutput['errcode'] = 1;
			viewprofileOutput['PARAMETER'] = execQuery;
			resolve(viewprofileOutput, {});
			writeTxtFile += "; \nExecQry : "+execQuery;
			writeTxtFile += "; \nQry : "+query;
			writeTxtFile += "; \nDb Host : undefined";
			writeTxtFile += "\n=====================================================";
			bmMergeMSdb.bmDbLogError(ErrTxt+"Qry-MMS-ERR",writeTxtFile,1,function(err,wrcallback){});
		}
	}
	
	exports.bmDbLogError = function(queName,writeTxtFile,type,next){
		var selectQrylog = bmgeneric.Log_Filename(queName);
		if(!bmgeneric.empty(selectQrylog)) {
			var filename = "/var/log/apilog/dberrorlog/"+selectQrylog;		
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
		
	