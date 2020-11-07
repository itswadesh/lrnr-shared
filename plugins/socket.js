import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
import { WS_URL } from '~/config'
Vue.use(VueSocketio, WS_URL || 'http://localhost:9000')
