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
      state.stixIds = []
      
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
          state.stixIds.push({
            stix_id: item.stix_id, 
            accepted_all: true,
            hrItems: []
          })
        }
      })
      
      // making a list of stix ids & associated fields.
      state.stixIds.forEach(stixId => {

        state.hrItems.forEach(hrItem => {
          if (hrItem.stix_id == stixId.stix_id) {
            stixId.hrItems.push(hrItem)
            if (hrItem.status !== 'Accepted') {
              stixId.accepted_all = false
            }
          }
        })

        console.log('stix_id: ' + stixId.stix_id + " --> accepted_all: " + stixId.accepted_all)
      })
    },

    updateHrItem(state, result) {
      console.log('UpdateHrItem: ' + result)
    },

    updateGroupAction(state, result) {
      console.log('UpdateGroupAction: ' + result)
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
    },

    groupAction({ commit }, input) {
      console.log('authToken: ' + input.authToken)
      console.log('stix_id: ' + input.stix_id)
      console.log('action: ' + input.group_action)

      if (input.authToken === null) {
        return
      }

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'token': input.authToken
        },

        params: {
          'stix_id': input.stix_id,
          'group_action': input.group_action,
        }
      }
      

      const urlStr = `http://localhost:8080/api/v1/humanreview/${input.stix_id}`
      
      return new Promise((resolve, reject) => {
        axios.put(urlStr, null, config)
          .then((result) => {
            setTimeout(() => {
              commit('updateGroupAction', result.data)
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