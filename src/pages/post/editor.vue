<template>
  <div class="g-page">
    <loading
        :active.sync="loading"
        :can-cancel="false"
        :is-full-page="true"
    />

    <EditorHeader :title="title" go-back-path="/posts" :needs-save="needsSave" @save="onSave" :can-save="!loading" />
    <PageBox class="mb-10" double>
      <div class="g-editor__left">
        <Input v-model="data.title" placeholder="Title Ru" class="mb-6" />
        <Input v-model="data.title__en" placeholder="Title En" class="mb-6" />
        <Input v-model="data.subtitle" placeholder="Subtitle Ru" class="mb-6"/>
        <Input v-model="data.subtitle__en" placeholder="Subtitle En" class="mb-6" />
        <Input v-model="data.slug" placeholder="Slug Ru" class="mb-6" />
        <Input v-model="data.slug__en" placeholder="Slug En" class="mb-6" />
        <Input v-model="data.description" placeholder="Description Ru" class="mb-6" is-textarea :textarea-max-rows="4" />
        <Input v-model="data.description__en" placeholder="Description En" class="mb-6" is-textarea :textarea-max-rows="4"/>
        <Input v-model="data.text" placeholder="Text Ru" class="mb-6" is-textarea/>
        <Input v-model="data.text__en" placeholder="Text En" class="mb-6" is-textarea />
      </div>
      <div class="g-editor__right">
        <drop-image
          label="Image"
          class="mb-6"
          :img-src="data.image.url"
          @set-image-src="data.image.url = $event"
          @set-image="data.imageFile = $event; data.image.url = ''"
          @restore="onRestoreImage"
          :restore-available="canRestoreImage"
        />
        <Input v-model="data.image.alt" placeholder="Image alt" class="mb-6" />
      </div>
    </PageBox>

    <meta-form :data="metaData" @set-field="onSetMetaDataField" />
  </div>
</template>

<script>
import EditorPage from '@/mixins/editor-page'
import Roles from "@/mixins/roles";
import {mapActions} from "vuex";

export default {
  name: "UsersEditorPage",

  mixins: [
    Roles,
    EditorPage({
      vuexModule: 'post',
      titleLabel: 'post',
      editRoute: '/posts/edit',
      goBackRoute: '/posts',
      titleSlug: 'name'
    })
  ],

  components: {
    PageBox: () => import('@/components/containers/PageBox'),
    EditorHeader: () => import('@/components/containers/EditorHeader'),
    DropImage: () => import('@/components/elements/DropImage'),
    // Select: () => import('@/components/elements/Select'),
    Input: () => import('@/components/elements/Input'),
    MetaForm: () => import('@/components/containers/MetaForm'),
  },

  data () {
    return {
      data: {
        imageFile: '',
        googleImageFile: '',
        facebookImageFile: '',
        twitterImageFile: '',

        meta_title: "",
        meta_title__en: "",
        meta_description: "",
        meta_description__en: "",
        meta_keywords: "",
        meta_keywords__en: "",
        meta_image: {
          alt: "",
          url: ""
        },
        twitter_title: "",
        twitter_title__en: "",
        twitter_description: "",
        twitter_description__en: "",
        twitter_image: {
          alt: "",
          url: ""
        },
        facebook_title: "",
        facebook_title__en: "",
        facebook_description: "",
        facebook_description__en: "",
        facebook_image: {
          alt: "",
          url: ""
        },
        title: "",
        title__en: "",
        subtitle: "",
        subtitle__en: "",
        image: {
          alt: "",
          url: ""
        },
        slug: "",
        slug__en: "",
        description: "",
        description__en: "",
        text: "",
        text__en: "",
        headings: [],
        tags: []
      }
    }
  },

  computed: {
    canRestoreImage () {
      return !!this.initData?.image
    },

    metaData () {
     return {
       meta_title: this.data.meta_title,
       meta_title__en: this.data.meta_title__en,
       meta_description: this.data.meta_description,
       meta_description__en: this.data.meta_description__en
     }
    }
  },

  methods: {
    ...mapActions({
      uploadImage: 'post/uploadImage',
      updatePost: 'post/updateOne',
      createPost: 'post/createOne'
    }),

    onRestoreImage () {
      this.data.image.alt = this.initData?.image?.alt || ''
      this.data.image.url = this.initData?.image?.url || ''
    },

    onSetMetaDataField ({field, value}) {
      const splitField = field.split('.')
      console.log(splitField)
      if (splitField?.length === 1) {
        this.$set(this.data, splitField[0], value)
      } else if (splitField?.length === 2) {
        this.$set(this.data[splitField[0]], splitField[1], value)
      } else {
        console.warn(`WARN onSetMetaDataField: splitField length can be max 2. Provided length is ${splitField?.length || '???'} (${field})`)
      }
    },

    async toSave () {
      this.loading = true

      let imageUrl = this.data.image?.url || ''

      if (this.initData?.image?.alt !== this.data.image?.alt) {
        if (this.initData?.image?.url !== this.data.image?.url) {
          await this.uploadImage({
            alt: this.data.image.alt,
            image: this.data.imageFile
          }).then(res => {
            imageUrl = res.data?.url
          }).catch(() => {
            this.$toasted.error('Couldn\'t upload image')
          })
        }
      }

      await this[!this.itemId ? 'createPost' : 'updatePost']({
        title: this.data.title,
        title__en: this.data.title__en,
        subtitle: this.data.subtitle,
        subtitle__en: this.data.subtitle__en,
        slug: this.data.slug,
        slug__en: this.data.slug__en,
        description: this.data.description,
        description__en: this.data.description__en,
        text: this.data.text,
        text__en: this.data.text__en,
        headings: this.data.headings,
        tags: this.data.tags,
        image: {
          alt: this.data.image.alt,
          url: imageUrl
        }
      })
        .then(res => {
          this.$toasted.success('The user was saved')
          // eslint-disable-next-line
          if (!!res.id && !this.itemId) {
            this.$router.push(`/posts/edit/${res.id}`)
          } else {
            this.loadData()
          }
        })
        .catch(() => {
          this.$toasted.error('Couldn\'t save the post')
        })

      this.$nextTick(() => {
        this.loading = true
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/containers/editor';
</style>
