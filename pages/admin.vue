<template>
  <div>
    this is admin

    <v-btn @click="$store.dispatch('auth/logout');$router.push('/auth/login')">
      Logout
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'AdminPage',
}
</script>
