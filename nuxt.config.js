export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: "berlinrents.live - understand Berlin's housing market",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'berlinrents.live helps you to understand the most recent rent developments in Berlin. It takes live data from rental websites, analyses them and gives you the latest figures on the Berlin rental market.'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/berlinrents.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/fontawesome'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxt/content',
    '@nuxtjs/svg',
    'nuxt-rfg-icon'
  ],
  bootstrapVue: {
    // Add the desired icon components to the `components` array
    icons: true
  },
  fontawesome: {
    icons: {
      solid: [
        'faLeaf',
        'faSun',
        'faSink',
        'faKey',
        'faSearchDollar',
        'faArrowsAltH'
      ]
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  components: true,
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
