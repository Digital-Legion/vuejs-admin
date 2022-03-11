<template>
  <div class="g-page">
    <PageHeader title="Works" description="Here you can see the table of all works" double>
      <Button href="/works/create">Create a work</Button>
    </PageHeader>
    <Tabs v-model="activeWorksType" :options="worksTypes" />
    <WorksTable
      :data="data"
      :page="page"
      :per-page="limit"
      :total="total"
      :loading="loading"
      @set-page="setPage"
      @remove="onRemove"
    />
  </div>
</template>

<script>
import TablePage from '@/mixins/table-page'
export default {
  name: "table",
  components: {
    Button: () => import('@/components/elements/Button'),
    PageHeader: () => import('@/components/containers/PageHeader'),
    WorksTable: () => import('@/components/pages/work/Table'),
    Tabs: () => import('@/components/elements/Tabs'),
  },
  mixins: [
    TablePage({
      vuexModule: 'work'
    })
  ],
  data () {
    const worksTypes = [
      {
        id: 'games',
        title: 'Games'
      },
      {
        id: 'landing',
        title: 'Landing'
      }
    ]

    return {
      worksTypes,
      activeWorksType: worksTypes[0].id
    }
  },

  watch: {
    activeWorksType () {
      this.page = 1
      this.loadData()
    }
  },

  computed: {
    additionalGetAllProps () {
      return {
        type: this.activeWorksType
      }
    }
  }
}
</script>

<style>

</style>
