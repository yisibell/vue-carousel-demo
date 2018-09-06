import Vue from 'vue'
import App from './App.vue'

import whirligig from './whirligig'

Vue.use(whirligig)

new Vue({
  el: "#app",
  render(h){
    return h(App)
  }
})