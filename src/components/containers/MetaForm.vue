<template>
  <div class="meta-form">
    <Tabs @input="setActiveLanguage" :value="activeLanguage" :options="tabLanguages"/>
    <flip-card :flipped="showPreviews">
      <template v-slot:front>
        <page-box :double="true">
          <template v-slot:outer-content>
            <page-header class="w-100" title="Metadata" double>
              <Button :blinking="needsSave" @click="toggleShowPreviews">
                <font-awesome-icon icon="eye"/>
              </Button>
            </page-header>

            <div class="w-100">
              <Input
                class="mb-6"
                :value="data.meta_title"
                @input="$emit('set-field', { field: 'meta_title', value: $event })"
                label="Meta title"
                placeholder="Enter meta title"
                v-if="activeLanguage === 'ru'"
              />
              <Input
                class="mb-6"
                :value="data.meta_title__en"
                @input="$emit('set-field', { field: 'meta_title__en', value: $event })"
                label="Meta title"
                placeholder="Enter meta title"
                v-if="activeLanguage === 'en'"
              />
              <Input
                class="mb-6"
                :value="data.meta_description"
                @input="$emit('set-field', { field: 'meta_description', value: $event })"
                :is-textarea="true"
                label="Meta description"
                placeholder="Enter meta description"
                v-if="activeLanguage === 'ru'"
              />
              <Input
                class="mb-6"
                :value="data.meta_description__en"
                @input="$emit('set-field', { field: 'meta_description__en', value: $event })"
                :is-textarea="true"
                label="Meta description"
                placeholder="Enter meta description"
                v-if="activeLanguage === 'en'"
              />
              <Input
                class="mb-6"
                :value="data.meta_keywords"
                label="Meta keywords"
                placeholder="Enter meta keywords (separate them by comma)"
                v-if="activeLanguage === 'ru'"
              />
              <Input
                class="mb-6"
                :value="data.meta_keywords__en"
                label="Meta keywords"
                placeholder="Enter meta keywords (separate them by comma)"
                v-if="activeLanguage === 'en'"
              />
            </div>
          </template>

          <div class="g-editor__left">
            <Input
              class="mb-6"
              :value="data.facebook_title"
              label="Facebook title"
              placeholder="Enter facebook title"
              v-if="activeLanguage === 'ru'"
            />
            <Input
              class="mb-6"
              :value="data.facebook_title__en"
              label="Facebook title"
              placeholder="Enter facebook title"
              v-if="activeLanguage === 'en'"
            />
            <Input
              :value="data.facebook_description"
              :is-textarea="true"
              label="Facebook description"
              placeholder="Enter facebook description"
              v-if="activeLanguage === 'ru'"
            />
            <Input
              :value="data.facebook_description__en"
              :is-textarea="true"
              label="Facebook description"
              placeholder="Enter facebook description"
              v-if="activeLanguage === 'en'"
            />
          </div>
          <div class="g-editor__right">
            <Input
              class="mb-6"
              :value="data.twitter_title"
              label="Twitter title"
              placeholder="Enter twitter title"
              v-if="activeLanguage === 'ru'"
            />
            <Input
              class="mb-6"
              :value="data.twitter_title__en"
              label="Twitter title"
              placeholder="Enter twitter title"
              v-if="activeLanguage === 'en'"
            />
            <Input
              :value="data.twitter_description"
              :is-textarea="true"
              label="Twitter description"
              placeholder="Enter twitter description"
              v-if="activeLanguage === 'ru'"
            />
            <Input
              :value="data.twitter_description__en"
              :is-textarea="true"
              label="Twitter description"
              placeholder="Enter twitter description"
              v-if="activeLanguage === 'en'"
            />
          </div>

          <template v-slot:bottom-content>
            <div class="flex mt-6 g-editor__drop-image-wrapper">
              <drop-image
                label="Meta image (all languages)"
                class="g-editor__drop-image g-editor__drop-image--md-triple"
                :img-src="data.metaImageUrl"
              />
              <drop-image
                label="Facebook image (all languages)"
                class="g-editor__drop-image g-editor__drop-image--md-triple"
                :img-src="data.facebookImageUrl"
              />
              <drop-image
                label="Twitter image (all languages)"
                class="g-editor__drop-image g-editor__drop-image--md-triple"
                :img-src="data.twitterImageUrl"
              />
            </div>
          </template>
        </page-box>
      </template>
      <template v-slot:back>
        <page-box class="flip-card-back-content">
          <template v-slot:outer-content>
            <page-header class="w-100" title="Metadata" double>
              <button class="g-button g-button--icon" :class="{ 'g-button--blinking': needsSave }"
                      @click="toggleShowPreviews">
                <font-awesome-icon icon="eye-slash"/>
              </button>
            </page-header>
          </template>

          <div class="flip-card-back-inner">
            <google-meta
              class="mb-6 w-full"
              :title="titleMeta"
              :url="url"
              :description="descriptionMeta"
            />
            <div class="flex">
              <facebook-meta
                class="mr-4"
                :title="titleFacebook"
                :url="url"
                :image="data.facebookImageUrl ? data.facebookImageUrl : defaultImage"
                :description="descriptionFacebook"
              />
              <twitter-meta
                class="ml-4"
                :title="titleTwitter"
                :url="url"
                :image="data.twitterImageUrl ? data.twitterImageUrl : defaultImage"
                :description="descriptionTwitter"
              />
            </div>
          </div>
        </page-box>
      </template>
    </flip-card>
  </div>
</template>

<script>
import Languages from '@/mixins/languages'

export default {
  name: 'MetaForm',

  mixins: [Languages],

  components: {
    Tabs: () => import('@/components/elements/Tabs'),
    PageBox: () => import('@/components/containers/PageBox'),
    PageHeader: () => import('@/components/containers/PageHeader'),
    Input: () => import('@/components/elements/Input'),
    Button: () => import('@/components/elements/Button'),
    DropImage: () => import('@/components/elements/DropImage'),
    FlipCard: () => import('@/components/elements/FlipCard'),
    GoogleMeta: () => import('@/components/elements/GoogleMeta'),
    FacebookMeta: () => import('@/components/elements/FacebookMeta'),
    TwitterMeta: () => import('@/components/elements/TwitterMeta')
  },

  props: {
    data: {
      type: Object,
      required: true
    },
    needsSave: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      showPreviews: false,
      justSetInitialData: false,
      initialDataSet: false,
      defaultImage:
        'https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png'
    }
  },

  computed: {
    titleMeta() {
      return this.activeLanguage === 'ru'
        ? (this.data.meta_title ? this.data.meta_title : 'Google Meta — Tviser Agency')
        : (this.data.meta_title__en ? this.data.meta_title__en || this.data.meta_title : 'Google Meta — Tviser Agency')
    },

    descriptionMeta() {
      return this.activeLanguage === 'ru'
        ? (this.data.meta_description ? this.data.meta_description : 'This is how it\'s going to look like')
        : (this.data.meta_description__en ? this.data.meta_description__en || this.data.meta_description : 'This is how it\'s going to look like')
    },

    titleFacebook() {
      return this.activeLanguage === 'ru'
        ? (this.data.facebookTitle ? this.data.facebookTitle : 'Facebook Meta — Tviser Agency')
        : 'Facebook Meta — Tviser Agency'
    },

    descriptionFacebook() {
      return this.activeLanguage === 'ru'
        ? (this.data.facebookDescription ? this.data.facebookDescription : 'This is how it\'s going to look like')
        : 'This is how it\'s going to look like'
    },

    titleTwitter() {
      return this.activeLanguage === 'ru'
        ? (this.data.twitterTitle ? this.data.twitterTitle : 'Twitter Meta — Tviser Agency')
        : 'Twitter Meta — Tviser Agency'
    },

    descriptionTwitter() {
      return this.activeLanguage === 'ru'
        ? (this.data.twitterDescription ? this.data.twitterDescription : 'This is how it\'s going to look like')
        : 'This is how it\'s going to look like'
    }
  },

  methods: {
    toggleShowPreviews() {
      this.showPreviews = !this.showPreviews
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/containers/meta-form';
</style>
