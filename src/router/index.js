import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import HumanReview from '../components/HumanReview.vue'

Vue.use(Router);

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
  }]
})

