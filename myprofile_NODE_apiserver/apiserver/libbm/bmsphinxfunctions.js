/**********************************************************************************************
File    : bmsphinxfunction.js
Author  : Sathrak Paldurai k
Date    : 30-Aug-2016
************************************************************************************************
Description: Get member online status from SphinxRT
***********************************************************************************************/
	exports.appGetProfileIndexName = function(gender, motherTounge)
	{
		if(gender == 0)
			indexPrefixName = bmsphinxvars.femaleInxNamePrefix;
		else
			indexPrefixName = bmsphinxvars.maleInxNamePrefix;

		if(motherTounge.length == 1 && (motherTounge[0] == 4 ||motherTounge[0] == 33 ||motherTounge[0] == 14 ||motherTounge[0] == 41 ||motherTounge[0] == 17 ||motherTounge[0] == 45 ||motherTounge[0] == 19 ||motherTounge[0] == 31 ||motherTounge[0] == 47 ||motherTounge[0] == 48 ||motherTounge[0] == 34 ||motherTounge[0] == 2 ||motherTounge[0] == 40||motherTounge[0] == 51))
			memProfIndex = indexPrefixName+motherTounge[0];
		else if(motherTounge == "" || motherTounge.length > 1 || (motherTounge.length == 1 && motherTounge[0] == 0)) 
			memProfIndex = indexPrefixName;// If MotherTongue is Any OR more than 1 MotherTongue is selected
		else
			memProfIndex = indexPrefixName+"99";

		return memProfIndex;
	}
	
	exports.appgetmemcachevaluesQL = function(matriId,type,next){
		var curdate='-'+dateFormat(new Date(),'ddmmyyyy');
		var memvaluesqlids = {};
		if(type==1){
			var mkey = matriId+curdate+"-VIEWED";
			Cache.get(mkey,function(err,memcacheViewed){
				var memViewed = [];
				if(!bmgeneric.emptyNull(memcacheViewed)){
					var memcacheView = bmgeneric.trim(memcacheViewed,",");
					if(memcacheView!=""){
						var memcacheArr	= bmgeneric.explode(",",memcacheView); 
						var memcacheViewedArr	= bmgeneric.array_filter(memcacheArr);
						for(var memValue in memcacheViewedArr) {
							if(bmgeneric.is_matriid(memcacheViewedArr[memValue]))
								memViewed.push(bmgeneric.covertToSphinxId(memcacheViewedArr[memValue]));    
						}
					}
					return next(err,memViewed);
				} else {
					return next(err,memViewed);
				}
			});
		}
		
		if(type==2){
			var mkey = matriId+curdate+"-CONTACTED";
			Cache.get(mkey,function(err,memcacheContacted){
				var memContacted = [];
				if(!bmgeneric.emptyNull(memcacheContacted)){
					var memcacheContact = bmgeneric.trim(memcacheContacted,",");
					if(memcacheContact!= ""){
						var memcacheArr = bmgeneric.explode(",",memcacheContact);   
						var memcacheContactedArr = bmgeneric.array_filter(memcacheArr);
						for (var memValue in memcacheContactedArr) {
							if(bmgeneric.is_matriid(memcacheContactedArr[memValue]))
								memContacted.push(bmgeneric.covertToSphinxId(memcacheContactedArr[memValue]));   
						}
					}
					return next(err,memContacted);
				} else {
					return next(err,memContacted);
				}
			});
		}
		
		if(type==3){
			var mkey = matriId+curdate+"-IGNORED";
			Cache.get(mkey,function(err,memIgnoredval){
				var memIgnored = [];				
				if(!bmgeneric.emptyNull(memIgnoredval)){
					var memcacheIgnore	= bmgeneric.trim(memIgnoredval,",");
					if(memcacheIgnore != "") {
						var memcacheArr = bmgeneric.explode(",",memcacheIgnore);
						var memcacheIgnoredArr	= bmgeneric.array_filter(memcacheArr);						
						for(var memValue in memcacheIgnoredArr){
							if(bmgeneric.is_matriid(memcacheIgnoredArr[memValue]))
								memIgnored.push(bmgeneric.covertToSphinxId(memcacheIgnoredArr[memValue]));  
						}
					}				
					return next(err,memIgnored);
				} else {
					return next(err,memIgnored);
				}
			})
		}
		
		if(type==4){			
			var mkey = matriId+curdate+"-SHORTLISTED";
			Cache.get(mkey,function(err,shortdata){
				var memShorted = [];
				if(!bmgeneric.emptyNull(shortdata)){
					var memShort	= bmgeneric.trim(shortdata,",");
					if(memShort!=""){
						var shortedArr = bmgeneric.explode(",",memShort);   
						var memcacheShortedArr	= bmgeneric.array_filter(shortedArr);
						for(var memValue in memcacheShortedArr){
							if(bmgeneric.is_matriid(memcacheShortedArr[memValue]))
								memShorted.push(bmgeneric.covertToSphinxId(memcacheShortedArr[memValue]));  
						}
					}
					return next(err,memShorted);
				} else {
					return next(err,memShorted);
				}
			});
		}
		
		if(type==5){			
			var mkey = matriId+curdate+"-DECLINEDALL";
			Cache.get(mkey,function(err,memcacheDeclined){
				var memDeclined = [];
				if(!bmgeneric.emptyNull(memcacheDeclined)){
					var memcacheDecline	= bmgeneric.trim(memcacheDeclined,",");
					if(memcacheDecline!=""){
						var declinedArr = bmgeneric.explode(",",memcacheDecline);  
						var memcacheDeclinedArr	= bmgeneric.array_filter(declinedArr);
						for(var memValue in memcacheDeclinedArr){
							if(bmgeneric.is_matriid(memcacheDeclinedArr[memValue]))
								memDeclined.push(bmgeneric.covertToSphinxId(memcacheDeclinedArr[memValue]));  
						}
					}
					return next(err,memDeclined);
				} else {
					return next(err,memDeclined);
				}
			});
		}
	}
	
	
	//#Function to get encrypted phone number
	exports.getPhoneFourdigits = function(LatestMatriId,next){
		var profmobilenum = '';
		var domainarr = bmgeneric.getDomainInfo(1,LatestMatriId);
		var hostName    = bmSphinxDb.getViewProfileDomainInfo();
		var SphinxId = bmgeneric.covertToSphinxId(LatestMatriId);
		var selectFields = 'profileindex,primobileno';
		var whereClause = "ProfileIndex=?";
		var whereClauseVal = [parseInt(SphinxId)];
		var max_matches = 'max_matches=100';
		var querycmt = "#view profile paid promotion query#";
		var indexName = SPHINXINDEXNAME[bmgeneric.strtoupper(domainarr['domainnameshort'])]['VIEWPROFILEPROMOINDEX'];
		bmSphinxDb.bmDbSelect(1, hostName, indexName, selectFields, whereClause, whereClauseVal,max_matches, querycmt, 1, function(err,phonedata){
			if(!err){
				profmobilenum = "+91 970xxxxxxx";
				if(!bmgeneric.empty(phonedata)){
					profmobilenum = (!bmgeneric.empty(phonedata[0]['primobileno'])) ? phonedata[0]['primobileno'] : "+91 970xxxxxxx";
				}
			}
			next(err,profmobilenum)
		});
	}