<template>
  <v-btn
    class="fb-button"
    depressed
    :disabled="isLoading"
    v-bind="$attrs"
    @click="facebookLogin"
  >
    <v-icon class="mr-2">
      mdi-facebook
    </v-icon>
    Continue With Facebook
  </v-btn>
</template>

<script>
import Auth from '@aws-amplify/auth'
import { AmplifyEventBus } from 'aws-amplify-vue'

export default {
  name: 'FacebookButton',
  components: {
  },
  data() {
    return {
      buttonText: 'Login to Facebook',
      isLoading: true,
    }
  },
  computed: {},
  async mounted() {
    this.loadFacebookSDK()
    await this.waitForInit()
    this.isLoading = false
  },
  beforeCreate() {},
  methods: {
    async facebookLogin() {
      this.isLoading = true
      try {
        await Auth.federatedSignIn({ provider: 'Facebook' })
      } catch (e) {
        this.$toast.error(e.message)
      }
      this.isLoading = false
    },
    waitForInit() {
      return new Promise((resolve, reject) => {
        const hasFbLoaded = () => {
          if (window.FB) {
            resolve()
          } else {
            setTimeout(hasFbLoaded, 300)
          }
        }
        hasFbLoaded()
      })
    },
    statusChangeCallback(response) {
      if (response.status === 'connected') {
        this.handleResponse(response.authResponse)
      } else {
        this.handleError(response)
      }
    },
    checkLoginState() {
      window.FB.getLoginStatus(this.statusChangeCallback)
    },
    handleClick() {
      window.FB.login(this.checkLoginState, { scope: 'public_profile,email' })
    },
    handleError(error) {
      alert(error)
    },
    async handleResponse(data) {
      const { email, accessToken: token, expiresIn } = data
      const expiresAt = expiresIn * 1000 + new Date().getTime()
      const user = { email }

      this.isLoading = true

      try {
        // const response = await Auth.federatedSignIn(
        await Auth.federatedSignIn(
            'facebook',
            { token, expires_at: expiresAt },
            user,
        )
        this.isLoading = false
        AmplifyEventBus.$emit('authState', 'signedIn')

        // this.props.onLogin(response);
      } catch (e) {
        this.isLoading = false
        this.handleError(e)
      }
    },
    loadFacebookSDK() {
      window.fbAsyncInit = function() {
        window.FB.init({
          appId: 'yourappidhere',
          xfbml: true,
          version: 'v3.2',
        })
        window.FB.AppEvents.logPageView()
      };

      (function(d, s, id) {
        const fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) {
          return
        }
        const js = d.createElement(s)
        js.id = id
        js.src = 'https://connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
      })(document, 'script', 'facebook-jssdk')
    },
  },
}
</script>

<style scoped>
.fb-button {
  border-color: transparent;
  background-color: #385499 !important;
  color: #fff !important;
}
</style>
