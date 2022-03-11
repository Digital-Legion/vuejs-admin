import defaultActions from "@/store/mixins/defaultActions";

export default {
  namespaced: true,

  actions: {
    ...defaultActions({
      getAllUrlPrefix: '/user',
      getOneUrlPrefix: '/user',
      updateOneUrlPrefix: '/user',
      createOneUrlPrefix: '/user',
      deleteOneUrlPrefix: '/user',
      uploadImageUrlPrefix: 'user'
    })
  }
}
