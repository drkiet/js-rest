import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import HumanReview from '../components/HumanReview.vue'
import Error from '../components/Error.vue'

Vue.use(Router);

/**
 * routes are determined in the order it appears in the code.
 */
export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'login',
    components: {
      default: Login,
    },
  }, {
    path: '/hr',
    name: 'Hr',
    components: {
      default: HumanReview
    }
  }, {
    path: '/error',
    name: 'Error',
    components: {
      default: Error
    }
  }]
})

