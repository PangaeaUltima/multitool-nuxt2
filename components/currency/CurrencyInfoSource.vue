<template lang="pug">
.d-flex.align-center.currency-info-source.text-md-caption-d.text-caption
  span.mr-1 The exchange rate is obtained by
  a(href="https://exchangerate.host/" target="_blank") Exchangerate.host API
</template>

<script>
export default {
  name: 'CurrencyInfoSource',
}
</script>

<style lang="scss" scoped>
.currency-info-source {
  position: absolute;
  right: 20px;
  bottom: 20px;

  @include media-breakpoint('sm-and-down') {
    right: 12px;
    bottom: 12px;
  }
}
</style>