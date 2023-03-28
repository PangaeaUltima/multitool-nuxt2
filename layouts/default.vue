<template lang="pug">
app-layout
  app-header
  v-container.fill-height
    nuxt
</template>

<script>
import AppHeader from '~/components/app/AppHeader'
import AppLayout from '~/components/app/AppLayout'

export default {
  name: 'DefaultLayout',
  components: {
    AppHeader,
    AppLayout,
  }
}
</script>
