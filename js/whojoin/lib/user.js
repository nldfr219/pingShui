var _loginViewSingleton = null;
function LoginViewSingleton() {
    if (_loginViewSingleton == null) {
        _loginViewSingleton = new LoginView({ el: $("#loginpage") });
    }

    return _loginViewSingleton;
}

var _registerViewSingleton = null;
function RegisterViewSingleton() {
    if (_registerViewSingleton == null) {
        _registerViewSingleton = new RegisterView({ el: $("#registerPage") });
    }

    return _registerViewSingleton;
}



UserModel = Backbone.Model.extend({
    initialize: function () {

    },
    default: {
        Phone: null,
        Password: null
    },
    validate: function (attributes) {

        return ""
    },
    getUserDetail: function () {
        var param = {
            Phone: this.get("Phone"),
            Password: this.get("Password")
        };
        $.ajax({
            url: Common.getServerHost() + "/api/users/getuser",
            method: "post",
            async: false,
            data: Common.obj2param(param),
            success: function (rtnmsg) {
                if (rtnmsg.returncode == 0) {
                    if (rtnmsg.result == null) {
                        alert("用户名或密码失败");
                    }
                    else {
                        Common.saveUserInfo(rtnmsg.result);

                        if (rtnmsg.result.RealName == null || rtnmsg.result.RealName == "") {
                            var cardView = CardViewSingleton();
                            cardView.render();
                            Common.gotoPage("card");
                        }
                        else {

                            location.href = "list.html";
                        }
                    }
                }
                else {
                    
                }
            },
            error: function (request, status, error) {
                alert(error);
            },
            timeout: 3000
        });
    },
    register: function (event) {
        var param = {
            Phone: this.get("Phone"),
            Password: this.get("Password"),
            UserRole: 1
        };

        $.ajax({
            url: Common.getServerHost() + "/api/users/register",
            method: "post",
            data: Common.obj2param(param),
            async: false,
            success: function (rtnmsg) {
                if (parseInt(rtnmsg.returncode) == 0) {
                    Common.localJsonStorage("user", rtnmsg.result);
                    //location.href = "/Talent/TalentInfo";

                    var cardView = CardViewSingleton();
                    cardView.render();
                    Common.gotoPage("card");

                    bln = true;
                } else {

                    alert('注册失败，请重试！');
                    bln = false;
                }
            },
            error: function (request, status, error) {
                alert(error);
                bln = false;
            },
            timeout: 30000
        });
    }
});


LoginView = Backbone.View.extend({
    initialize: function () {
    },
    render: function () {
        $("#username").val("");
        $("#password").val("");
    },
    events: {
        'click #loginop': 'login',
        'click #loginBack': 'loginBack',
        'click #labReg' : 'gotoReg'
    },
    login: function (event) {
        var user = new UserModel;
        user.set({
            Phone: $("#username").val(),
            Password: $("#password").val()
        });

        var bln = this.validateLog(user.get('Phone'), user.get('Password'));

        if (bln) {
            user.getUserDetail();
        }
    }
    , loginBack: function (event) {
        
        Common.slideupout("homepage");
    },
    gotoReg: function (event) {
        var registerView = RegisterViewSingleton();
        registerView.render();
        Common.gotoPage("registerPage");
    },
    validateLog: function (username, password) {
        if (username == "") {
            alert('请输入用户名！');
            return false;
        }

        if (password == "") {
            alert('请输入密码！');
            return false;
        }

        return true;
    }
});

RegisterView = Backbone.View.extend({
    initialize: function () {
    },
    render: function () {
        $("#reUsername").val("");
        $("#rePassword").val("");
        $("#rePasswordConfirm").val("");
    },
    events: {
        'click #registerOp': 'register',
        'click #registerBack': 'registerBack',
        'click #gotoLog': 'gotoLog'
    },
    register: function (event) {
        var user = new UserModel;
        user.set({
            Phone: $("#reUsername").val(),
            Password: $("#rePassword").val()
        });

        var bln = this.validatereg($("#reUsername").val(), $("#rePassword").val(), $("#rePasswordConfirm").val());
        if (bln) {
            user.register();
        }
    }
    , registerBack: function (event) {
        Common.slideupout("homepage");
    },
    gotoLog: function (event) {
        var loginView = LoginViewSingleton();
        Common.gotoPage("loginpage");
    },
    validatereg: function (username, password, repassword) {
        if (username == "") {
            alert('请输入用户名！');
            return false;
        }

        if (password == "") {
            alert('请输入密码！');
            return false;
        }

        if (repassword == "") {
            alert('请确认密码！');
            return false;
        }

        if (username.indexOf('@') > 0) {
            var emailreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if (!emailreg.test(username)) {
                alert('请输入有效的邮箱！');
                return false;
            }
        }
        else {

            var myreg = /^(1+\d{10})$/;
            if (!myreg.test(username)) {
                alert('请输入有效的手机号码！');
                return false;
            }
        }

        var len = password.length;
        if (len < 6 || len > 20) {
            alert('密码长度限制为6～20！');
            return false;
        }

        if (password != repassword) {
            alert('两次输入的密码不一样！');
            return false;
        }

        return true;

    }
});