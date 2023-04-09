export const state = () => ({
  isDrawerVisible: false,
  isGameActive: false,
})

export const mutations = {
  SET_DRAWER(state, data) {
    state.isDrawerVisible = data
  },
  SET_GAME(state, data) {
    state.isGameActive = data
  },
}
