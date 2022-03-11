export default {
  props: {
    creatingNew: {
      type: Boolean,
      default: false
    },
    editedItemId: {
      type: Number,
      default: null
    }
  },

  data () {
    return {
      newItemData: null
    }
  },

  created () {
    this.$watch(vm => ([vm.creatingNew, vm.editedItemId]), this.onCreateOrEdit)
  },

  computed: {
    parsedData () {
      let data = this.data?.slice() || []
      if (this.newItemData) {
        if (this.creatingNew) {
          data.unshift(this.newItemData)
          // eslint-disable-next-line
        } else if (!!this.editedItemId) {
          const editedItemIndex = data.findIndex(i => i.id === this.editedItemId)
          if (editedItemIndex !== -1) {
            data[editedItemIndex] = this.newItemData
          }
        }
      }
      return data
    }
  },

  methods: {
    onChangeNewItemProp (propKey, propValue) {
      if (this.newItemData)
        this.$set(this.newItemData, propKey, propValue)
    },

    onCreateOrEdit () {
      if (this.creatingNew) {
        let newItemInstance = {
          creatingNew: true
        }
        if (this.parametersToEdit?.length) {
          this.parametersToEdit.forEach(p => {
            newItemInstance[p] = ''
          })
        } else {
          const dataItemInstance = this.data?.[0]
          Object.keys(dataItemInstance).forEach(k => {
            if (k !== 'id')
              newItemInstance[k] = ''
          })
        }
        this.newItemData = newItemInstance
        // eslint-disable-next-line
      } else if (!!this.editedItemId) {
        let newItemInstance = {
          editing: true
        }
        const itemToEdit = this.data.find(i => i.id === this.editedItemId)
        if (itemToEdit) {
          if (this.parametersToEdit?.length) {
            this.parametersToEdit.forEach(p => {
              newItemInstance[p] = itemToEdit[p] || ''
            })
          } else {
            Object.keys(itemToEdit).forEach(k => {
              if (k !== 'id')
                newItemInstance[k] = itemToEdit[k]
            })
          }
        }
        this.newItemData = newItemInstance
      } else {
        this.newItemData = null
      }
    }
  }
}
