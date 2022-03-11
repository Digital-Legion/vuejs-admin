<template>
  <div class="g-editor-header">
    <PageHeader :title="title" double>
      <div class="g-editor-header__buttons">
        <Button href="/posts" native-link @click="onGoBack">Go back</Button>
        <Button @click="onSave" :blinking="needsSave" :disabled="!canSave">Save</Button>
      </div>
    </PageHeader>
  </div>
</template>

<script>
export default {
  name: "EditorHeader",

  components: {
    PageHeader: () => import('@/components/containers/PageHeader'),
    Button: () => import('@/components/elements/Button')
  },

  props: {
    title: {
      type: String,
      required: true
    },
    goBackPath: {
      type: String,
      required: true
    },
    needsSave: {
      type: Boolean,
      default: false
    },
    canSave: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    onGoBack () {
      this.$router.push(this.goBackPath)
    },

    onSave () {
      this.$emit('save')
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/elements/editor-header';
</style>
