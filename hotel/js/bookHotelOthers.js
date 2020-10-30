var editFlag = 0; //0是编辑，1是保存
var priceInternalInformation = document.querySelector('#popWindowInternalInformation'); //内部员工信息
var ORDERNO = '';
var USERID = $.session.get('netLoginId').split('\"')[1];
var hotelInfo; //实例化对象

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


//弹窗html
function popOtherWindow() {
    var otherWindowHTML =
        "<form action='' id='MiscellaneousAndPrice'>\
        <div class='mask'></div>\
        <section class='popWindow--others'>\
            <div class='popWindow--others-titleBox'>\
                <h3 class='popWindow--others-title'>"+ __get_lan_hotelOthers("OthersTitle") + "</h3>\
                <img src='./images/close_window.png' alt='close' class='popWindow--others-close'>\
            </div>\
            <div class='popWindow--others-bodyBox'>\
                <span class='popWindow--PNR--name'>PNR: QFQKWW 艺龙</span>\
                <p class='popWindow--others-bodyBox--title'><strong>"+ __get_lan_hotelOthers("HotelTitle") + "</strong></p>\
                <div class='popWindow--others-bodyBox--formBox'>\
                    <div>\
                        <span class='popWindow--others-bodyBox--description'>"+ __get_lan_hotelOthers("ArrivalEarlist") + "</span>\
                        <select name='' id='' class='popWindow--others-bodyBox--input'>\
                            <option value='14'>14:00</option>\
                        </select>\
                    </div>\
                    <div>\
                        <span class='popWindow--others-bodyBox--description'>"+ __get_lan_hotelOthers("HouseType") + "</span>\
                        <select name='' id='' class='popWindow--others-bodyBox--input'>\
                            <option value='B'>B-商务房</option>\
                        </select>\
                    </div>\
                    <div>\
                        <span class='popWindow--others-bodyBox--description'>"+ __get_lan_hotelOthers("BroadBand") + "</span>\
                        <select name='' id='' class='popWindow--others-bodyBox--input'>\
                            <option value='1'>包含宽带</option>\
                        </select>\
                    </div>\
                    <div>\
                        <span class='popWindow--others-bodyBox--description'>"+ __get_lan_hotelOthers("ArrivalLatest") + "</span>\
                        <select name='' id='' class='popWindow--others-bodyBox--input'>\
                            <option value='18'>18:00</option>\
                        </select>\
                    </div>\
                    <div>\
                        <span class='popWindow--others-bodyBox--description'>"+ __get_lan_hotelOthers("BedType") + "</span>\
                        <select name='' id='' class='popWindow--others-bodyBox--input'>\
                            <option value='K'>K-大床</option>\
                        </select>\
                    </div>\
                    <div>\
                        <span class='popWindow--others-bodyBox--description'>"+ __get_lan_hotelOthers("Breakfast") + "</span>\
                        <select name='' id='' class='popWindow--others-bodyBox--input'>\
                            <option value='n'>不含早餐</option>\
                        </select>\
                    </div>\
                    <div>\
                        <span class='popWindow--others-bodyBox--description'>"+ __get_lan_hotelOthers("RoomNumber") + "</span>\
                        <input type='number' class='popWindow--others-bodyBox--input' value='1'>\
                    </div>\
                </div>\
                <p class='popWindow--others-bodyBox--title'><strong>"+ __get_lan_hotelOthers("PriceInfo") + "</strong></p>\
                <div class='popWindow--others-bodyBox--formBox'>\
                    <div>\
                        <span class='popWindow--others-bodyBox--description'>"+ __get_lan_hotelOthers("SalesPrice") + "</span>\
                        <input type='number' class='popWindow--others-bodyBox--input' value='1'>\
                    </div>\
                    <div>\
                        <span class='popWindow--others-bodyBox--description'>"+ __get_lan_hotelOthers("RetailPrice") + "</span>\
                        <input type='number' class='popWindow--others-bodyBox--input' value='1'>\
                    </div>\
                    <div>\
                        <span class='popWindow--others-bodyBox--description'>"+ __get_lan_hotelOthers("CustomFullPrice") + "</span>\
                        <input type='number' class='popWindow--others-bodyBox--input' value='1'>\
                    </div>\
                    <div>\
                        <span class='popWindow--others-bodyBox--description'>"+ __get_lan_hotelOthers("ServiceFee") + "</span>\
                        <input type='number' class='popWindow--others-bodyBox--input' value='1'>\
                    </div>\
                    <div>\
                        <span class='popWindow--others-bodyBox--description'>"+ __get_lan_hotelOthers("LowstPrice") + "</span>\
                        <input type='number' class='popWindow--others-bodyBox--input' value='1'>\
                    </div>\
                    <div>\
                        <span class='popWindow--others-bodyBox--description'>"+ __get_lan_hotelOthers("CustomLowstPrice") + "</span>\
                        <input type='number' class='popWindow--others-bodyBox--input' value='1'>\
                    </div>\
                    <div>\
                        <span class='popWindow--others-bodyBox--description'>"+ __get_lan_hotelOthers("CurrencyCode") + "</span>\
                        <select name='' id='' class='popWindow--others-bodyBox--input'>\
                            <option value='CNY'>CNY-人民币</option>\
                        </select>\
                    </div>\
                    <div>\
                        <span class='popWindow--others-bodyBox--description'>"+ __get_lan_hotelOthers("HotelPaymentMethod") + "</span>\
                        <select name='' id='' class='popWindow--others-bodyBox--input'>\
                            <option value='N'>N-酒店现付</option>\
                            <option value='P'>P-预付</option>\
                            <option value='S'>S-代收代付</option>\
                        </select>\
                    </div>\
                    <div>\
                        <span class='popWindow--others-bodyBox--description'>"+ __get_lan_hotelOthers("ConfirmNo") + "</span>\
                        <input type='text' class='popWindow--others-bodyBox--input'>\
                    </div>\
                </div>\
                <div class='popWindow--others-bodyBox--wholeLineBox'>\
                    <span class='popWindow--others-bodyBox--description'>"+ __get_lan_hotelOthers("PromotionCode") + "</span>\
                    <select type='' class='popWindow--others-bodyBox--input'>\
                        <option value=''></option>\
                    </select> \
                </div>\
                <div class='popWindow--others-bodyBox--wholeLineBox'>\
                    <span class='popWindow--others-bodyBox--description'>"+ __get_lan_hotelOthers("CheckOutPolicy") + "</span>\
                    <select type='' class='popWindow--others-bodyBox--input'>\
                        <option value=''></option>\
                    </select> \
                </div>\
                <div class='popWindow--others-bodyBox--wholeLineBox'>\
                    <span class='popWindow--others-bodyBox--description'>"+ __get_lan_hotelOthers("Memo") + "</span>\
                    <textarea name='' cols='30' rows='10' class='popWindow--others-bodyBox--input'></textarea>\
                </div>\
                <div class='popWindow--others-bodyBox--wholeLineBox'>\
                    <span class='popWindow--others-bodyBox--description'>"+ __get_lan_hotelOthers("InternalDiscussion") + "</span>\
                    <textarea name='' cols='30' rows='10' class='popWindow--others-bodyBox--input' id='popWindowInternalInformation'></textarea>\
                </div>\
            </div>\
            <div class='popWindow--submit' id='popWindowOthersSubmit'>提交</div>\
        </section>\
    </form>";
    $('body').append(otherWindowHTML);
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
    var temp = hotelInfo.airModels.map(function (item, index) {
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

function hotelBookOthersPopUp(res, orderNo) {
    getOrderFinishDetail(res);
    ORDERNO = orderNo;
    console.log(res, orderNo);
};