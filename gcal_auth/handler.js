//gapi stuff
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
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


//This endpoint gets hit once the user grants offline permissions
// with a code that we can exchange for our very own auth token.
module.exports.authstore = function(event, context, cb){
	console.log('code: ', event.body.code);
	oauth2Client.getToken(event.body.code, function(err, tokens) {
		console.log('tokens: ', tokens);
		if(!err) {
			oauth2Client.setCredentials(tokens);
			cb(null, {'message' : 'Success: Got Token'});
		}
		cb(null, {'error' : 'no token'});
	});
}