/**********************************************************************************************
 *	Filename	: familyInfo.js							
 *	Author		: Sathrak paldurai K
 *	Date		: 28-09-2017								
 *	Description	: Viewed member details display.
***********************************************************************************************/
		
	exports.getFamilyInfoDet = function(arg,family_info,domainArrayList,callback){	
		try{
			if(arg.SPHINXENABLE ==1){
				familyInfo.getfamilyInfo(family_info, function(err,famyinfo){
					callback(null,famyinfo);
				});	
			} else {
				//#Get Hobbiesinfo Details From Database
				var dbHost = bmDb.bmDbConnById(2, arg.VIEWEDID, 'S');
				var tableName=DOMAINTABLE[bmgeneric.strtoupper(domainArrayList['domainnameshort'])]['FAMILYINFO'];
				viewPrfModel.getSqlFamilyInfo(arg.VIEWEDID, dbHost,DBNAME['MATRIMONYMS'], tableName, function(err,family_info){
					familyInfo.getfamilyInfo(family_info, function(err,famyinfo){
						callback(null,famyinfo);
					});	
				});
			}
			
		}catch(err){
			console.log("Error At: File Name - and Function Name -FamilyInfo :",err);
			return callback(err,family_info);
		}
	}	
	
	exports.getfamilyInfo = function(partnerInfo,callback){
		try{
			if(!bmgeneric.empty(partnerInfo)){
				var displayFamilyInfo = {};
				//Get family info according to id
				displayFamilyInfo["TITLE"] = bmlable.l_family_details;			
				displayFamilyInfo["FAMILYVALUES"] = (partnerInfo['familyvalue']) ? bmgeneric.appgetFromArryHashEn('FAMILYVALUEHASH', partnerInfo['familyvalue']) : bmlable.l_not_specified;
				displayFamilyInfo["FAMILYTYPE"] = (partnerInfo['familytype']) ? bmgeneric.appgetFromArryHashEn('FAMILYTYPEHASH', partnerInfo['familytype']) : bmlable.l_not_specified;
				displayFamilyInfo["FAMILYSTATUS"] = (partnerInfo['familystatus']) ? bmgeneric.appgetFromArryHashEn('FAMILYSTATUSHASH', partnerInfo['familystatus']) : bmlable.l_not_specified;
				
				if(parseInt(partnerInfo['fatheroccupation'])>0 && parseInt(partnerInfo['fatheroccupation'])<=6)
					displayFamilyInfo["FATHEROCCUPATION"] = FATHERSTATUSARRAY[parseInt(partnerInfo['fatheroccupation'])];
				else 
					displayFamilyInfo["FATHEROCCUPATION"] = (parseInt(partnerInfo['fatheroccupation'])) ? bmgeneric.trim(partnerInfo['fatheroccupation']) : bmlable.l_not_specified;
											
				if(parseInt(partnerInfo['motheroccupation'])>0 && parseInt(partnerInfo['motheroccupation'])<=6)
					displayFamilyInfo["MOTHEROCCUPATION"] = MOTHERSTATUSARRAY[parseInt(partnerInfo['motheroccupation'])];
				else
					displayFamilyInfo["MOTHEROCCUPATION"] = (parseInt(partnerInfo['motheroccupation'])) ?  bmgeneric.trim(partnerInfo['motheroccupation']) : bmlable.l_not_specified;
					
				var noofbrothers ={};
				noofbrothers['NOOFBROTHERS'] = (partnerInfo['brothers'] == '99') ? bmlable.l_none : ((partnerInfo['brothers']) ? bmgeneric.appgetFromArryHashEn('SIBLINGCOUNTHASH', partnerInfo['brothers']) : '-');
				
				var noofsisters ={};
				noofsisters['NOOFSISTERS'] = (partnerInfo['sisters'] == '99') ? bmlable.l_none : ((partnerInfo['sisters']) ? bmgeneric.appgetFromArryHashEn('SIBLINGCOUNTHASH', partnerInfo['sisters']) : '-');
				
				if (partnerInfo['brothers'] != 99 && bmgeneric.isset(partnerInfo['brothersmarried'])) {
					noofbrothers['BROTHERSMARRIED'] = (partnerInfo['brothersmarried'] == 99) ? bmlable.l_none : bmgeneric.appgetFromArryHashEn('SIBLINGCOUNTHASH', partnerInfo['brothersmarried']);
				} else if (partnerInfo['brothers'] == 99) {
					noofbrothers['BROTHERSMARRIED'] = bmlable.l_none;
				} else {
					noofbrothers['BROTHERSMARRIED'] =  "-";
				}
				displayFamilyInfo['BROTHERS']  = noofbrothers;
				//sisters
				if (partnerInfo['sisters'] != 99 && bmgeneric.isset(partnerInfo['sistersmarried'])) {
					noofsisters['SISTERMARRIED'] = (partnerInfo['sistersmarried'] == 99) ? bmlable.l_none : bmgeneric.appgetFromArryHashEn('SIBLINGCOUNTHASH', partnerInfo['sistersmarried']);
				} else if (partnerInfo['sisters'] == 99) {
					noofsisters['SISTERMARRIED'] = bmlable.l_none;
				} else {
					noofsisters['SISTERMARRIED'] = "-";
				}
				displayFamilyInfo['SISTERS'] = noofsisters;
				//AncestralOrigin checking 
				displayFamilyInfo["ANCESTRALORIGIN"] = (partnerInfo['ancestralorigin']) ?  bmgeneric.trim(bmgeneric.ucwords(partnerInfo['ancestralorigin'])) : bmlable.l_not_specified;
								
				if(displayFamilyInfo["ANCESTRALORIGIN"] == bmlable.l_not_specified && bmgeneric.array_key_exists("ANCESTRALORIGINREQUEST",global.RequestComTypeArray)) 
					global.requestInfoArr["ANCESTRALORIGINREQUEST"] = global.RequestComTypeArray["ANCESTRALORIGINREQUEST"];
			
				//End for none value in no of brothers/sisters.
				//FamilyDesc checking 
				displayFamilyInfo["ABOUTFAMILY"] = (!bmgeneric.empty(partnerInfo['familydescription'])) ? bmgeneric.html_entity_decode(partnerInfo['familydescription']): bmlable.l_not_specified;
				
				if(displayFamilyInfo["ABOUTFAMILY"] == bmlable.l_not_specified && bmgeneric.array_key_exists("ABOUTFAMILYREQUEST",global.RequestComTypeArray)) 
					global.requestInfoArr["ABOUTFAMILYREQUEST"] = global.RequestComTypeArray["ABOUTFAMILYREQUEST"];
				
				callback(null,displayFamilyInfo);
			} else {
				callback(null,partnerInfo);
			}
		}catch(err){
			console.log("View Profile getfamilyInfo - Error:",err);
			return callback(err,partnerInfo);;
		}
	}