<template lang="pug">
header.d-flex.align-center
  .w-100.d-flex.align-center(:class="$vuetify.breakpoint.mobile ? 'px-3 py-2' : 'px-6 py-4'")
    nuxt-link.header-main-link(:to="{ name: 'index' }") Multitool
    app-navigation.ml-auto
</template>

<script>
import AppNavigation from '~/components/app/AppNavigation'

export default {
  name: 'AppHeader',
  components: {
    AppNavigation,
  },
}
</script>

<style lang="scss" scoped>
.header-main-link {
  font-size: 24px;
}
</style>