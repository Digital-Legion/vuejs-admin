import axios from 'axios'

export default {
  namespaced: true,

  state: {
    user: null,
    fetchingUser: false
  },

  mutations: {
    setUser (state, payload) {
      state.user = payload
      state.fetchingUser = false
    },

    setFetchingUser (state, payload) {
      state.fetchingUser = payload
    }
  },

  actions: {
    login ({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        axios.post('/auth/login-admin', data)
          .then(res => {
            const token = res?.data?.access_token
            if (token) {
              localStorage.setItem('token', token)
              dispatch('getUser')
            }
            resolve(res)
          })
          .catch(e => {
            console.error(e)
            reject(e)
          })
      })
    },

    getUser ({commit}) {
      return new Promise(resolve => {
        commit('setFetchingUser', true)
        axios.get('/auth/profile')
          .then(res => {
            commit('setUser', res.data)
            resolve(res.data)
          })
          .catch(e => {
            console.error(e)
            commit('setUser', null)
            resolve(null)
          })
      })
    }
  }
}
