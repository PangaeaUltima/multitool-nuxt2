<template lang="pug">
.grid.w-100
  app-picker-date(v-model="filter.start_date" clearable)
    template(#label="") Select date from
  app-picker-date(
    v-model="filter.end_date"
    :hint="filter.start_date ? null : 'First, you must specify the start date'"
    :disabled="!filter.start_date"
    clearable
  )
    template(#label="") Select date to
  autocomplete-currency(
    v-model="filter.base"
    :currencies="currencies"
    label="Select base currency"
    clearable
  )
  autocomplete-currency(
    v-model="filter.currencies"
    :currencies="currencies"
    multiple
    clearable
  )
</template>

<script>
import AppPickerDate from '~/components/app/AppPickerDate'
import AutocompleteCurrency from '~/components/currency/fields/AutocompleteCurrency'

export default {
  name: 'CurrencyHistoryFilters',
  components: {
    AppPickerDate,
    AutocompleteCurrency,
  },
  props: {
    currencies: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    filter: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  watch: {
    'filter.start_date'(val) {
      if (!val) this.filter = { ...this.filter, end_date: null }
    },
  },
}
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0 40px;

  @include media-breakpoint('md-and-down') {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
  }

  @include media-breakpoint('xs-only') {
    grid-template-columns: 1fr;
    grid-gap: 20px 0;
  }
}
</style>