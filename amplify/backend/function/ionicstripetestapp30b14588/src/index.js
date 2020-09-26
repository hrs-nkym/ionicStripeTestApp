const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  // console.log(`EVENT: ${JSON.stringify(event)}`);
  // return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
    //eslint-disable-line
    console.log(JSON.stringify(event, null, 2));
    event.Records.forEach(record => {
      console.log(record.eventID);
      console.log(record.eventName);
      console.log('DynamoDB Record: %j', record.dynamodb);
    });
    context.done(null, 'Successfully processed DynamoDB record'); // SUCCESS with message
  
};
