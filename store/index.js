export const state = () => ({
  isDrawerVisible: false,
})

export const mutations = {
  SET_DRAWER(state, data) {
    state.isDrawerVisible = data
  },
}