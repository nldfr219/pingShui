var UserCompany = function() {

};

UserCompany.prototype.save = function(){
	    var param = {
			UserCompanyId : $("#uc-hidden-ucid").val(),
			UserId : Common.userInfo().UserId,
			UserInfoId: Common.userInfo().UserInfoId,
			CompanyName : $("#uc-input-company").val(),
			Position: $("#uc-input-position").val(),
			CityId: $("#uc-hidden-city").val(),
			StartDatePost:$("#uc-input-start").val(),
			EndDatePost:$("#uc-input-end").val()
		};
		var bln = false;
		Common.loading();
		$.ajax({
			url : Common.getServerHost() + "/api/users/SaveUserCompany",
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
