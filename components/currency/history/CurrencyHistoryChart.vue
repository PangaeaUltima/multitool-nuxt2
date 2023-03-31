<template lang="pug">
client-only
  highcharts.w-100(:options="chartOptions")
</template>

<script>
export default {
  name: 'CurrencyHistoryChart',
  props: {
    chartData: {
      type: Object,
      default: () => {},
    },
    pointStart: {
      type: Number,
      default: null,
    },
    selectedCurrencies: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    chartOptions() {
      return {
        title: {
          text: '',
        },
        chart: {
          backgroundColor: '#222222',
          type: 'line',
        },
        plotOptions: {
          series: {
            pointStart: this.pointStart,
            pointInterval: 60 * 60 * 24 * 1000,
          },
        },
        series: this.chartSeries,
        xAxis: [
          {
            currentDateIndicator: true,
            type: 'datetime',
          },
        ],
      }
    },
    chartSeries() {
      const obj = {}

      if (this.chartData) {
        this.selectedCurrencies.forEach((currency) => {
          obj[currency] = []
        })

        return this.selectedCurrencies.map((item) => {
          return {
            name: item,
            data: Object.keys(this.chartData).map((key) => {
              return this.chartData[key][item] ? this.chartData[key][item] : 0
            }),
          }
        })
      }

      return []
    },
  },
}
</script>

