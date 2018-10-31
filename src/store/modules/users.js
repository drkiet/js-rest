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
        .then((response) => {
          console.log('--- axios.put completes successfully: ' + response.data)
          setTimeout(() => {
            commit('saveAuthToken', response.data)
            resolve(response)
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