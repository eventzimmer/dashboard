<template>
  <div id="app">
    <Login v-if="!$store.getters.authenticated"></Login>
    <Organizer v-else></Organizer>
  </div>
</template>

<script>
import { CALLBACK_PATH } from './store/auth'
import Login from './components/Login.vue'
import Organizer from './components/Organizer.vue'
import './assets/style.default.css'

export default {
  name: 'app',
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
  }
}
</script>
