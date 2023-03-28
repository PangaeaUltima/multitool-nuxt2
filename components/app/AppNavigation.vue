<template lang="pug">
div
  v-app-bar-nav-icon.ml-auto(color="white" @click.stop="$store.commit('SET_DRAWER', true)")
  v-navigation-drawer(
    v-model="drawer"
    absolute
    bottom
    temporary
  )
    .px-6.py-4.w-100
      nuxt-link.header-main-link(:to="{ name: 'index' }") Multitool
      v-list(nav dense)
        v-list-item-group(v-model="group")
          v-list-item.white--text(
            v-for="(link, index) in navigationLinks"
            :key="index"
            :to="{ name: link.routeName }"
          )
            v-list-item-title {{ link.title }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AppNavigation',
  data() {
    return {
      group: null,
      navigationLinks: [
        {
          title: 'Currency Converter',
          routeName: 'currency-converter',
        },
      ],
    }
  },
  computed: {
    ...mapState(['isDrawerVisible']),
    drawer: {
      get() {
        return this.isDrawerVisible
      },
      set(value) {
        this.$store.commit('SET_DRAWER', value)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.v-navigation-drawer {
  background: #000;
}
.header-main-link {
  font-size: 24px;
}
</style>