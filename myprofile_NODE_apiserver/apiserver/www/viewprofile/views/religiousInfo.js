/**********************************************************************************************
 *	Filename	: religousInfo.js							
 *	Author		: Sathrak paldurai K
 *	Date		: 28-09-2017								
 *	Description	: Viewed member details display.
***********************************************************************************************/
	exports.getreligsInfo = function(data,dNameCap,partnerInfo,mygothra,callback){
		try{				
			var returnResultSet = {};
			//## Religion checking ##
			returnResultSet['TITLE'] = bmlable.l_religious_information;	
			returnResultSet['RELIGION'] = bmgeneric.appgetFromArryHash('RELIGIONHASH', partnerInfo['religion']);
			
			returnResultSet["GOTHRA"] = mygothra;
			if((returnResultSet["GOTHRA"] == bmlable.l_not_specified || returnResultSet["GOTHRA"] == "-") && bmgeneric.array_key_exists("GOTHRAREQUEST",global.RequestComTypeArray)) 	
				global.requestInfoArr["GOTHRAREQUEST"] = global.RequestComTypeArray["GOTHRAREQUEST"];
			
			// Caste No Bar checking ##
			view_casteNoBar = bmgeneric.trim(partnerInfo['castenobar']);

			// Caste 999 others for Db / 8888 memans others for Sphinx
			if (((partnerInfo['caste'] == '999' || bmgeneric.trim(partnerInfo['caste']) == '8888') && partnerInfo['casteothers'] != '')) {
				returnResultSet['CASTE'] = partnerInfo['casteothers'];
			} else if (partnerInfo['caste'] == '0') {
				returnResultSet['CASTE'] = bmlable.l_not_specified;
			} else {
				returnResultSet['CASTE'] = bmgeneric.appgetFromArryHash('CASTEHASH', partnerInfo['caste']);
				if (returnResultSet['CASTE'] == '-' || returnResultSet['CASTE'] == '') {
					returnResultSet['CASTE'] = bmlable.l_not_specified;
				}
			}
			remv_other = [' - Others', 'Other '];
			returnResultSet["CASTE"] = bmgeneric.str_replace(remv_other, "", returnResultSet["CASTE"]);
			if (bmgeneric.trim(returnResultSet["CASTE"]) == 'Brahmins') {
				returnResultSet["CASTE"] = bmgeneric.trim(returnResultSet["CASTE"], 's');
			}
			if (partnerInfo['casteothers'] != '' && view_casteNoBar == 1) {
				returnResultSet['CASTE'] = returnResultSet['CASTE'] + " (" + bmlable.l_castenobar + ")";
			} else if (view_casteNoBar == 1) {
				returnResultSet['CASTE'] = returnResultSet['CASTE'] + " (" + bmlable.l_castenobar + ")";
			}	
			if(partnerInfo['religion']==3 && data.APPTYPE==115){//Added for christian changes unset the value in caste and assignt o division for wap
				returnResultSet['DIVISION'] = returnResultSet['CASTE'];
				returnResultSet['CASTE'] ='';
			}
			//New Subcaste Change
			subcaste = '';
			subcaste_freetext_val = '-';
			// SubcasteId
			if ((partnerInfo['subcasteid'] != '') && (partnerInfo['subcasteid'] > 0)) {
				subcaste = (bmgeneric.appgetFromArryHash("SUBCASTEHASH", partnerInfo['subcasteid']) != "-") ? bmgeneric.appgetFromArryHash("SUBCASTEHASH", partnerInfo['subcasteid']) : "";
			} else {
				subcaste = '';
			}

			// Subcaste FreeText
			subcaste_freetext_val = (partnerInfo['subcaste'] != '') ? partnerInfo['subcaste'] : subcaste;

			//set not specified
			returnResultSet['SUBCASTE'] = (subcaste_freetext_val == 'Others' || subcaste_freetext_val == '-' || subcaste_freetext_val == '') ? bmlable.l_not_specified :subcaste_freetext_val;

			//zodiac display
			if (!bmgeneric.empty(partnerInfo['zodiacsign'])) {
				returnResultSet['ZODIAC'] = bmgeneric.appgetFromArryHashEn('ZODIAC', partnerInfo['zodiacsign']);
			}
			else
				returnResultSet['ZODIAC'] = "-";
			
			returnResultSet['STAR'] = (partnerInfo.star) ? bmgeneric.appgetFromArryHashSr(dNameCap+'STARHASH', partnerInfo.star) : bmlable.l_not_specified;
			var raasi = dNameCap+'RAASIHASH';				
			DOMAINRAASIHASH = RAASIHASH[raasi];
			returnResultSet['RAASI'] = (partnerInfo['raasi']) ? DOMAINRAASIHASH[partnerInfo['raasi']] : bmlable.l_not_specified;
			
			if((returnResultSet["STAR"] == bmlable.l_not_specified || returnResultSet["STAR"] == "-") && global.REQUESTFLAG == 1 &&  bmgeneric.array_key_exists("STARREQUEST",global.RequestComTypeArray)) 
				global.requestInfoArr["STARRAASIREQUEST"] = global.RequestComTypeArray["STARREQUEST"];
			if (returnResultSet['STAR'] == "-")
				returnResultSet['STAR'] = "";

			if (returnResultSet['RAASI'] == "-")
				returnResultSet['RAASI'] = "";	
			
			if(partnerInfo.dosham > 3){
				doshamval = bmvarssearcharrincen.COMBINEDHOSHAARRAY[partnerInfo.dosham];
				domaindoshamval = bmgeneric.explode("~",doshamval);			
				if(dNameCap == "TAMIL"){
					DOSHARRAY = bmvarssearcharrincen.TAMILDHOSHAMARRAY;
				} else if(dNameCap == "KERALA"){
					DOSHARRAY = bmvarssearcharrincen.KERALADHOSHAMARRAY;				
				} else if(dNameCap == "TELUGU" || dNameCap == "KANNADA"){
					DOSHARRAY = bmvarssearcharrincen.TELUGUKANNADADHOSHAMARRAY;				
				} else {
					DOSHARRAY = bmvarssearcharrincen.OTHERDHOSHAMARRAY;				
				}	
				returnResultSet['MANGLIK'] ='';
				domaindoshamval.forEach(function (value) 
				{
					if(value!="")
						returnResultSet['MANGLIK']+= DOSHARRAY[value]+",";
				});				
			} else {
				returnResultSet['MANGLIK'] = bmgeneric.appgetFromArryHashEn('MANGLIKHASH', partnerInfo.dosham);
			}			
			returnResultSet['MANGLIK'] = bmgeneric.trim(returnResultSet['MANGLIK'],",");
			returnResultSet['MANGLIKLABEL'] = (dNameCap == "TAMIL" || dNameCap == "KERALA" || dNameCap == "TELUGU" || dNameCap == "KANNADA"  )?"Dosham":"Dosh";
			
			if (returnResultSet['MANGLIK'] == "Don\'t know") {
				returnResultSet['MANGLIK'] = "Don't know";
			}			
			returnResultSet['HOROMATCH'] = (partnerInfo.horoscopematch) ? bmgeneric.appgetFromArryHashEn('HOROMATCHHASH', partnerInfo.horoscopematch) : bmlable.l_not_specified;						
			callback(null,returnResultSet);
		}catch(err){
			console.log("Error:",err);
			return callback(err,{});
		}
	}