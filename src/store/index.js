import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import selection from './selection'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    locations: [],
    sources: [],
    proposed_events: []
  },
  mutations: {
    addProposedEvents(state, proposed_events) {
      state.proposed_events.unshift(...proposed_events)
    },
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
    },
    deleteProposedEvent(state, url) {
      state.proposed_events = state.proposed_events.filter((e) => e.url !== url)
    }
  },
  modules: {
    auth,
    selection
  },
  plugins: [createPersistedState({
    paths: ['auth']
  })]
})
