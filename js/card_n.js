var Card = function() {

}

Card.prototype.send = function() {
	var param = {
		Originator: Common.userInfo().UserInfoId,
		Sendee: $("#exchange-userinfo").val(),
		Type:1,
		ExpectPosition: $("#cardchange-position").val(),
		ExpectCompany: $("#cardchange-city").val(),
		ExpectSalary: $("#cardchange-salary").val()
		
	};
	$.ajax({
		url : Common.getServerHost() + "/api/users/ExchangeCard",
		method : "post",
		data : Common.obj2param(param),
		async : false,
		success : function(rtnmsg) {
			if (parseInt(rtnmsg.returncode) == 0) {
			    alert('交换成功');
				Common.reverse("#hr-view-hunter-infomation");
			} else {
				alert("server error!");
			}
		},
		error : onerror,
		timeout : 30000
	})
}

Card.prototype.init = function (user) {
	var avatar = Common.defaultAvatar2();
	if(Common.getDisplayText(user.Avatar) != '')
	{
		avatar = Common.getDisplayText(user.Avatar);
	}
	
	var name = Common.getDisplayText(user.RealName);
	var english = Common.getDisplayText(user.EnglishName);
	var position =  Common.getDisplayText(user.Position);
	var company = Common.getDisplayText(user.CompanyName); 
	
	var cposition = "";
	var ccompany = "";
	if(user.UserCompanys > 1)
	{
		cposition = user.UserCompanys[1].Position;
		ccompany = user.UserCompanys[1].CompanyName;
	}
	
	var phone = Common.getDisplayText(user.Telephone);
	var email = Common.getDisplayText(user.Email);
	
	$("#excard-avatar").attr("src",avatar);
	$("#exchange-userinfo").val(user.UserInfoId);
	$("#exchang-name").text(name + " " + english);
	$("#exchang-position").html(position + " <span>@</span> " + company)
	
	if(ccompany != "" || cposition != "")
	{
	$("#exchang-cposition").text("曾任职：" + cposition + "," + ccompany);
	}
	
	$("#exchange-phone").html("<img src='img/card-phone.png' width='15' height='15' />&nbsp;" +phone);
	$("#exchange-email").html("<img src='img/card-mail.png' width='15' height='10' />&nbsp;" +email);

}