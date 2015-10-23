var JobPosition = function(json,renderto) {
	this.companyid = json.CompanyId;
	this.userinfoid = json.UserInfoId;
	this.name = json.JobName;
	this.cityid = json.CityId;
	this.report = json.Report;
	this.membercount = json.Members;
	this.recruitcount = json.Recruiment;
	this.salary = json.Salary;
	this.duty = json.Requirement;
	this.replytime = json.ReactionTime;
	this.description = json.Description;
	this.jobid = json.JobId;
	this.renderto = renderto;
};

JobPosition.prototype.save = function() {
	var param = {
		CompanyId : this.companyid,
		UserInfoId : this.userinfoid,
		JobName : this.name,
		Report : this.report,
		Members : this.membercount,
		Recruitment : this.recruitcount,
		CityId : this.cityid,
		Salary : this.salary,
		Description : this.description,
		Requirement : this.duty,
		ReactionTime : this.replytime
	};
	$.ajax({
		url : getServerHost() + "/api/jobposition/save",
		method : "post",
		dataType : "json",
		data : obj2param(param),
		success : function(rtnmsg) {
			this.jobid = rtnmsg.result;
		},
		error : function(e) {
			alert(e.message);
		}

	});
};

JobPosition.prototype.tohtmlFull = function() {
	var html = "<div class='jobitem' renderto='"+this.renderto+"'>" + "<table>" + "<tr>"
	+ "<th class='jobname'>"
	+ this.name
	+ "</th>"
	+ "</tr>"
	+ "</table>" + "</div> full content";
	return html;
};

JobPosition.prototype.tohtmlSimple = function() {
	var html = "<div class='jobitem' renderto='"+this.renderto+"'>" + "<table>" + "<tr>"
	+ "<th class='jobname'>"
	+ this.name
	+ "</th>"
	+ "</tr>"
	+ "</table>" + "</div>";
	var obj = $(html);
	
	var fullhtml = this.tohtmlFull();
	
	
	if(this.renderto) {
		$(this.renderto).attr("jobid",this.jobid);
		obj.click(function(e){
			//alert($(this).attr("renderto"));
			$($(this).attr("renderto") + " .ui-content").html(fullhtml);
			document.location = $(this).attr("renderto");
		});
	}
	return obj;
};
