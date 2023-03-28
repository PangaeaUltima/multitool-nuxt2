import createApi from '~/api'
export default ({ $axios }, inject) => {
  inject('api', createApi($axios))
}
