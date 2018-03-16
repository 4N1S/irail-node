var irailnode = require('../index.js');
// Public API

var client = new irailnode();

//Params
var lang="en";

// function Search
// client.stations(lang,function (error, data) {
// 	if(error) console.log("E!",error)
// 	console.dir(data);
// });

// function Disturbances
// client.disturbances(lang,function (error, data) {
// 	if(error) console.log("E!",error)
// 	console.dir(data);
// });

var arrdep="departure";
var id="BE.NMBS.008813003"; //# Bruxelles centrale
var date=180318;

// client.liveboard(id,lang,station,arrdep,function (error, data) {
// 	if(error) console.log("E!",error)
// 	console.dir(data);
// });

//type of transport :trains,nointernationaltrains,all

// var from="liege"
// var to="namur"
// var timesel="departure";
// var typeOfTransport="trains";


// client.connections(from,to,lang,date,timesel,typeOfTransport,function (error, data) {
// 	if(error) console.log("E!",error)
// 	console.dir(data);
// });


var id="BE.NMBS.IC1832";
client.vehicle(id,lang,date,function (error, data) {
	if(error) console.log("E!",error)
	console.dir(data);
});
