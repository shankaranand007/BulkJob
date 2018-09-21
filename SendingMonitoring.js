require('./config.js');
var schema = require('./schema.js');
var common = require('./common.js');
var mysqlservice = require('./mysqlservice.js');
var events = require('events');
var errorevent = new events.EventEmitter();
var request = require('sync-request');
var async = require('async');
var lib = require('./lib.js');

var toDaydate = common.getDate();
var temp = [],
    temp2 = 0;
var periodiccnt = {};
try {
    var heapUsed = process.memoryUsage().heapUsed;
    console.log('Sending Memory usage', heapUsed);
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
    var daysfreq = days[getucWord];
    daysfreq = daysfreq;
    var query = {
        'BulkJobDays': {
            $regex: daysfreq
        }
    };
    schema.FindMongo(mongoConnection, mailermaster, query, '', function (err, result) {
        if (err) {
            throw new Error(err);
        } else {
            if (result.length > 0) {
                var bulkJobid, shuduleTime, endTime, mysql_table, p_time, CookedStartTime, TableTruncStas, last_run, frequencyDay, SendStartTime, SendingScheduledstartTime, TotalCookingInstance, SendingInstanceInfo, vardateUpdated;
                var log_Cooking_instance;
                // for (var i = 0; i < result.length; i++) {
                var i = 0;
                async.whilst(
                    function () { return i < result.length; },
                    function (callback) {
                        bulkJobid = result[i].BulkJobId;
                        bulkJobname = result[i].BulkJobName;
                        shuduleTime = result[i].SendingScheduledStartTime;
                        mysql_table = result[i].SendingDataSource;
                        endTime = result[i].SendingScheduledEndTime;
                        frequencyDay = result[i].BulkJobFrequency;
                        last_run = result[i].DateUpdated;
                        SendingScheduledstartTime = result[i].SendingScheduledStartTime;
                        TotalSendingInstance = result[i].SendingInstance;
                        SendingInstanceInfo = result[i].SendingInstanceInfo[0];
                        vardateUpdated = result[i].DateUpdated;
                        var proceed = (result[i].ActiveStatus) ? true : false;
                        if (proceed) {
                            if (shuduleTime <= currentTime) {
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
                                prepareTime(query2, querywherecaluse, function (err, value) {
                                    if (err) {
                                        p_time = "";
                                        CookedStartTime = ""
                                    } else {
                                        log_Sending_instance = (common.isEmpty(value[0].Info)) ? "" : value[0].Info[0].SendingInstance;
                                        sendPeriodicCnt = (common.isEmpty(value[0].Info)) ? "" : value[0].Info[0].SendPeriodic;
                                        sendcount = (common.isEmpty(value[0].Info)) ? "" : (value[0].Info[0].TotalSend || '');

                                    }

                                    var instance_return = common.getInstances(log_Sending_instance, TotalSendingInstance);


                                    mysqlservice.getUpdatedSendCount(mysql_table, function (err, result) {
                                        if (err) {
                                            console.log(err);
                                        }
                                        if (Object.keys(instance_return).length > 0) {
                                            if (Number(sendcount) == Number(result.TotalSend)) {
                                                errorevent.emit('error', bulkJobid, bulkJobname, 'No Send Count Update on count');
                                                i++;
                                                callback(null, bulkJobid);
                                            } else {

                                                if (sendPeriodicCnt.length > 0) {
                                                    var count = Object.keys(value[0].Info[0].SendPeriodic).length;
                                                    var innercnt = 1;
                                                    for (var prevcnt = 1; prevcnt <= count; prevcnt++) {
                                                        if (innercnt <= prevcnt) {
                                                            periodiccnt[innercnt] = value[0].Info[0].SendPeriodic[innercnt];
                                                            innercnt++;
                                                        }
                                                    }
                                                    periodiccnt[innercnt] = result.TotalSend;
                                                } else {
                                                    periodiccnt[1] = result.TotalSend;
                                                }
                                                var match = {
                                                    $match: {
                                                        '_id': parseInt(bulkJobid)
                                                    }
                                                }
                                                var unwind = {
                                                    $unwind: '$Info'
                                                };
                                                var newmatch = {
                                                    $match: {
                                                        'Info.Date': vardateUpdated
                                                    }
                                                };
                                                var group = {
                                                    $project: {
                                                        _id: '$_id',
                                                        SendPeriodic: '$Info.SendPeriodic',
                                                        Date: '$Info.Date'
                                                    }
                                                };
                                                schema.AggregateMongo(mongoConnection, mailerslog, match, unwind, newmatch, group, function (err, aggres) {
                                                    if (err) {
                                                        errorevent.emit('console', bulkJobid, bulkJobname, 'Threshold Query Error');
                                                    } else {

                                                        if (aggres.length > 0) {
                                                            if (aggres[0]['SendPeriodic'] && Object.keys(value[0].Info[0].SendPeriodic).length) {
                                                                var lastvalue = Object.keys(value[0].Info[0].SendPeriodic).length;
                                                                var periodicvalue = ((aggres[0]['SendPeriodic'][lastvalue] - value[0].Info[0].SendPeriodic[lastvalue]) / value[0].Info[0].SendPeriodic[lastvalue]) * 100;
                                                                if (periodicvalue < -10) {
                                                                    errorevent.emit('console', bulkJobid, bulkJobname, 'Threshold decreased by {periodicvalue}');
                                                                } else if (periodicvalue > 10) {
                                                                    errorevent.emit('console', bulkJobid, bulkJobname, 'Threshold increased by {periodicvalue}');
                                                                } else {
                                                                    errorevent.emit('console', bulkJobid, bulkJobname, 'No threshold drop');
                                                                }
                                                            } else {
                                                                errorevent.emit('console', bulkJobid, bulkJobname, 'No previous threshold found');
                                                            }

                                                        }
                                                    }
                                                });
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
                                                        'Info.$.TotalSend': result.TotalSend,
                                                        'Info.$.Send': result.Send,
                                                        'Info.$.SendPeriodic': periodiccnt
                                                    }
                                                };
                                                updateTable(mailerdetails, updateDetails, function (value) {

                                                    errorevent.emit('error', bulkJobid, bulkJobname, 'DB update');
                                                    i++;
                                                    callback(null, bulkJobid);
                                                });
                                            }
                                        } else {
                                            errorevent.emit('error', bulkJobid, bulkJobname, 'No instance start yet');
                                            i++;
                                            callback(null, bulkJobid);
                                        }

                                    });
                                });
                            } else {
                                errorevent.emit('error', bulkJobid, bulkJobname, 'No instance started');
                                i++;
                                callback(null, bulkJobid);
                            }
                        }
                    },
                    function (err, res) {
                        // console.log(err);
                        // console.log('bulkjobId',res);
                        if (res) {
                            process.exit(0)
                        }
                    }


                );

                // }
            } else {
                errorevent.emit('error', '', '', 'No mailers are running today');
            }
        }
    });
} catch (error) {
    console.log(error)
}
function prepareTime(value, where, callback) {
    schema.FindMongo(mongoConnection, mailerslog, value, where, function (err, result) {
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
function updateTable(mailerdetails, updateDetails, callback) {
    var options = {
        safe: true,
        upsert: true
    };
    schema.UpdateMonogo(mongoConnection, mailerslog, mailerdetails, updateDetails, options, "", function (err, result) {
        if (err) {
            console.log(err)
        } else {
            console.log("update", result);
            callback(result);
        }
    })
}


errorevent.on('error', function (id, name, data) {
    let MailerInfo = {};
    MailerInfo['SendError'] = data;
    MailerInfo['SendErrorlist'] = {}
    MailerInfo['SendErrorlist'][common.getTime()+id] = data;
    var options = {
        url: 'http://192.168.20.25:8787/mailerslog',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            MasterInfo: {
                id: parseInt(id),
                Info: MailerInfo
            }
        },
        json: true
    };
    let body=  {
        MasterInfo: {
            id: parseInt(id),
            Info: MailerInfo
        }
    };
    body = JSON.stringify(body);
    //common.alertmail(id, name, data);
    // console.log(JSON.stringify(options));
    // request.post(options, function (err, res, body) {
    //     console.log(body);
    //     // process.exit(0);
    // });
    var res = request('POST', 'http://192.168.20.25:8787/mailerslog', {
        json: {
            MasterInfo: {
                id: parseInt(id),
                Info: MailerInfo
            }
        },
    });
    var user = res.getBody('utf8');
    console.log(user);
});

errorevent.on('console', function (id, name, data) {
    common.alertmail(id, name, data);
});
