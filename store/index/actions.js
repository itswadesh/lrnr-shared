import SETTINGS from './../../gql/settings/settings.gql'
import MEGAMENU from './../../gql/category/megamenu.gql'
import SUBSCRIPTION_SETTINGS_UPDATED from './../../gql/settings/settingsUpdated.gql'

export default {
  async fetch({ commit, state, getters }) {
    try {
      commit('clearErr')
      let settings = (
        await this.app.apolloProvider.defaultClient.query({ query: SETTINGS })
      ).data.settings
      let megamenu = (
        await this.app.apolloProvider.defaultClient.query({ query: MEGAMENU })
      ).data.megamenu
      commit('megamenu', megamenu)
      commit('settings', settings)
      const observer = this.app.apolloProvider.defaultClient.subscribe({
        query: SUBSCRIPTION_SETTINGS_UPDATED,
      })

      // observer.subscribe({
      //   next({ data }) {
      //     settings = data && data.settingsUpdated
      //     commit('settings', settings)
      //     // console.log(data.settingsUpdated)
      //   },
      //   error(error) {
      //     console.error('Settings subscription error', error)
      //   },
      // })
    } catch (e) {
      commit('setErr', e)
    } finally {
      commit('busy', false)
    }
  },
  async nuxtServerInit({ dispatch }, { req }) {
    console.error('nuxtServerInit',);
    await dispatch('fetch')
    await dispatch('auth/fetch')
    await dispatch('cart/fetch')
  },
  async nuxtClientInit({ dispatch }, { req }) { // Requred only for admin
    console.error('nuxtClientInit',);
    await dispatch('fetch')
    await dispatch('auth/fetch')
    await dispatch('cart/fetch')
  },
}
