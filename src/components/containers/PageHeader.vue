<template>
  <div class="page-header" :class="{ 'page-header--double': double }">
    <div class="page-header__text-wrapper">
      <Title class="page-header__title">{{ title }}</Title>
      <p class="page-header__description">{{ description }}</p>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "PageHeader",

  components: {
    Title: () => import('@/components/elements/Title')
  },

  props: {
    title: {
      type: String
    },
    description: {
      type: String
    },
    double: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/containers/page-header';
</style>
