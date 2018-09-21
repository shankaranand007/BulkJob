/**********************************************************************************************
 *	Filename	: PARTNERPREINFO.js							
 *	Author		: Sathrak paldurai K
 *	Date		: 28-09-2016								
 *	Description	: Viewed member details display.
***********************************************************************************************/
var getppinfo = {
	getviewMemPPDet : function(arg,dNameCap,matchwatchInfo,profCrtLabel,PartDominArr,mygothra,callback){	
		try{
			var memprefinfo = {};			
			if(arg.SPHINXENABLE ==1){
				partprfInfo.memberpref(arg,dNameCap,matchwatchInfo,profCrtLabel,PartDominArr,mygothra, function(err,memberinfo){
					memprefinfo['MWINFO'] = '';
					memprefinfo['MEMPREF'] = memberinfo;
					callback(null,memprefinfo);
				});	
			} else {				
				//#Get Hobbiesinfo Details From Database
				var dbHost = bmDb.bmDbConnById(2, arg.VIEWEDID, 'S');
				var tableName=DOMAINTABLE[bmgeneric.strtoupper(PartDominArr['domainnameshort'])]['MATCHWATCH'];
				viewPrfModel.getSqlMWInfo(arg.VIEWEDID,dbHost,DBNAME['MATRIMONYMS'],tableName,matchwatchInfo['partnerprefset'], function(err,mw_info){
					if (matchwatchInfo['partnerprefset'] == 1){
						preVal = "";
						mw_info['matchstarid'] = bmgeneric.explode("~", mw_info[preVal+'starid']);
						mw_info['matchsmokinghabitspref'] = bmgeneric.explode("~", mw_info[preVal+'smokinghabitspref']);						
						mw_info['matchdrinkinghabitspref'] = bmgeneric.explode("~", mw_info[preVal+'drinkinghabitspref']);
						mw_info['matchindiancity'] = bmgeneric.explode("~", mw_info[preVal+'matchindiancity']);
						
						mw_info['matchresidentstatus'] = bmgeneric.explode("~", mw_info[preVal+'matchresidentstatus']);
					} else {
						preVal = "sys";
						mw_info['matchstarid'] =[];
						mw_info['matchsmokinghabitspref'] =[];
						mw_info['matchdrinkinghabitspref'] =[];
						mw_info['matchindiancity'] =[];
						mw_info['matchresidentstatus'] =[];
					}
					//#set fields
					mw_info['matchstage'] = mw_info[preVal+'stage'];
					mw_info['matchendage'] = mw_info[preVal+'endage'];
					mw_info['matchstheight'] = mw_info[preVal+'stheight'];
					mw_info['matchendheight'] = mw_info[preVal+'endheight'];
					mw_info['matchstincome'] = mw_info[preVal+'stincome'];
					mw_info['matchendincome'] = mw_info[preVal+'endincome'];
					mw_info['matchhavingchildren'] = mw_info[preVal+'havingchildren'];
					mw_info['matchphysicalstatus'] = mw_info[preVal+'physicalstatus'];					//#mva fields set
					mw_info['matchmaritalstatus'] = bmgeneric.explode("~", mw_info[preVal+'matchmaritalstatus']);
					mw_info['matchmothertongue'] = bmgeneric.explode("~", mw_info[preVal+'mothertongue']);
					mw_info['matchreligion'] = bmgeneric.explode("~", mw_info[preVal+'matchreligion']);
					mw_info['matchcaste'] = bmgeneric.explode("~", mw_info[preVal+'matchcaste']);
					mw_info['matchsubcaste'] = bmgeneric.explode("~", mw_info[preVal+'matchsubcaste']);
					mw_info['matchgothraid'] = bmgeneric.explode("~", mw_info[preVal+'gothraid']);
					mw_info['matchmanglik'] = bmgeneric.explode("~", mw_info[preVal+'manglik']);
					mw_info['matcheatinghabitspref'] = bmgeneric.explode("~", mw_info[preVal+'eatinghabitspref']);
					
					mw_info['matcheducation'] = bmgeneric.explode("~", mw_info[preVal+'matcheducation']);
					mw_info['matcheducationid'] = bmgeneric.explode("~", mw_info[preVal+'matcheducationid']);
					mw_info['matchoccupationselected'] = bmgeneric.explode("~", mw_info[preVal+'matchoccupationselected']);
					mw_info['matchcitizenship'] = bmgeneric.explode("~", mw_info[preVal+'matchcitizenship']);
					mw_info['matchcountry'] = bmgeneric.explode("~", mw_info[preVal+'matchcountry']);
					mw_info['matchindianstates'] = bmgeneric.explode("~", mw_info[preVal+'matchindianstates']);
					mw_info['matchusstates'] = bmgeneric.explode("~", mw_info[preVal+'matchusstates']);
								
					memprefinfo['MWINFO'] = mw_info;					
					mw_info['partnerprefset'] = matchwatchInfo['partnerprefset'];
					mw_info['gender'] = matchwatchInfo['gender'];
					partprfInfo.memberpref(arg,dNameCap,mw_info,profCrtLabel,PartDominArr,mygothra, function(err,memberinfo){
						memprefinfo['MEMPREF'] = memberinfo;
						callback(null,memprefinfo);
					});	
				});
			}
		}catch(err){
			console.log("Error At: getviewMemPPDet - Func Name - and Member PP Info :",err);
			return callback(err,matchwatchInfo);
		}
	},	
	memberpref:function(arg,dNameCap,mw_info,profCrtdLab,PartDominArr,mygothra,callback){
		try{		
			if (mw_info['partnerprefset'] == 1) {
				preVal = "";
				bhraminmothertongue = "matchmothertongue";
			} else {
				preVal = "sys";
				bhraminmothertongue = "mothertongue";
			}
			
			// #Form data
			if(arg.SPHINXENABLE ==0){
				preVal = "";
			} else {
				if (mw_info['partnerprefset'] == 0) {
					mw_info[preVal + 'matchstheight'] = mw_info[preVal + 'stheight'];
					mw_info[preVal + 'matchendheight'] = mw_info[preVal + 'endheight'];
					mw_info[preVal + "matchstage"] = mw_info[preVal + "stage"];
					mw_info[preVal + "matchendage"] = mw_info[preVal + "endage"];				
					mw_info[preVal + 'matchmanglik'] = mw_info[preVal+'manglik'];
					mw_info[preVal + 'matchgothraid'] = mw_info[preVal+'gothraid'];
					mw_info[preVal + 'matchhavingchildren'] = mw_info[preVal+'havingchildren'];
					mw_info[preVal + 'matcheatinghabitspref'] = mw_info[preVal+'eatinghabitspref'];
				}
			}
	
			var displayMatchWatch = {};			
			if (!bmgeneric.empty(mw_info)) {				
				if (bmgeneric.in_array("0", mw_info[preVal + 'matchmaritalstatus'])) {
					anyflag = 1;
				} else {
					anyflag = 0;
				}
				cntpartMarit = bmgeneric.count(mw_info[preVal + 'matchmaritalstatus']);
				displayMatchWatch['TITLE'] = bmlable.l_partner_preference;				
				if (!bmgeneric.empty(mw_info[preVal + "matchstage"]) && !bmgeneric.empty(mw_info[preVal + "matchendage"])) {
					displayMatchWatch['AGE'] = {'FROM':(mw_info[preVal + "matchstage"]) ? mw_info[preVal + "matchstage"] : 0, 'TO':(mw_info[preVal + "matchendage"]) ? mw_info[preVal + "matchendage"] : 0};
				}
		
				////marital status
				var mar_status = '';
				if (cntpartMarit == 1) {
					matchMaritialStatus = bmgeneric.appgetFromPartPrefArryHash("MARITALSTATUSHASH", mw_info[preVal + 'matchmaritalstatus'],'');
					//2 for widow			   
					mar_status = matchMaritialStatus + ", ";			   
				} else {
					////End for returning "Any" when all values are selected+
					for (i = 0; i < cntpartMarit; i++) {
						if (mw_info[preVal + 'matchmaritalstatus'][i] == 2) {
							match_mar_status = bmgeneric.appgetFromArryHash("MARITALSTATUSHASH", mw_info[preVal + 'matchmaritalstatus'][i]);
							marti_status = bmgeneric.explode("/", match_mar_status);
							if (mw_info['gender'] == 'M') {
								Match_MaritalStatus = marti_status[0];
							} else {
								Match_MaritalStatus = marti_status[1];
							}
							mar_status +=Match_MaritalStatus + ", ";
						} else {
							if (anyflag == 0) {
								mar_status +=bmgeneric.appgetFromArryHash("MARITALSTATUSHASH", mw_info[preVal + 'matchmaritalstatus'][i]) + ", ";
							}
						}
					}
				}
				
				if(mar_status){
					mar_status = bmgeneric.substr(mar_status, 0, -2);
				}else {
					mar_status ="";
				}
				if (anyflag == 1) {
					mar_status = bmlable.l_any; //"Any";
				}
				
				displayMatchWatch["MARITALSTATUS"] = mar_status;
				//Physical Status 
				if(mw_info['partnerprefset']==1)  {     
					displayMatchWatch["PHYSICALSTATUS"] = bmgeneric.appgetFromArryHash('PHYSICALSTATUSPARTNERPERFERENCE', mw_info['matchphysicalstatus']);
				}else{  
					displayMatchWatch["PHYSICALSTATUS"] = bmgeneric.appgetFromArryHash('PHYSICALSTATUSPARTNERPERFERENCE', mw_info[preVal + 'physicalstatus']);
				}
				if(arg.SPHINXENABLE ==1){
					if (mw_info['partnerprefset'] == 1) {
						displayMatchWatch["MOTHERTONGUE"] = bmgeneric.appgetFromPartPrefArryHash('MOTHERTONGUEHASH', mw_info[preVal + 'matchmothertongue']);
					} else {
						displayMatchWatch["MOTHERTONGUE"] = bmgeneric.appgetFromPartPrefArryHash('MOTHERTONGUEHASH', mw_info[preVal + 'mothertongue']);				}
				} else {				
					displayMatchWatch["MOTHERTONGUE"] = bmgeneric.appgetFromPartPrefArryHash('MOTHERTONGUEHASH', mw_info['matchmothertongue']);
				}
				//Have child checking  if member married Status UNMARRIED////
				if (!(cntpartMarit == 1 && bmgeneric.in_array(1, mw_info[preVal + 'matchmaritalstatus']))) {
					displayMatchWatch["HAVECHILD"] = bmgeneric.appgetFromArryHashSr('PARTNERCHILDRENLIVINGSTATUSHASH', mw_info[preVal + 'matchhavingchildren']);
				}

				if (!bmgeneric.empty(mw_info[preVal + 'matchstheight']) && !bmgeneric.empty(mw_info[preVal + 'matchendheight'])) {
					stheightpartprefcal = bmgeneric.appcalRevFloatHeight(mw_info[preVal + 'matchstheight']); //// Height ////
					stfeetpartprefis = stheightpartprefcal['ft'];
					stinchpartprefis = stheightpartprefcal['inchs'];

					endheightpartprefcal = bmgeneric.appcalRevFloatHeight(mw_info[preVal + 'matchendheight']);
					endfeetpartprefis = endheightpartprefcal['ft'];
					endinchpartprefis = endheightpartprefcal['inchs'];

					startinch = (stinchpartprefis == 0) ? "" : stinchpartprefis + " " + bmlable.l_height_in;
					endinch = (endinchpartprefis == 0) ? "" : endinchpartprefis + " " + bmlable.l_height_in;
					displayMatchWatch['HEIGHT'] = {'FROM':stfeetpartprefis + " " + bmlable.l_height_ft + " " + startinch ,'TO':endfeetpartprefis + " " + bmlable.l_height_ft + " " + endinch};
				}

				// Religion checking
				if(mw_info[preVal+'matchreligion'][0]==25) {
					mw_info[preVal+'matchreligion'] = RELIGIONALLMAPPING[25]; //from generic arrays
				}
				else if(mw_info[preVal+'matchreligion'][0]==26) {
					mw_info[preVal+'matchreligion'] = RELIGIONALLMAPPING[26];
				}
				else if(mw_info[preVal+'matchreligion'][0]==27) {
					mw_info[preVal+'matchreligion'] = RELIGIONALLMAPPING[27];
				}
				displayMatchWatch["RELIGION"] = bmgeneric.appgetFromPartPrefArryHash('RELIGIONHASH', mw_info[preVal + 'matchreligion'],'');
				if (bmgeneric.strpos(displayMatchWatch["RELIGION"], '- Others') > 0) {
					displayMatchWatch["RELIGION"] = bmgeneric.str_replace(' - Others', '', displayMatchWatch["RELIGION"]);
				}
					
				if (bmgeneric.in_array(1000, mw_info[preVal + 'matchcaste']) && !bmgeneric.empty(mw_info[preVal + bhraminmothertongue])) {
					if(mw_info[preVal + bhraminmothertongue])
					{
						mappedGroupIds = bmgeneric.explode('~', mw_info[preVal + bhraminmothertongue]);
					}else
					{
						mappedGroupIds = mw_info[preVal + bhraminmothertongue];
					}
			
					displayMatchWatch["CASTE"] = bmgeneric.appgetFromPartPrefArryHash('CASTEHASH', mw_info[preVal + 'matchcaste'], mappedGroupIds);
				} else {
					displayMatchWatch["CASTE"] = bmgeneric.appgetFromPartPrefArryHash('CASTEHASH', mw_info[preVal + 'matchcaste'],'');
				}
				
				var remv_others = new Array(' - Others', 'Other ');
				displayMatchWatch["CASTE"] = bmgeneric.str_replace(remv_others, "", displayMatchWatch["CASTE"]);
				if (bmgeneric.trim(displayMatchWatch["CASTE"]) == 'Brahmins') {
					displayMatchWatch["CASTE"] = bmgeneric.trim(displayMatchWatch["CASTE"], 's');
				}

				//subcaste
				displayMatchWatch["SUBCASTE"] = (bmgeneric.empty(mw_info[preVal+'matchsubcaste']) || mw_info[preVal+'matchsubcaste'][0] == 0) ? bmlable.l_any : bmgeneric.appgetFromPartPrefArryHash ('SUBCASTEHASH', mw_info[preVal+'matchsubcaste'],'');
				if(bmgeneric.count(bmgeneric.explode(",",displayMatchWatch["CASTE"]))>1) {
					delete displayMatchWatch["SUBCASTE"];
				}
							
				if(bmgeneric.in_array(3,mw_info[preVal+'matchreligion'])){//Added for christian changes
					displayMatchWatch['DIVISION'] = displayMatchWatch['CASTE'];		
					displayMatchWatch['CASTE'] = displayMatchWatch['SUBCASTE'];
					delete displayMatchWatch['CASTE'];
					delete displayMatchWatch['SUBCASTE'];	
				}

				if((!bmgeneric.in_array(mw_info[preVal + 'matchreligion'][0],[2,3,10,11,12,13,14])) || (bmgeneric.in_array(mw_info[preVal + 'matchreligion'][0],[2,3,10,11,12,13,14]) && (!bmgeneric.empty(mw_info[preVal + 'matchstarid']) && mw_info[preVal + 'matchstarid'][0] != 0))) {				
					displayMatchWatch["STAR"] = bmgeneric.appgetFromPartPrefArryHash(dNameCap+'STARHASH', mw_info[preVal + 'matchstarid'],'');
				}	
				
				//Gothra Check
				var displaypartnergothra = '';
				if (!bmgeneric.empty(mw_info[preVal + 'matchgothraid']) && mw_info[preVal + 'matchgothraid'][0] == 998) {
					displaypartnergothra = bmgeneric.substr(bmgeneric.trim(bmlable.l_except_my_gothra), 0, -1) + " - " + mygothra + ")"; //'All (Except my gothra)';
				} else {				
					displaypartnergothra = bmlable.l_any;
				}					
						
				if((!bmgeneric.in_array(mw_info[preVal+'matchreligion'][0],[2,3,10,11,12,13,14])) || (bmgeneric.in_array(mw_info[preVal+'matchreligion'][0],[2,3,10,11,12,13,14]) && displaypartnergothra!="Any" && displaypartnergothra != '')) {
					displayMatchWatch["GOTHRA"] = displaypartnergothra;
				}			
				
				////Refer MANGLIKHASH for old array+ Sameone but Doesn't matter used instead of Not Given
				//// PP Details     : 1 : Yes ; 2 : No ; 3 : Not Given	
				if (mw_info[preVal+'matchmanglik'][0]=='0') {
					if(!bmgeneric.in_array(mw_info[preVal+'matchreligion'][0],[2,3,10,11,12,13,14]))
					{
						displayMatchWatch["MANGLIK"] = bmlable.l_doesnt_matter;
					}
				} else {
					var arrmatchmanglik = mw_info[preVal+'matchmanglik'];				
					var manglikmatchaddtext;
					if(!bmgeneric.in_array(mw_info[preVal + 'matchreligion'][0],[2,3,10,11,12,13,14])) {
						if (bmgeneric.in_array(1, arrmatchmanglik) && bmgeneric.in_array(2, arrmatchmanglik) && bmgeneric.in_array(3, arrmatchmanglik)) {
							manglikmatchaddtext = bmlable.l_doesnt_matter;
						} else if (bmgeneric.in_array(3, arrmatchmanglik) && bmgeneric.in_array(1, arrmatchmanglik)) {
							manglikmatchaddtext = bmlable.l_yes;
						} else if (bmgeneric.in_array(3, arrmatchmanglik) && bmgeneric.in_array(2, arrmatchmanglik)) {
							manglikmatchaddtext = bmlable.l_no;
						} else if (bmgeneric.in_array(1, arrmatchmanglik) && bmgeneric.in_array(2, arrmatchmanglik)) {
							manglikmatchaddtext = bmlable.l_doesnt_matter;
						} else if (bmgeneric.in_array(1, arrmatchmanglik)) {
							manglikmatchaddtext = bmlable.l_yes;
						} else if (bmgeneric.in_array(2, arrmatchmanglik)) {
							manglikmatchaddtext = bmlable.l_no;
						} else if (bmgeneric.in_array(3, arrmatchmanglik)) {
							manglikmatchaddtext = bmlable.l_not_specified;
						} else if (bmgeneric.in_array("0", arrmatchmanglik)) {
							manglikmatchaddtext = bmlable.l_doesnt_matter;
						} else {
							manglikmatchaddtext = bmlable.l_not_specified;
						}
						displayMatchWatch["MANGLIK"] = manglikmatchaddtext;	
					}
				}
			
				//Eating Habits			
				if (bmgeneric.empty(mw_info[preVal + 'matcheatinghabitspref']) || mw_info[preVal + 'matcheatinghabitspref'][0] =='0' || mw_info[preVal + 'matcheatinghabitspref'][0] =='') {
					displayMatchWatch["EATINGHABITS"] = bmlable.l_doesnt_matter;
				} else {
					displayMatchWatch["EATINGHABITS"] = bmgeneric.appgetFromPartPrefArryHash('EATINGHABITSHASH', mw_info[preVal + 'matcheatinghabitspref'],'');
				}
				//Smoking Habits
				var smokeprefer = '';
				if (bmgeneric.empty(mw_info['matchsmokinghabitspref']) || mw_info['matchsmokinghabitspref'] == 0 || bmgeneric.count(mw_info['matchsmokinghabitspref']) == 3) {
					displayMatchWatch["SMOKINGHABITS"] = bmlable.l_doesnt_matter;
				} else {
					smokeprefer = 'Prefer someone who ';					
					displayMatchWatch["SMOKINGHABITS"] = smokeprefer + bmgeneric.str_replace(',', ' /', bmgeneric.strtolower(bmgeneric.appgetFromPartPrefArryHash('SMOKEHASH', mw_info['matchsmokinghabitspref'],'')));
				}
				//Drinking Habits
				var drinkprefer = '';
				if (bmgeneric.empty(mw_info['matchdrinkinghabitspref']) || mw_info['matchdrinkinghabitspref'][0] == 0 || bmgeneric.count(mw_info['matchdrinkinghabitspref']) == 3) {
					displayMatchWatch["DRINKINGHABITS"] = bmlable.l_doesnt_matter;
				} else {
					drinkprefer = 'Prefer someone who ';
					displayMatchWatch["DRINKINGHABITS"] = drinkprefer + bmgeneric.str_replace(',', ' /', bmgeneric.strtolower(bmgeneric.appgetFromPartPrefArryHash('DRINKHASH', mw_info['matchdrinkinghabitspref'],'')));
				}
				
				//match education
				var matcheducation = mw_info[preVal + 'matcheducation']; // Education Field  1 - 1 -Any Bachelors in Engineering / Computers

				var output_arr = education ='';
				if (matcheducation[0] != 0) {
					for (edu = 0; edu < matcheducation.length; edu++) {
						output_arr += EDUFULLARRAY_EDIT[matcheducation[edu]] + '~';
					}				
					education = bmgeneric.substr(output_arr, 0, -1); 
					// Education Sub Field 4~6~8~5~49~9~95~50~83 for 1 - Any Bachelors in Engineering / Computers
				}
				var matcheducationid = mw_info[preVal + 'matcheducationid'];  
				// Education Sub Field 4~6~8~5~49~9~95~50~83~1~2

				if (education != '') {
					var educationArr = bmgeneric.explode('~', education);
					var removededucationsub = bmgeneric.array_diff(matcheducationid, educationArr); 
					//Remove Checked Education Id and Get SubCategoryId
					var removededucation = bmgeneric.implode('~', removededucationsub);
				} else {
					var removededucation = bmgeneric.implode('~', matcheducationid); 
					// Remove Checked Education
				}
		
				if (education != '')
					displayMatchWatch["EDUCATION"] = bmgeneric.appgetFromPartPrefArryHash('EN_EDUCATIONHASH', matcheducation,'');// Get Education Main Category
				if (education != '' && removededucation != "")
					displayMatchWatch["EDUCATION"] += ', ';
				if(bmgeneric.empty(displayMatchWatch["EDUCATION"]))
					displayMatchWatch["EDUCATION"] ='';
				if (removededucation != "")
					displayMatchWatch["EDUCATION"] += bmgeneric.appgetFromPartPrefArryHash('EN_EDUCATION', removededucation,'');// Get Education Main SubCategory
				
				if (removededucation == "" && education == "") {
					displayMatchWatch["EDUCATION"] = 'Any';
				}

				//occupation
				bmgenericarrys.OCCUPATIONLIST['101'] = "Business";
				bmgenericarrys.OCCUPATIONLIST['102'] = bmlable.l_not_working;
				if (bmgeneric.empty(mw_info[preVal + 'matchoccupationselected']) || mw_info[preVal + 'matchoccupationselected'][0]== 0) {
					displayMatchWatch['OCCUPATION'] = bmlable.l_any; //'Any';
				} else {
					displayMatchWatch['OCCUPATION'] = bmgeneric.appgetFromPartPrefArryHash('OCCUPATIONLIST', mw_info[preVal + 'matchoccupationselected'],'');
				}
				//income 
				if (bmgeneric.empty(mw_info[preVal + 'matchcountry']) || mw_info[preVal + 'matchcountry'][0]== 0) {
					arrcurrency = ANNUALINCOMEINRHASH;
				} else if (bmgeneric.in_array("98", mw_info[preVal + 'matchcountry'])) {
					arrcurrency = ANNUALINCOMEINRHASH;
				} else if (bmgeneric.in_array("222", mw_info[preVal + 'matchcountry'])) {
					arrcurrency = ANNUALINCOMEDOLLARHASH;
				} else {
					arrcurrency = ANNUALINCOMEDOLLARHASH;
				}
			
				/* Partner Pref Annual Income */
				if (bmgeneric.isset(mw_info['matchstincome']) || bmgeneric.isset(mw_info['matchendincome'])) {
					sStIncome = mw_info['matchstincome'];
					sEndIncome = mw_info['matchendincome'];
					if (sStIncome == '0' || sStIncome == '1' || sEndIncome=='0') {
						displayMatchWatch['ANNUALINCOME'] = arrcurrency[sStIncome];
					} else if (arrcurrency[sEndIncome] == "Any") {
						if (!stristr(arrcurrency[sStIncome], ' above')) {
							displayMatchWatch['ANNUALINCOME'] = arrcurrency[sStIncome] + " and above";
						} else {
							displayMatchWatch['ANNUALINCOME'] = arrcurrency[sStIncome];
						}
					} else {
						if(bmgeneric.array_key_exists(sStIncome,arrcurrency) && bmgeneric.array_key_exists(sEndIncome,arrcurrency))
							displayMatchWatch['ANNUALINCOME']= arrcurrency[sStIncome]+" "+bmlable.l_to+" "+arrcurrency[sEndIncome];
						else
							displayMatchWatch['ANNUALINCOME']= 'Any';
					}
				}
				//country
				displayMatchWatch["COUNTRY"] = bmgeneric.appgetFromPartPrefArryHash('COUNTRYHASH', mw_info[preVal + 'matchcountry'],'');
				var match_India = bmgeneric.appgetFromPartPrefArryHash('RESIDINGINDIANAMES', mw_info[preVal + 'matchindianstates'],'');
				var Match_US = bmgeneric.appgetFromPartPrefArryHash('RESIDINGUSANAMES', mw_info[preVal + 'matchusstates'],'');

				//state and city
				var pp_cityArr = [];
				if (!bmgeneric.empty(mw_info[preVal + 'matchindianstates'][0]) && !bmgeneric.empty(mw_info['matchindiancity'][0])) {
					var State = mw_info[preVal + 'matchindianstates'];
					var city = mw_info['matchindiancity'];
					var totalStates = bmgeneric.count(State);
					var totalCities = bmgeneric.count(city);
					if(totalCities >0 && totalStates >0){					
						async.forEachOf(State, function (stvalue, stkey, next) {
							try {
								var statename = bmgeneric.allucwords(RESIDINGCITYSTATEMAPPINGHASH[stvalue]);
								if(!bmgeneric.empty(statename)){									
									var cityarray = Object.keys(INSTATE[statename]);
									if (bmgeneric.is_array(cityarray)) {
										async.forEachOf(city, function (ctvalue, ctkey, nmext) {
											if (cityarray.indexOf(ctvalue) > -1) {
												pp_cityArr.push(INSTATE[statename][ctvalue]);
											}
											nmext();
										}, function (err) {
											if (err) 
												console.error(arg.VIEWEDID,"state and city:",err.message);
											// configs is now a map of JSON data
											next();
										});	
									} else {
										next();
									}
								} else {
									next();
								}								
							} catch (e) {
								return next(e);
							}
						}, function (err) {
							if (err) 
								console.error(arg.VIEWEDID,"state and city 1:",err.message);
							// configs is now a map of JSON data
							pp_cityArr = bmgeneric.array_unique(pp_cityArr);
						});	
					}	
				}
				
				var pp_cities = '';
				if (mw_info['matchindiancity'][0]== '0') {
					pp_cities = bmlable.l_any; //'Any';
				} else if (bmgeneric.count(pp_cityArr) > 0) {
					pp_cities = bmgeneric.implode(', ', pp_cityArr);
				}
				if(pp_cities==''){
					pp_cities = bmlable.l_any;
				}
				var pp_state = '';
				if (bmgeneric.in_array(222, mw_info[preVal + 'matchcountry']) || bmgeneric.in_array(98, mw_info[preVal + 'matchcountry'])) {
					if (bmgeneric.in_array(222, mw_info[preVal + 'matchcountry'])) {
						pp_state = Match_US; ////Match_US
					}
					if (bmgeneric.in_array(98, mw_info[preVal + 'matchcountry'])) {
						if (pp_state != '') {
							pp_state+=', ';
						}
						pp_state += match_India; ////Match_India;
					}
				} else {
					pp_state += bmlable.l_any; //'Any';
				}
				
				if(bmgeneric.count(mw_info[preVal + 'matchcountry'])) {
					displayMatchWatch['RESIDINGSTATE'] = pp_state;
				}
				if (pp_cities) {
					displayMatchWatch['RESIDINGCITY'] = pp_cities;
				}
				//Citizen checking 
				displayMatchWatch["CITIZENSHIP"] = bmgeneric.appgetFromPartPrefArryHash('COUNTRYHASH', mw_info[preVal + 'matchcitizenship'],'');
			   
				//Partner Preference
				if (!bmgeneric.empty(mw_info[preVal + 'partnerdescription'])) {
					displayMatchWatch["PARTNERDESCLABEL"] = profCrtdLab['looking_for'];
					displayMatchWatch["PARTNERDESCRIPTION"] = bmgeneric.html_entity_decode(mw_info[preVal + 'partnerdescription']);
				}else{
					displayMatchWatch["PARTNERDESCLABEL"] = profCrtdLab['looking_for'];
					displayMatchWatch["PARTNERDESCRIPTION"] = bmlable.l_not_specified;
				}
				
				if ((bmgeneric.in_array(arg.APPTYPE,bmvars.ANDROIDAPPTYPE)) || (arg.APPTYPE == 115)) {
					displayMatchWatch['MANGLIKLABEL'] = bmgenericarrys.DOSHAMNAME[bmgeneric.strtoupper(PartDominArr['domainnameshort'])];
				}
			}
			callback(null,displayMatchWatch);
		}catch(err){
			console.log("View Profile memberpref - Error:",err);
			return callback(null,displayMatchWatch);
		}
	},
	partprefmatch:function(data,userInfo,partnerInfo,MWPP,GETDOMAININFO,mwdbinfo,callback){
		try{			
			var matchResultArr = {};						
			if (userInfo['partnerprefset'] == 1) {
				sysval = '';
				sysval2 = 'match';
			} else {
				sysval = 'sys';
				sysval2 = 'sys';
			}		
			
			if(data.SPHINXENABLE ==0){
				sysval2 ="";
				sysval ='';
				var userInfo = Object.assign(userInfo,mwdbinfo);
			}
			//console.log("mwdbinfo==============:",mwdbinfo);
			//console.log("userInfo==============:",userInfo);
			//Age Validation starts
			if ((partnerInfo['age'] >= userInfo[sysval2+ 'stage']) && (partnerInfo['age'] <= userInfo[sysval2+ 'endage'])) {
				matchResultArr['AGE'] = 'true';
			} else {
				matchResultArr['AGE'] = 'false';
			}
			//Age Validation ends
			
			//Height Validation starts
			partnerInfo['height'] = bmgeneric.round(partnerInfo['height']);
			userInfo[sysval2+ 'stheight'] = bmgeneric.round(userInfo[sysval2+ 'stheight']);
			userInfo[sysval2+ 'endheight'] = bmgeneric.round(userInfo[sysval2+ 'endheight']);
			if ((partnerInfo['height'] >= userInfo[sysval2+ 'stheight']) && (partnerInfo['height'] <= userInfo[sysval2+ 'endheight'])) {
				matchResultArr['HEIGHT'] = 'true';
			} else {
				matchResultArr['HEIGHT'] = 'false';
			}
			//Height Validation ends
		
			//Mother Tongue Validation starts
			if (bmgeneric.in_array("0", userInfo[sysval2+ 'mothertongue']) || bmgeneric.checkMatchData(partnerInfo['mothertongue'], userInfo[sysval2+ 'mothertongue']) == true) {
				matchResultArr['MOTHERTONGUE'] = 'true';
			} else {
				matchResultArr['MOTHERTONGUE'] = 'false';
			}
			//Mother Tongue validation ends
			
			//Maritalstatus condition starts
			if (bmgeneric.in_array("0", userInfo[sysval+ 'matchmaritalstatus']) || bmgeneric.checkMatchData(partnerInfo['maritalstatus'], userInfo[sysval+ 'matchmaritalstatus']) == true) {
				matchResultArr['MARITALSTATUS'] = 'true';					
				if(partnerInfo['maritalstatus'] != 1){
					if ((bmgeneric.in_array('0', userInfo[sysval+ 'matchmaritalstatus']) || bmgeneric.in_array('2', userInfo[sysval+ 'matchmaritalstatus']) || bmgeneric.in_array('3', userInfo[sysval+ 'matchmaritalstatus']) || bmgeneric.in_array('4', userInfo[sysval+ 'matchmaritalstatus'])) && partnerInfo['maritalstatus'] != 1 && partnerInfo['have_children'] != 100) {
						// Doesn't matter //
						if (userInfo[sysval+ 'matchhavingchildren'] == 0 && bmgeneric.is_numeric(userInfo[sysval+ 'matchhavingchildren']))
							matchResultArr['HAVECHILD'] = 'true';
						// Living Together //
						else if (partnerInfo['have_children'] == 1 && userInfo[sysval+ 'matchhavingchildren'] == 2)
							matchResultArr['HAVECHILD'] = 'true';
						// Living Separately //
						else if (partnerInfo['have_children'] == 2 && userInfo[sysval+ 'matchhavingchildren'] == 3)
							matchResultArr['HAVECHILD'] = 'true';
						// no children //
						else if (partnerInfo['have_children'] == 0 && userInfo[sysval+ 'matchhavingchildren'] == 1 && bmgeneric.is_numeric(partnerInfo['have_children']))
							matchResultArr['HAVECHILD'] = 'true';
						else
							matchResultArr['HAVECHILD'] = 'false';
					}else
						matchResultArr['HAVECHILD'] = 'false';
				}
			} else {
				matchResultArr['MARITALSTATUS'] = 'false';
			}
			//Maritalstatus condition end

			//Include other Religion Caste validation starts
			if (userInfo['ppincludeotherreligions'] == 1 && !bmgeneric.in_array("0", userInfo[sysval+ 'matchcaste']) && userInfo[sysval+ 'matchcaste'][0] != '' && userInfo[sysval+ 'matchreligion'][0] != '') {
				//Map the Religion and caste for include other religion
				IdealCasteArray = bmgeneric.mwOtherReligionCasteMapping(userInfo[sysval+ 'matchcaste'], userInfo[sysval+ 'matchreligion']);
				if (bmgeneric.in_array(partnerInfo['caste'], IdealCasteArray['CASTE'])) {
					matchResultArr['CASTE'] = 'true';
				} else {
					matchResultArr['CASTE'] = 'false';
				}

				if (bmgeneric.in_array(partnerInfo['religion'], IdealCasteArray['RELIGION'])) {
					matchResultArr['RELIGION'] = 'true';
				} else {
					matchResultArr['RELIGION'] = 'false';
				}
				//Include other Religion Caste validation Ends
			} else {				
				  //Religion validation starts
				if (bmgeneric.in_array("0", userInfo[sysval+ 'matchreligion']) || userInfo[sysval+'matchreligion'][0]=='' || bmgeneric.empty(userInfo[sysval+'matchreligion'])) {
					matchResultArr['RELIGION'] = 'true';
				} else if (!bmgeneric.in_array("0", userInfo[sysval+ 'matchreligion']) && userInfo[sysval+ 'matchreligion'][0] != '') {
					if (bmgeneric.in_array(2, userInfo[sysval+ 'matchreligion']))  { // Muslim
						userInfo[sysval+ 'matchreligion'][0] = 10;
						userInfo[sysval+ 'matchreligion'][1] = 11;
						userInfo[sysval+ 'matchreligion'][2] = 25;		
					} else if(bmgeneric.in_array(25, userInfo[sysval+'matchreligion']))	{ // Muslim others		
						userInfo[sysval+'matchreligion'][0] = 10;
						userInfo[sysval+'matchreligion'][1] = 11;
						userInfo[sysval+'matchreligion'][2] = 2;
					} else if(bmgeneric.in_array(10, userInfo[sysval+'matchreligion']) || bmgeneric.in_array(11, userInfo[sysval+'matchreligion'])) {	// Muslim others
						userInfo[sysval+'matchreligion'][1] = 25;
						userInfo[sysval+'matchreligion'][2] = 2;
					} else if (bmgeneric.in_array(3, userInfo[sysval+ 'matchreligion'])) { //Christian
						userInfo[sysval+ 'matchreligion'][1] = 12;
						userInfo[sysval+ 'matchreligion'][2] = 26;
						userInfo[sysval+ 'matchreligion'][3] = 13;
						userInfo[sysval+ 'matchreligion'][4] = 14;
						} else if(bmgeneric.in_array(26,userInfo[sysval+'matchreligion']) ) {	//Christian others
						userInfo[sysval+'matchreligion'][1] = 12;
						userInfo[sysval+'matchreligion'][2] = 3;
						userInfo[sysval+'matchreligion'][3] = 13;
						userInfo[sysval+'matchreligion'][4] = 14;		
						} else if(bmgeneric.in_array(12,userInfo[sysval+'matchreligion']) || bmgeneric.in_array(13,userInfo[sysval+'matchreligion']) || bmgeneric.in_array(14,userInfo[sysval+'matchreligion'])) {	//Christian orthodox,Christian - Protestant,christian catolic			
						userInfo[sysval+'matchreligion'][0] = 3;
						userInfo[sysval+'matchreligion'][1] = 26;
					} else if(bmgeneric.in_array(5, userInfo[sysval+ 'matchreligion'])) { //Jain
							userInfo[sysval+ 'matchreligion'][0] = 15;
							userInfo[sysval+ 'matchreligion'][1] = 16;
							userInfo[sysval + 'matchreligion'][2] = 27;
						} else if(bmgeneric.in_array(27,userInfo[sysval+'matchreligion'])) { //Jain others
						userInfo[sysval+'matchreligion'][0] = 15;
						userInfo[sysval+'matchreligion'][1] = 16;
						userInfo[sysval+'matchreligion'][2] = 5;	
					} else if(bmgeneric.in_array(15,userInfo[sysval+'matchreligion']) || bmgeneric.in_array(16,userInfo[sysval+'matchreligion'])) {  //Jain
						userInfo[sysval+'matchreligion'][0] = 5;
						userInfo[sysval+'matchreligion'][1] = 27;		
					}
					if (bmgeneric.in_array(partnerInfo['religion'], userInfo[sysval+ 'matchreligion'])) {
						matchResultArr['RELIGION'] = 'true';
					} else {
						matchResultArr['RELIGION'] = 'false';
					}
				} else {
					matchResultArr['RELIGION'] = 'false';
				}
				//Religion validation Ends
				
				//Caste validation starts
				if (matchResultArr['RELIGION'] == 'true') {					
					if (bmgeneric.in_array("0", userInfo[sysval+ 'matchcaste'])) {
						matchResultArr['CASTE'] = 'true';
					} else if (!bmgeneric.in_array("0", userInfo[sysval+ 'matchcaste']) && userInfo[sysval+ 'matchcaste'][0] != '') {
						if (bmgeneric.in_array('998', userInfo[sysval+ 'matchcaste']) && partnerInfo['castenobar'] != 1 && partnerInfo['caste'] != 0 && (!bmgeneric.in_array(partnerInfo['caste'], userInfo[sysval+ 'matchcaste'])) && !bmgeneric.in_array(1000, userInfo[sysval+ 'matchcaste'])) {
							matchResultArr['CASTE'] = 'false';
						} else if (!bmgeneric.in_array(partnerInfo['caste'], userInfo[sysval+ 'matchcaste']) && !bmgeneric.in_array('998', userInfo[sysval+ 'matchcaste']) && !bmgeneric.in_array(1000, userInfo[sysval+ 'matchcaste'])) {
							matchResultArr['CASTE'] = 'false';
						} else if (bmgeneric.in_array(partnerInfo['caste'], userInfo[sysval+ 'matchcaste'])) {
							matchResultArr['CASTE'] = 'true';
						} else if (bmgeneric.in_array(1000, userInfo[sysval+ 'matchcaste'])) {
							combinemothertongue = bmgeneric.implode('~', userInfo[sysval2+ 'mothertongue']);
							braminAllCasteDisplay = bmgeneric.bmfuncSearchCasteMapping(combinemothertongue);
							braminAllCasteDisplay = bmgeneric.explode('~', braminAllCasteDisplay);
							if (bmgeneric.in_array(partnerInfo['caste'], braminAllCasteDisplay)) {
								matchResultArr['CASTE'] = 'true';
							} else {
								matchResultArr['CASTE'] = 'false';
							}
						} else {
							matchResultArr['CASTE'] = 'true';
						}
					} else {
						matchResultArr['CASTE'] = 'false';
					}
				}
				else
					matchResultArr['CASTE'] = 'false';				
			}
			//Caste validation ends

			//Subcaste validation starts
			if (matchResultArr['CASTE'] == 'true' && matchResultArr['RELIGION'] == 'true') {
				if (bmgeneric.in_array("0", userInfo[sysval+ 'matchsubcaste']) && partnerInfo['subcasteid'] != "0") {
					matchResultArr['SUBCASTE'] = 'true';
				} else if (partnerInfo['subcasteid'] == "0" || partnerInfo['subcasteid'] == "9998" || partnerInfo['subcasteid'] == "9999") {
					matchResultArr['SUBCASTE'] = 'false';
				} else if (bmgeneric.checkMatchData(partnerInfo['subcasteid'], userInfo[sysval+ 'matchsubcaste']) == true) {
					matchResultArr['SUBCASTE'] = 'true';
				} else {
					matchResultArr['SUBCASTE'] = 'false';
				}
			} else {
				if (partnerInfo['subcasteid'] == "0" || partnerInfo['subcasteid'] == "9998" || partnerInfo['subcasteid'] == "9999")
					matchResultArr['SUBCASTE'] = 'false';
				else if (bmgeneric.in_array(partnerInfo['subcasteid'], userInfo[sysval+ 'matchsubcaste']))
					matchResultArr['SUBCASTE'] = 'true';
				else
					matchResultArr['SUBCASTE'] = 'false';
			}
			//Subcaste validation Ends
			
			//Gothra Id validation  starts			
			var domainid = GETDOMAININFO['domainid'];
			gothra_avail = 0;
			if(bmgeneric.array_key_exists(bmvarssearcharrincen.GOTHRAAVAIL,domainid)){
				var value = bmvarssearcharrincen.GOTHRAAVAIL[domainid];
				if (bmgeneric.in_array(userInfo['caste'], value))
						gothra_avail = 1;
			}
			if (matchResultArr['CASTE'] == 'true' && matchResultArr['RELIGION'] == 'true') {
				if (gothra_avail) {
					if (bmgeneric.in_array(1, userInfo[sysval+ 'matchreligion']) && !bmgeneric.in_array("0", userInfo[sysval2+ 'gothraid']) && userInfo[sysval2+ 'gothraid'][0] != '') {
						if (bmgeneric.in_array(998, userInfo[sysval2+ 'gothraid']) && (userInfo["exclude_ppgothra_id"] > 0) && (userInfo["exclude_ppgothra_id"] == partnerInfo['gothraid'])) {
							matchResultArr['GOTHRA'] = 'false';
						} else if (!bmgeneric.in_array(998, userInfo[sysval2+ 'gothraid']) && !bmgeneric.in_array(partnerInfo['gothraid'], userInfo[sysval2+ 'gothraid'])) {
							matchResultArr['GOTHRA'] = 'false';
						} else {
							matchResultArr['GOTHRA'] = 'true';
						}
					} else if (bmgeneric.in_array(1, userInfo[sysval+ 'matchreligion']) && bmgeneric.in_array("0", userInfo[sysval2+ 'gothraid']) && userInfo["exclude_ppgothra_id"] > 0) {
						if (userInfo["exclude_ppgothra_id"] == partnerInfo['gothraid']) {
							matchResultArr['GOTHRA'] = 'false';
						} else {
							matchResultArr['GOTHRA'] = 'true';
						}
					} else if (bmgeneric.in_array(1, userInfo[sysval+ 'matchreligion']) && matchResultArr['CASTE'] == 'true' && bmgeneric.in_array("0", userInfo[sysval2+ 'gothraid'])) {
						matchResultArr['GOTHRA'] = 'true';
					} else {
						matchResultArr['GOTHRA'] = 'false';
					}
				} else if (partnerInfo['gothra'] != '') {
				if (bmgeneric.in_array("0", userInfo[sysval2+ 'gothraid']) || bmgeneric.empty(userInfo[sysval2+'gothraid']) || userInfo[sysval2+'gothraid'][0] == "") {
						matchResultArr['GOTHRA'] = 'true';
					} else {
						matchResultArr['GOTHRA'] = 'false';
					}
				} else if ((bmgeneric.in_array(998, userInfo[sysval2+ 'gothraid']) || bmgeneric.in_array("0", userInfo[sysval2+ 'gothraid'])) && partnerInfo['gothraid'] != 0 && userInfo[sysval2+ 'gothraid'] != '' && userInfo[sysval2+ 'gothraid'] != partnerInfo['gothraid']) {
					matchResultArr['GOTHRA'] = 'true';
				} else {
					matchResultArr['GOTHRA'] = 'false';
				}
			} else {
				if (gothra_avail) {
					if (bmgeneric.in_array(1, userInfo[sysval+ 'matchreligion']) && !bmgeneric.in_array("0", userInfo[sysval2+ 'gothraid']) && userInfo[sysval2+ 'gothraid'][0] != '') {
						if (bmgeneric.in_array(998, userInfo[sysval2+ 'gothraid']) && (userInfo["exclude_ppgothra_id"] > 0) && (userInfo["exclude_ppgothra_id"] == partnerInfo['gothraid'])) {
							matchResultArr['GOTHRA'] = 'false';
						} else if (!bmgeneric.in_array(998, userInfo[sysval2+ 'gothraid']) && !bmgeneric.in_array(partnerInfo['gothraid'], userInfo[sysval2+ 'gothraid'])) {
							matchResultArr['GOTHRA'] = 'false';
						} else {
							matchResultArr['GOTHRA'] = 'true';
						}
					} else if (bmgeneric.in_array(1, userInfo[sysval+ 'matchreligion']) && bmgeneric.in_array("0", userInfo[sysval2+ 'gothraid']) && userInfo["exclude_ppgothra_id"] > 0) {
						if (userInfo["exclude_ppgothra_id"] == partnerInfo['gothraid']) {
							matchResultArr['GOTHRA'] = 'false';
						} else {
							matchResultArr['GOTHRA'] = 'true';
						}
					} else {
						matchResultArr['GOTHRA'] = 'false';
					}
				} else {
					matchResultArr['GOTHRA'] = 'false';
				}
			}
			//Gothra Id validation ends	
			
			//Star validation starts
			if (matchResultArr['CASTE'] == 'true' && matchResultArr['RELIGION'] == 'true') {
				if (partnerInfo['star'] == "0")
					matchResultArr['STAR'] = 'false';
				else if (bmgeneric.in_array('0', userInfo['matchstarid']) || bmgeneric.empty(userInfo['matchstarid']) || userInfo['matchstarid'][0] == "")
					matchResultArr['STAR'] = 'true';
				else if (bmgeneric.checkMatchData(partnerInfo['star'], userInfo['matchstarid']) == true)
					matchResultArr['STAR'] = 'true';
				else
					matchResultArr['STAR'] = 'false';
			}else {
				if(bmgeneric.in_array('0', userInfo['matchstarid']) || bmgeneric.empty(userInfo['matchstarid']) || userInfo['matchstarid'][0] == "")
					matchResultArr['STAR'] = 'true';
				else if (partnerInfo['star'] == "0")
					matchResultArr['STAR'] = 'false';
				else if (bmgeneric.in_array(partnerInfo['star'], userInfo['matchstarid']) && !bmgeneric.in_array("0", userInfo['matchstarid']))
					matchResultArr['STAR'] = 'true';
				else
					matchResultArr['STAR'] = 'false';
			}
			//Star validation ends
			
			//Manglik condition starts			
			var doshamval = bmvarssearcharrincen.COMBINEDHOSHAARRAY[partnerInfo['dosham']];
			if(!bmgeneric.empty(doshamval))
				doshamval = bmgeneric.explode("~",doshamval);
			else {
				var doshamval = {};
				doshamval[0] = partnerInfo['dosham'];
			}
				
			if (matchResultArr['CASTE'] == 'true' && matchResultArr['RELIGION'] == 'true') {
				if(bmgeneric.in_array(4,doshamval) && (bmgeneric.in_array(1, userInfo[sysval2+ 'manglik']) || bmgeneric.in_array("0", userInfo[sysval2+ 'manglik'])))
					matchResultArr['MANGLIK'] = 'true';
				else if(bmgeneric.in_array(2,doshamval) && (bmgeneric.in_array(2, userInfo[sysval2+ 'manglik']) || bmgeneric.in_array("0", userInfo[sysval2+ 'manglik'])))
					matchResultArr['MANGLIK'] = 'true';
				else if(bmgeneric.in_array(3,doshamval) && (bmgeneric.in_array(2, userInfo[sysval2+ 'manglik']) || bmgeneric.in_array(1, userInfo[sysval2+ 'manglik']) || bmgeneric.in_array("0", userInfo[sysval2+ 'manglik'])))
					matchResultArr['MANGLIK'] = 'true';
				else if(partnerInfo['suddhajadhagam'] ==1 && userInfo['suddhajadhagam'] == 1)
						matchResultArr['MANGLIK'] = 'true';
				else
					matchResultArr['MANGLIK'] = 'false';
			}else {
				if (bmgeneric.in_array(4,doshamval) && (bmgeneric.in_array(1, userInfo[sysval2+ 'manglik']) || bmgeneric.in_array("0", userInfo[sysval2+ 'manglik'])))
					matchResultArr['MANGLIK'] = 'true';
				else if (bmgeneric.in_array(2,doshamval) && (bmgeneric.in_array(2, userInfo[sysval2+ 'manglik']) || bmgeneric.in_array("0", userInfo[sysval2+ 'manglik'])))
					matchResultArr['MANGLIK'] = 'true';
				else if(partnerInfo['suddhajadhagam'] ==1 && userInfo['suddhajadhagam'] == 1)
						matchResultArr['MANGLIK'] = 'true';
				else
					matchResultArr['MANGLIK'] = 'false';
			}
			//Manglik condition ends
			
			//Eating condition starts
			//1-Vegetarian; 2- Non Vegetarian; 3- Eggetarian 
			//Eating Habits	Mapping	
			//Veg			1 - 1,3		Veg+Egg.	
			//Egg			3 - 1,3		Veg+Egg.
			//Non veg		2 - 2,3		Non-Veg+Egg.			
			if ((bmgeneric.in_array("0", userInfo[sysval2+ 'eatinghabitspref']) || bmgeneric.empty(userInfo[sysval2+'eatinghabitspref']) || userInfo[sysval2+'eatinghabitspref'][0] == "") && userInfo['partnerprefset'] == 1) {
				matchResultArr['EATINGHABITS'] = 'true';
			} else if (partnerInfo['eatinghabits'] == "0") {
				matchResultArr['EATINGHABITS'] = 'false';
			} else if (!bmgeneric.in_array("0", userInfo[sysval2+ 'eatinghabitspref']) && userInfo[sysval2+ 'eatinghabitspref'][0] != '' && partnerInfo['eatinghabits'] != 0) {
				if ((bmgeneric.in_array("1", userInfo[sysval2+ 'eatinghabitspref']) || bmgeneric.in_array("3", userInfo[sysval2+ 'eatinghabitspref'])) && (partnerInfo['eatinghabits'] == 1 || partnerInfo['eatinghabits'] == 3) && !bmgeneric.in_array("2", userInfo[sysval2+ 'eatinghabitspref'])) {
					matchResultArr['EATINGHABITS'] = 'true'; //Vegetarian, Eggetarian 		
				} else if (bmgeneric.in_array("2", userInfo[sysval2+ 'eatinghabitspref']) && (partnerInfo['eatinghabits'] == 2 || partnerInfo['eatinghabits'] == 3)) {
					matchResultArr['EATINGHABITS'] = 'true'; //Non Vegetarian			
				} else if(bmgeneric.in_array("2", userInfo[sysval2+'eatinghabitspref']) &&  bmgeneric.in_array("1", userInfo[sysval2+'eatinghabitspref']) && (partnerInfo['eatinghabits']==1 || partnerInfo['eatinghabits']==2)) {
				 matchResultArr['EATINGHABITS'] = 'true'; //Non Vegetarian			
				} else {
					matchResultArr['EATINGHABITS'] = 'false';
				}
			} else {
				matchResultArr['EATINGHABITS'] = 'false';
			}
			//Eating condition ends
			
			//smoking habits
			if (bmgeneric.in_array("0", userInfo['matchsmokinghabitspref']) && userInfo['partnerprefset'] == 1) {
				matchResultArr['SMOKINGHABITS'] = 'true';  //Doesn't matter	
			} else if (partnerInfo['smokinghabits'] == "0") {
				matchResultArr['SMOKINGHABITS'] = 'false'; //Not Specified
			} else if (!bmgeneric.in_array("0", userInfo['matchsmokinghabitspref']) && userInfo['matchsmokinghabitspref'][0] != '' && partnerInfo['smokinghabits'] != 0) {
				if ((bmgeneric.in_array("1", userInfo['matchsmokinghabitspref'])) && (partnerInfo['smokinghabits'] == 1) && !bmgeneric.in_array("2", userInfo['matchsmokinghabitspref']) && !bmgeneric.in_array("3", userInfo['matchsmokinghabitspref'])) {
					matchResultArr['SMOKINGHABITS'] = 'true';   //Non-smoker
				} else if (bmgeneric.in_array("2", userInfo['matchsmokinghabitspref']) && (partnerInfo['smokinghabits'] == 2) && !bmgeneric.in_array("3", userInfo['matchsmokinghabitspref']) && !bmgeneric.in_array("1", userInfo['matchsmokinghabitspref'])) {
					matchResultArr['SMOKINGHABITS'] = 'true';   //Light / Social smoker
				} else if (bmgeneric.in_array("3", userInfo['matchsmokinghabitspref']) && (partnerInfo['smokinghabits'] == 3) && !bmgeneric.in_array("2", userInfo['matchsmokinghabitspref']) && !bmgeneric.in_array("1", userInfo['matchsmokinghabitspref'])) {
					matchResultArr['SMOKINGHABITS'] = 'true';   //Regular smoker
				} else {
					matchResultArr['SMOKINGHABITS'] = 'false';
				}
			} else {
				matchResultArr['SMOKINGHABITS'] = 'false';
			}

			//drinking habits
			if (bmgeneric.in_array("0", userInfo['matchdrinkinghabitspref']) && userInfo['partnerprefset'] == 1) {
				matchResultArr['DRINKINGHABITS'] = 'true';  //Doesn't matter
				
			} else if (partnerInfo['drinkinghabits'] == "0") {
				matchResultArr['DRINKINGHABITS'] = 'false'; //Not Specified
			} else if (!bmgeneric.in_array("0", userInfo['matchdrinkinghabitspref']) && userInfo['matchdrinkinghabitspref'][0] != '' && partnerInfo['drinkinghabits'] != 0) {
				
				if ((bmgeneric.in_array("1", userInfo['matchdrinkinghabitspref'])) && (partnerInfo['drinkinghabits'] == 1)) {
					matchResultArr['DRINKINGHABITS'] = 'true';   //Non-smoker
				} else if (bmgeneric.in_array("2", userInfo['matchdrinkinghabitspref']) && (partnerInfo['drinkinghabits'] == 2) && !bmgeneric.in_array("3", userInfo['matchdrinkinghabitspref']) && !bmgeneric.in_array("1", userInfo['matchdrinkinghabitspref'])) {
					matchResultArr['DRINKINGHABITS'] = 'true';   //Light / Social smoker
				} else if (bmgeneric.in_array("3", userInfo['matchdrinkinghabitspref']) && (partnerInfo['drinkinghabits'] == 3) && !bmgeneric.in_array("2", userInfo['matchdrinkinghabitspref']) && !bmgeneric.in_array("1", userInfo['matchdrinkinghabitspref'])) {
					matchResultArr['DRINKINGHABITS'] = 'true';   //Regular smoker
				} else {
					matchResultArr['DRINKINGHABITS'] = 'false';
				}
			} else {
				matchResultArr['DRINKINGHABITS'] = 'false';
			}

			//Matching country condition starts
			if (bmgeneric.in_array("0", userInfo[sysval+ 'matchcountry']) || (bmgeneric.checkMatchData(partnerInfo['countryselected'], userInfo[sysval+ 'matchcountry']) == true)) {
				matchResultArr['COUNTRY'] = 'true';
			} else {
				matchResultArr['COUNTRY'] = 'false';
			}
			//Matching country condition ends
			
			//citizenship start
			if (bmgeneric.in_array("0", userInfo[sysval+ 'matchcitizenship']) || (bmgeneric.checkMatchData(partnerInfo['citizenship'], userInfo[sysval+ 'matchcitizenship']) == true)) {
				matchResultArr['CITIZENSHIP'] = 'true';
			} else {
				matchResultArr['CITIZENSHIP'] = 'false';
			}
			//citizenship end
			
			//physical status
			if (userInfo[sysval2+ 'physicalstatus'] == 2) {
				matchResultArr['PHYSICALSTATUS'] = 'true';
			} else if (userInfo[sysval2+ 'physicalstatus'] != 2) {
				if (userInfo[sysval2+ 'physicalstatus'] == 0 && partnerInfo['specialcase'] == 0) {
					matchResultArr['PHYSICALSTATUS'] = 'true'; //Normal 		
				} else if (userInfo[sysval2+ 'physicalstatus'] == 1 && partnerInfo['specialcase'] == 1) {
					matchResultArr['PHYSICALSTATUS'] = 'true'; //Physically Challenged			
				} else {
					matchResultArr['PHYSICALSTATUS'] = 'false';
				}
			} else {
				matchResultArr['PHYSICALSTATUS'] = 'false';
			}

			//Matching states condition starts
			if (partnerInfo['countryselected'] == 98) {
				// condition added for andhra and telagana state splitup
				if (bmgeneric.in_array("0", userInfo[sysval+ 'matchindianstates']) || (bmgeneric.checkMatchData(partnerInfo['residingstate'], userInfo[sysval+ 'matchindianstates']) == true) || (bmgeneric.in_array("2", userInfo[sysval+ 'matchindianstates']) && bmgeneric.in_array("36", partnerInfo['residingstate'])) || (bmgeneric.in_array("36", userInfo[sysval+ 'matchindianstates']) && bmgeneric.in_array("2", partnerInfo['residingstate']))) {
					matchResultArr['STATE'] = 'true';
				} else {
					matchResultArr['STATE'] = 'false';
				}
			} else if (partnerInfo['countryselected'] == 222) {
				if (bmgeneric.in_array("0", userInfo[sysval+ 'matchusstates']) || (bmgeneric.checkMatchData(partnerInfo['residingstate'], userInfo[sysval+ 'matchusstates']) == true)) {
					matchResultArr['STATE'] = 'true';
				} else {
					matchResultArr['STATE'] = 'false';
				}
			} else if (partnerInfo['countryselected'] != 222 && partnerInfo['countryselected'] != 98) {
				if (bmgeneric.in_array("0", userInfo[sysval+ 'matchusstates']) && bmgeneric.in_array("0", userInfo[sysval+ 'matchindianstates'])) {
					matchResultArr['STATE'] = 'true';
				} else if (partnerInfo['residingstate'] == 0) {
					matchResultArr['STATE'] = 'false';
				} else {
					matchResultArr['STATE'] = 'false';
				}
			} else {
				matchResultArr['STATE'] = 'false';
			}
			//Matching states condition ends
			
			//Matching city condition starts	
			if (partnerInfo['countryselected'] == 98) {
				if (bmgeneric.in_array("0", userInfo[sysval+ 'matchindianstates'])) {
					matchResultArr['CITY'] = 'true';
				} else if (bmgeneric.in_array(partnerInfo['residingstate'], userInfo[sysval+ 'matchindianstates']) && (userInfo['matchindiancity'][0] == 0 || userInfo['matchindiancity'][0] != '')) {
					if (bmgeneric.in_array("0", userInfo['matchindiancity'])) {
						matchResultArr['CITY'] = 'true';
					} else if (bmgeneric.in_array(partnerInfo['residingdistrict'], userInfo['matchindiancity'])) {
						matchResultArr['CITY'] = 'true';
					} else {
						matchResultArr['CITY'] = 'false';
					}
				} else if (userInfo['matchindiancity'][0] != '' && partnerInfo['residingdistrict'] != 0) {
					matchResultArr['CITY'] = 'false';
				} else {
					matchResultArr['CITY'] = 'false';
				}
			} else if (partnerInfo['countryselected'] != 98) {
				if (bmgeneric.in_array("0", userInfo[sysval+ 'matchcountry']) || bmgeneric.in_array("222", userInfo[sysval+ 'matchcountry'])) {
					matchResultArr['CITY'] = 'true';
				} else if (partnerInfo['residingdistrict'] == 0) {
					matchResultArr['CITY'] = 'false';
				} else {
					matchResultArr['CITY'] = 'false';
				}
			}		
			//Matching city condition ends
		
			//Matching education Starts
			userInfo[sysval+'matcheducation'] = bmgeneric.addAditionalEducationHash(userInfo[sysval+'matcheducation']);		
			if(!bmgeneric.empty(userInfo[sysval+'matcheducationid']) && (!bmgeneric.in_array("0", userInfo[sysval+'matcheducationid'])) && (bmgeneric.in_array(partnerInfo['educationid'],userInfo[sysval+'matcheducationid']))){
				matchResultArr['EDUCATION'] = 'true';
			} else {
				if((bmgeneric.in_array("0", userInfo[sysval+'matcheducation']) && (bmgeneric.empty(userInfo[sysval+'matcheducationid']) || bmgeneric.in_array("0", userInfo[sysval+'matcheducationid']))) && (partnerInfo['educationselected']!=0 || partnerInfo['educationid']!=0)){
					matchResultArr['EDUCATION'] = 'true';		
				}
				else if(bmgeneric.in_array(partnerInfo['educationselected'],userInfo[sysval+'matcheducation'])){
					matchResultArr['EDUCATION'] = 'true';		
				}
				else if(bmgeneric.in_array(partnerInfo['educationid'],userInfo[sysval+'matcheducationid'])){
					matchResultArr['EDUCATION'] = 'true';		
				}
				else{
					matchResultArr['EDUCATION'] = 'false';
				}
			}			
			//Matching education ends
		
			//Occupation validation starts
			if ((bmgeneric.in_array("0", userInfo[sysval+ 'matchoccupationselected']) && partnerInfo['occupation_selected'] != 0) || bmgeneric.in_array(partnerInfo['occupation_selected'], userInfo[sysval+ 'matchoccupationselected'])) {
				matchResultArr['OCCUPATION'] = 'true';
			} else {
				matchResultArr['OCCUPATION'] = 'false';
			}
			//Occupation validation ends

			//Annual Income validation starts
			if (userInfo['matchstincome'] == 0 && userInfo['matchendincome'] == 0) {
				matchResultArr['ANNUALINCOME'] = 'true';
			} else if (partnerInfo['annualincomeininr'] == 0) {
				matchResultArr['ANNUALINCOME'] = 'false';
			} else if (userInfo['matchstincome'] != 0 && bmgeneric.trim(userInfo['matchstincome']) != '') {
				if (bmgeneric.in_array(98, userInfo[sysval+ 'matchcountry']) || bmgeneric.in_array("0", userInfo[sysval+ 'matchcountry'])) {
					if (userInfo['matchstincome'] == 1 && partnerInfo['annualincomeininr'] <= bmvarssearcharrincen.ANNUALINCOMEINRVALUEHASH[1]) {
						matchResultArr['ANNUALINCOME'] = 'true';
					} else if (userInfo['matchstincome'] == 29 && partnerInfo['annualincomeininr'] >= bmvarssearcharrincen.ANNUALINCOMEINRVALUEHASH[29]) {
						matchResultArr['ANNUALINCOME'] = 'true';
					} else if (userInfo['matchstincome'] >= 2 && userInfo['matchendincome'] <= 28) {
						if (userInfo['matchstincome'] < userInfo['matchendincome']) {
							if (partnerInfo['annualincomeininr'] >= bmvarssearcharrincen.ANNUALINCOMEINRVALUEHASH[userInfo['matchstincome']] && partnerInfo['annualincomeininr'] <= bmvarssearcharrincen.ANNUALINCOMEINRVALUEHASH[userInfo['matchendincome']]) {
								matchResultArr['ANNUALINCOME'] = 'true';
							} else {
								matchResultArr['ANNUALINCOME'] = 'false';
							}
						} else if (userInfo['matchstincome'] > 1 && userInfo['matchendincome'] == 0) {
							if (partnerInfo['annualincomeininr'] >= bmvarssearcharrincen.ANNUALINCOMEINRVALUEHASH[userInfo['matchstincome']]) {
								matchResultArr['ANNUALINCOME'] = 'true';
							} else {
								matchResultArr['ANNUALINCOME'] = 'false';
							}
						} else if (userInfo['matchstincome'] == 1 && userInfo['matchendincome'] == 0) {
							if (partnerInfo['annualincomeininr'] < bmvarssearcharrincen.ANNUALINCOMEINRVALUEHASH[userInfo['matchstincome']]) {
								matchResultArr['ANNUALINCOME'] = 'true';
							} else {
								matchResultArr['ANNUALINCOME'] = 'false';
							}
						} else {
							matchResultArr['ANNUALINCOME'] = 'false';
						}
					} else {
						matchResultArr['ANNUALINCOME'] = 'false';
					}
				} else {
					if (userInfo['matchstincome'] == 1 && partnerInfo['annualincomeininr'] <= bmvarssearcharrincen.ANNUALINCOMEDOLLARVALUEHASH[1] * global.USD4CONVERSION) {
						matchResultArr['ANNUALINCOME'] = 'true';
					} else if (userInfo['matchstincome'] == 16 && partnerInfo['annualincomeininr'] >= bmvarssearcharrincen.ANNUALINCOMEDOLLARVALUEHASH[16] * global.USD4CONVERSION) {
						matchResultArr['ANNUALINCOME'] = 'true';
					} else if (userInfo['matchstincome'] >= 2 && userInfo['matchstincome'] <= 15) {
						if (userInfo['matchstincome'] < userInfo['matchendincome']) {
							if ((partnerInfo['annualincomeininr'] >= bmvarssearcharrincen.ANNUALINCOMEDOLLARVALUEHASH[userInfo['matchstincome']] * global.USD4CONVERSION ) && (partnerInfo['annualincomeininr'] <= bmvarssearcharrincen.ANNUALINCOMEDOLLARVALUEHASH[userInfo['matchendincome']] * global.USD4CONVERSION )) {
								matchResultArr['ANNUALINCOME'] = 'true';
							} else {
								matchResultArr['ANNUALINCOME'] = 'false';
							}
						} else if (userInfo['matchstincome'] > 1 && userInfo['matchendincome'] == 0) {
							if ((partnerInfo['annualincomeininr'] >= bmvarssearcharrincen.ANNUALINCOMEDOLLARVALUEHASH[userInfo['matchstincome']] * global.USD4CONVERSION)) {
								matchResultArr['ANNUALINCOME'] = 'true';
							} else {
								matchResultArr['ANNUALINCOME'] = 'false';
							}
						} else if (userInfo['matchstincome'] == 1 && userInfo['matchendincome'] == 0) {
							if (partnerInfo['annualincomeininr'] < bmvarssearcharrincen.ANNUALINCOMEINRVALUEHASH[userInfo['matchstincome']] * global.USD4CONVERSION) {
								matchResultArr['ANNUALINCOME'] = 'true';
							} else {
								matchResultArr['ANNUALINCOME'] = 'false';
							}
						} else {
							matchResultArr['ANNUALINCOME'] = 'false';
						}
					} else {
						matchResultArr['ANNUALINCOME'] = 'false';
					}
				}
			} else {
				matchResultArr['ANNUALINCOME'] = 'false';
			}

			//callback(null,matchResultArr);
			if ((bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE)) || (data.APPTYPE == 115)) {
				delete MWPP['MANGLIKLABEL'];
				delete MWPP['TITLE'];
				delete MWPP['PARTNERDESCLABEL'];
			}
			var religiongrparray = ['RELIGION', 'CASTE', 'SUBCASTE', 'GOTHRA', 'STAR', 'MANGLIK'];
			var basicinfgrparray = ['AGE', 'HEIGHT', 'MARITALSTATUS', 'MOTHERTONGUE', 'PHYSICALSTATUS', 'EATINGHABITS', 'SMOKINGHABITS', 'DRINKINGHABITS','HAVECHILD','EDUCATION', 'OCCUPATION', 'ANNUALINCOME'];
			var locationgrparray = ['COUNTRY', 'STATE', 'CITY', 'CITIZENSHIP'];
			var ppmatchvalue_arr = {};
			tickyesarray = {};
			var i=0;
			async.each(Object.keys(matchResultArr), function(keymul,inCb) 
			{
				if(matchResultArr[keymul] != 'false')
				{
					ppmatchvalue_arr[i] = keymul;	
				}	
				i++;
				inCb(null);  // inner callback
			}, function(err) {
				async.each(religiongrparray, function(varval,reinCb) 
				{
					if(bmgeneric.in_array(varval,ppmatchvalue_arr) || (MWPP['SUBCASTE']=='Any' && bmgeneric.in_array('CASTE',ppmatchvalue_arr))){
						if(MWPP['RELIGION']=='Christian') {
							if(varval == 'CASTE')	
							varval = 'DIVISION';
							if(varval == 'SUBCASTE')
								varval = 'CASTE';
						}
						
						if(!bmgeneric.empty(MWPP[varval])) {
							tickyesarray[varval] = 'true';
						}
					}
					reinCb(null);  // inner callback
				}, function(err) {
					async.each(basicinfgrparray, function(varval,basinCb) 
					{
						if(bmgeneric.in_array(varval,ppmatchvalue_arr) && !bmgeneric.empty(MWPP[varval])){
							tickyesarray[varval] = 'true';
						}
						basinCb(null);  // inner callback
					}, function(err) {
						async.each(locationgrparray, function(varval,locinCb) 
						{
							if(bmgeneric.in_array(varval,ppmatchvalue_arr)){
								rightsymp = "tick";
							}else{
								rightsymp = "notick";									
							}
							if(varval == 'STATE')
								varval = varval.replace(/STATE/ig, 'RESIDINGSTATE');
							if(varval == 'CITY')
								varval = varval.replace(/CITY/ig, 'RESIDINGCITY');
																		
							if (!bmgeneric.empty(MWPP[varval])){	
								if(rightsymp == "tick"){
									tickyesarray[varval] = 'true';
								}
							}	
							locinCb(null);  // inner callback
						}, function(err) {	
							matchResultArr['TOTALMATCHCOUNT'] = bmgeneric.count(MWPP)-1; //removing residing status from preference display so decreasing one value
							matchResultArr['MATCHCOUNT'] = bmgeneric.count(tickyesarray);	
							//Annual Income validation ends	
							callback(null,matchResultArr);
						});
					});
				});
			});			
		}catch(err){
			console.log("Error at: File Name - partnerpreinfo.js and Function Name -partprefmatch ",err);
			return callback(err,matchResultArr);;
		}
	}
}	
module.exports = getppinfo;