const AWS = require('aws-sdk')
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider()
const UserPoolClientId = '6b6f60v9lnql76rq1gsqf8cd0o'
/**
 * Get a user's token
 * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#initiateAuth-property
 * @param {*} event
 * @param {*} context
 * @returns
 */


const getUserToken = async (query) => {
  const params = {
    AuthFlow: 'ADMIN_USER_PASSWORD_AUTH', /* required */
    ClientId: UserPoolClientId, /* required */
    AuthParameters: {
      USERNAME: query.email,
      PASSWORD: query.password,
    },
  }
  return await cognitoidentityserviceprovider.initiateAuth(params).promise()
}

exports.handler = async (event, context) => {
  let responseData = {}

  const { path, httpMethod, queryStringParameters } = event
  if (path === '/token' && httpMethod === 'GET') {
    responseData = await getUserToken(queryStringParameters)
  }

  const response = {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify(responseData),
  }
  return response
}

