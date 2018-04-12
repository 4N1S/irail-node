/* jshint -W079 */
/* jshint browser: false, node: true, strict: true */
/* jslint node: true */
'use strict';

if (typeof module === "object" && typeof require === "function") {
    //var test = require('tape');
    var test = require('tap').test;

    var irailclient = require('../');
}

test('objectisok', function (t) {
    t.pass('this is fine');
    var client = new irailclient();
    t.plan(1);
    var cd = client.disturbances(function (error, data) {
        if(error) {
            console.log(error,cd,data);
        }
        t.deepEqual(1,0);
    });
});

