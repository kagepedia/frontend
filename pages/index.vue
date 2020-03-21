<template>
  <v-container fluid>
    <template v-if="posts.length">
      <ul v-for="(post, i) in posts" :key="i">
        <li>{{ post.fields.title }}</li>
        <ul>
          <v-img
            :src="post.fields.image.fields.file.url"
            :alt="post.fields.image.fields.title"
            :aspect-ratio="16 / 9"
            max-width="400"
            max-height="225"
          />
          <li v-html="toHtmlString(post.fields.body)"></li>
          <li>{{ post.fields.publishDate }}</li>
        </ul>
      </ul>
    </template>
    <template v-else>
      投稿された記事はありません。
    </template>
  </v-container>
</template>

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import client from '~/plugins/contentful'

export default {
  async asyncData({ env }) {
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
  methods: {
    toHtmlString(obj) {
      return documentToHtmlString(obj)
    }
  }
}
</script>
