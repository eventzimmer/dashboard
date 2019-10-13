export default {
  state: {
    locationName: null,
    sourceURL: null,
    eventURL: null
  },
  mutations: {
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
