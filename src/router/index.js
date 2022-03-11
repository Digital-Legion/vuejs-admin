import Vue from 'vue'
import VueRouter from 'vue-router'
import rawRoutes from '@/consts/routes'

Vue.use(VueRouter)

const mapRoute = route => {
  const routerRoute = {
    path: route.path
  }

  if (route.componentPath) {
    routerRoute.component = () => import(`@/${route.componentPath.replace('@/', '')}`)
  }

  if (route.redirect)
    routerRoute.redirect = route.redirect
  else
    routerRoute.meta = {}

  if (route.name)
    routerRoute.name = route.name

  if (route.layout)
    routerRoute.meta.layout = route.layout

  if (route.availableTo)
    routerRoute.meta.availableTo = route.availableTo

  return routerRoute
}

const routes = rawRoutes.filter(r => !r.external).map(r => mapRoute(r))

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
