<template lang="pug">
.d-flex.flex-column.align-center.jusitify-center.mx-auto
  h1.mb-3 Currency Converter
  currency-exchange-rate
</template>

<script>
import CurrencyExchangeRate from '~/components/currency/CurrencyExchangeRate'

export default {
  name: 'IndexPage',
  components: {
    CurrencyExchangeRate,
  },
}
</script>
