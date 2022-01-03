const AWS = require('aws-sdk')
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider()
const UserPoolId = 'us-west-2_nZhH33Ybp'
/**
 * Get a user's token
 * @param {*} event
 * @param {*} context
 * @returns
 */


const listUsers = async (query) => {
  console.log('query', query)
  const { Users } = await cognitoidentityserviceprovider.listUsers({
    UserPoolId,
  }).promise()

  return Users.map((User) => {
    const result = {}
    User.Attributes.forEach((attribute) => {
      result[attribute.Name] = attribute.Value
    })
    return result
  })
}

exports.handler = async (event, context) => {
  let responseData = {}

  const { path, httpMethod, queryStringParameters } = event
  if (path === '/users' && httpMethod === 'GET') {
    responseData = await listUsers(queryStringParameters)
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

