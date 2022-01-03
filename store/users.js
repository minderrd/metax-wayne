import Vue from 'vue'
import Vuex from 'vuex'
import Amplify, { API } from 'aws-amplify'
import awsconfig from '../src/aws-exports'

Vue.use(Vuex)

Amplify.configure(awsconfig)
// const jwt = require('jsonwebtoken')
// const jwkToPem = require('jwk-to-pem')


export const state = () => ({
  isAuthenticated: false,
  user: null,
  token: {},
})


export const actions = {
  /**
   * Get users list from cognito
   * @param {*} param0
   */
  async getUsers({ commit }) {
    try {
      // const data = await API.get('wayneApiTest', '/users')
      const data = await API.get('wayneApi', '/users')
      return data
    } catch (e) {
      console.log(e)
    }
  },
}
