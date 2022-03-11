import defaultActions from "@/store/mixins/defaultActions";

export default {
    namespaced: true,

    actions: {
        ...defaultActions({
            getAllUrlPrefix: '/post',
            getOneUrlPrefix: '/post',
            updateOneUrlPrefix: '/post',
            createOneUrlPrefix: '/post',
            deleteOneUrlPrefix: '/post',
            uploadImageUrlPrefix: 'post'
        }),

    }
}
