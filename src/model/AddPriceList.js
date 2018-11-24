export default class AddPriceList{
    constructor(disabled,startDate,endDate,price,priceStatus,_priceStatus,startDateTitle,endDateTitle,priceTitle){
        this.startDate=startDate;
        this.endDate=endDate;
        this.price=price||'';
        this.priceStatus=priceStatus;
        this._priceStatus=_priceStatus;
        this.startDateTitle=startDateTitle;
        this.endDateTitle=endDateTitle;
        this.priceTitle = priceTitle;
        this.disabled = disabled;
    }
}