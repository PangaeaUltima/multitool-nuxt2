<template lang="pug">
.pa-4.wrapper
  v-form(ref="form" lazy-validation)
    v-row.my-n1
      v-col.py-1(cols="6")
        v-autocomplete.mb-3(
          v-model="form.currency_from"
          :filter="currenciesFilter"
          :items="currencies"
          label="Select currency"
          item-text="code"
          item-value="code"
          hide-details="auto"
          outlined
        )
          template(#item="{ item }")
            span {{ `${item.code} (${item.name})`}}
          template(#selection="{ item }")
            span {{ `${item.code} (${item.name})`}}
      v-col.py-1(cols="6")
        v-autocomplete.mb-3(
          v-model="form.currency_to"
          :filter="currenciesFilter"
          :items="currencies"
          label="Select currency"
          item-text="code"
          item-value="code"
          hide-details="auto"
          outlined
        )
          template(#item="{ item }")
            span {{ `${item.code} (${item.name})`}}
          template(#selection="{ item }")
            span {{ `${item.code} (${item.name})`}}
      v-col.py-1(cols="6")
        v-text-field(
          v-model="form.amount_from"
          v-currency
          :rules="[rules.minZero]"
          hide-details="auto"
          label="Select amount"
          hide-spin-buttons
          outlined
        )
      v-col.py-1(cols="6")
        v-text-field(
          v-model="amountTo"
          hide-details="auto"
          label="Select amount"
          hide-spin-buttons
          outlined
          readonly
        )
  p.mt-4.mb-0(v-if="rate") Exchange Rate: 1 {{ form.currency_from }} to {{ `${rate} ${form.currency_to}` }}
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  name: 'CurrencyExchangeRate',
  data() {
    return {
      currencies: null,
      form: {
        currency_from: null,
        amount_from: '0',
        currency_to: null,
        amount_to: 0,
      },
      rate: null,
      loading: false,
      rules: {
        minZero: (v) => {
          const input = v ? v.toString().replace(/\s/g, '') : 0
          return (input && input >= 0) || 'Minimum value 0'
        },
      },
    }
  },
  computed: {
    amountTo() {
      const s = this.form.amount_to.toString()
      // eslint-disable-next-line no-unused-vars
      const [_, num, suffix] = s.match(/^(.*?)((?:[,.]\d+)?|)$/)
      return `${num.replace(/\B(?=(?:\d{3})*$)/g, ' ')}${
        suffix.length > 2 ? suffix.substr(0, 3) : suffix
      }`
    },
    dataToSend() {
      return {
        from: this.form.currency_from,
        to: this.form.currency_to,
        amount: Number(this.form.amount_from.replace(/\s/g, '')),
      }
    },
    fieldsCompleted() {
      return !!(this.form.currency_from && this.form.currency_to && this.form.amount_from)
    },
  },
  watch: {
    form: {
      handler() {
        if (this.fieldsCompleted) {
          this.rate = null
          this.convert()
        }
      },
      deep: true,
    },
    'form.amount_from'(val) {
      if (!val) this.form.amount_to = 0
    },
  },
  created() {
    this.loadCurrencies()
  },
  methods: {
    convert: debounce(async function () {
      if (this.$refs.form.validate()) {
        this.loading = true
        try {
          const { result, info } = await this.$api.convert(this.dataToSend)
          this.$set(this.form, 'amount_to', result.toFixed(2))
          this.rate = info.rate.toFixed(2)
        } catch (e) {
          this.$noty.responseError(e)
        } finally {
          this.loading = false
        }
      }
    }, 400),
    currenciesFilter(item, queryText, itemText) {
      return `${item.code.toLowerCase()} ${item.name.toLowerCase()}`.includes(
        queryText.toLowerCase()
      )
    },
    async loadCurrencies() {
      try {
        const { symbols } = await this.$api.symbols()
        this.currencies = Object.keys(symbols).map((key) => {
          return { name: symbols[key].description, code: symbols[key].code }
        })
      } catch (e) {
        this.$noty.responseError(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 900px;
  width: 100%;
}
</style>