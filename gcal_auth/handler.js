//gapi stuff
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(
	'1095735522611-8gc0hnltpu78vbj27dh766i79lip37tk.apps.googleusercontent.com', //id
	'4AcOy4vrWHWFPSUTNCzqJl0M', //secret
	'https://wbac1byht4.execute-api.us-east-1.amazonaws.com' //redirect
);
//file stuff
var fs = require('fs');
var readline = require('readline');
// DynamoDB Stuff
var uuid = require('uuid');
var AWS = require("aws-sdk");
AWS.config.update({region: "us-east-1"});




module.exports.auth = function(event, context, cb){
	fs.readFile('auth.html', function processAuthHTML(err, html) {
		if (err) {
			console.log('Error loading static auth HTML: ' + err);
			return;
		}
		cb(null, html.toString());
	});
};


//This endpoint gets hit once the user grants offline permissions
// with a code that we can exchange for our very own auth token.
module.exports.authstore = function(event, context, cb){
	//get a db client
	var docClient = new AWS.DynamoDB.DocumentClient();
	var params = { TableName: 'users', Item : {'id' : uuid.v1()}};

	//exchange the code for some tokens
	oauth2Client.getToken(event.body.code, function(err, tokens) {
		console.log('tokens: ', tokens);
		if(!err) {
			oauth2Client.setCredentials(tokens);
			console.log('setCredentials');
			params.Item['tokens'] = tokens
			docClient.put(params, function(err, data) {
			    if (err) {
			        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
			    } else {
			        console.log("Added item:", JSON.stringify(data, null, 2));
			    }
			});
		}
		cb(null, {'error' : 'no token'});
	});
}