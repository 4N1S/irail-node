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
    t.plan(2);
    var client = new irailclient();
    console.log(client);
    client.disturbances('en',function (error, data) {
        t.pass('fires up');
        if(error) {
            //t.pass('error');
            console.log(error);
        }
        console.log(data);
        t.deepEqual(data,data);
    });
});

