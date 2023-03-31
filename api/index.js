export default ($axios) => ({
  currencies: {
    convert: (params) => $axios.$get('https://api.exchangerate.host/convert', { params }),
    symbols: () => $axios.$get('https://api.exchangerate.host/symbols'),
    timeseries: (params) => $axios.$get('https://api.exchangerate.host/timeseries', { params }),
  },
})
