import React from 'react'
import ReactDOMServer from 'react-dom/server'

// DynamoDB Stuff
var AWS = require("aws-sdk");
AWS.config.update({region: "us-east-1"});
var docClient = new AWS.DynamoDB.DocumentClient();
var params = { TableName: 'users', Key : { id : null}};


var Main = React.createClass({

  renderAttributes() {
    return Object.keys(this.props).map( attr => {
      return(
        <div>
          <span>{attr}:{this.props[attr]}</span>
        </div>
      )
    });
  },

  render() {
    return (
      <html>
        <head>
          <title>Serverless Chatbot</title>
        </head>
        <body>
          <div>
            {this.renderAttributes()}
            This is from serverless
          </div>
        </body>
      </html>
    )
  }
});


export const main = (event, context, cb) => {
  console.log('event: ', event);
  params['Key']['id'] = event.query['id'];
  console.log('params: ', params);

  docClient.get(params, function(err, data) {
    if (err) {
      console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        var result = JSON.stringify(data, null, 2);
        console.log("GetItem succeeded:", result);
        console.log("Item:", data.Item);
        cb(null, ReactDOMServer.renderToStaticMarkup(
          <Main {...data.Item} />
        ))
    }
  });
}
