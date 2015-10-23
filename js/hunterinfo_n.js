var $hunterInfo = null;
var ccityids,cindustryids,clanguageids,clistTag;
var cpageSize;
var HunterInfo = function(json) {
	//alert(JSON.stringify(json));
	if(json != undefined && json != null)
	{
	this.userinfoid = json.UserInfoId;
	this.name = "";
	if(Common.getDisplayText(json.EnglishName) != '')
	{
		this.name = Common.getDisplayText(json.EnglishName);
	}
	else
	{
		this.name = Common.getDisplayText(json.RealName);
	}
	
	this.work = '';
	if(Common.getDisplayText(json.WorkingTime) != '')
	{
		this.work= " " + Common.getDisplayText(json.WorkingTime)+'年';
	}
	
	
	this.title = "";
	if(json.Position != null)
	{
		this.title = " " + json.Position ;
	}
	
	this.location = "";
	if(json.CityName != null)
	{
		this.location = "&nbsp;&nbsp;<img src='img/listcity.png' width='8' height='12' />&nbsp;"+json.CityName;
	}
	
	this.industry = "";
	if(json.IndustryName != null)
	{
		this.industry = "&nbsp;&nbsp;<img src='img/listindustry.png' width='4' height='12' />&nbsp;" + json.IndustryName;
	}
	
	this.focus = "";
	this.exp = "";
	if(json.WorkingTime !=0)
	{
		this.exp = "/" + json.WorkingTime + "年";
	}
	
	this.brief = json.brief;
	
	this.phone = json.Phone;
	
	this.education = "";
	this.work = "";
	
	this.icon = Common.defaultAvatar();
	if(json.Avatar != null && json.Avatar != "")
	{
	this.icon = Common.getImgServerHost() + json.Avatar;
	}
	}
	$hunterInfo = this;
};

HunterInfo.prototype.init = function(type)
{
	$hunterInfo.loadHunterList($("#hunListUl"),1,"","","");
	
	if(type == 2)
	{
		
		Common.reverse("#hr-search-hunter");
	}
	else
	{
		Common.redirect("#hr-search-hunter");
	}
}

HunterInfo.prototype.toBriefInfo = function(click) {
    var imgwidth = $(window).width();
    var imgheight = imgwidth;
    if(imgheight > 300)
    {
    	imgheight = 300;
    }

	var html = $("<li class='devUserlist' userinfoid='"+this.userinfoid+"'><a >"
		+ "<div><img src='"+this.icon+"' width='"+ imgwidth +"' height='"+ imgheight +"' /></div>"
		+ "<div class='lsrow'><span class='lsName'>"+this.name+"</span><span class='lsInfo'>"+this.work +this.title   +this.exp + this.location + this.industry +"</span></div>"
		+ "</a></li>");
	if(click != undefined) {
		return html.click(click);
	}
	return html;
};

HunterInfo.prototype.loadHunterList = function(target, pageindex, cityIds, industryIds, languageIds) {
		//var imgheight = $(window).height();
		//target.height(imgheight);
		ccityids = cityIds;
		cindustryids = industryIds;
		clanguageids = languageIds;
		cpageSize = 10;
        clistTag=target;

		var param = {
			pageIndex:pageindex,
			pageSize: cpageSize,
			cityIds: cityIds,
			industryIds: industryIds,
			languageIds: languageIds
		};
		var total = 0;
		$.ajax({
			url : Common.getServerHost() + "/api/users/GetUserRelationList?"+Common.obj2param(param),
			method : "get",
			success : function(msg) {
				var json = msg.list;
				var total = msg.rowcount;
				clistTag.html("");
				clistTag.append("<li class='lsheader'></li>");
				for (var i = 0; i < json.length; i++) {
					var item = json[i];
					var hunter = new HunterInfo(item);
					clistTag.append(hunter.toBriefInfo(function(e){
						var userDetail = new UserDetail();
					    userDetail.init($(this).attr("userinfoid"),Common.userInfo().UserInfoId,1);
					}));
				}
				
				var page = total/cpageSize;
				
				if((page - pageindex) > 0)
				{
					var moreLi = $("<li class='lsfooter'><center><a href='javascript:void(0)' class='btn' id='hunListMore' >加载更多</a></center></li>");
					moreLi.click(function(){
						$hunterInfo.next();
					});
					clistTag.append(moreLi);
				}
				
				Common.stopload();
				
				
			},
			error : function(request, status, error) {
							alert(error);
							Common.stopload();
						},
			timeout : 30000
		});
	};

HunterInfo.prototype.next = function() {
	var len = $(".devUserlist").length;
	var index = len/cpageSize +1;
	$(".lsfooter").html("<center>加载中...</center>");
	
	var param = {
			pageIndex:index,
			pageSize: cpageSize,
			cityIds: ccityids,
			industryIds: cindustryids,
			languageIds: clanguageids
		};
		var total = 0;
		$.ajax({
			url : Common.getServerHost() + "/api/users/GetUserRelationList?"+Common.obj2param(param),
			method : "get",
			success : function(msg) {
			
			    $(".lsfooter").remove();
				
				var json = msg.list;
				var total = msg.rowcount;
				for (var i = 0; i < json.length; i++) {
					var item = json[i];
					var hunter = new HunterInfo(item);
					clistTag.append(hunter.toBriefInfo(function(e){

							var userDetail = new UserDetail();
							userDetail.init($(this).attr("userinfoid"),Common.userInfo().UserInfoId,1);
						
					}));
				}
				Common.stopload();
				var page = total/cpageSize;
				
				if((page - pageindex) > 0)
				{
					clistTag.append("<li class='lsfooter'><center><a href='javascript:void(0)' class='btn' id='hunListMore' >加载更多</a></center></li>");
				}
				
			},
			error : onerror,
			timeout : 30000
		});
	
}
	
HunterInfo.prototype.getUserDetail = function(param, success) {
		$.ajax({
			url : Common.getServerHost() + "/api/Users/GetUserDetail?"
					+ Common.obj2param(param),
			method : "get",
			async : false,
			success : success,
			error : onerror,
			timeout : 30000
		});
	};


HunterInfo.prototype.toCard = function() {
	
};

