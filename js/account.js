var $register = null;
var RegisterClass = function() {
	$register = this;
};

RegisterClass.prototype.init = function(){
		var viewheight = $(window).height();
		$("#homolog").height(viewheight * 0.8);
		
		//定位
		var viewwidth = $(window).width();
		
		//home页
		$("#logo").width(viewwidth/4).height(viewwidth/4);
		$("#logo").css("margin-top",viewheight/6);
		$("#homebg").width(viewwidth).height(viewheight);
		$("#index").height(viewheight);
		
};
	
RegisterClass.prototype.initEditCard = function(type)
{
    var imgwidth = $(window).width();
    var imgheight = imgwidth;
    
    $("#user-info-icon").width(imgwidth).height(imgheight);

	if(type==1)
	{
		$("#editcardinfo #user-info-icon").attr("src",Common.defaultAvatar());
		$("#editcardinfo #card-avatar").val("");
		$("#editcardinfo #card-name").val("");
		$("#editcardinfo #card-company").val("");
		$("#editcardinfo #card-position").val("");
		$("#editcardinfo #card-mail").val("");
	}
	else
	{
		var user = Common.userInfo();
	}
}
	

	
RegisterClass.prototype.login = function(username, password) {
		if ($register.logincheck(username, password)) {
			
			var bln = true;
			
			if (Common.userInfo().RealName == "") {
				
				Common.redirect("#editcardinfo");
				bln = false;
			} 
			else if (Common.userInfo().UserRole < 1) {
				Common.redirect("#userRoleSelect")
			} 
			else if(Common.userInfo().UserRole == 999){
				if(Common.userInfo().RealName.ExpectIndustryIds == "")
				{
					var cand = new CandidateRange();
					cand.init(2);
					Common.redirect("#area")
					bln = false;
				}
			}

			if(bln)
			{
			
				Common.redirect("#all-home");
			}

		} else {
			alert("用户名或密码错误！");
		}
	};

RegisterClass.prototype.registerNewUser = function(username, password,repassword) {
		
		var rtn = $register.validate(username,password,repassword);
		
		if(rtn)
		{
		var param = {
			phone : username,
			password : password
		};
		var bln = false;
		Common.loading();
		$.ajax({
			url : Common.getServerHost() + "/api/users/register",
			method : "post",
			data : Common.obj2param(param),
			async : false,
			success : function(rtnmsg) {
				if (parseInt(rtnmsg.returncode) == 0) {
				    Common.localJsonStorage("user",rtnmsg.result);
				    
				    bln = true;
				} else {
				    
					alert('注册失败，请重试！');
					bln = false;
				}
			},
			error :function(request, status, error) {
							alert(error);
							bln = false;
						},
			timeout : 30000
		});
		}
		else
		{
			bln = false;
		}
		return bln;
	};

RegisterClass.prototype.validate = function(username,password,repassword)
{
	if(username == "")
	{
		alert('请输入用户名！');
        return false;
	}
	
	if(password == "")
	{
		alert('请输入密码！');
        return false;
	}
	
	if(repassword == "")
	{
		alert('请确认密码！');
        return false;
	}
	
	if(username.indexOf('@') > 0)
	{
		var emailreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    	if(!emailreg.test(username))
    	{
        	alert('请输入有效的邮箱！');
        	return false;
    	}
	}
	else
	{

    	var myreg = /^(1+\d{10})$/;
    	if(!myreg.test(username))
    	{
        	alert('请输入有效的手机号码！');
        	return false;
    	}
    }
    
    var len = password.length;
    if(len < 6 || len > 20)
    {
    	alert('密码长度限制为6～20！');
        return false;
    }

    if(password != repassword)
    {
    	alert('两次输入的密码不一样！');
        return false;
    }
    
    return true;

}

RegisterClass.prototype.validatecard = function()
{

	if($("#card-avatar").val() == "")
	{
		//alert('请上传头像！');
        //return false;
	}
	
	if($("#card-name").val() == "")
	{
		alert('请输入真实姓名！');
        return false;
	}
	
	if($("#card-company").val() == "")
	{
		alert('请输入公司名称！');
        return false;
	}
	
	if($("#card-position").val() == "")
	{
		alert('请输入职位名称！');
        return false;
	}
	
	if($("#card-mail").val() == "")
	{
		alert('请输入邮箱地址！');
        return false;
	}
	else
	{
		var emailreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    	if(!emailreg.test($("#card-mail").val()))
    	{
        	alert('请输入有效的邮箱！');
        	return false;
    	}
	}
    
    return true;

}

RegisterClass.prototype.saveCard = function(){

	var bln = $register.validatecard();
	
	if(bln)
	{
		
			try
			{
					Common.loading();
					
					var data = "UserId=" + Common.userInfo().UserId + "&RealName="
							+ $("#card-name").val() + "&Position="
							+ $("#card-position").val() + "&Email="
							+ $("#card-mail").val() + "&CompanyName="
							+ $("#card-company").val() + "&Avatar=" 
							+ $("#card-avatar").val();
					
					$.ajax({
						url : Common.getServerHost() + "/api/users/save",
						method : "post",
						data : data,
						success : function(rtnmsg) {
							if(rtnmsg.returncode == 0)
							{
							    bln = true;
							}
							else
							{
							//JSON.stringify(rtnmsg)
							    alert(rtnmsg.message);
							    bln = false;
							}
						},
						error : function(request, status, error) {
							alert(error);
							bln = false;
							Common.stopload();
						},
						timeout : 50000
			});
			}catch(e)
			{
				Common.stopload();
			}
	}
	
	return bln;

}

RegisterClass.prototype.logincheck = function(username, password) {
		var result = false;
		var param = {
			phone : username,
			password : password
		}
		$.ajax({
			url : Common.getServerHost() + "/api/users/getuser",
			method : "post",
			async : false,
			data : Common.obj2param(param),
			success : function(rtnmsg) {
				if (rtnmsg.returncode == 0) {
				    if(rtnmsg.result == null)
				    {
				    	result = false;
				    }
				    else
				    {
					result = true;
					Common.localJsonStorage("user" ,rtnmsg.result);
					}
				}
				else
				{
					result = false;
				}
			},
			error : function(request, status, error) {
							alert(error);
							result = false;
						},
			timeout : 30000
		});
		return result;
	};
	 
	
RegisterClass.prototype.selectUserRole = function(userRole)
	{
	    var bln = false;
		var param={
			UserId:Common.userInfo().UserId,
			UserRole:userRole
		}
		
		$.ajax({
			url : Common.getServerHost() + "/api/users/saveUserRole",
			method : "post",
			async : false,
			data : Common.obj2param(param),
			success : function(rtnmsg) {
				if (rtnmsg.returncode == 0) {
					Common.localJsonStorage("user",rtnmsg.result);
                    bln = true;
				}else
				{
					alert(rtnmsg.message);
					bln = false;
				}
			},
			error : function(request, status, error) {
							alert(error);
							bln = false;
						},
			timeout : 30000
		});
	}

		
RegisterClass.prototype.loginOut = function(){
	Common.removeStorage("user");
	Common.reverse("#index");
}
		
	
