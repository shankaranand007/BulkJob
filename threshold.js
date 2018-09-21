require('./config.js');
var schema = require('./schema.js');
var events = require('events');
var myemitter = new events.EventEmitter();

//var threshold = function(date,id){
function threshold(id,type){	
	try{
		var findquery = {};
		var SelectQuery = {BulkJobId:id,DateUpdated:1};
		schema.FindMongo(mongoConnection,mailermaster,findquery,SelectQuery,function(err,result){
			if(err){
				throw new Error('Db Select Err');
			}else{
				var dateUpdated = result[0]['DateUpdated'];
				var logquery = {};
				var selectlogquery = {'BulkJobId':id,};
				var match = {
                $match: {
                    _id: parseInt(id)
                }
            };
            var unwind = {
                $unwind: '$Info'
            };
            var newmatch = {
                $match: {'Info.Date': dateUpdated}
            };
            var group = {
                $project: {
                    _id: '$_id',
                    SendPeriodic: '$Info.{type}',
                    Date:'$Info.Date'
                }
            };
            schema.AggregateMongo(mongoConnection, mailerslog, match, unwind, newmatch, group, function(err, aggres) {
            	if(err){
            		throw new Error('Db Select Err');
            	}else{
            		if(aggres[0][type]){
            			//console.log()
            		}else{
            			//throw new Error('dgdfgdfgdfgdfgdfg');

            			myemitter.emit('newerror','No threshld Found')
            			
            		}
            	}
            });

			}
		});
	}catch(err){
		console.log(err);
	}
}
threshold(61,'CookPeriodic');
//exports.threshold = threshold;
myemitter.on('newerror',function(data){
	console.log(data);
});