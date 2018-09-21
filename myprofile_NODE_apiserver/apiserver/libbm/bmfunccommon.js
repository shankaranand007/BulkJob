/**********************************************************************************************
 *	Filename	: bmfunccommon.js							
 *	Author		: Sathrak paldurai K
 *	Date		: 28-09-2016								
 *	Description	: Viewed member details display.
***********************************************************************************************/		
	//Function to return the table details
	async function bmfuncTableNames(senderId,partnerId,next){
		try{
			var tableArrays = {};
			if(!bmgeneric.empty(senderId)){
				var senderDomainInfor = await bmgeneric.getDomainInfo(1,senderId);//Sender domain info			
				var senderLanguage = await bmgeneric.allucwords(senderDomainInfor["domainnameshort"]);//Ex:TAMIL			
				var senderSplitTabVal = await bmgeneric.getSplitVal(senderId);//Sender Split up table value
				
				tableArrays['SENDERCOMINFO'] = DOMAINTABLE[senderLanguage]['COMINFO']+senderSplitTabVal;//Ex:TAMILCOMINFO12
				tableArrays['SENDERNOTESINFO'] = DOMAINTABLE[senderLanguage]['NOTESINFO']+senderSplitTabVal;//Ex:TAMILNOTESINFO12
				tableArrays['SENDERSTATSINFO'] = DOMAINTABLE[senderLanguage]['STATSINFO'];//Ex:TAMILSTATSINFO
				tableArrays['SENDERREQUESTNOTESINFO'] = DOMAINTABLE[senderLanguage]['REQUESTNOTESINFO']+senderSplitTabVal;//Ex:TAMILNOTESINFO12
			}			
			if(!bmgeneric.empty(partnerId)){
				var receiverDomafor = await bmgeneric.getDomainInfo(1,partnerId);//Receiver domain info
				var receiverLanfuage = await bmgeneric.allucwords(receiverDomafor["domainnameshort"]);//Ex:TELUGU
				var receiverSplitTabVal = await bmgeneric.getSplitVal(partnerId);//Receiver split up table value	

				tableArrays['RECEIVERCOMINFO'] = DOMAINTABLE[receiverLanfuage]['COMINFO']+receiverSplitTabVal;//Ex:TELUGUCOMINFO13
				tableArrays['RECEIVERNOTESINFO'] = DOMAINTABLE[receiverLanfuage]['NOTESINFO']+receiverSplitTabVal;//Ex:TELUGUNOTESINFO13
				tableArrays['RECEIVERSTATSINFO'] = DOMAINTABLE[receiverLanfuage]['STATSINFO'];//Ex:TELUGUSTATSINFO
				tableArrays['RECEIVERREQUESTNOTESINFO'] = DOMAINTABLE[receiverLanfuage]['REQUESTNOTESINFO']+receiverSplitTabVal;//Ex:TELUGUNOTESINFO13
			}			
			return next(tableArrays);
		}catch(err){
			console.log("File and Function Name - bmfunccommon -  bmfuncTableNames - Error :",err);
			return next(err,{})
		}	
	}	
	
	//Function to return the table details
	async function bmfuncSphinxIndexNames(senderId,partnerId,next)
	{		
		var tableArrays = {};
		var senderSplitTabVal = receiverSplitTabVal = '';
		if(!bmgeneric.empty(senderId)){
			var senderDomainInfor = await bmgeneric.getDomainInfo(1,senderId);//Sender domain info
			var senderLanguage= await bmgeneric.allucwords(senderDomainInfor["domainnameshort"]);//Ex:TAMIL
			var senderSplitTabVal = await bmgeneric.getSplitVal(senderId);//Sender Split up table value

			tableArrays['SENDERCOMINFOINDEX']	   = APPSPHINXINDEXNAME[senderLanguage]['COMINFOINDEX']+senderSplitTabVal;//Ex:TAMILCOMINFOINDEX12
			tableArrays['SENDERCOMINFODELTA']	   = APPSPHINXINDEXNAME[senderLanguage]['COMINFODELTA']+senderSplitTabVal;//Ex:TAMILCOMINFODELTA			
			tableArrays['SENDERNOTESINFOINDEX']   = APPSPHINXINDEXNAME[senderLanguage]['NOTESINFOINDEX']+senderSplitTabVal;//Ex:TAMILNOTESINFOINDEX12
			tableArrays['SENDERNOTESINFODELTA']   = APPSPHINXINDEXNAME[senderLanguage]['NOTESINFODELTA']+senderSplitTabVal;//Ex:TAMILNOTESINFODELTA1		
			tableArrays['SENDERREQUESTNOTESINFOINDEX']   = APPSPHINXINDEXNAME[senderLanguage]['REQUESTNOTESINFOINDEX']+senderSplitTabVal;//Ex:TAMILREQUESTNOTESINFOINDEX
			tableArrays['SENDERREQUESTNOTESINFODELTA']   = APPSPHINXINDEXNAME[senderLanguage]['REQUESTNOTESINFODELTA']+senderSplitTabVal;//Ex:TAMILREQUESTNOTESINFODELTA
		}		

		if(!bmgeneric.empty(partnerId)){
			var receiverDomafor = await bmgeneric.getDomainInfo(1,partnerId);//Receiver domain info
			var receiverLanfuage = await bmgeneric.allucwords(receiverDomafor["domainnameshort"]);//Ex:TELUGU
			var receiverSplitTabVal = await bmgeneric.getSplitVal(partnerId);//Receiver split up table value

			tableArrays['RECEIVERCOMINFOINDEX']   = APPSPHINXINDEXNAME[receiverLanfuage]['COMINFOINDEX']+receiverSplitTabVal;//Ex:TAMILCOMINFOINDEX12
			tableArrays['RECEIVERCOMINFODELTA']   = APPSPHINXINDEXNAME[receiverLanfuage]['COMINFODELTA']+receiverSplitTabVal;//Ex:TAMILCOMINFODELTA12			
			tableArrays['RECEIVERNOTESINFOINDEX'] = APPSPHINXINDEXNAME[receiverLanfuage]['NOTESINFOINDEX']+receiverSplitTabVal;//Ex:TAMILNOTESINFODELTA12
			tableArrays['RECEIVERNOTESINFODELTA'] = APPSPHINXINDEXNAME[receiverLanfuage]['NOTESINFODELTA']+receiverSplitTabVal;//Ex:TAMILNOTESINFODELTA12			
			tableArrays['RECEIVERREQUESTNOTESINFOINDEX'] = APPSPHINXINDEXNAME[receiverLanfuage]['REQUESTNOTESINFOINDEX']+receiverSplitTabVal;//Ex:TAMILNOTESINFODELTA12
			tableArrays['RECEIVERREQUESTNOTESINFODELTA'] = APPSPHINXINDEXNAME[receiverLanfuage]['REQUESTNOTESINFODELTA']+receiverSplitTabVal;//Ex:TAMILNOTESINFODELTA12
		}
		return next(tableArrays);
	}
	
	exports.ViewedMyProfStatsInst = function(req,res){
		var partDomainList = bmgeneric.getDomainInfo(1, req.VIEWEDID);
		var vieweddomainindex = bmgeneric.strtoupper(partDomainList['domainnameshort']);
		var insertDataStats = {"MatriId": req.ID, "ViewedId": req.VIEWEDID, "ProfileStatus": 1, "DateViewed":bmgeneric.getDate('yyyy-mm-dd HH:MM:ss')}; 
		var getMVMPIP = bmdbfunc.getDBMVMPDomainInfo(req.VIEWEDID);
		var dbhost = {"DBHOST" : getMVMPIP,"DBHOSTType" : 1};
		var table_name = DOMAINTABLE[vieweddomainindex]['VIEWEDMYPROFILESTATS'];		
		bmMergeMSdb.bmDbInsert(dbhost, DBNAME['MATRIMONY'], table_name, insertDataStats, 3,['MatriId', 'ViewedId'], function(err,insStmtStats){
			if(err)console.error("ViewedMyProfStatsInst Function - Table :"+table_name+" at Err:",err.code);
			return res(null,"OK");
		});	
	}
	
	
	exports.InAppNotifQueFunc = function(insertdata,Domainnameshrt,res){
		if(Domainnameshrt != ""){	
			var table_name = DOMAINTABLE[bmgeneric.strtoupper(Domainnameshrt)]['INAPPINTERMEDIATE'];
			var dbhost = {"DBHOST" : "DB7","DBHOSTType" : 1};
			bmDb.bmDbInsert(dbhost,DBNAME['INAPPINTERMEDIATE'],table_name,insertdata,1,[], function(err,insStmtStats){
				if(err)console.error("InAppNotifQueFunc Function - Err :",err);
				//console.error("InAppNotifQueFunc Function - Err :",insStmtStats);
				return res(err,insStmtStats);
			});	
			
		} 		
	}
	
	exports.bmfuncGetComNotesStatsInfo = function(MemberId,ViewedId,dbName,tableName,selectFields,whereClause,whereClauseVal,max_matches,querycmt,rtSelectFlag,callback){
		try{
			if(rtSelectFlag == 1){
				bmCommonFunc.bmfuncSphinxIndexNames(MemberId,'',function(IndexName){
					if(bmgeneric.substr_count(tableName, 'cominfo') > 0){
						cominfotable = 1;
						sphinxFetchIndex = IndexName['SENDERCOMINFOINDEX']+','+IndexName['SENDERCOMINFODELTA'];
					} else if(bmgeneric.substr_count(tableName, 'requestnotesinfo') > 0){							
						sphinxFetchIndex = IndexName['SENDERREQUESTNOTESINFOINDEX']+','+IndexName['SENDERREQUESTNOTESINFODELTA'];
						requestnotesinfotable = 1;	
					}else if(bmgeneric.substr_count(tableName, 'notesinfo') > 0) {
						sphinxFetchIndex = IndexName['SENDERNOTESINFOINDEX']+','+IndexName['SENDERNOTESINFODELTA'];	
						notesinfotable = 1;	
					}
					
					//#get domain info
					var appLoginIdDomain = bmgeneric.getDomainInfo(1,MemberId);
					var appLoginIdDomainId = appLoginIdDomain['domainid'];						
					var hostName = bmSphinxDb.getSphinxDomainInfo(appLoginIdDomainId);
					var SelQuery = {HOST:hostName,INDEXNAME:sphinxFetchIndex,SELECTFIELDS:selectFields,WHERECLAUSEVAL:whereClause,MAXMATCHES:max_matches,QRYCMNT:querycmt};					
					if(whereClause != '' && selectFields != '' && sphinxFetchIndex != ''){
						bmSphinxDb.bmDbSelect(3, hostName, sphinxFetchIndex, selectFields, whereClause, whereClauseVal,max_matches, querycmt, 1, function(err,notesdata){
							var viewprofileOutput = {};	
							if(!err){
								if(notesdata.length > 0){	
									viewprofileOutput[ViewedId] = notesdata[0];
									callback(null,viewprofileOutput);
								}else {
									callback(null,viewprofileOutput);
								}
							} else {
								callback(null,viewprofileOutput);
							}
						});
					} else {
						var viewprofileOutput = {};						
						console.log("SELECT_QRY_WHERE-CLAUSE-ERR__DB-TBL-ERR__SELECT-FIELD-NOTARRAY");
						callback({Error:"SELECT_QRY_WHERE-CLAUSE-ERR__DB-TBL-ERR__SELECT-FIELD-NOTARRAY",viewprofileOutput},{});
					}
				});					
			} else {
				var QueryObject = { QRYCMNT:qrycmt, DBNAME:dbName,TABLENAME:tableName,SELECTFIELDS:selectFields,WHERECLAUSE:whereClause,WHERECLAUSEVAL:whereClauseVal};
				var dbHost = bmDb.bmDbConnById(2, MemberId, 'S');
				if(whereClause != '' && selectFields != '' && dbName != ''){				
					bmDb.bmDbSelect(dbHost,dbName,tableName,selectFields,whereClause,whereClauseVal,qrycmt, function(err,notesdata){
						if(notesdata.length > 0){													
							callback(null,notesdata);
						} else {							
							var notesdata = '';
							callback(null,notesdata);
						}
					})
				} else {
					console.error("SELECT_QRY_WHERE-CLAUSE-ERR__DB-TBL-ERR__SELECT-FIELD-NOTARRAY");
					callback({Error:"SELECT_QRY_WHERE-CLAUSE-ERR__DB-TBL-ERR__SELECT-FIELD-NOTARRAY",PARAMETER:SelQuery},{});
				}
			}				
		}catch(err){
			console.error("Error On: File Name - onlinemodel.js:",err);
			callback({Error:"SELECT_QRY_WHERE-CLAUSE-ERR__DB-TBL-ERR__SELECT-FIELD-NOTARRAY",PARAMETER:SelQuery},{});
		}
	}
	
		//#Function to skip photo password
	exports.skipPhotoPassword = function(skipcontact='',skipPhotoResult={}){
		/* SkipPrivPwdReceived
		0 - Default
		1 - Photo allow
		2 - Horoscope allow
		3 - Both allow
		4 - Photo blocked
		5 - Horoscope blocked
		6 - Photo allow but Horoscope blocked
		7 - Horoscope allow but Photo blocked
		8 - Both blocked
		*/
		
		if(skipcontact==1){
			if(bmgeneric.chkContedRespPry(skipPhotoResult)==0){
				return true;
			} else {
				return false;
			}
		} else if(skipcontact==2){//Horoscope Check
			if(skipPhotoResult['skipprivpwdreceived']==2 || skipPhotoResult['skipprivpwdreceived']==3 || skipPhotoResult['skipprivpwdreceived']==7){
				return true;
			} else {
				return false;
			}
		} else {
			if(skipPhotoResult['skipprivpwdreceived']==1 || skipPhotoResult['skipprivpwdreceived']==3 || skipPhotoResult['skipprivpwdreceived']==6){
				return true;
			} else {
				return false;
			}
		}
	}
		
	exports.getPhotoDetails = function(matriId,data,type,flag=0,time_created,partDminList,cbmain){
		try{
			if(type==2){ //For View Profile
				PhotoFields = "MatriId,PhotoUrl1,PhotoStatus1,ThumbImg1,PhotoStatus2,ThumbImg2,PhotoStatus3,ThumbImg3,PhotoStatus4,ThumbImg4,PhotoStatus5,ThumbImg5,PhotoStatus6,ThumbImg6,PhotoStatus7,ThumbImg7,PhotoStatus8,ThumbImg8,PhotoStatus9,ThumbImg9,PhotoStatus10,ThumbImg10,HoroscopeURL,MorePhotoAvailable,WebpStatus"; //Fetching WebpStatus field for displaying webp image in edit profile page.
			} else { //For Search and member statistics
				if (data.APPTYPE >=100) //Fetching WebpStatus field for displaying webp image in shortlisted page,who viewed my profile,mailbox page,who shortlisted me page, Search results page, mobile notification page
				{
					PhotoFields	= "MatriId,PhotoUrl1,PhotoStatus1,ThumbImg1 as 'ThumbImgs1',ThumbImg2 as 'ThumbImgs2',ThumbImg3 as 'ThumbImgs3',ThumbImg4 as 'ThumbImgs4',ThumbImg5 as 'ThumbImgs5',ThumbImg6 as 'ThumbImgs6',ThumbImg7 as 'ThumbImgs7',ThumbImg8 as 'ThumbImgs8',ThumbImg9 as 'ThumbImgs9',ThumbImg10 as 'ThumbImgs10',PhotoStatus2,PhotoStatus3,PhotoStatus4,PhotoStatus5,PhotoStatus6,PhotoStatus7,PhotoStatus8,PhotoStatus9,PhotoStatus10,HoroscopeURL,MorePhotoAvailable,WebpStatus";
				} else {
					PhotoFields	= "MatriId,PhotoStatus1,ThumbImgs1,ThumbImgs2,ThumbImgs3,ThumbImgs4,ThumbImgs5,ThumbImgs6,ThumbImgs7,ThumbImgs8,ThumbImgs9,ThumbImgs10,PhotoStatus2,PhotoStatus3,PhotoStatus4,PhotoStatus5,PhotoStatus6,PhotoStatus7,PhotoStatus8,PhotoStatus9,PhotoStatus10,HoroscopeURL,MorePhotoAvailable,WebpStatus";
				}
			}	
			
			async.parallel({
				photoResult:function(callback){
					var qrycmt = "# Select Photo Info - DB#"
					var whereClause = " MatriId=? ";	
					var whereClauseVal = [matriId];					
					var dbHost = bmDb.bmDbConnById(2, matriId, 'S');
					bmDb.bmDbSelect(dbHost,DBNAME['MATRIMONYMS'], MERGETABLE['PHOTOINFO'], PhotoFields, whereClause, whereClauseVal, qrycmt, function(err,photoDetails){
						var viewprofileOutput = {};	
						if(!err){
							if(photoDetails.length > 0){								
								viewprofileOutput = photoDetails[0];
								if(photoDetails[0]['MorePhotoAvailable'] == 1){
									var morePhotoFields	= "MatriId,PhotoStatus11,ThumbImg11,PhotoStatus12,ThumbImg12,PhotoStatus13,ThumbImg13,PhotoStatus14,ThumbImg14,PhotoStatus15,ThumbImg15,PhotoStatus16,ThumbImg16,PhotoStatus17,ThumbImg17,PhotoStatus18,ThumbImg18,PhotoStatus19,ThumbImg19,PhotoStatus20,ThumbImg20,PhotoStatus21,ThumbImg21,PhotoStatus22,ThumbImg22,PhotoStatus23,ThumbImg23,PhotoStatus24,ThumbImg24,PhotoStatus25,ThumbImg25,PhotoStatus26,ThumbImg26,PhotoStatus27,ThumbImg27,PhotoStatus28,ThumbImg28,PhotoStatus29,ThumbImg29,PhotoStatus30,ThumbImg30,ThumbImg31,PhotoStatus32,ThumbImg32,PhotoStatus33,ThumbImg33,PhotoStatus34,ThumbImg34,PhotoStatus35,ThumbImg35,PhotoStatus36,ThumbImg36,PhotoStatus37,ThumbImg37,PhotoStatus38,ThumbImg38,PhotoStatus39,ThumbImg39,PhotoStatus40,ThumbImg40";
									var qrycmt = "# Select Photo Info - DB#"
									var whereClause = " MatriId=? ";	
									var whereClauseVal = [matriId];
									var dbHost = bmDb.bmDbConnById(2, matriId, 'S');
									bmDb.bmDbSelect(dbHost, DBNAME['MATRIMONYMS'], MERGETABLE['PHOTOINFO2'], morePhotoFields, whereClause, whereClauseVal, qrycmt, function(err,PhotoResult){
										if(!err){												
											if(PhotoResult.length==1){
												viewprofileOutput = Object.assign(photoDetails[0], PhotoResult[0]);
											}
											callback(null,viewprofileOutput);
										}else{
											callback(err,viewprofileOutput);
										} 
									});
								} else{
									callback(null,viewprofileOutput);
								}
							} else {
								callback(null,viewprofileOutput);
							}
						} else {
							callback(err,viewprofileOutput);
						}
					});
				},
				photoPath:function(callback){
					var photoPath = {};
					if(time_created==''){ 
						var qrycmt = "# MATRIMONYMS - Select Matrimony Profile - DB#"
						var whereClause = " MatriId=? ";	
						var whereClauseVal = [matriId];
						var dbHost = bmDb.bmDbConnById(2, matriId, 'S');
						bmDb.bmDbSelect(dbHost, DBNAME['MATRIMONYMS'], MERGETABLE['MATRIMONYPROFILE'], "MatriId,TimeCreated", whereClause, whereClauseVal, qrycmt, function(err,memberData){
							if(!err){
								if(memberData.length > 0){
									//TimeCreated: 2017-03-13 10:10:00
									var timeCreated = memberData[0]['TimeCreated'];
									photoPath = bmgeneric.getUserImagePath(matriId,strtotime(timeCreated));
								} 
							} 	
							callback(null,photoPath);
						});
					} else{
						photoPath = bmgeneric.getUserImagePath(matriId,time_created);
						callback(null,photoPath);
					}
				}
			},function(error,results){
				//console.log("===getPhotoDetails===========:",results)
				var output = {};
				if(!error){
					if(!bmgeneric.empty(results.photoResult)){
						var photoVal = results.photoResult;
						var photoCount	= 0;						
						if(bmgeneric.empty(results.photoPath)) {
							photoPath =  global.SECUREURL+partDminList['domainnameimgs']+"/photos/"+bmgeneric.substr(photoVal['MatriId'],1,1)+"/"+bmgeneric.substr(photoVal['MatriId'],2,1)+"/";
						} else {
							photoPath = results.photoPath;
						}
						
						async function getPhotoPath(){
							var ThumbImg = {};
							for(var i=1; i<=40; i++){
								if(photoVal['PhotoStatus'+i]==0 || photoVal['PhotoStatus'+i]==2){
									//console.log(i,"========photoPath========:",photoVal);
									if(type==2){
										if(bmgeneric.strstr(photoVal['ThumbImg'+i],'gif') && data.APPTYPE == 107){
											photoPath = global.SECUREURL+'appsadmin:A7jgPjuK@apps.bharatmatrimony.com/appphoto/getimage.php?image='+photoPath;
										}
										if(photoVal['ThumbImg'+i] != ''){
										// Here we will be displaying the 150x150 webp image for both APP and WAP  in editprofile page.
											if(((bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE)) && data.DOS > 18 && bmvars.APPWEBPIMGFLAG == 1 && photoVal['WebpStatus'] == 1) || (data.APPTYPE == 115  && data.WEBPFLAG == 1 && bmvars.WAPWEBPIMGFLAG == 1 && photoVal['WebpStatus'] == 1))
											{
												ThumbImg[photoCount] = photoPath+bmgeneric.pathinfo(photoVal['ThumbImg'+i], 'PATHINFO_FILENAME')+'.webp';
												
											} else {
												ThumbImg[photoCount] = photoPath+photoVal['ThumbImg'+i];
											}
											photoCount++;
										}
										return ThumbImg;
									}
								}
							}
						};
						
						getPhotoPath()  
						.then(function(ThumbImge) {									
							output['ThumbImgs'] = ThumbImge;
							if(type==2){
								if(((bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE)) && data.DOS > 18 && bmvars.APPWEBPIMGFLAG == 1 && photoVal['WebpStatus'] == 1) || (data.APPTYPE == 115  && data.WEBPFLAG == 1 && bmvars.WAPWEBPIMGFLAG == 1 && photoVal['WebpStatus'] == 1)) // Here we will be displaying the original uploaded webp image for both APP and WAP in editprofile page.
								{
									output['PHOTOURL'] = photoPath+bmgeneric.pathinfo(photoVal['PhotoUrl1'], 'PATHINFO_FILENAME')+'.webp';
								}
								else {
									output['PHOTOURL'] = photoPath+photoVal['PhotoUrl1'];
								}
								output['PHOTOCOUNT'] = photoCount;
							}
						})
						.then(v => {
							if(type==1){ 
								photoKey = bmgeneric.ucwords(photoVal['MatriId']);
								if(bmgeneric.strstr(photoVal['ThumbImgs1'],'gif') && data.APPTYPE =='107'){
									photoPath = global.SECUREURL+'appsadmin:A7jgPjuK@apps.bharatmatrimony.com/appphoto/getimage.php?image='+photoPath;
								}
								// Here we will be displaying the original 75x75 webp image for both APP and WAP for rest of the pages except editprofile page.									
								if(((bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE)) && data.DOS > 18 && bmvars.APPWEBPIMGFLAG == 1 && photoVal['WebpStatus'] == 1) || (data.APPTYPE == 115  && data.WEBPFLAG == 1 && bmvars.WAPWEBPIMGFLAG == 1 && photoVal['WebpStatus'] == 1)) 
								{
									output['ThumbImgs1'] = "";
									for(i=1;i<=10;i++){
										if(photoVal['ThumbImgs'+i]!=''){
											output['ThumbImgs1'] = photoPath+pathinfo(photoVal['ThumbImgs'+i], 'PATHINFO_FILENAME')+'.webp';
											break;
										}
									}
								} else {
									output['ThumbImgs1'] = "";
									for(var i=1;i<=10;i++){
										if(photoVal['ThumbImgs'+i]!=''){
											output['ThumbImgs1'] = photoPath+photoVal['ThumbImgs'.i];
											break;
										}
									}
								}

								if(flag == 1){ // Only for memstats for sphinxrt update
									output['ImageName'] = photoVal['ThumbImgs1'];
								}
								output['photoCount']		= photoCount;
								output['HoroscopeURL']		= photoVal['HoroscopeURL'];
								if((bmgeneric.in_array(data.APPTYPE,bmvars.IOSAPPTYPE))){
									output['PhotoUrl']		= photoPath+photoVal['PhotoUrl1'];
								}
								if(((bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE))) || ((bmgeneric.in_array(data.APPTYPE,bmvars.IOSAPPTYPE))))
									output['PhotoStatus']	= photoVal['PhotoStatus1'];
							}
							//console.log("output 111:",output);
							cbmain(null,output);
						})
						.catch(err => {
							console.error("getPhotoDetails:",err);
							cbmain(err,output);
						})
					} else{cbmain(null,output);}
				} else {
					console.error("=============getPhotoDetails=Error===========",error)
					return cbmain(error,output);
				}
			});
		}catch(err){
			console.error("=============getPhotoDetails=err===========",err)
			return cbmain(err,output);
		}
	}
	
	exports.bmfuncescapeexec = function(FileName,postParam,next){
		var AppURL = "https://"+bminit.APPUSER+":"+bminit.APPPWD+"@"+bminit.APPSURL+FileName;
		var header = {'content-type' : 'application/x-www-form-urlencoded'};
		request.post({headers:header,url:AppURL,body:postParam}, function(err,httpResponse,JsonOutput){
			//console.log("JsonOutput ==========:",JsonOutput)
		});
		return next(null,true);
	}
	
	exports.bmfuncSphinxIndexNames = bmfuncSphinxIndexNames;
	exports.bmfuncTableNames = bmfuncTableNames;