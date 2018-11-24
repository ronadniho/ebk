// import { getMyHotelList } from '../../api/myHotels/hotels'
// import {myHotelsMessage} from '../../utils/myHotelsMessage'
const myhotels = {
    state:{
        myHotelList:[],
        myHotelTotalPage:1,
        myHotelTotalCount:0,
        myHotelSearch:{
            cityName:'',
            hotelName:''
        },
    },
    mutations:{
        GET_MY_HOTEL_LIST:(state,date)=>{
            state.myHotelList = date;
            // state.myHotelTotalPage = datas.totalPage;
            // state.myHotelTotalCount = datas.totalCount;
        },
        GET_MY_HOTEL_TOTAL_PAGE:(state,date)=>{
            state.myHotelTotalPage = date;
        },
        GET_MY_HOTEL_TOTAL_COUNT:(state,date)=>{
            state.myHotelTotalCount = date;
        },
        ADD_MY_HOTEL_SEARCH:(state,{cityName,hotelName})=>{
            state.myHotelSearch.cityName = cityName;
            state.myHotelSearch.hotelName = hotelName;
        },
        CLEAR_MY_HOTEL_LIST:(state,query)=>{
            state.myHotelList = query;
        },
    },
    actions:{
        GetMyHotelList({commit},query){
            return new Promise((resolve,reject)=>{
                getMyHotelList(query).then(res=>{
                    let callee = ({hotelList,totalPage,totalCount})=>{
                        commit('GET_MY_HOTEL_LIST', hotelList);
                        commit('GET_MY_HOTEL_TOTAL_PAGE', totalPage);
                        commit('GET_MY_HOTEL_TOTAL_COUNT', totalCount);
                    }

                    myHotelsMessage(res.status,res,callee);
                    // if(res.status === 200){
                    //     let data = res.data;
                    //     commit('GET_MY_HOTEL_LIST', data.hotelList);
                    //     commit('GET_MY_HOTEL_TOTAL_PAGE', data.totalPage);
                    //     commit('GET_MY_HOTEL_TOTAL_COUNT', data.totalCount);
                    // }else if(res.status === 422){
                    //     this.$message({
                    //         message: res.message,
                    //         type: 'error'
                    //     });
                    // }else if(res.status === 500) {
                    //     this.$message({
                    //         message: res.message||'系统内部错误',
                    //         type: 'error'
                    //     });
                    // }else{
                    //     this.$message({
                    //         message: res.message||'页面找不到',
                    //         type: 'error'
                    //     });
                    // }


                }).catch(err=>{
                    reject(err);
                })
            })
        },
        AddMyHotelSearch({commit},query){
            commit('ADD_MY_HOTEL_SEARCH',query);
        },
        ClearMyHotelList({commit},query){
            commit('CLEAR_MY_HOTEL_LIST',query);
        }
    }
}

export default myhotels
