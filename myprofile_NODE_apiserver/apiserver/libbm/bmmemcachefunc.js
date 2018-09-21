/******************************************************************************************************
| File Name			: bmfuncmemcachefunc.js
| Author Name		: Sathrak Paldurai k
| Created On		: 24 Aug, 2017
| Description		: MemCache Class
******************************************************************************************************/
	
	
	/***********************************************************************************
	| Function	: bmfuncupdateIgnoreandContactInMemcache
	| Parameter	: memcache key
	| Action	: this function will communicate with memcache
	| Return	: 
	***********************************************************************************/
	function bmfuncupdateMemcache(memcachekey,appendId,next) { 
		if(bmgeneric.is_array(appendId)){
			appendId = bmgeneric.array_unique(appendId);
			var StringAppendedId = bmgeneric.implode(",",appendId); 
		} else
			var StringAppendedId = appendId;
		
		var Notinkeys = ['VIEWED','CONTACTED','IGNORED','SHORTLISTED','DECLINEDALL'];
		var memcachekeysegregate = bmgeneric.explode('-',memcachekey);
		if(bmgeneric.in_array(memcachekeysegregate[1],Notinkeys)){			
			var memcachekeycurdate = memcachekeysegregate[0]+'-'+dateFormat(new Date(),'ddmmyyyy')+'-'+memcachekeysegregate[1];
			var memcachekeynextdate = memcachekeysegregate[0]+'-'+dateFormat(strtotime(' +1 day'),'ddmmyyyy')+'-'+memcachekeysegregate[1];			
			async.parallel({
				TWODAY:function(callback){
					Cache.get(memcachekeycurdate,function(err,MemRest){
						callback(err,MemRest);
					});
				},
				YESTERDAY:function(callback){
					Cache.get(memcachekeynextdate,function(err,MemRest){
						callback(err,MemRest);
					});					
				}
			},function(error,memRslt){
				if(!error){
					var getmemcachedfirst = memRslt.TWODAY;
					var getmemcachedsecond = memRslt.YESTERDAY;	
					if(getmemcachedfirst !="" && getmemcachedfirst !=undefined){ 
						if(bmgeneric.substr_count(getmemcachedfirst, ',') < 14000)
						{
							var getArrayValuesfirst = bmgeneric.explode(",",getmemcachedfirst);						
							var getmemcachedfirst = bmgeneric.implode(",",bmgeneric.array_unique(getArrayValuesfirst));
						}
					}
					
					if(getmemcachedsecond!="" && getmemcachedsecond !=undefined){
						if(bmgeneric.substr_count(getmemcachedsecond, ',') < 14000)
						{
							var getArrayValuessecond = bmgeneric.explode(",",getmemcachedsecond);
							var getmemcachedsecond = bmgeneric.implode(",", bmgeneric.array_unique(getArrayValuessecond));
						}
					}		

					if(getmemcachedfirst !="" && getmemcachedfirst !=undefined){ 
						var appendedIdfirst = getmemcachedfirst+","+StringAppendedId; 
					} else {
						var appendedIdfirst = StringAppendedId; 
					}

					if(getmemcachedsecond!="" && getmemcachedsecond !=undefined){
						var appendedIdsecond = getmemcachedsecond+","+StringAppendedId;
					} else {
						var appendedIdsecond = StringAppendedId; 
					}
					
					var exptime = 172800; // expire date set as 48hours
					Cache.set(memcachekeycurdate,appendedIdfirst,1,exptime);
					
					Cache.set(memcachekeynextdate,appendedIdsecond,1,exptime);	
				}									
			});
			next(null,true);
		} else {
			Cache.get(memcachekey,function(err,memVal){
				if(memVal !="" ){  
					appendedId = memVal+","+StringAppendedId; 
				}else { 
					appendedId = StringAppendedId; 
				}				
				Cache.set(memcachekey,appendedId,1,'');
			});			
			next(null,true);
		}
	}
	
	exports.bmfuncupdateMemcache = bmfuncupdateMemcache;