import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    locations: [],
    sources: []
  },
  mutations: {
    addLocations (state, locations) {
      state.locations.unshift(...locations)
    },
    deleteLocation (state, location) {
      state.locations = state.locations.filter((l) => l !== location)
    },
    addSources (state, sources) {
      state.sources.unshift(...sources)
    },
    deleteSource (state, source) {
      state.sources = state.sources.filter((s) => s !== source)
    }
  },
  actions: {

  },
  modules: {
    auth
  }
})
