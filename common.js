var getDate = function () {
    var toDayDate = new Date();
    var day = (toDayDate.getDate() < 10) ? "0" + toDayDate.getDate() : toDayDate.getDate();
    var mnth = toDayDate.getMonth() + 1;
    mnth = (mnth < 10) ? "0" + mnth : mnth;
    var year = toDayDate.getFullYear();
    toDayDate = year + '-' + mnth + '-' + day + ' 00:00:00';
    return toDayDate;
};


var getWeekDate = function () {
    var toDayDate = new Date();
    var wkday = (toDayDate.getDate() < 10) ? "0" + toDayDate.getDate() : toDayDate.getDate();
    wkday = wkday - 7;
    wkday = (wkday < 10) ? "0" + wkday : wkday;
    var wkmnth = toDayDate.getMonth() + 1;
    wkmnth = (wkmnth < 10) ? "0" + wkmnth : wkmnth;
    var wkyear = toDayDate.getFullYear();
    toDayDate = wkyear + '-' + wkmnth + '-' + wkday + ' 00:00:00';
    return toDayDate;
};

var getTime = function(){
    var totime = new Date();
   /* var totime = new Date();
    var hrs = totime.getHours();
    var mins = totime.getMinutes();
    var hours = (hrs < 10)?'0'+ hrs  : hrs;
    var minutes = (mins < 10)?'0'+ mins  : mins;
    //hours = (hours+24-2)%24;
     var getMeridien = 'AM';
    if(hours == 0){ //At 00 hours we need to show 12 am
        hours = 12;
    }else if(hours>12){
        hours = hours%12;
        getMeridien = 'PM';
    }
    var CurrentTime = hours+':'+minutes+':00 '+getMeridien; */
    var hrs = totime.getHours();
    var mins = totime.getMinutes();
    var hours = (hrs < 10)?'0'+ hrs  : hrs;
    var minutes = (mins < 10)?'0'+ mins  : mins;
    var CurrentTime = hours+':'+minutes+':00 ';
    return CurrentTime;
};
function isEmpty(strIn)
{
    if (strIn === undefined)
    {
        return true;
    }
    else if(strIn == null)
    {
        return true;
    }
    else if(strIn == "")
    {
        return true;
    }
    else if(strIn == 0 || strIn == "0"){
        return true;
    }else if(strIn.length == 0){return true}else
    {
        return false;
    }
}

/*Merge Object Start*/
var MergeObject = function(obj, src) {
    for (var key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
}
/*Merge Object End*/


/*get frequency start*/
var getFrequency = function(prevdate,freq){
    var today       =new Date(prevdate);
    //convert the given time to unixtimestamp
    var getfreq   =new Date(prevdate).setDate(today.getDate()+freq); 
    //from unixtimestamp derive the date
    var mailerFreq = new Date(getfreq);
    var day = (mailerFreq.getDate() < 10) ? "0" + mailerFreq.getDate() : mailerFreq.getDate();
    var mnth = mailerFreq.getMonth() + 1;
    mnth = (mnth < 10) ? "0" + mnth : mnth;
    var year = mailerFreq.getFullYear();
    mailerFreq = year + '-' + mnth + '-' + day + ' 00:00:00';
    
    toDayDate = getDate(); // get current date
    if(toDayDate == mailerFreq){ // current date match with freq date then it is true
        return true;
    }else{
        return false;
    }
    


};
/*get frequency end*/


/*get running Instances start*/
var getInstances = function(mailerslog,instancescnt){
        var runningIntsance = {};
        if(mailerslog){
            var instances = [];
        for(var ins = 1;ins<=instancescnt;ins++){
            instances.push('Instance'+ins);
        }
        var masterkeyinstances = Object.keys(mailerslog);

        
        for(var chkarry in masterkeyinstances){
            var currentins = masterkeyinstances[chkarry];
            if(instances.indexOf(currentins)>=0){
                runningIntsance[currentins] = mailerslog[currentins];
            }

        }
        }
        
        return runningIntsance;
};
/*get running instances stop*/

var getAllinstanceEndTime = function(mailerslog,instancescnt,type){
    var runningIntsance = {};
        if(mailerslog){
            var instances = [];
        for(var ins = 1;ins<=instancescnt;ins++){
            instances.push('Instance'+ins);
        }
        var masterkeyinstances = Object.keys(mailerslog);

        
        for(var chkarry in masterkeyinstances){
            var currentins = masterkeyinstances[chkarry];
            if(instances.indexOf(currentins)>=0){
                if(mailerslog[currentins].hasOwnProperty(type)){
                    runningIntsance[currentins] = mailerslog[currentins];
                }
            }

        }
        }
        
        return runningIntsance;
};

var alertmail = function(id,issue){
	var nodemailer = require("nodemailer");
	var cons = require('consolidate');
	var path = require('path');
    // var reqObj = req;
    // reqObj = JSON.parse(reqObj.data);
    // // res.send(reqObj);
    var mailtemp = path.join(__dirname+'/views/mail.ejs');
    cons.ejs(mailtemp, {
        mailer_id: id,
        issue: issue
    }, function(err, html) {

        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'gunapuru21@gmail.com',
                pass: 'galla@1990'
            }

        });
        // setup email data with unicode symbols
        if (err) {
            console.log(err);
        } else {
            var mailOptions = {
                from: '"Mailer Alert" <shankaranand.arulanantham@communitymatrimony.com>', // sender address
                to: "<callmeshankar007@gmail.com>,<gunapuru21@gmail.com>", // list of receivers
                subject: "Mailer Alert", // Subject line
                generateTextFromHtml: true,
                html: html
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    });
}


exports.alertmail = alertmail;
exports.isEmpty = isEmpty;
exports.getDate = getDate;
exports.getWeekDate = getWeekDate;
exports.getTime = getTime;
exports.MergeObject = MergeObject;
exports.getFrequency = getFrequency;
exports.getInstances = getInstances;
exports.getAllinstanceEndTime = getAllinstanceEndTime;