require('./config.js');
var schema = require('./schema.js');
var common = require('./common.js');
var spawn = require('child_process').spawn;
var mysqlservice = require('./mysqlservice.js');
var events = require('events');
var errorevent = new events.EventEmitter();
// var request = require('request');
var http = require('http');

var toDaydate = common.getDate();
var temp = [],
    temp2 = 0;
    mailercookendtemp = {};
    mailersendendtemp = {};
var periodiccnt = {};

function DailyServices(req, res) {
    try {
        //  var heapUsed = process.memoryUsage().heapUsed;
        //  console.log('Memory usage',heapUsed); 
        var days = {
            1: 'Mon',
            2: 'Tue',
            3: 'Wed',
            4: 'Thurs',
            5: 'Fri',
            6: 'Sat',
            7: 'Sun'
        };
        var date = new Date();
        var currentTime = common.getTime();
        var getucWord = date.getDay();
        if (temp2 == 0) {
            temp2 = getucWord;
        } else if (temp2 == getucWord) {
            console.log("Nothing")
        } else {
            temp = [];
            temp2 = getucWord;
        }
        var daysfreq = days[getucWord];
        daysfreq = daysfreq;
        // ************** CHECKING THE TODAYS MAILERS ***************//

        var query = {
            'BulkJobDays': {
                $regex: daysfreq
            }
        };
        schema.FindMongo(mongoConnection, mailermaster, query, '', function(err, result) {
            if (err) {
                throw new Error(err);
            } else {
                if (result.length > 0) {
                    var bulkJobid, shuduleTime, endTime, mysql_table, p_time, CookedStartTime, TableTruncStas, last_run, frequencyDay, SendStartTime, SendingScheduledStartTime, TotalCookingInstance, CookingInstanceInfo;
                    var log_Cooking_instance;
                    for (var i = 0; i < result.length; i++) {
                        bulkJobid = result[i].BulkJobId;
                        shuduleTime = result[i].CookingScheduledStartTime;
                        mysql_table = result[i].SendingDataSource;
                        endTime = result[i].CookingScheduledEndTime;
                        frequencyDay = result[i].BulkJobFrequency;
                        last_run = result[i].DateUpdated;
                        SendingScheduledStartTime = result[i].SendingScheduledStartTime;
                        TotalCookingInstance = result[i].CookingInstance;
                        TotalSendingInstance = result[i].TotalSendingInstance;
                        CookingInstanceInfo = result[i].CookingInstanceInfo[0];
                        var proceed = true;
                        if (frequencyDay) {
                            var proceed = common.getFrequency(last_run, frequencyDay);
                        }
                        if(mailercookendtemp[bulkJobid] && mailersendendtemp[bulkJobid]){ 
                                //trigger threshold
                                //date updated in master
                        }
                        if (proceed) {
                                

                            // **************** CHECKING THE MAILER SHUDULE TIME ***********//

                            if (shuduleTime <= currentTime ) {
                                // ******************* CHECKING THE AVG END TIME OF THE MAILER *********

                                //if (endTime >= currentTime) {

                                    var query2 = {
                                        '_id': parseInt(bulkJobid)
                                    };
                                    var querywherecaluse = {
                                        'Info': {
                                            $elemMatch: {
                                                'Date': common.getDate()
                                            }
                                        }
                                    };
                                    // ********************* CHECKING THE PRE COOKING ID START ************

                                    prepareTime(query2, querywherecaluse, function(err, value) {
                                        if (err) {
                                            p_time = "";
                                            CookedStartTime = ""
                                        } else {
                                            p_time = (common.isEmpty(value[0].Info)) ? "" : value[0].Info[0].PreCookedTime;
                                            CookedStartTime = (common.isEmpty(value[0].Info)) ? "" : value[0].Info[0].CookedStartTime;
                                            TableTruncStas = (common.isEmpty(value[0].Info)) ? "" : value[0].Info[0].TableTruncateStatus;
                                            SendStartTime = (common.isEmpty(value[0].Info)) ? "" : value[0].Info[0].SendStartTime;
                                            log_Cooking_instance = (common.isEmpty(value[0].Info)) ? "" : value[0].Info[0].CookingInstance;
                                            log_Sending_instance = (common.isEmpty(value[0].Info)) ? "" : value[0].Info[0].SendingInstance;
                                            var CookPeriodic = (common.isEmpty(value[0].Info)) ? "" : value[0].Info[0].CookPeriodic;
                                        }


                                        if (common.isEmpty(p_time)) {
                                            // console.log("preCooked Not report");
                                            // ------ PRE COOK ALERT -----
                                            errorevent.emit('error', 'preCooked Not report');

                                            mailsending(bulkJobid, "preCooked Not report");
                                        } else {
                                            // ************************* CHECKING THE TABLE IS TRUNCATED AND START THE COOKING *****                     

                                            if (common.isEmpty(TableTruncStas)) {
                                                // console.log('Tables are not truncated');
                                                errorevent.emit('error', 'Tables are not truncated');
                                                mailsending(bulkJobid, 'Tables are not truncated');

                                            } else if (false) {
                                                console.log('Precooking completed yet to start cooking');
                                                mailsending(bulkJobid, "Precooking completed yet to start cooking");
                                            } else {
                                                // ------ UPDATE COOUNT-----

                                                //console.log(log_Cooking_instance,TotalCookingInstance);
                                                TotalSendingInstance = 2;
                                                var instance_return = common.getInstances(log_Cooking_instance,TotalCookingInstance);
                                                var end_instance_return = common.getAllinstanceEndTime(log_Sending_instance, TotalSendingInstance,'SendEndTime');
                                                //SendingScheduledStartTime <= currentTime || 
                                                if (Object.keys(end_instance_return).length != TotalSendingInstance ) {
                                                    console.log(1, "sending start");
                                                    sendingStart();
                                                }else{
                                                    mailercookendtemp[bulkJobid] = 'SendEnd';
                                                }
                                                
                                                TotalCookingInstance = 2;
                                                var cook_end_instance_return = common.getAllinstanceEndTime(log_Cooking_instance, TotalCookingInstance,'CookEndTime');
                                                var instance_proceed = false;
                                                if(Object.keys(cook_end_instance_return).length != TotalCookingInstance){
                                                    instance_proceed = false;
                                                }
                                                if(instance_proceed){
                                                    mysqlservice.getUpdatedCount(mysql_table, function(err, result) {
                                                    // ************************
                                                    if (err) {
                                                        console.log(err);
                                                    }
                                                    var t_time = (common.isEmpty(value[0].Info)) ? "" : value[0].Info[0].TotalCooked;

                                                    if (Object.keys(instance_return).length > 0) {
                                                        for (var j = 1; j <= Object.keys(CookingInstanceInfo).length; j++) {
                                                            // for(var i=1;i <= Object.keys(instance_return).length;i++){
                                                            //if(CookingInstanceInfo['Instance'+j] == instance_return['Instance'+i]){
                                                            if (CookingInstanceInfo['Instance' + j]['CookedStartTime'] <= currentTime) {
                                                                if (instance_return.hasOwnProperty('Instance' + j)) {
                                                                    if (CookingInstanceInfo['Instance' + j]['CookedStartTime'] <= currentTime) {
                                                                        var val;
                                                                        if (common.isEmpty(temp)) {
                                                                            val = 0;
                                                                        } else {
                                                                            for (var j = 0; j < temp.length; j++) {
                                                                                if (Number(temp[j]._id) == Number(bulkJobid)) {
                                                                                    val = temp[j].count;
                                                                                } else {
                                                                                    console.log("Noo");
                                                                                }
                                                                            }
                                                                        }
                                                                        console.log("val", val);
                                                                        if (Number(val) == Number(result.TotalCooked)) {
                                                                            mailsending(bulkJobid, "No Update on count");
                                                                            //  console.log("No Update on count");
                                                                            errorevent.emit('error', 'No Update on count');
                                                                        } else {
                                                                            if (common.isEmpty(temp)) {
                                                                                temp.push({
                                                                                    "_id": bulkJobid,
                                                                                    "count": result.TotalCooked
                                                                                })
                                                                            } else {
                                                                                for (var j = 0; j < temp.length; j++) {

                                                                                    if (Number(temp[j]._id) == Number(bulkJobid)) {
                                                                                        // console.log("present")
                                                                                        temp[j].count = result.TotalCooked;
                                                                                    } else {
                                                                                        temp.push({
                                                                                            "_id": bulkJobid,
                                                                                            "count": result.TotalCooked
                                                                                        });
                                                                                    }
                                                                                }
                                                                            }


                                                                            if (Object.keys(value[0].Info[0].CookPeriodic).length) {
                                                                                var count = Object.keys(value[0].Info[0].CookPeriodic).length;
                                                                                var innercnt = 1;
                                                                                for (var prevcnt = 1; prevcnt <= count; prevcnt++) {
                                                                                    if (innercnt <= prevcnt) {
                                                                                        periodiccnt[innercnt] = value[0].Info[0].CookPeriodic[innercnt];
                                                                                        innercnt++;
                                                                                    }
                                                                                }
                                                                                periodiccnt[innercnt] = result.TotalCooked;
                                                                            } else {
                                                                                periodiccnt[1] = result.TotalCooked;
                                                                            }


                                                                            var mailerdetails = {
                                                                                $and: [{
                                                                                    '_id': bulkJobid
                                                                                }, {
                                                                                    Info: {
                                                                                        $elemMatch: {
                                                                                            'Date': common.getDate()
                                                                                        }
                                                                                    }
                                                                                }]
                                                                            };
                                                                            var updateDetails = {
                                                                                $set: {
                                                                                    'Info.$.TotalCooked': result.TotalCooked,
                                                                                    'Info.$.Cooked': result.Cooked,
                                                                                    'Info.$.CookPeriodic': periodiccnt
                                                                                }
                                                                            };

                                                                            var mailerdetails2 = {
                                                                                '$match': {
                                                                                    '_id': bulkJobid
                                                                                }
                                                                            };
                                                                            var query = {
                                                                                '$unwind': '$Info'
                                                                            };
                                                                            var query2 = {
                                                                                '$match': {
                                                                                    'Info.Date': last_run
                                                                                }
                                                                            };
                                                                            var query3 = {
                                                                                $project: {
                                                                                    'Bulkjobid': '$_id',
                                                                                    'CookPeriodic': '$Info.CookPeriodic'
                                                                                }
                                                                            };


                                                                            //////////////PERIODICT TIME CHECKING/////////////////////

                                                                            getPeriodicUpdate(mailerdetails2, query, query2, query3, function(err, run) {
                                                                                // var lastvalue = Object.keys(run[0]['CookPeriodic']).length;
                                                                                lastvalue = Object.keys(value[0].Info[0].CookPeriodic).length;
                                                                                Todaylastvalue = value[0].Info[0].CookPeriodic[Number(lastvalue)];
                                                                                // Todaylastvalue = 2555;
                                                                                lastUpdate = run[0]['CookPeriodic'][Number(lastvalue)];
                                                                                if (Number(Todaylastvalue) == Number(lastUpdate)) {
                                                                                    console.log('value are eq', Todaylastvalue, lastUpdate)
                                                                                } else if (Number(Todaylastvalue) != Number(lastUpdate)) {
                                                                                    // console.log('value are ~eq',(Todaylastvalue-lastUpdate));
                                                                                    percentage = (Todaylastvalue - lastUpdate) / lastUpdate * 100;

                                                                                    (percentage < -10) ? errorevent.emit('error', "today cooking period ", percentage, "lesserthen yesterday"): (percentage > 10) ? errorevent.emit('error', "today cooking period ", percentage, "greetherthen yesterday") : console.log("problem");
                                                                                    // console.log('percent',percentage);

                                                                                } else {
                                                                                    console.log('problem')
                                                                                }

                                                                            });
                                                                            ///////////////////// FUNCTION CLOSE////////////////

                                                                            updateTable(mailerdetails, updateDetails, function(value) {
                                                                                    console.log(value + "Value updated")
                                                                                });
                                                                                // console.log(value[0].Info[0].TotalCooked);
                                                                        }
                                                                        console.log("ins_running", instance_return['Instance' + j]['CookedStartTime']);
                                                                        console.log("ins2_running", CookingInstanceInfo['Instance' + j]['CookedStartTime']);
                                                                    } else {
                                                                        console.log('Time exit')
                                                                    }
                                                                } else {
                                                                    //Alert mail
                                                                    //  mailsending(instance_return['Instance'+j]['Name'],"Not start");
                                                                }
                                                            } else {
                                                                console.log('Time not come =>', CookingInstanceInfo['Instance' + j]['Name'])
                                                            }
                                                            // console.log(j)
                                                            // }
                                                        }
                                                    } else {
                                                        // console.log('No instance start yet')
                                                        errorevent.emit('error', 'No instance start yet');
                                                    }

                                                });
                                                }else{
                                                    mailercookendtemp[bulkJobid] = 'CookEnd';
                                                }
                                                console.log(mailercookendtemp);                                                
                                            }
                                        }
                                    });
                            } else {
                                console.log(bulkJobid + "s Starting at " + shuduleTime)
                            }
                        }
                    }
                } else {
                    console.log('No mailers are running today');
                }
            }
        });
    } catch (error) {
        console.log(error)
    }
}

////////  PRE COOKED TIME CHECKING /////////////////

function prepareTime(value, where, callback) {
    schema.FindMongo(mongoConnection, mailerslog, value, where, function(err, result) {
        if (err) {
            console.log(err)
        } else {
            if (result.length > 0) {
                callback(null, result);
            } else {
                callback('No Record Found');
            }


        }
    })
}


function getPeriodicUpdate(mailerdetails, query, query2, query3, callback) {
    schema.AggregateMongo(mongoConnection, mailerslog, mailerdetails, query, query2, query3, function(err, result) {
        if (err) {
            console.log(err)
        } else {
            // console.log("find",result);
            callback(null, result);
        }
    })
}


///// Sending /////////////////
function sendingStart() {
    // var execute = spawn('node', ['/home/product/community/www/bulkjobsmonitor/SendingMonitoring.js']);
    // execute.stdout.on('data', function(data) {
    //     console.log('out==>', data.toString());
    //     // console.log('ou2222t==>',typeof data.toString());
    //     // return data;
    // });
    // execute.stderr.on('data', function(data) {
    //     console.log('err==>', data.toString());
    // });
    console.log('sfkjhdfs');

}
//////// UPDATE COOKED VALUES ////////////////

function updateTable(mailerdetails, updateDetails, callback) {
    var options = {
        safe: true,
        upsert: true
    };
    schema.UpdateMonogo(mongoConnection, mailerslog, mailerdetails, updateDetails, options, "", function(err, result) {
        if (err) {
            console.log(err)
        } else {
            console.log("update", result);
            callback(result);
        }
    })
}

function mailsending(id, issue) {
    //   var  http = require('http');

    // http.post('http://192.168.20.206:8787/alertmail',{"id":id,"issue":issue}, function(resp) {
    //   var  data = '';

    //   // A chunk of data has been recieved.
    //   resp.on('data', function(chunk){
    //     data += chunk;
    //   });

    //   // The whole response has been received. Print out the result.
    //   resp.on('end', function() {
    //     console.log(JSON.parse(data).explanation);
    //   });

    // }).on("error", function(err){
    //   console.log("Error: " + err.message);
    // });
}

function execSeperateProcess(id){
    var execute = spawn('node', ['/home/product/community/www/bulkjobsmonitor/CookingMonitoring-new.js',id,'3000']);
    execute.stdout.on('data', function(data) {
        console.log('out==>', data.toString());
        // console.log('ou2222t==>',typeof data.toString());
        // return data;
    });
    execute.stderr.on('data', function(data) {
        console.log('err==>', data.toString());
        
    });

}



DailyServices();
// setInterval(function() {
//     DailyServices();
// }, 5000);
errorevent.on('error', function(data) {
  //   var options = {
  //       "method": "POST",
  // "hostname": [
  //   "192",
  //   "168",
  //   "20",
  //   "206"
  // ],
  //   port:'8787',
  //   path:['alertmail'],
  //       headers: {
  //           "Content-Type": "application/json",
  //           "Cache-Control": "no-cache",
  //       },
  //       body: JSON.stringify(data)
  //   };

  //   var req = http.request(options, function(res) {
  //       var chunks = [];

  //       res.on("data", function(chunk) {
  //           chunks.push(chunk);
  //       });

  //       res.on("end", function() {
  //           var body = Buffer.concat(chunks);
  //           console.log(body.toString());
  //       });
  //   });
    // request(options,function(error,response,body){
    //     if(error){
    //       console.log(error);
    //     }else{
    //       console.log(response);
    //       console.log(body);
    //     }
    // });



});