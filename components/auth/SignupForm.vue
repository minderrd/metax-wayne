<template>
  <validation-observer
    ref="observer"
  >
    <v-form @submit.prevent="signup">
      <validation-provider
        v-slot="{errors}"
        name="Name"
        :rules="{ required: true }"
      >
        <v-text-field
          v-model="name"
          label="Name"
          placeholder="Please enter your name"
          :error-messages="errors"
        />
      </validation-provider>
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

      <validation-provider
        v-slot="{errors}"
        name="Password"
        vid="password"
        :rules="{ required: true, password: true }"
      >
        <v-text-field
          v-model="password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          :error-messages="errors"
          hint="Use 8 or more mix of letters, numbers & symbols"
          persistent-hint
        >
          <template #append>
            <v-btn
              small
              icon
              tabindex="-1"
              @click="showPassword = !showPassword"
            >
              <v-icon v-if="showPassword">
                mdi-eye-off
              </v-icon>
              <v-icon v-else>
                mdi-eye
              </v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </validation-provider>

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

      <v-btn
        color="primary"
        depressed
        block
        nuxt
        :loading="loading"
        @click="signup"
      >
        Sign Up
      </v-btn>
    </v-form>
  </validation-observer>
</template>

<script>
import { required, email, min, confirmed } from 'vee-validate/dist/rules'
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

extend('email', {
  ...email,
  message: 'Email must be valid',
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
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmation: '',
      showPassword: false,
      showConfirmation: false,
      loading: false,
    }
  },
  methods: {
    async signup() {
      this.loading = true
      try {
        if (!this.$refs.observer.validate()) {
          throw new Error('Please check signup form')
        }
        await this.$store.dispatch('auth/signup', {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        this.$router.push({
          path: '/auth/signupResend',
          query: { email: this.email },
        })
      } catch (e) {
        this.$toast.error(e.message)
      }
      this.loading = false
    },
  },
}
</script>
