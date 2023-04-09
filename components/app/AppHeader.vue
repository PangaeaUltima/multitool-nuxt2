<template lang="pug">
header.d-flex.align-center
  .w-100.d-flex.align-center(:class="$vuetify.breakpoint.mobile ? 'px-3 py-2' : 'px-6 py-4'")
    nuxt-link.header-main-link(:to="{ name: 'index' }") Multitool
    v-btn.ml-auto.mr-4(:color="gameActive ? 'error' : 'primary'" icon @click="gameActive = !gameActive")
      v-icon mdi-nintendo-game-boy
    app-navigation
</template>

<script>
import { mapState } from 'vuex'
import AppNavigation from '~/components/app/AppNavigation'

export default {
  name: 'AppHeader',
  components: {
    AppNavigation,
  },
  computed: {
    ...mapState(['isGameActive']),
    gameActive: {
      get() {
        return this.isGameActive
      },
      set(value) {
        this.$store.commit('SET_GAME', value)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.header-main-link {
  font-size: 24px;
}
</style>