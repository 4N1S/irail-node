
var _ = require('underscore');
var https = require('https');
var crypto = require('crypto');
var url = require('url');
var urlencode = require('urlencode');

var irailnode = function(key,secret,verbose) {
	this.verbose = verbose || false;
	this.version = "0.0.1";
	this.key = key;
	this.secret = secret;
	this.host = "api.irail.be";
	this.uri = "/";
	this.baseURL = "https://api.irail.be/";
	this.userAgent = "irailnode-node";
	this.request_options = {
		method: 'GET',
		headers: {
			"User-Agent": "irailnode-node",
			"Content-Type": "application/x-www-form-urlencoded"
		}
	}
};

irailnode.prototype.stations = function(lang,callback) {

	this.pubRequest("stations/?format=json&lang="+lang, {}, function(err, data) {
		return callback(err, data.station);
	});
}

irailnode.prototype.disturbances = function(lang,callback) {

	this.pubRequest("disturbances/?format=json&lang="+lang, {}, function(err, data) {
		return callback(err, data);
	});
}

irailnode.prototype.liveboard = function(id,lang,station,arrdep,callback) {

	this.pubRequest("liveboard/?format=json&lang="+lang+"&id="+id+"&arrdep="+arrdep+"&station="+station, {}, function(err, data) {
		return callback(err, data);
	});
}

//Choices: departure arrival
irailnode.prototype.connections = function(from,to,lang,date,timesel,typeOfTransport,callback) {

	this.pubRequest("connections/?from="+from+"&to="+to+"&timesel="+timesel+"&date="+date+"&typeOfTransport="+typeOfTransport+"&format=json&lang="+lang, {}, function(err, data) {
		return callback(err, data);
	});
}
//Choices: departure arrival
irailnode.prototype.vehicle = function(id,lang,date,callback) {

	this.pubRequest("vehicle/?id="+id+"&date="+date+"&format=json&lang="+lang, {}, function(err, data) {
		return callback(err, data);
	});
}


irailnode.prototype.pubRequest = function(method, params, callback) {
	var options = {
	  hostname: this.host,
	  path: this.uri + method,
	  port: 443,
	  method: 'GET',
	  verbose: this.verbose
	};
	console.log(options.path);
	cb = function(response) {
		var str = '';
		response.on('data', function (chunk) {
			str += chunk;
			if (options.verbose) console.log(str);
		});
		response.on('end', function () {
			var objFromJSON;
			try {
				objFromJSON = JSON.parse(str);
				return callback(null, objFromJSON);
			}
			catch (err) {
				return callback(err, null);
			}
		});
	}
	var req = https.request(options, cb);
	req.on('error', function(err) {
		callback(err, null);
	});

	req.end();

};

module.exports = irailnode;
