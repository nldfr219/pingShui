var $sselect = null;
var sstype;
var ssbackpage,sslabeltag,ssvaluetag,ssIsMutil;
var SingleSelect = function() {
	$sselect = this;
};

SingleSelect.prototype.init = function(type,page,labelDom,valueDom,ismutil){
		
	ssbackpage = page;
	sslabeltag = labelDom;
	ssvaluetag = valueDom;
	ssIsMutil = ismutil;
    $("#selectUl").html('');
    $("#singleChildUl").html('');
    
    if(ssIsMutil)
	{
		$("#ss-save").text('保存');
	}
	
    $("#ss-back").unbind();
	$("#ss-back").click(function(){
	
		if(ssIsMutil)
		{
			$sselect.saveMutilData();
		}
		else
		{
		    Common.gobackPage(ssbackpage);
		}
	});	
	
	$("#ss-save").unbind();
	$("#ss-save").click(function(){
		if(ssIsMutil)
		{
			$sselect.saveMutilData();
		}
		else
		{
		    Common.gobackPage(ssbackpage);
		}
	});
	
	var data =$sselect.getData(type);
	sstype = type;
	
	for(var i=0 ;i< data.length;i++)
	{
	    var style = "";
	    
		var li = $("<li vid='" + data[i].Id + "' num='" + i + "'>" + data[i].Name + "</li>");
		
		li.click(function(type){
			
			if(ssIsMutil)
			{
				var classname = $(this).attr("class");
				if(classname == "active")
				{
					$(this).removeClass("active");
				}
				else
				{
			
				var len = $("#singleSelect .active").length;
				if(len <3)
				{
					$(this).attr("class","active");
				}
				else
				{
					alert('最多只能选择三个');
				}
				
				}
			}
			else
			{
			
			var num = $(this).attr("num");
			var data =$sselect.getData(sstype);
			var cdata = data[num].Child;
			
			
			if(cdata == null)
			{
				var vid = $(this).attr("vid");
				var name = $(this).text();
			
				$sselect.saveData(name,vid);
			}
			else
			{
				for(var i=0 ;i< cdata.length;i++)
				{
					$sselect.addChild(cdata[i].Id,cdata[i].Name);
				}
				$("#ss-showc").click();
			}
			
			}
		});
		
		$("#selectUl").append(li);
		
	}
	
	Common.gotoPage("singleSelect");
};

SingleSelect.prototype.saveData = function(label,value){
	$(sslabeltag).val(label);
	$(ssvaluetag).val(value);
	Common.reverse(ssbackpage);
};

SingleSelect.prototype.saveMutilData = function(){

	var ids = "";
    var names = "";
    
    $("#singleSelect .active").each(function(i){
		var ivid = $(this).attr("vid");
		var name = $(this).text();
		
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

	$(sslabeltag).text(names);
	$(ssvaluetag).val(ids);
	Common.reverse(ssbackpage);
};

SingleSelect.prototype.addChild = function(cid,cname){
             

				
	            var cli = $("<li vid='" + cid + "' >" + cname + "</li>");
				
				cli.click(function(){
				    
				    var vid = $(this).attr("vid");
				    var name = $(this).text();
			
				    $sselect.saveData(name,vid);
				
				});
				
				$("#singleChildUl").append(cli);
}

SingleSelect.prototype.getData = function(type)
{
	if(type == 'city')
	{
	    $("#ss-title").text("选择城市");
		return city;
	}
	
	if(type == 'industry')
	{
	    $("#ss-title").text("选择行业");
		return industry;
	}
	
	if(type == 'language')
	{
		$("#ss-title").text("选择语言");
		return language;
	}
	
	if(type == 'education')
	{
		$("#ss-title").text("选择学历");
		return education;
	}
	
	if(type == 'salaryrange')
	{
		$("#ss-title").text("薪资范围");
		return salaryrange;
	}
};



	
