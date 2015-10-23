var $appraise = null;
var Appraise = function () {
    $appraise = this;
};


Appraise.prototype.getUser = function (userInfoId) {


        var param = {
            userInfoId: userInfoId
        };
        if (userInfoId != "") {
            $.ajax({
                url: Common.getServerHost() + "/api/users/GetUserDetail?" + Common.obj2param(param),
                method: "get",
                async: false,
                success: function (rtnmsg) {
                    if (parseInt(rtnmsg.returncode) == 0) {
                        
                        var user = rtnmsg.result;
                        if (user != null) {
                            var avatar = Common.defaultAvatar2();
                            if (Common.getDisplayText(user.Avatar) != '') {
                                avatar =Common.getImgServerHost() +  Common.getDisplayText(user.Avatar);
                               
                            }
                            $("#avatarimg").attr("src", avatar);

                            var name = Common.getDisplayText(user.EnglishName);
                            if (name == "") {
                                name = Common.getDisplayText(user.RealName);
                            }

                            $("#realname").text(name);
                            $("#position").text(Common.getDisplayText(user.Position));
                            $("#company").text(Common.getDisplayText(user.CompanyName));
                        }

                    } else {


                    }
                },
                error: function (request, status, error) {
 
                },
                timeout: 30000
            });
        }
}

Appraise.prototype.getTagList = function (userInfoId,type) {


    var param = {
        pageIndex: 1,
        pageSize: 999,
        relationId: userInfoId,
        type : type
    };
    if (userInfoId != "") {
        $.ajax({
            url: Common.getServerHost() + "/api/Tag/GetTagList?" + Common.obj2param(param),
            method: "get",
            async: false,
            success: function (rtnmsg) {
                var list = rtnmsg.list;
                if (list.length > 0) {
                    if (type == 0) {
                        $("#a-tagg").html("");
                    }
                    else {
                        $("#a-tagb").html("");
                    }
                }
                for (var i = 0; i < list.length; i++)
                {   var id = "";
                if (type == 0) {
                    var html = $("<li><span class='tag-g'></span></li>");
                    html.find("span").text(list[i].TagName);

                    html.find("span").click(function () {
                        if ($(this).attr("class") == "tag-g") {
                            var len = $(".tag-g-s").length;

                            if (len >= 3) {
                                alert("最多只能选三项");
                            }
                            else {
                                $(this).removeClass("tag-g");
                                $(this).addClass("tag-g-s");
                            }
                        }
                        else {
                            $(this).removeClass("tag-g-s");
                            $(this).addClass("tag-g");
                        }
                    });

                    $("#a-tagg").append(html);
                }
                else {
                    var html = $("<li><span class='tag-b'></span></li>");
                    html.find("span").text(list[i].TagName);

                    html.find("span").click(function () {
                        if ($(this).attr("class") == "tag-b") {
                            var len = $(".tag-b-s").length;

                            if (len >= 3) {
                                alert("最多只能选三项");
                            }
                            else {
                                $(this).removeClass("tag-b");
                                $(this).addClass("tag-b-s");
                            }
                        }
                        else {
                            $(this).removeClass("tag-b-s");
                            $(this).addClass("tag-b");
                        }
                    });

                    $("#a-tagb").append(html);
  
                }
                }
                    
            },
            error: function (request, status, error) {

            },
            timeout: 30000
        });
    }
}


Appraise.prototype.addTag = function (userInfoId, name,type) {


    var param = {
        RelationId: userInfoId,
        TagName: name,
        Type: type
    };
    if (userInfoId != "") {
        $.ajax({
            url: Common.getServerHost() + "/api/Tag/Add",
            method: "post",
            data:Common.obj2param(param),
            async: false,
            success: function (rtnmsg) {
               

            },
            error: function (request, status, error) {

            },
            timeout: 30000
        });
    }
}


Appraise.prototype.save = function () {
    
    try {

        var favourableStr = "";
        $("#gtag-show span").each(function(){
            if(favourableStr == "")
            {
                favourableStr = $(this).text();
            }
            else
            {
                favourableStr += "," + $(this).text();
            }
        });

        var badpostStr = "";
        $("#btag-show span").each(function(){
            if(badpostStr == "")
            {
                badpostStr = $(this).text();
            }
            else
            {
                badpostStr += "," + $(this).text();
            }
        });

        var param = {
            Appraiser: Common.getUrlParam("Appraiser"),
            Assessment: Common.getUrlParam("UserInfoId"),
            NextTimePost: $("#NextTime").val(),
            IsCommunicate : $("[name='IsCommunicate']").val(),
            IsCooperate: $("[name='IsCommunicate']").val(),
            Favourable :favourableStr,
            Badpost: badpostStr
        };
        var bln = false;
        Common.loading();
        $.ajax({
            url: Common.getServerHost() + "/api/users/SaveAppraise",
            method: "post",
            data: Common.obj2param(param),
            async: false,
            success: function (rtnmsg) {
                location.href = "#resultPage";
            },
            error: function (request, status, error) {
                location.href = "#resultPage";
            },
            timeout: 30000
        });
    }
    catch (e)
    {
        location.href = "#resultPage";
    }
}