import {getPickerList, batchCreatePrice,} from '@/api'
// import {myHotelsMessage} from '../../utils/myHotelsMessage'
const myHotelsPrice = {
  state: {
    actionType: '',
    newPickerListObjs: {},
  },
  mutations: {
    UPDATE_ACTION_TYPE: (state, data) => {
      state.actionType = data;
    },
    GET_NEW_PICKER_LIST_OBJS: (state, data) => {
      state.newPickerListObjs = data;
    },
  },
  actions: {
    UpdateActionType({commit}, query) {
      commit('UPDATE_ACTION_TYPE', query)
    },
    GetNewPickerListObjs({commit}, {planId, supplierName}) {
      return new Promise((resolve, reject) => {
        getPickerList(planId, {supplierName}).then(res => {
          console.log(res);
          let data = res.data;
          if(data.list.length){
            let pickerList = data.list;
            let newPickerListObj = {};
            pickerList.map(val => {
              let _nowDate = new Date(val.date);
              let _year = _nowDate.getFullYear();
              let _month = _nowDate.getMonth() + 1;
              let _date = _nowDate.getDate();

              val._year = _year;
              val._month = _month;
              val._date = _date;
              val._sign = _year + '_' + _month;
            });
            for (let i = 0; i < pickerList.length; i++) {
              let keys = Object.keys(newPickerListObj);
              // console.log(keys)
              if (keys.length) {
                for (var j = 0; j < keys.length; j++) {
                  if (keys[j] == pickerList[i]._sign) {
                    newPickerListObj[keys[j]].push(pickerList[i]);
                    break;
                  }
                }
                if (j == keys.length) {
                  newPickerListObj[pickerList[i]._sign] = [pickerList[i]];
                }
              } else {
                newPickerListObj[pickerList[i]._sign] = [pickerList[i]];
              }

            }
            this.newPickerListObj = newPickerListObj;
            commit('GET_NEW_PICKER_LIST_OBJS', newPickerListObj);
          }
        }).catch(err => {
          reject(err);

        })
      });
    },
  }
}

export default myHotelsPrice
