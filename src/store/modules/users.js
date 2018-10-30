import Vue from 'vue';
import axios from 'axios';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  namespaced: true,

  state: {
    authToken: null
  },

  mutations: {
    saveAuthToken(state, token) {
      console.log('Updated token ' + token)
      state.authToken = token
    }
  },

  getters: {
    authToken: state => {
      return state.authToken
    }
  },

  actions: {
    signIn({ commit }, input ) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const authCredentials = {
        username: `${input.username}`,
        password: `${input.password}`,
      }

      console.log('*** calling axios.put() begins')

      return new Promise((resolve, reject) => {
        axios.put('http://localhost:8080/api/v1/user', authCredentials, config)
        .then((result) => {
          console.log('--- axios.put completes successfully: ' + result.data)
          setTimeout(() => {
            commit('saveAuthToken', result.data)
            resolve()
          }, 1000)
        })
        .catch((error) => {
          console.log('--- axios.put failed: ' + error.response.data)
          setTimeout(() => {
            commit('saveAuthToken', error.response.data)
            reject(error)
          }, 1000)
        })
      })
    }
  }
}