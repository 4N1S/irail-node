/* jshint browser: false, node: true, strict: true */
/*jslint node: true */
/*jshint -W081 */
/*jshint -W079 */
/*jshint onevar: true */
/* jslint vars: true */

'use strict';

var https = require('https');
var querystring = require('querystring');

var irailnode = function (key, secret, verbose) {
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

irailnode.prototype.stations = function (lang, callback) {
    if (!lang) {
        var e = new Error('Missing required lang parameter');
        throw e;
    }

    this.pubRequest("stations/?format=json&lang=" + lang, {}, function (err, data) {
        return callback(err, data.station);
    });
};

irailnode.prototype.disturbances = function (lang, callback) {
    if (!lang) {
        var e = new Error('Missing required lang parameter');
        throw e;
    }

    this.pubRequest("disturbances/?format=json&lang=" + lang, {}, function (err, data) {
        return callback(err, data);
    });
};

irailnode.prototype.liveboard = function (id, lang, station, arrdep, callback) {
    var e = null;
    // params as object
    var params = {
        format: 'json'
    };
    var post_data = '';

    // Bare minimum to get this call to work
    if (!lang) {
        e = new Error('Missing required lang parameter');
    } else if (!id && !station) {
        e = new Error('You need to pass atleast an id or a station');
    } else if (id && station) {
        e = new Error('You cannot pass both id and station, use one of both');
    }
    if (e) {
        throw e;
    }

    // Already checked this one
    params.lang = lang;

    // only one of both required
    if (id) { params.id = id; }
    if (station) { params.station = station; }

    // Optional
    if (arrdep) { params.arrdep = arrdep; }
    // Choices: departure arrival

    post_data = querystring.stringify(params);

    this.pubRequest("liveboard/?" + post_data, {}, function (err, data) {
        return callback(err, data);
    });
};

irailnode.prototype.connections = function (from, to, lang, date, timesel, typeOfTransport, callback) {
    var e = null;
    // params as object
    var params = {
        format: 'json'
    };
    var post_data = '';
    // Bare minimum to get call to work
    if (!lang) {
        e = new Error('Missing required lang parameter');
    } else if (!from) {
        e = new Error('Missing required from parameter');
    } else if (!to) {
        e = new Error('Missing required to parameter');
    }
    if (e) {
        throw e;
    }

    // Required
    params.from = from;
    params.to = to;
    params.lang = lang;

    // Optional
    if (date) { params.date = date; }
    if (timesel) { params.timesel = timesel; }
    if (typeOfTransport) { params.typeOfTransport = typeOfTransport; }

    post_data = querystring.stringify(params);

    this.pubRequest("connections/?" + post_data, {}, function (err, data) {
        return callback(err, data);
    });
};

irailnode.prototype.vehicle = function (id, lang, date, callback) {
    var e = null;
    // params as object
    var params = {
        format: 'json'
    };
    var post_data = '';

    if (!lang) {
        e = new Error('Missing required lang parameter');
    }
    if (!id) {
        e = new Error('Missing id parameter');
    }

    if (e) {
        throw e;
    }

    // Required
    params.id = id;
    params.lang = lang;

    // Optional
    if (date) { params.date = date; }

    post_data = querystring.stringify(params);

    this.pubRequest("vehicle/?" + post_data, {}, function (err, data) {
        return callback(err, data);
    });
};


irailnode.prototype.pubRequest = function (method, params, callback) {
    var options = {
        hostname: this.host,
        path: this.uri + method,
        port: 443,
        method: 'GET',
        verbose: this.verbose
    };

    var cb = function (response) {
        if (response.statusCode < 200 || response.statusCode > 299) {
            callback(response.statusCode);
        }
        if (response.statusCode === 200) {
            var str = '';
            response.on('data', function (chunk) {
                str += chunk;
                // if (options.verbose) { console.log(str); } // eslint-disable-line no-console
            });

            response.on('end', function () {
                var objFromJSON;
                try {
                    objFromJSON = JSON.parse(str);
                    return callback(null, objFromJSON);
                } catch (err) {
                    return callback(err, null);
                }
            });
        }
    };
    var req = https.request(options, cb);
    req.on('error', function (err) {
        callback(err.status, null);
    });

    req.end();

};

module.exports = irailnode;
