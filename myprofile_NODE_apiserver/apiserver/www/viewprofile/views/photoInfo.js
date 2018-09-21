/**********************************************************************************************
 *	Filename	: photoinfo.js							
 *	Author		: Sathrak paldurai K
 *	Date		: 28-09-2017						
 *	Description	: Viewed member details display.
***********************************************************************************************/
	var photoinfo = {
		getPhotoInfo:function(data,partnerInfo,notesinfo,callback){			
			try{
				var getPhotodet = {};
				if (partnerInfo['photoavailable'] == 1) {
					var photos ={};				
					var skipPhotoResult = (!bmgeneric.empty(notesinfo)) ? notesinfo[data.VIEWEDID] :{};
					photos['PHOTOAVAILABLE'] = (partnerInfo['photoavailable'] == 1) ? "Y" : "N";
					photos['PHOTOPROTECTED'] = partnerInfo['photoprotected'];
					if(data.APPTYPE == 115 || data.APPTYPE == 250 || bmgeneric.in_array(data.APPTYPE,bmvars.MobileAppType)) {
						if(partnerInfo['photoprotected'] == "N" || data.ID == data.VIEWEDID){
							partnerInfo['photoprotected'] = "N";
							photos['PHOTOPROTECTED'] = 'N';
							photoinfo.photosDetails(data, partnerInfo,function(err,thumbphotos){
								if (!bmgeneric.empty(thumbphotos)) {
									photos['PHOTOCOUNT'] = thumbphotos['PHOTOCOUNT'];
									photos['PHOTOURL']= thumbphotos['PHOTOURL'];
									//photos['THUMBIMGS'] = thumbphotos['THUMBIMG'];
									photos['THUMBIMGSDET'] = thumbphotos['THUMBIMG'];
									getPhotodet['PHOTOINFO'] = photos; 					
								} else {
									getPhotodet['PHOTOINFO'] = photos;
								}
								callback(null,getPhotodet);
							});	
						} else if(partnerInfo['photoprotected'] == "Y" || partnerInfo['photoprotected'] == "C") {
							var phtProtFlag = (partnerInfo['photoprotected'] == "C")? 1:'';
							if (bmCommonFunc.skipPhotoPassword(phtProtFlag, skipPhotoResult)) {							
								partnerInfo['photoprotected'] = 'N';
								photos['PHOTOPROTECTED'] = 'N';
								photoinfo.photosDetails(data, partnerInfo,function(err,thumbphotos){
									if (!bmgeneric.empty(thumbphotos)) {
										photos['PHOTOCOUNT'] = thumbphotos['PHOTOCOUNT'];
										photos['PHOTOURL']= thumbphotos['PHOTOURL'];
										photos['THUMBIMGSDET'] = thumbphotos['THUMBIMG'];
										getPhotodet['PHOTOINFO'] = photos; 					
									} else {
										getPhotodet['PHOTOINFO'] = photos;
									}
									callback(null,getPhotodet);
								});	
							} else {
								photos['PHOTOPROTECTED'] = partnerInfo['photoprotected'];
								if(bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE)) {
									photoinfo.photosDetails(data, partnerInfo,function(err,thumbphotos){
										if (!bmgeneric.empty(thumbphotos)) {
											photos['PHOTOCOUNT'] = thumbphotos['PHOTOCOUNT'];
											photos['PHOTOURL']= thumbphotos['PHOTOURL'];
											photos['THUMBIMGSDET'] = thumbphotos['THUMBIMG'];
											getPhotodet['PHOTOINFO'] = photos; 					
										} else {
											getPhotodet['PHOTOINFO'] = photos;
										}
										callback(null,getPhotodet);
									});		
								} else {
									getPhotodet['PHOTOINFO'] = photos;
									callback(null,getPhotodet);
								}
							}
						} else {
							getPhotodet['PHOTOINFO'] = photos;
							callback(null,getPhotodet);
						}                 
					} else {					
						if (partnerInfo['photoprotected'] == "N") {
							photoinfo.photosDetails(data, partnerInfo,function(err,thumbphotos){
								if (!bmgeneric.empty(thumbphotos)) {
									photos['PHOTOCOUNT'] = thumbphotos['PHOTOCOUNT'];
									photos['PHOTOURL']= thumbphotos['PHOTOURL'];
									photos['THUMBIMGSDET'] = thumbphotos['THUMBIMG'];
									getPhotodet['PHOTOINFO'] = photos; 					
								} else {
									getPhotodet['PHOTOINFO'] = photos;
								}
								callback(null,getPhotodet);
							});	
						} else if (partnerInfo['photoavailable'] == 1 && partnerInfo['photoprotected'] == "Y" && (skipPhotoResult['SkipPrivPwdReceived']==1 || skipPhotoResult['SkipPrivPwdReceived']==3 || skipPhotoResult['SkipPrivPwdReceived']==6)) {
							partnerInfo['photoprotected'] = "N";
							photos['PHOTOPROTECTED'] = 'N';
							photoinfo.photosDetails(data, partnerInfo,function(err,thumbphotos){
								if (!bmgeneric.empty(thumbphotos)) {
									photos['PHOTOCOUNT'] = thumbphotos['PHOTOCOUNT'];
									photos['PHOTOURL']= thumbphotos['PHOTOURL'];
									photos['THUMBIMGSDET'] = thumbphotos['THUMBIMG'];
									getPhotodet['PHOTOINFO'] = photos; 					
								} else {
									getPhotodet['PHOTOINFO'] = photos;
								}
								callback(null,getPhotodet);
							});
						} else {
							photos['PHOTOPROTECTED'] = partnerInfo['photoprotected'];
							if(bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE)) {
								photoinfo.photosDetails(data, partnerInfo,function(err,thumbphotos){
									if (!bmgeneric.empty(thumbphotos)) {
										photos['PHOTOCOUNT'] = thumbphotos['PHOTOCOUNT'];
										photos['PHOTOURL']= thumbphotos['PHOTOURL'];
										photos['THUMBIMGSDET'] = thumbphotos['THUMBIMG'];
										getPhotodet['PHOTOINFO'] = photos; 					
									} else {
										getPhotodet['PHOTOINFO'] = photos;
									}
									callback(null,getPhotodet);
								});
							} else {
								getPhotodet['PHOTOINFO'] = photos;
								callback(null,getPhotodet);
							}
						}		
					}
				} else {					
					callback(null,getPhotodet);
				}	
			}catch(err){				
				console.error("Error : File Name - photoinfo.js and Function name : getPhotoInfo:",err);
				callback(err,{});
			}
		},
		photosDetails:function(data,partnerInfo,nextback){
			try{				
				if (data.SPHINXENABLE == 0) {
					let partDminList = bmgeneric.getDomainInfo(1, data.VIEWEDID);
					var unixtimePartnerinfo=new Date(partnerInfo.timecreated).getTime() / 1000;				
					bmCommonFunc.getPhotoDetails(data.VIEWEDID, data, 2,'',unixtimePartnerinfo,partDminList,function(err,phtotoutput){
						var output = (!bmgeneric.empty(phtotoutput)) ? phtotoutput : {};
						if(bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE) && (partnerInfo['photoprotected'] == "Y" || partnerInfo['photoprotected'] == "C")){
							output['PHOTOURL'] = bmgeneric.getPhotoBlurImage(phtotoutput[0],250);
						}
						nextback(null, output);
					});
				} else {					
					var photosArray = {};
					var output = {};
					if (partnerInfo['thumbimg'])
						photosArray = bmgeneric.explode(',', partnerInfo['thumbimg']);
					var photoPath = bmgeneric.getUserImagePath(data.VIEWEDID, partnerInfo['time_created']);
					if(bmgeneric.count(photosArray) > 0) {
						var photoCount = 0;
						var outputImg = [];
						async.each(photosArray,function(photoVal, photocb){							
							if(bmgeneric.strstr(photoVal,'gif') && data.APPTYPE == 107){
								photoPath = global.SECUREURL+'appsadmin:A7jgPjuK@apps.bharatmatrimony.com/appphoto/getimage.php?image='+photoPath;
							}
							
							if(((bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE)) && data.DOS > 18 && bmvars.APPWEBPIMGFLAG == 1 && partnerInfo['webpstatus'] == 1) || (data.APPTYPE == 115  && data.WEBPFLAG == 1 && bmvars.WAPWEBPIMGFLAG == 1 && partnerInfo['webpstatus'] == 1))
							{
								outputImg.push(photoPath+bmgeneric.pathinfo(photoVal,'PATHINFO_FILENAME')+'.webp');
							} else {
								outputImg.push(photoPath+photoVal);
							}
							
							photocb(null);
						},function(err){
							output['PHOTOCOUNT'] = photosArray.length;
							output['THUMBIMG'] = outputImg;							
							if(bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE) && data.DOS > 18) // Changes done for displaying webp image for APP
							{
								var outputphotourl = bmgeneric.pathinfo(outputImg[0]);
								if(global.APPVPWEBPIMGFLAG == 1 && partnerInfo['webpstatus'] == 1) // Here we will be displaying the webp image
								{
									if(bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE) && (partnerInfo['photoprotected'] == "Y" || partnerInfo['photoprotected'] == "C")){
										output['PHOTOURL'] = bmgeneric.getPhotoBlurImage(outputImg[0],250);
										delete output['THUMBIMG'];
										output['THUMBIMG'] = [bmgeneric.getPhotoBlurImage(outputImg[0],150)];
									} else // Here we will be displaying 250x300 webp image for APP
										output['PHOTOURL'] = outputphotourl['dirname']+"/"+outputphotourl['filename']+"_TB."+outputphotourl['extension'];
								}else // Here we will be displaying the normal image
								{
									if(bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE) && (partnerInfo['photoprotected'] == "Y" || partnerInfo['photoprotected'] == "C")){
										output['PHOTOURL'] = bmgeneric.getPhotoBlurImage(outputImg[0],250);
										delete output['THUMBIMG'];
										output['THUMBIMG'] = [bmgeneric.getPhotoBlurImage(outputImg[0],150)];
										
									} else  if(bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE)){
										output['PHOTOURL'] = outputphotourl['dirname']+"/"+outputphotourl['filename']+"_TE."+outputphotourl['extension'];
									}else // Here we will be displaying the 250x300 image for APP
										output['PHOTOURL'] = outputphotourl['dirname']+"/"+outputphotourl['filename']+"_TB."+outputphotourl['extension'];
								}
							}else if(data.APPTYPE == 115  && data.WEBPFLAG == 1) // Changes done for displaying webp image for WAP
							{
								var outputphotourl = bmgeneric.pathinfo(outputImg[0]);
								if(global.WAPVPWEBPIMGFLAG == 1 && partnerInfo['webpstatus'] == 1) // Here we will be displaying the webp image
								{
									if(bmvars.WAPVP300WEBPIMGFLAG == 1) //If this flag is set we will be displaying 300x300 webp image for WAP
										output['PHOTOURL'] = outputphotourl['dirname']+"/"+outputphotourl['filename']+"_TE."+outputphotourl['extension'];
									else // Here we will be displaying 250x300 webp image for WAP
										output['PHOTOURL'] = outputphotourl['dirname']+"/"+outputphotourl['filename']+"_TB."+outputphotourl['extension'];
								}else // Here we will be displaying the normal image
								{
									if(bmvars.WAPVP300IMGFLAG == 1) //If this flag is set we will be displaying the 300x300 image for WAP
										output['PHOTOURL'] = outputphotourl['dirname']+"/"+outputphotourl['filename']+"_TE."+outputphotourl['extension'];
									else // Here we will be displaying the 250x300 image for WAP
										output['PHOTOURL'] = outputphotourl['dirname']+"/"+outputphotourl['filename']+"_TB."+outputphotourl['extension'];
								}
							}else if (bmgeneric.in_array(data.APPTYPE,bmvars.IOSAPPTYPE) && outputImg[0] != '') {
								output['PHOTOURL'] = outputImg[0];
							}else if(((bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE)) || (bmgeneric.in_array(data.APPTYPE,bmvars.IOSAPPTYPE))) && (partnerInfo['photoprotected'] == "Y" || partnerInfo['photoprotected'] == "C")){								
								output['PHOTOURL'] = bmgeneric.getPhotoBlurImage(outputImg[0],250);
								delete output['THUMBIMG'];								
								output['THUMBIMG'] = [bmgeneric.getPhotoBlurImage(outputImg[0],150)];
							}else if ((bmgeneric.in_array(data.APPTYPE,bmvars.ANDROIDAPPTYPE)) || (bmgeneric.in_array(data.APPTYPE,bmvars.IOSAPPTYPE))){
								var outputphotourl = bmgeneric.pathinfo(outputImg[0]);	
								output['PHOTOURL'] = outputphotourl['dirname']+"/"+outputphotourl['filename']+"_TB."+outputphotourl['extension'];
							}else {
								var photourl = bmgeneric.explode(',', partnerInfo['photourl']);
								output['PHOTOURL'] = photoPath + photourl[0];
							}							
							nextback(null, output);
						});	
					} else {
						nextback(null, output);
					}
				}
			}catch(err){				
				console.log("Error : File Name - photoinfo.js and Function Name : photosDetails:",err);
				return nextback(err, {});
			}
		}
	}
	
	module.exports = photoinfo;