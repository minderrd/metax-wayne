<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col style="max-width: 400px">
        <v-card>
          <v-card-title class="headline">
            Login
          </v-card-title>
          <v-card-subtitle>
            Login to MetaX
          </v-card-subtitle>
          <v-card-text>
            <AuthLoginForm />
            <v-row no-gutters class="my-4" justify="center">
              <nuxt-link :to="`/signup`" class="text-decoration-none">
                Forget Password
              </nuxt-link>
            </v-row>
          </v-card-text>
          <v-card-text align="center">
            <v-divider />
            <span>
              Don't have an account?
              <nuxt-link
                to="/auth/signup"
                class="font-weight-bold text-decoration-none"
              >
                Sign Up!
              </nuxt-link>
            </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import awsConfig from '@/src/aws-exports'

export default {
  name: 'AuthLoginPage',
  layout: 'auth',
  asyncData({ store, redirect }) {
    if (store.state.auth.isAuthenticated) {redirect('/admin')}
  },
  computed: {
    auth() {
      return this.$store.state.auth
    },
    config() {
      return awsConfig
    },
  },
}
</script>
