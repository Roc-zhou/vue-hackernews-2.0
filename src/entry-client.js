import 'es6-promise/auto'
import { createApp } from './app'

const {app, router} = createApp()

router.onReady(() => app.$mount('#app'))

if ('https:' === location.protocol && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js')
}