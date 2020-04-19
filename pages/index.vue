<template>
  <v-container fluid>
    <template v-if="posts.length">
      <div>
        <ul v-for="(post, i) in posts" :key="i" class="list">
          <nuxt-link
            class="link"
            :to="{
              name: 'posts-slug',
              params: { slug: post.fields.slug }
            }"
          >
            <li>
              <dl>
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
                  <p
                    v-text="
                      $dayjs(post.fields.publishDate).format('YYYY/MM/DD') +
                        '投稿'
                    "
                  ></p>
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
.link {
  text-decoration: none;
  &:hover {
    text-decoration: none;
    p {
      color: red;
    }
  }
  p {
    color: black;
  }
}
ul {
  list-style: none;
  outline: solid 2px;
  margin-bottom: 30px;
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
