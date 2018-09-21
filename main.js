require('./config.js');
var schema = require('./schema.js');
var common = require('./common.js');
var spawn = require('child_process').spawn;
var mysqlservice = require('./mysqlservice.js');
var events = require('events');
var async = require("async");
var errorevent = new events.EventEmitter();

var toDaydate = common.getDate();

function Monit(){

}
// async.retry(3, apiMethod, function(err, result) {
//     if(err){console.log(err)}else{console.log(result)}
// });
// function apiMethod(callback){
//     callback(null,"result");
// }
// async.retry({interval: 500},call
//   ,
//     function(err,result){
//       console.log(err)
//     //   console.log(result)
//     }
//   )

//   function call(callback){
//     console.log('foo')
//     callback('bar')
// //   }
// async.retry(3, fn, function(err){console.log(err)})
// function fn(next){console.log("var");next("err")}