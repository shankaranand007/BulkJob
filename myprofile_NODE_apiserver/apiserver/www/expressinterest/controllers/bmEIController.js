/******************************************************************************************************
| File Name			: bmInsertController.js
| Author Name		: Sathrak Paldurai k
| Created On		: 24 Aug, 2017
| Description		: Bm Insert and Update fot table and backgruond process
******************************************************************************************************/
	exports.getLatestEIInfo = function(data,res){
		var REQUEST = (!bmgeneric.empty(req.body)) ? req.body : req.query;
		var data = preventxss(REQUEST);
		if(bmgeneric.empty(data.ID) || bmgeneric.empty(data.APPTYPE)) //Check whether given input have any problem
		{
			ErrorCode = ResponseCode = LatestMatriId = 2; //Input error
			
		} else {
			if(!bmgeneric.in_array(data.APPTYPE,bmvars.IOSAPPTYPE) && !bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE) && data.APPTYPE !=107){
				global.SECUREURL = 'https://';
				global.OTHERSECUREURL = 'http://';
			}else{
				global.SECUREURL = 'http://';
				global.OTHERSECUREURL = 'http://';
			}
			var  userDomainList = bmgeneric.getDomainInfo(1, data.ID);
			var appLoginIdDomainId = userDomainList['domainid'];	//1
			EIController.getLatestEIAcpt(data,appLoginIdDomainId,function(err,RequestVal){
				console.log("======LATESTEI========= :",RequestVal);
			});	
		}
		
	}

	exports.getLatestEIAcpt = function(data,appLoginIdDomainId,callback){
		try{
			var FROMVIEWPROFILE = (!bmgeneric.empty(data.FROMVIEWPROFILE)) ? data.FROMVIEWPROFILE : 2;
			//console.log("appLoginIdDomainId :",appLoginIdDomainId)
			var hostName = bmSphinxDb.getSphinxDomainInfo(appLoginIdDomainId);
			var SphinxviewId = bmgeneric.covertToSphinxId(data.VIEWEDID);			
			var SphinxloginId = bmgeneric.covertToSphinxId(data.ID);
			var max_matches = 'max_matches=10';	
			var querycmt = "#get SENDERCOMINFODELTA info Details - View Profile Index#";
			bmCommonFunc.bmfuncSphinxIndexNames(data.ID,'',function(IndexName){
				var sphinxFetchIndex = IndexName['SENDERCOMINFOINDEX']+','+IndexName['SENDERCOMINFODELTA'];
				if(bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE)){
					deltaFieldArray = 'senderid,receiverid,comtype';
					deltawhereClauseVal = [SphinxloginId];
					deltaWhereClause = "commatriid=? and comtype in (13,14) order by rand() limit 1";
					totintacccnt = 3;
				} else {
					deltaFieldArray = 'senderid';
					deltawhereClauseVal = [SphinxloginId,14];
					deltaWhereClause = "commatriid=? and comtype=? order by rand() limit 1";
					totintacccnt = 1;	
				}				
				
				if(FROMVIEWPROFILE==1 || (!bmgeneric.empty(data.PAGENAME) && data.PAGENAME == "refinesearch")){
					if(bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE))
						deltawhereClauseVal = [parseInt(SphinxloginId),1,0,0];
					else
						deltawhereClauseVal = [parseInt(SphinxloginId),14,1,0,0];
				
					if(FROMVIEWPROFILE==1){
						if(bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE))
							deltaWhereClause = "commatriid=? and comtype in (13,14) and senderid!="+parseInt(SphinxviewId)+" and RecentStatus=? and FilteredMsg=? and DisplayStatus=?";	
						else
							deltaWhereClause = "commatriid=? and comtype=? and senderid!="+parseInt(SphinxviewId)+" and RecentStatus=? and FilteredMsg=? and DisplayStatus=?";
					}else{
						if(bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE))
							deltaWhereClause = "commatriid=? and comtype in (13,14) and RecentStatus=? and FilteredMsg=? and DisplayStatus=?";	
						else
							deltaWhereClause = "commatriid=? and comtype=? and RecentStatus=? and FilteredMsg=? and DisplayStatus=?";
					}
				}
				
				//var SelQuery = {HOST:hostName,INDEXNAME:sphinxFetchIndex,SELECTFIELDS:deltaFieldArray,WHERECLAUSEVAL:deltaWhereClause,MAXMATCHES:max_matches,QRYCMNT:querycmt};
				//console.log("SelQuery :",SelQuery);
				
				bmSphinxDb.bmDbSelect(3, hostName, sphinxFetchIndex, deltaFieldArray, deltaWhereClause, deltawhereClauseVal, max_matches, querycmt, 1, function(err,selectres){
					if(!err){
						var TotCominfocount = bmgeneric.count(selectres);
						
						if((FROMVIEWPROFILE==1 || (!bmgeneric.empty(data.PAGENAME) && data.PAGENAME == "refinesearch")) && TotCominfocount >= totintacccnt){
							
							var promoid = bmgeneric.array_rand(selectres);
							//console.log(promoid,"-------------------",selectres);
							loginmemacc = 0;
							if(bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE))
							{
								if(selectres[promoid]['comtype'] == 13)
								{
									loginmemacc = 1;
									oppositeid = selectres[promoid]['receiverid'];
								}else if(selectres[promoid]['comtype'] == 14){
									loginmemacc = 0;
									oppositeid = selectres[promoid]['senderid'];
								}
							}
							else
								oppositeid = selectres[promoid]['senderid'];

						}else if(TotCominfocount < 3 && (FROMVIEWPROFILE==1 || (!bmgeneric.empty(data.PAGENAME) && data.PAGENAME == "refinesearch"))){
							TotCominfocount = 0;
						}
						
						var latesteiarray = {};
						if(TotCominfocount>0){	
							var EIAcceptedBMID = bmgeneric.converToMatriId(oppositeid);
							var EIIdDomain = bmgeneric.getDomainInfo(1, EIAcceptedBMID);
							var appEIIdDomainId = EIIdDomain['domainid'];	 //1
							//#Connect Sphinx DB
							var EIhostName = bmSphinxDb.getViewProfileDomainInfo();
							var fetchprofileIndex = EIIdDomain['domainnameshort']+"profiledetailsindex";
							var deltaFieldArray = "photoavailable,photoprotected,thumbimg,gender,time_created,name";
							var deltawhereClauseVal = [parseInt(oppositeid),1,1,0,0,3,6,1,3];
							var deltaWhereClause = "profileindex=? and validated=? and authorized=? and deleted=? and status IN (?,?,?) and phoneverified IN (?,?)";						
							bmSphinxDb.bmDbSelect(1, EIhostName,fetchprofileIndex,deltaFieldArray,deltaWhereClause,deltawhereClauseVal, max_matches, querycmt, 1, function(err,selecteires){
								if(!err){
									if(!bmgeneric.empty(selecteires)){
										var EIIdDetail = selecteires[0];
										//console.log("EIIdDetail:",selecteires);
										/*
										{
										  photoavailable: 1,
										  photoprotected: 'N',
										  thumbimg: 'M435034_AXKCH_01582_T.jpg,M435034_nSYyU_36287_T.jpg',
										  gender: 'M',
										  time_created: 1093981854,
										  name: 'EMMAARVEE' }

										*/
										EIController.setCacheLatestEI(data.ID,EIIdDetail,EIAcceptedBMID,function(err,respon){});
										photoavil = (EIIdDetail['photoavailable']==1)?'Y':'N';
										if(EIIdDetail['photoprotected']=='Y' || EIIdDetail['photoprotected']=='C'){
											var timeCreated = {};
											//timeCreated[EIAcceptedBMID] = date('Y-m-d H:i:s', EIIdDetail['time_created']);
											//photoPath	= getPhotoPath(EIAcceptedBMID,timeCreated[EIAcceptedBMID]);	
											photoPath = bmgeneric.getUserImagePath(EIAcceptedBMID, EIIdDetail['time_created']);
											thumbimg = bmgeneric.explode(",",EIIdDetail['thumbimg']);
											EIphotourl = photoPath+thumbimg[0];  
										}
										EIIdDetail['photoprotected'] = (EIIdDetail['photoprotected'] == 'C') ? 'N' : EIIdDetail['photoprotected'];
										if(EIIdDetail['photoavailable']==0){
											EIphotourl='';
										}
										latesteiarray['EIACCEPTONE'] = {'ACCEPTNAME': bmgeneric.AppStrToTitle(EIIdDetail['name']),'ACCEPTPHOTOPROTECTED': EIIdDetail['photoprotected'],'ACCEPTPHOTOAVAIL': photoavil,'ACCEPTIMAGEURL': EIphotourl,'ACCEPTID': EIAcceptedBMID,'ACCEPTBY': loginmemacc};
										//console.log("latesteiarray:",latesteiarray);
										latesteiarray['RESPONSECODE'] = 1;
										latesteiarray['ERRCODE'] = 0;
										callback(null,latesteiarray);	
									} else {
										latesteiarray['RESPONSECODE'] = 3;
										latesteiarray['ERRCODE'] = 3;
										callback(null,latesteiarray);	
									}
								} else {
									latesteiarray['RESPONSECODE'] = 3;
									latesteiarray['ERRCODE'] = 3;
									callback(null,latesteiarray);	
								}
							});
						}else{
							latesteiarray['RESPONSECODE'] = 3;
							latesteiarray['ERRCODE'] = 3;
							callback(null,latesteiarray);	
						}
					} else {
						var latesteiarray = {};
						latesteiarray['RESPONSECODE'] = 3;
						latesteiarray['ERRCODE'] = 3;
						callback(null,latesteiarray);	
					}
				});
			});
		}catch(err){
			console.log("EIController Profile Inside Error:",err);
			var latesteiarray = {};
			latesteiarray['RESPONSECODE'] = 2;
			latesteiarray['ERRCODE'] = 1;
			callback(err,latesteiarray);	
		}
	}
	
	exports.setCacheLatestEI = function(LID,EIIdDetail,EIAcceptedBMID,next){
		if(EIIdDetail['gender'] == 'M')
		{
			oppogencont = 'his';
			oppogenanocont = 'He';
		}else {
			oppogencont = 'her';
			oppogenanocont = 'She';
		}								
		if (bmgeneric.count(EIIdDetail)>0 && EIIdDetail['photoavailable']==1) {
			if (EIIdDetail['photoprotected'] == "N" ){
				if(EIIdDetail['thumbimg']==''){
					if(EIIdDetail['gender'] == 'M'){
						EIphotourl =global.SECUREURL+"imgs.bharatmatrimony.com/bmimgs/add-photo-Ntxt-m-150-avatar.jpg";
					}else{
						EIphotourl =global.SECUREURL+"imgs.bharatmatrimony.com/bmimgs/add-photo-Ntxt-m-150-avatar.jpg";
					}
				}else{
					timeCreated = {};
					var now = new Date();
					//timeCreated[EIAcceptedBMID] = date('Y-m-d H:i:s', EIIdDetail['time_created']);
					//photoPath	= getPhotoPath(EIAcceptedBMID,timeCreated[EIAcceptedBMID]);
					photoPath = bmgeneric.getUserImagePath(EIAcceptedBMID, EIIdDetail['time_created']);
					thumbimg = bmgeneric.explode(",",EIIdDetail['thumbimg']);
					EIphotourl = photoPath+thumbimg[0];   
				}
			}else if(EIIdDetail['photoprotected'] == "C"){
				if(EIIdDetail['gender'] == 'M'){
					EIphotourl = global.SECUREURL+"imgs.bharatmatrimony.com/bmimgs/contacted-responded-m-150-avatar.jpg";
				}else{
					EIphotourl = global.SECUREURL+"imgs.bharatmatrimony.com/bmimgs/contacted-responded-f-150-avatar.jpg";
				}
			}else if(EIIdDetail['photoprotected'] == "Y"){
				if(EIIdDetail['gender'] == 'M'){
					EIphotourl =global.SECUREURL+"imgs.bharatmatrimony.com/bmimgs/photo-protected-m-150-avatar.jpg";
				}else{
					EIphotourl =global.SECUREURL+"imgs.bharatmatrimony.com/bmimgs/photo-protected-f-150-avatar.jpg";
				}
			}    
		}else{
			if(EIIdDetail['gender'] == 'M'){
				EIphotourl =global.SECUREURL+"imgs.bharatmatrimony.com/bmimgs/add-photo-Ntxt-m-150-avatar.jpg";
			}else{
				EIphotourl =global.SECUREURL+"imgs.bharatmatrimony.com/bmimgs/add-photo-Ntxt-m-150-avatar.jpg";
			}
		}								
		var expire = 3600*24;
		var EIvalue = [EIAcceptedBMID,EIIdDetail['name'],EIphotourl];
		Cache.set("LatestEI"+LID,EIvalue,0,expire);
		next(null, true);
	}
	
