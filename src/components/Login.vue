<template>
  <div id="app">
  <v-container>
    <v-flex xs12>
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="100"
        ></v-img>
      </v-flex>
    <v-layout row class="text-xs-center">
      <v-flex xs3 style="background-image: url('http://cdn.wallpapersafari.com/7/86/gqiGH7.jpg')">
        <v-card height="500px"></v-card>
      </v-flex>
      
      <v-flex xs4 class="grey lighten-4">
        <v-container style="position: relative;top: 13%;" class="text-xs-center">
          <v-card flat>
            <v-card-title primary-title>
              <h4>Login</h4>
            </v-card-title>
            <v-form>
            <v-text-field v-model="input.username" prepend-icon="person" name="Username" label="Username"></v-text-field>
            <v-text-field v-model="input.password" prepend-icon="lock" name="Password" label="Password" type="password"></v-text-field>
            <v-card-actions>
              <v-btn primary large block @click="login">Login</v-btn>
            </v-card-actions>
            </v-form>
          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import { mapActions } from 'vuex';
'use strict'

export default {
  name: 'App',

  created() {
    console.log('Login.vue is created.')
  },
  
  components: {
    app
  },
  
  methods: {
    ...mapActions('users', ['signIn']),

    /**
     * When a user click the 'login' button, I would expect the following
     * activities to occur:
     * 
     * 1. signIn method (actions) of the users module is invoked.
     * 2. the call returns immediately because of it is asynchronous.
     * 3. When singIn completes, either the then () or the catch () method
     *    is called.
     *    - if success, the router takes the user to the /hr page.
     *    - else, the user is routed to an error page.
     */
    login() {
      console.log(`Login with: ${this.input.username}:${this.input.password}`);
      console.log('*** calling users.signIn() begins')
      this.signIn(Object.assign({}, this.input))
        .then((response) => {
          console.log('=== login completes successfully: ' + response.data)
          this.$router.push('/hr')
        })
        .catch((error) => {
          console.error("=== Login failed: " + error.response.status)
          console.error("=== Login failed: " + error.response.data)
          this.$router.push('/error')
        })
        console.log('*** calling users.signIn() ends')
    }
  },

  data () {
    return {
      input: {
        username: '',
        password: ''
      }
    }
  }
}
</script>

<style>
</style>