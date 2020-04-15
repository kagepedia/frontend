<template>
  <v-container fluid>
    <template v-if="posts.length">
      <ul v-for="(post, i) in posts" :key="i">
        <li>{{ post.fields.title }}</li>
        <ul>
          <v-img
            :src="setEyeCatch(post).url"
            :alt="setEyeCatch(post).title"
            :aspect-ratio="16 / 9"
            max-width="400"
            max-height="225"
          />
          <div v-html="$md.render(post.fields.body)"></div>
          <li>{{ post.fields.publishDate }}</li>
          <li class="slug">{{ post.fields.slug }}</li>
        </ul>
        <div>
          <nuxt-link
            :to="{ name: 'posts-slug', params: { slug: post.fields.slug } }"
          >
            Read More
          </nuxt-link>
        </div>
      </ul>
    </template>
    <template v-else>
      投稿された記事はありません。
    </template>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { createClient } from '~/plugins/contentful'

export default {
  async asyncData({ env }) {
    const client = createClient()
    let posts = []
    await client
      .getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        order: '-fields.publishDate'
      })
      .then((res) => (posts = res.items))
      .catch(console.error)
    return { posts }
  },
  computed: {
    ...mapGetters(['setEyeCatch'])
  }
}
</script>
