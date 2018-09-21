 /**********************************************************************************************
 *	Filename	: bmfuncvpidealmatch.js							
 *	Author		: Sathrak paldurai K
 *	Date		: 15 07 2017								
 *	Description	: find whether the partner preference of member matched with profile details of partner.
***********************************************************************************************/
	exports.idealMatchProfile = function(partnerProfileDet, memberPP, cbimatch)
	{	 
		try{
			var USD4CONVERSION ="";//USD4CONVERSION = 46;
			//member PP residing state details
			var getIncomeHash = '';
			if(!bmgeneric.in_array("0", memberPP['matchcountry']))	
			{	
				if(memberPP['matchindianstates'] !=0 && memberPP['matchusstates']!=0 && bmgeneric.in_array(partnerProfileDet['countryselected'],  memberPP['matchcountry']))
					memberPP['residingallstate'] = Object.assign({},memberPP['matchindianstates'],  memberPP['matchusstates']);

				else if(memberPP['matchindianstates'] !=0 && memberPP['matchusstates']==0 && bmgeneric.in_array(partnerProfileDet['countryselected'], memberPP['matchcountry']) && memberPP['countryselected'] =='98')
					memberPP['residingallstate'] = memberPP['matchindianstates'];
					// matchMemberDet['countryselected'] =='98'
				else if(memberPP['matchindianstates'] ==0 && memberPP['matchusstates']!=0 && bmgeneric.in_array(partnerProfileDet['countryselected'],  memberPP['matchcountry']) && memberPP['countryselected'] =='222')
					memberPP['residingallstate'] = memberPP['matchusstates'];
					//matchMemberDet['countryselected'] =='222'
				else if(memberPP['matchindianstates'] ==0 && memberPP['matchusstates']==0 && bmgeneric.in_array("0", memberPP['matchcountry']))
					memberPP['residingallstate'] = [0];
				else 
					memberPP['residingallstate'] = [0];
			} else {	
				memberPP['residingallstate'] = [0];
			}
			
			if(bmgeneric.trim(memberPP['gothraid'])!='')
			{
				explodeGothramVals = bmgeneric.explode("~", memberPP['gothraid']);
				if(bmgeneric.in_array('998',explodeGothramVals))
					chkExceptgothram = 1;
				else
					chkExceptgothram	= 0;
			}else
				chkExceptgothram = 0;
			
			async.parallel({
				chkCountrySelected : function(callback){
					bmfunidelmatch.checkIdealPatternMatch(memberPP['matchcountry'], partnerProfileDet['countryselected'], function(err,chcountry){
						callback(null,chcountry);
					});
				},
				chkEducationSelected : function(callback){
					bmfunidelmatch.checkIdealPatternMatch(memberPP['matcheducation'], partnerProfileDet['educationselected'], function(err,chkeduselt){
						callback(null,chkeduselt);
					});
				},
				chkResidingState : function(callback){
					bmfunidelmatch.checkIdealPatternMatch(memberPP['residingallstate'], partnerProfileDet['residingstate'], function(err,chkredselt){
						callback(null,chkredselt);
					}); 
				},
				chkMotherTongue : function(callback){
					bmfunidelmatch.checkIdealPatternMatch(memberPP['matchmothertongue'], partnerProfileDet['mothertongue'], function(err,chkmothtselt){
						callback(null,chkmothtselt);
					}); 
				},
				chkSmokingHabits : function(callback){
					bmfunidelmatch.checkIdealPatternMatch(memberPP['matchsmokinghabitspref'],  partnerProfileDet['smokinghabits'], function(err,chksmokhabt){
						callback(null,chksmokhabt);
					}); 
				},
				chkDrinkingHabits : function(callback){
					bmfunidelmatch.checkIdealPatternMatch(memberPP['matchdrinkinghabitspref'], partnerProfileDet['drinkinghabits'], function(err,chkdrinkhabt){
						callback(null,chkdrinkhabt);
					}); 
				},
				chkSubCasteId : function(callback){
					bmfunidelmatch.checkIdealPatternMatch(memberPP['matchsubcaste'], partnerProfileDet['subcasteid'], function(err,chksubcast){
						callback(null,chksubcast);
					}); 
				},
				chkCitizenship : function(callback){
					bmfunidelmatch.checkIdealPatternMatch(memberPP['matchcitizenship'], partnerProfileDet['citizenship'], function(err,chkcity){
						callback(null,chkcity);
					}); 
				},
				chkOccupationSelected : function(callback){
					bmfunidelmatch.checkIdealPatternMatch(memberPP['matchoccupationselected'], partnerProfileDet['occupationselected'], function(err,chkoccupt){
						callback(null,chkoccupt);
					});
				},
				chkStar : function(callback){
					//Check Star Pattern Match
					bmfunidelmatch.checkStarMatch(memberPP['matchreligion'], partnerProfileDet['religion'], memberPP['matchstarid'], partnerProfileDet['star'], function(err,chkStar){
						callback(null,chkStar);
					}); 
				},
				chkManglik : function(callback){
					// Check Manglik Status 
					bmfunidelmatch.checkManglikStatus(memberPP['matchmanglik'], partnerProfileDet['dosham'], function(err,chkManglik){
						callback(null,chkManglik);
					}); 
				},
				chkEatingHabits : function(callback){
					//Check Eating Status 
					bmfunidelmatch.checkEatingHabitPatternMatch(memberPP['matcheatinghabitspref'], partnerProfileDet['eatinghabits'], function(err,chkEat){
						callback(null,chkEat);
					}); 
				},
				chkMaritialStatus : function(callback){
					//Check Marital Status
					bmfunidelmatch.checkMaritalStatus(memberPP['matchhavingchildren'],partnerProfileDet['noofchildren'],memberPP['matchmaritalstatus'],partnerProfileDet['maritalstatus'], function(err,checkMarit){
						callback(null,checkMarit);
					}); 
				},
				chkReligion : function(callback){
					bmfunidelmatch.checkReligionhash(memberPP['matchreligion'], partnerProfileDet['religion'], function(err,chkReligion){
						callback(null,chkReligion);
					}); 
				},
				chkCaste : function(callback){
					bmfunidelmatch.CasteNobarIdealMatch(memberPP['matchcaste'], partnerProfileDet['caste'], partnerProfileDet['castenobar'], memberPP['matchreligion'], partnerProfileDet['religion'], function(err,chkCaste){
						callback(null,chkCaste);
					}); 
				},
				chkCountry : function(callback){
					bmfunidelmatch.countryBasedMatch(memberPP['matchcountry'], memberPP['matchindianstates'], memberPP['matchusstates'], 0, partnerProfileDet['countryselected'], partnerProfileDet['residingstate'], 0, function(err,chkCountry){
						callback(null,chkCountry);
					}); 
				},
				chkgothram : function(callback){
					matchCasteExplode = memberPP['matchcaste'];
					getCasteCount =  bmgeneric.count(matchCasteExplode); 
					if((getCasteCount == 1 && !bmgeneric.in_array("0", matchCasteExplode)) && partnerProfileDet['religion'] ==1) 
					{
						if(chkExceptgothram == 1)
						{
							if(memberPP['gothraid'] != partnerProfileDet['gothraid'] && memberPP['gothraid'] != '')
								callback(null,1);
							else 
								callback(null,0);
						} else{
							bmfunidelmatch.checkIdealPatternMatch(memberPP['gothraid'], partnerProfileDet['gothraid'], function(err,chkgothram){
								callback(null,chkgothram);
							}); 
						}
					} else {
						callback(null,1);
					}	
				},
				chkAnnualIncome : function(callback){
					if(bmgeneric.in_array("0", memberPP['matchcountry']) || bmgeneric.in_array("98", memberPP['matchcountry']))
						getIncomeHash = bmfunidelmatch.checkIdealPatternMatch1(memberPP['matchcountry'], '98');	
						
					if(getIncomeHash == 0)
					{ 
						DollarStinc = (bmvarssearcharrincen.ANNUALINCOMEDOLLARVALUEHASH[memberPP['matchstincome']])?(bmvarssearcharrincen.ANNUALINCOMEDOLLARVALUEHASH[memberPP['matchstincome']]):0;
						Dollarendinc = (bmvarssearcharrincen.ANNUALINCOMEDOLLARVALUEHASH[memberPP['matchendincome']])?(bmvarssearcharrincen.ANNUALINCOMEDOLLARVALUEHASH[memberPP['matchendincome']]):0;

						if(DollarStinc != 0)
							 stinc = Math.round(USD4CONVERSION * DollarStinc);
						else
							stinc = 0;

						if(Dollarendinc != 0)
							endinc = Math.round(USD4CONVERSION * Dollarendinc);
						else 
							endinc = 0;
					}else{  
						stinc = (bmvarssearcharrincen.ANNUALINCOMEINRVALUEHASH[memberPP['matchstincome']])?(bmvarssearcharrincen.ANNUALINCOMEINRVALUEHASH[memberPP['matchstincome']]):0;
						endinc = (bmvarssearcharrincen.ANNUALINCOMEINRVALUEHASH[memberPP['matchendincome']])?(bmvarssearcharrincen.ANNUALINCOMEINRVALUEHASH[memberPP['matchendincome']]):0;
					}
					bmfunidelmatch.idealAnnualIncome(stinc, endinc, partnerProfileDet['annualincome'], memberPP['matchstincome'], function(err,chkAnnualIncome){
						callback(null,chkAnnualIncome);
					}); 
					//skip resident status checking - need to include
				}
			},function(error,IdelMatch){
				/*Newly Added*/
				if ((partnerProfileDet['countryselected']==98 && IdelMatch.chkCountrySelected ==1 && (IdelMatch.chkResidingState==1 || memberPP['matchindianstates']==0)) || ((partnerProfileDet['countryselected']==222 && IdelMatch.chkCountrySelected ==1 && (IdelMatch.chkResidingState==1 || memberPP['matchusstates']==0)) || (partnerProfileDet['countryselected']!=98 && partnerProfileDet['countryselected']!=222 && IdelMatch.chkCountrySelected == 1))) 
				{
					residingIdealMatch =1;
				} else{
					residingIdealMatch =0;
				}
				
				if(((memberPP['matchstage']	<= partnerProfileDet['age']) && (memberPP['matchendage'] >=partnerProfileDet['age'])) &&
				((Math.floor(memberPP['matchstheight']) <= partnerProfileDet['height']) && (Math.ceil(memberPP['matchendheight']) >= partnerProfileDet['height'])) &&
				(IdelMatch.chkMaritialStatus == 1) &&
				((memberPP['matchphysicalstatus']	== partnerProfileDet['specialcase']) || (memberPP['matchphysicalstatus'] == 2)) && 
				(IdelMatch.chkMotherTongue ==1 ) && (IdelMatch.chkReligion ==1) && (IdelMatch.chkCaste ==1) && (IdelMatch.chkEducationSelected == 1) &&
				(IdelMatch.chkCountry == 1) && (IdelMatch.chkManglik == 1) &&  (residingIdealMatch ==1) &&	
				(IdelMatch.chkAnnualIncome == 1) && (IdelMatch.chkgothram == 1)  && (IdelMatch.chkStar == 1) && (IdelMatch.chkSmokingHabits ==1) && (IdelMatch.chkDrinkingHabits == 1) && (IdelMatch.chkSubCasteId == 1) &&  (IdelMatch.chkEatingHabits == 1) && (IdelMatch.chkCitizenship == 1) && (IdelMatch.chkOccupationSelected == 1)){
					//returnPPId	= "Y";
					cbimatch(null,"Y");
				}else{
					cbimatch(null,"N");
				} 
			});	
		}catch(err){
			console.log("idealMatchProfile Errors :",err);
			cbimatch(err,null);
		}
		
	}

	//to check partner profiledetail value(patternVal) avialable in member's pp value (needToChk)
	exports.checkIdealPatternMatch = function(needToChk,patternVal,callback)
	{
		if(needToChk == '') 
			needToChk =0;
		if(!bmgeneric.is_array(needToChk))
			needtoChkInarray = bmgeneric.explode("~",bmgeneric.trim(needToChk));
		else
			needtoChkInarray = needToChk;
		if(bmgeneric.in_array("0",needtoChkInarray)) 
		{
			callback(null,1);
		}else{
			if(bmgeneric.in_array(bmgeneric.trim(patternVal),needtoChkInarray)) 
			{
				callback(null,1);
			} else {
				callback(null,0);
			}
		}
	}
	
		//to check partner profiledetail value(patternVal) avialable in member's pp value (needToChk)
	exports.checkIdealPatternMatch1 = function(needToChk,patternVal)
	{
		if(needToChk == '') 
			needToChk =0;
		if(!bmgeneric.is_array(needToChk))
			needtoChkInarray = bmgeneric.explode("~",bmgeneric.trim(needToChk));
		else
			needtoChkInarray = needToChk;
		if(bmgeneric.in_array("0",needtoChkInarray)) 
		{
			return 1;
		}else{
			if(bmgeneric.in_array(bmgeneric.trim(patternVal),needtoChkInarray)) 
			{
				return 1;
			} else {
				return 0;
			}
		}
	}

	exports.checkStarMatch = function(PPReligion,ViewingMemReligion,PPStar,ViewingMemberStar,callback){ 
		if(PPStar == '') PPStar=0;
		if(!bmgeneric.is_array(PPStar))
			PPStarExplode = bmgeneric.explode("~",PPStar);
		else
			PPStarExplode = PPStar;
		if(!bmgeneric.is_array(PPReligion))
			ppReligionExplode = bmgeneric.explode("~",PPReligion);
		else
			ppReligionExplode = PPReligion;
		if(!bmgeneric.in_array("0",PPStarExplode)) {
			if(bmgeneric.count(ppReligionExplode)==1 && !bmgeneric.in_array("0",ppReligionExplode)) {  
				if(bmgeneric.in_array(ViewingMemReligion,[1,12,13,14,3])) {  //echo PPStar."pp"; 
					if(bmgeneric.in_array(ViewingMemberStar,PPStarExplode)) {   
						callback(null,1);
					} else {
						callback(null,0);
					}
				}else { 
					callback(null,1);
				}
		   } else callback(null,1);
		}else callback(null,1);
	}

	exports.checkManglikStatus = function(PPManglik,ViewingMemberManglik,callback){ 
		if(!bmgeneric.is_array(PPManglik))
			MangilkArr=bmgeneric.explode("~",PPManglik);
		else
			MangilkArr = PPManglik;

		if((bmgeneric.in_array("1",MangilkArr)&&(bmgeneric.in_array("2",MangilkArr))&&(bmgeneric.in_array("3",MangilkArr)))) { 
			PPMANGLIK="1~2~3~0";
		} else if((bmgeneric.in_array("1",MangilkArr)&&(bmgeneric.in_array("3",MangilkArr)))) {
			PPMANGLIK="1~3~0";
		} else if((bmgeneric.in_array("2",MangilkArr)&&(bmgeneric.in_array("3",MangilkArr)))) { 
			PPMANGLIK="2~3~0";
		} else if((bmgeneric.in_array("1",MangilkArr)&&(bmgeneric.in_array("2",MangilkArr)))) { 
			PPMANGLIK="2~1";
		}else if(bmgeneric.in_array("3",MangilkArr)) {
			PPMANGLIK="3~0";
		}  else if(bmgeneric.in_array("2",MangilkArr)) {
			PPMANGLIK="2";
		}  else if(bmgeneric.in_array("1",MangilkArr)) {
			PPMANGLIK="1";
		} else{
			   PPMANGLIK="0";
		}
		if(PPMANGLIK != 0){
			expManglik = bmgeneric.explode("~",PPMANGLIK);
			if(bmgeneric.in_array(ViewingMemberManglik,expManglik)) 
				return callback(null,1);
			else 
				return callback(null,0);
		}else {
			return callback(null,1);
		}
	}

	exports.checkEatingHabitPatternMatch = function(PPEatinghabitsPref,ViewingEatingHabits,callback){
		if(!bmgeneric.is_array(PPEatinghabitsPref))
			EatingPPVals = bmgeneric.explode("~",PPEatinghabitsPref);
		else
			EatingPPVals = PPEatinghabitsPref;

		if(!bmgeneric.in_array("0",EatingPPVals)){
		   if(bmgeneric.in_array(ViewingEatingHabits,EatingPPVals)){
				callback(null,1);
			}else{
				callback(null,0);
			}
		}else{
		   callback(null,1);
		}
	}


	exports.checkMaritalStatus = function(PPHaveChildren,viewingMemberHAveChildren,PPMaritialStatus,ViewMemberMaritialStatus,callback){
		if(!bmgeneric.is_array(PPMaritialStatus))
			ExplodePPMaritialStatus = bmgeneric.explode("~",PPMaritialStatus); 
		else
			ExplodePPMaritialStatus = PPMaritialStatus;
		if(!bmgeneric.is_array(PPHaveChildren))
			ExplodePPHaveChildren = bmgeneric.explode("~",PPHaveChildren); 
		else
			ExplodePPHaveChildren = PPHaveChildren;	
		
			if(bmgeneric.in_array(ViewMemberMaritialStatus,ExplodePPMaritialStatus) || (bmgeneric.in_array("0",ExplodePPMaritialStatus))) { 
				if(ViewMemberMaritialStatus != 1) {
					if(!bmgeneric.in_array("0",ExplodePPHaveChildren)){
						if(PPHaveChildren == 1 && viewingMemberHAveChildren == 0){
							return callback(null,1);
						}else if(PPHaveChildren == 2 && viewingMemberHAveChildren == 1){
							return callback(null,1);
						}else if(PPHaveChildren == 3 && viewingMemberHAveChildren == 2){
							return callback(null,1);
						}else {
							return callback(null,0);
						}
					}else
						return callback(null,1);
			} else{  
				return callback(null,1);
			}
		} else 
		   return callback(null,0);
	}

	exports.CasteNobarIdealMatch = function(ppmatchCaste,ViewingMemberCaste,ViewingCasteNoBar,MatchReligion,Religion,callback){
		if(!bmgeneric.is_array(MatchReligion))
			ppmatchCasteExplode = bmgeneric.explode("~",ppmatchCaste);
		else
			ppmatchCasteExplode = MatchReligion;
		if(bmgeneric.in_array("998",ppmatchCasteExplode) && (ViewingMemberCaste == 0 || ViewingCasteNoBar == 1)) {  
			return callback(null,1);
		} else  {
			bmfunidelmatch.checkIdealPatternMatch(ppmatchCaste,ViewingMemberCaste,function(err,retvalue){
				return callback(null,retvalue);
			});
		}
	}


	exports.checkReligionhash = function(MatchReligion, Religion,callback){
		if(!bmgeneric.is_array(MatchReligion))
			ppMatchReligion = bmgeneric.explode("~",MatchReligion);
		else
			ppMatchReligion = MatchReligion;
		var Religionarr = {}
		if(bmgeneric.in_array("2",ppMatchReligion)) { // Muslim others
			Religionarr[0] = 10;      Religionarr[1] = 11; Religionarr[2] = 2;
			if(bmgeneric.in_array(Religion,Religionarr)){
				return callback(null,1);
			}else {
				return callback(null,0);
			}
		} else if(bmgeneric.in_array("3",ppMatchReligion)){ //Christian - Others
			Religionarr[0] = 12;      Religionarr[1] = 13; Religionarr[2] = 14; Religionarr[3] = 3;
			if(bmgeneric.in_array(Religion,Religionarr)){
				return callback(null,1);
			}else {
				return callback(null,0);
			}
		}else if(bmgeneric.in_array("5",ppMatchReligion)){ // Jain Others
			Religionarr[0] = 15;      Religionarr[1] = 16; Religionarr[2] = 5;
			if(bmgeneric.in_array(Religion,Religionarr)){
				return callback(null,1);
			}else {
				return callback(null,0);
			}
		}else{
			bmfunidelmatch.checkIdealPatternMatch(MatchReligion,Religion,function(err,retunval){
				return callback(null,retunval);
			});
		}
	}

	exports.countryBasedMatch = function(PPmatchCountry,PPResidingIndiaSt,PPResidingUsState,PPResidingDistrict,viewingMemberCountry,viewingMemberResidingState,ViewingMemberDistrict,callback){ 
		//global CITY_STATE_MAPPING; 
		// Remove State/District Values from Array Vals  
		bmfunidelmatch.removeArrayVals(PPResidingIndiaSt,PPResidingDistrict,function(err,getArray){
			var PPResidingIndiaState = bmgeneric.implode("~",getArray);
			if(!bmgeneric.is_array(PPmatchCountry))
				PPmatchCountryExplode = bmgeneric.explode("~",PPmatchCountry); 
			else
				PPmatchCountryExplode = PPmatchCountry;
			if(!bmgeneric.in_array("0",PPmatchCountryExplode)){
				if(bmgeneric.in_array(viewingMemberCountry,PPmatchCountryExplode)) {   
					if (((viewingMemberCountry != '98' && viewingMemberCountry != '222'))) {
						return callback(null,1);
					} else if (viewingMemberCountry == '222') {
						if(!bmgeneric.is_array(PPResidingUsState))
							explodePPResidingUsState = bmgeneric.explode("~",PPResidingUsState);
						else
							explodePPResidingUsState = PPResidingUsState;

						if(bmgeneric.in_array(viewingMemberResidingState,explodePPResidingUsState) || bmgeneric.in_array("0",explodePPResidingUsState)){
							return callback(null,1);
						}else{
							return callback(null,0);
						}
					} else if ((viewingMemberCountry == '98')) { 
						if(PPResidingDistrict == '') { PPResidingDistrict=0; }
							if(!bmgeneric.is_array(PPResidingDistrict))
								DistrictExplode = bmgeneric.explode("~",PPResidingDistrict); 
							else 
								DistrictExplode = PPResidingDistrict;

						 if(!bmgeneric.in_array("0",DistrictExplode)){
							if(!bmgeneric.is_array(PPResidingIndiaState))
								StateExplode = bmgeneric.explode("~",PPResidingIndiaState);
							else
								StateExplode = PPResidingIndiaState;
							if(bmgeneric.in_array(ViewingMemberDistrict,DistrictExplode)){
								return callback(null,1);
							} else if(bmgeneric.in_array(viewingMemberResidingState,StateExplode)){
								return callback(null,1);
							}else
								return callback(null,0);
						 }else {
							return callback(null,1);
						}
					}else {
						return callback(null,1);
					}
				} else{
					return callback(null,0);
				}
			}else{
				return callback(null,1);
			}
		});
	}

	exports.removeArrayVals = function(PPResidingIndiaState,PPResidingDistrict,callback){
		//global CITY_STATE_MAPPING;
		if(!bmgeneric.is_array(PPResidingDistrict))
			DistrictExplode = bmgeneric.explode("~",PPResidingDistrict); 
		else
			DistrictExplode = PPResidingDistrict;
		if(!bmgeneric.is_array(PPResidingIndiaState))
			StateExplode = bmgeneric.explode("~",PPResidingIndiaState); 
		else
			StateExplode = PPResidingIndiaState;
		
		/*foreach(StateExplode as key=> state){
			foreach(DistrictExplode as District){			
				if(CITY_STATE_MAPPING[District] ==  state) {
					delete StateExplode[key];
				}
			}
		} */
		return callback(null,StateExplode);
	}
	
	exports.idealAnnualIncome = function(stinc, endinc, AnnualIncome, ppInfoStIncome,callback){
		if(ppInfoStIncome == 1){ // check for Less than 50,000 Condition
			if(stinc >= AnnualIncome && endinc ==0){
				return callback(null,1);
			 }else{
				return callback(null,0);
			 }
		}else{
		   if(((stinc <= AnnualIncome)  || stinc ==0 ) && ((endinc >=AnnualIncome) || endinc ==0))  {
				return callback(null,1);
		   }else{
				return callback(null,0);
		   }
		}
	}
