/**********************************************************************************************
 *	Filename	: locatInfo.js							
 *	Author		: Sathrak paldurai K
 *	Date		: 28-09-2017								
 *	Description	: Viewed member details display.
***********************************************************************************************/
	exports.getlocatInfo = function(arg,partnerInfo,callback){
		try{
			returnResultSet = {};
			returnResultSet['TITLE'] = bmlable.l_location_informntion;
			//#Country			
			returnResultSet['COUNTRY'] = bmgeneric.appgetFromArryHash('COUNTRYHASH', partnerInfo['countryselected']); 
			//#State	// NRI dropdown changes //
			if(partnerInfo['residingstate'] != 0 && bmgeneric.in_array(partnerInfo['countryselected'], COUNTRYREQSTATE) && (RESSTATECOUNTRYMAPPING[partnerInfo['residingstate']] == partnerInfo['countryselected'])) {	
				returnResultSet['STATE'] = RESIDESTATENAMES[partnerInfo['residingstate']];
				//utf8_encode(RESIDESTATENAMES[partnerInfo['residingstate']]);
			} else {
				returnResultSet['STATE'] = ((bmgeneric.trim(partnerInfo['residingarea']) != '') ? bmgeneric.trim(partnerInfo['residingarea']) : '-');
				//utf8_encode(partnerInfo['residingarea'])
			}
			
			//#City
			if (partnerInfo['countryselected'] == 98) {
				if (partnerInfo['residingcityid'] != '' && partnerInfo['residingcityid'] > 0) {
					if (partnerInfo['residingcityid'] == 999) { 
						//## City not in the list	
						resstate = partnerInfo['residingstate'];
						mapped_district = STATE_DISTRICT_MAPPING[resstate];
						if (bmgeneric.strpos(mapped_district, ',')) {
							mapped_district = bmgeneric.explode(',', mapped_district);
							returnResultSet["CITY"] = (bmgeneric.in_array(partnerInfo['residingdistrict'], mapped_district)) ? CITY[partnerInfo['residingdistrict']] : '';
						} else {
							returnResultSet["CITY"] = CITY[mapped_district];
						}
					} else {
						returnResultSet['CITY'] = STATE_CITY_MAPPING[partnerInfo['residingstate']][partnerInfo['residingcityid']];
						if (returnResultSet['CITY'] == '') {
							returnResultSet['CITY'] = bmgeneric.appgetFromArryHash('CITY', partnerInfo['residingdistrict']);
						}
					}
				} else {
					returnResultSet['CITY'] = bmgeneric.appgetFromArryHash('CITY', partnerInfo['residingdistrict']);
				}
			} else {
				returnResultSet['CITY'] = ((bmgeneric.trim(partnerInfo['residingcity']) != '') ? bmgeneric.trim(partnerInfo['residingcity']) : '-');//utf8_encode(partnerInfo['residingcity'])
			}
			if ((partnerInfo['citizenship'] == partnerInfo['countryselected']) && partnerInfo['citizenship'] != '') {
				if (partnerInfo["countryselected"] == 220) { // For UAE country member
					partnerInfo['residentstatus'] = (arg['APPTYPE'] != "" && arg['APPTYPE'] != 115 && (!bmgeneric.in_array(arg['APPTYPE'],bmvars.ANDROIDAPPTYPE))) ? 1 : partnerInfo['residentstatus']; // for App and wap selected resident 	
				} else {
					partnerInfo['residentstatus'] = 1; // Other UAE member default citizen for app and web (citizenship equal to country) 
				}				
			}
			returnResultSet['CITIZENSHIP'] = bmgeneric.appgetFromArryHash('COUNTRYHASH', partnerInfo['citizenship']); 
			//## Citizenship checking ##
			returnResultSet['RESIDENTSTATUS'] = bmgeneric.appgetFromArryHash('RESIDENTSTATUSHASH', partnerInfo['residentstatus']);			
			if(partnerInfo['countryselected'] == 98){
				returnResultSet['NRITAG'] = 0;
			}
			else{
				returnResultSet['NRITAG'] = 1;
			}			
			callback(null,returnResultSet);
		}catch(err){
			console.error("View profile getlocatInfo - Error:",err);
			return callback(err,returnResultSet);
		}
	}
