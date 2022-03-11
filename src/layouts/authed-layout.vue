<template>
  <div class="authed-layout">
    <sidebar />
    <div class="g-container page-container" :class="{'container--large': $route.name === 'earn'}">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthedLayout',

  components: {
    Sidebar: () => import('@/components/containers/Sidebar')
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/layouts/authed';
</style>
