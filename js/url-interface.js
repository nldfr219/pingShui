var Interface = (function() {
	var hostname = getServerUrl();

	var onerror = function(e) {
		alert(JSON.stringify(e));
	}

	var login = function(json, success) {
		$.ajax({
			url : hostname + "/login",
			method : "post",
			async:false,
			data : json,
			dataType:"json",
			success : success,
			error : onerror
		});
	}
	
	var uploadFile = function(file_uri, success) {
		var host = hostname + "/upload";
		var ft = new FileTransfer();
		ft.upload(file_uri,encodeURI(host),success, onerror);
	};

	var register = function(json, success) {
		$.ajax({
			url : hostname + "/register",
			method : "post",
			dataType: "json",
			data : json,
			success : success,
			error : onerror
		});
	}
	
	var setHunterFocusArea = function(json,success) {
		$.ajax({
			url: hostname + "/setFocusArea",
			method:"post",
			data: json,
			success: success,
			error: onerror
		})
	}

	var fetchHunterList = function(success) {
		$.ajax({
			url : hostname + "/fetchHunterList",
			method : "get",
			dataType: "json",
			success : success,
			error : onerror
		})
	}

	var fetchContactList = function(userid, success) {
		$.ajax({
			url : hostname + "/fetchContact/"+userid,
			method : "get",
			dataType: "json",
			success : success,
			error : onerror
		})
	}

	var fetchExchangeRequest = function(type, userid, success) {
		$.ajax({
			url : hostname + "/fetchExchangeRequest/"+type+"/"+userid,
			method : "get",
			dataType: "json",
			success : success,
			error : onerror
		})
	}
	
	var requestExchange = function(from, to, city, jobtype,success) {
		$.ajax({
			url: hostname + "/requestExchage/"+from+"/"+to + "/"+city+"/"+jobtype,
			method: "get",
			dataType: "json",
			success: success,
			error: onerror
		})
	}
	
	var addContact = function(userid, contactuserid, success) {
		$.ajax({
			url: hostname + "/addContact/"+userid+"/"+contactuserid,
			method: "get",
			dataType: "json",
			success: success,
			error: onerror
		})
	}

	return {
		fetchHunterList : function(success) {
			fetchHunterList(success)
		},
		fetchContactList : function(userid, success) {
			fetchContactList(userid,success)
		},
		fetchExchangeRequest : function(type, userid, success) {
			fetchExchangeRequest(type, userid, success)
		},
		register : function(json,success) {
			register(json, success)
		},
		login : function(json,success) {
			login(json,success)
		},
		uploadFile : function(file_uri, success) {
			uploadFile(file_uri,success)
		},
		setHunterFocusArea : function(param, success) {
			setHunterFocusArea(param, success)
		},
		requestExchange: function(from, to, city, jobtype, success) {
			requestExchange(from, to, city, jobtype, success)
		},
		addContact: function(userid, contactuserid, success) {
			addContact(userid, contactuserid, success)
		}
	}
})()