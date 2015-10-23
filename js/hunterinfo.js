var HunterInfo = function(json) {
	//alert(JSON.stringify(json));
	this.userinfoid = json.UserInfoId;
	this.name = json.RealName;
	this.title = json.Position;
	this.location = json.CityName;
	this.focus = "";
	this.exp = json.WorkingTime;
	
	this.brief = json.brief;
	
	this.phone = json.Phone;
	
	this.education = "";
	this.work = "";
	this.icon = json.Avatar;
};

HunterInfo.prototype.toBriefInfo = function(click) {
	var html = $("<li userinfoid='"+this.userinfoid+"'><a >"
		+ "<div><img src='json.icon' width='100%'/></div>"
		+ "<div><label><h1>"+this.name+"</h1></label><span>"+this.title + "/"+this.exp + " @ " + this.location +"</span></div>"
		+ "<div><span>最近半年HR评价:</span></div>"
		+ "</a></li>");
	if(click != undefined) {
		return html.click(click);
	}
	return html;
};


HunterInfo.prototype.toCard = function() {
	
};

