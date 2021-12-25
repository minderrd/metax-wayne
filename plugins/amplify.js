import Vue from 'vue'
import AwsAmplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'

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
})

Vue.use(AmplifyPlugin, AmplifyModules)
