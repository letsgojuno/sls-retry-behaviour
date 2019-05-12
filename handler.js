'use strict';
const AWS = require('aws-sdk');
const cowsay = require('cowsay');
const fetch = require('node-fetch');

var dynamodb = new AWS.DynamoDB.DocumentClient();
var lambda = new AWS.Lambda();

module.exports.hello = async (event = {}) => {
  console.log(cowsay.say({ text: JSON.stringify(event) }));

  try {
    const { Payload } = await lambda
      .invoke({ FunctionName: 'here-dev-route', InvocationType: 'Event' })
      .promise();
    console.log({ Payload });
  } catch (err) {
    console.log(err);
  }

  try {
    const res = await fetch(
      'http://echo.jsontest.com/email/mmathews@gmail.com'
    ).then(res => res.json());
    console.log(res);
  } catch (error) {
    console.log(e);
  }

  try {
    const foo = await dynamodb
      .batchGet({
        RequestItems: { usersTable: { Keys: [{ email: 'foobar' }] } }
      })
      .promise();

    console.log(JSON.stringify(foo));
  } catch (err) {
    console.log(err);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event
      },
      null,
      2
    )
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
