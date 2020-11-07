export default {
  data: () => ({
    data: [],
    meta: {
      page: 1,
      count: 0,
      sort: null, // null will honour the search result weight
      search: '',
      end: false
    }
  }),
  methods: {
    async getData(scrolled = false) {
      // const location = this.$cookies.get('geo')
      // if (!location) return this.$router.push('/onboarding')

      if (this.meta.busy) return
      if (scrolled && this.meta.end) return
      try {
        this.meta.busy = true
        let params = this.$route.query
        params.page = this.meta.page
        params.search = this.$route.params.q
        // params.city=location.city
        this.$store.commit('clearErr')
        const { data, count, pageSize, page } = (
          await this.$apollo.query({
            query: this.model,
            variables: params,
            fetchPolicy: 'no-cache'
          })
        ).data[this.attr]
        this.data = scrolled ? this.data.concat(data) : data
        this.loadmoreSpin = false
        this.meta.count = count
        this.meta.filtered =
        parseInt(data.length) + (parseInt(pageSize) - 1) * parseInt(page)
        this.meta.end = data.length < pageSize ? true : false
        this.meta.page++
      } catch (e) {
        // if (
        //   e &&
        //   e.graphQLErrors &&
        //   e.graphQLErrors[0] &&
        //   e.graphQLErrors[0].message == 'Please select city'
        // )
          // this.$router.push('/onboarding')
        this.$store.commit('setErr', e)
      } finally {
        this.$store.commit('busy', false)
        this.meta.busy = false
      }
    },
    async loadMore() {
      this.getData(true)
    },
    go(url) {
      this.$router.push(url)
    }
  },
  watch: {
    '$route.query': {
      immediate: true,
      handler(value, oldValue) {
        if (JSON.stringify(value) == JSON.stringify(oldValue)) return
        this.getData()
      }
    }
  }
}
