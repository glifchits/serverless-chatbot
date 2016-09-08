var fs = require('fs');
var readline = require('readline');
var test = function() {
	// Load client secrets from a local file.
	fs.readFile('auth.html', 'utf8', function processAuthHTML(err, html) {
	  if (err) {
	    console.log('Error loading static auth HTML: ' + err);
	    return;
	  }
	  // Authorize a client with the loaded credentials, then call the
	  // Google Calendar API.
	  console.log(html.toString())
	});
}


test()