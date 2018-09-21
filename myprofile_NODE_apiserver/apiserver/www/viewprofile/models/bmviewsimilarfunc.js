/**********************************************************************************************
File    : bmviewsimilarfunc.js
Author  : Sathrak Paldurai k
Date    : 30-Aug-2016
************************************************************************************************
Description : 	Similar Profiles Display Based on Partnerprofile.
*********************************************************************************************/
	//funtion to get similar profiles
	exports.getViewSimilarProfiles = function(data,partnerInfo,logusrInfo,stlimit='',endlimit='',similarcb){
		try{
			var startwv = +new Date();
			async.series({
				CONT:function(callback){//Contacted
					sphinxcommfunc.appgetmemcachevaluesQL(data.ID,2,function(err,contactedList){
						callback(err,contactedList);
						if(dbconfig.LOADTIME==1 || data.KSLOG==1){					
							console.error('Similarprofile-contactedList SLoginId :'+data.ID);
						}
					});
				},
				IGN:function(callback){//Ignored
					sphinxcommfunc.appgetmemcachevaluesQL(data.ID,3,function(err,ignoredList){
						callback(err,ignoredList);
						if(dbconfig.LOADTIME==1 || data.KSLOG==1){					
							console.error('Similarprofile-ignoredList SLoginId :'+data.ID);
						}
					});
				},
				DEC:function(callback){//Declined
					sphinxcommfunc.appgetmemcachevaluesQL(data.ID,5,function(err,declinedList){
						callback(err,declinedList);
						if(dbconfig.LOADTIME==1 || data.KSLOG==1){					
							console.error('Similarprofile-declinedList SLoginId :'+data.ID);
						}
					});
				},
				MEMPP:function(callback){					
					//Get partner preference for the logined user starts  
					if (logusrInfo['partnerprefset'] != 1) {
						Cache.get("SYSTEMPP-"+data.ID, function(err,partnerprefmem){
							callback(err,partnerprefmem);
							if(dbconfig.LOADTIME==1 || data.KSLOG==1){					
								console.error('Similarprofile-SYSTEMPP SLoginId :'+data.ID);
							}
						});
					} else {
						Cache.get("PP-"+data.ID, function(err,partprefmem){
							callback(err,partprefmem);
							if(dbconfig.LOADTIME==1 || data.KSLOG==1){					
								console.error('Similarprofile-PP SLoginId :'+data.ID);
							}
						});
					}
				}
			},function(err,MemData){
				if(dbconfig.LOADTIME==1 || data.KSLOG==1){					
					console.error('Similarprofile-Time 103 SLoginId :'+data.ID);
				}
				if(!err){					
					let id = data.ID;
					let APPTYPE = data.APPTYPE;						
					let vpGender  = partnerInfo['gender'];
					let vpHeight = partnerInfo['height'];
					let vpCountry = partnerInfo['countryselected'];
					let vpMotherTong = partnerInfo['mothertongue'];
					let vpCaste = partnerInfo['caste'];
					let vpSpecialcase = partnerInfo['specialcase'];
					let vpReligin = partnerInfo['religion'];
					let vpMaritStatus = partnerInfo['maritalstatus'];
					let usrHeight = logusrInfo['height'];
					let usrGothraId = logusrInfo['gothraid']; 
					let	sphinxMatriId = bmgeneric.covertToSphinxId(id);
					//convert the MatriId to Sphinx MatriId.
					let smatriid = bmgeneric.covertToSphinxId(data.VIEWEDID);			
					//Login user gender
					logingender = (logusrInfo['gender'] == 'F') ? 0 : 1;
					//viewing user gender
					viewusergenval = (vpGender == 'F') ? 0 : 1;			
					var whereClause = " Validated =? and Authorized =? and Status =? and Deleted=? and ProfileIndex !=? ";
					var whereValueArr = [1,1,0,0,parseInt(smatriid)];
				
					whereClause += " and ignoredme NOT IN("+sphinxMatriId+") and contactedme NOT IN("+sphinxMatriId+") and declinedme NOT IN("+sphinxMatriId+") ";			
					var exID = '';
					if(bmgeneric.count(MemData.CONT) >0 ){
						exID += bmgeneric.implode(",",MemData.CONT);
					}
					if(bmgeneric.count(MemData.IGN) >0 ){
						exID += bmgeneric.implode(",",MemData.IGN);
					}
					if(bmgeneric.count(MemData.DEC) >0 ){
						exID += bmgeneric.implode(",",MemData.DEC);
					}
					
					if(!bmgeneric.empty(exID))
						whereClause += " and Profileindex NOT IN("+exID+") ";
					
					//last 14 days login user. filter
					var currDateTimets = strtotime(dateFormat(new Date,'yyyy-mm-dd HH:MM:ss'));
					var weektsBase = strtotime(dateFormat(strtotime("-14 days"),'yyyy-mm-dd')+" 00:00:00");
					whereClause += " and last_login >= "+weektsBase+" and last_login <= "+currDateTimets+" ";
									
					//Education Filter condition	
					var educationVal = partnerInfo['educationselected'];
					var educationMap = (viewusergenval == 0) ? MALEPARTNERPREFEDUCATIONHASH[educationVal] : FEMALEPARTNERPREFEDUCATIONHASH[educationVal];
					if(!bmgeneric.empty(educationMap)) {
						var education = educationMap.replace(/~/gi, ",");
						//Education Filter condition
						if (education) {				
							whereClause += " and EducationSelected IN("+education+") ";
						}
					}						
				 
					if(!bmgeneric.empty(MemData.MEMPP)){
						ppValues = bmgeneric.explode('|', MemData.MEMPP);
					}else{
						loginpartnerprefvalues = logusrInfo['matchstage']+'~'+logusrInfo['matchendage']+'|'+logusrInfo['matchstheight']+'~'+logusrInfo['matchendheight'];
						ppValues = bmgeneric.explode('|', loginpartnerprefvalues);
					}
				   
					let ageValues = bmgeneric.explode('~', ppValues[0]);
					let htValues = bmgeneric.explode('~', ppValues[1]);

					//Get partner preference for the logined user ends
					//Age Filter Condition
					bmViewSimilar.getSimilarAge(logusrInfo['age'],partnerInfo['age'], ageValues[0], ageValues[1], vpGender,function(err,similarAgeArr){
						whereClause += " and Age >= "+similarAgeArr['stage']+" and Age <= "+similarAgeArr['endage']+" ";
					});
						
					bmViewSimilar.getSimilarHeight(usrHeight, bmgeneric.number_format(vpHeight, 2), htValues[0], htValues[1], vpGender,function(err,similarHeightArr){
						//console.log("similarHeightArr :",similarHeightArr);
						whereClause += " and Height >= "+Math.floor(similarHeightArr['stheight'])+" and Height <= "+Math.ceil(similarHeightArr['endheight'])+" ";
					});
						
					//Country Filter Condition
					if (vpCountry != 98) {				
						whereClause += " and CountrySelected != 98 ";
					} else {
						whereClause += " and CountrySelected IN ("+vpCountry+") ";				
					}
					//Mother tongue filter condition
					if (bmgeneric.isset(vpMotherTong)) {				
						whereClause += " and MotherTongue = "+vpMotherTong+" ";
					}
					
					//Caste Filter condition
					if (bmgeneric.isset(vpCaste)) {			
						whereClause += " and Caste = "+vpCaste+" ";
					}
					
					//Specialcase Filter condition
					if (bmgeneric.isset(vpSpecialcase)) {				
						whereClause += " and SpecialCase = "+vpSpecialcase+" ";
					}
					
					//Religion Filter condition
					if (bmgeneric.isset(vpReligin)) {				
						whereClause += " and Religion = "+vpReligin+" ";
					}
					
					//Marital status filter condition
					if (bmgeneric.isset(vpMaritStatus)) {				
						whereClause += " and MaritalStatus = "+vpMaritStatus+" ";
					}

					//GothraId Filter condition
					if (usrGothraId > 0) {				
						whereClause += " and GothraId != "+usrGothraId+" ";
					}
					
					//Get Sphinx Indexname
					mem_prof_index = (viewusergenval == 0) ? sphinxcommfunc.appGetProfileIndexName(0, [vpMotherTong]) : sphinxcommfunc.appGetProfileIndexName(1, [vpMotherTong]);			
					whereClause += " and PhotoAvailable = 1 and PhotoProtected =0 ";
					
					//100% Phone Verification process
					if (bminit.mobileverifysuperflag == 1 && bminit.blockuseractionflag == 1) {			
						whereClause += " and PhoneVerified IN(1,3) ";
					}
				
					whereClause += " ORDER BY last_login DESC ";
				  
					if (((bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE))) || (data.APPTYPE == 115)) {		
						if(bmgeneric.emptyNull(stlimit)){					
							whereClause += " limit 0,20 ";
						}else{					
							whereClause += " limit "+stlimit+", "+endlimit+" ";
						}
					}else if((bmgeneric.in_array(APPTYPE,bmvars.IOSAPPTYPE))){			
						whereClause += " limit 0,18 ";
					} else {				
						whereClause += " limit 0,6 ";
					}
					
					let selectFields ="profileindex,name,age,height,maritalstatus,mothertongue,religion,caste,subcasteid,gothraid,star,dosham,countryselected,residingstate,residingcityid,residingdistrict,time_created,educationid,educationselected,occupation_selected,photoavailable,photoprotected,horoscopeavailable,horoscopeprotected,phoneverified,phoneprotected,powerpackstatus,partnerprefset,last_login,specialpriv,citizenship,have_children,eatinghabits,smokinghabits,drinkinghabits,annualincomeininr,photorank,specialcase,validated,authorized,status,entrytype,thumbimg,thumbimgs,interestreceivedcount,webpstatus";
								   
					if (APPTYPE == 115) {
						var querycmt = "ViewSimilarProfiles_WAP";
					} else {
						var querycmt = "ViewSimilarProfiles_APP";
					}
							
					var max_matches = 'max_matches=5001';					
					var SelQuery = {HOST:"LoadBalancer_SPHINXRC2",INDEXNAME:mem_prof_index,SELECTFIELDS:selectFields,WHERECLAUSEVAL:whereClause,MAXMATCHES:max_matches,QRYCMNT:querycmt};
					var viewprofileOutput = {};		
					var hostName = 'LoadBalancer_SPHINXRC2';
					bmSphinxDb.bmDbSelect(2, hostName, mem_prof_index, selectFields, whereClause, whereValueArr, max_matches, querycmt, 2, function(err,sphinxRecord){
						if(dbconfig.LOADTIME==1 || data.KSLOG==1){
							var endvsp = +new Date();							
							console.error('Similarprofile-Time 104 in:'+ (endvsp-startwv) +' SLoginId :'+data.ID);
						}
						if(!err){			
							if(sphinxRecord['TOTAL_FOUND'] > 0){	
								viewprofileOutput['total_found'] = sphinxRecord['TOTAL_FOUND'];
								bmViewSimilar.setBasicViews(data,sphinxRecord['RESULTS'],function(err,incout){
									viewprofileOutput['SIMILARPROFILES'] = incout;
									similarcb(err,viewprofileOutput);
								});						
							} else {						
								viewprofileOutput['total_found'] =0;
								similarcb(null,viewprofileOutput);
							}
						} else {				
							viewprofileOutput['total_found'] =0;
							similarcb(err,viewprofileOutput);
						}
					});
				} else {
					var outputArray = {};
					outputArray['RESPONSECODE'] = 2;
					outputArray['ERRCODE'] = 1;
					similarcb(err,outputArray);
				}
			});
		}catch(err){
			console.log("getViewSimilarProfiles Function Error:",err);
			var outputArray = {};
			outputArray['RESPONSECODE'] = 2;
			outputArray['ERRCODE'] = 1;
			return similarcb(err,outputArray);
		}
	}
	
	exports.setBasicViews = function(data,sphinxRecord,calbk){
		try{
			var incout = [];
			var k = 0;
			async.each(sphinxRecord, function(similarresult,inFCb) 
			{
				var output = {};
				/*Array Construct*/
				var height = similarresult['height'];
				var heightcal	= bmgeneric.appcalRevFloatHeight(height);//// Height calculation ////
				var feetis		= heightcal['ft']; 
				var inchis		= heightcal['inchs'];
				if(feetis==0){
					var heightVal = "-";
				} else{
					if(inchis==0){
						var heightVal =  feetis+ " Ft / " +Math.round(height)+" Cms";
					} else if(inchis==12){
						feetis++;
						var heightVal = feetis+ " Ft / "+Math.round(height)+" Cms";  			
					} else {
						var heightVal =  feetis + " Ft " +inchis + " In / " +Math.round(height)+" Cms";
					}
				}

				/*Religion*/
				var religionval = '';
				religionval = bmgeneric.appgetFromArryHash("RELIGIONHASH", similarresult['religion']);
				if(bmgeneric.strpos(religionval,'- Others') > 0 )
					religionval = religionval.replace(/- Others/gi, '');
				/*Caste*/
				var casteVal = '';
				casteVal = bmgeneric.appgetFromArryHash("CASTEHASH", similarresult['caste']);
				casteVal = casteVal.replace(/- Others|Other /g,'');
				//var dNameCap = global.DOMAINNAMECAPITAL[data.VIEWEDID.substr(0,1)];
				if(bmgeneric.trim(casteVal)=='Brahmins')
					casteVal = bmgeneric.rtrim(casteVal,'s');
				casteVal = (casteVal != '') ? casteVal : 'Not Specified';
				/*subcaste*/
				subCasteVal =  bmgeneric.appgetFromArryHash("SUBCASTEHASH", similarresult['subcasteid']);
				/*star*/
				//starVal = bmgeneric.appgetFromArryHash(dNameCap+"STARHASH", similarresult['star']);
				starVal = bmgeneric.appgetFromArryHashSr("TAMILSTARHASH", similarresult['star']);
				/*country*/
				var countryModify = bmgeneric.appgetFromArryHash("COUNTRYHASH", similarresult['countryselected']);
				var modifyCountries = {'United States of America':'USA','United Arab Emirates':'UAE','United Kingdom':'UK'};
				countryName = (bmgeneric.in_array(countryModify,Object.keys(modifyCountries))) ? modifyCountries[countryModify]:countryModify;
				// get state and city value
				var stateVal = "";
				var cityVal = "";
				if(similarresult['countryselected'] == 98)
				{	
					stateVal = bmgeneric.appgetFromArryHash("RESIDINGINDIANAMES", similarresult['residingstate']);
					if(!bmgeneric.empty(similarresult['residingstate']) && bmgeneric.in_array(similarresult['residingstate'], Object.keys(bmgenericarrys.STATE_CITY_MAPPING)))
					{
						if(!bmgeneric.empty(similarresult['residingcityid']) && bmgeneric.in_array(similarresult['residingcityid'], Object.keys(bmgenericarrys.STATE_CITY_MAPPING[similarresult['residingstate']])))
						cityVal = bmgenericarrys.STATE_CITY_MAPPING[similarresult['residingstate']][similarresult['residingcityid']];
					}
					if(cityVal=="" || similarresult['residingcityid']<1)
					{
						cityVal = bmgeneric.appgetFromArryHash('CITY',similarresult['residingdistrict']);		
					}
				} else if (similarresult['countryselected'] == 222) {
					stateVal = "";
					cityVal = bmgeneric.appgetFromArryHash("RESIDINGUSANAMES", similarresult['residingstate']);
				} else {
					stateVal = "";
					cityVal = "";
				}
			
				/*OCCUPATION*/
				var occupationVals = bmgeneric.appgetFromArryHash("OCCUPATIONLIST", similarresult['occupation_selected']);
				/*Education*/
				var Education_newArray = EducationSelectedValue = otherreplace= "";
				var Education_newArray 	= (similarresult['educationid']>0)?"EDUCATION_ARRAY":"EDUCATIONHASHFORDISPLAY";
				var EducationSelectedValue = (similarresult['educationid']>0)?similarresult['educationid']:similarresult['educationselected'];
				var otherreplace = (EducationSelectedValue==94)?"Others in ":"Other "; //94-Others in Diploma
				var educationVal = bmgeneric.str_replace(otherreplace,"",bmgeneric.appgetFromArryHash(Education_newArray,EducationSelectedValue));
				var photoavailableVal = (similarresult['photoavailable'] == 1) ? 'Y' : 'N';
				var phoneverfiedVal = (similarresult['phoneverified'] > 0) ? 'Y' : 'N';
				var lastLoginDt = dateFormat(new Date(similarresult['last_login'] * 1000),"yyyy-mm-dd HH:MM:ss");
				var timeCreatedDt = dateFormat(new Date(similarresult['time_created'] * 1000),"yyyy-mm-dd HH:MM:ss");
				var lastLogin = otherInfo.getLastLoginTime(data.ID,data.VIEWEDID,lastLoginDt,timeCreatedDt, similarresult['powerpackstatus']);
				var horoscopeavailableVal = (similarresult['horoscopeavailable'] > 0 && similarresult['horoscopeavailable'] < 4) ? 'Y' : 'N';
				var onlinestatusVal = (similarresult['powerpackstatus'] > 0 && similarresult['powerpackstatus'] != 4 && similarresult['powerpackstatus'] != 8) ? 'Y' : 'N';
				
				/*Array Construct*/
				if (((bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE))) || (bmgeneric.in_array(data.APPTYPE,bmvars.IOSAPPTYPE)) || (data.APPTYPE == 115)) {
					output['HEIGHT'] = heightVal;
					output['RELIGION'] = religionval ;
					output['CASTE'] = casteVal;
					output['SUBCASTE'] = subCasteVal;
					output['STAR'] = starVal;
					output['COUNTRY'] = countryName;
					output['STATE'] = stateVal;
					output['EDUCATION'] = educationVal;
					output['OCCUPATION'] = occupationVals;
					output['PHOTOAVAILABLE'] = photoavailableVal;
					output['HOROSCOPEAVAILABLE'] = horoscopeavailableVal;
					output['PHONEVERIFIED'] = phoneverfiedVal;
					output['LASTLOGIN'] = lastLogin;
					output['ONLINESTATUS'] = onlinestatusVal;
				}
				var simprofid = bmgeneric.converToMatriId(similarresult['profileindex']);
				output['ID'] = simprofid;
				output['NAME'] = bmgeneric.AppStrToTitle(similarresult['name']);
				output['AGE'] = similarresult['age'];
				if(bmgeneric.in_array(data.APPTYPE,bmvars.IOSAPPTYPE)){
					var heightcal = bmgeneric.appcalRevFloatHeight(similarresult['height']); // Height calculation 
					var feetis = heightcal['ft'];
					var inchis = heightcal['inchs'];
					if (feetis == 0) {
						output['HEIGHT'] = "-";
					} else {
						if (inchis == 0) {
							output['HEIGHT'] = feetis + " " + bmlable.l_height_ft + " / " + Math.round(similarresult['height']) + " " + bmlable.l_height_cms + "";
						} else if (inchis == 12) {
							feetis++;
							output['HEIGHT'] = feetis + " " + bmlable.l_height_ft + " / " + Math.round(similarresult['height']) + " " + bmlable.l_height_cms + "";
						} else {
							output['HEIGHT'] = feetis + " " + bmlable.l_height_ft + " " + inchis + " " + bmlable.l_height_in + " / " + Math.round(similarresult['height']) + " " + bmlable.l_height_cms + "";
						}
					}
				}
				
				var CountrySelected = similarresult['countryselected'];
				if (CountrySelected == 98) {
					city_name = bmgeneric.appgetFromArryHash("CITY", similarresult['residingdistrict']);
				} else if (CountrySelected == 222) {
					city_name = bmgeneric.appgetFromArryHash("RESIDINGUSANAMES", similarresult['residingstate']);
				} else {
					city_name = bmgeneric.appgetFromArryHash("COUNTRYHASH", CountrySelected);
				}
				
				output['CITY'] = bmgeneric.ucwords(city_name);
				var profphotos = bmgeneric.explode(',', similarresult['thumbimg']);
				var viewmemberWebpStatus = similarresult['webpstatus'];
				if(((bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE)) && data.DOS > 18 && global.APPVPWEBPIMGFLAG == 1 && viewmemberWebpStatus == 1) || (data.APPTYPE == 115  && data.WEBPFLAG == 1 && global.WAPVPWEBPIMGFLAG == 1 && viewmemberWebpStatus == 1)){					
					profphotos =   bmgeneric.explode(".",profphotos[0]);
					profphotos[0] = profphotos[0]+".webp"; // webp image path 
				}
				if(similarresult['photoprotected']==1)
				{
					photoprotectedres = "Y";
				}else if(similarresult['photoprotected']==3){
					photoprotectedres = "C";
				} else {
					photoprotectedres = "N";
				}
				output['PHOTOPROTECTED'] = photoprotectedres;				
				if(photoavailableVal =="N"){
					var photopaths = [];
				} else {					
					var profphotos = bmgeneric.explode(',', similarresult['thumbimg']);
					var photopaths = bmgeneric.getUserImagePath(simprofid, similarresult['time_created'], profphotos[0],'','',0,0);
				}
				
				//photo blur image 
			if(bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE) && (photoprotectedres == "Y" || photoprotectedres == "C")){
					output['PHOTOURL'] =[bmgeneric.getPhotoBlurImage(photopaths[0],150)];
				
			} else {
					output['PHOTOURL'] = photopaths;
				}
				incout.push(output);
				inFCb(null); 
			}, function(err) {
				var reslt = {};
				reslt['MATCHES'] = incout;
				calbk(err,reslt);
			});
		}catch(err){
			console.log("setBasicViews Function Error:",err);
			var outputArray = {};
			outputArray['RESPONSECODE'] = 2;
			outputArray['ERRCODE'] = 1;
			calbk(err,outputArray);
		}
	}
	
	//Fuction to find similar age values
	exports.getSimilarAge = function(memberage, profileage, ppstage, ppendage, gender,getsimcb) {
		//#Default age Calculation
		var ageoutput = {};
		ageoutput['stage'] = parseInt(profileage) - 2;
		ageoutput['endage'] = parseInt(profileage) + 2;
		let profileendage1 = parseInt(profileage) + 1;
		let profileendage2 = parseInt(profileage) + 2;
		let profileendage3 = parseInt(profileage) + 3;
		let profileendage4 = parseInt(profileage) + 4;
		let profilestage1 = parseInt(profileage) - 1;
		let profilestage2 = parseInt(profileage) - 2;
		let profilestage3 = parseInt(profileage) - 3;
		let profilestage4 = parseInt(profileage) - 4;
		if ((ppendage - ppstage) >= 4) {
			if (profilestage2 >= ppstage && profileendage2 <= ppendage) {//#profile age inside the PP limit 
				ageoutput['stage'] = profilestage2;
				ageoutput['endage'] = profileendage2;
			} else if (profileage == ppstage && profileendage4 <= ppendage && profilestage1 < ppstage) {
				ageoutput['stage'] = profileage;
				ageoutput['endage'] = profileendage4;
			} else if (profilestage1 == ppstage && profileendage3 <= ppendage && profilestage2 < ppstage) {
				ageoutput['stage'] = profilestage1;
				ageoutput['endage'] = profileendage3;
			} else if (profilestage4 >= ppstage && profileage == ppendage && profileendage1 > ppendage) {
				ageoutput['stage'] = profilestage4;
				ageoutput['endage'] = profileage;
			} else if (profilestage3 >= ppstage && profileendage1 == ppendage && profileendage2 > ppendage) {
				ageoutput['stage'] = profilestage3;
				ageoutput['endage'] = profileendage1;
			}
		} else if ((profileage >= ppstage && profileage <= ppendage) && ((ppendage - ppstage) <= 3) && gender == 'F') {
			if (ppendage - profileage == 0) {
				ageoutput['stage'] = profilestage4;
				ageoutput['endage'] = profileage;
			} else if (ppendage - profileage == 1) {
				ageoutput['stage'] = profilestage3;
				ageoutput['endage'] = profileendage1;
			} else if (ppendage - profileage == 2) {
				ageoutput['stage'] = profilestage2;
				ageoutput['endage'] = profileendage2;
			} else if (ppendage - profileage == 3) {
				ageoutput['stage'] = profileage;
				ageoutput['endage'] = profileendage3;
			}
		} else if ((profileage >= ppstage && profileage <= ppendage) && ((ppendage - ppstage) <= 3) && gender == 'M') {
			if (profileage - ppstage == 0) {
				ageoutput['endage'] = profileendage4;
				ageoutput['stage'] = profileage;
			} else if (profileage - ppstage == 1) {
				ageoutput['endage'] = profileendage3;
				ageoutput['stage'] = profilestage1;
			} else if (profileage - ppstage == 2) {
				ageoutput['endage'] = profileendage2;
				ageoutput['stage'] = profilestage2;
			} else if (profileage - ppstage == 3) {
				ageoutput['endage'] = profileage;
				ageoutput['stage'] = profilestage3;
			}
		} else if (profileage <= memberage && profileage >= ppstage && gender == 'F') {

			ageoutput['stage'] = parseInt(memberage) - 4;
			ageoutput['endage'] = memberage;
		} else if (profileage <= memberage && profileage <= ppendage && gender == 'M') {
			ageoutput['stage'] = memberage;
			ageoutput['endage'] = parseInt(memberage) + 4;
		}
		if (ageoutput['stage'] < 18) {
			ageoutput['stage'] = 18;
		}
		return getsimcb(null,ageoutput);
	}

	//Fuction to find similar height values
	exports.getSimilarHeight = function(memberheight, profileheight, ppstheight, ppendheight, gender,callback) {
		//#Default age Calculation
		var output = {}
		output['stheight'] = parseInt(profileheight) - 15;
		output['endheight'] = parseInt(profileheight) + 15;
		let profileendheight1 = parseInt(profileheight) + 7.5;		
		let profileendheight2 = parseInt(profileheight) + 15;
		let profileendheight3 = parseInt(profileheight) + 22.5;
		let profileendheight4 = parseInt(profileheight) + 30;
		let profilestheight1 = parseInt(profileheight) - 7.5;
		let profilestheight2 = parseInt(profileheight) - 15;
		let profilestheight3 = parseInt(profileheight) - 22.5;
		let profilestheight4 = parseInt(profileheight) - 30;	
		if ((ppendheight - ppstheight) >= 30) {
			if (profilestheight2 >= ppstheight && profileendheight2 <= ppendheight) {//#profile age inside the PP limit 
				output['stheight'] = profilestheight2;
				output['endheight'] = profileendheight2;
			} else if (profileheight == ppstheight && profileendheight4 <= ppendheight && profilestheight1 < ppstheight) {
				output['stheight'] = profileheight;
				output['endheight'] = profileendheight4;
			} else if (profilestheight1 == ppstheight && profileendheight3 <= ppendheight && profilestheight2 < ppstheight) {
				output['stheight'] = profilestheight1;
				output['endheight'] = profileendheight3;
			} else if (profilestheight4 >= ppstheight && profileheight == ppendheight && profileendheight1 > ppendheight) {
				output['stheight'] = profilestheight4;
				output['endheight'] = profileheight;
			} else if (profilestheight3 >= ppstheight && profileendheight1 == ppendheight && profileendheight2 > ppendheight) {
				output['stheight'] = profilestheight3;
				output['endheight'] = profileendheight1;				
			}
		} else if ((profileheight >= ppstheight && profileheight <= ppendheight) && ((ppendheight - ppstheight) <= 22.5) && gender == 'F') {			
			if (ppendheight - profileheight == 0) {
				output['stheight'] = profilestheight4;
				output['endheight'] = profileheight;
			} else if (ppendheight - profileheight <= 7.5) {
				output['stheight'] = profilestheight3;
				output['endheight'] = profileendheight1;			
			} else if (ppendheight - profileheight <= 15) {
				output['stheight'] = profilestheight2;
				output['endheight'] = profileendheight2;
			} else if (ppendheight - profileheight <= 22.5) {
				output['stheight'] = profileheight;
				output['endheight'] = profileendheight3;
			}
		} else if ((profileheight >= ppstheight && profileheight <= ppendheight) && ((ppendheight - ppstheight) <= 22.5) && gender == 'M') {			
			if (profileheight - ppstheight == 0) {
				output['endheight'] = profileendheight4;
				output['stheight'] = profileheight;
			} else if (profileheight - ppstheight <= 7.5) {
				output['endheight'] = profileendheight3;
				output['stheight'] = profilestheight1;
			} else if (profileheight - ppstheight <= 15) {
				output['endheight'] = profileendheight2;
				output['stheight'] = profilestheight2;
			} else if (profileheight - ppstheight <= 22.5) {
				output['endheight'] = profileheight;
				output['stheight'] = profilestheight3;
			}
		} else if (profileheight <= memberheight && profileheight >= ppstheight && gender == 'F') {
			output['stheight'] = parseInt(memberheight) - 30;
			output['endheight'] = memberheight;
		} else if (profileheight <= memberheight && profileheight >= ppendheight && gender == 'M') {
			output['stheight'] = memberheight;
			output['endheight'] = parseInt(memberheight) + 30;
		}
		if (output['stheight'] < 121.92) {
			output['stheight'] = 121.92;
		}		
		return callback(null,output);
	}