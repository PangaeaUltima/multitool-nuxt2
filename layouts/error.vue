<template lang="pug">
v-container.fill-height.justify-center
  .d-flex.flex-column.align-center.justify-center
    h1.error-code.primary--text {{ error.statusCode }}
    p.error-text.mb-5 {{ error.message }}
    v-btn.text-md-btn-d.text-btn(
      color="primary"
      text
      @click="$router.push({ name: 'index' })"
    ) Home
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 90px;
}
.error-text {
  font-size: 22px;
}
</style>
