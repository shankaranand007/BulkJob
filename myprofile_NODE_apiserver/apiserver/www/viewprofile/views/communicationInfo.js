/**********************************************************************************************
 *	Filename	: comunicationInfo.js							
 *	Author		: Sathrak paldurai K
 *	Date		: 28-09-2016								
 *	Description	: Viewed member details display.
***********************************************************************************************/
	exports.getcomunicationInfo = function(data,partnerDetails,lastaction,moduletype,requestDetails,callback){
		try{
			var threadolddata = 0;
			var memberid = data.ID;
			var PartnerId = data.VIEWEDID;
			var logingen = data.LOGINGEN;
			// loginentrytp value is must.  F - free  R - paid
			loginentrytype = bmgeneric.ucwords(data.LOGINENTRY);
			// loginentrytp value is must.  F - female  M - male
			logingender = bmgeneric.ucwords(logingen);		
			
			unifedVerion2 = 1;
			actionBtnShortTitlesArr = 'actionBtnShortTitlesNew';
			//if(bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE)){
			var actBtnTitle = 'actionBtnTitlescta';
			//}else{
				//actBtnTitle = 'actionBtnTitlesNew';
			//}
			
			//if(bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE) || data.APPTYPE == 115){
			var actionBtnLabelsArr = 'actionBtnLabelscta';
			//}else{
				//actionBtnLabelsArr = 'actionBtnLabelsnew';
			//}
			var refavailable = partnerDetails["referenceavailable"];
			var eatinghabits = drinkinghabits = smokinghabits = gothraavailable = starrasiavailable = educationavailable = occupationavailable = annualincomeavailable = ancestorigavailable = familydescavailable = familydetsavailable = photoavailable = horoscopeavailable = 0;
			if(!bmgeneric.empty(lastaction)){
				var partnerid = partnerDetails['matriid'];
				if(!bmgeneric.empty(requestDetails)){
					var requestArr = bmgeneric.explode("~",bmgeneric.trim(requestDetails,'"'));
					eatinghabits			=	requestArr[0];
					drinkinghabits			=	requestArr[1]; 
					smokinghabits			=	requestArr[2]; 
					gothraavailable			=	requestArr[3];
					starrasiavailable		=	requestArr[4];
					educationavailable		=	requestArr[5];
					occupationavailable		=	requestArr[6];
					annualincomeavailable	=	requestArr[7];
					ancestorigavailable		=	requestArr[8];
					familydescavailable		=	requestArr[9];
					familydetsavailable		=	requestArr[10];
					photoavailable			=	requestArr[11];
					horoscopeavailable		=	requestArr[12];
				}
			
				var memname =  "<![CDATA[" +bmgeneric.AppStrToTitle(partnerDetails['name'])+ "]]>";
				var final_action = {}
				for (var key in lastaction) {
					var partnerId  = key;	
					var requestThirdAction = 0;
					//Checking the condition to display the third action for all request received scenaios.					
					if((loginentrytype == 'R' && lastaction[partnerId]['messagecomstatus'] == 0) || (loginentrytype == 'F' && lastaction[partnerId]['interestcomstatus'] == 0 && lastaction[partnerId]['messagecomstatus'] == 0))
						requestThirdAction = 1;
					
					btnvalues = bmgeneric.btnArray(actionBtnLabelsArr);			
					if(lastaction[partnerId]['interestcomstatus'] > 0)
						btnvalues['EI'] = '';
										
					if(logingen == 'M')
						gendertype='her';
					else
						gendertype='his';
									
					var title = bmgeneric.str_replace('#Name#',memname,ACTBTNTITLES[actBtnTitle][12]);
					var final_set = {};												
					switch(lastaction[partnerId]['comtype']){
					case 1:// message sent
						if(lastaction[partnerid]['comstatus'] == 2){
							if(unifedVerion2 == 1 && threadolddata == 1)
								final_set['Title'] = {"main-title":thvactionBtnTitles['messagesentread'],"sub-title":actionBtnShortTitlesNew[1]};
							else
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]['messagesentread'],"sub-title":actionBtnShortTitlesNew[1]};
						}else{
							if(unifedVerion2 == 1 && threadolddata == 1)
								final_set['Title'] = {"main-title":thvactionBtnTitles[1],"sub-title":actionBtnShortTitlesNew[1]};
							else
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][1],"sub-title":actionBtnShortTitlesNew[1]};
						}
						
						if(loginentrytype == "F")
						{
							final_set['firstActBtn']	= btnvalues['PAIDPROMOTIONSENDMAIL'];
							final_set['promocontent'] = bmcommlable.defaultMessage['upgrade'];
							final_set['secondActBtn'] = btnvalues['CALLNOW'];
						}else{	
							final_set['firstActBtn']	= btnvalues['SENDMAIL'];
							final_set['secondActBtn'] = btnvalues['CALLNOW'];
						}
					break;
					case 2: // message-Received
						if(lastaction[partnerId]['messagecomrepliedstatus']!=1 && lastaction[partnerId]['messagecomrepliedstatus']!=3 && lastaction[partnerId]['messagecomneedmoretime']!=4 && lastaction[partnerId]['messagecomneedmoretime']!=6 && lastaction[partnerId]['interestcomaccepted']!=1 && lastaction[partnerId]['interestcomaccepted']!=3 && lastaction[partnerId]['interestcomacceptedbyphone']!=1 && lastaction[partnerId]['interestcomacceptedbyphone']!=3 && lastaction[partnerId]['interestcomacceptedbysendmail']!=1 && lastaction[partnerId]['interestcomacceptedbysendmail']!=3){
							if(lastaction[partnerid]['comstatus'] == 2)
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]['messageyetacceptvpr'],"sub-title":actionBtnShortTitlesNew[2]};
							else
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]['messageyetacceptvpnr'],"sub-title":actionBtnShortTitlesNew[2]};
														
							if(threadolddata == 1)
								final_set['Title'] = {"main-title":thvactionBtnTitles[2],"sub-title":actionBtnShortTitlesNew[2]};
							else
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]['messageyetacceptnr'],"sub-title":actionBtnShortTitlesNew[2]};
							
							final_set['firstActBtn'] = btnvalues['MSGREPLYYN'];
							final_set['secondActBtn'] = btnvalues['MESSAGENINO'];
						}
						else{
							if(lastaction[partnerid]['comstatus'] == 2){
								if(moduletype != 'threadview' ){
									final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]['messageyetreply'],"sub-title":actionBtnShortTitlesNew[2]};
								}else{
									final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][2],"sub-title":actionBtnShortTitlesNew[2]};
								}
							}else{
								final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][2],"sub-title":actionBtnShortTitlesNew[2]};
							}
							
							if(threadolddata == 1)
								final_set['Title'] = {"main-title":thvactionBtnTitles[2],"sub-title":actionBtnShortTitlesNew[2]};
							else
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]['messageyetacceptcommunicated'],"sub-title":actionBtnShortTitlesNew[2]};
							
							final_set['firstActBtn'] = btnvalues['MESSAGEREPLY'];
						}
					break;
					case 3:// message Replied-Sent
						if((lastaction[partnerId]['messagecomneedmoretime'] == 4 || lastaction[partnerId]['messagecomneedmoretime'] == 6) && unifedVerion2 == 1)
						{
							if(threadolddata == 1)
								final_set['Title'] = {"main-title":thvactionBtnTitles["msgaccrepsent"],"sub-title":actionBtnShortTitlesNew[3]};				
							else
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]["msgaccrepsent"],"sub-title":actionBtnShortTitlesNew[3]};				
						}
						else
						{
							if(unifedVerion2 == 1 && threadolddata == 1)
								final_set['Title'] = {"main-title":thvactionBtnTitles[3],"sub-title":actionBtnShortTitlesNew[3]};
							else
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][3],"sub-title":actionBtnShortTitlesNew[3]};
						}
						if(loginentrytype == "F"){ 
							if(unifedVerion2 == 1){
								final_set['promocontent'] = bmcommlable.defaultMessage['msgReplySend'];
								final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];	
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['SEARCHNOW'];									
								final_set['promocontent'] = bmcommlable.defaultMessage['msgReplySend'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] = btnvalues['CALLNOW'];
						}
					break;
					case 4:// message Replied-Received
						if((lastaction[partnerId]['messagecomneedmoretime'] == 5 || lastaction[partnerId]['messagecomneedmoretime'] == 6))
						{
							if(unifedVerion2 == 1 && threadolddata == 1)
								final_set['Title'] = {"main-title":thvactionBtnTitles["msgaccrep"],"sub-title":actionBtnShortTitlesNew[4]};				
							else
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]["msgaccrep"],"sub-title":actionBtnShortTitlesNew[4]};			
						}
						else
						{
							if(unifedVerion2 == 1 && threadolddata == 1)
								final_set['Title'] = {"main-title":thvactionBtnTitles[4],"sub-title":actionBtnShortTitlesNew[4]};
							else
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][4],"sub-title":actionBtnShortTitlesNew[4]};
						}
						
						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
								
						}else{	
							if(unifedVerion2 == 1){
								final_set['firstActBtn'] = btnvalues['SENDMAIL'];
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
							}else
								final_set['firstActBtn'] = btnvalues['SENDMAIL'];
						}
					break;
					case 5:// message Declined-Sent							
						if(threadolddata == 1)
							final_set['Title'] = {"main-title":thvactionBtnTitles[5],"sub-title":actionBtnShortTitlesNew[5]};
						else
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][5],"sub-title":actionBtnShortTitlesNew[5]};
						
						if(unifedVerion2 == 1)
							final_set['firstActBtn'] = btnvalues['MESSAGEREPLYYES'];
						else
							final_set['firstActBtn'] = btnvalues['MESSAGEREPLY'];

						final_set['message'] = bmcommlable.defaultMessage['ChangeMind'];
						
					break;
					case 6:// message Declined-Received
						// No action after message decline
						 if(threadolddata == 1)
						 {
							final_set['Title'] = {"main-title":thvactionBtnTitles[6],"sub-title":actionBtnShortTitlesNew[6]};
							final_set['message'] =  '';
						 } else {
							if(lastaction[partnerId]['messagecomdeclined'] == 5){
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]['msgdeclalresrec1'],"sub-title":actionBtnShortTitlesNew[6]};
								final_set['message'] =  '';
							}else if(lastaction[partnerId]['messagecomdeclined'] == 7){
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]['msgdeclalresrec2'],"sub-title":actionBtnShortTitlesNew[6]};
								final_set['message'] =  '';
							}else if(lastaction[partnerId]['messagecomdeclined'] == 9){
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]['msgdeclalresrec3'],"sub-title":actionBtnShortTitlesNew[6]};			
								final_set['message'] =  '';
							}else if(lastaction[partnerId]['messagecomdeclined'] == 11){
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]['msgdeclalresrec4'],"sub-title":actionBtnShortTitlesNew[6]};
							}else if(lastaction[partnerId]['messagecomdeclined'] == 13){
								final_set['Title']  = {"main-title":ACTBTNTITLES[actBtnTitle]['msgdeclalresrec5'],"sub-title":actionBtnShortTitlesNew[6]};			
								final_set['message'] =  '';
							}else if(lastaction[partnerId]['messagecomdeclined'] == 15){
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]['msgdeclalresrec6'],"sub-title":actionBtnShortTitlesNew[6]};			
								final_set['message'] =  '';
							}else{
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][6],"sub-title":actionBtnShortTitlesNew[6]};
								final_set['message'] = '';
							}
						}

						if(unifedVerion2 != 1 && moduletype != 'search'){
							final_set['firstActBtn'] = btnvalues['SEARCHNOW'];
							final_set['message'] = '';
						}
					break;
					case 7:// Msg NeedMoreTime-Sent
						final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][7],"sub-title":actionBtnShortTitlesNew[7]};
						final_set['firstActBtn'] = btnvalues['MESSAGEREPLY'];
						final_set['negActBtn'] = btnvalues['MESSAGENI'];
					break;
					case 8:// Msg NeedMoreTime-Received
						final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][8],"sub-title":actionBtnShortTitlesNew[8]};
						final_set['message'] = bmcommlable.defaultMessage['NMT'];
						final_set['firstActBtn'] = btnvalues['SEARCHNOW'];
						if(loginentrytype == "F"){					
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}
					break;
					case 9:// message Reminder-Sent
						final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][9],"sub-title":actionBtnShortTitlesNew[9]};
						if(loginentrytype == "F"){ 
							final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
						}
					break;
					case 10:// message Reminder-Received		
						final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][10],"sub-title":actionBtnShortTitlesNew[10]};
						final_set['firstActBtn'] = btnvalues['MESSAGEREPLY'];
						final_set['negActBtn'] = btnvalues['MESSAGENI'];
					break;
					case 11:// Int- sent
						if(lastaction[partnerid]['comstatus'] == 2){
							if(threadolddata == 1)
								final_set['Title'] = {"main-title":thvactionBtnTitles['intreadsent'],"sub-title":actionBtnShortTitlesNew[11]};
							else
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]['intreadsent'],"sub-title":actionBtnShortTitlesNew[11]};
						}else{
							if(threadolddata == 1)
								final_set['Title'] = {"main-title":thvactionBtnTitles[11],"sub-title":actionBtnShortTitlesNew[11]};
							else
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][11],"sub-title":actionBtnShortTitlesNew[11]};
						}
						if(loginentrytype == "F")
						{ 
							if(unifedVerion2 == 1){
								if(lastaction['InterestComReminder'] > 0){
									final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] = btnvalues['CALLNOW'];					
								}else{
									final_set['firstActBtn'] = btnvalues['EISENDREMINDER'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];					
								}								
								final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							}else{
								final_set['firstActBtn'] = btnvalues['EISENDREMINDER'];
								final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 12:// Int-Received 
						if(unifedVerion2 == 1){
							if(threadolddata == 1)
								final_set['Title'] = {"main-title":thvactionBtnTitles[12],"sub-title":actionBtnShortTitlesNew[12]};
							else
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][12],"sub-title":actionBtnShortTitlesNew[12]};
						}else{
							if(lastaction['comstatus'] == 2){
								if(moduletype != 'threadview' ){
									final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]['intreadreceived'],"sub-title":actionBtnShortTitlesNew['intread']};
								}else{
									final_set['Title'] = {"main-title":title,"sub-title":actionBtnShortTitlesNew[12]};
								}
							}else{
								final_set['Title'] = {"main-title":title,"sub-title":actionBtnShortTitlesNew[12]};
							}
						}
						final_set['firstActBtn'] = btnvalues['EISNTACCEPT']; 
						if(unifedVerion2 == 1)
							final_set['negActBtn'] = btnvalues['EINI'];
						else			
							final_set['negActBtn'] = btnvalues['EISNTNI'] ;

						if(loginentrytype == "F"){ 
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 13:// Int Accept-Sent 
						if(moduletype == 'vp')
							name = memname;
						else
							name = partnerDetails[partnerid]['Name'];
						
						if(threadolddata == 1)
							final_set['Title'] = {"main-title":thvactionBtnTitles[13],"sub-title":actionBtnShortTitlesNew[13]};
						else
						{
							if(unifedVerion2 == 1)
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][13],"sub-title":actionBtnShortTitlesNew[13]};
							else
								final_set['Title'] = {"main-title":bmgeneric.str_replace('#Name#',name,ACTBTNTITLES[actBtnTitle][13]),"sub-title":actionBtnShortTitlesNew[13]};
						}

						if(loginentrytype == "F"){ 
							final_set['promocontent'] = bmcommlable.defaultMessage['upgrade'];
							final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
			
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 14:// Int Accept-Received
						if(threadolddata == 1)	
							final_set['Title'] = {"main-title":thvactionBtnTitles[14],"sub-title":actionBtnShortTitlesNew[14]};
						else
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][14],"sub-title":actionBtnShortTitlesNew[14]};

						if(loginentrytype == "F"){ 
							final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							final_set['promocontent'] = bmcommlable.defaultMessage['upgrade'];
							
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 15:// Int Decline-Sent						
						if(threadolddata == 1)
							final_set['Title'] = {"main-title":thvactionBtnTitles[15],"sub-title":actionBtnShortTitlesNew[15]};
						else
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][15],"sub-title":actionBtnShortTitlesNew[15]};
						final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];

						if(unifedVerion2 == 1)
							final_set['firstActBtn'] = btnvalues['EIACCEPTYES'];
						else
							final_set['firstActBtn'] = btnvalues['EIACCEPT'];

						final_set['TransMsg'] = '';					
					break;
					case 16:// Int Decline-Received 
					if(unifedVerion2 == 1){
						if(threadolddata == 1)
						{
							final_set['Title']= {"main-title":thvactionBtnTitles[16],"sub-title":actionBtnShortTitlesNew[16]};
							final_set['message']=  '';
						} else{
							if(lastaction[partnerId]['interestcomdeclined'] == 5){
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]['intdeclalresrec1'],"sub-title":actionBtnShortTitlesNew[16]};
								final_set['message'] =  '';
							}else if(lastaction[partnerId]['interestcomdeclined'] == 7){
								final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle]['intdeclalresrec2'],"sub-title":actionBtnShortTitlesNew[16]};		
								final_set['message'] =  '';
							}else if(lastaction[partnerId]['interestcomdeclined'] == 9){
								final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle]['intdeclalresrec3'],"sub-title":actionBtnShortTitlesNew[16]};		
								final_set['message'] =  '';
							}else if(lastaction[partnerId]['interestcomdeclined'] == 11){
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]['intdeclalresrec4'],"sub-title":actionBtnShortTitlesNew[16]};		
							}else if(lastaction[partnerId]['interestcomdeclined'] == 13){
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]['intdeclalresrec5'],"sub-title":actionBtnShortTitlesNew[16]};		
								final_set['message'] =  '';
							}else if(lastaction[partnerId]['interestcomdeclined'] == 15){
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]['intdeclalresrec6'],"sub-title":actionBtnShortTitlesNew[16]};		
								final_set['message'] =  '';
							}else{
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]['intdecrec'],"sub-title":actionBtnShortTitlesNew[16]};
								final_set['message'] =  '';
							}
						}
					}else{
						final_set['Title'] = {"main-title":bmgeneric.str_replace('#GENDER#',gendertype,ACTBTNTITLES[actBtnTitle][16]),"sub-title":actionBtnShortTitlesNew[16]};
						if(moduletype != 'search'){
							final_set['firstActBtn'] = btnvalues['VIEWMATCHES'];
						}
					}
					final_set['message'] = '';
					final_set['TransMsg'] = '';
					break;
					case 17:// Int NMT-Sent
						if(loginentrytype == "F"){ 
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}
						final_set['firstActBtn'] = btnvalues['EIACCEPT'];
						if(lastaction[partnerid]['interestcomneedmoreinfo'] == 1){
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]['sendNMIandNMT'],"sub-title":actionBtnShortTitlesNew[17]};
						}else{
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][17],"sub-title":actionBtnShortTitlesNew[17]};
						}
						final_set['negActBtn'] = btnvalues['EINI'];
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break; 
					case 18:// Int NMT-Received
						if(lastaction[partnerid]['interestcomneedmoreinfo'] == 2){
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]['receNMIandNMT'],"sub-title":actionBtnShortTitlesNew[18]};
						}else{
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][18],"sub-title":actionBtnShortTitlesNew[18]};
						}
						if(moduletype != 'search'){
							final_set['firstActBtn'] = btnvalues['VIEWMATCHES'];
						}
						final_set['message'] = bmcommlable.defaultMessage['NMT'];
						if(loginentrytype == "F"){
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}
						final_set['TransMsg'] = '';
					break;
					case 19:// Int NMI-Sent 
						if(loginentrytype == "F"){ 
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}
						final_set['firstActBtn'] = btnvalues['EIACCEPT'];
						if(lastaction[partnerid]['interestcomneedmoretime'] == 1){
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]['sendNMIandNMT'],"sub-title":actionBtnShortTitlesNew[19]};
						}else{
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][19],"sub-title":actionBtnShortTitlesNew[19]};
						}
						final_set['negActBtn'] = btnvalues['EINI'];
						final_set['message']	= '';
						final_set['TransMsg'] = '';
					break; 
					case 20:// Int NMI-Received  
						if(loginentrytype == "F"){ 
							if(moduletype =='vp' || moduletype =='threadview'){
								final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}else{
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
						}
						if(lastaction[partnerid]['interestcomneedmoretime'] == 2){
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]['receNMIandNMT'],"sub-title":actionBtnShortTitlesNew[20]};
						}else{
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][20],"sub-title":actionBtnShortTitlesNew[20]};
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 21:// Interest Reminder-Sent
						if(loginentrytype == "F"){ 
							if(unifedVerion2 == 1){
								final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
							}else{
								if(moduletype =='vp' || moduletype =='threadview'){
									final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['IntsecondActBtn'] = btnvalues['EISENDREMINDER'];
								}else{
									final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								} 
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];

						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
						}

						if(moduletype == 'vp')
							name = memname;
						else
							name = partnerDetails[partnerid]['Name'];
						
						if(threadolddata == 1)
							final_set['Title'] = {"main-title":bmgeneric.str_replace('#Name#',name,thvactionBtnTitles[21]),"sub-title":actionBtnShortTitlesNew[21]};
						else
						{
							if(unifedVerion2 == 1)
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][21],"sub-title":actionBtnShortTitlesNew[21]};
							else
								final_set['Title'] = {"main-title":bmgeneric.str_replace('#Name#',name,ACTBTNTITLES[actBtnTitle][21]),"sub-title":actionBtnShortTitlesNew[21]};
						}

						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 22:// Interest Reminder-Received
						if(unifedVerion2 == 1)
							final_set['firstActBtn'] = btnvalues['EISNTACCEPT'];
						else			
							final_set['firstActBtn'] = btnvalues['EIACCEPT'];

						if(loginentrytype == "F"){ 
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}
						if(threadolddata == 1)
							final_set['Title'] = {"main-title":thvactionBtnTitles[22],"sub-title":actionBtnShortTitlesNew[22]};
						else
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][22],"sub-title":actionBtnShortTitlesNew[22]};

						final_set['negActBtn'] = btnvalues['EINI'];
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 23:// Accepted with Phone Call-Sent
						final_set['message'] = '';
						if(logingender == 'M')
						{
							WhyWaitContent = bmgeneric.str_replace("@@@","her",bmcommlable.defaultMessage['WhyWait']);
						}else{
							WhyWaitContent = bmgeneric.str_replace("@@@","him",bmcommlable.defaultMessage['WhyWait']);
						}

						if(loginentrytype == "F"){ 
							if(unifedVerion2 == 1){
								final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
								final_set['promocontent'] = bmcommlable.defaultMessage['upgrade'];
							}else{
								if(moduletype =='vp'){
									final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['Intpromocontent'] = bmcommlable.defaultMessage['upgrade'];
									final_set['message'] = WhyWaitContent;
								}else{
									final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
								}
							}
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
						}
						if(unifedVerion2 == 1){
							if(moduletype == 'vp')
								name = memname;
							else
								name = partnerDetails[partnerid]['Name'];

							if(threadolddata == 1)
								final_set['Title'] = {"main-title":thvactionBtnTitles[13],"sub-title":actionBtnShortTitlesNew[13]};
							else
								final_set['Title'] = {"main-title":bmgeneric.str_replace('#Name#',name,ACTBTNTITLES[actBtnTitle][13]),"sub-title":actionBtnShortTitlesNew[13]};
						}else{
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][23],"sub-title":actionBtnShortTitlesNew[23]};				
						}
						final_set['TransMsg'] = '';
					break;
					case 24:// Accepted with Phone Call-Received
						if(loginentrytype == "F"){ 
							if(unifedVerion2 == 1){
								final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
								final_set['promocontent'] = bmcommlable.defaultMessage['upgrade'];
							}else{
								if(unifedVerion2 == 1)
									final_set['firstActBtn'] = btnvalues['CALLNOW'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							}
							
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
						}
						
						if(unifedVerion2 == 1){
							if(threadolddata == 1)	
								final_set['Title'] = {"main-title":thvactionBtnTitles[14],"sub-title":actionBtnShortTitlesNew[14]};
							else
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][14],"sub-title":actionBtnShortTitlesNew[14]};				
						}else
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][24],"sub-title":actionBtnShortTitlesNew[24]};
						
						final_set['message'] = '';
						final_set['TransMsg'] = '';			
					break;
					case 25:// Accepted with Send Mail-Sent
						final_set['message']	= '';
						if(logingender == 'M')
						{
							WhyWaitContent = bmgeneric.str_replace("@@@","her",bmcommlable.defaultMessage['WhyWait']);
						}else{	
							WhyWaitContent = bmgeneric.str_replace("@@@","him",bmcommlable.defaultMessage['WhyWait']);
						}				
						if(loginentrytype == "F"){ 
							if(unifedVerion2 == 1){
								final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
								final_set['promocontent'] = bmcommlable.defaultMessage['upgrade'];					
							}else{
								if(moduletype =='vp'){
									final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['Intpromocontent'] = bmcommlable.defaultMessage['upgrade'];
									final_set['message'] = WhyWaitContent;
								}else{
									final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
								}
							}
						}else{
							final_set['firstActBtn'] =  btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
						}

						if(unifedVerion2 == 1){
							if(moduletype == 'vp')
								name = memname;
							else
								name = partnerDetails[partnerid]['Name'];

							if(threadolddata == 1)
								final_set['Title'] = {"main-title":thvactionBtnTitles[13],"sub-title":actionBtnShortTitlesNew[13]};
							else
								final_set['Title'] = {"main-title":str_replace('#Name#',name,ACTBTNTITLES[actBtnTitle][13]),"sub-title":actionBtnShortTitlesNew[13]};
						}else{
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][25],"sub-title":actionBtnShortTitlesNew[25]};
						}
						final_set['Intpromocontent'] = bmcommlable.defaultMessage['paidpromo'];	
						final_set['TransMsg'] = '';
					break;
					case 26:// Accepted with Send Mail-Received		
						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
								final_set['promocontent'] = bmcommlable.defaultMessage['upgrade'];
							}else{
								if(moduletype =='vp'){
									final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['Intpromocontent'] = bmcommlable.defaultMessage['upgrade'];
								}else{
									final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
								}
							}
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
						}			
						
						if(unifedVerion2 == 1){
							if(threadolddata == 1)	
								final_set['Title'] = {"main-title":thvactionBtnTitles[14],"sub-title":actionBtnShortTitlesNew[14]};
							else
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][14],"sub-title":actionBtnShortTitlesNew[14]};				
						}else
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][26],"sub-title":actionBtnShortTitlesNew[26]};
						
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;						
					case 37:// Pin-Sent
						final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][37],"sub-title":actionBtnShortTitlesNew[37]};
						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['EI'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
						}
					break;
					case 38:// Pin-Received	
						if(loginentrytype == "F")
						{
							final_set['firstActBtn'] = btnvalues['EI'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
						}
						final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][38],"sub-title":actionBtnShortTitlesNew[38]};
					break;
					case 39: // Pin Replied-Sent 
						final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][39],"sub-title":actionBtnShortTitlesNew[39]};
						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['EI'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
						}
					break; 
					case 40:  // Pin Replied-Received.
						final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][40],"sub-title":actionBtnShortTitlesNew[40]};
						if(loginentrytype == "F")
						{
							final_set['firstActBtn'] = btnvalues['EI'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
						}
					break;
					case 41: // Pin Declined-Sent
						final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][41],"sub-title":actionBtnShortTitlesNew[41]};
						if(loginentrytype == "F")
						{
							final_set['firstActBtn'] = btnvalues['EI'] ;
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
						}
						final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];
					break;
					case 42: // Pin Declined-Received
						final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][42],"sub-title":actionBtnShortTitlesNew[42]};

						if(moduletype != 'search'){
							final_set['firstActBtn'] = btnvalues['VIEWMATCHES'];
							final_set['message'] = '';
						}
					break;
					case 43:// SMS-Sent
						final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][43],"sub-title":actionBtnShortTitlesNew[43]};
						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['EI'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
						}
							final_set['TransMsg'] = '';
					break;
					case 44:// SMS-Received
						final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][44],"sub-title":actionBtnShortTitlesNew[44]};
						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['EI'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
						}
						final_set['TransMsg'] = '';
					break;
					case 45:// ViewPhone-Sent
						if(threadolddata == 1)
							final_set['Title'] = {"main-title":thvactionBtnTitles[45],"sub-title":actionBtnShortTitlesNew[45]};
						else
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][45],"sub-title":actionBtnShortTitlesNew[45]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								final_set['firstActBtn'] = btnvalues['CALLNOW'];
								final_set['secondActBtn'] = btnvalues['EI'] ;
								
								if(btnvalues['EI'] == '')
									final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'] ;
							}else{
								final_set['firstActBtn'] = btnvalues['EI'] ;
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'] ;
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							if(unifedVerion2 == 1){
								final_set['firstActBtn'] = btnvalues['CALLNOW'];
								final_set['secondActBtn'] = btnvalues['SENDMAIL'];
							}else
								final_set['firstActBtn'] = btnvalues['SENDMAIL'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 46:// ViewPhone-Received
						if(threadolddata == 1)
							final_set['Title'] = {"main-title":thvactionBtnTitles[46],"sub-title":actionBtnShortTitlesNew[46]};
						else
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][46],"sub-title":actionBtnShortTitlesNew[46]};

						if(unifedVerion2 == 1){
							final_set['firstActBtn'] = btnvalues['VIEWPHYES'];
							final_set['negActBtn'] = btnvalues['VIEWPHNI'];
						}else{
							if(loginentrytype == "F"){
								final_set['firstActBtn'] = btnvalues['EI'] ;
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'] ;
								final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							}else{
								final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							}
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 47:// Add Photo Req-Sent
						if(threadolddata == 1)
							final_set['Title'] = {"main-title":thvactionBtnTitles[47],"sub-title":actionBtnShortTitlesNew[47]};
						else
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][47],"sub-title":actionBtnShortTitlesNew[47]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] = btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}
							}else{
								final_set['firstActBtn'] = btnvalues['EI'] ;
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'] ;
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 48:// Add Photo Req-Received
						if(photoavailable == 1 && unifedVerion2 == 1){
							if(threadolddata == 1)
								final_set['Title'] = {"main-title":thvactionBtnTitles['phnotifyyesorno'],"sub-title":actionBtnShortTitlesNew[48]};	
							else
								final_set['Title'] = {"main-title":bmgeneric.str_replace("$$$","photo",ACTBTNTITLES[actBtnTitle]['notifyyesorno']),"sub-title":actionBtnShortTitlesNew[48]};	

							final_set['firstActBtn'] = btnvalues['ADDPHACC'];
							final_set['negActBtn'] = btnvalues['ADDPHNOTNI'];
						}else{
							if(threadolddata == 1)
								final_set['Title'] = {"main-title":thvactionBtnTitles[48],"sub-title":actionBtnShortTitlesNew[48]};
							else
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][48],"sub-title":actionBtnShortTitlesNew[48]};

							final_set['firstActBtn'] = btnvalues['ADDPHOTO'];
							if(unifedVerion2 == 1){
								final_set['secondActBtn'] = btnvalues['ADDPHOTONI'];
									if(requestThirdAction == 1){
										if(loginentrytype == "F")
											final_set['thirdActBtn'] = btnvalues['EI'];
										else
											final_set['thirdActBtn'] = btnvalues['SENDMAIL'];
									}
							}else{
								if(loginentrytype == "F"){
									final_set['secondActBtn'] = btnvalues['EI'];
									final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'] ;
									final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
								}else{
									final_set['secondActBtn'] = btnvalues['SENDMAIL'];
								}
							}
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 49:// Photo Req Accepted-Sent
						if(threadolddata == 1)
							final_set['Title'] = {"main-title":thvactionBtnTitles[49],"sub-title":actionBtnShortTitlesNew[49]};
						else
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][49],"sub-title":actionBtnShortTitlesNew[49]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] = btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
						} 
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 50:// Photo Req Accepted-Received
						if(threadolddata == 1)
							final_set['Title'] = {"main-title":thvactionBtnTitles[50],"sub-title":actionBtnShortTitlesNew[50]};
						else
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][50],"sub-title":actionBtnShortTitlesNew[50]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] = btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}					
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 51:// Photo Req fullfilment-Sent
						if(threadolddata == 1)
							final_set['Title'] = {"main-title":thvactionBtnTitles[51],"sub-title":actionBtnShortTitlesNew[51]};
						else
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][51],"sub-title":actionBtnShortTitlesNew[51]};

						if(loginentrytype == "F"){								
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] = btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 52:// Photo Req fullfilment-Received
						if(threadolddata == 1)
							final_set['Title'] = {"main-title":thvactionBtnTitles[52],"sub-title":actionBtnShortTitlesNew[52]};
						else
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][52],"sub-title":actionBtnShortTitlesNew[52]};

						if(loginentrytype == "F"){
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] = btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';				
					break;
					case 53:// Photo Password req-Sent
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[53],"sub-title":actionBtnShortTitlesNew[53]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][53],"sub-title":actionBtnShortTitlesNew[53]};

						if(loginentrytype == "F"){								
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}					
							
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] = btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 54:// Photo Password req-Received
						if(threadolddata == 1)
							final_set['Title']= {"main-title":thvactionBtnTitles[54],"sub-title":actionBtnShortTitlesNew[54]};
						else
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][54],"sub-title":actionBtnShortTitlesNew[54]};

						final_set['firstActBtn'] = btnvalues['PHOTOPASSAPPROVE'];
						final_set['negActBtn'] = btnvalues['PHOTOPASSNI'];
						if(loginentrytype == "F")
						{
							if(moduletype !="vp"){
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';			
					break;
					case 55:// PhotoPasswordReq Accept-Sent
						if(threadolddata == 1)
							final_set['Title'] = {"main-title":thvactionBtnTitles[55],"sub-title":actionBtnShortTitlesNew[55]};
						else
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][55],"sub-title":actionBtnShortTitlesNew[55]};

						if(loginentrytype == "F"){								
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 56:// PhotoPasswordReq Accept-Received
						if(threadolddata == 1)
							final_set['Title'] = {"main-title":thvactionBtnTitles[56],"sub-title":actionBtnShortTitlesNew[56]};
						else
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][56],"sub-title":actionBtnShortTitlesNew[56]};

						if(loginentrytype == "F")
						{								
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}					
							
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] = btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 57:// PhotoPasswordReq Decline-Sent
						final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][57],"sub-title":actionBtnShortTitlesNew[57]};
						if(moduletype != "LAL"){
							if(threadolddata == 1)
								final_set['Title'] = {"main-title":thvactionBtnTitles[57],"sub-title":actionBtnShortTitlesNew[57]};
							else
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]['phpwddecvp'],"sub-title":actionBtnShortTitlesNew[57]};

							final_set['firstActBtn'] = btnvalues['PHOTOPASSAPPROVE'];	
						}							
						final_set['TransMsg'] = '';
					break;
					case 58:// PhotoPasswordReq Decline-Received
						if(threadolddata == 1)
							final_set['Title'] = {"main-title":thvactionBtnTitles[58],"sub-title":actionBtnShortTitlesNew[58]};
						else
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][58],"sub-title":actionBtnShortTitlesNew[58]};

						if(moduletype != 'search' && unifedVerion2 != 1)		
							final_set['firstActBtn'] = btnvalues['VIEWMATCHES'];
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 59:// Add Horo Req-Sent
						if(threadolddata == 1)
							final_set['Title'] = {"main-title":thvactionBtnTitles[59],"sub-title":actionBtnShortTitlesNew[59]};
						else
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][59],"sub-title":actionBtnShortTitlesNew[59]};

						if(loginentrytype == "F"){								
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}					
						
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] = btnvalues['CALLNOW'];
						}
						final_set['message'] =  '';
						final_set['TransMsg'] = '';
					break;
					case 60:// Add Horo Req-Received 
						if(horoscopeavailable == 1 && unifedVerion2 == 1){
							if(threadolddata == 1)
								final_set['Title']= {"main-title":thvactionBtnTitles['horonotifyyesorno'],"sub-title":actionBtnShortTitlesNew[60]};	
							else
								final_set['Title']= {"main-title":bmgeneric.str_replace("$$$","horoscope",ACTBTNTITLES[actBtnTitle]['notifyyesorno']),"sub-title":actionBtnShortTitlesNew[60]};	

							final_set['firstActBtn']= btnvalues['ADDHRACC'];
							final_set['negActBtn']= btnvalues['ADDHRNOTNI'];
						}else{
							if(threadolddata == 1)
								final_set['Title']= {"main-title":thvactionBtnTitles[60],"sub-title":actionBtnShortTitlesNew[60]};
							else
								final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][60],"sub-title":actionBtnShortTitlesNew[60]};

							final_set['firstActBtn']= btnvalues['ADDHORO'];
							if(unifedVerion2 == 1){
								final_set['secondActBtn']= btnvalues['ADDHORONI'];
								if(requestThirdAction == 1){
									if(loginentrytype == "F")
										final_set['thirdActBtn']= btnvalues['EI'];
									else
										final_set['thirdActBtn']= btnvalues['SENDMAIL'];
								}
							}else{
								if(loginentrytype == "F"){
									final_set['secondActBtn']= btnvalues['EI'];
									if(moduletype !="vp"){
										final_set['promotionBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
									}
									final_set['promocontent']= bmcommlable.defaultMessage['paidpromo'];
								}else{
									final_set['secondActBtn']= btnvalues['SENDMAIL'];
								}
							}
						}
						final_set['message']= '';
						final_set['TransMsg']= '';				
					break;
					case 61:// Horo  Req Accepted-Sent
						if(threadolddata == 1)
							final_set['Title']= {"main-title":thvactionBtnTitles[61],"sub-title":actionBtnShortTitlesNew[61]};
						else
							final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][61],"sub-title":actionBtnShortTitlesNew[61]};

						if(loginentrytype == "F"){								
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn']= btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn']= btnvalues['EI'];
								final_set['secondActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							
							final_set['promocontent']= bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] =  btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn']= btnvalues['CALLNOW'];
						}
						final_set['message']= '';
						final_set['TransMsg']= '';	
					break;
					case 62:// Horo  Req Accepted-Received
						if(threadolddata == 1)
							final_set['Title']= {"main-title":thvactionBtnTitles[62],"sub-title":actionBtnShortTitlesNew[62]};
						else
							final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][62],"sub-title":actionBtnShortTitlesNew[62]};

						final_set['firstActBtn'] =  btnvalues['VIEWHORO'];
						if(loginentrytype == "F"){
							final_set['secondActBtn']= btnvalues['EI'] ;
							final_set['promotionBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
							final_set['promocontent']= bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['secondActBtn']= btnvalues['SENDMAIL'];
						}				
														
						final_set['message']= '';
						final_set['TransMsg']= '';
					break;
					case 63:// Horo Req fullfilment-Sent
						if(threadolddata == 1)
							final_set['Title']= {"main-title":thvactionBtnTitles[63],"sub-title":actionBtnShortTitlesNew[63]};
						else
							final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][63],"sub-title":actionBtnShortTitlesNew[63]};

						if(loginentrytype == "F"){								
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn']= btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn']= btnvalues['EI'];
								final_set['secondActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
							}				
							
							final_set['promocontent']= bmcommlable.defaultMessage['paidpromo'];

						}else{
							final_set['firstActBtn'] =  btnvalues['SENDMAIL'];
							final_set['secondActBtn']= btnvalues['CALLNOW'];
						}
						final_set['message']= '';
						final_set['TransMsg']= '';
					break;
					case 64:// Horo Req fullfilment-Received
						if(threadolddata == 1)
							final_set['Title']= {"main-title":thvactionBtnTitles[64],"sub-title":actionBtnShortTitlesNew[64]};
						else
							final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][64],"sub-title":actionBtnShortTitlesNew[64]};

						final_set['firstActBtn'] =  btnvalues['VIEWHORO'];			
						if(loginentrytype == "F"){
							final_set['secondActBtn'] =  btnvalues['EI'] ;
							final_set['promotionBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'] ;
							final_set['promocontent'] =  bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['secondActBtn'] =  btnvalues['SENDMAIL'];
						}
					final_set['message']= '';
					final_set['TransMsg']= '';
					break;
					case 65:// Horo Pass Req-Sent
						if(threadolddata == 1)
							final_set['Title']	 = {"main-title":thvactionBtnTitles[65],"sub-title":actionBtnShortTitlesNew[65]};
						else
							final_set['Title']	 = {"main-title":ACTBTNTITLES[actBtnTitle][65],"sub-title":actionBtnShortTitlesNew[65]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] =  btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}					
							}else{
								final_set['promotionBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['firstActBtn'] =  btnvalues['EI'] ;
							}
							final_set['promocontent'] =  bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] =  btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';	
					break;
					case 66:// Horo Pass Req-Received
						if(threadolddata == 1)
							final_set['Title'] = {"main-title":thvactionBtnTitles[66],"sub-title":actionBtnShortTitlesNew[66]};
						else
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][66],"sub-title":actionBtnShortTitlesNew[66]};

						final_set['firstActBtn'] =  btnvalues['HOROAPPROVE'] ;
						if(loginentrytype == "F")
						{
							//final_set['secondActBtn'] =  btnvalues['EI'];
							if(moduletype !="vp"){
								final_set['promotionBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] =  bmcommlable.defaultMessage['paidpromo'];
						}else{
							//final_set['secondActBtn'] =  btnvalues['SENDMAIL'];
						}
						final_set['negActBtn'] =  btnvalues['HORONI'];
						final_set['message'] = '';
						final_set['TransMsg'] = '';			
					break;
					case 67:// HoroPasswordReq Accept-Sent
						if(threadolddata == 1)
							final_set['Title'] = {"main-title":thvactionBtnTitles[67],"sub-title":actionBtnShortTitlesNew[67]};
						else
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle][67],"sub-title":actionBtnShortTitlesNew[67]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] =  btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}					
							}else{
								final_set['firstActBtn'] =  btnvalues['EI'] ;
								final_set['promotionBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] =  bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] =  btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 68:// HoroPasswordReq Accept-Received
						if(threadolddata == 1)
							final_set['Title']	 = {"main-title":thvactionBtnTitles[68],"sub-title":actionBtnShortTitlesNew[68]};
						else
							final_set['Title']	 = {"main-title":ACTBTNTITLES[actBtnTitle][68],"sub-title":actionBtnShortTitlesNew[68]};

						if(unifedVerion2 == 1){
							final_set['firstActBtn'] =  btnvalues['VIEWHORO'];			
							if(loginentrytype == "F")
								final_set['secondActBtn'] =  btnvalues['EI'] ;
							else
								final_set['secondActBtn'] =  btnvalues['SENDMAIL'];
						}else{
							if(loginentrytype == "F")
							{
								final_set['firstActBtn'] =  btnvalues['EI'] ;
								final_set['promocontent'] =  bmcommlable.defaultMessage['paidpromo'];
								final_set['promotionBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
							}else
								final_set['firstActBtn'] =  btnvalues['SENDMAIL'];
											
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 69:// HoroPasswordReq Decline-Sent
						final_set['Title']	 = {"main-title":ACTBTNTITLES[actBtnTitle][69],"sub-title":actionBtnShortTitlesNew[69]};
						//Need to confirm this scenario with the product team
						if(unifedVerion2 == 1){
							if(moduletype != "LAL"){
								if(threadolddata == 1)
									final_set['Title']	 = {"main-title":thvactionBtnTitles['hrpwddecvp'],"sub-title":actionBtnShortTitlesNew[69]};
								else
									final_set['Title']	 = {"main-title":ACTBTNTITLES[actBtnTitle]['hrpwddecvp'],"sub-title":actionBtnShortTitlesNew[69]};

								final_set['firstActBtn']	 = btnvalues['HOROAPPROVE'];
							}
						}else{
							final_set['firstActBtn'] =  btnvalues['HOROAPPROVE']; 
							if(loginentrytype == "F"){
								final_set['secondActBtn'] =  btnvalues['EI'] ;
								if(moduletype !="vp"){
									final_set['promotionBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
								}
							}else
								final_set['secondActBtn'] =  btnvalues['SENDMAIL'];
						}
						final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];
						final_set['TransMsg'] = '';
					break;
					case 70:// HoroPasswordReq Decline-Received
						if(threadolddata == 1)
							final_set['Title']	 = {"main-title":thvactionBtnTitles[70],"sub-title":actionBtnShortTitlesNew[70]};
						else
							final_set['Title']	 = {"main-title":ACTBTNTITLES[actBtnTitle][70],"sub-title":actionBtnShortTitlesNew[70]};

						if(moduletype != 'search' && unifedVerion2 != 1)			
							final_set['firstActBtn'] = btnvalues['VIEWMATCHES'];
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;						
					case 77:// Add Ref Req-Sent
						final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][77],"sub-title":actionBtnShortTitlesNew[77]};
						if(loginentrytype == "F"){
							final_set['promotionBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
							final_set['firstActBtn'] =  btnvalues['EI'] ;
							final_set['promocontent']= bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] =  btnvalues['SENDMAIL'];
						}
						final_set['message']= '';
						final_set['TransMsg']= '';	
					break;
					case 78:// Add Ref Req-Received
						final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][78],"sub-title":actionBtnShortTitlesNew[78]};
						if(loginentrytype == "F"){
							final_set['firstActBtn'] =  btnvalues['EI'];
							final_set['promocontent']= bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set['firstActBtn']= btnvalues['SENDMAIL'];
						}
						final_set['message']= '';
						final_set['TransMsg']= '';
					break;
					case 79:// Ref Req Accepted-Sent
						final_set['Title']				= {"main-title":ACTBTNTITLES[actBtnTitle][79],"sub-title":actionBtnShortTitlesNew[79]};
						if(loginentrytype == "F"){
							final_set['firstActBtn'] =  btnvalues['EI'];
							final_set['promocontent'] =  bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set['firstActBtn'] =  btnvalues['SENDMAIL'];
						}
						final_set['message']= '';
						final_set['TransMsg']= '';
					break;
					case 80:// Ref Req Accepted-Received
						final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][80],"sub-title":actionBtnShortTitlesNew[80]};
						final_set['firstActBtn'] =  btnvalues['VIEWREF'];
						if(loginentrytype == "F")
						{
							final_set['secondActBtn']= btnvalues['EI'];
							final_set['promocontent']= bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set['secondActBtn']= btnvalues['SENDMAIL'];
						}
						final_set['message']= '';
						final_set['TransMsg']= '';
					break;
					case 81:// Ref Req fullfilment-Sent		
						final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][81],"sub-title":actionBtnShortTitlesNew[81]};
						if(loginentrytype == "F"){
							final_set['firstActBtn'] =  btnvalues['EI'];
							final_set['promocontent']= bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set['firstActBtn']= btnvalues['SENDMAIL'];
						}
						final_set['message']= '';
						final_set['TransMsg']= '';
					break;
					case 82:// Ref Req fullfilment-Received
						final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][82],"sub-title":actionBtnShortTitlesNew[82]};
						final_set['firstActBtn'] =  btnvalues['VIEWREF'];
						if(loginentrytype == "F"){
							final_set['secondActBtn'] =  btnvalues['EI'] ;
							final_set['promocontent'] =  bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set['secondActBtn'] =  btnvalues['SENDMAIL'];
						}
						final_set['message']= '';
						final_set['TransMsg']= '';
					break;
					
					//New Request Module
					case 83:// Eating habits Req-Sent 
					if(threadolddata == 1)
						final_set['Title']= {"main-title":thvactionBtnTitles[83],"sub-title":actionBtnShortTitlesNew[83]};
					else
						final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][83],"sub-title":actionBtnShortTitlesNew[83]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn']= btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn']= btnvalues['EI'];
									final_set['secondActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
								}					
							}else{
								final_set['firstActBtn']= btnvalues['EI'];
								final_set['promotionBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];	
							}
							final_set['promocontent']= bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn']= btnvalues['SENDMAIL'];			
							if(unifedVerion2 == 1)
								final_set['secondActBtn']= btnvalues['CALLNOW'];
						}
						final_set['message']= '';
						final_set['TransMsg']= '';				
					break;
					case 84:// Eating habits Req -Received
						if(eatinghabits == 1 && unifedVerion2 == 1){
							if(threadolddata == 1)
								final_set['Title']= {"main-title":bmgeneric.str_replace("$$$","eating habits",thvactionBtnTitles['notifyyesorno']),"sub-title":actionBtnShortTitlesNew[84]};	
							else
								final_set['Title']= {"main-title":bmgeneric.str_replace("$$$","eating habits",ACTBTNTITLES[actBtnTitle]['notifyyesorno']),"sub-title":actionBtnShortTitlesNew[84]};	

							final_set['firstActBtn']= btnvalues['ADDEHACC'];
							final_set['negActBtn']= btnvalues['ADDEHNNI'];
						}else{
							if(threadolddata == 1)
								final_set['Title']= {"main-title":thvactionBtnTitles[84],"sub-title":actionBtnShortTitlesNew[84]};
							else
								final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][84],"sub-title":actionBtnShortTitlesNew[84]};

							final_set['firstActBtn']= btnvalues['ADDINFODET'];
							if(unifedVerion2 == 1){
								final_set['secondActBtn']= btnvalues['ADDEHNI'];
								if(requestThirdAction == 1){
									if(loginentrytype == "F")
										final_set['thirdActBtn']= btnvalues['EI'];
									else
										final_set['thirdActBtn']= btnvalues['SENDMAIL'];
								}
							}else{
								if(loginentrytype == "F"){
									final_set['secondActBtn']= btnvalues['EI'];
									final_set['promocontent']= bmcommlable.defaultMessage['paidpromo'];
									final_set['promotionBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
								}else{
									final_set['secondActBtn']= btnvalues['SENDMAIL'];					
								}
							}
						}
						final_set['message']= '';
						final_set['TransMsg']= '';
					break;
					case 85:// Eating habits fullfilment-Sent
						if(threadolddata == 1)
							final_set['Title']= {"main-title":thvactionBtnTitles[85],"sub-title":actionBtnShortTitlesNew[85]};
						else
							final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][85],"sub-title":actionBtnShortTitlesNew[85]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn']= btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn']= btnvalues['EI'];
									final_set['secondActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
								}					
							}else{
								final_set['firstActBtn']= btnvalues['EI'];
								final_set['promotionBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent']= bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn']= btnvalues['SENDMAIL'];			
							if(unifedVerion2 == 1)
								final_set['secondActBtn']= btnvalues['CALLNOW'];
						}
						final_set['message']= '';
						final_set['TransMsg']= '';					
					break;
					case 86:// Eating habits fullfilment -Received
						if(threadolddata == 1)
							final_set['Title']= {"main-title":thvactionBtnTitles[86],"sub-title":actionBtnShortTitlesNew[86]};
						else
							final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][86],"sub-title":actionBtnShortTitlesNew[86]};

						if(moduletype!= "vp"){
							final_set['firstActBtn']= btnvalues['VIEWNOW'];
							actionBtnVal = "secondActBtn";					
						}else{
							actionBtnVal = "firstActBtn"; 				
						}
						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn']= btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn']= btnvalues['EI'];
									final_set['secondActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
								}
							}else{
								final_set[actionBtnVal]= btnvalues['EI'];
								final_set['promotionBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];		
							}
							final_set['promocontent']= bmcommlable.defaultMessage['paidpromo'];
						}else{
							if(unifedVerion2 == 1){
								final_set['firstActBtn']= btnvalues['SENDMAIL'];			
								final_set['secondActBtn']= btnvalues['CALLNOW'];
							}else
								final_set[actionBtnVal]= btnvalues['SENDMAIL'];
						}
						final_set['message']= '';
						final_set['TransMsg']= '';
						break;
					case 87:// Drinking habits Req-Sent
						if(threadolddata == 1)
							final_set['Title']= {"main-title":thvactionBtnTitles[87],"sub-title":actionBtnShortTitlesNew[87]};
						else
							final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][87],"sub-title":actionBtnShortTitlesNew[87]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn']= btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn']= btnvalues['EI'];
									final_set['secondActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
								}					
							}else{
								final_set['firstActBtn']= btnvalues['EI'];
								final_set['promotionBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent']= bmcommlable.defaultMessage['paidpromo'];

						}else{
							final_set['firstActBtn']= btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn']= btnvalues['CALLNOW'];
						}
						final_set['message']= '';
						final_set['TransMsg']= '';
					break;
					case 88:// Drinking habits Req -Received
						if(drinkinghabits == 1 && unifedVerion2 == 1){
							if(threadolddata == 1)
								final_set['Title']= {"main-title":bmgeneric.str_replace("$$$","drinking habits",thvactionBtnTitles['notifyyesorno']),"sub-title":actionBtnShortTitlesNew[88]};	
							else
								final_set['Title']= {"main-title":bmgeneric.str_replace("$$$","drinking habits",ACTBTNTITLES[actBtnTitle]['notifyyesorno']),"sub-title":actionBtnShortTitlesNew[88]};	

							final_set['firstActBtn']= btnvalues['ADDDHACC'];
							final_set['negActBtn']= btnvalues['ADDDHNNI'];					
						}else{
							if(threadolddata == 1)
								final_set['Title']= {"main-title":thvactionBtnTitles[88],"sub-title":actionBtnShortTitlesNew[88]};
							else
								final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][88],"sub-title":actionBtnShortTitlesNew[88]};

							final_set['firstActBtn']= btnvalues['ADDINFODET'] ;
							if(unifedVerion2 == 1){
								final_set['secondActBtn']= btnvalues['ADDDHNI'];
								if(requestThirdAction == 1){
									if(loginentrytype == "F")
										final_set['thirdActBtn']= btnvalues['EI'];
									else
										final_set['thirdActBtn']= btnvalues['SENDMAIL'];
								}
							}else{
								if(loginentrytype == "F"){
									final_set['secondActBtn']= btnvalues['EI'];
									final_set['promocontent']= bmcommlable.defaultMessage['paidpromo'];
									final_set['promotionBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
								}else{
									final_set['secondActBtn']= btnvalues['SENDMAIL'];	
								}
							}
						}
						final_set['message']= '';
						final_set['TransMsg']= '';
					break;
					case 89:// Drinking habits fullfilment-Sent
						if(threadolddata == 1)
							final_set['Title']= {"main-title":thvactionBtnTitles[89],"sub-title":actionBtnShortTitlesNew[89]};
						else
							final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][89],"sub-title":actionBtnShortTitlesNew[89]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn']= btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn']= btnvalues['EI'];
									final_set['secondActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
								}
							}else{
								final_set['firstActBtn']= btnvalues['EI'];
								final_set['promotionBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];						
							}
							final_set['promocontent']= bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn']= btnvalues['SENDMAIL'];			
							if(unifedVerion2 == 1)
								final_set['secondActBtn']= btnvalues['CALLNOW'];
						}
						final_set['message']= '';
						final_set['TransMsg']= '';		
					break;
					case 90:// Drinking habits fullfilment-Received
						if(threadolddata == 1)
							final_set['Title']= {"main-title":thvactionBtnTitles[90],"sub-title":actionBtnShortTitlesNew[90]};
						else
							final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][90],"sub-title":actionBtnShortTitlesNew[90]};

						if(moduletype!= "vp"){
							final_set['firstActBtn']= btnvalues['VIEWNOW'];
							actionBtnVal = "secondActBtn";
						}else{
							actionBtnVal = "firstActBtn"; 
						}
						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn']= btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn']= btnvalues['EI'];
									final_set['secondActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
								}
							}else{
								final_set[actionBtnVal]= btnvalues['EI'];
								final_set['promotionBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];		
							}
							final_set['promocontent']= bmcommlable.defaultMessage['paidpromo'];	
						}else{
							if(unifedVerion2 == 1){
								final_set['firstActBtn']= btnvalues['SENDMAIL'];			
								final_set['secondActBtn']= btnvalues['CALLNOW'];
							}else
								final_set[actionBtnVal]= btnvalues['SENDMAIL'];
						}
						final_set['message']= '';
						final_set['TransMsg']= '';
						break;
					case 91:// Smoking habits Req-Sent
						if(threadolddata == 1)
							final_set['Title']= {"main-title":thvactionBtnTitles[91],"sub-title":actionBtnShortTitlesNew[91]};
						else
							final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][91],"sub-title":actionBtnShortTitlesNew[91]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn']= btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn']= btnvalues['EI'];
									final_set['secondActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
								}					
							}else{
								final_set['firstActBtn']= btnvalues['EI'];
								final_set['promotionBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent']= bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn']= btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn']= btnvalues['CALLNOW'];
						}
						final_set['message']= '';
						final_set['TransMsg']= '';
					break;
					case 92:// Smoking habits Req -Received
						if(smokinghabits == 1 && unifedVerion2 == 1){
							if(threadolddata == 1)
								final_set['Title']= {"main-title":bmgeneric.str_replace("$$$","smoking habits",thvactionBtnTitles['notifyyesorno']),"sub-title":actionBtnShortTitlesNew[92]};	
							else
								final_set['Title']= {"main-title":bmgeneric.str_replace("$$$","smoking habits",ACTBTNTITLES[actBtnTitle]['notifyyesorno']),"sub-title":actionBtnShortTitlesNew[92]};	

							final_set['firstActBtn']= btnvalues['ADDSHACC'];
							final_set['negActBtn']= btnvalues['ADDSHNNI'];	
						}else{
							if(threadolddata == 1)
								final_set['Title']= {"main-title":thvactionBtnTitles[92],"sub-title":actionBtnShortTitlesNew[92]};
							else
								final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][92],"sub-title":actionBtnShortTitlesNew[92]};

							final_set['firstActBtn']= btnvalues['ADDINFODET'] ;
							if(unifedVerion2 == 1){
								final_set['secondActBtn']= btnvalues['ADDSHNI'];
								if(requestThirdAction == 1){
									if(loginentrytype == "F")
										final_set['thirdActBtn']= btnvalues['EI'];
									else
										final_set['thirdActBtn']= btnvalues['SENDMAIL'];
								}
							}else{
								if(loginentrytype == "F"){
									final_set['secondActBtn']= btnvalues['EI'];
									final_set['promocontent']= bmcommlable.defaultMessage['paidpromo'];
									final_set['promotionBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
								}else{
									final_set['secondActBtn']= btnvalues['SENDMAIL'];
								}
							}
						}
						final_set['message']= '';
						final_set['TransMsg']= '';
					break;
					case 93:// Smoking habits fullfilment-Sent
						if(threadolddata == 1)
							final_set['Title']= {"main-title":thvactionBtnTitles[93],"sub-title":actionBtnShortTitlesNew[93]};
						else
							final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][93],"sub-title":actionBtnShortTitlesNew[93]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn']= btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn']= btnvalues['EI'];
									final_set['secondActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
								}					
							}else{
								final_set['firstActBtn']= btnvalues['EI'];
								final_set['promotionBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];	
							}
							final_set['promocontent']= bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn']= btnvalues['SENDMAIL'];			
							if(unifedVerion2 == 1)
								final_set['secondActBtn']= btnvalues['CALLNOW'];
						}
						final_set['message']= '';
						final_set['TransMsg']= '';		
					break;
					case 94:// Smoking habits fullfilment -Received
						if(threadolddata == 1)
							final_set['Title']= {"main-title":thvactionBtnTitles[94],"sub-title":actionBtnShortTitlesNew[94]};
						else
							final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][94],"sub-title":actionBtnShortTitlesNew[94]};

						if(moduletype!= "vp"){
							final_set['firstActBtn']= btnvalues['VIEWNOW'];
							actionBtnVal = "secondActBtn";
						}else{
							actionBtnVal = "firstActBtn"; 
						}
						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn']= btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn']= btnvalues['EI'];
									final_set['secondActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
								}
							}else{
								final_set[actionBtnVal]= btnvalues['EI'];
								final_set['promotionBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];		
							}
							final_set['promocontent']= bmcommlable.defaultMessage['paidpromo'];	
						}else{
							if(unifedVerion2 == 1){
								final_set['firstActBtn']= btnvalues['SENDMAIL'];			
								final_set['secondActBtn']= btnvalues['CALLNOW'];
							}else
								final_set[actionBtnVal]= btnvalues['SENDMAIL'];
						}
						final_set['message']= '';
						final_set['TransMsg']= '';
						break;
					case 95:// Gothram Req-Sent
						if(threadolddata == 1)
							final_set['Title']= {"main-title":thvactionBtnTitles[95],"sub-title":actionBtnShortTitlesNew[95]};
						else
							final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][95],"sub-title":actionBtnShortTitlesNew[95]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn']= btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn']= btnvalues['EI'];
									final_set['secondActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
								}					
							}else{
								final_set['firstActBtn']= btnvalues['EI'];
								final_set['promotionBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent']= bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn']= btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn']= btnvalues['CALLNOW'];
						}
						final_set['message']= '';
						final_set['TransMsg']= '';
					break;
					case 96:// Gothram Req -Received
						if(gothraavailable == 1 && unifedVerion2 == 1){
							if(threadolddata == 1)
								final_set['Title']= {"main-title":bmgeneric.str_replace("$$$","gothram",thvactionBtnTitles['notifyyesorno']),"sub-title":actionBtnShortTitlesNew[96]};	
							else
								final_set['Title']= {"main-title":bmgeneric.str_replace("$$$","gothram",ACTBTNTITLES[actBtnTitle]['notifyyesorno']),"sub-title":actionBtnShortTitlesNew[96]};	

							final_set['firstActBtn']= btnvalues['ADDGTRAACC'];
							final_set['negActBtn']= btnvalues['ADDGTRANNI'];				
						}else{
							if(threadolddata == 1)
								final_set['Title']= {"main-title":thvactionBtnTitles[96],"sub-title":actionBtnShortTitlesNew[96]};
							else
								final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][96],"sub-title":actionBtnShortTitlesNew[96]};

							final_set['firstActBtn']= btnvalues['ADDINFODET'] ;
							if(unifedVerion2 == 1){
								final_set['secondActBtn']= btnvalues['ADDGTRANI'];
								if(requestThirdAction == 1){
									if(loginentrytype == "F")
										final_set['thirdActBtn']= btnvalues['EI'];
									else
										final_set['thirdActBtn']= btnvalues['SENDMAIL'];
								}
							}else{
								if(loginentrytype == "F"){
									final_set['secondActBtn']= btnvalues['EI'];
									final_set['promocontent']= bmcommlable.defaultMessage['paidpromo'];
									final_set['promotionBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
								}else{
									final_set['secondActBtn']= btnvalues['SENDMAIL'];
								}
							}				
						}
						final_set['message']= '';
						final_set['TransMsg']= '';
					break;
					case 97:// Gothram fullfilment-Sent
						if(threadolddata == 1)
							final_set['Title']= {"main-title":thvactionBtnTitles[97],"sub-title":actionBtnShortTitlesNew[97]};
						else
							final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][97],"sub-title":actionBtnShortTitlesNew[97]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn']= btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn']= btnvalues['EI'];
									final_set['secondActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
								}					
							}else{
								final_set['firstActBtn']= btnvalues['EI'];
								final_set['promotionBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];	
							}
							final_set['promocontent']= bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn']= btnvalues['SENDMAIL'];			
							if(unifedVerion2 == 1)
								final_set['secondActBtn']= btnvalues['CALLNOW'];
						}
						final_set['message']= '';
						final_set['TransMsg']= '';		
					break;
					case 98:// Gothram fullfilment-Received
						if(threadolddata == 1)
							final_set['Title']= {"main-title":thvactionBtnTitles[98],"sub-title":actionBtnShortTitlesNew[98]};
						else
							final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][98],"sub-title":actionBtnShortTitlesNew[98]};

						if(moduletype!= "vp"){
							final_set['firstActBtn']= btnvalues['VIEWNOW'];
							actionBtnVal = "secondActBtn";
						}else{
							actionBtnVal = "firstActBtn"; 
						}
						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn']= btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn']= btnvalues['EI'];
									final_set['secondActBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];
								}
							}else{
								final_set[actionBtnVal]= btnvalues['EI'];
								final_set['promotionBtn']= btnvalues['PAIDPROMOTIONSENDMAIL'];		
							}
							final_set['promocontent']= bmcommlable.defaultMessage['paidpromo'];	
						}else{
							if(unifedVerion2 == 1){
								final_set['firstActBtn']= btnvalues['SENDMAIL'];			
								final_set['secondActBtn']= btnvalues['CALLNOW'];
							}else
								final_set[actionBtnVal]= btnvalues['SENDMAIL'];
						}
						final_set['message']= '';
						final_set['TransMsg']= '';
						break;
					case 99:// Star Req-Sent
						if(threadolddata == 1)
							final_set['Title']= {"main-title":thvactionBtnTitles[99],"sub-title":actionBtnShortTitlesNew[99]};
						else
							final_set['Title']= {"main-title":ACTBTNTITLES[actBtnTitle][99],"sub-title":actionBtnShortTitlesNew[99]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] =  btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}			
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];	
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 100:// Star Req -Received
						if(starrasiavailable == 1 && unifedVerion2 == 1){
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":bmgeneric.str_replace("$$$","star/raasi",thvactionBtnTitles['notifyyesorno']),"sub-title":actionBtnShortTitlesNew[100]};	
							else
								final_set['Title'] =  {"main-title":bmgeneric.str_replace("$$$","star/raasi",ACTBTNTITLES[actBtnTitle]['notifyyesorno']),"sub-title":actionBtnShortTitlesNew[100]};	

							final_set['firstActBtn']	 = btnvalues['ADDSTARACC'];
							final_set['negActBtn'] = btnvalues['ADDSTARNNI'];
						}else{
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles[100],"sub-title":actionBtnShortTitlesNew[100]};
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][100],"sub-title":actionBtnShortTitlesNew[100]};

							final_set['firstActBtn'] = btnvalues['ADDINFODET'] ;
							if(unifedVerion2 == 1){
								final_set['secondActBtn']	 = btnvalues['ADDSTARNI'];
								if(requestThirdAction == 1){
									if(loginentrytype == "F")
										final_set['thirdActBtn'] = btnvalues['EI'];
									else
										final_set['thirdActBtn'] = btnvalues['SENDMAIL'];
								}
							}else{
								if(loginentrytype == "F"){
									final_set['secondActBtn'] = btnvalues['EI'];
									final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
									final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}else{
									final_set['secondActBtn'] = btnvalues['SENDMAIL'];
								}
							}
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 101:// Star fullfilment-Sent
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[101],"sub-title":actionBtnShortTitlesNew[101]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][101],"sub-title":actionBtnShortTitlesNew[101]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] =  btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}					
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];	
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];			
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';		
					break;
					case 102:// Star fullfilment -Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[102],"sub-title":actionBtnShortTitlesNew[102]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][102],"sub-title":actionBtnShortTitlesNew[102]};

						if(moduletype!= "vp"){
							final_set['firstActBtn'] = btnvalues['VIEWNOW'];
							actionBtnVal = "secondActBtn";
						}else{
							actionBtnVal = "firstActBtn"; 
						}
						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] =  btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}
							}else{
								final_set[actionBtnVal] = btnvalues['EI'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];		
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];	
						}else{
							if(unifedVerion2 == 1){
								final_set['firstActBtn'] = btnvalues['SENDMAIL'];			
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
							}else
								final_set[actionBtnVal] = btnvalues['SENDMAIL'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
						break;
					case 103:// Rasi Req-Sent
						final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][103],"sub-title":actionBtnShortTitlesNew[103]};
						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['EI'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 104:// Rasi Req -Received
						final_set['Title'] =  {"main-title":actionBtnTitles[104],"sub-title":actionBtnShortTitles[104]};
							final_set['firstActBtn'] = btnvalues['ADDINFODET'] ;
						if(loginentrytype == "F"){
							final_set['secondActBtn'] = btnvalues['EI'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set['secondActBtn'] = btnvalues['SENDMAIL'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 105:// Rasi fullfilment-Sent
						final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][105],"sub-title":actionBtnShortTitlesNew[105]};
						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['EI'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];					
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];			
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';		
					break;
					case 106:// Rasi fullfilment -Received
						final_set['Title'] =  {"main-title":actionBtnTitles[106],"sub-title":actionBtnShortTitles[106]};
						if(moduletype!= "vp"){
							final_set['firstActBtn'] = btnvalues['VIEWNOW'];
							actionBtnVal = "secondActBtn";
						}else{
							actionBtnVal = "firstActBtn"; 
						}
						if(loginentrytype == "F"){
							final_set[actionBtnVal] = btnvalues['EI'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set[actionBtnVal] = btnvalues['SENDMAIL'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 107:// College/Institution Req-Sent
						final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][107],"sub-title":actionBtnShortTitlesNew[107]};
						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['EI'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 108:// College/Institution Req -Received
						final_set['Title'] =  {"main-title":actionBtnTitles[108],"sub-title":actionBtnShortTitles[108]};
							final_set['firstActBtn'] = btnvalues['ADDINFODET'] ;
						if(loginentrytype == "F"){
							final_set['secondActBtn'] = btnvalues['EI'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set['secondActBtn'] = btnvalues['SENDMAIL'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
				
					case 109:// College/Institution fullfilment-Sent
						final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][109],"sub-title":actionBtnShortTitlesNew[109]};
						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['EI'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];					
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];			
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';		
					break;
					case 110:// College/Institution fullfilment -Received
						final_set['Title'] =  {"main-title":actionBtnTitles[110],"sub-title":actionBtnShortTitles[110]};
						if(moduletype!= "vp"){
							final_set['firstActBtn'] = btnvalues['VIEWNOW'];
							actionBtnVal = "secondActBtn";
						}else{
							actionBtnVal = "firstActBtn"; 
						}
						if(loginentrytype == "F"){
							final_set[actionBtnVal] = btnvalues['EI'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set[actionBtnVal] = btnvalues['SENDMAIL'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 111:// Education Req-Sent
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[111],"sub-title":actionBtnShortTitlesNew[111]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][111],"sub-title":actionBtnShortTitlesNew[111]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] =  btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}					
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];

						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 112:// Education Req -Received
						if(educationavailable == 1 && unifedVerion2 == 1){
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":bmgeneric.str_replace("$$$","education details",thvactionBtnTitles['notifyyesorno']),"sub-title":actionBtnShortTitlesNew[112]};	
							else
								final_set['Title'] =  {"main-title":bmgeneric.str_replace("$$$","education details",ACTBTNTITLES[actBtnTitle]['notifyyesorno']),"sub-title":actionBtnShortTitlesNew[112]};	

							final_set['firstActBtn']	 = btnvalues['ADDEDUACC'];
							final_set['negActBtn'] = btnvalues['ADDEDUNNI'];				
						}else{
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles[112],"sub-title":actionBtnShortTitlesNew[112]};
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][112],"sub-title":actionBtnShortTitlesNew[112]};

							final_set['firstActBtn'] = btnvalues['ADDINFODET'] ;
							if(unifedVerion2 == 1){
								final_set['secondActBtn']	 = btnvalues['ADDEDUNI'];
								if(requestThirdAction == 1){
									if(loginentrytype == "F")
										final_set['thirdActBtn'] = btnvalues['EI'];
									else
										final_set['thirdActBtn'] = btnvalues['SENDMAIL'];
								}
							}else{				
								if(loginentrytype == "F"){
									final_set['secondActBtn'] = btnvalues['EI'];
									final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
									final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}else{
									final_set['secondActBtn'] = btnvalues['SENDMAIL'];
								}
							}
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 113:// Education fullfilment-Sent
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[113],"sub-title":actionBtnShortTitlesNew[113]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][113],"sub-title":actionBtnShortTitlesNew[113]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] =  btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}					
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];		
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];			
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';		
					break;
					case 114:// Education fullfilment -Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[114],"sub-title":actionBtnShortTitlesNew[114]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][114],"sub-title":actionBtnShortTitlesNew[114]};

						if(moduletype!= "vp"){
							final_set['firstActBtn'] = btnvalues['VIEWNOW'];
							actionBtnVal = "secondActBtn";
						}else{
							actionBtnVal = "firstActBtn"; 
						}
						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] =  btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}
							}else{
								final_set[actionBtnVal] = btnvalues['EI'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];		
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];	
						}else{
							if(unifedVerion2 == 1){
								final_set['firstActBtn'] = btnvalues['SENDMAIL'];			
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
							}else
								final_set[actionBtnVal] = btnvalues['SENDMAIL'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
						break;
					case 115:// Occupation Req-Sent
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[115],"sub-title":actionBtnShortTitlesNew[115]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][115],"sub-title":actionBtnShortTitlesNew[115]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] =  btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}					
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 116:// Occupation Req -Received
						if(occupationavailable == 1 && unifedVerion2 == 1){
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":bmgeneric.str_replace("$$$","occupation details",thvactionBtnTitles['notifyyesorno']),"sub-title":actionBtnShortTitlesNew[116]};	
							else
								final_set['Title'] =  {"main-title":bmgeneric.str_replace("$$$","occupation details",ACTBTNTITLES[actBtnTitle]['notifyyesorno']),"sub-title":actionBtnShortTitlesNew[116]};	

							final_set['firstActBtn']	 = btnvalues['ADDOCUPACC'];
							final_set['negActBtn'] = btnvalues['ADDOCUPNNI'];
						}else{
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles[116],"sub-title":actionBtnShortTitlesNew[116]};
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][116],"sub-title":actionBtnShortTitlesNew[116]};

							final_set['firstActBtn'] = btnvalues['ADDINFODET'] ;
							if(unifedVerion2 == 1){
								final_set['secondActBtn']	 = btnvalues['ADDOCUPNI'];
								if(requestThirdAction == 1){
									if(loginentrytype == "F")
										final_set['thirdActBtn'] = btnvalues['EI'];
									else
										final_set['thirdActBtn'] = btnvalues['SENDMAIL'];
								}
							}else{				
								if(loginentrytype == "F"){
									final_set['secondActBtn'] = btnvalues['EI'];
									final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
									final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}else{
									final_set['secondActBtn'] = btnvalues['SENDMAIL'];
								}

							}
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 117:// Occupation fullfilment-Sent
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[117],"sub-title":actionBtnShortTitlesNew[117]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][117],"sub-title":actionBtnShortTitlesNew[117]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] =  btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}					
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];	
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];			
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';		
					break;
					case 118:// Occupation fullfilment -Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[118],"sub-title":actionBtnShortTitlesNew[118]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][118],"sub-title":actionBtnShortTitlesNew[118]};

						if(moduletype!= "vp"){
							final_set['firstActBtn'] = btnvalues['VIEWNOW'];
							actionBtnVal = "secondActBtn";
						}else{
							actionBtnVal = "firstActBtn"; 
						}
						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] =  btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}
							}else{
								final_set[actionBtnVal] = btnvalues['EI'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];		
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];	
						}else{
							if(unifedVerion2 == 1){
								final_set['firstActBtn'] = btnvalues['SENDMAIL'];			
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
							}else
								final_set[actionBtnVal] = btnvalues['SENDMAIL'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
						break;
					case 119:// Annual Income Req-Sent
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[119],"sub-title":actionBtnShortTitlesNew[119]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][119],"sub-title":actionBtnShortTitlesNew[119]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] =  btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}					
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 120:// Annual Income Req -Received
						if(annualincomeavailable == 1 && unifedVerion2 == 1){
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":bmgeneric.str_replace("$$$","annual income",thvactionBtnTitles['notifyyesorno']),"sub-title":actionBtnShortTitlesNew[120]};	
							else
								final_set['Title'] =  {"main-title":bmgeneric.str_replace("$$$","annual income",ACTBTNTITLES[actBtnTitle]['notifyyesorno']),"sub-title":actionBtnShortTitlesNew[120]};	

							final_set['firstActBtn']	 = btnvalues['ADDANIACC'];
							final_set['negActBtn'] = btnvalues['ADDANINNI'];
						}else{
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles[120],"sub-title":actionBtnShortTitlesNew[120]};
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][120],"sub-title":actionBtnShortTitlesNew[120]};

							final_set['firstActBtn'] = btnvalues['ADDINFODET'] ;
							if(unifedVerion2 == 1){
								final_set['secondActBtn']	 = btnvalues['ADDANINI'];
								if(requestThirdAction == 1){
									if(loginentrytype == "F")
										final_set['thirdActBtn'] = btnvalues['EI'];
									else
										final_set['thirdActBtn'] = btnvalues['SENDMAIL'];
								}
							}else{
								if(loginentrytype == "F"){
									final_set['secondActBtn'] = btnvalues['EI'];
									final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
									final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}else{
									final_set['secondActBtn'] = btnvalues['SENDMAIL'];
								}
							}
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;			
					case 121:// Annual Income fullfilment-Sent
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[121],"sub-title":actionBtnShortTitlesNew[121]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][121],"sub-title":actionBtnShortTitlesNew[121]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] =  btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}					
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];	
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];			
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';		
					break;
					case 122:// Annual Income fullfilment-Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[122],"sub-title":actionBtnShortTitlesNew[122]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][122],"sub-title":actionBtnShortTitlesNew[122]};

						if(moduletype!= "vp"){
							final_set['firstActBtn'] = btnvalues['VIEWNOW'];
							actionBtnVal = "secondActBtn";					
						}else{
							actionBtnVal = "firstActBtn"; 					
						}
						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] =  btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}
							}else{
								final_set[actionBtnVal] = btnvalues['EI'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];		
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];		
						}else{
							if(unifedVerion2 == 1){
								final_set['firstActBtn'] = btnvalues['SENDMAIL'];			
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
							}else
								final_set[actionBtnVal] = btnvalues['SENDMAIL'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
						break;
					case 123:// Ancestral Origin Req-Sent
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[123],"sub-title":actionBtnShortTitlesNew[123]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][123],"sub-title":actionBtnShortTitlesNew[123]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] =  btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}					
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];	
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];					
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';			
					break;
					case 124:// Ancestral Origin Req -Received						
						if(ancestorigavailable == 1 && unifedVerion2 == 1){
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":bmgeneric.str_replace("$$$","ancestral origin",thvactionBtnTitles['notifyyesorno']),"sub-title":actionBtnShortTitlesNew[124]};	
							else
								final_set['Title'] =  {"main-title":bmgeneric.str_replace("$$$","ancestral origin",ACTBTNTITLES[actBtnTitle]['notifyyesorno']),"sub-title":actionBtnShortTitlesNew[124]};	

							final_set['firstActBtn'] = btnvalues['ADDANSOACC'];
							final_set['negActBtn'] = btnvalues['ADDANSONNI'];
						}else{
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles[124],"sub-title":actionBtnShortTitlesNew[124]};
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][124],"sub-title":actionBtnShortTitlesNew[124]};

							final_set['firstActBtn'] = btnvalues['ADDINFODET'] ;
							if(unifedVerion2 == 1){
								final_set['secondActBtn']	 = btnvalues['ADDANSONI'];
								if(requestThirdAction == 1){
									if(loginentrytype == "F")
										final_set['thirdActBtn'] = btnvalues['EI'];
									else
										final_set['thirdActBtn'] = btnvalues['SENDMAIL'];
								}
							}else{
								if(loginentrytype == "F"){
									final_set['secondActBtn'] = btnvalues['EI'];
									final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
									final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];		
								}else{
									final_set['secondActBtn'] = btnvalues['SENDMAIL'];		
								}
							}
						}						
						final_set['message'] = '';
						final_set['TransMsg'] = '';		
					break;
					case 125:// Ancestral Origin fullfilment-Sent
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[125],"sub-title":actionBtnShortTitlesNew[125]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][125],"sub-title":actionBtnShortTitlesNew[125]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] =  btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}				
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];			
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';		
					break;
					case 126:// Ancestral Origin fullfilment -Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[126],"sub-title":actionBtnShortTitlesNew[126]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][126],"sub-title":actionBtnShortTitlesNew[126]};

						if(moduletype!= "vp"){
							final_set['firstActBtn'] = btnvalues['VIEWNOW'];
							actionBtnVal = "secondActBtn";
						}else{
							actionBtnVal = "firstActBtn"; 	
						}
						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] =  btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}
							}else{
								final_set[actionBtnVal] = btnvalues['EI'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];		
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];	
						}else{
							if(unifedVerion2 == 1){
								final_set['firstActBtn'] = btnvalues['SENDMAIL'];			
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
							}else
								final_set[actionBtnVal] = btnvalues['SENDMAIL'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
						break;
					case 127:// About My family Req-Sent
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[127],"sub-title":actionBtnShortTitlesNew[127]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][127],"sub-title":actionBtnShortTitlesNew[127]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] =  btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}					
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];	
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';	
					break;
					case 128:// About My family Req -Received
						if(familydescavailable == 1 && unifedVerion2 == 1){
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":bmgeneric.str_replace("$$$","family description",thvactionBtnTitles['notifyyesorno']),"sub-title":actionBtnShortTitlesNew[128]};	
							else
								final_set['Title'] =  {"main-title":bmgeneric.str_replace("$$$","family description",ACTBTNTITLES[actBtnTitle]['notifyyesorno']),"sub-title":actionBtnShortTitlesNew[128]};	

							final_set['firstActBtn']	 = btnvalues['ADDMFMLACC'];
							final_set['negActBtn'] = btnvalues['ADDMFMLNNI'];	
						}else{
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles[128],"sub-title":actionBtnShortTitlesNew[128]};
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][128],"sub-title":actionBtnShortTitlesNew[128]};

							final_set['firstActBtn'] = btnvalues['ADDINFODET'] ;
							final_set['secondActBtn']	 = btnvalues['ADDMFMLNI'];
							if(requestThirdAction == 1){
								if(loginentrytype == "F")
									final_set['thirdActBtn'] = btnvalues['EI'];
								else
									final_set['thirdActBtn'] = btnvalues['SENDMAIL'];
							}
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 129:// About My family Req fullfilment-Sent
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[129],"sub-title":actionBtnShortTitlesNew[129]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][129],"sub-title":actionBtnShortTitlesNew[129]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] =  btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}				
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];	
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];			
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';		
					break;
					case 130:// About My family Req fullfilment -Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[130],"sub-title":actionBtnShortTitlesNew[130]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][130],"sub-title":actionBtnShortTitlesNew[130]};

						if(moduletype!= "vp"){
							final_set['firstActBtn'] = btnvalues['VIEWNOW'];
							actionBtnVal = "secondActBtn";
						}else{
							actionBtnVal = "firstActBtn";
						}
						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] =  btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}
							}else{
								final_set[actionBtnVal] = btnvalues['EI'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];		
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];	
						}else{
							if(unifedVerion2 == 1){
								final_set['firstActBtn'] = btnvalues['SENDMAIL'];			
								final_set['secondActBtn'] = btnvalues['CALLNOW'];
							}else
								final_set[actionBtnVal] = btnvalues['SENDMAIL'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
						break;
					case 131:// Family Details Req-Sent
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[131],"sub-title":actionBtnShortTitles[131]};
						else
							final_set['Title'] =  {"main-title":actionBtnTitles[131],"sub-title":actionBtnShortTitles[131]};

						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['EI'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 132:// Family Details Req -Received
						final_set['Title'] =  {"main-title":actionBtnTitles[132],"sub-title":actionBtnShortTitles[132]};
						final_set['firstActBtn'] = btnvalues['ADDINFO'] ;
						if(loginentrytype == "F"){
							final_set['secondActBtn'] = btnvalues['EI'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set['secondActBtn'] = btnvalues['SENDMAIL'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 133:// Family Details Req fullfilment-Sent
						final_set['Title'] =  {"main-title":actionBtnTitles[133],"sub-title":actionBtnShortTitles[133]};
						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['EI'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 134:// Family Details Req fullfilment-Received
						final_set['Title'] =  {"main-title":actionBtnTitles[134],"sub-title":actionBtnShortTitles[134]};
						if(moduletype!= "vp"){
							final_set['firstActBtn'] = btnvalues['VIEWNOW'];
							actionBtnVal = "secondActBtn";
						}else{
							actionBtnVal = "firstActBtn"; 
						}
						if(loginentrytype == "F"){
							final_set[actionBtnVal] = btnvalues['EI'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set[actionBtnVal] = btnvalues['SENDMAIL'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 135:// Hobbies Req-Sent
						final_set['Title'] =  {"main-title":actionBtnTitles[135],"sub-title":actionBtnShortTitles[135]};
						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['EI'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 136:// Hobbies Req -Received
						final_set['Title'] =  {"main-title":actionBtnTitles[136],"sub-title":actionBtnShortTitles[136]};
							final_set['firstActBtn'] = btnvalues['ADDINFO'] ;
						if(loginentrytype == "F"){
							final_set['secondActBtn'] = btnvalues['EI'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set['secondActBtn'] = btnvalues['SENDMAIL'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 137:// Hobbies Req fullfilment-Sent
						final_set['Title'] =  {"main-title":actionBtnTitles[137],"sub-title":actionBtnShortTitles[137]};
						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['EI'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 138:// Hobbies Req fullfilment-Received
						final_set['Title'] =  {"main-title":actionBtnTitles[138],"sub-title":actionBtnShortTitles[138]};
						if(moduletype!= "vp"){
							final_set['firstActBtn'] = btnvalues['VIEWNOW'];
							actionBtnVal = "secondActBtn";
						}else{
							actionBtnVal = "firstActBtn"; 
						}
						if(loginentrytype == "F"){
							final_set[actionBtnVal] = btnvalues['EI'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set[actionBtnVal] = btnvalues['SENDMAIL'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 139:// Interests Req-Sent
						final_set['Title'] =  {"main-title":actionBtnTitles[139],"sub-title":actionBtnShortTitles[139]};
						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['EI'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 140:// Interests Req -Received
						final_set['Title'] =  {"main-title":actionBtnTitles[140],"sub-title":actionBtnShortTitles[140]};
							final_set['firstActBtn'] = btnvalues['ADDINFO'] ;
						if(loginentrytype == "F"){
							final_set['secondActBtn'] = btnvalues['EI'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set['secondActBtn'] = btnvalues['SENDMAIL'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 141:// Interests fullfilment-Sent
						final_set['Title'] =  {"main-title":actionBtnTitles[141],"sub-title":actionBtnShortTitles[141]};
						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['EI'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 142:// Interests fullfilment -Received					
						final_set['Title'] =  {"main-title":actionBtnTitles[142],"sub-title":actionBtnShortTitles[142]};
						if(moduletype!= "vp"){
							final_set['firstActBtn'] = btnvalues['VIEWNOW'];
							actionBtnVal = "secondActBtn";
						}else{					
							actionBtnVal = "firstActBtn"; 					
						}
						if(loginentrytype == "F"){
							final_set[actionBtnVal] = btnvalues['EI'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];					
						}else{
							final_set[actionBtnVal] = btnvalues['SENDMAIL'];
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 143:// Likes - Sent
						final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][143],"sub-title":actionBtnShortTitlesNew[143]};
						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['EI'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							final_set['BUTTONCNT']			     = 4;
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{	
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['BUTTONCNT']			     = 3;
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 144:// Likes - Received
						final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][144],"sub-title":actionBtnShortTitlesNew[144]};
						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['EI'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							final_set['BUTTONCNT']			     = 4;
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{	
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['BUTTONCNT']			     = 3;
						}
						final_set['message'] = '';
						final_set['TransMsg'] = '';
					break;
					case 167: // message-Accept Sent
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles['messageaccyetreply'],"sub-title":actionBtnShortTitlesNew[167]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]['messageaccyetreply'],"sub-title":actionBtnShortTitlesNew[167]};

						final_set['firstActBtn']	 = btnvalues['MESSAGEREPLY'];
						if(unifedVerion2 == 1)
							final_set['secondActBtn'] = btnvalues['CALLNOW'];
					break;
					case 168:// message Accept Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles['messageacceptrec'],"sub-title":actionBtnShortTitlesNew[168]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]['messageacceptrec'],"sub-title":actionBtnShortTitlesNew[168]};

						if(loginentrytype == "F")
						{
							final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];

							final_set['promocontent'] = bmcommlable.defaultMessage['upgrade'];
						}else{	
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
					break;
					case 169:// Photo Request Declined Sent
					if(photoavailable == 1){
						if(lastaction['LikedStatus'] == 7 || lastaction['LikedStatus'] == 9){
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":bmgeneric.str_replace("#module#","photo",thvactionBtnTitles["profdecsntcm"]),"sub-title":actionBtnShortTitlesNew[169]};	
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["phprofdecsnt"],"sub-title":actionBtnShortTitlesNew[169]};	

							if(moduletype != "LAL")
							{
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["phnotdecvp"],"sub-title":actionBtnShortTitlesNew[169]};	
								final_set['firstActBtn']	 = btnvalues['ADDPHNOTACC'];
							}
							//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];
							final_set['message'] = '';
						}else{
							if(moduletype == "LAL"){
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["phnotdec"],"sub-title":actionBtnShortTitlesNew[169]};
								final_set['message'] = '';		
							}else{
								if(threadolddata == 1)
									final_set['Title'] =  {"main-title":thvactionBtnTitles["phnotdecvp"],"sub-title":actionBtnShortTitlesNew[169]};	
								else
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["phnotdecvp"],"sub-title":actionBtnShortTitlesNew[169]};	

								final_set['firstActBtn']	 = btnvalues['ADDPHNOTACC'];
								//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];	
								final_set['message'] = '';					
							
							}
						}
					}else{
						if(moduletype == "LAL"){
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][169],"sub-title":actionBtnShortTitlesNew[169]};
						}else{
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles[169],"sub-title":actionBtnShortTitlesNew[169]};	
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["phdecvp"],"sub-title":actionBtnShortTitlesNew[169]};	

							final_set['firstActBtn']	 = btnvalues['ADDPHOTOYES'];
						
						}
						final_set['message'] = '';
					}	
					break;
					case 170:// Photo Request Declined Received
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles[170],"sub-title":actionBtnShortTitlesNew[170]};
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][170],"sub-title":actionBtnShortTitlesNew[170]};

							final_set['message'] = '';

							if(unifedVerion2 != 1 && moduletype != 'search'){
								final_set['firstActBtn'] = btnvalues['SEARCHNOW'];
							}
					break;
					case 171:// Horoscope Request Declined Sent
						if(horoscopeavailable == 1){
							if(lastaction['LikedStatus'] == 7 || lastaction['LikedStatus'] == 9){
								if(threadolddata == 1)
									final_set['Title'] =  {"main-title":bmgeneric.str_replace("#module#","horoscope",thvactionBtnTitles["profdecsntcm"]),"sub-title":actionBtnShortTitlesNew[171]};	
								else
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["horoprofdecsnt"],"sub-title":actionBtnShortTitlesNew[171]};	

								if(moduletype != "LAL")
								{
									final_set['firstActBtn']	 = btnvalues['ADDHRNOTACC'];
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["hrnotdecvp"],"sub-title":actionBtnShortTitlesNew[171]};	
								}
								//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];
								final_set['message'] = '';
							}else{
								if(moduletype == "LAL"){
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["hrnotdec"],"sub-title":actionBtnShortTitlesNew[171]};	
									final_set['message'] = '';
								}else{
									if(threadolddata == 1)
										final_set['Title'] =  {"main-title":thvactionBtnTitles["hrnotdecvp"],"sub-title":actionBtnShortTitlesNew[171]};	
									else
										final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["hrnotdecvp"],"sub-title":actionBtnShortTitlesNew[171]};

									final_set['firstActBtn']	 = btnvalues['ADDHRNOTACC'];
									//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];	
									final_set['message'] = '';					
								}
							}
						}else{
							if(moduletype == "LAL"){
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][171],"sub-title":actionBtnShortTitlesNew[171]};					
							}else{
								if(threadolddata == 1)
									final_set['Title'] =  {"main-title":thvactionBtnTitles["hrdecvp"],"sub-title":actionBtnShortTitlesNew[171]};	
								else
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["hrdecvp"],"sub-title":actionBtnShortTitlesNew[171]};

								final_set['firstActBtn']	 = btnvalues['ADDHOROYES'];
								//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];				
							}
							final_set['message'] = '';
						}	
					break;			
					case 172:// Horoscope Request Declined Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[172],"sub-title":actionBtnShortTitlesNew[172]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][172],"sub-title":actionBtnShortTitlesNew[172]};

						final_set['message'] = '';
						
						if(unifedVerion2 != 1 && moduletype != 'search'){
							final_set['firstActBtn'] = btnvalues['SEARCHNOW'];
						}
					break;
					case 173:// Eating Habits Declined Sent
						if(eatinghabits == 1){
							if(lastaction['LikedStatus'] == 7 || lastaction['LikedStatus'] == 9){
								if(threadolddata == 1)
									final_set['Title'] =  {"main-title":bmgeneric.str_replace("#module#","eating habits",thvactionBtnTitles["profdecsntcm"]),"sub-title":actionBtnShortTitlesNew[173]};	
								else
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["ehnotdec"],"sub-title":actionBtnShortTitlesNew[173]};	

								if(moduletype != "LAL")
								{
									final_set['firstActBtn']	 = btnvalues['ADDEHNOTACCYES'];
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["ehnotdecvp"],"sub-title":actionBtnShortTitlesNew[173]};
								}
								//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];
								final_set['message'] = '';
							}else{
								if(moduletype == "LAL"){
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["ehnotdec"],"sub-title":actionBtnShortTitlesNew[173]};
									final_set['message'] = '';				
								}else{
									if(threadolddata == 1)
										final_set['Title'] =  {"main-title":thvactionBtnTitles["ehnotdecvp"],"sub-title":actionBtnShortTitlesNew[173]};	
									else
										final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["ehnotdecvp"],"sub-title":actionBtnShortTitlesNew[173]};	

									final_set['firstActBtn']	 = btnvalues['ADDEHNOTACCYES'];
									//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];		
									final_set['message'] = '';					
								}
							}
						}else{
							if(moduletype == "LAL"){
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][173],"sub-title":actionBtnShortTitlesNew[173]};			
							}else{
								if(threadolddata == 1)
									final_set['Title'] =  {"main-title":thvactionBtnTitles["ehdecvp"],"sub-title":actionBtnShortTitlesNew[173]};	
								else
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["ehdecvp"],"sub-title":actionBtnShortTitlesNew[173]};	

								final_set['firstActBtn']	 = btnvalues['ADDINFO'];				
							}
							final_set['message'] = '';
						}		
					break;
					case 174:// Eating Habits Declined Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[174],"sub-title":actionBtnShortTitlesNew[174]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][174],"sub-title":actionBtnShortTitlesNew[174]};

						final_set['message'] = '';

						if(unifedVerion2 != 1 && moduletype != 'search'){
							final_set['firstActBtn'] = btnvalues['SEARCHNOW'];
						}
					break;
					case 175:// Drinking Habits Declined Sent
						if(drinkinghabits == 1){
							if(lastaction['LikedStatus'] == 7 || lastaction['LikedStatus'] == 9){
								if(threadolddata == 1)
									final_set['Title'] =  {"main-title":bmgeneric.str_replace("#module#","drinking habits",thvactionBtnTitles["profdecsntcm"]),"sub-title":actionBtnShortTitlesNew[175]};
								else
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["dhnotdec"],"sub-title":actionBtnShortTitlesNew[175]};

								if(moduletype != "LAL")
								{
									final_set['firstActBtn']	 = btnvalues['ADDDHNOTACCYES'];
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["dhnotdecvp"],"sub-title":actionBtnShortTitlesNew[175]};
								}
								//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];
								final_set['message'] = '';
							}else{
								if(moduletype == "LAL"){
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["dhnotdec"],"sub-title":actionBtnShortTitlesNew[175]};
									final_set['message'] = '';				
								}else{
									if(threadolddata == 1)
										final_set[	'Title'] =  {"main-title":thvactionBtnTitles["dhnotdecvp"],"sub-title":actionBtnShortTitlesNew[175]};	
									else
										final_set[	'Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["dhnotdecvp"],"sub-title":actionBtnShortTitlesNew[175]};	

									final_set['firstActBtn']	 = btnvalues['ADDDHNOTACCYES'];
									//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];
									final_set['message'] = '';					
								}
							}
						}else{
							if(moduletype == "LAL"){
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][175],"sub-title":actionBtnShortTitlesNew[175]};					
							}else{
								if(threadolddata == 1)
									final_set['Title'] =  {"main-title":thvactionBtnTitles["dhdecvp"],"sub-title":actionBtnShortTitlesNew[175]};	
								else
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["dhdecvp"],"sub-title":actionBtnShortTitlesNew[175]};	

								final_set['firstActBtn']	 = btnvalues['ADDINFO'];
								//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];					
							}
							final_set['message'] = '';
						}
					break;
					case 176:// Drinking Habits Declined Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[176],"sub-title":actionBtnShortTitlesNew[176]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][176],"sub-title":actionBtnShortTitlesNew[176]};

						final_set['message'] = '';

						if(unifedVerion2 != 1 && moduletype != 'search'){
							final_set['firstActBtn'] = btnvalues['SEARCHNOW'];
						}
					break;
					case 177:// Smoking Habits Declined Sent
						if(smokinghabits == 1){
							if(lastaction['LikedStatus'] == 7 || lastaction['LikedStatus'] == 9){
								if(threadolddata == 1)
									final_set['Title'] =  {"main-title":bmgeneric.str_replace("#module#","smoking habits",thvactionBtnTitles["profdecsntcm"]),"sub-title":actionBtnShortTitlesNew[177]};
								else
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["shnotdec"],"sub-title":actionBtnShortTitlesNew[177]};

								if(moduletype != "LAL")
								{
									final_set['firstActBtn']	 = btnvalues['ADDSHNOTACCYES'];
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["shnotdecvp"],"sub-title":actionBtnShortTitlesNew[177]};
								}
								//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];
								final_set['message'] = '';
							}else{
								if(moduletype == "LAL"){
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["shnotdec"],"sub-title":actionBtnShortTitlesNew[177]};
									final_set['message'] = '';					
								}else{
									if(threadolddata == 1)
										final_set['Title'] =  {"main-title":thvactionBtnTitles["shnotdecvp"],"sub-title":actionBtnShortTitlesNew[177]};	
									else
										final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["shnotdecvp"],"sub-title":actionBtnShortTitlesNew[177]};	

									final_set['firstActBtn']	 = btnvalues['ADDSHNOTACCYES'];
									//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];	
									final_set['message'] = '';					
								}
							}
						}else{
							if(moduletype == "LAL"){
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][177],"sub-title":actionBtnShortTitlesNew[177]};					
							}else{
								if(threadolddata == 1)
									final_set['Title'] =  {"main-title":thvactionBtnTitles["shdecvp"],"sub-title":actionBtnShortTitlesNew[177]};	
								else
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["shdecvp"],"sub-title":actionBtnShortTitlesNew[177]};	

								final_set['firstActBtn']	 = btnvalues['ADDINFO'];
								//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];				
							}
							final_set['message'] = '';
						}
					break;			
					case 178:// Smoking Habits Declined Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[178],"sub-title":actionBtnShortTitlesNew[178]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][178],"sub-title":actionBtnShortTitlesNew[178]};

						final_set['message'] = '';

						if(unifedVerion2 != 1 && moduletype != 'search'){
							final_set['firstActBtn'] = btnvalues['SEARCHNOW'];
						}
					break;
					case 179:// Gothram Request Declined Sent
						if(gothraavailable == 1){
							if(lastaction['LikedStatus'] == 7 || lastaction['LikedStatus'] == 9){
								if(threadolddata == 1)
									final_set['Title'] =  {"main-title":bmgeneric.str_replace("#module#","gothram",thvactionBtnTitles["profdecsntcm"]),"sub-title":actionBtnShortTitlesNew[179]};
								else
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["gthnotdec"],"sub-title":actionBtnShortTitlesNew[179]};

								if(moduletype != "LAL")
								{
									final_set['firstActBtn']	 = btnvalues['ADDGTRANOTACCYES'];
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["gthnotdecvp"],"sub-title":actionBtnShortTitlesNew[179]};
								}
								//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];
								final_set['message'] = '';
							}else{
								if(moduletype == "LAL"){
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["gthnotdec"],"sub-title":actionBtnShortTitlesNew[179]};	
									final_set['message'] = '';						
								}else{
									if(threadolddata == 1)
										final_set['Title'] =  {"main-title":thvactionBtnTitles["gthnotdecvp"],"sub-title":actionBtnShortTitlesNew[179]};	
									else
										final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["gthnotdecvp"],"sub-title":actionBtnShortTitlesNew[179]};	

									final_set['firstActBtn']	 = btnvalues['ADDGTRANOTACCYES'];
									//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];	
									final_set['message'] = '';					
								}
							}
						}else{
							if(moduletype == "LAL"){
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][179],"sub-title":actionBtnShortTitlesNew[179]};					
							}else{
								if(threadolddata == 1)
									final_set['Title'] =  {"main-title":thvactionBtnTitles["gthdecvp"],"sub-title":actionBtnShortTitlesNew[179]};	
								else
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["gthdecvp"],"sub-title":actionBtnShortTitlesNew[179]};	

								final_set['firstActBtn']	 = btnvalues['ADDINFO'];
								//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];					
							}
							final_set['message'] = '';
						}	
					break;
					case 180:// Gothram Request Declined Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[180],"sub-title":actionBtnShortTitlesNew[180]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][180],"sub-title":actionBtnShortTitlesNew[180]};

						final_set['message'] = '';

						if(unifedVerion2 != 1 && moduletype != 'search'){
							final_set['firstActBtn'] = btnvalues['SEARCHNOW'];
						}
					break;
					case 181:// Star Request Declined Sent
						if(starrasiavailable == 1){
							if(lastaction['LikedStatus'] == 7 || lastaction['LikedStatus'] == 9){
								if(threadolddata == 1)
									final_set['Title'] =  {"main-title":bmgeneric.str_replace("#module#","star/raasi",thvactionBtnTitles["profdecsntcm"]),"sub-title":actionBtnShortTitlesNew[181]};
								else
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["strnotdec"],"sub-title":actionBtnShortTitlesNew[181]};

								if(moduletype != "LAL")
								{
									final_set['firstActBtn']	 = btnvalues['ADDSTARNOTACCYES'];
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["strnotdecvp"],"sub-title":actionBtnShortTitlesNew[181]};
								}
								//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];
								final_set['message'] = '';
							}else{
								if(moduletype == "LAL"){
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["strnotdec"],"sub-title":actionBtnShortTitlesNew[181]};	
									final_set['message'] = '';					
								}else{
									if(threadolddata == 1)
										final_set['Title'] =  {"main-title":thvactionBtnTitles["strnotdecvp"],"sub-title":actionBtnShortTitlesNew[181]};	
									else
										final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["strnotdecvp"],"sub-title":actionBtnShortTitlesNew[181]};	

									final_set['firstActBtn']	 = btnvalues['ADDSTARNOTACCYES'];
									//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];	
									final_set['message'] = '';					
								}
							}
						}else{
							if(moduletype == "LAL"){
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][181],"sub-title":actionBtnShortTitlesNew[181]};					
							}else{
								if(threadolddata == 1)
									final_set['Title'] =  {"main-title":thvactionBtnTitles["strdecvp"],"sub-title":actionBtnShortTitlesNew[181]};	
								else
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["strdecvp"],"sub-title":actionBtnShortTitlesNew[181]};	

								final_set['firstActBtn']	 = btnvalues['ADDINFO'];
								//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];
							}
							final_set['message'] = '';
						}	
					break;
					case 182:// Star Request Declined Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[182],"sub-title":actionBtnShortTitlesNew[182]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][182],"sub-title":actionBtnShortTitlesNew[182]};

						final_set['message'] = '';

						if(unifedVerion2 != 1 && moduletype != 'search'){
							final_set['firstActBtn'] = btnvalues['SEARCHNOW'];
						}
					break;
					case 183:// Raasi Request Declined Sent
					break;			
					case 184:// Raasi Request Declined Received
					break;
					case 185://College OR Institution Declined Sent
					break;
					case 186://College OR Institution Declined Received
					break;
					case 187:// Education Request Declined Sent.
						if(educationavailable == 1){
							if(lastaction['LikedStatus'] == 7 || lastaction['LikedStatus'] == 9){
								if(threadolddata == 1)
									final_set['Title'] =  {"main-title":bmgeneric.str_replace("#module#","education details",thvactionBtnTitles["profdecsntcm"]),"sub-title":actionBtnShortTitlesNew[187]};
								else
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["edunotdec"],"sub-title":actionBtnShortTitlesNew[187]};

								if(moduletype != "LAL")
								{
									final_set['firstActBtn']	 = btnvalues['ADDEDUNOTACCYES'];
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["edunotdecvp"],"sub-title":actionBtnShortTitlesNew[187]};
								}
								//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];
								final_set['message'] = '';
							}else{
								if(moduletype == "LAL"){
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["edunotdec"],"sub-title":actionBtnShortTitlesNew[187]};	
									final_set['message'] = '';					
								}else{
									if(threadolddata == 1)
										final_set['Title'] =  {"main-title":thvactionBtnTitles["edunotdecvp"],"sub-title":actionBtnShortTitlesNew[187]};	
									else
										final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["edunotdecvp"],"sub-title":actionBtnShortTitlesNew[187]};	

									final_set['firstActBtn']	 = btnvalues['ADDEDUNOTACCYES'];
									//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];	
									final_set['message'] = '';					
								}
							}
						}else{
							if(moduletype == "LAL"){
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][187],"sub-title":actionBtnShortTitlesNew[187]};					
							}else{
								if(threadolddata == 1)
									final_set['Title'] =  {"main-title":thvactionBtnTitles["edudecvp"],"sub-title":actionBtnShortTitlesNew[187]};	
								else
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["edudecvp"],"sub-title":actionBtnShortTitlesNew[187]};	

								final_set['firstActBtn']	 = btnvalues['ADDINFO'];
								//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];
							}
							final_set['message'] = '';
						}
					break;
					case 188:// Education Request Declined Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[188],"sub-title":actionBtnShortTitlesNew[188]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][188],"sub-title":actionBtnShortTitlesNew[188]};

						final_set['message'] = '';

						if(unifedVerion2 != 1 && moduletype != 'search'){
							final_set['firstActBtn'] = btnvalues['SEARCHNOW'];
						}
					break;
					case 189:// Occupation Request Declined Sent
						if(occupationavailable == 1){
							if(lastaction['LikedStatus'] == 7 || lastaction['LikedStatus'] == 9){
								if(threadolddata == 1)
									final_set['Title'] =  {"main-title":bmgeneric.str_replace("#module#","occupation details",thvactionBtnTitles["profdecsntcm"]),"sub-title":actionBtnShortTitlesNew[189]};
								else
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["ocunotdec"],"sub-title":actionBtnShortTitlesNew[189]};

								if(moduletype != "LAL")
								{
									final_set['firstActBtn']	 = btnvalues['ADDOCUPNOTACCYES'];
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["ocunotdecvp"],"sub-title":actionBtnShortTitlesNew[189]};
								}
								//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];
								final_set['message'] = '';
							}else{
								if(moduletype == "LAL"){
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["ocunotdec"],"sub-title":actionBtnShortTitlesNew[189]};
									final_set['message'] = '';					
								}else{
									if(threadolddata == 1)
										final_set['Title'] =  {"main-title":thvactionBtnTitles["ocunotdecvp"],"sub-title":actionBtnShortTitlesNew[189]};	
									else
										final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["ocunotdecvp"],"sub-title":actionBtnShortTitlesNew[189]};

									final_set['firstActBtn']	 = btnvalues['ADDOCUPNOTACCYES'];
									//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];	
									final_set['message'] = '';					
								}
							}
						}else{
							if(moduletype == "LAL"){
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][189],"sub-title":actionBtnShortTitlesNew[189]};					
							}else{
								if(threadolddata == 1)
									final_set['Title'] =  {"main-title":thvactionBtnTitles["ocudecvp"],"sub-title":actionBtnShortTitlesNew[189]};	
								else
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["ocudecvp"],"sub-title":actionBtnShortTitlesNew[189]};	

								final_set['firstActBtn']	 = btnvalues['ADDINFO'];
								//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];
								final_set['message'] = '';					
							}
							final_set['message'] = '';
						}
					break;			
					case 190:// Occupation Request Declined Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[190],"sub-title":actionBtnShortTitlesNew[190]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][190],"sub-title":actionBtnShortTitlesNew[190]};

						final_set['message'] = '';

						if(unifedVerion2 != 1 && moduletype != 'search'){
							final_set['firstActBtn'] = btnvalues['SEARCHNOW'];
						}
					break;
					case 191:// Annual Income Request Declined Sent
						if(annualincomeavailable == 1){
							if(lastaction['LikedStatus'] == 7 || lastaction['LikedStatus'] == 9){
								if(threadolddata == 1)
									final_set['Title'] =  {"main-title":bmgeneric.str_replace("#module#","annual income",thvactionBtnTitles["profdecsntcm"]),"sub-title":actionBtnShortTitlesNew[191]};
								else
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["ainotdec"],"sub-title":actionBtnShortTitlesNew[191]};

								if(moduletype != "LAL")
								{
									final_set['firstActBtn']	 = btnvalues['ADDANINOTACCYES'];
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["ainotdecvp"],"sub-title":actionBtnShortTitlesNew[191]};
								}
								//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];
								final_set['message'] = '';
							}else{
								if(moduletype == "LAL"){
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["ainotdec"],"sub-title":actionBtnShortTitlesNew[191]};
									final_set['message'] = '';					
								}else{
									if(threadolddata == 1)
										final_set['Title'] =  {"main-title":thvactionBtnTitles["ainotdecvp"],"sub-title":actionBtnShortTitlesNew[191]};	
									else
										final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["ainotdecvp"],"sub-title":actionBtnShortTitlesNew[191]};	

									final_set['firstActBtn']	 = btnvalues['ADDANINOTACCYES'];
									//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];		
									final_set['message'] = '';					
								}
							}
						}else{
							if(moduletype == "LAL"){
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][191],"sub-title":actionBtnShortTitlesNew[191]};					
							}else{
								if(threadolddata == 1)
									final_set['Title'] =  {"main-title":thvactionBtnTitles["aidecvp"],"sub-title":actionBtnShortTitlesNew[191]};	
								else
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["aidecvp"],"sub-title":actionBtnShortTitlesNew[191]};	

								final_set['firstActBtn']	 = btnvalues['ADDINFO'];
								//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];
							}
							final_set['message'] = '';
						}
					break;	
					case 192:// Annual Income Request Declined Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[192],"sub-title":actionBtnShortTitlesNew[192]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][192],"sub-title":actionBtnShortTitlesNew[192]};

						final_set['message'] = '';

						if(unifedVerion2 != 1 && moduletype != 'search'){
							final_set['firstActBtn'] = btnvalues['SEARCHNOW'];
						}
					break;
					case 193:// AncestralOrigin Request Declined Sent
						if(ancestorigavailable == 1){
							if(lastaction['LikedStatus'] == 7 || lastaction['LikedStatus'] == 9){
								if(threadolddata == 1)
									final_set['Title'] =  {"main-title":bmgeneric.str_replace("#module#","ancestral origin",thvactionBtnTitles["profdecsntcm"]),"sub-title":actionBtnShortTitlesNew[193]};
								else
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["ansnotdec"],"sub-title":actionBtnShortTitlesNew[193]};

								if(moduletype != "LAL")
								{
									final_set['firstActBtn']	 = btnvalues['ADDANSONOTACCYES'];
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["ansnotdecvp"],"sub-title":actionBtnShortTitlesNew[193]};
								}
								//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];
								final_set['message'] = '';
							}else{
								if(moduletype == "LAL"){
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["ansnotdec"],"sub-title":actionBtnShortTitlesNew[193]};
									final_set['message'] = '';					
								}else{
									if(threadolddata == 1)
										final_set['Title'] =  {"main-title":thvactionBtnTitles["ansnotdecvp"],"sub-title":actionBtnShortTitlesNew[193]};
									else
										final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["ansnotdecvp"],"sub-title":actionBtnShortTitlesNew[193]};

									final_set['firstActBtn']	 = btnvalues['ADDANSONOTACCYES'];
									//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];	
									final_set['message'] = '';					
								}
							}
						}else{
							if(moduletype == "LAL"){
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][193],"sub-title":actionBtnShortTitlesNew[193]};					
							}else{
								if(threadolddata == 1)
									final_set['Title'] =  {"main-title":thvactionBtnTitles["ansdecvp"],"sub-title":actionBtnShortTitlesNew[193]};	
								else
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["ansdecvp"],"sub-title":actionBtnShortTitlesNew[193]};	

								final_set['firstActBtn']	 = btnvalues['ADDINFO'];					
							}
							final_set['message'] = '';
						}
					break;
					case 194:// AncestralOrigin Request Declined Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[194],"sub-title":actionBtnShortTitlesNew[194]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][194],"sub-title":actionBtnShortTitlesNew[194]};

						final_set['message'] = '';

						if(unifedVerion2 != 1 && moduletype != 'search'){
							final_set['firstActBtn'] = btnvalues['SEARCHNOW'];
						}
					break;
					case 195:// AboutMyFamily Request Declined Sent
						if(familydescavailable == 1){
							if(lastaction['LikedStatus'] == 7 || lastaction['LikedStatus'] == 9){
								if(threadolddata == 1)
									final_set['Title'] =  {"main-title":bmgeneric.str_replace("#module#","family description",thvactionBtnTitles["profdecsntcm"]),"sub-title":actionBtnShortTitlesNew[195]};
								else
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["amfnotdec"],"sub-title":actionBtnShortTitlesNew[195]};

								if(moduletype != "LAL")
								{
									final_set['firstActBtn']	 = btnvalues['ADDMFMLNOTACCYES'];
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["amfnotdecvp"],"sub-title":actionBtnShortTitlesNew[195]};
								}
								//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];
								final_set['message'] = '';
							}else{
								if(moduletype == "LAL"){
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["amfnotdec"],"sub-title":actionBtnShortTitlesNew[195]};
									final_set['message'] = '';					
								}else{
									if(threadolddata == 1)
										final_set['Title'] =  {"main-title":thvactionBtnTitles["amfnotdecvp"],"sub-title":actionBtnShortTitlesNew[195]};
									else
										final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["amfnotdecvp"],"sub-title":actionBtnShortTitlesNew[195]};

									final_set['firstActBtn']	 = btnvalues['ADDMFMLNOTACCYES'];
									//final_set['message'] =  bmcommlable.defaultMessage['ChangeMind'];
									final_set['message'] = '';					
								}
							}
						}else{
							if(moduletype == "LAL"){
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][195],"sub-title":actionBtnShortTitlesNew[195]};					
							}else{
								if(threadolddata == 1)
									final_set['Title'] =  {"main-title":thvactionBtnTitles["amfdecvp"],"sub-title":actionBtnShortTitlesNew[195]};	
								else
									final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["amfdecvp"],"sub-title":actionBtnShortTitlesNew[195]};	

								final_set['firstActBtn']	 = btnvalues['ADDINFO'];					
							}
							final_set['message'] = '';
						}
					break;			
					case 196:// AboutMyFamily Request Declined Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[196],"sub-title":actionBtnShortTitlesNew[196]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][196],"sub-title":actionBtnShortTitlesNew[196]};

						final_set['message'] = '';

						if(unifedVerion2 != 1 && moduletype != 'search'){
							final_set['firstActBtn'] = btnvalues['SEARCHNOW'];
						}
					break;
					case 197:// FamilyDetails Request Declined Sent
					break;
					case 198:// FamilyDetails Request Declined Received
					break;
					case 199:// Hobbies Request Declined Sent
					break;
					case 200:// Hobbies Request Declined Received
					break;
					case 201:// Interests Request Declined Sent
					break;			
					case 202:// Interests Request Declined Received
					break;
					case 203:// ViewPhone Accept Sent
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[203],"sub-title":actionBtnShortTitlesNew[203]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][203],"sub-title":actionBtnShortTitlesNew[203]};

						if(loginentrytype == "F"){
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
								if(unifedVerion2 == 1)
									final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							if(unifedVerion2 == 1)
								final_set['firstActBtn'] = btnvalues['CALLNOW'];
							final_set['secondActBtn'] = btnvalues['SENDMAIL'];

						}
						final_set['message'] = '';
					break;		
					case 204:// ViewPhone Accept Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[204],"sub-title":actionBtnShortTitlesNew[204]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][204],"sub-title":actionBtnShortTitlesNew[204]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1)
								final_set['firstActBtn'] = btnvalues['CALLNOW'];
							final_set['secondActBtn'] = btnvalues['EI'] ;
							
							if(btnvalues['EI'] == '')
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							if(unifedVerion2 == 1)
								final_set['firstActBtn'] = btnvalues['CALLNOW'];
							final_set['secondActBtn'] = btnvalues['SENDMAIL'];
						}
						final_set['message'] = '';
					break;			
					case 205:// ViewPhone Declined Sent
						if(moduletype == 'LAL')
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]['phviewdeclal'],"sub-title":actionBtnShortTitlesNew[205]};
						else{
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles[205],"sub-title":actionBtnShortTitlesNew[205]};
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][205],"sub-title":actionBtnShortTitlesNew[205]};

							final_set['firstActBtn']	 = btnvalues['VIEWPHYES'];
						}
						final_set['message'] =  '';
					break;
					case 206:// ViewPhone Declined Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[206],"sub-title":actionBtnShortTitlesNew[206]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][206],"sub-title":actionBtnShortTitlesNew[206]};

						final_set['message'] = '';

						if(unifedVerion2 != 1 && moduletype != 'search'){
							final_set['firstActBtn'] = btnvalues['SEARCHNOW'];
						}
					break;
					case 207:// Eating Habits Notify Accept Sent
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[207],"sub-title":actionBtnShortTitlesNew[207]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][207],"sub-title":actionBtnShortTitlesNew[207]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] =  btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}					
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 208:// Eating Habits Notify Accept Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[208],"sub-title":actionBtnShortTitlesNew[208]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][208],"sub-title":actionBtnShortTitlesNew[208]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] =  btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}					
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 209:// Drinking Habits Notify Accept Sent
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[209],"sub-title":actionBtnShortTitlesNew[209]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][209],"sub-title":actionBtnShortTitlesNew[209]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] =  btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}					
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 210:// Drinking Habits Notify Accept Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[210],"sub-title":actionBtnShortTitlesNew[210]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][210],"sub-title":actionBtnShortTitlesNew[210]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] =  btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}					
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 211:// Smoking Habits Notify Accept Sent
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[211],"sub-title":actionBtnShortTitlesNew[211]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][211],"sub-title":actionBtnShortTitlesNew[211]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] =  btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}					
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 212:// Smoking Habits Notify Accept Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[212],"sub-title":actionBtnShortTitlesNew[212]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][212],"sub-title":actionBtnShortTitlesNew[212]};

						if(loginentrytype == "F"){
							if(unifedVerion2 == 1){
								if(lastaction[partnerid]['interestcomstatus'] > 0){
									final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
									final_set['secondActBtn'] =  btnvalues['CALLNOW'];
								}else{
									final_set['firstActBtn'] = btnvalues['EI'];
									final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
								}					
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 213:// Gothram Request Notify Accept Sent
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[213],"sub-title":actionBtnShortTitlesNew[213]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][213],"sub-title":actionBtnShortTitlesNew[213]};

						if(loginentrytype == "F"){							
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}	
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 214:// Gothram Request Notify Accept Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[214],"sub-title":actionBtnShortTitlesNew[214]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][214],"sub-title":actionBtnShortTitlesNew[214]};

						if(loginentrytype == "F"){							
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}					
							
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 215:// Star Request Notify Accept Sent
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[215],"sub-title":actionBtnShortTitlesNew[215]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][215],"sub-title":actionBtnShortTitlesNew[215]};

						if(loginentrytype == "F"){							
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 216:// Star Request Notify Accept Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[216],"sub-title":actionBtnShortTitlesNew[216]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][216],"sub-title":actionBtnShortTitlesNew[216]};

						if(loginentrytype == "F"){
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}	
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 217:// Raasi Request Notify Accept Sent
						final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][217],"sub-title":actionBtnShortTitlesNew[217]};
						if(loginentrytype == "F"){							
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 218:// Raasi Request Notify Accept Received
						final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][218],"sub-title":actionBtnShortTitlesNew[218]};
						if(loginentrytype == "F"){
							
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}	
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)	
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 219://College OR Institution Notify Accept Sent
						final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][219],"sub-title":actionBtnShortTitlesNew[219]};
						if(loginentrytype == "F"){							
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 220://College OR Institution Notify Accept Received
						final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][220],"sub-title":actionBtnShortTitlesNew[220]};
						if(loginentrytype == "F"){							
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}	
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 221:// Education Request Notify Accept Sent
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[221],"sub-title":actionBtnShortTitlesNew[221]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][221],"sub-title":actionBtnShortTitlesNew[221]};

						if(loginentrytype == "F"){							
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}					
							
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 222:// Education Request Notify Accept Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[222],"sub-title":actionBtnShortTitlesNew[222]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][222],"sub-title":actionBtnShortTitlesNew[222]};

						if(loginentrytype == "F"){							
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}					
							
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 223:// Occupation Request Notify Accept Sent
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[223],"sub-title":actionBtnShortTitlesNew[223]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][223],"sub-title":actionBtnShortTitlesNew[223]};

						if(loginentrytype == "F"){							
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 224:// Occupation Request Notify Accept Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[224],"sub-title":actionBtnShortTitlesNew[224]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][224],"sub-title":actionBtnShortTitlesNew[224]};

						if(loginentrytype == "F"){							
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}					
						
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 225:// Annual Income Request Notify Accept Sent
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[225],"sub-title":actionBtnShortTitlesNew[225]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][225],"sub-title":actionBtnShortTitlesNew[225]};

						if(loginentrytype == "F"){							
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}					
							
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 226:// Annual Income Request Notify Accept Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[226],"sub-title":actionBtnShortTitlesNew[226]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][226],"sub-title":actionBtnShortTitlesNew[226]};

						if(loginentrytype == "F"){
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}					
							
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 227:// AncestralOrigin Request Accept Sent
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[227],"sub-title":actionBtnShortTitlesNew[227]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][227],"sub-title":actionBtnShortTitlesNew[227]};

						if(loginentrytype == "F"){							
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}					
							
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 228:// AncestralOrigin Request Notify Accept Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[228],"sub-title":actionBtnShortTitlesNew[228]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][228],"sub-title":actionBtnShortTitlesNew[228]};

						if(loginentrytype == "F"){							
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 229:// AboutMyFamily Request Notify Accept Sent
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[229],"sub-title":actionBtnShortTitlesNew[229]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][229],"sub-title":actionBtnShortTitlesNew[229]};

						if(loginentrytype == "F"){							
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 230:// AboutMyFamily Request Notify Accept Received
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles[230],"sub-title":actionBtnShortTitlesNew[230]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][230],"sub-title":actionBtnShortTitlesNew[230]};

						if(loginentrytype == "F"){							
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}	
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 231:// FamilyDetails Request Notify Accept Sent
						final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][231],"sub-title":actionBtnShortTitlesNew[231]};
						if(loginentrytype == "F"){							
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}	
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 232:// FamilyDetails Request Notify Accept Received
						final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][232],"sub-title":actionBtnShortTitlesNew[232]};
						if(loginentrytype == "F"){
							if(lastaction[partnerid]['interestcomstatus'] > 0){
								final_set['firstActBtn'] =  btnvalues['PAIDPROMOTIONSENDMAIL'];
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							}else{
								final_set['firstActBtn'] = btnvalues['EI'];
								final_set['secondActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							}	
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 233:// Hobbies Request Notify Accept Sent
						final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][233],"sub-title":actionBtnShortTitlesNew[233]};
						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['EI'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 234:// Hobbies Request Notify Accept Received
						final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][234],"sub-title":actionBtnShortTitlesNew[234]};
						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['EI'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 235:// Interests Request Notify Accept Sent
						final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][235],"sub-title":actionBtnShortTitlesNew[235]};
						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['EI'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 236:// Interests Request Notify Accept Received
						final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle][236],"sub-title":actionBtnShortTitlesNew[236]};
						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['EI'];
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							final_set['promotionBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 237://Opp Profile Photo added but action pending
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles['phoppadded'],"sub-title":actionBtnShortTitlesNew[237]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]['phoppadded'],"sub-title":actionBtnShortTitlesNew[237]};

						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							if(lastaction[partnerid]['interestcomstatus'] > 0 && unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							else
								final_set['secondActBtn'] = btnvalues['EI'];
								
								final_set['promocontent'] =  bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 238://Opp Profile Horoscope added but action pending
						if(threadolddata == 1)
							final_set['Title']	= {"main-title":thvactionBtnTitles['hroppadded'],"sub-title":actionBtnShortTitlesNew[238]};
						else
							final_set['Title']	= {"main-title":ACTBTNTITLES[actBtnTitle]['hroppadded'],"sub-title":actionBtnShortTitlesNew[238]};

						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							if(lastaction[partnerid]['interestcomstatus'] > 0 && unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							else
								final_set['secondActBtn'] = btnvalues['EI'];
								
								final_set['promocontent'] =  bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 239://Opp Profile EatingHabits added but action pending
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles['ehoppadded'],"sub-title":actionBtnShortTitlesNew[239]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]['ehoppadded'],"sub-title":actionBtnShortTitlesNew[239]};
						
						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							if(lastaction[partnerid]['interestcomstatus'] > 0 && unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							else
								final_set['secondActBtn'] = btnvalues['EI'];
								
								final_set['promocontent'] =  bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 240://Opp Profile DrinkingHabits added but action pending
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles['dhoppadded'],"sub-title":actionBtnShortTitlesNew[240]};		
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]['dhoppadded'],"sub-title":actionBtnShortTitlesNew[240]};	

						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							if(lastaction[partnerid]['interestcomstatus'] > 0 && unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							else
								final_set['secondActBtn'] = btnvalues['EI'];
								
								final_set['promocontent'] =  bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 241://Opp Profile SmokingHabits added but action pending
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles['shoppadded'],"sub-title":actionBtnShortTitlesNew[241]};	
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]['shoppadded'],"sub-title":actionBtnShortTitlesNew[241]};	

						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							if(lastaction[partnerid]['interestcomstatus'] > 0 && unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							else
								final_set['secondActBtn'] = btnvalues['EI'];
								
								final_set['promocontent'] =  bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 242://Opp Profile Gothram added but action pending
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles['gtraoppadded'],"sub-title":actionBtnShortTitlesNew[242]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]['gtraoppadded'],"sub-title":actionBtnShortTitlesNew[242]};

						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							if(lastaction[partnerid]['interestcomstatus'] > 0 && unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							else
								final_set['secondActBtn'] = btnvalues['EI'];
								
								final_set['promocontent'] =  bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 243://Opp Profile Star added but action pending
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles['stroppadded'],"sub-title":actionBtnShortTitlesNew[243]};	
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]['stroppadded'],"sub-title":actionBtnShortTitlesNew[243]};	

						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							if(lastaction[partnerid]['interestcomstatus'] > 0 && unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							else
								final_set['secondActBtn'] = btnvalues['EI'];
								
								final_set['promocontent'] =  bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 244://Opp Profile Rasi added but action pending
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles['rsioppadded'],"sub-title":actionBtnShortTitlesNew[244]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]['rsioppadded'],"sub-title":actionBtnShortTitlesNew[244]};

						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							if(lastaction[partnerid]['interestcomstatus'] > 0 && unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							else
								final_set['secondActBtn'] = btnvalues['EI'];
								
								final_set['promocontent'] =  bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 245://Opp Profile CollegeInstitution added but action pending
					break;
					case 246://Opp Profile Education added but action pending
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles['eduoppadded'],"sub-title":actionBtnShortTitlesNew[246]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]['eduoppadded'],"sub-title":actionBtnShortTitlesNew[246]};

						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							if(lastaction[partnerid]['interestcomstatus'] > 0 && unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							else
								final_set['secondActBtn'] = btnvalues['EI'];
								
								final_set['promocontent'] =  bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 247://Opp Profile Occupation added but action pending
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles['ocuoppadded'],"sub-title":actionBtnShortTitlesNew[247]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]['ocuoppadded'],"sub-title":actionBtnShortTitlesNew[247]};

						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							if(lastaction[partnerid]['interestcomstatus'] > 0 && unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							else
								final_set['secondActBtn'] = btnvalues['EI'];
								
								final_set['promocontent'] =  bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 248://Opp Profile AnnualIncome added but action pending
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles['aioppadded'],"sub-title":actionBtnShortTitlesNew[248]};	
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]['aioppadded'],"sub-title":actionBtnShortTitlesNew[248]};	

						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							if(lastaction[partnerid]['interestcomstatus'] > 0 && unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							else
								final_set['secondActBtn'] = btnvalues['EI'];
								
								final_set['promocontent'] =  bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							if(unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 249://Opp Profile AncestralOrigin added but action pending
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles['ansoroppadded'],"sub-title":actionBtnShortTitlesNew[249]};	
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]['ansoroppadded'],"sub-title":actionBtnShortTitlesNew[249]};	

						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							if(lastaction[partnerid]['interestcomstatus'] > 0 && unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							else
								final_set['secondActBtn'] = btnvalues['EI'];
								
								final_set['promocontent'] =  bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 250://Opp Profile AboutMyFamily added but action pending
						if(threadolddata == 1)
							final_set['Title'] =  {"main-title":thvactionBtnTitles['fmlyoppadded'],"sub-title":actionBtnShortTitlesNew[250]};
						else
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]['fmlyoppadded'],"sub-title":actionBtnShortTitlesNew[250]};

						if(loginentrytype == "F"){
							final_set['firstActBtn'] = btnvalues['PAIDPROMOTIONSENDMAIL'];
							if(lastaction[partnerid]['interestcomstatus'] > 0 && unifedVerion2 == 1)
								final_set['secondActBtn'] =  btnvalues['CALLNOW'];
							else
								final_set['secondActBtn'] = btnvalues['EI'];
								
								final_set['promocontent'] =  bmcommlable.defaultMessage['paidpromo'];
						}else{
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] =  btnvalues['CALLNOW'];
						}
						final_set['message'] = '';
					break;
					case 251://Opp Profile FamilyDetails added but action pending
					break;
					case 252://Opp Profile Hobbies added but action pending
					break;
					case 253://Opp Profile Interests added but action pending
					break;
					case 254: // Photo Request Added Declined Received
						if(lastaction['LikedStatus'] == 8 || lastaction['LikedStatus'] == 9)
						{
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles["phprofdecrec"],"sub-title":actionBtnShortTitlesNew[254]};
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["phprofdecrec"],"sub-title":actionBtnShortTitlesNew[254]};
						}else{
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles['phnotdecrec'],"sub-title":actionBtnShortTitlesNew[254]};				
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]['phnotdecrec'],"sub-title":actionBtnShortTitlesNew[254]};			
						}
						final_set['message'] = '';

						if(unifedVerion2 != 1 && moduletype != 'search'){
							final_set['firstActBtn'] = btnvalues['SEARCHNOW'];
						}
					break;	
					case 255: // Horoscope Request Added Declined Received
						if(lastaction['LikedStatus'] == 8 || lastaction['LikedStatus'] == 9)
						{
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles["hrprofdecrec"],"sub-title":actionBtnShortTitlesNew[255]};
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["hrprofdecrec"],"sub-title":actionBtnShortTitlesNew[255]};
						}else{
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles['hrnotdecrec'],"sub-title":actionBtnShortTitlesNew[255]};
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]['hrnotdecrec'],"sub-title":actionBtnShortTitlesNew[255]};
						}
						final_set['message'] = '';

						if(unifedVerion2 != 1 && moduletype != 'search'){
							final_set['firstActBtn'] = btnvalues['SEARCHNOW'];
						}
					break;
					case 256: // Eating Habits Added Declined Received 
						if(lastaction['LikedStatus'] == 8 || lastaction['LikedStatus'] == 9)
						{
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles["ehprofdecrec"],"sub-title":actionBtnShortTitlesNew[256]};	
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["ehprofdecrec"],"sub-title":actionBtnShortTitlesNew[256]};	
						}else{
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles['ehnotdecrec'],"sub-title":actionBtnShortTitlesNew[256]};				
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]['ehnotdecrec'],"sub-title":actionBtnShortTitlesNew[256]};			
						}
						final_set['message'] = '';

						if(unifedVerion2 != 1 && moduletype != 'search'){
							final_set['firstActBtn'] = btnvalues['SEARCHNOW'];
						}
					break;
					case 257: // Drinking Habits Added Declined Received
						if(lastaction['LikedStatus'] == 8 || lastaction['LikedStatus'] == 9)
						{
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles["dhprofdecrec"],"sub-title":actionBtnShortTitlesNew[257]};
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["dhprofdecrec"],"sub-title":actionBtnShortTitlesNew[257]};
						}else{
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles['dhnotdecrec'],"sub-title":actionBtnShortTitlesNew[257]};				
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]['dhnotdecrec'],"sub-title":actionBtnShortTitlesNew[257]};		
						}
						final_set['message'] = '';

						if(unifedVerion2 != 1 && moduletype != 'search'){
							final_set['firstActBtn'] = btnvalues['SEARCHNOW'];
						}
					break;
					case 258: // Smoking Habits Added Declined Received 
						if(lastaction['LikedStatus'] == 8 || lastaction['LikedStatus'] == 9)
						{
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles["shprofdecrec"],"sub-title":actionBtnShortTitlesNew[258]};
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["shprofdecrec"],"sub-title":actionBtnShortTitlesNew[258]};
						}else{
							if(threadolddata == 1)
								final_set['Title'] = {"main-title":thvactionBtnTitles['shnotdecrec'],"sub-title":actionBtnShortTitlesNew[258]};				
							else
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]['shnotdecrec'],"sub-title":actionBtnShortTitlesNew[258]};		
						}
						final_set['message'] = '';
					break;
					case 259: // Gothram Request Added Declined Received
						if(lastaction['LikedStatus'] == 8 || lastaction['LikedStatus'] == 9)
						{
							if(threadolddata == 1)
								final_set['Title'] = {"main-title":thvactionBtnTitles["gtrprofdecrec"],"sub-title":actionBtnShortTitlesNew[259]};
							else
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]["gtrprofdecrec"],"sub-title":actionBtnShortTitlesNew[259]};
						}else{
							if(threadolddata == 1)
								final_set['Title'] = {"main-title":thvactionBtnTitles['gtranotdecrec'],"sub-title":actionBtnShortTitlesNew[259]};				
							else
								final_set['Title']  = {"main-title":ACTBTNTITLES[actBtnTitle]['gtranotdecrec'],"sub-title":actionBtnShortTitlesNew[259]};			
						}
						final_set['message'] = '';

						if(unifedVerion2 != 1 && moduletype != 'search'){
							final_set['firstActBtn'] = btnvalues['SEARCHNOW'];
						}
					break;
					case 260: // Star Request Added Declined Received
						if(lastaction['LikedStatus'] == 8 || lastaction['LikedStatus'] == 9)
						{
							if(threadolddata == 1)
								final_set['Title'] = {"main-title":thvactionBtnTitles["strprofdecrec"],"sub-title":actionBtnShortTitlesNew[260]};
							else
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]["strprofdecrec"],"sub-title":actionBtnShortTitlesNew[260]};
						}else{
							if(threadolddata == 1)
								final_set['Title'] = {"main-title":thvactionBtnTitles['strnotdecrec'],"sub-title":actionBtnShortTitlesNew[260]};				
							else
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]['strnotdecrec'],"sub-title":actionBtnShortTitlesNew[260]};			
						}
						final_set['message'] = '';

						if(unifedVerion2 != 1 && moduletype != 'search'){
							final_set['firstActBtn'] = btnvalues['SEARCHNOW'];
						}
					break;
					case 261: // Raasi Request Added Declined Received
						if(lastaction['LikedStatus'] == 8 || lastaction['LikedStatus'] == 9){
							final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["rsiprofdecrec"],"sub-title":actionBtnShortTitlesNew[261]};
						}else{
							final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]['rsinotdecrec'],"sub-title":actionBtnShortTitlesNew[261]};			
						}
						final_set['message'] = '';

						if(unifedVerion2 != 1 && moduletype != 'search'){
							final_set['firstActBtn'] = btnvalues['SEARCHNOW'];
						}
					break;
					case 262: // College OR Institution Added Declined Received
					break;
					case 263: // Education Request Added Declined Received
						if(lastaction['LikedStatus'] == 8 || lastaction['LikedStatus'] == 9)
						{
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles["eduprofdecrec"],"sub-title":actionBtnShortTitlesNew[263]};
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["eduprofdecrec"],"sub-title":actionBtnShortTitlesNew[263]};
						}else{
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles['edunotdecrec'],"sub-title":actionBtnShortTitlesNew[263]};				
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]['edunotdecrec'],"sub-title":actionBtnShortTitlesNew[263]};				
						}
						final_set['message'] = '';

						if(unifedVerion2 != 1 && moduletype != 'search'){
							final_set['firstActBtn'] = btnvalues['SEARCHNOW'];
						}
					break;
					case 264: // Occupation Request Added Declined Received
						if(lastaction['LikedStatus'] == 8 || lastaction['LikedStatus'] == 9)
						{
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles["ocuprofdecrec"],"sub-title":actionBtnShortTitlesNew[264]};
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["ocuprofdecrec"],"sub-title":actionBtnShortTitlesNew[264]};
						}else{
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles['ocunotdecrec'],"sub-title":actionBtnShortTitlesNew[264]};			
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]['ocunotdecrec'],"sub-title":actionBtnShortTitlesNew[264]};		
						}
						final_set['message'] = '';

						if(unifedVerion2 != 1 && moduletype != 'search'){
							final_set['firstActBtn'] = btnvalues['SEARCHNOW'];
						}
					break;
					case 265: // Annual Income Request Added Declined Received
						if(lastaction['LikedStatus'] == 8 || lastaction['LikedStatus'] == 9)
						{
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles["aiprofdecrec"],"sub-title":actionBtnShortTitlesNew[265]};
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["aiprofdecrec"],"sub-title":actionBtnShortTitlesNew[265]};
						}else{
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles['ainotdecrec'],"sub-title":actionBtnShortTitlesNew[265]};			
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]['ainotdecrec'],"sub-title":actionBtnShortTitlesNew[265]};	
						}
						final_set['message'] = '';
						
						if(unifedVerion2 != 1 && moduletype != 'search'){
							final_set['firstActBtn'] = btnvalues['SEARCHNOW'];
						}
					break;
					case 266: // AncestralOrigin Request Added Declined Received
						if(lastaction['LikedStatus'] == 8 || lastaction['LikedStatus'] == 9)
						{
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles["ansorprofdecrec"],"sub-title":actionBtnShortTitlesNew[266]};
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["ansorprofdecrec"],"sub-title":actionBtnShortTitlesNew[266]};
						}else{
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles['ansornotdecrec'],"sub-title":actionBtnShortTitlesNew[266]};				
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]['ansornotdecrec'],"sub-title":actionBtnShortTitlesNew[266]};		
						}
						final_set['message'] = '';
						
						if(unifedVerion2 != 1 && moduletype != 'search'){
							final_set['firstActBtn'] = btnvalues['SEARCHNOW'];
						}
					break;
					case 267: // AboutMyFamily Request Added Declined Received
						if(lastaction['LikedStatus'] == 8 || lastaction['LikedStatus'] == 9)
						{
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles["amfprofdecrec"],"sub-title":actionBtnShortTitlesNew[267]};
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]["amfprofdecrec"],"sub-title":actionBtnShortTitlesNew[267]};
						}else{
							if(threadolddata == 1)
								final_set['Title'] =  {"main-title":thvactionBtnTitles['amfnotdecrec'],"sub-title":actionBtnShortTitlesNew[267]};				
							else
								final_set['Title'] =  {"main-title":ACTBTNTITLES[actBtnTitle]['amfnotdecrec'],"sub-title":actionBtnShortTitlesNew[267]};			
						}
						final_set['message'] = '';
					break;
					case 268: // FamilyDetails Request Added Declined Received
					break;
					case 269: // Hobbies Request Added Declined Received
					break;
					case 270: // Interests Request Added Declined Received
					break;
					
					default:
						if(loginentrytype == "F"){
							if(moduletype =="vp"){
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]['expressInterest']};
							}
							final_set['firstActBtn'] = btnvalues['EI'] ;
							final_set['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
							final_set['firstPromoButton'] = btnvalues['PAIDPROMOTIONSENDMAIL'] ;
						}else{
							if(moduletype =="vp"){
								final_set['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]["sendMail"]};
							}
							final_set['firstActBtn'] = btnvalues['SENDMAIL'];
							final_set['secondActBtn'] = btnvalues['CALLNOW'];
						}			
					}
					
					if(logingender == "F"){
						heshe='He';
						himher='him';
						hisher='his';
						HisHer = 'His';
						heshesmall = 'he';
					} else if(logingender == 'M'){
						heshe='She';
						himher='her';
						hisher='her';
						HisHer = 'Her';
						heshesmall = 'she';
					}						
					final_set['Title']['main-title'] =	bmgeneric.str_replace("#$#",heshe,final_set['Title']['main-title']);		
					final_set['Title']['main-title'] =	bmgeneric.str_replace("$#$",heshesmall,final_set['Title']['main-title']);
					final_set['Title']['main-title'] =	bmgeneric.str_replace("$@$",himher,final_set['Title']['main-title']);
					final_set['Title']['main-title'] =	bmgeneric.str_replace("@@@",hisher,final_set['Title']['main-title']);
					final_set['Title']['main-title'] =	bmgeneric.str_replace("@$@",HisHer,final_set['Title']['main-title']);
					final_action[partnerId] = Object.assign({},lastaction[partnerId], final_set);
				}		
			} else {
				var partnerid = partnerDetails['matriid'];
				var final_action ={};
				var notinfoempty = {};
				notinfoempty['PartnerId'] = partnerid;
				var btnvalues = bmgeneric.btnArray(actionBtnLabelsArr);
				if(loginentrytype == "F"){				
					if(moduletype =="vp"){
						notinfoempty['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]['expressInterest']};
					}
					notinfoempty['firstActBtn'] = btnvalues['EI'] ;
					notinfoempty['promocontent'] = bmcommlable.defaultMessage['paidpromo'];
					notinfoempty['firstPromoButton'] = btnvalues['PAIDPROMOTIONSENDMAIL'] ;
				}else{			
					if(moduletype =="vp"){
						notinfoempty['Title'] = {"main-title":ACTBTNTITLES[actBtnTitle]["sendMail"]};
					}
					notinfoempty['firstActBtn'] = btnvalues['SENDMAIL'];
					notinfoempty['secondActBtn'] = btnvalues['CALLNOW'];
				}
				notinfoempty['Ignored'] =  0;
				notinfoempty['Blocked'] =  0;
				notinfoempty['Bookmarked'] =  0;					
				final_action[partnerid] = 	notinfoempty;
			}	
		
			var RecentAction = final_action;	
			var comtypeArrayReceive = ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24', '26', '28', '30', '32', '34', '36', '38', '40', '42', '44', '46', '48', '50', '52', '54', '56', '58', '60', '62', '64', '66', '68', '70', '72', '74', '76', '78', '80', '82', '84', '86', '88', '90', '92', '94', '96', '98', '100', '102', '104', '106', '108', '110', '112', '114', '116', '118', '120', '122', '124', '126', '128', '130', '132', '134', '136', '138', '140', '142', '144', '168', '170', '172', '174', '176', '178', '180', '182', '184', '186', '188', '190', '192', '194', '196', '198', '200', '202', '204', '206', '208', '210', '212', '214', '216', '218', '220', '222', '224', '226', '228', '230', '232', '234', '236', '254', '255', '256', '257', '258', '259', '260', '261', '262', '263', '264', '265', '266', '267', '268', '269', '270'];

			var comInfoSentActionArr = ['1','3','7','9','11','13','17','19','21','23','25','37','39','45','47','49','51','53','55','59','61','63','65','67','77','79','81','83','85','87','89','91','93','95','97','99','101','103','105','107','109','111','113','115','117','119','121','123','125','127','129','131','133','135','137','139','141','143','167','203','207','209','211','213','215','217','219','221','223','225','227','229','231','233','235'];
			var comInfoReceivedActionArr  = ['2','4','8','10','12','14','18','20','22','24','26','38','40','46','48','50','52','54','56','60','62','64','66','68','78','80','82','84','86','88','90','92','94','96','98','100','102','104','106','108','110','112','114','116','118','120','122','124','126','128','130','132','134','136','138','140','142','144','168','204','208','210','212','214','216','218','220','222','224','226','228','230','232','234','236','237','238','239','240','241','242','243','244','245','246','247','248','249','250','251','252','253'];
			var receiverDeclinedOnArr = ['6','16','42','58','70','170','172','174','176','178','180','182','184','186','188','190','192','194','196','198','200','202','206','254','255','256','257','258','259','260','261','262','263','264','265','266','267','268','269','270'];
			var senderDeclinedOnArr = ['5','15','41','57','69','169','171','173','175','177','179','181','183','185','187','189','191','193','195','197','199','201','205'];
			var outputArray = {};
			for (var key in RecentAction) {				
				var viewerid = key;
				if(memberid!=viewerid){
					var RentAct = RecentAction[viewerid];
					if(moduletype=="vp"){						
						if(bmgeneric.in_array(RentAct["comtype"],comInfoReceivedActionArr))
						{
							outputArray['ACTIONTYPE'] = "1";
						}else if(bmgeneric.in_array(RentAct["comtype"],comInfoSentActionArr)){
							outputArray['ACTIONTYPE'] = "2";
						}else if(bmgeneric.in_array(RentAct["comtype"],receiverDeclinedOnArr)){
							outputArray['ACTIONTYPE'] = "4";
						}else if(bmgeneric.in_array(RentAct["comtype"],senderDeclinedOnArr)){
							outputArray['ACTIONTYPE'] = "3";
						}		
					}else{
						outputArray['ACTIONTYPE']=(bmgeneric.in_array(RentAct["ComType"],ComTypeArrayReceive))?1:2;
					}
					
					outputArray['ACTIONTAG'] = (!bmgeneric.empty(RentAct["Title"]["sub-title"])) ? RentAct["Title"]["sub-title"] : '';		
					outputArray['TOTALACTION'] = (!bmgeneric.empty(RentAct["comcount"]))? RentAct["comcount"] : '';					
					if(RentAct["comunreadcount"]>999)
						RentAct["comunreadcount"]= "0";
					
					outputArray['PENDINGACTION'] = (!bmgeneric.emptyNull(RentAct["comunreadcount"])) ? RentAct["comunreadcount"] :"";
					
					outputArray['MESSAGECOMSTATUS'] = (!bmgeneric.emptyNull(RentAct["messagecomstatus"])) ? RentAct["messagecomstatus"] :"";
					
					outputArray['MESSAGECOMREPLIEDSTATUS'] = (!bmgeneric.emptyNull(RentAct["messagecomrepliedstatus"])) ? RentAct["messagecomrepliedstatus"] :"";
					
					outputArray['COMINFOID'] = (!bmgeneric.emptyNull(RentAct["cominfoid"]))?RentAct["cominfoid"] : '' ;
					
					if(bmgeneric.isset(RentAct["Title"]["main-title"]) && !bmgeneric.empty(RentAct["Title"]["main-title"]))
						outputArray['ACTIONHEADING'] = RentAct["Title"]["main-title"];
				
					if(bmgeneric.isset(RentAct["message"]) && !bmgeneric.empty(RentAct["message"]))
					{
						RentAct["message"] = bmgeneric.nl2br(RentAct["message"]);
						RentAct["message"] = bmgeneric.str_ireplace("&lt;javascript&gt;"," ",RentAct["message"]);
						RentAct["message"] = bmgeneric.str_ireplace("&lt;/javascript&gt;"," ",RentAct["message"]);
						RentAct["message"] = bmgeneric.str_ireplace("&lt;script&gt;"," ",RentAct["message"]);
						RentAct["message"] = bmgeneric.str_ireplace("&lt;/script&gt;"," ",RentAct["message"]);
						RentAct["message"] = bmgeneric.str_ireplace("&lt;vbscript&gt;"," ",RentAct["message"]);
						RentAct["message"] = bmgeneric.str_ireplace("&lt;/vbscript&gt;"," ",RentAct["message"]);
						RentAct["message"] = bmgeneric.str_ireplace("<br />","<br>",RentAct["message"]);
						
						RentAct["message"] = bmgeneric.str_ireplace('/&lt;(\s*)iframe[^<>]*&gt;/i', '', RentAct["message"]);
						RentAct["message"] = RentAct["message"].replace(/(<iframe.*?>.*?<\/iframe>)/gi,"");
						RentAct["message"] = bmgeneric.str_ireplace(".php"," ",RentAct["message"]);
						RentAct["message"] = bmgeneric.str_ireplace("&lt;img src=x&gt;"," ",RentAct["message"]);
						RentAct["message"] = bmgeneric.str_ireplace("&lt;b&gt;"," ",RentAct["message"]);
						RentAct["message"] = bmgeneric.str_ireplace("&lt;h1&gt;"," ",RentAct["message"]);
						RentAct["message"] = bmgeneric.trim(bmgeneric.stripslashes(RentAct["message"]));
						RentAct["message"] = bmgeneric.html_entity_decode(RentAct["message"]);
						outputArray['ACTIONCONTENT'] = bmgeneric.strip_tags(RentAct["message"]);
					}
								
					if(bmgeneric.isset(RentAct["promocontent"]) && !bmgeneric.empty(RentAct["promocontent"]))
						outputArray['PROMOCONTENT'] = RentAct["promocontent"];
					
					if(moduletype=="vp"){
						var msgComStatus = RentAct["messagecomstatus"];
						var intComStatus = RentAct["interestcomstatus"];
						if(loginentrytype=='F')
						{
							if(intComStatus==2 && (RentAct["interestcomneedmoretime"] ==0 || RentAct["interestcomneedmoreinfo"] ==0 || RentAct["interestcomdeclined"] ==0 ))
							{
								outputArray['EIPMDET'] = {'ICONTYPE':"3"};
							}else if(intComStatus==1 && (RentAct["interestcomneedmoretime"] ==0 || RentAct["interestcomneedmoreinfo"] ==0 || RentAct["interestcomdeclined"] ==0 ))
							{
								outputArray['EIPMDET']={'ICONTYPE':"2"};
							}else if(intComStatus==0 || bmgeneric.empty(intComStatus))
							{
								outputArray['EIPMDET']={'ICONTYPE':"1"};
							}
						} else {
							if(msgComStatus==2 && (RentAct["messagecomneedmoretime"] ==0 || RentAct["messagecomdeclined"] ==0 ))
							{
								outputArray['EIPMDET']={'ICONTYPE':"6"};
							}
							else if(msgComStatus==1 && (RentAct["messagecomneedmoretime"] ==0  || RentAct["messagecomdeclined"] ==0 ))
							{
								outputArray['EIPMDET']={'ICONTYPE':"5"};
							}else if(msgComStatus==0 || bmgeneric.empty(msgComStatus))
							{
								outputArray['EIPMDET']={'ICONTYPE':"4"};
							}
						}			
						
						outputArray['REFERENCE'] = {'REFERENCEAVAILABLE':(refavailable==0)?"N":"Y"};
						var comdates = "0000-00-00 00:00:00"
						if(bmgeneric.isset(RentAct["comdate"])){
							var cdate = new Date(RentAct["comdate"]*1000);
							comdates = dateFormat(cdate,"yyyy-mm-dd HH:MM:ss");
						}
						outputArray['COMMUNICATIONDATE'] = comdates;
					}	
					
					if(bmgeneric.isset(RentAct["firstActBtn"]) && !bmgeneric.empty(RentAct["firstActBtn"])){
						var recId = RentAct["firstActBtn"]["appurlid"];
						outputArray['PRIMARYACTION']={ID:recId.toString(),LABEL:RentAct["firstActBtn"]["btn-label"]};
					}else if(bmgeneric.isset(RentAct["promotionBtn"]) && !bmgeneric.empty(RentAct["promotionBtn"])){
						var recId = RentAct["promotionBtn"]["appurlid"];
						outputArray['PRIMARYACTION']={ID:recId.toString(),LABEL:RentAct["promotionBtn"]["btn-label"]};
					}else{
						outputArray['PRIMARYACTION']={"ID":"0","LABEL":""};
					}
					
					if(bmgeneric.isset(RentAct["ActionBtnChild"]) && !bmgeneric.empty(RentAct["ActionBtnChild"])){
						RentAct["ActionBtnChild"].shift();
						var outputAry = {};	var inc = 0;
						for(var keyacn in RentAct["ActionBtnChild"]){
							var arrVal = RentAct["ActionBtnChild"][keyacn]["appurlid"];
							outputAry[inc]={"ID":arrVal.toString(),"LABEL":arrVal[keyacn]["btn-label"]};
							inc++;
						}
						outputArray['SECONDARYACTION'] = outputAry;
					}
					if(bmgeneric.isset(RentAct["secondActBtn"]) && !bmgeneric.empty(RentAct["secondActBtn"])){
						var recId = RentAct["secondActBtn"]["appurlid"];
						outputArray['SECONDARYACTION']=[{"ID":recId.toString(),"LABEL":RentAct["secondActBtn"]["btn-label"]}];
					}
					if(bmgeneric.isset(RentAct["thirdActBtn"]) && !bmgeneric.empty(RentAct["thirdActBtn"])){
						var recId = RentAct["thirdActBtn"]["appurlid"];
						outputArray['THIRDACTION']=[{"ID":recId.toString(),"LABEL":RentAct["thirdActBtn"]["btn-label"]}];
					}
					
					if(bmgeneric.isset(RentAct["negActBtn"]) && !bmgeneric.empty(RentAct["negActBtn"])){
						var recId = RentAct["negActBtn"]["appurlid"];
						outputArray['SECONDARYACTION']=[{"ID":recId.toString(),"LABEL":RentAct["negActBtn"]["btn-label"]}];
					}						
				 
					if(!bmgeneric.isset(outputArray["SECONDARYACTION"]) && bmgeneric.empty(outputArray["SECONDARYACTION"])){
						if(bmgeneric.isset(RentAct["promotionBtn"]) && !bmgeneric.empty(RentAct["promotionBtn"]) && (outputArray['PRIMARYACTION']["ID"] != '18')){
							var recId = RentAct["promotionBtn"]["appurlid"];
							outputArray['SECONDARYACTION']=[{"ID":recId.toString(),"LABEL":RentAct["promotionBtn"]["btn-label"]}];
						}else{		
							outputArray['SECONDARYACTION']=[{"ID":"0","LABEL":""}];
						}
					}	
				 
					if(bmgeneric.isset(RentAct["promotionBtn"]) && !bmgeneric.empty(RentAct["promotionBtn"])){
						var recId = RentAct["promotionBtn"]["appurlid"];
						outputArray['PAIDPROMOACTION']={"ID":recId.toString(),"LABEL":RentAct["promotionBtn"]["btn-label"]};
					}		
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
				}					
				if(memberid==viewerid){						
					outputArray['REFERENCE']={'REFERENCEAVAILABLE':(refavailable==0)?"N":"Y"};
				}
			}
			//console.log("------outputArray--------:",outputArray);
			callback(null,outputArray);
		}catch(err){
			console.log("***************Communication Function Error**************",err);
			return callback(err,{});
		}
	}
	
	//module.exports = getcomunicationInfo;