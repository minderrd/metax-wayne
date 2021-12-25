<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col style="max-width: 400px">
        <v-card>
          <v-card-title>
            A Confirmation Email has been sent
          </v-card-title>
          <v-card-text>
            Please check your inbox for an email and
            click the confirm link.
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn small depressed @click="signupConfirm">
              Confirm
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
      code: query.code,
    }
  },
  mounted() {
    if (this.email && this.code) this.signupConfirm()
  },
  methods: {
    async signupConfirm() {
      try {
        await this.$store.dispatch('auth/signupConfirm', {
          email: this.email,
          code: this.code,
        })
        this.$toast.success('Thank you for your confirmation')
        this.$router.push('/admin')
      } catch (e) {
        this.$toast.error(e.message)
      }
    },
  },
}
</script>
