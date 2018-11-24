const breadcrumb = {
    state:{
        addHotels:[
          {
              href:'/myhotels',
              title:'My hotels'
          },
        ],
    },
    mutations:{
        GO_ADD:(state,data)=>{
            state.addHotels = [state.addHotels[0]];
            if(Array.isArray(data)){
                state.addHotels = [...state.addHotels,...data];
            }else{
                state.addHotels.push(data);
            }
        },
        GO_DELETE:(state,data)=>{
            state.addHotels = [state.addHotels[0]];
        }
    }
}

export default breadcrumb;