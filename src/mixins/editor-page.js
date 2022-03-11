import { deepEqualObjects } from '@/utils/deepEqualObjects'
import { mapActions } from 'vuex'

const editorPageMixin = ({
  vuexModule,
  editRoute,
  goBackRoute = '/',
  titleLabel,
  titleSlug = 'title',
  dontStopLoadingOnUpdate = false
}) => ({
  data () {
    return {
      loading: false,
      needsSave: false,
      initData: null,
    }
  },

  async created () {
    if (typeof this.preCreated === 'function') await this.preCreated()

    if (this.itemId) {
      await this.loadData()
    }

    if (typeof this.postCreated === 'function') this.postCreated()
  },

  watch: {
    data: {
      deep: true,
      handler () {
        this.needsSave = !deepEqualObjects(this.data, this.initData)
      }
    }
  },

  computed: {
    itemId () {
      return this.$route.params.id || null
    },

    title () {
      return this.data?.[titleSlug]
        ? `Editing ${titleLabel}: ${this.data?.[titleSlug]}`
        : (this.itemId ? `Editing a ${titleLabel}` : `Creating a ${titleLabel}`)
    }
  },

  methods: {
    ...mapActions({
      getOne: `${vuexModule}/getOne`,
      createOne: `${vuexModule}/createOne`,
      updateOne: `${vuexModule}/updateOne`
    }),

    async loadData (id) {
      this.loading = true
      await this.getOne(id || this.itemId)
        .then(res => {
          if (typeof this.parseData === 'function') {
            this.parseData(res)
          } else {
            Object.keys(this.data).forEach(key => {
              this.$set(this.data, key, res?.[key] instanceof Array
                ? res?.[key].map(k => k.id)
                : res?.[key]?.id || res?.[key] || this.data[key])
            })
          }

          this.initData = JSON.parse(JSON.stringify(this.data))
        })
        .catch(e => {
          console.log(e)
          this.$router.push(goBackRoute)
        })
      this.$nextTick(() => {
        this.loading = false
      })
    },

    async onSave () {
      if (typeof this.toSave === 'function')
        return this.toSave()

      const itemId = this.itemId

      this.loading = true
      if (this.itemId) {
        await this.updateOne({
          id: itemId,
          data: typeof this.parsedData === 'object' ? this.parsedData : this.data
        })
          .then(res => {
            this.$toasted.success('Successfully updated')
            this.needsSave = false
            if (typeof this.postUpdate === 'function') {
              this.postUpdate(res)
            }
          })
          .catch(e => {
            this.$toasted.error(e.response?.message || e)
            console.error(e)
          })
      } else {
        await this.createOne(typeof this.parsedData === 'object' ? this.parsedData : this.data)
          .then((res) => {
            this.$toasted.success('Successfully created')
            this.needsSave = false
            if (typeof this.postCreate === 'function') {
              this.postCreate(res)
            }
            // eslint-disable-next-line
            if (!!(res.id) && editRoute) {
              this.$router.push(`${editRoute}/${res.id}`)
            }
          })
          .catch(e => {
            this.$toasted.error(e.response?.message || e)
            console.error(e)
          })
      }
      this.$nextTick(() => {
        if (!itemId || (itemId && !dontStopLoadingOnUpdate))
          this.loading = false
      })
    }
  }
})

export default editorPageMixin
