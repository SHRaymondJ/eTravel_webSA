var editFlag = 0; //0是编辑，1是保存
var editBtn = document.getElementById('popWindowEditBtn');//编辑按钮
var priceInputItems = document.querySelectorAll('#popWindowPriceBox input'); //编辑按钮
var priceSelectItems = document.querySelectorAll('#popWindowPriceBox select'); //下拉菜单
var priceInternalInformation = document.querySelector('#popWindowInternalInformation'); //内部员工信息
var ORDERNO = '';
var USERID = $.session.get('netLoginId').split('\"')[1];
var fareMin = 0;
var fareMax = 0;
var airInfo; //实例化对象
var paymentMethodArr = [
    'Company Bill',
    'Credit',
    'Card',
    'Cash'
];
var TABINDEX = 0;
var reasonListPostJsonObj = {
    id: $.session.get('netLoginId').split('\"')[1],
    OrderID: '',
    FullFare: '',
    CurrentFare: '',
    CompanyID: $.session.get('companyID')
}
var newOperationMessageJsonObj = {
    id: $.session.get('netLoginId').split('\"')[1],
    orderNo: '',
    mid: '',
    content: '',
    Language: ''
}

//优惠代码返回模型
function ReasonListModel(obj = { FavorableReasonList: [], FavorableUnReasonList: [] }) {
    this.FavorableReasonList = obj.FavorableReasonList;
    this.FavorableReasonList = obj.FavorableReasonList;
}
//初始化弹窗
function initPopWindow(airInfoData) {
    var totalTabPageDom = "";
    var bookingUserNameDom = "";
    var paymentMethodDom = "";
    var paymentMethodReturn = paymentMethodArr.map(function (item) {
        if (item == airModel.payment) {
            var paymentOptStatus = "selected='selected'";
        } else {
            var paymentOptStatus = "";

        }
        paymentMethodDom += "<option value='" + item + "' " + paymentOptStatus + ">" + item + "</option>";
    });
    //tab 遍历pnr
    var tabpage = airInfoData.airModels.map(function (item, index) {
        var active = index == 0 ? "popWindow--tag_title_alive" : "";
        totalTabPageDom += "<div class='popWindow--tag-title " + active + "' data-tab='" + index + "'>" + item.pnr + "</div>";
    });
    //遍历订票人
    var createCustomers = airInfoData.createCustomers.map(function (item, index) {
        var active = index == 0 ? "selected='selected'" : "";
        var userNameOptionValue = item.customerId + '-' + item.name;
        bookingUserNameDom += "<option value='" + userNameOptionValue + "' " + active + ">" + item.name + "</option>";
    });
    var popWindow = "\
    <form action='' id='MiscellaneousAndPrice'>\
        <div class='mask'></div>\
        <section class='popWindow--others'>\
            <div class='popWindow--others-titleBox'>\
                <h3 class='popWindow--others-title'>"+ airInfoData.description.miscellaneousAndPrice + "</h3>\
                <img src='./images/close_window.png' alt='close' class='popWindow--others-close'>\
            </div>\
            <div class='popWindow--box1'>\
                <div class='popWindow--box1-box'>\
                    <span class='popWindow--box1-box--name'>"+ airInfoData.description.subscriber + ":</span>\
                    <select type='' class='popWindow--box1-box--usernameSelect popWindow--box1-box--select' data-class='createCustomers'>\
                    </select> \
                </div>\
                <div class='popWindow--box1-box'>\
                    <span class='popWindow--box1-box--name'>"+ airInfoData.description.paymentMethod + ":</span>\
                    <select type='' class='popWindow--box1-box--select popWindow--box1-box--paymentMethodSelect' data-class='airModels' data-name='payment'>\
                    </select> \
                </div>\
            </div>\
                <section class='popWindow--tag'>"+
        totalTabPageDom +
        "<section class='popWindow--tag-box'>\
                    </section>\
                </section>\
            <div class='popWindow--submit' id='popWindowOthersSubmit'>提交</div>\
        </section>\
    </form>";


    $('body').prepend(popWindow);

    //支付方式
    $('.popWindow--box1-box--paymentMethodSelect').append(paymentMethodDom);
    //订票人
    $('.popWindow--box1-box--usernameSelect').append(bookingUserNameDom);
    resetCreateCustomer($('.popWindow--box1-box--usernameSelect').val());

    //初始化pnr tag区域
    initTagArea(airInfoData, airInfoData.airModels[0]);

    //切换标签页
    $('.popWindow--tag-title').unbind('click').click(function () {
        TABINDEX = 0;
        //如果点击的标签不是活动的，就切换
        if (!$(this).hasClass('popWindow--tag_title_alive')) {
            $(this).addClass('popWindow--tag_title_alive').siblings().removeClass('popWindow--tag_title_alive');
            TABINDEX = $(this).data('tab');
            //初始化内容
            initTagArea(airInfoData, airInfoData.airModels[TABINDEX]);

        }
    })

    //关闭页面
    $("body").on('click', '.popWindow--others-close', function () {
        // $('#MiscellaneousAndPrice').remove();
        // return true;
        submitForm()
    })
    //提交按钮
    $("body").on('click', '#popWindowOthersSubmit', function () {
        submitForm()
    })
    return popWindow;
}
//初始化tab区域
function initTagArea(airInfoData, airModel) {
    var airlineDom = "";
    var dateLimitDate = airModel.ticketTime.substring(0, 10);
    var dateLimitHour = airModel.ticketTime.substring(11, 13);
    var dateLimitMinute = airModel.ticketTime.substring(14, 16);
    fareMin = airModel.lowestFare;
    fareMax = airModel.fullFare;
    //遍历航班
    var airline = airModel.airInfos.map(function (airlineItem) {
        var airlineNumber = airlineItem.airlineCode + airlineItem.flightNo,
            airlineTimetable = airlineItem.departureTime.substring(0, 16) + "-" + airlineItem.arrivalTime.substring(11, 16),
            airlineDestination = airlineItem.originAirport + " - " + airlineItem.destinationAirport,
            airlineType = airlineItem.cabinCode + "/" + airlineItem.cabinClass;
        airlineDom += "<div class='popWindow--tag--orderInformation'>\
                            <span class='popWindow--tag--orderInformation-items'>"+ airlineNumber + "</span>\
                            <span class='popWindow--tag--orderInformation-items'>"+ airlineTimetable + "</span>\
                            <span class='popWindow--tag--orderInformation-items'>"+ airlineDestination + "</span>\
                            <span class='popWindow--tag--orderInformation-items'>"+ airlineType + "</span>\
                        </div>"
    })
    var tagArea = "<div class='popWindow--tag-area'>" +
        airlineDom
        + "</div>\
                <div class='popWindow--tag-area'>\
                    <div class='flex-justify-between'>\
                        <div class='flex-box'>\
                            <span class='popWindow--tag-nameOfInputItems'>"+ airInfoData.description.ticketingTimeLimit + ":</span>\
                            <input type='text' class='popWindow--tag--ticketingTimeLimit-dateInput' data-class='airModels' data-name='ticketTime-date' readonly='readonly'>\
                            <input type='number' max='23' min='00'class='popWindow--tag--ticketingTimeLimit-hourInput' data-class='airModels' data-name='ticketTime-hour' value='"+ dateLimitHour + "'>\
                            <input type='number' max='59' min='00'class='popWindow--tag--ticketingTimeLimit-minuteInput' data-class='airModels' data-name='ticketTime-minute' value='"+ dateLimitMinute + "'>\
                        </div>\
                        <div class='flex-box class='popWindow--tag--rebookBox'>\
                            <span class='popWindow--tag-nameOfInputItems popWindow--tag--rebookDes'>"+ airInfoData.description.rebook + ":</span>\
                            <select type='' class='popWindow--tag--rebookInput' data-class='airModels' data-name='rebooking'>\
                            <option value='Free'>Free</option>\
                            <option value='Applied'>Applied</option>\
                            </select> \
                        </div>\
                    </div>\
                    <div class='flex-box'>\
                        <span class='popWindow--tag-nameOfInputItems'>"+ airInfoData.description.refundFee + ":</span>\
                        <select type='' class='popWindow--tag--refundInput' data-class='airModels' data-name='refund'>\
                            <option value='Free'>Free</option>\
                            <option value='Applied'>Applied</option>\
                            <option value='Non refundable'>Non refundable</option>\
                        </select> \
                    </div>\
                    <div class='flex-box'>\
                        <span class='popWindow--tag-nameOfInputItems'>"+ airInfoData.description.remark + ":</span>\
                        <textarea name='' id='' cols='30' rows='10' class='popWindow--tag--remarkInput' data-class='airModels' data-name='remark'>"+ airModel.remark + "</textarea>\
                    </div>\
                </div>\
                <div class='popWindow--tag-area' id='popWindowPriceBox'>\
                    <div class='popWindow--tag--priceMsg flex-box'>\
                        <h4 class='popWindow--tag--priceMsg-title'>"+ airInfoData.description.priceTitle + "</h4>\
                        <div class='popWindow--tag--priceMsg-editBtn' id='popWindowEditBtn'>"+ airInfoData.description.edit + "</div>\
                    </div>\
                    <div class='flex-box popWindow--tag--priceMsg-table-title'>\
                        <span>"+ airInfoData.description.priceHead + "</span>\
                        <span>让利一</span>\
                        <span>金额</span>\
                        <span>让利二</span>\
                        <span>服务费</span>\
                        <span>税</span>\
                        <span>人数</span>\
                    </div><div id='priceArea'></div><div class='flex-box'>\
                        <span class='popWindow--tag-nameOfInputItems'>"+ airInfoData.description.lowestPrice + ":</span>\
                        <div class='popWindow--tag--priceMsg-table-items popWindow--tag--priceMsg-table-item_lowerPriceLine'>\
                            <input  id='lowestFareInput' type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item flex3' value='"+ airModel.lowestFare + "' data-class='airModels' data-name='lowestFare'>\
                            <div class='popWindow--tag--priceMsg-table-item flex3'>\
                                <span>全价:</span>\
                                <input id='fullFareInput' type='number' disabled='disabled' min='0' value='"+ airModel.fullFare + "' data-class='airModels' data-name='fullFare'>\
                            </div>\
                            <div class='popWindow--tag--priceMsg-table-item flex3'>\
                                <span>总计:</span>\
                                <input class='blocked' type='number' disabled='disabled' min='0' value='"+ airModel.totalAmount + "' data-class='airModels' data-name='totalAmount' id='totalAmount'>\
                            </div>\
                        </div>\
                    </div>\
                    <div class='flex-box'>\
                        <span class='popWindow--tag-nameOfInputItems'>优惠代码:</span>\
                        <select type='' class='popWindow--tag--refundInput' data-class='airModels' data-name='reason' id='airOthersReason'>\
                            <option value='"+ airModel.reason + "' selected>" + airModel.reason + "</option>\
                        </select> \
                    </div>\
                    <div class='flex-box'>\
                        <span class='popWindow--tag-nameOfInputItems'>非优惠代码:</span>\
                        <select type='' class='popWindow--tag--refundInput' data-class='airModels' data-name='unreason' id='airOthersUnreason'>\
                            <option value='"+ airModel.unreason + "' selected>" + airModel.unreason + "</option>\
                        </select> \
                    </div>\
                    <div class='flex-box popWindow--tag--internalMsg-Box'>\
                        <span class='popWindow--tag-nameOfInputItems'>内部交流（出票信息）:</span>\
                        <textarea name='' cols='30' rows='10' class='popWindow--tag--remarkInput' id='popWindowInternalInformation' data-class='airModels' data-name='content'></textarea>\
                    </div>\
                </div>";

    $('.popWindow--tag-box').html(tagArea);
    priceAreaInit(airModel);
    GetReasonListPost();
    CalculateTotalAmount(0);
    dataChangeEvent();
    //初始化refund&robooking
    airInfo.airModels[0].rebooking = $('.popWindow--tag--rebookInput').val();
    airInfo.airModels[0].refund = $('.popWindow--tag--refundInput').val();
    //日期控件
    var TAnumber = $.session.get("TAnumber")
    var TAminDate = 0, TAmaxDate = 365
    if (TAnumber) {
        //domAir=JSON.parse(domAirSession)
        // TAminDate=domAir.starTime
        // TAmaxDate=domAir.endTime
        // 有TA单时，时间进行限制

        if (TAnumber != undefined && TAnumber != "" && $.session.get('goOnBooktravelInfo') != undefined && $.session.get('goOnBooktravelInfo') != "") {
            var goOnBooktravelInfo = JSON.parse($.session.get('goOnBooktravelInfo'));
            TAminDate = goOnBooktravelInfo.starTime.split(" ")[0]
            TAmaxDate = goOnBooktravelInfo.endTime.split(" ")[0]
            var minTime = new Date().getTime()
            var minTime2
            if (TAminDate == 0) {
                minTime2 = new Date().getTime()
            } else {
                minTime2 = new Date(TAminDate.replace(/-/g, "/")).getTime()
            }
            TAminDate = minTime < minTime2 ? TAminDate : new Date()
        }
    }
    $(".popWindow--tag--ticketingTimeLimit-dateInput").datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        minDate: TAminDate, // 当前日期之后的 0 天，就是当天
        maxDate: TAmaxDate, // 当前日期之后的 0 天，就是当天
        hideIfNoPrevNext: true,
        showOtherMonths: true,
        selectOtherMonths: true
    });
    //初始化日期值
    $('.popWindow--tag--ticketingTimeLimit-dateInput').val(dateLimitDate);

    //日期控件结束



    //价格编辑按钮
    $('.popWindow--tag--priceMsg-editBtn').click(function () {
        console.log(priceInputItems);
        if (editFlag == 0) {    //编辑
            this.innerHTML = airInfoData.description.save;
            switchEnable();
            editFlag = 1;
        } else if (editFlag == 1) { //保存
            priceSaveBtnClickFn(this);
        }
    })

}

//提交表单
function submitForm() {
    if ($('.popWindow--tag--priceMsg-editBtn').text() == '编辑' || editFlag == 0) {
        priceSaveBtnClickFn($('.popWindow--tag--priceMsg-editBtn')[0]);
    }
    var internalMsg = $('#popWindowInternalInformation').val();
    if (internalMsgValidChecking(internalMsg)) {
        airInfo.id = USERID;
        // setDefaultUserData(airInfo);
        var jsonObj = {
            request: airInfo
        };
        modifyAirInfomation(jsonObj);
    }
}
//
function priceSaveBtnClickFn(dom) {
    console.log(dom);
    dom.innerHTML = airInfo.description.edit;
    TABINDEX = $('.popWindow--tag_title_alive').data('tab');
    switchEnable();
    GetReasonListPost();
    CalculateTotalAmount(TABINDEX);
    popupWarningMsg(1, 1000);
    editFlag = 0;
}
//按键切换输入框disabled
function switchEnable() {
    if ($("#popWindowPriceBox input:not(.blocked)").attr('disabled')) {
        $("#popWindowPriceBox input:not(.blocked)").removeAttr('disabled');
        // $("#popWindowInternalInformation").removeAttr('disabled');

        $("#popWindowPriceBox select").attr('disabled', 'disabled');
    } else {
        $("#popWindowPriceBox input:not(.blocked)").attr('disabled', 'disabled');
        // $("#popWindowInternalInformation").attr('disabled', 'disabled');

        $("#popWindowPriceBox select").removeAttr('disabled');
    }
}
//价格信息
function priceAreaInit(airModel) {
    //价格信息成人、儿童、婴儿
    var priceFare = '';
    console.log(airInfo);
    console.log(airModel);
    airModel.fares.map(function (fare, index) {
        var old = '';
        //遍历是成人还是儿童还是婴儿
        switch (index) {
            case 0:
                old = 'adult';
                break;
            case 1:
                old = 'children';
                break;
            case 2:
                old = 'baby';
                break;
        }
        //编辑dom元素
        priceFare += "<div class='flex-box'>\
                            <span class='popWindow--tag-nameOfInputItems'>"+ airInfo.description[old] + ":</span>\
                            <div class='popWindow--tag--priceMsg-table-items'>\
                                <input type='number' disabled='disabled' min='"+ fareMin + "' max='" + fareMax + "' class='popWindow--tag--priceMsg-table-item " + old + "FareInput' value='" + fare.fare + "' data-class='airModels' data-name='fares-fare' data-index='" + index + "'>\
                                <div class='popWindow--tag--priceMsg-table-item percentage'>\
                                    <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item_percentage' value='"+ fare.rangPer1 + "' data-class='airModels' data-name='fares-rangPer1' data-index='" + index + "'>\
                                </div>\
                                <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item blocked' value='"+ fare.rangFare1 + "' data-class='airModels' data-name='fares-rangFare1' data-index='" + index + "'>\
                                <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item " + old + "SecondDeductionAmount' value='" + fare.rangPer2 + "' data-class='airModels' data-name='fares-rangPer2' data-index='" + index + "'>\
                                <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item' value='"+ fare.serviceFee + "' data-class='airModels' data-name='fares-serviceFee' data-index='" + index + "'>\
                                <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item' value='"+ fare.tax + "' data-class='airModels' data-name='fares-tax' data-index='" + index + "'>\
                                <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item blocked' value='"+ fare.number + "' data-class='airModels' data-name='fares-number' data-index='" + index + "'>\
                            </div>\
                        </div>";
    })
    $('#priceArea').html(priceFare);
    dataChangeEvent();

}

//获取标签数据，监控数值变化实时推给数据
function dataChangeEvent() {
    $('textarea').bind('input propertychange', function () {
        saveDataFn(this);
        // if ($(this).data('name') == 'content') {
        //     TABINDEX = $('.popWindow--tag_title_alive').data('tab');
        //     AddNewOperationMessage(TABINDEX);
        // }    //测试接口用
        console.log($(this).val());
    });
    $('input').bind('change', function () {
        numberInputValidation(this);
        priceLimitCheckFn(this);
        saveDataFn(this);
        console.log($(this).val());
    })
    // $('input[type=number]').bind('blur', function () {
    //     if ($(this).val() == '') {
    //         $(this.val(0));
    //     }
    // })
    $('select').bind('change', function () {
        saveDataFn(this);
        console.log($(this).val());
    })
}

//将页面项目保存到对象
function saveDataFn(dom) {
    if ($(dom).data('class') == 'airModels') {
        var airModelsIndex = $('.popWindow--tag_title_alive').data('tab');
        //如果是能data-name拆成数组的，第一项是airModels的属性名，第二项是该属性数组下的子属性名
        var nameArr = $(dom).data('name').split('-');
        var newData = $(dom).val();
        if (nameArr[1]) {
            var subIndex = $(dom).data('index');
            //如果是ticketTime，就把date，hour和minute拼接在一起保存在ticketTime
            if (nameArr[0] == 'ticketTime') {
                var ticketTimeDate = $(".popWindow--tag--ticketingTimeLimit-dateInput[data-name='ticketTime-date']").val();
                var ticketTimeHour = $(".popWindow--tag--ticketingTimeLimit-hourInput[data-name='ticketTime-hour']").val();
                ticketTimeHour = ('00' + ticketTimeHour).slice(-2);
                var ticketTimeMinute = $(".popWindow--tag--ticketingTimeLimit-minuteInput[data-name='ticketTime-minute']").val();
                ticketTimeMinute = ('00' + ticketTimeMinute).slice(-2);
                airInfo.airModels[airModelsIndex].ticketTime = ticketTimeDate + " " + ticketTimeHour + ":" + ticketTimeMinute + ":" + airInfo.airModels[airModelsIndex].ticketTime.substr(17, 2);
            } else {
                //否则正常保存
                //例: airInfo.airModels[0].fares[0].fare
                airInfo.airModels[airModelsIndex][nameArr[0]][subIndex][nameArr[1]] = newData;
                console.log(airInfo.airModels[airModelsIndex][nameArr[0]]);
            }
        } else {
            //例: airInfo.airModels[0].fullFare
            airInfo.airModels[airModelsIndex][nameArr[0]] = newData;
            console.log(airInfo.airModels[airModelsIndex][nameArr[0]]);
        }

    } else if ($(dom).data('class') == 'createCustomers') {
        resetCreateCustomer($(dom).val());
    }
}
//订票人赋值
//value: 订票人的数据
function resetCreateCustomer(value) {
    airInfo.createCustomers = [];
    var customerInfo = value.split('-');
    airInfo.createCustomers.push({
        customerId: customerInfo[0],
        name: customerInfo[1]
    })
}
//获取机票杂项信息
function getOrderFinishDetail(jsonObj) {
    $('body').mLoading("show");
    //正式请求
    $.ajax(
        {
            type: 'post',
            url: $.session.get('ajaxUrl'),
            dataType: 'json',
            data: {
                url: $.session.get('obtCompany') + "/OrderService.svc/GetOrderFinishDetail",
                jsonStr: JSON.stringify(jsonObj)
            },
            success: function (data) {
                $('body').mLoading("hide");
                var res = JSON.parse(data);
                console.log(res);
                if (res.code == '200') {
                    airInfo = new OrderFinishModel(res, jsonObj.request.Language);  //初始化实例，需要引入orderFinishmodel
                    initPopWindow(airInfo); //插入弹窗
                } else {
                    alert('error');
                }

            },
            error: function () {

            }
        }
    );
}
//修改机票信息
//jsonObj: object 接口请求的json对象
function modifyAirInfomation(jsonObj) {
    $('body').mLoading("show");
    var operationMsgAddedFlag = false;
    var temp = airInfo.airModels.map(function (item, index) {
        operationMsgAddedFlag = AddNewOperationMessage(index);
    });
    if (operationMsgAddedFlag) {
        $.ajax(
            {
                type: 'post',
                url: $.session.get('ajaxUrl'),
                dataType: 'json',
                data: {
                    url: $.session.get('obtCompany') + "/OrderService.svc/ModifyAirInfomation",
                    jsonStr: JSON.stringify(jsonObj)
                },
                success: function (data) {
                    $('body').mLoading("hide");
                    var res = JSON.parse(data);
                    console.log(res);
                    if (res.code == 200) {
                        //关闭弹窗
                        $('#MiscellaneousAndPrice').remove();
                        //清缓存
                        if (isTA == 0) {
                            $.session.remove("changeOrderNo");

                        } else if (isTA == 1) {
                            if ($.session.get("TAnumber") && !$.session.get("TAnumberIndex")) {
                                $.session.remove("TAnumber");
                                $.session.remove("TACustomerId");
                                $.session.remove("changeOrderNo");
                            }
                        }
                        //进入订单完成页面
                        changeNewUid(ORDERNO);
                    } else {
                        alert(res.message);
                    }

                },
                error: function () {

                }
            }
        );
    } else {
        alert('Error: 内部信息插入失败');
    }

}
//添加内部交流
// index: tab 编号
function AddNewOperationMessage(index) {
    $('body').mLoading("show");
    // newOperationMessageJsonObj.id = '3259c417-82bc-46ad-ac84-14627e81ffb9';
    newOperationMessageJsonObj.orderNo = ORDERNO;
    newOperationMessageJsonObj.mid = airInfo.airModels[index].orderRid;
    newOperationMessageJsonObj.content = airInfo.airModels[index].content;
    newOperationMessageJsonObj.Language = airInfo.Language;
    $.ajax(
        {
            type: 'post',
            url: $.session.get('ajaxUrl'),
            dataType: 'json',
            data: {
                url: $.session.get('obtCompany') + "/OrderService.svc/AddNewOperationMessage",
                jsonStr: JSON.stringify(newOperationMessageJsonObj)
            },
            success: function (data) {
                $('body').mLoading("hide");
                var res = JSON.parse(data);
                console.log(res);
                if (res.code == 200) {
                    return true;
                } else {
                    alert(res.code + ":" + res.message);
                    return false
                }
            },
            error: function (data) {
                alert(data);
                return false;
            }
        })
}
//计算机票相关费用
function CalculateTotalAmount(index) {
    $('body').mLoading("show");
    var getAirFareInfoObj = {
        request: {
            id: USERID,
            fareInfo: airInfo.airModels[index].fares,
            Language: airInfo.Language
        }
    }
    $.ajax(
        {
            type: 'post',
            url: $.session.get('ajaxUrl'),
            dataType: 'json',
            data: {
                url: $.session.get('obtCompany') + "/OrderService.svc/GetAirFareInfo",
                jsonStr: JSON.stringify(getAirFareInfoObj)
            },
            success: function (data) {
                $('body').mLoading("hide");
                var res = JSON.parse(data);
                airInfo.airModels[index].fares = res.fareList;
                airInfo.airModels[index].totalAmount = res.totalFare;
                priceAreaInit(airInfo.airModels[index]);
                $('#totalAmount').val(res.totalFare);
                console.log(res);
            }, error: function () {
                alert(error);
            }
        })
}
//检查（非）优惠代码
function GetReasonListPost() {
    $('body').mLoading("show");
    TABINDEX = $('.popWindow--tag_title_alive').data('tab');
    reasonListPostJsonObj.OrderID = airInfo.airModels[TABINDEX].orderRid;
    reasonListPostJsonObj.FullFare = airInfo.airModels[TABINDEX].fullFare;
    reasonListPostJsonObj.CurrentFare = airInfo.airModels[TABINDEX].fares[0].fare - airInfo.airModels[TABINDEX].fares[0].rangPer2;
    $.ajax(
        {
            type: 'post',
            url: $.session.get('ajaxUrl'),
            dataType: 'json',
            data: {
                // url: $.session.get('obtCompany') + TESTURL + "/OrderService.svc/GetReasonListPost", //等接口
                url: $.session.get('obtCompany') + "/OrderService.svc/GetReasonListPost",
                jsonStr: JSON.stringify(reasonListPostJsonObj)
            },
            success: function (data) {
                $('body').mLoading("hide");
                var res = JSON.parse(data);
                console.log(res);

                var reasonOptions = '';
                var unreasonOptions = '';
                var previousReasonSelectedVal = $('#airOthersReason').val();
                var previousUnreasonSelectedVal = $('#airOthersUnreason').val();

                var reason = new ReasonListModel(res);
                if (reason.FavorableReasonList.length != 0 && reason.FavorableUnReasonList.length != 0) {
                    reason.FavorableReasonList.map(function (item) {
                        if (item == previousReasonSelectedVal) {
                            var reasonSelected = "selected";
                        } else {
                            var reasonSelected = "";
                        }
                        reasonOptions += "<option value='" + item + "' " + reasonSelected + ">" + item + "</option>"
                    })
                    reason.FavorableUnReasonList.map(function (item) {
                        if (item == previousUnreasonSelectedVal) {
                            var unreasonSelected = "selected";
                        } else {
                            var unreasonSelected = "";
                        }
                        unreasonOptions += "<option value='" + item + "' " + unreasonSelected + ">" + item + "</option>"
                    })
                } else if (reason.FavorableReasonList.length == 0) {
                    reasonOptions = '';
                } else if (reason.FavorableUnReasonList.length == 0) {
                    reasonOptions = '';
                }

                $('#airOthersReason').html(reasonOptions);
                $('#airOthersUnreason').html(unreasonOptions);
                airInfo.airModels[TABINDEX].reason = $('#airOthersReason').val();
                airInfo.airModels[TABINDEX].unreason = $('#airOthersUnreason').val();

            },
            error: function () {

            }
        }
    );
}

//检查最低价最高价和成人销售价格
function priceLimitCheckFn(dom) {
    if ($(dom).data('name') == 'fullFare' || $(dom).data('name') == 'lowestFare' || $(dom).hasClass('adultFareInput') || $(dom).hasClass('adultSecondDeductionAmount')) {
        if ($(dom).data('name') == 'fullFare') {
            fareMax = parseInt($(dom).val());
            fareMin = parseInt($('#lowestFareInput').val());
            var adultSecondDeductionVal = parseInt($('.adultSecondDeductionAmount').val());
            var adultFareVal = parseInt($('.adultFareInput').val());
            var adultSaleValue = adultFareVal - adultSecondDeductionVal;
            if (fareMax <= fareMin) {
                fareMax = fareMin + 1;
                $(dom).val(fareMax);
            }
            if (fareMax < adultSaleValue) {
                fareMax = adultSaleValue;
                $(dom).val(fareMax);
                popupWarningMsg(2, 1500);
            }
        } else if ($(dom).data('name') == 'lowestFare') {
            fareMax = parseInt($('#fullFareInput').val());
            fareMin = parseInt($(dom).val());
            var adultSecondDeductionVal = parseInt($('.adultSecondDeductionAmount').val());
            var adultFareVal = parseInt($('.adultFareInput').val());
            var adultSaleValue = adultFareVal - adultSecondDeductionVal;
            if (fareMin >= fareMax) {
                fareMin = fareMax - 1;
                $(dom).val(fareMin);
            }
            if (fareMin > adultSaleValue) {
                fareMin = adultSaleValue;
                $(dom).val(fareMin);
                popupWarningMsg(2, 1500);
            }
        } else if ($(dom).hasClass('adultFareInput')) {
            fareMax = parseInt($(dom).attr('max'));
            fareMin = parseInt($(dom).attr('min'));
            var adultSecondDeductionVal = parseInt($('.adultSecondDeductionAmount').val());
            var adultFareVal = parseInt($(dom).val());
            var adultSaleValue = adultFareVal - adultSecondDeductionVal;
            if (adultSaleValue > fareMax) {
                $(dom).val(fareMax + adultSecondDeductionVal);
                popupWarningMsg(2, 1500);
            } else if (adultSaleValue < fareMin) {
                $(dom).val(fareMin + adultSecondDeductionVal);
                popupWarningMsg(2, 1500);
            }
        } else if ($(dom).hasClass('adultSecondDeductionAmount')) {
            fareMax = parseInt($('#fullFareInput').val());
            fareMin = parseInt($('#lowestFareInput').val());
            var adultSecondDeductionVal = parseInt($(dom).val());
            var adultFareVal = parseInt($('.adultFareInput').val());
            var adultSaleValue = adultFareVal - adultSecondDeductionVal;
            console.log('adultSaleValue=' + adultSaleValue + ';adultFareVal=' + adultFareVal + ';adultSecondDeductionVal=' + adultSecondDeductionVal);
            if (adultSaleValue > fareMax) {
                $(dom).val(adultFareVal - fareMax);
                popupWarningMsg(2, 1500);
            } else if (adultSaleValue < fareMin) {
                $(dom).val(adultFareVal - fareMin);
                popupWarningMsg(2, 1500);
            }
        }
        $('.adultFareInput').attr('max', fareMax + adultSecondDeductionVal);
        $('.adultFareInput').attr('min', fareMin + adultSecondDeductionVal);
    }
}
//检查input项目的输入值是否在设定值范围内且大于0
function numberInputValidation(dom) {
    if ($(dom).attr('type') == 'number' && $(dom).val() == '') {
        $(dom).val(0);
    }
    var inputMax = parseInt($(dom).attr('max'));
    var inputMin = parseInt($(dom).attr('min'));
    var inputValue = parseInt($(dom).val());
    if (inputValue < 0 || inputValue < inputMin) {
        $(dom).val(inputMin);
    } else if (inputValue > inputMax) {
        $(dom).val(inputMax);
    }
}

//设置默认用户数据
function setDefaultUserData(obj) {
    //USERID前后带引号，要把引号去掉，不知道为什么要带引号保存。。。
    obj.id = $.session.get('netLoginId').split('\"')[1];
}
//提示语
//messageCode: <number>
//timeout: <number> timeout ms
function popupWarningMsg(messageCode, timeout) {
    var message = '';
    switch (messageCode) {
        case 1: message = '价格已被修改,请注意优惠代码'; break;
        case 2: message = '销售费用不能大于全价并且不能小于最低价'; break;
    }
    var msgDom = "<div class='warningMsgBox'>" + message + "</div>";
    $('body').append(msgDom);
    setTimeout(function () {
        $('.warningMsgBox').css('opacity', '0');
        setTimeout(function () {
            $('.warningMsgBox').remove();
        }, timeout)
    }, timeout);
}
//检查内部交流是否填写
//return : <boolean>
function internalMsgValidChecking(internalMsg) {
    if (internalMsg == "") {
        $('.popWindow--tag--internalMsg-Box').addClass('popWindow--tag--internalMsg-Box_Warning');
        return false;
    } else {
        $('.popWindow--tag--internalMsg-Box').removeClass('popWindow--tag--internalMsg-Box_Warning');
        return true;
    }
}

/******************
    打开机票杂项弹窗
    res: 成功预订机票返回的参数
    orderNo: 订单号
    isTA: 判断是否存在TAnumber
********************/
function airBookOthersPopUp(res, orderNo, isTA) {
    getOrderFinishDetail(res);
    ORDERNO = orderNo;
    console.log(res, orderNo, isTA);

};