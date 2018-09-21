var common = require('./common.js');
var schema = require('./schema.js');
var async = require("async");
require('./config.js');


exports.index = function (req, res) {

    schema.FindMongo(mongoConnection, mailermaster, {}, function (err, result) {
        if (err) {
            res.send([]);
        } else {
            if (result.length > 0) {
                var data = new Array();
                for (var id in result) {
                    data.push({BulkJobId: result[id].BulkJobId,
                        BulkJobName: result[id].BulkJobName,
                        BulkJobType: result[id].BulkJobType,
                        CookingInstanceInfo: result[id].CookingInstanceInfo,
                        BulkJobDays: result[id].BulkJobDays,
                        BulkJobFrequency: result[id].BulkJobFrequency,
                        CookingFileName: result[id].CookingFileName,
                        CookingInstance: result[id].CookingInstance,
                        SendingFileName: result[id].SendingFileName,
                        SendingInstance: result[id].SendingInstance,
                        CookingDataSource: result[id].CookingDataSource[0],
                        SendingDataSource: result[id].SendingDataSource[0],
                        ActiveStatus:result[id].ActiveStatus,
                        CookingScheduledStartTime: result[id].CookingScheduledStartTime,
                        CookingScheduledEndTime: result[id].CookingScheduledEndTime,
                        SendingScheduledStartTime: result[id].SendingScheduledStartTime,
                        SendingScheduledEndTime: result[id].SendingScheduledEndTime,
                        CookingHost:result[id].CookingHost[0],
                        SendingHost:result[id].SendingHost[0]
                    });
                }
                res.send(data);
            } else {
                res.send([]);
            }
        }
    });

};


exports.Today = function (req, res) {
     // function Today(req, res) {
   var days = {1:'Mon',2:'Tue',3:'Wed',4:'Thu',5:'Fri',6:'Sat',7:'Sun'};
   var date = new Date();
   var currentTime = common.getTime();
   var getucWord = date.getDay();
  var daysfreq = days[getucWord];
  daysfreq = daysfreq;
    var log1 = {$match:{'Info.Date':common.getDate()}}
  var log2 = {$unwind:'$Info'}
  var log3 = {$match:{'Info.Date':common.getDate()}}
  var log4 = {$project:{'Info':'$Info'}}
  var log_query = {Info:{$elemMatch:{'Date':common.getDate()}}}
  var query = {'BulkJobDays':{$regex:daysfreq}};
              async.parallel({
                master:(callback)=>{
                        schema.FindMongo(mongoConnection, mailermaster,query, '', function (err, result) {
                            if(err){
                                callback(err,null);
                            }else{
                            	
                                callback(null,result);
                            }
                        })
                },
                log:(callback)=>{

                    schema.AggregateMongo(mongoConnection,mailerslog,log1,log2,log3,log4, function (err, result2) {
                            if(err){
                                callback(err,null);
                            }else{
                                
                                callback(null,result2);
                            }
                    })
                }},
                (err,result)=>{
                	//console.log(JSON.stringify(result))
                    if(err){console.log(err)}else{
                        console.log(JSON.stringify(result.log))
                        // console.log(Object.keys(result.master).length,Object.keys(result.log).length)
                           var data = new Array();




                for (var id in result.master) {
                	
                		  if(Object.keys(result.log).length > 0){
                		  	
                	    for(var id2 in result.log){
                	    	console.log(result.log[id2]['_id'],result.master[id]['BulkJobId']);
                	        if(result.master[id]['BulkJobId'] === result.log[id2]['_id']){
                            	console.log("entere",result.master[id]['BulkJobId']);
                                 data.push({BulkJobId: result.master[id].BulkJobId,
                                    BulkJobName: result.master[id].BulkJobName,
                                    BulkJobType: result.master[id].BulkJobType,
                                    CookingInstanceInfo: result.master[id].CookingInstanceInfo,
                                    BulkJobDays: result.master[id].BulkJobDays,
                                    BulkJobFrequency: result.master[id].BulkJobFrequency,
                                    CookingFileName: result.master[id].CookingFileName,
                                    CookingInstance: result.master[id].CookingInstance,
                                    SendingFileName: result.master[id].SendingFileName,
                                    SendingInstance: result.master[id].SendingInstance,
                                    CookingDataSource: result.master[id].CookingDataSource[0],
                                    SendingDataSource: result.master[id].SendingDataSource[0],
                                    ActiveStatus:result.master[id].ActiveStatus,
                                    CookingScheduledStartTime: result.master[id].CookingScheduledStartTime,
                                    CookingScheduledEndTime: result.master[id].CookingScheduledEndTime,
                                    SendingScheduledStartTime: result.master[id].SendingScheduledStartTime,
                                    SendingScheduledEndTime: result.master[id].SendingScheduledEndTime,
                                    CookingHost:result.master[id].CookingHost[0],

                                    TotalCooked:result.log[0].Info.TotalCooked,
                                    TotalSend:result.log[0].Info.TotalSend,
                                    Cooked:result.log[0].Info.Cooked,
                                    Send:result.log[0].Info.Send,
                                    SendError:result.log[0].Info.SendError,
                                    CookError:result.log[0].Info.CookError,
                                    DBError:result.log[0].Info.Error,

                                    SendingHost:result.master[id].SendingHost[0]
                                });
                                 // console.log(data);
                            }else{
                            	console.log("Noo")
                            }
                        }
                    }else{
                    		 data.push({BulkJobId: result.master[id].BulkJobId,
                                    BulkJobName: result.master[id].BulkJobName,
                                    BulkJobType: result.master[id].BulkJobType,
                                    CookingInstanceInfo: result.master[id].CookingInstanceInfo,
                                    BulkJobDays: result.master[id].BulkJobDays,
                                    BulkJobFrequency: result.master[id].BulkJobFrequency,
                                    CookingFileName: result.master[id].CookingFileName,
                                    CookingInstance: result.master[id].CookingInstance,
                                    SendingFileName: result.master[id].SendingFileName,
                                    SendingInstance: result.master[id].SendingInstance,
                                    CookingDataSource: result.master[id].CookingDataSource[0],
                                    SendingDataSource: result.master[id].SendingDataSource[0],
                                    ActiveStatus:result.master[id].ActiveStatus,
                                    CookingScheduledStartTime: result.master[id].CookingScheduledStartTime,
                                    CookingScheduledEndTime: result.master[id].CookingScheduledEndTime,
                                    SendingScheduledStartTime: result.master[id].SendingScheduledStartTime,
                                    SendingScheduledEndTime: result.master[id].SendingScheduledEndTime,
                                    CookingHost:result.master[id].CookingHost[0],
                                    SendError:"Not start",
                                    CookError:"Not start",
                                    DBError:"Not start",
                                    SendingHost:result.master[id].SendingHost[0]
                                });
                            	 // break;
                                console.log(false)
                    }
                }





                console.log("data",data)
                res.send(data)
                    }
                    
                }
              );

};

exports.FullDetails = function (req, res) {

    try {
        var param = req.query;
        Mailerid = param.id;
        var match = {$match: {_id: parseInt(Mailerid)}};
        var unwind = {$unwind: '$Info'};
        var newmatch = {$match: {'Info.Date': {$gte: common.getWeekDate(), $lte: common.getDate()}}};
        var group = {$group: {_id: '$_id', Info: {$push: '$Info'}}};

        schema.AggregateMongo(mongoConnection, mailerslog, match, unwind, newmatch, group, function (err, result) {
            if (err) {
                throw new Error('No result found');
            } else {
                if (result.length > 0) {
                    data = result;
                     // console.log(data)
                } else {
                    data = [];
                }
                res.send(data);

            }
        });
    } catch (error) {
        
        res.send([]);
    }

};

exports.fillterdetails = function (req, res) {
// db.mailerslog.find({'Info.Date':{$gte:'2018-05-11 00:00:00',$lte:'2018-05-14 00:00:00'}}).pretty()
    try {
        var param = req.query;
        var date = JSON.parse(param.date);      
        var from = date.from +" 00:00:00";
        var to = date.to +" 00:00:00";
        var query = {'Info.Date': {$gte:from, $lte:to}};
        schema.Filter(mongoConnection,mailerslog,query, function (err, result) {
            if (err) {
                throw new Error('No result found');
            } else {
                // console.log(JSON.stringify(result));
                if (result.length > 0) {
                    data = result;
                } else {
                    data = '';
                } 
                // res.send(result);
                res.render('details/filterdetails', {data: data});
               
            }
        });
    } catch (error) {
        console.log(error);
        // res.json(error);
        res.redirect('/');
    }

};
/* exports.MoreInfo = function(req,res){
 try {
 var param = req.query;
 var query = common.getDate();
 schema.FindMongo(mongoConnection,masterloginfo,query,function(err,result){
 if(err){
 throw new Error('No result found');
 }else{
 console.log(result);
 res.render('details/moreinfo',{data:result});
 }  
 });
 
 } catch (error) {
 res.redirect('/');
 }
 }; */