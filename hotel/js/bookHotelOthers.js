var editFlag = 0; //0是编辑，1是保存
var priceInternalInformation = document.querySelector('#popWindowInternalInformation'); //内部员工信息
var ORDERNO = '';
var USERID = $.session.get('netLoginId').split('\"')[1];
var hotelInfo; //实例化对象
var lan = $.session.get('obtLanguage');

//中英文字典,get_lan
var Others_CN = {
    'OthersTitle': '杂项及价格',
    'HotelTitle': '入住酒店信息',
    'ArrivalEarlist': '最早到店时间：',
    'HouseType': '房型：',
    'BroadBand': '宽带：',
    'ArrivalLatest': '最晚到店时间：',
    'BedType': '床型：',
    'Breakfast': '早餐：',
    'RoomNumber': '房间数：',
    'PriceInfo': '价格信息',
    'SalesPrice': '销售价：',
    'RetailPrice': '门市价：',
    'CustomFullPrice': '自定义全价：',
    'ServiceFee': '服务费：',
    'LowstPrice': '最低价：',
    'CustomLowstPrice': '自定义最低价：',
    'CurrencyCode': '货币代码：',
    'HotelPaymentMethod': '酒店支付方式：',
    'PromotionCode': '优惠代码：',
    'CheckOutPolicy': '退房政策：',
    'Memo': '备注：',
    'InternalDiscussion': '内部交流：',
}
var Others_EN = {
    'ConfirmNo': 'Confirm No:',
}
function __get_lan_hotelOthers(m) {
    //获取文字
    var lan = $.session.get('obtLanguage');     //语言版本
    //选取语言文字
    switch (lan) {
        case 'CN':
            var t = Others_CN[m];
            break;
        case 'EN':
            var t = Others_EN[m];
            break;
        default:
            var t = Others_CN[m];
    }
    if (t == undefined) t = Others_CN[m];
    if (t == undefined) t = Others_EN[m];

    return t;
}
var newOperationMessageJsonObj = {
    id: $.session.get('netLoginId').split('\"')[1],
    orderNo: '',
    mid: '',
    content: '',
    Language: ''
}

function wholeDayHours() {
    var arr = [];
    for (var i = 0; i <= 24; i++) {
        arr.push(i + ':00');
    }
    return arr;
}
var inputTypes = [
    'number','text','selectInput'
]
//弹窗html
function popOtherWindow(hotelModelData) {
    var hotelModel = hotelModelData.hotelModels[0];
    var mapLanguage = lan == 'CN' ? 'Cn' : 'En';
    //一行三个的组件元素值
    var bookInHotelInfo = [
        {
            name: 'firstTime', //model.OperationLanguage的名字
            tagName: 'firstTime',  //标签上的名字, 事件触发
            dataName: 'firstTime',
            //数据名字，用于保存数据, 
            //可以用'-'链接，第一项是hotelModels的属性名，第二项是该属性数组下的子属性名
            //可以用'__'（2个下划线）链接，链接hotelModels内的多个属性，value值也相应用'__'
            options: wholeDayHours(),
            defaultValue: 'firstTime', //默认值，对应读取hotelModel的属性名
            type: 'select',//设置input类型。    selectInput: select+input控件（自定义）
            // isShowCode: true     //对于options是code-name数组对对象的的元素生效，控制是否在选项中显示code
        }, {
            name: 'roomType',
            tagName: 'roomTypeCode',
            dataName: 'roomTypeCode__roomType',
            options: hotelModelData.hotelModels[0].roomTypeMap,
            defaultValue: 'roomTypeCode',
            type: 'select',
            isShowCode: true
        }, {
            name: 'lanType',
            tagName: 'lanTypeCode',
            dataName: 'lanTypeCode__lanType',
            options: hotelModelData.hotelModels[0].lanTypeMap,
            defaultValue: 'lanTypeCode',
            type: 'select',
            isShowCode: true
        }, {
            name: 'lastTime',
            tagName: 'lastTime',
            dataName: 'lastTime',
            options: wholeDayHours(),
            defaultValue: 'lastTime',
            type: 'select'
        }, {
            name: 'bedType',
            tagName: 'bedTypeCode',
            dataName: 'bedTypeCode__bedType',
            options: hotelModelData.hotelModels[0].bedTypeMap,
            defaultValue: 'bedTypeCode',
            type: 'select',
            isShowCode: true
        }, {
            name: 'breakfastType',
            tagName: 'breakfastCode',
            dataName: 'breakfastCode__breakfast',
            options: hotelModelData.hotelModels[0].breakfastTypeMap,
            defaultValue: 'breakfastCode',
            type: 'select',
            isShowCode: false
        }, {
            name: 'roomNum',
            tagName: 'roomNum',
            dataName: 'roomNum',
            defaultValue: 'roomNum',
            type: 'number'
        }
    ]
    var priceInfo = [
        {
            name: 'dailyRate', //model.OperationLanguage的名字
            tagName: 'dailyRate',  //标签上的名字, 事件触发
            dataName: 'fare-dailyRate',
            //数据名字，用于保存数据, 
            //可以用'-'链接，第一项是hotelModels的属性名，第二项是该属性数组下的子属性名
            //可以用'__'（2个下划线）链接，链接hotelModels内的多个属性，value值也相应用'_'
            defaultValue: 'dailyRate', //默认值，对应读取hotelModel的属性名
            type: 'number'//设置input类型。    selectInput: select+input控件（自定义）
        }, {
            name: 'fullRate',
            tagName: 'fullRate',
            dataName: 'fare-fullRate',
            defaultValue: 'fullRate',
            type: 'number'
        }, {
            name: 'fullRate_cus',
            tagName: 'fullRate_cus',
            dataName: 'fare-fullRate_cus',
            defaultValue: 'fullRate_cus',
            type: 'number'
        }, {
            name: 'handlingfee',
            tagName: 'handlingfee',
            dataName: 'fare-handlingfee',
            defaultValue: 'handlingfee',
            type: 'number'
        }, {
            name: 'lowRate',
            tagName: 'lowRate',
            dataName: 'fare-lowRate',
            defaultValue: 'lowRate',
            type: 'number'
        }, {
            name: 'lowRate_cus',
            tagName: 'lowRate_cus',
            dataName: 'fare-lowRate_cus',
            defaultValue: 'lowRate_cus',
            type: 'number'
        }, {
            name: 'currency',
            tagName: 'currency',
            dataName: 'currency__currencyDesc',
            defaultValue: 'currency',
            options: [
                { code: "CNY", nameCn: "人民币", nameEn: "CNY" }
            ],
            type: 'select',
            isShowCode: true
        }, {
            name: 'payType',
            tagName: 'payType',
            dataName: 'payType',
            defaultValue: 'payType',
            options: [
                { code: "N", nameCn: "酒店现付", nameEn: "酒店现付" },
                { code: "P", nameCn: "预付", nameEn: "预付" },
                { code: "S", nameCn: "代收代付", nameEn: "代收代付" }
            ],
            type: 'select',
            isShowCode: true
        }, {
            name: 'confirmNumber',
            tagName: 'confirmNumber',
            dataName: 'confirmNumber',
            defaultValue: 'confirmNumber',
            type: 'text'
        }
    ]
    var theThirdPartWholeLine = [
        {
            name: 'reasonCode',
            tagName: 'reasonCode',
            dataName: 'reasonCode__reasonCodeDesc',
            defaultValue: 'reasonCode',
            options: [
                { code: hotelModelData.hotelModels[0].reasonCode, nameCn: hotelModelData.hotelModels[0].reasonCodeDesc, nameEn: hotelModelData.hotelModels[0].reasonCodeDesc },
            ],
            type: 'select',
            isShowCode: true
        },{
            name: 'cancelPolicy',
            tagName: 'cancelPolicy',
            dataName: 'cancelPolicy',
            defaultValue: 'cancelPolicy',
            options:[
                hotelModelData.hotelModels[0].cancelPolicy
            ],
            type: 'select'
        },{
            name: 'memo',
            tagName: 'memo',
            dataName: 'memo',
            defaultValue: 'memo',
            type: 'textarea'
        },{
            name: 'internalMsg',
            tagName: 'internalMsg',
            dataName: 'content',
            defaultValue: 'content',
            type: 'textarea'
        },
    ]
    //基本方法，根据数组创建html
    //item： 数组对象↑，number：一行几个元素
    function createInputHtml(item, number) {
        //控制样式，一行几个元素
        switch (number) {
            case 3:
                var inputStyleClass = {
                    box: 'flex-box popWindow--tag--one-third-box',
                    description: 'popWindow--tag--des-3',
                    input: 'popWindow--tag--input-3'
                };
                break;
            case 1:
                var inputStyleClass = {
                    box: 'popWindow--others-bodyBox--wholeLineBox',
                    description: 'popWindow--tag--des-1',
                    input: 'popWindow--tag--input-1'
                };
                if(item.name=='internalMsg'){
                    inputStyleClass.box+=' popWindow--tag--internalMsg-Box';
                }
                break;
            default:
                var inputStyleClass = {
                    box: 'popWindow--others-bodyBox--wholeLineBox',
                    description: 'popWindow--tag--des-1',
                    input: 'popWindow--tag--input-1'
                };
                break;
        }
        var dataValue = hotelModel[item.defaultValue] ? hotelModel[item.defaultValue] : '';
        var elementHtml = "<div class='" + inputStyleClass.box + "'>\
                            <span class='popWindow--tag-nameOfInputItems "+ inputStyleClass.description + "'>" + hotelModelData.description[item.name] + ":</span>";
        if (inputTypes.includes(item.type)) {
            var input = { type: item.type, min: '' };
            if (input.type == "number") {
                input.min = "min='0'";
            }
            elementHtml += "<input type='" + input.type + "' class='" + inputStyleClass.input + " popWindow--tag--" + item.tagName + "Input' data-class='hotelModels' data-name='" + item.dataName + "' value='" + dataValue + "' " + input.min + ">"
        }
        switch (item.type) {
            case "selectInput":
                //还没用过，没调整样式
                elementHtml += "<div class='popWindow--tag--" + item.tagName + "-select popWindow--tag--third-select' style='display:none'>";
                item.options.map(function (option) {
                    elementHtml += "<div value='" + option + "' class='popWindow--tag--" + item.tagName + "-option popWindow--tag--third-option' data-select='" + item.tagName + "'>" + option + "</div>"
                })
                elementHtml += "</div>";
                break;
            case "select":
                //select 都是用code和nameCN or nameEN
                elementHtml += "<select name='' class='" + inputStyleClass.input + " popWindow--tag--" + item.tagName + "Input' data-class='hotelModels' data-name='" + item.dataName + "' value='" + dataValue + "'>"
                item.options.map(function (option) {
                    var value = option.code || option;
                    if(option.code){
                        if(item.isShowCode){
                            var text = option.code + '-' + option['name' + mapLanguage];
                        }else{
                            var text = option['name' + mapLanguage];
                        }
                    }else{
                        var text = option;
                    }
                    // var text = option.code ? 
                    //         (option.code + '-' + option['name' + mapLanguage]) : option;
                    var selected = value == dataValue ? 'selected' : '';
                    //dataName判断'__'，有下划线的，拼接code和text到value
                    if (item.dataName.indexOf('__')) {
                        // value = value + '__' + text;
                        try {
                            value = option.code + '__' + option['name' + mapLanguage];
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    elementHtml += "<option value='" + value + "' " + selected + ">" + text + "</option>"
                })
                elementHtml += "</select>";
                break;
            case "textarea":
                elementHtml += "<textarea name='' cols='30' rows='10' class='popWindow--others-bodyBox--input " + inputStyleClass.input + " popWindow--tag--" + item.tagName + "Input' data-class='hotelModels' data-name='" + item.dataName + "' value='" + dataValue + "'></textarea>"
        }
        elementHtml += "<div class='popWindow--tag--Img' id='popWindowImg" + item.tagName + "'></div>\
                    </div>";
        return elementHtml;
    }
    //遍历flexArr，把内部元素放到容器里，如果有firstItem，firstItem放在第一个
    //flexArr: 数据数组，getHTML: 获取哪个HTML
    function oneThirdSelectInputElement_Line(flexArr, getHTML, firstItem) {
        var firstItem = firstItem || '';
        var html = "<div class='flex-justify-between'>"
        //遍历一行两个的组件元素数组往后添加
        flexArr.map(function (item, index) {
            html += getHTML(item, 3);
        })
        html += "</div>";
        return html;
    }
    function oneItemOneLine(flexArr, getHTML, firstItem) {
        var firstItem = firstItem || '';
        var html = ""
        //遍历一行两个的组件元素数组往后添加
        flexArr.map(function (item, index) {
            html += getHTML(item, 1);
        })
        return html;
    }
    var otherWindowHTML =
        "<form action='' id='MiscellaneousAndPrice'>\
            <div class='mask'></div>\
            <section class='popWindow--others'>\
                <div class='popWindow--others-titleBox'>\
                    <h3 class='popWindow--others-title'>"+ __get_lan_hotelOthers("OthersTitle") + "</h3>\
                    <img src='./images/close_window.png' alt='close' class='popWindow--others-close'>\
                </div>\
                    <span class='popWindow--PNR--name'>PNR: "+ hotelModelData.hotelModels[0].PNR + "</span>\
                    <p class='popWindow--others-bodyBox--title'><strong>"+ __get_lan_hotelOthers("HotelTitle") + "</strong></p>"
        otherWindowHTML += oneThirdSelectInputElement_Line(bookInHotelInfo, createInputHtml);
        otherWindowHTML += "<p class='popWindow--others-bodyBox--title'><strong>" + __get_lan_hotelOthers("PriceInfo") + "</strong></p>"
        otherWindowHTML += oneThirdSelectInputElement_Line(priceInfo, createInputHtml);
        otherWindowHTML += oneItemOneLine(theThirdPartWholeLine, createInputHtml);
        otherWindowHTML+="<div class='popWindow--submit' id='popWindowOthersSubmit'>提交</div>\
            </section>\
        </form>";
    $('body').append(otherWindowHTML);
    dataChangeEvent();
    //关闭页面
    $("body").on('click', '.popWindow--others-close', function () {
        $('#MiscellaneousAndPrice').remove();
        return true;
    })
    //提交页面
    $("body").on('click', '#popWindowOthersSubmit', function () {
        hotelInfo.id = USERID;
        var jsonObj = {
            request: hotelInfo
        };
        // modifyHotelInfomation(jsonObj);
    })
}
//修改酒店信息
//jsonObj: object 接口请求的json对象
function modifyHotelInfomation(jsonObj) {
    $('body').mLoading("show");
    var operationMsgAddedFlag = false;
    var temp = hotelInfo.hotelModels.map(function (item, index) {
        operationMsgAddedFlag = AddNewOperationMessage(index);
    });
    if (operationMsgAddedFlag) {
        $.ajax(
            {
                type: 'post',
                url: $.session.get('ajaxUrl'),
                dataType: 'json',
                data: {
                    // url: $.session.get('obtCompany') + "/OrderService.svc/ModifyAirInfomation", //等接口
                    jsonStr: JSON.stringify(jsonObj)
                },
                success: function (data) {
                    $('body').mLoading("hide");
                    var res = JSON.parse(data);
                    console.log(res);
                    if (res.code == 200) {
                        //关闭弹窗
                        $('#MiscellaneousAndPrice').remove();
                        if ($.session.get("TAnumber") && !$.session.get("TAnumberIndex")) {
                            $.session.remove("TAnumber");
                            $.session.remove("TACustomerId");
                        }
                        changeNewUid(orderNo);
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
//获取酒店杂项信息
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
                console.log('GetOrderFinishDetail');
                console.log(res);
                if (res.code == '200') {
                    hotelInfo = new OrderFinishModel(res, jsonObj.request.Language);  //初始化实例，需要引入orderFinishmodel
                    popOtherWindow(hotelInfo); //插入弹窗
                } else {
                    alert('error');
                }
            },
            error: function () {

            }
        }
    );
}
//提交表单
function submitForm() {
    var internalMsg = $('.popWindow--tag--internalMsg-Box').val();
    if (internalMsgValidChecking(internalMsg)) {
        hotelInfo.id = USERID;
        // setDefaultUserData(hotelInfo);
        var jsonObj = {
            request: hotelInfo
        };
        modifyHotelInfomation(jsonObj);
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
        // priceLimitCheckFn(this);
        saveDataFn(this);
        console.log($(this).val());
    })
    $('select').bind('change', function () {
        saveDataFn(this);
        console.log($(this).val());
    })
    //退票和改签下拉列表赋值
    //获取元素data-select的值，将值拼接成.popWindow--tag--xxxInput的形式保存
    $('div[data-select]').bind('click', function () {
        var select = $(this).data('select');
        console.log(select);
        var inputDom = '.popWindow--tag--' + select + 'Input';
        $(inputDom).val($(this).text());
        saveDataFn(inputDom);
    })
}
//将页面项目保存到对象
function saveDataFn(dom) {
    if ($(dom).data('class') == 'hotelModels') {
        var hotelModelsIndex = 0;
        //如果是能data-name拆成数组的，第一项是hotelModels的属性名，第二项是该属性下的子属性名
        var nameArr = $(dom).data('name').split('-');
        var newData = $(dom).val();
        if (nameArr[1]) {
            var subIndex = $(dom).data('index');
            //否则正常保存
            //例: hotelInfo.hotelModels[0].fares[0].fare
            if(subIndex){
                hotelInfo.hotelModels[hotelModelsIndex][nameArr[0]][subIndex][nameArr[1]] = newData; //有index的话，是对象数组对象
            }else{
                hotelInfo.hotelModels[hotelModelsIndex][nameArr[0]][nameArr[1]] = newData;
            }
            console.log(hotelInfo.hotelModels[hotelModelsIndex][nameArr[0]]);
        } else if ($(dom).data('name').indexOf('__')) {
            //暂时不存在中划线和双下划线共存的情况
            nameArr = $(dom).data('name').split('__');
            newData = $(dom).val().split('__');
            nameArr.map(function (value, index) {
                hotelInfo.hotelModels[hotelModelsIndex][value] = newData[index];
            })
        } else {
            //例: hotelInfo.hotelModels[0].fullFare
            hotelInfo.hotelModels[hotelModelsIndex][nameArr[0]] = newData;
            console.log(hotelInfo.hotelModels[hotelModelsIndex][nameArr[0]]);
        }

    } else if ($(dom).data('class') == 'createCustomers') {
        resetCreateCustomer($(dom).val());
    }
    console.log(hotelInfo.hotelModels[0]);
}
//添加内部交流
// index: tab 编号
function AddNewOperationMessage(index) {
    $('body').mLoading("show");
    // newOperationMessageJsonObj.id = '3259c417-82bc-46ad-ac84-14627e81ffb9';
    newOperationMessageJsonObj.orderNo = ORDERNO;
    newOperationMessageJsonObj.mid = hotelInfo.hotelModels[index].orderRid;
    newOperationMessageJsonObj.content = hotelInfo.hotelModels[index].content;
    newOperationMessageJsonObj.Language = hotelInfo.Language;
    var response = '';
    $.ajax({
        type: 'post',
        url: $.session.get('ajaxUrl'),
        dataType: 'json',
        async: false,
        data: {
            url: $.session.get('obtCompany') + "/OrderService.svc/AddNewOperationMessage",
            jsonStr: JSON.stringify(newOperationMessageJsonObj)
        },
        success: function (data) {
            $('body').mLoading("hide");
            var res = JSON.parse(data);
            console.log(res);
            if (res.code == 200) {
                response = true;
            } else {
                alert(res.code + ":" + res.message);
                response = false;
            }
        },
        error: function (data) {
            alert(data);
            response = false;
        }
    })
    return response;
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
//检查（非）优惠代码
function GetReasonListPost() {
    $('body').mLoading("show");
    TABINDEX = $('.popWindow--tag_title_alive').data('tab');
    reasonListPostJsonObj.OrderID = hotelInfo.hotelModels[TABINDEX].orderRid;
    reasonListPostJsonObj.FullFare = hotelInfo.hotelModels[TABINDEX].fullFare;
    reasonListPostJsonObj.CurrentFare = hotelInfo.hotelModels[TABINDEX].fares[0].fare - hotelInfo.hotelModels[TABINDEX].fares[0].rangPer2;
    reasonListPostJsonObj.CompanyID = $.session.get('companyID');
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
                if (reason.FavorableReasonList.length != 0 || reason.FavorableUnReasonList.length != 0) {
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
                hotelInfo.hotelModels[TABINDEX].reason = $('#airOthersReason').val();
                hotelInfo.hotelModels[TABINDEX].unreason = $('#airOthersUnreason').val();

            },
            error: function () {

            }
        }
    );
}
//设置默认用户数据
function setDefaultUserData(obj) {
    //USERID前后带引号，要把引号去掉，不知道为什么要带引号保存。。。
    obj.id = $.session.get('netLoginId').split('\"')[1];
}
function hotelBookOthersPopUp(res, orderNo) {
    getOrderFinishDetail(res);
    ORDERNO = orderNo;
    console.log(res, orderNo);
};