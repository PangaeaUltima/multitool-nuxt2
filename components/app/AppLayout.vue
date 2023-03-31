<template lang="pug">
v-app(:style="`height: ${appHeight};`")
  slot
  client-only
    notifications.text-bold-d(:duration="3000" position="bottom right")
</template>

<script>
export default {
  name: 'AppLayout',
  data() {
    return {
      appHeight: '100vh',
    }
  },
  beforeMount() {
    this.setAppHeight()
  },
  methods: {
    setAppHeight() {
      this.appHeight = `${window.innerHeight}px`
    },
  },
}
</script>

<style lang="scss" scoped>
.v-application {
  background: $primary-background;
  color: $primary-font;
}
</style>