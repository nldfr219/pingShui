var PublicMethods = function() {
	
	var $this = this;
	
    this.getServerHost = function() {
        return "http://192.168.199.241:80";
    };
    
    this.getImgServerHost = function(){
    	return "http://119.29.116.198:82";
    };
	
	this.obj2param = function (obj) {
		var rtnstr = "";
		for (key in obj) {
			var value = obj[key];
			if(value == undefined || value == null) value="";
			if (rtnstr == "") {
				rtnstr = key + "=" + value;
			} else {
				rtnstr = rtnstr + "&" + key + "=" + value;
			}
		}
		return rtnstr;
	};
	
	this.takePhoto = function(type, target,valtag) {
      
        var popover = { 
          x : 0,
          y : 0,
          width : 500,
          height : 500,
          arrowDir : Camera.PopoverArrowDirection.ARROW_ANY
       };

		navigator.camera.getPicture(function(uri) {
		var avatar = $this.uploadFile(uri, $this.getServerHost() + "/api/users/SaveFile?type="
					+ type,valtag);
			target.attr("src", uri);
			
		}, function(e) {
			alert("take photo error!" + e);
		}, {
			quality : 100,
			sourceType : Camera.PictureSourceType.SAVEDPHOTOALBUM,
			encodingType: Camera.EncodingType.JPEG,
            allowEdit : true,
			targetWidth : 500,
			targetHeight : 500,
			destinationType : Camera.DestinationType.FILE_URI,
			saveToPhotoAlbum: false,
			popoverOptions:popover
		});
	};
	
	this.uploadFile = function(file_uri, host,valtag) {
	    try
	    {
	    Common.loading();
	    
		var ft = new FileTransfer();
		ft.upload(file_uri, encodeURI(host), function(msg) {
			//alert(JSON.stringify(msg));
			var json = $.parseJSON(msg.response);
			avatarpath = json.result;
			valtag.val(avatarpath);
			Common.stopload();
		}, function() {
			alert("upload icon error!");
			Common.stopload();
		});
		
		return avatarpath;
		}
		catch(e)
		{
			alert(e);
			Common.stopload();
		}
	};
	
	this.defaultAvatar = function(){
		return "/img/uploadAvatar.png";
	};
	
	this.defaultAvatar2 = function(){
		return "/img/uploadAvatar.png";
	};
	
	this.redirect = function(id){
		$("#cushref").attr("href",id);
	    $("#cushref").click();
	};
	
	this.reverse = function(id){
		$("#cureverse").attr("href",id);
	    $("#cureverse").click();
	};
	
	this.slidedown = function(id)
	{
		$("#cusslidedown").attr("href",id);
		$("#cusslidedown").click();
	}
	
	this.menuClose = function(id)
	{
		$("#muenhref").attr("href",id);
		$("#muenhref").click();
	}
	
	this.loading= function(){
		$.mobile.loading('show'); 
	}
	
	this.stopload=function(){
		$.mobile.loading('hide'); 
	}
	
	this.localJsonStorage =function(key,value)
	{
	    var text = JSON.stringify(value)
		window.localStorage.setItem(key, text);
		
	}
	this.getJsonStorage = function(key)
	{
		var text = window.localStorage.getItem(key);
		var json = $.parseJSON(text);
		return json;
	}
	
	this.removeStorage= function(key)
	{
		window.localStorage.removeItem(key);
	}
	
	//用户数据
	this.userInfo = function()
	{
		var user = $this.getJsonStorage("user");
		if(user == null || user == "")
		{
			this.redirect("#index");
		}
		
		return user;
	}
	
	
	this.getDisplayText = function(val)
	{
	    try
	    {
		if(val == null ||  val =="" || val == 0)
    	{
    		val = '';
    	}
    	
    	return val;
    	}
    	catch(e)
    	{
    		return "";
    	}
	}
	
	this.getSafeValue = function(item,key)
	{
	    try
	    {
	    
	    	var val = item[key];
	    
		if(val == null ||  val =="" || val == 0)
    	{
    		val = '';
    	}
    	
    	return val;
    	}
    	catch(e)
    	{
    		return "";
    	}
	}
	
	this.gotoPage = function(page,overWay,isback) 
	{
		$("#cushref").attr("href",page);
		$("#cushref").attr("data-transition",overWay);
		if(isback)
		{
			$("#cushref").attr("data-direction","reverse");
		}
	    $("#cushref").click();
	}

	this.getUrlParam = function (name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	    if (r != null) return decodeURI(r[2]); return null; //返回参数值
	}
	
}; var Common = new PublicMethods();