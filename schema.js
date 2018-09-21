mongoose = require("mongoose");
require('./config.js');
var optionsdB = {
    // server: {
      auto_reconnect: true,
    //   socketOptions: {
    //     keepAlive: 3600000
    //   }
    //}
  };
global.mongoConnection = mongoose.createConnection("mongodb://" + dbinfo.mongohost + "/" + dbinfo.dbname,optionsdB);  
Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
var mailermaster  = function (){
    schema = new Schema({
        
        BulkJobId: Number,
		BulkJobName: String,
        BulkJobType: String,
		BulkJobDays:String,
        BulkJobFrequency: Number,
        ActiveStatus:Number,
        CookingExpectedStartTime: String,
		CookingExpectedEndTime:String,
		CookingScheduledStartTime:String,
        CookingScheduledEndTime:String,
		SendingExpectedStartTime:String,
		SendingExpectedEndTime:String,
        SendingScheduledStartTime: String,
        SendingScheduledEndTime: String,
        CookingTimeWindow:String,
        SendingTimeWindow:String,
        EstimatedTotalCookCount:Number,
        EstimatedTotalSendCount:Number,
        CountUpdateRotation:Number,
        CookingFileName: String,
        CookingInstance: Number,
        SendingFileName: String,
        SendingInstance: Number,
        CookingHost: [],
        SendingHost: [],
        CookingDataSource: [],
        SendingDataSource: [],
        CookingInstanceInfo:[],
        SendingInstanceInfo:[],
        Description: String,
        DateCreated: String,
        DateUpdated: String,
        MailerRunningHours:Number
    }, {collections: 'mailermaster'});
    return schema;
}

var mailerslog = function () {
    schema = new Schema({
        _id: Number,
        BulkJobId:Number,
        Info: []
    }, {collections: 'mailerslog'});
    return schema;
}

var UpdateMonogo = function (connection, tablescehma, query, setopt, options, updwherequery, callback) {
    try {
        if (connection && tablescehma && query) {
            if (setopt) {
                tablescehma.update(query, setopt, options, function (err, result) {
                    if (err) {
                        throw new Error(err);
                    } else {
                        callback(null, result);
                    }
                });

            } else {
                tablescehma.update(updwherequery, query, options, function (err, result) {
                    if (err) {
                        console.log('err', err);
                        throw new Error(err);
                    } else {
                        callback(null, result);
                    }
                });
            }

        } else {
            throw new Error('Data invalid');
        }

    } catch (error) {
        callback(error);
    }
};

var FindMongo = function (connection, tableschema, query,whereclause, callback) {
    try {
        if (connection && tableschema) {
            tableschema.find(query,whereclause, function (err, result) {
                if (err)
                    throw new Error(err);
                else
                    callback(null, result);
            });
        } else {
            throw new Error('Error in Params');
        }
    } catch (error) {
        callback(error);
    }
};


var AggregateMongo = function (connection, tableschema, match, unwind, newmatch, group, callback) {
    try {
        if (connection && tableschema) {
            tableschema.aggregate([match,unwind,newmatch,group], function (err, result) {
                if (err)
                    throw new Error(err);
                else
                    callback(null, result);
            });
        } else {
            throw new Error('Error in Params');
        }    
    } catch (error) {
        callback(error);
    }

};


exports.Filter = function (connection, tableschema, query, callback) {
    try {
        if (connection && tableschema) {
            tableschema.find(query, function (err, result) {
                if (err)
                    throw new Error(err);
                else
                    callback(null, result);
            });
        } else {
            throw new Error('Error in Params');
        }
    } catch (error) {
        callback(error);
    }
};
/* module.exports = {
    mailermaster:mailermaster,
    mailerslog:mailerslog,
    UpdateMonogo:UpdateMonogo,
    FindMongo:FindMongo,
    AggregateMongo:AggregateMongo


} */

exports.mailermaster = mailermaster;
exports.mailerslog = mailerslog;
exports.UpdateMonogo = UpdateMonogo;
exports.FindMongo = FindMongo;
exports.AggregateMongo = AggregateMongo;


global.mailermaster = mongoConnection.model("mailermaster",mailermaster(),  "mailermaster");
global.mailerslog = mongoConnection.model(  "mailerslog",mailerslog(),  "mailerslog");


