<template lang="pug">
.d-flex.flex-column.align-center.justify-center.mx-auto.w-100
  h1.mb-11 Currency History Data
  currency-history-filters.mb-16(v-model="filter" :currencies="currencies")
  currency-history-chart.mb-4(
    :chart-data="history"
    :point-start="$dayjs(filter.start_date).valueOf()"
    :selected-currencies="filter.currencies"
  )
  currency-info-source
</template>

<script>
import debounce from 'lodash/debounce'
import AppLoading from '~/components/app/AppLoading'
import CurrencyHistoryFilters from '~/components/currency/history/filters/CurrencyHistoryFilters'
import CurrencyHistoryChart from '~/components/currency/history/CurrencyHistoryChart'
import CurrencyInfoSource from '~/components/currency/CurrencyInfoSource'

export default {
  name: 'PageCurrencyHistory',
  components: {
    AppLoading,
    CurrencyHistoryFilters,
    CurrencyHistoryChart,
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
  data() {
    return {
      filter: {
        start_date: this.$dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
        end_date: this.$dayjs().format('YYYY-MM-DD'),
        base: 'USD',
        currencies: ['UAH'],
      },
      history: null,
    }
  },
  computed: {
    filterData() {
      return {
        start_date: this.filter.start_date,
        end_date: this.filter.end_date,
        base: this.filter.base,
        symbols: this.filter.currencies.join(','),
      }
    },
  },
  watch: {
    filter: {
      handler(val) {
        if (val.start_date && val.end_date) this.loadHistory()
      },
      deep: true,
    },
  },
  mounted() {
    this.loadHistory()
  },
  methods: {
    loadHistory: debounce(async function () {
      try {
        const { rates } = await this.$api.currencies.timeseries(this.filterData)
        this.history = rates
      } catch (e) {
        this.$noty.responseError(e)
      }
    }, 400),
  },
}
</script>
