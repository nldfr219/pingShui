$(".charrole").click(function(event) {
	var chartype = $(event.target).attr("type");
	var redirecturl = $(event.target).attr("redirecturl");
	$.ajax({
		url: getServerHost() + "/api/users/SaveUserRole",
		method: "post",
		data: "UserId="+logindata.UserId+"&UserRole="+chartype,
		success: function(rtnmsg) {
			if(parseInt(rtnmsg.returncode) == 0) {
			//alert(rtnmsg);
				document.location = redirecturl;
			} else {
				alert("server error!");
			}
		},
		error: function(request,status,error) {
			alert(error);
		},
		timeout: 30000
	})
});