<template>
  <div class="g-tabs">
    <ul>
      <li v-for="(item, index) in options" :key="index">
        <router-link
          v-if="item.path"
          class="g-tabs__item"
          :class="{ 'g-tabs__item--active': value === item.id }"
          :to="item.path"
        >
          {{ item.title }}
        </router-link>
        <span
          class="g-tabs__item"
          :class="{ 'g-tabs__item--active': value === item.id }"
          @click="$emit('input', item.id)"
        >
          {{ item.title }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Tabs",

  props: {
    value: {
      type: [String, Number],
      default: null
    },
    options: {
      type: Array,
      default: () => null
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/tabs';
</style>
