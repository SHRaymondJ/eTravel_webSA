/*
    机票完成模型
    对应GetOrderFinishDetail接口的回调参数
    obj: 返回的对象

    callback:
        false: 传入参数错误，不是数组类型
    */
//暂时不用
function AirFinishModel(obj,language) {
    this.id = obj.id;
    this.code = obj.code;
    this.errMsg = obj.errMsg;
    this.airModels = obj.airModels.map(function (item) { return airModel = new AirFinishSegment(item); });
    this.createCustomers = obj.createCustomers.map(function (item) { return customer = new CreateCustomer(item); });
    this.Language = language;
    this.description = OperationLanguage(language); //操作文本
}

function AirFinishSegment(array) {
    this.orderRid = array.orderRid;
    this.pnr = array.pnr;
    this.bcn = array.bcn;
    this.fares = array.fares.map(function (item) { return fare = new AirFinishFare(item); });
    this.airInfos = array.airInfos.map(function (item) { return airInfo = new AirFinishSegmentRecod(item); });
    this.operationMessages = array.operationMessages.map(function (item) { return operationMsg = new OperationMessage(item); });
    this.lowestFare = array.lowestFare;
    this.fullFare = array.fullFare;
    this.totalAmount = array.totalAmount;
    this.ticketTime = array.ticketTime;
    this.payment = array.payment;
    this.reason = array.reason;
    this.unreason = array.unreason;
    this.refundCN = array.refund.split('||')[0];
    this.refundEN = array.refund.split('||')[1];
    this.rebookingCN = array.rebooking.split('||')[0];
    this.rebookingEN = array.rebooking.split('||')[1];
    this.res = array.res;
    this.remark = array.remark;
}

function AirFinishFare(array) {
    this.type = array.type
    this.fare = array.fare
    this.serviceFee = array.serviceFe
    this.tax = array.tax
    this.rangPer1 = array.rangPer1
    this.rangFare1 = array.rangFare1
    this.rangPer2 = array.rangPer2
    this.number = array.number
}

function AirFinishSegmentRecod(array) {
    this.airlineCode = array.airlineCode
    this.airline = array.airline
    this.flightNo = array.flightNo
    this.departureTime = array.departureTime
    this.arrivalTime = array.arrivalTime
    this.destinationAirport = array.destinationAirport
    this.originAirport = array.originAirport
    this.departeTerminal = array.departeTerminal
    this.arriveTerminal = array.arriveTerminal
    this.cabinClass = array.cabinClass
    this.cabinCode = array.cabinCode
}

function CreateCustomer(array) {
    this.customerId = array.customerId;
    this.name = array.name;
}

function OperationMessage(array) {
    this.rid = array.rid;
    this.itemID = array.itemID;
    this.operatorName = array.operatorName;
    this.updateTime = array.updateTime;
    this.content = array.content;
}

function OperationLanguage(language){
    if(language == 'CN'){
        return {
            miscellaneousAndPrice: "杂项及价格",
            subscriber : "订票人",
            paymentMethod : "支付方式",
            edit : "编辑",
            save : "保存",
            priceTitle : "价格信息",
            ticketingTimeLimit : "出票时限",
            rebook : "改签",
            refundFee : "退票费用",
            remark : "备注",
            adult : "成人",
            children : "儿童",
            baby : "婴儿",
            lowestPrice : "最低价",
            priceHead : "销售价格"
        }
    }else{
        return {
            miscellaneousAndPrice: "Miscellaneous and Price",
            subscriber : "Subscriber",
            paymentMethod : "Payment Method",
            edit : "Edit",
            save : "Save",
            price : "Price",
            ticketingTimeLimit : "Ticketing Time Limit",
            rebook : "Rebook",
            refundFee : "Refund Fee",
            remark : "Remark",
            adult : "Adult",
            children : "Children",
            baby : "Baby",
            lowestPrice : "Lowest Price",
            priceHead : "Price"
        }
    }
}