import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import titleMixin from './util/title'
import * as filters from './util/filters'

Vue.mixin(titleMixin)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

export function createApp () {
  const router = createRouter()
  const app = new Vue({
    router,
    render: h => h(App),
  })

  return {app, router}
}
