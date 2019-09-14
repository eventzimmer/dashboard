import auth0 from 'auth0-js'
import authConfig from '../assets/auth_config.json'

export const CALLBACK_PATH = '/callback'

const webAuth = new auth0.WebAuth({
  domain: authConfig.domain,
  redirectUri: `${window.location.origin}${CALLBACK_PATH}`,
  audience: 'api.eventzimmer.de',
  responseType: 'token id_token',
  clientID: authConfig.clientId,
  scope: 'openid profile email'
});

export default {
  state: {
    accessToken: null,
    idToken: null,
    profile: null,
    tokenExpiry: null
  },
  getters: {
    tokenExpiry(state) {
      return (state.tokenExpiry !== null) ? (new Date(state.tokenExpiry * 1000)) : null
    },
    initialized(state) {
      return (state.idToken !== null)
    },
    authenticated(state, getters) {
      return (getters.initialized && (new Date() < getters.tokenExpiry))
    }
  },
  mutations: {
    updateAccessToken(state, token) {
      state.acceleration = token
    },
    updateIdToken(state, token) {
      state.idToken = token
    },
    updateProfile(state, profile) {
      state.profile = profile
    },
    updateTokenExpiry(state, expiry) {
      state.tokenExpiry = expiry
    }
  },
  actions: {
    login(state, customState) {
      webAuth.authorize({
        appState: customState
      })
    },
    handleAuthentication(state) {
      return new Promise((resolve) => {
        webAuth.parseHash((err, authResult) => {
          if (err) {
            throw(err)
          } else {
            state.dispatch('localLogin', authResult)
            resolve(authResult)
          }
        })
      })
    },
    localLogin(state, authResult) {
      state.commit('updateAccessToken', authResult.accessToken)
      state.commit('updateIdToken', authResult.idToken)
      state.commit('updateProfile', authResult.idTokenPayload)
      state.commit('updateTokenExpiry', authResult.idTokenPayload.exp)
      return (authResult.appState || {})
    },
    renewTokens(state) {
      return new Promise((resolve) => {
        if (!state.getters.initialized) {
          throw new Error('Not logged in!')
        }

        webAuth.checkSession({}, (err, authResult) => {
          if (err) {
            throw err;
          } else {
            state.dispatch('localLogin', authResult);
            resolve(authResult);
          }
        })
      })
    },
    logout(state) {
      state.commit('updateIdToken', null)
      state.commit('updateProfile', null)
      state.commit('updateTokenExpiry', null)
      webAuth.logout({
        returnTo: window.location.origin
      })
    }
  }
}
