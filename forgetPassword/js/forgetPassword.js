var obtLanguage = $.session.get('obtLanguage');
//中英文对象
var cn = {
	"forgetTittle":"忘记密码",
    "step":{
        "step1":"输入账号",
        "step2":"验证手机号",
        "step3":"重置密码",
        "step4":"完成",
    },
    "inputBody":{
        "CompanyCode":"公司代码:",
        "userAccount":"账号:",
        "next":"下一步",
        "phone":"手机号:",
        "identifyingCode":"验证码:",
        "identifyingBtn":"获取验证码",
        "newPassword":"设置新密码:",
        "newPasswordAgain":"确认新密码:",
        "CompleteBtn":"返回登录",
    },
    "remind":"请正确填写！",
}
var en = {
	"forgetTittle":"Forget Password",
    "step":{
        "step1":"Input Account",
        "step2":"Verify Phone Number",
        "step3":"Reset Password",
        "step4":"Complete",
    },
    "inputBody":{
        "CompanyCode":"Company Code:",
        "userAccount":"Account:",
        "next":"Next",
        "phone":"Phone:",
        "identifyingCode":"Identifying Code:",
        "identifyingBtn":"Get Verification Code",
        "newPassword":"New Pwd:",
        "newPasswordAgain":"Pwd Again:",
        "CompleteBtn":"Return to login page",
    },
    "remind":"Please fill in correctly!",
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
})
function showContent(){
	$("#main").html('\
	    <div class="autoCenter">\
	        <div class="forgetTittle">'+get_lan("forgetTittle")+'</div>\
            <div class="roundBody">\
                <div class="roundOutside"><div class="roundInside roundActive">1</div></div>\
                <div class="dashedLine"></div>\
                <div class="roundOutside" style="left:500px"><div class="roundInside">2</div></div>\
                <div class="dashedLine" style="left:571px"></div>\
                <div class="roundOutside" style="left:696px"><div class="roundInside">3</div></div>\
                <div class="dashedLine" style="left:758px"></div>\
                <div class="roundOutside" style="left:880px"><div class="roundInside">4</div></div>\
            </div>\
            <div class="flexRow">\
              <div class="stepText stepActive" style="margin-left:252px;">'+get_lan("step").step1+'</div>\
              <div class="stepText" style="margin-left:52px;">'+get_lan("step").step2+'</div>\
              <div class="stepText" style="margin-left:42px;">'+get_lan("step").step3+'</div>\
              <div class="stepText" style="margin-left:35px;">'+get_lan("step").step4+'</div>\
            </div>\
            <div class="inputBody" style="margin-top:100px;">\
                <div class="flexRow CompanyCodeLi hide">\
                  <div class="liTittle">'+get_lan("inputBody").CompanyCode+'</div>\
                  <div><Input class="liInput companyCode"></div>\
                </div>\
                <div class="flexRow" style="margin-top:40px;">\
                  <div class="liTittle">'+get_lan("inputBody").userAccount+'</div>\
                  <div><Input class="liInput userAccount"></div>\
                </div>\
                <div class="nextStep">'+get_lan("inputBody").next+'<div>\
            </div>\
	    </div>\
	    ')
    passwordStep1();
    if(window.location.href.indexOf("bcd") == -1){
      $(".CompanyCodeLi").removeClass("hide");
    }
}
function passwordStep1(){
    $(".nextStep").unbind("click").click(function(){
        if($(".CompanyCodeLi").hasClass("hide")){
            var companyCode = 'bcd';
        }else{
            var companyCode = $(".companyCode").val();
        }
        
        var userAccount = $(".userAccount").val();
        if(companyCode==""||userAccount==""){
            alert(get_lan("remind"));
            return false;
        }
        $('body').mLoading("show");
        $.ajax(
          {
            type:'post',
            url : $.session.get('ajaxUrl'),
            dataType : 'json',
            crossDomain : true,
            data:{
                url: "http://appservicetest.etravel.net.cn/SystemService.svc/SelectUrlPost",
                jsonStr:'{"CompanyMs":"'+companyCode+'"}'
            },
            success : function(data) {
                var res = JSON.parse(data);
                console.log(res);
                var Company_Url = res.Company_Url;
                $.ajax(
                  {
                    type:'post',
                    url : $.session.get('ajaxUrl'), 
                    dataType : 'json',
                    data:{
                        url: Company_Url+"/SystemService.svc/GetCustomerInfoForFindPwd",
                        jsonStr:'{"companyCode":"'+companyCode+'","userAccount":"'+userAccount+'","language":"'+obtLanguage+'"}'
                    },
                    success : function(data) {
                        $('body').mLoading("hide");
                        var res = JSON.parse(data);
                        console.log(res);
                        if(res.code == "200"){
                            $(".roundInside").removeClass("roundActive");
                            $(".roundInside").eq(1).addClass("roundActive");
                            $(".stepText").removeClass("stepActive");
                            $(".stepText").eq(1).addClass("stepActive");
                            $(".inputBody").html('\
                                <div class="flexRow">\
                                  <div class="liTittle">'+get_lan("inputBody").phone+'</div>\
                                  <div class="phoneText">'+res.data.split("-")[1]+'</div>\
                                  <input type="button" value="'+get_lan("inputBody").identifyingBtn+'" class="identifyingBtn" customerInfo="'+res.data+'">\
                                </div>\
                                <div class="flexRow" style="margin-top:40px;">\
                                  <div class="liTittle">'+get_lan("inputBody").identifyingCode+'</div>\
                                  <div><Input class="liInput identifyingInput"></div>\
                                </div>\
                                <div class="nextStep2" customerInfo="'+res.data+'">'+get_lan("inputBody").next+'<div>\
                                ')
                            passwordStep2(Company_Url);
                        }else{
                            alert(res.message)
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
    })
}
function passwordStep2(Company_Url){
    $(".identifyingBtn").unbind("click").click(function(){
        $('body').mLoading("show");
        var that = this;
        $.ajax(
          {
            type:'post',
            url : $.session.get('ajaxUrl'), 
            dataType : 'json',
            data:{
                url: Company_Url+"/SystemService.svc/GetVerificationCode",
                jsonStr:'{"customerInfo":"'+$(this).attr("customerInfo")+'","language":"'+obtLanguage+'"}'
            },
            success : function(data) {
                var res = JSON.parse(data);
                console.log(res);
                $('body').mLoading("hide");
                if(res.code == "200"){
                    settime(that);
                    var countdown = 59;
                    function settime(val) {
                        if(countdown==undefined){
                            countdown = 60;
                        }
                        if (countdown == 0) {
                            val.removeAttribute("disabled");
                            val.value=get_lan("inputBody").identifyingBtn;
                            countdown = 60;
                        } else{
                            // console.log(countdown);
                            val.setAttribute("disabled", true);
                            val.value= countdown;
                            countdown--;
                            setTimeout(function() {
                                settime(val);
                            },1000)
                        }
                    }
                }else{
                    alert(res.message)
                }
            },
            error : function() {
              // alert('fail');
            }
          }
        );
    })
    $(".nextStep2").unbind("click").click(function(){
        var identifyingCode = $(".identifyingInput").val();
        if(identifyingCode==""){
            alert(get_lan("remind"));
            return false;
        }
        var that = this;
        $.ajax(
          {
            type:'post',
            url : $.session.get('ajaxUrl'), 
            dataType : 'json',
            data:{
                url: Company_Url+"/SystemService.svc/CheckVerificationCode",
                jsonStr:'{"customerInfo":"'+$(this).attr("customerInfo")+'","verificationCode":"'+identifyingCode+'","language":"'+obtLanguage+'"}'
            },
            success : function(data) {
                var res = JSON.parse(data);
                console.log(res);
                if(res.code == "200"){
                    $(".roundInside").removeClass("roundActive");
                    $(".roundInside").eq(2).addClass("roundActive");
                    $(".stepText").removeClass("stepActive");
                    $(".stepText").eq(2).addClass("stepActive");
                    $(".inputBody").html('\
                        <div class="flexRow">\
                          <div class="liTittle">'+get_lan("inputBody").newPassword+'</div>\
                          <div><Input type="password" class="liInput newPassword"></div>\
                        </div>\
                        <div class="flexRow" style="margin-top:40px;">\
                          <div class="liTittle">'+get_lan("inputBody").newPasswordAgain+'</div>\
                          <div><Input type="password" class="liInput newPasswordAgain"></div>\
                        </div>\
                        <div class="PasswordRuleList"></div>\
                        <div class="nextStep3" customerInfo="'+$(that).attr("customerInfo")+'">'+get_lan("inputBody").next+'<div>\
                        ')
                    $.ajax({
                        type:'post',
                        url : $.session.get('ajaxUrl'), 
                        dataType : 'json',
                        data:{
                            url: Company_Url+"/SystemService.svc/GetInformationsPost",
                            jsonStr:'{"culture":"'+obtLanguage+'"}'
                        },
                        success : function(data) {
                            var resData = JSON.parse(data);
                            console.log(resData);
                            resData.PasswordRuleList.map(function(item,index){
                             if(obtLanguage=="CN"){
                                 $(".PasswordRuleList").append('\
                                     <li>'+(index+1)+'、'+item.NameCn+'</li>\
                                 ')
                             }else if(obtLanguage=="EN"){
                                 $(".PasswordRuleList").append('\
                                     <li>'+(index+1)+'、'+item.NameEn+'</li>\
                                 ')
                             }
                            })
                         }
                     } 
                    );
                    passwordStep3(Company_Url);
                }else{
                    alert(res.message)
                }
            },
            error : function() {
              // alert('fail');
            }
          }
        );
    })
}
function passwordStep3(Company_Url){
    $(".nextStep3").unbind("click").click(function(){
        var newPassword = $(".newPassword").val();
        var newPasswordAgain = $(".newPasswordAgain").val();
        if(newPassword==""||newPasswordAgain==""||newPassword!=newPasswordAgain){
            alert(get_lan("remind"));
            return false;
        }
        $.ajax(
          {
            type:'post',
            url : $.session.get('ajaxUrl'), 
            dataType : 'json',
            data:{
                url: Company_Url+"/SystemService.svc/ModifyPassword",
                jsonStr:'{"customerInfo":"'+$(this).attr("customerInfo")+'","newPassword":"'+newPassword+'","language":"'+obtLanguage+'"}'
            },
            success : function(data) {
                var res = JSON.parse(data);
                console.log(res);
                if(res.code == "200"){
                    alert(res.data);
                    $(".roundInside").removeClass("roundActive");
                    $(".roundInside").eq(3).addClass("roundActive");
                    $(".stepText").removeClass("stepActive");
                    $(".stepText").eq(3).addClass("stepActive");
                    $(".inputBody").html('\
                        <div class="CompleteBtn" customerInfo="'+res.data+'">'+get_lan("inputBody").CompleteBtn+'<div>\
                        ')
                    $(".CompleteBtn").unbind("click").click(function(){
                        if(window.location.href.indexOf("bcd") == -1){
                          window.location.href = '../../login/loginPage.html';
                        }else{
                          window.location.href = '../../login/loginPageBCD.html';
                        }
                    })
                }else{
                    alert(res.message)
                }
            },
            error : function() {
              // alert('fail');
            }
          }
        );
    })
}