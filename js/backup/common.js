var getServerHost = function() {
	return "http://119.29.116.198:80"
};

var saveLoginData = function(info) {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
		fileSystem.root.getFile("join.txt", {create : true,exclusive : false}, function(fileEntry){
			fileEntry.createWriter(function(writer){
				writer.write(info);
			})
		});
	});
};

var saveBaseData = function(info) {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
		fileSystem.root.getFile("basedata.txt", {create : true,exclusive : false}, function(fileEntry){
			fileEntry.createWriter(function(writer){
				writer.write(info);
				loadSelectMenuData(info);
			});
		});
	});
};

var readLoginData = function(afterload) {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
		fileSystem.root.getFile("join.txt", null, function(fileEntry){
			fileEntry.file(function(file){
				var reader = new FileReader(); 
				reader.onloadend = function(evt) { 
			        content = evt.target.result; 
			        afterload(content);
			    }; 
				reader.readAsText(file);
			});
		});
	});
};

var readBaseData = function(afterload) {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
		fileSystem.root.getFile("basedata.txt", null, function(fileEntry){
			fileEntry.file(function(file){
				var reader = new FileReader(); 
				reader.onloadend = function(evt) { 
			        content = evt.target.result; 
			        afterload(content);
			    }; 
				reader.readAsText(file);
			});
		});
	});
};

var removeLoginData = function(afterload) {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
		fileSystem.root.getFile("join.txt", null, function(fileEntry){
			fileEntry.remove();
			if(afterload) afterload();
		});
	});
};

var readLoginDataError = function(e) {
	alert(e.code);
};

var obj2param = function(obj) {
	var rtnstr = "";
	for(key in obj) {
		if(rtnstr == "") {
			rtnstr = key + "=" + obj[key];
		} else {
			rtnstr = rtnstr + "&" + key + "=" + obj[key];
		}
	}
	return rtnstr;
};

var loadBaseData = function(hash) {
	var param = {
		timestamp: hash
	};
	$.ajax({
		url: getServerHost() + "/api/BaseData/GetBaseData",
		dataType: "json",
		method: "get",
		//data: obj2param(param),
		success: function(json) {
			saveBaseData(json.result);
		},
		error: function(e) {
			alert(e);
		}
	});
};

var loadCompanyData = function(companyid) {
	$.ajax({
		url: getServerHost() + "/api/company/Get?companyid="+companyid,
		dataType: "json",
		method: "get",
		success: function(json) {
			companyinfojson = json.result;
		},
		error: function(e) {
			alert(e);
		}
	});
}

var select_parent = "";

var loadSelectMenuData = function(json) {
	for(type in json) {
		var itemclass = ".select-"+type;
		//var optitem = $("<div id='opt-"+type+"' data-role='page'><a class='ui-btn' href='javascript:history.back()'>back</a></div>")
		$(itemclass).append("<span class='selected'>未选择</span>");
		$(itemclass).attr("selecteditem","");
		parseBaseDatas(json[type], "opt-"+type);

		$(itemclass).click(function(e){
			select_parent = $(this).attr("id");
		});
		//$('#container').append(optitem);
//		$(".param-chkbox").bind("change",function(e) {
//			alert("hello");
//			//addCheckedParam(select_parent, $(this).attr("name"));
//		});
	}
	$(".param-chkbox").on('change', function(e){
		 
		addCheckedParam(select_parent, $(this).attr("name"), $(this).attr("cid"));
	});
	$(".select-sub-menu").on("click", function(e) {
		//alert(1);
		$($(this).attr("href") + " input:checkbox").prop('checked', false).checkboxradio("refresh");
	})
};

var parseBaseDatas = function (json, key) {
	var optitem = $("<div id='"+key+"' data-role='page'><a class='ui-btn' href='javascript:history.back()'>back</a></div>");
	
	for(var i = 0; i < json.length; i ++) {
		var item = json[i];
		
		var href = "#";
		if(item.Child) {
			href = "opt-"+key + item.Id+"-child";
			parseBaseDatas(item.Child, href);
			optitem.append("<a class='ui-btn select-sub-menu' href='#"+href+"'>"+item.Name+"</a>");
		} else {
			optitem.append("<label  name='"+item.Name+"'><input class='param-chkbox' cid='"+item.Id+"' name='"+item.Name+"' type='checkbox'>"+item.Name+"</label>");
		}
	}
	$("#container").append(optitem);

};

var addCheckedParam = function(id, param, paramid) {
//	alert(id);
//	alert(param);
	$("#"+id+" > .selected").html(param);

	$("#"+id).attr("selecteditem", paramid);
//	alert($("#"+id).attr("selecteditem"));
};

var takePhoto = function(type,target) {
	pic_source = navigator.camera.PictureSourceType;
	pic_dest = navigator.camera.DestinationType;
	
	navigator.camera.getPicture(function(uri) {
		uploadFile(uri, getServerHost()+"/api/users/SaveFile?type="+type);
		target.attr("src",uri);
	}, function(e){
		alert("take photo error!" + e);
	}, {
		quality : 50,
		width: 768,
		height: 1024,
		destinationType : pic_dest.FILE_URI
	});
};

function uploadFile(file_uri, host) {
	var ft = new FileTransfer();
	ft.upload(file_uri,encodeURI(host),function(msg){alert(JSON.stringify(msg));}, function(){alert("upload icon error!")});
};