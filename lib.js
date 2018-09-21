//new updated libarary file
require('./config.js');
var common = require('./common.js');
var schema = require('./schema.js');
exports.mailermaster = function (req, res) {
    try {
        var data = req.body;
        if (data) {
            if (data.MasterDetail) {
                mstrDetail = data.MasterDetail;
                query = {
                    BulkJobId: mstrDetail.id
                };
                schema.FindMongo(mongoConnection, mailermaster, query, function (err, result) {
                    var options = {
                        safe: true,
                        upsert: true
                    };
                    var insMongo = {};
                    if (err) {
                        throw new Error(err);
                    } else if (result.length > 0) {
                        insMongo['BulkJobId'] = mstrDetail.id;
                        var setoptions = { $set: {} };
                        for (var update in mstrDetail) {
                            if (typeof mstrDetail[update] == 'object') {
                                for (var nesobj in mstrDetail[update]) {
                                    if (typeof mstrDetail[update][nesobj] == 'object') {
                                        for (var innesobj in mstrDetail[update][nesobj]) {
                                            setoptions['$set'][update + '.0.' + nesobj + '.' + innesobj] = mstrDetail[update][nesobj][innesobj];
                                        }
                                    } else {
                                        setoptions['$set'][update + '.0.' + nesobj] = mstrDetail[update][nesobj];
                                    }

                                }
                            } else {
                                setoptions['$set'][update] = mstrDetail[update];
                            }
                        }
                        setoptions['$set']['DateUpdated'] = common.getDate();
                        delete (setoptions['$set']['id']);
                    } else {
                        var setoptions = {};
                        var insMongo = {};
                        for (var pushval in mstrDetail) {
                            if (typeof mstrDetail[pushval] != 'object') {
                                insMongo[pushval] = mstrDetail[pushval];
                            }
                        }
                        insMongo['BulkJobId'] = mstrDetail['id'];
                        delete insMongo['id'];
                        var arrPushInfo = {};
                        arrPushInfo['CookingHost'] = mstrDetail['CookingHost'];
                        arrPushInfo['SendingHost'] = mstrDetail['SendingHost'];
                        arrPushInfo['CookingDataSource'] = mstrDetail['CookingDataSource'];
                        arrPushInfo['SendingDataSource'] = mstrDetail['SendingDataSource'];
                        arrPushInfo['CookingInstanceInfo'] = mstrDetail['CookingInstanceInfo'];
                        arrPushInfo['SendingInstanceInfo'] = mstrDetail['SendingInstanceInfo'];
                        setoptions['$push'] = arrPushInfo;
                    }
                    // console.log('setoptions==>',setoptions);
                    schema.UpdateMonogo(mongoConnection, mailermaster, insMongo, setoptions, options, '', function (err, result) {
                        if (err) {
                            throw new Error(err);
                        } else {
                            res.send('success');
                        }
                    });
                });
            }
        } else {
            throw new Error('Post invalid data');
        }
    } catch (error) {
        console.log(error);
        res.send('Error');
    }
};
exports.mailerslog = function (req, res) {
    try {
        var data = req.body;
        console.log('data',data);
        if (data) {
            if (data.MasterInfo) {
                var infMongo = {};
                var options = {
                    safe: true,
                    upsert: true,
                    multi: true
                };
                mstrinfo = data.MasterInfo;
                if (mstrinfo['id']['Error'] || mstrinfo['id']['PreCookedError']) {
                    var altererror = (mstrinfo['id']['Error'] || mstrinfo['id']['PreCookedError']);
                    common.alertmail(mstrinfo['id'], altererror);
                }
                var query = {
                    '_id': mstrinfo.id,
                    'Info.Date': common.getDate()
                };
                schema.FindMongo(mongoConnection, mailerslog, query, function (err, result) {
                    if (err) {
                        throw new Error(err);
                    } else if (result.length > 0) {
                        var setoptions = {
                            $set: {}
                        };
                        infMongo._id = mstrinfo.id;
                        infMongo["Info.Date"] = common.getDate();
                        mstrinfo.Info.Date = common.getDate();
                        for (var incdta in mstrinfo.Info) {
                            if (typeof mstrinfo['Info'][incdta] == 'object') {
                                for (var nsobj in mstrinfo['Info'][incdta]) {
                                    if (typeof mstrinfo['Info'][incdta][nsobj] == 'object') {
                                        for (var innsobj in mstrinfo['Info'][incdta][nsobj]) {
                                            if (typeof mstrinfo['Info'][incdta][nsobj][innsobj] == 'object') {
                                                for (var innerobj in mstrinfo['Info'][incdta][nsobj][innsobj]) {
                                                    setoptions['$set']['Info' + '.$.' + incdta + '.' + nsobj + '.' + innsobj + '.' + innerobj] = mstrinfo['Info'][incdta][nsobj][innsobj][innerobj];
                                                }
                                            } else {
                                                setoptions['$set']['Info' + '.$.' + incdta + '.' + nsobj + '.' + innsobj] = mstrinfo['Info'][incdta][nsobj][innsobj];
                                            }

                                        }
                                    } else {
                                        setoptions['$set']['Info' + '.$.' + incdta + '.' + nsobj] = mstrinfo['Info'][incdta][nsobj];
                                    }
                                }
                            } else {
                                setoptions['$set']['Info' + '.$.' + incdta] = mstrinfo['Info'][incdta];
                            }
                        }
                        delete setoptions['$set']['Info.$.Date'];
                    } else {
                        var setoptions = {
                            $push: {}
                        };
                        infMongo._id = mstrinfo.id;
                        infMongo.BulkJobId = mstrinfo.id;
                        var arrInfoPush = {};
                        arrInfoPush['Date'] = common.getDate();
                        arrInfoPush['PreCookedTime'] = mstrinfo['Info']['PreCookedTime'];
                        arrInfoPush['CookedStartTime'] = mstrinfo['Info']['CookedStartTime'];
                        arrInfoPush['SendStartTime'] = mstrinfo['Info']['SendStartTime'];
                        arrInfoPush['CookedEndTime'] = mstrinfo['Info']['CookedEndTime'];
                        arrInfoPush['SendEndTime'] = mstrinfo['Info']['SendEndTime'];
                        arrInfoPush['TotalCooked'] = mstrinfo['Info']['TotalCooked'];
                        arrInfoPush['TotalSend'] = mstrinfo['Info']['TotalSent'];
                        arrInfoPush['CookingInstance'] = (mstrinfo['Info']['CookingInstance'] || {});
                        arrInfoPush['SendingInstance'] = (mstrinfo['Info']['SendingInstance'] || {});
                        arrInfoPush['CookPeriodic'] = (mstrinfo['Info']['CookPeriodic'] || {});
                        arrInfoPush['SendPeriodic'] = (mstrinfo['Info']['SendPeriodic'] || {});
                        arrInfoPush['SendError'] = mstrinfo['Info']['SendError'];
                        arrInfoPush['CookError'] = mstrinfo['Info']['CookError'];
                        arrInfoPush['Error'] = mstrinfo['Info']['Error'];
                        var consolidate = common.MergeObject(arrInfoPush, mstrinfo.Info);
                        setoptions['$push'].Info = consolidate;
                    }
                    console.log('new setoptions', setoptions);
                    schema.UpdateMonogo(mongoConnection, mailerslog, infMongo, setoptions, options, '', function (err, result) {
                        if (err) {
                            throw new Error(err);
                        } else {
                            res.send('success');
                        }
                    });
                });
            }
        } else {
            throw new Error('Post invalid data');
        }
    } catch (error) {
        res.send('Error');
    }
}
exports.MoreInfo = function (req, res) {
    try {
        console.log(req.body);
        var mrDtinfo = req.body;
        if (mrDtinfo.Fromdate && mrDtinfo.Todate) {
            fromdate = (mrDtinfo.Fromdate) + ' 00:00:00';
            todate = (mrDtinfo.Todate) + ' 00:00:00';
            var match = {
                $match: {
                    _id: parseInt(mrDtinfo.id)
                }
            };
            var unwind = {
                $unwind: '$Info'
            };
            var newmatch = {
                $match: {
                    'Info.Date': {
                        $gte: fromdate,
                        $lte: todate
                    }
                }
            };
            var group = {
                $group: {
                    _id: '$_id',
                    Info: {
                        $push: '$Info'
                    }
                }
            };
            schema.AggregateMongo(mongoConnection, mailerslog, match, unwind, newmatch, group, function (err, result) {
                if (err) {
                    throw new Error('Query Error');
                } else {
                    res.send(result);
                }
            });
        } else {
            throw new Error('Enter from and to date');
        }
    } catch (error) {
        res.send(error);
    }
}
var mongoSet = function (mstrDetail, masterNestedKey, masterKey) {
    var arr = {};
    var setarr = {
        $set: {}
    };
    var final = {};
    for (var key in mstrDetail) {
        if (masterNestedKey[key]) {
            //            if (typeof mstrDetail[key] == "object") {
            //                for (var innrky in mstrDetail[key]) {
            //                    for (var ef in mstrDetail[key][innrky]) {
            //                        setarr["$set"][masterNestedKey[key] + ".$." + innrky + "." + ef] = mstrDetail[key][innrky][ef];
            //                    }
            //                }
            //            }
            var setkey = masterNestedKey[key];
            setarr['$set'][setkey] = mstrDetail[key];
        } else if (masterKey[key]) {
            var conskey = masterKey[key];
            setarr['$set'][conskey] = mstrDetail[key];
        }
    }
    final['ins'] = arr;
    final['set'] = setarr;
    return final;
};
var mongoPush = function (mstrDetail, masterNestedKey, masterKey) {
    var arr = {};
    var pusharr = {
        $push: {}
    };
    var final = {};
    for (var key in mstrDetail) {
        if (masterNestedKey[key]) {
            var setkey = masterNestedKey[key];
            pusharr['$push'][setkey] = mstrDetail[key];
        } else if (masterKey[key]) {
            var conskey = masterKey[key];
            arr[conskey] = mstrDetail[key];
        }
    }
    final['ins'] = arr;
    final['push'] = pusharr;
    return final;
};