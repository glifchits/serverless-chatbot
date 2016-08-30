'use strict';

// Your first function handler
module.exports.hello = (event, context, cb) => {
  console.log('received event', event);
  cb(null, {
      text: `Hello ${event.query.user_name || 'world'}!`,
      response_type: 'in_channel',
      attachments: [
        {
          text: `The date is ${new Date().toDateString()}`
        }
      ],
      event,
  })
};

// You can add more handlers here, and reference them in serverless.yml
