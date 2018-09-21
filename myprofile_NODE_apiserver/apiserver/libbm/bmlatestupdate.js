/**********************************************************************************************
 *	Filename	: bmlatestupdate.js							
 *	Author		: Sathrak paldurai K
 *	Date		: 06 Nov 2017							
 *	Description	: Api file for latest upadtes data to insert into index
***********************************************************************************************/
	var latestupdate = {
		setmsg : function(data,callback){
			var updateField = ["SenderName","Message","Age","TimeCreated","Height"];
			var InsertField ={};
			InsertField["SenderId"] = parseInt(data.SenderId);
			InsertField["ReceiverId"] = parseInt(data.ReceiverId);
			var SenderId	= data.SenderId;
			var ReceiverId	= data.ReceiverId;
			var Age			= data.Age;
			var Height		= data.Height;		
			var mSenderId = bmgeneric.converToMatriId(SenderId);
			var mReceiverId = bmgeneric.converToMatriId(ReceiverId);
			var moduval = bmgeneric.getSplitVal(mReceiverId);
			if((data.SenderName!='' && data.SenderName!=null)){
				InsertField["SenderName"] = bmgeneric.trim(data.SenderName);
			}			
			if(data.Message!='' && data.Message!=null){
				InsertField["Message"] = data.Message.replace(/<\/?[^>]+(>|$)/g, " ");
			}		
			InsertField["ComType"] = parseInt(data.ComType);			
		
			if(data.TimeCreated!='')
				var TimeCreated_field ='FROM_UNIXTIME('+data.TimeCreated+', "%Y-%m-%d %H:%i:%s")';
			else {
				var TimeCreated_field ='0000-00-00 00:00:00';
				TimeCreated = 0;
			}			

			if(data.DateUpdated!='')
				var DateUpdated_field ='FROM_UNIXTIME('+data.DateUpdated+', "%Y-%m-%d %H:%i:%s")';
			else {
				var DateUpdated_field ='0000-00-00 00:00:00';
				DateUpdated = 0;
			}			
			InsertField["DateUpdated"] = TimeCreated_field;
			InsertField["TimeCreated"] = DateUpdated_field;
			
			if(data.PhotoName!='' && data.PhotoName!=null){
				InsertField["PhotoName"] = data.PhotoName;				
			} else{updateField.push("PhotoName");}					
			if(Age=='' || Age==null){Age='0';}
			InsertField["Age"] = parseInt(Age);
			if(Height=='' || Height==null){Height='0';}
			InsertField["Height"] = parseInt(Height);
		
			var insertid = 0;
			var dbconf = {DBHOST:'MYHOME_LU_SERVER',HOSTTYPE:2};
			var tableName = 'latestupdates'+moduval;
			bmMergeMSdb.bmDbInsert(dbconf, DBNAME['MATRIMONY'], tableName, InsertField, 3, updateField, function(err,insertAffected){	
				if(!err){
					var affectedRows = 1;
					if(data.ComType==151)
						affectedRows = insertAffected.affectedRows;	
					if(affectedRows==1){	
						insertid = insertAffected.insertId;
						InsertField["id"] = insertid;
						updateField.push("id");
						var deltaName = 'latestupdatesdelta'+moduval;
						for(var i = 0; i < global.APPSPHINXDBCONIPARR['SphinxMHLU_IPS'].length;i++){
							var dbconf = {DBHOST:'SphinxMHLU_IPS'+i,HOSTTYPE:2};				
							bmSphinxRtDb.bmDbInsert(dbconf,deltaName,InsertField,4,1,{}, function(err,deltaAft){
								if(err){
									console.error("File Line 73 at bmlatestupdate Error :",err)
								}
							});
						}
					}
				} else {
					console.error("File Line 79 at bmlatestupdate Error :",err.sqlMessage)
				}
			}); 
			callback(null,{})
		}
	}
	
	module.exports = latestupdate;
	