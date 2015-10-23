var $mselect = null;
var mstype;
var pcroll,ccroll;
var backpage,labeltag,valuetag;
var MutilSelect = function() {
	$mselect = this;
};

MutilSelect.prototype.init = function(type,page,labelDom,valueDom){
		
	backpage = page;
	labeltag = labelDom;
	valuetag = valueDom;
    $("#mutilSelectedPanel").html('');
	$mselect.loadSelected($(valuetag).val(),$(labeltag).text());
	
	$("#mus-back").click(function(){
	    $mselect.saveData(labeltag,valuetag);
		Common.reverse(backpage);
	});	
	
	$("#mus-save").click(function(){
	    $mselect.saveData(labeltag,valuetag);
		Common.reverse(backpage);
	});
	
	var data =$mselect.getData(type);
	mstype = type;
	
	$("#parentUl").html('');
	
	for(var i=0 ;i< data.length;i++)
	{
	    var style = "";
	    if(i == 0)
	    {
	    	style = "class='active'";
	    }
	    
		var li = $("<li vid='" + data[i].Id + "' "+ style +" num='" + i + "'>" + data[i].Name + "</li>");
		
		li.click(function(type){
			$("#childUl").html("");
		
			$("#parentUl li").removeClass("active");
			$(this).addClass("active");
			
			var vid = $(this).attr("num");
			var data =$mselect.getData(mstype);
			var cdata = data[vid].Child;
			
			for(var i=0 ;i< cdata.length;i++)
			{
				$mselect.addChild(cdata[i].Id,cdata[i].Name);
			}
		});
		
		$("#parentUl").append(li);
		
	}
	$("#childUl").html('');
	
	var ddata =$mselect.getData(mstype);
			var cddata = ddata[0].Child;
			
			for(var i=0 ;i< cddata.length;i++)
			{
				$mselect.addChild(cddata[i].Id,cddata[i].Name );
			}
	
	Common.redirect("#mutilSelect");
};

MutilSelect.prototype.saveData = function(label,value){
    var ids = "";
    var names = "";

	$("#mutilSelectedPanel li").each(function(i){
		var ivid = $(this).attr("vid");
		var name = $(this).find(".ms-text").text();
		
		if(ids == "")
		{
			ids = ivid;
		}
		else
		{
			ids += "," + ivid;
		}
		
		if(names == "")
		{
			names = name;
		}
		else
		{
			names += "," + name;
		}
		
	});
		$(label).text(names);
		$(value).val(ids);
};

MutilSelect.prototype.addChild = function(cid,cname){
             
                var cstyle = "class='active'";
           
				if($mselect.isSelect(cid))
				{
					cstyle = "class='selected'";
				}
				
	            var cli = $("<li vid='" + cid + "' " + cstyle + ">" + cname + "</li>");
				
				cli.click(function(){
				    
				    var className = $(this).attr("class");
				    
				    if(className == "selected")
				    {
				    	return;
				    }
				    else
				    {
				    	$(this).attr("class","selected");
				    
						var id = $(this).attr("vid");
						var name = $(this).text();
						$mselect.addSelectedItem(id,name);
				    
				    }
				
				});
				
				$("#childUl").append(cli);
}

MutilSelect.prototype.isSelect = function(vid)
{
	var bln = false;

	$("#mutilSelectedPanel li").each(function(i){
		var ivid = $(this).attr("vid");
		if(vid == ivid)
		{
			bln = true;
		}
	});
	
	return bln;
}

MutilSelect.prototype.getData = function(type)
{
	if(type == 'city')
	{
	    $("#ms-title").text("选择城市！");
		return city;
	}
	
	if(type == 'industry')
	{
	    $("#ms-title").text("选择行业");
		return industry;
	}
	
	if(type = 'jobtype')
	{
		$("#ms-title").text("选择职能");
		return jobtype;
	}
};

MutilSelect.prototype.addSelectedItem = function(id,name)
{
	                var index = $("#mutilSelectedPanel li").length + 1;
					
					if(index <= 3)
					{
					$(this).attr("class","selected");
					
					var itemli = $("<li  vid='" + id + "'><span class='tag'><span class='ms-num'>"+ index +"</span>.<span class='ms-text'>" + name + "</span><img src='./img/delete.png' /></span></li>");
				    itemli.click(function(){
				    	
				    	var vid = $(this).attr("vid");
				    	var item = $("#childUl li[vid='" + vid + "']").first();
				    	if(item)
				    	{
				    		item.attr("class","active")
				    	}
				    	$(this).remove();
				    	
				    	$("#mutilSelectedPanel li").each(function(i){
				    		$(this).find(".ms-num").text(i +1);
				    	});
				    
				    });
				    
				    $("#mutilSelectedPanel").append(itemli);
				    }
				    else
				    {
				    	alert("最多职能选三个！");
				    }
}

MutilSelect.prototype.loadSelected = function(ids,names)
{
    if(ids != "")
    {
	var idarr = ids.split(',');
	var namearr = names.split(',');
	
	for(var i=0 ;i<idarr.length;i++)
	{
		$mselect.addSelectedItem(idarr[i],namearr[i]);
	}
	}
};
	
