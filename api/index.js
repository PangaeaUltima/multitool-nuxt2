export default ($axios) => ({
  convert: (params) => $axios.$get('https://api.exchangerate.host/convert', { params }),
  symbols: () => $axios.$get('https://api.exchangerate.host/symbols'),
})
