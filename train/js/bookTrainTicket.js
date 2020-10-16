var netUserId = $.session.get('netLoginId');
var obtLanguage = $.session.get('obtLanguage');
var trainTicketInfo = JSON.parse($.session.get('trainTicketInfo'));
var searchTrainInfo = JSON.parse($.session.get('searchTrainInfo'));
var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));
var TAorderNo = $.session.get('TAorderNo');
console.log(trainTicketInfo);
console.log(searchTrainInfo);
if(trainTicketInfo.type == "oneWay"){
    var queryKey = trainTicketInfo.queryKey;
}else if(trainTicketInfo.type == "roundTrip"){
    var queryKey = trainTicketInfo.queryKey+','+trainTicketInfo.queryKeyReturn;
}
$(function(){
   showContent();//内容展示
   surePassengerInfo();//旅客信息确认
   passengerPop();//个人信息弹窗
   clickBookBtn();
})
//中英文对象
var cn = {
    "trainRemind":"请注意：火车的出票时间为06:05 – 22:55",
    "remarkPop":{
        "businessTripTittle":"出差信息：",
        "remarkInfoTittle":"备注信息：",
        "tripNameTittle":"员工姓名",
        "tripCompanyTittle":"公司",
        "confirm":"确认",
        "cancel":"取消",
        "companyRemindTittle":"温馨提示",
        "companyRemindText":"因为您已更换出差公司，请确认更改后的公司抬头信息是否正确。",
        "Choose":"请选择",
        "search":"请搜索",
        "remarkRemind":"请将红色备注项填写完整",
        "remarkInfoRemind":"红色标志为必填项",
    },
    "passengerPop":{
        "popTittle":"乘客信息",
        "remind":"（'*'为必填项）",
        "chooseName":"选择购票姓名：",
        "nameRemind":"(购票姓名需与登机所持证件保持一致)",
        "popNameCn":"中文姓名:",
        "popNameEn":"英文姓名:",
        "ticketName":"购票姓名:",
        "popPhone":"手机号码:",
        "popMail":"邮箱:",
        "popDocuments":"证件信息:",
        "popDocumentsRemind":"请选择证件类型",
        "popDocumentsTime":"证件有效期:",
        "timeRemind":"请选择有效期",
        "clickRemind":"请正确填写",
        "phoneRemind":"手机号填写有误",
        "emailRemind":"邮箱信息填写有误",
    },
    "newCustomerPop":{
        "nick":"昵称:",
        "sex":"性别:",
        'male':"男",
        'female':"女",
        'nationality':"国籍:",
        'birthday':"生日:",
        "surname":"姓",
        "givenName":"名",
		"required":"为必填项",
    },
    "progressBar":{
        "search":"查询",
        "book":"预订",
        "complete":"完成",
    },
    "orderDetail":{
        "orderDetailTittle":"订单详情：",
        "weekDay":'周日, 周一, 周二, 周三, 周四, 周五, 周六',
        "reselection":"重新选择",
        "trainCode":"车次：",
        "trainType":"车型：",
        "seatType":"座位类型",
        "ticketPrice":"票价：",
        "tax":"税费：",
        "serviceFare":"代理服务费：",
    },
    "passengerInfo":{
        "passengerTittle":"乘客信息",
        "remarks":"账单信息",
        "changePassengerInfo":"[修改信息]",
        "choosePassenger":"选择乘客",
        "selectPassengerRemind":"查找代订旅客 可输入姓名",
        "selectPassengerSearch":"搜索",
        "commonPassengers":"常用代订旅客",
        'delMsg':'是否删除该订单中此乘客?',
        'addNewCustomer':"[添加新乘客]",
    },
    "seatInfo":{
        "seatInfoTittle":"座位信息",
        "seatInfoBodyTittle":"请选择座位",
        "seatRemind":"优先按指定座席出票，若指定座席无票，将转购其他座席",
        "deaprture":"去程",
        "return":"回程",
        "window":"窗",
        "aisle":"过道",
    },
    "ricketOut":"预订后直接出票",
    "bookTicket":"预订",
    "bookTicketRemind":"请先选择乘客",
    "chooseSeatRemind":"请选择座位",
    "success":"预订成功！",
    "totalAmount":"总金额:",
}
var en = {
    "trainRemind":"Please note that Train ticketing is only valid from 06:05 to 22:55hrs.",
    "remarkPop":{
        "businessTripTittle":"Travel Information：",
        "remarkInfoTittle":"Remarks：",
        "tripNameTittle":"Employee Name",
        "tripCompanyTittle":"Company",
        "confirm":"Confirm",
        "cancel":"Cancel",
        "companyRemindTittle":"Kindly Reminder",
        "companyRemindText":"Because you have changed the travel company, please confirm whether the company's information is correct after the change.",
        "Choose":"Please Select",
        "search":"Please Search",
        "remarkRemind":"Please complete the mandatory remark.",
        "remarkInfoRemind":"The remark in red is mandatory.",
    },
    "passengerPop":{
        "popTittle":"Traveler Information",
        "remind":"（'*' Required field）",
        "chooseName":"Choose the name of traveler：",
        // "nameRemind":"(The name of ticket must be the same as  the travel document)",
        "nameRemind":"(Name on the ticket must be the same as it displays on the travel document)",
        "popNameCn":"Chinese Name:",
        "popNameEn":"English Name:",
        "ticketName":"Traveler:",
        "popPhone":"Phone:",
        "popMail":"Email:",
        "popDocuments":"Document:",
        "popDocumentsRemind":"Please select the type of certificate",
        "popDocumentsTime":"Validity:",
        "timeRemind":"Please choose the validity period.",
        "clickRemind":"Please fill in correctly.",
        "phoneRemind":"Wrong phone number filling.",
        "emailRemind":"Wrong number of mailbox number.",
    },
    "newCustomerPop":{
        "nick":"Nick:",
        "sex":"Sex:",
        'male':"Male",
        'female':"Female",
        'nationality':"Nationality:",
        'birthday':"Birthday:",
        "surname":"Surname",
        "givenName":"Given Name",
		"required":"is required",
    },
    "progressBar":{
        "search":"Search",
        "book":"Book",
        "complete":"Complete",
    },
    "orderDetail":{
        "orderDetailTittle":"Order Details：",
        "weekDay":'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
        "reselection":"Reselection",
        "trainCode":"Train number:",
        "trainType":"Model",
        "seatType":"Seat type",
        "ticketPrice":"Ticket Price:",
        "tax":"Tax:",
        "serviceFare":"Agent Service Fee:",
    },
    "passengerInfo":{
        "passengerTittle":"Traveler Information",
        "remarks":"Billing Information",
        "changePassengerInfo":"[Modify]",
        "choosePassenger":"Select Travelers",
        "selectPassengerRemind":"Enter First Name to search traveler",
        "selectPassengerSearch":"Search",
        "commonPassengers":"Common Travelers",
        'delMsg':'Do you want to remove this traveler from this order?',
        'addNewCustomer':"[Adding New Travelers]",
    },
    "seatInfo":{
        "seatInfoTittle":"Seat Information",
        "seatInfoBodyTittle":"Please choose your seat.",
        "seatRemind":"Priority is given to the designated seats. If the designated seats are not available, they will be transferred to other seats.",
        "deaprture":"Deaprture",
        "return":"Return",
        "window":"Window",
        "aisle":"Aisle",
    },
    "serviceInfo":{
        "serviceTittle":"Value-added Service",
        "insuranceTittle":"Insurance",
        "person":"Person",
    },
    "ricketOut":"Ticket Immediately",
    "bookTicket":"Book",
    "bookTicketRemind":"Please select travelers first.",
    "chooseSeatRemind":"Please choose your seat.",
    "success":"Booking Successful!",
    "totalAmount":"Total:",
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
function getWeek(dateStr){
    var myDate = new Date(Date.parse(dateStr.replace(/-/g, "/")));
    return get_lan('orderDetail').weekDay.split(',')[myDate.getDay()];
}
//内容展示
function showContent(){
    if(trainTicketInfo.type == "oneWay"){
        var travelQueryKey = ',4,'+JSON.parse($.session.get('searchTrainInfo')).departureCityText+','+JSON.parse($.session.get('searchTrainInfo')).arrivalCityText+','+trainTicketInfo.date+',';
    }else if(trainTicketInfo.type == "roundTrip"){
        var travelQueryKey = ',4,'+JSON.parse($.session.get('searchTrainInfo')).departureCityText+','+JSON.parse($.session.get('searchTrainInfo')).arrivalCityText+','+trainTicketInfo.date+','+trainTicketInfo.returndate;
    }
	$(".remarkPop").html('\
	    <div class="businessTripTittle tittleBackColor">'+get_lan('remarkPop').businessTripTittle+'</div>\
	    <div class="businessTripBody"></div>\
	    <div class="remarkInfoTittle tittleBackColor">'+get_lan('remarkPop').remarkInfoTittle+'</div>\
	    <div style="padding-bottom:10px;border-bottom:1px solid #f3f3f3;">\
          <div class="remarkInfoBody autoScrollY"></div>\
        </div>\
        <div class="colorRed" style="box-sizing:border-box;padding-left:20px;font-size:14px;height: 19px;line-height: 19px;">'+get_lan('remarkPop').remarkInfoRemind+'</div>\
	    <div class="remarkFooter flexRow"></div>\
	    ')
	$("#main").html('\
        <div class="autoCenter">\
            <div class="progressBar flexRow activeFontColor"></div>\
            <div class="orderDetail" queryKey="'+travelQueryKey+'">\
            <div class="orderDetailTittle tittleBackColor">'+get_lan('orderDetail').orderDetailTittle+'</div>\
            </div>\
            <div class="passengerInfo">\
                <div class="passengerTittle">'+get_lan('passengerInfo').passengerTittle+'</div>\
                <div class="passengerBody">\
                  <div class="choosePassengerBody flexRow activeFontColor"></div>\
                  <div class="passengerBar flexRow">\
                    <div class="passengerBarLi" style="width:250px;">'+get_lan('passengerPop').ticketName+'</div>\
                    <div class="passengerBarLi" style="width:150px;">'+get_lan('passengerPop').popPhone+'</div>\
                    <div class="passengerBarLi" style="width:200px;">'+get_lan('passengerPop').popMail+'</div>\
                    <div class="passengerBarLi" style="width:300px;">'+get_lan('passengerPop').popDocuments+'</div>\
                  </div>\
                  <div class="passengerList">\
                  </div>\
                </div>\
            </div>\
            <div class="seatInfo hide">\
                <div class="seatInfoTittle">'+get_lan('seatInfo').seatInfoTittle+'</div>\
                <div class="seatInfoBody">\
                  <div class="seatInfoBodyTittle flexRow">\
                  '+get_lan('seatInfo').seatInfoBodyTittle+'\
                  <div class="remindIcon">!</div>\
                  <span style="font-size:12px;" class="seatRemind">'+get_lan('seatInfo').seatRemind+'</span>\
                  </div>\
                  <div class="seatBody flexRow">\
                    <div class="deaprtureSeat" passengerseat="">\
                      <div class="deaprtureSeatTittle">'+get_lan('seatInfo').deaprture+'</div>\
                      <div class="deaprtureSeatBody flexRow"></div>\
                      <div class="deaprtureSeatBody flexRow hide"></div>\
                    </div>\
                    <div class="returnSeat" passengerseat="">\
                      <div class="returnSeatTittle">'+get_lan('seatInfo').return+'</div>\
                      <div class="returnSeatBody flexRow"></div>\
                      <div class="returnSeatBody flexRow hide"></div>\
                    </div>\
                  </div>\
                </div>\
            </div>\
            <div class="totalAmount">\
            '+get_lan("totalAmount")+'<span class="totalAmountText"></span>\
            </div>\
            <div class="bookTicketBody flexRow">\
              <div class="ricketOutBody"></div>\
              <div class="bookTicketBtn btnBackColor">'+get_lan('bookTicket')+'</div>\
            </div>\
        </div>\
        ')
		
		if(TAorderNo!=undefined){
			console.log('隐藏')
			$('.menu .autoCenter').addClass('hide')
			$('.orderTittle').addClass('hide')
			$('.autoScrollY').addClass('hide')
			$('footer').addClass('hide')
			$('.menu').css("height",'40px')
		}
		
	$(".progressBar").html('\
	    <div class="progressLine progressActiveBack"></div><div class="progressCircle progressActiveBack"></div><span class="progressActiveFont">'+get_lan('progressBar').search+'</span>\
	    <div class="progressLine progressActiveBack"></div><div class="progressCircle progressActiveBack"></div><span class="progressActiveFont">'+get_lan('progressBar').book+'</span>\
	    <div class="progressLine progressBackColor"></div><div class="progressCircle progressBackColor"></div>'+get_lan('progressBar').complete+'\
	    ')
	$.ajax(
	   {
	     type:'post',
	     url : $.session.get('ajaxUrl'), 
	     dataType : 'json',
	     data:{
	        url: $.session.get('obtCompany')+"/QueryService.svc/QuerySelectedTrainInfo",
	        jsonStr:'{"queryKey":"'+queryKey+'","id":'+netUserId+'}'
	     },
	     success : function(data) {
	        var res = JSON.parse(data);
	        console.log(res);
            $(".orderDetail").attr("DeparteCity",res[0].StationStart);
            $(".orderDetail").attr("ArriveCity",res[0].StationArrive);
            $(".orderDetail").attr("DateStart",trainTicketInfo.date);
            $(".orderDetail").attr("DateReturn",trainTicketInfo.returndate);
            $(".bookTicketBtn ").attr("trainRemind",res[0].trainRemind);
	        res.map(function(item){
                var SeatType = obtLanguage == "CN"?item.FareList[0].SeatType:item.FareList[0].SeatTypeEN;
                var showServiceFare = item.FareList[0].ServiceFare == 0?"hide":"";
	            $(".orderDetail").append('\
	                <div class="orderDetailBody" trainCode="'+item.TrainCode+'" ticketAmount="'+(parseFloat(item.FareList[0].Price)+parseFloat(item.FareList[0].ServiceFare))+'">\
	                  <div class="orderDateStart">'+trainTicketInfo.date+' '+getWeek(trainTicketInfo.date)+'</div>\
	                  <div class="orderNewOrder">'+get_lan('orderDetail').reselection+'</div>\
	                  <div class="orderTrainCode">'+get_lan('orderDetail').trainCode+item.TrainCode+'</div>\
	                  <div class="orderTimeStart mainFontColor">'+item.TimeStart+'</div>\
	                  <div class="orderArrowIcon"></div>\
	                  <div class="orderTimeArrive mainFontColor">'+item.TimeArrive+'</div>\
	                  <div class="orderDuration">'+item.UseTime+'</div>\
	                  <div class="orderStationDeparte">'+item.StationStart+'</div>\
	                  <div class="orderStationArrive">'+item.StationArrive+'</div>\
	                  <div class="orderTrainType">'+get_lan('orderDetail').trainType+': '+item.TrainType+'</div>\
	                  <div class="orderSeatType" SeatType="'+item.FareList[0].SeatType+'">'+get_lan('orderDetail').seatType+': '+SeatType+'</div>\
	                  <div class="orderFareAmount flexRow"><div style="width:110px;">'+get_lan('orderDetail').ticketPrice+'</div>￥<span style="font-size:20px;">'+item.FareList[0].Price+'</span></div>\
	                  <div class="orderServiceFare flexRow '+showServiceFare+'"><div style="width:110px;">'+get_lan('orderDetail').serviceFare+'</div>￥<span class="activeFontColor">'+item.FareList[0].ServiceFare+'</span></div>\
	                  <div class="orderLine"></div>\
	                </div>\
	            ')
	        })
            if(trainTicketInfo.type == "roundTrip"){
                $(".orderDateStart").eq(1).html(''+trainTicketInfo.returndate+' '+getWeek(trainTicketInfo.returndate)+'')
            }
            $(".orderNewOrder").hide();//隐藏重新选择
			// 12.11新增
			/*城市*/
			var cityList = '';
			res.map(function(item){
			    cityList+='"'+item.StartCityCode+'"';
			    cityList+=',';
			    cityList+='"'+item.ArriveCityCode+'"';
			    cityList+=',';
			})
			if(searchTrainInfo.type=="oneWay"){
				cityList='"'+searchTrainInfo.departureCity+'","'+searchTrainInfo.arrivalCity+'"'
				cityList += ',';
			}
			if(searchTrainInfo.type=="roundTrip"){
				cityList='"'+searchTrainInfo.departureCity+'","'+searchTrainInfo.arrivalCity+'"'
				cityList += ',';
			}
			
			cityList = cityList.substring(0,cityList.length-1);
			$(".orderDetail").attr("cityList",cityList);
			/*日期*/
			var timeList = '';
			res.map(function(item){
				timeList+='"'+item.DateStart+'"';
				timeList+=',';
				timeList+='"'+item.DateArrive+'"';
				timeList+=',';    
			})
			if(searchTrainInfo.type=="oneWay"){
				timeList='"'+searchTrainInfo.date+'"'
				timeList += ',';
			}
			if(searchTrainInfo.type=="roundTrip"){
				timeList='"'+searchTrainInfo.date+'","'+searchTrainInfo.returndate+'"'
				timeList += ',';
			}
			timeList = timeList.substring(0,timeList.length-1);
			$(".orderDetail").attr("timeList",timeList);
			// end
            /*火车选座样式*/
            if(trainTicketInfo.type == "oneWay"){
                $(".returnSeat").addClass("hide");
                $(".deaprtureSeat").css("border","0");
                if(res[0].FareList[0].SeatType!="二等座"&&res[0].FareList[0].SeatType!="一等座"&&res[0].FareList[0].SeatType!="商务座"){
                    $(".seatInfo").addClass("hide");
                }
                seatDistribution (res[0].FareList[0].SeatType,"deaprtureSeatBody","seatIcon",1);
                seatDistribution (res[0].FareList[0].SeatType,"deaprtureSeatBody","seatIcon",2);
            }
            else if(trainTicketInfo.type="roundTrip"){
                if(res[0].FareList[0].SeatType!=="二等座"&&res[0].FareList[0].SeatType!=="一等座"&&res[0].FareList[0].SeatType!=="商务座"){
                    $(".deaprtureSeat").addClass("hide");
                }
                if(res[1].FareList[0].SeatType!=="二等座"&&res[1].FareList[0].SeatType!=="一等座"&&res[1].FareList[0].SeatType!=="商务座"){
                    $(".returnSeat").addClass("hide");
                }
                if(res[0].FareList[0].SeatType!=="二等座"&&res[0].FareList[0].SeatType!=="一等座"&&res[0].FareList[0].SeatType!=="商务座"&&res[1].FareList[0].SeatType!=="二等座"&&res[1].FareList[0].SeatType!=="一等座"&&res[1].FareList[0].SeatType!=="商务座"){
                    $(".seatInfo").addClass("hide");
                }
                seatDistribution(res[0].FareList[0].SeatType,"deaprtureSeatBody","seatIcon",1);
                seatDistribution (res[0].FareList[0].SeatType,"deaprtureSeatBody","seatIcon",2);
                seatDistribution(res[1].FareList[0].SeatType,"returnSeatBody","seatIcon2",1);
                seatDistribution(res[1].FareList[0].SeatType,"returnSeatBody","seatIcon2",2);
            }
            function seatDistribution(SeatType,SeatBody,seatClass,index){
                if(SeatType=="二等座"){
                    $("."+SeatBody+"").eq(parseInt(index)-1).html('\
                        <div class="'+seatClass+'">'+get_lan("seatInfo").window+'</div>\
                        <div class="'+seatClass+' iconA" seat="'+index+'A"></div>\
                        <div class="'+seatClass+' iconB" seat="'+index+'B"></div>\
                        <div class="'+seatClass+' iconC" seat="'+index+'C"></div>\
                        <div class="'+seatClass+'">'+get_lan("seatInfo").aisle+'</div>\
                        <div class="'+seatClass+' iconD" seat="'+index+'D"></div>\
                        <div class="'+seatClass+' iconF" seat="'+index+'F"></div>\
                        <div class="'+seatClass+'">'+get_lan("seatInfo").window+'</div>\
                    ')
                }
                else if(SeatType=="一等座"){
                    $("."+SeatBody+"").eq(parseInt(index)-1).html('\
                        <div class="'+seatClass+'">'+get_lan("seatInfo").window+'</div>\
                        <div class="'+seatClass+' iconA" seat="'+index+'A"></div>\
                        <div class="'+seatClass+' iconC" seat="'+index+'C"></div>\
                        <div class="'+seatClass+'">'+get_lan("seatInfo").aisle+'</div>\
                        <div class="'+seatClass+' iconD" seat="'+index+'D"></div>\
                        <div class="'+seatClass+' iconF" seat="'+index+'F"></div>\
                        <div class="'+seatClass+'">'+get_lan("seatInfo").window+'</div>\
                    ')
                }else if(SeatType=="商务座"){
                    $("."+SeatBody+"").eq(parseInt(index)-1).html('\
                        <div class="'+seatClass+'">'+get_lan("seatInfo").window+'</div>\
                        <div class="'+seatClass+' iconA" seat="'+index+'A"></div>\
                        <div class="'+seatClass+' iconC" seat="'+index+'C"></div>\
                        <div class="'+seatClass+'">'+get_lan("seatInfo").aisle+'</div>\
                        <div class="'+seatClass+' iconF" seat="'+index+'F"></div>\
                        <div class="'+seatClass+'">'+get_lan("seatInfo").window+'</div>\
                    ')
                }
            }
	     },
	     error : function() {
	       // alert('fail');
	     }
	   }
	);
}
//旅客信息确认
function surePassengerInfo(){
    $('body').mLoading("show");
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
            var passengerJson = JSON.parse(data);
            console.log(passengerJson);
            if(passengerJson.isDirectTicket){
                $(".ricketOutBody").html('<input type="checkbox" class="ricketOutCheckBox"><span style="margin-left:21px;">'+get_lan('ricketOut')+'</span>')
                $(".ricketOutCheckBox").prop("checked",true);
            }else{
                $(".ricketOutBody").html('');
            }
            $(".orderDetail").attr("CompanyID",passengerJson.CompanyID);
            $(".orderDetail").attr("customerId",passengerJson.ID);
            $(".popNameCnText").text(passengerJson.CustomerCN);
            $(".popNameEnText").text(passengerJson.CustomerEN);
            $(".popNameCn .popNameRadio").attr("PassengerName",passengerJson.CustomerCN);
            $(".popNameEn .popNameRadio").attr("PassengerName",passengerJson.CustomerEN);
            // if(trainTicketInfo.type=="oneWay"){
            //     if(!$(".seatInfo").hasClass("hide")){
            //         if($(".deaprtureSeat").attr("passengerseat").length/2 !=$(".passengerLi").length){
            //             alert(get_lan('chooseSeatRemind'));
            //             return false;
            //         }
            //     }
            // }else if(trainTicketInfo.type=="roundTrip"){
            //     if(!$(".seatInfo").hasClass("hide")){
            //         if(!$(".deaprtureSeat").hasClass("hide")){
            //             if($(".deaprtureSeat").attr("passengerseat").length/2 !=$(".passengerLi").length){
            //                 alert(get_lan('chooseSeatRemind'));
            //                 return false;
            //             }
            //         }
            //         if(!$(".returnSeat").hasClass("hide")){
            //             if($(".returnSeat").attr("passengerseat").length/2 !=$(".passengerLi").length){
            //                 alert(get_lan('chooseSeatRemind'));
            //                 return false;
            //             }
            //         }  
            //     }
            // }
            //无审批单
            if(!passengerJson.HasTravelRequest || passengerJson.HasTravelRequest){
                $.ajax(
                  {
                    type:'post',
                    url : $.session.get('ajaxUrl'),
                    dataType : 'json',
                    data:{
                        url: $.session.get('obtCompany')+"/SystemService.svc/ShowMatchedPassengersPost",
                        jsonStr:'{"goAirline":"null","backAirline":"null","newOrder":"0","key":'+netUserId+',"Language":"'+obtLanguage+'"}'
                    },
                    success : function(data) {
                        var res = JSON.parse(data);
                        console.log(res);
                        $('body').mLoading("hide");
                        //备注信息展示
                        var employeeName = obtLanguage =="CN"?passengerJson.CustomerCN:passengerJson.CustomerEN;
                        // remarkInfoPop(passengerJson.CompanyID,passengerJson.ID,employeeName,"true");
                        if(!searchTrainInfo.alterTicketInfo&&!$.session.get('goOnBookOrderNo')&&!$.session.get('TACustomerId')){
                            remarkInfoPop(passengerJson.CompanyID,passengerJson.ID,employeeName,"true");
                        }else if(searchTrainInfo.alterTicketInfo&&!$.session.get('goOnBookOrderNo')){
							// 有了改签信息为什么还要继续预定的单号?
                            var customerId = searchTrainInfo.alterTicketInfo.split(',')[0].split('_')[0];
                            if(!JSON.parse($.session.get('ProfileInfo')).HasTravelRequest){
                                //12.27更换接口接口url: $.session.get('obtCompany')+"/SystemService.svc/AddOrderCustomerPost",
                                // jsonStr:'{"key":'+netUserId+',"companyId":"'+searchTrainInfo.alterTicketInfo.split(',')[2]+'","customerId":"'+customerId+'","remarks":"","isCopy":"false","language":"'+obtLanguage+'"}'
                                console.log("AddOrderCustomer1")
                                var orderInfo=JSON.parse($.session.get('trainTicketChanges'))
                                var jsonStr={request:{
                                    key:netUserId.split('\"')[1],
                                    companyId:searchTrainInfo.alterTicketInfo.split(',')[2],
                                    customerId:customerId,
                                    remarks:"",
                                    isCopy:false,
                                    language:obtLanguage,
                                    orgOrderNo:orderInfo[0].orderNo
                                }}
                                console.log(jsonStr)
                                
                                $.ajax(
                                {
                                    type:'post',
                                    url : $.session.get('ajaxUrl'), 
                                    dataType : 'json',
                                    data:{
                                        url: $.session.get('obtCompany')+"/SystemService.svc/AddOrderCustomer",
                                        jsonStr:JSON.stringify(jsonStr)
                                    },
                                    success : function(data) {
                                        $('body').mLoading("hide");
                                        var res = JSON.parse(data);
                                        console.log(res);
                                        console.log(searchTrainInfo.alterTicketInfo);
                                        $(".orderDetail").attr("CompanyID",searchTrainInfo.alterTicketInfo.split(',')[2]);
                                        if(res == "1"){
                                            passengersInOrder('',"orderChange");
                                        }
                                    },
                                    error : function() {
                                    // alert('fail');
                                    }
                                }
                                );
                            }else{
                                var queryKey = $.session.get('TAnumber')+','+customerId;
                                $.ajax(
                                {
                                    type:'post',
                                    url : $.session.get('ajaxUrl'), 
                                    dataType : 'json',
                                    data:{
                                        url: $.session.get('obtCompany')+"/SystemService.svc/AddTravelRequestCustomerPost",
                                        jsonStr:'{"id":'+netUserId+',"queryKey":"'+queryKey+'","remarks":"","language":"'+obtLanguage+'"}'
                                    },
                                    success : function(data) {
                                        $('body').mLoading("hide");
                                        var res = JSON.parse(data);
                                        console.log(res);
                                        console.log(searchTrainInfo.alterTicketInfo);
                                        $(".orderDetail").attr("CompanyID",searchTrainInfo.alterTicketInfo.split(',')[2]);
                                        if(res == "1"){
                                            passengersInOrder('',"orderChange");
                                        }
                                    },
                                    error : function() {
                                    // alert('fail');
                                    }
                                }
                                );
                            }
							
                        }else if($.session.get('goOnBookOrderNo')){//&&!searchTrainInfo.alterTicketInfo
                            //继续预订
                            $(".choosePassengerBody").hide();
                            $('body').mLoading("show");
							// 11.26 单点登录没有returnTime,此时置空
							var returnTime=$(".orderDetail").attr("datereturn")
							console.log(returnTime)
							if(!returnTime){
								returnTime=""
							}
							// 
                            var queryKey = $(".orderDetail").attr("departecity")+","+$(".orderDetail").attr("arrivecity")+","+$(".orderDetail").attr("datestart")+","+returnTime;
                            var jsonStr={
                            	request:{
                            		"id":netUserId.split('"')[1],
                            		"bcn":$.session.get('goOnBookOrderNo'),
                            		"Language":obtLanguage,
                            		"itemID":"0",
                            		"queryKey":queryKey,
                            		"reginType":"",
                            		"dstCode":$(".orderDetail").attr("cityList").split(",")[1].split('"')[1]
                            	},
                            }
							$.ajax(
                              {
                                type:'post',
                                url : $.session.get('ajaxUrl'), 
                                dataType : 'json',
                                // data:{
                                //     url: $.session.get('obtCompany')+"/SystemService.svc/BookInOneOrderPost",
                                //     jsonStr:'{"id":'+netUserId+',"bcn":"'+$.session.get('goOnBookOrderNo')+'","Language":"'+obtLanguage+'","itemID":"0","queryKey":"'+queryKey+'"}'
                                // },
								data:{
								    url: $.session.get('obtCompany')+"/SystemService.svc/BookInOneOrderNew",
								    jsonStr:JSON.stringify(jsonStr)
								},
                                success : function(data) {
                                    $('body').mLoading("hide");
                                    var res = JSON.parse(data);
                                    console.log(res);
                                    $(".passengerList").html('');
                                    if(res.Message){
                                        alert(res.Message)
                                    }else{
										// 12.03隐藏
										if(searchTrainInfo.alterTicketInfo){
											if(typeof $.session.get('trainTicketChanges')!='undefined'){
												var checkedCustomer=JSON.parse($.session.get('trainTicketChanges'))
											}
											res.Customers.map(function(item,index){
											    // $(".passengerList").append('\
											    //     <div class="passengerLi flexRow" customerId="'+item.CustomerID+'">
													var Gender=item.Gender==null?"":item.Gender
													var Nationality=item.Nationality==null?"":item.Nationality
													console.log(item)
												$(".passengerList").append('\
													<div class="passengerLi flexRow" Gender="'+Gender+'" Nationality="'+Nationality+'" customerId="'+item.ID+'" companyId="'+item.OrderCompanyId+'">\
											        <div class="passengerLiDiv" style="width:250px;"><span class="PassengerNameText">'+item.CustomerName+'</span></div>\
											        <div class="passengerLiDiv passengerPhone" style="width:150px;">'+item.Phone+'</div>\
											        <div class="passengerLiDiv" style="width:200px;">'+item.Email+'</div>\
											        <div class="passengerLiDiv passengerLiDocuments" style="width:300px;"><select class="documentsSelect"></select></div>\
											        </div>\
											        \
											        ')
													var checkedID=''
											    item.DocumentsDetail.map(function(ditem){
													if(typeof $.session.get('trainTicketChanges')!='undefined'){
														if(ditem.DocumentNumber == checkedCustomer[index].customerDocment){
															checkedID=ditem.Rid
														}
													}
													
											        $(".documentsSelect").eq(index).append('\
											            <option value="'+ditem.Rid+'" docText="'+ditem.DocumentNumber+'">'+ditem.nameDoc+':'+ditem.DocumentNumber+'</option>\
											        ')
											    })
												$('.documentsSelect').val(checkedID)
											})
											$('.passengerInfo').css({"position":"absolute","opacity":"0","z-index":'-1'})
										}else{
											res.Customers.map(function(item,index){
											    // $(".passengerList").append('\
											        // <div class="passengerLi flexRow" customerId="'+item.CustomerID+'">
													var Gender=item.Gender==null?"":item.Gender
													var Nationality=item.Nationality==null?"":item.Nationality
													//CustomerID还是ID
													$(".passengerList").append('\
													    <div class="passengerLi flexRow" Gender="'+Gender+'" Nationality="'+Nationality+'" customerId="'+item.CustomerID+'" companyId="'+item.OrderCompanyId+'">\
											        <div class="passengerLiDiv" style="width:250px;"><span class="PassengerNameText">'+item.CustomerName+'</span></div>\
											        <div class="passengerLiDiv passengerPhone" style="width:150px;">'+item.Phone+'</div>\
											        <div class="passengerLiDiv" style="width:200px;">'+item.Email+'</div>\
											        <div class="passengerLiDiv passengerLiDocuments" style="width:300px;"><select class="documentsSelect"></select></div>\
											        </div>\
											        \
											        ')
											    item.DocumentsDetail.map(function(ditem){
											        $(".documentsSelect").eq(index).append('\
											            <option value="'+ditem.Rid+'" docText="'+ditem.DocumentNumber+'">'+ditem.nameDoc+':'+ditem.DocumentNumber+'</option>\
											        ')
											    })
												
											})
										}
                                        trainSeat(res.Customers);
                                        totalAmount();
                                    }
                                },
                                error : function() {
                                  // alert('fail');
                                }
                              } 
                            );
                        }
                        //有代订权限
						console.log(res)
                        if(res.length > 1){
                            if(!passengerJson.HasTravelRequest||(passengerJson.HasTravelRequest&&!$.session.get('TAnumber'))){
                                $(".choosePassengerBody").html('\
                                    <div style="min-width:110px;">'+get_lan('passengerInfo').choosePassenger+'</div>\
                                    <div class="selectPassengerBody">\
                                    <input type="text" class="selectPassengerInput" autocomplete="off" placeholder="'+get_lan('passengerInfo').selectPassengerRemind+'">\
                                    <div class="selectPassengerSearch btnBackColor">'+get_lan('passengerInfo').selectPassengerSearch+'</div>\
                                    <div class="selectPassengerArrow">▼</div>\
                                    <div class="selectPassengerList autoScrollY"></div>\
                                    </div>\
                                    <span class="addNewCustomer">'+get_lan('passengerInfo').addNewCustomer+'</span>\
                                    ')
                                if(searchTrainInfo.alterTicketInfo){
                                    $(".choosePassengerBody").hide();
                                    $(".closeRemarkBtn").remove();
                                    $(".sureRemarkBtn").css("margin","0 auto");
                                    $(".ricketOutBody").html('');
                                }
                                $(".remarkFooter").html('\
                                    <div class="closeRemarkBtn mainBackColor" style="margin-left:10%;">'+get_lan('remarkPop').cancel+'</div>\
                                    <div class="sureRemarkBtn btnBackColor" style="margin-left:38%;">'+get_lan('remarkPop').confirm+'</div>\
                                    ')
                                closeRemarkPop();
                                selectPassengers();
                                /*添加新旅客*/
                                $.ajax(
                                  {
                                    type:'post',
                                    url : $.session.get('ajaxUrl'), 
                                    dataType : 'json',
                                    data:{
                                        url: $.session.get('obtCompany')+"/SystemService.svc/CheckAddNewCustomerPost",
                                        jsonStr:'{"language":"'+obtLanguage+'","id":'+netUserId+'}'
                                    },
                                    success : function(data) {
                                        var res = JSON.parse(data);
                                        console.log(res);
                                        if(res.CanAddNewCustomer){
                                            $(".addNewCustomer").unbind("click").click(function(){
                                                newCustomerPop(res.CompanyId);
                                                openNewCustomer();
                                            })
                                        }else{
                                            $(".addNewCustomer").remove();
                                        }
                                    },
                                    error : function() {
                                      // alert('fail');
                                    }
                                  } 
                                );
                            }else{
                                closeRemarkPop();
                                // alert($.session.get('TAnumber'));
                                if($.session.get('TACustomerId')){
                                    var TACustomerId = $.session.get('TACustomerId');
                                    // alert(TACustomerId);
                                }
                                $(".remarkFooter").html('\
                                    <div class="sureRemarkBtn btnBackColor" style="margin:0 auto;">'+get_lan('remarkPop').confirm+'</div>\
                                ')
                                remarkInfoPop(TACustomerId.split(',')[1],TACustomerId.split(',')[0],TACustomerId.split(',')[2],"true");
                            }
                        }
                        //无代订权限
                        else{
                            oneCustomer();
                            // 有审批单权限
							var city=$('.orderDetail').attr('departecity')+','+$('.orderDetail').attr('arrivecity')
                            if(passengerJson.HasTravelRequest&&!$.session.get('goOnBookOrderNo')&&!$.session.get('TAnumber')){
                                var queryKey = passengerJson.ID+$(".orderDetail").attr("queryKey");
                                tools.customerTravelRequest(netUserId,queryKey,function(){
                                    $(".requestCover").remove();
                                    tools.getTravelRequestRemark(netUserId,queryKey,function(data){
                                        var res = JSON.parse(data);
                                        console.log(res.Remarks);
                                        remark(res.Remarks,passengerJson.ID,passengerJson.CompanyID,"true");
                                    })
                                },2,city)
                            }
                            
                            function oneCustomer(){
                                $(".passengerBody").attr("state","true");
                                $(".choosePassengerBody").hide();
                                // $(".closeRemarkBtn").remove();
                                // $(".sureRemarkBtn").css("margin","0 auto");
                                $(".remarkFooter").html('\
                                    <div class="sureRemarkBtn btnBackColor" style="margin:0 auto;">'+get_lan('remarkPop').confirm+'</div>\
                                ')
                            }
                        }
                    },
                    error : function() {
                    }
                  } 
                );
            }else{
                $('body').mLoading("hide");
            }
        },
        error : function() {
          // alert('fail');
        }
      }
    );
}
/*代订*/
function selectPassengers(){
    $(".selectPassengerArrow").unbind("click").click(function(){
        if(!$(this).attr("spread")||$(this).attr("spread")=="no"){
            $(".selectPassengerList").html('\
                <div class="selectPassengerListTittle">'+get_lan('passengerInfo').commonPassengers+'</div>\
                ')
            $('.selectPassengerList').mLoading("show");
            $.ajax(
              {
                type:'post',
                url : $.session.get('ajaxUrl'),
                dataType : 'json',
                data:{
                    url: $.session.get('obtCompany')+"/SystemService.svc/GetCommonPassengersPost",
                    jsonStr:'{"key":'+netUserId+',"Language":"'+obtLanguage+'"}'
                },
                success : function(data) {
                    $('.selectPassengerList').mLoading("hide");
                    var res = JSON.parse(data);
                    console.log(res);
                    res.map(function(item){
                        var name = obtLanguage=="CN"?item.NameCN:item.NameEN;
                        $(".selectPassengerList").append('\
                            <div class="selectPassengerLi ellipsis" CompanyID="'+item.CompanyID+'" searchId="'+item.ID+'" employeeName="'+item.NameCN+'">'+name+'('+item.Email+')'+'</div>\
                            ')
                    })
                    clickPassengerLi();
                },
                error : function() {
                }
              } 
            );
            $(".selectPassengerList").css("display","block");
            $(this).attr("spread","yes");
        }else if($(this).attr("spread")=="yes"){
            $(".selectPassengerList").css("display","none");
            $(this).attr("spread","no");
        }
    })
    $('.selectPassengerInput').bind('keypress',function(event){
            if(event.keyCode == "13")    
            {
                $(".selectPassengerSearch").click();
            }
    });
    $(".selectPassengerSearch").unbind("click").click(function(){
        $(".selectPassengerList").css("display","block");
        $(".selectPassengerArrow").attr("spread","yes");
        var queryKeys = obtLanguage+","+$(".selectPassengerInput").val();
        $('.selectPassengerList').mLoading("show");
		
		// ShowMatchedPassengerList
		// 有没有已选中乘客
		var haveCustomer=$('.passengerLi').length
		if(haveCustomer>0){
			var request={key:netUserId.split("\"")[1],Language:queryKeys,GoAirline:"null",BackAirline:"null",NewOrder:'1',CompanyId:$('.passengerLi').eq(0).attr('companyid'),ReginType:"",DstCode:""}
			var data={
			    url: $.session.get('obtCompany')+"/SystemService.svc/ShowMatchedPassengerList",
			    jsonStr:'{"request":'+JSON.stringify(request)+'}'
			}
		}else{
			var request={key:netUserId.split("\"")[1],Language:queryKeys,GoAirline:"null",BackAirline:"null",NewOrder:'1',CompanyId:"",ReginType:"",DstCode:""}
			var data={
			    url: $.session.get('obtCompany')+"/SystemService.svc/ShowMatchedPassengerList",
			    jsonStr:'{"request":'+JSON.stringify(request)+'}'
			}
			// 旧接口
			// var data={
   //              url: $.session.get('obtCompany')+"/SystemService.svc/ShowMatchedPassengersPost",
   //              jsonStr:'{"goAirline":"null","backAirline":"null","newOrder":"1","key":'+netUserId+',"Language":"'+queryKeys+'"}'
   //          }
		}
		console.log(data)
		// console.log(request)
		// return false;
        $.ajax(
          {
            type:'post',
            url : $.session.get('ajaxUrl'), 
            dataType : 'json',
            data:data,
            success : function(data) {
                $('.selectPassengerList').mLoading("hide");
                var res = JSON.parse(data);
                console.log(res);
                $(".selectPassengerList").html('');
                res.map(function(item){
                    var name = obtLanguage=="CN"?item.NameCN:item.NameEN;
                    $(".selectPassengerList").append('\
                        <div class="selectPassengerLi ellipsis" CompanyID="'+item.CompanyID+'" searchId="'+item.ID+'" employeeName="'+item.NameCN+'">'+name+'('+item.Email+')'+'</div>\
                        ')
                })
                clickPassengerLi();
            },
            error : function() {
              // alert('fail');
            }
          } 
        );
    })
    function clickPassengerLi(){
        $(".selectPassengerLi").unbind("click").click(function(){
            $('body').mLoading("show");
            $(".selectPassengerList").css("display","none");
            if(trainTicketInfo.type == "oneWay"){
                var queryKey = $(this).attr("searchId")+',4,'+JSON.parse($.session.get('searchTrainInfo')).departureCityText+','+JSON.parse($.session.get('searchTrainInfo')).arrivalCityText+','+trainTicketInfo.date+',';
            }else if(trainTicketInfo.type == "roundTrip"){
                var queryKey = $(this).attr("searchId")+',4,'+JSON.parse($.session.get('searchTrainInfo')).departureCityText+','+JSON.parse($.session.get('searchTrainInfo')).arrivalCityText+','+trainTicketInfo.date+','+trainTicketInfo.returndate;
            }
            var CompanyID = $(this).attr("CompanyID");
			
			// 12.17修改
			var haveCustomer=$('.passengerLi').length
			if(haveCustomer>0){
			console.log(CompanyID)
			console.log($('.passengerLi').eq(0).attr('companyid'))
				if(CompanyID!=$('.passengerLi').eq(0).attr('companyid')){
					var CNStr="当前乘机人与其他乘机人不属于同一公司账户/支付方式不同，请分别预订。"
					var ENStr="This traveler is not under the same company account/legal entity、or payment method with others. Please book separately."
					if(obtLanguage=="CN"){
						alert(CNStr)
					}else{
						alert(ENStr)
					}
					$('body').mLoading("hide");
					return false;
				}
			}
			
            var customerId = $(this).attr("searchId");
            var employeeName = $(this).attr("employeeName");
            $(".passengerBody").attr("state","true");
            // 有审批单权限
			var city=$('.orderDetail').attr('departecity')+','+$('.orderDetail').attr('arrivecity')
            if(JSON.parse($.session.get('ProfileInfo')).HasTravelRequest){
                tools.customerTravelRequest(netUserId,queryKey,function(){
                    $(".requestCover").remove();
                    if($(".passengerLi").length == 0){
                        remarkInfoPop(CompanyID,customerId,employeeName,"true");
                    }else{
                        remarkInfoPop($(".passengerLi").eq(0).attr("companyId"),customerId,employeeName,"true");
                    }
                },1,city)
            }else{
                $.ajax(
                  {
                    type:'post',
                    url : $.session.get('ajaxUrl'),
                    dataType : 'json',
                    data:{
                        url: $.session.get('obtCompany')+"/SystemService.svc/CheckCustomerHasTravelRequestPost",
                        jsonStr:'{"queryKey":"'+queryKey+'","id":'+netUserId+',"Language":"'+obtLanguage+'","otherCitys":"'+city+'"}'
                    },
                    success : function(data) {
                        $('body').mLoading("hide");
                        var res = JSON.parse(data);
                        console.log(res);
                        if(res.Remarks.length != 0){
                            $(".passengerBody").attr("state","true");
                            if($(".passengerLi").length == 0){
                                remarkInfoPop(CompanyID,customerId,employeeName,"true");
                            }else{
                                remarkInfoPop($(".passengerLi").eq(0).attr("companyId"),customerId,employeeName,"true");
                            }
                        }
                    },
                    error : function() {
                    }
                  } 
                );
            }
        })
    }
}
/*备注信息弹窗*/
function remarkInfoPop(CompanyID,CustomerID,employeeName,isFirst){
    $('body').mLoading("show");
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/SystemService.svc/CurrentPassengersInOrderPost",
            jsonStr:'{"key":'+netUserId+',"Language":"'+obtLanguage+'"}'
        },
        success : function(data) {
            $('body').mLoading("hide");
            var res = JSON.parse(data);
            console.log(res);
            if(res.length==0){
                $(".businessTripBody").html('\
                    <div class="businessTripLi flexRow">\
                    <div class="tripLiTittle">'+get_lan('remarkPop').tripNameTittle+'</div>\
                    <div class="employeeName">'+employeeName+'</div>\
                    </div>\
                    <div class="businessTripLi flexRow">\
                    <div class="tripLiTittle">'+get_lan('remarkPop').tripCompanyTittle+'</div>\
                    <select class="chooseCompany">\
                    </select>\
                    </div>\
                    <div class="companyRemind hide">\
                      <div class="companyRemindTittle">'+get_lan('remarkPop').companyRemindTittle+'</div>\
                      <div class="companyRemindText">'+get_lan('remarkPop').companyRemindText+'</div>\
                    </div>\
                ')
                $('body').mLoading("show");
                $.ajax(
                  {
                    type:'post',
                    url : $.session.get('ajaxUrl'), 
                    dataType : 'json',
                    data:{
                        url: $.session.get('obtCompany')+"/SystemService.svc/HasBGMCPost",
                        jsonStr:'{"key":'+netUserId+',"customerId":"'+CustomerID+'","Language":"'+obtLanguage+'"}'
                    },
                    success : function(data) {
                        var res = JSON.parse(data);
                        console.log(res);
                        $('body').mLoading("hide");
                        if(res.length==0){
                            $(".businessTripLi").eq(1).hide();
                        }
                        res.map(function(item){
                            if(item.CompanyId==JSON.parse($.session.get('ProfileInfo')).companyId){
                                $(".chooseCompany").append('\
                                    <option value="'+item.CompanyId+'">'+item.CompanyName+'</option>\
                                ')
                            }
                        })
                        res.map(function(item){
                            if(item.CompanyId!=JSON.parse($.session.get('ProfileInfo')).companyId){
                                $(".chooseCompany").append('\
                                    <option value="'+item.CompanyId+'">'+item.CompanyName+'</option>\
                                ')
                            }
                        })
                        $(".chooseCompany").change(function(){
                            var changeCompanyId=$('.chooseCompany option:selected').val();
                            if(changeCompanyId!=$('.chooseCompany option').eq(0).val()){
                                $(".companyRemind").removeClass("hide");
                            }else{
                                $(".companyRemind").addClass("hide");
                            }
                            getNewRemark(CustomerID,changeCompanyId,isFirst)
                        })
                        getNewRemark(CustomerID,CompanyID,isFirst)
                    },
                    error : function() {
                      // alert('fail');
                    }
                  } 
                );
            }else{
                $(".businessTripBody").html('\
                    <div class="businessTripLi flexRow">\
                    <div class="tripLiTittle">'+get_lan('remarkPop').tripNameTittle+'</div>\
                    <div class="employeeName">'+employeeName+'</div>\
                    </div>\
                    ')
                getNewRemark(CustomerID,CompanyID,isFirst);
            }
        },
        error : function() {
          // alert('fail');
        }
      }
    );
    function getNewRemark(CustomerID,CompanyId,isFirst){
        $('body').mLoading("show");
		// console.log(isFirst)
        // console.log(isFirst=="true")
        if($.session.get('TAnumber')){
            var queryKey = CustomerID+$(".orderDetail").attr("queryKey");
            tools.getTravelRequestRemark(netUserId,queryKey,function(data){
                var res = JSON.parse(data);
                console.log(res.Remarks);
                remark(res.Remarks,CustomerID,ProfileInfo.CompanyID,"true");
            })
        }else{
            if(isFirst=="true"){
                $.ajax(
                  {
                    type:'post',
                    url : $.session.get('ajaxUrl'), 
                    dataType : 'json',
                    data:{
                        url: $.session.get('obtCompany')+"/SystemService.svc/GetRemarkConfigInfoNew",
                        jsonStr:'{"request":{"customerId":'+CustomerID+',"companyID":"'+CompanyId+'","key":'+netUserId+',"tripType":"TRAIN"}}'
                    },
                    success : function(data) {
                        var res = JSON.parse(data);
                        console.log(res);
                        $('body').mLoading("hide");
                        remark(res,CustomerID,CompanyId,isFirst);
                    },
                    error : function() {
                      // alert('fail');
                    }
                  } 
                );
            }else if(isFirst=="false"){
                $.ajax(
                  {
                    type:'post',
                    url : $.session.get('ajaxUrl'), 
                    dataType : 'json',
                    data:{
                        url: $.session.get('obtCompany')+"/SystemService.svc/GetOrderCustomerRemark",
                        jsonStr:'{"id":'+netUserId+',"customerId":"'+CustomerID+'","companyID":"'+CompanyId+'"}'
                    },
                    success : function(data) {
                        var res = JSON.parse(data);
                        console.log(res);
                        $('body').mLoading("hide");
                        remark(res,CustomerID,CompanyId,isFirst);
                    },
                    error : function() {
                      // alert('fail');
                    }
                  } 
                );
            }
        }
    }
    openRemarkPop();
}
function remark(remarks,CustomerID,CompanyID,isFirst){
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
                <div class="remarkLi flexRow">\
                  <div id="liTittle'+item.Index+'" class="liTittle '+colorRed+'" title="'+item.Title+'">'+starIcon+item.Title+'</div>\
                  <div class="liContent" index="'+item.Index+'"><input id="remarkInput'+item.Index+'" class="remarkLiInput" require="'+colorRed+'" index="'+item.Index+'" value="'+item.Content+'" key="'+item.SubmitContent+'" disabled></div>\
                </div>\
            ')
        }else if(item.CanModify&&item.InList){
            if(!item.ListCanSearch){
                $(".remarkInfoBody").append('\
                    <div class="remarkLi flexRow">\
                      <div id="liTittle'+item.Index+'" class="liTittle '+colorRed+'" title="'+item.Title+'">'+starIcon+item.Title+'</div>\
                      <div class="liContent">\
                        <select class="remarkSelect" index="'+index+'" id="remarkSelect'+item.Index+'">\
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
                        <select class="remarkSelect" index="'+index+'" id="remarkSelect'+item.Index+'">\
                          <option>'+get_lan("remarkPop").Choose+'</option>\
                        </select>\
                        <input class="remarkLiInput" CompanyID="'+CompanyID+'" id="remarkInput'+item.Index+'" require="'+colorRed+'" value="'+item.Content+'" index="'+item.Index+'"  key="'+item.SubmitContent+'" placeholder="'+get_lan("remarkPop").search+'">\
                      </div>\
                    </div>\
                ')
                $("#remarkInput"+item.Index+"").searchRemark();
            }
        }else if(item.CanModify&&!item.InList){
            $(".remarkInfoBody").append('\
                <div class="remarkLi flexRow">\
                  <div id="liTittle'+item.Index+'" class="liTittle '+colorRed+'" title="'+item.Title+'">'+starIcon+item.Title+'</div>\
                  <div class="liContent">\
                    <select class="remarkSelect" index="'+index+'">\
                      <option>'+get_lan("remarkPop").Choose+'</option>\
                    </select>\
                    <input id="remarkInput'+item.Index+'" CompanyID="'+CompanyID+'" class="remarkLiInput" require="'+colorRed+'" index="'+item.Index+'" value="'+item.Content+'">\
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
        // console.log(index);
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
        
        // var inputIndex = parseInt($(".remarkSelect").eq(i).find("option:selected").attr("index"));
        // $(".remarkLiInput").eq(inputIndex).val($(".remarkSelect").eq(i).find("option:selected").text());
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
                            // 12.13新增
                            $("#remarkInput"+rItem.SubRemarkIndex+"").prev().removeAttr("disabled");
                            $("#remarkSelect"+rItem.SubRemarkIndex+"").show();
                            $("#remarkInput"+rItem.SubRemarkIndex+"").searchRemark();
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
                remarks += $(".remarkLiInput").eq(i).attr("index")+'-'+$(".remarkLiInput").eq(i).val().split(',').join('##')+',';
            }
            if($(".remarkLiInput").eq(i).attr("key")){
                remarks += $(".remarkLiInput").eq(i).attr("index")+'-'+$(".remarkLiInput").eq(i).attr("key").split(',').join('##')+',';
            }
            // if($(".remarkLiInput").eq(i).attr("index")!= 10&&!$(".remarkLiInput").eq(i).attr("key")){
            //     remarks += $(".remarkLiInput").eq(i).attr("index")+'-'+$(".remarkLiInput").eq(i).val()+',';
            // }
            // if($(".remarkLiInput").eq(i).attr("index")!= 10&&$(".remarkLiInput").eq(i).attr("key")){
            //     remarks += $(".remarkLiInput").eq(i).attr("index")+'-'+$(".remarkLiInput").eq(i).attr("key")+',';
            // }
            // if($(".remarkLiInput").eq(i).attr("index")== 10){
            //     remarks += $(".remarkLiInput").eq(i).attr("index")+'-'+$(".remarkLiInput").eq(i).val().split('-').join('@')+',';
            // }
        }
        if(remarkCorrect!=''){
            alert(get_lan("remarkPop").remarkRemind);
            return false;
        }
        var isCopy = false;
        $('body').mLoading("show");
        console.log("更换remark")
        if(isFirst == "true"){
            if(!JSON.parse($.session.get('ProfileInfo')).HasTravelRequest&&!$.session.get('TAnumber')){
                console.log("AddOrderCustomer2")
                // url: $.session.get('obtCompany')+"/SystemService.svc/AddOrderCustomerPost",
                // jsonStr:'{"key":'+netUserId+',"customerId":"'+CustomerID+'","companyId":"'+CompanyID+'","remarks":"'+remarks.substring(0,remarks.length-1)+'","isCopy":"'+isCopy+'","language":"'+obtLanguage+'"}'
                var jsonStr={request:{
                    key:netUserId.split('\"')[1],
                    companyId:CompanyID,
                    customerId:CustomerID,
                    remarks:remarks.substring(0,remarks.length-1),
                    isCopy:isCopy,
                    language:obtLanguage,
                    orgOrderNo:"",
                    // orgOrderNo:$.session.get('trainTicketChanges')[0].orderNo,
                }}
                $.ajax(
                {
                    type:'post',
                    url : $.session.get('ajaxUrl'), 
                    dataType : 'json',
                    data:{
                        url: $.session.get('obtCompany')+"/SystemService.svc/AddOrderCustomer",
                        jsonStr:JSON.stringify(jsonStr)
                    },
                    success : function(data) {
                        $('body').mLoading("hide");
                        var res = JSON.parse(data);
                        console.log(res);
                        $(".orderDetail").attr("CompanyID",CompanyID);
                        // console.log(queryKeys);
                        if(res == "1"){
                            closeRemarkPop();
                            passengerPopChange(CustomerID,isFirst,1);
                        }else{
                            alert(res);
                        }
                    },
                    error : function() {
                    // alert('fail');
                    }
                } 
                );
            }else{
                var queryKey = $.session.get('TAnumber')+','+CustomerID;
                $.ajax(
                  {
                    type:'post',
                    url : $.session.get('ajaxUrl'), 
                    dataType : 'json',
                    data:{
                        url: $.session.get('obtCompany')+"/SystemService.svc/AddTravelRequestCustomerPost",
                        jsonStr:'{"id":'+netUserId+',"queryKey":"'+queryKey+'","remarks":"'+remarks.substring(0,remarks.length-1)+'","language":"'+obtLanguage+'"}'
                    },
                    success : function(data) {
                        $('body').mLoading("hide");
                        var res = JSON.parse(data);
                        console.log(res);
                        $(".orderDetail").attr("CompanyID",CompanyID);
                        // console.log(queryKeys);
                        if(res == "1"){
                            closeRemarkPop();
                            passengerPopChange(CustomerID,isFirst,1);
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
            
        }else if(isFirst == "false"){
            $.ajax(
              {
                type:'post',
                url : $.session.get('ajaxUrl'), 
                dataType : 'json',
                data:{
                    url: $.session.get('obtCompany')+"/SystemService.svc/ModifyOrderCustomerRemark",
                    jsonStr:'{"key":'+netUserId+',"customerId":"'+CustomerID+'","companyId":"'+CompanyID+'","remarks":"'+remarks.substring(0,remarks.length-1)+'","isCopy":"'+isCopy+'"}'
                },
                success : function(data) {
                    $('body').mLoading("hide");
                    var res = JSON.parse(data);
                    console.log(res);
                    // console.log(queryKeys);
                    if(res == "1"){
                        closeRemarkPop();
                        passengersInOrder();
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
    if(isFirst == "true"&&$(".passengerBody").attr("state")=="true"&&ProfileInfo.IsHideRemarkInput){
        $(".sureRemarkBtn").click();
    }
}
/*个人信息弹窗*/
// function passengerPop(){
//     $(".PassengerPop").html('\
//         <div class="passengerPopTittle">'+get_lan('passengerPop').popTittle+get_lan('passengerPop').remind+'</div>\
//         <div class="passengerPopList">\
//         <div class="popChooseName">\
//           '+get_lan('passengerPop').chooseName+'<span style="color:#E31836">'+get_lan('passengerPop').nameRemind+'</span>\
//         </div>\
//         <div class="popNameCn flexRow">\
//         <input type="radio" name="popName" class="popNameRadio"><div style="width:90px;">'+get_lan('passengerPop').popNameCn+'</div><span class="popNameCnText"></span>\
//         </div>\
//         <div class="popNameEn flexRow">\
//         <input type="radio" name="popName" class="popNameRadio"><div style="width:90px;">'+get_lan('passengerPop').popNameEn+'</div><span class="popNameEnText"></span>\
//         </div>\
//         <div class="popPhone flexRow">\
//         <div style="width:107px;">'+get_lan('passengerPop').popPhone+'<span style="color:#E31836">*</span></div>\
//         <input type="text" class="popPhoneInput">\
//         </div>\
//         <div class="popMail flexRow">\
//         <div style="width:107px;">'+get_lan('passengerPop').popMail+'<span style="color:#E31836">*</span></div>\
//         <input type="text" class="popMailInput">\
//         </div>\
//         <div class="popDocuments flexRow">\
//         <div style="width:107px;">'+get_lan('passengerPop').popDocuments+'<span style="color:#E31836">*</span></div>\
//         <select class="popDocumentsSelect"></select>\
//         <input type="text" class="popDocumentsInput">\
//         </div>\
//         <div class="popDocumentsTime flexRow hide">\
//         <div style="width:107px;">'+get_lan('passengerPop').popDocumentsTime+'<span style="color:#E31836">*</span></div>\
//         <input type="text" class="popDocumentsTimeInput" readonly placeholder="'+get_lan('passengerPop').timeRemind+'">\
//         </div>\
//         <div class="popFrequentFlier flexRow">\
//         <div style="width:107px;">'+get_lan('passengerPop').popFrequentFlier+'</div>\
//         <select class="popFrequentFlierSelect"></select>\
//         <input type="text" class="popFrequentFlierInput">\
//         </div>\
//         </div>\
//         <div class="passengerPopBtn">'+get_lan('remarkPop').confirm+'</div>\
//         ');
//     $(".popDocumentsSelect").change(function(){
//         if($('.popDocumentsSelect option:selected').attr("Rid")==1){
//             $(".popDocumentsTime").addClass("hide");
//         }else{
//             $(".popDocumentsTime").removeClass("hide");
//         }
//     })
//     $(".popDocumentsTimeInput").datepicker({
//         dateFormat: 'yy-mm-dd',
//         changeMonth: true,
//         minDate: 0,  // 当前日期之后的 0 天，就是当天
//         hideIfNoPrevNext: true,
//         showOtherMonths: true,
//         selectOtherMonths: true,
//     });
//     $.ajax(
//       {
//         type:'post',
//         url : $.session.get('ajaxUrl'), 
//         dataType : 'json',
//         data:{
//             url: $.session.get('obtCompany')+"/SystemService.svc/GetInformationsPost",
//             jsonStr:'{"culture":"'+obtLanguage+'"}'
//         },
//         success : function(data) {
//             var res = JSON.parse(data);
//             console.log(res);
//             res.DocumentTypeList.map(function(item){
//                 $(".popDocumentsSelect").append('<option Rid="'+item.Rid+'">'+item.Name+'</option>');
//             })
//         },
//         error : function() {
//           // alert('fail');
//         }
//       } 
//     );
// }
/*个人信息弹窗*/
function passengerPop(){
    $(".PassengerPop").html('\
        <div class="passengerPopTittle tittleBackColor">'+get_lan('passengerPop').popTittle+get_lan('passengerPop').remind+'</div>\
        <div class="passengerPopList">\
        <div class="popChooseName">\
          '+get_lan('passengerPop').chooseName+'<span class="colorRed">'+get_lan('passengerPop').nameRemind+'</span>\
        </div>\
        <div class="popNameCn flexRow">\
        <input type="radio" name="popName" class="popNameRadio" checked><div style="width:105px;">'+get_lan('passengerPop').popNameCn+'</div><span class="popNameCnText"></span>\
        </div>\
        <div class="popNameEn flexRow">\
        <input type="radio" name="popName" class="popNameRadio"><div style="width:105px;">'+get_lan('passengerPop').popNameEn+'</div><span class="popNameEnText"></span>\
        </div>\
        <div class="popPhone flexRow">\
        <div style="width:130px;">'+get_lan('passengerPop').popPhone+'<span class="colorRed">*</span></div>\
        <input type="text" class="popPhoneInput" maxlength="11">\
        </div>\
        <div class="popMail flexRow">\
        <div style="width:130px;">'+get_lan('passengerPop').popMail+'<span class="colorRed">*</span></div>\
        <input type="text" class="popMailInput">\
        </div>\
        <div class="popDocuments flexRow">\
        <div style="width:130px;">'+get_lan('passengerPop').popDocuments+'<span class="colorRed">*</span></div>\
        <select class="popDocumentsSelect">\
          <option value="">'+get_lan('passengerPop').popDocumentsRemind+'</option>\
        </select>\
        <input type="text" class="popDocumentsInput" disabled>\
        </div>\
        <div class="popDocumentsTime flexRow hide">\
        <div style="width:130px;">'+get_lan('passengerPop').popDocumentsTime+'<span class="colorRed">*</span></div>\
        <input type="text" class="popDocumentsTimeInput" disabled placeholder="'+get_lan('passengerPop').timeRemind+'">\
        </div>\
        </div>\
        <div class="passengerPopBottom">\
          <div class="passengerPopBtn">'+get_lan('remarkPop').confirm+'</div>\
        <div>\
        ');
    if(ProfileInfo.onlineStyle=="APPLE"){
        $(".popPhoneInput").attr("readonly","readonly");
        $(".popMailInput").attr("readonly","readonly");
    }
    $(".popDocumentsTimeInput").datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        minDate: 0,  // 当前日期之后的 0 天，就是当天
        hideIfNoPrevNext: true,
        showOtherMonths: true,
        selectOtherMonths: true,
    });
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/SystemService.svc/GetInformationsPost",
            jsonStr:'{"culture":"'+obtLanguage+'"}'
        },
        success : function(data) {
            var res = JSON.parse(data);
            console.log(res);
            res.DocumentTypeList.map(function(item){
                $(".popDocumentsSelect").append('<option value="'+item.Rid+'">'+item.Name+'</option>');
            })
        },
        error : function() {
          // alert('fail');
        }
      } 
    );
}
/*添加新旅客弹窗*/
function newCustomerPop(CompanyId){
    $(".newCustomerPop").html('\
        <div class="newCustomerPopTittle tittleBackColor">'+get_lan('passengerPop').popTittle+'</div>\
        <div class="passengerPopList">\
            <div class="newCustomerLi require flexRow">\
                <div style="width:105px;">'+get_lan('passengerPop').popNameCn+'</div>\
                <input type="text" class="newCustomerHalfInput newCustomerInputSurNameCn" placeholder="'+get_lan('newCustomerPop').surname+'">\
                <input type="text" class="newCustomerHalfInput newCustomerInputGivenNameCn" placeholder="'+get_lan('newCustomerPop').givenName+'" style="margin-left:8px;">\
            </div>\
            <div class="newCustomerLi require flexRow">\
                <div style="width:105px;">'+get_lan('passengerPop').popNameEn+'</div>\
                <input type="text" class="newCustomerHalfInput newCustomerInputSurNameEn" placeholder="'+get_lan('newCustomerPop').surname+'">\
                <input type="text" class="newCustomerHalfInput newCustomerInputGivenNameEn" placeholder="'+get_lan('newCustomerPop').givenName+'" style="margin-left:8px;">\
            </div>\
            <div class="newCustomerLi flexRow">\
                <div style="width:105px;">'+get_lan('newCustomerPop').nick+'</div>\
                <input type="text" class="newCustomerInput newCustomerInputNick">\
            </div>\
            <div class="newCustomerLi require flexRow">\
                <div style="width:105px;">'+get_lan('newCustomerPop').sex+'</div>\
                <div style="width:43px;text-align:center;">'+get_lan('newCustomerPop').male+'</div>\
                <input type="radio" name="newPopSex" class="newPopSexRadio" checked sexValue="false">\
                <div style="width:43px;text-align:center;">'+get_lan('newCustomerPop').female+'</div>\
                <input type="radio" name="newPopSex" class="newPopSexRadio" sexValue="true">\
            </div>\
            <div class="newCustomerLi require flexRow">\
                <div style="width:105px;">'+get_lan('passengerPop').popPhone+'</div>\
                <input type="text" class="newCustomerInput newCustomerInputPhone" maxlength="11">\
            </div>\
            <div class="newCustomerLi require flexRow">\
                <div style="width:105px;">'+get_lan('passengerPop').popMail+'</div>\
                <input type="text" class="newCustomerInput newCustomerInputEmail">\
            </div>\
            <div class="newCustomerLi require flexRow">\
                <div style="width:105px;">'+get_lan('passengerPop').popDocuments+'</div>\
                <select class="newPopDocumentsSelect">\
                  <option>'+get_lan('passengerPop').popDocumentsRemind+'</option>\
                </select>\
                <input type="text" class="newCustomerInput newCustomerInputDocuments">\
            </div>\
            <div class="newCustomerLi require flexRow hide newCustomerTime">\
                <div style="width:105px;">'+get_lan('passengerPop').popDocumentsTime+'</div>\
                <input type="text" class="newCustomerInput newCustomerInputTime" readonly placeholder="'+get_lan('passengerPop').timeRemind+'">\
            </div>\
            <div class="newCustomerLi require flexRow">\
                <div style="width:105px;">'+get_lan('newCustomerPop').nationality+'</div>\
                <input type="text" class="newCustomerInput newCustomerInputNationality" id="countryInput" autocomplete="off">\
            </div>\
            <div class="newCustomerLi require flexRow">\
                <div style="width:105px;">'+get_lan('newCustomerPop').birthday+'</div>\
                <input type="text" class="newCustomerInput newCustomerInputBirthday" readonly value="1985-1-1">\
            </div>\
			<div class="newCustomerLi require flexRow remarkTips">\
			    <div style="width:100%;font-size: 12px;color: red;">'+get_lan('newCustomerPop').required+'</div>\
			</div>\
        </div>\
        <div class="newCustomerPopBottom flexRow">\
          <div class="newCustomerPopCancel" style="background-color:#979797;margin:16px 0 27px 30px;">'+get_lan('remarkPop').cancel+'</div>\
          <div class="newCustomerPopBtn mainBackColor" style="margin:16px 0 27px 190px;">'+get_lan('remarkPop').confirm+'</div>\
        <div>\
        ');
	// 隐藏必填项
	if(ProfileInfo.onlineStyle!="eTravel"){
		$(".remarkTips").remove()
	}
    $(".newCustomerPopCancel").unbind("click").click(function(){
        closeNewCustomer();
    })
	
	//验证身份证
	function testIDCard(){
		//证件类型
		var type=$('.newPopDocumentsSelect').val()//1身份证
		var IDcard = $('.newCustomerInputDocuments').val()
		var res = tools.testIdCard(IDcard)
		if(res.status==1 && type==1){
			$('.newCustomerInputBirthday').val(res.birthday)
			$('.newCustomerInputBirthday').attr('value',res.birthday)
		}
	}
	//获取身份证号
	$('.newCustomerInputDocuments').keypress(function(){
		setTimeout(testIDCard,10)
	})
	
    $("#countryInput").kuCity();
    $(".newCustomerInputTime").datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        minDate: 0,  // 当前日期之后的 0 天，就是当天
        hideIfNoPrevNext: true,
        showOtherMonths: true,
        selectOtherMonths: true,
    });
    $(".newCustomerInputBirthday").datepicker({
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        minDate: '1930-1-1',  // 当前日期之后的 0 天，就是当天
		maxDate:0,
        hideIfNoPrevNext: true,
        showOtherMonths: true,
		yearRange:'c-50:c+50',//选择框，前后多少年
        selectOtherMonths: true,
    });
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/SystemService.svc/GetInformationsPost",
            jsonStr:'{"culture":"'+obtLanguage+'"}'
        },
        success : function(data) {
            var res = JSON.parse(data);
            console.log(res);
            res.DocumentTypeList.map(function(item){
                $(".newPopDocumentsSelect").append('<option value="'+item.Rid+'">'+item.Name+'</option>');
            })
            $(".newPopDocumentsSelect").unbind("change").change(function(){
                if($('.newPopDocumentsSelect option:selected').val()==1){
                    $(".newCustomerTime").addClass("hide");
					testIDCard()
                }else{
                    $(".newCustomerTime").removeClass("hide");
                }
            })
        },
        error : function() {
          // alert('fail');
        }
      } 
    );
    $(".newCustomerPopBtn").unbind("click").click(function(){
        // console.log($('.popNameRadio:checked').attr("PassengerName"));
        var regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		var regEmail2 = /^[\w\-]+@[a-zA-Z\d\-]+(\.[a-zA-Z]{2,8}){1,2}$/ig;
        var regPhone = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        if(!regPhone.test($(".newCustomerInputPhone").val())){
           alert(get_lan('passengerPop').phoneRemind);
        }else if(!regEmail.test($(".newCustomerInputEmail").val()) && !regEmail2.test($(".newCustomerInputEmail").val())){
            alert(get_lan('passengerPop').emailRemind);
        }
        else if($(".newCustomerInputSurNameCn").val()==""||$(".newCustomerInputGivenNameCn").val()==""||$(".newCustomerInputSurNameEn").val()==""||$(".newCustomerInputGivenNameEn").val()==""||$(".newCustomerInputDocuments").val()==""||!$("#countryInput").attr("code")){
            alert(get_lan('passengerPop').clickRemind);
        }else if($('.newPopDocumentsSelect option:selected').val()!=1&&$(".newCustomerInputTime ").val()==""){
            alert(get_lan('passengerPop').clickRemind);
        }
        else{
            if($(".newCustomerInputSurNameCn").val()==$(".newCustomerInputSurNameEn").val()){
                var NameCN = $(".newCustomerInputSurNameCn").val()+'/'+$(".newCustomerInputGivenNameCn").val();
            }else{
                var NameCN = $(".newCustomerInputSurNameCn").val()+$(".newCustomerInputGivenNameCn").val();
            }
            var NameEN = $(".newCustomerInputSurNameEn").val()+'/'+$(".newCustomerInputGivenNameEn").val();
            var Nick = $(".newCustomerInputNick").val();
            var sex = $('.newPopSexRadio:checked').attr("sexValue");
            var phone = $(".newCustomerInputPhone").val();
            var email = $(".newCustomerInputEmail").val();
            var rid = $('.newPopDocumentsSelect option:selected').val();
            var documentTime = '';
            if(rid !=1){
                documentTime = $(".newCustomerInputTime ").val();
            }
            var documentNumbers = $(".newCustomerInputDocuments").val();
            var nationality = $("#countryInput").attr("code");
            var birthday = $(".newCustomerInputBirthday").val();
            $('body').mLoading("show");
            $.ajax(
              {
                type:'post',
                url : $.session.get('ajaxUrl'), 
                dataType : 'json',
                data:{
                    url: $.session.get('obtCompany')+"/SystemService.svc/AddNewCustomerPost",
                    jsonStr:'{"language":"'+obtLanguage+'","id":'+netUserId+',"nameCn":"'+NameCN+'","nameEn":"'+NameEN+'","nickname":"'+Nick+'","gender":"'+sex+'","nation":"'+nationality+'","birthday":"'+birthday+'","NameS":"'+NameCN+'","email":"'+email+'","phoneNumber":"'+phone+'","groupIDs":"0"}'
                },
                success : function(data) {
                    var res = JSON.parse(data);
                    console.log(res);
                    var customerId = res.data;
                    var docInfo = rid+','+documentNumbers+','+nationality+','+documentTime;
					
					
					// 这里是新增旅客的方法,目前不做修改 AddOrderCustomer
					
					console.log("AddOrderCustomer3")
                    $.ajax(
                      {
                        type:'post',
                        url : $.session.get('ajaxUrl'), 
                        dataType : 'json',
                        data:{
                            url: $.session.get('obtCompany')+"/SystemService.svc/AddNewCustomerInfoPost",
                            jsonStr:'{"customerId":"'+customerId+'","id":'+netUserId+',"memberShipInfo":"","remarks":"","language":"'+obtLanguage+'","docInfo":"'+docInfo+'"}'
                        },
                        success : function(data) {
                            var res = JSON.parse(data);
                            console.log(res);
							var jsonStr={request:{
								key:netUserId.split('\"')[1],
								companyId:CompanyId,
								customerId:customerId,
								remarks:'',
								isCopy:"false",
								language:obtLanguage,
								orgOrderNo:"",
								// orgOrderNo:$.session.get('trainTicketChanges')[0].orderNo,
							}}
							// url: $.session.get('obtCompany')+"/SystemService.svc/AddOrderCustomerPost",
							// jsonStr:'{"key":'+netUserId+',"companyId":"'+CompanyId+'","customerId":"'+customerId+'","remarks":"","isCopy":"false","language":"'+obtLanguage+'"}'
                            $.ajax(
                              {
                                type:'post',
                                url : $.session.get('ajaxUrl'), 
                                dataType : 'json',
                                data:{
                                    url: $.session.get('obtCompany')+"/SystemService.svc/AddOrderCustomer",
                                    jsonStr:JSON.stringify(jsonStr)
                                },
                                success : function(data) {
                                    $('body').mLoading("hide");
                                    var res = JSON.parse(data);
                                    console.log(res);
                                    if(res == "1"){
                                        closeNewCustomer();
                                        passengersInOrder("newCustomer");
                                    }
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
                },
                error : function() {
                  // alert('fail');
                }
              } 
            );
        }
    })
}
/*个人信息弹窗修改*/
// function passengerPopChange(customerId,isFirst){
//     openPassengerPop();
//     $('body').mLoading("show");
//     $.ajax(
//       {
//         type:'post',
//         url : $.session.get('ajaxUrl'), 
//         dataType : 'json',
//         data:{
//             url: $.session.get('obtCompany')+"/SystemService.svc/CurrentPassengersInOrderPost",
//             jsonStr:'{"key":'+netUserId+',"Language":"'+obtLanguage+'"}'
//         },
//         success : function(data) {
//             $('body').mLoading("hide");
//             var res = JSON.parse(data);
//             console.log(res);
//             res.map(function(item){
//                 if(item.ID == customerId){
//                     $(".popNameCnText").text(item.NameCN);
//                     $(".popNameEnText").text(item.NameEN);
//                     if(item.Phones !=null){$(".popPhoneInput").val(item.Phones)}
//                     if(item.Email !=null){$(".popMailInput").val(item.Email)}
//                     if(item.Documents != 0){
//                         $(".popDocumentsSelect").change(function(){
//                             item.Documents.map(function(ditem){
//                                 if($('.popDocumentsSelect option:selected').attr("Rid")==ditem.Rid){
//                                     $(".popDocumentsInput").val(ditem.DocumentNumber);
//                                 }else{
//                                     $(".popDocumentsInput").val('');
//                                 }
//                             })
//                         })
//                     }
//                     if(isFirst == "true"){
//                         if(item.Phones != null&&item.Email != null&&item.Documents.length != 0){
//                             closePassengerPop();
//                             passengersInOrder();
//                         }
//                     }
//                 }
//             })
            
//             $(".passengerPopBtn").unbind("click").click(function(){
//                 console.log($('.popNameRadio:checked').attr("PassengerName"));
//                 if(!$('.popNameRadio:checked').attr("PassengerName")||$(".popPhoneInput").val()==""||$(".popMailInput").val()==""||$(".popDocumentsInput").val()==""){
//                     alert(get_lan('passengerPop').clickRemind);
//                 }else{
//                     var emailInfo = $(".popMailInput").val();
//                     var phoneInfo = $(".popPhoneInput").val();
//                     if($('.popDocumentsSelect option:selected').attr("Rid")==1){
//                         var docInfo = $('.popDocumentsSelect option:selected').attr("Rid")+','+$(".popDocumentsInput").val()+',,'
//                     }else{
//                         var docInfo = $('.popDocumentsSelect option:selected').attr("Rid")+','+$(".popDocumentsInput").val()+','+$(".popDocumentsTimeInput").val();
//                     }
//                     var memberShipInfo = '';
//                     $('body').mLoading("show");
//                     $.ajax(
//                       {
//                         type:'post',
//                         url : $.session.get('ajaxUrl'), 
//                         dataType : 'json',
//                         data:{
//                             url: $.session.get('obtCompany')+"/SystemService.svc/CustomerInfoUpdateOrAddPost",
//                             jsonStr:'{"id":'+netUserId+',"language":"'+obtLanguage+'","customerId":"'+customerId+'","emailInfo":"'+emailInfo+'","docInfo":"'+docInfo+'","phoneInfo":"'+phoneInfo+'","memberShipInfo":"'+memberShipInfo+'"}'
//                         },
//                         success : function(data) {
//                             $('body').mLoading("hide");
//                             var res = JSON.parse(data);
//                             console.log(res);
//                             if(res.message){
//                                 alert(res.message);
//                             }else{
//                                 closePassengerPop();
//                                 passengersInOrder();
//                             }
//                         },
//                         error : function() {
//                           // alert('fail');
//                         }
//                       } 
//                     );
//                 }
//             })
//         },
//         error : function() {
//           // alert('fail');
//         }
//       } 
//     );
// }
/*个人信息弹窗修改*/
function passengerPopChange(customerId,isFirst,customerRid){
    openPassengerPop();
    $('body').mLoading("show");
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/SystemService.svc/CurrentPassengersInOrderPost",
            jsonStr:'{"key":'+netUserId+',"Language":"'+obtLanguage+'"}'
        },
        success : function(data) {
            $('body').mLoading("hide");
            var res = JSON.parse(data);
            console.log(res);
            console.log($(".popDocumentsSelect").length);
            res.map(function(item,index){
                if(item.ID == customerId){
                    $(".popNameCnText").text(item.NameCN);
                    $(".popNameEnText").text(item.NameEN);
                    $(".popNameCn .popNameRadio").attr("PassengerName",item.NameCN);
                    $(".popNameEn .popNameRadio").attr("PassengerName",item.NameEN);
                    if(item.Phones !=null){$(".popPhoneInput").val(item.Phones)}
                    if(item.Email !=null){$(".popMailInput").val(item.Email)}
                    if(item.Documents.length != 0){
                        $(".popDocumentsSelect").val(item.Documents[0].Rid);
                        $(".popDocumentsInput").val(item.Documents[0].DocumentNumber);
                        $(".popDocumentsTimeInput").val(item.Documents[0].docExpiryDate.substring(0,10));
                        if(item.Documents[0].Rid!=1){
                            $(".popDocumentsTime ").removeClass("hide");
                        }
                    }
                    // if(item.cardsGo.length != 0){
                    //     $(".popFrequentFlierSelect").val(item.cardsGo[0].SupplierCode);
                    //     $(".popFrequentFlierInput").val(item.cardsGo[0].CardNumbers);
                    // }
                    $(".popDocumentsSelect").unbind("change").change(function(){
                        if($('.popDocumentsSelect option:selected').val()==1){
                            $(".popDocumentsTime").addClass("hide");
                        }else{
                            $(".popDocumentsTime").removeClass("hide");
                        }
                        var ridList=[];
                        item.Documents.map(function(ditem){
                            if($('.popDocumentsSelect').val()==ditem.Rid){
                                $(".popDocumentsInput").val(ditem.DocumentNumber);
                                if(ditem.docExpiryDate.length>=10){
                                    $(".popDocumentsTimeInput").val(ditem.docExpiryDate.substring(0,10));
                                }
                            }
                            ridList.push(ditem.Rid);
                        })
                        if(ridList.indexOf($('.popDocumentsSelect').val()) <= -1){
                            $(".popDocumentsInput").val('');
                        }
                    })
                    if(isFirst == "true"){
                        $(".passengerPopBottom").html('<div class="passengerPopBtn mainBackColor" style="margin:16px 0 27px 188px;">'+get_lan('remarkPop').confirm+'</div>')
                        if(item.Phones != null&&item.Email != null&&item.Documents.length != 0){
                            closePassengerPop();
                            passengersInOrder();
                        }
                    }else if(isFirst == "false"){
                        item.Documents.map(function(ditem){
                            if(customerRid==ditem.Rid){
                                $(".popDocumentsInput").val(ditem.DocumentNumber);
                                $(".popDocumentsSelect").val(customerRid);
                                $(".popDocumentsTimeInput").val(ditem.docExpiryDate.substring(0,10));
                            }
                        })
                        if(customerRid!=1){
                            $(".popDocumentsTime ").removeClass("hide");
                        }else{
                            $(".popDocumentsTime ").addClass("hide");
                        }
                        $(".passengerPopBottom").addClass("flexRow");
                        $(".passengerPopBottom").html('\
                            <div class="passengerPopCancel" style="background-color:#979797;margin:16px 0 27px 30px;">'+get_lan('remarkPop').cancel+'</div>\
                            <div class="passengerPopBtn mainBackColor" style="margin:16px 0 27px 190px;">'+get_lan('remarkPop').confirm+'</div>'
                        )
                        $(".passengerPopCancel").unbind("click").click(function(){
                            closePassengerPop();
                        })
                    }
                }
            })
            $(".passengerPopBtn").unbind("click").click(function(){
                // console.log($('.popNameRadio:checked').attr("PassengerName"));
                var regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				var regEmail2 = /^[\w\-]+@[a-zA-Z\d\-]+(\.[a-zA-Z]{2,8}){1,2}$/ig;
                var regPhone = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
                if(!regPhone.test($(".popPhoneInput").val())){
                   alert(get_lan('passengerPop').phoneRemind);
                }else if(!regEmail.test($(".popMailInput").val()) && !regEmail2.test($(".popMailInput").val())){
                    alert(get_lan('passengerPop').emailRemind);
                }
                else if(!$('.popNameRadio:checked').attr("PassengerName")||$(".popDocumentsInput").val()==""||$('.popDocumentsSelect option:selected').val()==""){
                    alert(get_lan('passengerPop').clickRemind);
                }else if($('.popDocumentsSelect option:selected').val()!=1&&$(".popDocumentsTimeInput").val()==""){
                    alert(get_lan('passengerPop').clickRemind);
                }
                else{
                    var emailInfo = $(".popMailInput").val();
                    var phoneInfo = $(".popPhoneInput").val();
                    if($('.popDocumentsSelect option:selected').val()==1){
                        var docInfo = $('.popDocumentsSelect option:selected').val()+','+$(".popDocumentsInput").val()+',,,,'
                    }else{
                        var docInfo = $('.popDocumentsSelect option:selected').val()+','+$(".popDocumentsInput").val()+',,,,'+$(".popDocumentsTimeInput").val();
                    }
                    var memberShipInfo = '';
                    $('body').mLoading("show");
                    $.ajax(
                      {
                        type:'post',
                        url : $.session.get('ajaxUrl'), 
                        dataType : 'json',
                        data:{
                            url: $.session.get('obtCompany')+"/SystemService.svc/CustomerInfoUpdateOrAddPost",
                            jsonStr:'{"id":'+netUserId+',"language":"'+obtLanguage+'","customerId":"'+customerId+'","emailInfo":"'+emailInfo+'","docInfo":"'+docInfo+'","phoneInfo":"'+phoneInfo+'","memberShipInfo":"'+memberShipInfo+'"}'
                        },
                        success : function(data) {
                            $('body').mLoading("hide");
                            var res = JSON.parse(data);
                            console.log(res);
                            if(res.message){
                                alert(res.message);
                            }else{
                                closePassengerPop();
                                chooseNameAndDocument(customerId,$('.popNameRadio:checked').attr("PassengerName"),$('.popDocumentsSelect option:selected').val(),'','');
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
}
//选择后的旅客订票姓名和证件号
function chooseNameAndDocument(customerId,orderName,documentRid,frequentCardsStart,frequentCardsReturn){
    $('body').mLoading("show");
    var content = customerId+','+orderName+','+documentRid+','+frequentCardsStart+','+frequentCardsReturn;
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/SystemService.svc/AddUpdatedCustomerInfoPost",
            jsonStr:'{"id":'+netUserId+',"content":"'+content+'","language":"'+obtLanguage+'","customerId":"'+customerId+'"}'
        },
        success : function(data) {
            $('body').mLoading("hide");
            var res = JSON.parse(data);
            console.log(res);
            if(res.code == 200){
                passengersInOrder();
            }
        },
        error : function() {
          // alert('fail');
        }
      } 
    );
}
//订单内旅客
function passengersInOrder(customerState,ischanges){
	// return false;
    $('body').mLoading("show");
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/SystemService.svc/CurrentPassengersInOrderPost",
            jsonStr:'{"key":'+netUserId+',"Language":"'+obtLanguage+'"}'
        },
        success : function(data) {
            $('body').mLoading("hide");
            var res = JSON.parse(data);
            console.log(res);
            $(".passengerList").html('');
			if(typeof $.session.get('trainTicketChanges')!='undefined'){
				var checkedCustomer=JSON.parse($.session.get('trainTicketChanges'))
			}
			// 12.10旧文档
			// <div class="passengerLi flexRow" customerId="'+item.ID+'" companyId="'+item.OrderCompanyId+'">
            res.map(function(item,index){
				
				var Gender=item.Gender==null?"":item.Gender
				var Nationality=item.Nationality==null?"":item.Nationality
                $(".passengerList").append('\
                    <div class="passengerLi flexRow" Gender="'+Gender+'" Nationality="'+Nationality+'" customerId="'+item.ID+'" companyId="'+item.OrderCompanyId+'">\
                    <div class="passengerLiDiv" style="width:250px;text-align:left;padding-left:45px;box-sizing:border-box;"><span class="PassengerNameText">'+item.NameCN+'</span><span class="changePassengerInfo specificFontColor" index="'+index+'" customerId="'+item.ID+'" style="margin-left:5px;cursor:pointer;">'+get_lan('passengerInfo').changePassengerInfo+'</span></div>\
                    <div class="passengerLiDiv passengerPhone" style="width:150px;">'+item.Phones+'</div>\
                    <div class="passengerLiDiv" style="width:200px;">'+item.Email+'</div>\
                    <div class="passengerLiDiv passengerLiDocuments" style="width:300px;"><select class="documentsSelect"></select></div>\
                    <div class="passengerLiDiv frequentCardsText" style="width:240px;"></div>\
                    <div class="passengerLiDiv changeRemarkBtn specificFontColor" index="'+index+'"  style="width:125px;text-decoration: underline;cursor:pointer">'+get_lan('passengerInfo').remarks+'</div>\
                    <div><img src="../../css/images/delIcon.png" class="delIcon" style="margin-top:3px;cursor:pointer;position:absolute;left:5px;" customerId="'+item.ID+'"></div>\
                    </div>\
                    \
                    ')
					var checkedID=''
                item.Documents.map(function(ditem){
					if(typeof $.session.get('trainTicketChanges')!='undefined'){
						if(ditem.DocumentNumber == checkedCustomer[index].customerDocment){
							checkedID=ditem.Rid
						}
					}
                    $(".documentsSelect").eq(index).append('\
                        <option value="'+ditem.Rid+'" docText="'+ditem.DocumentNumber+'">'+ditem.nameDoc+':'+ditem.DocumentNumber+'</option>\
                    ')
                })
                if(item.UpdatedCustomerInfo!=""&&item.UpdatedCustomerInfo!=null){
                    var UpdatedCustomerList = item.UpdatedCustomerInfo.split(',');
                    $(".PassengerNameText").text(UpdatedCustomerList[1]);
                    $(".documentsSelect").val(UpdatedCustomerList[2]);
                }
				if(ischanges == 'orderChange'){
					$('.documentsSelect').val(checkedID)
				}
            })
			if(ischanges == 'orderChange'){
				$('.passengerInfo').css({"position":"absolute","opacity":"0","z-index":'-1'})
			}
            totalAmount();
            if($.session.get("TAnumber")){
                $(".delIcon").remove();
            }
            // $(".changeRemarkBtn").hide();
            $(".delIcon").unbind("click").click(function(){
                var customerId = $(this).attr("customerId");
                var delMsg=confirm(get_lan("passengerInfo").delMsg);
                 if (delMsg==true){
                    $('body').mLoading("show");
                    $.ajax(
                      {
                        type:'post',
                        url : $.session.get('ajaxUrl'), 
                        dataType : 'json',
                        data:{
                            url: $.session.get('obtCompany')+"/SystemService.svc/DelPsgPost",
                            jsonStr:'{"key":'+netUserId+',"customerId":"'+customerId+'"}'
                        },
                        success : function(data) {
                            $('body').mLoading("hide");
                            var res = JSON.parse(data);
                            console.log(res);
                            if(res == "Success"){
                                passengersInOrder();
                            }
                        },
                        error : function() {
                          // alert('fail');
                        }
                      } 
                    );
                 } 
            })
            if($(".choosePassengerBody").css("display")=="none"){
                $(".delIcon").remove();
            }
            $(".changePassengerInfo").unbind("click").click(function(){
                var customerId = $(this).attr("customerId");
                var index = parseInt($(this).attr("index"));
                var customerRid = $(".documentsSelect").eq(index).val();
                passengerPopChange(customerId,"false",customerRid);
                $("#cover").unbind("click").click(function(){
                    closePassengerPop();
                })
            })
            $(".changeRemarkBtn").unbind("click").click(function(){
                var index = parseInt($(this).attr("index"));
                $("#cover").unbind("click");
                var CompanyID = res[index].OrderCompanyId;
                var customerId = res[index].ID;
                var employeeName = res[index].NameCN;
                remarkInfoPop(CompanyID,customerId,employeeName,"false");
            })
            if(customerState=="newCustomer"){
                $(".changeRemarkBtn").eq($(".changeRemarkBtn").length-1).click();
            }
            trainSeat(res);
            /*苹果*/
            if($(".passengerLi").length==1&&ProfileInfo.onlineStyle=="APPLE"){
                $(".selectPassengerArrow,.selectPassengerSearch").unbind("click").click(function(){
                    alert("There is already a traveler in the order.");
                })
            }else{
                $(".selectPassengerArrow").removeAttr("spread");
                selectPassengers();
            }
            /*有审批单*/
            if(JSON.parse($.session.get('ProfileInfo')).HasTravelRequest&&$(".passengerLi").length==1){
                $(".choosePassengerBody").addClass("hide");
            }else{
                $(".choosePassengerBody").removeClass("hide");
            }
        },
        error : function() {
          // alert('fail');
        }
      } 
    );
}
//火车座位
function trainSeat(res){
    /*重置座位*/
    $(".deaprtureSeat,.returnSeat").attr("passengerseat","");
    $(".seatIcon").removeAttr("state");
    $(".iconA").removeAttr("state");
    $(".iconB").removeAttr("state");
    $(".iconA").removeAttr("state");
    $(".iconD").removeAttr("state");
    $(".iconF").removeAttr("state");
    $(".iconA").css("background-image","url('../../train/images/A-hui.png')");
    $(".iconB").css("background-image","url('../../train/images/B-hui.png')");
    $(".iconC").css("background-image","url('../../train/images/C-hui.png')");
    $(".iconD").css("background-image","url('../../train/images/D-hui.png')");
    $(".iconF").css("background-image","url('../../train/images/F-hui.png')");
    /*选择座位*/
    // if(res.length >0){
    //     $(".seatInfo").removeClass("hide");
    // }
    $(".seatInfo").removeClass("hide");
    if(trainTicketInfo.type == "oneWay"){
        $(".returnSeat").addClass("hide");
        $(".deaprtureSeat").css("border","0");
        // console.log($(".orderSeatType").eq(0).attr("SeatType"));
        if($(".orderSeatType").eq(0).attr("SeatType")!="二等座"&&$(".orderSeatType").eq(0).attr("SeatType")!="一等座"&&$(".orderSeatType").eq(0).attr("SeatType")!="商务座"){
            $(".seatInfo").addClass("hide");
        }
    }
    else if(trainTicketInfo.type="roundTrip"){
        if($(".orderSeatType").eq(0).attr("SeatType")!=="二等座"&&$(".orderSeatType").eq(0).attr("SeatType")!=="一等座"&&$(".orderSeatType").eq(0).attr("SeatType")!=="商务座"){
            $(".deaprtureSeat").addClass("hide");
        }
        if($(".orderSeatType").eq(1).attr("SeatType")!=="二等座"&&$(".orderSeatType").eq(1).attr("SeatType")!=="一等座"&&$(".orderSeatType").eq(1).attr("SeatType")!=="商务座"){
            $(".returnSeat").addClass("hide");
        }
        if($(".orderSeatType").eq(0).attr("SeatType")!=="二等座"&&$(".orderSeatType").eq(0).attr("SeatType")!=="一等座"&&$(".orderSeatType").eq(0).attr("SeatType")!=="商务座"&&$(".orderSeatType").eq(1).attr("SeatType")!=="二等座"&&$(".orderSeatType").eq(1).attr("SeatType")!=="一等座"&&$(".orderSeatType").eq(1).attr("SeatType")!=="商务座"){
            $(".seatInfo").addClass("hide");
        }
    }
    if(res.length == 0){
        $(".seatInfo").addClass("hide");
    }
    if(res.length == 1){
        $(".deaprtureSeatBody").eq(1).addClass("hide");
        $(".returnSeatBody").eq(1).addClass("hide");
        //常用座位
        $.ajax(
          {
            type:'post',
            url : $.session.get('ajaxUrl'), 
            dataType : 'json',
            data:{
                url: $.session.get('obtCompany')+"/QueryService.svc/QueryPreference",
                jsonStr:'{"id":'+netUserId+',"type":"12","customerId":"'+$(".passengerLi").eq(0).attr("customerId")+'","Language":"'+obtLanguage+'"}'
            },
            success : function(data) {
                var res = JSON.parse(data);
                console.log(res);
                if(res.length!=0){
                    var BackingField = res[0]["<Detail>k__BackingField"];
                    if(BackingField=="1C"&&$(".orderSeatType").eq(0).attr("SeatType")=="一等座"){
                        BackingField = "1B";
                    }
                    if(BackingField=="1C"&&$(".orderSeatType").eq(0).attr("SeatType")=="商务座"){
                        BackingField = "1B";
                    }
                    for(var i=0;i<$(".seatIcon").length;i++){
                        if($(".seatIcon").eq(i).attr("seat")==BackingField){
                            if(!$(".seatIcon").eq(i).attr("state")){
                                console.log(i);
                                $(".seatIcon").eq(i).click();
                            }
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
    if(res.length > 1){
        $(".deaprtureSeatBody").eq(1).removeClass("hide");
        $(".returnSeatBody").eq(1).removeClass("hide");
    }
    clickSeatIcon("deaprtureSeat","seatIcon",res);
    if(trainTicketInfo.type == "roundTrip"){
        clickSeatIcon("returnSeat","seatIcon2",res);
    }
    function clickSeatIcon(seatBody,seatClass,res){
        var passengerSeat = [];
        $("."+seatClass+"").unbind("click").click(function(){
            if($(this).attr("seat")){
                $("."+seatBody+" .iconA").css("background-image","url('../../train/images/A-hui.png')");
                $("."+seatBody+" .iconB").css("background-image","url('../../train/images/B-hui.png')");
                $("."+seatBody+" .iconC").css("background-image","url('../../train/images/C-hui.png')");
                $("."+seatBody+" .iconD").css("background-image","url('../../train/images/D-hui.png')");
                $("."+seatBody+" .iconF").css("background-image","url('../../train/images/F-hui.png')");
                if(!$(this).attr("state")){
                    passengerSeat.push($(this).attr("seat"));
                    if(passengerSeat.length>res.length){
                        passengerSeat.shift();
                    }
                }
                for(var i=0;i<passengerSeat.length;i++){
                    for(var j=0;j<$("."+seatClass+"").length;j++){
                        if($("."+seatClass+"").eq(j).attr("seat") == passengerSeat[i]){
                            $("."+seatClass+"").eq(j).attr("state","click");
                            $("."+seatClass+"").eq(j).css("background-image","url('../../train/images/"+passengerSeat[i].substring(1,2)+"-lan.png')");
                        }
                        else{
                            $("."+seatClass+"").eq(j).removeAttr("state");
                        }
                    }
                }
            }
            console.log(passengerSeat.join(''));
            if(seatClass=="seatIcon"){
                $(".deaprtureSeat").attr("passengerSeat",passengerSeat.join(''));
            }else if(seatClass=="seatIcon2"){
                $(".returnSeat").attr("passengerSeat",passengerSeat.join(''));
            }
        })
    }
}
//总价格
function totalAmount(personNum){
    var total = 0;
    for(var i=0;i<$(".orderDetailBody").length;i++){
        total += parseFloat($(".orderDetailBody").eq(i).attr("ticketamount"))
    }
	// 12.03删除下面操作
	// if(personNum==undefined){
	// 	total = $(".passengerLi").length*total;
	// 	console.log(total)
	// }else{
	// 	total = personNum*total;
	// 	console.log(total)
	// }
	total = $(".passengerLi").length*total;
    $(".totalAmountText").html('<span style="font-size:16px;">￥</span>'+(total));
}
//订火车票
function clickBookBtn(){
    // $(".bookTicketBtn2").unbind("click").click(function(){
    $(".bookTicketBtn").unbind("click").click(function(){
		if(ProfileInfo.onlineStyle=="APPLE"){
			bookTicketBtn()
			return false;
		}
		var PassengerVerificationInfoList=[]//旅客列表
		var notVerifiedList=[]//未验证旅客列表
		var userInfos=[]//未验证旅客列表
		var InfoIndex=0
		// 接口
		var arr=$('.passengerLi')
		for(var i = 0 ; i < arr.length ;i++){
				 var PassengerVerificationInfo={
				 	// customerID:"",//暂时不要
				 	cardType:"",
				 	cardNo:"",
				 	passengerName:"",
				 	phone:"",
				 	//passengerType:"",//暂不需要
				 	sex:"",//0女1男
				 	Nationalit:"",
				 } 
				 var customerid = $(arr[i]).attr("customerid")
				 var passengerPhone=$('.passengerLi').eq(i).find('.passengerPhone').text()
				 var PassengerNameText=$('.passengerLi').eq(i).find('.PassengerNameText').text()
				 var cardType = $('.passengerLi').eq(i).find('.documentsSelect').val()
				 var cardNo = $('.passengerLi').eq(i).find('.documentsSelect').find("option[value="+cardType+"]")
				 var gender = $('.passengerLi').eq(i).attr("gender")
				 var nationality = $('.passengerLi').eq(i).attr("nationality")
				PassengerVerificationInfo.cardType=cardType
				PassengerVerificationInfo.cardNo= $(cardNo).attr("doctext")
				PassengerVerificationInfo.passengerName=PassengerNameText
				PassengerVerificationInfo.phone=passengerPhone
				PassengerVerificationInfo.sex=gender?"0":"1"
				PassengerVerificationInfo.Nationalit=nationality
				PassengerVerificationInfoList.push(PassengerVerificationInfo)
		}

		var jsonStr={request:{
			id:netUserId.split('\"')[1],
			// depDate:"",
			passengers:PassengerVerificationInfoList,
		}}
		$.ajax(
		  {
		    type:'post',
		    url : $.session.get('ajaxUrl'), 
		    dataType : 'json',
		    data:{
		        url: $.session.get('obtCompany')+"/SystemService.svc/NeedIdentityVerification",
		        // jsonStr:'{"request":{"key":'+netUserId+',"TANo":"'+$.session.get('TAnumber')+'","Language":"'+obtLanguage+'","cityList":['+$(".orderDetail").attr("cityList")+'],"timeList":['+$(".orderDetail").attr("timeList")+'],"tripType":"4","customerList":['+customerList+']}}'
		        jsonStr:JSON.stringify(jsonStr)
		    },
		    success : function(data) {
		        var res = JSON.parse(data);
					// res.passengerInfos[0].status="failed"
		        console.log(res);
		        $('body').mLoading("hide");
		        if(res.code==200){
					userInfos=res.passengerInfos.filter(function(item){
						//获取并过滤 是否需要验证 
						// return item.cardType==1?item:false
						if((item.status=="succeed"|| item.status=="unknown") && item.mobileStatus=="failed"){
							return item
						}
						if(item.status=="failed"){
							var tips=obtLanguage=="CN"?"身份验证失败，请联系线下服务小组":"Passenger validate failed, please contact service team for help.";
							var closeBtn=obtLanguage=="CN"?"关闭":"Close"
							$('body').append('\
								<div id="coverCredent">\
									<div class="credentGroupPop closeGroupPop">\
										<div class="closeCredent"></div>\
										<div class="closeBody"><span class="tipsImg"><img src="../orders/images/remindIcon.png"/></span>'+tips+'</div>\
										<div class="closeBtn">'+closeBtn+'</div>\
									</div>\
								</div>\
							')
							$('.closeBtn').unbind().click(function(){
								$("#coverCredent").remove()
							})
							$('.closeCredent').unbind().click(function(){
								$("#coverCredent").remove()
							})
							return false
						}
					})
					if(userInfos.length>0){
						VerificationPop(res,"",InfoIndex);
					}else{
						//继续预订
						bookTicketBtn()
					}
		        }else{
		            alert(res.errMsg);
		        }
		    },
		    error : function() {
		      // alert('fail');
		    }
		  }
		);
		
		//初次验证
		function VerificationPop(verificationMode,state,InfoIndex){
			// status=succeed或者unknown; mobileStatus=succeed或者unknown时，表示验证通过
			console.log(userInfos)
			//var userInfos=verificationMode.passengerInfos
			if(userInfos.length>0){
				//弹窗操作
			}else{
				bookTicketBtn()
				return false;
				//继续预定
			}
			var title=obtLanguage=="CN"?"乘客手机核验":"乘客手机核验";
			var str1=obtLanguage=="CN"?"已过期":"Expired";
			var str2=obtLanguage=="CN"?"即将过期":"Expire Soon";
			// var tips=obtLanguage=="CN"?"请注意更新您的证件以免耽误您的行程。":"Please renew it so as not to delay your trip.";
			var tips=obtLanguage=="CN"?"请注意更新您的证件以免耽误您的行程。":"";
			var btn=obtLanguage=="CN"?"我已完成校验，刷新结果":"Refresh the Result";
			var cancelbtn=obtLanguage=="CN"?"取消":"Cancel";
			//检测状态
			var stateStr=obtLanguage=="CN"?"待核验":"Pending verification",stateStyle="#333"
			if(state=="changeState"){
				stateStr=obtLanguage=="CN"?"核验未完成，请尽快完成核验。":"Validate failed, please complete the verification again."
				stateStyle=ProfileInfo.onlineStyle=="APPLE"?"#3083FB":"#f6aa24"
			}
			
			var hideClose=ProfileInfo.onlineStyle=="APPLE"?"hide":""
			if(ProfileInfo.onlineStyle=="APPLE"){
				var btnGroup='<div class="credentBtnGroup"><div class="btn cancelBtn">'+cancelbtn+'</div><div class="btn credentBtn">'+btn+'</div></div>'
			}else{
				var btnGroup='<div class="credentBtn">'+btn+'</div>'
			}
			
			$('body').append('\
				<div id="coverCredent">\
					<div class="credentGroupPop">\
						<div class="closeCredent '+hideClose+'"></div>\
						<div class="credentTitle">'+title+'</div>\
						<div class="credentList">\
						</div>\
							<div style="margin-top:20px;font-size:14px;color:#333;line-height:22px;font-weight:600;line-height:25px;">当前核验状态：</div>\
							<div style="margin-top:8px;font-size:14px;color:'+stateStyle+';line-height:22px;line-height:25px;">'+stateStr+'</div>'
							+btnGroup+
					'</div>\
				</div>\
			')
			$(".cancelBtn").click(function(){
				$("#coverCredent").remove()
			})
			
			userInfos.map(function(item,index){
				console.log(InfoIndex)
				if(index!=InfoIndex){
					return false
				}
				var userName=item.passengerName+" "
				
				var numColor=ProfileInfo.onlineStyle=="APPLE"?"#3083FB":"#094B90"
				
				$('.credentList').append('\
				<div class="credentLi">\
					<div style="margin-top:20px;font-size:14px;color:#333;line-height:22px;">乘客：<span style="font-weight: 600;">'+userName+'</span></div>\
					<div style="margin-top:8px;font-size:14px;color:#333;line-height:22px">\
					请使用手机号码\
					<span style="font-size:16px;font-weight:600"> '+item.encMobileNo+' </span>\
					发送验证码\
						<span style="font-size:16px;color:'+numColor+';font-weight:600"> 91967239'+item.captcha+' </span>\
						至\
						<span style="font-size:16px;color:'+numColor+';font-weight:600"> 12306 </span>\
					</div>\
				</div>\
				')
			})
			// 关闭按钮
			$(".closeCredent").click(function(){
				$("#coverCredent").remove()
			})
			//刷新状态按钮
			$(".credentBtn").click(function(){
				$('body').mLoading("show");
				var jsonStr={request:{
					id:netUserId.split('\"')[1],
					// depDate:"",
					passengers:PassengerVerificationInfoList,
				}}
				$.ajax(
				  {
				    type:'post',
				    url : $.session.get('ajaxUrl'), 
				    dataType : 'json',
				    data:{
				        url: $.session.get('obtCompany')+"/SystemService.svc/QueryIdentityVerificationInfo",
				        // jsonStr:'{"request":{"key":'+netUserId+',"TANo":"'+$.session.get('TAnumber')+'","Language":"'+obtLanguage+'","cityList":['+$(".orderDetail").attr("cityList")+'],"timeList":['+$(".orderDetail").attr("timeList")+'],"tripType":"4","customerList":['+customerList+']}}'
				        jsonStr:JSON.stringify(jsonStr)
				    },
				    success : function(data) {
				        var res = JSON.parse(data);
				        console.log(res);
				        $('body').mLoading("hide");
						$("#coverCredent").remove()
				        if(res.code==200){
							var rDate=res.passengerInfos[InfoIndex]
							if((rDate.status=="succeed" || rDate.status== "unknown") && (rDate.mobileStatus=="succeed" || rDate.mobileStatus== "unknown") ){
								//通过验证
								if(InfoIndex<userInfos.length-1){
									InfoIndex++
									VerificationPop(res,"",InfoIndex);
								}else{
									//继续预定
									bookTicketBtn()
								}
							}else{
								//未通过验证
								VerificationPop(res,"changeState",InfoIndex);
							}
				        }else{
				            alert(res.errMsg);
				        }
				    },
				    error : function() {
				      // alert('fail');
				    }
				  }
				);
			})
		}
		
	})
	
	
	
    // $(".bookTicketBtn").unbind("click").click(function(){
		function bookTicketBtn(){
        if($(".passengerLi").length == 0){
            alert(get_lan('bookTicketRemind'));
        }else{
            // if(trainTicketInfo.type=="oneWay"){
            //     if(!$(".seatInfo").hasClass("hide")){
            //         if($(".deaprtureSeat").attr("passengerseat").length/2 !=$(".passengerLi").length){
            //             alert(get_lan('chooseSeatRemind'));
            //             return false;
            //         }
            //     }
            // }else if(trainTicketInfo.type=="roundTrip"){
            //     if(!$(".seatInfo").hasClass("hide")){
            //         if(!$(".deaprtureSeat").hasClass("hide")){
            //             if($(".deaprtureSeat").attr("passengerseat").length/2 !=$(".passengerLi").length){
            //                 alert(get_lan('chooseSeatRemind'));
            //                 return false;
            //             }
            //         }
            //         if(!$(".returnSeat").hasClass("hide")){
            //             if($(".returnSeat").attr("passengerseat").length/2 !=$(".passengerLi").length){
            //                 alert(get_lan('chooseSeatRemind'));
            //                 return false;
            //             }
            //         }  
            //     }
            // }
            if($(".bookTicketBtn").attr("trainRemind")=="true"){
                var trainRemind=confirm(get_lan("trainRemind"));
                 if (trainRemind==true){
                    
                 }else{
                    return false;
                 }
            }
            

            if(searchTrainInfo.alterTicketInfo){
                var itemID = searchTrainInfo.alterTicketInfo.split('-')[0].split('_')[1];
            }else{
                var itemID = "";
            }
            $('body').mLoading("show");
			// ......................
			if($.session.get('TAnumber')){
			    var customerList = '';
			    for(var i=0;i<$(".passengerLi").length;i++){
			        customerList += '"'+$(".passengerLi").eq(i).attr("customerId")+'"';
			        customerList += ',';
			    }
			    customerList = customerList.substring(0,customerList.length-1);
			    $('body').mLoading("show");
			    $.ajax(
			      {
			        type:'post',
			        url : $.session.get('ajaxUrl'), 
			        dataType : 'json',
			        data:{
			            url: $.session.get('obtCompany')+"/OrderService.svc/CheckTripCompareTA",
			            jsonStr:'{"request":{"key":'+netUserId+',"TANo":"'+$.session.get('TAnumber')+'","Language":"'+obtLanguage+'","cityList":['+$(".orderDetail").attr("cityList")+'],"timeList":['+$(".orderDetail").attr("timeList")+'],"tripType":"4","customerList":['+customerList+']}}'
			        },
			        success : function(data) {
			            var res = JSON.parse(data);
			            console.log(res);
			            // $('body').mLoading("hide");
			            if(res.code==200){
			                checkRepeat();
			            }else{
			                alert(res.message);
			            }
			        },
			        error : function() {
			          // alert('fail');
			        }
			      }
			    );
			}else{
			    checkRepeat();
			}
			// ............................
			
            function checkRepeat(){
				$.ajax(
				  {
				    type:'post',
				    url : $.session.get('ajaxUrl'), 
				    dataType : 'json',
				    data:{
				        url: $.session.get('obtCompany')+"/OrderService.svc/CheckRepeatTrainOrderBookNew",
				        jsonStr:'{"id":'+netUserId+',"queryKey":"'+queryKey+'","Language":"'+obtLanguage+'","itemID":"'+itemID+'"}'
				    },
				    success : function(data) {
				        $('body').mLoading("hide");
				        var res = JSON.parse(data);
				        console.log(res);
				        if(res.stateValue == 1){
				            alert(res.message.split('<br>').join('\n'));
				        }else if(res.stateValue == 2){
				            var r=confirm(res.message.split('<br>').join('\n'));
				            if (r==true){
				                bookTicket();
				            }
				        }else if(res.stateValue == 3){
							var r=confirm(res.message.split('<br>').join('\n'));
							if(ProfileInfo.onlineStyle=="APPLE"){
							    var finishedInfo = {
							        'orderNo':res.orderNo,
							    }
							    console.log($.session.get('finishedInfo'));
							    $.session.set('finishedInfo', JSON.stringify(finishedInfo));
							    window.location.href='../../purchaseTrip/purchaseTrip.html';
							}
						}else{
				            bookTicket();
				        }
				    },
				    error : function() {
				      // alert('fail');
				    }
				  } 
				);
			}
        }
	}	
		
    // })
}
function bookTicket(){
    $('body').mLoading("show");
    var documentNos = '';
    for(var i=0;i<$(".passengerLi").length;i++){
        documentNos += $(".passengerLi").eq(i).attr("customerId")+"_"+$('.documentsSelect option:selected').eq(i).val()+'-'+$('.documentsSelect option:selected').eq(i).attr("docText");
        documentNos += ',';
    }
    documentNos = documentNos.substring(0,documentNos.length-1);
    console.log(documentNos);
    if(!searchTrainInfo.alterTicketInfo){
        var orgTicketInfo = "NO";
    }else{
        var orgTicketInfo = searchTrainInfo.alterTicketInfo.split('_')[1].split(',')[0];
    }
	console.log(orgTicketInfo)
    var trainNoLimitation=$(".orderDetailBody").eq(0).attr("trainCode");
    if(trainTicketInfo.type=="oneWay"){
        var trainNoLimitationBack = '';
        var isGrabBack = '';
    }else if(trainTicketInfo.type=="roundTrip"){
        var trainNoLimitationBack = $(".orderDetailBody").eq(1).attr("trainCode");
        var isGrabBack = "";
    }
    var isDirectTicket = $(".ricketOutCheckBox").is(':checked');

    var isGrabGo = "";
    var carTaxiInfo = "NO";
    //座位号
    if(trainTicketInfo.type=="oneWay"){
        var desCodeTrain = $(".deaprtureSeat").attr("passengerseat")+',';
    }else if(trainTicketInfo.type=="roundTrip"){
        var desCodeTrain = $(".deaprtureSeat").attr("passengerseat")+','+$(".returnSeat").attr("passengerseat");
    }
    console.log(desCodeTrain);

	// var sj='{"id":'+netUserId+',"classLimitation":"NO","classLimitationBack":"NO","documentNos":"'+documentNos+'","orgTicketInfo":"'+orgTicketInfo+'","queryKey":"'+queryKey+'","trainNoLimitation":"'+trainNoLimitation+'","isDirectTicket":"'+isDirectTicket+'","trainNoLimitationBack":"'+trainNoLimitationBack+'","Language":"'+obtLanguage+'","desCodeTrain":"'+desCodeTrain+'","isGrabGo":"'+isGrabGo+'","isGrabBack":"'+isGrabBack+'","carTaxiInfo":"'+carTaxiInfo+'"}'
	// console.log("预定信息")
	// console.log(sj)
	// $('body').mLoading("hide");
	// return false;
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/OrderService.svc/BookTrainSecondPost",
            jsonStr:'{"id":'+netUserId+',"classLimitation":"NO","classLimitationBack":"NO","documentNos":"'+documentNos+'","orgTicketInfo":"'+orgTicketInfo+'","queryKey":"'+queryKey+'","trainNoLimitation":"'+trainNoLimitation+'","isDirectTicket":"'+isDirectTicket+'","trainNoLimitationBack":"'+trainNoLimitationBack+'","Language":"'+obtLanguage+'","desCodeTrain":"'+desCodeTrain+'","isGrabGo":"'+isGrabGo+'","isGrabBack":"'+isGrabBack+'","carTaxiInfo":"'+carTaxiInfo+'"}'
        },
        success : function(data) {
            $('body').mLoading("hide");
            if(data == ''){
                if(obtLanguage=="CN"){
                    alert('预订出错');
                }else{
                    alert('Booking Unsuccessful');
                }
            }else{
                var res = JSON.parse(data);
                console.log(res);
                if(res.OrderNo != null){
                    var orderNo = res.OrderNo;
                    if($.session.get("TAnumber")&&!$.session.get("TAnumberIndex")){
                        $.session.remove("TAnumber");
                        $.session.remove("TACustomerId");
                    }
                    changeNewUid(orderNo);
                    // // alert(get_lan('success'));
                    // if(ProfileInfo.onlineStyle=="APPLE"){
                    //     var finishedInfo = {
                    //         'orderNo':orderNo,
                    //     }
                    //     console.log($.session.get('finishedInfo'));
                    //     $.session.set('finishedInfo', JSON.stringify(finishedInfo));
                    //     window.location.href='../../purchaseTrip/purchaseTrip.html';
                    // }else{
                    //     /*订单号*/
                    //     var searchOrderInfo = {
                    //         'orderNo':orderNo,
                    //     }
                    //     $.session.set('searchOrderInfo', JSON.stringify(searchOrderInfo));
                    //     console.log($.session.get('searchOrderInfo'));
                    //     // window.location.href='../../bookFinished/bookFinished.html';
                    //     window.location.href='../../orders/orderDetails.html?state=finish';
                    // }
                }else if(res.ErrorMsg){
                    alert(res.ErrorMsg);
                }
                else{
                    alert("fail")
                }
            }
        },
        error : function() {
          // alert('fail');
        }
      } 
    );
}
function changeNewUid(orderNo){
    $('body').mLoading("show");
    $.ajax(
      {
        type:'post',
        url : $.session.get('ajaxUrl'), 
        dataType : 'json',
        data:{
            url: $.session.get('obtCompany')+"/SystemService.svc/ChangeNewUid",
            jsonStr:'{"uid":'+netUserId+'}'
        },
        success : function(data) {
            $('body').mLoading("hide");
            var res = JSON.parse(data);
            console.log(res);
            var code = res.code;
            var data = '"'+res.data+'"';
            var message = res.message;
            console.log(code);
            console.log(data);
            console.log(message);
            if(code==200){
                $.session.set('netLoginId', data);
                if(ProfileInfo.onlineStyle=="APPLE"){
                    var finishedInfo = {
                        'orderNo':orderNo,
                    }
                    console.log($.session.get('finishedInfo'));
                    $.session.set('finishedInfo', JSON.stringify(finishedInfo));
                    window.location.href='../../purchaseTrip/purchaseTrip.html';
                }else{
                    /*订单号*/
                    var searchOrderInfo = {
                        'orderNo':orderNo,
                    }
                    $.session.set('searchOrderInfo', JSON.stringify(searchOrderInfo));
                    console.log($.session.get('searchOrderInfo'));
                    // window.location.href='../../bookFinished/bookFinished.html';
					var TAnumberIndex=$.session.get('TAnumberIndex');
					if(TAnumberIndex != 1){
						$.session.remove("TAnumber")
					}
                    window.location.href='../../orders/orderDetails.html?state=finish';
                }
            }else if(code==504){
                if(obtLanguage=="EN"){
                    alert('Login Timeout.')
                }else if(obtLanguage=="CN"){
                    alert('您的账号已过期，请重新登陆。')
                }
                if(ProfileInfo){
                    window.location.href = ProfileInfo.loginOutUrl;
                }
            }else{
                alert(message)
            }
        },
        error : function() {
          // alert('fail');
        }
      } 
    );
}
function openRemarkPop(){
    $("#cover").show();
    $(".remarkPop").css("display","block");
}
function closeRemarkPop(){
    $("#cover").hide();
    $(".remarkPop").css("display","none");
}
function openPassengerPop(){
    $("#cover").show();
    $(".PassengerPop").css("display","block");
}
function closePassengerPop(){
    $("#cover").hide();
    $(".PassengerPop").css("display","none");
}
//打开关闭newCustomer弹窗
function openNewCustomer(){
    $("#cover").show();
    $(".newCustomerPop").css("display","block");
}
function closeNewCustomer(){
    $("#cover").hide();
    $(".newCustomerPop").css("display","none");
}