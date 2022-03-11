<template>
  <div class="drop-image">
    <Label v-if="label">{{ label }}</Label>
    <div class="drop-image--no-image" v-if="!image">
      <button class="drop-image__upload" @click.stop="$refs.dropImage.click()">
        {{ placeholder }}
      </button>
      <button class="drop-image__action drop-image__action--restore" @click="restoreFile" v-if="restoreAvailable">
        <font-awesome-icon icon="trash-restore" />
      </button>
    </div>
    <div class="drop-image--dropped" v-else>
      <img :src="image" alt="dropped-image" class="drop-image__img">
      <button class="drop-image__action" @click="removeFile">
        <font-awesome-icon icon="trash" />
      </button>
    </div>
    <input type="file" v-show="false" accept="image/*" ref="dropImage" @change="onChange">
  </div>
</template>

<script>
export default {
  name: 'DropImage',

  components: {
    Label: () => import('@/components/elements/Label')
  },

  props: {
    label: {
      type: String,
      default: 'Image'
    },
    placeholder: {
      type: String,
      default: 'Upload'
    },
    imgSrc: {
      type: String
    },
    restoreAvailable: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      image: null
    }
  },

  watch: {
    imgSrc: {
      immediate: true,
      handler () {
        this.image = this.imgSrc
      }
    }
  },

  methods: {
    removeFile () {
      this.image = null
      this.$emit('set', { file: '', src: '' })
      this.$emit('set-image', '')
      this.$emit('set-image-src', '')
    },

    restoreFile () {
      this.$emit('restore')
    },

    onChange (e) {
      const file = e.target.files[0]
      if (file) {
        this.image = URL.createObjectURL(file)
        this.$emit('set', { file, src: this.image })
        this.$emit('set-image', file)
        this.$emit('set-image-src', this.image)
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/drop-image';
</style>
