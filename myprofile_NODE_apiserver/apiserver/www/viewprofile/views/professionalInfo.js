/**********************************************************************************************
 *	Filename	: getprofInfo.js							
 *	Author		: Sathrak paldurai K
 *	Date		: 28-09-2017								
 *	Description	: Viewed member details display.
***********************************************************************************************/
	exports.getprofInfo = function(arg,partnerInfo,callback){
		try{
			var returnResultSet = {};
			returnResultSet["TITLE"] = bmlable.l_professional_information;
			if (partnerInfo['educationid'] != '' && partnerInfo['educationid'] > 0) {
				otherreplace = partnerInfo['educationid'] == 94 ? "Others in " : "Other "; //94-Others in Diploma
				returnResultSet["EDUCATIONCATEGORY"] = bmgeneric.trim(bmgeneric.str_replace(otherreplace, "", bmgeneric.appgetFromArryHash('EDUCATION_ARRAY', partnerInfo['educationid'])));
			} else {
				returnResultSet["EDUCATIONCATEGORY"] = bmgeneric.appgetFromArryHash('EDUCATIONHASHFORDETAILDISPLAY', partnerInfo['educationselected']);
			}

			//Education in detail
			returnResultSet['EDUCATIONDETAIL'] = (bmgeneric.trim(partnerInfo['education'])) ?  bmgeneric.ucwords(bmgeneric.trim(partnerInfo['education'])) : bmlable.l_not_specified;
						
			//Viewing member occupation NotWorking  
			if (partnerInfo["occupationcategory"] == 5 && partnerInfo['occupationselected'] == 0) {
				returnResultSet['OCCUPATION'] = bmgenericarrys.OCCUPATIONCATEGORY[partnerInfo["occupationcategory"]];
			} else {
				returnResultSet["OCCUPATION"] = bmgeneric.appgetFromArryHash('OCCUPATIONLIST', partnerInfo['occupationselected']);
			}

			//occupation in detail
			returnResultSet["OCCUPATIONDETAIL"] = (partnerInfo["occupation"]) ?  bmgeneric.ucwords(partnerInfo["occupation"]) : bmlable.l_not_specified;

			//employed in
			employed_in = bmgeneric.appgetFromArryHash('OCCUPATIONCATEGORY', partnerInfo['occupationcategory']);

			//Employeed in checking 
			if (partnerInfo['occupationcategory'] == 6) {
				returnResultSet['EMPLOYEDIN'] = bmgenericarrys.OCCUPATIONCATEGORY[6]; //"Self Employed";
			}
			if (bmgeneric.trim(employed_in) == 'Private') {
				returnResultSet['EMPLOYEDIN'] = bmgenericarrys.OCCUPATIONCATEGORY[3]; //"Private Sector";
			} else {
				returnResultSet['EMPLOYEDIN'] = bmgeneric.ucwords(employed_in);
			}
			//Annual Income
			var View_Currency = bmgeneric.appgetFromArryHashEn('INCOMECURRENCYHASH', partnerInfo['incomecurrency']);
			if (bmgeneric.trim(partnerInfo['annualincome']) > 0) {
				var annual_income = '';
				convertedToIndianValue = '';
				income_in_inr = '';			
				if (partnerInfo['incomecurrency'] == 98) {
					annual_income = bmgeneric.appformatdigittoinr(partnerInfo['annualincome']);
				} else {
					annual_income = bmgeneric.number_format(partnerInfo['annualincome']);
					//#Condition for checking the APP Version greater than 4.8 for displaying the Annual Income in INR.
					if(bmgeneric.in_array(arg.APPTYPE,bmvars.ANDROIDAPPTYPE))
					{	
						var getCurrencyValue = CURRENCYVARAIABLEHASH[View_Currency];
						var convertedToIndianValue = bmgeneric.number_format(partnerInfo['annualincome']+"*$"+getCurrencyValue);
						if(getCurrencyValue!='' && convertedToIndianValue!='')
						{
							income_in_inr = ' / INR '+bmgeneric.appformatdigittoinr(partnerInfo['annualincomeininr']);
						}
					}
				}
				returnResultSet['ANNUALINCOME'] = View_Currency + " " + annual_income+income_in_inr;
			} else {
				returnResultSet['ANNUALINCOME'] = bmlable.l_not_specified;
			}			
			async.each(Object.keys(returnResultSet),function(key, next){
				if (returnResultSet[key] == '' || returnResultSet[key] == '-' || returnResultSet[key] == 'Any') {
					returnResultSet[key] = bmlable.l_not_specified;
				}
				if(returnResultSet[key] == bmlable.l_not_specified && global.REQUESTFLAG == 1 && bmgeneric.array_key_exists(key+"REQUEST",global.RequestComTypeArray))  
					global.requestInfoArr[key+"REQUEST"] = global.RequestComTypeArray[key+"REQUEST"];	
				next(null);
			},function(err){
				callback(null,returnResultSet);
			});	
		}catch(err){
			console.error("View Profile getprofInfo - Error:",err);
			return callback(err,{});
		}
	}