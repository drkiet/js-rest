<template>
  <div id="app">
  <v-container>
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
    console.log('App is created.')
  },
  
  components: {
    app
  },
  
  methods: {
    ...mapActions('users', ['signIn']),

    login() {
      console.log(`login button clicked! ${this.input.username}:${this.input.password}`);
      this.signIn(Object.assign({}, this.input))
        .then(() => {
          console.log('then is called.')
          this.$router.push('/hr')
          console.log('should be at human review now ...')
        })
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