/**********************************************************************************************
 *	Filename	: bmmutualmatchvp.js							
 *	Author		: Sathrak paldurai K
 *	Date		: 17-11-2017							
 *	Description	: Find whether the profile is a mutual match.
***********************************************************************************************/
	exports.mutualmatchvp = function(memdata,viewMemPP,mutmatchcb)
	{	 
		try{		
			//PPdata
			if (memdata['partnerprefset'] == 1) {
				uSysVal = 'match';
				uMatchVal = 'match';
				sysmatchindiancity = memdata['matchindiancity'];
			} else {
				uSysVal = 'sys';
				uMatchVal = 'sysmatch';
				sysmatchindiancity = {};
			}		
			//vwPPdata
			if (viewMemPP['partnerprefset'] == 1) {
				pSysVal = 'match';
				pMatchVal = 'match';
			} else {
				pSysVal = 'sys';
				pMatchVal = 'sysmatch';
			}
			/* End - View member data */
			var retMutualVal = 1;
			/* Compare - Login member PI with Viewed member PP */	
			//# 1.MaritalStatus
			if(bmgeneric.trim(memdata["maritalstatus"]) > 0){
				if(bmgeneric.in_array("0",viewMemPP[pMatchVal+'maritalstatus']) || bmgeneric.in_array(bmgeneric.trim(memdata["maritalstatus"]),viewMemPP[pMatchVal+'maritalstatus'])){
					retMutualVal = 1;
				}else{
					mutmatchcb(null,0)
					return false;
				}
			}
			
			//# 2.Age
			if(memdata["Age"] > 0){
				if(viewMemPP[pSysVal+'stage'] >= 18 && viewMemPP[pSysVal+'stage'] <= bmgeneric.trim(memdata["Age"]) && viewMemPP[pSysVal+'endage'] >= bmgeneric.trim(memdata["Age"]) && viewMemPP[pSysVal+'endage'] <= 70){
					retMutualVal = 1;
				}else{	
					mutmatchcb(null,0)
					return false;
				}
			}
			
			//# 3.Height
			if(memdata["height"] > 0){
				if(viewMemPP[pSysVal+'stheight'] >= 121 && viewMemPP[pSysVal+'stheight'] <= Math.ceil(bmgeneric.trim(memdata["height"])) && viewMemPP[pSysVal+'endheight'] >= Math.floor(bmgeneric.trim(memdata["height"])) && viewMemPP[pSysVal+'endheight'] <= 215){
					retMutualVal = 1;	
				}else{
					mutmatchcb(null,0)
					return false;
				}
			}
			
			//# 4.PhysicalStatus 
			if(bmgeneric.trim(memdata["specialcase"])!="" && memdata["specialcase"] <= 1){
				if(viewMemPP[pSysVal+'physicalstatus'] == 2 || viewMemPP[pSysVal+'physicalstatus'] == memdata["specialcase"]){
					retMutualVal = 1;
				}else{	
					mutmatchcb(null,0)
					return false;
				}
			}
			
			//# 5.Mothertonque 
			if(bmgeneric.trim(memdata["mothertongue"]) > 0){
				if(bmgeneric.in_array("0",viewMemPP[pSysVal+'mothertongue']) || bmgeneric.in_array(bmgeneric.trim(memdata["mothertongue"]),viewMemPP[pSysVal+'mothertongue'])){
					retMutualVal = 1;
				}else{	
					mutmatchcb(null,0)
					return false;
				}
			}

			//#.6.Caste
			var keyExists = memdata["caste"]+"~"+memdata["religion"];
			var brahminAllCheck	= "";
			if(bmgeneric.array_key_exists(memdata["mothertongue"], MAPCASTEHASH)){		//# check mothertongue in MAPCASTEHASH array
				var getCasteMapValue = MAPCASTEHASH[memdata["mothertongue"]];
				if(bmgeneric.in_array(memdata["caste"], getCasteMapValue)){					
					//# Check caste value in returned caste map array
					brahminAllCheck = "1000";								
					//# If exists, append Brahmin-All.
				}
			}
			if(bmgeneric.array_key_exists(keyExists, partprefconf.PARTNERPREFOTHERRELIGION)){
				var relMapVal = bmgeneric.mwOtherReligionCasteMapping([memdata["caste"]], [memdata["religion"]]);
				var imp_caste = bmgeneric.implode(",", bmgeneric.array_unique(relMapVal['CASTE']));
				bmgeneric.implodeReligion = bmgeneric.implode(",", bmgeneric.array_unique(relMapVal['RELIGION']));
				if(memdata["caste"] > 0 && memdata["CasteNoBar"] == 1 )
				{
					var imp_caste = imp_caste+",998,"+brahminAllCheck;
					mergeMemberCaste = bmgeneric.implode(",",[memdata['caste'],998,0,brahminAllCheck]);
					mergeMemberReligion = bmgeneric.implode(",",[memdata['religion'],0]);
				}else if(memdata["CasteNoBar"] == 1 || memdata["caste"] == 0){
					var imp_caste = imp_caste+",998,"+brahminAllCheck;
					mergeMemberCaste = bmgeneric.implode(",",[0,brahminAllCheck]);
					mergeMemberReligion = bmgeneric.implode(",",[memdata['religion'],0]);
				}else{    
					mergeMemberCaste = bmgeneric.implode(",",[memdata['caste'],0,brahminAllCheck]);
					mergeMemberReligion = bmgeneric.implode(",",[memdata['religion'],0]);
				}
				var imp_caste	= bmgeneric.rtrim(imp_caste,",");
				mergeMemberCaste	=	bmgeneric.rtrim(mergeMemberCaste,",");
				includeotherReligion =1;
				
				/* condition starts */
				var explCaste = bmgeneric.explode(',',imp_caste);
				var explmergeMemberCaste = bmgeneric.explode(',',mergeMemberCaste);
				var explReligion = bmgeneric.explode(',',bmgeneric.implodeReligion);
				var explmergeMemberReligion = bmgeneric.explode(',',mergeMemberReligion);

				if((bmgeneric.count(bmgeneric.array_intersect(viewMemPP[pMatchVal+'caste'],explCaste))>0 && bmgeneric.count(bmgeneric.array_intersect(viewMemPP[pMatchVal+'religion'],explReligion))>0 && viewMemPP['PPIncludeOtherReligions'] == 1) || (bmgeneric.count(bmgeneric.array_intersect(viewMemPP[pMatchVal+'caste'],explmergeMemberCaste))>0 && bmgeneric.count(bmgeneric.array_intersect(viewMemPP[pMatchVal+'religion'],explmergeMemberReligion))>0)){
					retMutualVal = 1;
				}else{	
					mutmatchcb(null,0)
					return false;
				}
				/* condition ends */
			}else{
				if(memdata["Caste"] > 0 && memdata["CasteNoBar"] == 1){
					if(bmgeneric.in_array("0",viewMemPP[pMatchVal+'caste']) || bmgeneric.in_array(998,viewMemPP[pMatchVal+'caste']) || bmgeneric.in_array(bmgeneric.trim(memdata["Caste"]),viewMemPP[pMatchVal+'caste']) || bmgeneric.in_array(brahminAllCheck,viewMemPP[pMatchVal+'caste'])){
						retMutualVal = 1;
					}else{
						mutmatchcb(null,0)
						return false;
					}
				}
				else if(memdata["CasteNoBar"] == 1 || memdata["Caste"] == 0){
					if(bmgeneric.in_array("0",viewMemPP[pMatchVal+'caste']) || bmgeneric.in_array(998,viewMemPP[pMatchVal+'caste']) || bmgeneric.in_array(brahminAllCheck,viewMemPP[pMatchVal+'caste'])){
						retMutualVal = 1;
					}else{
						mutmatchcb(null,0)
						return false;
					}
				}
				else{
					if(bmgeneric.in_array("0",viewMemPP[pMatchVal+'caste']) || bmgeneric.in_array(bmgeneric.trim(memdata["Caste"]),viewMemPP[pMatchVal+'caste']) || bmgeneric.in_array(brahminAllCheck,viewMemPP[pMatchVal+'caste'])){
						retMutualVal = 1;
					}else{	
						mutmatchcb(null,0)
						return false;
					}
				}
				includeotherReligion = 0;  
			}
		
			//# 7.Religion block
			if(memdata["religion"] > 0 && includeotherReligion == 0)
			{
				if(memdata["religion"] == 10 || memdata["religion"] == 11 || memdata["religion"] == 2){
					// Muslim Shia or sunni then merge muslim others
					religion = [memdata["religion"],0,25];
				} else if(memdata["religion"] == 12 || memdata["religion"] == 13 || memdata["religion"] == 14 || memdata["religion"] == 3){
					// Christian Others has to be included
					religion = [memdata["religion"],0,26];
				} else if(memdata["religion"] == 15 || memdata["religion"] == 16 || memdata["religion"] == 5){
					// Jain others has to be included.
					religion = [memdata["religion"],0,27];  
				} else{
					religion = [memdata["religion"],0];
				}
				
				var religionarr = viewMemPP[pMatchVal+'religion'].map(Number);			
				if(bmgeneric.count(bmgeneric.array_intersect(religionarr,religion))>0){
					retMutualVal = 1;					
				}else{				
					mutmatchcb(null,0)
					return false;
				}
			}

			//# 8.Gothra block
			if(memdata["Gothraid"] > 0){
				if((bmgeneric.in_array("0",viewMemPP[pSysVal+'gothraid']) || bmgeneric.in_array(bmgeneric.trim(memdata["Gothraid"]),viewMemPP[pSysVal+'gothraid'])) && (bmgeneric.trim(viewMemPP["exclude_ppgothra_id"]) != bmgeneric.trim(memdata["Gothraid"]))){
					retMutualVal = 1;
				}else{	
					mutmatchcb(null,0)
					return false;
				}
			}

			//# 9.Eatinghabits block
			if(memdata["eatinghabits"] > 0){	
				var eating = MutMatchInfo.getMatchEatingHabitVal([memdata["eatinghabits"]]);
				eating.push('0');
				if(bmgeneric.count(bmgeneric.array_intersect(viewMemPP[pSysVal+'eatinghabitspref'],eating))>0){
					retMutualVal = 1;
				}else{	
					mutmatchcb(null,0)
					return false;
				}
			}
		
			//# 10.Education block
			if(memdata["educationselected"] > 0){
				if(bmgeneric.in_array("0",viewMemPP[pMatchVal+'education']) || bmgeneric.in_array(bmgeneric.trim(memdata["educationselected"]),viewMemPP[pMatchVal+'education'])){
					retMutualVal = 1;
				}else{	
					mutmatchcb(null,0)
					return false;
				}
			}
		
			//# 11.Country  block 
			if(bmgeneric.trim(memdata["countryselected"]) > 0){
				if(bmgeneric.in_array("0",viewMemPP[pMatchVal+'country']) || bmgeneric.in_array(bmgeneric.trim(memdata["countryselected"]),viewMemPP[pMatchVal+'country'])){
					retMutualVal = 1;
				}else{	
					mutmatchcb(null,0)
					return false;
				}
			}
		
			//# 12.state  block
			if(memdata["residingstate"] > 0){
				if(memdata["countryselected"] == 98){
					if(bmgeneric.in_array("0",viewMemPP[pMatchVal+'indianstates']) || bmgeneric.in_array(bmgeneric.trim(memdata["residingstate"]),viewMemPP[pMatchVal+'indianstates'])){
						retMutualVal = 1;
					}else{	
						mutmatchcb(null,0)
						return false;
					}
				}
				else if(memdata["countryselected"] == 222){
					if(bmgeneric.in_array("0",viewMemPP[pMatchVal+'usstates']) || bmgeneric.in_array(bmgeneric.trim(memdata["residingstate"]),viewMemPP[pMatchVal+'usstates'])){
						retMutualVal = 1;	
					}else{	
						mutmatchcb(null,0)
						return false;
					}
				}
			}
		
			//# 13.Manglik Newly Added
			if(memdata["dosham"] == 1 ){
				if(bmgeneric.in_array(3,viewMemPP[pSysVal+'manglik']) || bmgeneric.in_array(bmgeneric.trim(memdata["dosham"]),viewMemPP[pSysVal+'manglik'])){
					retMutualVal = 1;
				}else{	
					mutmatchcb(null,0)
					return false;
				}
			}
			
			if(memdata["dosham"] == 2 || memdata["dosham"] == 0){
				if(bmgeneric.in_array(2,viewMemPP[pSysVal+'manglik']) || bmgeneric.in_array(3,viewMemPP[pSysVal+'manglik'])){
					retMutualVal = 1;
				}else{	
					mutmatchcb(null,0)
					return false;
				}
			}
			
			//# 14.Citizenship
			if(bmgeneric.trim(memdata["citizenship"]) > 0){
				if(bmgeneric.in_array("0",viewMemPP[pMatchVal+'citizenship']) || bmgeneric.in_array(bmgeneric.trim(memdata["citizenship"]),viewMemPP[pMatchVal+'citizenship'])){
					retMutualVal = 1;
				}else{	
					mutmatchcb(null,0)
					return false;
				}
			}
			/* End Compare - Login member PI with Viewed member PP */
		
			/* Compare - Viewed member PI with Login member PP */
			//# 1.MaritalStatus
			msetStatus = 0;
			if(bmgeneric.count(memdata[uMatchVal+'maritalstatus']) == 1 && memdata[uMatchVal+'maritalstatus'] == 1){
				if(bmgeneric.count(bmgeneric.array_intersect([viewMemPP['maritalstatus']],memdata[uMatchVal+'maritalstatus'].map(Number)))>0){
					retMutualVal = 1;
					msetStatus = 1;	//To check marital status is unmarried to reset have children in faceting - searchfunction.php
				}else{			
					mutmatchcb(null,0)
					return false;
				}				
			}else{				
				if(!bmgeneric.in_array("0",memdata[uMatchVal+'maritalstatus']) && bmgeneric.count(memdata[uMatchVal+'maritalstatus']) > 0){
					if(bmgeneric.count(bmgeneric.array_intersect([viewMemPP['maritalstatus']],memdata[uMatchVal+'maritalstatus'].map(Number)))>0){
						retMutualVal = 1;	
					}else{
						mutmatchcb(null,0)
						return false;
					}
				}
			}
							
			//# 2.Age
			if(bmgeneric.trim(memdata[uSysVal+'stage']) !="" && bmgeneric.trim(memdata[uSysVal+'endage']) !="" && bmgeneric.trim(memdata[uSysVal+'stage']) !="0" && bmgeneric.trim(memdata[uSysVal+'endage']) !="0" && bmgeneric.trim(memdata[uSysVal+'stage']) <= bmgeneric.trim(memdata[uSysVal+'endage'])){
				if(viewMemPP['age'] >= bmgeneric.trim(memdata[uSysVal+'stage']) && viewMemPP['age'] <= bmgeneric.trim(memdata[uSysVal+'endage'])){
					retMutualVal = 1;
				}else{	
					mutmatchcb(null,0)
					return false;
				}
			}
		
			//# 3.Height
			if(memdata[uSysVal+'stheight'] !="" && memdata[uSysVal+'endheight'] !="" && memdata[uSysVal+'stheight'] !="0" && memdata[uSysVal+'endheight'] !="0" && memdata[uSysVal+'stheight'] <= memdata[uSysVal+'endheight']){
				if(viewMemPP['height'] >= Math.floor(memdata[uSysVal+'stheight']) && viewMemPP['height'] <= Math.ceil(memdata[uSysVal+'endheight'])){
					retMutualVal = 1;
				}else{	
					mutmatchcb(null,0)
					return false;
				}
			}
			
			//#4.physicalstatus
			//#Function to convert the string to array format 
			if(bmgeneric.trim(memdata[uSysVal+'physicalstatus']) != "" &&  bmgeneric.trim(memdata[uSysVal+'physicalstatus']) != 2 && bmgeneric.count(memdata[uSysVal+'physicalstatus']) > 0 && bmgeneric.trim(memdata[uSysVal+'physicalstatus']) != 0){
				if(bmgeneric.trim(viewMemPP['specialcase']) == bmgeneric.trim(memdata[uSysVal+'physicalstatus'])){
					retMutualVal = 1;
				}else{	
					mutmatchcb(null,0)
					return false;
				}
			}
			
			//#5.MotherTongue
			if(memdata[uSysVal+'mothertongue'] != "" && !bmgeneric.in_array("0",memdata[uSysVal+'mothertongue']) && bmgeneric.count(memdata[uSysVal+'mothertongue']) > 0){		
				if(bmgeneric.in_array(bmgeneric.trim(viewMemPP['mothertongue']),memdata[uSysVal+'mothertongue'])){
					retMutualVal = 1;
				}else{	
					mutmatchcb(null,0)
					return false;
				}
			}
		
			//# 6.Caste
			if(bmgeneric.count(memdata[uMatchVal+'religion'])>0){
				var MatchCasteArray='';
				if(memdata['PPIncludeOtherReligions']==1){
					//# This block used for only mapping Caste Values (Agarwal : hindu Agarwal , Jain Agarwal)
					if(memdata[uMatchVal+'religion'] == 1){ // if religion is hindu we will check in CASTEHASHHINDU Array 
						casteArrayHash	 = bmgenericarrys.CASTEHASHHINDU;
					} else{
						// otherwise will check Religion base Array
						religinVariable = bmgeneric.explode(" - ",bmgenericarrys.RELIGIONHASH[memdata[uMatchVal+'religion'][0]]);
						casteArrayHash	 = "SEARCH"+bmgeneric.strtoupper(religinVariable[0])+"CASTEHASH";
					}
					
					implOthRelMapCaste = bmgeneric.implode('~',memdata[uMatchVal+'caste']);
					implOthRelMapReligion = bmgeneric.implode('~',memdata[uMatchVal+'religion']);
					var casteHashVal = bmOthRegMapVal(implOthRelMapCaste,implOthRelMapReligion,casteArrayHash);
					
					// We reset includeotherreligion Value 
					memdata['PPIncludeOtherReligions'] = 0;
					for(var arrKey in casteHashVal){
						if(bmgeneric.is_array(casteHashVal[arrKey]))
							MatchCasteArray+= bmgeneric.implode(",",casteHashVal[arrKey]);
						else 
							MatchCasteArray+= ","+casteHashVal[arrKey];
					}
					MatchCasteArray = bmgeneric.explode(",",MatchCasteArray);
				}else{				
					MatchCasteArray = memdata[uMatchVal+'caste']; 
				}

				if(bmgeneric.in_array(1000,MatchCasteArray))
				{
					var implSrchCasteMap = bmgeneric.implode('~',memdata[uSysVal+'mothertongue']);
					var castehash = bmgeneric.bmfuncSearchCasteMapping(implSrchCasteMap);
					var MatchCasteArray = bmgeneric.array_unique(bmgeneric.explode("~", castehash));
				}
				
				var MatchCasteArrayResult = {};
				if(memdata['PPIncludeOtherReligions'] == 1 && bmgeneric.count(memdata[uMatchVal+'caste'])>0)
				{
					relignPPmappingvalue= bmgeneric.mwOtherReligionCasteMapping(memdata[uMatchVal+'caste'],memdata[uMatchVal+'religion']);
					MatchCasteArray = bmgeneric.array_merge(MatchCasteArray,relignPPmappingvalue['CASTE']);
					MatchCasteArrayResult = bmgeneric.array_unique(MatchCasteArray);
					//var imp_caste = bmgeneric.implode(",",MatchCasteArrayResult); 
				}else if(memdata['PPIncludeOtherReligions'] == 1 && bmgeneric.count(memdata[uMatchVal+'caste'])==0){
					relignPPmappingvalue= bmgeneric.mwOtherReligionCasteMapping(memdata['caste'],memdata[uMatchVal+'religion']);
					MatchCasteArray = bmgeneric.array_merge(MatchCasteArray,relignPPmappingvalue['CASTE']);
					MatchCasteArrayResult = bmgeneric.array_unique(MatchCasteArray);
					//var imp_caste = bmgeneric.implode(",",MatchCasteArrayResult); 
				}else{
					if(bmgeneric.isset(memdata[uMatchVal+'caste']))
						CasteArrayResult = memdata[uMatchVal+'caste']; 
					else  
						CasteArrayResult = MatchCasteArray;
					var inc = 0;
					for (var castkey in CasteArrayResult) {
						var casteget = bmgeneric.explode("_",CasteArrayResult[castkey]);
						if(bmgeneric.in_array('caste',casteget))
						{
							MatchCasteArrayResult[inc] = casteget[1];
						}else {
							MatchCasteArrayResult[inc] = casteget[0];
						}
						inc++;
					} 
				}
				MatchCasteArrayResult = bmgeneric.array_unique(MatchCasteArrayResult);				
				if(!bmgeneric.in_array("0",MatchCasteArrayResult) && bmgeneric.count(MatchCasteArrayResult) > 0){
					if(bmgeneric.count(MatchCasteArrayResult) == 1 && MatchCasteArrayResult[0] == 998){
						if(viewMemPP['CasteNoBar'] == 1){
							retMutualVal = 1;						
						}else{	
							mutmatchcb(null,0)
							return false;
						}
					}else if(bmgeneric.count(MatchCasteArrayResult) > 1 && bmgeneric.in_array(998, MatchCasteArrayResult)){
						if(includeotherReligion == 1)
						{					
							if(((bmgeneric.in_array(viewMemPP[pMatchVal+'caste'],explCaste) && bmgeneric.in_array(viewMemPP[pMatchVal+'religion'],explReligion) && viewMemPP['PPIncludeOtherReligions'] == 1) || (bmgeneric.in_array(viewMemPP[pMatchVal+'caste'],explmergeMemberCaste) && bmgeneric.in_array(viewMemPP[pMatchVal+'religion'],explmergeMemberReligion))) && (bmgeneric.in_array(viewMemPP['Caste'],MatchCasteArrayResult) || viewMemPP['CasteNoBar'] == 1)){
								includeotherReligion = 0;
								isCasteandIncludeOtherReligionInSetSelect = 1;
								retMutualVal = 1;	
							}else{	
								mutmatchcb(null,0)
								return false;
							}
						}
						else{					
							if(bmgeneric.in_array(viewMemPP['Caste'],MatchCasteArrayResult) || viewMemPP['CasteNoBar'] == 1){
								isCasteInSetSelect = 1;
								retMutualVal = 1;
							}else{	
								mutmatchcb(null,0)
								return false;
							}
						}
					}else if(bmgeneric.count(MatchCasteArrayResult) > 0 && bmgeneric.trim(MatchCasteArrayResult[0])!=""){
						if(bmgeneric.in_array(viewMemPP['Caste'],MatchCasteArrayResult)){
							retMutualVal = 1;	
						}else{	
							mutmatchcb(null,0)
							return false;
						}
					}
				}
			}
			
			//# 7.Religion
			if(!bmgeneric.in_array("0",memdata[uMatchVal+'religion']) && bmgeneric.count(memdata[uMatchVal+'religion']) > 0) 
			{
				MatchReligionArray=memdata[uMatchVal+'religion'];
				if(bmgeneric.in_array("25",memdata[uMatchVal+'religion']) || bmgeneric.in_array("600",memdata[uMatchVal+'religion']))
					MatchReligionArray = bmgeneric.array_merge(memdata[uMatchVal+'religion'],[10,11,2]);
				else if(bmgeneric.in_array("26",memdata[uMatchVal+'religion']) || bmgeneric.in_array("200",memdata[uMatchVal+'religion']))
					MatchReligionArray = bmgeneric.array_merge(MatchReligionArray,[12,13,14,3]);
				else if(bmgeneric.in_array("27",memdata[uMatchVal+'religion']) || bmgeneric.in_array("500",memdata[uMatchVal+'religion']))
					MatchReligionArray = bmgeneric.array_merge(memdata[uMatchVal+'religion'],[15,16,5]);
			
				if(memdata['PPIncludeOtherReligions']==1){
					MatchReligionArray=bmgeneric.array_merge(memdata[uMatchVal+'religion'],relignPPmappingvalue['RELIGION']);
					matchbmgeneric.implodereligion = bmgeneric.implode(",",bmgeneric.array_unique(MatchReligionArray)); 
				}
			
				MatchReligionArrayResult = bmgeneric.array_unique(MatchReligionArray); 		
				if(bmgeneric.in_array(viewMemPP['religion'],MatchReligionArrayResult)){
					retMutualVal = 1;	
				}else{	
					mutmatchcb(null,0)
					return false;
				}		
			}
			
			//#8.Gothra
			if(!bmgeneric.in_array("0",memdata[uSysVal+'gothraid']) && bmgeneric.count(memdata[uSysVal+'gothraid']) > 0){
				if(bmgeneric.in_array("998",memdata[uSysVal+'gothraid'])){
					if(viewMemPP['gothraid'] != memdata["gothraid"]){
						retMutualVal = 1;	
					}else{	
						mutmatchcb(null,0)
						return false;
					}
				}else{
					if(bmgeneric.in_array(viewMemPP['gothraid'],memdata[uSysVal+'gothraid'])){
						retMutualVal = 1;
					}else{	
						mutmatchcb(null,0)
						return false;
					}
				}
			}
	
			var MatchEatingArrayResult = {};
			//# 9.EatinghabitPref
			if(memdata[uSysVal+'eatinghabitspref']){
				MatchEatingArrayResult = MutMatchInfo.getMatchEatingHabitVal(memdata[uSysVal+'eatinghabitspref']);
			}
			
			if(!bmgeneric.in_array("0",MatchEatingArrayResult) && bmgeneric.count(MatchEatingArrayResult) > 0 && MatchEatingArrayResult[0] != ''){  
				if(bmgeneric.in_array(99, MatchEatingArrayResult)){
					var keys = bmgeneric.array_search('99', MatchEatingArrayResult);
					MatchEatingArrayResult[keys] = 0;
				} 
				if(bmgeneric.in_array(viewMemPP['eatinghabits'],MatchEatingArrayResult)){
					retMutualVal = 1;
				}else{	
					mutmatchcb(null,0)
					return false;
				}
			}
		
			//# 10.education
			if(!bmgeneric.in_array("0",memdata[uMatchVal+'educationid']) && bmgeneric.count(memdata[uMatchVal+'educationid'])>0){
				if(bmgeneric.in_array(viewMemPP['educationid'],memdata[uMatchVal+'educationid'])){
					retMutualVal = 1;
				}else{	
					mutmatchcb(null,0)
					return false;
				}
			}else if(!bmgeneric.in_array("0",memdata[uMatchVal+'education']) && bmgeneric.count(memdata[uMatchVal+'education'])>0){
				if(bmgeneric.in_array(viewMemPP['educationselected'],memdata[uMatchVal+'education'])){
					retMutualVal = 1;
				}else{	
					mutmatchcb(null,0)
					return false;
				}
			}
			
			//#12.Manglik
			var doshams = {};
			if(bmgeneric.count(memdata[uSysVal+'manglik'])>0 && !bmgeneric.in_array("0",memdata[uSysVal+'manglik'])) 
			{
				var manglik = {};
				var manglik = bmgeneric.array_unique(memdata[uSysVal+'manglik']);
				var key = bmgeneric.array_search(3, memdata[uSysVal+'manglik']);
				if (key != "") {
					delete manglik[key];
				}
				
				if(bmgeneric.in_array("0", manglik) == false && bmgeneric.count(manglik) >= 1)
				{
					if(bmgeneric.in_array(1, manglik) || bmgeneric.in_array(2, manglik))
					{
						var dosham = [];
						if(bmgeneric.in_array(1, manglik))
							dosham = [1,3];
						if(bmgeneric.in_array(2, manglik))
							dosham = bmgeneric.array_merge(dosham,[2,3,0]);
						
						doshams = bmgeneric.array_unique(dosham);
						var doshamVal = {1:3,2:3,99:0};
						for(var doskey in doshamVal){
							if(bmgeneric.in_array(doskey, doshams))
								doshams[inc] = doshamVal[doskey];
							
						}	
						
						if(bmgeneric.count(doshams)>0){
							if(bmgeneric.in_array(viewMemPP['dosham'],doshams)){
								retMutualVal = 1;	
							}else{								
								mutmatchcb(null,0)
								return false;
							}
						}
					}
				}
			}

			//# 13.COUNTRYRIGHT	
			if(!bmgeneric.empty(memdata[uMatchVal+'indianstates']) || !bmgeneric.empty(memdata[uMatchVal+'indianstates']) || !bmgeneric.empty(memdata[uMatchVal+'usstates'])){				
				var MatchindiaStateArray = '';
				if(!bmgeneric.in_array("0",memdata[uMatchVal+'indianstates']) && bmgeneric.count(memdata[uMatchVal+'indianstates'])>0)
					MatchindiaStateArray = memdata[uMatchVal+'indianstates'];
				
				var MatchUSAStateArray = '';
				if(!bmgeneric.in_array("0",memdata[uMatchVal+'usstates']) && bmgeneric.count(memdata[uMatchVal+'usstates'])>0)
					MatchUSAStateArray = memdata[uMatchVal+'usstates'];
				var state ='';
				if(bmgeneric.count(MatchindiaStateArray) > 0 && bmgeneric.count(MatchUSAStateArray) > 0)
					state = bmgeneric.array_merge(MatchindiaStateArray,MatchUSAStateArray);
				else if(bmgeneric.count(MatchindiaStateArray) > 0 && bmgeneric.count(MatchUSAStateArray) == 0)
					state = MatchindiaStateArray;
				else if(bmgeneric.count(MatchindiaStateArray) == 0 && bmgeneric.count(MatchUSAStateArray) > 0)
					state = MatchUSAStateArray;

				//if(!bmgeneric.in_array("0",sysmatchindiancity) && bmgeneric.count(sysmatchindiancity)>0)
					//city =sysmatchindiancity;
			}			
			
			if(!bmgeneric.in_array("0",memdata[uMatchVal+"country"]) && bmgeneric.count(memdata[uMatchVal+"country"]) > 0){
				if(bmgeneric.in_array(viewMemPP['countryselected'],memdata[uMatchVal+'country'])){
					retMutualVal = 1;
				}else{				
					mutmatchcb(null,0)
					return false;
				}
				if(bmgeneric.count(state) > 0 && !bmgeneric.in_array("0",state)){
					if(bmgeneric.in_array(viewMemPP['residingstate'],state)){
						retMutualVal = 1;
					}else{						
						mutmatchcb(null,0)
						return false;
					}
				}
			}

			//# 14.Citizen
			if(!bmgeneric.in_array("0",memdata[uMatchVal+'citizenship']) && bmgeneric.count(memdata[uMatchVal+'citizenship']) > 0 && memdata[uMatchVal+'citizenship'][0] != ''){
				if(bmgeneric.in_array(viewMemPP['citizenship'],memdata[uMatchVal+'citizenship'])){
					retMutualVal = 1;
				}else{					
					mutmatchcb(null,0)
					return false;
				}
			}
			/* End Compare - Viewed member PI with Login member PP */
			if(retMutualVal==1)	{
				mutmatchcb(null,1);
				return true;		
			}		
		}catch(err){
			console.error("mutualmatchvp Errors :",err);
			mutmatchcb(err,err);
		}
	}
	
	//#Function to include other religion mapping values -bmfuncincludeOtherReligionMappingValues
	exports.bmOthRegMapVal= function(caste,religion,CasteArrayHash='') {
		var casteArr = bmgeneric.explode("~",caste);
		var regArr	= bmgeneric.explode("~",bmgeneric.rtrim(religion,"~"));
		if(!bmgeneric.empty(CasteArrayHash)){
			var CasteArrHashval	= bmgenericarrys.CASTEHASHHINDU;
		}else{
			var CasteArrHashval	= CasteArrayHash;
		}
		
		var countRegArr = bmgeneric.count(regArr);
		for(k=0;k<countRegArr;k++){
			var CasteArrCnt =  bmgeneric.count(casteArr);
			for(i=0;i<CasteArrCnt;i++){
				var otherprofilebox = casteArr[i]+"~"+regArr[k];
				var findkey = bmgeneric.array_key_exists(otherprofilebox,partprefconf.PARTNERPREFOTHERRELIGION);
				if(findkey >= 1) {
					var showother = partprefconf.PARTNERPREFOTHERRELIGION[otherprofilebox]; 
					var inc = 0;
					for (var othKey in showother){
						mapCasteArr	= bmgeneric.explode("~",showother[othKey]);
						mappingCaste[inc]	= mapCasteArr[0]; 
						if(bmgeneric.array_key_exists(showother[othKey],CasteArrHashval))
							keyMappingValue = showother[othKey];
						inc++;
					}
					mapUnqVal = bmgeneric.array_unique(mappingCaste);
					if(!bmgeneric.empty(CasteArrayHash)){
						appendArray[keyMappingValue] = bmgeneric.array_unique(mappingCaste);
					} else{
						appendArray[keyMappingValue] = keyMappingValue;
					}
				} else{
					appendArray[casteArr[i]] = casteArr[i];
				}
			}
		} 
		return appendArray;
	}

	//#Function to get the Eating habits used in matchsummary sphinx query
	exports.getMatchEatingHabitVal= function(Value){
		var ResultVal = '';
		var PARTNERPREFEATINGHABITS	= {1:"1~3",2:"2~3",3:"1~3"};
		
		for(i=0;i<bmgeneric.count(Value);i++){
			if(!bmgeneric.empty(PARTNERPREFEATINGHABITS[Value[i]]))
				ResultVal	+= PARTNERPREFEATINGHABITS[Value[i]]+"~";
		}
		ResultVal	= bmgeneric.trim(ResultVal,"~");
		ResultVal	= bmgeneric.rtrim(ResultVal,"~");
		ResultVal	= bmgeneric.array_unique(bmgeneric.explode("~",ResultVal));
		return ResultVal;
	}	