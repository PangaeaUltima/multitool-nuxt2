<template lang="pug">
v-app
  transition(name="fade" mode="out-in")
    app-cursor-follower(v-if="isGameActive")
  .fill-height.wrapper.relative.d-flex.flex-column
    slot
  client-only
    notifications.text-bold-d(:duration="3000" position="bottom right")
</template>

<script>
import { mapState } from 'vuex'
import AppCursorFollower from '~/components/app/AppCursorFollower'

export default {
  name: 'AppLayout',
  components: {
    AppCursorFollower,
  },
  computed: {
    ...mapState(['isGameActive']),
  },
}
</script>

<style lang="scss" scoped>
.v-application {
  background: $primary-background;
  color: $primary-font;

  .wrapper {
    z-index: 2;
  }
}
</style>