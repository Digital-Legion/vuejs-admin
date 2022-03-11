import {mapActions, mapMutations, mapState} from 'vuex'

const tablePageMixin = ({
  vuexModule,
  locallyPaginatedData,
  vuexSetDataFunctionName
}) => ({
  data () {
    return {
      page: 1,
      limit: 10,
      total: 0,
      data: [],
      loading: false,
      editedItemId: null,
      creatingNew: false
    }
  },

  async created () {
    await this.loadData()
  },

  watch: {
    nonPaginatedData: {
      immediate: true,
      handler () {
        if (this.nonPaginatedData?.length) {
          this.total = this.nonPaginatedData.length
        }
      }
    }
  },

  computed: {
    ...mapState({
      nonPaginatedData: state => locallyPaginatedData ? state[vuexModule]?.[locallyPaginatedData] : null
    }),

    paginatedData () {
      if (this.nonPaginatedData) {
        return this.nonPaginatedData.slice((this.page - 1) * this.limit, this.page * this.limit)
      }
      return null
    }
  },

  methods: {
    ...mapActions({
      getAll: `${vuexModule}/getAll`,
      createOne: `${vuexModule}/createOne`,
      updateOne: `${vuexModule}/updateOne`,
      deleteOne: `${vuexModule}/deleteOne`
    }),
    ...mapMutations({
      setData: `${vuexModule}/${vuexSetDataFunctionName}`
    }),

    async loadData (force) {
      this.loading = true
      if (!locallyPaginatedData || force) {
        const data = await this.getAll({
          page: this.page,
          limit: locallyPaginatedData ? 10000 : this.limit,
          additionalProps: this.additionalGetAllProps
        })
        if (!locallyPaginatedData) {
          this.data = data?.data || data || []
          this.total = data?.total || 0
        } else {
          this.setData(data?.data || data || [])
        }
      }
      this.$nextTick(() => {
        this.loading = false
      })
    },

    async setPage (page) {
      if (this.creatingNew) {
        this.$toasted.error('You must be on the first page to create a new item')
        // eslint-disable-next-line
      } else if (!!this.editedItemId) {
        this.$toasted.error('You cannot change the page while editing an item')
      } else {
        this.page = page
        await this.loadData()
      }
    },

    onEdit (id) {
      this.creatingNew = false
      this.editedItemId = this.editedItemId === id ? null : id
    },

    onCreate () {
      this.editedItemId = null
      this.creatingNew = !this.creatingNew
      this.page = 1
    },

    async toCreate (item) {
      this.loading = true
      this.createOne(item)
        .then(() => {
          this.$toasted.success('The item was created successfully')
          this.creatingNew = false
          this.loadData(true).then()
        })
        .catch(e => {
          console.error(e)
          this.$toasted.error('Couldn\'t create the item')
          this.loading = false
        })
    },

    async toEdit (item) {
      this.loading = true
      this.updateOne({
        id: this.editedItemId,
        data: {...item, id: this.editedItemId}
      })
        .then(() => {
          this.$toasted.success('The item was updated successfully')
          this.editedItemId = null
          this.loadData(true).then()
        })
        .catch(e => {
          console.error(e)
          this.$toasted.error('Couldn\'t update the item')
          this.loading = false
        })
    },

    onRemove (id) {
      this.$confirm('The item is going to be permanently removed. Continue?', 'Confirmation', {
        confirmButtonText: 'Remove',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(async () => {
        this.loading = true
        await this.deleteOne(id)
          .then(() => {
            this.$message({
              type: 'success',
              message: `The item with id ${id} was removed`
            })
          })
          .catch(e => {
            console.error(e)
            this.$message({
              type: 'error',
              message: e.response.data.message
            })
          })
        await this.loadData(true)
      }).catch(() => {})
    }
  }
})

export default tablePageMixin
