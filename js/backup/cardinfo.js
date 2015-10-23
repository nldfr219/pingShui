$("#submit-card-info-btn").click(function(){
	var data = "UserId="+logindata.UserId+"&RealName="+$("#card-name").val()+"&Position="+$("#card-position").val()+"&Email="+$("#card-mail").val()+"&CompanyName="+$("#card-company").val();
	$.ajax({
		url: getServerHost() + "/api/users/save",
		method: "post",
		data: data,
		success: function(rtnmsg) {
			if(parseInt(rtnmsg.returncode) == 0) {
				document.location = "#role";
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