/*jslint node: true */
'use strict';
var ttest = require('tape');

var irailclient = require('../');
var client = new irailclient();

ttest('objectisok', function (t) {
    t.plan(1);
    var cd = client.disturbances(function (error, data) {
        if(error) {
            console.log(error,data);
        }
        t.deepEqual(cd, cd);
    });
});

