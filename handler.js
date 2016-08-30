'use strict';

var nlp = require('nlp_compromise');

// Your first function handler
module.exports.hello = (event, context, cb) => {
  console.log('received event', event);
  const text = event.query.text || '';
  const terms = nlp.sentence(text).terms;
  const verbs = terms.filter(t => t.pos.Verb);
  cb(null, {
      text: `Hello ${event.query.user_name || 'world'}!`,
      response_type: 'in_channel',
      attachments: [
        {
          text: `The date is ${new Date().toDateString()}`
        },
        {
          text: `Speaker: ${event.query.user_name}`
        },
        {
          text: `Verbs: ${verbs.map(v => v.text).join(', ')}`
        },
      ],
      event,
  })
};

// You can add more handlers here, and reference them in serverless.yml
