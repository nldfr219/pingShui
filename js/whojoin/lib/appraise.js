var _appraiseViewSingleton = null;
function AppraiseViewSingleton() {
    if (_appraiseViewSingleton == null) {
        _appraiseViewSingleton = new AppraiseView({ el: $("#appraise") });
    }

    return _appraiseViewSingleton;
}

AppraiseModel = Backbone.Model.extend({
    initialize: function () {

    },
    default: {
        AppraiseId: null,
        Appraiser: 0,
        Assessment: 0,
        Type: 0,
        Score: 0,
    },
    validate: function (attributes) {


        return "";
    },
    appraise: function (callback)
    {
        $.ajax({
            url: Common.getServerHost() + "/api/Appraise/Appraise",
            method: "post",
            data: Common.obj2param(this.attributes),
            async: false,
            success: function (rtnmsg) {
                if (callback) {
                    callback(rtnmsg);
                }
            },
            error: function (request, status, error) {
                alert(error);
            },
            timeout: 30000
        });
    }
});

AppraiseView = Backbone.View.extend({
    initialize: function () {
    },
    render: function () {

        var param = {
            userInfoId: Common.getUrlParam("userInfoId")
        };

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
                            avatar = Common.getImgServerHost() + Common.getDisplayText(user.Avatar);

                        }
                        $("#avatarimg").attr("src", avatar);

                        var name = Common.getDisplayText(user.EnglishName);
                        if (name == "") {
                            name = Common.getDisplayText(user.RealName);
                        }

                        $("#realname").text(name);
                        $("#position").text(Common.getDisplayText(user.Position));
                        $("#company").text(Common.getDisplayText(user.CompanyName));
                        $("#phone").text(Common.getDisplayText(user.Telephone));
                        $("#email").text(Common.getDisplayText(user.Email));
                    }

                } else {


                }
            },
            error: function (request, status, error) {

            },
            timeout: 30000
        });
    },
    events: {
        'click #appsubmit': 'appraise'
    },
    appraise: function (event) {
        var model = new AppraiseModel;
        model.set({
            Assessment: Common.getUrlParam("userInfoId"),
            Score:$(".devs").length *2
        });

        model.appraise(function (rtn) {
            alert("评价成功");
        });
    }
});