import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import selection from './selection'

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
    deleteLocation (state, name) {
      state.locations = state.locations.filter((l) => l.name !== name)
    },
    addSources (state, sources) {
      state.sources.unshift(...sources)
    },
    deleteSource (state, url) {
      state.sources = state.sources.filter((s) => s.url !== url)
    }
  },
  modules: {
    auth,
    selection
  }
})
