import Vue from 'vue'
import Notifications from 'vue-notification'

Vue.use(Notifications)

export default (app, inject) => {
  inject('noty', {
    error(text, title = '') {
      Vue.notify({
        title,
        text,
        type: 'error',
      })
    },
    success(text, title = '') {
      Vue.notify({
        title,
        text,
        type: 'success',
      })
    },
    responseError({ response, message }) {
      if (response) {
        const data = response.data
        if (data instanceof Blob) {
          data.text().then((e) => {
            this.error(JSON.parse(e).message)
          })
        } else if (response.status === 422 && Array.isArray(data)) {
          this.error(data[0].message)
        } else {
          this.error(data.message)
        }
      } else {
        this.error(message)
      }
    },
  })
}
