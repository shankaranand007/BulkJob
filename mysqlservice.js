var mysqlservice = require("./mysql.js");
var finalresult = {};
var sendresult = {};

exports.getUpdatedCount = function(mysqlinfo, callback) {
  try {
      //console.log('mysqlinfo ===>',mysqlinfo[0]['Mysql']['Ip']);


       mysqlservice.createConnection(mysqlinfo[0]['Mysql']['Ip'],mysqlinfo[0]['Mysql']['User'],mysqlinfo[0]['Mysql']['Password'],mysqlinfo[0]['Mysql']['Database']);
       table = mysqlinfo[0]['Mysql']['Table'];
    table = table.split(",");
    var query = "SELECT ";
    for (var qry = 0; qry < table.length; qry++) {
      query +=
        "(SELECT count(1) FROM " + table[qry] + ") as " + table[qry] + ",";
    }
    query = query.slice(0, -1);
    mysqlservice.SelectMysql(query, function(err, result) {
      if (result) {
        var totalcooked = new Array();
        for (var i in result[0]) {
          totalcooked.push(result[0][i]);
        }
        finalresult.TotalCooked = totalcooked.reduce(getsum);
        finalresult.Cooked = result[0];
        callback(null, finalresult);
      }
    });
  } catch (error) {
    console.log(error);
    callback(error);
  }
};


exports.getUpdatedSendCount = function(mysqlinfo, callback){
    try{
      mysqlservice.createConnection(mysqlinfo[0]['Mysql']['Ip'],mysqlinfo[0]['Mysql']['User'],mysqlinfo[0]['Mysql']['Password'],mysqlinfo[0]['Mysql']['Database']);
       table = mysqlinfo[0]['Mysql']['Table'];
    table = table.split(",");
    var query = "SELECT ";
    for (var qry = 0; qry < table.length; qry++) {
      query +=
        "(SELECT count(1) FROM " + table[qry] + " WHERE status = 1) as " + table[qry] + ",";
    }
    query = query.slice(0, -1);
    mysqlservice.SelectMysql(query, function(err, result) {
      if (result) {
        var totalSend = new Array();
        for (var i in result[0]) {
          totalSend.push(result[0][i]);
        }
        sendresult.TotalSend = totalSend.reduce(getsum);
        sendresult.Send = result[0];
        callback(null, sendresult);
      }
    });
    }catch(error){
      callback(error);
    }
};


function getsum(total, sum) {
  return total + sum;
}
