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
    getHrItems({ commit }, authToken ) {
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

      axios.get('http://localhost:8080/api/v1/humanreview/pending', config)
        .then(result => commit('updateHrItems', result.data))
        .catch((result) => {
          console.log('Error ' + result.data)
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
      
      axios.put(urlStr, null, config)
        .then(result => commit('updateHrItem', result.data))
        .catch((result) => {
          console.log('Error ' + result.data)
        })
    }
  }
}