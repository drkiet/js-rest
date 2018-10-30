import Vue from 'vue';
import axios from 'axios';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  namespaced: true,
  

  state: {
    hrItems: null,
    stixIds: []
  },

  mutations: {
    updateHrItems(state, items) {
      state.hrItems = items
      
      if (state.hrItems === null) {
        return
      }

      state.hrItems.filter((item) => {
        let found = false
        state.stixIds.forEach(stixId => {
          if (stixId.stix_id === item.stix_id) {
            found = true
          }
        });

        if (!found) {
          state.stixIds.push({stix_id: item.stix_id})
        }
      })
    },

    updateHrItem(state, result) {
      console.log('UpdateHirItem: ' + result)
    }
  },

  getters: {
    hrItems: state => {
      console.log('getter.state: ' + state)
      if (state.hrItems != null) {
        console.log('hrItems length: ' + state.hrItems.length)
      } else {
        console.log('hrItems is null!')
      }
      return state.hrItems
    },

    stixIds: state => {
      return state.stixIds
    }
  },

  actions: {
    nullHrItems({ commit }) {
      console.log('Nullify hrItems for a reload....')
      commit('updateHrItems', null)
    },

    getHrItems({ commit }, authToken ) {
      console.log('getting HR items ...')
      if (authToken === null) {
        return
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'token': `${authToken}`
        },
      }
      
      console.log('authToken: ', authToken)
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:8080/api/v1/humanreview/pending', config)
          .then((result) => {
            console.log('axios.get completes successfully.')
            setTimeout(() => {
              commit('updateHrItems', result.data)
              resolve()
            }, 1000)
            
          })
          .catch((error) => {
            console.log('Error ' + error.response.status)
            setTimeout(() => {
              reject(error)
            }, 1000)
        })
      })
    },

    updateHrItem({ commit }, input) {
      console.log('authToken: ' + input.authToken)
      console.log('stix_id: ' + input.hrItem.stix_id)

      if (input.authToken === null) {
        return
      }

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'token': input.authToken
        },

        params: {
          'field_name': input.hrItem.field_name,
          'action_type': input.hrItem.action,
          'original_value': input.hrItem.original_value,
          'accepted_value': input.hrItem.field_value
        }
      }
      

      console.log('authToken: ', input.authToken)

      const urlStr = `http://localhost:8080/api/v1/humanreview/${input.hrItem.stix_id}/${input.hrItem.field_name}`
      
      return new Promise((resolve, reject) => {
        axios.put(urlStr, null, config)
          .then((result) => {
            setTimeout(() => {
              commit('updateHrItem', result.data)
              resolve()
            }, 1000)
            
          })
          .catch((error) => {
            console.log('Error ' + error.response.status)
            setTimeout(() => {
              reject(error)
            }, 1000)
          })
      })
    }
  }
}