var mysql = require("mysql");

exports.createConnection = function (varhost, varuser, varpass, vardb) {
  global.connection = mysql.createPool({
    host: varhost,
    user: varuser,
    password: varpass,
    database: vardb
  });
  connection.on("error", function () {
    console.log("DB connection Error");
  });
  connection.on("connection", function () {
    console.log("connection created");
  });
  connection.on("release", function () {
    console.log("connection released");
  });
  connection.on("release", function () {
    console.log("connection acquired");
  });
  connection.on("end", function () {
    console.log("connection end");
  });
}

exports.SelectMysql = function (query, bindparams, callback) {
  if (bindparams) {
    connection.getConnection(function (err, conn) {
      if (err) {
        callback('Db Connection Error');
      } else {
        conn.query(query, bindparams, function (err, qryres) {
          if (err) { callback(err); }
          else { conn.release(); callback(null, qryres); }
        });
      }
    });
  } else {
    connection.getConnection(function (err, conn) {
      if (err) {
        callback(err);
      } else {
        conn.query(query, function (err, qryres) {
          if (err) { callback(err); }
          else { conn.release(); callback(null, qryres); }
        });
      }
    });
  }
};
