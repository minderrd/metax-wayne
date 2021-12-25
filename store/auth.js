import Vue from 'vue'
import Vuex from 'vuex'
import { Auth } from 'aws-amplify'
// const jwt = require('jsonwebtoken')
// const jwkToPem = require('jwk-to-pem')

Vue.use(Vuex)

export const state = () => ({
  isAuthenticated: false,
  user: null,
  token: {},
})

export const mutations = {
  set(state, user) {
    state.isAuthenticated = !!user
    state.user = user
  },
  setToken: (state, { key, value }) => {
    if (['id', 'refresh', 'access'].includes(key)) {
      state.token[key] = value
    }
  },
  setUser: (state, input) => {
    state.user = input
  },
}

export const actions = {
  async load({ commit }) {
    try {
      const user = await Auth.currentAuthenticatedUser()
      commit('set', user)
      return user
    } catch (e) {
      commit('set', null)
    }
  },
  async signup({ commit }, { name, email, password }) {
    const user = await Auth.signUp({
      username: email,
      password,
      attributes: {
        email, // optional
        locale: 'zh-TW',
        name,
      },
    })
    return user
  },
  async signupConfirm({ commit }, { email, code }) {
    return await Auth.confirmSignUp(email, code)
  },
  async signupResend({ commit }, { email }) {
    return await Auth.resendSignUp(email)
  },
  async login({ commit }, { email, password }) {
    const user = await Auth.signIn(email, password)
    commit('set', user)
    return user
  },
  async logout({ commit }) {
    await Auth.signOut()
    commit('set', null)
  },
}
