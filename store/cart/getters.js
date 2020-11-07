export default {
    cart: state => {
        return state
    },
    showCart(state) {
        return state.showCart
    },
    checkCart: state => ({ pid, vid, options }) => {
       // Returns true when there is item in cart
        var found = state.items.some(function (el) {
            const pv = el.pid === pid
            let o = JSON.parse(el.options)
            let matched = true
            for (let k in o) {
              // console.log('oooooooooo', k, o[k], options[k])
              if (o[k] !== options[k]) {
                matched = false
                continue
              }
            }           
             return pv && matched
        })
        return found
    },
    getItemQty: state => ({ pid, vid, options }) => {
        // Gets cart qty of that item
        for (let i of state.items) {
            let io = JSON.parse(i.options)
            if (i.pid === pid)  { // When current product is matched, further match options //  && i.vid === vid // vid matching not required
                let matched=0
                for (let k in options) {
                    if (io[k] === options[k]) {
                        matched++
                    }
                }
                var size = Object.keys(options).length
                if(matched===size)
                return i.qty
            }
        }
        return 0
    }
}