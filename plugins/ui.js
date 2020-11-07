import Vue from 'vue'
Vue.component('ErrComponent', () => import('./../components/ErrComponent.vue'))
Vue.component('ContentLoader', () => import('vue-content-loader'))