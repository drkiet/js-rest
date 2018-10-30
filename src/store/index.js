import Vue from 'vue'
import Vuex from 'vuex'
import usersModule from './modules/users'
import hrItemsModule from './modules/hr_items'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users: usersModule,
    hrItems: hrItemsModule
  }
})