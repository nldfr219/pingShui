var Card = function(json) {
	this.userinfoid = json.UserInfoId;
	for(key in json) {
		this[key] = json[key];
	}
}

Card.prototype.send = function(json) {
	var param = {
		Originator: Common.LOGIN_DATA().UserInfoId,
		Sendee: json.to,
		Type:1,
		ExpectPosition: json.positionid,
		CityId: json.cityid
	};
	$.ajax({
		url : getServerHost() + "/api/users/ExchangeCard",
		method : "post",
		data : obj2param(param),
		async : false,
		success : function(rtnmsg) {
			alert(JSON.stringify(rtnmsg));
			if (parseInt(rtnmsg.returncode) == 0) {
				
			} else {
				alert("server error!");
			}
		},
		error : onerror,
		timeout : 30000
	})
}

Card.prototype.tohtml = function () {
	var html = "<div class='ui-grid-a'>"
		+ "<div class='ui-block-a card-icon'><img src='"+this.Avatar+"' /></div>"
		+ "<div class='ui-block-b card-info'><div><h1>"+this.RealName+"</h1></div><div><h1>"+this.Position+"</h1></div><div><h1>"+this.CompanyName+"</h1></div><div><h1>"+this.Phone+"</h1></div></div>";
		+ "</div>";
	return html;
}