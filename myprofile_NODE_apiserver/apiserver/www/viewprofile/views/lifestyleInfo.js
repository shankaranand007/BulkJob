/**********************************************************************************************
 *	Filename	: lifestyInfo.js							
 *	Author		: Sathrak paldurai K
 *	Date		: 28-09-2017								
 *	Description	: Viewed member details display.
***********************************************************************************************/

	exports.getlifestyInfo = function(arg,partnerInfo,callback){
		try{
			LifeStyle = {};
			LifeStyle['TITLE'] = bmlable.l_lifestyle;
			//##EatingHabits
			eatinghabits = bmgeneric.appgetFromArryHashEn('EATINGHABITSHASH', partnerInfo.eatinghabits);
			LifeStyle['EATINGHABITS'] = (eatinghabits =='' || eatinghabits =='-') ? bmlable.l_not_specified : eatinghabits;

			//## DrinkingHabits checking ##
			drinkinghabits = bmgeneric.appgetFromArryHashEn('DRINKHASH', partnerInfo.drinkinghabits);
			LifeStyle['DRINKINGHABITS'] = (drinkinghabits =='' || drinkinghabits =='-') ? bmlable.l_not_specified : drinkinghabits;
			
			//## SmokingHabits checking ## 
			smokinghabits = bmgeneric.appgetFromArryHashEn('SMOKEHASH', partnerInfo.smokinghabits);
			LifeStyle['SMOKINGHABITS'] = (smokinghabits =='' || smokinghabits =='-') ? bmlable.l_not_specified : smokinghabits;
							
			async.each(Object.keys(LifeStyle),function(key, cb){
				if (bmgeneric.emptyNull(LifeStyle[key]) || LifeStyle[key] == '-') {
					LifeStyle[key] = bmlable.l_not_specified;
				
					if(global.REQUESTFLAG == 1 && bmgeneric.array_key_exists(key+"REQUEST",global.RequestComTypeArray))  
						global.requestInfoArr[key+"REQUEST"] = global.RequestComTypeArray[key+"REQUEST"];
				}
				cb(null);
			},function(err){
				callback(null,LifeStyle);
			});	
		}catch(err){
			console.log("Error:",err);
			return callback(err,LifeStyle);
		}
	}