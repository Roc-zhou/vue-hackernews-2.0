import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './app'
import ProgressBar from './template/ProgressBar.vue'

const {app, router} = createApp()
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

const beforeRouteUpdate = (to, from, next) => {
  const {asyncData} = this.$options
  if (asyncData) {
    asyncData({
      route: to,
    }).then(next).catch(next)
  } else {
    next()
  }
}

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }

    bar.start()
    Promise.all(asyncDataHooks.map(hook => hook({/*store,*/ route: to}))).
      then(() => {
        bar.finish()
        next()
      }).
      catch(next)
  })

  app.$mount('#app')
})

Vue.mixin({beforeRouteUpdate})

if ('https:' === location.protocol && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js')
}