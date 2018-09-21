/************************************************************************************************
 *	Filename	: viewprofilecontroller.js							
 *	Author		: Sathrak paldurai K
 *	Date		: 28-09-2016								
 *	Description	: Viewed member details display (controller manage the view and model).
 ***********************************************************************************************/
	
	exports.ViewProfile = function(req,res){
		try{
			var REQUEST = (!bmgeneric.empty(req.body)) ? req.body : req.query;
			var data = preventxss(REQUEST);
			if(dbconfig.LOADTIME==1){
				startvp = +new Date();
				console.error('View Profile-STTime:'+ new Date() +' and query ViewedId :'+data.VIEWEDID+' LoginId :'+data.ID);
			}
			if(bmgeneric.empty(data.ID) || bmgeneric.empty(data.VIEWEDID)) {
				if(dbconfig.LOADTIME==1){
					var endvp = +new Date();	
					console.error('View Profile-ENDTime 5 in:'+ (endvp-startvp) +' LoginId :'+data.ID);
				}
				var outputArray = {};
				outputArray['RESPONSECODE'] = 2;
				outputArray['ERRCODE'] = 1;
				return res.send(outputArray);
			}			
			//Check the Logged In MatriId and Viewer MatriId
			if ((!bmgeneric.is_matriid(data.ID)) || (!bmgeneric.is_matriid(data.VIEWEDID))){
				if(dbconfig.LOADTIME==1){
					var endvp = +new Date();	
					console.error('View Profile-ENDTime 6 in:'+ (endvp-startvp) +' LoginId :'+data.ID);
				}
				var outputArray = {};
				outputArray['RESPONSECODE'] = 2;
				outputArray['ERRCODE'] = 1;
				return res.send(outputArray);		
			} else if(bmgeneric.getEncryptpass(res, data)){					
				var outputResult ={};
				if (data.ID == data.VIEWEDID) {
					data.SPHINXENABLE = 0;
				} else {
					data.SPHINXENABLE = 1;
				}				
						
				var LoginId = data.ID;
				var ViewedId = data.VIEWEDID;
				//#Get the Domain details of the LoginId Id
				let userDomainList = bmgeneric.getDomainInfo(1, LoginId);
				let userDomainId = userDomainList['domainid'];
				let userDomainName = userDomainList['domainnameshort'];
				
				//#Get the Domain details of the Viewer Id
				let partnerDomainList = bmgeneric.getDomainInfo(1, ViewedId);
				let partnerDomainId = partnerDomainList['domainid'];
				let partnerDomainName = partnerDomainList['domainnameshort'];
					
				if(!bmgeneric.in_array(data.APPTYPE,bmvars.IOSAPPTYPE) && !bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE) && data.APPTYPE !=107){
					global.SECUREURL = 'https://';
					global.OTHERSECUREURL = 'http://';
				}else{
					global.SECUREURL = 'http://';
					global.OTHERSECUREURL = 'http://';
				}
				pinAvailble = 0;
				global.requestInfoArr = {};
				global.REQUESTFLAG = 0;
				global.RequestComTypeArray = {};
				if(bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE) || data.APPTYPE == 115){ 
					global.REQUESTFLAG = 1; 
					global.RequestComTypeArray = {"EATINGHABITSREQUEST":'0', "DRINKINGHABITSREQUEST":'0', "SMOKINGHABITSREQUEST":'0', "GOTHRAREQUEST":'0', "STARREQUEST":'0', "RAASIREQUEST":'0', "EDUCATIONDETAILREQUEST":'0', "OCCUPATIONDETAILREQUEST":'0', "ANNUALINCOMEREQUEST":'0', "ANCESTRALORIGINREQUEST":'0', "ABOUTFAMILYREQUEST":'0'}; //#Request comtype mapping for WAP & APP
				}
				
				var dNameCap = global.DOMAINNAMECAPITAL[ViewedId.substr(0,1)];
				async.parallel({
					PROFILEDETAILS:function(callback){ //Viewed Member Sphinx Data
						var APPTYPE = data.APPTYPE;
						if(data.SPHINXENABLE ==1){
							viewPrfModel.appProfileDetailsFromSphinx(LoginId,ViewedId,'PROFILEDETAILSINDEX',userDomainList,partnerDomainList, function(err,getProfileDetails){
								viewPrfModel.appCheckValidateStatus(LoginId,ViewedId,getProfileDetails,APPTYPE,function(err,OutputArr){
									callback(err,OutputArr);
								});
							});
						} else {
							viewPrfModel.appProfileDetailsFromDb(ViewedId,DBNAME['MATRIMONYMS'],MERGETABLE['MATRIMONYPROFILE'], function(err,getProfileDetails){
								viewPrfModel.appCheckValidateStatus(LoginId,ViewedId,getProfileDetails,APPTYPE,function(err,OutputArr){
									callback(err,OutputArr);
								});
							});
						}						
					},
					GETCOMNOTESINFO:function(callback){ //Communication Details form com/notes info Sphinx
						//#Get Partner and login member Last Activity - Need To Check Func - appLastActionUnified 
						if (ViewedId != LoginId) {							
							var rtSelectFlag = 1;	
							var LastAction = {}; 							
							latestAction.appLastActionUnified(data,rtSelectFlag, function(err,lastactivity){
								LastAction['LASTACTION'] = lastactivity;
								if(!bmgeneric.empty(lastactivity) && !bmgeneric.empty(lastactivity[ViewedId])){
									var otherreqreccomarr = [48,169,60,171,84,173,88,175,92,177,96,179,100,181,112,187,116,189,120,191,124,193,128,195];
									if(bmgeneric.in_array(lastactivity[ViewedId]['comtype'],otherreqreccomarr)){
										Cache.get(LoginId+"_REQUESTDATA",function(err,requestDetails){
											LastAction['REQUESTDATA'] = requestDetails;
											callback(null,LastAction);
										});
									} else {
										LastAction['REQUESTDATA'] = {};
										callback(null,LastAction);
									}
								} else {
									LastAction['REQUESTDATA'] = {};
									callback(null,LastAction);
								}
							});
						} else {
							var lastactivity = {};
							callback(null,lastactivity);
						}
					},
					ONLINESTATUS:function(callback){
						var ViewedId = data.VIEWEDID.toUpperCase();
						var SphinxId = bmgeneric.covertToSphinxId(ViewedId);
						OnlineStatus.chkonlinestatus(SphinxId, function(err,onlstatus){
							callback(null,onlstatus);
						});						
					},
					GETPHONE4DIG:function(callback){
						if((bmgeneric.in_array(data.APPTYPE,bmvars.IOSAPPTYPE)) || (bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE)) || data.APPTYPE == 115){ 
							sphinxcommfunc.getPhoneFourdigits(data.VIEWEDID,function(err,encryptno){
								callback(err,encryptno);
							});
						} else {
							callback(null,{});
						}
					}
				},function(error,results){
					try{
						const bothMemberDetArr = results.PROFILEDETAILS;						
						const lastActivity = results.GETCOMNOTESINFO['LASTACTION'];
						const cacheReqData = results.GETCOMNOTESINFO['REQUESTDATA'];
						var outputJson ={};						
						if(bothMemberDetArr.responsecode == 1){
							outputResult['RESPONSECODE'] = 1;
							outputResult['ERRCODE'] = 0;						
							var partnerInfo = bothMemberDetArr[ViewedId];
							var UserInfo = bothMemberDetArr[LoginId];
							data.LOGINGEN = UserInfo['gender'];
							data.LOGINENTRY = UserInfo['entrytype'];							
							if (data.SPHINXENABLE == 1) {								
								if (data.APPTYPE == 200 || data.APPTYPE == 175) {
									outputJson['MEMBERID_INFO'] = partnerInfo;
								}
							}
							
							//get gothra for other than muslim religion
							//2=Muslim - Others ,10 Muslim - Shia ,11 Muslim - Sunni,3 Christian - Others ,12 Christian - Catholic ,13 Christian - Orthodox ,14 Christian - Protestant
							if (!bmgeneric.in_array(partnerInfo['religion'], [2, 10, 11, 12, 13, 14, 3])) {
								if (!bmgeneric.empty(partnerInfo['gothraid']) && partnerInfo['gothraid'] != '999' && partnerInfo['gothraid'] != '9999' && partnerInfo['gothraid'] != '9998') {
									mygothra = bmgeneric.appgetFromArryHash("GOTHRALIST", partnerInfo['gothraid']);
								}else if(partnerInfo['gothra'] != '' || partnerInfo['gothra'] != '0') {
									mygothra = (partnerInfo['gothra']) ? partnerInfo['gothra'] : bmlable.l_not_specified;
								} else {
									mygothra = bmlable.l_not_specified;
								}
							} else {
								mygothra = "-";
							}
							
							global.requestInfoArr = {};
							partnerInfo['priencryptmobileno'] = results.GETPHONE4DIG;	
							//#Profile Created By Label functions
							var profCrtLabel = viewPrfModel.profileCreatedByLabel(partnerInfo,data.APPTYPE)
							async.parallel({
								COMMUNICATINFO : function(callback){
									//communicationactionappui - data.LOGINENTRY//bmfuncRecentAction
									var Name = "<![CDATA[" +bmgeneric.AppStrToTitle(partnerInfo["name"])+ "]]>";
									if(UserInfo['entrytype']!="" && UserInfo['gender'] !='') // loginentrytp value is must.  F - free  R - paid
									{
										comunitcatInfo.getcomunicationInfo(data,partnerInfo,lastActivity,"vp", cacheReqData,function(err,retcom){	
											callback(err,retcom);
										});	
									} else {callback(null,null);}
								},
								MUTMATCHINFO : function(callnback){
									var matchInfo = {};
									if(bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE)){
										matchInfo['Mutual'] = "N";
										//mutualmatchconfirm
										MutMatchInfo.mutualmatchvp(UserInfo,partnerInfo,function(err,prefmatchicon){
											if(prefmatchicon == 1)
												matchInfo['Mutual'] = "Y";
											callnback(err,matchInfo);
										});									
									} else {													
										callnback(null,matchInfo);
									}
								},
								OTHERINFO : function(callback){									
									//Function to get the otherinfo details	
									var lastActInfo = Object.assign({}, lastActivity);
									otherInfo.getotherInfo(data,partnerInfo,results.ONLINESTATUS,lastActInfo,function(err,otherrecd){
										callback(err,otherrecd);
									});
								},
								PERSONALINFO : function(callback){
									// #Get Partner Personal info Details 
									personalInfo.getpersonalInfo(data,partnerInfo,profCrtLabel, function(err,prosoninfo){
										callback(err,prosoninfo);
									});
								},
								RELINFO : function(callback){									
									//#Get Partner Religious info Details - ok
									religousInfo.getreligsInfo(data,dNameCap,partnerInfo,mygothra, function(err,relginfo){
										callback(err,relginfo);
									});									
								},
								LIFSTLINFO : function(callback){									
									//#Get Partner lifeStyle Details 
									lifestyleinfo.getlifestyInfo(data,partnerInfo, function(err,lifstyinfo){
										callback(err,lifstyinfo);
									});	
								},
								LOCATINFO : function(callback){									
									//Get Partner Location info Details 
									locationInfo.getlocatInfo(data,partnerInfo, function(err,locatinfo){	
										callback(err,locatinfo);
									});
								},
								PROFINFO : function(callback){									
									//Get Partner Professional info Details -ok
									profnalInfo.getprofInfo(data,partnerInfo, function(err,profinfo){
										callback(err,profinfo);
									});									
								},
								FAMYINFO : function(callback){
									//Get Partner Family info Details - ok
									if (partnerInfo['familydetailsavailable'] == 1) {
										familyInfo.getFamilyInfoDet(data,partnerInfo,partnerDomainList, function(err,famyinfo){
											callback(err,famyinfo);
										});	
									}else{callback(null,null);}
								},
								HOBBINFO : function(callback){									
									//Get Partner Hobbies info Details - ok							
									if (partnerInfo['hobbiesavailable'] == 1) {
										hobbiesInfo.getViewMemHobbyDet(data,partnerInfo,partnerDomainList, function(err,hobbinfo){
											callback(err,hobbinfo);
										});
									}else{callback(null,null);}									
								},
								MEMBERPREF : function(callback){									
									//Get Partner Preference details if member has set - ok
									// Now Partner Preference details show based on member or system fileds 
									var memberpartmatch = {};
									partprfInfo.getviewMemPPDet(data,dNameCap,partnerInfo,profCrtLabel,partnerDomainList,mygothra, function(err,memberinfo){
										memberpartmatch['MEMBERINFO'] = memberinfo['MEMPREF'];
										var mwppinfo = Object.assign({}, memberinfo['MEMPREF']);
										partprfInfo.partprefmatch(data,partnerInfo,UserInfo,mwppinfo,userDomainList,memberinfo['MWINFO'], function(err,pmatchinfo){
											memberpartmatch['PARTMATCHINFO'] = pmatchinfo;
											callback(null,memberpartmatch);		
										});		
									});
								},
								HORINFO : function(callback){
									//Get Partner Horoscope details if member has added
									if (partnerInfo['horoscopeavailable'] != 0) {
										var skippricvacy = bmgeneric.empty(lastActivity)? {} : lastActivity[ViewedId]['skipprivacy'];
										horoscopeInfo.gethoroscopeInfo(ViewedId,partnerInfo,partnerDomainList,LoginId,data,skippricvacy,function(err,horodet){
											callback(err,horodet);
										});
									} else {callback(null,{});}
								},
								PHOTOINFO : function(callback){									
									//Get Partner Photo info details if member has added
									photoInfo.getPhotoInfo(data,partnerInfo,lastActivity,function(err,photodetails){
										callback(err,photodetails['PHOTOINFO']);
									});
								},
								CONTACTINFO : function(callback){
									var contactinfo = {};
									if(partnerInfo['powerpackopted'] == 1 || partnerInfo['powerpackopted'] == 2){
										parentcontact = "1";
									} else {
										parentcontact = "0";
									}
									
									contactinfo['PARENTCONTACT'] = parentcontact;
									contactinfo['NAME'] = '';
									contactinfo['RMCONTACT'] = "";
									contactinfo['GENDER'] = (UserInfo.gender=='M')?'F':'M';
									if(partnerInfo['specialpriv']==3 || partnerInfo['specialpriv']==4 ){ 
										//Get RM Details
										var c2cURL = "http://telesales:Telesales1234@profile.bharatmatrimony.com/privilege/rmadmin/inboundlead/getassisteddetails.php";
										var viewmatriid = bmgeneric.urlencode(data.VIEWEDID);
										request.post({headers: {'content-type' : 'application/x-www-form-urlencoded'}, url:c2cURL,body :"matriid="+viewmatriid}, function(err,httpResponse,JsonOutput){ 
											if(!bmgeneric.empty(JsonOutput['DIDNumber'])){
												contactinfo['RMCONTACT'] = "+91 "+JsonOutput['DIDNumber'];
											} 
											if(!bmgeneric.empty(JsonOutput['Name'])){
												contactinfo['NAME'] = JsonOutput['Name'];
											}	
											callback(err,contactinfo);
										});
									} else {
										callback(null,contactinfo);
									}	
								},
								REQUESTINFO:function(callback){ //Communication Details form request info Sphinx
									if(bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE) || data.APPTYPE == 115){
										if(bmgeneric.count(global.requestInfoArr)>0){
											latestAction.getRequestinfoDetails(data.ID, data.VIEWEDID,function(err,RequestVal){
												latestAction.checkinfoRequestedorNot(data.VIEWEDID,RequestVal,global.requestInfoArr,function(err,resltdat){
													callback(err,resltdat);
												});
											});									
										} else {
											var lastactivity = {};
											callback(null,lastactivity);
										}
									} else {
										var lastactivity = {};
										callback(null,lastactivity);
									}
								},
								IDEALMATCH:function(callback){
									bmfunidelmatch.idealMatchProfile(partnerInfo, bothMemberDetArr[LoginId], function(err,idealMatch){										
										callback(null,idealMatch);
										
									});
								},
								LATESTEI : function(callback){
									if((bmgeneric.in_array(data.APPTYPE,bmvars.IOSAPPTYPE) || bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE)) && (partnerInfo['gender']!=data.LOGINGEN)){
										
										data.FROMVIEWPROFILE = 1;
										
										EIController.getLatestEIAcpt(data,userDomainId,function(err,RequestVal){
											callback(err,RequestVal);
										});	
									} else {
										var latesteiarray = {};
										latesteiarray['RESPONSECODE'] = 3;
										latesteiarray['ERRCODE'] = 3;
										callback(null,latesteiarray);
									}
								},
								BLACKBERRY : function(callback){
									var bbPinArr = {};
									//#For blackberry get the BBPIn
									if ((data.APPTYPE == 106 && !bmgeneric.empty(partnerInfo['entrytype']) && partnerInfo['entrytype'] == 'R') || (data.APPTYPE == 115)){
										if (data.APPTYPE == 115) {
											bbPinArr['webnotif'] = UserInfo['webnotification'];
										}
										
										viewPrfModel.getBBPIN(data.ID,data.VIEWEDID,data.APPTYPE,UserInfo['gender'],partnerInfo['gender'],function(err,binDet){
											if(!err){
												bbPinArr['bbPinVal'] = (!bmgeneric.empty(binDet))? binDet[0]['PinValue'] :{};
												callback(null,bbPinArr)
											} else {
												callback(err,bbPinArr)
											}
										});
									} else {
										callback(null,bbPinArr);
									}
								}
							},function(error,FinRslt){
								outputJson['LOCATIONINFO'] = FinRslt.LOCATINFO;								
								outputJson['OTHERINFO'] = FinRslt.OTHERINFO;
								if(bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE)) {
									var timecreatedval = FinRslt.PERSONALINFO['TIMECREATED'];
									var recenttag = 'N';
									var lastWeekTime = strtotime(dateFormat(strtotime("-1 week"),'yyyy-mm-dd HH:MM:ss'));
									if(timecreatedval != '' && timecreatedval >= lastWeekTime && LoginId != ViewedId)
										recenttag = 'Y';
									outputJson['OTHERINFO']['RECENTTAG'] = recenttag;
								}
								if((bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE)) || (bmgeneric.in_array(data.APPTYPE,bmvars.IOSAPPTYPE)) && (partnerInfo['specialpriv']==3 || partnerInfo['specialpriv']==4 )) {
									outputJson['OTHERINFO']['RMAVAILABLE']= 1;				
								}
								
								//#forward Profile
								if ((data.APPTYPE == 115 || (bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE))) || (bmgeneric.in_array(data.APPTYPE,bmvars.IOSAPPTYPE))) {
									outputJson['OTHERINFO']['SHAREURL'] = "Check out "+bmgeneric.bmfuncstrToTitle(partnerInfo['name'])+"'s profile on "+bmgeneric.bmfuncstrToTitle(partnerDomainName)+"Matrimony. "+global.SECUREURL+"m."+partnerDomainName+"matrimony.com/bm.php?viewedid="+ViewedId+"&MSTYPE=SHAREPROFILE";
								}
								if(!bmgeneric.empty(FinRslt.MUTMATCHINFO))
									outputJson['OTHERINFO']['MUTUAL'] = FinRslt.MUTMATCHINFO['Mutual'];
								
								//#0-Enable 1-Disable
								if(bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE)) {	
									outputJson['OTHERINFO']['ACTIONBUTTONENABLE'] = 1;
								}	
									
								outputJson['PERSONALINFO'] = FinRslt.PERSONALINFO;
															
								if(!bmgeneric.empty(FinRslt.RELINFO))
									outputJson['RELIGIOUSINFO'] = FinRslt.RELINFO;
								
								if(!bmgeneric.empty(FinRslt.LIFSTLINFO))
									outputJson['LIFESTYLEINFO'] = FinRslt.LIFSTLINFO;
								
								if(!bmgeneric.empty(FinRslt.PROFINFO))
									outputJson['PROFESSIONALINFO'] = FinRslt.PROFINFO;
									
								if(!bmgeneric.empty(FinRslt.FAMYINFO))
									outputJson['FAMILYINFO'] = FinRslt.FAMYINFO;
																
								if(!bmgeneric.empty(FinRslt.HOBBINFO))
									outputJson['HOBBIESINFO'] = FinRslt.HOBBINFO;
								
								outputJson['MEMBERPREF'] = FinRslt.MEMBERPREF['MEMBERINFO'];
								
								if(!bmgeneric.empty(FinRslt.HORINFO))
									outputJson['HORODET']  = FinRslt.HORINFO;
								
								outputJson['PARTPREFMATCH'] = FinRslt.MEMBERPREF['PARTMATCHINFO'];
								
								outputJson['CONTACTINFO'] = FinRslt.CONTACTINFO;
								
								outputJson['PHOTOINFO'] = FinRslt.PHOTOINFO;
								
								if (data.APPTYPE == 115 || bmgeneric.in_array(data.APPTYPE,bmvars.MobileAppType)) {									
									if (!bmgeneric.empty(FinRslt.IDEALMATCH)) {
										outputJson['OTHERINFO']['IDEALMATCH'] = FinRslt.IDEALMATCH;
									}	
									outputJson['OTHERINFO']['PINAVAILABLE'] = pinAvailble;
								}																		
								
								if(bmgeneric.is_array(FinRslt.COMMUNICATINFO)){
									outputJson['OTHERINFO']['REFERENCEAVAILABLE'] = FinRslt.COMMUNICATINFO['REFERENCE'];
									delete FinRslt.COMMUNICATINFO['REFERENCE'];
									outputJson['EIPMDET'] = FinRslt.COMMUNICATINFO['EIPMDET'];
									delete FinRslt.COMMUNICATINFO['EIPMDET'];
								}
								
								if(!bmgeneric.empty(FinRslt.COMMUNICATINFO))
									outputJson['COMMUNICATIONACTION'] = FinRslt.COMMUNICATINFO;
								
								if(!bmgeneric.empty(FinRslt.REQUESTINFO))						
									outputJson['REQUESTINFO'] = FinRslt.REQUESTINFO;
								
								if(!bmgeneric.empty(FinRslt.BLACKBERRY)){
									if(!bmgeneric.empty(FinRslt.BLACKBERRY['bbPinVal']))
										outputJson['BBPIN'] = FinRslt.BLACKBERRY['bbPinVal'];
									
									if(!bmgeneric.empty(FinRslt.BLACKBERRY['webnotif']))
										outputJson['WEBNOTIFICATION'] = FinRslt.BLACKBERRY['webnotif'];
								}
																
								if(FinRslt.LATESTEI['RESPONSECODE']== 1 && FinRslt.LATESTEI['ERRCODE']== 0){
									var LatestEIApt = FinRslt.LATESTEI['EIACCEPTONE'];
									if(LatestEIApt['ACCEPTNAME']!= '' && LatestEIApt['ACCEPTID']!= ''){
										outputJson['ACCEPTPROFILES'] = LatestEIApt;
									}
								}													
														
								outputResult['PROFILEDET'] = outputJson;					
								
								if (outputJson['OTHERINFO']['BlockedbyPartnerId'] == 'Y') {
									var outputArray = {};
									outputArray['RESPONSECODE'] = 2;
									outputArray['ERRCODE'] = 94;
									if(dbconfig.LOADTIME==1){
										var endvp = +new Date();	
										console.error('View Profile-ENDTime 1 in:'+ (endvp-startvp) +' LoginId :'+data.ID);
									}
									return res.send(outputArray);
								} else {
									res.send(outputResult);	
									if(dbconfig.LOADTIME==1){
										var endvp = +new Date();	
										console.error('View Profile-ENDTime in:'+ (endvp-startvp) +' LoginId :'+data.ID);
									}
								}												
																
								var ppData = bothMemberDetArr[LoginId];								
								//Calculating Start and End age
								if(ppData['gender']=='M') //#Age for Male
								{
									startAge = ppData['age']-7;
									endAge   = ppData['age']+2;
									
								} else {//#Age for Female
									startAge = ppData['age']-2;
									endAge   = ppData['age']+7;
								}
							
								if(ppData['profileindex']!=partnerInfo['profileindex'] && ppData['gender']!=partnerInfo['gender']&& partnerInfo['age']>=startAge && partnerInfo['age']<=endAge)//Condition checking to put entry in tamilviewedmyprofilestats
								{
									var ID = data.ID;
									var VIEWEDID = data.VIEWEDID;
									// proceed only if VIEWEDID is present
									if (data.VIEWEDID != '' && data.ID != "" && data.VIEWEDID != data.ID) {
										var GETDOMAININFO = bmgeneric.getDomainInfo(1, data.ID);
										var dbHost = bmDb.bmDbConnById(2,data.ID,'S');
										// get the privacy settings for the viewer
										var privacyset = 1;
										var bmprivacynotestbl = DOMAINTABLE[bmgeneric.allucwords(GETDOMAININFO["domainnameshort"])]["BMPRIVACYNOTES"];
										//console.log("===bmprivacynotestbl====",bmprivacynotestbl);
										var qrycmt = "# View Profile - Select BMPrivacy notes Table - DB#"
										var whereClause = " MatriId=? AND ViewerId=? ";	
										var whereClauseVal = [ID,ID];
										var selectFields = "ViewedProfileStatus";
										bmDb.bmDbSelect(dbHost, DBNAME['MATRIMONY'], bmprivacynotestbl, selectFields, whereClause, whereClauseVal, qrycmt, function(err,resultset){
											if(!err){
												if (resultset.length > 0) {
													privacyset = resultset[0]['ViewedProfileStatus'];
												} 
												
												if(privacyset==1){
													if(partnerInfo['partnerprefset']==1){
														viewedmembppgothraarr = partnerInfo['matchgothraid'];
													}else if(partnerInfo['partnerprefset']==0){
														viewedmembppgothraarr = partnerInfo['sysgothraid'];
													}

													var membergothraid = ppData['gothraid'];
													var viewedmembergothraid = partnerInfo['gothraid'];
														
													if(bmgeneric.in_array(998, viewedmembppgothraarr) && viewedmembergothraid > 0) //998 - All; applicable only for logged in members; All Except members gothra has to be retrieved.
													{			
														if(membergothraid!=viewedmembergothraid){
															gothrasatisfy = 1;
														}else{
															gothrasatisfy = 0;
														}
													}else if(!bmgeneric.empty(viewedmembppgothraarr) && !bmgeneric.in_array("0",viewedmembppgothraarr) && !bmgeneric.in_array(998,viewedmembppgothraarr) && !bmgeneric.in_array(9998,viewedmembppgothraarr)){
														if(bmgeneric.in_array(membergothraid,viewedmembppgothraarr)){
															gothrasatisfy = 1;
														}else{
															gothrasatisfy = 0;
														}
													}else{
														gothrasatisfy = 1;
													}	
													
													var insertlatestupdate = insertInappupdate  ='';
													var lastactpriv = bmgeneric.isset(FinRslt.OTHERINFO['SKIPPRIVACY'])? FinRslt.OTHERINFO['SKIPPRIVACY'] : {};
													
													if(!bmgeneric.empty(lastactpriv)){
														if((lastactpriv['IGNORED'] ==0 || lastactpriv['IGNORED'] =='' || bmgeneric.empty(lastactpriv['IGNORED'])) && (lastactpriv['BLOCKED']==0 || lastactpriv['BLOCKED']==''  || bmgeneric.empty(lastactpriv['BLOCKED'])) && (lastactpriv['INTERESTCOMDECLINED']==0 || bmgeneric.empty(lastactpriv['INTERESTCOMDECLINED']) || lastactpriv['INTERESTCOMDECLINED']=='') && (lastactpriv['MESSAGECOMDECLINED']==0 || lastactpriv['MESSAGECOMDECLINED']=='' || bmgeneric.empty(lastactpriv['MESSAGECOMDECLINED'])) && bmgeneric.in_array(partnerInfo['status'],[0,3,6]) && gothrasatisfy==1){
															insertlatestupdate = 1;
															insertInappupdate  = 1;
														}
													} else if(bmgeneric.empty(lastactpriv) && bmgeneric.in_array(partnerInfo['status'],[0,3,6]) && gothrasatisfy==1){
														insertlatestupdate = 1;
														insertInappupdate  = 1;
													}													
												
													if(bmgeneric.empty(data.APPVERSION)){
														appversionins = "''";
													}else{
														appversionins = data.APPVERSION;
													}
													var vmpsin = {"ID":data.ID,"VIEWEDID":data.VIEWEDID};
													bmCommonFunc.ViewedMyProfStatsInst(vmpsin, function(err,Instdata){});									
													if(data.ID!=data.VIEWEDID && ppData['gender']!=partnerInfo['gender']){
														Receiverdomainarr = bmgeneric.getDomainInfo(1, data.VIEWEDID);
														/* MyHome LatesUpdate changes*/
														if(bminit.MYHOMELATESTUPDATESFLAG == 1 && bminit.MYHOMELATESTUPDATESDOMAIN[Receiverdomainarr["domainnameshort"]] == 1 && insertlatestupdate==1)
														{
															var sphinxMatriId = bmgeneric.covertToSphinxId(data.ID);
															var sphinxReceiverId = bmgeneric.covertToSphinxId(data.VIEWEDID);
															sendertimecreated = ppData['time_created'];
															sendername = ppData['name'];
															senderage = ppData['age'];
															senderheight = ppData['height'];
															photoAvailable = (ppData['photoavailable'] == 1)?'Y':'N';
															
															if(partnerInfo['status'] != 1 && partnerInfo['status'] != 15 && partnerInfo['status'] != 16){
																var time = Math.round((new Date()).getTime()/1000);
																latestUpdates = {"SenderId":sphinxMatriId,"ReceiverId":sphinxReceiverId,"ComType":151,"TimeCreated":sendertimecreated,"Message":"","PhotoAvailable":photoAvailable,"PhotoName":"","SenderName":sendername,"DateUpdated":time,"Age":senderage,"Height":senderheight};
																//console.log("latestUpdates :",latestUpdates);
																bmlatestupd.setmsg(latestUpdates, function(err,latestIn){});
															}
														}
													  
														//Inapptable date entery START
														var skipidsval = [1,2,15,16];	
														if(bminit.INAPPNOTIFICATIONFLAG == 1 && insertInappupdate==1 && !bmgeneric.in_array(partnerInfo['status'],skipidsval)){
															var sphinxMatriId = bmgeneric.covertToSphinxId(data.ID);
															var thumbimgs =  bmgeneric.explode(",",ppData['thumbimgs']);
															var Inappphoto_url	= photohint = Inappphotoname = '';
															if(thumbimgs[0] != ""){
																if(((ppData['phoneprotected']=='C' || ppData['phoneprotected']=='Y') && bmgeneric.chkContedRespPry(lastactpriv)==0) || ppData['phoneprotected']=="N"){
																	Inappphoto_url	= bmgeneric.getUserImagePath(data.ID,ppData['time_created']);
																	Inappphotoname = Inappphoto_url+""+thumbimgs[0];
																}else if(ppData['phoneprotected']=='Y'){
																	photohint = (ppData['gender']=="F")?"PF":"PM";
																}else if(ppData['phoneprotected']=='C'){
																	Inappphoto_url	= bmgeneric.getUserImagePath(data.ID,ppData['time_created']);
																	Inappphotoname = bmgeneric.getPhotoBlurImage(Inappphoto_url,75);
																}	
															}else{
																photohint = (ppData['gender']=="F")?"RF":"RM";
															}
															
															if(photohint!=""){
																if (photohint == "PM" || photohint == "CM1" || photohint == "CM0")	
																	Inappphotoname = "http://"+GETDOMAININFO['domainnameimgs']+"/bmimgs/photo-protected-male-75-avatar.jpg";
																else if (photohint == "PF" || photohint == "CF1" || photohint == "CF0") 
																	Inappphotoname = "http://"+GETDOMAININFO['domainnameimgs']+"/bmimgs/photo-protected-female-75-avatar.jpg";
																else if (photohint == "RM") 
																	Inappphotoname = "http://"+GETDOMAININFO['domainnameimgs']+"/bmimgs/photo-request-male-75-avatar.jpg";
																else if (photohint == "RF") 
																	Inappphotoname = "http://"+GETDOMAININFO['domainnameimgs']+"/bmimgs/photo-request-female-75-avatar.jpg";
																else 
																	Inappphotoname = photohint;
															}
															
															var today = new Date();
															var Inappdatas = {"SenderId":data.ID,"ReceiverId":data.VIEWEDID,"NotificationType":1004,"SenderGender":ppData['gender'],"Status":0,"SenderName":ppData['name'],"Dateadded": dateFormat(today,'yyyy-mm-dd HH:MM:ss')};
															if(!bmgeneric.empty(Inappphotoname))
																Inappdatas['PhotoName'] = Inappphotoname;															
															bmCommonFunc.InAppNotifQueFunc(Inappdatas,GETDOMAININFO['domainnameshort'], function(err,Instdata){
																//res.send("OK");
															});
														}
													}
												}
											}
										});
									}
								}								
							});
						} else {						
							if(dbconfig.LOADTIME==1){
								var endvp = +new Date();	
								console.error('View Profile-ENDTime 2 in:'+ (endvp-startvp) +' LoginId :'+data.ID);
							}
							var outputArray = {};
							outputArray['RESPONSECODE'] = bothMemberDetArr.responsecode;
							outputArray['ERRCODE'] = bothMemberDetArr.errcode;
							return res.send(outputArray);
						}
					}catch(err){
						console.log("Error : File Name Viewprofilecontroller.js :",err);
						if(dbconfig.LOADTIME==1){
							var endvp = +new Date();	
							console.error('View Profile-ENDTime 3 in:'+ (endvp-startvp) +' LoginId :'+data.ID);
						}
						var outputArray = {};
						outputArray['RESPONSECODE'] = 2;
						outputArray['ERRCODE'] = 1;
						res.send(outputArray);	
					}
				});				
			} else {
				if(dbconfig.LOADTIME==1){
					var endvp = +new Date();	
					console.error('View Profile-ENDTime 7 in:'+ (endvp-startvp) +' LoginId :'+data.ID);
				}
				var outputArray = {};
				outputArray['RESPONSECODE'] = 2;
				outputArray['ERRCODE'] = 1;
				res.send(outputArray);	
			}
		}catch(err){
			console.log("ViewProfile Error:",err);
			if(dbconfig.LOADTIME==1){
				var endvp = +new Date();	
				console.error('View Profile-ENDTime 4 in:'+ (endvp-startvp));
			}
			var outputArray = {};
			outputArray['RESPONSECODE'] = 2;
			outputArray['ERRCODE'] = 1;
			outputArray['PROFILEDET'] ='';
			res.send(outputArray);	
		}
	}
	

	exports.OnlineStatus = function(req,res){
		var VIEWEDID = req.query.VIEWEDID;
		var ViewedId = VIEWEDID.toUpperCase();
		var SphinxId = bmgeneric.covertToSphinxId(ViewedId);
		OnlineStatus.chkonlinestatus(SphinxId, function(err,callback){				
			console.log(ViewedId,"OnlineStatus 111:",callback);
			res.send(callback);	
		});	
	}
	
	exports.viewSimilarProfile = function(req, res){
		try{ 		
			var REQUEST = (!bmgeneric.empty(req.body)) ? req.body : req.query;
			var data = preventxss(REQUEST);	
			
			if(dbconfig.LOADTIME==1 || data.KSLOG==1){
				var startvsp = +new Date();
				console.error('Similarprofile-STTime:'+ startvsp +' and  ViewedId :'+data.VIEWEDID+' SLoginId :'+data.ID);
			}	
			
			if(bmgeneric.empty(data.ID) || bmgeneric.empty(data.VIEWEDID)) {
				if(dbconfig.LOADTIME==1 || data.KSLOG==1){
					var endvp = +new Date();	
					console.error('Similarprofile-ENDTime 15 in:'+ startvsp+' SLoginId :'+data.ID);
				}
				var outputArray = {};
				outputArray['RESPONSECODE'] = 2;
				outputArray['ERRCODE'] = 1;
				return res.send(outputArray);
			}
			
			//Check the Logged In MatriId and Viewer MatriId
			if ((!bmgeneric.is_matriid(data.ID)) || !bmgeneric.is_matriid(data.VIEWEDID)) {
				if(dbconfig.LOADTIME==1 || data.KSLOG==1){
					var endvsp = +new Date();	
					console.error('Similarprofile-ENDTime 1 in:'+ startvsp +' SLoginId :'+data.ID);
				}
				var outputArray = {};
				outputArray['RESPONSECODE'] = 2;
				outputArray['ERRCODE'] = 1;
				return res.send(outputArray);				
			} else if(bmgeneric.getEncryptpass(res, data)){
				var outputResult ={};
				if (data.ID == data.VIEWEDID) {
					data.SPHINXENABLE = 0;
				} else {
					data.SPHINXENABLE = 1;
				}	
				if(dbconfig.LOADTIME==1 || data.KSLOG==1){					
					console.error('Similarprofile-Time 100 in:'+ startvsp +' SLoginId :'+data.ID);
				}
				var LoginId = data.ID;
				var ViewedId = data.VIEWEDID;
				//#Get the Domain details of the LoginId Id
				let userDomainList = bmgeneric.getDomainInfo(1, LoginId);
				let userDomainId = userDomainList['domainid'];
				let userDomainName = userDomainList['domainnameshort'];
				
				//#Get the Domain details of the Viewer Id
				let partDomainList = bmgeneric.getDomainInfo(1, ViewedId);
				let partDomainId = partDomainList['domainid'];
				let partDomainName = partDomainList['domainnameshort'];
					
				if(!bmgeneric.in_array(data.APPTYPE,bmvars.IOSAPPTYPE) && !bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE) && data.APPTYPE !=107){
					global.SECUREURL = 'https://';
					global.OTHERSECUREURL = 'http://';
				}else{
					global.SECUREURL = 'http://';
					global.OTHERSECUREURL = 'http://';
				}
				
				if(ViewedId !='' && LoginId !=''){				
					viewPrfModel.appProfileDetailsFromSphinx(LoginId,ViewedId,'PROFILEDETAILSINDEX',userDomainList,partDomainList, function(err,getProfileDetails){
						if(dbconfig.LOADTIME==1 || data.KSLOG==1){					
							console.error('Similarprofile-Time 101 in:'+ startvsp +' SLoginId :'+data.ID);
						}
						var outputArray = {};
						if(getProfileDetails.responsecode == 1 && !bmgeneric.empty(getProfileDetails[ViewedId]) && !bmgeneric.empty(getProfileDetails[LoginId])){
							var partnerInfo = getProfileDetails[ViewedId];
							var ppData = getProfileDetails[LoginId];
							if ((bminit.appviewsimilarprofileflag == 1 && ((bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE)) || (bmgeneric.in_array(data.APPTYPE,bmvars.IOSAPPTYPE)) || data.APPTYPE == 115)) && (LoginId != ViewedId) && (ppData['gender'] != partnerInfo['gender'])) {
								var stlimit = (!bmgeneric.emptyNull(data.STLIMIT)) ? data.STLIMIT : 0;
								var endlimit = (!bmgeneric.emptyNull(data.ENDLIMIT)) ? data.ENDLIMIT :20;
								outputArray['RESPONSECODE'] = 1;
								outputArray['ERRCODE'] = 0;		
								bmViewSimilar.getViewSimilarProfiles(data,partnerInfo,ppData,stlimit,endlimit,function(err,similarprofiles){
									if(dbconfig.LOADTIME==1 || data.KSLOG==1){					
										console.error('Similarprofile-Time 102 in:'+ startvsp +' SLoginId :'+data.ID);
									}
									if ((!bmgeneric.empty(similarprofiles['total_found'])) && similarprofiles['total_found'] > 0) {
										outputArray['TOTAL_FOUND'] = similarprofiles['total_found'];
										delete similarprofiles['total_found'];
										outputArray['PROFILEDET'] = similarprofiles;
										if(typeof(res)!="object")
											console.error("typeof(res)1============",typeof(res));
										if(dbconfig.LOADTIME==1 || data.KSLOG==1){
											var endvsp = +new Date();	
											console.error('Similarprofile-ENDTime in:'+ startvsp +' SLoginId :'+data.ID);
										}
										return res.send(outputArray);			
									} else {										
										if(typeof(res)!="object")
											console.error("typeof(res)2============",typeof(res));
										if(dbconfig.LOADTIME==1 || data.KSLOG==1){
											var endvsp = +new Date();	
											console.error('Similarprofile-ENDTime 0 in:'+ startvsp+' SLoginId :'+data.ID);
										}
										outputArray['TOTAL_FOUND'] = 0;
										return res.send(outputArray);
									}
								});						
							} else {								
								if(typeof(res)!="object")
									console.error("typeof(res)3============",typeof(res));
								if(dbconfig.LOADTIME==1 || data.KSLOG==1){
									var endvsp = +new Date();	
									console.error('Similarprofile-ENDTime 2 in:'+ startvsp +' SLoginId :'+data.ID);
								}
								outputArray['RESPONSECODE'] = 2;
								outputArray['ERRCODE'] = 0;
								return res.send(outputArray);
							}
						} else {							
							if(typeof(res)!="object")
								console.error("typeof(res)4============",typeof(res));
							if(dbconfig.LOADTIME==1 || data.KSLOG==1){
								var endvsp = +new Date();	
								console.error('Similarprofile-ENDTime 3 in:'+ startvsp +' SLoginId :'+data.ID);
							}
							outputArray['RESPONSECODE'] = 2;
							outputArray['ERRCODE'] = 0;
							return res.send(outputArray);
						}
					});
				} else {					
					if(typeof(res)!="object")
						console.error("typeof(res)5============",typeof(res));
					if(dbconfig.LOADTIME==1 || data.KSLOG==1){
						var endvsp = +new Date();	
						console.error('Similarprofile-ENDTime 4 in:'+ startvsp +' SLoginId :'+data.ID);
					}
					var outputArray = {};
					outputArray['RESPONSECODE'] = 2;
					outputArray['ERRCODE'] = 1;
					return res.send(outputArray);					
				}
			} else {				
				if(typeof(res)!="object")
					console.error("typeof(res)6============",typeof(res));
				if(dbconfig.LOADTIME==1 || data.KSLOG==1){
					var endvsp = +new Date();	
					console.error('Similarprofile-ENDTime 5 in:'+ startvsp +' SLoginId :'+data.ID);
				}
				var outputArray = {};
				outputArray['RESPONSECODE'] = 2;
				outputArray['ERRCODE'] = 1;
				return res.send(outputArray);				
			}
		}catch(err){
			console.error("View Similar Profile Inside Error:",err);
			var outputArray = {};
			outputArray['RESPONSECODE'] = 2;
			outputArray['ERRCODE'] = 1;
			return res.send(outputArray);	
		}
	}
		
	exports.whoviewedalsoviewed = function(req, res){
		try{
			var REQUEST = (!bmgeneric.empty(req.body)) ? req.body : req.query;
			var data = preventxss(REQUEST);
			if(dbconfig.LOADTIME==1){
				startwv = +new Date();
				console.error('WVAV-Time:'+new Date() +' and  VIEWID :'+data.VIEWID+' WVAVLoginId :'+data.ID);	
			}		
			if ((!bmgeneric.is_matriid(data.ID) && data.ID != '') || !bmgeneric.is_matriid(data.VIEWID) && data.VIEWID != '') { 
				var outputArray = {};
				outputArray['responsecode'] = 2;
				outputArray['ERRCODE'] = 2;
				res.send(outputArray);
				if(dbconfig.LOADTIME==1){
					var endwv = +new Date();	
					console.error('WVAV-ENDTime 1 in:'+ (endwv-startwv) +' WVAVLoginId :'+data.ID);
				}	
			} else if(bmgeneric.getEncryptpass(res, data)){
				var outputResult ={};
				var LoginId = data.ID;
				var ViewedId = data.VIEWID;
				data.VIEWEDID = data.VIEWID;
				//#Get the Domain details of the LoginId Id
				let userDomainList = bmgeneric.getDomainInfo(1, LoginId);
				let userDomainId = userDomainList['domainid'];
				let userDomainName = userDomainList['domainnameshort'];
				
				//#Get the Domain details of the Viewer Id
				let partDomainList = bmgeneric.getDomainInfo(1, ViewedId);
				let partDomainId = partDomainList['domainid'];
				let partDomainName = partDomainList['domainnameshort'];
					
				if(!bmgeneric.in_array(data.APPTYPE,bmvars.IOSAPPTYPE) && !bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE) && data.APPTYPE !=107){
					global.SECUREURL = 'https://';
					global.OTHERSECUREURL = 'http://';
				}else{
					global.SECUREURL = 'http://';
					global.OTHERSECUREURL = 'http://';
				}
							
				if(ViewedId !='' && LoginId !=''){
					async.parallel({
						VIEWEDALSOVIEWED:function(callback){ //Viewed Member Sphinx Data
							var APPTYPE = data.APPTYPE;						
							var selFields = "profileindex,name,age,gender,height,maritalstatus,mothertongue,religion,caste,subcasteid,gothraid,star,dosham,countryselected,residingstate,residingcityid,residingdistrict,time_created,educationid,educationselected,occupation_selected,photoavailable,photoprotected,horoscopeavailable,horoscopeprotected,phoneverified,phoneprotected,powerpackstatus,partnerprefset,last_login,specialpriv,citizenship,have_children,eatinghabits,smokinghabits,drinkinghabits,annualincomeininr,specialcase,validated,authorized,status,entrytype,thumbimg,thumbimgs,webpstatus";
							bmwhoviewed.getSphinxWhoViewed(LoginId,'PROFILEDETAILSINDEX',userDomainList,selFields, function(err,getwhoviewedDet){
								callback(null,getwhoviewedDet);
							});		
						}
					},function(error,whoviewed){
						var outputArray = {};
						if(!bmgeneric.empty(whoviewed.VIEWEDALSOVIEWED)){
							var viewProfMothTong = bmvarssearcharrincen.MOTHERTONGUEHASH_FLIP[data.OPPMOTHERTONGU];
							var sphinxResnew = whoviewed.VIEWEDALSOVIEWED[0];
							logMemAge = sphinxResnew['age']; // logged member age
							logMemGen = sphinxResnew['gender']; // logged member gender
							logMemGoth = sphinxResnew['gothraid']; // logged member gothra
							logMembPartPrefSet = sphinxResnew['partnerprefset'];
							var profileVal = {};
							profileVal['RESPONSECODE'] = 1;
							profileVal['ERRCODE'] = 0;
							bmwhoviewed.getToDisplayMatriIds(data,logMemAge,logMemGen,viewProfMothTong,logMemGoth,logMembPartPrefSet, function(err,profileValdetails){
								profileVal['TOTALFOUND'] = (profileValdetails['total_found'] >=3 )?profileValdetails['total_found']:0;
								delete profileValdetails['total_found'];
								if(profileVal['TOTALFOUND'] >= 3){
									profileVal['PROFILES'] = profileValdetails;
								}
								res.send(profileVal);
								if(dbconfig.LOADTIME==1){
									var endwv = +new Date();	
									console.error('WVAV-ENDTime in:'+ (endwv-startwv) +' WVAVLoginId :'+data.ID);
								}	
							});
						} else{
							outputArray['RESPONSECODE'] = 2;
							outputArray['ERRCODE'] = 2;
							res.send(outputArray);
							if(dbconfig.LOADTIME==1){
								var endwv = +new Date();	
								console.error('WVAV-ENDTime 2 in:'+ (endwv-startwv) +' WVAVLoginId :'+data.ID);
							}	
						}
					});
				} else {
					if(dbconfig.LOADTIME==1){
						var endwv = +new Date();	
						console.error('WVAV-ENDTime 3 in:'+ (endwv-startwv) +' WVAVLoginId :'+data.ID);
					}	
					var outputArray = {};
					outputArray['RESPONSECODE'] = 2;
					outputArray['ERRCODE'] = 1;
					res.send(outputArray);
				}
			} else {
				if(dbconfig.LOADTIME==1){
					var endwv = +new Date();	
					console.error('WVAV-ENDTime 4 in:'+ (endwv-startwv) +' WVAVLoginId :'+data.ID);
				}	
				var outputArray = {};
				outputArray['RESPONSECODE'] = 2;
				outputArray['ERRCODE'] = 1;
				res.send(outputArray);
			}
		}catch(err){			
			console.log("View Similar Profile Inside Error:",err);
			var outputArray = {};
			outputArray['RESPONSECODE'] = 2;
			outputArray['ERRCODE'] = 1;
			res.send(outputArray);
		}
	}
