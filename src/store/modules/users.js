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

      axios.put('http://localhost:8080/api/v1/user', authCredentials, config)
        .then(result => commit('saveAuthToken', result.data))
        .catch((result) => {
          console.log('Error ' + result.data)
          commit('saveAuthToken', result.data)
      })
    }
  }
}