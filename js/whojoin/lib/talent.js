var _talentViewSingleton = null;
function TalentViewSingleton() {
    if (_talentViewSingleton == null) {
        _talentViewSingleton = new TalentView({ el: $("#talent") });
    }

    return _talentViewSingleton;
}

TalentModel = Backbone.Model.extend({
    initialize: function () {

    },
    default: {
        TalentPoolId: 0,
        UserInfoId: 0,
        AdvisorId: 0,
        Name: null,
        ContactPosition: null,
        ConsiderPosition : 0,
        Phone: null,
        Email: null,
        Gender: 0,
        Source: null,
        Company: null,
        Position: null,
        Salary: 0,
        Capability: null,
        City: null,
        ExpectCity: null,
        ExpectChance: null,
        ExpectSalary: 0,
        ConsiderStartup: 0,
        ConsiderStartupReason: null,
        Tag: null,
        Remark: null,
        WorksUrl: null,
        Status: 0,
        ContactTime: null,
        FollowupTime: null,
        FollowupContent: null,
        RecommendId: 0,
        RecommendName: null,
        RecommendPhone: null,
        RecommendEmail: null,
        RecommendGender: 0,
        RecommendCompany: null,
        RecommendPosition: null,
        RecommendCity : null
    },
    validate: function (attributes) {
        return "";
    },
    saveTalent: function (callback) {

        var msg = this.validate(this.attributes);

        if ($.trim(msg) != "")
        {
            alert(msg);
            return;
        }

        $.ajax({
            url: Common.getServerHost() + "/api/Talent/Save",
            method: "post",
            data: Common.obj2param(this.attributes),
            async: false,
            success: function (rtnmsg) {
                if (rtnmsg.returncode == 0)
                {
                    $("#TalentPoolId").val(rtnmsg.result);
                }

                if (callback)
                {
                    callback(rtnmsg);
                }

                var view = TalentViewSingleton();
                view.renderRecommendList();

            },
            error: function (request, status, error) {
                alert(error);
            },
            timeout: 30000
        });
    },
    getRecommendList: function (callback) {
        var param = {
            pageIndex: 1,
            pageSize: 5,
            UserInfoId: Common.userInfo().UserInfoId,
            Status: 0
        };


        $.ajax({
            url: Common.getServerHost() + "/api/Talent/GetRecommendList?" + Common.obj2param(param),
            method: "get",
            async: false,
            success: function (rtnmsg) {
                var list = rtnmsg.list;
                if (callback) {
                    callback(list);
                }

            },
            error: onerror,
            timeout: 3000
        });

    }
});

TalentView = Backbone.View.extend({
    tagView: null,
    refereeView: null,
    contactPositionView:null,
        initialize: function () {
            var screenWidth = $(window).width();
            $(".devDesc").width(screenWidth - 33);

            this.tagView = TagViewSingleton();
            this.refereeView = RefereeViewSingleton();
            this.contactPositionView = ContactPositionSingleton();
        },
        render: function () {
            this.renderRecommendList();
        },
        events: {
            'click #position': 'selectPosition',
            'click #source': 'selectSource',
            'click #company': 'selectCompany',
            'click #currentPosition': 'selectCurrentPosition',
            'click #salary': 'selectSalary',
            'click #currentCity': 'selectCurrentCity',
            'click #expectCity': 'selectExpectCity',
            'click #expectSalary': 'selectExpectSalary',
            'click #talentTag': 'selectTalentTag',
            'click #refereeM': 'gotoReferee',
            'click #talentClearbtn': 'clear',
            'click #loginout':'loginout',
            'click #sendmsg': 'sendMsg',
            'click .devContact' : 'selectContact'
        },
        selectPosition: function (event) {
            this.contactPositionView.render("联系职位", "talent", $("#positionText").val(), 11, function (val) {
                $("#positionText").val(val);
            });
            Common.gotoPage("positionPage");
        },
        selectSource: function (event) {
            this.tagView.render("消息来源", "talent", $("#sourceText").val(), 4, false, function (val) {
                $("#sourceText").val(val);
            });
            Common.gotoPage("gtags");
        },
        selectCompany: function (event) {
            this.tagView.render("目前公司", "talent", $("#companyText").val(), 5, false, function (val) {
                $("#companyText").val(val);
            });
            Common.gotoPage("gtags");
        },
        selectCurrentPosition: function (event) {
            this.tagView.render("目前职位", "talent", $("#currentPositionText").val(), 3, false, function (val) {
                $("#currentPositionText").val(val);
            });
            Common.gotoPage("gtags");
        },
        selectSalary: function (event) {
            this.tagView.render("年薪（万/年）", "talent", $("#salaryVal").val(), 6, false, function (val) {
                if (val != "") {
                    $("#salaryText").val("年薪" + val + "万左右");
                    $("#salaryVal").val(val);
                }
            });
            Common.gotoPage("gtags");
        },
        selectCurrentCity: function (event) {
            this.tagView.render("目前所在城市", "talent", $("#currentCityText").val(), 8, false, function (val) {
                $("#currentCityText").val(val);
            });
            Common.gotoPage("gtags");
        },
        selectExpectCity: function (event) {
            this.tagView.render("期望的城市", "talent", $("#expectCityText").val(), 8, true, function (val) {
                $("#expectCityText").val(val);
            });
            Common.gotoPage("gtags");
        },
        selectExpectSalary: function (event) {
            this.tagView.render("期望的薪资", "talent", $("#expectSalaryVal").val(), 6, false, function (val) {
                if (val != "") {
                    $("#expectSalaryText").val("年薪" + val + "万以下就不考虑了");
                    $("#expectSalaryVal").val(val);
                }
            });
            Common.gotoPage("gtags");
        },
        selectTalentTag: function (event) {
            this.tagView.render("标签", "talent", $("#talentTagText").val(), 10, true, function (val) {
                $("#talentTagText").val(val);
            });
            Common.gotoPage("gtags");
        },
        gotoReferee: function (event) {
            this.refereeView.render();
            Common.gotoPage("referee");
        },
        saveTalent: function (callback) {
            var talent = new TalentModel;
            talent.set({
                RecommendId: $("#RecommendId").val(),
                TalentPoolId : $("#TalentPoolId").val(),
                UserInfoId: 0,
                AdvisorId: Common.userInfo().UserInfoId,
                Name: $("#name").val(),
                ContactPosition: $("#positionText").val(),
                ConsiderPosition: $("#considerPosition").val() == "1" ? true : false,
                Phone: $("#phone").val(),
                Email: $("#email").val(),
                Gender: $("#gender").val(),
                Source: $("#sourceText").val(),
                Company: $("#companyText").val(),
                Position: $("#currentPositionText").val(),
                Salary: $("#salaryVal").val(),
                Capability: $("#capability").val(),
                City: $("#currentCityText").val(),
                ExpectCity: $("#expectCityText").val(),
                ExpectChance: $("#expectChanceText").val(),
                ExpectSalary: $("#expectSalaryVal").val(),
                ConsiderStartup: $("#considerStartup").val() == "1" ? true : false,
                ConsiderStartupReason: $("#considerStartupReason").val(),
                Tag: $("#talentTagText").val(),
                Remark: $("#description").val(),
                WorksUrl: $("#worksUrl").val(),
                Status: 0,
                FollowupTime: $("#followupTime").val(),
                FollowupContent: $("#followupContent").val()
            });

            if (!callback)
            {
                callback = function (rtnmsg) {
                    if (parseInt(rtnmsg.returncode) == 0) {
                        alert("保存成功！");
                        
                    } else {

                        alert('保存失败！');
                    }
                }
            }

            talent.saveTalent(callback);
        },
        loginout: function () {
            location.href = "/list.html";
           
        },
        sendMsg: function (event) {
            var isSave = $("#isSave").val();

            if ($("#name").val() == "")
            {
                alert("请填写候选人姓名");
                return;
            }

            if ($("#phone").val() == "")
            {
                alert("请填写候选人联系电话");
                return;
            }

            if ($("#companyText").val() == "") {
                alert("请填写候选人目前公司");
                return;
            }

            if ($("#currentPositionText").val() == "") {
                alert("请填写候选人目前职位");
                return;
            }

            var sendfuc = function () {
                $("#isSave").val("1");

                var parms = {
                    sender: Common.userInfo().UserInfoId,
                    Receiver: $("#name").val(),
                    Phone: $("#phone").val(),
                    Type: 2
                };

                $.ajax({
                    url: Common.getServerHost() + "/api/Sms/SendSms",
                    method: "post",
                    data: Common.obj2param(parms),
                    async: false,
                    success: function (rtnmsg) {
                        if (parseInt(rtnmsg.returncode) == 0) {
                            alert("发送成功！");
                        } else {
                            alert(rtnmsg.message);
                        }
                    },
                    error: function (request, status, error) {
                        alert(error);
                    },
                    timeout: 3000
                });
            };

            if (isSave == "0") {
                this.saveTalent(sendfuc);
                $("#sendmsg").text("保存");
            }
            else {
                this.saveTalent();
            }
        },
        clear: function () {
            $("#RecommendId").val("0");
            $("#TalentPoolId").val("0");
            $("#name").val("");
            $("#positionText").val("");
            $("#phone").val("");
            $("#email").val("");
            $("#gender").val("0");
            $("#sourceText").val("");
            $("#companyText").val("");
            $("#currentPositionText").val("");
            $("#salaryText").val("");
            $("#salaryVal").val("");
            $("#capability").val("");
            $("#currentCityText").val("");
            $("#expectCityText").val("");
            $("#expectChanceText").val("");
            $("#expectSalaryVal").val("");
            $("#considerStartup").val("0");
            $("#considerStartupReason").val("");
            $("#talentTagText").val("");
            $("#description").val("");
            $("#worksUrl").val("");
            $("#followupTime").val("");
            $("#ref-name").val("");
            $("#ref-phone").val("");
            $("#ref-email").val("");
            $("#ref-gender").val("");
            $("#ref-companyText").val("");
            $("#ref-currentPositionText").val("");
            $("#ref-currentCityText").val("");
            this.refereeView.clearData();
            $("#ref-list").html("");
        },
        fixFloatBottom: function () {
            $("#floatFooter").removeClass("floatFooter").addClass("floatFooter");
        },
        renderRecommendList: function ()
        {
            var talent = new TalentModel;
            talent.getRecommendList(function (list) {
                var rtemp = _.template($("#contact_template").html());
                $("#contactUl").html("");
                
                for (var i = 0; i < list.length; i++)
                {
                    var item = rtemp({
                        tmp_rid: list[i].RecommendId,
                        tmp_name: list[i].Name,
                        tmp_phone: list[i].Phone,
                        tmp_email: list[i].Email,
                        tmp_gender: list[i].Gender,
                        tmp_company: list[i].Company,
                        tmp_position: list[i].Position,
                        tmp_city: list[i].City,
                        tmp_value: list[i].Name + " " + list[i].Company + " " + list[i].Position 
                    });

                    $("#contactUl").append(item);
                }
            });
        },
        selectContact: function (event) {

            this.clear();
            var $this = $(event.currentTarget);

            var refid = $this.attr("rid");
            var name = $this.attr("relname");
            var phone = $this.attr("phone");
            var email = $this.attr("email");
            var gender = $this.attr("gender");
            var company = $this.attr("company");
            var position = $this.attr("position");
            var city = $this.attr("city");

            $("#RecommendId").val(refid);
            $("#name").val(name);
            $("#phone").val(phone);
            $("#email").val(email);
            $("#gender").val(gender);
            $("#companyText").val(company);
            $("#currentPositionText").val(position);
            $("#currentCityText").val(city);
        }
    });