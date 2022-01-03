<template>
  <v-container>
    <v-row no-gutters align="center">
      <span>
        <v-btn small text color="grey" to="/admin">
          <v-icon small>mdi-home</v-icon>
          Back to Admin
        </v-btn>
      </span>
    </v-row>
    <v-row no-gutters class="mb-5">
      <v-col>
        <h1>My Profile</h1>
      </v-col>
    </v-row>

    <!-- Change Profile  -->
    <v-row no-gutters justify="center">
      <v-col cols="12" md="6">
        <v-card outlined class="mb-10">
          <v-card-title>
            Change Profile
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="userName"
                outlined
                persistent-placeholder
                label="Name"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn depressed color="primary" @click="updateProfile">
              Update
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Change Profile  -->

    <v-row no-gutters justify="center">
      <v-col cols="12" md="6">
        <v-form @submit.prevent="signup">
          <v-card outlined class="mb-10">
            <v-card-title>
              Change Password
            </v-card-title>
            <v-card-text>
              <ChangePasswordForm />
            </v-card-text>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Auth from '@aws-amplify/auth'
import ChangePasswordForm from '@/components/auth/ChangePasswordForm.vue'

export default {
  name: 'UsersProfilePage',
  components: {
    ChangePasswordForm,
  },
  data() {
    return {
      userName: '',
    }
  },
  computed: {
    auth() {
      return this.$store.state.auth
    },
    user() {
      return this.$store.state.auth.user
    },
  },
  created() {
    this.userName = this.user.attributes.name
  },
  methods: {
    async updateProfile() {
      try {
        await Auth.updateUserAttributes(this.user, { name: this.userName })
      } catch (e) {
        this.$toast.error(e.message)
      }
    },
    async updatePassword() {

    },
  },
}
</script>
