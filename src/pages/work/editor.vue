<template>
  <div class="g-page">
    <loading
      :active.sync="loading"
      :can-cancel="false"
      :is-full-page="true"
    />

    <EditorHeader :title="title" go-back-path="/works" :needs-save="needsSave" @save="onSave" :can-save="!loading"/>
    <PageBox class="mb-10" double>
      <div class="g-editor__left">
        <drop-image
          label="Image"
          class="mb-6"
          :img-src="data.url"
          @set-image-src="data.url = $event"
          @set-image="data.imageFile = $event; data.url = ''"
          @restore="onRestoreImage"
          :restore-available="canRestoreImage"
        />
        <Input v-model="data.alt" placeholder="Image alt" class="mb-6"/>
      </div>
    </PageBox>
  </div>
</template>

<script>
import EditorPage from "@/mixins/editor-page.js";
import {mapActions} from "vuex";

export default {
  name: "WorksEditorPage",

  mixins: [
    EditorPage({
      vuexModule: 'work',
      titleLabel: 'work',
      editRoute: '/works/edit',
      goBackRoute: '/works',
      titleSlug: 'name'
    })
  ],

  computed: {
    canRestoreImage() {
      return !!this.initData?.avatar
    }
  },
  components: {
    PageBox: () => import('@/components/containers/PageBox'),
    EditorHeader: () => import('@/components/containers/EditorHeader'),
    DropImage: () => import('@/components/elements/DropImage'),
    Input: () => import('@/components/elements/Input')
  },

  data() {
    return {
      data: {
        alt: '',
        url: ''
      }
    }
  },

  methods: {
    ...mapActions({
      uploadImage: 'work/uploadImage',
      updateWork: 'work/updateOne',
      createWork: 'work/createOne'
    }),

    onRestoreImage() {
      this.data.alt = this.initData?.alt || ''
      this.data.url = this.initData?.url || ''
    },

    async toSave() {
      this.loading = true

      let imageUrl = this.data.url || ''

      if (this.initData?.alt !== this.data.alt) {
        if (this.initData?.url !== this.data.url) {
          await this.uploadImage({
            alt: this.data.alt,
            image: this.data.imageFile
          }).then(res => {
            imageUrl = res.data?.url
          }).catch(() => {
            this.$toasted.error('Couldn\'t upload image')
          })
        }
      }

      if (!this.itemId) {
        await this.createWork({
          alt: this.data.alt,
          url: imageUrl
        })
          .then(res => {
            this.$toasted.success('The work was created')
            // eslint-disable-next-line
            if (!!res.id) {
              this.$router.push(`/works/edit/${res.id}`)
            }
          })
          .catch(() => {
            this.$toasted.error('Couldn\'t create the work')
          })
      } else {
        const requestData = {
          alt: this.data.alt,
          url: imageUrl
        }


        await this.updateWork({
          id: this.itemId,
          data: requestData
        })
          .then(() => {
            this.$toasted.success('The work was updated')
            this.loadData()
          })
          .catch(() => {
            this.$toasted.error('Couldn\'t update the work')
          })
      }

      this.$nextTick(() => {
        this.loading = true
      })
    }
  }
}
</script>

<style>

</style>
