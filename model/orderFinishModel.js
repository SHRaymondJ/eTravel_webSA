/*
    机票完成模型
    对应GetOrderFinishDetail接口的回调参数
    obj: 返回的对象

    */
function OrderFinishModel(obj, language) {
    var obj = obj || { id: 0, code: 0, errMsg: 0, airModels: [], hotelModels:[], createCustomers: [] };
    var language = language || 0;
    this.id = obj.id;
    this.code = obj.code;
    this.errMsg = obj.errMsg;
    this.airModels = obj.airModels?obj.airModels.map(function (item) { return airModel = new AirFinishSegment(item); }):[];
    this.createCustomers = obj.createCustomers?obj.createCustomers.map(function (item) { return customer = new CreateCustomer(item); }):[];
    this.hotelModels = obj.hotelModels?obj.hotelModels.map(function (item) { return hotel = new HotelFinishModel(item); }):[];
    this.Language = language;
    this.description = OperationLanguage(language); //操作文本
}

function AirFinishSegment(obj) {
    var obj = obj || { fares: [], airInfos: [], operationMessages: [] };
    this.orderRid = obj.orderRid;
    this.pnr = obj.pnr;
    this.bcn = obj.bcn;
    this.fares = obj.fares.map(function (item) { return fare = new AirFinishFare(item); });
    this.airInfos = obj.airInfos.map(function (item) { return airInfo = new AirFinishSegmentRecod(item); });
    this.operationMessages = obj.operationMessages.map(function (item) { return operationMsg = new OperationMessage(item); });
    this.lowestFare = obj.lowestFare;
    this.fullFare = obj.fullFare;
    this.totalAmount = obj.totalAmout;
    this.ticketTime = obj.ticketTime;
    this.payment = obj.payment;
    this.reason = obj.reason;
    this.unreason = obj.unreason;
    this.refund = obj.refund;
    this.rebooking = obj.rebooking
    this.res = obj.res;
    this.remark = obj.remark;
    this.refundCN = obj.refund.split('||')[0];
    this.refundEN = obj.refund.split('||')[1];
    this.rebookingCN = obj.rebooking.split('||')[0];
    this.rebookingEN = obj.rebooking.split('||')[1];
    this.content = '';
    this.validity = obj.validity;
    this.mins = obj.mins;
    this.maxs = obj.maxs;
}

function AirFinishFare(obj) {
    var obj = obj || { serviceFee: 0 };
    this.type = obj.type
    this.fare = obj.fare
    this.serviceFee = obj.serviceFee
    this.tax = obj.tax
    this.rangPer1 = obj.rangPer1
    this.rangFare1 = obj.rangFare1
    this.rangPer2 = obj.rangPer2
    this.number = obj.number
}

function AirFinishSegmentRecod(obj) {
    this.airlineCode = obj.airlineCode
    this.airline = obj.airline
    this.flightNo = obj.flightNo
    this.departureTime = obj.departureTime
    this.arrivalTime = obj.arrivalTime
    this.destinationAirport = obj.destinationAirport
    this.originAirport = obj.originAirport
    this.departeTerminal = obj.departeTerminal
    this.arriveTerminal = obj.arriveTerminal
    this.cabinClass = obj.cabinClass
    this.cabinCode = obj.cabinCode
}

function CreateCustomer(obj) {
    this.customerId = obj.customerId;
    this.name = obj.name;
}

function OperationMessage(obj) {
    this.rid = obj.rid;
    this.itemID = obj.itemID;
    this.operatorName = obj.operatorName;
    this.updateTime = obj.updateTime;
    this.content = obj.content;
}
function HotelFinishModel(obj) {
    this.hid = obj.hid;
    this.PNR = obj.PNR;
    this.gds = obj.gds
    this.firstTime = obj.firstTime
    this.lastTime = obj.lastTime
    this.roomNum = obj.roomNum
    this.roomType = obj.roomType
    this.roomTypeCode = obj.roomTypeCode
    this.bedType = obj.bedType
    this.bedTypeCode = obj.bedTypeCode
    this.lanType = obj.lanType
    this.lanTypeCode = obj.lanTypeCode
    this.breakfast = obj.breakfast
    this.breakfastCode = obj.breakfastCode
    this.fare = new HotelFinishFare(obj.fare)
    this.currency = obj.currency
    this.currencyDesc = obj.currencyDesc
    this.payType = obj.payType
    this.reasonCode = obj.reasonCode
    this.reasonCodeDesc = obj.reasonCodeDesc
    this.cancelPolicy = obj.cancelPolicy
    this.roomTypeMap = obj.roomTypeMap.map(function (item) { return typeMap = new TypeMap(item); });
    this.bedTypeMap = obj.bedTypeMap.map(function (item) { return typeMap = new TypeMap(item); });
    this.lanTypeMap = obj.lanTypeMap.map(function (item) { return typeMap = new TypeMap(item); });
    this.breakfastTypeMap = obj.breakfastTypeMap.map(function (item) { return typeMap = new TypeMap(item); });
    this.dailyRate = obj.fare.dailyRate
    this.fullRate = obj.fare.fullRate
    this.fullRate_cus = obj.fare.fullRate_cus
    this.handlingfee = obj.fare.handlingfee
    this.lowRate = obj.fare.lowRate
    this.lowRate_cus = obj.fare.lowRate_cus
    this.netRate = obj.fare.netRate
}
function HotelFinishFare(obj){
    this.dailyRate = obj.dailyRate
    this.fullRate = obj.fullRate
    this.fullRate_cus = obj.fullRate_cus
    this.handlingfee = obj.handlingfee
    this.lowRate = obj.lowRate
    this.lowRate_cus = obj.lowRate_cus
    this.netRate = obj.netRate
}
function TypeMap(obj){
    this.code = obj.code;
    this.nameCn = obj.nameCn;
    this.nameEn = obj.nameEn;
}
function OperationLanguage(language) {
    if (language == 'CN') {
        return {
            miscellaneousAndPrice: "杂项及价格",
            subscriber: "订票人",
            paymentMethod: "支付方式",
            edit: "编辑",
            save: "保存",
            priceTitle: "价格信息",
            ticketingTimeLimit: "出票时限",
            rebook: "改签",
            refundFee: "退票费用",
            remark: "备注",
            adult: "成人",
            children: "儿童",
            baby: "婴儿",
            lowestPrice: "最低价",
            priceHead: "销售价格",
            validity: "有效期",
            mins: "最短逗留时间",
            maxs: "最长逗留时间",
            limit: "限制",
            lowestFare:'最低价',
            lowestFareWithTax:'含税最低价',
            fullFare:'全价',
            totalAmount:'总计',
            firstTime:'最早到店时间',
            roomType:'房型',
            lanType:'宽带',
            lastTime:'最晚到店时间',
            bedType:'床型',
            breakfastType:'早餐',
            roomNum:'房间数',
            dailyRate:'销售价',
            fullRate:'门市价',
            fullRate_cus:'自定义全价',
            handlingfee:'服务费',
            lowRate:'最低价',
            lowRate_cus:'自定义最低价',
            currency:'货币代码',
            payType:'酒店现付',
            confirmNumber:'Confirm No',
            reasonCode:'优惠代码',
            cancelPolicy:'退房政策',
            memo:'备注',
            internalMsg:'内部交流'
        }
    } else {
        return {
            miscellaneousAndPrice: "Miscellaneous and Price",
            subscriber: "Subscriber",
            paymentMethod: "Payment Method",
            edit: "Edit",
            save: "Save",
            price: "Price",
            ticketingTimeLimit: "Ticketing Time Limit",
            rebook: "Rebook",
            refundFee: "Refund Fee",
            remark: "Remark",
            adult: "Adult",
            children: "Children",
            baby: "Baby",
            lowestPrice: "Lowest Price",
            priceHead: "Price",
            validity: "有效期",
            mins: "最短逗留时间",
            maxs: "最长逗留时间",
            limit: "限制",
            lowestFare:'最低价',
            lowestFareWithTax:'含税最低价',
            fullFare:'全价',
            totalAmount:'总计',
            firstTime:'最早到店时间',
            roomType:'房型',
            lanType:'宽带',
            lastTime:'最晚到店时间',
            bedType:'床型',
            breakfastType:'早餐',
            roomNum:'房间数',
            dailyRate:'销售价',
            fullRate:'门市价',
            fullRate_cus:'自定义全价',
            handlingfee:'服务费',
            lowRate:'最低价',
            lowRate_cus:'自定义最低价',
            currency:'货币代码',
            payType:'酒店现付',
            confirmNumber:'Confirm No',
            reasonCode:'优惠代码',
            cancelPolicy:'退房政策',
            memo:'备注',
            internalMsg:'内部交流'
        }
    }
}