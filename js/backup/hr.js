$("#save-company-info-btn").click(function(e) {
	saveHrCompanyInfo(logindata.CompanyId, logindata.UserId);
});

$("#hr-job-info-submit").click(function(e){
	hrAddPosition(logindata.CompanyId, logindata.UserInfoId);
});

var loadHrPositionData = function(dest) {
	$.ajax({
		url : getServerHost()
				+ "/api/jobposition/GetJobPositionWithUser?pageIndex=1" 
				+ "&pageSize=10&userInfoId=" + logindata.UserInfoId,
		method : "get",
		dataType : "json",
		success : function(rtnmsg) {
			var list = rtnmsg.list
			for (index in list) {
				var item = list[index];
				var position = new JobPosition(item);
				try{
				dest.append(position.tohtmlSimple());
				} catch (e) {
					alert(e.message);
				}
			}
		},
		error : function(request, status, error) {
			alert(error);
		},
		timeout : 30000
	})
};

var saveHrCompanyInfo = function(companyid, userid) {
	if(companyid == 0) {
		addHrCompanyInfo(companyid, userid);
	} else {
		updateHrCompanyInfo(companyid, userid);
	}
};

var addHrCompanyInfo = function(companyid, userid) {
	var param = {
			UserId: userid,
			CompanyName: $("#user-company-info-companyname").val(),
			Url: $("#user-company-info-url").val(),
			Industry: $("#user-company-info-industry").attr("selecteditem"),
			DisplayName: $("#user-company-info-displayname").val(),
			Logo: $("#user-company-info-logo").val(),
			CityId: $("#user-company-info-cityid").attr("selecteditem"),
			Property: $("#user-company-info-property").attr("selecteditem"),
			Address: $("#user-company-info-address").val(),
			Phase: $("#user-company-info-phase").attr("selecteditem"),
			Scale: $("#user-company-info-scale").attr("selecteditem"),
			BusinessLicence: $("#user-company-info-license").val(),
			BrightPoints: $("#user-company-info-highlight").val(),
			Description: $("#user-company-info-description").val(),
			Tag: $("#user-company-info-tag").val()
	};
	//alert("add:"+obj2param(param));
	$.ajax({
		url : getServerHost()+"/api/company/add",			
		method : "post",
		dataType : "json",
		data: obj2param(param),
		success : function(rtnmsg) {
			var companyid = rtnmsg.result
			logindata.CompanyId = companyid;
			//alert(JSON.stringify(rtnmsg));
		},
		error : function (e) {
			alert(e.message);
		}
		
	});
};

var updateHrCompanyInfo = function(companyid, userid) {
	var param = {
			UserId: userid,
			CompanyId: companyid,
			CompanyName: $("#user-company-info-description").val(),
			Url: $("#user-company-info-url").val(),
			Industry: $("#user-company-info-industry").attr("selecteditem"),
			DisplayName: $("#user-company-info-displayname").val(),
			Logo: $("#user-company-info-logo").val(),
			CityId: $("#user-company-info-cityid").attr("selecteditem"),
			Property: $("#user-company-info-property").attr("selecteditem"),
			Address: $("#user-company-info-address").val(),
			Phase: $("#user-company-info-phase").attr("selecteditem"),
			Scale: $("#user-company-info-scale").attr("selecteditem"),
			BusinessLicence: $("#user-company-info-licence").val(),
			BrightPoints: $("#user-company-info-highlight").val(),
			Description: $("#user-company-info-description").val(),
			Tag: $("#user-company-info-tag").val()
	};
	//alert("update:"+obj2param(param));

	$.ajax({
		url : getServerHost()+"/api/company/update",			
		method : "post",
		dataType : "json",
		data: obj2param(param),
		success : function(rtnmsg) {
			//alert(JSON.stringify(rtnmsg));
		},
		error : function (e) {
			alert(e.message);
		}
		
	});
};



var hrAddPosition = function(companyid, userinfoid) {
	var param = {
		CompanyId: companyid,
		UserInfoId: userinfoid,
		JobName: $("#hr-job-info-jobname").val(),
		Report: $("#hr-job-info-report").val(),
		Members: $("#hr-job-info-members").val(),
		Recruitment: $("#hr-job-info-recruitment").val(),

		CityId: $("#hr-job-info-city").attr("selecteditem"),
		Salary: $("#hr-job-info-salary").val(),
		Description: $("#hr-job-info-description").val(),
		Requirement: $("#hr-job-info-requirement").val(),
		ReactionTime: $("#hr-job-info-reactiontime").val()
	};
	$.ajax({
		url : getServerHost()+"/api/jobposition/save",			
		method : "post",
		dataType : "json",
		data: obj2param(param),
		success : function(rtnmsg) {
			alert(JSON.stringify(rtnmsg));
			loadHrPositionData($(".position-list"));
		},
		error : function (e) {
			alert(e.message);
		}
		
	});
};

var hrSaveRequirement = function(jobid) {
	var param = {
			JobId: jobid,
			Experience: $("#hr-job-info-experience").val(),
			Education: $("#hr-job-info-education").attr("selecteditem"),
			Language: $("#hr-job-info-language").attr("selecteditem"),
			ExpectIndustryIds: $("#hr-job-info-expectIndustryid").attr("selecteditem"),
			ExpectCityIds: $("#hr-job-info-expectcityid").attr("selecteditem")
		};
		$.ajax({
			url : getServerHost()+"/api/jobposition/SaveRequirement",			
			method : "post",
			dataType : "json",
			data: obj2param(param),
			success : function(rtnmsg) {
				alert(JSON.stringify(rtnmsg));
			},
			error : function (e) {
				alert(e.message);
			}
		});
};

var hrSavePayMode = function(jobid) {
	var param = {
			JobId: jobid,
			Salary: $("#hr-job-info-salary").val(),
			PayMode: $("#hr-job-info-paymodel").attr("selecteditem"),
			PayPercent: $("#hr-job-info-paypercent").val(),
			PayMoney: $("#hr-job-info-paymoney").val(),
		};
		$.ajax({
			url : getServerHost()+"/api/jobposition/SaveRequirement",			
			method : "post",
			dataType : "json",
			data: obj2param(param),
			success : function(rtnmsg) {
				alert(JSON.stringify(rtnmsg));
			},
			error : function (e) {
				alert(e.message);
			}
		});
};