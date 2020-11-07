import me from './../gql/user/me.gql'
export default async function ({ app, error, store, redirect,route  }) {
  const client = app.apolloProvider.defaultClient
  try {
    store.commit('clearErr')
    const res = (await client.query({ query: me, fetchPolicy: 'no-cache' })).data.me
  } catch (e) {
    redirect(`/login#${route.fullPath}`)
  } finally {
    store.commit('busy', false)
  }
}
