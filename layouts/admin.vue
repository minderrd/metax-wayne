<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      dense
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <template v-if="auth.isAuthenticated">
        <v-btn
          icon
          depressed
          @click="rightDrawer = !rightDrawer"
        >
          <avatar avatar :size="30" :username="user.name" />
        </v-btn>
      </template>
    </v-app-bar>
    <v-main class="bg-cloud">
      <Nuxt />
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item :to="'/users/profile'">
          <v-list-item-action>
            <v-icon light>
              mdi-account
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>My Profile</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout()">
          <v-list-item-action>
            <v-icon light>
              mdi-logout
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
  name: 'DefaultLayout',
  components: {
    Avatar,
  },
  middleware: [
    // 'auth',
    'authOnly',
  ],
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
  methods: {
    async logout() {
      try {
        await this.$store.dispatch('auth/logout')
        this.$router.push('/')
      } catch (e) {
        this.$toast.error(e.message)
      }
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
