<template>
  <section class="page-box" :class="{'page-box--double': double}">
    <Title v-if="title" class="g-title">
      {{ title }}
      <span class="small" v-if="sideTitle">
        {{ sideTitle }}
      </span>
    </Title>
    <slot name="outer-content" />
    <div class="page-box__content">
      <slot />
    </div>
    <slot name="bottom-content" />
  </section>
</template>

<script>
export default {
  name: 'PageBox',

  props: {
    double: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    sideTitle: {
      type: String
    }
  },

  components: {
    Title: () => import('@/components/elements/Title')
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/containers/page-box';
</style>
