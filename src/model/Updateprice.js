
export default class Updateprice{
    constructor (
        _date,
        hotelId,
        planId,
        _ltStatus,

        _month,
        _sign,
        _year,
        currentPrice,
        date,
        id,
        planName,
        priceStatus,
        roomId,
        roomName,
        addDialog,
        updateDialog,
        batchDialog,
        active,
        _priceStatus,
        changePrice,
        priceInvalid,
        ){
            this._date = _date;
            this.hotelId = hotelId;
            this.planId = planId;
            this._ltStatus = _ltStatus;//判断1年之外的日期是否可以修改状态
            this._month = _month;
            this._sign = _sign;
            this._year = _year;
            this.currentPrice = currentPrice;
            this.date = date;
            this.id = id;
            this.planName = planName;
            this.priceStatus = priceStatus!==2?1:2;
            this.roomId = roomId;
            this.roomName = roomName;
            this.addDialog = addDialog;//单独添加状态
            this.updateDialog = updateDialog;//单独修改状态
            this.batchDialog = batchDialog;//批量修改状态
            this.active = active;
            this._priceStatus = _priceStatus;
            this.changePrice = changePrice;//当前价格
            this.priceInvalid = priceInvalid;//价格校验状态
    }
}
