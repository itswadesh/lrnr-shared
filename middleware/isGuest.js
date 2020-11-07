import me from './../gql/user/me.gql'
export default async function ({ app, error, store, redirect }) {
  const client = app.apolloProvider.defaultClient
  try {
    store.commit('clearErr')
    const res = (await client.query({ query: me, fetchPolicy: 'no-cache' })).data.me
    if (res) {
      redirect('/my')
    }
  } catch (e) {
  } finally {
    store.commit('busy', false)
  }
}
