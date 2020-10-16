var netUserId = $.session.get('netLoginId');
var obtLanguage = $.session.get('obtLanguage');
var finishedInfo = JSON.parse($.session.get('finishedInfo'));
console.log(finishedInfo);
var orderNo = finishedInfo.orderNo;
var orderDetaile=''
// var orderNo = JSON.parse($.session.get('searchOrderInfo')).orderNo;
var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));
//中英文对象
var cn = {
	"tipsClass":"",
	"tipsText":"需要您自行完成支付后才能出票，请选择支付方式",
	"addTrip":"添加行程",
    "clickRemind":"点击可继续预订",
    "onlinePayRemind":"请选择支付方式",
    "purchaseRemind":"I have read and accept the fare rules, booking conditions for hotel including cancellation policy and any other conditions applicable for this itinerary.",
    "purchaseCheckText":"I accept(must be ticked to continue with reservation)",
    "purchaseTrip":"Purchase Trip",
    "startOver":"Start Over",
    "startOverRemind":"",
    "purchaseTripRemind":"Please read and accept the rules before you purchase trip.",
    "searchHotelRemind":"Do you want to continue booking hotels?",
    "purchaseBtnRemind":"You are about to purchase a reservation, If you choose to proceed, your credit card may be charged. Click OK to confirm your purchase or click CANCEL.",
    "continueUl":{
        'air':"机票",
        'hotel':"酒店",
        'train':"火车",
    },
	"remarkPop":{
	    "businessTripTittle":"出差信息：",
	    "remarkInfoTittle":"账单信息：",
	    "tripNameTittle":"员工姓名",
	    "tripCompanyTittle":"公司",
	    "confirm":"确认",
	    "cancel":"取消",
	    "companyRemindTittle":"温馨提示",
	    "companyRemindText":"因为您已更换出差公司，请确认更改后的公司抬头信息是否正确。",
        "modifySuccess":"修改成功",
        "Choose":"请选择",
        "search":"请搜索",
        "remarkInfoRemind":"红色标志为必填项",
        "remarkRemind":"请将红色备注项填写完整",
	},
	'orderInfo':{
		'OrderNo':"订单号：",
		'BookTime':"预订时间：",
		'State':"订单状态：",
		'OrderFare':"总金额：",
        'OrderCustomer':'旅客姓名：',
        'goOnBook':"继续预订",
        "approval":"提交审核",
        "cancelapproval":"取消审核",
        "cancelapprovalRemind":"请确认是否要取消审核?",
        "ticket":"出票",
        "ticketRemind":"提交出票成功",
        'onlinePay':"在线支付",
        'uploadFile':"上传审核单",
	},
	'orderCustomerInfo':{
		'orderCustomerTittle':'旅客信息：',
		"popNameCn":"中文姓名:",
		"popNameEn":"英文姓名:",
		"popPhone":"手机号码:",
		"PsgType":"旅客类别:",
		"popDocuments":"证件信息:",
		"remarks":"账单信息",
	},
	'orderDetailsTabBar':{
		'airTicket':'机票',
		'hotel':'酒店',
		'train':'火车',
        'otherExpenses':"其他费用",
	},
	'orderDetails':{
		'orderDetails':"订单详情",
		'orderState':"订单状态：",
		'price':"总金额：",
		'cabin':'舱位： ',
		'craft':'机型：',
		'seat':'座位类型：',
		'orderCancel':'取消订单',
		'orderModify':'修改',
		'orderExtend':'延住',
		'onlineCheckIn':'在线值机',
		'refund':'退票',
		'endorse':'改签',
        'CancelPolicy':"取消政策：",
		'address':"地址：",
		'RoomName':"房型：",
		'BedName':"床型：",
		'Breakfast':"早餐：",
		'Rooms':"房间数：",
		'Nights':"入住天数：",
		'cancelRemind':"确定取消吗？",
        "cancelSuccess":"取消成功",
		'alterMessage':'确定改签吗？',
		'alterRemind':'请联系线下改签',
        'TicketDate':"出票时限：",
        'TicketNo':"票号：",
        'Rebooking':'改签规则:',
        'Refund':'退票规则:',
        'Res':'变更规则:',
        'CancelDeadLine':'最晚取消时间:',
        'PayType':"支付方式:",
        'CabinCustomerName':"同住人:",
        'LastTime':'最晚到店时间:',
        'selectSeat':"在线选座",
        'passengerSeatInfo':"座位/餐食信息",
        'selectSeatRemind':"该航班无座位图可选",
        'AirlineReference':"航空公司大编号：",
		'SeatNo': '座位号:',
		'CoachNo': '车厢:',
		'trainTicketNo': '取票号:',
	},
    "GKbookingPop":{
        "GKbookingBodyTittle":"提交你的酒店信息",
        "GKRemindText":"您的机票经过一夜并且没有预订酒店，请选择一项让我们知道你住在哪里。",
        "city":"请选择入住的城市:",
        "hotel":"请输入入住的酒店:",
        "address":"请输入入住的地址",
        "checkIn":"入住时间:",
        "CheckOut":"离店时间:",
        "search":"搜索",
        "searchRemind":"请正确填写！",
    },
    "selectSeatPop":{
        "notes":"图标说明:",
        "available":"可选择",
        "blocked":"不可选择",
        "select":"当前选择",
        "ocuppied":"他人已选",
        "selectRemind":"请选择完座位。",
    },
    "combineOrderPop":{
        "RemindText":"你的行程是单程，请选择一个订单去合并:",
        "option":"我不需要合并我的订单",
    },
    "onlinePayPop":{
        "yeePay":"易宝支付",
        "alipay":"支付宝",
        "wechat":"微信支付",
    },
    "otherExpensesList":{
        "miscell":"杂项",
        "amount":"金额",
        "remark":"备注",
        "companyPay":"公司支付",
        "modify":"修改",
        "save":"保存",
    },
}
var en = {
	"tipsClass":"",
	"tipsText":" can only be issued after you complete the payment. Please choose the payment method",
	"addTrip":"Add to this trip",
    "clickRemind":"Click To Continue Booking",
    "onlinePayRemind":"Please choose the mode of payment",
    "purchaseRemind":"I have read and accept the fare rules, booking conditions for hotel including cancellation policy and any other conditions applicable for this itinerary.",
    "purchaseCheckText":"I accept(must be ticked to continue with reservation)",
    "purchaseTrip":"Purchase Trip",
    "startOver":"Start Over",
    "startOverRemind":"",
    "purchaseTripRemind":"Please read and accept the rules before you purchase trip.",
    "searchHotelRemind":"Do you want to continue booking hotels?",
    "purchaseBtnRemind":"You are about to purchase a reservation, If you choose to proceed, your credit card may be charged. Click OK to confirm your purchase or click CANCEL.",
    "continueUl":{
        'air':"Air",
        'hotel':"Hotel",
        'train':"Train",
    },
	"remarkPop":{
	    "businessTripTittle":"Billing Information：",
	    "remarkInfoTittle":"Remarks：",
	    "tripNameTittle":"Employee Name",
	    "tripCompanyTittle":"Company",
	    "confirm":"Confirm",
	    "cancel":"Cancel",
	    "companyRemindTittle":"Kindly Reminder",
	    "companyRemindText":"Because you have changed the travel company, please confirm whether the company's information is correct after the change.",
        "modifySuccess":"Modification Successful",
        "Choose":"Please Select",
        "search":"Please Search",
        "remarkRemind":"Please complete the mandatory remark.",
        "remarkInfoRemind":"The remark in red is mandatory.",
	},
	'orderInfo':{
		'OrderNo':"Order No：",
		'BookTime':"Booking Time：",
		'State':"Status：",
		'OrderFare':"Total Fare：",
        'OrderCustomer':'Passenger Name:',
        'goOnBook':"Continue Booking",
        "approval":"Submit For Approval",
        "cancelapproval":"Cancel Applicaction",
        "cancelapprovalRemind":"Do you want to cancel the approval?",
        "ticket":"Issue Ticket",
        "ticketRemind":"Ticketing request submit successfully.",
        'onlinePay':"Online Payment",
        'uploadFile':"Upload Approval File",
	},
	'orderCustomerInfo':{
		'orderCustomerTittle':'Passenger Information：',
		"popNameCn":"Chinese Name:",
		"popNameEn":"English Name:",
		"popPhone":"Phone:",
		"PsgType":"Passenger Type:",
		"popDocuments":"Document:",
		"remarks":"Billing Information",
	},
	'orderDetailsTabBar':{
		'airTicket':'Air Ticket',
		'hotel':'Hotel',
		'train':'Train',
        'otherExpenses':"Other Expenses",
	},
	'orderDetails':{
		'orderDetails':"Trip Details",
		'orderState':"Status:",
		'price':"Price:",
		'cabin':'Cabin: ',
		'craft':'Craft：',
		'seat':'Seat:',
		'orderCancel':'Cancel Segment',
		'orderModify':'Modify',
		'orderExtend':'Extend',
		'onlineCheckIn':'Online check-in',
		'refund':'Refund',
		'endorse':'Change',
        'CancelPolicy':"Cancel Policy:",
		'address':"Address:",
		'RoomName':"Room Type:",
		'BedName':"Bed Type:",
		'Breakfast':"Breakfast:",
		'Rooms':"Rooms:",
		'Nights':"Nights:",
		'cancelRemind':"Do you want to cancel the reservation?",
        "cancelSuccess":"Cancel Successful",
		'alterMessage':'Do you want to alter this ticket?',
		'alterRemind':'Please contact offline to alter tickets',
        'TicketDate':"Ticketing Deadline:",
        'TicketNo':"TicketNo:",
        'Rebooking':'Reissue Rule:',
        'Refund':'Refund Rule:',
        'Res':'Reissue Rule:',
        'CancelDeadLine':'Latest Cancellation Time:',
        'PayType':"Pay Type:",
        'CabinCustomerName':"Roommate:",
        'LastTime':'Latest Check-in Time:',
        'selectSeat':"Select Seat",
        'passengerSeatInfo':"Seat/Meal Info",
        'selectSeatRemind':"There is no seat selection map for the segment",
        'AirlineReference':"Airline Reference:",
		'SeatNo': 'Seat No:',
		'CoachNo': ' Coach No:' ,
		'TicketNo': 'E Ticket No:',
	},
    "GKbookingPop":{
        "GKbookingBodyTittle":"Submit your hotel information",
        "GKRemindText":"Your trip has an overnight stay without a hotel reservation. Please select an option below to let us know where you will be staying.",
        "city":"Please enter the city for check in:",
        "hotel":"Please enter the hotel name for check in:",
        "address":"Please enter the address of where you will be staying:",
        "checkIn":"Check-in:",
        "CheckOut":"Check-out:",
        "search":"Search",
        "searchRemind":"Please fill in correctly.",
    },
    "selectSeatPop":{
        "notes":"Notes:",
        "available":"Available",
        "blocked":"Blocked",
        "select":"Select",
        // "ocuppied":"Ocuppied",
        "ocuppied":"Occupied",
        "selectRemind":"Please choose your seat.",
    },
    "combineOrderPop":{
        "RemindText":"Your trip is an one-way trip,please choose an order to combine it:",
        "option":"I don’t need combine my order.",
    },
    "onlinePayPop":{
        "yeePay":"Credit Card",
        "alipay":"Alipay",
        "wechat":"Wechat",
    },
    "otherExpensesList":{
        "miscell":"Miscell",
        "amount":"Amount",
        "remark":"Remark",
        "companyPay":"Company Bill",
        "modify":"Modify",
        "save":"Save",
    },
}
if(ProfileInfo.onlineStyle=="APPLE"){
    cn.remarkPop.remarkInfoRemind = "";
    en.remarkPop.remarkInfoRemind = "";
}
function get_lan(m)
{
    //获取文字
    var lan = $.session.get('obtLanguage');     //语言版本
    //选取语言文字
    switch(lan){
        case 'CN':
            var t = cn[m];
            break;
        case 'EN':
            var t = en[m];
            break;
        default:
            var t = cn[m];
    }
    if(t==undefined) t = cn[m];
    if(t==undefined) t = en[m];
    return t;
}
$(function(){
   showContent();//内容展示
   orderDetails();//
});
function showContent(){
	$(".remarkPop").html('\
	    <div class="businessTripTittle">'+get_lan('remarkPop').businessTripTittle+'</div>\
	    <div class="businessTripBody"></div>\
	    <div class="remarkInfoTittle">'+get_lan('remarkPop').remarkInfoTittle+'</div>\
        <div style="padding-bottom:10px;border-bottom:1px solid #f3f3f3;">\
	      <div class="remarkInfoBody autoScrollY"></div>\
        </div>\
        <div style="box-sizing:border-box;padding-left:20px;font-size:14px;height: 19px;line-height: 19px;" class="colorRed">'+get_lan('remarkPop').remarkInfoRemind+'</div>\
	    <div class="remarkFooter flexRow"></div>\
	    ')
	$("#main").html('\
	    <div class="autoCenter">\
	        <div style="height:10px;"></div>\
	        <div class="orderCustomerInfo">\
	          <div class="orderCustomerTittle">'+get_lan('orderCustomerInfo').orderCustomerTittle+'</div>\
	          <div class="passengerBar flexRow">\
		          <div class="passengerBarLi" style="width:180px;">'+get_lan('orderCustomerInfo').popNameCn+'</div>\
		          <div class="passengerBarLi" style="width:150px;">'+get_lan('orderCustomerInfo').popNameEn+'</div>\
		          <div class="passengerBarLi" style="width:150px;">'+get_lan('orderCustomerInfo').popPhone+'</div>\
		          <div class="passengerBarLi" style="width:300px;">'+get_lan('orderCustomerInfo').popDocuments+'</div>\
		          <div class="passengerBarLi" style="width:170px;">'+get_lan('orderCustomerInfo').PsgType+'</div>\
	          </div>\
	          <div class="passengerList">\
	          </div>\
	        </div>\
	        <div class="orderDetailsBody">\
	          <div class="orderDetailsTittle flexRow">\
	            '+get_lan("orderDetails").orderDetails+'\
	          </div>\
	          <div class="addTripBody">'+get_lan("orderInfo").OrderNo+'<span class="orderNoText" style="margin-left:10px;"></span>\
	            <div class="addTripBtn btnBackColor">'+get_lan("addTrip")+'</div>\
	          </div>\
	          <div class="orderList segmentList hide">\
	            <div class="orderListTittle">'+get_lan("orderDetailsTabBar").airTicket+'</div>\
	          </div>\
	          <div class="orderList hotelList hide">\
	            <div class="orderListTittle">'+get_lan("orderDetailsTabBar").hotel+'</div>\
	          </div>\
	          <div class="orderList trainList hide">\
	            <div class="orderListTittle">'+get_lan("orderDetailsTabBar").train+'</div>\
	          </div>\
	          <div class="OrderFare"><span style="font-size:14px;">'+get_lan("orderInfo").OrderFare+'</span><span class="OrderFareText" style="font-size:20px;margin-left:10px;"></span></div>\
	          <div class="purchaseRemind">'+get_lan("purchaseRemind")+'</div>\
	          <div class="purchaseCheck"><input type="checkbox" class="purchaseCheckbox">'+get_lan("purchaseCheckText")+'</div>\
	          <div class="flexRow">\
	            <div class="startOverBtn">'+get_lan("startOver")+'</div>\
	            <div class="purchaseTripBtn">'+get_lan("purchaseTrip")+'</div>\
	          </div>\
	        </div>\
	    </div>\
	')
}
function orderDetails(){
		$('body').mLoading("show");
		$.ajax( 
		  {
		    type:'post',
		    url : $.session.get('ajaxUrl'),
		    dataType : 'json',
		    data:{
		        url: $.session.get('obtCompany')+"/OrderService.svc/ListDetailPost",
		        jsonStr:'{"orderNo":"'+orderNo+'","id":'+netUserId+',"Language":"'+obtLanguage+'"}'
		    },
		    success : function(data) {
		    	$('body').mLoading("hide");
	            var res = JSON.parse(data)
	            var detailInfo = res;
	            /*跳转链接*/
            	$(".homeTab").unbind("click").click(function(){
            		delectOrder(detailInfo,"home");
            	})
                $(".orderTab").unbind("click").click(function(){
                	delectOrder(detailInfo,"order");
                })
                $(".profilesTab").unbind("click").click(function(){
            		delectOrder(detailInfo,"profile");
                })
              function delectOrder(detailInfo,type){
                    $('body').mLoading("show");
                    $.ajax(
                      {
                        type:'post',
                        url : $.session.get('ajaxUrl'),
                        dataType : 'json',
                        data:{
                            url: $.session.get('obtCompany')+"/OrderService.svc/DeleteOrderPost",
                            jsonStr:'{"orderNo":"'+detailInfo.OrderNo+'","id":'+netUserId+'}'
                        },
                        success : function(data) {
                            $('body').mLoading("hide");
                            var res = JSON.parse(data)
                            console.log(res)
                            if(res=="OK"){
                                if(type=="home"){
                                    window.location.href = '../../index/index.html';
                                }else if(type=="order"){
                                    window.location.href = '../../orders/orders.html';
                                }else if(type=="profile"){
                                    window.location.href = '../../profile/appleProfile.html';
                                }
                            }
                        },
                        error : function() {
                          // alert('fail');
                        }
                      }
                    );
              }
	            console.log(res);
				orderDetaile=res;
	            goOnBook(res);
	            combineOrder(res);
	            // CheckHotelTrip(res);
	            $(".orderNoText").text(res.OrderNo);
	            $(".OrderFareText").text(res.OrderFare);
	            //支付宝信息
	            var out_trade_no = tools.queryString().out_trade_no;
	            var method = tools.queryString().method;
	            var sign = tools.queryString().sign;
	            var auth_app_id = tools.queryString().auth_app_id;
	            var seller_id = tools.queryString().seller_id;
	            var trade_no = tools.queryString().trade_no;
	            if(out_trade_no&&method&&sign&&auth_app_id&&seller_id&&trade_no){
	                $('body').mLoading("show");
	                $.ajax(
	                  {
	                    type:'post',
	                    url : $.session.get('ajaxUrl'),
	                    dataType : 'json',
	                    data:{
	                        url: $.session.get('obtCompany')+"/OrderService.svc/ReceiveOrderPayInfo",
	                        jsonStr:'{"request":{"id":'+netUserId+',"aliPayNO":"'+trade_no+'","language":"'+obtLanguage+'","exMechantNO":"'+out_trade_no+'","payAccount":""}}'
	                    },
	                    success : function(data) {
	                        // $('body').mLoading("hide");
	                        var res = JSON.parse(data);
	                        console.log(res);
	                        if(res.code==200){
	                            // alert("Pay Successfully!");
	                            ticket(detailInfo,"alipay");
	                        }else{
	                            alert(res.message);
	                        }
	                    },
	                    error : function() {
	                      // alert('fail');
	                    }
	                  }
	                );
	            }
	            $(".segmentList").html('');
	            $(".hotelList").html('');
	            $(".trainList").html('');
	            $(".passengerList").html('');
	            /*订单详情*/
	            res.OrderCustomerDetailList.map(function(item,index){
	                $(".passengerList").append('\
	                    <div class="passengerLi flexRow" customerId="'+item.Uid+'">\
	                    <div class="passengerLiDiv ellipsis" style="width:180px;" title="'+item.NameCn+'">'+item.NameCn+'</div>\
	                    <div class="passengerLiDiv ellipsis" style="width:150px;" title="'+item.NameEn+'">'+item.NameEn+'</div>\
	                    <div class="passengerLiDiv passengerPhone" style="width:150px;">'+item.Tel+'</div>\
	                    <div class="passengerLiDiv passengerLiDocuments" style="width:300px;">'+item.DocumentNOs[0]+'</div>\
	                    <div class="passengerLiDiv" style="width:170px;">'+item.PsgType+'</div>\
	                    <div class="passengerLiDiv" style="width:100px;"></div>\
	                    <div class="passengerLiDiv changeRemarkBtn" index="'+index+'"  style="width:130px;text-decoration: underline;color:#1e66ae;cursor:pointer">'+get_lan('orderCustomerInfo').remarks+'</div>\
	                    </div>\
	                    \
	                    ')
	                $(".changeRemarkBtn").unbind("click").click(function(){
	                    var index = parseInt($(this).attr("index"));
	                    var customerId = res.OrderCustomerDetailList[index].Uid;
	                    var employeeName = res.OrderCustomerDetailList[index].NameCn;
	                    remarkInfoPop(customerId,employeeName,res.OrderCustomerDetailList[index].Remarks,'order','','');
	                })
	            })
	            if(res.Segment.length != 0){
	            	$(".segmentList").removeClass("hide");
	            	segmentList(res);
	            }
	            if(res.Hotel.length != 0){
	            	$(".hotelList").removeClass("hide");
	            	hotelList(res);
	            }
	            if(res.Train.length != 0){
	            	$(".trainList").removeClass("hide");
	            	trainList(res);
	            }
	            $(".startOverBtn").unbind("click").click(function(){
	            		$('body').mLoading("show");
	            		$.ajax(
	            		  {
	            		    type:'post',
	            		    url : $.session.get('ajaxUrl'),
	            		    dataType : 'json',
	            		    data:{
	            		        url: $.session.get('obtCompany')+"/OrderService.svc/DeleteOrderPost",
	            		        jsonStr:'{"orderNo":"'+res.OrderNo+'","id":'+netUserId+'}'
	            		    },
	            		    success : function(data) {
	            		    	$('body').mLoading("hide");
	            	            var res = JSON.parse(data)
	            	            console.log(res)
	            	            if(res=="OK"){
	            	            	window.location.href = '../../index/index.html';
	            	            }
	            		    },
	            		    error : function() {
	            		      // alert('fail');
	            		    }
	            		  }
	            		);
	            })
	            $(".purchaseTripBtn").unbind("click").click(function(){
	            	if(!$(".purchaseCheckbox").is(':checked')){
	            		alert(get_lan("purchaseTripRemind"))
	            	}else{
	            		purchaseTrip(detailInfo);
	            	}
	            })
		    },
		    error : function() {
		      // alert('fail');
		    }
		  }
		);
}
function purchaseTrip(orderRes){
	HotelGKBooking(orderRes,'purchase');
}
function combineOrder(detailInfo){
	if(ProfileInfo.SingleAirCombine){
	    openCombineOrderPop();
	    $(".combineOrderPop").html('\
	        <div class="combineOrderTittle"><div class="closeCombineOrderIcon">x</div></div>\
	        <div class="combineOrderBody">\
	          <div class="remindIcon"></div>\
	          <div class="combineRemindText">'+get_lan("combineOrderPop").RemindText+'</div>\
	          <select class="combineOrderSelect"></select>\
	        </div>\
	        <div class="combineOrderFooter flexRow">\
	          <div class="closeCombineBtn">'+get_lan("remarkPop").cancel+'</div>\
	          <div class="sureCombineBtn">'+get_lan("remarkPop").confirm+'</div>\
	        </div>\
	        ')
	    $(".closeCombineOrderIcon,.closeCombineBtn").unbind("click").click(function(){
	        closeCombineOrderPop();
	    })
	    $('body').mLoading("show");
	    var customerIdList = '';
	    detailInfo.OrderCustomerDetailList.map(function(item){
	        customerIdList+=item.Uid;
	        customerIdList+=',';
	    })
	    customerIdList = customerIdList.substring(0,customerIdList.length-1);
	    $.ajax(
	      {
	        type:'post',
	        url : $.session.get('ajaxUrl'),
	        dataType : 'json',
	        data:{
	          url: $.session.get('obtCompany')+"/OrderService.svc/GetMergeOrderList",
	          jsonStr:'{"request":{"BCN":"'+detailInfo.OrderNo+'","customerIdList":['+customerIdList+'],"id":'+netUserId+'}}'
	        },
	        success : function(data) {
	           $('body').mLoading("hide");
	           var res = JSON.parse(data);
	           console.log(res);
	           if(res.length==0){
	            closeCombineOrderPop();
	            CheckHotelTrip(detailInfo);
	           }else{
	            res.map(function(item){
	                var hotelName = obtLanguage=="CN"?item.hotelName_CN:item.hotelName_EN;
	                $(".combineOrderSelect").append('\
	                    <option value="'+item.orderNo+'">'+hotelName+' '+item.checkIn.split(' ')[0]+'~'+item.checkOut.split(' ')[0]+'</option>\
	                    ')
	            })
	            $(".combineOrderSelect").append('\
	                <option value="no">'+get_lan("combineOrderPop").option+'</option>\
	                ')
	           }
	           $(".sureCombineBtn").unbind("click").click(function(){
	                if($(".combineOrderSelect").val()=="no"){
	                    closeCombineOrderPop();
	                    CheckHotelTrip(detailInfo);
	                }else{
	                    $('body').mLoading("show");
	                    $.ajax(
	                      {
	                        type:'post',
	                        url : $.session.get('ajaxUrl'),
	                        dataType : 'json',
	                        data:{
	                          url: $.session.get('obtCompany')+"/OrderService.svc/UpdateAirOrderNo",
	                          jsonStr:'{"orgOrderNo":"'+detailInfo.OrderNo+'","newOrderNo":"'+$(".combineOrderSelect").val()+'","id":'+netUserId+'}'
	                        },
	                        success : function(data) {
	                           $('body').mLoading("hide");
	                           var res = JSON.parse(data);
	                           console.log(res);
	                           if(res||res=="true"){
	                              alert("ok");
	                              var finishedInfo = {
	                                  'orderNo':$(".combineOrderSelect").val(),
	                              }
	                              $.session.set('finishedInfo', JSON.stringify(finishedInfo));
	                              location.reload();
	                              // closeCombineOrderPop();
	                           }else{
	                              alert(res);
	                           }
	                        },
	                        error : function() {
	                          // alert('fail');
	                        }
	                      }
	                    );
	                }
	           })
	        },
	        error : function() {
	          // alert('fail');
	        }
	      }
	    );
	}else{
	    CheckHotelTrip(detailInfo);
	}
}
function CheckHotelTrip(orderRes){
	$('body').mLoading("show");
	$.ajax(
	  {
	    type:'post',
	    url : $.session.get('ajaxUrl'),
	    dataType : 'json',
	    data:{
	        url: $.session.get('obtCompany')+"/SystemService.svc/CheckHotelTripOrder",
	        jsonStr:'{"orderNo":"'+orderRes.OrderNo+'","id":'+netUserId+'}'
	    },
	    success : function(data) {
	    	$('body').mLoading("hide");
            var res = JSON.parse(data)
            console.log(res);
            if(res.TripType=="HOTEL"){
            	// if(orderRes.Hotel.length==0){
                var searchHotelRemind = confirm(get_lan("searchHotelRemind"));
                /*2020-2-11*/
                if(searchHotelRemind==true){
                  appleHotelPop(function(){searchHotel(orderRes,res);});
            		}else{
            			appleHotelPop(function(){HotelGKBooking(orderRes,'');});
            		}
                /*end*/

            		// var searchHotelRemind = confirm(get_lan("searchHotelRemind"));
            		// if(searchHotelRemind==true){
            		// 	searchHotel(orderRes,res);
            		// }else{
            		// 	HotelGKBooking(orderRes,'');
                // }
                
            	// }else{
            	// 	searchHotel(orderRes,res);
            	// }
            }
	    },
	    error : function() {
	      // alert('fail');
	    }
	  }
	);
}
function searchHotel(orderRes,checkRes){
	$('body').mLoading("show");
	$.ajax(
	  {
	    type:'post',
	    url : $.session.get('ajaxUrl'), 
	    dataType : 'json',
	    data:{
	        url: $.session.get('obtCompany')+"/QueryService.svc/GetHotelPolicyPricePost",
	        jsonStr:'{"cityCode":"'+checkRes.HotelCityCode+'","id":'+netUserId+',"checkIn":"'+checkRes.TripStartTimeCN+'","checkOut":"'+checkRes.TripEndTimeCN+'"}'
	    },
	    success : function(data) {
	        var res = JSON.parse(data);
	        console.log(res);
            if(res.HasManual){
                var maxFare = res.manualMaxFare;
            }else{
                var maxFare = res.maxFare;
            }
	        $.session.set('goOnBookOrderNo', orderRes.OrderNo);
	        var stars = '0-1-2-3-4-5';
	        if(checkRes.HotelCityType=="D"){
	            var hotelState = "domHotel";
	        }else if(checkRes.HotelCityType=="I"){
	            var hotelState = "intlHotel";
	        }
	        var hotelCityText = obtLanguage=="CN"?checkRes.HotelCityNameCN:checkRes.HotelCityNameEN;
	        var queryKey = checkRes.HotelCityCode+',,,,'+checkRes.TripStartTimeCN+','+checkRes.TripEndTimeCN+','+stars+','+res.minFare+','+maxFare+',1,1,1,2000,,';
	        var searchHotelInfo = {
	            'queryKey':queryKey,
	            'hotelCode':checkRes.HotelCityCode,
	            'hotelCityText':hotelCityText,
	            'hotelState':hotelState,
	            'appleType':'',
	            'appleKey':'',
	            'appleValue':'',
	        }
	        $.session.set('searchHotelInfo', JSON.stringify(searchHotelInfo));
	        window.location.href='../../hotel/mapHotelList.html';
	    },
	    error : function() {
	      // alert('fail'); 
	    } 
	  }
	);
}
/*HotelGKBooking*/
function HotelGKBooking(orderRes,clickType){
    $(".GKbookingPop").html('\
        <div class="GKbookingTittle"><div class="closeGKbookingIcon">x</div></div>\
        <div class="GKbookingBody"></div>\
        <div class="GKbookingFooter flexRow">\
          <div class="closeGKBookingBtn">'+get_lan("remarkPop").cancel+'</div>\
          <div class="sureGKBookingBtn">'+get_lan("remarkPop").confirm+'</div>\
        </div>\
        ')
    $('body').mLoading("show");
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'),
        dataType : 'json',
        data:{
          url: $.session.get('obtCompany')+"/SystemService.svc/CheckNeedGKBookingHotelPost",
          jsonStr:'{"request":{"id":'+netUserId+',"orderNo":"'+orderRes.OrderNo+'","language":"'+obtLanguage+'"}}'
        },
        success : function(data) {
          $('body').mLoading("hide");
          var res = JSON.parse(data);
          console.log(res);
          if(res.code=="200"){
            if(res.needShow){
                openGKbookingPop();
                $(".GKbookingBody").html('\
                    <div class="remindIcon"></div>\
                    <div class="GKRemindText">'+get_lan("GKbookingPop").GKRemindText+'</div>\
                    <select class="GKRemarkSelect"></select>\
                    ');
                $(".closeGKbookingIcon,.closeGKBookingBtn").unbind("click").click(function(){
                    closeGKbookingPop();
                })
                res.remark.Items.map(function(item){
                    $(".GKRemarkSelect").append('\
                        <option value="'+res.remark.Index+'-'+item.Key+'-'+item.OperationType+'">'+item.Value+'</option>\
                    ')
                })
                $(".sureGKBookingBtn").attr("state","chooseRemark");
                $(".sureGKBookingBtn").unbind("click").click(function(){
                    if($(this).attr("state")=="chooseRemark"){
                        $(".sureGKBookingBtn").removeAttr("state");
                        $(".sureGKBookingBtn").attr("remarkInfo",$(".GKRemarkSelect").val());
                        var OperationType = $(this).attr("remarkInfo").split('-')[2];
                        if(OperationType==2){
                            if(!res.hasInter){
                                var GKCityId = "hotelCity";
                            }else{
                                var GKCityId = "hotelIntlCity";
                            }
                            $(".GKbookingBody").html('\
                                <div class="GKbookingBodyTittle activeFontColor">'+get_lan("GKbookingPop").GKbookingBodyTittle+'</div>\
                                <div class="GKHotelTittle">'+get_lan("GKbookingPop").city+'</div>\
                                <input class="GKCityInput" id="'+GKCityId+'" autocomplete="off">\
                                <div class="GKHotelTittle">'+get_lan("GKbookingPop").hotel+'</div>\
                                <input class="GKHotelInput">\
                                <div class="flexRow" style="box-sizing:border-box;padding-left:100px;">\
                                  <div class="GKHotelHalfTittle">'+get_lan("GKbookingPop").checkIn+'</div>\
                                  <input class="GKCheckInInput" readonly>\
                                  <div class="GKHotelHalfTittle">'+get_lan("GKbookingPop").CheckOut+'</div>\
                                  <input class="GKCheckOutInput" readonly>\
                                </div>\
                                <div class="searchGkBtn btnBackColor">'+get_lan("GKbookingPop").search+'</div>\
                                <div class="searchGkList autoScrollY"></div>\
                            ');
                            $(".GKCityInput").val(obtLanguage=="CN"?res.HotelCityNameCN:res.HotelCityNameEN);
                            $(".GKCityInput").attr("code",res.HotelCityCode);
                            $("#hotelCity").kuCity();
                            $("#hotelIntlCity").kuCity();
                            $(".GKCheckInInput").val(res.FirstArrivalTime);
                            $(".GKCheckOutInput").val(res.LastDepartureTime);
                            var departureValue = new Date($(".GKCheckInInput").val().replace(/-/g, "/"));
                            $(".GKCheckOutInput").datepicker('destroy');
                            $(".GKCheckOutInput").datepicker({
                                dateFormat: 'yy-mm-dd',
                                changeMonth: true,
                                changeYear: true,
                                minDate: departureValue,  // 当前日期之后的 0 天，就是当天
                                maxDate: 365,  // 当前日期之后的 0 天，就是当天
                                hideIfNoPrevNext: true,
                                showOtherMonths: true,
                                selectOtherMonths: true,
                            });
                            $(".GKCheckInInput").datepicker({
                                dateFormat: 'yy-mm-dd',
                                changeMonth: true,
                                changeYear: true,
                                minDate: 0,  // 当前日期之后的 0 天，就是当天
                                maxDate: 365,  // 当前日期之后的 0 天，就是当天
                                hideIfNoPrevNext: true,
                                showOtherMonths: true,
                                selectOtherMonths: true,
                                onSelect:function(){
                                    var departureValue = new Date($(".GKCheckInInput").val().replace(/-/g, "/"));
                                    $(".GKCheckOutInput").datepicker('destroy');
                                    $(".GKCheckOutInput").datepicker({
                                        dateFormat: 'yy-mm-dd',
                                        changeMonth: true,
                                        changeYear: true,
                                        minDate: departureValue,  // 当前日期之后的 0 天，就是当天
                                        maxDate: 365,  // 当前日期之后的 0 天，就是当天
                                        hideIfNoPrevNext: true,
                                        showOtherMonths: true,
                                        selectOtherMonths: true,
                                    });
                                    $(".GKCheckOutInput").val(getNextDay($(".GKCheckInInput").val()));
                                }
                            });
                            //日期
                            function GetDateStr(AddDayCount) {
                                var dd = new Date(); 
                                dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
                                var y = dd.getFullYear();
                                var m = (dd.getMonth()+1)<10?'0'+(dd.getMonth()+1):(dd.getMonth()+1);
                                var d = dd.getDate()<10?'0'+dd.getDate():dd.getDate();
                                return y+"-"+m+"-"+d;
                            }
                            function getNextDay(d){
                                d = new Date(d);
                                d = +d + 1000*60*60*24;
                                d = new Date(d);
                                var month = (d.getMonth()+1)<10?'0'+(d.getMonth()+1):(d.getMonth()+1);
                                var day = d.getDate()<10?'0'+d.getDate():d.getDate();
                                //格式化
                                return d.getFullYear()+"-"+month+"-"+day;
                            }
                            $(".searchGkBtn").unbind("click").click(function(){
                                if($(".GKCityInput").attr("code")&&$(".GKHotelInput").val()!=""){
                                    $('body').mLoading("show");
                                    var queryKey =$(".GKCityInput").attr("code")+','+$(".GKHotelInput").val();
                                    $.ajax(
                                      {
                                        type:'post',
                                        url : $.session.get('ajaxUrl'),
                                        dataType : 'json',
                                        data:{
                                          url: $.session.get('obtCompany')+"/SystemService.svc/QueryCityLocalHotelPost",
                                          jsonStr:'{"id":'+netUserId+',"language":"'+obtLanguage+'","queryKey":"'+queryKey+'"}'
                                        },
                                        success : function(data) {
                                          var res = JSON.parse(data);
                                          console.log(res);
                                          $('body').mLoading("hide");
                                          $(".searchGkList").html("");
                                          res.map(function(item,index){
                                            var name = obtLanguage=="CN"?item.NameCN:item.NameEN;
                                            $(".searchGkList").append('\
                                                <div class="GKHotelLi flexRow">\
                                                  <input type="radio" name="GKHotel" id="GKHotel'+index+'"class="GKHotelRadio" value="'+item.HotelID+'">\
                                                  <label title="'+name+'" class="ellipsis" style="width:340px;cursor:pointer;" for="GKHotel'+index+'">'+name+'</label>\
                                                </div>\
                                            ')
                                          })
                                          $(".sureGKBookingBtn").attr("state","hotelInfo");
                                        },
                                        error : function() {
                                          // alert('fail');
                                        }
                                      }
                                    );
                                }else{
                                    alert(get_lan("GKbookingPop").searchRemind);
                                }
                            })
                        }else if(OperationType==1){
                            if(!res.hasInter){
                                var GKCityId = "hotelCity";
                            }else{
                                var GKCityId = "hotelIntlCity";
                            }
                            $(".GKbookingBody").html('\
                                <div class="GKbookingBodyTittle activeFontColor">'+get_lan("GKbookingPop").GKbookingBodyTittle+'</div>\
                                <div class="GKHotelTittle">'+get_lan("GKbookingPop").city+'</div>\
                                <input class="GKCityInput" id="'+GKCityId+'" autocomplete="off">\
                                <div class="GKHotelTittle">'+get_lan("GKbookingPop").address+'</div>\
                                <input class="GKAddressInput">\
                            ');
                            $("#hotelCity").kuCity();
                            $("#hotelIntlCity").kuCity();
                            $(".sureGKBookingBtn").attr("state","addressInfo");
                        }else if(OperationType==0||OperationType==3){
                            SubmitGKBooking($(this).attr("remarkInfo"),"",orderRes,clickType);
                        }
                    }else if($(this).attr("state")=="hotelInfo"){
                        if($(".GKHotelRadio:checked").val()){
                            var hotelInfo = $(".GKCityInput").attr("code")+','+$(".GKHotelRadio:checked").val()+','+$(".GKCheckInInput").val()+','+$(".GKCheckOutInput").val();
                            SubmitGKBooking($(this).attr("remarkInfo"),hotelInfo,orderRes,clickType);
                        }else{
                            alert(get_lan("GKbookingPop").searchRemind);
                        }
                    }else if($(this).attr("state")=="addressInfo"){
                        if($(".GKCityInput").attr("code")&&$(".GKAddressInput").val()!=""){
                            var hotelInfo = $(".GKCityInput").attr("code")+','+$(".GKAddressInput").val();
                            SubmitGKBooking($(this).attr("remarkInfo"),hotelInfo,orderRes,clickType);
                        }else{
                            alert(get_lan("GKbookingPop").searchRemind);
                        }
                    }
                    else{
                        alert(get_lan("GKbookingPop").searchRemind);
                    }
                    function SubmitGKBooking(remarkInfo,hotelInfo,orderRes,clickType){
                        $('body').mLoading("show");
                        $.ajax(
                          {
                            type:'post',
                            url : $.session.get('ajaxUrl'),
                            dataType : 'json',
                            data:{
                              url: $.session.get('obtCompany')+"/SystemService.svc/SubmitGKBookingPost",
                              jsonStr:'{"request":{"id":'+netUserId+',"language":"'+obtLanguage+'","remarkInfo":"'+remarkInfo+'","hotelInfo":"'+hotelInfo+'","orderNo":"'+orderRes.OrderNo+'"}}'
                            },
                            success : function(data) {
                              var res = JSON.parse(data);
                              console.log(res);
                              $('body').mLoading("hide");
                              closeGKbookingPop();
                              if(res.code==200){
                              	orderDetails();
                                if(clickType=="purchase"){
                                    checkRemark(orderRes,'purchase');
                                }
                              }else{
                                alert(res.message);
                              }
                            },
                            error : function() {
                              // alert('fail');
                            }
                          }
                        );
                    }
                })
            }else{
                if(clickType=="purchase"){
                    checkRemark(orderRes,'purchase');
                }
            }
          }else{
            alert(res.message);
          }
        },
        error : function() {
          // alert('fail');
        }
      }
    );
}
function checkRemark(orderRes,operationType){
    $('body').mLoading("show");
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'),
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/SystemService.svc/CheckCustomerRemarkForInvoicePost",
            jsonStr:'{"id":'+netUserId+',"orderNo":"'+orderRes.OrderNo+'","language":"'+obtLanguage+'"}'
        },
        success : function(data) {
            $('body').mLoading("hide");
            var res = JSON.parse(data);
            console.log(res);
            if(res.code=="200"){
                if(res.needShowRemark){
                    var customerId = res.customerRemarkList[0].customerId;
                    var employeeName = res.customerRemarkList[0].customerName;
                    remarkInfoPop(customerId,employeeName,res.customerRemarkList[0].remarkList,'invoice',orderRes,operationType);
                }else{
                    closeRemarkPop();
                    if(operationType=="purchase"){
                        checkPayment(orderRes);
                    }
                }
            }
        },
        error : function() {
          // alert('fail');
        }
      }
    );
}
//检查支付
function checkPayment(orderRes){
    if(orderRes.Train.length>0){
        var purchaseBtnRemind = "You are about to purchase a train reservation. If you choose to proceed, your credit card will be charged. Please claim expense through eApproval under “Train China Mainland” expense type. The original train ticket is required when submitting eApproval."; 
    }else{
        var purchaseBtnRemind = get_lan("purchaseBtnRemind")
    }
	var r = confirm(purchaseBtnRemind);
	if(r==false){
		return false;
	}
	if(orderRes.ShowPayment){
		openOnlinePayPop();
		if(!ProfileInfo.AliPay&&!ProfileInfo.WechatPay){
		    yeePay(orderRes);
		}else{
			// 0：不限制
			// 1：支付宝
			// 2：yeepay
			var s=orderDetaile.PayChannel
			if(s==2){
				yeePay(orderDetaile);
			}
			if(s==1){
				// 直接走支付宝
				closeOnlinePayPop()
				$('body').mLoading("show");
				// 支付订单显示字段
				var enStr = '',
					cnStr = '';
				var airCNStr = '',
					HotelCNStr = '',
					TrainCNStr = '',
					carCNStr = '';
				var airENStr = '',
					HotelENStr = '',
					TrainENStr = '',
					carENStr = '';
				console.log(orderRes.Segment)
				console.log(orderRes.Segment[0])
				orderRes.Segment.map(function(airList) {
					// 飞机票是嵌套的数组
					airList.map(function(airItem) {
						if (airItem.ItemPayment == "Credit Card") {
							airCNStr = '机票、'
							airENStr = 'air,'
						}
					})
				})
				orderRes.Hotel.map(function(hotelItem) {
					if (hotelItem.ItemPayment == "Credit Card") {
						HotelCNStr = '酒店、'
						HotelENStr = 'hotel,'
					}
				})
				orderRes.Train.map(function(trainItem) {
					if (trainItem.ItemPayment == "Credit Card") {
						TrainCNStr = '火车、'
						TrainENStr = 'train,'
					}
				})
				orderRes.Car.map(function(carItem) {
					if (carItem.ItemPayment == "Credit Card") {
						carCNStr = '租车、'
						carENStr = 'car rental,'
					}
				})
				
				enStr = airENStr + HotelENStr + carENStr + TrainENStr;
				en.tipsClass = enStr.substring(0, enStr.length - 1)
				// 将首字母大写
				en.tipsClass = en.tipsClass.charAt(0).toUpperCase() + en.tipsClass.slice(1)
				
				en.tipsText = en.tipsClass + en.tipsText
				
				cnStr = airCNStr + HotelCNStr + carCNStr + TrainCNStr;
				cn.tipsClass = cnStr.substring(0, cnStr.length - 1)
				cn.tipsText = cn.tipsClass + cn.tipsText
				var type = ProfileInfo.onlineStyle == "APPLE" ? 4 : 1;
				$.ajax(
				  {
				    type:'post',
				    url : $.session.get('ajaxUrl'),
				    dataType : 'json',
				    data:{
				        url: $.session.get('obtCompany')+"/QueryService.svc/QueryOrderPayInfo",
				        jsonStr:'{"request":{"id":'+netUserId+',"orderNo":"'+orderRes.OrderNo+'","language":"'+obtLanguage+'","payChannel":"1"}}'
				    },
				    success : function(data) {
				        // $('body').mLoading("hide");
				        var res = JSON.parse(data);
				        console.log(res);
						var subject = obtLanguage == "CN" ? cn.tipsClass : en.tipsClass;
				        // return false;
				        $.ajax(
				          {
				            type:'post',
				            url : $.session.get('ajaxUrl'),
				            dataType : 'json',
				            data:{
				                url: $.session.get('obtCompany')+"/SystemService.svc/GetAopBodyNew",
				                jsonStr:'{"request":{"subject":"'+subject+'","totalAmount":"'+res.payAmount+'","exMechantNO":"'+res.exMechantNO+'","type":"' + type + '"}}'
				            },
				            success : function(data) {
				                $('body').mLoading("hide");
				                var res = JSON.parse(data);
				                console.log(res);
								ticket(orderRes,'alipayRes',res)
				                $('body').append(res);
				            },
				            error : function() {
				              // alert('fail');
				            }
				          }
				        );
				    },
				    error : function() {
				      // alert('fail');
				    }
				  }
				);
			}
			
			if(s==0){
				{
					// 支付订单显示字段
					var enStr = '',
						cnStr = '';
					var airCNStr = '',
						HotelCNStr = '',
						TrainCNStr = '',
						carCNStr = '';
					var airENStr = '',
						HotelENStr = '',
						TrainENStr = '',
						carENStr = '';
					console.log(orderRes.Segment)
					console.log(orderRes.Segment[0])
					orderRes.Segment.map(function(airList) {
						// 飞机票是嵌套的数组
						airList.map(function(airItem) {
							if (airItem.ItemPayment == "Credit Card") {
								airCNStr = '机票、'
								airENStr = 'air,'
							}
						})
					})
					orderRes.Hotel.map(function(hotelItem) {
						if (hotelItem.ItemPayment == "Credit Card") {
							HotelCNStr = '酒店、'
							HotelENStr = 'hotel,'
						}
					})
					orderRes.Train.map(function(trainItem) {
						if (trainItem.ItemPayment == "Credit Card") {
							TrainCNStr = '火车、'
							TrainENStr = 'train,'
						}
					})
					orderRes.Car.map(function(carItem) {
						if (carItem.ItemPayment == "Credit Card") {
							carCNStr = '租车、'
							carENStr = 'car rental,'
						}
					})
					
					enStr = airENStr + HotelENStr + carENStr + TrainENStr;
					en.tipsClass = enStr.substring(0, enStr.length - 1)
					// 将首字母大写
					en.tipsClass = en.tipsClass.charAt(0).toUpperCase() + en.tipsClass.slice(1)
					
					en.tipsText = en.tipsClass + en.tipsText
					
					cnStr = airCNStr + HotelCNStr + carCNStr + TrainCNStr;
					cn.tipsClass = cnStr.substring(0, cnStr.length - 1)
					cn.tipsText = cn.tipsClass + cn.tipsText
					
					$(".onlinePayPop").html('\
					    <div class="onlinePayTittle tittleBackColor"><div class="closeOnlinePayIcon" style="color:#fff;">x</div></div>\
					    <div class="onlinePayRemind">'+get_lan('onlinePayRemind')+'▼</div>\
					    <div class="flexRow onlinePayUl">\
					        <div class="onlinePayLi yeePayLi">\
					          <div class="onlinePayImg yeePayImg" name="yeePay"></div>\
					          <div class="onlineLiText">'+get_lan('onlinePayPop').yeePay+'</div>\
					        </div>\
					        <div class="onlinePayLi">\
					          <div class="onlinePayImg alipayImg" name="alipay"></div>\
					          <div class="onlineLiText">'+get_lan('onlinePayPop').alipay+'</div>\
					        </div>\
					        <div class="onlinePayLi wechatLi">\
					          <div class="onlinePayImg wechatImg" name="wechat"></div>\
					          <div class="onlineLiText">'+get_lan('onlinePayPop').wechat+'</div>\
					        </div>\
					    </div>\
					    ')
					// $(".onlinePayPop").css("background-color","#ececec");
					$(".closeOnlinePayIcon").unbind("click").click(function(){
					    closeOnlinePayPop('approval');
					})
					$(".wechatLi").remove();
					// $(".onlinePayLi").eq(1).remove();
					$(".onlinePayLi").css("width",(600/parseInt($(".onlinePayLi").length))+"px");
					$(".onlineLiText").css("width",(600/parseInt($(".onlinePayLi").length)-100)+"px");
					$(".onlinePayImg").css("margin","15px "+(300/parseInt($(".onlinePayLi").length)-85)+"px");
				
					$(".onlinePayImg").unbind("click").click(function(){
					    if($(this).attr("name")=="yeePay"){
					        yeePay(orderRes);
					    }else if($(this).attr("name")=="alipay"){
					        $('body').mLoading("show");
					        $.ajax(
					          {
					            type:'post',
					            url : $.session.get('ajaxUrl'),
					            dataType : 'json',
					            data:{
					                url: $.session.get('obtCompany')+"/QueryService.svc/QueryOrderPayInfo",
					                jsonStr:'{"request":{"id":'+netUserId+',"orderNo":"'+orderRes.OrderNo+'","language":"'+obtLanguage+'","payChannel":"1"}}'
					            },
					            success : function(data) {
					                // $('body').mLoading("hide");
					                var res = JSON.parse(data);
					                console.log(res);
									var subject = obtLanguage == "CN" ? cn.tipsClass : en.tipsClass;
					                // return false;
					                $.ajax(
					                  {
					                    type:'post',
					                    url : $.session.get('ajaxUrl'),
					                    dataType : 'json',
					                    data:{
					                        url: $.session.get('obtCompany')+"/SystemService.svc/GetAopBodyNew",
					                        jsonStr:'{"request":{"subject":"'+subject+'","totalAmount":"'+res.payAmount+'","exMechantNO":"'+res.exMechantNO+'","type":"3"}}'
					                    },
					                    success : function(data) {
					                        $('body').mLoading("hide");
											closeOnlinePayPop()
					                        var res = JSON.parse(data);
					                        console.log(res);
											// 12.27先出票 再跑支付宝方法
												ticket(orderRes,'alipayRes',res)
					                        $('body').append(res);
					                    },
					                    error : function() {
					                      // alert('fail');
					                    }
					                  }
					                );
					            },
					            error : function() {
					              // alert('fail');
					            }
					          }
					        );
					    }else if($(this).attr("name")=="wechat"){
				
					    }
					})
				}
			}
		}
	}else{
		ticket(orderRes);
	}
}
/*易pay支付*/
function yeePay(orderRes){
    $('body').mLoading("show");
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'),
        dataType : 'json',
        data:{
          url: $.session.get('obtCompany')+"/OrderService.svc/SubmitGotoYeepayLink",
          jsonStr:'{"orderNo":"'+orderRes.OrderNo+'","id":'+netUserId+',"phone":"'+$(".purchaseTripBtn").attr("phone")+'"}'
        },
        success : function(data) {
          var res = JSON.parse(data);
          console.log(res);
          $('body').mLoading("hide");
          if(res.status=="S"){
            window.open(""+res.salelink+"");
            // alert('Please check mobile notification to complete payment.');
			// 弹框放到出票成功后12.19
            closeOnlinePayPop();
            ticket(orderRes,"yeePay");
          }else{
            alert(res.msg);
          }
        },
        error : function() {
          // alert('fail');
        }
      }
    )
}
// 出票
function ticket(orderRes,payType,alipayRes){
	$('body').mLoading("show");
	$.ajax(
	  {
	    type:'post',
	    url : $.session.get('ajaxUrl'),
	    dataType : 'json',
	    data:{
	      url: $.session.get('obtCompany')+"/OrderService.svc/TicketPost",
	      jsonStr:'{"orderNo":"'+orderRes.OrderNo+'","type":"M","id":'+netUserId+'}'
	    },
	    success : function(data) {
			// $('body').mLoading("hide");
			console.log(res);
			if(data=='' || data==null){
				var lan = $.session.get('obtLanguage');     //语言版本
				//选取语言文字
				switch(lan){
				    case 'CN':
				        alert('操作失败，请稍后再试。');
				        break;
				    case 'EN':
				        alert('Unsuccessful, please try later.');
				        break;
				    default:
				        alert('操作失败，请稍后再试。');
				}
				$('body').mLoading("hide");
				return false;
			}
	      var res = JSON.parse(data);
		  // if(res=="OK"|| res=="Ok"|| res=="ok"|| res=="oK"){
		  if(res.toUpperCase()=="OK"){
			  if(payType=="yeePay"){
				alert('Please check mobile notification to complete payment.');
			  }else if(payType=="alipay"){
				alert("Pay Successfully!");
			  }
			  if(payType=="alipayRes"){
				  $('body').append(alipayRes)
			  }else{
				window.location.href = '../../index/index.html';
			  }
			 //  else{
				// alert(get_lan("orderInfo").ticketRemind);
			 //  }
			  // $('body').mLoading("hide");
		  }else{
			  var lan = $.session.get('obtLanguage');     //语言版本
			  //选取语言文字
			  switch(lan){
			      case 'CN':
			          alert('操作失败，请稍后再试。');
			          break;
			      case 'EN':
			          alert('Unsuccessful, please try later.');
			          break;
			      default:
			          alert('操作失败，请稍后再试。');
			  }
			  $('body').mLoading("hide");
		  }
	    },
	    error : function() {
	      // alert('fail');
	    }
	  }
	);
}
//继续预订
function goOnBook(orderRes){
    $(".GoOnBookPop").html('\
        <div class="GoOnBookTittle"><div class="closeGoOnBookIcon">x</div></div>\
        <div class="bookRemind">'+get_lan('clickRemind')+'▼</div>\
        <div class="flexRow continueUl">\
            <div class="continueLi airIconLi">\
              <div class="continueLiImg airImg" name="air"></div>\
              <div class="continueLiText">'+get_lan('continueUl').air+'</div>\
            </div>\
            <div class="continueLi hotelIconLi">\
              <div class="continueLiImg hotelImg" name="hotel"></div>\
              <div class="continueLiText">'+get_lan('continueUl').hotel+'</div>\
            </div>\
            <div class="continueLi trainIconLi">\
              <div class="continueLiImg trainImg" name="train"></div>\
              <div class="continueLiText">'+get_lan('continueUl').train+'</div>\
            </div>\
        </div>\
        ')
    if(ProfileInfo.onlineStyle=="APPLE"){
        $(".airImg").css("background-image",'url(../../bookFinished/images/appleAir.png)');
        $(".hotelImg").css("background-image",'url(../../bookFinished/images/appleHotel.png)');
        $(".trainImg").css("background-image",'url(../../bookFinished/images/appleRail.png)');
    }
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/SystemService.svc/ProfilePost",
            jsonStr:'{"key":'+netUserId+'}'
        },
        success : function(data) {
            var res = JSON.parse(data);
            console.log(res);
            $(".purchaseTripBtn").attr("phone",res.Phone);
            if(!res.isDomesticAir&&!res.isInterAir){
                $(".airIconLi ").remove();
            }
            if(!res.isHotel){
                $(".hotelIconLi").remove();
            }
            if(!res.isTrain){
                $(".trainIconLi").remove();
            }
            if(res.ApproveAutoIssue){
                $(".ticketOption").html(get_lan("autoIssueRemind"));
                $(".ticketOption").css("color","red");
            }
            if(res.IsTicket==1){
                $(".approveReason").eq(0).prop("checked",true);
                $(".approveReason").eq(1).removeAttr("checked");
            }
            $(".continueLi").css("width",(600/parseInt($(".continueLi").length))+"px");
            $(".continueLiText").css("width",(600/parseInt($(".continueLi").length)-100)+"px");
            $(".continueLiImg").css("margin","15px "+(300/parseInt($(".continueLi").length)-85)+"px");
        },
        error : function() {
          // alert('fail');
        }
      }
    );
    $(".addTripBtn").unbind("click").click(function(){
        openGoOnBookPop();
        $(".closeGoOnBookIcon").unbind("click").click(function(){
            closeGoOnBookPop();
        })
        $(".continueLiImg").unbind("click").click(function(){
            $.session.set('goOnBookOrderNo', orderRes.OrderNo);
            if($(this).attr("name")=="air"){
                window.location.href='../../search/queryAir.html';
            }else if($(this).attr("name")=="hotel"){
                if(ProfileInfo.HotelJumpHRS){
                    window.open(ProfileInfo.HotelJumpHRS_Url);
                }else{
                    /*2020-2-11*/
                  appleHotelPop(
                    function (){
                      if(orderRes.Segment.length>0&&compareDate(orderRes.Segment[0][0].ArrivesDate)){
                        var goOnBookHotelInfo = {
                            "ArriveCityCode":orderRes.Segment[0][0].ArriveCityCode,
                            "ArriveCity":orderRes.Segment[0][0].ArriveCity,
                            "ArrivesDate":orderRes.Segment[0][0].ArrivesDate,
                            "type":orderRes.Segment[0][0].IsDomestic,
                        }
                        console.log(goOnBookHotelInfo);
                        $.session.set('goOnBookHotelInfo', JSON.stringify(goOnBookHotelInfo));
                        window.location.href='../../search/queryHotel.html';
                      }else{
                          window.location.href='../../search/queryHotel.html';
                      }
                    }
                  );
                  /*end*/
                  // if(orderRes.Segment.length>0&&compareDate(orderRes.Segment[0][0].ArrivesDate)){
                  //   var goOnBookHotelInfo = {
                  //       "ArriveCityCode":orderRes.Segment[0][0].ArriveCityCode,
                  //       "ArriveCity":orderRes.Segment[0][0].ArriveCity,
                  //       "ArrivesDate":orderRes.Segment[0][0].ArrivesDate,
                  //       "type":orderRes.Segment[0][0].IsDomestic,
                  //   }
                  //   console.log(goOnBookHotelInfo);
                  //   $.session.set('goOnBookHotelInfo', JSON.stringify(goOnBookHotelInfo));
                  //   window.location.href='../../search/queryHotel.html';
                  // }else{
                  //     window.location.href='../../search/queryHotel.html';
                  // }
                }
            }else if($(this).attr("name")=="train"){
                window.location.href='../../search/queryTrain.html';
            }
        })
    })
    function compareDate(date1){
        var oDate1 = new Date(date1);
        var oDate2 = new Date();
        if(oDate1.getTime() > oDate2.getTime()){
            return true;
        } else {
            return false;
        }
    }
}
/*2020-2-11 apple酒店提醒*/
function appleHotelPop(callback){
	$("body").append('\
	 <div class="remindCover" style="position: fixed;top: 0;left: 0;bottom: 0;right: 0;background: rgba(0, 0, 0, 0.7);z-index: 9999;">\
	       <div class="remindPop" style="width: 1000px;height: 270px;background-color: #fff;z-index: 101;position: fixed;top: 50%;left: 50%;transform: translate(-50%,-50%);border-radius: 10px;padding: 10px;font-family: Sans-serif,Arial,Verdana;">\
	         <div class="remindPopTittle" style="border-bottom:1px solid #e6e6e6;width: 100%;height: 80px;line-height: 80px;font-size: 26px;font-weight: 600;position: relative;box-sizing: border-box;padding-left: 10px;font-family: Arial,Verdana;">HOTEL BOOKING ALERT<div class="WHclosePopIcon" style="width: 30px;height: 30px;line-height: 30px;text-align: center;font-size: 26px;font-weight: 600;color: #9b9b9b;position: absolute;top: 25px;right: 10px;cursor: pointer;">x</div></div>\
	         <div style="box-sizing: border-box;padding:10px;font-size: 15px;line-height:24px;">\
			   <p>Apple Travel currently is working with our hotel partners to ensure that we only have our colleagues stay in hotels that meet the standard set by EHS. </p>\
			   <br><p>Hotels in China may temporarily suspend operations or change check-in restrictions due to the ongoing COVID-19 situation. If you plan to stay at a hotel in China within the next two days, please contact Apple Travel to confirm hotel restrictions before traveling.</p>\
	         </div>\
	       </div>\
	     </div>\
	     ')
	$(".WHclosePopIcon").unbind("click").click(function(){
		$(".remindCover").remove();
		if(callback){
			callback();
		  }
	})
}
/*end*/
/*机票*/
function segmentList(res){
    var orderInfo = res;
	res.Segment.map(function(sitem,index){
        var passengerString = '';
        var showAirlineReference = sitem[0].AirlineReference!=''?"":"hide";
        for(var i=0;i<sitem[0].Passengers.length;i++){
            passengerString+=sitem[0].Passengers[i].PassengerName;
            passengerString+=' ';
        }
		$(".segmentList").append('\
			<div class="segmentLi">\
			  <div class="segmentLiTittle flexWrap">\
                <div style="margin-left:27px;">'+passengerString+'</div>\
                <div style="margin-left:30px;">'+get_lan('orderCustomerInfo').popDocuments+sitem[0].Passengers[0].DocumentNo+'</div>\
			    <div style="margin-left:27px;">'+sitem[0].DeparteDate+'</div>\
			    <div style="margin-left:30px;">'+get_lan('orderDetails').orderState+'<span class="activeFontColor">'+sitem[0].StateDes+'</span></div>\
                <div style="margin-left:30px;">'+get_lan('orderDetails').price+'<span class="activeFontColor">'+sitem[0].AirFareAmount+'</span></div>\
                <div style="margin-left:30px;width:200px;" class="'+showAirlineReference+' ellipsis">'+get_lan('orderDetails').AirlineReference+'<span class="keypoint" title="'+sitem[0].AirlineReference+'">'+sitem[0].AirlineReference+'</span></div>\
			  </div>\
			  <div class="segmentLiBody flexRow">\
			     <div class="segmentDetailsList"></div>\
			  </div>\
			</div>\
	    ')
        //<div style="margin-left:30px;">'+sitem[0].DeparteCity+' - '+sitem[0].ArriveCity+'</div>\
		sitem.map(function(item){
			var showBtn1 = sitem[0].AirCanChangeTicket?"show":"hide";
			var showBtn2 = sitem[0].AirCanReFund?"show":"hide";
			var showBtn3 = sitem[0].AirCanCancel?"show":"hide";
			var showBtn4 = sitem[0].AirCanCheckIn?"show":"hide";
            var showTicketNo = item.Passengers[0].TicketNo!=""?"":"hide";
            var changeInfo ='';
            var PassengersInfo = '';
            sitem[0].Passengers.map(function(item){
              changeInfo += item.PassengerID+'_'+item.TicketNo;
              changeInfo += ',';
              PassengersInfo += item.PassengerID+'_'+item.PassengerName;
              PassengersInfo += ',';
            })
            var AirNewInsurancesInfo = '';
            sitem[0].AirNewInsurances.map(function(aitem){
              AirNewInsurancesInfo += aitem.AirInsuranceName+' ('+aitem.InsuranceNameP+') '+aitem.AirInsuranceAmount+'CNY,';
            })
            AirNewInsurancesInfo = AirNewInsurancesInfo.substring(0,AirNewInsurancesInfo.length-1);
            var DeparteTerminal=item.DeparteTerminal==null?"":item.DeparteTerminal;
            var ArriveTerminal=item.ArriveTerminal==null?"":item.ArriveTerminal;
            var showRebooking = item.Rebooking==null||item.Rebooking==""?"hide":"";
            var day = GetDateDiff(item.DepartsDate,item.ArrivesDate);
            var showDay = day == 0?'hide':'';
            var showBookSeat = item.AirCanBookSeat==0?"hide":"";
            //||(item.Passengers[0].SeatNum!=""&&item.Passengers.length>2)
            //||(item.Passengers[0].SeatNum!=""&&item.Passengers.length<=2)
            var showPassengerSeat = (item.AirCanBookSeat==0&&item.Passengers.length>1&&item.Passengers[0].SeatNum!="")||(item.Passengers[0].MealInfo!=""&&item.Passengers.length>1)?"":"hide";
            var showSeatInfo = (item.AirCanBookSeat==0&&item.Passengers.length<=1&&item.Passengers[0].SeatNum!="")||(item.Passengers[0].MealInfo!=""&&item.Passengers.length<=1)?"":"hide";
            var passengersSeatInfo = '';
            var passengerSeatInfo = '';
            item.Passengers.map(function(pItem){
                passengersSeatInfo+=pItem.PassengerName+'  :  ';
                passengersSeatInfo+=pItem.SeatNum;
                passengersSeatInfo+='  '+pItem.MealInfo;
                passengersSeatInfo+='\n';
                passengerSeatInfo+=pItem.PassengerName+'  :  ';
                passengerSeatInfo+=pItem.SeatNum;
                // passengerSeatInfo+='<br>';
                passengerSeatInfo+='<span style="margin-left:10px;">'+pItem.MealInfo+'</span>';
                // passengerSeatInfo+='<br>';
            })
			$(".segmentDetailsList").eq(index).append('\
				<div class="segmentDetailsLi">\
                  <div style="height:105px;position: relative;">\
                      <div class="segmentAirLine ellipsis" title="'+item.AirportName+'">'+item.AirportName+'</div>\
                      <div class="segmentDepartDate">'+item.DeparteDate+'</div>\
                      <div class="segmentDepartTime">'+item.ScheduleDepart+'</div>\
                      <div class="segmentArrow"></div>\
                      <div class="segmentArriveTime">'+item.ScheduleArrive+'</div>\
                      <div class="segmentDay '+showDay+'">+'+day+'</div>\
                      <div class="segmentDepartAirport ellipsis" title="'+item.DeparteAirport+' '+DeparteTerminal+'">'+item.DeparteAirport+' '+DeparteTerminal+'</div>\
                      <div class="segmentArriveAirport ellipsis" title="'+item.ArriveAirport+' '+ArriveTerminal+'">'+item.ArriveAirport+' '+ArriveTerminal+'</div>\
                      <div class="segmentFlightNo">'+item.FlightNo+'</div>\
                      <div class="segmentDurnturn flexRow"><img src="../orders/images/clock.png" style="display:block;margin-right:5px;">'+item.Durnturn+'</div>\
                      \
                      \
                      <div class="segmentSelectSeat btnBackColor '+showBookSeat+'" orderNo="'+res.OrderNo+'" PassengersInfo="'+PassengersInfo+'" flightInfo="'+item.DeparteCity+'-'+item.ArriveCity+'&&'+item.FlightNo+' '+item.DepartsDate+' '+item.ScheduleDepart+'" airline="'+item.AirlineCode+'" departureTime="'+item.DepartsDate+'" dstCity="'+item.ArriveAirportCode+'" flightNo="'+item.FlightNo.substring(2,item.FlightNo.length)+'" orgCity="'+item.DeparteAirportCode+'" pnrCode="'+item.PnrCode+'">'+get_lan("orderDetails").selectSeat+'</div>\
                      <div class="segmentCabin">'+get_lan('orderDetails').cabin+item.Cabin+'</div>\
                      <div class="segmentCraft">'+get_lan('orderDetails').craft+item.AirCraft+'</div>\
                      <div class="segmentMeal">'+item.Meal+' '+AirNewInsurancesInfo+'<span class="TicketNoText '+showTicketNo+'" style="margin-left:20px;">'+get_lan('orderDetails').TicketNo+item.Passengers[0].TicketNo+'</span><span class="segmentSeat '+showSeatInfo+' mainFontColor" title="'+passengersSeatInfo+'">'+passengerSeatInfo+'</span><sapn class="segmentSeatInfo '+showPassengerSeat+' mainFontColor" title="'+passengersSeatInfo+'">'+get_lan('orderDetails').passengerSeatInfo+'</span></div>\
                  </div>\
                  <div style="position:relative;background:rgba(243,243,243,1);">\
                      <div class="segmentRebooking '+showRebooking+'"><span class="ruleColor" style="font-weight:bold;margin-right:10px;">'+get_lan('orderDetails').Rebooking+'</span>'+item.Rebooking+'</div>\
                      <div class="segmentRefund '+showRebooking+'"><span class="ruleColor" style="font-weight:bold;margin-right:10px;">'+get_lan('orderDetails').Refund+'</span>'+item.Refund+'</div>\
                      <div class="segmentRes hide"><span class="ruleColor" style="font-weight:bold;margin-right:10px;">'+get_lan('orderDetails').Res+'</span>'+item.Res+'</div>\
                  </div>\
				</div>\
			')
		})
        function GetDateDiff(startDate,endDate)
        {
            var startTime = new Date(Date.parse(startDate.replace(/-/g,   "/"))).getTime();
            var endTime = new Date(Date.parse(endDate.replace(/-/g,   "/"))).getTime();
            var dates = Math.abs((startTime - endTime))/(1000*60*60*24);
            return  dates;
        }
	})
    $(".segmentLi").eq($(".segmentLi").length-1).css("border-bottom","0");
    //机票在线选座
    $(".segmentSelectSeat").unbind("click").click(function(){
        $('body').mLoading("show");
        var flightInfo = $(this).attr("flightInfo");
        var PassengersInfo = $(this).attr("PassengersInfo");
        var PassengersList = PassengersInfo.substring(0,PassengersInfo.length-1).split(',');
        console.log(PassengersList);
        var pnrCode = $(this).attr('pnrCode');
        var orderNo = $(this).attr('orderNo');
        var flightNo = flightInfo.split("&&")[1].split(' ')[0].substring(2,flightInfo.split("&&")[1].split(' ')[0].length);
        $.ajax(
        { 
          type:'post',
          url : $.session.get('ajaxUrl'),
          dataType : 'json',
          data:{
            url: $.session.get('obtCompany')+"/QueryService.svc/QuerySeatMapPost",
            jsonStr:'{"airline":"'+$(this).attr('airline')+'","departureTime":"'+$(this).attr('departureTime')+'","dstCity":"'+$(this).attr('dstCity')+'","flightNo":"'+$(this).attr('flightNo')+'","orgCity":"'+$(this).attr('orgCity')+'","pnrCode":"'+$(this).attr('pnrCode')+'","id":'+netUserId+'}'
          },
          success : function(data) {
                var res = JSON.parse(data);
                console.log(res);
                $('body').mLoading("hide");
                if(res.length==0){
                    alert(get_lan("orderDetails").selectSeatRemind);
                }else{
                    openSelectSeatPop();
                    $(".selectSeatPop").html('\
                        <div class="flexRow">\
                          <div class="customerContent">\
                            <div class="seatCustomerTittle mainBackColor">'+flightInfo.split("&&").join('<br>')+'</div>\
                            <div class="seatCustomerList autoScrollY"></div>\
                          </div>\
                          <div class="seatContent">\
                            <div class="seatContentTittle flexRow">\
                              <div style="width:120px;text-align:center;line-height:80px;" class="activeFontColor">'+get_lan("selectSeatPop").notes+'</div>\
                              <div style="width:120px;text-align:center;"><div class="seatIcon1" style="margin: 0 auto;margin-top: 15px;"></div>'+get_lan("selectSeatPop").available+'</div>\
                              <div style="width:120px;text-align:center;"><div class="seatIcon2" style="margin: 0 auto;margin-top: 15px;"></div>'+get_lan("selectSeatPop").blocked+'</div>\
                              <div style="width:120px;text-align:center;"><div class="seatIcon3" style="margin: 0 auto;margin-top: 15px;"></div>'+get_lan("selectSeatPop").select+'</div>\
                              <div style="width:120px;text-align:center;"><div class="seatIcon4" style="margin: 0 auto;margin-top: 15px;"></div>'+get_lan("selectSeatPop").ocuppied+'</div>\
                            </div>\
                            <div class="seatContentBody autoScrollX">\
                              <div class="seatContentBodyTittle flexRow"><div class="columnsField"></div>\</div>\
                              <div id="seatScroll">\
                                <div class="seatContentBodyContent autoScrollY"></div>\
                              </div>\
                            </div>\
                          </div>\
                        </div>\
                        <div class="flexRow">\
                          <div class="cancelSeatBtn" style="background-color: #9b9b9b;">'+get_lan("remarkPop").cancel+'</div>\
                          <div class="confirmSeatBtn btnBackColor">'+get_lan("remarkPop").confirm+'</div>\
                        </div>\
                    ')
                    PassengersList.map(function(item){
                        $(".seatCustomerList").append('\
                            <div class="seatCustomerLi ellipsis" customerId="'+item.split('_')[0]+'">'+item.split('_')[1]+'<div class="seatCustomerLiText" style="position:absolute;left:220px;top:0;"></div></div>\
                            ')
                    })
                    $(".seatCustomerLi").eq(0).addClass("seatCustomerLiActive");
                    seatInfo(res,pnrCode,orderNo,flightNo);
                    $(".cancelSeatBtn").unbind("click").click(function(){
                        closeSelectSeatPop();
                    })
                }
            },
            error : function() {
              // alert('fail');
            }
          }
        );
    })
    function seatInfo(res,pnrCode,orderNo,flightNo){
        $(".seatContentBodyTittle").css("width",(res[0].columnsField.length+2)*60+'px');
        $(".seatContentBodyContent").css("width",(res[0].columnsField.length+2)*60+20+'px');
        res[0].columnsField.map(function(item){
            var codeField=item.codeField=="走道"?"":item.codeField
            $(".seatContentBodyTittle").append('\
                <div class="columnsField">'+codeField+'</div>\
                ')
        })
        $(".seatContentBodyTittle").append('\
            <div class="columnsField"></div>\
        ')
        res[0].rowsField.map(function(item){
            $(".seatContentBodyContent").append('\
                <div class="seatContentBodyContentLi flexRow" codeField="'+item.codeField+'"></div>\
                ')
        })
        var columnsField = res[0].columnsField;
        var rowsField = [];
        res[0].rowsField.map(function(item){
            rowsField.push(item);
        })
        console.log(rowsField);
        rowsField.map(function(item,index){
            $(".seatContentBodyContentLi").eq(index).html('\
                <div class="seatInfo">'+item.codeField+'</div>\
            ')
            item.columnsField = res[0].columnsField;
            item.columnsField.map(function(cItem,cIndex){
                $(".seatContentBodyContentLi").eq(index).append('\
                    <div class="seatInfo"></div>\
                    ')
                item.seatsField.map(function(sItem,sIndex){
                    if(cItem.codeField==sItem.codeField&&cItem.descriptionField==1){
                        if(sItem.isAvailField){
                            $(".seatContentBodyContentLi").eq(index).children(".seatInfo").eq(cIndex+1).append('\
                                <div class="seatIcon1" style="margin:0 auto;margin:11px 0 0 15px;" seatNo="'+item.codeField+sItem.codeField+'"></div>\
                                ')
                        }else{
                           $(".seatContentBodyContentLi").eq(index).children(".seatInfo").eq(cIndex+1).append('\
                                <div class="seatIcon2" style="margin:0 auto;margin:11px 0 0 15px;"></div>\
                                ') 
                        }
                    }
                })
            })
            $(".seatContentBodyContentLi").eq(index).append('\
                <div class="seatInfo">'+item.codeField+'</div>\
            ')
        })
        var dragX=function(obj){
            obj.bind("mousedown",start);  
            function start(event){
                if(event.button==0){//判断是否点击鼠标左键  
                    gapX=event.clientX;
                    startx = obj.scrollLeft();  // scroll的初始位置
                    // console.log(startx)
                    //movemove事件必须绑定到$(document)上，鼠标移动是在整个屏幕上的
                    obj.bind("mousemove",move);
                    //此处的$(document)可以改为obj  
                    obj.bind("mouseup",stop);                        
                }
                return false;//阻止默认事件或冒泡
            }
            function move(event){
                var left = event.clientX-gapX; // 鼠标移动的相对距离
                obj.scrollLeft(startx - left);
                return false;//阻止默认事件或冒泡
            }
            function stop(){
                //解绑定，这一步很必要，前面有解释
                obj.unbind("mousemove",move);
                obj.unbind("mouseup",stop);
            }
        }
        dragX($(".seatContentBody"));
        /*点击座位*/
        $(".seatInfo .seatIcon1").unbind("click").click(function(){
            if($(this).hasClass("seatIcon1")){
                if($(".seatInfo .seatIcon3").length!=0){
                    $(".seatInfo .seatIcon3").removeAttr("customerId");
                    $(".seatInfo .seatIcon3").removeClass("seatIcon3").addClass("seatIcon1");
                }
                $(this).attr("customerId",$(".seatCustomerLiActive").attr("customerId"));
                $(this).attr("name",$(".seatCustomerLiActive").text());
                $(this).removeClass("seatIcon1").addClass("seatIcon3");
                $(".seatCustomerLiActive").children(".seatCustomerLiText").text($(this).attr("seatNo"));
            }
        })
        $(".seatCustomerLi").unbind("click").click(function(){
            var that = this;
            if(!$(that).hasClass("seatCustomerLiActive")){
                $(".seatCustomerLi").removeClass("seatCustomerLiActive");
                $(that).addClass("seatCustomerLiActive");
                if($(".seatInfo .seatIcon3").length!=0){
                    $(".seatInfo .seatIcon3").removeClass("seatIcon3").addClass("seatIcon4");
                }
                if($(".seatInfo .seatIcon4").length!=0){
                    for(var i=0;i<$(".seatInfo .seatIcon4").length;i++){
                        if($(".seatInfo .seatIcon4").eq(i).attr("customerId")==$(that).attr("customerId")){
                            $(".seatInfo .seatIcon4").eq(i).removeClass("seatIcon4").addClass("seatIcon3");
                        }
                    }
                }
            }
        })
        $(".confirmSeatBtn").unbind("click").click(function(){
            if($(".seatInfo .seatIcon4").length+$(".seatInfo .seatIcon3").length!=$(".seatCustomerLi").length){
                alert(get_lan("selectSeatPop").selectRemind);
            }else{
                var seatList = '[';
                for(var i=0;i<$(".seatInfo .seatIcon4").length;i++){
                    seatList+='{"seatNo":"'+$(".seatInfo .seatIcon4").eq(i).attr("seatNo")+'",';
                    seatList+='"name":"'+$(".seatInfo .seatIcon4").eq(i).attr("name")+'"},';
                }
                seatList+= '{"seatNo":"'+$(".seatInfo .seatIcon3").attr("seatNo")+'",';
                seatList+='"name":"'+$(".seatInfo .seatIcon3").attr("name")+'"}]';
                console.log(seatList);
                $('body').mLoading("show");
                $.ajax(
                 {
                   type:'post',
                   url : $.session.get('ajaxUrl'),
                   dataType : 'json',
                   data:{
                     url: $.session.get('obtCompany')+"/OrderService.svc/BookAirSeat",
                     jsonStr:'{"request":{"id":'+netUserId+',"pnrCode":"'+pnrCode+'","orderNo":"'+orderNo+'","flightNo":"'+flightNo+'","seatList":'+seatList+',"language":"'+obtLanguage+'"}}'
                   },
                   success : function(data) {
                      var res = JSON.parse(data);
                      console.log(res);
                      if(res!="OK"){
                        $('body').mLoading("hide");
                        alert(res);
                      }else{
                        location.reload();
                        // closeSelectSeatPop();
                      }
                   },
                   error : function() {
                     // alert('fail');
                   }
                 }
                );
            }
        })
    }
}
//酒店
function hotelList(res){
	res.Hotel.map(function(hitem,index){
		if(hitem.CancelPolicy==null){
		  hitem.CancelPolicy = ""
		}
        var showLastTime = ProfileInfo.onlineStyle=="APPLE"?"hide":"";
        var showPolicy = ProfileInfo.onlineStyle=="APPLE"?"":"hide";
		var showBtn1 = hitem.HotelCanCancel?"show":"hide";
		var showBtn2 = hitem.HotelCanModify?"show":"hide";
		var showBtn3 = hitem.CanPay?"show":"hide";
		var htelText = hitem.IsShowDelay?get_lan('orderDetails').orderExtend:get_lan('orderDetails').orderModify;
        var showCabinCustomer = hitem.CabinCustomerName!=""&&hitem.CabinCustomerName!=null?"":"hide";
		$(".hotelList").append('\
			<div class="hotelLi">\
			  <div class="hotelLiTittle flexRow">\
                <div style="margin-left:27px;">'+hitem.HotelnameP+'</div>\
			    <div style="margin-left:50px;"><span style="font-size:16px;" class="mainFontColor">'+hitem.CheckIn+' - '+hitem.CheckOut+'</span></div>\
			    <div style="margin-left:50px;">'+get_lan('orderDetails').orderState+'<span class="activeFontColor">'+hitem.HotelState+'</span></div>\
                <div style="margin-left:50px;">'+hitem.ConfirmNo+'</span></div>\
			    <div style="margin-left:50px;">'+get_lan('orderDetails').price+'<span class="activeFontColor">'+hitem.HotelFareAmount+'</span></div>\
			  </div>\
			  <div class="hotelLiBody flexRow">\
			     <div class="hotelDetailsList"></div>\
			  </div>\
			</div>\
	    ')
	    $(".hotelDetailsList").eq(index).append('\
	    	<div class="hotelDetailsLi">\
              <div class="hotelName">'+hitem.HotelName+'</div>\
              <div class="hotelLastTime flexRow '+showLastTime+'">\
                <div class="flexRow" style="width:140px;"><div class="lastTimeIcon">!</div>'+get_lan('orderDetails').CancelDeadLine+'</div>\
                <span class="keypoint">'+hitem.CancelDeadLine+'</span>\
              </div>\
              <div class="hotelCancelPolicy flexRow '+showPolicy+'"><div style="min-width:140px;">'+get_lan('orderDetails').CancelPolicy+'</div>'+hitem.CancelPolicy+'</div>\
              <div class="flexWrap">\
    	    	  <div class="hotelAddress flexRow"><div style="width:140px;">'+get_lan('orderDetails').address+'</div><span class="mainFontColor">'+hitem.HotelAddress+'</span></div>\
    	    	  <div class="hotelRoomName flexRow"><div style="width:140px;">'+get_lan('orderDetails').RoomName+'</div>'+hitem.RoomName+'</div>\
    	    	  <div class="hotelBedName flexRow"><div style="width:140px;">'+get_lan('orderDetails').BedName+'</div>'+hitem.BedName+'</div>\
    	    	  <div class="hotelBreakfast flexRow"><div style="width:140px;">'+get_lan('orderDetails').Breakfast+'</div>'+hitem.Breakfast+'</div>\
                  <div class="hotelPayType flexRow"><div style="width:140px;">'+get_lan('orderDetails').PayType+'</div>'+hitem.PayType+'</div>\
                  <div class="hotelLastArriveTime flexRow"><div style="width:140px;">'+get_lan('orderDetails').LastTime+'</div>'+hitem.LastTime+'</div>\
                  <div class="hotelInfo flexRow">\
                    <div class="hotelRooms" style="width:140px;">'+get_lan('orderDetails').Rooms+'</div>\
                    <div>'+hitem.Rooms+'</div>\
                  </div>\
                  <div class="hotelInfo flexRow">\
                    <div class="hotelNights" style="width:140px;">'+get_lan('orderDetails').Nights+'</div>\
                    <div>'+hitem.Nights+'</div>\
                  </div>\
                  <div class="CabinCustomerName flexRow '+showCabinCustomer+'"><div style="width:140px;">'+get_lan('orderDetails').CabinCustomerName+'</div>'+hitem.CabinCustomerName+'</div>\
              </div>\
	    	</div>\
	    ')
	})
	$(".hotelLi").eq($(".hotelLi").length-1).css("border-bottom","0");
}
//火车
function trainList(res){
    var orderInfo = res;
	res.Train.map(function(titem,index){
		var showBtn1 = titem.TrainCanReIssue?"show":"hide";
		var showBtn2 = titem.TrainCanReFund?"show":"hide";
		var showBtn3 = titem.TrainCanCancel?"show":"hide";
		$(".trainList").append('\
			<div class="trainLi">\
			  <div class="trainLiTittle flexRow">\
                <div style="margin-left:27px;">'+titem.nameP+'</div>\
			    <div style="margin-left:27px;">'+titem.TrainDate+'</div>\
			    <div style="margin-left:50px;">'+titem.TrainDeparte+' - '+titem.TrainArrive+'</div>\
			    <div style="margin-left:50px;">'+get_lan('orderDetails').orderState+'<span class="activeFontColor">'+titem.TrainState+'</span></div>\
			    <div style="margin-left:50px;">'+get_lan('orderDetails').price+'<span class="activeFontColor">'+titem.TrainFareAmount+'</span></div>\
			  </div>\
			  <div class="trainLiBody flexRow">\
			     <div class="trainDetailsList"></div>\
			  </div>\
			</div>\
	    ')
		var SeatNoStr=titem.SeatNo?'&nbsp;&nbsp;&nbsp;' + get_lan('orderDetails').SeatNo+titem.SeatNo:"";
		var CoachNoStr=titem.CoachNo?'&nbsp;&nbsp;&nbsp;' + get_lan('orderDetails').CoachNo+titem.CoachNo:"";
		var TicketNoStr=titem.TrainTicketNo?'&nbsp;&nbsp;&nbsp;' + get_lan('orderDetails').trainTicketNo+titem.TrainTicketNo:"";
	    $(".trainDetailsList").eq(index).append('\
	    	<div class="trainDetailsLi">\
	    	  <div class="trainType">'+titem.TrainType+'</div>\
	    	  <div class="trainDepartTime">'+titem.TrainDeparteTime+'</div>\
	    	  <div class="trainArrow"></div>\
	    	  <div class="trainArriveTime">'+titem.TrainArriveTime+'</div>\
	    	  <div class="trainDepart">'+titem.TrainDeparte+'</div>\
	    	  <div class="trainArrive">'+titem.TrainArrive+'</div>\
	    	  <div class="trainCode">'+titem.TrainCode+'</div>\
	    	  <div class="trainDurnturn flexRow"><img src="../orders/images/clock.png" style="display:block;margin-right:5px;">'+titem.Durnturn+'</div>\
	    	  <div class="trainSeat">'+get_lan('orderDetails').seat+titem.TrainSeat+
			  TicketNoStr+
			  CoachNoStr+
			  SeatNoStr+
			  '</div>\
	    	</div>\
	    ')
	})
	$(".trainLi").eq($(".trainLi").length-1).css("border-bottom","0");
}
/*备注信息弹窗*/
function remarkInfoPop(CustomerID,employeeName,remarks,remarkType,orderRes,operationType){
    openRemarkPop();
    if(remarkType=="invoice"){
        console.log(cn)
        cn.remarkPop.remarkInfoTittle="请将您的账单信息补充完整：";
        en.remarkPop.remarkInfoTittle="Please complete the billing information:";
    }else{
        cn.remarkPop.remarkInfoTittle="账单信息：";
        en.remarkPop.remarkInfoTittle="Billing Information:";
    }
    $(".remarkInfoTittle").text(get_lan("remarkPop").remarkInfoTittle);
    $(".businessTripBody").html('\
        <div class="businessTripLi flexRow">\
            <div class="tripLiTittle">'+get_lan('remarkPop').tripNameTittle+'</div>\
            <div class="employeeName">'+employeeName+'</div>\
        </div>\
        ')
    remark(remarks,CustomerID,orderRes);
    function remark(remarks,CustomerID,orderRes){
        $(".remarkInfoBody").html('');
		var redTips=false;
        remarks.map(function(item,index){
            var colorRed = item.Input.indexOf("4") != -1||item.Input==""?"":"colorRed";
            var starIcon = item.Input.indexOf("4") != -1||item.Input==""?"":"*";
            if(ProfileInfo.onlineStyle!="APPLE"){
                starIcon = "";
            }
			if(colorRed=="colorRed"){
				redTips=true
			}
            if(!item.CanModify){
                $(".remarkInfoBody").append('\
                    <div id="liTittle'+item.Index+'" class="remarkLi flexRow">\
                      <div class="liTittle ellipsis '+colorRed+'" title="'+item.Title+'">'+starIcon+item.Title+'</div>\
                      <div class="liContent" index="'+item.Index+'"><input id="remarkInput'+item.Index+'" CompanyID="'+ProfileInfo.companyId+'" class="remarkLiInput" require="'+colorRed+'" index="'+item.Index+'" value="'+item.Content+'" key="'+item.SubmitContent+'" disabled></div>\
                    </div>\
                ')
            }else if(item.CanModify&&item.InList){
                if(!item.ListCanSearch){
                    $(".remarkInfoBody").append('\
                        <div class="remarkLi flexRow">\
                          <div id="liTittle'+item.Index+'" class="liTittle ellipsis '+colorRed+'" title="'+item.Title+'">'+starIcon+item.Title+'</div>\
                          <div class="liContent">\
                            <select class="remarkSelect" index="'+index+'">\
                              <option>'+get_lan("remarkPop").Choose+'</option>\
                            </select>\
                            <input id="remarkInput'+item.Index+'" class="remarkLiInput" require="'+colorRed+'" index="'+item.Index+'" value="'+item.Content+'" key="'+item.SubmitContent+'" readonly placeholder="'+get_lan("remarkPop").Choose+'">\
                          </div>\
                        </div>\
                    ')
                }else{
                    $(".remarkInfoBody").append('\
                        <div class="remarkLi flexRow">\
                          <div id="liTittle'+item.Index+'" class="liTittle '+colorRed+'" title="'+item.Title+'">'+starIcon+item.Title+'</div>\
                          <div class="liContent">\
                            <select class="remarkSelect" index="'+index+'">\
                              <option>'+get_lan("remarkPop").Choose+'</option>\
                            </select>\
                            <input class="remarkLiInput" CompanyID="'+ProfileInfo.companyId+'" id="remarkInput'+item.Index+'"  require="'+colorRed+'" value="'+item.Content+'" index="'+item.Index+'"  key="'+item.SubmitContent+'" placeholder="'+get_lan("remarkPop").search+'">\
                          </div>\
                        </div>\
                    ')
                    $("#remarkInput"+item.Index+"").searchRemark();
                }
            }else if(item.CanModify&&!item.InList){
                $(".remarkInfoBody").append('\
                    <div class="remarkLi flexRow">\
                      <div id="liTittle'+item.Index+'" class="liTittle ellipsis '+colorRed+'" title="'+item.Title+'">'+starIcon+item.Title+'</div>\
                      <div class="liContent">\
                        <select class="remarkSelect" index="'+index+'">\
                          <option>'+get_lan("remarkPop").Choose+'</option>\
                        </select>\
                        <input id="remarkInput'+item.Index+'" class="remarkLiInput" require="'+colorRed+'" index="'+item.Index+'" value="'+item.Content+'">\
                      </div>\
                    </div>\
                ')
            }
        })
		// 红的提示字 是否显示
		if(!redTips && ProfileInfo.onlineStyle!="APPLE"){
			$('.colorRed').hide()
		}
        for(var i=0;i<$(".remarkSelect").length;i++){
            var index = parseInt($(".remarkSelect").eq(i).attr("index"));
            if(remarks[index].Items.length!=0){
                remarks[index].Items.map(function(item){
                    var itemValue = item.Value==null||item.Value==""?item.Key:item.Value;
                    $(".remarkSelect").eq(i).append('\
                        <option class="remarkOption" key="'+item.Key+'" index="'+index+'">'+itemValue+'</option>\
                        ')
                })
            }else{
                $(".remarkSelect").eq(i).hide();
            }
            $(".remarkSelect").eq(i).change(function(){
                var index = parseInt($(this).find("option:selected").attr("index"));
                $(".remarkLiInput").eq(index).val($(this).find("option:selected").text());
                $(".remarkLiInput").eq(index).attr('key',$(this).find("option:selected").attr("key"));
            })
        }
        //选择remark关联其他remark
        $(".remarkSelect").change(function(){
            // console.log($(this).find("option:selected").attr("key"));
            // console.log($(this).find("option:selected").attr("index"));
            var selectKey = $(this).find("option:selected").attr("key");
            var selectIndex = parseInt($(this).find("option:selected").attr("index"));
            remarks[selectIndex].RelatedRemarkList.map(function(rItem){
                if(rItem.ChooseMainValue==selectKey){
                    rItem.SubRemarkRuleList.map(function(sItem){
                        $("#remarkInput"+rItem.SubRemarkIndex+"").val("");
                        $("#remarkInput"+rItem.SubRemarkIndex+"").removeAttr("key");
                        if(sItem.SubRemarkRule==1){
                            // console.log(sItem)
                            var colorRed = sItem.SubRemarkValue.indexOf("4") != -1||sItem.SubRemarkValue==""?"":"colorRed";
                            if(colorRed==""){
                                $("#liTittle"+rItem.SubRemarkIndex+"").removeClass("colorRed");
                                $("#remarkInput"+rItem.SubRemarkIndex+"").attr("require","");
                            }else if(colorRed=="colorRed"){
                                $("#liTittle"+rItem.SubRemarkIndex+"").addClass("colorRed");
                                $("#remarkInput"+rItem.SubRemarkIndex+"").attr("require","colorRed");
                            }
                        }else if(sItem.SubRemarkRule==2){
                            // $("#remarkInput"+rItem.SubRemarkIndex+"").val("");
                            if(sItem.SubRemarkValue=="true"){
                                $("#remarkInput"+rItem.SubRemarkIndex+"").attr("placeholder",get_lan("remarkPop").search);
                                $("#remarkInput"+rItem.SubRemarkIndex+"").removeAttr("disabled");
                                $("#remarkSelect"+rItem.SubRemarkIndex+"").show();
                                $("#remarkInput"+rItem.SubRemarkIndex+"").searchRemark();
								// 12.13新增
								$("#remarkInput"+rItem.SubRemarkIndex+"").prev().removeAttr("disabled");
                            }else if(sItem.SubRemarkValue=="false"){
                                $("#remarkInput"+rItem.SubRemarkIndex+"").attr("placeholder","");
                                $("#remarkInput"+rItem.SubRemarkIndex+"").attr("disabled","disabled");
                                $("#remarkSelect"+rItem.SubRemarkIndex+"").hide();
								// 12.13新增
								$("#remarkInput"+rItem.SubRemarkIndex+"").prev().attr("disabled","disabled");
                            }
                        }
                    })
                }
            })
        })

        $(".remarkFooter").html('\
            <div class="closeRemarkBtn" style="margin-left:10%;">'+get_lan('remarkPop').cancel+'</div>\
            <div class="sureRemarkBtn" style="margin-left:38%;">'+get_lan('remarkPop').confirm+'</div>\
            ')
        // if(orderRes.ShowApproval){
        //     $(".remarkFooter").html('\
        //         <div class="closeRemarkBtn" style="margin:0 auto;">'+get_lan('remarkPop').cancel+'</div>\
        //     ')
        // }
        /*关闭remark*/
        $(".closeRemarkBtn").unbind("click").click(function(){
            closeRemarkPop();
        })
        $(".sureRemarkBtn").unbind("click").click(function(){
            var remarks = '';
            var remarkCorrect = '';
            for(var i = 0;i<$(".remarkLiInput").length;i++){
                if($(".remarkLiInput").eq(i).attr("require")=="colorRed"){
                    if($(".remarkLiInput").eq(i).val()==""){
                        remarkCorrect += '1';
                    }
                }
                if(!$(".remarkLiInput").eq(i).attr("key")){
                    remarks += $(".remarkLiInput").eq(i).attr("index")+'-'+$(".remarkLiInput").eq(i).val()+',';
                }
                if($(".remarkLiInput").eq(i).attr("key")){
                    remarks += $(".remarkLiInput").eq(i).attr("index")+'-'+$(".remarkLiInput").eq(i).attr("key")+',';
                }
            }
            if(remarkCorrect!=''){
                alert(get_lan("remarkPop").remarkRemind);
                return false;
            }
            var isCopy = false;
            $('body').mLoading("show");
            if(remarkType=="order"){
                $.ajax(
                  {
                    type:'post',
                    url : $.session.get('ajaxUrl'), 
                    dataType : 'json',
                    data:{
                        url: $.session.get('obtCompany')+"/SystemService.svc/UpdateOrderRemark",
                        jsonStr:'{"id":'+netUserId+',"orderNo":"'+orderNo+'","customerId":"'+CustomerID+'","remarkStr":"'+remarks.substring(0,remarks.length-1)+'","Language":"'+obtLanguage+'"}'
                    },
                    success : function(data) {
                        $('body').mLoading("hide");
                        var res = JSON.parse(data);
                        console.log(res);
                        if(res == "true"){
                            alert(get_lan("remarkPop").modifySuccess);
                            window.location.reload();
                        }else{
                            alert(res);
                        }
                    },
                    error : function() {
                      // alert('fail');
                    }
                  }
                );
            }else if(remarkType=="invoice"){
                $.ajax(
                  {
                    type:'post',
                    url : $.session.get('ajaxUrl'),
                    dataType : 'json',
                    data:{
                        url: $.session.get('obtCompany')+"/SystemService.svc/UpdateCustomerRemarkForInvoicePost",
                        jsonStr:'{"id":'+netUserId+',"orderNo":"'+orderNo+'","customerId":"'+CustomerID+'","remarks":"'+remarks.substring(0,remarks.length-1)+'","Language":"'+obtLanguage+'","isCopy":""}'
                    },
                    success : function(data) {
                        $('body').mLoading("hide");
                        var res = JSON.parse(data);
                        console.log(res);
                        if(res.code == 200){
                            alert(get_lan("remarkPop").modifySuccess);
                            checkRemark(orderRes,operationType);
                        }else{
                            alert(res.message);
                        }
                    },
                    error : function() {
                      // alert('fail');
                    }
                  }
                );
            }
        })
    }
}

function openRemarkPop(){
    $("#cover").show();
    $(".remarkPop").css("display","block");
}
function closeRemarkPop(){
    $("#cover").hide();
    $(".remarkPop").css("display","none");
}
function openSelectSeatPop(){
    $("#cover").show();
    $(".selectSeatPop").css("display","block");
}
function closeSelectSeatPop(){
    $("#cover").hide();
    $(".selectSeatPop").css("display","none");
}
function openGoOnBookPop(){
    $("#cover").show();
    $(".GoOnBookPop").css("display","block");
}
function closeGoOnBookPop(){
    $("#cover").hide();
    $(".GoOnBookPop").css("display","none");
}
function openOnlinePayPop(){
    $("#cover").show();
    $(".onlinePayPop").css("display","block");
}
function closeOnlinePayPop(operationType){
    $("#cover").hide();
    $(".onlinePayPop").css("display","none");
	// 此处已废弃，当前页面不刷新
	// if(operationType=="approval"){
	// 	window.location.reload();
	// }
}
function openGKbookingPop(){
    $("#cover").show();
    $(".GKbookingPop").css("display","block");
}
function closeGKbookingPop(){
    $("#cover").hide();
    $(".GKbookingPop").css("display","none");
}
function openCombineOrderPop(){
    $("#cover").show();
    $(".combineOrderPop").css("display","block");
}
function closeCombineOrderPop(){
    $("#cover").hide();
    $(".combineOrderPop").css("display","none");
}



// 改签或者权限设置
function onlyOnePayment(){
	var s=orderDetaile.PayChannel
	if(s==0){
		onlinePay(orderDetaile);
	}
	if(s==1){
		var type = ProfileInfo.onlineStyle == "APPLE" ? 4 : 1;
		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: {
				url: $.session.get('obtCompany') + "/QueryService.svc/QueryOrderPayInfo",
				jsonStr: '{"request":{"id":' + netUserId + ',"orderNo":"' + $(".onlinePayBtn").attr("orderNo") +
					'","language":"' + obtLanguage + '","payChannel":"1"}}'
			},
			success: function(data) {
				// $('body').mLoading("hide");
				var res = JSON.parse(data);
				console.log(res);
				var subject = obtLanguage == "CN" ? cn.tipsClass : en.tipsClass;
				// return false;
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/SystemService.svc/GetAopBodyNew",
						jsonStr: '{"request":{"subject":"' + subject + '","totalAmount":"' + res.payAmount + '","exMechantNO":"' +
							res.exMechantNO + '","type":"' + type + '"}}'
					},
					success: function(data) {
						// $('body').mLoading("hide");
						var res = JSON.parse(data);
						console.log(res);
						$('body').append(res);
					},
					error: function() {
						// alert('fail');
					}
				});
			},
			error: function() {
				// alert('fail');
			}
		});
	}
	if(s==2){
		yeePay(orderDetaile);
	}
}