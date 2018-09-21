// var request = require('request');
var events = require('events');
var errorevent = new events.EventEmitter();
var common = require('./common.js');
var async = require('async');
var request = require('sync-request');

var count = 0;
var bulkJobid = [61, 66];
async.whilst(
    function () { return count < bulkJobid.length; },
    function (callback) {
        error_t(bulkJobid[count], 'No instance start yet');
        count++;
        callback(null, count);

    },
    function (err, n) {
        // 5 seconds have passed, n = 5
        console.log(n);
        // process.exit(0);
    }
);
function error_t(id, data) {
    let MailerInfo = {};
    MailerInfo['SendError'] = data;
    MailerInfo['SendErrorlist'] = {}
    MailerInfo['SendErrorlist'][common.getTime() + id] = data;
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
    let body = {
        MasterInfo: {
            id: parseInt(id),
            Info: MailerInfo
        }
    };
    body = JSON.stringify(body);
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
};



// var sendperioic = {1:100,2:150,3:234};
// var prevsendperiodic = {1:500,2:600,3:400};
// var todaytotal = 1000;
// var prevsent  = 1500;
// for(var i=1;i<=Object.keys(sendperioic).length;i++){
// 	if(prevsendperiodic.hasOwnProperty(i)){
// 		var percent = ((prevsendperiodic[i]-sendperioic[i])/sendperioic[i]);
// 		//var todaypercent = ((todaytotal-sendperioic[i])/sendperioic[i])*10;
// 		// if(percent<4 || percent>6){
// 		// 	console.log(i,'prev==>',percent);
// 		// 	console.log(prevsendperiodic[i],sendperioic[i]);

// 		// }
// 		((percent<0) || (percent>0) || console.log('else'))

// 		//console.log(i,'today==>',todaypercent);
// 	}
// }
