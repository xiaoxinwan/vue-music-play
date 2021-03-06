import Vue from 'vue'
import App from './App.vue'
import router from './router'
import fastclick from 'fastclick'
import './assets/stylus/index.styl'
import VueLazyLoad from 'vue-lazyload'
import store from './store'

fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
  loading: require('./assets/image/default.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
