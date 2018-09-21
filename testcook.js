require('./config.js');
var schema = require('./schema.js');
var common = require('./common.js');
var spawn = require('child_process').spawn;
var mysqlservice = require('./mysqlservice.js');
var events = require('events');
var request = require('sync-request');
var async = require("async");
var errorevent = new events.EventEmitter();

var toDaydate = common.getDate();
var temp = [],
    temp2 = 0,
    mailercookendtemp = {};
mailersendendtemp = {};;
var periodiccnt = {};


function DailyServices(req, res) {
    var i = 0;
    try {
         console.log(process.memoryUsage().heapUsed); 
        var days = {
            1: 'Mon',
            2: 'Tue',
            3: 'Wed',
            4: 'Thu',
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
        schema.FindMongo(mongoConnection, mailermaster, query, '', (err, result) => {
            if (err) {
                throw new Error(err);
            } else {
                if (result.length > 0) {
                    async.whilst(
                        () => {
                            return i < result.length;
                        },
                        (callback) => {
                            var bulkJobid, shuduleTime, endTime, mysql_table, p_time, CookedStartTime, TableTruncStas, last_run, frequencyDay, SendStartTime, SendingScheduledStartTime, TotalCookingInstance, CookingInstanceInfo, TotalSendingInstance;
                            var log_Cooking_instance, ActiveStatus, EstimatedTotalCookCount, Bjname,EstimatedTotalSendCount;

                            bulkJobid = result[i].BulkJobId;
                            Bjname = result[i].BulkJobName;
                            shuduleTime = result[i].CookingScheduledStartTime;
                            mysql_table = result[i].SendingDataSource;
                            endTime = result[i].CookingScheduledEndTime;
                            frequencyDay = result[i].BulkJobFrequency;
                            last_run = result[i].DateUpdated;
                            SendingScheduledStartTime = result[i].SendingScheduledStartTime;
                            TotalCookingInstance = result[i].CookingInstance;
                            TotalSendingInstance = result[i].TotalSendingInstance;
                            CookingInstanceInfo = result[i].CookingInstanceInfo[0];
                            ActiveStatus = result[i].ActiveStatus;
                            EstimatedTotalCookCount = result[i].EstimatedTotalCookCount;
                            EstimatedTotalSendCount = result[i].EstimatedTotalSendCount;
                            console.log(bulkJobid);
                            var proceed = true;
                            if (common.isEmpty(ActiveStatus)) {} else {
                                if (frequencyDay) {
                                    var proceed = common.getFrequency(last_run, frequencyDay);
                                }
                                if (mailercookendtemp[bulkJobid] && mailersendendtemp[bulkJobid]) {
                                    errorevent.emit('masterupdate', bulkJobid, EstimatedTotalCookCount,EstimatedTotalSendCount, Bjname);
                                }
                                if (proceed) {
                                    // **************** CHECKING THE MAILER SHUDULE TIME ***********//

                                    if (shuduleTime <= currentTime) {
                                        // ******************* CHECKING THE AVG END TIME OF THE MAILER *********//

                                        // if (endTime >= currentTime) {
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
                                        // ********************* CHECKING THE PRE COOKING ID START ************//
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
                                                // ------ PRE COOK ALERT -----
                                                errorevent.emit('error', bulkJobid, Bjname, 'preCooked Not report');
                                                i++;
                                                callback(null, bulkJobid);
                                            } else {
                                                // ************************* CHECKING THE TABLE IS TRUNCATED AND START THE COOKING *****//                     

                                                if (common.isEmpty(TableTruncStas)) {
                                                    errorevent.emit('error', bulkJobid, Bjname, 'Tables are not truncated');
                                                    i++;
                                                    callback(null, bulkJobid)
                                                } else if (false) {
                                                    console.log('Precooking completed yet to start cooking');
                                                } else {
                                                    // ------ UPDATE COOUNT-----
                                                    var instance_return = common.getInstances(log_Cooking_instance, TotalCookingInstance);

                                                    var end_instance_return = common.getAllinstanceEndTime(log_Sending_instance, TotalSendingInstance, 'SendEndTime');

                                                    // *********SENDING********

                                                    if (Object.keys(end_instance_return).length != TotalSendingInstance) {
                                                        console.log(1, "sending start");
                                                        sendingStart();
                                                    } else {
                                                        mailersendendtemp[bulkJobid] = 'SendEnd';
                                                    }
                                                    var instance_proceed = false;
                                                    var cook_end_instance_return = common.getAllinstanceEndTime(log_Cooking_instance, TotalCookingInstance, 'CookEndTime');
                                                    if (Object.keys(cook_end_instance_return).length != TotalCookingInstance) {
                                                        instance_proceed = true;
                                                    }

                                                    // *********PLACE TO EXCUTE**********?
                                                    if (instance_proceed) {
                                                        mysqlservice.getUpdatedCount(mysql_table, (err, result) => {

                                                            if (err) {
                                                                console.log(err);
                                                            }
                                                            var t_time = (common.isEmpty(value[0].Info)) ? "" : value[0].Info[0].TotalCooked;

                                                            if (Object.keys(instance_return).length > 0) {
                                                                for (var j = 1; j <= Object.keys(CookingInstanceInfo).length; j++) {
                                                                    // for(var i=1;i <= Object.keys(instance_return).length;i++){
                                                                    //if(CookingInstanceInfo['Instance'+j] == instance_return['Instance'+i]){
                                                                    // if (CookingInstanceInfo['Instance' + j]['CookedStartTime'] <= currentTime) {
                                                                    if (instance_return.hasOwnProperty('Instance' + j)) {
                                                                        // if (CookingInstanceInfo['Instance' + j]['CookedStartTime'] <= currentTime) {
                                                                        var val;
                                                                        if (common.isEmpty(temp)) {
                                                                            val = 0;
                                                                        } else {
                                                                            for (var k = 0; k < temp.length; k++) {
                                                                                if (Number(temp[k]._id) == Number(bulkJobid)) {
                                                                                    val = temp[k].count;
                                                                                } else {
                                                                                    console.log("Noo");
                                                                                }
                                                                            }
                                                                        }
                                                                        console.log("val", val);
                                                                        if (Number(val) == Number(result.TotalCooked)) {
                                                                            errorevent.emit('error', bulkJobid, Bjname, 'No Update on count');
                                                                            i++;
                                                                            callback(null, bulkJobid)
                                                                        } else {
                                                                            if (common.isEmpty(temp)) {
                                                                                temp.push({
                                                                                    "_id": bulkJobid,
                                                                                    "count": result.TotalCooked
                                                                                })
                                                                            } else {
                                                                                for (var count_check = 0; count_check < temp.length; count_check++) {

                                                                                    if (Number(temp[count_check]._id) == Number(bulkJobid)) {
                                                                                        temp[count_check].count = result.TotalCooked;
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

                                                                            getPeriodicUpdate(mailerdetails2, query, query2, query3, (err, run) => {
                                                                                // var lastvalue = Object.keys(run[0]['CookPeriodic']).length;
                                                                                lastvalue = Object.keys(value[0].Info[0].CookPeriodic).length;
                                                                                Todaylastvalue = value[0].Info[0].CookPeriodic[Number(lastvalue)];
                                                                                lastUpdate = run[0]['CookPeriodic'][Number(lastvalue)];
                                                                                if (Number(Todaylastvalue) == Number(lastUpdate)) {
                                                                                    console.log('value are eq', Todaylastvalue, lastUpdate)
                                                                                } else if (Number(Todaylastvalue) != Number(lastUpdate)) {
                                                                                    percentage = (Todaylastvalue - lastUpdate) / lastUpdate * 100;

                                                                                    (percentage < -10) ? errorevent.emit('error', bulkJobid, Bjname, "today cooking period " + percentage + "lesserthen yesterday"): (percentage > 10) ? errorevent.emit('error', bulkJobid, Bjname, "today cooking period " + percentage + "greetherthen yesterday") : console.log("problem");

                                                                                } else {
                                                                                    console.log('problem')
                                                                                }

                                                                            });
                                                                            ///////////////////// FUNCTION CLOSE////////////////

                                                                            updateTable(mailerdetails, updateDetails, (value) => {
                                                                                console.log(value + "Value updated")
                                                                                errorevent.emit('error', bulkJobid, Bjname, 'DB updateing');
                                                                                i++;
                                                                                callback(null, bulkJobid)
                                                                            })
                                                                        }
                                                                        console.log("ins_running", instance_return['Instance' + j]['CookedStartTime']);
                                                                        console.log("ins2_running", CookingInstanceInfo['Instance' + j]['CookedStartTime']);
                                                                        // } else {
                                                                        //     errorevent.emit('error',bulkJobid, 'Time exit');
                                                                        // }
                                                                    } else {
                                                                        //  mailsending(instance_return['Instance'+j]['Name'],"Not start");
                                                                    }
                                                                    // } else {
                                                                    //     console.log('Time not come =>', CookingInstanceInfo['Instance' + j]['Name'])
                                                                    // }
                                                                }
                                                            } else {
                                                                errorevent.emit('error', bulkJobid, Bjname, 'No instance start yet');
                                                                i++;
                                                                callback(null, bulkJobid)
                                                            }
                                                        });
                                                    } else {
                                                        mailercookendtemp[bulkJobid] = 'CookEnd';
                                                    }
                                                }
                                            }
                                        });
                                        // } else {
                                        //     errorevent.emit('error',bulkJobid, 'Mailer End');
                                        // }
                                    } else {
                                        errorevent.emit('error', bulkJobid, Bjname, 'Yet_To_Start');
                                    }
                                }
                            }
                            // i++;
                            // callback(null, "end")
                        },
                        // ***********MAIN CALLBACK********
                        (err,main) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log("main callback", main);
                            }
                        }
                    );
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
    schema.FindMongo(mongoConnection, mailerslog, value, where, (err, result) => {
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

////////  PERIODIC TIME CHECKING /////////////////

function getPeriodicUpdate(mailerdetails, query, query2, query3, callback) {
    schema.AggregateMongo(mongoConnection, mailerslog, mailerdetails, query, query2, query3, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            callback(null, result);
        }
    })
}


///// Sending /////////////////

function sendingStart() {
    var execute = spawn('node', ['/home/node/BulkJobs/SendingMonitoring.js']);
    execute.stdout.on('data', (data) => {
        console.log('out==>', data.toString());
        // console.log('ou2222t==>',typeof data.toString());
        // return data;
    });
    execute.stderr.on('data', (data) => {
        console.log('err==>', data.toString());
    });

}
//////// UPDATE COOKED VALUES ////////////////

function updateTable(mailerdetails, updateDetails, callback) {
    var options = {
        safe: true,
        upsert: true
    };
    schema.UpdateMonogo(mongoConnection, mailerslog, mailerdetails, updateDetails, options, "", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log("update", result);
            callback(result);
        }
    })
}

errorevent.on('error', (id, name, data) => {
    let MailerInfo = {};
    MailerInfo['CookError'] = data;
    MailerInfo['SendErrorlist'] = {}
    MailerInfo['SendErrorlist'][common.getTime()] = data;

    if (data == 'Finished') {
        MailerInfo['Status'] = 'Completed';
    } else if (data == 'Yet_To_Start') {
        MailerInfo['Status'] = 'Yet to start';
    } else {
        MailerInfo['Status'] = 'Running';
    }
    var res = request('POST', 'http://192.168.20.25:8787/mailerslog', {
        json: {
            MasterInfo: {
                id: parseInt(id),
                Info: MailerInfo
            }
        },
    });
    // console.log(res);
    // var user = res.getBody('utf8');
    // console.log(user);
    // console.log(request);

    // common.alertmail(id, name, data);
});

errorevent.on('masterupdate', (id, EstimatedTotalCookCount,EstimatedTotalSendCount, Bjname) => {
    var setval = {
        $set: {
            DateUpdated: common.getDate()
        }
    };
    var masterupd = {
        BulkJobId: id
    }
    var options = {
        safe: true,
        upsert: true
    };
    async.race([
            (callback) => {
                schema.UpdateMonogo(mongoConnection, mailermaster, masterupd, setval, options, '', (err, result) => {
                    callback(err, result);
                });
            },
            (callback) => {
                errorevent.emit('error', id, Bjname, 'Finished');
                callback(null, "update")
            },
            (callback) => {
                var last_value2 = EstimatedTotalCookCount;
                var today_value;
                for (var count_check2 = 0; count_check2 < temp.length; count_check2++) {
                    if (Number(temp[count_check2]._id) == Number(id)) {
                        today_value = temp[count_check2].count;
                        if (Number(today_value) == Number(last_value2)) {
                            console.log('value are eq', today_value, last_value2)
                        } else if (Number(today_value) != Number(last_value2)) {
                            var percentage = (today_value - last_value2) / last_value2 * 100;
                            (percentage < -10) ? errorevent.emit('error', id, Bjname, "today total cooking period " + percentage + "lesserthen yesterday"): (percentage > 10) ? errorevent.emit('error', id, Bjname, "today today cooking period " + percentage + "greetherthen yesterday") : console.log("problem");
                        } else {
                            console.log('problem')
                        }
                    }
                }
                callback(null, "threshold cook")
            }
        ],
        (err, result) => {
            console.log("threshold", result)
        });

    var data = {
        issue: 'Mailer completed both sending and cooking'
    }
    common.alertmail(id, data);
});

DailyServices();
setInterval(() => {
    DailyServices();
}, 18000000);