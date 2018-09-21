/******************************************************************************************************
| File Name			: bmmcmemcacheclass.js
| Author Name		: Sathrak Paldurai k
| Created On		: 24 Aug, 2017
| Description		: MemCache Class
******************************************************************************************************/
	var Memcached = require('memcached');
	//Live Server IP
	var bm_mem_servers = {0 : '172.29.22.227:1234', 1 : '172.29.22.235:1234', 2 : '172.29.22.121:1234', 3 : '172.29.22.141:1234', 4 : '172.29.22.250:1234', 5 : '172.29.22.228:1234', 6 : '172.29.22.236:1234', 7 : '172.29.22.122:1234', 8 : '172.29.22.162:1234', 9 : '172.29.22.252:1234', 10 : '172.29.22.229:1234', 11 : '172.29.22.237:1234', 12 : '172.29.22.123:1234', 13 : '172.29.22.204:1234', 14 : '172.29.22.254:1234', 15 : '172.29.22.230:1234', 16 : '172.29.22.238:1234', 17 : '172.29.22.126:1234', 18 : '172.29.22.205:1234', 19 : '172.29.22.33:1234', 20 : '172.29.22.231:1234', 21 : '172.29.22.239:1234', 22 : '172.29.22.127:1234', 23 : '172.29.22.206:1234', 24 : '172.29.22.34:1234', 25 : '172.29.22.232:1234', 26 : '172.29.22.246:1234', 27 : '172.29.22.128:1234', 28 : '172.29.22.207:1234', 29 : '172.29.22.35:1234', 30 : '172.29.22.233:1234', 31 : '172.29.22.247:1234', 32 : '172.29.22.129:1234', 33 : '172.29.22.219:1234', 34 : '172.29.22.36:1234', 35 : '172.29.22.234:1234', 36 : '172.29.22.249:1234', 37 : '172.29.22.130:1234', 38 : '172.29.22.221:1234', 39 : '172.29.22.37:1234'}; // kindly add the IP address based on key value.(i.e add 1234 IP address next to 1234 IP address instead of adding it to last of the array.)

	var bm_mem_servers_4_pps = {0:'172.29.22.90:1235',1:'172.29.22.91:1235',2:'172.29.22.92:1235','172.29.22.93':'1235','172.29.22.94':'1235'};
	
	var bm_node_servers = {0:'172.29.2.103:1234',1:'172.29.2.104:1234',2:'172.29.2.105:1234',3:'172.29.2.106:1234',4:'172.29.2.125:1234',5:'172.29.2.126:1234',6:'172.29.2.127:1234',7:'172.29.2.128:1234',8:'172.29.2.129:1234',9:'172.29.2.130:1234'};
	
	//to calculate the server index - Mano - kindly add the IP address based on key value.(i.e add 1234 IP address next to 1234 IP address instead of adding it to last of the array.) 
			
	/**********************MEMCACHE GLOBAL SETTINGS start ********************/
	Memcached.config.poolSize = 40;//dbconfig.memcacheMaxConnections;
	global.memNodeServers = [];
	async.eachOfSeries(bm_node_servers,function(memcacheip, memindex, next){
		//console.log("Memcache node Connected :",memcacheip,memindex);
		global.memNodeServers[memindex] = new Memcached(memcacheip,{retries:10,retry:10000,remove:true});
		
		//Memcahed Servers failure event listening
		global.memNodeServers[memindex].on('issue', function(details) {
			console.error("Server " + details.server + " has issue : " + details.messages.join(''));
		});

		global.memNodeServers[memindex].on('failure', function(details) {
			console.error("Server " + details.server + " went down due to: " + details.messages.join(''));
		});

		global.memNodeServers[memindex].on('reconnecting', function(details) {
			console.error("Total downtime caused by server " + details.server + " :" + details.totalDownTime + "ms");
		});
		
		next(null);
	},function(err){
		if(err){
			console.log("Error");
		} 
	});	
			
	global.memAPIServers = [];
	async.eachOfSeries(bm_mem_servers,function(memcacheip, memindex, next){
		//console.log("Memcache Connected :",memcacheip,memindex);
		global.memAPIServers[memindex] = new Memcached(memcacheip,{retries:10,retry:10000,remove:true});

		//Memcahed Servers failure event listening
		global.memAPIServers[memindex].on('issue', function(details) {
			console.error("Server " + details.server + " has issue : " + details.messages.join(''));
		});

		global.memAPIServers[memindex].on('failure', function(details) {
			console.error("Server " + details.server + " went down due to: " + details.messages.join(''));
		});

		global.memAPIServers[memindex].on('reconnecting', function(details) {
			console.error("Total downtime caused by server " + details.server + " :" + details.totalDownTime + "ms");
		});
		
		next(null);
	},function(err){
		if(err){
			console.log("Error");
		} else {
			console.log("Loop Completed");
		}
	});	
	
	global.mem4PPServers = [];
	async.eachOfSeries(bm_mem_servers_4_pps,function(memcacheip, memindex, next){
		//console.log("Memcache 4pps Connected :",memcacheip,memindex);
		global.mem4PPServers[memindex] = new Memcached(memcacheip,{retries:10,retry:10000,remove:true});

		//Memcahed Servers failure event listening
		global.mem4PPServers[memindex].on('issue', function(details) {
			console.log("Server " + details.server + " has issue : " + details.messages.join(''));
		});

		global.mem4PPServers[memindex].on('failure', function(details) {
			console.log("Server " + details.server + " went down due to: " + details.messages.join(''));
		});

		global.mem4PPServers[memindex].on('reconnecting', function(details) {
			console.log("Total downtime caused by server " + details.server + " :" + details.totalDownTime + "ms");
		});
		
		next(null);
	},function(err){
		if(err){
			console.log("Error");
		} else {
			console.log("Loop Completed");
		}
	});	
	
	/**
	 * To calculate the server index for storing the key in backup server - Mano
	 *
	 * @param string $key
	 * @param mix $value
	 * @return server index value
	*/	 
	getServerId = function(key,no_of_servers) {
		var this_new_server = {};
		this_new_server[0] = ((CRC32.str(key) & 0x7fffffff)%no_of_servers);
		var this_server_id = (((CRC32.str(key) & 0x7fffffff)%no_of_servers))+1;
		this_new_server[1] = (this_server_id==no_of_servers) ?  0 : this_server_id; //if serverid==max server count then make it as zero
		return this_new_server;
	}
	
	Cache = {	
		/**
		 * Returns the value stored in the memory by it's key
		 *
		 * @param string $key
		 * @return mix
		*/
		get : function (key,next) {
			try{
				var no_of_servers = Object.keys(bm_mem_servers).length;
				var serverindex = getServerId(key,no_of_servers);
				//console.error(serverindex,"Memcace get func -"+no_of_servers+" key:"+ bm_mem_servers[serverindex[0]]);
				var getMemcached = new Memcached(bm_mem_servers[serverindex[0]]);
				getMemcached.on('failure', function( details ){ console.error( "Server " + details.server + "went down due to: " + details.messages.join( '' ) ) });
				getMemcached.on('reconnecting', function( details ){ console.error( "Total downtime caused by server " + details.server + " :" + details.totalDownTime + "ms")});
				var val_frm_mem ={};
				getMemcached.get(key, function(err, val_frm_mem)
				{	
					if(err){								
						return next(err,{});
					}else{
						if(bmgeneric.trim(val_frm_mem) == 'undefined') {
							var get1Memcached = new Memcached(bm_mem_servers[serverindex[1]]);
							//get1Memcached.on('failure', function( details ){ console.error( "Server 1 :" + details.server + "went down due to: " + details.messages.join( '' ) ) });
							//get1Memcached.on('reconnecting', function( details ){ console.error( "Total downtime caused by server 1 : " + details.server + " :" + details.totalDownTime + "ms")});
							get1Memcached.get(key, function(err, val_frm_mem)
							{
								if(bmgeneric.trim(val_frm_mem) == 'undefined' || err)
									return next(null,{});
								else
									return next(null,val_frm_mem);
							});									
						} else {
							return next(null,val_frm_mem);
						}
					}
				});
				
				/*var val_frm_mem ={};
				global.memAPIServers[serverindex[0]].get(key, function(err, val_frm_mem)
				{					
					if(err){
						//console.error("Memcace get func - key:"+ key +":Error at: "+err.stack );
						return next(err,{});
					}else{						
						if(bmgeneric.trim(val_frm_mem) == 'undefined') {
							global.memAPIServers[serverindex[1]].get(key, function(err, val_frm_mem)
							{
								if(bmgeneric.trim(val_frm_mem) == 'undefined')
									return next(null,{});
								else
									return next(null,val_frm_mem);
							});
						} else {
							return next(null,val_frm_mem);
						}
					}
				});*/
			}catch(err){
				console.error("Error On Memcache - get :",err);
				var viewprofileOutput = {};							
				viewprofileOutput['responsecode'] = 1;
				viewprofileOutput['errcode'] = 2;
				viewprofileOutput['Error'] = err;
				viewprofileOutput['KEY'] = key;
				next(viewprofileOutput,viewprofileOutput);
			}
		},
		getNode : function(key,next){
			var no_of_servers = bm_node_servers.length;
			var serverindex = getServerId(key,no_of_servers);
			var indexkey = serverindex[0];
			global.memNodeServers[indexkey].get(key, function(err, val_frm_mem)
			{
				if(err){
					console.error("Memcace getNode func - key:"+ key +":Error at: "+err.stack );
					return next(err,{});
				}else{		
					return next(null,val_frm_mem);
				}	
			});
		},
		getPps : function(key,next) {
			var no_of_servers = bm_mem_servers_4_pps.length;
			var serverindex = getServerId(key,no_of_servers);
			var indexkey = serverindex[0];
			global.mem4PPServers[indexkey].get(key, function(err, val_frm_mem)
			{
				if(err){
					console.log("Memcace getPps func - key:"+ key +":Error at: "+err.stack );
					return next(err,{});
				}else{		
					return next(null,val_frm_mem);
				}	
			});
		},
		/**
		 * Store the value in the memcache memory (overwrite if key exists)
		 *
		 * @param string $key
		 * @param mix $var
		 * @param bool $compress
		 * @param int $expire (seconds before item expires)
		 * @return bool
		*/
		set : function(key, val, compress=0, expire=0) {
			//Store the same $key-$value in the backup server
			if(bmgeneric.trim(expire)=='' || expire==0)
				expire = 86400; //by default set the expiry time to 24 hrs.
			var no_of_servers = Object.keys(bm_mem_servers).length; 
			var serverindex = getServerId(key,no_of_servers);
			var index1 = serverindex[1];
			global.memAPIServers[index1].set(key,val,expire, function (err) 
			{		
				if(err)
					console.log("Memcace set 1 func - key:"+ key +"Error at: "+err.stack );
			});
			var index0 = serverindex[0];
			global.memAPIServers[index0].set(key,val,expire, function (err) 
			{
				if(err)
					console.log("Memcace set 0 func - key:"+ key +"Error at: "+err.stack );
			});			
			return true;
		}, 
		setNode : function(key, val, compress=0, expire=0) {
			//Store the same $key-$value in the backup server
			if(bmgeneric.trim(expire)=='' || expire==0)
				expire = 86400; //by default set the expiry time to 24 hrs.
			var no_of_servers = bm_mem_servers.length;
			var serverindex = getServerId(key,no_of_servers);
			var indexkey = serverindex[0];
			global.memNodeServers[indexkey].set(key,val,expire, function (err, result) 
			{
				if(err)
					console.log("Memcace set 0 func - key:"+ key +"Error at: "+err.stack );
			});
			
			return true;
		}, 
		setPps : function(key, val, compress=0, expire=0) {
			//Store the same $key-$value in the backup server
			if(bmgeneric.trim(expire)=='' || expire==0)
				expire = 14400;  //In Sec, Eq to 4 hrs
			var no_of_servers = bm_mem_servers.length;
			var serverindex = getServerId(key,no_of_servers);
			var indexkey = serverindex[1];
			global.mem4PPServers[indexkey].set(key,val,expire, function (err, result) 
			{		
				if(err)
					console.log("Memcace set 1 func - key:"+ key +"Error at: "+err.stack );
			});
			var indexk = serverindex[0];
			global.mem4PPServers[indexk].set(key,val,expire, function (err, result) 
			{
				if(err)
					console.log("Memcace set 0 func - key:"+ key +"Error at: "+err.stack );
			});
			
			return true;
		}, 
		/**
		 * Set the value in memcache if the value does not exist; returns FALSE if value exists
		 *
		 * @param sting $key
		 * @param mix $var
		 * @param bool $compress
		 * @param int $expire
		 * @return bool
		*/
		add : function(key, val, compress=0, expire=0) {			
			var no_of_servers = bm_mem_servers.length;
			var serverindex = getServerId(key,no_of_servers);
			//Store the same $key-$value in the backup server
			if(bmgeneric.trim(expire)=='' || expire==0)
				expire = 86400; //by default set the expiry time to 24 hrs.
			var indexkey = serverindex[0];
			global.memcacheServers[indexkey].add(key,val,expire, function (err) 
			{		
				if(err)
					console.log("Memcace add func - key:"+ key +"Error at: "+err.stack );
			});
			return true;
		},
		addNode : function(key, val, compress=0, expire=0) {			
			var no_of_servers = bm_mem_servers.length;
			var serverindex = getServerId(key,no_of_servers);
			//Store the same $key-$value in the backup server
			if(bmgeneric.trim(expire)=='' || expire==0)
				expire = 86400; //by default set the expiry time to 24 hrs.
			var indexkey = serverindex[0];
			global.memNodeServers[indexkey].add(key,val,expire, function (err) 
			{		
				if(err)
					console.log("Memcace add func - key:"+ key +"Error at: "+err.stack );
			});
			return true;
		},
		addPps : function(key, val, compress=0, expire=0) {			
			var no_of_servers = bm_mem_servers.length;
			var serverindex = getServerId(key,no_of_servers);
			//Store the same $key-$value in the backup server
			if(bmgeneric.trim(expire)=='' || expire==0)
				expire = 14400;  //In Sec, Eq to 4 hrs
			var indexkey = serverindex[0];
			global.mem4PPServers[indexkey].add(key,val,expire, function (err) 
			{		
				if(err)
					console.log("Memcace add func - key:"+ key +"Error at: "+err.stack );
			});
			return true;
		},
		/**
		 * Replace an existing value
		 *
		 * @param string $key
		 * @param mix $var
		 * @param bool $compress
		 * @param int $expire
		 * @return bool
		*/
		replace : function(key, val, compress=0, expire=0) {			
			var no_of_servers = bm_mem_servers.length;
			var serverindex = getServerId(key,no_of_servers);
			//Store the same $key-$value in the backup server
			if(bmgeneric.trim(expire)=='' || expire==0)
				expire = 86400; //by default set the expiry time to 24 hrs.
			var indexkey = serverindex[0];
			global.memcacheServers[indexkey].replace(key,val,expire, function (err) 
			{		
				if(err)
					console.log("Memcace replace func - key:"+ key +"Error at: "+err.stack );
			});
			return true;
		},
		/**
		 * Delete a record or set a timeout
		 *
		 * @param string $key
		 * @param int $timeout
		 * @return bool
		*/
		deleted : function(key, timeout=0) {
			var no_of_servers = bm_mem_servers.length;
			var serverindex = getServerId(key,no_of_servers);
			var indexkey = serverindex[0];
			global.memcacheServers[indexkey].del(key, function (err) 
			{		
				if(err)
					console.log("Memcace deleted func - key:"+ key +"Error at: "+err.stack );
			});
			return true;
		},
		/**
		 * Increment an existing integer value
		 *
		 * @param string $key
		 * @param mix $value
		 * @return bool
		*/
		increment : function(key, value=1) {
			var no_of_servers = bm_mem_servers.length;
			var serverindex = getServerId(key,no_of_servers);
			var indexkey = serverindex[0];
			global.memcacheServers[indexkey].incr(key, value, function (err) 
			{		
				if(err)
					console.log("Memcace increment func - key:"+ key +"Error at: "+err.stack );
			});
			return true;
		},

		/**
		 * Decrement an existing value
		 *
		 * @param string $key
		 * @param mix $value
		 * @return bool
		*/
		decrement : function(key, value=1) {
			var no_of_servers = bm_mem_servers.length;
			var serverindex = getServerId(key,no_of_servers);
			var indexkey = serverindex[0];
			global.memcacheServers[serverindex].decr(key, value, function (err) 
			{		
				if(err)
					console.log("Memcace decrement func - key:"+ key +"Error at: "+err.stack );
			});
			return true;
		}
	}
	
	exports.getServerId = getServerId;
	exports.Cache = Cache;