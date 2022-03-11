<template>
  <div class="not-authed-layout">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'NonAuthedLayout',

  created () {
    if (localStorage.getItem('token'))
      this.$router.push('/')
  }
}
</script>
