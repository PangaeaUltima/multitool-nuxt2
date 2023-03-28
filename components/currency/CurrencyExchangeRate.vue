<template lang="pug">
v-card.pa-4
  v-form(ref="form" lazy-validation)
    v-row.my-n1
      v-col.py-1(cols="6")
        v-autocomplete.mb-3(
          v-model="form.currency_from"
          :filter="currenciesFilter"
          :items="currencies"
          label="Выберите валюту"
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
          label="Выберите валюту"
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
          :rules="[rules.minZero]"
          hide-details="auto"
          label="Укажите сумму"
          type="number"
          hide-spin-buttons
          outlined
          clearable
        )
      v-col.py-1(cols="6")
        v-text-field(
          v-model="form.amount_to"
          hide-details="auto"
          label="Укажите сумму"
          type="number"
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
        amount_from: 0,
        currency_to: null,
        amount_to: 0,
      },
      rate: null,
      loading: false,
      rules: {
        minZero: (v) => (v && v >= 0) || 'Минимальное значение 0',
      },
    }
  },
  computed: {
    dataToSend() {
      return {
        from: this.form.currency_from,
        to: this.form.currency_to,
        amount: this.form.amount_from,
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