<template>
  <div class="g-info">
    <Label v-if="label" class="g-info__label">{{ label }}</Label>
    <div class="g-info__entry" v-for="(entry, index) in info" :key="index">
      <div class="g-info__side">
        <div class="g-info__entry-cell g-info__entry-cell--key">
          {{entry.key}}
        </div>
      </div>
      <div class="g-info__side">
        <div class="g-info__entry-cell">
          {{entry.value}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Info",

  components: {
    Label: () => import('@/components/elements/Label')
  },

  props: {
    info: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/info';
</style>
