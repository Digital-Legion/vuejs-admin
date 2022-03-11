<template>
  <div class="g-page">
    <loading
      :active.sync="loading"
      :can-cancel="false"
      :is-full-page="true"
    />

    <EditorHeader :title="title" go-back-path="/users" :needs-save="needsSave" @save="onSave" :can-save="!loading" />
    <PageBox class="mb-10" double>
      <div class="g-editor__left">
        <Input v-model="data.name" placeholder="Name" class="mb-6" />
        <Input v-model="data.email" placeholder="Email" class="mb-6" type="email" />
        <Input
          v-model="data.password"
          placeholder="Password"
          type="password"
          :show-password="showPassword"
          @toggle-password="showPassword = !showPassword"
        />
      </div>
      <div class="g-editor__right">
        <drop-image
          label="Image"
          class="mb-6"
          :img-src="data.avatar.url"
          @set-image-src="data.avatar.url = $event"
          @set-image="data.imageFile = $event; data.avatar.url = ''"
          @restore="onRestoreImage"
          :restore-available="canRestoreImage"
        />
        <Input v-model="data.avatar.alt" placeholder="Image alt" class="mb-6" />
        <Select
          v-model="data.role"
          :options="rolesSelect"
          label="Role"
        />
      </div>
    </PageBox>
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
      vuexModule: 'user',
      titleLabel: 'user',
      editRoute: '/users/edit',
      goBackRoute: '/users',
      titleSlug: 'name'
    })
  ],

  components: {
    PageBox: () => import('@/components/containers/PageBox'),
    EditorHeader: () => import('@/components/containers/EditorHeader'),
    DropImage: () => import('@/components/elements/DropImage'),
    Select: () => import('@/components/elements/Select'),
    Input: () => import('@/components/elements/Input')
  },

  data () {
    return {
      showPassword: false,
      data: {
        password: '',
        name: '',
        email: '',
        imageFile: '',
        avatar: {
          alt: '',
          url: ''
        },
        role: this.$store.state.role.roles[1],
      }
    }
  },

  computed: {
    canRestoreImage () {
      return !!this.initData?.avatar
    }
  },

  methods: {
    ...mapActions({
      uploadImage: 'user/uploadImage',
      updateUser: 'user/updateOne',
      createUser: 'user/createOne'
    }),

    onRestoreImage () {
      this.data.avatar.alt = this.initData?.avatar?.alt || ''
      this.data.avatar.url = this.initData?.avatar?.url || ''
    },

    async toSave () {
      this.loading = true

      let imageUrl = this.data.avatar?.url || ''

      if (this.initData?.avatar?.alt !== this.data.avatar?.alt) {
        if (this.initData?.avatar?.url !== this.data.avatar?.url) {
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
        await this.createUser({
          name: this.data.name,
          email: this.data.email,
          password: this.data.password,
          role: this.data.role,
          avatar: {
            alt: this.data.avatar.alt,
            url: imageUrl
          }
        })
          .then(res => {
            this.$toasted.success('The user was created')
            // eslint-disable-next-line
            if (!!res.id) {
              this.$router.push(`/users/edit/${res.id}`)
            }
          })
          .catch(() => {
            this.$toasted.error('Couldn\'t create the user')
          })
      } else {
        const requestData = {
          name: this.data.name,
          role: this.data.role,
          avatar: {
            alt: this.data.avatar.alt,
            url: imageUrl
          }
        }

        if (this.initData?.email !== this.data.email)
          requestData.email = this.data.email
        if (this.initData?.password !== this.data.password)
          requestData.password = this.data.password

        await this.updateUser({
          id: this.itemId,
          data: requestData
        })
          .then(() => {
            this.$toasted.success('The user was updated')
            this.loadData()
          })
          .catch(() => {
            this.$toasted.error('Couldn\'t update the user')
          })
      }

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
