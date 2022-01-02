<template>
  <v-card>
    Login...
  </v-card>
</template>

<script>
export default {
  name: 'AuthTokenPage',
  asyndData({ query }) {
    const refreshToken = query.refresh

    return {
      errorMessage: query.error,
    }
  },
  mounted() {
    if (this.errorMessage) {this.$toast.error(this.errorMessage)}
  },
}
</script>
