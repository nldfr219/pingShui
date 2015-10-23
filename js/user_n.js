var User = function(json) {
	this.ori_json = json;
	for(key in this.ori_json) {
		this[key] = this.ori_json[key];
	}
};

User.prototype.init = function(){
	var imgwidth = $(window).width();
    var imgheight = (imgwidth/3) *2;

	$("#hrv-avatar").width(imgwidth).height(imgheight);
}


User.prototype.makeCard = function (){
	return new Card(this.ori_json);
};

User.prototype.tohtml = function() {
	var imgwidth = $(window).width();
    var imgheight = (imgwidth/3) *2;
    if(imgheight > 300)
    {
    	imgheight = 300;
    }
	
	var html = "<div>"
		+ "<div><img src='"+ Common.getImgServerHost() + this.Avatar+"' /></div>"
		+ "<div><a class='ui-btn exchange-card-btn' exchange_from='"+this.UserInfoId+"'>交换名片</a></div>"
		+ "<div><label><h1>"+this.RealName+"</h1></label><span>"+this.Position + "/"+this.WorkingTime + " @ " + this.CityName +"</span></div>"
		+ "<div><span>电话:</span><span>"+this.Phone+"</span></div>"
		+ "<div><span>专注行业:</span><span>"+this.ExpectIndustryNames+"</span></div>"
		+ "<div><span>专注职能:</span><span>"+this.ExpectJobTypeNames+"</span></div>"
		+ "<div><span>人脉分布:</span><span>"+this.ExpectCityNames+"</span></div>"
		+ "<div><span>联系过的候选人:</span><span>"+this.AppraiseCount+"</span></div>"
		+ "<div><span>面试的候选人:</span><span>"+this.RecommendNumber+"</span></div>"
		+ "<div><span>平均年薪:</span><span>"+this.ExpectSalarys+"</span></div>"
		+ "<div><span>主要技能:</span><span>"+this.ExpectSkills+"</span></div>"
		+ "</div>";
	return html;
};

var CompanyHist = function(json) {
	
}