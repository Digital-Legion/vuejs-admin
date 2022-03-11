const restoreImageMixin = ({
  imagePropName = 'mainImageUrl'
}) => ({
  computed: {
    canRestoreImage () {
      return !!this.initData?.[imagePropName]
    }
  },

  methods: {
    onRestoreImage () {
      this.data[imagePropName] = this.initData?.[imagePropName] || null
    }
  }
})

export default restoreImageMixin
