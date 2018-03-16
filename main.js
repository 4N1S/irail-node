var irailnode = require('../index.js');
// Public API

var client = new irailnode();

//Params
var lang="en";

client.stations(lang,function (error, data) {
	if(error) console.log("E!",error)
	console.dir(data);
});