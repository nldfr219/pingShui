var currentPage = "";
var pageYOffset = 0;

$(function () {
    //初始化
    $("[data-role='page']").first().addClass("ui-page-active");
    currentPage = $("[data-role='page']").first().attr("id");
});

function onerror(request, status, error) {
    alert(error);
    //Common.stopload();
};


var $common = null;
var CommonClass = function () {
    $common = this;

    this.getServerHost = function () {
        return "http://api.whojoin.cn";
    };

    this.getImgServerHost = function () {
        return "http://img.whojoin.cn";
    };

    this.obj2param = function (obj) {
        var rtnstr = "";
        for (key in obj) {
            var value = obj[key];
            if (value == undefined || value == null) value = "";
            if (rtnstr == "") {
                rtnstr = key + "=" + value;
            } else {
                rtnstr = rtnstr + "&" + key + "=" + value;
            }
        }
        return rtnstr;
    };

    this.takePhoto = function (type, target, valtag) {

        var popover = {
            x: 0,
            y: 0,
            width: 500,
            height: 500,
            arrowDir: Camera.PopoverArrowDirection.ARROW_ANY
        };

        navigator.camera.getPicture(function (uri) {
            var avatar = $this.uploadFile(uri, $this.getServerHost() + "/api/users/SaveFile?type="
                        + type, valtag);
            target.attr("src", uri);

        }, function (e) {
            alert("take photo error!" + e);
        }, {
            quality: 100,
            sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
            encodingType: Camera.EncodingType.JPEG,
            allowEdit: true,
            targetWidth: 500,
            targetHeight: 500,
            destinationType: Camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: false,
            popoverOptions: popover
        });
    };

    this.uploadFile = function (file_uri, host, valtag) {
        try {
            Common.loading();

            var ft = new FileTransfer();
            ft.upload(file_uri, encodeURI(host), function (msg) {
                //alert(JSON.stringify(msg));
                var json = $.parseJSON(msg.response);
                avatarpath = json.result;
                valtag.val(avatarpath);
                Common.stopload();
            }, function () {
                alert("upload icon error!");
                Common.stopload();
            });

            return avatarpath;
        }
        catch (e) {
            alert(e);
            Common.stopload();
        }
    };

    this.defaultAvatar = function () {
        return "/img/uploadAvatar.png";
    };

    this.defaultAvatar2 = function () {
        return "/img/uploadAvatar.png";
    };

    this.gotoPage = function (id) {
        $("#" + id).addClass("ui-page-active").addClass("fix").addClass("slide").addClass("in");
        setTimeout(function () {
            $("#" + currentPage).addClass("slide").addClass("out");
        }, 25);
       
        setTimeout(function () {
            $("#" + id).removeClass("slide").removeClass("in").removeClass("fix").addClass("ui-page-active");
            $("#" + currentPage).removeClass("slide").removeClass("out").removeClass("ui-page-active");
            currentPage = id;
        }, 350);
    };

    this.gobackPage = function (id) {
        $("#" + id).addClass("ui-page-active").addClass("slide").addClass("in").addClass("reverse");
        $("#" + currentPage).addClass("slide").addClass("out").addClass("reverse");

        setTimeout(function () {
            $("#" + id).removeClass("slide").removeClass("in").removeClass("reverse");
            $("#" + currentPage).removeClass("slide").removeClass("out").removeClass("ui-page-active").removeClass("reverse");
            currentPage = id;
            
        }, 350);
    }

    this.slideup = function (id)
    {
        $("#" + id).addClass("ui-page-active").addClass("slideup").addClass("in");

        setTimeout(function () {
            $("#" + id).removeClass("slideup").removeClass("in");
            $("#" + currentPage).removeClass("ui-page-active");
            currentPage = id;
        }, 250);
    }

    this.slideupout = function (id) {
        $("#" + currentPage).addClass("slideup").addClass("in").addClass("reverse");
        $("#" + id).addClass("ui-page-active");
        setTimeout(function () {
            $("#" + currentPage).removeClass("ui-page-active").removeClass("slideup").removeClass("in").removeClass("reverse");
            currentPage = id;
        }, 250);
    }

    this.reverse = function (id) {
        $("#cureverse").attr("href", id);
        $("#cureverse").click();
    };

    this.localJsonStorage = function (key, value) {
        var text = JSON.stringify(value)
        window.localStorage.setItem(key, text);

    }
    this.getJsonStorage = function (key) {
        var text = window.localStorage.getItem(key);
        var json = $.parseJSON(text);
        return json;
    }

    this.removeStorage = function (key) {
        window.localStorage.removeItem(key);
    }

    //用户数据
    this.userInfo = function () {
        var user = $common.getJsonStorage("user");
        return user;
    }

    this.saveUserInfo = function (obj) {
        $common.localJsonStorage("user", obj);
    }

    this.removeUserInfo = function () {
        $common.removeStorage("user");
    }

    this.checkUserInfo = function () {
        var user = $common.userInfo();
        if (user) {
            if (rtnmsg.result.RealName == null || rtnmsg.result.RealName == "") {
                var loginView = LoginViewSingleton();
                login.render();
                location.href = "/home.html";
                return false;
            }
            else {
                return true;
            }
        }
        else {
            var loginView = LoginViewSingleton();
            login.render();
            location.href = "/home.html";
        }

        return false;
    }

    this.getDisplayText = function (val) {
        try {
            if (val == null || val == "" || val == 0) {
                val = '';
            }

            return val;
        }
        catch (e) {
            return "";
        }
    }

    this.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return decodeURI(r[2]); return null; //返回参数值
    }

}; var Common = new CommonClass();