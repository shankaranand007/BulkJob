/**********************************************************************************************
 *	Filename	: hobbiesInfo.js							
 *	Author		: Sathrak paldurai K
 *	Date		: 28-09-2017								
 *	Description	: Viewed member details display.
***********************************************************************************************/
	exports.getViewMemHobbyDet = function(arg,partnerInfo,domainArrayList,callback){	
		try{
			if(arg.SPHINXENABLE ==1){
				var valuesrc = 1;
				hobbiesInfo.gethobbiesInfo(partnerInfo,valuesrc, function(err,hobbinfo){
					callback(null,hobbinfo);
				});
			} else {
				var valuesrc = 0;
				//#Get Hobbiesinfo Details From Database
				var dbHost = bmDb.bmDbConnById(2, arg.VIEWEDID, 'S');
				var tableName = DOMAINTABLE[bmgeneric.strtoupper(domainArrayList['domainnameshort'])]['HOBBIESINFO'];
				viewPrfModel.getSqlHobInfo(arg.VIEWEDID, dbHost,DBNAME['MATRIMONYMS'], tableName, function(err,sqlRslt){
					hobbiesInfo.gethobbiesInfo(sqlRslt,valuesrc, function(err,hobbinfo){
						callback(null,hobbinfo);
					});
				});
			}
			
		}catch(err){
			console.log("Error At: File Name - and Function Name -hobbiesInfo :",err);
			return callback(err,displayHobbiesInfo);
		}
	}	
	
	exports.gethobbiesInfo = function(partnerInfo,valuesrc,callback){	
		try{
			if(!bmgeneric.empty(partnerInfo)){
				var displayHobbiesInfo = {};			
				displayHobbiesInfo["TITLE"] = bmlable.l_hobbies_interests;
				hobbiesSel = bmgeneric.appgetFromHobbiesArryHash('HOBBIESHASH', partnerInfo['hobbiesselected'], bmgeneric.trim(partnerInfo['hobbiesothers']), valuesrc);
				displayHobbiesInfo["HOBBIES"] = (bmgeneric.trim(hobbiesSel) != "") ? hobbiesSel : "";
				interestSel = bmgeneric.appgetFromHobbiesArryHash('INTERESTHASH', partnerInfo['interestsselected'], bmgeneric.trim(partnerInfo['interestsothers']),valuesrc);
				displayHobbiesInfo["INTERESTS"] = (bmgeneric.trim(interestSel) != "") ? interestSel : "";
				musicSel = bmgeneric.appgetFromHobbiesArryHash('MUSICHASH', partnerInfo['musicselected'], bmgeneric.trim(partnerInfo['musicothers']),valuesrc);
				displayHobbiesInfo["MUSIC"] = (bmgeneric.trim(musicSel) != "") ? musicSel : "";
				bookSel = bmgeneric.appgetFromHobbiesArryHash('READHASH', partnerInfo['booksselected'], bmgeneric.trim(partnerInfo['booksothers']),valuesrc);				
				displayHobbiesInfo["READS"] = (bmgeneric.trim(bookSel) != "") ? bookSel : "";
				movieSel = bmgeneric.appgetFromHobbiesArryHash('MOVIESHASH', partnerInfo['moviesselected'], bmgeneric.trim(partnerInfo['moviesothers']),valuesrc);
				displayHobbiesInfo["MOVIES"] = (bmgeneric.trim(movieSel) != "") ? movieSel : "";
				sportSel = bmgeneric.appgetFromHobbiesArryHash('SPORTSHASH', partnerInfo['sportsselected'], bmgeneric.trim(partnerInfo['sportsothers']),valuesrc);
				displayHobbiesInfo["SPORTS"] = (bmgeneric.trim(sportSel) != "") ? sportSel : "";
				foodSel = bmgeneric.appgetFromHobbiesArryHash('FOODHASH', partnerInfo['foodselected'], bmgeneric.trim(partnerInfo['foodothers']),valuesrc);
				displayHobbiesInfo["CUISINE"] = (bmgeneric.trim(foodSel) != "") ? foodSel : "";
				dressSel = bmgeneric.appgetFromHobbiesArryHash('DRESSHASH', partnerInfo['dressstyleselected'], bmgeneric.trim(partnerInfo['dressstyleothers']),valuesrc);
				displayHobbiesInfo["DRESSSTYLE"] = (bmgeneric.trim(dressSel) != "") ? dressSel : "";
				langOthers = bmgeneric.appgetFromHobbiesArryHash('SPOKENLANGHASH', partnerInfo['languagesselected'], bmgeneric.trim(partnerInfo['languagesothers']),valuesrc);
				displayHobbiesInfo["LANGUAGES"] = (bmgeneric.trim(langOthers) != "") ? langOthers : "";
				callback(null,displayHobbiesInfo);
			} else {
				callback(null,partnerInfo);
			}
		}catch(err){
			console.log("Error At: File Name - and Function Name -hobbiesInfo :",err);
			return callback(err,partnerInfo);
		}
	}
	
	//module.exports = gethobbiesInfo;	