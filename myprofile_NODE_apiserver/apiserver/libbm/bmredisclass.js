/*************************************************************************************************** 
* File		: bmredisclass.js
* Author	: K.Sathrak paldurai k
* Date		: 02-Sep-2017
* ************************************************************************************************** 
* Description	: Redis Class file.
****************************************************************************************************/
	
	var redis = require('redis');
	var bluebird = require('bluebird');
	bluebird.promisifyAll(redis.RedisClient.prototype);
	bluebird.promisifyAll(redis.Multi.prototype);
	
	DBVARS = {};
	DBVARS['TIMEOUT'] = 35;
	DBVARS['ALERTMAIL'] = 'serveralerts@consim.com,kumaran@bharatmatrimony.com,rrohini@bharatmatrimony.com,p.raja@bharatmatrimony.com,mano@bharatmatrimony.com,pradeepg@bharatmatrimony.com,karthi@bharatmatrimony.com,sathish.prabu@bharatmatrimony.com';
	DBVARS['EXPIRE'] = 86400;
		
	//Redis Master and Slave Ips
	var REDIS_MASTER = '172.22.0.214';
	var REDIS_SLAVE = '172.22.2.8';
	var REDIS_SLAVE1 = '172.22.0.215';
	//REdis MAster and Slave Port
	var MASTER_PORT = '6379';
	var SLAVE_PORT = '6380';
	var SLAVE_PORT1 = '6380';
	var AUTHPASSWORD = 'vcj9d6BH';
	
	REDISCONN = {}
	REDISCONN['M'] = redis.createClient(MASTER_PORT, REDIS_MASTER, {no_ready_check: true});
	//REDISCONN['M'].auth(AUTHPASSWORD, function (err) {
		//if (err)console.log("REDISMASTER Error:",err);
	//});

	REDISCONN['M'].on('connect', function() {
		console.log(' REDISMASTER Connected to Redis');
	});
	
	// if an error occurs, print it to the console
	REDISCONN['M'].on('error', function (err) {
		console.log("REDIS_SLAVE Error " + err);
	});
	
	REDISCONN['S'] = redis.createClient(SLAVE_PORT, REDIS_SLAVE, {no_ready_check: true});
	//REDISCONN['S'].auth(AUTHPASSWORD, function (err) {
		//if (err)console.log("REDIS_SLAVE Error:",err);
	//});

	REDISCONN['S'].on('connect', function() {
		console.log(' REDIS_SLAVE Connected to Redis');
	});
	
	// if an error occurs, print it to the console
	REDISCONN['S'].on('error', function (err) {
		console.log("REDIS_SLAVE Error " + err);
	});
	
	REDISCONN['S1'] = redis.createClient(SLAVE_PORT1, REDIS_SLAVE1, {no_ready_check: true});
	//REDISCONN['S'].auth(AUTHPASSWORD, function (err) {
		//if (err)console.log("REDIS_SLAVE Error:",err);
	//});

	REDISCONN['S1'].on('connect', function() {
		console.log(' REDIS_SLAVE1 Connected to Redis');
	});
	
	// if an error occurs, print it to the console
	REDISCONN['S1'].on('error', function (err) {
		console.log("REDIS_SLAVE1 Error " + err);
	});
	
	module.exports = class Clredis {
		//Function used to Connect the Redis both Master/Slave
		//if want to Connect Master the parameter must be "M"
		//if want to Connect Slave1 the parameter must be "S"

		//Function used to Get the value for the particular Key
		Redis_Get(key,type,dbType,next){
			//# type = 1 (when Key is not an Array)
			//# type = 2 (when Key is an Array)
			if((type==1) && (!bmgeneric.empty(key))){
				/*REDISCONN[dbType].get(key, function (err, reply) {
					console.log("reply :",reply); // Will print `OK` 
					next(err,reply);
				});*/
				REDISCONN[dbType].getAsync(key).then(function(res) {					
					next(null,res);
				});
			}else if((type==2) && bmgeneric.is_array(key) && !bmgeneric.empty(key)){
				REDISCONN[dbType].multi().get(key).execAsync().then(function(res) {
					console.log(res); // => 'bar'
					next(null,res);
				});
			} else {			
				next(null,false);
			}
		}
		
		//Function used to Set the value for the particular Key with expire and with out expire
		Redis_Set(key,value,dbType,expire){		
			if(bmgeneric.empty(expire)){
				expire = DBVARS['EXPIRE'];
			}
			if(!bmgeneric.empty(key) && !bmgeneric.empty(value)){						
				REDISCONN[dbType].set(key, value);
				// this key will expire after 10 seconds 
				REDISCONN[dbType].expire(key, parseInt(expire));
				return true;
			} else {
				return false;
			}
		}
		
		//Function to delete Key
		Redis_DeleteKey(key,dbType){
			if(!bmgeneric.empty(key)){		
				REDISCONN[dbType].del(key, function(err, response) {
				   if (response) {
						console.log("Deleted Successfully!")
						return true;
				   } else{
						console.log("Cannot delete",err)
						return false;
				   }
				})
			}else{
				return false;
			}
		}
	}