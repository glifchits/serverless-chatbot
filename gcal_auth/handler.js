//file stuff
var fs = require('fs');
var readline = require('readline');
// DynamoDB Stuff
var AWS = require("aws-sdk");
AWS.config.update({region: "us-east-1"});
var docClient = new AWS.DynamoDB.DocumentClient();
var params = { TableName: 'users', Key : { id : null}};



module.exports.main = function(event, context, cb){
	fs.readFile('auth.html', function processAuthHTML(err, html) {
		if (err) {
			console.log('Error loading static auth HTML: ' + err);
			return;
		}
		// Authorize a client with the loaded credentials, then call the
		// Google Calendar API.
		console.log('html: ', 'utf8', html);
		cb(null, html.toString());
	});
};