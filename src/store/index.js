import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/auth'
import user from '@/store/user'
import role from '@/store/role'
import routes from '@/consts/routes'
import work from "@/store/work.js";
import post from "@/store/post";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    user,
    role,
    post,
    work
  },

  state: {
    navLinks: routes.filter(r => r.sidebarable).map(r => ({...r, route: r.path}))
  },

  actions: {
    async onInit ({ dispatch }) {
      if (localStorage.getItem('token')) {
        dispatch('auth/getUser', null, { root: true })
      }
    }
  }
})
