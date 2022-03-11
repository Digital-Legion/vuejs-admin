<template>
  <div class="auth-page">
    <header class="auth-page__header">
      <img svg-inline src="@/assets/icons/logo.svg" alt="Unplagued">
    </header>
    <page-box class="auth-page__box" title="Login">
      <loading
        :active.sync="wait"
        :can-cancel="false"
        :is-full-page="false"
      />

      <form @submit.prevent="submit">
        <Input v-model="email" type="email" class="mb-5" placeholder="Email" />
        <Input
          v-model="password"
          type="password"
          placeholder="Password"
          @toggle-password="showPassword = !showPassword"
          :show-password="showPassword"
          class="mb-5"
        />
        <Button type="submit" class="g-button auth-page__submit" red>
          <span>Submit</span>
        </Button>
      </form>
    </page-box>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',

  components: {
    PageBox: () => import('@/components/containers/PageBox'),
    Input: () => import('@/components/elements/Input'),
    Button: () => import('@/components/elements/Button')
  },

  data () {
    return {
      email: '',
      password: '',
      showPassword: false,

      wait: false
    }
  },

  methods: {
    ...mapActions('auth', ['login']),

    async submit () {
      if (!this.wait) {
        this.wait = true
        await this.login({
          email: this.email,
          password: this.password
        })
          .then(() => {
            this.$router.push('/')?.catch(() => {})
          })
          .catch(e => {
            this.$toasted.error(e.response.data.error || e.response.data.message)
          })
        this.wait = false
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/auth';
</style>
