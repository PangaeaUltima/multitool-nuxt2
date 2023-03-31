<template lang="pug">
.d-flex.flex-column.align-center.jusitify-center.mx-auto
  h1.mb-3 Currency Converter
  currency-exchange-rate(:currencies="currencies")
  currency-info-source
</template>

<script>
import CurrencyExchangeRate from '~/components/currency/CurrencyExchangeRate'
import CurrencyInfoSource from '~/components/currency/CurrencyInfoSource'

export default {
  name: 'IndexPage',
  components: {
    CurrencyExchangeRate,
    CurrencyInfoSource,
  },
  async asyncData({ $api }) {
    try {
      const { symbols } = await $api.currencies.symbols()

      const currencies = Object.keys(symbols).map((key) => {
        return { name: symbols[key].description, code: symbols[key].code }
      })

      return { currencies }
    } catch (e) {
      console.log(e)
    }
  },
}
</script>
