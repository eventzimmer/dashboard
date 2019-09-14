<template>
  <div id="app">
    <Login></Login>
  </div>
</template>

<script>
import { CALLBACK_PATH } from './store/auth'
import Login from './components/Login.vue'
import './assets/style.default.css'

export default {
  name: 'app',
  components: {
    Login
  },
  mounted () {
    if (window.location.pathname === CALLBACK_PATH) {
      if (!this.$store.getters.authenticated) {
        this.$store.dispatch('handleAuthentication', {}).then((authResult) => {
          window.history.pushState(authResult, '', '/') // redirect away from the ugly callback URL
        })
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
