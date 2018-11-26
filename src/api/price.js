import request from '@/util/request'

//批量添加价格
function batchCreatePrice(querys, query) {
  querys = Object.assign({}, querys, {
    "rateplanId": "2",
    "roomTypeId": "1",
    "supplier_name": "TBO"
  });
  console.log(querys);
  return request({
    url: `/ebk/room/hotels/8095de4b-49a5-448c-9d2a-07ba206a3e8e/rate_plans/2/rate_plan_prices/batch_create`,
    method: 'POST',
    data: querys
  })
}

//根据planId得到这个酒店的类型的每一天价格
function getPickerList(planId, supplierName) {
  return request({
    url: `/ebk/room/hotels/8095de4b-49a5-448c-9d2a-07ba206a3e8e/rate_plans/2/rate_plan_prices`,
    method: 'GET',
    params: supplierName
  })
}

export {batchCreatePrice, getPickerList}
