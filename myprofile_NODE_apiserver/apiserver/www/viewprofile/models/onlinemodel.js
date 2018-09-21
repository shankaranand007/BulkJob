/**********************************************************************************************
File    : checkonlinestatus.js
Author  : Sathrak Paldurai k
Date    : 30-Aug-2016
************************************************************************************************
Description: Get member online status from SphinxRT
***********************************************************************************************/
	var UserStatus = {
		chkonlinestatus:function(SphinxId,callback){
			try{				
				var selectFields = 'matriid,powerpackstatus,loggedinat';
				var sphinxOnlWhr = ' id=?';
				var whereValueArr = [parseInt(SphinxId)];
				var HostName = "ONLINEMEMBERSDELTASELECTIP";
				var max_matches = 'max_matches=10';
				var querycmt = "Online member Delta Index - ViewProfile";
				bmSphinxRtDb.bmDbSelect(1, HostName,SPHINXINDEXNAME['ONLINEMEMBERSDELTA'], selectFields, sphinxOnlWhr, whereValueArr,max_matches, querycmt, 1, function(err,onlstatus){
					if(!err){
						callback(null, onlstatus);
					} else {
						callback(err, {});
					}	
				});			
			}catch(err){
				console.error("Error On: File Name - onlinemodel.js:",err);
				return callback(err, {});
			}
		}
	}	
	module.exports = UserStatus;