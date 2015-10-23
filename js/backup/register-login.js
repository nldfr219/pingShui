var logincheck = function(user, pwd, afterlogin) {
	var result = false;
	$.ajax({
		url : getServerHost() + "/api/users/getuser",
		method : "post",
		async : false,
		data : "phone=" + user + "&password=" + pwd,
		success : function(rtnmsg) {
			if (rtnmsg.result) {
				var json = rtnmsg.result;
				json.Password = pwd;
				saveLoginData(JSON.stringify(json));
				result = true;
				logindata = json;
			}
		},
		error : function(request, status, error) {
			alert("loginerror:" + error);
		},
		timeout : 30000
	});
	return result;
};

var gotoCharPage = function() {
	if (logindata.UserRole == 1) {
		document.location = "#hunter-recommand-position";
	} else if (logindata.UserRole == 2) {
		document.location = "#hr-mine-position";
	} else if (logindata.UserRole == 3) {
		document.location = "#editcardinfo";
	} else {
		document.location = '#role';
	}
}

$("#login-btn").click(function() {
	var user = $("#login-phone").val();
	var pass = $("#login-pwd").val();
	if (logincheck(user, pass)) {
		gotoCharPage();
	} else
		alert("wrong password!");
});

$("#register-btn").click(function() {
	var user = $("#register-phone").val();
	var pwd = $("#register-pwd").val();
	$.ajax({
		url : getServerHost() + "/api/users/register",
		method : "post",
		data : "phone=" + user + "&password=" + pwd,
		success : function(rtnmsg) {
			if (parseInt(rtnmsg.returncode) == 0) {
				// console.log(rtnmsg.result);
				if (logincheck(user, pwd))
					document.location = "#editcardinfo";
			} else {
				alert("server error!");
			}
		},
		error : function(request, status, error) {
			alert(error);
		},
		timeout : 30000
	})
});
