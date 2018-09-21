/**********************************************************************************************
File    : checkonlinestatus.js
Author  : Sathrak Paldurai k
Date    : 30-Aug-2016
************************************************************************************************
Description: Get member online status from SphinxRT
***********************************************************************************************/
	var VPModelFunc = {
		appProfileDetailsFromSphinx:function(MatriId,ViewedId,indexname,uDomainList,pDomainList,callbackm){
			try{				
				var partDomainId = pDomainList['domainid'];
				var userDomainId = uDomainList['domainid'];
				var udomainname = bmgeneric.allucwords(uDomainList['domainnameshort']);
				var uindex_name = APPSPHINXINDEXNAME[udomainname][indexname];
				
				var index_name = uindex_name;
				if (partDomainId != userDomainId) {
					var pdomainname = bmgeneric.allucwords(pDomainList['domainnameshort']);	
					var pindex_name = bmgeneric.trim(SPHINXINDEXNAME[pdomainname][indexname]);
					index_name = uindex_name+","+pindex_name;
				}
				
				if(MatriId == ViewedId){
					var SphinxId = bmgeneric.covertToSphinxId(MatriId);
					var whereClause = "profileindex = "+SphinxId+" and deleted=0 ";				
				} else{
					var SphinxId = bmgeneric.covertToSphinxId(MatriId);	
					var ViewId = bmgeneric.covertToSphinxId(ViewedId);				
					var whereClause = "profileindex IN(?,?) and deleted=? ";					
					var whereValueArr = [parseInt(SphinxId),parseInt(ViewId),0];
				}
									
				//View Profile Index Fields matchmanglik
				var selectFields ="profileindex,status,validated,authorized,entrytype,specialpriv,gender,powerpackstatus,name,age,maritalstatus,noofchildren,childrenlivingstatus,height,bodytype,complexion,bloodgroup,profileweight,specialcase,mothertongue,religion,caste,relatedcaste,casteothers,subcaste,subcasteid,castenobar,gothra,gothraid,star,raasi,suddhajadhagam,dosham,zodiacsign,eatinghabits,smokinghabits,drinkinghabits,educationselected,educationid,education,educationaddon,occupationcategory,occupationselected,occupation,incomecurrency,annualincome,citizenship,countryselected,residentstatus,residingstate,residingarea,residingdistrict,residingcity,residingcityid,profileverified,phoneverified,phoneprotected,profiledescription,familydetailsavailable,hobbiesavailable,filtersavailable,privacysetting,photoavailable,photoprotected,horoscopeavailable,horoscopeprotected,horoscopematch,videoavailable,voiceavailable,healthprofileavailable,referenceavailable,partnerprefset,bywhom,last_login,time_created,deleted,powerpackopted,soft_tag,thumbimg,thumbimgs,mobile_verified_on,lastpayment,happymarriageopt,institutionname,matchmaritalstatus,matchhavingchildren,matchstage,matchendage,matchstheight,matchendheight,matchphysicalstatus,matchmothertongue,matchreligion,matchcaste,matchsubcaste,matchgothraid,matchmanglik,matcheatinghabitspref,matcheducation,matchoccupationselected,matchstincome,matchendincome,matchcitizenship,matchcountry,matchindianstates,matchusstates,matchindiancity,matchresidentstatus,matchstarid,matchdrinkinghabitspref,matchsmokinghabitspref,partnerdescription,excludecasteids,excludecityids,excludeeducationids,excludeoccupationids,sysmatchmaritalstatus,syshavingchildren,sysstage,sysendage,sysstheight,sysendheight,sysphysicalstatus,sysmothertongue,sysmatchreligion,sysmatchcaste,sysmatchsubcaste,sysgothraid,sysmanglik,syseatinghabitspref,sysmatcheducation,sysmatchoccupationselected,sysmatchcitizenship,sysmatchcountry,sysmatchindianstates,sysmatchusstates,sysmatchresidentstatus,matcheducationid,sysmatcheducationid,familyvalue,familytype,familystatus,fatheroccupation,motheroccupation,ancestralorigin,ancestralstate,brothers,sisters,brothersmarried,sistersmarried,familydescription,hobbiesselected,hobbiesothers,interestsselected,interestsothers,musicselected,musicothers,booksselected,booksothers,moviesselected,moviesothers,sportsselected,sportsothers,foodselected,foodothers,dressstyleselected,dressstyleothers,languagesselected,languagesothers,photourl,matrimonyboosteravailable,annualincomeininr,have_children,occupation_selected,ppincludeotherreligions,exclude_ppgothra_id,profilepublishedon,numberofpayments,expirydate,logincount,webnotification,birthdate,webpstatus,activityrank";
								
				var SelQuery = {HOST:"VIEWPROFILELB_SPHINXRC2",INDEXNAME:index_name,SELECTFIELDS:selectFields,WHERECLAUSEVAL:whereClause,WHEREVALUEARR:whereValueArr,MAXMATCHES:100,QRYCMNT:"#View Profile Index#"};				
				var max_matches = 'max_matches=100';
				var querycmt = "Node - View Profile Index";
				var hostName = 'VIEWPROFILELB_SPHINXRC2';
				bmSphinxDb.bmDbSelect(1, hostName, index_name, selectFields, whereClause, whereValueArr, max_matches, querycmt, 1, function(err,memberData){
					if(!err){	
						var viewprofileOutput = {};						
						if(memberData.length >= 1){						
							viewprofileOutput['responsecode'] = 1;
							viewprofileOutput['errcode'] = 0;						
							var sphinxRecord = memberData;												
							var matcharray ={"relatedcaste":1,"soft_tag":1,"matchmaritalstatus":1,"matchmothertongue":1,"matchreligion":1,"matchcaste":1,"matchsubcaste":1,"matchgothraid":1,"matchmanglik":1,"matcheatinghabitspref":1,"matcheducation":1,"matchoccupationselected":1,"matchcitizenship":1,"matchcountry":1,"matchindianstates":1,"matchusstates":1,"matchindiancity":1,"matchresidentstatus":1,"matchstarid":1,"matchdrinkinghabitspref":1,"matchsmokinghabitspref":1,"sysmatchmaritalstatus":1,"sysmothertongue":1,"sysmatchreligion":1,"sysmatchcaste":1,"sysmatchsubcaste":1,"sysgothraid":1,"sysmanglik":1,"syseatinghabitspref":1,"sysmatcheducation":1,"sysmatchoccupationselected":1,"sysmatchcitizenship":1,"sysmatchcountry":1,"sysmatchindianstates":1,"sysmatchusstates":1,"sysmatchresidentstatus":1,"matcheducationid":1,"sysmatcheducationid":1,"excludecasteids":1,"excludecityids":1,"excludeeducationids":1,"excludeoccupationids":1};
							async.each(memberData, function(sphinxRecord,inFCb) 
							{								
								var user = [];	
								async.each(Object.keys(sphinxRecord), function(k,inCb) 
								{
									if(sphinxRecord.hasOwnProperty(k)) {
										if(matcharray.hasOwnProperty(k)){
											user[k] = sphinxRecord[k].split(",");
										} else if(k == 'profileindex'){
											user[k] = sphinxRecord[k];
											user['matriid'] = bmgeneric.converToMatriId(sphinxRecord[k]);
										} else {
											user[k] = sphinxRecord[k];
										}									  
									} 
									inCb(null);  // inner callback
								}, function(err) {
									viewprofileOutput[user['matriid']] = user;
									inFCb(null);  // outer callback
								});
							}, function(err) {
								if(memberData.length ==1){
									if(bmgeneric.empty(viewprofileOutput[MatriId])){
										var lgender = (viewprofileOutput[ViewedId]['gender'] =='F') ? 'M' : 'F';
										viewprofileOutput[MatriId] ={profileindex:SphinxId,matriid:MatriId,gender:lgender,entrytype:'F'};
									}
								}	
								callbackm(null,viewprofileOutput);
							});
						} else {						
							//var Lid = (!bmgeneric.empty(memberData[0]) ? memberData[0]['profileindex'] : "EMPTY:"+MatriId)
							//var Pid = (!bmgeneric.empty(memberData[1]) ? memberData[1]['profileindex'] : "EMPTY:"+ViewedId)
							//console.error(MatriId+" :==: "+ViewedId+" :==memberData==LoginId: "+Lid+" ViewedId==== : "+Pid+"==index_name=="+index_name);
							viewprofileOutput['errcode'] = 0;
							viewprofileOutput['responsecode'] = 1;
							callbackm(null,viewprofileOutput);
						}
					} else {						
						callbackm(null,err);
					}
				});
			}catch(err){
				console.log("Error On: File Name - onlinemodel.js:",err);
				var viewprofileOutput = {};							
				viewprofileOutput['responsecode'] = 0;
				viewprofileOutput['errcode'] = 0;
				viewprofileOutput['Error'] = "SELECT_QRY_WHERE-CLAUSE-ERR__DB-TBL-ERR__SELECT-FIELD-NOTARRAY";viewprofileOutput['PARAMETER'] = SelQuery;
				callback(viewprofileOutput,viewprofileOutput);
				return false; 
			}
		},
		appProfileDetailsFromDb : function(MatriId,dbName,tableName,callbackdb){
			try{
				var matriid = bmgeneric.ucwords(MatriId);
				var selectFields = "MatriId,Status,Authorized,Validated,EntryType,SpecialPriv,PowerPackStatus,Name,Age,Gender,MaritalStatus,NoOfChildren,ChildrenLivingStatus,InCms,Height,BodyType,Complexion,BloodGroup,InLbs,Weight,SpecialCase,MotherTongue,Religion,Caste,SubCaste,SubCasteId,CasteNoBar,Gothra,GothraId,Star,Raasi,Dosham,EatingHabits,SmokingHabits,DrinkingHabits,EducationSelected,Education,OccupationCategory,OccupationSelected,Occupation,IncomeCurrency,AnnualIncome,Citizenship,CountrySelected,ResidentStatus,ResidingState,ResidingArea,ResidingDistrict,ResidingCity,ProfileVerified,PhoneVerified,ProfileDescription,FamilyDetailsAvailable,HobbiesAvailable,FiltersAvailable,PrivacySetting,PhotoAvailable,PhotoProtected,HoroscopeAvailable,HoroscopeProtected,HoroscopeMatch,PartnerPrefSet,LastLogin,TimeCreated,ByWhom,PhoneProtected,ResidingCityId,ZodiacSign,EducationId,MotherTongueOthers,CasteOthers,WebNotification,SpecialPriv,AnnualIncomeinINR,ActivityRank";
				var qrycmt = "# Select Matrimony Profiles - DB#"
				var whereClause = " MatriId=? ";	
				var whereClauseVal = [matriid];
				var dbhost = bmDb.bmDbConnById(2, matriid, 'S');
				bmDb.bmDbSelect(dbhost, dbName, tableName, selectFields, whereClause, whereClauseVal, qrycmt, function(err,memberData){
					if(!err){					
						var viewprofileOutput = {};	
						if(memberData.length > 0){
							viewprofileOutput['responsecode'] = 1;
							viewprofileOutput['errcode'] = 0;
							var mysqloutput = bmgeneric.array_change_key_case(memberData[0],'CASE_LOWER');
							//console.log("mysqloutput :",mysqloutput);
							viewprofileOutput[matriid] = mysqloutput;
							callbackdb(null,viewprofileOutput);
						} else {
							viewprofileOutput['responsecode'] = 0;
							viewprofileOutput['errcode'] = 0;
							callbackdb(null,viewprofileOutput);
						}
					} else {
						callbackdb(null,memberData);
					}
				});
			}catch(err){
				console.log("Error On: File Name -vpmodel.js:",err);
				var viewprofileOutput = {};							
				viewprofileOutput['responsecode'] = 0;
				viewprofileOutput['errcode'] = 0;
				viewprofileOutput['Error'] = err;
				callback(viewprofileOutput,viewprofileOutput);
			}
		},
		appCheckValidateStatus:function(LoginId,ViewedId,getProfileDetails,APPTYPE,callback){
			try{
				var viewprofileOutput = {};
				if(!bmgeneric.empty(getProfileDetails[ViewedId])){
					if(LoginId != getProfileDetails[ViewedId]['matriid']){
						var sphinx_record = getProfileDetails[ViewedId];
						var viewStatus = bmgeneric.trim(parseInt(sphinx_record.status));						
						if(viewStatus != ''){
							if(bmgeneric.trim(parseInt(sphinx_record.validated)) == 0 || bmgeneric.trim(parseInt(sphinx_record.authorized)) == 0){
								viewprofileOutput['responsecode'] = 2;
								if(bmgeneric.array_search(APPTYPE, bmvars['ANDROIDAPPTYPE'])){
									viewprofileOutput['errcode'] = 117;
								} else {
									viewprofileOutput['errcode'] = 7;
								}
								callback(null,viewprofileOutput);
							} else if (viewStatus != 0 && viewStatus != 3 && viewStatus != 6) {
								if (viewStatus == 1) {
									//partner profile hidden
									viewprofileOutput['responsecode'] = 2;
									viewprofileOutput['errcode'] = 6;
									callback(null,viewprofileOutput);
								} else if (viewStatus == 2) {
									//partner profile suspended
									viewprofileOutput['responsecode'] = 2;
									viewprofileOutput['errcode'] = 5;
									callback(null,viewprofileOutput);
								} else if (viewStatus == '' || viewStatus == 4 || viewStatus == 5) {
									//Partner profile does not exist
									viewprofileOutput['responsecode'] = 2;
									viewprofileOutput['errcode'] = 4;
									callback(null,viewprofileOutput);
								} else {
									viewprofileOutput['responsecode'] = 2;
									viewprofileOutput['errcode'] = 4;
									callback(null,viewprofileOutput);
								}
							} else if (parseInt(sphinx_record.phoneverified) != 1 && parseInt(sphinx_record.phoneverified) != 3) {
								//phone not verified Ids
								viewprofileOutput['responsecode'] = 2;
								viewprofileOutput['errcode'] = 98;
								callback(null,viewprofileOutput);
							}else if(bmvars.VPLIMITFlag==1 && APPTYPE==115){								
  								var keyMax = bmgeneric.getDate("yyyy-mm-dd");
								Cache.get('vpcount_'+keyMax+'_'+LoginId,function(err,MemRest){
									if(MemRest==NaN || bmgeneric.empty(MemRest)|| MemRest=={}){
										callback(null,getProfileDetails);
										Cache.set('vpcount_'+keyMax+'_'+LoginId,1);
									}else{
										Cache.get('vpcount_'+keyMax+'_'+LoginId,function(err,MemRest){
											if(parseInt(MemRest)<=bmvars.VPcountFlag){
												callback(null,getProfileDetails);
												Cache.set('vpcount_'+keyMax+'_'+LoginId,parseInt(MemRest)+1);
											}else{
												viewprofileOutput['responsecode'] = 2;
												viewprofileOutput['errcode'] = 1;
												callback(null,viewprofileOutput);
												var writeTxtFile=LoginId+'_'+keyMax+'\n';
												var filename = "/home/node/dberrorlog/vpMaxLimit_"+keyMax+".txt";			
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
										});
									}
								});	
							} else {
								callback(null,getProfileDetails);
							}
						} else {							
							viewprofileOutput['responsecode'] = 2;
							viewprofileOutput['errcode'] = 4;
							callback(null,viewprofileOutput);
						}										
					} else {
						callback(null,getProfileDetails);
					}
				} else {					
					viewprofileOutput['responsecode'] = 2;
					viewprofileOutput['errcode'] = 4;
					callback(null,viewprofileOutput);
				}	
			}catch(err){
				console.error("Error at func - appCheckValidateStatus:",err);
				viewprofileOutput['responsecode'] = 2;
				viewprofileOutput['errcode'] = 1;
				return callback(err,viewprofileOutput);;
			}
		},
		//#Function to get the Label of the profile detail
		profileCreatedByLabel:function(viewMembProfDet,APPTYPE) {
			try{
				vpjson_label = bmvarsviewprofilelabel.ENGLISH;
				//console.log("vpjson_label :",vpjson_label);
				var viewprofile_title = {};
				if (bmgeneric.trim(viewMembProfDet['gender']) == 'M') {
					interest_profile = vpjson_label.l_interest_his;
					few_about = vpjson_label.l_few_words_about_him;
					more_about = vpjson_label.l_more_abt_him;
					about_family = vpjson_label.l_about_his_family;
					hobb_interest = vpjson_label.l_his_hobbies;
					parent_interest_profile = vpjson_label.l_interest_son;
					relative_interest_profile = vpjson_label.l_interest_bro;
					parent_few_about = vpjson_label.l_few_words_about_my_son;
					relative_few_about = vpjson_label.l_few_words_about_my_brother;
				} else if (bmgeneric.trim(viewMembProfDet['gender']) == 'F') {
					interest_profile = vpjson_label.l_interest_her;
					few_about = vpjson_label.l_few_words_about_her;
					more_about = vpjson_label.l_more_abt_her;
					about_family = vpjson_label.l_about_her_family;
					hobb_interest = vpjson_label.l_her_hobbies;
					parent_interest_profile = vpjson_label.l_interest_daughter;
					relative_interest_profile = vpjson_label.l_interest_sis;
					parent_few_about = vpjson_label.l_few_words_about_my_daughter;
					relative_few_about = vpjson_label.l_few_words_about_my_sister;
				}
				viewprofile_title['label_created'] = vpjson_label.l_profile_created_by;
				viewprofile_title['label_created_whom'] = (!bmgeneric.empty(bmvarsviewarren.PROFILECREATEDBYHASHEXT[viewMembProfDet['bywhom']])) ? bmvarsviewarren.PROFILECREATEDBYHASHEXT[viewMembProfDet['bywhom']] : ' - ';
				if (viewMembProfDet['bywhom'] && bmgeneric.trim(viewMembProfDet['bywhom']) == '1') {
					viewprofile_title['looking_for'] = vpjson_label.l_what_i_am_looking_for;
					viewprofile_title['partner_preference'] = vpjson_label.l_my_partner_preference;
				} else {
					viewprofile_title['looking_for'] = vpjson_label.l_what_we_are_looking_for;
					viewprofile_title['partner_preference'] = vpjson_label.l_partner_preference;
				}
				switch (parseInt(bmgeneric.trim(viewMembProfDet['bywhom']))) {
					case 4://By Relatives
					case 5://By Friends
					case 6://By others(Old registration)
					case 7://By others(Old registration)
					case 0://invalid
					case 3://invalid
					case 12://invalid
						viewprofile_title['interest_profile'] = interest_profile;
						viewprofile_title['few_about'] = few_about;
						viewprofile_title['more_about'] = more_about;
						viewprofile_title['about_family'] = about_family;
						viewprofile_title['hobbies_interest'] = hobb_interest;
						break;
					case 2://By Parents(Old registration)
					case 8://By Parents(for son)
					case 9://By Parents(for daughter)
						viewprofile_title['interest_profile'] = parent_interest_profile;
						viewprofile_title['few_about'] = parent_few_about;
						viewprofile_title['more_about'] = more_about;
						viewprofile_title['about_family'] = vpjson_label.l_about_our_family;
						viewprofile_title['hobbies_interest'] = hobb_interest;
						break;
					case 10://By Sibling(Brother/Sister)
					case 11://By Sibling(Sister/Sister)
						viewprofile_title['interest_profile'] = relative_interest_profile;
						viewprofile_title['few_about'] = relative_few_about;
						viewprofile_title['more_about'] = more_about;
						viewprofile_title['about_family'] = vpjson_label.l_about_our_family;
						viewprofile_title['hobbies_interest'] = hobb_interest;
						break;
					case 1: //By My self
						viewprofile_title['interest_profile'] = vpjson_label.l_interested_my_profile;
						viewprofile_title['few_about'] = vpjson_label.l_my_own_words;
						viewprofile_title['more_about'] = vpjson_label.l_more_abt_me;
						viewprofile_title['about_family'] = vpjson_label.l_about_my_family;
						viewprofile_title['hobbies_interest'] = vpjson_label.l_my_hobbies_interest;
						break;
				}
				return viewprofile_title;
			}catch(err){
				console.log("profileCreatedByLabel:",err);
				return viewprofile_title;
			}
		},
		getBBPIN : function(userId,viewedId,appType,userGender,partGender,callbackdb){
			try{
				var CONFVAR = bmDb.bmDbConnById(2, userId, 'S');
				var qrycmt = "Get blackberry get the BBPIn";
				if(appType != 115){
					if(userGender != partGender){
						bmDb.bmDbSelect(CONFVAR,DBNAME['MATRIMONY'],TABLE['APPBLACKBERRYPIN'],"MatriId,PinValue", "MatriId=? and BFlag=?",[viewedId, 1],qrycmt,function(err,binDet){
							//outputArray['PROFILEDET']['BBPIN'] = binDet[0]['PinValue'];
							callbackdb(err,binDet);
						});
					} else {
						callbackdb(null,{});
					}
				} else {
					callbackdb(null,{});
				}
			}catch(err){
				console.error("getBBPIN:",err);
				
				return callbackdb(err,{});
			}
		},
		getSqlHobInfo : function(id, dbObj, dbname, tablename, next){
			var selFieldArr = "MatriId,HobbiesSelected,HobbiesOthers,InterestsSelected,InterestsOthers,MusicSelected,MusicOthers,BooksSelected,BooksOthers,MoviesSelected,MoviesOthers,SportsSelected,SportsOthers,FoodSelected,FoodOthers,DressStyleSelected,DressStyleOthers,LanguagesSelected,LanguagesOthers";
			var qurycmt = "#VP - Select Hobbies Info Mysql#";
			bmDb.bmDbSelect(dbObj, dbname, tablename, selFieldArr, "MatriId =?", [id],qurycmt, function(err,Fetchdata){
				if(!err){
					//console.log("Hobbies============:",Fetchdata);
					if(!bmgeneric.empty(Fetchdata)){
						var mysqloutput = bmgeneric.array_change_key_case(Fetchdata[0],'CASE_LOWER');
						next(err,mysqloutput);
					} else {
						next(err,{});
					}
				} else {
					next(err,{});
				}
			});
		},
		getSqlFamilyInfo : function(id, dbObj, dbname, tablename, next){
			var selFieldArr = "MatriId,FamilyValue,FamilyType,FamilyStatus,FatherOccupation,MotherOccupation,AncestralOrigin,Brothers,Sisters,BrothersMarried,SistersMarried,Familydescription";
			var qurycmt = "#VP - Select Family Info Mysql#";
			bmDb.bmDbSelect(dbObj, dbname, tablename, selFieldArr, "MatriId =?", [id],qurycmt, function(err,Fetchdata){
				if(!err){
					//console.log("Family============:",Fetchdata);
					if(!bmgeneric.empty(Fetchdata)){
						var mysqloutput = bmgeneric.array_change_key_case(Fetchdata[0],'CASE_LOWER');
						next(err,mysqloutput);
					} else {
						next(err,{});
					}
				} else {
					next(err,{});
				}
			});
		},
		getSqlMWInfo : function(id, dbObj, dbname, tablename, partnerprefset, next){
			if (partnerprefset == 1) {
				var selFieldArr = "MatriId,MatchMaritalStatus,HavingChildren,StAge,EndAge,StHeight,EndHeight,PhysicalStatus,MotherTongue,MatchReligion,MatchCaste,MatchSubCaste,GothraId,StarId,Manglik,EatingHabitsPref,SmokingHabitsPref,DrinkingHabitsPref,MatchEducation,MatchEducationId,MatchOccupationSelected,MatchCitizenship,MatchCountry,MatchIndianStates,MatchUSStates,MatchIndianCity,MatchResidentStatus,PartnerDescription,StIncome,EndIncome";
			} else {
				var selFieldArr = "MatriId,SysMatchMaritalStatus,SysHavingChildren,SysStAge,SysEndAge,SysStHeight,SysEndHeight,SysPhysicalStatus,SysMotherTongue,SysMatchReligion,SysMatchCaste,SysMatchSubCaste,SysGothraId,SysManglik,SysEatingHabitsPref,SysMatchEducation,SysMatchEducationId,SysMatchOccupationSelected,SysMatchCitizenship,SysMatchCountry,SysMatchIndianStates,SysMatchUSStates,PartnerDescription,SysStIncome,SysEndIncome";
			}
			var qurycmt = "#VP - Select match Watch Info Mysql#";
			bmDb.bmDbSelect(dbObj, dbname, tablename, selFieldArr, "MatriId =?", [id],qurycmt, function(err,Fetchdata){
				if(!err){
					//console.log("match Watch============:",Fetchdata);
					if(!bmgeneric.empty(Fetchdata)){
						var mysqloutput = bmgeneric.array_change_key_case(Fetchdata[0],'CASE_LOWER');
						next(err,mysqloutput);
					} else {
						next(err,{});
					}
				} else {
					next(err,{});
				}
			});
		}
	}
	
	module.exports = VPModelFunc;