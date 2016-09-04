import React from 'react'
import ReactDOMServer from 'react-dom/server'


const Main = props => {
  return (
    <html>
      <head>
        <title>Serverless Chatbot</title>
      </head>
      <body>
        <div>
          <h1>Hello {props.name || 'world'}!</h1>
          This is from serverless
        </div>
      </body>
    </html>
  )
}


export const main = (event, context, cb) => {
  console.log('received event', event)
  cb(null, ReactDOMServer.renderToStaticMarkup(
    <Main name={event.query.user_name} />
  ))
}
