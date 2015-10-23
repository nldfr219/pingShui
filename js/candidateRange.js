var $candidateRange = null;
var CandidateRange = function() {
    $candidateRange = this;
}

CandidateRange.prototype.init = function(type) {
	if(type == 1)
	{
		$("#ar-label-industry").text("");
		$("#ar-hidden-industry").val("");
		
		$("#ar-label-jobType").text("");
		$("#ar-hidden-jobType").val("");
		
		$("#ar-label-city").text("");
		$("#ar-hidden-city").val("");
		
		$("#ar-label-cacity").text("");
		$("#ar-hidden-cacity").val("");
		
		$("#ar-label-language").text("");
		$("#ar-hidden-language").val("");
		
		$(".devareaadd").show();
		
		$("#area-back").attr("href","#userRoleSelect");
		
		$("#area-next").text("下一步");
		$("#area-next").click(function(){
	
	    	var range = new CandidateRange();
			var bln = range.save(type);
	    	if(bln)
	    	{
		    	var home = new Home();
				home.init();
				Common.redirect("#all-home");
			}
		});
	}
	else
	{
		var user = Common.userInfo();
		
		$("#ar-label-industry").text(user.ExpectIndustryNames);
		$("#ar-hidden-industry").val(user.ExpectIndustryIds);
		
		$("#ar-label-jobType").text(user.ExpectJobTypeNames);
		$("#ar-hidden-jobType").val(user.ExpectJobTypeIds);
		if(user.CityId != 0)
		{
		$("#ar-label-city").text(user.CityName);
		$("#ar-hidden-city").val(user.CityId);
		}
		
		$("#ar-label-cacity").text(user.ExpectCityNames);
		$("#ar-hidden-cacity").val(user.ExpectCityIds);
		
		$("#ar-label-language").text(user.ExpectLanguageNames);
		$("#ar-hidden-language").val(user.ExpectLanguageIds);
		
		$("#ar-input-candidate").val(user.CandidateNumber);
		$("#ar-input-recommend").val(user.RecommendNumber);
		
		$(".devareaadd").hide();
		
		$("#area-back").attr("href","#hr-view-hunter-edit");
		
		$("#area-next").text("保存");
		$("#area-next").click(function(){
	
	    	var range = new CandidateRange();
			var bln = range.save(type);
	    	if(bln)
	    	{
		    	var userDetail = new UserDetail();
				userDetail.mydetail(2);
			}
		});
	}
}


CandidateRange.prototype.save = function(type) {
    var bln = false;
	if($candidateRange.validate(type))
	{
		try{
		
			var param = {
			UserInfoId : Common.userInfo().UserInfoId,
			ExpectIndustryIds : $("#ar-hidden-industry").val(),
			ExpectCityIds:$("#ar-hidden-cacity").val(),
			ExpectJobTypeIds:$("#ar-hidden-jobType").val(),
			ExpectLanguageIds:$("#ar-hidden-language").val(),
			CityId:$("#ar-hidden-city").val()
		};
		
		Common.loading();
		$.ajax({
			url : Common.getServerHost() + "/api/users/SaveExpect",
			method : "post",
			data : Common.obj2param(param),
			async : false,
			success : function(rtnmsg) {
				if (parseInt(rtnmsg.returncode) == 0) {
				   
				    bln = true;
				    Common.localJsonStorage("user",rtnmsg.result);
				    Common.stopload();
				} else {
				    Common.stopload();
					alert(rtnmsg.message);
					bln = false;
				}
			},
			error :function(request, status, error) {
			Common.stopload();
							alert(error);
							bln = false;
							
						},
			timeout : 30000
		});
		
		}
		catch(e)
		{
		    Common.stopload();
		    bln = false;
		}
	}
	return bln;
};

CandidateRange.prototype.validate = function(type) {
	
	var bln = true;
	if($("#ar-hidden-industry").val() == "")
	{
		alert('请选择专注行业！');
		bln=false;
	}
	
	if($("#ar-hidden-jobType").val() == "")
	{
		alert('请选择专注职能！');
		bln=false;
	}
	
	if(type == 1)
	{
	if($("#ar-hidden-city").val() == "")
	{
		alert('请选择所在城市！');
		bln=false;
	}
	
	if($("#ar-hidden-language").val() == "")
	{
		alert('请选择语言技能！');
		bln=false;
	}
	}
	
	if($("#ar-hidden-cacity").val() == "")
	{
		alert('请选择候选人分布城市！');
		bln=false;
	}
	
	
	
	return bln;
};
