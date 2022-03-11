<template>
  <div class="g-wrapper">
    <loading
      :active.sync="loading"
      :can-cancel="false"
      :is-full-page="true"
    />

    <component :is="layout">
      <router-view v-if="$route.name === 'auth' || user" />
    </component>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'App',

  components: {
    NoAuthLayout: () => import('@/layouts/non-authed-layout'),
    AuthLayout: () => import('@/layouts/authed-layout')
  },

  async created () {
    if (!localStorage.getItem('token')) {
      this.$router.push('/auth')?.catch(() => {})
    }

    await this.onInit()
  },

  computed: {
    ...mapState({
      user: state => state.auth.user,
      fetchingUser: state => state.auth.fetchingUser
    }),

    layout () {
      return this.$route.meta.layout
    },

    loading () {
      return this.fetchingUser
    }
  },

  methods: {
    ...mapActions({
      onInit: 'onInit'
    })
  }
}
</script>
