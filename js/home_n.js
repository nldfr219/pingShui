var Home = function() {
	
};

$(function(){
	$(".muen-home").click(function(){

		Common.menuClose("#all-home");
	});
})


$(document).on("pageinit","#all-home",function(){ // 当进入页面二时

	var user = Common.userInfo();
    try
    {
        
        
    
        var name = '';
        if(Common.getDisplayText(user.EnglishName) != '')
        {
        	name = Common.getDisplayText(user.EnglishName);
        }
        else
        {
        	name = Common.getDisplayText(user.RealName);
        }
    
		$(".devMenuTitle").text(name + "," + Common.getDisplayText(user.Position));
		
		var avatar = Common.defaultAvatar2();
		if(Common.getDisplayText(user.Avatar) != '')
		{
			avatar = Common.getDisplayText(user.Avatar);
		}
		
		$(".menuavatar").attr("src",avatar);
	}
	catch(e)
	{
		
	}


});

$(document).on("pageshow","#all-home",function(){ // 当进入页面二时

    var tbwidth = $(window).width();
	$(".c-h-tblist tr.hotimgtr").height(tbwidth/3);
	$(".h-tb-img").width(tbwidth/3);
	$(".h-tb-img").height(tbwidth/3);
	$("#hotIndustry").height((tbwidth/3) * 2 +15);
	$("#hotHun").height((tbwidth/3) * 2 +70);
	
	$(".devshadow1").height((tbwidth/3) * 2 +15);
	$(".devshadow").height((tbwidth/3) * 2 +52);
	
	$(".h-middle").css("margin-top",(tbwidth/3) -20);
	$(".h-middle").css("margin-left",(tbwidth/2)-40);
});




