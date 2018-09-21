
//npm modules

express = require("express");
bodyParser = require("body-parser");


//user defined modules
// require("./config.js");
// var schema = require("./schema.js");
// var lib = require("./lib.js");
// var views = require("./views.js");
// var service = require('./CookingMonitoring.js');
// var common = require('./common.js');
// var mailer = require('./mailer.js');
// var cors = require('cors');
// var path = require('path');
var app = express();

app.listen(8787);

process.on("uncaughtException", function(err) {
  console.log("exception triggered out", err);
});
process.on("UnhandledRejection", function(err) {
  console.log("process Rejection", err);
});

console.log("ase")

// app.use(cors());

// mongoConnection.on("open", function() {
//   console.log("monogo connection initiated");
// });

// mongoConnection.on("error", function(err) {
//   console.log("monogo connection error", err);
// });
// mongoConnection.on("close", function() {
//   console.log("monogo connection closed");
// });

//  app.use(express.static(path.join(__dirname, 'dist')));
// app.get('', function(req, res) {
//   res.sendFile(path.join(__dirname, '/dist/index.html'));
// });

// app.set('view engine','html');
//To parse form datas
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.post("/mailermaster", lib.mailermaster);
// app.post("/mailerslog", lib.mailerslog);

// app.get("/views", views.index);
// app.get("/today_master", views.Today);
// app.get("/fulldetails", views.FullDetails);
// app.get("/filter", views.fillterdetails);
// app.post("/moreinfo", lib.MoreInfo);
// app.post("/alertmail", mailer.alertmail);
// var sending = require('./SendingMonitoring.js');
//app.post("/serve", service.check_daily_service);

