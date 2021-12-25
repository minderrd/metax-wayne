<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title>
          Welcome to MetaX Wayne
        </v-card-title>
        <v-card-actions>
          <v-btn depressed color="primary" :to="{path: '/auth/signup'}">
            Sign Up
          </v-btn>
          <v-spacer />
          <v-btn depressed color="primary" :to="{path: '/auth/login'}">
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
