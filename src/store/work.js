import defaultActions from "@/store/mixins/defaultActions.js";

export default {
  namespaced: true,

  actions: {
    ...defaultActions({
      getAllUrlPrefix: '/work',
      getOneUrlPrefix: '/work',
      updateOneUrlPrefix: '/work',
      createOneUrlPrefix: '/work',
      deleteOneUrlPrefix: '/work',
      uploadImageUrlPrefix: 'work'
    })
  }
}
