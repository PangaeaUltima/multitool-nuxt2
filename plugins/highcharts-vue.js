import Vue from 'vue'
import Highcharts from 'highcharts'
import Stock from 'highcharts/modules/stock'
import HighchartsVue from 'highcharts-vue'
import HighchartsMapModule from 'highcharts/modules/map'
// import mapData from '@highcharts/map-collection/custom/world.geo.json'
import darkUnica from 'highcharts/themes/dark-unica'

Highcharts.wrap(Highcharts.Series.prototype, 'drawLegendSymbol', function (proceed, legend) {
  proceed.call(this, legend)

  this.legendLine.attr({
    d: ['M 4 15 A 4 4 0 1 1 4.004 15 Z'],
    fill: this.color,
    stroke: this.color,
  })
})

Stock(Highcharts)
HighchartsMapModule(Highcharts)
darkUnica(Highcharts)

Vue.use(HighchartsVue)
// Highcharts.maps.myMapName = mapData
