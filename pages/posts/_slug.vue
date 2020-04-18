<template>
  <v-container fluid>
    <template v-if="currentPost">
      {{ currentPost.fields.title }}
      <v-img
        :src="setEyeCatch(currentPost).url"
        :alt="setEyeCatch(currentPost).title"
        :aspect-ratio="16 / 9"
        width="700"
        height="400"
        class="mx-auto"
      />
      <div v-html="$md.render(currentPost.fields.body)"></div>
      <div>{{ currentPost.fields.publishDate }}</div>
    </template>

    <template v-else>
      お探しの記事は見つかりませんでした。
    </template>

    <div>
      <v-btn outlined color="primary" to="/">
        <v-icon size="16">
          fas fa-angle-double-left
        </v-icon>
        <span class="ml-1">ホームへ戻る</span>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { createClient } from '~/plugins/contentful'
import Prism from '~/plugins/prism'

export default {
  async asyncData({ env, params }) {
    const client = createClient()
    let currentPost = null
    await client
      .getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        'fields.slug': params.slug
      })
      .then((res) => (currentPost = res.items[0]))
      .catch(console.error)

    return { currentPost }
  },
  mounted() {
    Prism.highlightAll()
  },
  computed: {
    ...mapGetters(['setEyeCatch'])
  }
}
</script>
