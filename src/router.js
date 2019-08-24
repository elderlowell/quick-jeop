import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from './components/Dashboard.vue'
import Route from './components/Route.vue'
import Profile from './components/Profile.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: __dirname,
  linkExactActiveClass: 'active',
  routes: [
    { path: '/', name: 'dashboard', component: Dashboard },
    { path: '/route', name: 'route', component: Route },
    { path: '/profile', name: 'profile', component: Profile },
  ]
})
