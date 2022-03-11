<template>
  <div class="g-select" :class="{'g-select--round' : round, 'g-select--active': active}">
    <span
      class="g-select__label"
      :class="{ 'g-select__label--active': active || ((value && value instanceof Array) ? value.length : value) }"
      v-if="label"
    >
      {{ label }}
    </span>
    <el-select
      :value="value"
      @change="onChange"
      :multiple="multiple"
      :collapse-tags="collapseSelected"
      :placeholder="label ? '' : (round ? (active ? placeholder : '') : placeholder)"
      @focus="active = true"
      @blur="active = false"
    >
      <template v-if="!round">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </template>
      <template v-else>
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
          class="g-select__color-item"
        >
          <div class="g-select__color" :style="{ background: `#${item.hex}` }" />
          <span class="g-select__label">#{{ item.hex }} | {{ item.name }}</span>
          <span class="g-select__label g-select__label--right">{{ item.id }}</span>
        </el-option>
      </template>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'Select',

  props: {
    value: {
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    label: {
      type: String
    },
    placeholder: {
      type: String,
      default: 'Select one'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    collapseSelected: {
      type: Boolean,
      default: true
    },
    round: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      active: false
    }
  },

  methods: {
    onChange (e) {
      this.$emit('set-value', e)
      this.$emit('input', e)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/select';
</style>
