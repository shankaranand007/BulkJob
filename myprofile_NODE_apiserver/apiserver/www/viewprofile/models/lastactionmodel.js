/**********************************************************************************************
File    : checkonlinestatus.js
Author  : Sathrak Paldurai k
Date    : 30-Aug-2016
************************************************************************************************
Description: Get member online status from SphinxRT
***********************************************************************************************/
	var ViewProfile = {
		appLastActionUnified: function(arg,rtSelectFlag,callbackUnif){
			try {
				//console.log("====================:",arg);
				var MemberId = arg.ID;
				var ViewedId = arg.VIEWEDID;
				var dbName = DBNAME['MATRIMONY'];
				if(rtSelectFlag ==1){	
					var SphinxviewId = bmgeneric.covertToSphinxId(ViewedId);			
					var SphinxloginId = bmgeneric.covertToSphinxId(MemberId);
					var whereClause = "MatriId=? and PartnerId=? ";
					var whereClauseVal = [parseInt(SphinxloginId),parseInt(SphinxviewId)];
					var querycmt = "Cominfo / Notest Info - View Profile Index";	
					var max_matches = 'max_matches=10';
				} else {
					var querycmt = "Select Matrimony Profiles - DB"
					var whereClause = "MatriId = ? AND PartnerId = ? ";	
					var whereClauseVal =  [MemberId,ViewedId];
					var max_matches = 'max_matches=10 ';				
				}			
		
				var selectFields = "MatriId,PartnerId,ComInfoId,ComCount,ComType,ComDate,Message,TransMsg,ComStatus,MessageComStatus,MessageComReminder,MessageComReplied,MessageComRepliedStatus,MessageComDeclined,MessageComNeedmoreTime,InterestComStatus,InterestComReminder,InterestComAccepted,InterestComAcceptedbyPhone,InterestComAcceptedbySendmail,InterestComDeclined,InterestComNeedmoretime,InterestComNeedmoreinfo,Bookmarked,Ignored,Blocked,PinComStatus,PinComReplied,PinComRepliedStatus,PinComDeclined,LikedStatus,SkipPrivPwdReceived,SkipPrivPwdSent,SmsComStatus,ViewPhoneComStatus,PhotoReqComStatus,PhotoReqComAccepted,PhotoReqComFullfilment,HoroscopeReqComStatus,HoroscopeReqComAccepted,HoroscopeReqComFullfilment,ReferenceReqComStatus,ReferenceReqComAccepted,ReferenceReqComFullfilment,PhotoPwdReqComStatus,PhotoPwdReqComAccepted,PhotoPwdReqComDeclined,HoroscopePwdReqComStatus,HoroscopePwdReqComAccepted,HoroscopePwdReqComDeclined,ChatComStatus,DateUpdated,ComUnReadCount";
				
				bmCommonFunc.bmfuncTableNames(MemberId, '', function(tableDet){					
					var tableName = tableDet['SENDERNOTESINFO'];
					bmCommonFunc.bmfuncGetComNotesStatsInfo(MemberId,ViewedId,dbName,tableName,selectFields,whereClause,whereClauseVal,max_matches,querycmt,rtSelectFlag,function(err,resultd){
						callbackUnif(err,resultd)
					});								
				});					
			}catch(err){
				console.log("Error On:appLastActionUnified Func - File Name - lastactionmodel:",err);
				callback({Error:"SELECT_QRY_WHERE-CLAUSE-ERR__DB-TBL-ERR__SELECT-FIELD-NOTARRAY",PARAMETER:SelQuery},{});
			}
		},
		getRequestinfoDetails : function(MemberId,ViewedId,callback){
			var selectFields ="MatriId,PartnerId,EatingHabitsReqComStatus,EatingHabitsReqComFullfilment,DrinkingHabitsReqComStatus,DrinkingHabitsReqComFullfilment,SmokingHabitsReqComStatus,SmokingHabitsReqComFullfilment,GothramReqComStatus,GothramReqComFullfilment,StarReqComStatus,StarReqComFullfilment,RasiReqComStatus,RasiReqComFullfilment,CollegeInstitutionReqComStatus,CollegeInstitutionReqComFullfilment,EducationReqComStatus,EducationReqComFullfilment,OccupationReqComStatus,OccupationReqComFullfilment,AnnualIncomeReqComStatus,AnnualIncomeReqComFullfilment,AncestralOriginReqComStatus,AncestralOriginReqComFullfilment,AboutMyFamilyReqComStatus,AboutMyFamilyReqComFullfilment,HobbiesReqComStatus,HobbiesReqComFullfilment,InterestsReqComStatus,InterestsReqComFullfilment,DateUpdated";
			//appcomWhr="MatriId=? and PartnerId=?";			
			var dbName = DBNAME['MATRIMONY'];
			var SphinxviewId = bmgeneric.covertToSphinxId(ViewedId);			
			var SphinxloginId = bmgeneric.covertToSphinxId(MemberId);
			var whereClause = "MatriId=? and PartnerId=?";
			var whereValueArr = [parseInt(SphinxloginId),parseInt(SphinxviewId)];
			var max_matches = 'max_matches=10';	
			var querycmt = "get Request info Details - View Profile Index";	
			bmCommonFunc.bmfuncTableNames(MemberId, '', function(tableDet){					
				var tableName = tableDet['SENDERREQUESTNOTESINFO'];
				bmCommonFunc.bmfuncGetComNotesStatsInfo(MemberId,ViewedId,dbName,tableName,selectFields,whereClause,whereValueArr,max_matches,querycmt,1,function(err,resultd){
					callback(err,resultd);
				});								
			});	
		},
		checkinfoRequestedorNot : function(ViewId,RequestinfoDetails,requestInfoArr,callback){
			var requestArray = {"EATINGHABITSREQUEST" : ["eatinghabitsreqcomstatus","eatinghabitsreqcomfullfilment","1","RIEH"],"DRINKINGHABITSREQUEST" : ["drinkinghabitsreqcomstatus","drinkinghabitsreqcomfullfilment","2","RIDH"],"SMOKINGHABITSREQUEST" : ["smokinghabitsreqcomstatus","smokinghabitsreqcomfullfilment","3","RISH"],"GOTHRAREQUEST" : ["gothramreqcomstatus","gothramreqcomfullfilment","4","RIGOT"],"STARRAASIREQUEST" : ["starreqcomstatus","starreqcomfullfilment","5","RISTRAS"],"EDUCATIONDETAILREQUEST" : ["educationreqcomstatus","educationreqcomfullfilment","7","RIEDU"],"OCCUPATIONDETAILREQUEST" : ["occupationreqcomstatus","occupationreqcomfullfilment","8","RIOCC"],"ANNUALINCOMEREQUEST" : ["annualincomereqcomstatus","annualincomereqcomfullfilment","9","RIAINC"],"ANCESTRALORIGINREQUEST" : ["ancestraloriginreqcomstatus","ancestraloriginreqcomfullfilment","10","RIANORG"],"ABOUTFAMILYREQUEST" : ["aboutmyfamilyreqcomstatus","aboutmyfamilyreqcomfullfilment","11","RIABFAM"],"" : ["familydetailsreqcomstatus","familydetailsreqcomfullfilment","12","RIFAMDET"],"" : ["hobbiesreqcomstatus","hobbiesreqcomfullfilment","13","RIHOBB"]};
			//console.log("RequestinfoDetails==========:",RequestinfoDetails)
			async.each(Object.keys(requestInfoArr),function(key, cb){
				if(bmgeneric.array_key_exists(key,requestArray)){
					if(!bmgeneric.empty(RequestinfoDetails)){
						if(RequestinfoDetails[ViewId][requestArray[key][0]] == 1){
							requestInfoArr[key] = 1;
						}
					}
				}
				cb(null);
			},function(err){
				callback(null,requestInfoArr);
			});	
		}		
	}
			
	module.exports = ViewProfile;