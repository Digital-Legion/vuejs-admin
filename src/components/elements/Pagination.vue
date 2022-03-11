<template>
  <div class="pagination" v-if="total > perPage">
    <div class="pagination__content">
      <button class="pagination__button-left" @click="changePage(value-1)" :disabled="value === 1">
        <img svg-inline alt="Назад" src="@/assets/icons/arrow-right.svg" style="transform: scaleX(-1);">
      </button>
      <button class="pagination__button" @click="changePage(1)" :class="{ 'current': value === 1 }" :disabled="value === 1">
        <span>1</span>
      </button>
      <button class="pagination__button" v-for="(button,i) in buttons" :key="`pagination-${i}`" @click="changePage(button)" :class="{ 'three-dots': button === '. . .', 'current': button === value }" :disabled="button === '. . .' || button === value">
        <span>{{ button }}</span>
      </button>
      <button class="pagination__button" @click="changePage(lastPage)" :class="{ 'current': value === lastPage }" :disabled="value === lastPage">
        <span>{{ lastPage }}</span>
      </button>
      <button class="pagination__button-right" @click="changePage(value+1)" :disabled="value === lastPage">
        <img svg-inline alt="Вперед" src="@/assets/icons/arrow-right.svg">
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    perPage: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },

  watch: {
    value (n) {
      this.generatePagination(n)
    },

    total () {
      this.generatePagination(this.value)
    }
  },

  mounted () {
    this.generatePagination(this.value)
  },

  data () {
    return {
      buttons: [] // only consists of the middle numbers and ...
    }
  },

  computed: {
    lastPage () {
      return Math.ceil(this.total / this.perPage)
    }
  },

  methods: {
    init () {
      this.generatePagination(this.value)
    },

    changePage (p) {
      if (p > 0 && p < this.lastPage + 1) {
        this.$emit('input', p)
      }
    },

    generatePagination (p) {
      this.buttons = []
      if (this.lastPage === 2) return

      if (p === 1) p = 2
      else if (p === this.lastPage) p = this.lastPage - 1

      if (p - 2 > 1)
        this.buttons.push('...')
      if (p - 1 > 1)
        this.buttons.push(p - 1)
      if (p !== 1 && p !== this.lastPage) // Math.ceil(total / perPage) is the last page
        this.buttons.push(p)
      if (p + 1 < this.lastPage)
        this.buttons.push(p + 1)
      if (p + 2 < this.lastPage)
        this.buttons.push('...')
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/pagination';
</style>
