var netUserId = $.session.get('netLoginId');
var obtLanguage = $.session.get('obtLanguage');
var isReturn = tools.queryString().isReturn;
var searchDomInfo = JSON.parse($.session.get('searchDomInfo'));
var codeShare=searchDomInfo.codeShare
var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));
// console.log(ProfileInfo)
console.log(searchDomInfo);
var TAnumber=$.session.get("TAnumber")
var domAirSession=$.session.get("domAirSession")

var TAminDate=0,TAmaxDate=365
if(TAnumber){
	//domAir=JSON.parse(domAirSession)
	// TAminDate=domAir.starTime
	// TAmaxDate=domAir.endTime
	// 有TA单时，时间进行限制
	
		if(TAnumber!=undefined && TAnumber!="" && $.session.get('goOnBooktravelInfo')!=undefined && $.session.get('goOnBooktravelInfo')!=""){
			var goOnBooktravelInfo=JSON.parse($.session.get('goOnBooktravelInfo'));
			TAminDate=goOnBooktravelInfo.starTime.split(" ")[0]
			TAmaxDate=goOnBooktravelInfo.endTime.split(" ")[0]
			var minTime=new Date().getTime()
			var minTime2
			if(TAminDate==0){
				minTime2=new Date().getTime()
			}else{
				minTime2=new Date(TAminDate.replace(/-/g,"/")).getTime()
			}
			TAminDate=minTime<minTime2?TAminDate:new Date()
		}
}
 
// 时间选择
var day=$.session.get('searchDomesticDay');
var returnday=$.session.get('searchDomesticReturnDay');
var setTime='all'		
var setReturnTime='all'		
function showPlusMinus(){
			if($('#domDepartureSelect').val()!="all"){
				// $('#DepartPlusMinus').css('color','#000000')
				$('#DepartPlusMinus').removeAttr('disabled')
			}else{
				// $('#DepartPlusMinus').css('color':'#000000')
				$('#DepartPlusMinus').attr('disabled','disabled')
			}
			if($('#domReturnSelect').val()!="all"){
				// $('#returnPlusMinus').css('color','#000000')
				$('#returnPlusMinus').removeAttr('disabled')
			}else{
				// $('#DepartPlusMinus').css('color':'#000000')
				$('#returnPlusMinus').attr('disabled','disabled')
			}
		}


if (searchDomInfo.alterTicketInfo) {
	var orgCabinCode = searchDomInfo.alterTicketInfo.split(",")[6];
} else {
	var orgCabinCode = "";
}
// 如果orgCabinCode为空说明不是改签，arrivalCity和departureCity置空
var arrivalCity = searchDomInfo.arrivalCity;
var departureCity = searchDomInfo.departureCity;

// TA订单号
var TAorderNo = $.session.get('TAorderNo');

	
if (orgCabinCode == "" && !searchDomInfo.packagePrice) {
	arrivalCity = ""
	departureCity = ""
}
//中英文对象
var cn = {
	"progressBar": {
		"search": "查询",
		"book": "预订",
		"complete": "完成",
	},
	"searchBody": {
		"oneWay": "单程",
		"roundTrip": "来回程",
		"search": "查询",
		"weekDay": '星期天, 星期一, 星期二, 星期三, 星期四, 星期五, 星期六',
		'cabins': {
			// 'cabin1': '不限',
			'cabin1': '全部',
			'cabin2': '经济舱',
			'cabin3': '公务舱',
			'cabin4': '头等舱',
			'cabin5': '公务舱/头等舱',
		},
		'allDay': "全天",
	},
	'siftBody': {
		"departureTime": "起飞时间",
		"arrivalTime": "到达时间",
		"all": "全部出发机场",
		"all2": "全部到达机场",
		"price": "价格",
	},
	'airportName': {
		'all': '全部航班',
		'zg': '中国航空',
		'df': '东方航空',
		'sh': '上海航空',
		'hn': '海南航空',
		'nf': '南方航空',
		'xm': '厦门航空',
		'sz': '深圳航空',
		'km': '昆明航空',
		'zgl': '中国联航',
		'jy': '吉祥航空',
		'sd': '山东航空',
		'sz': '深圳航空',
		'sc': '四川航空',
		'cq': '春秋航空',
		'cd': '成都航空',
		'fj': '福建航空',
	},
	// "trainRecommend": "实惠出行推荐",
	"trainRecommend": "火车出行推荐",
	"trainSearch": "点击查看",
	"trainRemind": "即将跳转至火车票界面，是否确定？",
	"lowest": "起",
	"ticketList": {
		"listRemind": "没有相关的航班信息或违反公司政策！",
		"tittle": "机票列表",
		"FlightNo": "航班",
		"PlaneType": "机型",
		"Punctuality": "准点率",
		"Meal": "餐食：",
		"Duration": "用时",
		"morePrice": "更多价格",
		"LowestFare": "最低价",
		"LowestFareFlight": "该航班最低价",
		"PreferredAirline": "协议航空公司",
		"CompanyPreferred": "公司推荐",
		"preDay": "前一天",
		"nextDay": "后一天",
		"Code_share": "(共享)",
		"Tax": "税",
		"roundTittleGo": "去程票",
		"roundTittleReturn": "回程票",
		"protocol": "协议价",
	},
	"ticketSpread": {
		"cabinCode": "舱位",
		"seatsNum": "座位数",
		"cabinType": "舱位类型",
		"NominalPrice": "票面价",
		"DiscountRate": "折扣率",
		"AirportTax": "机场税",
		"FuelTax": "燃油税",
		"choose": "选择",
		'restriction': "限制条件",
		"violation": "违反政策",
	},
	"LowestAirlineRemind": "该航班为廉价航空，托运行李额须以航司规则为准，详情请咨询差旅顾问。",
	"popBody": {
		"popTittle": "您的预订与贵公司差旅政策不符，请选择原因",
		"confirm": "确定",
		"reasonTittle": "根据贵公司差旅政策规定， 因您未选择最低价格航班，请您选择原因：",
		"lowestTittle": "根据贵公司差旅政策规定， 全天最低价航班为：",
		"lowestTittle1": "根据贵公司差旅政策规定， 前后",
		"lowestTittle2": "小时最低价航班为：",
		"lowestTittleSW":"最低票价：",
		"chooseLowest": "预订最低票价",
		"rasonRemind": "请选择理由",
		"ticketPrice": "票价(不含税):",
		"save": "可节省:",
		"true": "实际承运:",
		"book":"预订",
	},
	"stopNoMsg": "该航班有经停，是否确认继续预定？",
	"rulePopHeader": "退改签规则",
	'alternateTips':"您选择的是候补舱位，请确认",
}
var en = {
	"progressBar": {
		"search": "Search",
		"book": "Book",
		"complete": "Complete",
	},
	"searchBody": {
		"oneWay": "One-way",
		"roundTrip": "Round-Trip",
		"search": "Search",
		"weekDay": 'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
		'cabins': {
			'cabin1': 'All Classes',
			'cabin2': 'Economy',
			'cabin3': 'Business',
			'cabin4': 'First',
			'cabin5': 'Business/First',
		},
		'allDay': "24hours",
	},
	'siftBody': {
		"departureTime": "Departure Time",
		"arrivalTime": "Arrival Time",
		"all": "All Departure Airport",
		"all2": "All Arrival Airports",
		"price": "Price",
	},
	'airportName': {
		'all': 'All Airlines',
		'zg': 'AIR CHINA',
		'df': 'CHINA EASTERN AIRLINE',
		'sh': 'SHANGHAI AIRLINES',
		'hn': 'HAINAN AIRLINES',
		'nf': 'CHINA SOUTHERN AIRLINE',
		'xm': 'XIAMEN AIRLINES',
		'sz': 'SHENZHEN AIRLINES',
		'km': 'KUNMINGHANGKOUG',
		'zgl': 'CHINA UNITED AIRLINE',
		'jy': 'JUNEYAO AIRLINES',
		'sd': 'SHANDONG AIRLINES',
		'sz': 'SHENZHEN AIRLINES',
		'sc': 'SICHUAN AIRLINES',
		'cq': 'SPRING AIRLINES',
		'cd': 'CHENGDU AIRLINES',
		'fj': 'FUJIAN AIRWAYS',
	},
	"trainRecommend": "Train Recommendation",
	"trainSearch": "Click to book",
	"trainRemind": "Are you sure about linking to the train ticket page?",
	"lowest": "Lowest",
	"ticketList": {
		"listRemind": "No relevant flight available or out of policy",
		"tittle": "Segment List",
		"FlightNo": "Flight",
		"PlaneType": "Aircraft",
		"Punctuality": "Punctuality",
		"Meal": "Meal:",
		"Duration": "Duration",
		"morePrice": "More",
		"LowestFare": "Lowest Fare",
		"LowestFareFlight": "Lowest Fare of the same Flight",
		"PreferredAirline": "Preferred Airline",
		"CompanyPreferred": "Company Preferred",
		"preDay": "Previous Day",
		"nextDay": "Next Day",
		"Code_share": "(share)",
		"Tax": "Tax",
		"roundTittleGo": "Departure",
		"roundTittleReturn": "Return",
		"protocol": "Corporate",
	},
	"ticketSpread": {
		"cabinCode": "Cabin Code",
		"seatsNum": "Seats Num",
		"cabinType": "Cabin Type",
		"NominalPrice": "Nominal Price",
		"DiscountRate": "Discount Rate",
		"AirportTax": "Airport Tax",
		"FuelTax": "Fuel Tax(CNY)",
		"choose": "Choose",
		'restriction': "Restriction",
		"violation": "Out of Policy",
	},
	"LowestAirlineRemind": "This is a low-cost flight, the checked-in baggage allowance will be subject to airline's policy. Please contact your consultant for details of luggage issue.",
	"popBody": {
		"popTittle": "Your reservation does not meet your company's travel policy, please select a proper reason from the list below.",
		"confirm": "Confirm",
		"reasonTittle": "According to your company's travel policy, if you have not selected the lowest price flight, please choose the reason:",
		"lowestTittle": "Lowest logical fare option according to your company's travel policy.",
		"lowestTittle1": "Lowest logical fare option within  ±",
		"lowestTittle2": " hours according to your company's travel policy.",
		"lowestTittleSW":"Lowest Fare：",
		"chooseLowest": "Book the lowest fare",
		"rasonRemind": "Please choose reasons.",
		"ticketPrice": "Ticket Price(Tax exclusive):",
		// "save": "Miss Saving:",
		'save':'Lost Saving:',
		"true": "True:",
		"book":"Book",
	},
	"stopNoMsg": "This flight has a stopover, do you want to continue booking?",
	"rulePopHeader": "Restriction",
	'alternateTips':"You have chosen alternate class, please confirm",
}

function get_lan(m) {
	//获取文字
	var lan = $.session.get('obtLanguage'); //语言版本
	//选取语言文字
	switch (lan) {
		case 'CN':
			var t = cn[m];
			break;
		case 'EN':
			var t = en[m];
			break;
		default:
			var t = cn[m];
	}
	if (t == undefined) t = cn[m];
	if (t == undefined) t = en[m];

	return t;
}
$(function() {
	showContent(); //内容展示
	ticketList(); //机票列表
	showReasonList(); //理由
})
//展示理由
function showReasonList() {
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/SystemService.svc/ProfilePost",
			jsonStr: '{"key":' + netUserId + '}'
		},
		success: function(data) {
			var res = JSON.parse(data);
			console.log(res);
			$(".popReasonList").html('');
			res.AirDenyReasons.map(function(item) {
				if (item.Code != "OT") {
					$(".popReasonList").append(
						'\
                        <div class="popReasonLi flexRow">\
                        <input type="radio" name="radio" class="reasonRadio" code="' +
						item.Code + '" value="' + item.Name + '">\
                        <div class="reasonText">' + item.Name +
						'</div>\
                        </div>\
                    ')
				} else {
					$(".popReasonList").append(
						'\
                        <div class="popReasonLi flexRow" style="position:relative;">\
                        <input type="radio" name="radio" class="reasonRadio" code="' +
						item.Code + '" value="' + item.Name +
						'">\
                        <div style="position:absolute;top:0;left:64px;">' + item.Name +
						'</div>\
                        <textarea class="reasonTextarea"></textarea>\
                        </div>\
                    '
					)
				}
			})
			if (res.QueryDomesticTicketsWithTime && res.DomesticHideAllDay) {
				$(".domAllDay").remove();
				
				// $("#domDepartureSelect").val("8");
				// $("#domReturnSelect").val("8");
			}
		},
		error: function() {
			// alert('fail');
		}
	});
}
//内容展示
function showContent() {
	$("#main").html(
		'\
        <div class="autoCenter">\
            <div class="progressBar flexRow"></div>\
            <div class="searchBody flexRow"></div>\
			<div class="picBody"><img class="picGroupImg" src="../staticFile/query.png"/><a class="picHref" target="_blank" href=""></a></div>\
            <div class="ticketBody">\
                <div class="listTittle">' +
		get_lan('ticketList').tittle +
		'</div>\
                <div class="chooseDate specificFontColor"></div>\
                <div class="listRemind flexRow">\
                   <div style="width:100%;color:#222;font-weight:bold;padding-left:40px" class="roundTittle">' +
		get_lan('searchBody').oneWay +
		'</div>\
			<div class="emailPrint btnBackColor">Email输出</div>\
                </div>\
                <div class="siftBody"></div>\
            </div>\
            <div class="recommendTrain hide flexRow"></div>\
            <div class="ticketList"></div>\
        </div>\
        '
	)
	
	if(TAorderNo!=undefined){
		console.log('隐藏')
		$('.menu .autoCenter').addClass('hide')
		$('.orderTittle').addClass('hide')
		// $('.autoScrollY').addClass('hide')
		$('footer').addClass('hide')
		$('.menu').css("height",'40px')
	}
	$(".progressBar").html(
		'\
        <div class="progressLine progressActiveBack"></div><div class="progressCircle progressActiveBack"></div><span class="progressActiveFont">' +
		get_lan('progressBar').search +
		'</span>\
        <div class="progressLine progressBackColor"></div><div class="progressCircle progressBackColor"></div>' +
		get_lan('progressBar').book +
		'\
        <div class="progressLine progressBackColor"></div><div class="progressCircle progressBackColor"></div>' +
		get_lan('progressBar').complete + '\
        ')
		
		// 12.25 删除周几
		// <div class="domDepartureWeek">' +
		// getWeek(searchDomInfo.date) +
		// '</div>
	$(".searchBody").html('\
        <select class="searchState">\
        <option state="1" value="1">' + get_lan(
			'searchBody').oneWay + '</option>\
        <option state="2" value="2">' + get_lan('searchBody').roundTrip +
		'</option>\
        </select>\
        <div class="domDepartureCitySearch"><div class="departureAirIcon"></div><input type="text" id="domDepartureCity" style="width:140px" value="' +
		searchDomInfo.departureCityText + '" code="' + searchDomInfo.departureCity +
		'"></div>\
        <div class="domArrivalCitySearch"><div class="arrivalAirIcon"></div><input type="text" id="domArrivalCity" style="width:140px" value="' +
		searchDomInfo.arrivalCityText + '" code="' + searchDomInfo.arrivalCity +
		'"></div>\
        <div class="domDepartureDateSearch">\
          <div class="departureDateIcon"></div>\
          <input type="text" id="domDepartureDate" readonly value="' +
		searchDomInfo.date +
		'">\
          <select type="text" id="domDepartureSelect">\
            <option value="all" class="domAllDay">' +
		get_lan("searchBody").allDay +
		'</option>\
            <option value="0">0:00</option>\
            <option value="1">1:00</option>\
            <option value="2">2:00</option>\
            <option value="3">3:00</option>\
            <option value="4">4:00</option>\
            <option value="5">5:00</option>\
            <option value="6">6:00</option>\
            <option value="7">7:00</option>\
            <option value="8">8:00</option>\
            <option value="9">9:00</option>\
            <option value="10">10:00</option>\
            <option value="11">11:00</option>\
            <option value="12">12:00</option>\
            <option value="13">13:00</option>\
            <option value="14">14:00</option>\
            <option value="15">15:00</option>\
            <option value="16">16:00</option>\
            <option value="17">17:00</option>\
            <option value="18">18:00</option>\
            <option value="19">19:00</option>\
            <option value="20">20:00</option>\
            <option value="21">21:00</option>\
            <option value="22">22:00</option>\
            <option value="23">23:00</option>\
          </select>\
          <div class="domDepartureWeek">' +
		   '<select type="text" id="DepartPlusMinus"  class="plusMinus">\
		     <option value="1">±1H</option>\
		     <option value="2">±2H</option>\
		     <option value="3">±3H</option>\
		     <option value="4">±4H</option>\
		     <option value="5">±5H</option>\
		     <option value="6">±6H</option>\
		     <option value="7">±7H</option>\
		     <option value="8">±8H</option>\
		     <option value="9">±9H</option>\
		     <option value="10">±10H</option>\
		     <option value="11">±11H</option>\
		     <option value="12">±12H</option>\
		   </select>'+
		'</div>\
        </div>\
        <div class="domReturnDateSearch">\
          <div class="returnDateIcon"></div>\
          <input type="text" id="domReturnDate" readonly value="' +
		GetDateStr(1, searchDomInfo.date) + '">\
          <div class="domReturnDateWeek">'
		  +
		 '<select type="text"  id="returnPlusMinus" class="plusMinus">\
		    <option value="1">±1H</option>\
		    <option value="2">±2H</option>\
		    <option value="3">±3H</option>\
		    <option value="4">±4H</option>\
		    <option value="5">±5H</option>\
		    <option value="6">±6H</option>\
		    <option value="7">±7H</option>\
		    <option value="8">±8H</option>\
		    <option value="9">±9H</option>\
		    <option value="10">±10H</option>\
		    <option value="11">±11H</option>\
		    <option value="12">±12H</option>\
		  </select>'
		  +
		'</div>\
          <select type="text" id="domReturnSelect">\
            <option value="all" class="domAllDay">' +
		get_lan("searchBody").allDay +
		'</option>\
            <option value="0">0:00</option>\
            <option value="1">1:00</option>\
            <option value="2">2:00</option>\
            <option value="3">3:00</option>\
            <option value="4">4:00</option>\
            <option value="5">5:00</option>\
            <option value="6">6:00</option>\
            <option value="7">7:00</option>\
            <option value="8">8:00</option>\
            <option value="9">9:00</option>\
            <option value="10">10:00</option>\
            <option value="11">11:00</option>\
            <option value="12">12:00</option>\
            <option value="13">13:00</option>\
            <option value="14">14:00</option>\
            <option value="15">15:00</option>\
            <option value="16">16:00</option>\
            <option value="17">17:00</option>\
            <option value="18">18:00</option>\
            <option value="19">19:00</option>\
            <option value="20">20:00</option>\
            <option value="21">21:00</option>\
            <option value="22">22:00</option>\
            <option value="23">23:00</option>\
          </select>\
        </div>\
        <select type="text" id="domCabin">\
          <option value="0" berthType="0">' +
		get_lan('searchBody').cabins.cabin1 + '</option>\
          <option value="1" berthType="1">' + get_lan('searchBody')
		.cabins.cabin2 + '</option>\
          <option value="2" berthType="2">' + get_lan('searchBody').cabins.cabin3 +
		'</option>\
          <option value="3" berthType="3">' + get_lan('searchBody').cabins.cabin4 +
		'</option>\
          <option value="23" berthType="23">' + get_lan('searchBody').cabins.cabin5 +
		'</option>\
        </select>\
        <div class="searchAirBtn btnBackColor">' + get_lan('searchBody').search +
		'</div></div>\
        ')
		
		// 绑定disabled方法
		
		$("#domDepartureSelect").unbind("change").change(function() {
			showPlusMinus()
		})
		$("#domReturnSelect").unbind("change").change(function() {
			showPlusMinus()
		})
		
	//时间限制
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/QueryService.svc/QueryDateLimit",
			jsonStr: '{"id":' + netUserId + ',"Language":"' + obtLanguage + '"}'
		},
		success: function(data) {
			var res = JSON.parse(data);
			console.log(res);
			res.map(function(item) {
				if (item.LimitType == 1) {
					$(".searchAirBtn").attr("CanSearch", item.CanSearch);
					$(".searchAirBtn").attr("StartLimit", item.StartLimit);
					$(".searchAirBtn").attr("Message", item.Message);
					// if(item.CanSearch==false){
					$(".chooseDate").hide();
					// }
				}
			})
		},
		error: function() {
			// alert('fail');
		}
	});
	$("#domCabin").val(searchDomInfo.showCabins);
	if (ProfileInfo.onlineStyle == "APPLE") {
		$("#domCabin").remove();
	}
	if (!ProfileInfo.QueryDomesticTicketsWithTime) {
		$("#domDepartureSelect").remove();
		$("#domReturnSelect").remove();
		// 检查是否有±几小时的权限
		if(!ProfileInfo.ShowDomesticTimeSlt){
		    $(".domDepartureWeek").remove();
			$('.domReturnDateWeek').remove()
		}
	} else {
		if (searchDomInfo.queryKey.split(',')[2].indexOf(' ') != -1) {
			var departureHour = searchDomInfo.queryKey.split(',')[2].split(' ')[1].split(':')[0];
			$("#domDepartureSelect").val(departureHour);
		} else {
			$("#domDepartureSelect").val('all');
		}
		if (searchDomInfo.queryKeyReturn && searchDomInfo.queryKeyReturn.split(',')[3].indexOf(' ') != -1) {
			var arrivalHour = searchDomInfo.queryKeyReturn.split(',')[3].split(' ')[1].split(':')[0];
			$("#domReturnSelect").val(arrivalHour);
		} else {
			$("#domReturnSelect").val('all');
		}
		// 检查是否有±几小时的权限
		if(!ProfileInfo.ShowDomesticTimeSlt){
		    $(".domDepartureWeek").remove();
			$('.domReturnDateWeek').remove()
		}
		
		// 正负小时,±小时默认值 以及状态显示
		if(day>0){
			$('#DepartPlusMinus').val(day)
		}else{
			$('#DepartPlusMinus').val(3)
		}
		if(returnday>0){
			$('#returnPlusMinus').val(returnday)
		}else{
			$('#returnPlusMinus').val(3)
		}
		// 默认值设置后
		showPlusMinus()
	}
	/*改签隐藏*/
	if (searchDomInfo.alterTicketInfo) {
		$(".searchBody").hide();
	}
	$(".searchState").change(function() {
		if ($('.searchState option:selected').attr("state") == '1') {
			$(".domReturnDateSearch").hide();
		} else if ($('.searchState option:selected').attr("state") == '2') {
			$(".domReturnDateSearch").show();
			var departureValue = new Date($("#domDepartureDate").val().replace(/-/g, "/"));
			console.log(departureValue)
			$("#domReturnDate").datepicker('destroy');
			$("#domReturnDate").datepicker({
				dateFormat: 'yy-mm-dd',
				changeMonth: true,
				changeYear: true,
				minDate: departureValue, // 当前日期之后的 0 天，就是当天
				maxDate: TAmaxDate, // 当前日期之后的 0 天，就是当天
				hideIfNoPrevNext: true,
				showOtherMonths: true,
				selectOtherMonths: true,
				onSelect: function() {
					// $(".domReturnDateWeek").text(getWeek($("#domReturnDate").val()));
				}
			});
			// if ($("#domReturnSelect").length == 1) {
			// 	$("#domReturnSelect").val(17);
			// }
			if(ProfileInfo.SearchInterAirWTime&&ProfileInfo.DomesticHideAllDay){
				if ($("#domReturnSelect").length == 1) {
					$("#domReturnSelect").val(17);
				}
			}else{
				$('#domReturnSelect').val('all')
			}
			if($("#domReturnSelect").val()!='all'){
				$('#returnPlusMinus').removeAttr("disabled")
			}
		}
	})
	$(".searchAirBtn").unbind("click").click(function() {
		if ($(this).attr("startlimit") && parseInt($(this).attr("startlimit")) > 0) {
			if (datedifference(getNowFormatDate(), $('#domDepartureDate').val()) < parseInt($(this).attr("startlimit"))) {
				var mymessage = confirm($(this).attr("Message"));
				if (mymessage == true) {
					if ($(this).attr("CanSearch") != "true") {
						return false;
					}
				} else {
					return false;
				}
			}
		}

		function getNowFormatDate() {
			var date = new Date();
			var seperator1 = "-";
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if (month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if (strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			var currentdate = year + seperator1 + month + seperator1 + strDate;
			return currentdate;
		}

		function datedifference(sDate1, sDate2) {
			var dateSpan,
				tempDate,
				iDays;
			sDate1 = Date.parse(sDate1);
			sDate2 = Date.parse(sDate2);
			dateSpan = sDate2 - sDate1;
			dateSpan = Math.abs(dateSpan);
			iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
			return iDays
		};
		if (ProfileInfo.onlineStyle == "APPLE") {
			var berthtype = 1;
			var cityList = '"'+$('#domDepartureCity').attr("code")+'","'+$('#domArrivalCity').attr("code")+'"';
			tools.appleRemindPop(cityList,1,netUserId,function(){searchDom(berthtype)});
		} else {
			var berthtype = $("#domCabin  option:selected").attr("berthtype");
			searchDom(berthtype);
		}
		function searchDom(){
		if ($('.searchState option:selected').attr("state") == '1') {
			var searchDomInfo = {
				'type': 'oneWay',
				'departureCityText': $('#domDepartureCity').val(),
				'arrivalCityText': $('#domArrivalCity').val(),
				'departureCity': $('#domDepartureCity').attr("code"),
				'arrivalCity': $('#domArrivalCity').attr("code"),
				'date': $('#domDepartureDate').val(),
				'queryKey': $('#domDepartureCity').attr("code") + ',' + $('#domArrivalCity').attr("code") + ',' + $(
					'#domDepartureDate').val() + ',' + 'ALL',
				'showCabins': berthtype,
				'codeShare': codeShare,
				'isDirect': JSON.parse($.session.get('searchDomInfo')).isDirect,
				'isNotOpenedClassNeeded': JSON.parse($.session.get('searchDomInfo')).isNotOpenedClassNeeded,//候补
				'packagePrice': JSON.parse($.session.get('searchDomInfo')).packagePrice,//打包价
			}
			if (ProfileInfo.QueryDomesticTicketsWithTime) {
				if ($("#domDepartureSelect  option:selected").val() == "all" ) {
					var DepartureSelectValue = ''
				} else {
					var DepartureSelectValue = ' ' + $("#domDepartureSelect  option:selected").val() + ':00:00';
				}
				searchDomInfo.queryKey = $('#domDepartureCity').attr("code") + ',' + $('#domArrivalCity').attr("code") + ',' + $(
					'#domDepartureDate').val() + DepartureSelectValue + ',ALL'
			}
			// 12.30缓存更改后的正负±小时
			$.session.set('searchDomesticDay', $('#DepartPlusMinus').val());
			
			$.session.set('searchDomInfo', JSON.stringify(searchDomInfo));
			location.replace('../../domesticAir/airTicketList.html');
		} else if ($('.searchState option:selected').attr("state") == '2') {
			var searchDomInfo = {
				'type': 'roundTrip',
				'departureCityText': $('#domDepartureCity').val(),
				'arrivalCityText': $('#domArrivalCity').val(),
				'departureCity': $('#domDepartureCity').attr("code"),
				'arrivalCity': $('#domArrivalCity').attr("code"),
				'date': $('#domDepartureDate').val(),
				'returndate': $('#domReturnDate').val(),
				'queryKey': $('#domDepartureCity').attr("code") + ',' + $('#domArrivalCity').attr("code") + ',' + $(
					'#domDepartureDate').val() + ',' + 'ALL',
				'queryKeyReturn': $('#domArrivalCity').attr("code") + ',' + $('#domDepartureCity').attr("code") + ',' + $(
					'#domDepartureDate').val() + ',' + $('#domReturnDate').val() + ',',
				'showCabins': berthtype,
				'codeShare': codeShare,
				'isDirect': JSON.parse($.session.get('searchDomInfo')).isDirect,
				'isNotOpenedClassNeeded': JSON.parse($.session.get('searchDomInfo')).isNotOpenedClassNeeded,//候补
				'packagePrice': JSON.parse($.session.get('searchDomInfo')).packagePrice,//打包价
			}
			if (ProfileInfo.QueryDomesticTicketsWithTime) {
				if ($("#domDepartureSelect  option:selected").val() == "all") {
					var DepartureSelectValue = ''
				} else {
					var DepartureSelectValue = ' ' + $("#domDepartureSelect  option:selected").val() + ':00:00';
				}
				if ($("#domReturnSelect  option:selected").val() == "all") {
					var ReturnSelectValue = ''
				} else {
					var ReturnSelectValue = ' ' + $("#domReturnSelect  option:selected").val() + ':00:00';
				}
				searchDomInfo.queryKey = $('#domDepartureCity').attr("code") + ',' + $('#domArrivalCity').attr("code") + ',' + $(
					'#domDepartureDate').val() + DepartureSelectValue + ',ALL';
				searchDomInfo.queryKeyReturn = $('#domArrivalCity').attr("code") + ',' + $('#domDepartureCity').attr("code") +
					',' + $('#domDepartureDate').val() + DepartureSelectValue + ',' + $('#domReturnDate').val() + ReturnSelectValue +
					',ALL';
			}
			// 12.30缓存更改后的正负±小时
			$.session.set('searchDomesticDay', $('#DepartPlusMinus').val());
			$.session.set('searchDomesticReturnDay',$('#returnPlusMinus').val())
			
			$.session.set('searchDomInfo', JSON.stringify(searchDomInfo));
			location.replace('../../domesticAir/airTicketList.html');
		}
	}
	})
	$("#domDepartureCity").kuCity();
	$("#domArrivalCity").kuCity();
	
	
	$("#domDepartureDate").datepicker({
		dateFormat: 'yy-mm-dd',
		changeMonth: true,
		changeYear: true,
		minDate: TAminDate, // 当前日期之后的 0 天，就是当天
		maxDate: TAmaxDate, // 当前日期之后的 0 天，就是当天
		hideIfNoPrevNext: true,
		showOtherMonths: true,
		selectOtherMonths: true,
		onSelect: function() {
			// $(".domDepartureWeek").text(getWeek($("#domDepartureDate").val()));
			var departureValue = new Date($("#domDepartureDate").val().replace(/-/g, "/"));
			$("#domReturnDate").datepicker('destroy');
			$("#domReturnDate").datepicker({
				dateFormat: 'yy-mm-dd',
				changeMonth: true,
				changeYear: true,
				minDate: departureValue, // 当前日期之后的 0 天，就是当天
				maxDate: TAmaxDate, // 当前日期之后的 0 天，就是当天
				hideIfNoPrevNext: true,
				showOtherMonths: true,
				selectOtherMonths: true,
				onSelect: function() {
					// $(".domReturnDateWeek").text(getWeek($("#domReturnDate").val()));
				}
			});
			// $("#domReturnDate").val(getNextDay($("#domDepartureDate").val()));
			// $(".domReturnDateWeek").text(getWeek(getNextDay($("#domDepartureDate").val())));
		}
	});

	function getNextDay(d) {
		d = new Date(d);
		d = +d + 1000 * 60 * 60 * 24;
		d = new Date(d);
		var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
		var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
		//格式化
		return d.getFullYear() + "-" + month + "-" + day;
	}
	/*推荐火车*/
	if (searchDomInfo.type == "oneWay") {
		$(".recommendTrain").removeClass("hide");
		recommendTrain();
	} else if (searchDomInfo.type == "roundTrip" && !isReturn) {
		$(".recommendTrain").removeClass("hide");
		recommendTrain();
	}
	//筛选排序模块
	$(".siftBody").html('\
        <select class="airLineChoose">\
          <option airCode="All">' + get_lan(
			'airportName').all +
		'</option>\
        </select>\
        <div class="siftLine" style="left:200px;"></div>\
        <select class="departAirPortChoose">\
          <option value="all" airport="all">' +
		get_lan('siftBody').all +
		'</option>\
        </select>\
        <div class="siftLine" style="left:400px;"></div>\
        <select class="arrivalAirPortChoose">\
          <option value="all" airport="all">' +
		get_lan('siftBody').all2 +
		'</option>\
        </select>\
        <div class="siftLine" style="left:600px;"></div>\
        <div class="departureTimeSort flexRow">' +
		get_lan('siftBody').departureTime +
		'<div class="departureTimeSortIcon"></div></div>\
        <div class="priceSort flexRow">' + get_lan('siftBody').price +
		'<div class="priceSortIcon"></div></div>\
        ')
	/*apple*/
	if (ProfileInfo.onlineStyle == "APPLE") {
		$(".airLineChoose").remove();
		$(".siftLine").remove();
	}
	//<div class="arrivalTimeSort flexRow">'+get_lan('siftBody').arrivalTime+'<div class="arrivalTimeSortIcon"></div></div>\
}

function getWeek(dateStr) {
	var myDate = new Date(Date.parse(dateStr.replace(/-/g, "/")));
	return get_lan('searchBody').weekDay.split(',')[myDate.getDay()];
}

function GetDateStr(AddDayCount, date) {
	var dd = new Date(date.replace(/-/g, '/'));
	dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期 
	var y = dd.getFullYear();
	// var m = dd.getMonth()+1;//获取当前月份的日期 
	// var d = dd.getDate();
	var m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1);
	var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate();
	return y + "-" + m + "-" + d;
}
/*火车推荐*/
function recommendTrain() {
	var queryKeyTrain = searchDomInfo.queryKey.substring(0, searchDomInfo.queryKey.length - 3);
	console.log(queryKeyTrain);
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/QueryService.svc/QuerySingleTrain",
			jsonStr: '{"queryKey":"' + queryKeyTrain + '","id":' + netUserId + ',"Language":"' + obtLanguage +
				'","routeType":"1","endTime":""}'
		},
		success: function(data) {
			var res = JSON.parse(data);
			console.log(res);
			if (res.FareList.length != 0) {
				$(".recommendTrain").html(
					'\
                    <div class="trainIcon" style="background-image:url(\'../domesticAir/images/trainTop.png\');background-size:100% 100%;">\
                      \
                    </div>\
                    <div class="trainRecommend">' +
					get_lan('trainRecommend') +
					'</div>\
                    <div style="line-height:60px;width:50px;text-align: center;">' + res.TrainCode +
					'</div>\
                    <div class="trainDeparture">' + res.StationStart + '<br/>' + res.TimeStart +
					'</div>\
                    <img src="../../index/images/trainIcon.png" style="width:30px;height:30px;margin:15px 0 0 10px;">\
                    <div class="trainArrive">' +
					res.StationArrive + '<br/>' + res.TimeArrive +
					'</div>\
                    <div style="line-height:60px;width:160px;text-align: center;">' + res.UseTime +
					'</div>\
                    <div class="trainFare" queryKey="' + res.RID + ',' + res.FareList[0].SeatID +
					'"><span style="font-size:14px;color:#4d4d4d;">￥</span><span style="text-decoration:underline;">' + res.FareList[
						0].Price +
					'</span></div>\
                    <div style="font-size:14px;color:#4d4d4d;line-height:60px;margin-left:35px;">' +
					get_lan('lowest') + '</div>\
                    \
                ')
				//<div class="trainSearch">'+get_lan('trainSearch')+'</div>\
				$(".trainFare").unbind("click").click(function() {
					var trainRemind = confirm(get_lan("trainRemind"));
					if (trainRemind == true) {
						var searchTrainInfo = {
							'type': 'oneWay',
							'departureCityText': searchDomInfo.departureCityText,
							'arrivalCityText': searchDomInfo.arrivalCityText,
							'departureCity': searchDomInfo.departureCity,
							'arrivalCity': searchDomInfo.arrivalCity,
							'date': searchDomInfo.date,
							'queryKey': searchDomInfo.departureCityText + ',' + searchDomInfo.arrivalCityText + ',' + searchDomInfo.date +
								',',
						}
						$.session.set('searchTrainInfo', JSON.stringify(searchTrainInfo));
						window.location.href = '../../train/trainTicketList.html';
					}
				})
				if (!ProfileInfo.isTrain) {
					$(".recommendTrain").hide();
				}
			} else {
				$(".recommendTrain").hide();
			}
		},
		error: function() {
			// alert('fail');
		}
	});
}
GetCompanyImageInfos()
// 广告图片接口
function GetCompanyImageInfos(){
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/SystemService.svc/GetCompanyImageInfosWType",
			jsonStr: '{"key":' + netUserId + ',"appType":"WEB"}',
		},
		success: function(data) {
			if(data=="" || data.indexOf("404")>-1){
				$('.picBody').remove()
				return false
			}
			var res = JSON.parse(data);
			console.log(res);
			if(res.code==200){
				res.CompanyImageList.map(function(item){
					if(item.type==1){
						$('.picGroupImg').attr("src",item.path)
						if(item.hyperLink==""){
							$(".picHref").remove()
						}else{
							$(".picHref").attr("href",item.hyperLink)
						}
					}
				})
				
			}else{
				$('.picGroupImg').attr("src","../staticFile/query.png")
				$(".picHref").remove()
				if(ProfileInfo.onlineStyle=="APPLE"){
					$('.picBody').remove()
				}
				// 应该不需要提示
				// alert(res.errMsg)
			}
		},
		error: function() {
			// alert('fail');
		}
	});
};

//机票列表
function ticketList() {
	// $('body').mLoading("show");
	
	// var text="Loading…"
	// if($.session.get('obtLanguage')=="CN"){
	// 	text="正在为您搜索中，请耐心等待"
	// }
	// $('body').mLoading({
	// 	 text:text,
	// 	 icon:"../images/loading.gif"
	// });
	// $('.mloading-icon').css({height:"150px",width:"auto",display:"block",margin:"auto"})
	// $('.mloading-bar').css({width:"400px"})
	// $('body').mLoading({
	// 	 text:text,
	// 	 icon:"../images/loading.gif"
	// });
	tools.searchLoadingShow()
	if (searchDomInfo.type == "oneWay") {
		var queryKey = searchDomInfo.queryKey;
		var preDayDate = GetDateStr(-1, searchDomInfo.date);
		var nextDayDate = GetDateStr(1, searchDomInfo.date);
		$(".chooseDate").html('\
            <span class="preDay" style="margin-right:20px;">(' + preDayDate.substring(5,
				preDayDate.length) + ')' + get_lan('ticketList').preDay + '</span>\
            <span class="nextDay">(' +
			nextDayDate.substring(5, nextDayDate.length) + ')' + get_lan('ticketList').nextDay + '</span>\
            ')
		//前一天 后一天
		if (new Date() >= new Date(GetDateStr(0, searchDomInfo.date).replace(/\-/g, "\/"))) {
			$(".preDay").hide();
		}
		if (searchDomInfo.date == searchDomInfo.returndate) {
			$(".nextDay").hide();
		}
		$(".preDay").unbind("click").click(function() {
			if (new Date() < new Date(GetDateStr(0, searchDomInfo.date).replace(/\-/g, "\/"))) {
				var queryKeyList = queryKey.split(',');
				if (!ProfileInfo.QueryDomesticTicketsWithTime) {
					queryKeyList[2] = preDayDate;
				} else {
					if (queryKeyList[2].indexOf(" ") != -1) {
						queryKeyList[2] = preDayDate + ' ' + queryKeyList[2].split(' ')[1];
					} else {
						queryKeyList[2] = preDayDate;
					}
					// queryKeyList[2] = preDayDate+' '+queryKeyList[2].split(' ')[1];
				}
				searchDomInfo.date = preDayDate;
				searchDomInfo.queryKey = queryKeyList.join(",");
				$.session.set('searchDomInfo', JSON.stringify(searchDomInfo));
				location.reload();
			} else {
				$(".preDay").hide();
			}
		})
		$(".nextDay").unbind("click").click(function() {
			var queryKeyList = queryKey.split(',');
			if (!ProfileInfo.QueryDomesticTicketsWithTime) {
				queryKeyList[2] = nextDayDate;
			} else {
				if (queryKeyList[2].indexOf(" ") != -1) {
					queryKeyList[2] = nextDayDate + ' ' + queryKeyList[2].split(' ')[1];
				} else {
					queryKeyList[2] = nextDayDate;
				}
			}
			searchDomInfo.date = nextDayDate;
			searchDomInfo.queryKey = queryKeyList.join(",");
			$.session.set('searchDomInfo', JSON.stringify(searchDomInfo));
			location.reload();
		})
		if (searchDomInfo.alterTicketInfo && searchDomInfo.alterTicketInfo != "" && searchDomInfo.queryKey.split(',')[3] !=
			"All") {
			if (searchDomInfo.type == "oneWay") {
				var alterPrice = searchDomInfo.alterTicketInfo.split(",")[5];
			} else if (searchDomInfo.type == "roundTrip") {
				var alterPrice = parseFloat(searchDomInfo.alterTicketInfo.split(",")[5]) / 2;
			}
		} else {
			var alterPrice = "";
		}
		if (orgCabinCode == "") {
			alterPrice = ""
		}
		// 旧接口
		// url: $.session.get('obtCompany')+"/QueryService.svc/DomesticSegmentsSearchNew",
		// old 
		
		// 12.09修改 去除时间筛选
		
		var NewQuery=queryKey
		if(ProfileInfo.ShowDomesticTimeSlt){
			var newList= queryKey.split(',')
			var time =new Date(newList[2].replace(/-/g, "/"))
			newList[2]=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()
			NewQuery=newList.join(',')
		}
		// roundTittle 原get_lan('searchBody').oneWay修改为
		if($('.searchState').val()==1){
			var sobj=searchDomInfo
			if(obtLanguage=="CN"){
				var roundStr=get_lan('searchBody').oneWay+"&nbsp;&nbsp;&nbsp;"+sobj.departureCityText+"-"+sobj.arrivalCityText+"&nbsp;&nbsp;&nbsp;"+sobj.date+"&nbsp;&nbsp;&nbsp;"+getWeek(sobj.date)
			}else{
				var roundStr=get_lan('searchBody').oneWay+"&nbsp;&nbsp;&nbsp;"+sobj.departureCity+"-"+sobj.arrivalCity+"&nbsp;&nbsp;&nbsp;"+sobj.date+"&nbsp;&nbsp;&nbsp;"+getWeek(sobj.date)
			}
			if(ProfileInfo.onlineStyle=="APPLE"){
				var roundStr=get_lan('searchBody').oneWay
			}
			$(".roundTittle").html(roundStr);
		}
		
		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: {
				url: $.session.get('obtCompany') + "/QueryService.svc/GetDomesticSegmentsNew",
				jsonStr: '{"request":{"queryKey":"' + NewQuery + '","orgAirport":"' + departureCity + '","dstAirport":"' +
					 arrivalCity+ '","id":' + netUserId + ',"Language":"' + obtLanguage + '","showCabins":"' + searchDomInfo.showCabins +
					'","isCodeShare":"' + searchDomInfo.codeShare + '","minFare":"' + alterPrice + '","maxFare":"","orgCabinCode":"' +
					orgCabinCode + '","IsDirect":"'+JSON.parse($.session.get('searchDomInfo')).isDirect+'","isNotOpenedClassNeeded":"'+JSON.parse($.session.get('searchDomInfo')).isNotOpenedClassNeeded+'"}}'
			},
			success: function(data) {
				// $('body').mLoading("hide");
				tools.searchLoadingHide()
				var res = JSON.parse(data);
				console.log(res);
				
				// 时间选择
				setTime=$('#domDepartureSelect').val()
				day=$.session.get('searchDomesticDay');
				// if(setTime=='all'){
				// 	day=''
				// }				
				// console.log(setTime)
				// console.log(day)
				
				
				
					
				// if(res.length == 0){
				//     alert(get_lan("ticketList").listRemind);
				// }
				// if(searchDomInfo.isDirect){
				//     var isDirectRes = []
				//     res.map(function(item){
				//         if(item.StopNo=="直飞"||item.StopNo=="Direct"){
				//             isDirectRes.push(item);
				//         }
				//     })
				//     ticketListInfo(isDirectRes);
				//     chooseAirLine(isDirectRes);//选择航空公司
				//     sortTicketInfo(isDirectRes);//排序
				// }else{
				//     ticketListInfo(res);
				//     chooseAirLine(res);//选择航空公司
				//     sortTicketInfo(res);//排序
				// }
				if (res.segmentList.length == 0) {
					// alert(get_lan("ticketList").listRemind);
					if(res.code=="200"){
						alert(res.errMsg);
					}
				}
				if (searchDomInfo.isDirect) {
					var isDirectRes = []
					res.segmentList.map(function(item) {
						if (item.StopNo == "直飞" || item.StopNo == "Direct") {
							isDirectRes.push(item);
						}
					})
					ticketListInfo(isDirectRes);
					chooseAirLine(isDirectRes); //选择航空公司
					sortTicketInfo(isDirectRes); //排序
				} else {
					ticketListInfo(res.segmentList);
					chooseAirLine(res.segmentList); //选择航空公司
					sortTicketInfo(res.segmentList); //排序
				}
			},
			error: function() {
				// alert('fail');
			}
		});
	} else if (searchDomInfo.type == "roundTrip") {
		if (!isReturn) {
			var preDayDate = GetDateStr(-1, searchDomInfo.date);
			var nextDayDate = GetDateStr(1, searchDomInfo.date);
			$(".chooseDate").html('\
                <span class="preDay" style="margin-right:20px;">(' + preDayDate.substring(5,
					preDayDate.length) + ')' + get_lan('ticketList').preDay + '</span>\
                <span class="nextDay">(' +
				nextDayDate.substring(5, nextDayDate.length) + ')' + get_lan('ticketList').nextDay + '</span>\
                ')
			//前一天 后一天
			if (new Date() >= new Date(GetDateStr(0, searchDomInfo.date).replace(/\-/g, "\/"))) {
				$(".preDay").hide();
			}
			$(".preDay").unbind("click").click(function() {
				if (new Date() < new Date(GetDateStr(0, searchDomInfo.date).replace(/\-/g, "\/"))) {
					var queryKeyList = searchDomInfo.queryKey.split(',');
					var queryKeyReturnList = searchDomInfo.queryKeyReturn.split(',');
					if (!ProfileInfo.QueryDomesticTicketsWithTime) {
						queryKeyList[2] = preDayDate;
						queryKeyReturnList[2] = preDayDate;
					} else {
						if (queryKeyList[2].indexOf(" ") != -1) {
							queryKeyList[2] = preDayDate + ' ' + queryKeyList[2].split(' ')[1];
						} else {
							queryKeyList[2] = preDayDate;
						}
						if (queryKeyReturnList[2].indexOf(" ") != -1) {
							queryKeyReturnList[2] = preDayDate + ' ' + queryKeyReturnList[2].split(' ')[1];
						} else {
							queryKeyReturnList[2] = preDayDate;
						}
						// queryKeyList[2] = preDayDate+' '+queryKeyList[2].split(' ')[1];
						// queryKeyReturnList[2] = preDayDate+' '+queryKeyReturnList[2].split(' ')[1];
					}
					searchDomInfo.date = preDayDate;
					searchDomInfo.queryKey = queryKeyList.join(",");
					searchDomInfo.queryKeyReturn = queryKeyReturnList.join(",");
					$.session.set('searchDomInfo', JSON.stringify(searchDomInfo));
					location.reload();
				} else {
					$(".preDay").hide();
				}
			})
			$(".nextDay").unbind("click").click(function() {
				var queryKeyList = searchDomInfo.queryKey.split(',');
				var queryKeyReturnList = searchDomInfo.queryKeyReturn.split(',');
				if (!ProfileInfo.QueryDomesticTicketsWithTime) {
					queryKeyList[2] = nextDayDate;
					queryKeyReturnList[2] = nextDayDate;
				} else {
					if (queryKeyList[2].indexOf(" ") != -1) {
						queryKeyList[2] = nextDayDate + ' ' + queryKeyList[2].split(' ')[1];
					} else {
						queryKeyList[2] = nextDayDate;
					}
					if (queryKeyReturnList[2].indexOf(" ") != -1) {
						queryKeyReturnList[2] = nextDayDate + ' ' + queryKeyReturnList[2].split(' ')[1];
					} else {
						queryKeyReturnList[2] = nextDayDate;
					}
					// queryKeyList[2] = nextDayDate+' '+queryKeyList[2].split(' ')[1];
					// queryKeyReturnList[2] = nextDayDate+' '+queryKeyReturnList[2].split(' ')[1];
				}
				searchDomInfo.date = nextDayDate;
				searchDomInfo.queryKey = queryKeyList.join(",");
				searchDomInfo.queryKeyReturn = queryKeyReturnList.join(",");
				$.session.set('searchDomInfo', JSON.stringify(searchDomInfo));
				location.reload();
			})
		} else if (isReturn == 1) {
			var preDayDate = GetDateStr(-1, searchDomInfo.returndate);
			var nextDayDate = GetDateStr(1, searchDomInfo.returndate);
			$(".chooseDate").html('\
                <span class="preDay" style="margin-right:20px;">(' + preDayDate.substring(5,
					preDayDate.length) + ')' + get_lan('ticketList').preDay + '</span>\
                <span class="nextDay">(' +
				nextDayDate.substring(5, nextDayDate.length) + ')' + get_lan('ticketList').nextDay + '</span>\
                ')
			//前一天 后一天
			if (new Date(GetDateStr(0, searchDomInfo.date).replace(/\-/g, "\/")) >= new Date(GetDateStr(0, searchDomInfo.returndate)
					.replace(/\-/g, "\/"))) {
				$(".preDay").hide();
			}
			$(".preDay").unbind("click").click(function() {
				if (new Date(GetDateStr(0, searchDomInfo.date).replace(/\-/g, "\/")) < new Date(GetDateStr(0, searchDomInfo.returndate)
						.replace(/\-/g, "\/"))) {
					var queryKeyReturnList = searchDomInfo.queryKeyReturn.split(',');
					if (!ProfileInfo.QueryDomesticTicketsWithTime) {
						queryKeyReturnList[3] = preDayDate;
					} else {
						if (queryKeyReturnList[3].indexOf(" ") != -1) {
							queryKeyReturnList[3] = preDayDate + ' ' + queryKeyReturnList[3].split(' ')[1];
						} else {
							queryKeyReturnList[3] = preDayDate;
						}
						// queryKeyReturnList[3] = preDayDate+' '+queryKeyReturnList[3].split(' ')[1];
					}
					searchDomInfo.returndate = preDayDate;
					searchDomInfo.queryKeyReturn = queryKeyReturnList.join(",");
					$.session.set('searchDomInfo', JSON.stringify(searchDomInfo));
					location.reload();
				} else {
					$(".preDay").hide();
				}
			})
			$(".nextDay").unbind("click").click(function() {
				var queryKeyReturnList = searchDomInfo.queryKeyReturn.split(',');
				if (!ProfileInfo.QueryDomesticTicketsWithTime) {
					queryKeyReturnList[3] = nextDayDate;
				} else {
					if (queryKeyReturnList[3].indexOf(" ") != -1) {
						queryKeyReturnList[3] = nextDayDate + ' ' + queryKeyReturnList[3].split(' ')[1];
					} else {
						queryKeyReturnList[3] = nextDayDate;
					}
					// queryKeyReturnList[3] = nextDayDate+' '+queryKeyReturnList[3].split(' ')[1];
				}
				searchDomInfo.returndate = nextDayDate;
				searchDomInfo.queryKeyReturn = queryKeyReturnList.join(",");
				$.session.set('searchDomInfo', JSON.stringify(searchDomInfo));
				location.reload();
			})
		}
		$(".searchState").val("2");
		// $(".searchState").find("option").eq(1).attr("selected",true);

		$(".domReturnDateSearch").css("display", "block");
		var departureValue = new Date($("#domDepartureDate").val().replace(/-/g, "/"));
		$("#domReturnDate").val(searchDomInfo.returndate);
		// $(".domReturnDateWeek").text(getWeek($("#domReturnDate").val()));
		$("#domReturnDate").datepicker('destroy');
		$("#domReturnDate").datepicker({
			dateFormat: 'yy-mm-dd',
			changeMonth: true,
			changeYear: true,
			minDate: departureValue, // 当前日期之后的 0 天，就是当天
			maxDate: TAmaxDate, // 当前日期之后的 0 天，就是当天
			hideIfNoPrevNext: true,
			showOtherMonths: true,
			selectOtherMonths: true,
			onSelect: function() {
				// $(".domReturnDateWeek").text(getWeek($("#domReturnDate").val()));
			}
		});
		
		var sobj=searchDomInfo
		
		if (!isReturn) {
			// $(".roundTittle").text(get_lan('ticketList').roundTittleGo);
			if(obtLanguage=="CN"){
				var roundStr=get_lan('ticketList').roundTittleGo+"&nbsp;&nbsp;&nbsp;"+sobj.departureCityText+"-"+sobj.arrivalCityText+"&nbsp;&nbsp;&nbsp;"+sobj.date+"&nbsp;&nbsp;&nbsp;"+getWeek(sobj.date)
			}else{
				var roundStr=get_lan('ticketList').roundTittleGo+"&nbsp;&nbsp;&nbsp;"+sobj.departureCity+"-"+sobj.arrivalCity+"&nbsp;&nbsp;&nbsp;"+sobj.date+"&nbsp;&nbsp;&nbsp;"+getWeek(sobj.date)
			}
			if(ProfileInfo.onlineStyle=="APPLE"){
				var roundStr=get_lan('ticketList').roundTittleGo
			}
			$(".roundTittle").html(roundStr);
		} else if (isReturn == 1) {
			// $(".roundTittle").text(get_lan('ticketList').roundTittleReturn);
			if(obtLanguage=="CN"){
				var roundStr=get_lan('ticketList').roundTittleReturn+"&nbsp;&nbsp;&nbsp;"+sobj.arrivalCityText+"-"+sobj.departureCityText+"&nbsp;&nbsp;&nbsp;"+sobj.returndate+"&nbsp;&nbsp;&nbsp;"+getWeek(sobj.returndate)
			}else{
				var roundStr=get_lan('ticketList').roundTittleReturn+"&nbsp;&nbsp;&nbsp;"+sobj.arrivalCity+"-"+sobj.departureCity+"&nbsp;&nbsp;&nbsp;"+sobj.returndate+"&nbsp;&nbsp;&nbsp;"+getWeek(sobj.returndate)
			}
			if(ProfileInfo.onlineStyle=="APPLE"){
				var roundStr=get_lan('ticketList').roundTittleReturn
			}
			$(".roundTittle").html(roundStr);
		}
		if (!isReturn || isReturn != 1) {
			var queryKey = searchDomInfo.queryKey;
		} else if (isReturn == 1) {
			var queryKey = searchDomInfo.queryKeyReturn;
		}
		// url: $.session.get('obtCompany')+"/QueryService.svc/DomesticSegmentsSearchWCodeS",
		// jsonStr:'{"queryKey":"'+queryKey+'","id":'+netUserId+',"Language":"'+obtLanguage+'","showCabins":"'+searchDomInfo.showCabins+'","isCodeShare":"'+searchDomInfo.codeShare+'"}'
		// "orgAirport":"'+searchDomInfo.arrivalCity+'","dstAirport":"'+searchDomInfo.departureCity+'",
		if (orgCabinCode == "") {
			alterPrice = ""
		}
		// 12.09修改 去除时间筛选
		var NewQuery=queryKey
		console.log(NewQuery)
		if(ProfileInfo.ShowDomesticTimeSlt){
			var newList= queryKey.split(',')
			var time =new Date(newList[2].replace(/-/g, "/"))
			newList[2]=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()
			NewQuery=newList.join(',')
			if(isReturn == 1){
				var newList= queryKey.split(',')
				var time =new Date(newList[3].replace(/-/g, "/"))
				newList[3]=time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()
				NewQuery=newList.join(',')
			}
		}
		if(searchDomInfo.packagePrice && isReturn != 1){
			var newList= queryKey.split(',')
			var str=newList[0]+','+newList[1]+','+newList[2]+','+$('#domReturnDate').val()+',,'
			NewQuery=str
		}
		console.log(NewQuery)
		// 去程接口
		if(isReturn!=1){
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + "/QueryService.svc/GetDomesticSegmentsNew",
					jsonStr: '{"request":{"queryKey":"' + NewQuery + '","orgAirport":"' + departureCity + '","dstAirport":"' +
						arrivalCity + '","id":' + netUserId + ',"Language":"' + obtLanguage + '","showCabins":"' + searchDomInfo.showCabins +
						'","isCodeShare":"' + searchDomInfo.codeShare + '","minFare":"' + alterPrice + '","maxFare":"","orgCabinCode":"' +
						orgCabinCode + '","IsDirect":"'+JSON.parse($.session.get('searchDomInfo')).isDirect+'","isNotOpenedClassNeeded":"'+JSON.parse($.session.get('searchDomInfo')).isNotOpenedClassNeeded+'"}}'
				},
				success: function(data) {
					// 1012-1014新增，1026-1028res改为res.segmentList
					$('body').mLoading("hide");
					var res = JSON.parse(data);
					console.log(res);
					setTime=$('#domDepartureSelect').val()
					day=$.session.get('searchDomesticDay');
					setReturnTime=$('#domReturnSelect').val()
					returnday=$.session.get('searchDomesticReturnDay');
					// if(setReturnTime=='all'){
					// 	returnday=''
					// }
					console.log(setReturnTime)
					console.log(returnday)
					if (res.segmentList.length == 0) {
						alert(res.errMsg);
					}
					if (searchDomInfo.isDirect) {
						var isDirectRes = []
						res.segmentList.map(function(item) {
							if (item.StopNo == "直飞" || item.StopNo == "Direct") {
								isDirectRes.push(item);
							}
						})
						ticketListInfo(isDirectRes);
						chooseAirLine(isDirectRes); //选择航空公司
						sortTicketInfo(isDirectRes); //排序
					} else {
						ticketListInfo(res.segmentList);
						chooseAirLine(res.segmentList); //选择航空公司
						sortTicketInfo(res.segmentList); //排序
					}
				},
				error: function() {
					// alert('fail');
				}
			});
		}else{
			//返程接口 GetNextDomesticSegments   旧接口GetDomesticSegmentsNew
			var segmentid=$.session.get('segmentid')
			// item.Cabins[0].Key
			if(searchDomInfo.packagePrice){
				var url="/QueryService.svc/GetNextDomesticSegments";
				var jsonStr='{"id":'+netUserId+',"cabinCode":"'+searchDomInfo.queryKeyReturn.split(',')[5]+'","segmentId":"'+segmentid+'","Language":"'+obtLanguage+'"}'
			}else{
				var url="/QueryService.svc/GetDomesticSegmentsNew";
				var jsonStr='{"request":{"queryKey":"' + NewQuery + '","orgAirport":"' + departureCity + '","dstAirport":"' +
						arrivalCity + '","id":' + netUserId + ',"Language":"' + obtLanguage + '","showCabins":"' + searchDomInfo.showCabins +
						'","isCodeShare":"' + searchDomInfo.codeShare + '","minFare":"' + alterPrice + '","maxFare":"","orgCabinCode":"' +
						orgCabinCode + '","IsDirect":"'+JSON.parse($.session.get('searchDomInfo')).isDirect+'","isNotOpenedClassNeeded":"'+JSON.parse($.session.get('searchDomInfo')).isNotOpenedClassNeeded+'"}}'
			}
			
			$.ajax({
				type: 'post',
				url: $.session.get('ajaxUrl'),
				dataType: 'json',
				data: {
					url: $.session.get('obtCompany') + url,
					jsonStr:jsonStr
				},
				success: function(data) {
					// 1012-1014新增，1026-1028res改为res.segmentList
					$('body').mLoading("hide");
					var res = JSON.parse(data);
					console.log(res);
					setTime=$('#domDepartureSelect').val()
					day=$.session.get('searchDomesticDay');
					setReturnTime=$('#domReturnSelect').val()
					returnday=$.session.get('searchDomesticReturnDay');
					// if(setReturnTime=='all'){
					// 	returnday=''
					// }
					console.log(setReturnTime)
					console.log(returnday)
					if (res.segmentList.length == 0) {
						alert(res.errMsg);
					}
					if (searchDomInfo.isDirect) {
						var isDirectRes = []
						res.segmentList.map(function(item) {
							if (item.StopNo == "直飞" || item.StopNo == "Direct") {
								isDirectRes.push(item);
							}
						})
						ticketListInfo(isDirectRes);
						chooseAirLine(isDirectRes); //选择航空公司
						sortTicketInfo(isDirectRes); //排序
					} else {
						ticketListInfo(res.segmentList);
						chooseAirLine(res.segmentList); //选择航空公司
						sortTicketInfo(res.segmentList); //排序
					}
				},
				error: function() {
					// alert('fail');
				}
			});
		}
		
	}
}

function chooseAirLine(res) {
	// 飞机列表过滤
	var res=fillterTimeList(res)
	var alineLineList = [],
		i,
		j,
		len = res.length;
	for (i = 0; i < len; i++) {
		for (j = i + 1; j < len; j++) {
			if (res[i].AirLine === res[j].AirLine) {
				j = ++i;
			}
		}
		alineLineList.push(res[i]);
	}
	var alineLineSort = function(arr) {
		for (var i = 0; i < arr.length - 1; i++) {
			for (var j = i + 1; j < arr.length; j++) {
				if (arr[i].AirLineCode.charCodeAt() > arr[j].AirLineCode.charCodeAt()) {
					var temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
				}
			}
		}
		return arr;
	}

	var AirportList = [],
		AirportArriveList = [];
	i,
	j,
	len = res.length;
	for (i = 0; i < len; i++) {
		for (j = i + 1; j < len; j++) {
			if (res[i].AirportDeparte === res[j].AirportDeparte) {
				j = ++i;
			}
		}
		AirportList.push(res[i]);
	}
	for (i = 0; i < len; i++) {
		for (j = i + 1; j < len; j++) {
			if (res[i].AirportArrive === res[j].AirportArrive) {
				j = ++i;
			}
		}
		AirportArriveList.push(res[i]);
	}
	alineLineSort(alineLineList).map(function(item) {
		$(".airLineChoose").append('\
        <option airCode="' + item.AirLine + '">' + item.AirLineCode + '-' + item.AirLine +
			'</option>\
        ')
	})
	AirportList.map(function(item) {
		$(".departAirPortChoose").append('\
        <option airport="' + item.AirportDeparte + '">' + item.AirportDeparte +
			'</option>\
        ')
	})
	AirportArriveList.map(function(item) {
		$(".arrivalAirPortChoose").append('\
        <option airport="' + item.AirportArrive + '">' + item.AirportArrive +
			'</option>\
        ')
	})
	var airlineAirList = [],
		departAirPortList = [],
		arrivalAirPortList = [];
	res.map(function(item) {
		airlineAirList.push(item);
		departAirPortList.push(item);
		arrivalAirPortList.push(item);
	})

	$(".airLineChoose").change(function() {
		airlineAirList = [];
		if ($('.airLineChoose option:selected').attr("airCode") == 'All') {
			res.map(function(item) {
				airlineAirList.push(item);
			})
		} else {
			res.map(function(item) {
				if (item.AirLine == $('.airLineChoose option:selected').attr('airCode')) {
					airlineAirList.push(item)
				}
			})
		}
		siftAirList(airlineAirList, departAirPortList, arrivalAirPortList);
		$(".priceSort ").css("color", '#000');
		$(".priceSortIcon").css("background-position", "0px 0px");
		$(".departureTimeSort ").css("color", '#000');
		$(".departureTimeSortIcon").css("background-position", "0px 0px");
	})
	$(".departAirPortChoose").change(function() {
		departAirPortList = [];
		if ($('.departAirPortChoose option:selected').attr("airport") == 'all') {
			res.map(function(item) {
				departAirPortList.push(item);
			})
		} else {
			res.map(function(item) {
				if (item.AirportDeparte == $('.departAirPortChoose option:selected').attr('airport')) {
					departAirPortList.push(item)
				}
			})
		}
		siftAirList(airlineAirList, departAirPortList, arrivalAirPortList);
		$(".priceSort").css("color", '#000');
		$(".priceSortIcon").css("background-position", "0px 0px");
		$(".departureTimeSort ").css("color", '#000');
		$(".departureTimeSortIcon").css("background-position", "0px 0px");
	})
	$(".arrivalAirPortChoose").change(function() {
		arrivalAirPortList = [];
		if ($('.arrivalAirPortChoose option:selected').attr("airport") == 'all') {
			res.map(function(item) {
				arrivalAirPortList.push(item);
			})
		} else {
			res.map(function(item) {
				if (item.AirportArrive == $('.arrivalAirPortChoose option:selected').attr('airport')) {
					arrivalAirPortList.push(item)
				}
			})
		}
		siftAirList(airlineAirList, departAirPortList, arrivalAirPortList);
		$(".priceSort").css("color", '#000');
		$(".priceSortIcon").css("background-position", "0px 0px");
		$(".departureTimeSort ").css("color", '#000');
		$(".departureTimeSortIcon").css("background-position", "0px 0px");
	})
}

function siftAirList(airlineList, departAirPortList, arrivalAirPortList) {
	var chooseAirLine = [];
	var result = [];
	airlineList.map(function(item) {
		departAirPortList.map(function(dItem) {
			if (item.FlightNo == dItem.FlightNo) {
				chooseAirLine.push(item);
			}
		})
	})
	chooseAirLine.map(function(item) {
		arrivalAirPortList.map(function(aItem) {
			if (item.FlightNo == aItem.FlightNo) {
				result.push(item);
			}
		})
	})
	// console.log(result);
	ticketListInfo(result);
	sortTicketInfo(result); //排序
}
//机票排序
function sortTicketInfo(res) {
	var priceSortAsc = [];
	var priceSortDes = [];
	var timeSortAsc = [];
	var timeSortDes = [];
	res.map(function(item) {
		priceSortAsc.push(item);
		priceSortDes.push(item);
		timeSortAsc.push(item);
		timeSortDes.push(item);
	})
	var bubbleSortAsc = function(arr) {
		for (var i = 0; i < arr.length - 1; i++) {
			for (var j = i + 1; j < arr.length; j++) {
				if (parseInt(arr[i].Cabins[0].FareAmount) > parseInt(arr[j].Cabins[0].FareAmount)) {
					var temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
				}
			}
		}
		return arr;
	}
	var bubbleSortDes = function(arr) {
		for (var i = 0; i < arr.length - 1; i++) {
			for (var j = i + 1; j < arr.length; j++) {
				if (parseInt(arr[i].Cabins[0].FareAmount) < parseInt(arr[j].Cabins[0].FareAmount)) {
					var temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
				}
			}
		}
		return arr;
	}
	var timebubbleSortAsc = function(arr) {
		for (var i = 0; i < arr.length - 1; i++) {
			for (var j = i + 1; j < arr.length; j++) {
				if (parseInt(arr[i].TimeStart.split(':')[0] + arr[i].TimeStart.split(':')[1]) > parseInt(arr[j].TimeStart.split(
						':')[0] + arr[j].TimeStart.split(':')[1])) {
					var temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
				}
			}
		}
		return arr;
	}
	var timebubbleSortDes = function(arr) {
		for (var i = 0; i < arr.length - 1; i++) {
			for (var j = i + 1; j < arr.length; j++) {
				if (parseInt(arr[i].TimeStart.split(':')[0] + arr[i].TimeStart.split(':')[1]) < parseInt(arr[j].TimeStart.split(
						':')[0] + arr[j].TimeStart.split(':')[1])) {
					var temp = arr[i];
					arr[i] = arr[j];
					arr[j] = temp;
				}
			}
		}
		return arr;
	}
	$(".departureTimeSort").unbind("click").click(function() {
		$(".priceSort ").css("color", '#000');
		$(".priceSortIcon").css("background-position", "0px 0px");
		if (!$(".departureTimeSort").attr("sortType") || $(".departureTimeSort").attr("sortType") == "acs") {
			ticketListInfo(timebubbleSortDes(timeSortDes));
			$(".departureTimeSort").attr("sortType", "desc");
			$(".departureTimeSort").css("color", '#1e66ae');
			$(".departureTimeSortIcon").css("background-position", "-36px 0px");
		} else if ($(".departureTimeSort").attr("sortType") == "desc") {
			ticketListInfo(timebubbleSortAsc(timeSortAsc));
			$(".departureTimeSort").attr("sortType", "acs");
			$(".departureTimeSortIcon").css("background-position", "-18px 0px");
		}
	})
	$(".priceSort").unbind("click").click(function() {
		$(".departureTimeSort ").css("color", '#000');
		$(".departureTimeSortIcon").css("background-position", "0px 0px");
		if ($(".priceSort").attr("sortType") == "acs") {
			ticketListInfo(bubbleSortDes(priceSortDes));
			$(".priceSort").attr("sortType", "desc");
			$(".priceSort").css("color", '#1e66ae');
			$(".priceSortIcon").css("background-position", "-36px 0px");
		} else if (!$(".priceSort").attr("sortType") || $(".priceSort").attr("sortType") == "desc") {
			ticketListInfo(bubbleSortAsc(priceSortAsc));
			$(".priceSort").attr("sortType", "acs");
			$(".priceSortIcon").css("background-position", "-18px 0px");
		}
	})
}

function ticketListInfo(res) {
	var res=fillterTimeList(res)
	console.log(res)
	$(".ticketList").html('');
	var priceList = [];
	res.map(function(item) {
		priceList.push(parseInt(item.Cabins[0].FareAmount));
	})
	var minPrice = Math.min.apply(null, priceList);
	// 12.09最低价标红
	console.log(minPrice)
	// 12.09最低价标红end
	
	
	//打包价格为true时，来回程的 去程不显示更多价格
	var showMorePrice=(searchDomInfo.type == "roundTrip" && isReturn != "1")&&searchDomInfo.packagePrice?"hide":""
//Email输出，缓存
	$('.emailPrint').unbind().click(function(){
		$.session.set('EmailPrint',JSON.stringify(res))
		window.open("./emailPrint.html");  
	})
	res.map(function(item, index) {
		var showHandImg = item.Cabins[0].CabinFareType == "2" ? "show" : "hide";
		
		// 12.09最低价标红
		// var ticketPriceColor = item.ShowLowestFare == 1 ? "minPriceColor" : "";
		var ticketPriceColor=''
		if(minPrice==item.Cabins[0].FareAmount){
			ticketPriceColor='minPriceColor'
		}
		
		var remark;
		if (item.StopNo == "直飞" || item.StopNo == "Direct") {
			remark = "";
			var showStopovers = "hide";
		} else {
			var showStopovers = "";
			if (obtLanguage == "CN") {
				remark = "经停";
			} else if (obtLanguage == "EN") {
				remark = "Stopover";
			}

		}
		var share = item.IsCodeShare == true ? get_lan('ticketList').Code_share : "";
		var shareColor = item.IsCodeShare == true ? "shareColor" : "";
		if (searchDomInfo.type == "oneWay" || (searchDomInfo.type == "roundTrip" && isReturn != "1")) {
			var paramKey = item.DateStart.split("-")[0] + item.DateStart.split("-")[1] + item.DateStart.split("-")[2] + item.TimeStart
				.split(":")[0] + item.TimeStart.split(":")[1] + ',' + item.Cabins[0].CabinFareType + ',' + item.Cabins[0].CabinType;
		} else if (searchDomInfo.type == "roundTrip" && isReturn == "1") {
			var domTicketInfo = JSON.parse($.session.get('domTicketInfo'));
			var paramKey = domTicketInfo.paramKey + ',' + item.DateStart.split("-")[0] + item.DateStart.split("-")[1] + item.DateStart
				.split("-")[2] + item.TimeStart.split(":")[0] + item.TimeStart.split(":")[1] + ',' + item.Cabins[0].CabinFareType +
				',' + item.Cabins[0].CabinType;
		}
		var DepTerm = item.DepTerm != null ? "(" + item.DepTerm + ")" : "";
		var ArrTerm = item.ArrTerm != null ? "(" + item.ArrTerm + ")" : "";
		if (item.AirLineCode == "3U") {
			var airlineIcon = "a3u";
		} else if (item.AirLineCode == "3W") {
			var airlineIcon = "a3w";
		} else if (item.AirLineCode == "8L") {
			var airlineIcon = "a8l";
		} else if (item.AirLineCode == "9C") {
			var airlineIcon = "a9C";
		} else {
			var airlineIcon = item.AirLineCode;
		}
		// console.log(airlineIcon)
		var showTicketMeal = item.Meal == "" ? "hide" : "";
		var showViolation = item.Cabins[0].CabinShowType == 3 || item.Cabins[0].CabinShowType == 4 ? "" : "hide";
		// var showMore = ProfileInfo.DomesticHideMore ? "hide" : "";//WebSA,更多价格不根据这个参数来判断
		
		
		
		$(".ticketList").append('\
            <div class="ticketLi">\
                <div class="ticketAirLineIcon ' +
			airlineIcon + '"></div>\
                <div class="ticketAirLine ellipsis ' + shareColor + '" title="' + item.AirLine +
			share + '">' + item.AirLine + '<span class="' + shareColor + '">' + share +
			'</span></div>\
                <div class="ticketFlightNo" style="font-size:15px;font-weight:bold;">' + item.FlightNo +
			'</div>\
                <div class="ticketPlaneType">' + get_lan('ticketList').PlaneType + ' ' + item.PlaneType +
			'</div>\
                <div class="ticketTimeStart">' + item.TimeStart +
			'</div>\
                <div class="ticketTimeArrive">' + item.TimeArrive +
			'</div>\
                <div class="ticketAirportDeparte">' + item.AirportDeparte + DepTerm +
			'</div>\
                <div class="ticketAirportArrive">' + item.AirportArrive + ArrTerm +
			'</div>\
                <div class="ticketOntime">' + get_lan('ticketList').Punctuality + '<br/>' + '61%' +
			'</div>\
                <div class="ticketMeal ' + showTicketMeal + '">' + get_lan('ticketList').Meal + ' ' +
			item.Meal + '</div>\
                <div class="ticketDuration">' + get_lan('ticketList').Duration + ' ' + item.Duration +
			'</div>\
                <div class="ticketFareAmount ' + ticketPriceColor + '" index="' + index + '" StopNo="' +
			item.StopNo + '" FlightNumber="' + item.FlightNo.substring(2, 6) + '" segmentKey="' + item.SegmentId + '-' + item
			.Cabins[0].Key + '" price="' + item.Cabins[0].FareAmount + '" paramKey="' + paramKey + '" CabinCode="' + item.Cabins[
				0].CabinCode + '" airLineCode="' + item.AirLineCode + '" orgCity="' +item.AirportDeparteCode+'" dstCity="' + item.AirportArriveCode+
			'" LimitFare="'+item.LimitFare+'" segmentid="'+item.SegmentId+'"><span style="font-size:14px;color:#4d4d4d;">￥</span><span style="text-decoration: underline;">' + item.Cabins[
				0].FareAmount + '</span></div>\
                <div class="ticketCabin">' + item.Cabins[0].Cabin + ' ' +
			get_lan('ticketList').Tax + ' ' + item.Cabins[0].TotalTax +
			'</div>\
                <div class="ticketRestriction" SegmentId="' + item.Cabins[0].SegmengID2 +
			'" CabinCode="' + item.Cabins[0].CabinCode + '">' + get_lan('ticketSpread').restriction +
			'</div>\
                <div class="ticketViolation ' + showViolation + '">' + get_lan('ticketSpread').violation +
			'</div>\
                <div class="ticketStopNo ' + showStopovers + '" StopNo="' + item.StopNo +
			'" FlightNumber="' + item.FlightNo.substring(2, 6) + '" segmentKey="' + item.SegmentId + '-' + item.Cabins[0].Key +
			'" price="' + item.Cabins[0].FareAmount + '" paramKey="' + paramKey + '" CabinCode="' + item.Cabins[0].CabinCode +
			'" airLineCode="' + item.AirLineCode + '">' + remark +
			'</div>\
                <div class="ticketMorePrice mainFontColor ' + showMorePrice + '" spread="off" StopNo="' +
			item.StopNo + '" FlightNumber="' + item.FlightNo.substring(2, 6) + '" orgCity="' + item.AirportDeparteCode +
			'" dstCity="' + item.AirportArriveCode + '" Flight="' + item.FlightNo + '" departureTime="' + item.DateStart +
			'" CabinCode="' + item.Cabins[0].CabinCode + '" AirLineCode="' + item.AirLineCode + '" paramKey="' + paramKey +
			'" LimitFare="'+item.LimitFare+'">' + get_lan('ticketList').morePrice +
			'</div>\
                <div class="protocolBody hide">\
                  <div class="protocolText">' + get_lan(
				'ticketList').protocol +
			'</div>\
                  <div class="triangleTopRight"></div>\
                </div>\
            </div>\
            <div class="ticketLiSpread"></div>\
            '
		)
		item.Cabins.map(function(cItem) {
			if (cItem.CabinFareType == 2) {
				// console.log(index);
				$(".protocolBody").eq(index).removeClass("hide");
			}
			// if(index == 0){
			//     console.log(cItem.CabinFareType)
			// }
		})
		if (ProfileInfo.onlineStyle == "APPLE") {
			$(".protocolBody").remove();
		}
		$(".ticketFareAmount").unbind("click").click(function() {
			if(searchDomInfo.type=="roundTrip" && isReturn!=1){
				$.session.set('segmentid',$(this).attr('segmentid'))
			}
			if (searchDomInfo.alterTicketInfo && searchDomInfo.alterTicketInfo != "" && searchDomInfo.queryKey.split(',')[3] !=
				"ALL" && !ProfileInfo.DomesticHideMore) {
				// if(searchDomInfo.type=="oneWay"){
				//     var alterPrice = searchDomInfo.alterTicketInfo.split(",")[5];
				// }else if(searchDomInfo.type=="roundTrip"){
				//     var alterPrice = parseFloat(searchDomInfo.alterTicketInfo.split(",")[5])/2;
				// }
				var index = parseInt($(this).attr("index"));
				// $(".ticketMorePrice").eq(index).attr("alterPrice",alterPrice);
				$(".ticketMorePrice").eq(index).click();
			} else {
				lowestAirlineRemind(this);
				// lowestAir(this);
			}
		})
		$(".ticketStopNo").unbind("click").click(function() {
			lowestAirlineRemind(this);
		})
		$(".ticketRestriction").unbind("click").click(function() {
			restriction(this);
		})
		$(".ticketMorePrice").unbind("click").click(function() {
			if (searchDomInfo.alterTicketInfo && searchDomInfo.alterTicketInfo != "" && searchDomInfo.queryKey.split(',')[3] !=
				"All") {
				if (searchDomInfo.type == "oneWay") {
					var alterPrice = searchDomInfo.alterTicketInfo.split(",")[5];
				} else if (searchDomInfo.type == "roundTrip") {
					var alterPrice = parseFloat(searchDomInfo.alterTicketInfo.split(",")[5]) / 2;
				}
				$(this).attr("alterPrice", alterPrice);
			}
			$(".ticketLiSpread").html('');
			$(".ticketMorePrice").attr("spread", "off");
			if ($(this).attr("spread") == 'off') {
				$(this).attr("spread", "on");
				$(this).parent().next().show();
				var orgCity = $(this).attr("orgCity");
				var dstCity = $(this).attr("dstCity");
				var Flight = $(this).attr("Flight");
				var departureTime = $(this).attr("departureTime");
				var AirLineCode = $(this).attr("AirLineCode");
				var CabinCode = $(this).attr("CabinCode");
				var paramKey = $(this).attr("paramKey");
				// console.log(paramKey)
				var FlightNumber = $(this).attr("FlightNumber");
				var StopNo = $(this).attr("StopNo");
				if (isReturn != 1) {
					var roundType = 1;
				} else {
					var roundType = 2;
				}
				if ($(this).attr("alterPrice")) {
					var alterPrice = $(this).attr("alterPrice");
				} else {
					var alterPrice = "";
				}
				var that = this;
				// $('body').mLoading("show");
				tools.searchLoadingShow()
				// 航班详情
				var airLineInfo=res
				var LimitFare = $(this).attr("LimitFare")
				if(!ProfileInfo.HideOutLimitFareAir){
					LimitFare=""
				}
				// maxFare 由空 改为LimitFare
				var jsonStr={
					"request":{
						"orgCity": orgCity ,
						"id": netUserId.split('"')[0],
						"dstCity":dstCity ,
						"Flight": Flight ,
						"departureTime": departureTime ,
						"roundType": roundType ,
						"isLanguage": obtLanguage ,
						"minFare": alterPrice ,
						"maxFare":LimitFare,
						"orgCabinCode":orgCabinCode,
					},
				}
				if(searchDomInfo.type=="roundTrip" && isReturn!=1){
					if(searchDomInfo.packagePrice){
						jsonStr.request.needSearch=false;
					}else{
						jsonStr.request.needSearch=true;
					}
				}else{
					
				}
				$.ajax({
					type: 'post',
					url: $.session.get('ajaxUrl'),
					dataType: 'json',
					data: {
						url: $.session.get('obtCompany') + "/QueryService.svc/QueryCabinsNew",
						jsonStr: '{"request":{"orgCity":"' + orgCity + '","id":' + netUserId + ',"dstCity":"' + dstCity +
							'","Flight":"' + Flight + '","departureTime":"' + departureTime + '","roundType":"' + roundType +
							'","isLanguage":"' + obtLanguage + '","minFare":"' + alterPrice + '","maxFare":"'+LimitFare+'","orgCabinCode":"' +
							orgCabinCode + '"}}'
						// jsonStr:'{"orgCity":"'+orgCity+'","id":'+netUserId+',"dstCity":"'+dstCity+'","Flight":"'+Flight+'","departureTime":"'+departureTime+'","roundType":"'+roundType+'","isLanguage":"'+obtLanguage+'"}'
					},
					success: function(data) {
						// $('body').mLoading("hide");
						tools.searchLoadingHide()
						var res = JSON.parse(data);
						// res[0].SeatCount=0//测试数据
						console.log(res);
						if (res.length != 0) {
							$(that).parent().next().html(
								'\
                                <table class="spreadTable" border="0" cellpadding="0" cellspacing="0">\
                                <tr style="background-color: #e9f0f6;">\
                                <th style="width:100px;"></th>\
                                <th style="width:120px;">' +
								get_lan('ticketSpread').cabinType +
								'</th>\
                                <th style="width:160px;"></th>\
                                <th style="width:80px;">' +
								get_lan('ticketSpread').seatsNum + '</th>\
                                <th style="width:120px;">' +
								get_lan('ticketSpread').DiscountRate +
								'</th>\
                                <th style="width:80px;"></th>\
                                <th style="width:120px;">' +
								get_lan('ticketSpread').NominalPrice +
								'</th>\
                                <th style="width:260px;"></th>\
                                <th style="width:160px;"></th>\
                                </tr>\
                                </table>\
                                '
							);
							res.map(function(item) {
								var showHandImg = item.CabinFareType == 2 ? "show" : "hide";
								var showViolation = item.CabinShowType == 3 || item.CabinShowType == 4 ? "" : "hide";
								if (searchDomInfo.type == "oneWay" || (searchDomInfo.type == "roundTrip" && isReturn != "1")) {
									var returnParamKey = paramKey.split(',')[0] + ',' + paramKey.split(',')[1] + ',' + item.CabinType;
								} else if (searchDomInfo.type == "roundTrip" && isReturn == "1") {
									var returnParamKey = paramKey.split(',')[0] + ',' + paramKey.split(',')[1] + ',' + item.CabinType +
										',' + paramKey.split(',')[3] + ',' + paramKey.split(',')[4] + ',' + item.CabinType;
								}
								var redText=item.SeatCount==0?'color:red':""
								var priceColor=item.SeatCount==0?'red':"#1e66ae"
								
								//  item.Discount
								if (alterPrice != "" && parseFloat(item.FareAmount) >= parseFloat(alterPrice)) {
									$(that).parent().next().children(".spreadTable").append(
										'\
                                        <tr style="'+redText+'">\
                                        <td></td>\
                                        <td>' +
										item.Cabin +
										'</td>\
                                        <td class="restrictionBtn" SegmentId="' + item.SegmengID2 +
										'" CabinCode="' + item.CabinCode + '" style="cursor:pointer;text-decoration:underline;">' + get_lan(
											'ticketSpread').restriction + '</td>\
                                        <td>' + item.SeatCount +
										'</td>\
                                        <td>' +item.Discount+
										'</td>\
                                        <td><img class="' + showHandImg +
										'" src="../../css/images/handImg.png" style="margin: 5px 0 0 27px;"></td>\
                                        <td style="font-size:14px;color:'+priceColor+';">￥' +
										item.FareAmount + '</td>\
                                        <td><div class="violationIcon ' +
										showViolation + '">' + get_lan('ticketSpread').violation +
										'</div></td>\
                                        <td><div class="chooseTicket" StopNo="' +
										StopNo + '" FlightNumber="' + FlightNumber + '" segmentKey="' + item.SegmengID2 + '-' + item.Key +
										'" price="' + item.FareAmount + '" CabinCode="' + CabinCode + '" AirLineCode="' + AirLineCode +
										'" paramKey="' + returnParamKey + '" orgCity="' +orgCity+'" dstCity="' + dstCity+'">' + get_lan('ticketSpread').choose +
										'</div></td>\
                                        </tr>\
                                        '
									);
								} else if (alterPrice == "") {
									$(that).parent().next().children(".spreadTable").append(
										'\
                                        <tr style="'+redText+'">\
                                        <td></td>\
                                        <td>' +
										item.Cabin +
										'</td>\
                                        <td class="restrictionBtn" SegmentId="' + item.SegmengID2 +
										'" CabinCode="' + item.CabinCode + '" style="cursor:pointer;text-decoration:underline;">' + get_lan(
											'ticketSpread').restriction + '</td>\
                                        <td>' + item.SeatCount +
										'</td>\
                                        <td>' + item.Discount +
										'</td>\
                                        <td><img class="' + showHandImg +
										'" src="../../css/images/handImg.png" style="margin: 5px 0 0 27px;"></td>\
                                        <td style="font-size:14px;color:'+priceColor+';">￥' +
										item.FareAmount + '</td>\
                                        <td><div class="violationIcon ' +
										showViolation + '">' + get_lan('ticketSpread').violation +
										'</div></td>\
                                        <td><div class="chooseTicket" StopNo="' +
										StopNo + '" FlightNumber="' + FlightNumber + '" segmentKey="' + item.SegmengID2 + '-' + item.Key +
										'" seatcount="'+item.SeatCount+'" price="' + item.FareAmount + '" CabinCode="' + CabinCode + '" AirLineCode="' + AirLineCode +
										'" paramKey="' + returnParamKey + '" orgCity="' +orgCity+'" dstCity="' + dstCity+'">' + get_lan('ticketSpread').choose +
										'</div></td>\
                                        </tr>\
                                        '
									);
								}
							})
							$(".restrictionBtn").unbind("click").click(function() {
								restriction(this);
							})
							$(".chooseTicket").unbind("click").click(function() {
								if(searchDomInfo.isNotOpenedClassNeeded=="Y" && $(this).attr('seatcount')==0){
									var f=confirm(get_lan('alternateTips'))
									if(f){
										lowestAirlineRemind(this);
									}
								}else{
									lowestAirlineRemind(this);
								}
								
								
							})
						} else {
							$(that).parent().next().html(
								'\
                                <div><div>\
                                ');
						}
					},
					error: function() {
						// alert('fail');
					}
				});
			} else if ($(this).attr("spread") == 'on') {
				$(this).attr("spread", "off");
				$(this).parent().next().hide();
			}
		})

	})
}

function restriction(that) {
	var segmentKey = "2," + $(that).attr("SegmentId");
	if (isReturn == 1) {
		segmentKey = "1," + $(that).attr("SegmentId");
	}
	var CabinCode = $(that).attr("CabinCode");
	$('body').mLoading("show");
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/QueryService.svc/QueryDomesticRules",
			jsonStr: '{"segmentKey":"' + segmentKey + '","id":' + netUserId + ',"cabinCode":"' + CabinCode + '","Language":"' +
				obtLanguage + '"}'
		},
		success: function(data) {
			$('body').mLoading("hide");
			var res = JSON.parse(data);
			console.log(res);
			$(".rulePop").html('\
                <div class="rulePopHeader">' + get_lan("rulePopHeader") +
				'<div class="closeRule">x</div></div>\
                ');
			if (res.MsgCn != "") {
				if (obtLanguage == "CN") {
					alert(res.MsgCn)
				} else if (obtLanguage == "EN") {
					alert(res.MsgEn)
				}
			} else {
				if (obtLanguage == "CN") {
					if (res.RebookingCn != "") {
						$(".rulePop").append(
							'\
                            <div class="flexRow Rebooking" style="border-bottom:1px solid #cdcdcd;">\
                              <div class="rulePopTittle"><span class="vetically">改签规则</span></div>\
                              <div class="rulePopBody">' +
							res.RebookingCn + '</div>\
                            </div>\
                            ')
					}
					if (res.ReissueCn != "") {
						$(".rulePop").append(
							'\
                            <div class="flexRow Reissue" style="border-bottom:1px solid #cdcdcd;">\
                              <div class="rulePopTittle"><span class="vetically">改签规则</span></div>\
                              <div class="rulePopBody">' +
							res.ReissueCn + '</div>\
                            </div>\
                            ')
					}
					if (res.RefundCn != "") {
						$(".rulePop").append(
							'\
                            <div class="flexRow Refund" style="border-bottom:1px solid #cdcdcd;">\
                              <div class="rulePopTittle"><span class="vetically">退票规则</span></div>\
                              <div class="rulePopBody">' +
							res.RefundCn + '</div>\
                            </div>\
                            ')
					}

				} else if (obtLanguage == "EN") {
					if (res.RebookingEn != "") {
						$(".rulePop").append(
							'\
                            <div class="flexRow Rebooking" style="border-bottom:1px solid #cdcdcd;">\
                              <div class="rulePopTittle"><span class="vetically">Endorsement Rule</span></div>\
                              <div class="rulePopBody">' +
							res.RebookingEn + '</div>\
                            </div>\
                            ')
					}
					if (res.ReissueEn != "") {
						$(".rulePop").append(
							'\
                            <div class="flexRow Reissue" style="border-bottom:1px solid #cdcdcd;">\
                              <div class="rulePopTittle"><span class="vetically">Reissue Rule</span></div>\
                              <div class="rulePopBody">' +
							res.ReissueEn + '</div>\
                            </div>\
                            ')
					}
					if (res.RefundEn != "") {
						$(".rulePop").append(
							'\
                            <div class="flexRow Refund" style="border-bottom:1px solid #cdcdcd;">\
                              <div class="rulePopTittle"><span class="vetically">Refund Rule</span></div>\
                              <div class="rulePopBody">' +
							res.RefundEn + '</div>\
                            </div>\
                            ')
					}
				}
				openRulePop();
				$("#cover,.closeRule").unbind("click").click(function() {
					closeRulePop();
				})
			}
			var titleHeight = $(".rulePopHeader").height()+$(".Rebooking").height()+$(".Reissue").height()+$(".Refund").height()+3
			console.log(titleHeight)
			// $(".rulePop").css("height", titleHeight + 'px');
			var rulePopHeight = titleHeight % 2 == 1 ? titleHeight + 1 : titleHeight;
			// var rulePopHeight = $(".rulePop").height() % 2 == 1 ? $(".rulePop").height() + 1 : $(".rulePop").height();
			$(".rulePop").css("height", rulePopHeight + 'px');
		},
		error: function() {
			// alert('fail'); 
		}
	});
}

function lowestAirlineRemind(that) {
	if ($(that).attr("StopNo") == "直飞" || $(that).attr("StopNo") == "Direct") {
		lowestAir(that);
	} else {
		var departureDate = searchDomInfo.type == "oneWay" ? searchDomInfo.date : searchDomInfo.returndate;
		$('body').mLoading({
			 icon:"../images/loading.gif"
		});
		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: {
				url: $.session.get('obtCompany') + "/QueryService.svc/GetStopInfoPost",
				jsonStr: '{"flightNumber":"' + $(that).attr("FlightNumber") + '","id":' + netUserId + ',"departureDate":"' +
					departureDate + '","airlineCode":"' + $(that).attr("airLineCode") + '","Language":"' + obtLanguage + '"}'
			},
			success: function(data) {
				$('body').mLoading("hide");
				var res = JSON.parse(data);
				console.log(res);
				var stopNoMsg = confirm(get_lan('stopNoMsg') + '\n' + res);
				if (stopNoMsg == true) {
					lowestAir(that);
				}
			},
			error: function() {
				// alert('fail'); 
			}
		});
	}
}

function lowestAir(that) {
	$.ajax({
		type: 'post',
		url: $.session.get('ajaxUrl'),
		dataType: 'json',
		data: {
			url: $.session.get('obtCompany') + "/QueryService.svc/IsLowestAirline",
			jsonStr: '{"airlineCode":"' + $(that).attr("airLineCode") + '","id":' + netUserId + '}'
		},
		success: function(data) {
			var res = JSON.parse(data);
			// console.log(res);
			if (res == "true") {
				var r = confirm(get_lan('LowestAirlineRemind'));
				if (r == true) {
					orderTicket(that);
				}
			} else {
				orderTicket(that);
			}
		},
		error: function() {
			// alert('fail');
		}
	});
}

function orderTicket(that) {
	var paramKey = $(that).attr("paramKey");
	var price = $(that).attr("price");
	var airLineCode = $(that).attr("airLineCode");
	var CabinCode = $(that).attr("CabinCode");
	
	console.log(paramKey);
	// 缓存起落机场
	var airortInfo={
		orgCity:$(that).attr("orgCity"),
		dstCity:$(that).attr("dstCity")
	}
	$.session.set('airortInfo',JSON.stringify(airortInfo))
	
	if (searchDomInfo.type == "oneWay") {
		var newPrice = price;
	} else if (searchDomInfo.type == "roundTrip" && !isReturn) {
		var newPrice = price;
	} else if (searchDomInfo.type == "roundTrip" && isReturn == 1) {
		var domTicketInfo = JSON.parse($.session.get('domTicketInfo'));
		console.log(domTicketInfo);
		var newPrice = domTicketInfo.price + ',' + price;
	}
	if ($.session.get('goOnBookOrderNo')) {
		var BCN = $.session.get('goOnBookOrderNo');
	} else {
		var BCN = "";
	}
	if(searchDomInfo.packagePrice){
		var jsonStr={
			"request":{
				"paramKey":paramKey,
				"id":netUserId.split('"')[1],
				"Language":obtLanguage,
				"BCN":BCN,
				"selectAmout": newPrice ,
				"segmentSearchType":1,
			}}
	}else{
		var jsonStr={
			"request":{
				"paramKey":paramKey,
				"id":netUserId.split('"')[1],
				"Language":obtLanguage,
				"BCN":BCN,
				"selectAmout": newPrice ,
				"segmentSearchType":0,
			}}
	}
	
	
	if(searchDomInfo.packagePrice && searchDomInfo.type=="roundTrip" && isReturn!=1){
		//查询打包价时，选了去程时不需要跑CheapestSegmentNew的方法
			var queryKeyReturnList = searchDomInfo.queryKeyReturn.split(',');
			queryKeyReturnList[4] = airLineCode;
			queryKeyReturnList[5] = CabinCode;
			searchDomInfo.queryKeyReturn = queryKeyReturnList.join(',');
			$.session.set('searchDomInfo', JSON.stringify(searchDomInfo));
			
				// "lowestPrice": lowestPrice,
			var domTicketInfo = {
				'type': 'roundTrip',
				'segmentKey': $(that).attr("segmentKey"),
				"isBottom": "1",
				"lowestPrice": $(that).attr('price'),
				"paramKey": paramKey,
				"price": price,
			}
			$.session.set('domTicketInfo', JSON.stringify(domTicketInfo));
			window.location.href = '../../domesticAir/airTicketList.html?isReturn=1';
	}else{
		$.ajax({
			type: 'post',
			url: $.session.get('ajaxUrl'),
			dataType: 'json',
			data: {
				url: $.session.get('obtCompany') + "/QueryService.svc/CheapestSegmentNew",
				jsonStr: JSON.stringify(jsonStr)
			},
			success: function(data) {
				var res = JSON.parse(data);
				console.log(res);
				var j = res.length - 1;
				console.log(j);
				var lowestPrice = res[j].Cabins[0].FareAmount;
				var lowestPriceOne=res[0].Cabins[0].FareAmount
				var lowestPolicyFareAmount = res[j].Cabins[0].PolicyFareAmount
				if (parseInt(lowestPolicyFareAmount) < parseInt(price)) {
					openPop();
					var saveFare = parseInt(price) - parseInt(res[j].Cabins[0].FareAmount);
					$("#cover,.closeBottom").unbind("click").click(function() {
						closePop();
					})
					/*当前航班信息*/
					if (isReturn == 1) {
						var chooseSegmentKey = JSON.parse($.session.get('domTicketInfo')).segmentKey + ',' + $(that).attr("segmentkey");
					} else {
						var chooseSegmentKey = $(that).attr("segmentkey");
					}
					$.ajax({
						type: 'post',
						url: $.session.get('ajaxUrl'),
						dataType: 'json',
						data: {
							url: $.session.get('obtCompany') + "/QueryService.svc/QuerySelectedSegmentInfo",
							jsonStr: '{"segmentKey":"' + chooseSegmentKey + '","id":' + netUserId + '}'
						},
						success: function(data) {
							var res = JSON.parse(data);
							console.log(res);
							if (isReturn == 1) {
								$(".popChooseAirline").html('\
		                            <div class="popAirLine">' + res[1].AirLine +
									'</div>\
		                            <div class="popFlightNo">' + res[1].FlightNo +
									'</div>\
		                            <div class="popTimeStart">' + res[1].TimeStart +
									'</div>\
		                            <div class="popArrow"></div>\
		                            <div class="popTimeArrive">' +
									res[1].TimeArrive + '</div>\
		                            <div class="popAirportDeparte">' + res[1].AirportDeparte +
									'</div>\
		                            <div class="popAirportArrive">' + res[1].AirportArrive +
									'</div>\
		                            <div class="popFareAmount" style="right:20px;top:6px;">' +
									get_lan('popBody').ticketPrice + ' ￥<span class="ticketPriceColor"> ' + res[1].Cabins[0].FareAmount +
									'</span></div>\
		                            ')
							} else {
								$(".popChooseAirline").html('\
		                            <div class="popAirLine">' + res[0].AirLine +
									'</div>\
		                            <div class="popFlightNo">' + res[0].FlightNo +
									'</div>\
		                            <div class="popTimeStart">' + res[0].TimeStart +
									'</div>\
		                            <div class="popArrow"></div>\
		                            <div class="popTimeArrive">' +
									res[0].TimeArrive + '</div>\
		                            <div class="popAirportDeparte">' + res[0].AirportDeparte +
									'</div>\
		                            <div class="popAirportArrive">' + res[0].AirportArrive +
									'</div>\
		                            <div class="popFareAmount" style="right:20px;top:6px;">' +
									get_lan('popBody').ticketPrice + ' ￥<span class="ticketPriceColor"> ' + res[0].Cabins[0].FareAmount +
									'</span></div>\
		                            ')
							}
							var popHeight = $(".bottomPricePop").height() % 2 == 1 ? $(".bottomPricePop").height() + 1 : $(
								".bottomPricePop").height();
							$(".bottomPricePop").css("height", popHeight + 'px');
						},
						error: function() {
							// alert('fail');
						}
					});
					/*选择理由*/
					$(".reasonConfirm").unbind("click").click(function() {
						if (!$('.reasonRadio:checked').val() && $('.reasonRadio:checked').attr("code") != "OT") {
							alert(get_lan('popBody').rasonRemind);
						} else if ($('.reasonRadio:checked').attr("code") == "OT" && $(".reasonTextarea").val() == "") {
							alert(get_lan('popBody').rasonRemind);
						} else {
							var reasonCode = $('.reasonRadio:checked').attr("code") == "OT" ? $('.reasonRadio:checked').attr("code") + $(
								".reasonTextarea").val() : $('.reasonRadio:checked').attr("code");
							var reasonText = $('.reasonRadio:checked').attr("code") == "OT" ? $(".reasonTextarea").val() : $(
								'.reasonRadio:checked').val();
							if (searchDomInfo.type == "oneWay") {
								var domTicketInfo = {
									'type': 'oneWay',
									'segmentKey': $(that).attr("segmentKey"),
									"isBottom": "0",
									"lowestPrice": lowestPrice,
									"reasonCode": reasonCode,
									"reasonText": reasonText,
									"saveFare": saveFare,
								}
								$.session.set('domTicketInfo', JSON.stringify(domTicketInfo));
								window.location.href = '../../domesticAir/bookDomAirTicket.html';
							} else if (searchDomInfo.type == "roundTrip" && !isReturn) {
								var queryKeyReturnList = searchDomInfo.queryKeyReturn.split(',');
								queryKeyReturnList[4] = airLineCode;
								queryKeyReturnList[5] = CabinCode;
								searchDomInfo.queryKeyReturn = queryKeyReturnList.join(',');
								$.session.set('searchDomInfo', JSON.stringify(searchDomInfo));
								var domTicketInfo = {
									'type': 'roundTrip',
									'segmentKey': $(that).attr("segmentKey"),
									"isBottom": "0",
									"lowestPrice": lowestPrice,
									"reasonCode": reasonCode,
									"reasonText": reasonText,
									"saveFare": saveFare,
									"paramKey": paramKey,
									"price": price,
								}
								$.session.set('domTicketInfo', JSON.stringify(domTicketInfo));
								window.location.href = '../../domesticAir/airTicketList.html?isReturn=1';
							} else if (searchDomInfo.type == "roundTrip" && isReturn == 1) {
								var domTicketInfo = JSON.parse($.session.get('domTicketInfo'))
								domTicketInfo.segmentKeyReturn = $(that).attr("segmentKey");
								domTicketInfo.isBottomReturn = '0';
								domTicketInfo.lowestPriceReturn = lowestPrice;
								domTicketInfo.reasonCodeReturn = reasonCode;
								domTicketInfo.reasonTextReturn = reasonText;
								domTicketInfo.saveFareReturn = saveFare;
								console.log(domTicketInfo);
								$.session.set('domTicketInfo', JSON.stringify(domTicketInfo));
								window.location.href = '../../domesticAir/bookDomAirTicket.html';
							}
						}
					})
					
					$(".popTittleText").text(get_lan('popBody').popTittle);
					$(".popReasonTittle").text(get_lan('popBody').reasonTittle);
					// if (res[0].TimeSpans >= 1) {
					// 	$(".popPriceTittle").text(get_lan('popBody').lowestTittle1 + res[0].TimeSpans + get_lan('popBody').lowestTittle2);
					// } else {
					// 	$(".popPriceTittle").text(get_lan('popBody').lowestTittle);
					// }
					// 5.25 最低票价样式 
					$(".popPriceTittle").html(get_lan('popBody').lowestTittleSW+'￥<span style="color: #000000;font-weight: 800;">'+res[j].Cabins[0].FareAmount+'</span>');
					
					
					
					
					$(".reasonConfirm").text(get_lan('popBody').confirm);
					var showOperationAirline = res[j].OperationAirline == null ? "hide" : "";
					$(".priceInfoTable").html('')
					res.map(function(item,index){
						//是否跨天？
						if(item.DateStart!=item.DateArrive){
							//跨天
							var time=item.DateStart+' '+item.TimeStart+'-'+item.DateArrive+' '+item.TimeArrive
						}else{
							//同一天
							var time=item.DateStart+' '+item.TimeStart+'-'+item.TimeArrive
						}
						if(isReturn == 1 && searchDomInfo.packagePrice){
								if(index % 2 ==0){
									if(res[index+1].DateStart!=res[index+1].DateArrive){
										//跨天
										var timeBack=res[index+1].DateStart+' '+res[index+1].TimeStart+'-'+res[index+1].DateArrive+' '+res[index+1].TimeArrive
									}else{
										//同一天
										var timeBack=res[index+1].DateStart+' '+res[index+1].TimeStart+'-'+res[index+1].TimeArrive
									}
									var minMoney= parseFloat(res[index+1].Cabins[0].NetFare) 
									$(".popPriceTittle").html(get_lan('popBody').lowestTittleSW+'￥<span style="color:#000000;font-weight:800">'+minMoney+'</span>');
									$(".priceInfoTable").append('\
										<tr class="borderBottom borderBottomNone">\
											<td></td>\
											<td>'+time+'</td>\
											<td>'+item.FlightNo+'</td>\
											<td>'+item.AirLine+'</td>\
											<td>'+item.AirportDeparte+'('+item.AirportDeparteCode+')-'+item.AirportArrive+'('+item.AirportArriveCode+')</td>\
											<td style="color:#000000;font-weight:800" rowspan="2" class="borderBottom ">￥'+minMoney+'</td>\
											<td rowspan="2" class="borderBottom">\
												<div class="popChooseLowest mainBackColor" segmentKeyReturn="'+res[index+1].SegmentId + '-' + res[index+1].Cabins[0].Key+'" segmentKey="'+item.SegmentId + '-' + item.Cabins[0].Key+'"></div>\
											</td>\
										</tr>\
									')
									$(".priceInfoTable").append('\
										<tr class="borderBottom">\
											<td></td>\
											<td>'+timeBack+'</td>\
											<td>'+res[index+1].FlightNo+'</td>\
											<td>'+res[index+1].AirLine+'</td>\
											<td>'+res[index+1].AirportDeparte+'('+res[index+1].AirportDeparteCode+')-'+res[index+1].AirportArrive+'('+res[index+1].AirportArriveCode+')</td>\
											<td class="hide"></td>\
											<td class="hide"></td>\
										</tr>\
									')
									
									
								}
						}else{
							
							if(isReturn == 1){
								if(index % 2 ==1){
									$(".priceInfoTable").append('\
										<tr class="borderBottom">\
											<td></td>\
											<td>'+time+'</td>\
											<td>'+item.FlightNo+'</td>\
											<td>'+item.AirLine+'</td>\
											<td>'+item.AirportDeparte+'('+item.AirportDeparteCode+')-'+item.AirportArrive+'('+item.AirportArriveCode+')</td>\
											<td>￥'+item.Cabins[0].NetFare+'</td>\
											<td>\
												<div class="popChooseLowest mainBackColor" segmentKey="'+item.SegmentId + '-' + item.Cabins[0].Key+'"></div>\
											</td>\
										</tr>\
									')
								}
							}else{
								$(".priceInfoTable").append('\
									<tr class="borderBottom">\
										<td></td>\
										<td>'+time+'</td>\
										<td>'+item.FlightNo+'</td>\
										<td>'+item.AirLine+'</td>\
										<td>'+item.AirportDeparte+'('+item.AirportDeparteCode+')-'+item.AirportArrive+'('+item.AirportArriveCode+')</td>\
										<td>￥'+item.Cabins[0].NetFare+'</td>\
										<td>\
											<div class="popChooseLowest mainBackColor" segmentKey="'+item.SegmentId + '-' + item.Cabins[0].Key+'"></div>\
										</td>\
									</tr>\
								')
							}
							
						}
						
					})
					if (obtLanguage == "EN") {
						$(".popTittleText").css("line-height", "28px");
						$(".popTittleText").css("font-size", "14px");
						$(".popChooseLowest").css("font-size", "12px");
						$(".popChooseLowest").css("width", "125px");
					}
					$(".popChooseLowest").text(get_lan('popBody').book);
					// $(".popChooseLowest").text(get_lan('popBody').chooseLowest);
					
					// $(".popChooseLowest").attr("segmentKey", res[j].SegmentId + '-' + res[j].Cabins[0].Key);
					// $(".popPriceInfo").html('\
		   //              <div class="popAirLine">' + res[j].AirLine +
					// 	'</div>\
		   //              <div class="popFlightNo">' + res[j].FlightNo +
					// 	'</div>\
		   //              <div class="popTimeStart">' + res[j].TimeStart +
					// 	'</div>\
		   //              <div class="popArrow"></div>\
		   //              <div class="popTimeArrive">' +
					// 	res[j].TimeArrive + '</div>\
		   //              <div class="popAirportDeparte">' + res[j].AirportDeparte +
					// 	'</div>\
		   //              <div class="popAirportArrive">' + res[j].AirportArrive +
					// 	'</div>\
		   //              <div class="popFareAmount">' + get_lan('popBody').ticketPrice +
					// 	' ￥<span class="ticketPriceColor"> ' + res[j].Cabins[0].FareAmount +
					// 	'</span></div>\
		   //              <div class="popSaveFare">' + get_lan('popBody').save +
					// 	' ￥<span class="ticketPriceColor"> ' + saveFare +
					// 	'</span></div>\
		   //              <div class="popOperationAirline ' + showOperationAirline + '">' + get_lan(
					// 		'popBody').true + ' ' + res[j].OperationAirline + '</div>\
		   //              ')
						
						
					$(".popChooseLowest").unbind("click").click(function() {
						if (searchDomInfo.type == "oneWay") {
							var domTicketInfo = {
								'type': 'oneWay',
								'segmentKey': $(this).attr("segmentKey"),
								"isBottom": "1",
								"lowestPrice": lowestPrice,
							}
							$.session.set('domTicketInfo', JSON.stringify(domTicketInfo));
							window.location.href = '../../domesticAir/bookDomAirTicket.html';
						} else if (searchDomInfo.type == "roundTrip" && !isReturn) {
							var queryKeyReturnList = searchDomInfo.queryKeyReturn.split(',');
							queryKeyReturnList[4] = res[j].AirLineCode;
							queryKeyReturnList[5] = res[j].Cabins[0].CabinCode;
							searchDomInfo.queryKeyReturn = queryKeyReturnList.join(',');
							$.session.set('searchDomInfo', JSON.stringify(searchDomInfo));
							var domTicketInfo = {
								'type': 'roundTrip',
								'segmentKey': $(this).attr("segmentKey"),
								"isBottom": "1",
								"lowestPrice": lowestPrice,
								"paramKey": paramKey,
								"price": price,
							}
							$.session.set('domTicketInfo', JSON.stringify(domTicketInfo));
							window.location.href = '../../domesticAir/airTicketList.html?isReturn=1';
						} else if (searchDomInfo.type == "roundTrip" && isReturn == 1) {
							var domTicketInfo = JSON.parse($.session.get('domTicketInfo'))
							
							if(searchDomInfo.packagePrice){
								domTicketInfo.segmentKey = $(this).attr("segmentKey");
								domTicketInfo.segmentKeyReturn = $(this).attr("segmentKeyReturn");
								domTicketInfo.isBottomReturn = '1';
								domTicketInfo.lowestPriceOne = lowestPriceOne;
							}else{
								domTicketInfo.segmentKeyReturn = $(this).attr("segmentKey");
								domTicketInfo.isBottomReturn = '1';
							}
								domTicketInfo.lowestPriceReturn = lowestPrice;
							console.log(domTicketInfo);
							$.session.set('domTicketInfo', JSON.stringify(domTicketInfo));
							window.location.href = '../../domesticAir/bookDomAirTicket.html';
						}
					})
				} else {
					if (searchDomInfo.type == "oneWay") {
						var domTicketInfo = {
							'type': 'oneWay',
							'segmentKey': $(that).attr("segmentKey"),
							"isBottom": "1",
							"lowestPrice": lowestPrice,
						}
						$.session.set('domTicketInfo', JSON.stringify(domTicketInfo));
						window.location.href = '../../domesticAir/bookDomAirTicket.html';
					} else if (searchDomInfo.type == "roundTrip" && !isReturn) {
						var queryKeyReturnList = searchDomInfo.queryKeyReturn.split(',');
						queryKeyReturnList[4] = airLineCode;
						queryKeyReturnList[5] = CabinCode;
						searchDomInfo.queryKeyReturn = queryKeyReturnList.join(',');
						$.session.set('searchDomInfo', JSON.stringify(searchDomInfo));
						var domTicketInfo = {
							'type': 'roundTrip',
							'segmentKey': $(that).attr("segmentKey"),
							"isBottom": "1",
							"lowestPrice": lowestPrice,
							"paramKey": paramKey,
							"price": price,
						}
						$.session.set('domTicketInfo', JSON.stringify(domTicketInfo));
						window.location.href = '../../domesticAir/airTicketList.html?isReturn=1';
					} else if (searchDomInfo.type == "roundTrip" && isReturn == 1) {
						var domTicketInfo = JSON.parse($.session.get('domTicketInfo'))
						domTicketInfo.segmentKeyReturn = $(that).attr("segmentKey");
						domTicketInfo.isBottomReturn = '1';
						domTicketInfo.lowestPriceReturn = lowestPrice;
						console.log(domTicketInfo);
						$.session.set('domTicketInfo', JSON.stringify(domTicketInfo));
						console.log(JSON.parse($.session.get('domTicketInfo')))
						window.location.href = '../../domesticAir/bookDomAirTicket.html';
					}
				}
			},
			error: function() {
				// alert('fail');
			}
		});
	}
	
	
	
	
}

function openPop() {
	$("#cover").show();
	$(".bottomPricePop").show();
}

function closePop() {
	$("#cover").hide();
	$(".bottomPricePop").hide();
}

function openRulePop() {
	$("#cover").show();
	$(".rulePop").show();
}

function closeRulePop() {
	$("#cover").hide();
	$(".rulePop").hide();
}
// 过滤时间
function fillterTimeList(res){
	console.log(ProfileInfo.ShowDomesticTimeSlt)
	// 有权限,不是allday,正负时间不为空
	
	var flag=''
	var dayTime=''
	var fillterArr=[];
	if(searchDomInfo.type == "oneWay" || (searchDomInfo.type == "roundTrip" && isReturn!=1)){
		flag=setTime
		if(typeof day=="undefined"){
			dayTime=2
		}else{
			// dayTime=day
			dayTime=$('#DepartPlusMinus').val()
		}
	}else if(searchDomInfo.type == "roundTrip"){
		flag=setReturnTime
		if(typeof returnday=="undefined"){
			dayTime=2
		}else{
			// dayTime=returnday
			dayTime=$('#returnPlusMinus').val()
		}
	}
	if(ProfileInfo.ShowDomesticTimeSlt && flag!="all"){
		var date = new Date('2019/8/8 12:00');
		var t1=flag;
		var a = t1.split(":")[0];
		date.setHours(a)
		
		res.map(function(item){
			var t2=item.TimeStart
			var b = t2.split(":");
			
			var minTime=date.getTime()-dayTime*3600*1000
			var maxTime=date.getTime()+dayTime*3600*1000
			// var maxTime=date.setHours(parseInt(a[0])+parseInt(dayTime))
			var iTime=new Date('2019/8/8 12:00')
			iTime.setHours(parseInt(b[0]))
			iTime.setMinutes(parseInt(b[1]))
			var itemTime=iTime.getTime()
			// if(item.TimeStart=="06:50"){
			// 	fliiterGeTime(minTime)
			// 	fliiterGeTime(maxTime)
			// 	fliiterGeTime(itemTime)
			// }
			// if((minTime <itemTime || minTime ==itemTime) && (maxTime>itemTime || (maxTime==itemTime && b[1]=="00"))){
			if((minTime <itemTime || minTime ==itemTime) && (maxTime>itemTime || maxTime==itemTime)){
				fillterArr.push(item)
			}else{
			}
		})
	
		return fillterArr;
	}else{
		return res
	}
}

// function fliiterGeTime(t){
// 	var s=new Date(t)
// 	console.log('.................')
// 	console.log(t)
// 	console.log(s.getFullYear()+'-'+s.getMonth()+'-'+s.getDate()+' '+s.getHours()+':'+s.getMinutes())
// }