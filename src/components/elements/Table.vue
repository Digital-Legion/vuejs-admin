<template>
  <div class="g-table">
    <div class="g-table__content">
      <loading
        :active.sync="loading"
        :can-cancel="false"
        :is-full-page="false"
      />
      <slot />
    </div>
    <Pagination
      :value="page"
      @input="$emit('set-page', $event)"
      :per-page="perPage"
      :total="total"
    />
  </div>
</template>

<script>
import Pagination from "@/components/elements/Pagination";
import Table from '@/mixins/table'

export default {
  name: "Table",

  components: {Pagination},

  mixins: [Table]
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/table';
</style>
