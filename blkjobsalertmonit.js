require('./config.js');
var schema = require('./schema.js');
var common = require('./common.js');

console.log(common.getFrequency('2018-05-21 00:00:00',1));
// var mysqlservice = require('./mysqlservice.js');

// var toDayDate = common.getDate();
// var temp=[],temp2=0;

// function DailyServices () {
// 	try{
// 		var date = new Date();
//         var currentTime = common.getTime();
//         var getucWord = date.getDay();
//         if(temp2==0){
//             temp2 = getucWord;
//          }else if(temp2 == getucWord){console.log("Nothing")}else{temp=[];temp2 = getucWord;}
//          var daysfreq = days[getucWord];
//          var query = {'BulkJobDays':{$regex:daysfreq}};
//          schema.FindMongo(mongoConnection,mailermaster,query,'',function(err,result){
//          	if(err){
//          		throw new Error(err);
//          	}else{
//          		if(result.length>0){
//          			var bulkJobid,shuduleTime,endTime,mysql_table,p_time,CookedStartTime,TableTruncStas,Mailerstart=0;
//          			for(var mailercnt=0;mailercnt< result.length;mailercnt++){
//          				bulkJobid = result[i].BulkJobId;
//                         shuduleTime = result[i].CookingScheduledTime ;
//                         mysql_table = result[i].SendingSource;
//                         endTime = result[i].CookingAvgEndTime;
//                         switch(bulkJobid){
//                         	case (shuduleTime <= currentTime):

//                         	break;
//                         	case (endTime < currentTime):

//                         	break;
//                         }
//                         if(Mailerstart){

//                         }else{
//                         	console.log('Mailer Not Yet Started');
//                         }


//          			}

//          		}else{

//          		}
//          	}



//          });

// 	}
// 	catch{

// 	}
// }



// DailyServices();