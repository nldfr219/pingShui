var UserEducation = function() {

};

UserEducation.prototype.save = function(){
	    var param = {
			UserEducationId : $("#ue-hidden-ueid").val(),
			UserId : Common.userInfo().UserId,
			UserInfoId: Common.userInfo().UserInfoId,
			SchoolName : $("#ue-input-school").val(),
			Major: $("#ue-input-major").val(),
			EducationId: $("#ue-hidden-education").val(),
			StartDatePost:$("#ue-input-start").val(),
			EndDatePost:$("#ue-input-end").val()
		};
		var bln = false;
		Common.loading();
		$.ajax({
			url : Common.getServerHost() + "/api/users/SaveUserEducation",
			method : "post",
			data : Common.obj2param(param),
			async : false,
			success : function(rtnmsg) {
				if (parseInt(rtnmsg.returncode) == 0) {
				    Common.localJsonStorage("user",rtnmsg.result);
				    
				    var userDetail = new UserDetail();
				    userDetail.mydetail(2);
				    
				} else {
				    
					alert(rtnmsg.message);
					
				}
			},
			error :function(request, status, error) {
							alert(error);
							bln = false;
						},
			timeout : 30000
		});

}
