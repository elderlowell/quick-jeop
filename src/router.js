import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/Nav.vue'),
      children: [
        { path: '/', name: 'Home', component: () => import('@/components/Home.vue') },
        { path: '/game', name: 'Game', component: () => import('@/components/Game.vue') },
        { path: '/profile', name: 'Profile', component: () => import('@/components/Profile.vue') },
        { path: '/login', name: 'Login', component: () => import('@/components/Login.vue') }
      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   window.scrollTo(0, 0)
//   if (to.matched.some(r => r.meta.requiresAuth)) {
//     if (!validToken) {
//       localStorage.removeItem('access_token')
//       localStorage.removeItem('token_expire')
//       localStorage.removeItem('previous')
//       next({
//         path: '/login'
//       })
//     } else if (parseInt(Date.now() / 1000) > tokenExpire) {
//       localStorage.removeItem('access_token')
//       localStorage.removeItem('token_expire')
//       localStorage.removeItem('previous')
//       next({
//         path: '/login'
//       })
//     } else {
//       localStorage.setItem('previous', from.name)
//       next()
//     }
//   }
//   next()
// })

export default router
