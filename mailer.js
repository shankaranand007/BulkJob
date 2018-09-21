// var nodemailer = require("nodemailer");
// var cons = require('consolidate');
// path = require('path');

// mailtemp = path.join(__dirname+'/views/mail.ejs');

// id='61';
// value='Precook error';
// cons.ejs(mailtemp, { mailer_id: id, issue: value }, function(  err,  html) {



//   var transporter = nodemailer.createTransport({
//     service: "Gmail",
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: "gunapuru21@gmail.com",
//       pass: "galla@1990"
//     }
//   });

//   var mailOptions = {
//     from: '"Mailer Alert" <shankaranand.arulanantham@communitymatrimony.com>', // sender address
//     to: "<callmeshankar007@gmail.com>,<gunapuru21@gmail.com>", // list of receivers
//     subject: "Mailer Alert", // Subject line
//     generateTextFromHtml: true,
//     html: html
//   };

//   // send mail with defined transport object
//   transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//       console.log("error");
//       console.log(error);
//     } else {
//       // res.json({"var_code":"1","msg":"start","result":[]});
//       console.log("Email sent: " + info.response);
//     }
//   });
// });

//var path = require('path');
var nodemailer = require('nodemailer');
// var consolidate = require('consolidate');

// function AlertMail(id,value){
exports.alertmail = function(req, res) {
    console.log('mailerreq',req);
    // var reqObj = req.query;
    // reqObj = JSON.parse(reqObj.data);
    // // res.send(reqObj);
    // res.render('mail', {
    //     mailer_id: reqObj.id,
    //     issue: reqObj.issue
    // }, function(err, html) {

    //     var transporter = nodemailer.createTransport({
    //         service: 'Gmail',
    //         host: 'smtp.gmail.com',
    //         port: 587,
    //         secure: false, // true for 465, false for other ports
    //         auth: {
    //             user: 'gunapuru21@gmail.com',
    //             pass: 'galla@1990'
    //         }

    //     });
    //     // setup email data with unicode symbols
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         var mailOptions = {
    //             from: '"Mailer Alert" <shankaranand.arulanantham@communitymatrimony.com>', // sender address
    //             to: "<callmeshankar007@gmail.com>,<gunapuru21@gmail.com>", // list of receivers
    //             subject: "Mailer Alert", // Subject line
    //             generateTextFromHtml: true,
    //             html: html
    //         };

    //         // send mail with defined transport object
    //         transporter.sendMail(mailOptions, function(error, info) {
    //             if (error) {
    //                 res.send("end");
    //             } else {
    //                 res.json({"var_code": "1", "msg": "start","result": []});
    //                 console.log('Email sent: ' + info.response);
    //             }
    //         });
    //     }
    // });
}