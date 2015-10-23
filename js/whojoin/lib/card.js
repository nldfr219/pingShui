var _cardViewSingleton = null;
function CardViewSingleton() {
    if (_cardViewSingleton == null) {
        _cardViewSingleton = new CardView({ el: $("#card") });
    }

    return _cardViewSingleton;
}

CardModel = Backbone.Model.extend({
    initialize: function () {

    },
    default: {
        UserId: null,
        RealName: null,
        Position: null,
        Email: null,
        CompanyName: null,
        Avatar:null
    },
    validate: function (attributes) {
        if (attributes.Avatar == null || attributes.Avatar == "") {
            return '请上传头像！';
        }

        if (attributes.RealName == null || attributes.RealName == "") {
            return '请输入真实姓名！';
        }

        if (attributes.CompanyName == null || attributes.CompanyName == "") {
            return '请输入公司名称！';
        }

        if (attributes.Position == null || attributes.Position == "") {
            return '请输入职位名称！';
        }

        if (attributes.Email == null || attributes.Email == "") {
            return '请输入邮箱地址！';
        }
        else {
            var emailreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if (!emailreg.test(attributes.Email)) {
                return '请输入有效的邮箱！';
            }
        }

        return "";
    },
    saveCard: function (callback) {
        var msg = this.validate(this.attributes);
        if (msg != "")
        {
            alert(msg);
            return;
        }

        try {

            $.ajax({
                url: Common.getServerHost() + "/api/users/save",
                method: "post",
                data: Common.obj2param(this.attributes),
                success: function (rtnmsg) {
                    if (rtnmsg.returncode == 0) {
                        if (callback) {
                            callback(rtnmsg);
                        }
                    }
                    else {
                        //JSON.stringify(rtnmsg)
                        alert(rtnmsg.message);
                        
                    }
                },
                error: onerror,
                timeout: 5000
            });
        } catch (e) {
           
        }
    }
});


CardView = Backbone.View.extend({
    initialize: function () {
    },
    render: function () {
        var imgwidth = $(window).width() *0.9;
        $("#avatarImg").height(imgwidth);
        $(".img_choose").height(imgwidth);
    },
    events: {
        'click #selectAvatar': 'selectAvatar',
        'change #cameraInput': 'avatarChange',
        'click #saveCardBtn': 'saveCard'
    },
    selectAvatar: function (event) {
        $("#cameraInput").click();
    },
    avatarChange: function (event) {
        var $_this = $(event.currentTarget);
        if ($_this.val() != '') {
            var files = event.target.files, file;
            if (files && files.length > 0) {
                file = files[0];
            }

            var reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = function (e) { // reader onload start  
                //Common.loading();
                // ajax 上传图片  
                try {
                    $.post(Common.getServerHost() + "/api/users/SaveBase64File?type=avatar", { img: e.target.result }, function (ret) {
                        if (ret.result != '') {
                            $("#avatarImg").show();
                            $("#avatarImg").attr("src", Common.getImgServerHost() + ret.result);
                            $("#Avatar").val(ret.result);

                            $(".devselectAvatar").hide();
                        } else {
                            alert('upload fail');
                            Common.stopload();
                        }
                    }, 'json');
                }
                catch (e) {
                    Common.stopload();
                }
            }
        }
    },
    saveCard: function (event) {
        var card = new CardModel;
        card.set({
            UserId: Common.userInfo().UserId,
            RealName: $("#card_realname").val(),
            Position: $("#card_position").val(),
            Email: $("#card_email").val(),
            CompanyName: $("#card_company").val(),
            Avatar: $("#Avatar").val()
        });

        card.saveCard(function (rtn) {
           
            location.href = "list.html";
        });
    }
});