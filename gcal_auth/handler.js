//file stuff
var fs = require('fs');
var readline = require('readline');
// DynamoDB Stuff
var AWS = require("aws-sdk");
AWS.config.update({region: "us-east-1"});
var docClient = new AWS.DynamoDB.DocumentClient();
var params = { TableName: 'users', Key : { id : null}};



module.exports.auth = function(event, context, cb){
	fs.readFile('auth.html', function processAuthHTML(err, html) {
		if (err) {
			console.log('Error loading static auth HTML: ' + err);
			return;
		}
		cb(null, html.toString());
	});
};


module.exports.authstore = function(event, context, cb){
	console.log(event.body);
}