<template>
  <v-app>
    <v-main class="bg-cloud">
      <Nuxt />
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'MetaX Wayne',
    }
  },
  computed: {
    auth() {
      return this.$store.state.auth
    },
    user() {
      return this.$store.state.auth.user.attributes
    },
  },
}
</script>

<style>
.bg-cloud {
  /* fallback for old browsers */
  background: #ECE9E6;
  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right, #FFFFFF, #ECE9E6);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, #FFFFFF, #ECE9E6);
}
</style>
