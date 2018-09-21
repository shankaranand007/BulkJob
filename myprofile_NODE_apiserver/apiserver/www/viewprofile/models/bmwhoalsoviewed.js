/**********************************************************************************************
File    : bmviewsimilarfunc.js
Author  : Sathrak Paldurai k
Date    : 30-Aug-2016
************************************************************************************************
Description : 	Similar Profiles Display Based on Partnerprofile.
*********************************************************************************************/

	exports.getSphinxWhoViewed = function(LoginId,indexname,uDomainList,selFields,wvavcallback){
		var udomainname = bmgeneric.allucwords(uDomainList['domainnameshort']);
		var index_name = APPSPHINXINDEXNAME[udomainname][indexname];
		var SphinxId = bmgeneric.covertToSphinxId(LoginId);		
		var whereClause = "profileindex =? ";
		var whereValueArr = [parseInt(SphinxId)];
		var max_matches = 'max_matches=100';
		var querycmt = "# "+dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss") +" "+ LoginId +" - ViewAlsoViewed - Display in view profile page #";
		var SERHOST = bmSphinxDb.getViewProfileDomainInfo();
		var SelQuery = {HOST:SERHOST,INDEXNAME:index_name,SELECTFIELDS:selFields,WHERECLAUSEVAL:whereClause,MAXMATCHES:max_matches,QRYCMNT:querycmt};		
		bmSphinxDb.bmDbSelect(1, SERHOST, index_name, selFields, whereClause, whereValueArr, max_matches, querycmt, 1, function(err,memberData){
			if(!err){
				wvavcallback(null,memberData);
			} else {
				var memberData = {};
				wvavcallback(err,memberData);
			}
		});
	}
	
	exports.getToDisplayMatriIds = function(data,logMemAge,logMemGen,viewProfMothTong,logMemGoth,logMembPartPrefSet, callbackto){
		try{
			var LoginId = bmgeneric.ucwords(data.ID);
			var ViewedId = bmgeneric.ucwords(data.VIEWID);
			var domaininfoarr 	= bmgeneric.getDomainInfo(1,ViewedId);
			async.parallel({
				SOLRRSULT : function(callback){
					if(bminit.WVAVSOLARFLAG == 0){
						var index_name = SPHINXINDEXNAME[bmgeneric.strtoupper(domaininfoarr['domainnameshort'])]['WVAVINDEX'];
						var SphinxId = bmgeneric.covertToSphinxId(ViewedId);
						var SERHOST	= bmSphinxDb.sphinxgetWVAVDomainInfo(ViewedId);
						var max_matches = 'max_matches=100';
						var querycmt = "# "+dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss") +" "+ LoginId +" - ViewAlsoViewed - Display in view profile page #";
						var selFields = 'profileindex';
						var whereClause = 'profileindex =?';
						var whereValueArr = [parseInt(SphinxId)];
						bmSphinxDb.bmDbSelect(6, SERHOST, index_name, selFields, whereClause, whereValueArr, max_matches, querycmt, 1, function(err,memberData){
							if(!err){
								callback(null,memberData);
							} else {
								var memberData = {};
								callback(err,memberData);
							}
						});
					}else if(bminit.WVAVSOLARFLAG==1){
						var SphinxId = bmgeneric.covertToSphinxId(ViewedId);
						var urlStringData = global.OTHERSECUREURL+global.wvavcurlip+"/solr/"+bmgeneric.ucwords(domaininfoarr['domainnameshort'])+"/select?q=viewerid:"+SphinxId+"&wt=json&indent=true";
						request({
							headers: {'content-type' : 'application/x-www-form-urlencoded'},
							url: urlStringData,
							method: 'POST',
							timeout: 3000,
						},
						function (error, response, curlres) {
							if (error) {
								console.error("WVAV Solar Error :"+error);
								var memberData = {};
								callback(error,memberData);
							} else {							
								var solarArr = JSON.parse(curlres);						
								var relatedSphnixIds ={};
								if(!solarArr['error']){
									if(solarArr["response"]["numFound"]==1){
										relatedSphnixIds = bmgeneric.explode(",",solarArr["response"]["docs"][0]["viewedid"]);
									}
								} else {
									console.error("Solar Error=============:"+solarArr['error']);
								}
								callback(error,relatedSphnixIds);
							}
						});	
					}
				}
			},function(error,solrdata){
				var relatedSphnixIds ={}
				if(!bmgeneric.empty(solrdata.SOLRRSULT)){
					relatedSphnixIds = solrdata.SOLRRSULT.slice(0,5000);
					var whoMemCache = 'wvavSphinxArray_'+LoginId+'_'+ViewedId;
					Cache.set(whoMemCache,relatedSphnixIds);
				}		
				bmwhoviewed.getToDisplayMatriIdsByAjax(LoginId,ViewedId,logMemAge,logMemGen,relatedSphnixIds,viewProfMothTong,logMemGoth,logMembPartPrefSet,data, function(err, wvalvck){
					callbackto(err,wvalvck);
				});
			});		
		}catch(err){
			console.log("getToDisplayMatriIds Function Error:",err);			
			return callbackto(err,{});
		}
	}
	
	exports.getToDisplayMatriIdsByAjax = function(LoginId,ViewedId,logMemAge,logMemGen,relatedSphnixIds,viewProfMothTong,logMemGoth,logMembPPSet,data, wvalvcallback){
		try{			
			async.parallel({
				GETINDEX:function(callnack){
					var ProfileIndex = '';
					if(logMemGen=='M')
					{
						var ProfileIndex = bmgeneric.getProfileIndexName(0, [viewProfMothTong]); 
					}else if(logMemGen=='F'){
						var ProfileIndex = bmgeneric.getProfileIndexName(1, [viewProfMothTong]); 
					}
					callnack(null,ProfileIndex);
				},
				GETMEMPP:function(callback){
					if(logMembPPSet!=1){ 
						Cache.get("SYSTEMPP-"+LoginId, function(err,memppdetail){
							if(!err){							
								if(memppdetail==''){
									bmwhoviewed.setmemberpp(LoginId, function(err,ppval){
										if(!err){
											if(bmgeneric.count(ppval) > 0 ) {
												return callback(err,ppval["SYSTEMPP"]);
											} else{callback(err,memppdetail);}
										} else {
											callback(err,memppdetail);
										}
									});
								} else{
									callback(err,memppdetail);
								}
							} else {
								callback(err,{});
							}
						});
					}else{ //#For Match Profiles and Preferred Profiles
						Cache.get("PP-"+LoginId, function(err,memppdetail){
							if(!err){							
								if(memppdetail==''){
									bmwhoviewed.setmemberpp(LoginId, function(err,ppval){
										if(!err){
											if(bmgeneric.count(ppval) > 0 ) {
												return callback(err,ppval["PP"]);
											} else {callback(err,memppdetail);}
										} else {
											callback(err,memppdetail);
										}
									});
								} else{
									callback(err,memppdetail);
								}
							} else {
								callback(err,{});
							}
						});
					} 
				}
			},function(err,Reslt){
				var SERHOST = bmSphinxDb.sphinxgetDomainInfo();
				var startLimit = (data.STARTLIMIT !='') ? data.STARTLIMIT : 0;
				var endLimit = (data.ENDLIMIT !='') ? data.ENDLIMIT : 20;
				var SetSelect ="profileindex,name,age,height,maritalstatus,mothertongue,religion,caste,subcasteid,gothraid,star,dosham,countryselected,residingstate,residingcityid,residingdistrict,time_created,educationid,educationselected,occupation_selected,photoavailable,photoprotected,horoscopeavailable,horoscopeprotected,phoneverified,phoneprotected,powerpackstatus,partnerprefset,last_login,specialpriv,citizenship,have_children,eatinghabits,smokinghabits,drinkinghabits,annualincomeininr,photorank,specialcase,validated,authorized,status,entrytype,thumbimg,thumbimgs,interestreceivedcount,webpstatus";				
				var stAge = endAge = 0;
				if(logMemAge!="" && logMemAge!=0)
				{
					if(logMemGen=="M")
					{
						decreaseLmAge = (logMemAge<=18)? "18" : logMemAge-5; // decreased age of logged member
						stAge = decreaseLmAge;
						endAge = logMemAge;
					}else{
						increaseLmAge = logMemAge+5; // increased age of logged member
						stAge = logMemAge;
						endAge = increaseLmAge;
					}
				}
				var whereClause = " Validated =? and Authorized =? and Status IN(?,?,?) and Deleted=? and Age >= ? and Age <= ? ";
				var whereValueArr = [1,1,0,3,6,0,parseInt(stAge),parseInt(endAge)];
				if(!bmgeneric.empty(relatedSphnixIds)){				
					var exceptProArray = bmgeneric.covertToSphinxId(ViewedId);
					var found = bmgeneric.array_search(exceptProArray,relatedSphnixIds);
					if(found !== false){
						relatedSphnixIds = relatedSphnixIds.filter(e => e !== found);
					}			
					whereClause +=" and ProfileIndex IN("+relatedSphnixIds+") ";		
				} else {	
					var exceptProArray = bmgeneric.covertToSphinxId(ViewedId);
					whereClause +=" and ProfileIndex != "+exceptProArray+" ";
				}
				var SphLoginId = bmgeneric.covertToSphinxId(LoginId);
				
				whereClause += " and declinedme != "+SphLoginId+" ";
				whereClause += " and ignoredme != "+SphLoginId+" ";
				whereClause += " and contactedme != "+SphLoginId+" ";			
				var index_name = Reslt.GETINDEX;
				var mempparrdetail = bmgeneric.explode("|",Reslt.GETMEMPP);
				var gothra = bmgeneric.explode("~",mempparrdetail[16]);
				if(bmgeneric.in_array(998, gothra) && logMemGoth > 0) //998 - All; applicable only for logged in members; All Except members gothra has to be retrieved.
				{	
					whereClause += " and GothraId != "+logMemGoth+" ";	
				}else if(!bmgeneric.in_array("0",gothra) && !bmgeneric.in_array(998,gothra)){
					whereClause += " and GothraId IN("+logMemGoth+") ";				
				}
				
				if(bminit.mobileverifysuperflag == 1 && bminit.blockuseractionflag == 1)
					whereClause += " and PhoneVerified IN(1,3) ";
					
				whereClause += " ORDER BY last_login DESC ";
				var startLimit = (!bmgeneric.empty(startLimit)) ? startLimit : 0;
				var endLimit = (!bmgeneric.empty(endLimit)) ?parseInt(endLimit) : 20;
				whereClause += " limit "+startLimit+","+endLimit+" ";
				var max_matches = 'max_matches=5000';
				var querycmt = "# "+dateFormat(new Date(),"yyyy-mm-dd HH:MM:ss") +" "+ ViewedId +" - ViewAlsoViewed - Display in view profile page #";
				bmSphinxDb.bmDbSelect(1, SERHOST, index_name, SetSelect, whereClause, whereValueArr, max_matches, querycmt, 2, function(err,sphinxResnew){
					if(!err){
						var profileres = {};
						profileres['total_found'] = sphinxResnew["TOTAL_FOUND"];
						if(sphinxResnew['TOTAL_FOUND'] > 0){
							bmViewSimilar.setBasicViews(data,sphinxResnew['RESULTS'],function(err,incout){
								profileres['WHOVIEWEDALSOVIEWED'] = incout;
								wvalvcallback(err,profileres);
							});
						} else{
							wvalvcallback(err,profileres);
						}
					} else {
						var memberData = {};
						wvalvcallback(err,memberData);
					}
				});
			});
		}catch(err){
			console.log("getToDisplayMatriIdsByAjax Function Error:",err);			
			return wvalvcallback(err,{});
		}
	}

	//# Set PP Values
	exports.setmemberpp = function(memberid, callback){
		try{
			if(memberid != "") {
				var domaindetails = bmgeneric.getDomainInfo(1,memberid);
				var domainlanguage = bmgeneric.strtoupper(domaindetails['domainnameshort']);
				var qrycmt = "";
				var whereClause        = "MatriId=? ";
				var whereClauseVal     = [memberid];
				var selectFields  = 'StAge,EndAge,StHeight,EndHeight,MatchMaritalStatus,PhysicalStatus,MotherTongue,MatchReligion,Manglik,MatchCaste,EatingHabitsPref,MatchEducation,MatchCitizenship,MatchCountry,MatchIndianStates,MatchUSStates,MatchResidentStatus,MatchLanguage,SysStAge,SysEndAge,SysStHeight,SysEndHeight,SysMatchMaritalStatus,SysPhysicalStatus,SysMotherTongue,SysMatchReligion,SysManglik,SysMatchCaste,SysEatingHabitsPref,SysMatchEducation,SysMatchCitizenship,SysMatchCountry,SysMatchIndianStates,SysMatchUSStates,SysMatchResidentStatus,GothraId,StIncome,EndIncome,SysGothraId,SysStIncome,SysEndIncome,MatchOccupationSelected,SysMatchOccupationSelected,MatchSubCaste,SysMatchSubCaste,HavingChildren,SysHavingChildren,DrinkingHabitsPref,SmokingHabitsPref,MatchIndianCity,StarId,IncludeOtherReligions';
				var dbHost = bmDb.bmDbConnById(2, memberid, 'S');
				bmDb.bmDbSelect(dbHost,DBNAME['MATRIMONYMS'],DOMAINTABLE[domainlanguage]['MATCHWATCH'],selectFields, whereClause,whereClauseVal,qrycmt, function(err,selectres){
					if(!err){
						try{
							if(!bmgeneric.empty(selectres)){
								var prow = selectres[0];
								matchmanglik = prow['Manglik'];
								if(bmgeneric.trim(matchmanglik)=='')
									matchmanglik=0;
								matcheatinghabits=prow['EatingHabitsPref'];
								if(bmgeneric.trim(matcheatinghabits)=='')
									matcheatinghabits=0;
								matchindianstates=prow['MatchIndianStates'];
								if(bmgeneric.trim(matchindianstates)=='')
									matchindianstates=0;
								matchusstates=prow['MatchUSStates'];
								if(bmgeneric.trim(matchusstates)=='')
									matchusstates=0;
								matchresidentstatus=prow['MatchResidentStatus'];
								if(bmgeneric.trim(matchresidentstatus)=='')
									matchresidentstatus=0;
								matchlanguage=prow['MatchLanguage'];
								if(bmgeneric.trim(matchlanguage)=='')
									matchlanguage=0;
								sysmatchmanglik=prow['SysManglik'];
								if(bmgeneric.trim(sysmatchmanglik)=='')
									sysmatchmanglik=0;
								sysmatcheatinghabits=prow['SysEatingHabitsPref'];
								if(bmgeneric.trim(sysmatcheatinghabits)=='')
									sysmatcheatinghabits=0;
								sysmatchindianstates=prow['SysMatchIndianStates'];
								if(bmgeneric.trim(sysmatchindianstates)=='')
									sysmatchindianstates=0;
								sysmatchusstates=prow['SysMatchUSStates'];
								if(bmgeneric.trim(sysmatchusstates)=='')
									sysmatchusstates=0;
								sysmatchresidentstatus=prow['SysMatchResidentStatus'];
								if(bmgeneric.trim(sysmatchresidentstatus)=='')
									sysmatchresidentstatus=0;
								var partnerprefvalue = prow['StAge']+'~'+prow['EndAge']+'|'+prow['StHeight']+'~'+prow['EndHeight']+'|'+prow['MatchMaritalStatus']+'|'+prow['PhysicalStatus']+'|'+prow['MotherTongue']+'|'+prow['MatchReligion']+'|'+matchmanglik+'|'+prow['MatchCaste']+'|'+matcheatinghabits+'|'+prow['MatchEducation']+'|'+prow['MatchCitizenship']+'|'+prow['MatchCountry']+'|'+matchindianstates+'|'+matchusstates+'|'+matchresidentstatus+'|'+matchlanguage+'|'+prow['GothraId']+'|'+prow['StIncome']+'|'+prow['EndIncome']+'|'+prow['MatchOccupationSelected']+'|'+prow['MatchSubCaste']+'|'+prow['HavingChildren']+'|'+prow['DrinkingHabitsPref']+'|'+prow['SmokingHabitsPref']+'|'+prow['MatchIndianCity']+'|'+prow['StarId']+'|'+prow['IncludeOtherReligions'];
								var partnerprefcookievalue = partnerprefvalue.replace(/,/gi, '~');		
								
								var sSysPartPref = prow['SysStAge']+'~'+prow['SysEndAge']+'|'+prow['SysStHeight']+'~'+prow['SysEndHeight']+'|'+prow['SysMatchMaritalStatus']+'|'+prow['SysPhysicalStatus']+'|'+prow['SysMotherTongue']+'|'+prow['SysMatchReligion']+'|'+sysmatchmanglik+'|'+prow['SysMatchCaste']+'|'+sysmatcheatinghabits+'|'+prow['SysMatchEducation']+'|'+prow['SysMatchCitizenship']+'|'+prow['SysMatchCountry']+'|'+sysmatchindianstates+'|'+sysmatchusstates+'|'+sysmatchresidentstatus+'|0|'+prow['SysGothraId']+'|'+prow['SysStIncome']+'|'+prow['SysEndIncome']+'|'+prow['SysMatchOccupationSelected']+'||'+prow['SysHavingChildren']+'|||||'+prow['IncludeOtherReligions'];
								
								var sSysPartPrefCookie = sSysPartPref.replace(/,/gi, '~');
								
								var ppkey="PP-"+memberid;								
								var sysppkey="SYSTEMPP-"+memberid;
								Cache.set(ppkey,partnerprefcookievalue);
								Cache.set(sysppkey,sSysPartPrefCookie);							
								var arrPPValue = {};
								arrPPValue['PP'] = partnerprefcookievalue;
								arrPPValue['SYSTEMPP'] = sSysPartPrefCookie;
								return callback(null,arrPPValue);
							}else{
								callback(null,{});
							}
						}catch(err){
							console.log("setmemberpp Function 1 Error:",err);								
							return callback(err,{});
						}
					} else{
						callback(null,{});
					}
				});	
			} else {
				callback(null,{});
			}
		}catch(err){
			console.log("setmemberpp Function Error:",err);			
			return callback(err,{});
		}
	}