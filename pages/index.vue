<template>
  <v-row justify="center" align="center">
    <v-img
      :src="require('~/assets/images/bg/alpine.jpg')"
      gradient="150deg, rgba(0, 0, 0, .7) 20%, rgba(0, 0, 0, .1)"
      style="min-height: 100vh"
    >
      <v-container class="fill-height" justify="center" align="center">
        <v-row no-gutters justify="center">
          <span
            class="display-3 white--text text-center"
          >
            Welcome to MetaX Wayne
          </span>
        </v-row>

        <v-row no-gutters justify="center">
          <v-btn
            depressed
            x-large
            color="primary"
            class="ma-2"
            :to="{path: '/auth/signup'}"
          >
            Sign Up
          </v-btn>
          <v-btn
            outlined
            x-large
            color="white"
            class="ma-2"
            :to="{path: '/auth/login'}"
          >
            Login
          </v-btn>
        </v-row>
      </v-container>
    </v-img>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
