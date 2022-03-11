<template>
  <div class="g-page">
    <PageHeader title="Users" description="Here you can see the table of all users" double>
      <Button href="/users/create">Create a user</Button>
    </PageHeader>
    <UsersTable
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
  name: "UsersPage",

  mixins: [
    TablePage({
      vuexModule: 'user'
    })
  ],

  components: {
    Button: () => import('@/components/elements/Button'),
    PageHeader: () => import('@/components/containers/PageHeader'),
    UsersTable: () => import('@/components/pages/user/Table')
  }
}
</script>
