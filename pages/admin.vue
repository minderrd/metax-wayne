<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" md="6" class="pa-2">
        <v-card>
          <v-card-title>
            User List
          </v-card-title>
          <v-simple-table>
            <template #default>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="user of users">
                  <tr :key="`user-uuid-${user.sub}`">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                  </tr>
                </template>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" class="pa-2">
        <v-card>
          <v-card-title>
            Recent Login Users
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" class="pa-2">
        <v-card>
          <v-card-title>
            Dashboard
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AdminPage',
  layout: 'admin',
  data() {
    return {
      users: [],
    }
  },
  computed: {
    auth() {
      return this.$store.state.auth
    },
  },
  async created() {
    await this.getUsers()
  },
  methods: {
    async getUsers() {
      try {
        this.users = await this.$store.dispatch('users/getUsers')
      } catch (e) {
        this.$toast.error(e.message)
      }
    },
  },
}
</script>
