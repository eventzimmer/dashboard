<template>
  <div id="app">
    <Organizer v-if="$store.getters.authenticated" />
    <div v-else-if="!rootPath()">
      <!-- Served as a intermediate so the login page will no be displayed when redirected -->
    </div>
    <Login v-else />
  </div>
</template>

<script>
import { CALLBACK_PATH } from './store/auth'
import Login from './components/Login.vue'
import Organizer from './components/Organizer.vue'
import './assets/style.default.css'

export default {
  name: 'App',
  components: {
    Login,
    Organizer
  },
  mounted () {
    if (window.location.pathname === CALLBACK_PATH) {
      if (!this.$store.getters.authenticated) {
        this.$store.dispatch('handleAuthentication', {}).then((authResult) => {
          window.history.pushState(authResult, '', '/') // redirect away from the ugly callback URL
        })
      }
    }
  },
  methods: {
    rootPath () {
      return (window.location.pathname === '/')
    }
  }
}
</script>
