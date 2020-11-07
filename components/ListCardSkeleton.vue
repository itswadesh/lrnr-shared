<template>
  <div>
    <div class="flex bg-white rounded shadow py-2 px-1 m-2 relative">
      <div class="p-2">
        <img src="`/loading.svg`" class="w-32 h-20 rounded object-cover" />
      </div>
      <div class="my-2 w-full">
        <div>
          <img
            src="`/food-tray.svg`"
            class="object-cover rounded-full h-8 w-8 absolute top-0 right-0 mt-2 mr-2"
          />
        </div>
        <div class="font-bold tracking-wide bg-gray-100 w-48">&nbsp;</div>
        <div class="flex justify-between">
          <div class="flex items-center text-gray-500 tracking-widest text-sm">
            <div class="bg-gray-100 w-48 rounded">&nbsp;</div>
          </div>
          <div class="font-black text-xl text-gray-700">
            {{ 0 | currency(settings.currency_symbol) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  methods: {},
  computed: { ...mapGetters({ settings: 'settings' }) },
}
</script>

<style scoped></style>
