<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col style="max-width: 400px">
        <v-card>
          <v-card-title>
            Please confirm your email address.
          </v-card-title>
          <v-card-text>
            We have sent you a confirmation email.
            Please check your inbox for an email and
            click the confirm link.
          </v-card-text>
          <v-card-text>
            If you didn't get the email, please click <b>Resend</b>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn small color="primary" @click="signupResend">
              Resend
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AuthSignupResendPage',
  layout: 'auth',
  asyncData({ query }) {
    return {
      email: query.email,
    }
  },
  methods: {
    async signupResend() {
      try {
        await this.$store.dispatch('auth/signupResend', { email: this.email })
        this.$toast.success('Confirmation email has been sent.')
      } catch (e) {
        this.$toast.error(e.message)
      }
    },
  },
}
</script>
