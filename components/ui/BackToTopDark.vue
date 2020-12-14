<template>
  <button
    class="block fixed bottom-0 right-0 z-10 border-0 outline-none shadow-lg bg-gray-400 hover:bg-gray-600 cursor-pointer rounded-full w-8 h-8 text-xl flex justify-center items-center"
    @click="toTop"
    v-if="scrolled > 1000"
  >
    <ArrowUpCircleIcon class="text-gray-800" />
  </button>
</template>

<script>
import { ArrowUpCircleIcon } from 'vue-feather-icons'
export default {
  name: 'BackToTop',
  data() {
    return {
      shouldShow: false,
      scrolled: 0,
    }
  },
  components: { ArrowUpCircleIcon },
  methods: {
    toTop() {
      if (process.client) {
        window.scroll({ behavior: 'smooth', left: 0, top: 100 })
      }
    },
  },
  mounted() {
    if (process.client) {
      window.addEventListener('scroll', () => {
        this.scrolled = window.scrollY
      })
    }
  },
}
</script>
