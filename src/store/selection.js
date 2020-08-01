export default {
  state: {
    locationName: null,
    sourceURL: null,
    eventURL: null,
    archivedEvents: []
  },
  getters: {
    archivedEvents (state) {
      return new Set(state.archivedEvents)
    }
  },
  mutations: {
    archiveEvent(state, url) {
      state.archivedEvents.push(url)
    },
    updateLocationName(state, name) {
      state.locationName = name
    },
    updateSourceURL(state, url) {
      state.sourceURL = url
    },
    updateEventURL(state, url) {
      state.eventURL = url
    }
  }
}
