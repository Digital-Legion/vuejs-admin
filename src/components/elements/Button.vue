<template>
  <button
    v-if="!href"
    class="g-button"
    :class="{
      'g-button--primary': primary,
      'g-button--danger': danger,
      'g-button--blinking': blinking
    }"
    :type="type"
    @click="$emit('click')"
  >
    <span class="g-button__content">
      <slot />
    </span>
  </button>
  <router-link class="g-button" :to="href" v-else-if="!nativeLink">
    <span class="g-button__content">
      <slot />
    </span>
  </router-link>
  <a class="g-button" :href="href" :target="target" v-else @click="onClickNativeLink">
    <span class="g-button__content">
      <slot />
    </span>
  </a>
</template>

<script>
export default {
  name: 'Button',

  props: {
    href: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'button'
    },
    target: {
      type: String,
      default: null
    },
    nativeLink: {
      type: Boolean,
      default: false
    },

    primary: {
      type: Boolean,
      default: false
    },
    danger: {
      type: Boolean,
      default: false
    },
    blinking: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onClickNativeLink (e) {
      if (this.$listeners?.click) {
        e.preventDefault()
        this.$emit('click')
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/button';
</style>
