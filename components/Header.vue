<template>
  <div>
    <header>
      <nuxt-link to="/"><h1>KageBlog</h1></nuxt-link>
      <HeaderNav />
    </header>
  </div>
</template>
<script>
import HeaderNav from '@/components/HeaderNav.vue'
export default {
  components: {
    HeaderNav
  }
}
</script>
<style lang="scss" scoped>
header {
  color: #fff;
  padding: 20px;
  background-color: #527b8e;
  a {
    text-decoration: none;
    h1 {
      color: #fff;
    }
  }
}
</style>
