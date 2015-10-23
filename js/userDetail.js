var $userDetail = null;
var UserDetail = function() {
	$userDetail = this;
};

UserDetail.prototype.init = function(userInfoId,currentInfoId,type) {


	    var param = {
			userInfoId:userInfoId,
			currentUserInfoId: currentInfoId
		};
		var total = 0;
		$.ajax({
			url : Common.getServerHost() + "/api/users/GetUserDetail?"+Common.obj2param(param),
			method : "get",
			success : function(msg) {
				if(msg.returncode == 0)
				{
				
				    if(msg.result != null)
				    {
				        var user = msg.result;
				        
                        
                        $userDetail.initdetail(user,2);

					}
				}
				else
				{
					alert(msg.message);
				}
			},
			error : onerror,
			timeout : 30000
		});
}

UserDetail.prototype.mydetail = function(type)
{
    $("#exchangeCardDiv").hide();
    $("#infofooterPanel").show();
    
	var info = Common.userInfo();
	$userDetail.initdetail(info,1);
	
    //绑定编辑界面
    $userDetail.initEdit(info);

	if(type ==1)
	{
	    Common.redirect("#hr-view-hunter-infomation");
	}
	else
	{
	    Common.reverse("#hr-view-hunter-edit");
	}
	
	$("#user-info-back").unbind("click");
	
	$("#user-info-back").click(function(){
		Common.reverse("#all-home");
	});
}

UserDetail.prototype.initdetail = function(user,type)
{
    var info = new UserDetailInfo(user);

	var imgwidth = $(window).width();
    var imgheight = (imgwidth/3) *2;
    $("#hrv-avatar").width(imgwidth).height(imgheight);
				    	
	$("#hrv-avatar").attr("src",info.UploadeAvatar);
	$("#info-name").text(info.RealName);
	$("#info-title").text(info.Title);
	$("#info-summary").text(info.Summary);
	
	$("#de-info-industry").text(info.ExpectIndustry);
	$("#de-info-jobType").text(info.ExpectJobType);
	$("#de-info-areaClity").text(info.ExpectCity);
	$("#de-info-language").text("您的语言技能：" + info.ExpectLanguageNames);
	
	
	$("#de-info-usercompany").html('');
	//工作经历
	for(var i=0 ;i< info.UserCompanys.length;i++)
	{

		var position = Common.getDisplayText(info.UserCompanys[i].Position);
		var company = Common.getDisplayText(info.UserCompanys[i].CompanyName);
		var ucid= info.UserCompanys[i].UserCompanyId;
		var cityId = info.UserCompanys[i].CityId;
		var cityName = Common.getDisplayText(info.UserCompanys[i].CityName);
		var start = info.UserCompanys[i].StartDate;
		var end = info.UserCompanys[i].EndDate;
		var mouth = info.UserCompanys[i].Mounth;

		$("#de-info-usercompany").append("<div class='u-title margin1em' ><img class='company' src='/img/company.png'/>&nbsp;&nbsp;" +position+ " at "+company+"</div>");
		
		var time = "";
		if(start != '')
		{
			time = start;
			if(end == '')
			{
				time += "-至今";
			}
			else
			{
				time += "-" + end ;
				if(mouth != 0)
				{
					time +=  " (" + mouth + "个月)";
				}
			}
		}
		
	    $("#de-info-usercompany").append("<div class='u-note-c'>&nbsp;&nbsp;&nbsp;&nbsp;"+ time +" | " + cityName + "</div>");

	}
	
	$("#de-info-usereducation").html('');
	//教育经历
	for(var i=0 ;i< info.UserEducations.length;i++)
	{
		
	
		var school = Common.getDisplayText(info.UserEducations[i].SchoolName);
		var major = Common.getDisplayText(info.UserEducations[i].Major);
		var ueid= info.UserEducations[i].UserEducationId;
		var educationId = info.UserEducations[i].EducationId;
		var educationName = Common.getDisplayText(info.UserEducations[i].EducationName);
		var start = info.UserEducations[i].StartDate;
		var end = info.UserEducations[i].EndDate;
		
		$("#de-info-usereducation").append("<div class='u-title margin1em' ><img class='school' src='/img/school.png'/>&nbsp;&nbsp;" + school + "</div>");
		$("#de-info-usereducation").append("<div class='u-note-c'>&nbsp;&nbsp;&nbsp;&nbsp;" + major + " | " + educationName + "</div>");
		
		var time = "";
		if(start != '')
		{
			time = start;
			if(end == '')
			{
				time += "-至今";
			}
			else
			{
				time += "-" + end ;
			}
		}
		
	    $("#de-info-usereducation").append("<div class='u-note-c'>&nbsp;&nbsp;&nbsp;&nbsp;" + time + "</div>");
	}


}

UserDetail.prototype.initEdit = function(user)
{
	var info = new UserDetailInfo(user);

	$("#edit-info-realname").val(Common.getDisplayText(info.RealName));
	$("#edit-info-englishname").val(Common.getDisplayText(info.EnglishName));
	$("#edit-info-position").val(Common.getDisplayText(info.Position));
	$("#edit-info-company").val(Common.getDisplayText(info.CompanyName));
	$("#edit-info-city-val").val(Common.getDisplayText(info.CityId));
	
	if(Common.getDisplayText(info.WorkingTime) =="" )
	{
		$("#edit-info-work-display").hide();
		$("#edit-info-work").show();
	}
	else
	{
	    $("#edit-info-work-display").show();
	    $("#edit-info-work").hide();
		$("#edit-info-work-display span").text(info.work);
		$("#edit-info-work").val(Common.getDisplayText(info.WorkingTime));
	}
	
	$("#edit-info-summary").val(Common.getDisplayText(info.Summary));
	
	$("#edit-info-industry").text(info.ExpectIndustry);
	$("#edit-info-jobType").text(info.ExpectJobType);
	$("#edit-info-areaCity").text(info.ExpectCity);
	$("#edit-info-city").html(info.city);
	$("#edit-info-city-val").val(info.CityId);
	$("#edit-info-language").text("您的语言技能：" + info.ExpectLanguageNames);
	
	
	$("#edit-info-phone").val(Common.getDisplayText(info.Telephone));
	$("#edit-input-email").val(Common.getDisplayText(info.Email));
	$("#edit-input-weixin").val(Common.getDisplayText(info.Weixin));
	
	$("#edit-info-usercompany").html('');
	//工作经历
	for(var i=0 ;i< info.UserCompanys.length;i++)
	{
		
	
		var position = Common.getDisplayText(info.UserCompanys[i].Position);
		var company = Common.getDisplayText(info.UserCompanys[i].CompanyName);
		var ucid= info.UserCompanys[i].UserCompanyId;
		var cityId = info.UserCompanys[i].CityId;
		var cityName = Common.getDisplayText(info.UserCompanys[i].CityName);
		var start = info.UserCompanys[i].StartDate;
		var end = info.UserCompanys[i].EndDate;
		var mouth = info.UserCompanys[i].Mounth;
		
		var div = $("<div ucid='"+ ucid +"' cityid='"+ cityId +"' start='"+ start +"' end='" + end + "' ></div>");
		div.append("<div class='grayline'> </div>");
		div.append("<div class='u-title' >&nbsp;&nbsp;<span class='ucl-po'>" + position + "</span> at <span class='ucl-co'>" + company + "</span></div>");
		
		var time = "";
		if(start != '')
		{
			time = start;
			if(end == '')
			{
				time += "-至今";
			}
			else
			{
				time += "-" + end ;
				if(mouth != 0)
				{
					time +=  " (" + mouth + "个月)";
				}
			}
		}
		
	    div.append("<div class='eu-note-c'>" + time + " | <span class='ucl-cn'>"+ cityName +"</span></div>");

		

		$("#edit-info-usercompany").append(div);
	}
	
	$("#edit-info-userEducation").html('');
	//教育经历
	for(var i=0 ;i< info.UserEducations.length;i++)
	{
		
	
		var school = Common.getDisplayText(info.UserEducations[i].SchoolName);
		var major = Common.getDisplayText(info.UserEducations[i].Major);
		var ueid= info.UserEducations[i].UserEducationId;
		var educationId = info.UserEducations[i].EducationId;
		var educationName = Common.getDisplayText(info.UserEducations[i].EducationName);
		var start = info.UserEducations[i].StartDate;
		var end = info.UserEducations[i].EndDate;
		
		var div = $("<div ueid='"+ ueid +"' educationId='"+ educationId +"' start='"+ start +"' end='" + end + "' ></div>");
		div.append("<div class='grayline'> </div>");
		div.append("<div class='u-title' >&nbsp;&nbsp;<span class='uel-sc'>" + school + "</span></div>");
		
		var time = "";
		if(start != '')
		{
			time = start;
			if(end == '')
			{
				time += "-至今";
			}
			else
			{
				time += "-" + end ;
			}
		}
		
	    div.append("<div class='eu-note-c'><span class='uel-ma'>" + major + "</span>,<span class='uel-eu'>"+ educationName +"</span>" + time +  "</div>");

	
		$("#edit-info-userEducation").append(div);
	}


}

UserDetail.prototype.save = function()
{
    var bln = false;
	try
	{
	    //Avatar
		var param = {
		    UserId : Common.userInfo().UserId,
		    UserInfoId : Common.userInfo().UserInfoId,
			RealName : $("#edit-info-realname").val(),
			EnglishName : $("#edit-info-englishname").val(),
			CompanyName : $("#edit-info-company").val(),
			Position : $("#edit-info-position").val(),
			WorkingTime : $("#edit-info-work").val(),
			Telephone : $("#edit-info-phone").val(),
			Email : $("#edit-input-email").val(),
			Weixin : $("#edit-input-weixin").val(),
			Summary : $("#edit-info-summary").val(),
			CityId : $("#edit-info-city-val").val()
		};
		
		Common.loading();
		$.ajax({
			url : Common.getServerHost() + "/api/users/SaveDetail",
			method : "post",
			data : Common.obj2param(param),
			async : false,
			success : function(rtnmsg) {
				if (parseInt(rtnmsg.returncode) == 0) {
				    Common.localJsonStorage("user",rtnmsg.result);
				    bln = true;
				} else {
				    
					alert(rtnmsg.message);
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
	catch(e)
	{
	    bln = false;
		Common.stopload();
	}
	
	return bln;
}

var UserDetailInfo = function(json)
{
	for(key in json) {
		this[key] = json[key];
	}

    this.Avatar = Common.defaultAvatar2();
	if(json.Avatar != null && json.Avatar != "")
	{
		this.Avatar = Common.getImgServerHost() + json.Avatar;
	}
	
	this.UploadeAvatar = Common.defaultAvatar();
	if(json.Avatar != null && json.Avatar != "")
	{
		this.UploadeAvatar = Common.getImgServerHost() + json.Avatar;
	}

    this.Title = "";
    if(json.Position != null &&  json.Position !="")
    {
    	this.Title += json.Position;
    	this.Position =  json.Position
    }
    
    this.work = '';
    if(json.WorkingTime != null &&  json.WorkingTime != 0)
    {
    	this.Title += "/"+ json.WorkingTime + '年';
    	this.work = json.WorkingTime + '年工作经验';
    }
    
    this.city = '';
    if(Common.getDisplayText(json.CityName) != '')
    {
    	this.Title += " @"+ json.CityName;
    	this.city = json.CityName;
    }
    else
    {
    	this.city = "<span class='gray'>请选择城市</span>";
    }
    
    this.ExpectIndustry = '专注行业：';
    if(Common.getDisplayText(json.ExpectIndustryNames) != '')
    {
    	this.ExpectIndustry += Common.getDisplayText(json.ExpectIndustryNames) ;
    }
    
    this.ExpectJobType = '专注职能：';
    if(Common.getDisplayText(json.ExpectJobTypeNames) != '')
    {
    	this.ExpectJobType += Common.getDisplayText(json.ExpectJobTypeNames) ;
    }
    
    this.ExpectCity = '人脉分布：';
    if(Common.getDisplayText(json.ExpectCityNames) != '')
    {
    	this.ExpectCity += Common.getDisplayText(json.ExpectCityNames) ;
    }
    
    this.Candidate = '最近一年联系过的候选人：';
    if(Common.getDisplayText(json.CandidateNumber) != '')
    {
    	this.Candidate += Common.getDisplayText(json.CandidateNumber)  + '人';
    }
    
    this.Recommend = '最近一年推荐面试的候选人：';
    if(Common.getDisplayText(json.RecommendNumber) != '')
    {
    	this.Recommend += Common.getDisplayText(json.RecommendNumber)  + '人';
    }
};