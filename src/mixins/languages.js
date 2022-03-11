export default {
  data () {
    return {
      activeLanguage: 'en',
      tabLanguages: [
        {
          id: 'en',
          title: 'EN'
        },
        {
          id: 'ru',
          title: 'RU'
        }
      ]
    }
  },

  methods: {
    setActiveLanguage (language) {
      this.activeLanguage = language
    }
  }
}
