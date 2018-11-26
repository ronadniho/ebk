const breadcrumb = {
  state: {
    model: 'myHotel',//模式
    location: [
      {
        title: 'My hotels',
        path: 'myHotel'
      }
    ],
  },
  mutations: {
    updateLocation(state, data) {
      state.location = [state.location[0],data];
    }
  }
}

export default breadcrumb;
