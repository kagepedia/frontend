<template>
  <v-container fluid>
    <template v-if="posts.length">
      <div id="box" class="clearfix">
        <ul v-for="(post, i) in posts" :key="i" class="clearfix">
          <nuxt-link
            class="link"
            :to="{
              name: 'posts-slug',
              params: { slug: post.fields.slug }
            }"
          >
            <li class="clearfix">
              <dl class="clearfix">
                <dt>
                  <v-img
                    :src="setEyeCatch(post).url"
                    :alt="setEyeCatch(post).title"
                    :aspect-ratio="16 / 9"
                    max-width="200"
                    max-height="120"
                  />
                </dt>
                <dd>
                  <p>{{ post.fields.title }}</p>
                  <p>{{ post.fields.publishDate }}</p>
                  <p class="nl2br">{{ post.fields.discription }}</p>
                </dd>
              </dl>
            </li>
          </nuxt-link>
        </ul>
      </div>
    </template>
    <template v-else>
      投稿された記事はありません。
    </template>
  </v-container>
</template>
<style lang="scss">
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}
.link {
  text-decoration: none;
}
.link:hover {
  text-decoration: none;
  p {
    color: red;
  }
}
p {
  color: black;
}
ul {
  list-style: none;
}
.nl2br {
  white-space: pre;
}
</style>

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
