/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk')
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider()

/**
 * List users
 * @param {*} event
 * @param {*} context
 * @returns
 */

exports.handler = async (event, context) => {
  const { Users } = await cognitoidentityserviceprovider.listUsers({
    UserPoolId: 'us-west-2_frFABAbAR',
  }).promise()

  const users = Users.map((User) => {
    const result = {}
    User.Attributes.forEach((attribute) => {
      result[attribute.Name] = attribute.Value
    })
    return result
  })
  console.log(event, context)
  const response = {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify(users),
  }
  return response
}
