<template>
  <div class="g-page">
    <PageHeader title="Posts" description="Here you can add posts" double>
      <Button href="/posts/create">Create a post</Button>
    </PageHeader>
    <PostTable
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
  name: "PostPage",

  mixins: [
    TablePage({
      vuexModule: 'post'
    })
  ],

  components: {
    Button: () => import('@/components/elements/Button'),
    PageHeader: () => import('@/components/containers/PageHeader'),
    PostTable: () => import('@/components/pages/posts/Table')
  }
}
</script>
