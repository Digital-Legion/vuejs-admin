<template>
  <Table
      :total="total"
      :per-page="perPage"
      :page="page"
      :loading="loading"
      @set-page="$emit('set-page', $event)"
  >
    <el-table :data="data">
      <el-table-column
          prop="page"
          label="Page"
          width="120"
      />
      <el-table-column
          prop="limit"
          label="Limit"
      />
      <el-table-column
          width="100"
      >
        <template slot-scope="scope">
          <div class="g-table__actions">
            <Button :href="`/posts/edit/${scope.row.id}`">
              <font-awesome-icon icon="edit" />
            </Button>
            <Button @click="onRemove(scope.row.id)" danger>
              <font-awesome-icon icon="trash" />
            </Button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </Table>
</template>

<script>
import Table from "@/components/elements/Table"
import Button from "@/components/elements/Button"
import TableMixin from '@/mixins/table'

export default {
  name: "PostTable",

  components: {Table, Button},

  mixins: [TableMixin],

  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>
