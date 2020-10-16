var netUserId = $.session.get('netLoginId');
var obtLanguage = $.session.get('obtLanguage');
var isReturn = tools.queryString().isReturn;
var searchTrainInfo = JSON.parse($.session.get('searchTrainInfo'));
var ProfileInfo = JSON.parse($.session.get('ProfileInfo'));
var TAorderNo = $.session.get('TAorderNo');
console.log(searchTrainInfo);
// 有TA单时，时间进行限制
	var TAnumber = $.session.get('TAnumber');
	var TAminDate=0,TAmaxDate=365
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
//中英文对象
var cn = {
    "progressBar":{
        "search":"查询",
        "book":"预订",
        "complete":"完成",
    },
    "searchBody":{
        "oneWay":"单程",
        "roundTrip":"来回程",
        "search":"查询",
        "weekDay":'星期天, 星期一, 星期二, 星期三, 星期四, 星期五, 星期六',
    },
    "ticketList":{
        "listRemind":'没有相关的车票信息',
        "preDay":"前一天",
        "nextDay":"后一天",
        "roundTittleGo":"去程票",
        "roundTittleReturn":"回程票",
        "reserve":"预订",
        "left":"",
        "violation":"违反政策",
    },
    "trainChooseBody":{
    	"model":"车型",
    	"all":"不限",
    	"highSpeed":"高铁",
    	"motorCar":"动车",
    	"Ordinary":"普通",
    },
    "siftBody":{
    	"trainInfo":"车次信息",
    	"trainTime":"发/到时间",
    	"trainStation":"发/到站",
    	"trainUseTime":"行车时间",
    	"trainPrice":"价格",
        "seats":"余票",
        "all1":"全部出发车站",
        "all2":"全部到达车站",
    }
}
var en = {
    "progressBar":{
        "search":"Search",
        "book":"Book",
        "complete":"Complete",
    },
    "searchBody":{
        "oneWay":"One-way",
        "roundTrip":"Round-Trip",
        "search":"Search",
        "weekDay":'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
    },
    "ticketList":{
        "listRemind":'No relevant ticket information',
        "preDay":"Previous Day",
        "nextDay":"Next Day",
        "roundTittleGo":"Deaprture",
        "roundTittleReturn":"Return",
        "reserve":"Reserve",
        "left":"",
        "violation":"Out of policy",
    },
    "trainChooseBody":{
    	"model":"Train Model",
    	"all":"No Limit",
    	"highSpeed":"High-speed Trains",
    	"motorCar":"EMU Trains",
    	"Ordinary":"Ordinary Train",
    },
    "siftBody":{
    	"trainInfo":"Train Number",
    	"trainTime":"Departure",
    	"trainStation":"Station",
    	"trainUseTime":"Duration",
    	"trainPrice":"Price",
        "seats":"Seats",
        "all1":"All Depart Stations",
        "all2":"All Arrival Stations",
    }
}
if(ProfileInfo.onlineStyle=="APPLE"){
    en.ticketList.listRemind = "Your search has no result at this moment, please try another date.";
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
   ticketList();//火车票列表
})
//内容展示
function showContent(){
	$("#main").html('\
	    <div class="autoCenter">\
	        <div class="progressBar flexRow mainFontColor"></div>\
	        <div class="searchBody flexRow"></div>\
			<div class="picBody"><img class="picGroupImg" src="../staticFile/query.png"/><a class="picHref" target="_blank" href=""></a></div>\
	        <div class="ticketBody">\
	            <div class="chooseDate specificFontColor"></div>\
	            <div class="trainChooseBody flexRow"></div>\
	            <div class="siftBody flexRow"></div>\
	        </div>\
	        <div class="ticketList"></div>\
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
	    <div class="progressLine progressBackColor"></div><div class="progressCircle progressBackColor"></div>'+get_lan('progressBar').book+'\
	    <div class="progressLine progressBackColor"></div><div class="progressCircle progressBackColor"></div>'+get_lan('progressBar').complete+'\
	    ')
	$(".searchBody").html('\
	    <select class="searchState">\
	    <option state="1" value="1">'+get_lan('searchBody').oneWay+'</option>\
	    <option state="2" value="2">'+get_lan('searchBody').roundTrip+'</option>\
	    </select>\
	    <div class="trainDepartureCitySearch"><div class="departureAirIcon"></div><input type="text" id="trainDepartureCity" value="'+searchTrainInfo.departureCityText+'" code="'+searchTrainInfo.departureCity+'"></div>\
	    <div class="trainArrivalCitySearch"><div class="arrivalAirIcon"></div><input type="text" id="trainArrivalCity" value="'+searchTrainInfo.arrivalCityText+'" code="'+searchTrainInfo.arrivalCity+'"></div>\
	    <div class="trainDepartureDateSearch"><div class="departureDateIcon"></div><input type="text" id="trainDepartureDate" readonly value="'+searchTrainInfo.date+'"><div class="trainDepartureWeek">'+getWeek(searchTrainInfo.date)+'</div></div>\
	    <div class="trainReturnDateSearch"><div class="returnDateIcon"></div><input type="text" id="trainReturnDate" readonly value="'+GetDateStr(1,searchTrainInfo.date)+'"><div class="trainReturnDateWeek">'+getWeek(GetDateStr(1,searchTrainInfo.date))+'</div></div>\
	    <div class="searchTrainBtn btnBackColor">'+get_lan('searchBody').search+'</div></div>\
	    ')
	$(".trainChooseBody").html('\
		<div style="width:100px;margin-left:40px;">'+get_lan('trainChooseBody').model+'</div>\
		<div class="noLimitBtn specificFontColor" style="cursor:pointer;width:100px;margin-left:87px;">'+get_lan('trainChooseBody').all+'</div>\
		<div class="flexRow" style="width:175px;margin-left:100px;"><div><input type="checkBox" traintype="G,C" class="trainTypeInput"></div>'+get_lan('trainChooseBody').highSpeed+'</div>\
		<div class="flexRow" style="width:105px;margin-left:0px;"><div><input type="checkBox" traintype="D" class="trainTypeInput"></div>'+get_lan('trainChooseBody').motorCar+'</div>\
		<div class="flexRow" style="width:100px;margin-left:75px;"><div><input type="checkBox" traintype="K,T,Z,L,Y,1" class="trainTypeInput"></div>'+get_lan('trainChooseBody').Ordinary+'</div>\
		')
	//排序模块
	$(".siftBody").html('\
		<div style="width:100px;line-height:52px;margin-left:40px;">'+get_lan('siftBody').trainInfo+'</div>\
		<div class="departureTimeSort flexRow" style="width:100px;line-height:52px;margin-left:85px;">'+get_lan('siftBody').trainTime+'<div class="departureTimeSortIcon"></div></div>\
		<div style="width:210px;line-height:52px;margin-left:10px;" class="flexRow">\
        <select class="departStation">\
          <option value="all" station="all">'+get_lan('siftBody').all1+'</option>\
        </select>\
        <select class="arrivalStation">\
          <option value="all" station="all">'+get_lan('siftBody').all2+'</option>\
        </select>\
        </div>\
		<div class="trainUseTimeSort flexRow" style="width:100px;line-height:52px;margin-left:60px;cursor:pointer;">'+get_lan('siftBody').trainUseTime+'<div class="trainUseTimeSortIcon"></div></div>\
		<div style="width:100px;line-height:52px;margin-left:107px;">'+get_lan('siftBody').trainPrice+'</div>\
        <div style="width:100px;line-height:52px;margin-left:107px;">'+get_lan('siftBody').seats+'</div>\
		')
	$(".searchState").change(function(){
	    if($('.searchState option:selected').attr("state")=='1'){
	        $(".trainReturnDateSearch").hide();
	    }else if($('.searchState option:selected').attr("state")=='2'){
	        $(".trainReturnDateSearch").show();
	        var departureValue = new Date($("#trainDepartureDate").val().replace(/-/g, "/"));
	        $("#trainReturnDate").datepicker('destroy');
	        $("#trainReturnDate").datepicker({
	            dateFormat: 'yy-mm-dd',
	            changeMonth: true,
				minDate: departureValue,  // 当前日期之后的 0 天，就是当天
				maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
	            hideIfNoPrevNext: true,
	            showOtherMonths: true,
	            selectOtherMonths: true,
	        });
	    }
	})
	$(".searchTrainBtn").unbind("click").click(function(){
        if(ProfileInfo.onlineStyle=="APPLE"){
            var cityList = '"'+$('#trainDepartureCity').val()+'","'+$('#trainArrivalCity').val()+'"';
            tools.appleRemindPop(cityList,4,netUserId,function(){searchTrain()});
        }else{
            searchTrain();
        }
        function searchTrain(){
            if($('.searchState option:selected').attr("state")=='1'){
                var searchTrainInfo = {
                    'type':'oneWay',
                    'departureCityText':$('#trainDepartureCity').val(),
                    'arrivalCityText':$('#trainArrivalCity').val(),
                    'departureCity':$('#trainDepartureCity').attr("code"),
                    'arrivalCity':$('#trainArrivalCity').attr("code"),
                    'date':$('#trainDepartureDate').val(),
                    'queryKey':$('#trainDepartureCity').val()+','+$('#trainArrivalCity').val()+','+$('#trainDepartureDate').val()+',',
                }
                $.session.set('searchTrainInfo', JSON.stringify(searchTrainInfo));
                location.replace('../../train/trainTicketList.html');
            }else if($('.searchState option:selected').attr("state")=='2'){
                var searchTrainInfo = {
                    'type':'roundTrip',
                    'departureCityText':$('#trainDepartureCity').val(),
                    'arrivalCityText':$('#trainArrivalCity').val(),
                    'departureCity':$('#trainDepartureCity').attr("code"),
                    'arrivalCity':$('#trainArrivalCity').attr("code"),
                    'date':$('#trainDepartureDate').val(),
                    'returndate':$('#trainReturnDate').val(),
                    'queryKey':$('#trainDepartureCity').val()+','+$('#trainArrivalCity').val()+','+$('#trainDepartureDate').val()+',',
                    'queryKeyReturn':$('#trainArrivalCity').val()+','+$('#trainDepartureCity').val()+','+$('#trainReturnDate').val()+',',
                }
                $.session.set('searchTrainInfo', JSON.stringify(searchTrainInfo));
                location.replace('../../train/trainTicketList.html');
            }
        }
	})
    if(searchTrainInfo.alterTicketInfo){
        $(".searchBody").hide();
    }
	$("#trainDepartureCity").kuCity();
	$("#trainArrivalCity").kuCity();
	$("#trainDepartureDate").datepicker({
	    dateFormat: 'yy-mm-dd',
	    changeMonth: true,
		minDate: TAminDate,  // 当前日期之后的 0 天，就是当天
		maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
	    hideIfNoPrevNext: true,
	    showOtherMonths: true,
	    selectOtherMonths: true,
	    onSelect:function(){
	        $(".trainDepartureWeek").text(getWeek($("#trainDepartureDate").val()));
	        var departureValue = new Date($("#trainDepartureDate").val().replace(/-/g, "/"));
	        $("#trainReturnDate").datepicker('destroy');
	        $("#trainReturnDate").datepicker({
	            dateFormat: 'yy-mm-dd',
	            changeMonth: true,
	            minDate: departureValue,  // 当前日期之后的 0 天，就是当天
				maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
	            hideIfNoPrevNext: true,
	            showOtherMonths: true,
	            selectOtherMonths: true,
	            onSelect:function(){
	                $(".trainReturnDateWeek").text(getWeek($("#trainReturnDate").val()));
	            }
	        });
	        // $("#trainReturnDate").val(getNextDay($("#trainDepartureDate").val()));
	        // $(".trainReturnDateWeek").text(getWeek(getNextDay($("#trainDepartureDate").val())));
	    }
	});
	function getNextDay(d){
        d = new Date(d);
        d = +d + 1000*60*60*24;
        d = new Date(d);
        var month = (d.getMonth()+1)<10?'0'+(d.getMonth()+1):(d.getMonth()+1);
        var day = d.getDate()<10?'0'+d.getDate():d.getDate();
        //格式化
        return d.getFullYear()+"-"+month+"-"+day;
    }
	GetCompanyImageInfos()
}
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
					if(item.type==4){
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
function getWeek(dateStr){
    var myDate = new Date(Date.parse(dateStr.replace(/-/g, "/")));
    return get_lan('searchBody').weekDay.split(',')[myDate.getDay()];
}
function GetDateStr(AddDayCount,date) {
    var dd = new Date(date.replace(/-/g, '/'));
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
    var y = dd.getFullYear(); 
    // var m = dd.getMonth()+1;//获取当前月份的日期 
    // var d = dd.getDate();
    var m = (dd.getMonth()+1)<10?'0'+(dd.getMonth()+1):(dd.getMonth()+1);
    var d = dd.getDate()<10?'0'+dd.getDate():dd.getDate();
    return y+"-"+m+"-"+d; 
}
//火车票列表
function ticketList(){
	// $('body').mLoading("show");
	tools.searchLoadingShow()
	if(searchTrainInfo.type == "oneWay"){
		var queryKey = searchTrainInfo.queryKey;
		var preDayDate = GetDateStr(-1,searchTrainInfo.date);
		var nextDayDate = GetDateStr(1,searchTrainInfo.date);
		$(".chooseDate").html('\
		    <span class="preDay" style="margin-right:20px;cursor:pointer">('+preDayDate.substring(5,preDayDate.length)+')'+get_lan('ticketList').preDay+'</span>\
		    <span class="nextDay" style="cursor:pointer">('+nextDayDate.substring(5,nextDayDate.length)+')'+get_lan('ticketList').nextDay+'</span>\
		    ')
		//前一天 后一天
		if(new Date() >=new Date(GetDateStr(0,searchTrainInfo.date).replace(/\-/g, "\/"))) 
		{
		    $(".preDay").hide();
		}
		
		if(TAnumber!=undefined && TAnumber!="" && new Date(searchTrainInfo.date).getTime() == new Date(TAminDate).getTime()){
			$(".preDay").hide();
		}
		if(TAnumber!=undefined && TAnumber!="" && new Date(searchTrainInfo.date).getTime() == new Date(TAmaxDate).getTime()){
			$(".nextDay").hide();
		}
        if(searchTrainInfo.date== searchTrainInfo.returndate){
            $(".nextDay").hide();
        }
		$(".preDay").unbind("click").click(function(){
		    if(new Date() <new Date(GetDateStr(0,searchTrainInfo.date).replace(/\-/g, "\/"))) 
		    {
					searchTrainInfo.date = preDayDate;
					var queryKeyList = searchTrainInfo.queryKey.split(',');
					queryKeyList[2] = preDayDate;
					searchTrainInfo.queryKey = queryKeyList.join(',');
					$.session.set('searchTrainInfo', JSON.stringify(searchTrainInfo));
					location.reload();
		    }else{
		        $(".preDay").hide();
		    }
		})
		$(".nextDay").unbind("click").click(function(){
		    searchTrainInfo.date = nextDayDate;
            var queryKeyList = searchTrainInfo.queryKey.split(',');
            queryKeyList[2] = nextDayDate;
            searchTrainInfo.queryKey = queryKeyList.join(',');
		    $.session.set('searchTrainInfo', JSON.stringify(searchTrainInfo));
		    location.reload();
		})
		$.ajax(
		  {
		    type:'post',
		    url : $.session.get('ajaxUrl'), 
		    dataType : 'json',
		    data:{
		        url: $.session.get('obtCompany')+"/QueryService.svc/QueryTrainsPost",
		        jsonStr:'{"queryKey":"'+queryKey+'","id":'+netUserId+',"Language":"'+obtLanguage+'","routeType":"1","endTime":""}'
		    },
		    success : function(data) {
		        // $('body').mLoading("hide");
				tools.searchLoadingHide()
		        var res = JSON.parse(data);
		        console.log(res);
                if(res.length == 0){
                    alert(get_lan("ticketList").listRemind);
                }
		        ticketListInfo(res);
		        ticketFilter(res);
                sortTicketInfo(res);
                // chooseStation(res);
		    },
		    error : function() {
		      // alert('fail');
		    }
		  }
		);
	}else if(searchTrainInfo.type=="roundTrip"){
        if(!isReturn){
            var preDayDate = GetDateStr(-1,searchTrainInfo.date);
            var nextDayDate = GetDateStr(1,searchTrainInfo.date);
            $(".chooseDate").html('\
                <span class="preDay" style="margin-right:20px;cursor:pointer;">('+preDayDate.substring(5,preDayDate.length)+')'+get_lan('ticketList').preDay+'</span>\
                <span style="cursor:pointer;" class="nextDay">('+nextDayDate.substring(5,nextDayDate.length)+')'+get_lan('ticketList').nextDay+'</span>\
                ')
            //前一天 后一天
            if(new Date() >=new Date(GetDateStr(0,searchTrainInfo.date).replace(/\-/g, "\/")))
            {
                $(".preDay").hide();
            }
            $(".preDay").unbind("click").click(function(){
                if(new Date() <new Date(GetDateStr(0,searchTrainInfo.date).replace(/\-/g, "\/"))) 
                {
                    searchTrainInfo.date = preDayDate;
                    $.session.set('searchTrainInfo', JSON.stringify(searchTrainInfo));
                    location.reload();
                }else{
                    $(".preDay").hide();
                }
            })
            $(".nextDay").unbind("click").click(function(){
                searchTrainInfo.date = nextDayDate;
                $.session.set('searchTrainInfo', JSON.stringify(searchTrainInfo));
                location.reload();
            })
        }else if(isReturn == 1){
            var preDayDate = GetDateStr(-1,searchTrainInfo.returndate);
            var nextDayDate = GetDateStr(1,searchTrainInfo.returndate);
            $(".chooseDate").html('\
                <span class="preDay" style="margin-right:20px;cursor:pointer;">('+preDayDate.substring(5,preDayDate.length)+')'+get_lan('ticketList').preDay+'</span>\
                <span style="cursor:pointer;" class="nextDay">('+nextDayDate.substring(5,nextDayDate.length)+')'+get_lan('ticketList').nextDay+'</span>\
                ')
            //前一天 后一天
            if(new Date(GetDateStr(0,searchTrainInfo.date).replace(/\-/g, "\/")) >=new Date(GetDateStr(0,searchTrainInfo.returndate).replace(/\-/g, "\/"))) 
            {
                $(".preDay").hide();
            }
            $(".preDay").unbind("click").click(function(){
                if(new Date(GetDateStr(0,searchTrainInfo.date).replace(/\-/g, "\/")) <new Date(GetDateStr(0,searchTrainInfo.returndate).replace(/\-/g, "\/"))) 
                {
                    searchTrainInfo.returndate = preDayDate;
                    $.session.set('searchTrainInfo', JSON.stringify(searchTrainInfo));
                    location.reload();
                }else{
                    $(".preDay").hide();
                }
            })
            $(".nextDay").unbind("click").click(function(){
                searchTrainInfo.returndate = nextDayDate;
                $.session.set('searchTrainInfo', JSON.stringify(searchTrainInfo));
                location.reload();
            })
        }
        $(".searchState").val("2");
        // $(".searchState").find("option").eq(1).attr("selected",true);
        $(".trainReturnDateSearch").css("display","block");
        var departureValue = new Date($("#trainDepartureDate").val().replace(/-/g, "/"));
        $("#trainReturnDate").val(searchTrainInfo.returndate);
        $("#trainReturnDate").datepicker('destroy');
        $("#trainReturnDate").datepicker({
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            minDate: departureValue,  // 当前日期之后的 0 天，就是当天
			maxDate: TAmaxDate,  // 当前日期之后的 0 天，就是当天
            hideIfNoPrevNext: true,
            showOtherMonths: true,
            selectOtherMonths: true,
            onSelect:function(){
                $(".trainReturnDateWeek").text(getWeek($("#trainReturnDate").val()));
            }
        });
        if(!isReturn){
            $(".roundTittle").text(get_lan('ticketList').roundTittleGo);
        }else if(isReturn == 1){
            $(".roundTittle").text(get_lan('ticketList').roundTittleReturn);
        }
        if(!isReturn||isReturn!=1){
            var queryKey = searchTrainInfo.queryKey;
            var routeType = '1';
        }else if(isReturn==1){
            var queryKey = searchTrainInfo.queryKeyReturn;
            var routeType = '2';
        }
        $.ajax(
          {
            type:'post',
            url : $.session.get('ajaxUrl'), 
            dataType : 'json',
            data:{
                url: $.session.get('obtCompany')+"/QueryService.svc/QueryTrainsPost",
                jsonStr:'{"queryKey":"'+queryKey+'","id":'+netUserId+',"Language":"'+obtLanguage+'","routeType":"'+routeType+'","endTime":""}'
            },
            success : function(data) {
                $('body').mLoading("hide");
                var res = JSON.parse(data);
                console.log(res);
                if(res.length == 0){
                    alert(get_lan("ticketList").listRemind);
                }
                ticketListInfo(res);
                ticketFilter(res);
                sortTicketInfo(res);//排序
            },
            error : function() {
              // alert('fail');
            }
          }
        );
    }
}
/*筛选列车类型*/
function ticketFilter(res){
    var stationList=[],
        stationArriveList=[],
        i,
        j,
        len = res.length;
    for(i = 0; i < len; i++){
     for(j = i + 1; j < len; j++){
      if(res[i].StationStart === res[j].StationStart){
       j = ++i;
      }
     }
     stationList.push(res[i]);
    }
    for(i = 0; i < len; i++){
     for(j = i + 1; j < len; j++){
      if(res[i].StationArrive === res[j].StationArrive){
       j = ++i;
      }
     }
     stationArriveList.push(res[i]);
    }
    stationList.map(function(item){
        $(".departStation").append('\
        <option station="'+item.StationStart+'">'+item.StationStart+'</option>\
        ')
    })
    stationArriveList.map(function(item){
        $(".arrivalStation").append('\
        <option station="'+item.StationArrive+'">'+item.StationArrive+'</option>\
        ')
    })
    var departTrainList = [],arrivalTrainList = [],filterList = [];
    res.map(function(item){
        departTrainList.push(item);
        arrivalTrainList.push(item);
        filterList.push(item);
    })
	$(".trainTypeInput").change(function(){
		$(".noLimitBtn").removeClass("tabBarColor");
		filterList = [];
		var checkboxList1 = [];
		for(var i=0;i<$(".trainTypeInput").length;i++){
			if($(".trainTypeInput").eq(i).is(":checked")){
				checkboxList1.push(i);
				var trainTypeList = $(".trainTypeInput").eq(i).attr("trainType").split(',');
				trainTypeList.map(function(item){
					res.map(function(aItem){
						if(aItem.TrainCode.substring(0,1) == item){
							filterList.push(aItem);
						}
					})
				})
			}
		}
		siftTrainList(filterList,departTrainList,arrivalTrainList);
		if(checkboxList1.length == 0){
			$(".noLimitBtn").addClass("tabBarColor");
			filterList = [];
            res.map(function(item){
                filterList.push(item);
            })
            siftTrainList(filterList,departTrainList,arrivalTrainList);
		}
	})
	$(".noLimitBtn").unbind("click").click(function(){
		$(".noLimitBtn").addClass("tabBarColor");
		$(".trainTypeInput").removeAttr("checked");
		filterList = [];
        res.map(function(item){
            filterList.push(item);
        })
        siftTrainList(filterList,departTrainList,arrivalTrainList);
	})
    $(".departStation").change(function(){
        departTrainList = [];
        if($('.departStation option:selected').attr("station")=='all'){
            res.map(function(item){
                departTrainList.push(item);
            })
        }else{
            res.map(function(item){
                if(item.StationStart==$('.departStation option:selected').attr('station')){
                    departTrainList.push(item);
                }
            })
        }
        siftTrainList(filterList,departTrainList,arrivalTrainList);
        $(".departureTimeSort,.trainUseTimeSort").css("color",'#000');
        $(".departureTimeSortIcon,.trainUseTimeSortIcon").css("background-position","0px 0px");
    })
    $(".arrivalStation").change(function(){
        arrivalTrainList = [];
        if($('.arrivalStation option:selected').attr("station")=='all'){
            res.map(function(item){
                arrivalTrainList.push(item);
            })
        }else{
            res.map(function(item){
                if(item.StationArrive==$('.arrivalStation option:selected').attr('station')){
                    arrivalTrainList.push(item)
                }
            })
        }
        siftTrainList(filterList,departTrainList,arrivalTrainList);
        $(".departureTimeSort,.trainUseTimeSort").css("color",'#000');
        $(".departureTimeSortIcon,.trainUseTimeSortIcon").css("background-position","0px 0px");
    })

}
function siftTrainList(filterList,departTrainList,arrivalTrainList){
    var chooseTrain = [];
    var result = [];
    filterList.map(function(item){
        departTrainList.map(function(dItem){
            if(item.TrainCode == dItem.TrainCode){
                chooseTrain.push(item);
            }
        })
    })
    chooseTrain.map(function(item){
        arrivalTrainList.map(function(aItem){
            if(item.TrainCode == aItem.TrainCode){
                result.push(item);
            }
        })
    })
    // console.log(result);
    ticketListInfo(result);
    sortTicketInfo(result);//排序
}
//火车票排序
function sortTicketInfo(res){
    var timeSortAsc = [];
    var timeSortDes = [];
    var useTimeSortAsc = [];
    var useTimeSortDes = [];
    res.map(function(item){
        timeSortAsc.push(item);
        timeSortDes.push(item);
        useTimeSortAsc.push(item);
        useTimeSortDes.push(item);
    })
    var timebubbleSortAsc=function(arr){
        for(var i=0;i<arr.length-1;i++){  
            for(var j=i+1;j<arr.length;j++){
                if(parseInt(arr[i].TimeStart.split(':')[0]+arr[i].TimeStart.split(':')[1])>parseInt(arr[j].TimeStart.split(':')[0]+arr[j].TimeStart.split(':')[1])){
                    var temp=arr[i];
                    arr[i]=arr[j];  
                    arr[j]=temp;  
                }
            }
        }
        return arr;
    }
    var timebubbleSortDes=function(arr){
        for(var i=0;i<arr.length-1;i++){  
            for(var j=i+1;j<arr.length;j++){  
                if(parseInt(arr[i].TimeStart.split(':')[0]+arr[i].TimeStart.split(':')[1])<parseInt(arr[j].TimeStart.split(':')[0]+arr[j].TimeStart.split(':')[1])){
                    var temp=arr[i];
                    arr[i]=arr[j];  
                    arr[j]=temp;  
                }
            }  
        }
        return arr;
    }
    var usetimebubbleSortAsc=function(arr){
        for(var i=0;i<arr.length-1;i++){
            for(var j=i+1;j<arr.length;j++){
                if(obtLanguage=="CN"){
                    if(parseInt(arr[i].UseTime.split('小时')[0]+arr[i].UseTime.split('小时')[1].split('分')[0])>parseInt(arr[j].UseTime.split('小时')[0]+arr[j].UseTime.split('小时')[1].split('分')[0])){
                        var temp=arr[i];
                        arr[i]=arr[j];
                        arr[j]=temp;  
                    }
                }else if(obtLanguage=="EN"){
                    if(parseInt(arr[i].UseTime.split('h')[0]+arr[i].UseTime.split('h')[1].split('m')[0])>parseInt(arr[j].UseTime.split('h')[0]+arr[j].UseTime.split('h')[1].split('m')[0])){
                        var temp=arr[i];
                        arr[i]=arr[j];
                        arr[j]=temp;  
                    }
                }
            }
        }
        return arr;
    }
    var usetimebubbleSortDes=function(arr){
        for(var i=0;i<arr.length-1;i++){
            for(var j=i+1;j<arr.length;j++){  
                if(obtLanguage=="CN"){
                    if(parseInt(arr[i].UseTime.split('小时')[0]+arr[i].UseTime.split('小时')[1].split('分')[0])<parseInt(arr[j].UseTime.split('小时')[0]+arr[j].UseTime.split('小时')[1].split('分')[0])){
                        var temp=arr[i];
                        arr[i]=arr[j];
                        arr[j]=temp;  
                    }
                }else if(obtLanguage=="EN"){
                    if(parseInt(arr[i].UseTime.split('h')[0]+arr[i].UseTime.split('h')[1].split('m')[0])<parseInt(arr[j].UseTime.split('h')[0]+arr[j].UseTime.split('h')[1].split('m')[0])){
                        var temp=arr[i];
                        arr[i]=arr[j];
                        arr[j]=temp;  
                    }
                }
            }  
        }
        return arr;
    }
    // console.log(usetimebubbleSortDes(useTimeSortDes))
    $(".departureTimeSort").unbind("click").click(function(){
        $(".trainUseTimeSort").css("color",'#000');
        $(".trainUseTimeSortIcon").css("background-position","0px 0px");
        if($(".departureTimeSort").attr("sortType")=="acs"){
            ticketListInfo(timebubbleSortDes(timeSortDes));
            $(".departureTimeSort").attr("sortType","desc");
            $(".departureTimeSort").css("color",'#1e66ae');
            $(".departureTimeSortIcon").css("background-position","-36px 0px");
        }
        else if(!$(".departureTimeSort").attr("sortType")||$(".departureTimeSort").attr("sortType")=="desc"){
            ticketListInfo(timebubbleSortAsc(timeSortAsc));
            $(".departureTimeSort").attr("sortType","acs");
            $(".departureTimeSortIcon").css("background-position","-18px 0px");
        }
    })
    $(".trainUseTimeSort").unbind("click").click(function(){
        $(".departureTimeSort").css("color",'#000');
        $(".departureTimeSortIcon").css("background-position","0px 0px");
        if($(".trainUseTimeSort").attr("sortType")=="acs"){
            ticketListInfo(usetimebubbleSortDes(useTimeSortDes));
            $(".trainUseTimeSort").attr("sortType","desc");
            $(".trainUseTimeSort").css("color",'#1e66ae');
            $(".trainUseTimeSortIcon").css("background-position","-36px 0px");
        }
        else if(!$(".trainUseTimeSort").attr("sortType")||$(".trainUseTimeSort").attr("sortType")=="desc"){
            ticketListInfo(usetimebubbleSortAsc(useTimeSortAsc));
            $(".trainUseTimeSort").attr("sortType","acs");
            $(".trainUseTimeSortIcon").css("background-position","-18px 0px");
        }
    })
}
function ticketListInfo(res){
	$(".ticketList").html('');
    // if(ProfileInfo.onlineStyle=="APPLE"){
    //     var ticketColor = "#3083FB";
    // }else{
    //     var ticketColor = "#F58A00";
    // }
	res.map(function(item,index){
		$(".ticketList").append('\
		    <div class="ticketLi">\
		        <div class="ticketTrainInfo">'+item.TrainType+' <span style="font-weight:bold;">'+item.TrainCode+'</span></div>\
		        <div class="ticketTrainStartTime">'+item.TimeStart+'</div>\
		        <div class="ticketTrainArriveTime">'+item.TimeArrive+'</div>\
		        <div class="ticketTrainStartStation">'+item.StationStart+'</div>\
		        <div class="ticketTrainArriveStation">'+item.StationArrive+'</div>\
		        <div class="ticketUseTime">'+item.UseTime+'</div>\
		        <div class="ticketFareList"></div>\
		    </div>\
		    <div class="ticketLiSpread"></div>\
		')
		item.FareList.map(function(dItem){
			var SeatType = obtLanguage == "CN"?dItem.SeatType:dItem.SeatTypeEN;
            // if(ProfileInfo.onlineStyle=="APPLE"){
            //     switch(SeatType) {
            //          case 'First Class':
            //             SeatType = '1st Class Economy';
            //             break;
            //          case 'Second Class':
            //             SeatType = '2nd Class Economy'
            //             break;
            //     }
            // }
            
			var seatLeftNull = dItem.SeatYuPiao == 0?"seatLeftNull":"";
            var showTicketViolation = dItem.SeatShowType !=1 ?"":"hide";
			$(".ticketFareList").eq(index).append('\
				<div class="ticketFareLi flexRow">\
				  <div class="seatInfo flexRow">\
                  <div class="liSeatType" style="min-width:50px;">'+SeatType+'</div>\
                  <div class="ticketPrice" style="margin-left:10px;width:58px;"><span style="font-size:12px;">￥</span>'+dItem.Price+'</div>\
                  <div class="ticketViolationIcon '+showTicketViolation+'">'+get_lan('ticketList').violation+'</div>\
                  </div>\
				  <div class="seatLeft">'+get_lan('ticketList').left+dItem.SeatYuPiao+'</div>\
				  <div class="bookTrainBtn '+seatLeftNull+'" queryKey="'+item.RID+','+dItem.SeatID+'">'+get_lan('ticketList').reserve+'</div>\
				</div>\
			')
		})
        if(obtLanguage=="CN"){
            $(".liSeatType").css("min-width",'50px');
        }else if(obtLanguage=="EN"){
            $(".liSeatType").css("min-width",'150px');
        }
	})
	$(".bookTrainBtn").unbind("click").click(function(){
		if(searchTrainInfo.type == "oneWay"){
		    var trainTicketInfo = {
		        'type':'oneWay',
		        'queryKey':$(this).attr("queryKey")+','+searchTrainInfo.date,
                'date':searchTrainInfo.date,
		    }
		    $.session.set('trainTicketInfo', JSON.stringify(trainTicketInfo));
		    window.location.href='../../train/bookTrainTicket.html';
		}else if(searchTrainInfo.type == "roundTrip" && !isReturn){
            var trainTicketInfo = {
                'type':'roundTrip',
                'queryKey':$(this).attr("queryKey")+','+searchTrainInfo.date,
                'date':searchTrainInfo.date,
                'returndate':searchTrainInfo.returndate,
            }
            $.session.set('trainTicketInfo', JSON.stringify(trainTicketInfo));
            window.location.href='../../train/trainTicketList.html?isReturn=1';
        }else if(searchTrainInfo.type == "roundTrip" && isReturn==1){
            var trainTicketInfo = JSON.parse($.session.get('trainTicketInfo'))
            trainTicketInfo.queryKeyReturn = $(this).attr("queryKey")+','+searchTrainInfo.returndate;
            $.session.set('trainTicketInfo', JSON.stringify(trainTicketInfo));
            window.location.href='../../train/bookTrainTicket.html';
        }
	})
	$(".seatLeftNull").unbind("click");
}