<template>
  <validation-observer
    ref="observer"
  >
    <div class="my-3">
      <FacebookButton block />
    </div>
    <div class="my-3">
      <GoogleButton block />
    </div>

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

      <validation-provider
        v-slot="{errors}"
        name="Password"
        vid="password"
        :rules="{ required: true }"
      >
        <v-text-field
          v-model="password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          :error-messages="errors"
          placeholder="Please enter your password"
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

      <v-btn
        color="primary"
        depressed
        block
        nuxt
        :loading="loading"
        @click="login"
      >
        Login
      </v-btn>
    </v-form>
  </validation-observer>
</template>

<script>
import { required, email } from 'vee-validate/dist/rules'
import {
  extend, ValidationObserver,
  ValidationProvider, setInteractionMode,
} from 'vee-validate'
import FacebookButton from '@/components/auth/FacebookButton.vue'
import GoogleButton from '@/components/auth/GoogleButton.vue'

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
  components: {
    ValidationObserver,
    ValidationProvider,
    FacebookButton,
    GoogleButton,
  },
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      loading: false,
    }
  },
  methods: {
    async login() {
      this.loading = true
      try {
        if (!await this.$refs.observer.validate()) {
          throw new Error('The email or password is invalid!')
        }

        await this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password,
        })
        this.$router.push('/admin')
      } catch (e) {
        if (e.name === 'UserNotConfirmedException') {
          this.$router.push({
            path: '/auth/signupResend',
            query: { email: this.email },
          })
        }
        console.log(e.name)
        this.$toast.error(e.message)
      }
      this.loading = false
    },
  },
}
</script>
