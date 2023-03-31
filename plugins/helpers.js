export default (ctx, inject) => {
  inject('helpers', {
    constants: {
      style: {
        nudgeBottomMenu: '15px',
      },
    },
  })
}
