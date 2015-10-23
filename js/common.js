var getServerUrl = function() {
	return "http://120.25.220.17:9000";
}

var takePhoto = function(target) {
	pic_source = navigator.camera.PictureSourceType;
	pic_dest = navigator.camera.DestinationType;
	navigator.camera.getPicture(function(uri) {
		Interface.uploadFile(uri, function(e) {
			alert(JSON.stringify(e));
			target.attr("hosticon", e.response);
		});
		target.attr("src", uri);

	}, function(e) {
		alert("take photo error!" + e);
	}, {
		quality : 50,
		targetWidth : 600,
		targetHeight : 400,
		allowEdit : true,
		destinationType : pic_dest.FILE_URI
	});
};

var findValueFromBaseData = function(type, key) {
	if(!basedata[type]) return "";
	
	var scan = function(array, key) {
		for(var i = 0; i < array.length; i ++) {
			if(array[i].Id == key) return array[i].Name
			else if(array[i].Child) {
				var r = scan(array[i].Child, key);
				if(r != "") return r;
			}
		}
		return "";
	}
	
	return scan(basedata[type], key);
}