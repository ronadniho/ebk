const aside = {
  state: {
    defaultActive: '',
  },
  mutations: {
    updateAside(state, meta) {
      state.defaultActive = meta;
    }
  }
}
export default aside;
