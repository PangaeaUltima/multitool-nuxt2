<template lang="pug">
v-autocomplete(
  v-model="inputValue"
  :dense="$vuetify.breakpoint.mobile"
  :filter="currenciesFilter"
  :items="sortedCurrencies"
  :multiple="multiple"
  :label="label"
  item-text="code"
  item-value="code"
  hide-details="auto"
  outlined
  :search-input.sync="search"
  :clearable="clearable"
  @change="search = null"
)
  template(#item="{ item }")
    span {{ `${item.code} (${item.name})`}}
  template(#selection="{ item, index }")
    span.selected-name.text-truncate.mr-1(v-if="index < 1") {{ `${item.code} (${item.name})`}}
    span.text-caption-inp-d(v-if="index === 1") (+{{ inputValue?.length - 1 }})
</template>

<script>
export default {
  name: 'AutocompleteCurrency',
  props: {
    clearable: {
      type: Boolean,
      default: false,
    },
    currencies: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: 'Select currency',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [Array, String],
      default: null,
    },
  },
  data() {
    return {
      search: null,
    }
  },
  computed: {
    inputValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    sortedCurrencies() {
      const arr = [...this.currencies]

      if (this.inputValue) {
        return arr.sort(
          (a, b) => this.inputValue.includes(b.code) - this.inputValue.includes(a.code)
        )
      }

      return arr
    },
  },
  methods: {
    currenciesFilter(item, queryText, itemText) {
      return `${item.code.toLowerCase()} ${item.name.toLowerCase()}`.includes(
        queryText.toLowerCase()
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.v-autocomplete {
  min-width: 0;
}
.selected-name {
  display: inline-block;
  max-width: 50%;
  height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.v-autocomplete.v-select.v-input--is-focused input {
  min-width: 0;
}
</style>