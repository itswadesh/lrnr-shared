import cart from './../../gql/cart/cart.gql'
import addToCart from './../../gql/cart/addToCart.gql'
import checkout from './../../gql/cart/checkout.gql'
import applyCoupon from './../../gql/cart/applyCoupon.gql'
import removeCoupon from './../../gql/cart/removeCoupon.gql'

export default {
    async fetch({ commit, state, getters }) {
        // This is only to get data from saved cart
        try {
            commit('clearErr', null, { root: true })
            const data = (
                await this.app.apolloProvider.defaultClient.query({ query: cart, fetchPolicy: 'no-cache' })
            ).data.cart
            commit('setCart', data)
            return data
        } catch (e) {
            commit('setErr', e, { root: true })
        }finally{
            commit('busy', false, { root: true })
        }
    },
    async addToCart({ commit }, payload) {
        // console.log('addToCart........', payload.options)
        if(payload.options)
        payload.options = JSON.stringify(payload.options)
        try {
            // commit('clearErr', null, { root: true })
            const data = (
                await this.app.apolloProvider.defaultClient.mutate({
                    mutation: addToCart,
                    variables: payload
                })
            ).data.addToCart
            commit('setCart', data)
        } catch (e) {
            commit('setErr', e, { root: true })
            throw e
        }finally{
            // commit('busy', false, { root: true })
        }
    },
    async removeCoupon({ commit }, payload) {
        try {
            commit('clearErr', null, { root: true })
            commit('busy', true, { root: true })
            let data = (
                await this.app.apolloProvider.defaultClient.mutate({
                    mutation: removeCoupon,
                    variables: payload
                })
            ).data.removeCoupon
            commit('setCart', data)
        } catch (err) {
            commit('setErr', err, { root: true })
        } finally {
            commit('busy', false, { root: true })
        }
    },
    async applyCoupon({ commit }, payload) {
        try {
            commit('clearErr', null, { root: true })
            let data = (
                await this.app.apolloProvider.defaultClient.mutate({
                    mutation: applyCoupon,
                    variables: payload
                })
            ).data.applyCoupon
            commit('setCart', data)
            this.$router.push('/cart')
        } catch (e) {
            commit('setErr', e, { root: true })
        } finally {
            commit('busy', false, { root: true })
        }
    },
    async checkout(
        { commit, state, rootState, getters },
        { paymentMethod, address }
    ) {
        commit('clearErr', null, { root: true })
        paymentMethod = paymentMethod || 'COD'
        switch (paymentMethod) {
            case 'COD':
                try {
                    commit('busy', true, { root: true })
                    delete address.__typename
                    delete address.createdAt
                    delete address.updatedAt
                    if(address.coords)
                    delete address.coords.__typename
                    let order = (
                        await this.app.apolloProvider.defaultClient.mutate({
                            mutation: checkout,
                            variables: {
                                address,
                                paymentMethod
                            }
                        })
                    ).data.checkout
                    this.$router.push('/success?id=' + order.id)
                } catch (err) {
                    commit('setErr', err, { root: true })
                } finally {
                    commit('busy', false, { root: true })
                }
                break
            case 'Stripe':
                commit('setErr', 'Stripe not implemented yet. Proceed with COD', {
                    root: true
                })
                break
            default:
                commit(
                    'setErr',
                    'The checkout service ' + paymentMethod + ' not yet implemented',
                    { root: true }
                )
                console.log('Unknown checkout service: ' + paymentMethod)
                break
        }
    }
}