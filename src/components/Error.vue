<template>
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
      <h1>Login failed!</h1>
      <h3>Do try again!</h3>
      <button @click="goHome">Click here</button>
      </v-flex>
      
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    methods: {
      goHome() {
        this.$router.push("/")
      }
    }
  }
</script>

<style>
















</style>
