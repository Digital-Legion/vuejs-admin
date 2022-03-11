import axios from "axios";

const defaultActions = (
  {
    getAllUrlPrefix = '',
    getOneUrlPrefix = '',
    updateOneUrlPrefix = '',
    createOneUrlPrefix = '',
    deleteOneUrlPrefix = '',
    uploadImageUrlPrefix = '',

    getOneAsQuery = false,

    updateUsePut = false,
    getAllUrlPostfix = '',
    updateOneFullUrl = '',
    deleteOneUrlPostfix = ''
  }
) => ({
  async getAll({rootState}, {page = 1, limit = 10}) {
    return new Promise(resolve => {
      axios.get(`${getAllUrlPrefix}?page=${page}&limit=${limit}${
        typeof getAllUrlPostfix === 'function' ? getAllUrlPostfix(rootState) : getAllUrlPostfix
      }`)
        .then(res => {
          console.log(res)
          resolve(res?.data || null)
        })
        .catch(e => {
          console.error(e)
          resolve(null)
        })
    })
  },

  async getOne(_, id) {
    return new Promise((resolve, reject) => {
      axios.get(!getOneAsQuery ? `${getOneUrlPrefix}/${id}` : `${getOneUrlPrefix}?id=${id}`)
        .then(res => {
          resolve(res?.data || null)
        })
        .catch(e => {
          console.error(e)
          reject(e)
        })
    })
  },

  async createOne(_, data) {
    return new Promise((resolve, reject) => {
      axios.post(`${createOneUrlPrefix}`, data)
        .then(res => {
          resolve(res?.data || null)
        })
        .catch(e => {
          console.error(e)
          reject(e)
        })
    })
  },

  async updateOne(_, {id, data}) {
    return new Promise((resolve, reject) => {
      axios[updateUsePut ? 'put' : 'patch'](updateOneFullUrl ? updateOneFullUrl : `${updateOneUrlPrefix}/${id}`, data)
        .then(res => {
          resolve(res?.data || null)
        })
        .catch(e => {
          console.error(e)
          reject(e)
        })
    })
  },

  async deleteOne(_, id) {
    return new Promise((resolve, reject) => {
      axios.delete(
          `${deleteOneUrlPrefix}${
            typeof deleteOneUrlPostfix === 'function'
              ? deleteOneUrlPostfix(id)
              : `/${id}${deleteOneUrlPostfix}`
          }`
      )
        .then(res => {
          resolve(res?.data || null)
        })
        .catch(e => {
          console.error(e)
          reject(e)
        })
    })
  },

  async uploadImage (_, { alt, folder = uploadImageUrlPrefix, image }) {
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append('file', image)

      axios.post(`/upload/${alt}/${folder}`, formData)
        .then(res => {
          resolve(res)
        })
        .catch(e => {
          console.error(e)
          reject(e)
        })
    })
  }
})

export default defaultActions
