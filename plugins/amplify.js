import Vue from 'vue'
import AwsAmplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import awsConfig from '../src/aws-exports'

// check is localhost
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === '[::1]' ||
  // 127.0.0.1/8 is considered localhost for IPv4.
  window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
  ),
)

// Assuming you have two redirect URIs, and the first is for
// localhost and second is for production
const [
  localRedirectSignIn,
  productionRedirectSignIn,
] = awsConfig.oauth.redirectSignIn.split(',')

const [
  localRedirectSignOut,
  productionRedirectSignOut,
] = awsConfig.oauth.redirectSignOut.split(',')

AwsAmplify.configure({
  // (required) - Region where Amazon Cognito project was created
  aws_cognito_region: 'us-west-2',
  // (optional) -  Amazon Cognito User Pool ID
  aws_user_pools_id: 'us-west-2_nZhH33Ybp',
  // (optional) - Amazon Cognito App Client ID
  // (App client secret needs to be disabled)
  aws_user_pools_web_client_id: '6b6f60v9lnql76rq1gsqf8cd0o',
  // (optional) - Amazon Cognito Identity Pool ID
  // aws_cognito_identity_pool_id: '',
  // (optional) - Users are not allowed to get the aws credentials
  // unless they are signed in
  // aws_mandatory_sign_in: 'enable'

  oauth: {
    ...awsConfig.oauth,

    redirectSignIn: isLocalhost ?
    localRedirectSignIn :
    productionRedirectSignIn,

    redirectSignOut: isLocalhost ?
    localRedirectSignOut :
    productionRedirectSignOut,
  },
})

Vue.use(AmplifyPlugin, AmplifyModules)
