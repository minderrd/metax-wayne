<template>
  <v-btn
    :loading="isLoading"
    depressed
    class="google-button"
    v-bind="$attrs"
    justify="start"
    @click="googleLogin"
  >
    <img
      width="30"
      height="30"
      class="mr-3"
      src="~/assets/images/logos/google-logo.png"
    >
    Continue with Google
  </v-btn>
</template>

<script>
import Auth from '@aws-amplify/auth'

export default {
  name: 'GoogleButton',
  components: {
  },
  data() {
    return {
      isLoading: false,
    }
  },

  methods: {
    async googleLogin() {
      this.isLoading = true
      try {
        await Auth.federatedSignIn({ provider: 'Google' })
      } catch (e) {
        this.$toast.error(e.message)
      }
      this.isLoading = false
    },
  },
}
</script>

<style scoped>
.google-button {
  border-color: transparent;
  background-color: #4285F4 !important;
  color: #FFF !important;
}
</style>
