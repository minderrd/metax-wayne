<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col style="max-width: 400px">
        <v-card>
          <v-card-title class="headline">
            Sign Up
          </v-card-title>
          <v-card-subtitle>
            Create a new account
          </v-card-subtitle>
          <v-card-text>
            <AuthSignupForm />
          </v-card-text>
          <v-card-text align="center">
            <v-divider />
            <span>
              Have an account? <nuxt-link to="/auth/login" class="font-weight-bold text-decoration-none">Log In!</nuxt-link>
            </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AuthSignupPage',
  layout: 'auth',
}
</script>
