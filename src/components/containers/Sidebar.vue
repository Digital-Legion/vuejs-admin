<template>
  <aside class="g-sidebar" :class="{ 'g-sidebar--collapsed': isCollapsed }">
    <router-link to="/" class="g-sidebar__logo">
      <img
        svg-inline
        src="@/assets/icons/logo.svg"
        alt="Logo"
        class="g-sidebar__logo-icon g-sidebar__logo-icon--desktop"
      >
      <img
        svg-inline
        src="@/assets/icons/logo-short.svg"
        alt="Logo"
        class="g-sidebar__logo-icon g-sidebar__logo-icon--mobile"
      >
    </router-link>
    <nav class="g-sidebar__nav">
      <ul class="g-sidebar__nav-list">
        <template v-for="(item, index) in navLinks">
          <li
            class="g-sidebar__nav-list-item"
            :key="index"
            v-if="!item.availableTo || item.availableTo.includes(user ? user.role : null)"
          >
            <router-link :to="item.route" class="g-sidebar__nav-list-item-link" v-if="!item.external">
              <font-awesome-icon v-if="item.icon" :icon="item.icon" class="g-sidebar__nav-icon" />
              <span>{{ item.label }}</span>
            </router-link>
            <a :href="item.route" target="_blank" class="g-sidebar__nav-list-item-link" v-else>
              <font-awesome-icon v-if="item.icon" :icon="item.icon" class="g-sidebar__nav-icon" />
              <span>{{ item.label }}</span>
            </a>
          </li>
        </template>
      </ul>
    </nav>
    <button class="g-sidebar__collapse-toggle" @click="isCollapsed = !isCollapsed">
      <img
        svg-inline
        src="@/assets/icons/arrow-right.svg"
        alt="Toggle"
      >
    </button>
  </aside>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'Sidebar',

  data () {
    return {
      isCollapsed: false
    }
  },

  mounted () {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },

  computed: {
    ...mapState({
      navLinks: state => state.navLinks,
      user: state => state.auth.user,
    })
  },

  methods: {
    onResize () {
      this.isCollapsed = window.innerWidth <= 1100
    }
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/containers/sidebar';
</style>
