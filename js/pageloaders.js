var pageloaderutil = function() {
	this.loadHunterList = function(target) {
		var success = function(json) {
			for (var i = 0; i < json.length; i++) {
				var item = json[i];
				var hunter = new Hunter(item);
				
				target.append(hunter.toBriefHtml());
			}
		}
		Interface.fetchHunterList(success)
	};
	
	this.loadCardInfo = function(target) {
		var html = new Hunter(LOGIN_DATA).toCardHtml();
		target.html(html);
	};
	
	this.loadExchangeRequest = function(target) {
		target.html("");
		var type = "";
		if(LOGIN_DATA.role == 1) {
			type="to";
		} else {
			type = "from";
		}
		var succ = function(json) {
			for(var i = 0; i < json.length; i ++) {
				var user = new Hunter(json[i])
				var html = "<li><a>"
					+ user.toCardHtml()
					+ "<div><img style='width:10%' userid='"+user.id+"' class='agree' src='./img/agree.png' />" 
					+ "<span style='width:10%'> </span>"
					+		"<img style='width:10%'  userid='"+user.id+"' class='refuse' src='./img/refuse.png' /></div>"
					+ "</a></li>";
				target.append(html)
			}
			$(".agree").click(function(e){
				var contactuserid = $(this).attr("userid")
				Interface.addContact(LOGIN_DATA.id, contactuserid, function(e){
					alert("added");
					pageloader.loadContact($(".contact-list"));
				})
			})
		}
		Interface.fetchExchangeRequest(type,LOGIN_DATA.id, succ);
	};
	
	this.loadContact = function(target) {
		target.html("");
		var succ = function(json) {
			for(var i = 0; i < json.length; i ++) {
				var user = new Hunter(json[i])
				var html = "<li><a>"
					+ user.toCardHtml()
					+ "</a></li>";
				target.append(html);
			}

		}
		Interface.fetchContactList(LOGIN_DATA.id, succ);
	}
}; var pageloader = new pageloaderutil();