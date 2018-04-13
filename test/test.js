/* jshint -W079 */
/* jshint browser: false, node: true, strict: true */
/* jslint node: true */
'use strict';

if (typeof module === "object" && typeof require === "function") {
    //var test = require('tape');
    var test = require('tap').test;
    var irailclient = require('../');
}

test('disturbance test', function (t) {
    t.plan(6);
    var client = new irailclient();
    //console.log(client);

    // test a call with missing language (aka null)
    t.throws(function() {
        client.disturbances(null,function (error) {
            if(error) {
                console.log(error);
            }
        });
    } , {}, { skip: false });

    t.pass('Next');
    // test a good call with en language
    t.doesNotThrow(function() {
        client.disturbances('en',function (error, data) {
            if(error) {
                console.log(error);
            }
            // console.log(data);//process.exit(0);
            t.ok(data, 'expect defined value');
            if (data) {
                var str = JSON.stringify(data, null, 4);
               if (0) { console.log(str); }
            }
            if (data.timestamp) {
                t.match(data, { timestamp: /(\d+)/ });
            }
            // t.equal(1,1);
        });
    } , 'No exception occured');
    t.pass('Done');
});

test('connections test', function (t) {
    t.plan(6);
    var client = new irailclient();

    // test a call with missing language (aka null)
    t.throws(function() {
        client.connections(null,null,null,null,null,null,function (error) {
            if(error) {
                console.log(error);
            }
        });
    } , {}, { skip: false });

    t.pass('Next');
    // test a good call with en language
    t.doesNotThrow(function() {
        client.connections('Antwerpen-Centraal','Brussel-Noord','nl',null,null,null,function (error, data) {
            if(error) {
                console.log(error);
            }
            // console.log(data);//process.exit(0);
            if (data) {
                var str = JSON.stringify(data, null, 4);
               if (0) { console.log(str); }
            }
            t.ok(data, 'expect defined value');
            //console.log(data);
            if (data.timestamp) {
                t.match(data, { timestamp: /(\d+)/ });
            }
            // t.equal(1,1);
        });
    } , 'No exception occured');
    t.pass('Done');
});

test('liveboard test', function (t) {
    t.plan(7);
    var client = new irailclient();

    // test a call with missing language (aka null)
    t.throws(function() {
        client.liveboard(null,null,null,null,function (error) {
            if(error) {
                console.log(error);
            }
        });
    } , {}, { skip: false });

    t.pass('Next');
    // test a good call with en language
    t.doesNotThrow(function() {
        client.liveboard(null, 'nl', 'Antwerpen-Centraal',null,function (error, data) {
            if(error) {
                console.log(error);
            }
            // console.log(data);//process.exit(0);
            if (data) {
                var str = JSON.stringify(data, null, 4);
               if (0) { console.log(str); }
            }
            t.ok(data, 'expect defined value');
            //console.log(data);
            if (data.timestamp) {
                t.match(data, { timestamp: /(\d+)/ });
            }
            // t.equal(1,1);
        });
    } , 'No exception occured');

    // Test id and station filled out together
    t.throws(function() {
        client.liveboard('BE.NMBS.008892007', 'nl', 'Brussel-Centraal',null, function (error) {
            if(error) {
                console.log(error);
            }
        });
    } , {}, { skip: false });
    t.pass('Done');
});

test('stations test', function (t) {
    t.plan(2);
    var client = new irailclient();

    // test a call with missing language (aka null)
    t.throws(function() {
        client.stations(null,function (error) {
            if(error) {
                console.log(error);
            }
        });
    } , {}, { skip: false });

    t.pass('Done');
});

test('vehicle test', function (t) {
    t.plan(2);
    var client = new irailclient();

    // test a call with missing language (aka null)
    t.throws(function() {
        client.vehicle(null,null,null,function (error) {
            if(error) {
                console.log(error);
            }
        });
    } , {}, { skip: false });

    t.pass('Done');
});



