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
          <li class="slug">{{ post.fields.slug }}</li>
        </ul>
      </ul>
      <div>
        <!--nuxt-link
          :to="{ name: 'posts-slug', params: { slug: post.fields.slug } }"
        >
          Read More
        </nuxt-link-->
      </div>
    </template>
    <template v-else>
      投稿された記事はありません。
    </template>
  </v-container>
</template>

<script>
</script>
