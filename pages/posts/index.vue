<template>
  <v-container fluid>
    <template v-if="currentPost">
      {{ currentPost.fields.title }}
      <v-img
        :src="currentPost.fields.image.fields.file.url"
        :alt="currentPost.fields.image.fields.title"
        :aspect-ratio="16 / 9"
        width="700"
        height="400"
        class="mx-auto"
      />
      <div v-html="toHtmlString(currentPost.fields.body)"></div>
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
</script>
