/**********************************************************************************************
 *	Filename	: personalInfo.js							
 *	Author		: Sathrak paldurai K
 *	Date		: 28-09-2017								
 *	Description	: Viewed member details display.
***********************************************************************************************/
	exports.getpersonalInfo = function(arg,partnerInfo,profCrtLabel,callback){
		try{
			var returnResultSet = {};
			returnResultSet['TITLE'] = profCrtLabel['few_about'];
			returnResultSet['NAME'] = bmgeneric.strToTile(partnerInfo.name);
			if (partnerInfo.gender == 'F') {
				returnResultSet['GENDER'] = 'Female';
			} else if (partnerInfo.gender == 'M') {
				returnResultSet['GENDER'] = 'Male';
			}
			//If viewing member maritial Status unmarried , we dont need to check noofchildren/childrenlivingstatus
			if (partnerInfo.maritalstatus != 1) {
				returnResultSet["NOOFCHILDREN"] = bmgeneric.appgetFromArryHashSrFom('NOOFCHILDRENHASH', partnerInfo.noofchildren);
				returnResultSet['CHILDRENLIVINGSTATUS'] = bmgeneric.appgetFromArryHashEn('CHILDRENLIVINGSTATUSHASH', partnerInfo.childrenlivingstatus);
			}
			if (partnerInfo.maritalstatus == 2) {
				returnResultSet['MARITALSTATUS'] = "Widowed";
			} else {
				returnResultSet['MARITALSTATUS'] = bmgeneric.appgetFromArryHash('MARITALSTATUSHASH', partnerInfo.maritalstatus);
			}			
			returnResultSet['AGE'] = (partnerInfo.age) ? partnerInfo.age : 0;
			
			var heightcal = bmgeneric.appcalRevFloatHeight(partnerInfo.height);			
			//## Height calculation ##
			var feetis = heightcal['ft'];
			var inchis = heightcal['inchs'];
			if (feetis == 0) {
				returnResultSet["HEIGHT"] = "-";
			} else {
				if (inchis == 0) {
					returnResultSet["HEIGHT"] = feetis + " " + bmlable.l_height_ft + " / " + bmgeneric.round(partnerInfo.height) + " " + bmlable.l_height_cms + "";
				} else if (inchis == 12) {
					feetis++;
					returnResultSet["HEIGHT"] = feetis + " " + bmlable.l_height_ft + " / " + bmgeneric.round(partnerInfo.height) + " " + bmlable.l_height_cms + "";
				} else {
					returnResultSet["HEIGHT"] = feetis + " " + bmlable.l_height_ft + " " + inchis + " " + bmlable.l_height_in + " / " + bmgeneric.round(partnerInfo.height) + " " + bmlable.l_height_cms + "";
				}
			}
			if (partnerInfo.profileweight > 0) {
				weightcal = bmgeneric.appcalRevFloatWeight(partnerInfo.profileweight); 
				//## Weight checking ##
				returnResultSet["WEIGHT"] = weightcal + " " + bmlable.l_weight_kgs + " / " +  bmgeneric.round(partnerInfo.profileweight) + " " + bmlable.l_weight_lbs;
			} else {
				returnResultSet["WEIGHT"] = "-";
			}	
			
			//#viewing member motherTongue others 
			if (partnerInfo.mothertongue == '99' && partnerInfo.mothertongueothers != '') {
				returnResultSet['MOTHERTONGUE'] = partnerInfo.mothertongueothers;
			} else {
				returnResultSet['MOTHERTONGUE'] = bmgeneric.appgetFromArryHash('MOTHERTONGUEHASH', partnerInfo.mothertongue); 
				//## MotherTongue checking ##
			}			
			returnResultSet['BODYTYPE'] = bmgeneric.appgetFromArryHashEn('BODYTYPEHASH', partnerInfo.bodytype); 
			//## BodyType checking ##
			if (bmgeneric.trim(returnResultSet['BODYTYPE']) == "-") {
				returnResultSet['BODYTYPE'] = "";
			}
			returnResultSet['COMPLEXION'] = bmgeneric.appgetFromArryHashEn('COMPLEXIONHASH', partnerInfo.complexion); 
			//## Complexion checking ## 
			if (bmgeneric.trim(returnResultSet['COMPLEXION']) == "-") {
				returnResultSet['COMPLEXION'] = "";
			}
			returnResultSet['PHYSICALSTATUS'] = bmgeneric.appgetFromArryHash('PHYSICALSTATUS', partnerInfo.specialcase);
			returnResultSet['BLOODGROUP'] = bmgeneric.appgetFromArryHash('BLOODGROUPHASH', partnerInfo.bloodgroup); 
			
			//## BloodGroup checking ##
			returnResultSet['PROFILECREATEDFOR'] = (!bmgeneric.empty(bmvarsviewarren.PROFILECREATEDBYHASHEXT[partnerInfo.bywhom])) ? bmvarsviewarren.PROFILECREATEDBYHASHEXT[partnerInfo.bywhom] : ' - ';
			//returnResultSet['ABOUTME'] = bmgeneric.html_entity_decode(partnerInfo.profiledescription);
			var htmlentite = bmgeneric.htmlspecialchars(partnerInfo.profiledescription);
			var htmlentite = htmlentite.replace(/[\u00A1-\u00FF]/g,""); 
			var htmlentite = htmlentite.replace(/[\u0152-\u2122]/g,"");
			returnResultSet['ABOUTME'] = bmgeneric.html_entity_decode(bmgeneric.str_replace("<br/>", "\n\n", htmlentite));			
			//returnResultSet['ABOUTME'] = bmgeneric.html_entity_decode("<![CDATA[" + bmgeneric.str_replace("<br/>", "\n\n", preg_replace("/(<br\s*\/?>\s*)+/", "<br/>", bmgeneric.preg_replace('/(^|[\.!?]"?\s+)([a-z])/e', '"1" . ucfirst("2")', bmgeneric.preg_replace('/[\x80-\xFF]/', '',bmgeneric.htmlspecialchars(partnerInfo.profiledescription))))) + "]]>");
		
			returnResultSet['TIMECREATED'] = (!bmgeneric.empty(partnerInfo.time_created))?partnerInfo.time_created : strtotime(dateFormat(partnerInfo.timecreated, "yyyy-mm-dd HH:MM:ss"));
			returnResultSet['SPECIALPRIV'] = partnerInfo.specialpriv;
			returnResultSet['ANNUALINCOMEINR'] = partnerInfo.annualincomeininr;
			callback(null,returnResultSet);
		}catch(err){
			console.log("Error:",err);
			return callback(err,returnResultSet);
		}
	}
