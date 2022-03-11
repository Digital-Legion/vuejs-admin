<template>
  <div class="g-switcher-wrapper">
    <Label class="g-switcher__label" v-if="label">{{ label }}</Label>
    <button class="g-switcher" :class="{ 'g-switcher--active': value }" @click="$emit('input', !value)" />
  </div>
</template>

<script>
export default {
  name: "Switcher",

  components: {
    Label: () => import('@/components/elements/Label')
  },

  props: {
    value: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/switcher';
</style>
