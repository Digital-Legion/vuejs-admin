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
    page: {
      type: Number,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onRemove (identifier) {
      this.$emit('remove', identifier)
    }
  }
}
