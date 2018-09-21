/******************************************************************************************************
| File Name			: bmInsertController.js
| Author Name		: Sathrak Paldurai k
| Created On		: 24 Aug, 2017
| Description		: Bm Insert and Update fot table and backgruond process
******************************************************************************************************/
	exports.ViewedProfCont = function(req,res){
		var REQUEST = (!bmgeneric.empty(req.body)) ? req.body : req.query;
		var data = preventxss(REQUEST);
		//console.error('VPtrack-Time:'+new Date() +' and VIEWEDID :'+data.VIEWEDID+' LoginId :'+data.ID);	
		if(bmgeneric.empty(data.ID) || bmgeneric.empty(data.VIEWEDID)) {			
			var outputArray = {};
			outputArray['RESPONSECODE'] = 2;
			outputArray['ERRCODE'] = 1;
			return res.send(outputArray);
		}		
		//#Check the Logged In MatriId and Viewer MatriId
		if ((!bmgeneric.is_matriid(data.ID)) || !bmgeneric.is_matriid(data.VIEWEDID)) {
			var outputArray = {};
			outputArray['RESPONSECODE'] = 2;
			outputArray['ERRCODE'] = 1;
			res.send(outputArray);
		} else if(bmgeneric.getEncryptpass(res, data)) {				
			//#Basic Input Valdiation Starts
			if (data.ID != '' && data.VIEWEDID != '' && data.VIEWEDID != data.ID) {
				var StatsTableUpdate = {"MatriId" : data.VIEWEDID, "ViewedByMember" : {0 : "+", 1 : "1"}, "DateUpdated" : global.CURDATETIME};
			} else if (data.VIEWEDID != '' && data.ID == '') {
				var StatsTableUpdate = {"MatriId" : data.VIEWEDID, "ViewedByVisitor" : {0 : "+", 1 : "1"}, "DateUpdated" : global.CURDATETIME};
			}			
			async.parallel({
				STATSINFOINT : function(callback){
					if (StatsTableUpdate != '') { //Insert on Table STATSINFO
						var CONFVAR = bmDb.bmDbConnById(2, data.VIEWEDID, 'M');
						var partDomainList = bmgeneric.getDomainInfo(1, data.VIEWEDID);			
						var pdominname = bmgeneric.strtoupper(partDomainList['domainnameshort']);	
						bmDb.bmDbInsert(CONFVAR,DBNAME['MATRIMONY'],DOMAINTABLE[pdominname]['STATSINFO'], StatsTableUpdate,3,['MatriId'], function(err,intAfted){
							if(!err){
								if (data.ID != '' && data.VIEWEDID != '' && data.VIEWEDID != data.ID && intAfted.affectedRows > 0) {
									//Insert on VIEWHISTORY Table) 						
									var CONFVAR = bmDb.bmDbConnById(2, data.ID, 'M');
									var userDomainList = bmgeneric.getDomainInfo(1, data.ID);
									var udominname = bmgeneric.strtoupper(userDomainList['domainnameshort']);
									var viewHistoryEntry = {"MatriId" : data.VIEWEDID, "ViewerId" : data.ID, "DateViewed" : global.CURDATETIME, "SysSource" : data.APPTYPE};
									bmDb.bmDbInsert(CONFVAR, DBNAME['MATRIMONY'], DOMAINTABLE[udominname]['VIEWHISTORY'], viewHistoryEntry, 1,[], function(err,insertAffected){
										if(!err){
											callback(null,0);	
										} else {
											callback(null,1);	
										}
									});
								} else {
									callback(null,0);	
								}
							} else {
								callback(null,1);	
							}
						});	
					} else {
						callback(null,0);	
					}
				},				
				VIEWSTATSINT : function(callback){					
					//Insert on tamilviewstats Table
					if (data.ID != '' && data.VIEWEDID != '' && data.VIEWEDID != data.ID) {
						var CONFVAR = bmDb.bmDbConnById(2, data.ID, 'M');
						var userDomainList = bmgeneric.getDomainInfo(1, data.ID);
						var udominname = bmgeneric.strtoupper(userDomainList['domainnameshort']);
						var ViewStatsTableUpdate = {"MatriId" : data.ID, "ViewedId" : data.VIEWEDID, "ViewedCnt" : {0 : "+", 1 : "1"}, "LastViewedOn" : global.CURDATETIME};
						bmDb.bmDbInsert(CONFVAR, DBNAME['MATRIMONY'], DOMAINTABLE[udominname]['VIEWSTATS'], ViewStatsTableUpdate, 3,['MatriId'], function(err,affectedrow){
							if(!err){
								callback(null,0);	
							} else {
								callback(null,1);
							}
						});				
					} else {
						callback(null,0);	
					}
				},
				DAILY6UP : function(callback){
					var DAILY6 = (!bmgeneric.empty(data.DAILY6)) ? data.DAILY6 : '';
					if(DAILY6){
						//# present in dailymatchaction.js
						bmdaily6func.executeDaily6RedisUpdate(data.ID,data.VIEWEDID,'3',function(err,redupdat){
							if(!err){								
								callback(null, redupdat);
							} else {
								callback(null,redupdat);
							}		
						}); 
					} else {
						callback(null,true);
					}
				}
			},function(err,Updat){
				var outputArr = {};
				if(Updat.STATSINFOINT != 1 && Updat.VIEWSTATSINT != 1){
					var mkey = data.ID+"-VIEWED";
					bmfuncmemcache.bmfuncupdateMemcache(mkey,data.VIEWEDID,function(err,result){});
					outputArr['RESPONSECODE'] = 1;
					outputArr['ERRORCODE'] = 0;
					outputArr['MESSAGE'] = 'Success';
					res.send(outputArr);
				} else {
					outputArr['RESPONSECODE'] = 2;
					outputArr['ERRORCODE'] = 1;
					outputArr['MESSAGE'] = 'Failed';
					res.send(outputArr);
				}
			});
		}else {
			var outputArr = {};
			outputArr['RESPONSECODE'] = 2;
			outputArr['ERRORCODE'] = 1;
			outputArr['MESSAGE'] = 'Failed';
			res.send(outputArr);
		}
	}
		
	//home/apps/www/appviewprofile/viewedmyprofilestatsinsert.php
	exports.ViewedMyProfSt = function(req,res){
		var REQUEST = (!bmgeneric.empty(req.body)) ? req.body : req.query;
		var data = preventxss(REQUEST);
		bmCommonFunc.ViewedMyProfStatsInst(data, function(err,Instdata){
			var outputArray ={};
			if(!err){
				outputArray['RESPONSECODE'] = 1;
				outputArray['ERRCODE'] = 0;
				outputArray['MESSAGE'] = Instdata;
				res.send(outputArray);
			} else {
				outputArray['RESPONSECODE'] = 1;
				outputArray['ERRCODE'] = 501;				
				res.send(outputArray);
			}			
		});	
	}
	
	//home/profilebharat/bin/InAppnotifyqueue.php
	exports.InAppnotifyqueue = function(req,res){
		var REQUEST = (!bmgeneric.empty(req.body)) ? req.body : req.query;
		var data = preventxss(REQUEST);
		bmCommonFunc.InAppNotifQueFunc(data, function(err,Instdata){
			var outputArray ={};
			if(!err){
				outputArray['RESPONSECODE'] = 1;
				outputArray['ERRCODE'] = 0;
				outputArray['MESSAGE'] = Instdata;
				res.send(outputArray);
			} else {
				outputArray['RESPONSECODE'] = 1;
				outputArray['ERRCODE'] = 501;				
				res.send(outputArray);
			}
		});
	}
	
	// To update the Daily6 action in redis
	exports.AppDaily6Func = function(req,res){		
		var REQUEST = (!bmgeneric.empty(req.body)) ? req.body : req.query;
		var data = preventxss(REQUEST);
		//# present in dailymatchaction.js
		bmdaily6func.executeDaily6RedisUpdate(data.ID,data.VIEWEDID,3,function(err,redupdat){			
			if(err){
				var outputArray ={};
				outputArray['RESPONSECODE'] = 1;
				outputArray['ERRCODE'] = 0;
				res.send(outputArray);
			} else {
				res.send(redupdat);
			}			
		}); 
	}