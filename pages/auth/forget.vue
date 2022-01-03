<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col style="max-width: 400px">
        <v-card>
          <v-card-title>
            Forget Password
          </v-card-title>
          <v-card-text>
            <validation-observer
              ref="observer"
            >
              <v-form @submit.prevent="login">
                <validation-provider
                  v-slot="{errors}"
                  name="Name"
                  :rules="{ required: true, email: true }"
                >
                  <v-text-field
                    v-model="email"
                    label="Email"
                    :error-messages="errors"
                    placeholder="Please enter your email address"
                  />
                </validation-provider>

                <v-btn
                  color="primary"
                  depressed
                  block
                  nuxt
                  :loading="loading"
                  @click="forget"
                >
                  Send
                </v-btn>
              </v-form>
            </validation-observer>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Auth } from 'aws-amplify'
import { required, email } from 'vee-validate/dist/rules'
import {
  extend, setInteractionMode, ValidationObserver, ValidationProvider,
} from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('email', {
  ...email,
  message: 'Email must be valid',
})


export default {
  name: 'AuthForgetPage',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  layout: 'auth',
  asyncData({ query }) {
    return {
      email: query.email,
    }
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async forget() {
      this.loading = true
      try {
        await Auth.forgotPassword(this.email)
        this.$toast.success('Reset password email has been sent.')
      } catch (e) {
        this.$toast.error(e.message)
      }
      this.loading = false
    },
  },
}
</script>
