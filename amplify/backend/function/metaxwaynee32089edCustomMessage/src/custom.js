/**
 * Custome email message for the following trigger sources
 * CustomMessage_SignUp, CustomMessage_ResendCode, CustomMessage_ForgotPassword
 * @param {*} event
 * @returns
 */

exports.handler = (event) => {
  const signupSources = ['CustomMessage_SignUp', 'CustomMessage_ResendCode']
  const forgetSources = ['CustomMessage_ForgotPassword']

  if (
    !signupSources.includes(event.triggerSource) &&
    !forgetSources.includes(event.triggerSource)
  ) return event

  const { codeParameter } = event.request
  const { userName, region } = event
  const { clientId } = event.callerContext
  const { email } = event.request.userAttributes
  const BASE_URL = process.env.BASE_URL || 'https://d1073yf0ptkwai.cloudfront.net'

  if (signupSources.includes(event.triggerSource)) {
    // Sign up email message
    let link = `<a href="${BASE_URL}/auth/signupConfirm?`
    link += `code=${codeParameter}&username=${userName}&`
    link += `clientId=${clientId}&region=${region}&email=${email}" `
    link += `target="_blank">here</a>`
    event.response.emailSubject = '[Meta X Wayne]Your verification link'
    event.response.emailMessage = `Thank you for signing up. `
    event.response.emailMessage += `Click ${link} to verify your email.`
  } else if (forgetSources.includes(event.triggerSource)) {
    // forget password email message
    let link = `<a href="${BASE_URL}/auth/forgetConfirm?`
    link += `code=${codeParameter}&username=${userName}&`
    link += `clientId=${clientId}&region=${region}&email=${email}" `
    link += `target="_blank">here</a>`
    event.response.emailSubject = '[Meta X Wayne]Your reset password link'
    event.response.emailMessage = `Thank you for using my website. `
    event.response.emailMessage += `Click ${link} to reset your password.`
  }

  return event
}

