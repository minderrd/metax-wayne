exports.handler = (event) => {
  // TODO implement

  const messageSources = ['CustomMessage_SignUp', 'CustomMessage_ResendCode']
  if (!messageSources.includes(event.triggerSource)) return event

  const { codeParameter } = event.request
  const { userName, region } = event
  const { clientId } = event.callerContext
  const { email } = event.request.userAttributes
  const { BASE_URL } = process.env
  const link = `<a href="${BASE_URL}/auth/signupConfirm?code=${codeParameter}&username=${userName}&clientId=${clientId}&region=${region}&email=${email}" target="_blank">here</a>`
  event.response.emailSubject = '[Meta X Wayne]Your verification link' // request.codeParameter
  event.response.emailMessage = `Thank you for signing up. Click ${link} to verify your email.`

  console.log(event)
  return event
}


// exports.handler = (event, context, callback) => {
//   // Identify why was this function invoked
//   if (event.triggerSource === 'CustomMessage_SignUp' || event.triggerSource === 'CustomMessage_ResendCode') {
//     // Ensure that your message contains event.request.codeParameter. This is the placeholder for code that will be sent
//     const { codeParameter } = event.request
//     const { userName, region } = event
//     const { clientId } = event.callerContext
//     const { email } = event.request.userAttributes
//     const { API_BASE_URL } = process.env
//     const link = `<a href="${API_BASE_URL}/auth/signup/confirm?code=${codeParameter}&username=${userName}&clientId=${clientId}&region=${region}&email=${email}" target="_blank">here</a>`
//     event.response.emailSubject = '[Meta X Wayne]Your verification link' // event.request.codeParameter
//     event.response.emailMessage = `Thank you for signing up. Click ${link} to verify your email.`
//   }

//   // Return to Amazon Cognito
//   callback(null, event)
// }
