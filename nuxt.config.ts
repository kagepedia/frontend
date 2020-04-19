const { createClient } = require('./plugins/contentful')

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
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
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    'plugins/vuetify',
    'plugins/contentful',
    'plugins/prism',
    'plugins/day'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/markdownit'
    // '@nuxtjs/vuetify'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  /*
   ** Build configuration
   */
  build: {
    transpile: ['vuetify/lib'],
    /*
     ** You can extend webpack config here
     */
    extend(config: any, ctx: any) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue|ts)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    quiet: false
  },
  /*
   ** dev or deploy（github-pages）
   ** https://ja.nuxtjs.org/faq/github-pages/
   */
  router: {
    base: process.env.DEPLOY_ENV === 'GH_PAGES' ? '/frontend/' : ''
  },
  /*
   ** contentful
   **
   */
  generate: {
    // 404対応
    fallback: true,
    // Payload機能
    routes() {
      const client = createClient()
      return client
        .getEntries(process.env.CTF_BLOG_POST_TYPE_ID)
        .then((entries: any) => {
          return [
            ...entries.items.map((entry: any) => `/posts/${entry.fields.slug}`)
          ]
        })
    }
  },
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_BLOG_POST_TYPE_ID: process.env.CTF_BLOG_POST_TYPE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN
  },
  markdownit: {
    injected: true,
    breaks: true,
    html: true,
    linkify: true,
    typography: true,
    use: ['markdown-it-toc']
  }
}
