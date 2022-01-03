<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col style="max-width: 400px">
        <v-card>
          <v-card-title>
            Reset Password
          </v-card-title>
          <v-card-text>
            <validation-observer
              ref="observer"
            >
              <v-form @submit.prevent="updatePassword">
                <!-- NEW PASSWORD  -->
                <validation-provider
                  v-slot="{errors}"
                  name="New Password"
                  vid="password"
                  :rules="{ required: true, password: true }"
                >
                  <v-text-field
                    v-model="password"
                    label="New Password"
                    :type="showNewPassword ? 'text' : 'password'"
                    :error-messages="errors"
                    hint="Use 8 or more mix of letters, numbers & symbols"
                    persistent-hint
                  >
                    <template #append>
                      <v-btn
                        small
                        icon
                        tabindex="-1"
                        @click="showNewPassword = !showNewPassword"
                      >
                        <v-icon v-if="showNewPassword">
                          mdi-eye-off
                        </v-icon>
                        <v-icon v-else>
                          mdi-eye
                        </v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                </validation-provider>
                <!-- NEW PASSWORD END -->

                <validation-provider
                  v-slot="{errors}"
                  name="Confirm Password"
                  :rules="{ required: true, confirmed:'password' }"
                >
                  <v-text-field
                    v-model="confirmation"
                    label="Confirm Password"
                    :type="showConfirmation ? 'text' : 'password'"
                    :error-messages="errors"
                    placeholder="Please enter your password again"
                  >
                    <template #append>
                      <v-btn
                        small
                        icon
                        tabindex="-1"
                        @click="showConfirmation = !showConfirmation"
                      >
                        <v-icon v-if="showConfirmation">
                          mdi-eye-off
                        </v-icon>
                        <v-icon v-else>
                          mdi-eye
                        </v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                </validation-provider>

                <v-row no-gutters>
                  <v-spacer />
                  <v-btn
                    color="primary"
                    depressed
                    nuxt
                    :loading="loading"
                    @click="updatePassword"
                  >
                    Update Password
                  </v-btn>
                </v-row>
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

import { required, min, confirmed } from 'vee-validate/dist/rules'
import {
  extend, ValidationObserver, ValidationProvider,
  setInteractionMode,
} from 'vee-validate'
import { isStrongPassword } from 'validator'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('min', {
  ...min,
  message: '{_field_} may be greater than {length} characters',
})

extend('confirmed', {
  ...confirmed,
  message: 'Confirm password doesn\'t match Password',
})

extend('password', {
  validate(input) {
    return isStrongPassword(input)
  },
  message: 'Use 8 or more characters with a mix of letters, numbers & symbols',
})

export default {
  name: 'AuthForgetConfirmPage',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  layout: 'auth',
  asyncData({ query }) {
    return {
      email: query.email,
      code: query.code,
    }
  },
  data() {
    return {
      password: '',
    }
  },
  methods: {
    async updatePassword() {
      try {
        if (!this.$refs.observer.validate()) {
          throw new Error('Please check your reset password form again.')
        }
        await Auth.forgotPasswordSubmit(this.email, this.code, this.password)
        this.$toast.success('Password has been changed')
        this.$router.push('/admin')
      } catch (e) {
        this.$toast.error(e.message)
      }
    },
  },
}
</script>
