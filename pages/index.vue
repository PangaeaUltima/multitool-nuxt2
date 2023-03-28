<template lang="pug">
div
  h1.mb-4 Welcome to my small project! Glad to see you here.
  p You can choose something interesting in the menu list...
  v-btn(
    color="primary"
    outlined
    @click="$store.commit('SET_DRAWER', true)"
  ) Click here to toggle menu
</template>

<script>
export default {
  name: 'PageIndex',
}
</script>