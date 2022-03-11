<template>
  <component :is="use" class="g-title">
    <slot>{{ title }}</slot>
  </component>
</template>

<script>
export default {
  name: "Title",

  props: {
    use: {
      type: String,
      default: 'h1'
    },
    title: {
      type: String,
      default: 'Title'
    }
  }
}
</script>
