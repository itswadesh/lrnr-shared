import me from './../gql/user/me.gql'
import SCOPES from '~/../shared/gql/scope/scopes.gql'
export default async function ({ app, error, store, redirect, route }) {
  const client = app.apolloProvider.defaultClient
  try {
    store.commit('clearErr')
    const res = (await client.query({ query: me, fetchPolicy: 'no-cache' }))
      .data.me
     if (res.role !== 'vendor') return;
      const scopes = (await client.query({ query: SCOPES })).data.scopes
      if (scopes.count < 1) {
        redirect('/scope')
      }
  } catch (e) {
    redirect(`/login#${route.fullPath}`)
  } finally {
    store.commit('busy', false)
  }
  // try {
  //   store.commit('clearErr')
   
  // } catch (e) {
  //   redirect(`/my`)
  // } finally {
  //   store.commit('busy', false)
  // }
}
