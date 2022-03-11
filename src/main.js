// default
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// styles
import 'vue-loading-overlay/dist/vue-loading.css'
import './assets/styles/app.scss'
import './assets/styles/common.scss'

// plugins
import axios from 'axios'
import VueLoading from 'vue-loading-overlay'
import PhoneMaskInput from 'vue-phone-mask-input'
import TextareaAutosize from 'vue-textarea-autosize'
import Toasted from 'vue-toasted'
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {
  faEdit,
  faTrash,
  faTrashRestore,
  faSave,
  faTimes,
  faUsers,
  faClipboard,
  faSliders,
  faBriefcase,
  faEye,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_API_URL || ''

// add auth token in request
axios.interceptors.request.use(function (config) {
  // Do something before request is sent, like we're inserting a timeout for only requests with a particular baseURL
  const token = localStorage.getItem('token')
  if (token)
    config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// handle no token error in response
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if ([401, 403].includes(error.response.status)) {
    localStorage.removeItem('token')
    router.push('/auth').catch(() => {
    })
  }
  return Promise.reject(error)
})

Vue.component('loading', VueLoading)
Vue.use(VueLoading)
Vue.component('phone-mask-input', PhoneMaskInput)
Vue.use(TextareaAutosize)
Vue.use(Toasted, {
  position: 'bottom-center',
  duration: 5000
})
Vue.use(ElementUI)

locale.use(lang)

library.add(
  faEdit,
  faTrash,
  faTrashRestore,
  faUsers,
  faSave,
  faTimes,
  faSliders,
  faBriefcase,
  faClipboard,
  faEye,
  faEyeSlash
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
