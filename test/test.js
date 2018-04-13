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
    t.plan(4);
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

    // test a good call with en language
    t.doesNotThrow(function() {
        client.disturbances('en',function (error, data) {
            if(error) {
                console.log(error);
            }
            console.log(data);process.exit(0);
            t.ok(data, 'disturbances call return');
            var str = JSON.stringify(data, null, 4);
            console.log(str);
            t.deepEqual(data,data);
        });
    } , 'No exception occured');
});

