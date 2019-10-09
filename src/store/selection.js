export default {
  state: {
    locationName: null,
    sourceURL: null
  },
  mutations: {
    updateLocationName(state, name) {
      state.locationName = name
    },
    updateSourceURL(state, url) {
      state.sourceURL = name
    }
  }
}
