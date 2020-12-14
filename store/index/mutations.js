export default {
    showMenu(state, payload) {
        state.showMenu = payload
    },
    megamenu(state, payload) {
        state.megamenu = payload
    },
    settings(state, payload) {
        state.settings = payload
    },
    busy(state, payload) {
        state.loading = payload
    },
    success(state, msg) {
        this.$toast.success(msg).goAway(2000)
    },
    warning(state, msg) {
        this.$toast.warning(msg).goAway(5000)
    },
    info(state, msg) {
        this.$toast.info(msg).goAway(5000)
    },
    clearErr(state) {
        state.errors = []
        state.loading = true
    },
    setGuest(state, guestId) {
        state.guestId = guestId
    },
    setErr(state, e) {
        state.errors = []
        let vm = this
        if (e.networkError){
            if (!e.networkError.result){
                if (
                  e.networkError.message ==
                  'Unexpected token E in JSON at position 0'
                )
              vm.$toast &&  vm.$toast
                  .error('Unable to connect to server...')
                  .goAway(3000)
                else  state.errors.push('Server is down.')
            }
            else if (e.networkError.result && e.networkError.result.errors) {
              e.networkError.result.errors.map(({ message }, i) => {
                state.errors.push(message)
              })
            } else {
              state.errors = e.networkError
            }
        }
        else if (e.graphQLErrors){ 
            if(e.graphQLErrors.length<1){
                // state.errors.push('Server is down.')
                vm.$toast.error(message).goAway(3000)
            }else{
                e.graphQLErrors.map(({ message }, i) => {
                    state.errors.push(message)
                })
            }
            // console.log(state.errors)    
        }
        else{
            state.errors = [ e ]
        }
        // state.errors.map((message, i) => {
        //     this.$toast.error(message).goAway(3000);
        // })
        state.loading = false
        // console.error('err at store...', e.toString())
    }
}