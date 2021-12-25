<template>
  <v-app>
    <v-main class="bg-gradient py-4">
      <v-row no-gutters justify="center">
        <span class="display-1 white--text">Meta X Wayne</span>
      </v-row>
      <Nuxt />
    </v-main>

    <v-footer
      app
      class="text-center"
    >
      <span>Wayne Yen &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'AuthLayout',
}
</script>

<style>
.bg-gradient {
    /* fallback for old browsers */
  background: #24C6DC;
  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to bottom, #514A9D, #24C6DC);
  background: linear-gradient(to bottom, #514A9D, #24C6DC);
}
 /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
</style>
