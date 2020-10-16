var obtLanguage=$.session.get('obtLanguage')
var list = JSON.parse($.session.get("EmailPrint"))
var isReturn=$.session.get('isReturn')//是否是返程

console.log(isReturn)
console.log(list)

// function listInfo(){
list.map(function(item) {
	var lowestFare = item.InterCabins[0]
	if (item.InterSegments) {
		console.log(item.InterSegments.length > 1)
	} else {

	}
	var SegmentsLength=item.InterSegments.length
	if(isReturn == 1){
		//添加去程
		var emailPrintInfo=JSON.parse($.session.get('emailPrintInfo'))
		emailPrintInfo.InterSegments.map(function(item,index){
			if(index>0){
				$('#flightList tbody').append('\
							<tr class="listNum listNum2">\
								<td>' + item.FlightNo + '</td>\
								<td>(' + item.AirportDeparteCode +')' + item.AirportDeparte + '</td>\
								<td>(' + item.AirportArriveCode + ')' + item.AirportArrive + '</td>\
								<td>' +item.DateBegin.split(' ')[0] + ' ' + item.TimeStart + '</td>\
								<td>' + item.DateEnd.split(' ')[0] + ' ' + item.TimeArrive +'</td>\
								<td>' + item.PlaneType + '</td>\
								<td>' + item.Meal + '</td>\
							</tr>\
				')
								// <td>' + 0 + '</td>//经停
			}else{
				$('#flightList tbody').append('\
							<tr class="listNum">\
								<td>' + item.FlightNo + '</td>\
								<td>(' + item.AirportDeparteCode +')' + item.AirportDeparte + '</td>\
								<td>(' + item.AirportArriveCode + ')' + item.AirportArrive + '</td>\
								<td>' +item.DateBegin.split(' ')[0] + ' ' + item.TimeStart + '</td>\
								<td>' + item.DateEnd.split(' ')[0] + ' ' + item.TimeArrive +'</td>\
								<td>' + item.PlaneType + '</td>\
								<td>' + item.Meal + '</td>\
							</tr>\
				')
				// <td>' + 0 + '</td>//经停
			}
		})
		
	}
	item.InterSegments.map(function(item,index){
		if(isReturn=='undefined' && index == 0){
			$('#flightList tbody').append('\
						<tr class="listNum">\
							<td>' + item.FlightNo + '</td>\
							<td>(' + item.AirportDeparteCode +')' + item.AirportDeparte + '</td>\
							<td>(' + item.AirportArriveCode + ')' + item.AirportArrive + '</td>\
							<td>' +item.DateBegin.split(' ')[0] + ' ' + item.TimeStart + '</td>\
							<td>' + item.DateEnd.split(' ')[0] + ' ' + item.TimeArrive +'</td>\
							<td>' + item.PlaneType + '</td>\
							<td>' + item.Meal + '</td>\
						</tr>\
			')
			// <td>' + 0 + '</td>//经停
		}else{
			$('#flightList tbody').append('\
						<tr class="listNum listNum2">\
							<td>' + item.FlightNo + '</td>\
							<td>(' + item.AirportDeparteCode +')' + item.AirportDeparte + '</td>\
							<td>(' + item.AirportArriveCode + ')' + item.AirportArrive + '</td>\
							<td>' +item.DateBegin.split(' ')[0] + ' ' + item.TimeStart + '</td>\
							<td>' + item.DateEnd.split(' ')[0] + ' ' + item.TimeArrive +'</td>\
							<td>' + item.PlaneType + '</td>\
							<td>' + item.Meal + '</td>\
						</tr>\
			')
							// <td>' + 0 + '</td>//经停
		}
	})
	$('.listNum:last').addClass('flightDiv')
})
// }
//舱位
	list.map(function(item, index) {
		var temporaryArr=item.InterCabins
		var arr=temporaryArr.reverse()
		arr.map(function(afterItem) {
			var nohandImg = obtLanguage=="CN"?"公布运价":"Published Tariff"
			var handImg = obtLanguage=="CN"?"公司协议价":"Negotiated Rate"
			var showHandImg = afterItem.CabinFareType == "2" ? "show" : "hide";
			var FinalStr=showHandImg=="show"?handImg:nohandImg
			$('.flightDiv').eq(index).after('<tr class="allList">\
				<td>Cabin：</td>\
				<td>'+FinalStr+'</td>\
				<td>' + afterItem.CabinCode + '/' + afterItem.CabinType +'</td>\
				<td>OW:'+afterItem.NetFare+'</td>\
				<td>'+afterItem.Discount+'</td>\
				<td colspan="3">Total Tax: '+afterItem.CabinTax+' ' +afterItem.CabinCurrency+'</td>\
			</tr>')
		})
	})
//下载
$('.copy').click(function() {
	selectElementContents(document.getElementById('flightList'))
})

function selectElementContents(el) {
	var body = document.body,
		range, sel;
	if (document.createRange && window.getSelection) {
		range = document.createRange();
		sel = window.getSelection();
		sel.removeAllRanges();
		try {
			range.selectNodeContents(el);
			sel.addRange(range);
		} catch (e) {
			range.selectNode(el);
			sel.addRange(range);
		}
	} else if (body.createTextRange) {
		range = body.createTextRange();
		range.moveToElementText(el);
		range.select();
	}
	document.execCommand("Copy")
}
//金额格式化
