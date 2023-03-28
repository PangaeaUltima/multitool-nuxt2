<template lang="pug">
v-app
  slot
  client-only
    notifications.text-bold-d(:duration="3000" position="bottom right")
</template>

<script>
export default {
  name: 'AppLayout'
}
</script>

<style lang="scss" scoped>
.v-application {
  background: $background;
  color: $primary-font;
}
</style>