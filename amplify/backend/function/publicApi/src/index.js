const AWS = require('aws-sdk')
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider()

exports.handler = async (event, context) => {
  const { Users } = await cognitoidentityserviceprovider.listUsers({
    UserPoolId: 'us-west-2_nZhH33Ybp',
  }).promise()

  const users = Users.map((User) => {
    const result = {}
    User.Attributes.forEach((attribute) => {
      result[attribute.Name] = attribute.Value
    })
    return result
  })
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
