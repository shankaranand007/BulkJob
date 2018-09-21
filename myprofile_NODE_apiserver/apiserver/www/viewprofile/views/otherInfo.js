/**********************************************************************************************
 *	Filename	: photoinfo.js							
 *	Author		: Sathrak paldurai K
 *	Date		: 28-09-2016								
 *	Description	: Viewed member details display.
***********************************************************************************************/
	var otherinfo = {
		getotherInfo:function(data,partnerInfo,onlinestatusRT,LastComRes,callback){
			try{
				otherInfoArr = {};
				viewerMatriId = partnerInfo['profileindex'];
				if(bmgeneric.empty(onlinestatusRT) || onlinestatusRT === ""){
					statusfromRT =0;
				} else {
					statusfromRT = onlinestatusRT[0]['powerpackstatus'];
					partnerInfo['last_login'] = onlinestatusRT[0]['loggedinat'];
				}
				
				partnerInfo['powerpackstatus'] = statusfromRT;				
				phoneverified = (partnerInfo['phoneverified'] == 1 || partnerInfo['phoneverified'] == 3) ? "Y" : "N";
				
				otherInfoArr['PHONEVERIFIED'] = phoneverified;
				otherInfoArr['PHONEHIDDEN'] = partnerInfo['phoneprotected'];
			
				if(!bmgeneric.empty(partnerInfo['priencryptmobileno']))
					otherInfoArr['PHONENO'] = partnerInfo['priencryptmobileno'];
			 
				if ((data.APPTYPE != 115 && data.APPTYPE != 250 && !bmgeneric.in_array(data.APPTYPE, bmvars.MobileAppType) ) && (otherInfoArr['PHONEHIDDEN'] == 'C' || otherInfoArr['PHONEHIDDEN'] == 'R')) {
					otherInfoArr['PHONEHIDDEN'] = 'Y';
				}
				otherInfoArr['ONLINESTATUS'] = (partnerInfo['powerpackstatus'] > 0 && partnerInfo['powerpackstatus'] != 4 && partnerInfo['powerpackstatus'] != 8) ? "Y" : "N";
			
				if (data.SPHINXENABLE== 1) {
					if (partnerInfo['last_login'] == 0) {
						var lastlogin = "0000-00-00 00:00:00";
					} else {
						var lastlogin = dateFormat(new Date(partnerInfo['last_login'] * 1000),"yyyy-mm-dd HH:MM:ss");
					}				
					var timecreated = dateFormat(new Date(partnerInfo['time_created'] * 1000),"yyyy-mm-dd HH:MM:ss");	
				} else {					
					var lastlogin = dateFormat(partnerInfo['lastlogin'],"yyyy-mm-dd HH:MM:ss");
					var timecreated = dateFormat(partnerInfo['timecreated'],"yyyy-mm-dd HH:MM:ss");
				}			
				
				otherInfoArr['LASTLOGIN'] = otherinfo.getLastLoginTime(data.ID,data.VIEWEDID,lastlogin,timecreated,partnerInfo['powerpackstatus']);				
				if (data.APPTYPE == 115 ||  bmgeneric.in_array(data.APPTYPE, bmvars.MobileAppType)) {
					if ((partnerInfo['specialpriv'] == 2 || partnerInfo['specialpriv'] == 6) && partnerInfo['entrytype'] == 'R') { //classic premium
						otherInfoArr['HIGHLIGHTTYPE'] = 'CPM';
					} else if ((partnerInfo['specialpriv'] == 1) && partnerInfo['entrytype'] == 'R') { //classic advantage
						otherInfoArr['HIGHLIGHTTYPE'] = 'CA';
					} else if ((partnerInfo['specialpriv'] == 3 || partnerInfo['specialpriv'] == 4) && partnerInfo['entrytype'] == 'R') { //assisted matrimony
						otherInfoArr['HIGHLIGHTTYPE'] = 'AM';
					} else if (partnerInfo['specialpriv'] == 8 && partnerInfo['entrytype'] == 'R') { //Classic Advantage for till u marry advantage package
						otherInfoArr['HIGHLIGHTTYPE'] = 'CA';
					} else if ((partnerInfo['specialpriv'] == 7 || partnerInfo['specialpriv'] == 0) && partnerInfo['entrytype'] == 'R') { //Classic for till u marry package
						otherInfoArr['HIGHLIGHTTYPE'] = 'C';
					} else {
						otherInfoArr['HIGHLIGHTTYPE'] = '-';
					}
				} else {
					if (partnerInfo['specialpriv'] == 1 && partnerInfo['entrytype'] == 'R') {
						otherInfoArr['HIGHLIGHTTYPE'] = 'CP';
					} else if (partnerInfo['specialpriv'] > 1 && partnerInfo['entrytype'] == 'R') {
						otherInfoArr['HIGHLIGHTTYPE'] = 'CS';
					} else {
						otherInfoArr['HIGHLIGHTTYPE'] = '-';
					}
				}
			
				//console.log("LastComRes===========:",LastComRes)
				if(!bmgeneric.empty(LastComRes)){				
					for (var key in LastComRes) {
						var mid = key;	
						var ComRes = LastComRes[mid];
						var skipprivcy = LastComRes[mid];
						delete skipprivcy['transmsg'];
						delete skipprivcy['TransMsg']; 						   
						delete skipprivcy['skipprivpwdsent'];    
						delete skipprivcy['photoreqcomaccepted'];
						delete skipprivcy['photoreqcomfullfilment'];
						delete skipprivcy['horoscopereqcomstatus'];
						delete skipprivcy['horoscopereqcomaccepted'];
						delete skipprivcy['horoscopereqcomfullfilment'];
						delete skipprivcy['referencereqcomstatus'];
						delete skipprivcy['referencereqcomaccepted'];
						delete skipprivcy['referencereqcomfullfilment'];
						delete skipprivcy['photopwdreqcomstatus'];
						delete skipprivcy['photopwdreqcomaccepted'];
						delete skipprivcy['photopwdreqcomdeclined'];
						delete skipprivcy['horoscopepwdreqcomstatus'];
						delete skipprivcy['horoscopepwdreqcomaccepted'];
						delete skipprivcy['horoscopepwdreqcomdeclined'];
						delete skipprivcy['chatcomstatus'];
						delete skipprivcy['dateupdated'];
						delete skipprivcy['comunreadcount'];
						delete skipprivcy['comcount']; 
						delete skipprivcy['message'];
					
						otherInfoArr['PROFILESHORTLISTED'] = (ComRes["bookmarked"]==1 || ComRes["bookmarked"]==3)?"Y":"N"; //3-mutually shortlisted
						otherInfoArr['BLOCKEDBYPARTNERID'] = (ComRes["blocked"]==2 || ComRes["blocked"]==3)?"Y":"N";//blocked by opposite 1-Send,2-Receive 3-Both
						var comdates = "0000-00-00 00:00:00"
						if(ComRes["comdate"]){
							var cdate = new Date(ComRes["comdate"]*1000);
							comdates = dateFormat(cdate,"yyyy-mm-dd HH:MM:ss");
						}
						ComRes["comdate"] = comdates;
						
						otherInfoArr['BLOCKED'] = (ComRes["blocked"]==1 || ComRes["blocked"]==3)?"Y":"N";
						
						otherInfoArr['IGNORED'] = (ComRes["ignored"]==1)?"Y":"N";					
					
						/*changes for old app*/
						/*
						1=>This member has sent you a message    
						2=>You have replied to this member's message
						3=>You have declined this member's message
						4=>You have read the message but your reply is pending
						5=>This member is yet to read your message
						6=>This member has replied to your message
						7=>This member has declined your message
						8=>This member has read your message but the reply is pending
						9=>This member's reply to your interest is pending
						10=>This member has accepted your interest
						11=>This member has declined your interest
						12=>This member has sent you an interest
						13=>You have declined this member's interest
						14=>You have accepted this member's interest
						15=>You have requested this member for more info
						16=>You have requested this member for more time
						17=>This member has requested you for more info
						18=>This member has requested you for more time
						19=>You have requested this member for more info & time
						20=>This member has requested you for more info & time							
						*/
						switch(ComRes["comtype"])
						{							
							case 2://2 Message-Received
								if(ComRes["comstatus"]==1) //comstatus=1 
								{
									otherInfoArr['LASTCOMMUNICATION'] = 1;
								}
								else if(ComRes["comstatus"]==2)//2 Message-Received  & comstatus=2
								{
									otherInfoArr['LASTCOMMUNICATION'] = 4;
								}									
							break;
							case 4://4 - Message Replied-Received
								otherInfoArr['LASTCOMMUNICATION'] = 6;	
							break;	
							case 6://6 - Message Declined-Received 
								otherInfoArr['LASTCOMMUNICATION'] = 7;	
							break;
							case 1:// Message-Sent
								if(ComRes["comstatus"]==1)//1  Message-Sent   & comstatus=1
								{
									otherInfoArr['LASTCOMMUNICATION'] = 5;
								}
								else if(ComRes["comstatus"]==2)// Message-Sent  & comstatus=2
								{
									otherInfoArr['LASTCOMMUNICATION'] = 8;
								}
							break;
						
							case 3://3 - Message Replied-Sent
								otherInfoArr['LASTCOMMUNICATION'] = 2;
							break;
							case 5://5 - Message Declined-Sent
								otherInfoArr['LASTCOMMUNICATION'] = 3;
							break;
							case 11://11 - Int-Sent
								otherInfoArr['LASTCOMMUNICATION'] = 9;
							break;
							case 13: //13 - Int Accept-Sent
								otherInfoArr['LASTCOMMUNICATION'] = 14;
							break;
							case 15://15 - Int Decline-Sent
								otherInfoArr['LASTCOMMUNICATION'] = 13;
							break;
							case 12://12 - Int-Received
								otherInfoArr['LASTCOMMUNICATION'] = 12;
							break;
							case 16://16 - Int Decline-Received
								otherInfoArr['LASTCOMMUNICATION'] = 11;
							break;
							case 14://14 - Int Accept-Received
								otherInfoArr['LASTCOMMUNICATION'] = 10;
							break;
							case 19:
							case 17://(19 - Int NMI-Sent  || 17 - Int NMT-Sent)
								if(ComRes["interestcomneedmoretime"]==1 && ComRes["interestcomneedmoreinfo"]==1)
								{
									otherInfoArr['LASTCOMMUNICATION'] = 19;
								}
								else if(ComRes["comtype"]==19)//17 - Int NMT-Sent
								{
									otherInfoArr['LASTCOMMUNICATION'] = 15;
								}
								else if(ComRes["comtype"]==17)//19 - Int NMI-Sent
								{
									otherInfoArr['LASTCOMMUNICATION'] = 16;
								}
							break;
							case 18:
							case 20:									
								if(ComRes["interestcomneedmoretime"]==2 && ComRes["interestcomneedmoreinfo"]==2)
								{
									otherInfoArr['LASTCOMMUNICATION'] = 20;
								}
								else if(ComRes["comtype"]==18)//18 - Int NMT-Received
								{
									otherInfoArr['LASTCOMMUNICATION'] = 18;
								}
								else if(ComRes["comtype"]==20)//20 - Int NMI-Received
								{
									otherInfoArr['LASTCOMMUNICATION'] = 17;
								}
							break;
							default:
							//1-Sent , 2-Received
							if(ComRes["messagecomstatus"]==1)//Message-Sent
							{
							   if(ComRes["messagecomreplied"]==2 && ComRes["messagecomdeclined"]==0)
							   {
								  otherInfoArr['LASTCOMMUNICATION'] = 6;
							   }
							   else if(ComRes["messagecomreplied"]==0 && ComRes["messagecomdeclined"]==2)
							   {
								  otherInfoArr['LASTCOMMUNICATION'] = 7;
							   }
								else
							   {
								  otherInfoArr['LASTCOMMUNICATION'] = 5;
							   }
							}
							else if(ComRes["messagecomstatus"]==2)//Message-Receive
							{
							   if(ComRes["messagecomreplied"]==1 && ComRes["messagecomdeclined"]==0)
							   {
								  otherInfoArr['LASTCOMMUNICATION'] = 2;
							   }
							   else if(ComRes["messagecomreplied"]==0 && ComRes["messagecomdeclined"]==1)
							   {
								  otherInfoArr['LASTCOMMUNICATION'] = 3;
							   }
							   else
							   {
								  otherInfoArr['LASTCOMMUNICATION'] = 1;
							   }
							}
							else if(ComRes["interestcomstatus"]==1)//Interest-Sent
							{
							   if((ComRes["interestcomaccepted"]==2 || ComRes["interestcomacceptedbyphone"]==2 || ComRes["interestcomacceptedbysendmail"]==2) && ComRes["interestcomdeclined"]==0 && ComRes["interestcomneedmoretime"]==0 && ComRes["interestcomneedmoreinfo"]==0)
							   {//Interest-Accept-Received
								  otherInfoArr['LASTCOMMUNICATION'] = 10;
							   }
							   else if(ComRes["interestcomaccepted"]==0 && ComRes["interestcomdeclined"]==2 && ComRes["interestcomneedmoretime"]==0 && ComRes["interestcomneedmoreinfo"]==0)
							   {//Interest-Decline-Received
								  otherInfoArr['LASTCOMMUNICATION'] = 11;
							   }
							   else if(ComRes["interestcomaccepted"]==0 && ComRes["interestcomdeclined"]==0 && ComRes["interestcomneedmoretime"]==0 && ComRes["interestcomneedmoreinfo"]==2)
							   {//Interest-NMI-Received
								  otherInfoArr['LASTCOMMUNICATION'] = 17;
							   }
							   else if(ComRes["interestcomaccepted"]==0 && ComRes["interestcomdeclined"]==0 && ComRes["interestcomneedmoretime"]==2 && ComRes["interestcomneedmoreinfo"]==0)
							   {//Interest-NMT-Received
								  otherInfoArr['LASTCOMMUNICATION'] = 18;
							   }
							   else if(ComRes["interestcomaccepted"]==0 && ComRes["interestcomdeclined"]==0 && ComRes["interestcomneedmoretime"]==2 && ComRes["interestcomneedmoreinfo"]==2)
							   {//Interest-NMI & NMT-Received
								  otherInfoArr['LASTCOMMUNICATION'] = 20;
							   }
							   else
							   {//Interest-Sent
								  otherInfoArr['LASTCOMMUNICATION'] = 9;
							   }
							}
							else if(ComRes["interestcomstatus"]==2)//Interest-Receive
							{
							   if((ComRes["interestcomaccepted"]==1 || ComRes["interestcomacceptedbyphone"]==1 || ComRes["interestcomacceptedbysendmail"]==1) && ComRes["interestcomdeclined"]==0 && ComRes["interestcomneedmoretime"]==0 && ComRes["interestcomneedmoreinfo"]==0)
							   {//Interest-Accept-Sent
								  otherInfoArr['LASTCOMMUNICATION'] = 14;
							   }
							   else if(ComRes["interestcomaccepted"]==0 && ComRes["interestcomdeclined"]==1 && ComRes["interestcomneedmoretime"]==0 && ComRes["interestcomneedmoreinfo"]==0)
							   {//Interest-Decline-Sent
								  otherInfoArr['LASTCOMMUNICATION'] = 13;
							   }
							   else if(ComRes["interestcomaccepted"]==0 && ComRes["interestcomdeclined"]==0 && ComRes["interestcomneedmoretime"]==0 && ComRes["interestcomneedmoreinfo"]==1)
							   {//Interest-NMI-Sent
								  otherInfoArr['LASTCOMMUNICATION'] = 15;
							   }
							   else if(ComRes["interestcomaccepted"]==0 && ComRes["interestcomdeclined"]==0 && ComRes["interestcomneedmoretime"]==1 && ComRes["interestcomneedmoreinfo"]==0)
							   {//Interest-NMT-Sent
								  otherInfoArr['LASTCOMMUNICATION'] = 16;
							   }
							   else if(ComRes["interestcomaccepted"]==0 && ComRes["interestcomdeclined"]==0 && ComRes["interestcomneedmoretime"]==1 && ComRes["interestcomneedmoreinfo"]==1)
							   {//Interest-NMI & NMT-Sent
								  otherInfoArr['LASTCOMMUNICATION'] = 19;
							   }
							   else
							   {//Interest-Received
								  otherInfoArr['LASTCOMMUNICATION'] = 12;
							   }
							}
							break;
						}
						
						var param ='';
						if(data.APPTYPE ==115)
							param = "&Mobile=Ionic";
						var postParam="ID="+data.ID+"&MATRIIDS="+data.VIEWEDID+"&APPTYPE="+data.APPTYPE+"&ENCID="+data.ENCID+"&TOKENID="+data.TOKENID+param+"";
						var AppURL = "/appinbox/markmsgstatus.php";								
						bmCommonFunc.bmfuncescapeexec(AppURL,postParam,function(err,reltback){});
						
						//M1273720 receiverId: M2101090
						//M2101090Matriid:M1273720
						if(bmgeneric.isset(otherInfoArr['LASTCOMMUNICATION']) && otherInfoArr['LASTCOMMUNICATION']!=0)
						{
							otherInfoArr['LASTCOMMUNICATIONID'] = bmgeneric.MatriIdConCat(data.ID,mid);//ComId
							otherInfoArr['LASTCOMMUNICATIONDATE'] = ComRes["comdate"];
						}
						
						if(ComRes["pincomstatus"]==1){
							otherInfoArr['PINSTATUS1']='1';
							otherInfoArr['PINSTATUS2']='0';
						}else if(ComRes["pincomstatus"]==2){
							otherInfoArr['PINSTATUS2']='0';
							otherInfoArr['PINSTATUS1']='1';
						}else{
							otherInfoArr['PINSTATUS1']='0';
							otherInfoArr['PINSTATUS2']='0';
						}

						if(data.APPTYPE == 115){
							if(ComRes['likedstatus'] == 1 || ComRes['likedstatus'] == 3){
								otherInfoArr['PHOTOLIKESTATUS']=ComRes['likedstatus']; //1-like 2-unlike 0-default
							}else{
								otherInfoArr['PHOTOLIKESTATUS']=0;
							}
						}
									
						var skipprivarr = {};
						for (var arrkey in skipprivcy){
							if(arrkey == 'matriid' || arrkey =='partnerid'){
								skipprivarr[arrkey.toUpperCase()] = bmgeneric.converToMatriId(LastComRes[mid][arrkey])
							} else {								
								skipprivarr[arrkey.toUpperCase()] = LastComRes[mid][arrkey];
							}
						}
					
						otherInfoArr['SKIPPRIVACY']= skipprivarr;
						callback(null,otherInfoArr);	
					}
				} else {					
					otherInfoArr["BLOCKED"] = "N";
					otherInfoArr["BLOCKEDBYPARTNERID"] = "N";
					otherInfoArr["IGNORED"] = "N";
					callback(null,otherInfoArr);	
				}	
			}catch(err){				
				console.log("Error : File Name - otherinfo.js and Function name : getOtherInfo:",err);
				return callback(err,otherInfoArr);	
			}
		},getLastLoginTime : function(ID,VIEWEDID,LastLogin,TimeCreated,PowerPackStatus){
			try{
				if(LastLogin=="0000-00-00 00:00:00") {
					logintime = TimeCreated;
				} else {
					logintime = LastLogin;
				}
				var currenttime = bmgeneric.UnixTimeStamp();				
				var difftime = currenttime - strtotime(logintime);
				var days = difftime/(24*3600);				
				if((days <= 1 && PowerPackStatus>0 && PowerPackStatus!=4 && PowerPackStatus!=8) || (ID !='' && VIEWEDID !='' && (ID == VIEWEDID)))
				{
					return "Now";				 
				}else if(days <= 1 && (PowerPackStatus==0 || PowerPackStatus==4 || PowerPackStatus==8)) {
					hours = difftime/3600;
					if(hours < 1){
						return Math.floor(difftime/60)+"m ago";
					}else {
						return Math.floor(difftime/3600)+"h ago";
					}
				}else if(days > 1 && days <= 7) {
					return Math.floor(days)+"d ago";
				}else if(days > 7 && days <= 30) {
					return Math.floor(days/7)+"w ago";
				}else if(days > 30 && days <= 365) {
					return Math.floor(days/30)+"mo ago";
				}else {
					return Math.floor(days/365)+"y ago";
				}
			}catch(err){				
				console.log("Error : File Name - otherinfo.js and Function name : getLastLoginTime:",err);
				return '';
			}			
		}
	}	
	module.exports = otherinfo;