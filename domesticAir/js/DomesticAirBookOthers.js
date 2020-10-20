//切换disabled
var switchEnable = function () {
    if ($("#popWindowPriceBox input").attr('disabled')) {
        $("#popWindowPriceBox input").removeAttr('disabled');
        $("#popWindowPriceBox select").removeAttr('disabled');
        $("#popWindowInternalInformation").removeAttr('disabled');
    } else {
        $("#popWindowPriceBox input").attr('disabled', 'disabled');
        $("#popWindowPriceBox select").attr('disabled', 'disabled');
        $("#popWindowInternalInformation").attr('disabled', 'disabled');
    }
}
var editFlag = 0; //0是编辑，1是保存
var editBtn = document.getElementById('popWindowEditBtn');//编辑按钮
var priceInputItems = document.querySelectorAll('#popWindowPriceBox input'); //编辑按钮
var priceSelectItems = document.querySelectorAll('#popWindowPriceBox select'); //下拉菜单
var priceInternalInformation = document.querySelector('#popWindowInternalInformation'); //内部员工信息

//初始化tab区域
function initTagArea(airInfoData, airModel) {
    var airlineDom = "";
    var dateLimitDate = "";
    var dateLimitHour = "";
    var dateLimitMinute = "";
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
    //出票时限
    dateLimitDate = airModel.ticketTime.substring(0, 10);
    dateLimitHour = airModel.ticketTime.substring(11, 13);
    dateLimitMinute = airModel.ticketTime.substring(14, 16);

    var tagArea = "<div class='popWindow--tag-area'>" +
        airlineDom
        + "</div>\
                <div class='popWindow--tag-area'>\
                    <div class='flex-justify-between'>\
                        <div class='flex-box'>\
                            <span class='popWindow--tag-nameOfInputItems'>"+ airInfoData.description.ticketingTimeLimit + ":</span>\
                            <input type='text' class='popWindow--tag--ticketingTimeLimit-dateInput' value='"+ dateLimitDate + "'>\
                            <select type='' class='popWindow--tag--ticketingTimeLimit-hourInput'>\
                                <option value='' selected>"+ dateLimitHour + "</option>\
                            </select> \
                            <select type='' class='popWindow--tag--ticketingTimeLimit-minuteInput'>\
                                <option value='' selected>"+ dateLimitMinute + "</option>\
                            </select> \
                        </div>\
                        <div class='flex-box'>\
                            <span class='popWindow--tag-nameOfInputItems'>"+ airInfoData.description.rebook + ":</span>\
                            <select type='' class='popWindow--tag--rebookInput'>\
                                <option value='' selected>"+ airModel['rebooking' + airInfoData.Language] + "</option>\
                            </select> \
                        </div>\
                    </div>\
                    <div class='flex-box'>\
                        <span class='popWindow--tag-nameOfInputItems'>"+ airInfoData.description.refundFee + ":</span>\
                        <select type='' class='popWindow--tag--refundInput'>\
                            <option value='' selected>"+ airModel['refund' + airInfoData.Language] + "</option>\
                        </select> \
                    </div>\
                    <div class='flex-box'>\
                        <span class='popWindow--tag-nameOfInputItems'>"+ airInfoData.description.remark + ":</span>\
                        <textarea name='' id='' cols='30' rows='10' class='popWindow--tag--remarkInput'>"+ airModel.remark + "</textarea>\
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
                    </div>\
                    <div class='flex-box'>\
                        <span class='popWindow--tag-nameOfInputItems'>"+ airInfoData.description.adult + ":</span>\
                        <div class='popWindow--tag--priceMsg-table-items'>\
                            <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item' value='"+ airModel.fares[0].fare + "'>\
                            <div class='popWindow--tag--priceMsg-table-item percentage'>\
                                <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item_percentage' value='"+ airModel.fares[0].rangPer1 + "'>\
                            </div>\
                            <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item' value='"+ airModel.fares[0].rangFare1 + "'>\
                            <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item' value='"+ airModel.fares[0].rangPer2 + "'>\
                            <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item' value='"+ airModel.fares[0].serviceFee + "'>\
                            <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item' value='"+ airModel.fares[0].tax + "'>\
                            <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item' value='"+ airModel.fares[0].number + "'>\
                        </div>\
                    </div>\
                    <div class='flex-box'>\
                        <span class='popWindow--tag-nameOfInputItems'>"+ airInfoData.description.children + ":</span>\
                        <div class='popWindow--tag--priceMsg-table-items'>\
                            <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item' value='"+ airModel.fares[2].fare + "'>\
                            <div class='popWindow--tag--priceMsg-table-item percentage'>\
                                <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item_percentage' value='"+ airModel.fares[2].rangPer1 + "'>\
                            </div>\
                            <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item' value='"+ airModel.fares[2].rangFare1 + "'>\
                            <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item' value='"+ airModel.fares[2].rangPer2 + "'>\
                            <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item' value='"+ airModel.fares[2].serviceFee + "'>\
                            <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item' value='"+ airModel.fares[2].tax + "'>\
                            <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item' value='"+ airModel.fares[2].number + "'>\
                        </div>\
                    </div>\
                    <div class='flex-box'>\
                        <span class='popWindow--tag-nameOfInputItems'>"+ airInfoData.description.baby + ":</span>\
                        <div class='popWindow--tag--priceMsg-table-items'>\
                            <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item' value='"+ airModel.fares[1].fare + "'>\
                            <div class='popWindow--tag--priceMsg-table-item percentage'>\
                                <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item_percentage' value='"+ airModel.fares[1].rangPer1 + "'>\
                            </div>\
                            <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item' value='"+ airModel.fares[1].rangFare1 + "'>\
                            <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item' value='"+ airModel.fares[1].rangPer2 + "'>\
                            <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item' value='"+ airModel.fares[1].serviceFee + "'>\
                            <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item' value='"+ airModel.fares[1].tax + "'>\
                            <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item' value='"+ airModel.fares[1].number + "'>\
                        </div>\
                    </div>\
                    <div class='flex-box'>\
                        <span class='popWindow--tag-nameOfInputItems'>"+ airInfoData.description.lowestPrice + ":</span>\
                        <div class='popWindow--tag--priceMsg-table-items popWindow--tag--priceMsg-table-item_lowerPriceLine'>\
                            <input type='number' disabled='disabled' min='0' class='popWindow--tag--priceMsg-table-item flex3' value='"+ airModel.lowestFare + "'>\
                            <div class='popWindow--tag--priceMsg-table-item flex3'>\
                                <span>全价:</span>\
                                <input type='number' disabled='disabled' min='0' value='"+ airModel.fullFare + "'>\
                            </div>\
                            <div class='popWindow--tag--priceMsg-table-item flex3'>\
                                <span>总计:</span>\
                                <input type='number' disabled='disabled' min='0'>\
                            </div>\
                        </div>\
                    </div>\
                    <div class='flex-box'>\
                        <span class='popWindow--tag-nameOfInputItems'>优惠代码:</span>\
                        <select type='' class='popWindow--tag--refundInput' disabled='disabled'>\
                            <option value='' selected>"+ airModel.reason + "</option>\
                        </select> \
                    </div>\
                    <div class='flex-box'>\
                        <span class='popWindow--tag-nameOfInputItems'>非优惠代码:</span>\
                        <select type='' class='popWindow--tag--refundInput' disabled='disabled'>\
                            <option value='' selected>"+ airModel.unreason + "</option>\
                        </select> \
                    </div>\
                    <div class='flex-box'>\
                        <span class='popWindow--tag-nameOfInputItems'>内部交流（出票信息）:</span>\
                        <textarea name='' cols='30' rows='10' class='popWindow--tag--remarkInput' disabled='disabled' id='popWindowInternalInformation'>"+ airModel.res + "</textarea>\
                    </div>\
                </div>";

    $('.popWindow--tag-box').html(tagArea);

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
        selectOtherMonths: true,
        onSelect: function () {
            var departureValue = new Date($(".popWindow--tag--ticketingTimeLimit-dateInput").val().replace(/-/g, "/"));
            // $("#domReturnDate").datepicker('destroy');
            // $("#domReturnDate").datepicker({
            // 	dateFormat: 'yy-mm-dd',
            // 	changeMonth: true,
            // 	changeYear: true,
            // 	minDate: departureValue, // 当前日期之后的 0 天，就是当天
            // 	maxDate: TAmaxDate, // 当前日期之后的 0 天，就是当天
            // 	hideIfNoPrevNext: true,
            // 	showOtherMonths: true,
            // 	selectOtherMonths: true,
            // });
        }
    });
    //日期控件结束

    //价格编辑按钮
    $('.popWindow--tag--priceMsg-editBtn').click(function () {
        console.log(priceInputItems);
        if (editFlag == 0) {
            this.innerHTML = airInfoData.description.save;
            switchEnable();
            editFlag = 1;
        } else if (editFlag == 1) {
            this.innerHTML = airInfoData.description.edit;
            switchEnable();
            editFlag = 0;
        }
    })
}


//初始化弹窗
function initPopWindow(airInfoData) {
    var totalTabPage = "";

    //tab 遍历pnr
    var tabpage = airInfoData.airModels.map(function (item, index) {
        var active = index == 0 ? "popWindow--tag_title_alive" : "";
        totalTabPage += "<div class='popWindow--tag-title " + active + "' data-tab='" + index + "'>" + item.pnr + "</div>";
        //test
        totalTabPage += "<div class='popWindow--tag-title' data-tab='1'>123</div>";
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
                    <input type='text' class='popWindow--box1-box--input' value='"+ airInfoData.createCustomers[0].name + "' data-id='" + airInfoData.createCustomers[0].customerId + "'>\
                </div>\
                <div class='popWindow--box1-box'>\
                    <span class='popWindow--box1-box--name'>"+ airInfoData.description.paymentMethod + ":</span>\
                    <select type='' class='popWindow--box1-box--select'>\
                    </select> \
                </div>\
            </div>\
                <section class='popWindow--tag'>"+
        totalTabPage +
        "<section class='popWindow--tag-box'>\
                    </section>\
                </section>\
            <input type='submit' value='提交' class='popWindow--submit' id='popWindowOthersSubmit'>\
        </section>\
    </form>";


    $('body').prepend(popWindow);
    $('.popWindow--box1-box--select').append("<option value='' selected='selected'>" + airModel.payment + "</option>");

    //初始化pnr tag区域
    initTagArea(airInfoData, airInfoData.airModels[0]);

    console.log(airInfoData.airModels[0]['refund' + airInfoData.Language]);
    console.log(airInfoData.Language);
    console.log(airInfoData.airModels[0].payment);



    //切换标签页
    $('.popWindow--tag-title').unbind('click').click(function () {
        var tabIndex = 0;
        //如果点击的标签不是活动的，就切换
        if (!$(this).hasClass('popWindow--tag_title_alive')) {
            $(this).addClass('popWindow--tag_title_alive').siblings().removeClass('popWindow--tag_title_alive');
            tabIndex = $(this).data('tab');
            //初始化内容
            initTagArea(airInfoData, airInfoData.airModels[tabIndex]);

        }
    })

    //关闭页面
    $("body").on('click', '.popWindow--others-close', function () {
        $('#MiscellaneousAndPrice').remove();
        return true;
    })
    //提交页面
    $("body").on('click', '#popWindowOthersSubmit', function () {

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
        changeNewUid(orderNo);
    })
    return popWindow;
}


//获取机票杂项信息
function getOrderFinishDetail(jsonObj) {
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
                var res = JSON.parse(data);
                var airInfo = new AirFinishModel(res, jsonObj.request.Language);  //初始化实例，需要引入airFinishmodel

                initPopWindow(airInfo); //插入弹窗
                console.log(airInfo);

            },
            error: function () {

            }
        }
    );
}

/******************
    打开机票杂项弹窗
    res: 成功预订机票返回的参数
    orderNo: 订单号
    isTA: 判断是否存在TAnumber
********************/
function airBookOthersPopUp(res, orderNo, isTA) {
    getOrderFinishDetail(res);
    console.log(res, orderNo, isTA);

};