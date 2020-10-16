var obtLanguage=$.session.get('obtLanguage')
var list = JSON.parse($.session.get("EmailPrint"))

console.log(list)
// function listInfo(){
list.map(function(item) {
	var lowestFare = item.Cabins[0]
	if (item.InterSegments) {
		console.log(item.InterSegments.length > 1)
	} else {

	}
	var  DepTerm= item.DepTerm?item.DepTerm:""
	var  ArrTerm= item.ArrTerm?item.ArrTerm:""
	if (item.StopNo == "直飞" || item.StopNo == "Direct") {
		var stop=""
	}else{
		var stop=obtLanguage=="CN"?"(经停)":"(Stopover)" 
	}
	$('#flightList tbody').append('\
				<tr class="listNum">\
					<td>' + item.FlightNo + stop+'</td>\
					<td>(' + item.AirportDeparteCode +
					')' + item.AirportDeparte + ' ' + DepTerm+'</td>\
					<td>(' + item.AirportArriveCode + ')' + item.AirportArrive + ' ' + ArrTerm+ '</td>\
					<td>' +
					item.DateStart + ' ' + item.TimeStart + '</td>\
					<td>' + item.DateArrive + ' ' + item.TimeArrive +
					'</td>\
					<td>' + item.PlaneType + '</td>\
					<td>' + item.Meal + '</td>\
					<td>' + lowestFare.CabinCode +
					'/' + lowestFare.NetFare + '/' + lowestFare.Discount + '</td>\
				</tr>\
	')
})
// }
function exchange() {
	var n = $('#changetype').val()
	if (n == 0) {
		$('tbody').html(
			'<tr>\
					<th width="93px">Flight</th>\
					<th width="165px">From</th>\
					<th width="203px">To</th>\
					<th width="166px">Departure Time</th>\
					<th width="160px">Arrival Time</th>\
					<th width="151px">Equipment</th>\
					<th width="128px">Meal</th>\
					<th width="127px">Lowest Fare</th>\
				</tr>'
		)
		list.map(function(item) {
			item.Cabins.reverse()
			var lowestFare = item.Cabins[0]
			
			var  DepTerm= item.DepTerm?item.DepTerm:""
			var  ArrTerm= item.ArrTerm?item.ArrTerm:""
			
			$('#flightList tbody').append('\
			<tr class="listNum">\
				<td>' + item.FlightNo + '</td>\
				<td>(' + item.AirportDeparteCode +
				')' + item.AirportDeparte + ' ' + DepTerm +'</td>\
				<td>(' + item.AirportArriveCode + ')' + item.AirportArrive + ' '+ArrTerm+'</td>\
				<td>' +
				item.DateStart + ' ' + item.TimeStart + '</td>\
				<td>' + item.DateArrive + ' ' + item.TimeArrive +
				'</td>\
				<td>' + item.PlaneType + '</td>\
				<td>' + item.Meal + '</td>\
				<td>' + lowestFare.CabinCode +
				'/' + lowestFare.FareAmount + '/' + lowestFare.Discount + '</td>\
			</tr>\
		 ')
		})
	} else {
		list.map(function(item, index) {
			var temporaryArr=item.Cabins
			var arr=temporaryArr.reverse()
			arr.map(function(afterItem) {
				var nohandImg = obtLanguage=="CN"?"公布运价":"Published Tariff"
				var handImg = obtLanguage=="CN"?"公司协议价":"Negotiated Rate"
				var showHandImg = afterItem.CabinFareType == "2" ? "show" : "hide";
				var FinalStr=showHandImg=="show"?handImg:nohandImg
				$('.listNum').eq(index).after('<tr class="allList">\
					<td>Cabin：</td>\
					<td>'+FinalStr+'</td>\
					<td>' + afterItem.CabinCode + '/' + afterItem.Cabin +'</td>\
					<td>OW:'+afterItem.NetFare+'</td>\
					<td>'+afterItem.Discount+'</td>\
					<td colspan="3">Total Tax:'+afterItem.TotalTax+'</td>\
				</tr>')
			})
		})
	}
}
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
