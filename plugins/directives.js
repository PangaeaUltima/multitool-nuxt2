import Vue from 'vue'

Vue.directive('currency', {
  bind(el, binding, vnode) {
    el.addEventListener('input', function (event) {
      const inputValue = event.target.value.replace(/\s/g, '')
      if (isNaN(parseFloat(inputValue))) {
        vnode.componentInstance.$emit('input', 0)
      } else if (inputValue.startsWith('0')) {
        vnode.componentInstance.$emit('input', parseFloat(inputValue))
      } else {
        const formattedValue = parseFloat(inputValue).toLocaleString()
        vnode.componentInstance.internalValue = formattedValue
        // Устанавливаем позицию курсора
        const cursorPos = el.selectionStart + (formattedValue.length - inputValue.length)
        el.selectionStart = cursorPos
        el.selectionEnd = cursorPos
      }
    })
  },
})
