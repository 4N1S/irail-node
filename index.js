/*jslint node: true */
'use strict';

var https = require('https');
var querystring = require('querystring');

// var _ = require('underscore');
// var crypto = require('crypto');
// var url = require('url');
// var urlencode = require('urlencode');

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
    };
};

irailnode.prototype.stations = function(lang,callback) {

    if (!lang) {
        var e = new Error('parameter lang is not defined');
        throw e;
    }

    this.pubRequest("stations/?format=json&lang="+lang, {}, function(err, data) {
        return callback(err, data.station);
    });
};

irailnode.prototype.disturbances = function(lang,callback) {

    if (!lang) {
        var e = new Error('parameter lang is not defined');
        throw e;
    }

    this.pubRequest("disturbances/?format=json&lang="+lang, {}, function(err, data) {
        return callback(err, data);
    });
};

irailnode.prototype.liveboard = function(id,lang,station,arrdep,callback) {
    // Bare minimum to get this call to work
    if (!lang || !id || !station ) {
        var e = new Error('Missing required parameter');
        throw e;
    }

    // params as object
    var params = {
        format: 'json'
    };

    // Required
    if (id) { params.id=id; }
    if (station) { params.station=station; }

    // Optional
    if (arrdep) { params.arrdep=arrdep; }

    var post_data = querystring.stringify(params);

    this.pubRequest("liveboard/?"+post_data, {}, function(err, data) {
        return callback(err, data);
    });
};

//Choices: departure arrival
irailnode.prototype.connections = function(from,to,lang,date,timesel,typeOfTransport,callback) {
    // Bare minimum to get call to work
    if (!lang || !from || !to ) {
        var e = new Error('Missing required parameter');
        throw e;
    }

    // params as object
    var params = {
        format: 'json'
    };

    // Required
    if (from) { params.from=from; }
    if (to) { params.to=to; }
    if (lang) { params.lang= lang; }

    // Optional
    if (date) { params.date= date; }
    if (timesel) { params.timesel= timesel; }
    if (typeOfTransport) { params.typeOfTransport= typeOfTransport; }

    var post_data = querystring.stringify(params);

    this.pubRequest("connections/?"+post_data, {}, function(err, data) {
        return callback(err, data);
    });
};

//Choices: departure arrival
irailnode.prototype.vehicle = function(id,lang,date,callback) {
    if (!lang) {
        var e = new Error('parameter lang is not defined');
        throw e;
    }

    // params as object
    var params = {
        format: 'json'
    };

    // Required
    if (lang) { params.lang= lang; }
    if (id) { params.id=id; }

    // Optional
    if (date) { params.date= date; }

    var post_data = querystring.stringify(params);

    this.pubRequest("vehicle/?"+post_data, {}, function(err, data) {
        return callback(err, data);
    });
};


irailnode.prototype.pubRequest = function(method, params, callback) {
    var options = {
        hostname: this.host,
        path: this.uri + method,
        port: 443,
        method: 'GET',
        verbose: this.verbose
    };
    //console.log(options.path);
    var cb = function(response) {
        if (response.statusCode < 200 || response.statusCode > 299) {
            callback(response.statusCode);
        }
        if(response.statusCode===200){
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
                if (options.verbose) { console.log(str); }
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
    };
    var req = https.request(options, cb);
    req.on('error', function(err) {
        callback(err.status, null);
    });

    req.end();

};

module.exports = irailnode;
