<template lang="pug">
.app-loading
  v-progress-circular(indeterminate color="primary")
</template>

<script>
export default {
  name: 'AppLoading',
}
</script>

<style lang="scss" scoped>
.app-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>