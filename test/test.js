/*jslint node: true */
'use strict';

var irailclient = require('../index.js');

var client = new irailclient();

client.disturbances(function (error, data) {
    if(error) { 
        console.log(error); 
    }
    console.dir(data);
});


