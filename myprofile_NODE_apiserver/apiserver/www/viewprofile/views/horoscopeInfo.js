/**********************************************************************************************
 *	Filename	: horoscopeInfo.js							
 *	Author		: Sathrak paldurai K
 *	Date		: 28-09-2017								
 *	Description	: Viewed member details display.
***********************************************************************************************/
	var gethoroscope = {
		gethoroscopeInfo:function(partnerId,partnerInfo,partDminList,memberId='',data='',newlastActivity={},callback){
			//console.log("partnerInfo====:",partnerInfo)
			var HoroscopeDetails = {}; 
			bmCommonFunc.getPhotoDetails(partnerId, data, 2,'',partnerInfo.time_created,partDminList,function(err,HoroDetails){
				gethoroscope.getHorourl(data,partnerId, partDminList, HoroDetails['HoroscopeURL'], partnerInfo['horoscopeavailable'], partnerInfo['time_created'])
				.then(function(HoroUrlOut) {
					HoroscopeDetails['HOROSCOPEAVAILABLE'] = (partnerInfo['horoscopeavailable'] == 0) ? "N" : "Y";
					if ((data.APPTYPE == 115 || bmgeneric.in_array(data.APPTYPE, bmvars.MobileAppType)) && memberId != '') {
						//var skiphtopsw = bmCommonFunc.skipPhotoPassword(2, newlastActivity);
						if (partnerInfo['horoscopeprotected'] == "Y" && bmCommonFunc.skipPhotoPassword(2, newlastActivity)) {
							HoroscopeDetails['HOROSCOPEPROTECTED'] = 'N';
						} else if (partnerInfo['horoscopeprotected'] == "C" && bmCommonFunc.skipPhotoPassword(1, newlastActivity)) {
							HoroscopeDetails['HOROSCOPEPROTECTED'] = 'N';
						} else {
							HoroscopeDetails['HOROSCOPEPROTECTED'] = partnerInfo['horoscopeprotected'];
						}
					} else {
						HoroscopeDetails['HOROSCOPEPROTECTED'] = partnerInfo['horoscopeprotected'];
					}
					
					if (!bmgeneric.empty(HoroUrlOut)) {
						horoType = (bmgeneric.strpos(HoroUrlOut, 'gencurlhoroscope.php') !== false ) ? 2 : 1;
						//# 1 - IMAGE / 2 - HTML			
					}
	
					HoroscopeDetails['HOROTYPE'] = horoType;
					callback(null,HoroscopeDetails);
				})
				.catch(err => {
					console.error("Error At - gethoroscopeInfo Func - View Profile :",err);
					//callback(err,HoroscopeDetails);
				});
			});
		},
		getHorourl: async function(data,viewerid, viewerdomain, horourl, horotype, timecreated='')
		{
			/*******************************************
			| viewerId  - Horoscope Member,
			| viewerDomain - Horoscope Domain
			| horourl  - Horoscope URL
			| horotype  - Horoscope available type
			********************************************/
			var photoHoroPath	= await bmgeneric.getUserImagePath(viewerid,timecreated);
			var genHoroPath	= await bmgeneric.getUserImagePath(viewerid,timecreated,'','horogen');
			var outputhros;
			switch(horotype){
				case 1:
					outputhros = photoHoroPath+horourl;
				break;
				case 2:
					if(bmgeneric.in_array('html',bmgeneric.explode('.', horourl))){
						if(data.APPTYPE == 115)
							outputhros = global.SECUREURL+'api.bharatmatrimony.com/apphoroscope/gencurlhoroscope.php?id='+viewerid+'&horopath='+bmgeneric.urlencode(genHoroPath);
						else
							outputhros = global.SECUREURL+'apps.bharatmatrimony.com/apphoroscope/gencurlhoroscope.php?id='+viewerid+'&horopath='+bmgeneric.urlencode(genHoroPath);
					}
					else{
						outputhros = photoHoroPath+horourl;
					}
				break;
				case 3:
				   if(data.APPTYPE == 115) {
					   outputhros = global.SECUREURL+'api.bharatmatrimony.com/apphoroscope/gencurlhoroscope.php?id='+viewerid+'&horopath='+bmgeneric.urlencode(genHoroPath);
				  }
				  else {
						outputhros = global.SECUREURL+'apps.bharatmatrimony.com/apphoroscope/gencurlhoroscope.php?id='+viewerid+'&horopath='+bmgeneric.urlencode(genHoroPath);
				  }
			  break;
			}
			return outputhros;
		}
	}	
	module.exports = gethoroscope;
	
	