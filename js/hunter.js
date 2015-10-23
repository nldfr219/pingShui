var Hunter = function(json) {
	this.orijson = json;
	for (key in json) {
		this[key] = json[key];
	}
};

Hunter.prototype.findContactway = function(method) {
	for (var i = 0; i < this.contactway.length; i++) {
		var item = this.contactway[i];
		if (item.method == method)
			return item.value;
	}
	return "";
};

Hunter.prototype.toBriefHtml = function() {
	var html = "<li><a json='" + JSON.stringify(this.orijson) + "'>"
			+ "<div class='listimg'><img style='width:100%' src='"
			+ getServerUrl() + "/" + this.icon + "' /></div>"
			+ "<div class='ui-grid-a'>" + "<div class='ui-block-a'><h1>"
			+ this.name + "</h1></div>" + "<div class='ui-block-b'><span style='font-size:1em'>"
			+ this.vitae[0].position + " @ "+ this.base +  " on "+findValueFromBaseData("industry",this.focusarea.industry[0].industryid)+"<br />最近半年的HR评价:</span></div>" + "</div>" + "</a></li>";
	return $(html).children("a").click(function() {
		var hunterjson = JSON.parse($(this).attr("json"));
		$("#exchange-card ul").attr("userid", hunterjson.id);
		$("#hunter-detail ul").html(new Hunter(hunterjson).toInfoHtml());
		$("#hunter-detail .exchange-card").click(function() {
			$("#exchange-card ul").addClass("usercardimage");

			document.location = "#exchange-card";
		})
		document.location = "#hunter-detail";
	});
}

Hunter.prototype.toCardHtml = function() {
	var json = this.orijson
	var html = "<div class='cardinfo ui-grid-a' userid='"+json.id+"'>"
		+ "<div class='ui-block-a'><img style='width:80%' src='"+getServerUrl()+"/"+json.icon+"' /></div>"
		+ "<div class='ui-block-b'>"
		+ "<label>"+json.name+"</label>"
		+ "<label>"+json.vitae[0].position+"@"+ json.vitae[0].name+"</label>"
		+ "<label>"+json.contactway[1].method + ":"+json.contactway[1].value +"</label>"
		+ "<label>"+json.contactway[0].method + ":"+json.contactway[0].value +"</label>"
		+ "</div>"
		+ "</div>"
	return html;
}

Hunter.prototype.toInfoHtml = function() {
	var vitaehtml = "<div>"
	for (var i = 0; i < this.vitae.length; i++) {
		var item = new Vitae(this.vitae[i]);
		vitaehtml += item.tohtml();
	}
	vitaehtml += "</div>"

	var info = new FocusArea(this.focusarea).tohtml() + "<div>"
			+ "<label>最近一年联系过候选人: " + this.focusarea.contactcount + "</label>"
			+ "</div>" + "<div>" + "<label>最近一年推荐面试的候选人: "
			+ this.focusarea.interviewcount + "</label>" + "</div>" + "<div>"
			+ "<label>服务候选人平均年薪: " + this.focusarea.salary + "</label>"
			+ "</div>" + "<div>" + "<label>服务候选人主要技能: " + this.focusarea.skill
			+ "</label>" + "</div>"

	var html = "<img  src='" + getServerUrl() + "/" + this.icon + "' />"
			+ "<a class='ui-btn exchange-card' to='" + this.userid
			+ "'>交换名片</a>" + "<ul data-role='listview' >" + "<li><label>"
			+ this.name + "</lable><label>" + this.vitae[0].name + " in "
			+ this.base + "</label>"
			+ "<li><div><label>企业印象</label></div><div>暂无</div></li>"
			+ "<li><div><label>联系方式</label></div><div>" + vitaehtml
			+ "</div></li>" + "<li><div><label>猎头信息</label></div><div>" + info
			+ "</div></li>" + "</ul>";
	return html;
};

var Vitae = function(json) {
	for (key in json) {
		this[key] = json[key]
	}
}

Vitae.prototype.tohtml = function() {
	var html = "<div>" + "<label>" + this.position + " at " + this.name
			+ "</label>" + "</div>" + "<div>" + "<span>" + this.dfrom
			+ "</span>-<span>" + this.dto + "</span> | <span>" + this.city
			+ "</span>" + "</div>"
	return html;
}

var FocusArea = function(json) {
	this.city = json.city;
	this.jobtype = json.jobtype;
	this.industry = json.industry;
}

FocusArea.prototype.tohtml = function() {
	var industryhtml = "<div><label>专注行业: ";
	for (var i = 0; i < this.industry.length; i++) {
		var item = this.industry[i];
		if (i != 0)
			industryhtml += "/";
		industryhtml += findValueFromBaseData("industry",item.industryid);
	}
	industryhtml += "</label></div>";
	var jobtypehtml = "<div><label>专注职能: ";
	for (var i = 0; i < this.jobtype.length; i++) {
		var item = this.jobtype[i];
		if (i != 0)
			jobtypehtml += "/";
		jobtypehtml += findValueFromBaseData("jobType",item.jobtype);
	}
	jobtypehtml += "</label></div>";
	var cityhtml = "<div><label>人脉分布: ";
	for (var i = 0; i < this.city.length; i++) {
		var item = this.city[i];
		if (i != 0)
			cityhtml += "/";
		cityhtml += findValueFromBaseData("city",item.cityid);
	}
	cityhtml += "</label></div>";

	return industryhtml + jobtypehtml + cityhtml;
}
