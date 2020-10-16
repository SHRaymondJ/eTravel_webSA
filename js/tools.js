(function(){var b=function(){this.thenTargets=[],this.pending=!0},a=function(d){return d&&d instanceof b},c=function(d){return d&&"function"==typeof d.then};b.prototype.resolve=function(f,d){if(f===d){throw new TypeError("resolve: arguments cannot be the same object")}if(f===d){throw new TypeError("resolve: arguments cannot be the same object")}a(d)||c(d)?d.then(f.fulfil.bind(f),f.reject.bind(f)):f.fulfil(d)},b.prototype.handleThenTargets=function(){var j,f,k,d;for(d=0;d<this.thenTargets.length;++d){this.fulfilled&&(f=this.thenTargets[d].onFulfilled,k=this.value),this.rejected&&(f=this.thenTargets[d].onRejected,k=this.reason);try{j=f&&"function"==typeof f?f.apply(void 0,k):this,this.resolve(this.thenTargets[d],j)}catch(g){this.thenTargets[d].reject(g)}}this.thenTargets=[]},b.prototype.handleThen=function(){this.pending||this.handleThenTargets()},b.prototype.then=function(e,f){var d=new b;return d.onFulfilled=e,d.onRejected=f,this.thenTargets.push(d),setTimeout(this.handleThen.bind(this),0),d},b.prototype["final"]=function(d){var e=new b;return e.onFulfilled=d,e.onRejected=d,this.thenTargets.push(e),setTimeout(this.handleThen.bind(this),0),e},b.prototype.fulfil=function(){this.rejected||(this.fulfilled=!0,this.pending=!1,this.value=arguments,this.handleThenTargets())},b.prototype.reject=function(){this.fulfilled||(this.reason=arguments,this.rejected=!0,this.pending=!1,this.handleThenTargets())},this.Promise=b}).call(this);
(function(){
window.tools = {};
tools.ajaxUrl = 'https://online.bcdtravel.cn/SystemAPI_PostSend/api/SystemAPI/PostSend';
// 添加link.js，判断链接状态
$('body').append('<script type="text/javascript" charset="UTF-8" src="../js/link.js"></script>')
/*
* 获取get请求的参数
* 使用方法： tools.queryString().id
* */
var _queryString = null;
tools.queryString = function(){
  !_queryString && (_queryString = function(){
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for(var i = 0; i < vars.length; i++){
      var pair = vars[i].split("=");
      if(typeof query_string[pair[0]] === "undefined"){
        query_string[pair[0]] = decodeURIComponent(pair[1]);
      }else if(typeof query_string[pair[0]] === "string"){
        query_string[pair[0]] = [query_string[pair[0]], decodeURIComponent(pair[1])];
      }else{
        query_string[pair[0]].push(decodeURIComponent(pair[1]));
      }
    }
    return query_string;
  }());
  return _queryString;
};
/*
* 使用方法：tools.Dialog.alert(title, content, ok)
* 参数
* title: 标题
* content：内容
* ok： 确认按钮
*
*使用方法：tools.Dialog.confirm(title, content, cancel, ok)
* 参数同上：
* cancel： 取消按钮
*
* 示例： tools.Dialog.alert('标题','内容呢', '确定')
* */
var popupStr = '<div class="weui_popup">[CONTENT]</div>';
var alertStr = '<div class="toolsCover"></div><div class="weui_dialog_alert" id="dialog2">\n    <div class="weui_mask"></div>\n    <div class="weui_dialog">\n        <div class="weui_dialog_hd"><span class="weui_dialog_title">[TITLE]</span></div>\n        <div class="weui_dialog_bd">[CONTENT]</div>\n        <div class="weui_dialog_ft">\n            <a href="javascript:;" class="weui_btn_dialog primary">[OK]</a>\n        </div>\n    </div>\n</div>';
var confirmStr = '<div class="toolsCover"></div><div class="weui_dialog_confirm" id="dialog1">\n    <div class="weui_mask"></div>\n    <div class="weui_dialog">\n        <div class="weui_dialog_hd"><strong class="weui_dialog_title">[TITLE]</strong></div>\n        <div class="weui_dialog_bd">[CONTENT]</div>\n        <div class="weui_dialog_ft">\n            <a href="javascript:;" class="weui_btn_dialog default">[CANCEL]</a>\n            <a href="javascript:;" class="weui_btn_dialog primary">[OK]</a>\n        </div>\n    </div>\n</div>';
tools.Dialog = {
  popup: function (content) {
    var promise = new Promise();
    var dom = $(popupStr.replace('[CONTENT]', content));
    setTimeout(function(){
      dom.remove();
      promise.fulfil(0);
    },1000)
    $('body').append(dom);
    return promise;
  },
  alert: function (title, content, ok) {
    var promise = new Promise();
    var dom = $(alertStr.replace('[TITLE]', title).replace('[CONTENT]', content).replace('[OK]', ok || '确定'));
    dom.find('.weui_btn_dialog').on('click', function () {
      dom.remove();
      promise.fulfil(0);
    });
    setTimeout(function(){
      dom.remove();
      promise.fulfil(0);
    },1500000)
    $('body').append(dom);
    return promise;
  },
  confirm: function (title, content, cancel, ok) {
    var promise = new Promise();
    var dom = $(confirmStr.replace('[TITLE]', title).replace('[CONTENT]', content).replace('[CANCEL]', cancel).replace('[OK]', ok || '确定'));
    dom.find('.default').on('click', function () {
      dom.remove();
      promise.fulfil(0);
    });
    dom.find('.primary').on('click', function () {
      dom.remove();
      promise.fulfil(1);
    });
    $('body').append(dom);
    return promise;
  }
};

/*
* loading 数据加载中
* 使用方法：
* 显示loading：tools.Loading.show('aa');
* 隐藏loading：tools.Loading.hide();
* */
var loadingTmpl = '<div class="cover" id="loadingCover">\n  <div class="waiting">\n    <div class="spinner">\n      <div class="bounce1"></div>\n      <div class="bounce2"></div>\n      <div class="bounce3"></div>\n    </div>\n    <p class="title">[TITLE]</p>\n  </div>\n</div>';
tools.Loading = {
  show: function(title, parentDom){
    parentDom = parentDom || $('body');
    var dom = $(loadingTmpl.replace('[TITLE]', title));
    dom.bind('mousewheel', function(e){
      e.preventDefault();
    }).bind('touchmove', function(e){
      e.preventDefault();
    });
    parentDom.append(dom);
    parentDom.addClass('overflow-hidden');
    return dom;
  },
  hide: function(parentDom){
    parentDom = parentDom || $('body');
    parentDom.removeClass('overflow-hidden');
    parentDom.find('#loadingCover').remove();
  }
};
;
// 检测图片是否存在
 tools.isHasImg=function(pathImg,classNameStr,type,index){
	 //type=1不做特殊处理  type=2删除父元素的父元素也就是轮播图的li标签
	 //不算通用类,具体需要在onload和onerror中处理
	     var ImgObj=new Image();  
			ImgObj.src= pathImg;  
			ImgObj.className='hideImg'
			ImgObj.onload=function(){
				if(type==3){
					$('.banner-img').append('<li><a href="#"><img src="'+pathImg+'" class="bgImg"></a></li>')
				}else{
					$(classNameStr).attr("src",pathImg)
				}
			}
			ImgObj.onerror=function(){
				if(type==2){
					$(classNameStr).parent().parent().remove()
					$('.banner-circle li:last-of-type').remove()
					}else {
						$(classNameStr).remove()
					}
				// }else if(type==3){
				// 	$('.banner-img').append(`<li><a href="#"><img src="${pathImg}" class="bgImg"></a></li>`)
				// }else{
				// 	$(classNameStr).remove()
				// }
			}
	 };
	 // 折扣过滤
	  tools.DiscountFilter=function(Discount){
		  if(ProfileInfo.onlineStyle!="APPLE"){
			if(Discount!="全价"){
				var dis=100-parseInt(Discount.split('%'))
				console.log(dis)
				return dis+'% off'
			}else{
				return Discount;
			}
			
		  }
	  };
	  // JQ ajax封装
	  tools.ajax=function(option,callback){
	  	var type=option.type||'post';
	  	var url=option.url;
	  	var dataType=option.dataType||'json';
	  	var data=option.data;
	  	$.ajax(
	  	  {
	  	    type:type,
	  	    url : url, 
	  	    dataType : dataType,
	  	    data:data,
	  	    success : function(data) {
	  			callback(data)
	  		},
	  	})
	  };
	  // 显示loading
	  tools.searchLoadingShow=function(){
		  var ProfileInfo=JSON.parse($.session.get('ProfileInfo'))
		  console.log(ProfileInfo.onlineStyle)
		  if(ProfileInfo.onlineStyle=="APPLE"){
			$('body').mLoading();  
		  }else{
			var text="Please wait – we are searching the best options for you"
			if($.session.get('obtLanguage')=="CN"){
				text="正在为您搜索中，请耐心等待"
			}
			$('body').mLoading({
				 text:text,
				 icon:"../images/loading.gif"
			});
			$('.mloading-icon').css({height:"100px",width:"auto",display:"block",margin:"auto"})
			$('.mloading-bar').css({width:"250px"})
			$('body').mLoading({
				 text:text,
				 icon:"../images/loading.gif"
			});
			  
		  }
	  };
	  // 隐藏loading
	  tools.searchLoadingHide=function(){
	  	$('.mloading-icon').css({height:"16px",width:"16",display:"inline-block",margin:"auto"})
	  	$('.mloading-bar').css({width:"250px"})
	  	$('body').mLoading("hide");
	  };
	  // 新增权限
	  tools.addProfileInfo=function(data){
		  var res = JSON.parse(data);
		  console.log(res)
		  // if(res.DocumentsDetail.length == 0||res.Phone==""||res.Email==""||res.Phone==null||res.Email==null||res.NeedCompleteCreditCard){
			 //5.11 新增检测国籍
			  if(res.DocumentsDetail.length == 0||res.Phone==""||res.Email==""||res.Phone==null||res.Email==null||res.NeedCompleteCreditCard || res.CountryCn == null ||res.CountryEn == null){
		    var ComplementState = true;
		  }else{
		    var ComplementState = false;
		  }
		  /*2020-2-3 新增*/
		  var hasDocument = res.DocumentsDetail.length == 0?false:true;
		  var hasPhone = res.Phone ==null || res.Phone.length == 0?false:true;
		  var hasEmail = res.Email==null || res.Email.length == 0?false:true;
		  /*end*/

		  var companyPhone=''
		  if(res.CompanyPhoneList==null || res.CompanyPhoneList.length==0){
		  	// console.log('没有公司电话')
		  }else{
			companyPhone=res.CompanyPhoneList[0].Telephone
		  }
		  
		var ProfileInfo={}
		for(var k in res){
			ProfileInfo[k]=res[k]
		}
		//防止CCIV等于null，下面回出错
		res.CCIV=res.CCIV==null?"":res.CCIV;
		res.CCKey=res.CCKey==null?"":res.CCKey;
	  	var ProfileInfoMy = {
	  	  "customerId":res.ID,
	  	  "isTrain":res.isTrain,
	  	  "onlineStyle":res.onlineStyle,
	  	  "loginOutUrl":res.loginOutUrl,
	  	  "companyId":res.CompanyID,
	  	  "NeedApproval":res.NeedApproval,
	  	  "isCodeShare":res.isCodeShare,
	  	  "QueryDomesticTicketsWithTime":res.QueryDomesticTicketsWithTime,
	  	  "NeedUpdatePassword":res.NeedUpdatePassword,
	  	  "ComplementState":ComplementState,
	  	  "NoQueryOrder":res.NoQueryOrder,
	  	  "ChainCode":res.ChainCode,
	  	  "HotelAddCohabitation":res.HotelAddCohabitation,
	  	  "IsBCD":res.IsBCD,
	  	  "NoShowHotelCommentsFromCompany":res.NoShowHotelCommentsFromCompany,
	  	  "HideChangePassword":res.HideChangePassword,
	  	  "CompanyPhone":companyPhone,
	  	  "IsHideRemarkInput":res.IsHideRemarkInput,
	  	  "HotelJumpHRS":res.HotelJumpHRS,
	  	  "HotelJumpHRS_Url":res.HotelJumpHRS_Url,
	  	  "HideInterChange":res.HideInterChange,
	  	  "ChangeSameAirline":res.ChangeSameAirline,
	  	  "HotelGKBooking":res.HotelGKBooking,
	  	  "InterSingleReason":res.InterSingleReason,
	  	  "SingleAirCombine":res.SingleAirCombine,
	  	  "isReport":res.isReport,
	  	  "DomesticHideMore":res.DomesticHideMore,
	  	  "ManualPriceNoBook":res.ManualPriceNoBook,
	  	  "WechatPay":res.WechatPay,
	  	  "AliPay":res.AliPay,
	  	  'SearchInterAirWTime':res.SearchInterAirWTime,
	  	  'DomesticHideAllDay':res.DomesticHideAllDay,
	  	  'HideMeberShip':res.HideMeberShip,
	  	  'advertiseChainCompany':res.advertiseChainCompany,
	  	  'advertiseCompany':res.advertiseCompany,
	  	  "ShowDomesticTimeSlt":res.ShowDomesticTimeSlt,
	  	  "Offline_Pay":res.Offline_Pay,
		  "isCarRental":res.isCarRental,
		  /*个人信息提示*/
		  "hasDocument":hasDocument,
		  "hasPhone":hasPhone,
		  "hasEmail":hasEmail,
		  "NeedCompleteCreditCard":res.NeedCompleteCreditCard,
		  "CreditCardReminder":res.CreditCardReminder,
		  /*end*/
		  /*key*/
		  "CCIV":res.CCIV.toString(),
		  "CCKey":res.CCKey.toString(),
		  /*end*/ 
	  	}
		for(var k in ProfileInfoMy){
			ProfileInfo[k]=ProfileInfoMy[k]
		}
	  	console.log(ProfileInfo);
	  	$.session.set('ProfileInfo', JSON.stringify(ProfileInfo));
	  }
	  /*2020-2-17 加密*/
	    $("head").append('<script src="../js/aes.js"></script>')
		// 加解密用到的密钥
		function aesKeyBytes(key) {
			var key_Int = new Int8Array(key);
			var keyBytes = int8parse(key_Int);
			return keyBytes;
		}

		function aesIvBytes(iv){
			var key_Int = new Int8Array(iv);
			var keyBytes = int8parse(key_Int);
			return keyBytes;
		}

		function int8parse(u8arr) {
			var len = u8arr.length;
			var words = [];
			for (var i = 0; i < len; i++) {
				words[i >>> 2] |= (u8arr[i] & 0xff) << (24 - (i % 4) * 8);
			}
			if(CryptoJS){
				return CryptoJS.lib.WordArray.create(words, len);
			}
		}
		//加密方法
		if(CryptoJS&&$.session&&$.session.get('ProfileInfo')){
			var key = aesKeyBytes(JSON.parse($.session.get('ProfileInfo')).CCKey.split(","));
		    var iv = aesIvBytes(JSON.parse($.session.get('ProfileInfo')).CCIV.split(","));
		}
		tools.Encrypt = function(word) {
			var encrypted = CryptoJS.AES.encrypt(word, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
			return encrypted.toString();
		}
		tools.Decrypt = function(word) {
			var reg = /^[0-9]*$/;
			if (!reg.test(word)){
				var decrypt = CryptoJS.AES.decrypt(word, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
				var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
				return decryptedStr.toString();
			}else{
				return word;
			}
		}
		/*end*/
		/*2020-3-02 苹果提醒*/
		tools.appleRemindPop = function(cityList,type,netUserId,callback){
			$('body').mLoading("show");
			$.ajax(
			  {
				type:'post',
				url : $.session.get('ajaxUrl'),
				dataType : 'json',
				data:{
					url: $.session.get('obtCompany')+"/SystemService.svc/GetCompanyRemainderInfo",
					jsonStr:'{"type":"'+type+'","key":'+netUserId+',"codeList":['+cityList+']}'
				},
				success : function(data) {
					$('body').mLoading("hide");
					var res = JSON.parse(data);
					console.log(res)
					if(res.code==200){
						var tittle = $.session.get('obtLanguage')=="CN"?res.titleCN:res.titleEN;
						var content = $.session.get('obtLanguage')=="CN"?res.contentCN:res.contentEN;
						var btnColor=ProfileInfo.onlineStyle=="APPLE"?"#3083fb":"#f6aa25";
						var btn1=$.session.get('obtLanguage')=="CN"?"取消":"Cancel";
						var btn2=$.session.get('obtLanguage')=="CN"?"确认":"Confirm";
						$("body").append('\
						<div class="remindCover" style="position: fixed;top: 0;left: 0;bottom: 0;right: 0;background: rgba(0, 0, 0, 0.7);z-index: 9999;">\
						  <div class="remindPop" style="position:relative;width: 716px;min-height: 100px;background-color: #fff;z-index: 101;position: fixed;top: 50%;left: 50%;transform: translate(-50%,-50%);border-radius: 10px;padding: 10px;font-family: Sans-serif,Arial,Verdana;box-sizing: content-box;">\
							<div class="remindPopTittle" style="border-bottom:1px solid #e6e6e6;width: 100%;height: 60px;line-height: 60px;font-size: 26px;font-weight: 600;position: relative;box-sizing: border-box;padding-left: 10px;font-family: Arial,Verdana;">'+tittle+'</div>\
							<div style="box-sizing: border-box;padding:10px;font-size: 15px;line-height:24px;max-height: 450px;overflow-y: scroll;">\
							  '+content+'\
							</div>\
							<div class="remindPopFooter" style="font-size:16px;width:690px;height:50px;border-top:1px solid #e6e6e6;position: relative;">\
								<div class="closeApplePopBtn" style="cursor:pointer;width:90px;height:30px;line-height:30px;text-align:center;border-radius:15px;border:1px solid #666;position:absolute;top:10px;right:150px;">'+btn1+'</div>\
								<div class="sureApplePopBtn" style="cursor:pointer;width:120px;height:30px;line-height:30px;text-align:center;border-radius:15px;background:'+btnColor+';color:#fff;position:absolute;top:10px;right:10px;">'+btn2+'</div>\
							</div>\
						  </div>\
						</div>\
						')
						var h=$('.remindPop').height()
						if(h%2 !=0){
							$('.remindPop').height(h+1+'px')
						}
						if(!res.canContinueBook){
							$(".closeApplePopBtn").remove();
						}
						$(".closeApplePopBtn").unbind("click").click(function(){
							$(".remindCover").remove();
						})
						$(".sureApplePopBtn").unbind("click").click(function(){
							$(".remindCover").remove();
							if(res.canContinueBook){
								if(callback){
									callback();
								  }
							}else{
								$(".remindCover").remove();
							}
						})
					}else if(res.code==501){
						if(callback){
							callback();
						  }
						// alert(res.errorMsg);
					}
				},
				error : function() {
				  // alert('fail');
				}
			  }
			);
		  }
		/*end*/
		/*2020-3-11 审批单*/
		tools.customerTravelRequest = function(netUserId,queryKey,callback,type,city){
			$('body').mLoading("show");
			$.ajax(
				{
				  type:'post',
				  url : $.session.get('ajaxUrl'),
				  dataType : 'json',
				  data:{
					  url: $.session.get('obtCompany')+"/SystemService.svc/GetTravelRequestWithOtherCitysPost",
					  jsonStr:'{"queryKey":"'+queryKey+'","id":'+netUserId+',"Language":"'+$.session.get('obtLanguage')+'","otherCitys":"'+city+'"}'
				  },
				  success : function(data) {
					  $('body').mLoading("hide");
					  var res = JSON.parse(data);
					  console.log(res);
					if($.session.get('obtLanguage')=="CN"){
						var popTittle = "请选择您的申请单";
						var travelApplication = "差旅申请单";
						var applicationRemind = "当前没有审批单";
						var select = '选择';
						var back = '返回';
					}else{
						var popTittle = "Please select the application form";
						var travelApplication = "Travel Application Form";
						var applicationRemind = "Currently there is no travel request.";
						var select = 'Select';
						var back = 'Back';
					}
					$("body").append('\
					<div class="requestCover" style="position: fixed;top: 0;left: 0;bottom: 0;right: 0;background: rgba(0, 0, 0, 0.7);z-index: 9999;">\
					<div class="travelRequestPop" style="position:relative;width: 838px;height: 500px;background-color: #fff;z-index: 101;position: fixed;top: 50%;left: 50%;transform: translate(-50%,-50%);border-radius: 10px;padding: 10px;font-family: Sans-serif,Arial,Verdana;">\
						<div class="travelRequestPopTittle" style="height:52px;color:#094B90;border-bottom:1px solid #e6e6e6;width: 100%;height: 80px;line-height: 80px;font-size: 26px;font-weight: 600;position: relative;box-sizing: border-box;text-align:center;font-family: Arial,Verdana;">'+popTittle+'</div>\
						<div style="box-sizing: border-box;padding:10px;font-size: 15px;line-height:24px;height:430px;">\
						<div style="width:778px;height:40px;margin-left:30px;background:#F2F6FF;line-height:40px;font-size:16px;box-sizing:border-box;padding-left:20px;">'+travelApplication+'</div>\
						<div class="travelApplicationList" style="width:778px;height:360px;margin-left:30px;"></div>\
						</div>\
					</div>\
					</div>\
					')
					if(res.HasMessage){
						// alert(res.Message);
						$(".travelApplicationList").append('\
						  <div class="applicationLi" style="width:778px;height:40px;line-height:40px;font-size:16px;box-sizing:border-box;padding-left:20px;">'+applicationRemind+'</div>\
						  <div class="applicationBackBtn" style="width:40%;height:40px;line-height:40px;font-size:22px;color:#fff;background-color:#094B90;text-align:center;position:absolute;bottom:20px;left:30%;border-radius: 5px;cursor:pointer;">'+back+'</div>\
						')
						$(".applicationBackBtn").unbind("click").click(function(){
							history.back();
						})
                    }else if(res.TravelInfos.length!=0){
						res.TravelInfos.map(function(item){
							$(".travelApplicationList").append('\
								<div class="applicationLi flexRow" style="width:778px;height:50px;line-height:50px;font-size:16px;box-sizing:border-box;padding-left:20px;position:relative;">\
								  <div style="color:#1E66AE">'+item.TravelRequestNo+'</div>\
								  <div style="margin-left:20px;">'+item.StartDate+'~'+item.EndDate+'</div>\
								  <div style="margin-left:20px;">'+item.TravelItinerary[0]+'</div>\
								  <div class="selectApplication" CustomerID="'+item.Customers[0].CustomerId+'" CompanyID="'+JSON.parse($.session.get('ProfileInfo')).CompanyID+'" employeeName="'+item.Customers[0].NameCn+'" TravelRequestNo="'+item.TravelRequestNo+'" style="cursor:pointer;position:absolute;width:100px;height:30px;line-height:30px;color:#fff;top:10px;right:20px;background:#041D5C;text-align:center;border-radius:5px;">'+select+'</div>\
								</div>\
							')
						})
						$(".selectApplication").unbind("click").click(function(){
							var TravelRequestNo = $(this).attr("TravelRequestNo");
							$.session.set('TAnumber',TravelRequestNo);
							if(type==1){
								$.session.set('TACustomerId', $(this).attr("CustomerID")+','+$(this).attr("CompanyID")+','+$(this).attr("employeeName"));
							}
							callback();
						})
                    }
				  },
				  error : function() {
					// alert('fail');
				  }
				}
			  );
		}
		tools.getTravelRequestRemark = function(netUserId,queryKey,callback){
			$('body').mLoading("show");
			var TravelRequestNo = $.session.get('TAnumber');
			var queryKeySelect = TravelRequestNo+','+queryKey.split(",")[0]+','+queryKey.split(",")[1];
			$.ajax(
				{
					type:'post',
					url : $.session.get('ajaxUrl'),
					dataType : 'json',
					data:{
						url: $.session.get('obtCompany')+"/SystemService.svc/SelectTravelRequestPost",
						jsonStr:'{"queryKey":"'+queryKeySelect+'","id":'+netUserId+',"Language":"'+$.session.get('obtLanguage')+'"}'
					},
					success : function(data) {
						$('body').mLoading("hide");
						callback(data);
					},
					error : function() {
					// alert('fail');
					}
				}
			);
		}
		/*end*/
	
	// 2020.5.20身份证号校验
	tools.testIdCard=function(id){
		var format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
		//号码规则校验
		if(!format.test(id)){
			return {'status':0,'msg':'身份证号码不合规'};
		}
					var year = id.substr(6,4),//身份证年
		            month = id.substr(10,2),//身份证月
		            date = id.substr(12,2),//身份证日
		            time = Date.parse(month+'-'+date+'-'+year),//身份证日期时间戳date
		            now_time = Date.parse(new Date()),//当前时间戳
		            dates = (new Date(year,month,0)).getDate();//身份证当月天数
		        if(time>now_time||date>dates){
		            return {'status':0,'msg':'出生日期不合规'}
		        }
		        //校验码判断
		        var c = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2);   //系数
		        var b = new Array('1','0','X','9','8','7','6','5','4','3','2');  //校验码对照表
		        var id_array = id.split("");
		        var sum = 0;
		        for(var k=0;k<17;k++){
		            sum+=parseInt(id_array[k])*parseInt(c[k]);
		        }
		        if(id_array[17].toUpperCase() != b[sum%11].toUpperCase()){
		            return {'status':0,'msg':'身份证校验码不合规'}
		        }
				var birthday =year+'-'+month+'-'+date;
		        return {'status':1,'msg':'校验通过','birthday':birthday}
	}
	
	})();