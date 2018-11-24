const getters = {
  myHotelList:state=>state.myhotels.myHotelList,
  myHotelTotalPage:state=>state.myhotels.myHotelTotalPage,
  myHotelTotalCount:state=>state.myhotels.myHotelTotalCount,
  myHotelSearch:state=>state.myhotels.myHotelSearch,
  myHotelPrice:state=>state.myHotelsPrice.actionType,
  newPickerListObjs:state=>state.myHotelsPrice.newPickerListObjs,
}
export default getters
