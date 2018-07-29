import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: ()=>import('../components/HelloWorld')
    }
  ]
}) */
export function createRouter () {
  return new Router({
    mode: 'history', // 注意这里也是为history模式
    routes: [
      {
        path: '/',
        name: 'HelloWorld',
        component: ()=>import('../components/HelloWorld')
      }
    ]
  })
}
