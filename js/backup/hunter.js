$("#hunter-follow-btn").click(
		function(e) {
			hunterFollowPosition(logindata.userinfoid, $(
					"#hunter-recommand-position-info").attr("jobid"));
		});

$("#hunter-apply-btn")
		.click(
				function(e) {
					hunterApplyPosition(
							logindata.userinfoid,
							$("#hunter-recommand-position-info").attr("jobid"),
							function() {
								document.location = "#hunter-recommand-position-info-cop"
							});
				});
$("#hunter-contact-add-btn").click(function() {
	var json = {};

	$("#hunter-contact-add .ui-content input").each(function(index) {
		var name = $(this).attr("name");
		var value = $(this).val();
		json[name] = value;
	});
	json["userinfoid"] = logindata.UserInfoId;
	alert(JSON.stringify(json));
	addHunterContact(json);
});

var loadRecommandPosition = function(userinfoid, target, pageindex) {

	$.ajax({
		url : getServerHost() + "/api/JobPosition/Recommend?pageIndex="
				+ pageindex + "&pageSize=10&userinfoId=" + userinfoid,
		method : "get",
		success : function(rtnmsg) {
			var json = rtnmsg.list;
			for (var i = 0; i < json.length; i++) {
				var itemjson = json[i];
				var position = new JobPosition(itemjson,
						"#hunter-recommand-position-info");
				target.append(position.tohtmlSimple());
			}
		},
		error : function(request, status, error) {
			alert(error);
		},
		timeout : 30000
	})
};

var hunterFollowPosition = function(userinfoid, jobid) {
	var param = {
		UserInfoId : userinfoid,
		JobId : jobid
	};
	var url = getServerHost() + "/api/Headhunter/FollowJob";
	// alert(url);
	$.ajax({
		url : url,
		method : "post",
		data : obj2param(param),
		success : function(rtnmsg) {
			alert(JSON.stringify(rtnmsg));
		},
		error : function(request, status, error) {
			alert(error);
		},
		timeout : 30000
	})
};

var hunterApplyPosition = function(userinfoid, jobid, after) {
	var param = {
		UserInfoId : userinfoid,
		JobId : jobid
	};
	var url = getServerHost() + "/api/Headhunter/ApplyJob";
	$.ajax({
		url : url,
		method : "post",
		data : obj2param(param),
		success : function(rtnmsg) {
			alert(JSON.stringify(rtnmsg));
			if (after)
				after();
		},
		error : function(request, status, error) {
			alert(error);
		},
		timeout : 30000
	})
};

var addHunterContact = function(json) {
	var url = getServerHost() + "/api/Headhunter/AddRemark";
	var param = {
		SearchId : json.userinfoid,
		TalentName : json.name,
		Phone : json.phone,
		Email : json.mail,
		Gender : json.gender,
		Tag : json.tag,
		CompanyName : json.companyname,
		CityId : json.cityid,
		Position : json.positionname,
		Salary : json.salary,
		Merit : json.merit,
		MeritContent : json.meritcontent,
		ExpectPosition : json.expectposition,
		ExpectSalary : json.expectSalary,
		ExpectIndustryIds : json.expectindustry,
		ExpectCityIds : json.expectcityid
	};
	$.ajax({
		url : url,
		method : "post",
		data : obj2param(param),
		success : function(rtnmsg) {
			alert(JSON.stringify(rtnmsg));
		},
		error : function(request, status, error) {
			alert(status + error);
		},
		timeout : 30000
	})
}

var loadHunterContactList = function(userinfoid, pageindex) {
	var param = {
		UserInfoId : userinfoid,
		PageIndex : pageindex,
		PageSize : 10
	};
	var url = getServerHost() + "/api/Headhunter/GetTalentPoolList?"
			+ obj2param(param);
	$.ajax({
		url : url,
		method : "get",
		// data : obj2param(param),
		success : function(rtnmsg) {
			alert(JSON.stringify(rtnmsg));
		},
		error : function(request, status, error) {
			alert(error);
		},
		timeout : 30000
	})
};