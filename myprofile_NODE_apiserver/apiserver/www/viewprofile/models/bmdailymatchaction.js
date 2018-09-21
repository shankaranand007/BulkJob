/*************************************************************************************************************************
File	: bmdailymatchAction.php
Author	: Sathrak Paldurai k
Date	: 05-04-2014
Description	: To Store the User Access In redis
************************************************************************************************************************/

	/***********************************************************************************
	| Function		: executeDaily6RedisUpdate
	| Parameters	: LoggedInMatriId,PartnerMatriId,d6Action,OutputType
	| Description	: Updates the redis value for Daily6 
	| Returns		: ERRORCODE and RESPONSECODE
	***********************************************************************************/
	function executeDaily6RedisUpdate(MatriId,pMatriId,d6Action,callback)
	{
		/* Action  types: 
		1-express inst,
		11-sendmail,	
		2-maybe,shortlist
		3-ignore,notnow */			
		var response={};
		var d6RedisValueArr = {};
		var d6RedisKey = "daily6-"+MatriId;		
		
		/*var d6RedisValueReArr =  [[ 'M3089066', '3', 'M' ],["M2101090",0,"M"],["M109929",0,"M"]];		
		// Redis Update
		var getRemainTime = getRemainingTimeInSeconds();
		var d6RedisValueSerArr = bmgeneric.serialize(d6RedisValueReArr);
		console.log("d6RedisValueSerArr :",d6RedisValueSerArr);
		d6RedisM = new bmClredis();	
		d6RedisValueNewSet = d6RedisM.Redis_Set("daily6-M222",d6RedisValueSerArr,'M',getRemainTime);
		console.log("d6RedisValueNewSet :",d6RedisValueNewSet);
		d6RedisM.Redis_DeleteKey("daily6-M222",'M',function(err,d6RedisValue){
			
		});		
		response['RESPONSECODE'] = 2;
		response['ERRCODE'] = 2; // Input Error
		return callback (null,response);
		*/	
		
		d6Redis = new bmClredis();
		d6Redis.Redis_Get(d6RedisKey,1,'S',function(err,d6RedisValue){			
			var d6RedisValueArr = bmgeneric.unserialize(d6RedisValue);			
			if(bmgeneric.count(d6RedisValueArr) > 0 ){	
				if(!bmgeneric.empty(d6RedisValueArr[0])){
					var d6RedisValueReArr = d6RedisValueArr;
					var modfiyStatus = false;					
					for (var inrd = 0; inrd < d6RedisValueReArr.length; inrd++) {
						if(pMatriId == d6RedisValueReArr[inrd][0]){
							d6RedisValueReArr[inrd][1] = d6Action;
							modfiyStatus = true;
							break;
						}
					}	
					
					if(modfiyStatus){						
						// Redis Update
						var getRemainTime = getRemainingTimeInSeconds();
						var d6RedisValueSerArr = bmgeneric.serialize(d6RedisValueReArr);
						d6RedisM = new bmClredis();	
						var d6RedisKey = "daily6-"+MatriId;	
						d6RedisM.Redis_Set(d6RedisKey,d6RedisValueSerArr,'M',getRemainTime);
						// DB Update
						daliy6DBupdate(MatriId,pMatriId,d6Action,function(err,updateDb){
							if(err){
								response['RESPONSECODE'] = 2;
								response['ERRCODE'] = 2;
								return callback (null,response);
							} else {
								// Response on success
								response['RESPONSECODE'] = 1;
								response['ERRCODE'] = 0;
								return callback (null,response);
							}
						});
					}else{		
						response['RESPONSECODE'] = 2;
						response['ERRCODE'] = 2;
						return callback (null,response);
					}					
				} else{		
					response['RESPONSECODE'] = 2;
					response['ERRCODE'] = 2;
					return callback (null,response);
				}
			} else{
				response['RESPONSECODE'] = 2;
				response['ERRCODE'] = 2; // Input Error
				return callback (null,response);
			}
		}); 
	}

	/***********************************************************************************
	| Function		: getRemainingTimeInSeconds
	| Description	: To get the remaining time for setting the redis expiry time. This 
					  function is used inside the executeDaily6RedisUpdate()
	***********************************************************************************/
	function getRemainingTimeInSeconds()
	{
		next_day = dateFormat(strtotime('+1day'),"yyyy-mm-dd");
		next_daytime=next_day+" 00:00:00"; 

		startdate = dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss");
		enddate = next_daytime;

		diff = strtotime(enddate)-strtotime(startdate);

		temp=diff/86400; // 60 sec/min*60 min/hr*24 hr/day=86400 sec/day

		// days
		days=Math.floor(temp); 
		temp=24*(temp-days);
		// hours
		hours=Math.floor(temp); 
		temp=60*(temp-hours);
		// minutes
		minutes=Math.floor(temp);
		temp=60*(temp-minutes);
		// seconds
		seconds=Math.floor(temp);

		remainingTimeInSeconds = (hours * 3600 ) + (minutes * 60) + (seconds);

		if(remainingTimeInSeconds > 0)
		{
			return remainingTimeInSeconds;
		}else{
			return "";
		}
	}

	/***********************************************************************************
	| Function		: daliy6DBupdate
	| Description	: To update the actions in the member_daily6 table in DB. This 
					  function is used inside the executeDaily6RedisUpdate()
	***********************************************************************************/
	function daliy6DBupdate(MatriId,d6MemID,d6Action,next){		
		var iddomain = bmgeneric.getDomainInfo(1,MatriId);
		var domain_s = bmgeneric.strtoupper(iddomain['domainnameshort']);
		var selectfields = "MatriId";
		var WhereClause = "MatriId = ? and OppositeMatriId = ?";
		var WhereValues = [MatriId,d6MemID];
		var dbHost = bmDb.bmDbConnById(3,iddomain['domainnameshort'],'S');
		var CONFVAR = bmDb.bmDbConnById(3,iddomain['domainnameshort'], 'M');	
		var qurycmt = "# Dail6 select "+DOMAINTABLE[domain_s]+"DAILY6MEMACTION table #";
		bmDb.bmDbSelect(dbHost,DBNAME['MATRIMONY'], DOMAINTABLE[domain_s]['DAILY6MEMACTION'],selectfields,WhereClause,WhereValues,qurycmt,function(err,selectaffectedrows){
			if(!err){				
				if(bmgeneric.count(selectaffectedrows)>0)
				{
					var Updatedata = {'ActionStatus':d6Action, "DateUpdated" : global.CURDATETIME};
					var whereClause = 'MatriId = ? and OppositeMatriId = ?';
					var whereClauseVal = [MatriId, d6MemID];
					bmDb.bmDbUpdate(CONFVAR,DBNAME['MATRIMONY'],DOMAINTABLE[domain_s]['DAILY6MEMACTION'],Updatedata,whereClause,whereClauseVal,function(err,update){
						if(err)console.error("Function Name - daliy6DBupdate err at :",err);
						//console.error("Function Name - daliy6DBupdate err at :",update);
					});
				}else{
					bmDb.bmDbInsert(CONFVAR,DBNAME['MATRIMONY'], DOMAINTABLE[domain_s]['DAILY6MEMACTION'], {"MatriId" : MatriId,"OppositeMatriId": d6MemID, "ActionStatus": d6Action, "DateUpdated" : global.CURDATETIME}, 3, 1, function(err,insert){
						if(err)console.error("Function Name - daliy6DBinserted err at :",err);
						//console.error("Function Name - daliy6DBinserted err at :",insert);
					});
				}				
				return next(err,selectaffectedrows);
			} else {
				return next(err,'');
			}		
		});
	}
	exports.getRemainingTimeInSeconds = getRemainingTimeInSeconds;
	exports.executeDaily6RedisUpdate = executeDaily6RedisUpdate;