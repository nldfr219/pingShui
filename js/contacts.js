var $contact = null;
var contact_type = 1;
var contact_action = "GetExchangeCardList";
var contact_userInfoId = 0;
var Contacts = function(userInfoId,type,overWay,isback) {// type 1:顾问 2:hr
	$contact = this;
	contact_type = type;
	contact_userInfoId = userInfoId;
	if(type == 1)
	{
		contact_action = "GetExchangeCardList";
	}
	else
	{
		contact_action = "GetHrContactList";
	}
	
	Common.gotoPage("#contacts",overWay,isback);
};

$(function(){

		//联系人列表
	$(".muen-contacts").click(function(){
		var cont = new Contacts(Common.userInfo().UserInfoId,Common.userInfo().UserRole,"slide",false);
	});
	
});

function updateExchagneStatus(exid,status)
{
	$contact.updateStatus(exid,status);
}



$(document).on("pageinit","#contacts",function(){ // 当进入页面二时

	$("#contactlist").html('');
	$("#pendingUserList").html('');

});

$(document).on("pageshow","#contacts",function(){ // 当进入页面二时
	if(contact_type == 1)
	{
		$contact.initListData("#contactlist",1,1,false);
		
	    $contact.initListData("#pendingUserList",1,0,true);
	}
	else
	{
	    $contact.initListData("#contactlist",1,1,false);
		
	    $contact.initListData("#pendingUserList",1,0,false);
	}

	
	
});




Contacts.prototype.initListData = function(id,type,status,isagree){ //type 1:交换名片  2:收藏    status：-1：拒绝，0：未处理，1：同意
		var param = {
			pageIndex:1,
			pageSize: 999,
			userInfoId: contact_userInfoId,
			type: type,
			status: status
		};
		var total = 0;
		$.ajax({
			url : Common.getServerHost() + "/api/users/" + contact_action + "?"+Common.obj2param(param),
			method : "get",
			success : function(msg) {
				var list = msg.list;
				$(id).html('');
				for(var i=0 ; i< list.length;i++)
	            {
		            var item = list[i];
        			var html = $contact.loadHtml(item,isagree);
        			$(id).append(html);
        
    			}
			},
			error : function(request, status, error) {
                alert(error);
	            Common.stopload();
	            return null;
            },
			timeout : 30000
		});
}

Contacts.prototype.updateStatus = function(exid,status)
{
	var param = {
			exchangeCardId : exid,
			status: status
		};
		
		$.ajax({
			url : Common.getServerHost() + "/api/users/UpdateExchangeCardStatus",
			method : "post",
			data : Common.obj2param(param),
			success : function(msg) {
				if(msg.returncode == 0)
				{
					$contact.initListData("#pendingUserList",1,0,true);
				}
			},
			error : onerror,
			timeout : 30000
		});
}

Contacts.prototype.loadHtml = function(item,isagree){ //

				
			var exid = item.ExchangeCardId;
			var avatar = Common.getDisplayText(item.Avatar);
			var name = Common.getDisplayText(item.RealName);
			var english = Common.getDisplayText(item.EnglishName);
			var position = Common.getDisplayText(item.Position);
			var company = Common.getDisplayText(item.CompanyName);
			
			var expectCompany =  Common.getDisplayText(item.ExpectCompany);
			var expectPosition =  Common.getDisplayText(item.ExpectPosition);
			var expectSalary =  Common.getDisplayText(item.ExpectSalary);
			
			var telephone = Common.getDisplayText(item.Telephone);
			var email =  Common.getDisplayText(item.Email);
			
			
		var html = '';		
        html += "<div class='cardCon'>";
		html += "<table class='cardTable'>";
		html += "<tr><td rowspan='3' width='95px' >";
		html += "<center>";
		html += "<img src='./img/edituser.png' width='75' height='75' />";
		html += "</center>";
		html += "</td><td ><span class='title' >"+ name +" " + english + "</span></td></tr>";
		html += "<tr><td class='cont-info' exid='" + exid + "' id='exchang-position' ></td></tr>";
		html += "<tr><td class='cont-gray' exid='" + exid + "' id='exchang-cposition'></td></tr>";
		html += "</table>";
		html += "<div class='card-detail'>";
		html += "<ul>";
		html += "<li>";
		html += "想在「<span class='black'>" + expectCompany + "</span>」，找「<span class='black'>"+ expectPosition +"</span>」，薪酬范围在：「<span class='black'>" + expectSalary + "</span>」";
		html +="</li>";
		html +="</ul>";
		html +="</div>";
		html +="<div class='card-contact'>";
		html +="<ul>";
		html +="<li class='gray' id='exchange-phone'>";
		html += telephone;
		html +="</li>";
		html +="<li class='gray' id='exchange-email'>";
		html += email;
		html +="</li>";
		html +="</ul>";
		html +="</div>";
		html +="</div>";
	    if(isagree)
        {
		html +="<div class='line2'></div>";
        html +="<div class='devagree agree'>";
        
        html +="<a href='javascript:void(0)' onclick='updateExchagneStatus(" +exid+ ",-1)' exid='" + exid + "' ><img src='./img/refuse.png' class='right refuseimg'  /></a>";
        html +="<a href='javascript:void(0)' onclick='updateExchagneStatus(" +exid+ ",1)' exid='" + exid + "' ><img src='./img/agree.png'  class='right agreeimg '  /></a>";
        
        html +="</div>"
        }
        html +="</div>";
        
        return html;
}