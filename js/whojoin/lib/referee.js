var _refereeViewSingleton = null;
var _refereeItem = null;
function RefereeViewSingleton() {
    if (_refereeViewSingleton == null) {
        _refereeViewSingleton = new RefereeView({ el: $("#referee") });
    }

    return _refereeViewSingleton;
}

RecommendTalentModel = Backbone.Model.extend({
    initialize: function () {

    },
    default: {
        RecommendId: null,
        TalentPoolId: null,
        UserInfoId: null,
        Name: null,
        Phone: null,
        Email: null,
        Gender: null,
        Company: null,
        Position: null,
        City: null
    },
    validate: function (attributes) {
        if (attributes.Name == "") {
            return "请输入推荐人姓名";
        }
        if (attributes.Phone == "") {
            return "请输入推荐人电话";
        }
        if (attributes.Company == "") {
            return "请输入推荐人公司";
        }
        if (attributes.Position == "") {
            return "请输入推荐人职位";
        }

        return "";
    },
    SaveRec: function (callback)
    {
        var msg = this.validate(this.attributes);
        if (msg != "")
        {
            alert(msg);
            return;
        }

        $.ajax({
            url: Common.getServerHost() + "/api/Talent/SaveRecommend",
            method: "post",
            async: false,
            data: Common.obj2param(this.attributes),
            success: function (rtnmsg) {
                if (callback) {
                    callback(rtnmsg);
                }
            },
            error: onerror,
            timeout: 3000
        });
    }
});


RefereeView = Backbone.View.extend({
    tagView: null,
    itemTag:null,
    initialize: function () {
        this.tagView = TagViewSingleton();
    },
    render: function () {
        this.clearData();
    },
    template: _.template($("#ref_template").html()),
    events: {
        'click .ref-save': 'goBack',
        'click #ref-company': 'selectCompany',
        'click #ref-currentPosition': 'selectPosition',
        'click #ref-currentCity' : 'selectCity',
        'click #addref': 'addref',
        'click .devlistitem' : 'editItem'
    },
    goBack: function () {
        Common.gobackPage("talent");
    },
    selectCompany: function (event) {
        this.tagView.render("目前公司", "referee", $("#ref-companyText").val(), 5, false, function (val) {
            $("#ref-companyText").val(val);
        });
        Common.gotoPage("gtags");
    },
    selectPosition: function (event) {
        this.tagView.render("职位", "referee", $("#ref-currentPositionText").val(), 3, false, function (val) {
            $("#ref-currentPositionText").val(val);
        });
        Common.gotoPage("gtags");
    },
    selectCity: function (event) {
        this.tagView.render("目前所在城市", "referee", $("#ref-currentCityText").val(), 8, false, function (val) {
            $("#ref-currentCityText").val(val);
        });
        Common.gotoPage("gtags");
    },
    addref: function (event) {

        var $this = this;


        var model = new RecommendTalentModel;

        model.set({
            RecommendId: $("#refid").val(),
            TalentPoolId: 0,
            UserInfoId: Common.userInfo().UserInfoId,
            Name: $("#ref-name").val(),
            Phone: $("#ref-phone").val(),
            Email: $("#ref-email").val(),
            Gender: $("#ref-gender").val(),
            Company: $("#ref-companyText").val(),
            Position: $("#ref-currentPositionText").val(),
            City: $("#ref-currentCityText").val()
        });

        model.SaveRec(function (rtn) {
            if (rtn.returncode == 0) {
                if ($this.itemTag != null) {
                    $this.itemTag.attr("relname", $("#ref-name").val());
                    $this.itemTag.attr("phone", $("#ref-phone").val());
                    $this.itemTag.attr("email", $("#ref-email").val());
                    $this.itemTag.attr("gender", $("#ref-gender").val());
                    $this.itemTag.attr("company", $("#ref-companyText").val());
                    $this.itemTag.attr("position", $("#ref-currentPositionText").val());
                    $this.itemTag.val($("#ref-name").val() + " " + $("#ref-companyText").val() + " " + $("#ref-currentPositionText").val());

                    $this.itemTag = null;

                    $("#addref").text("添加");
                }
                else {
                    var temp = $this.template({
                        tmp_talentid : rtn.result,
                        tmp_name: $("#ref-name").val(),
                        tmp_phone: $("#ref-phone").val(),
                        tmp_email: $("#ref-email").val(),
                        tmp_gender: $("#ref-gender").val(),
                        tmp_company: $("#ref-companyText").val(),
                        tmp_position: $("#ref-currentPositionText").val(),
                        tmp_city: $("#ref-currentCityText").val(),
                        tmp_text: $("#ref-name").val() + " " + $("#ref-companyText").val() + " " + $("#ref-currentPositionText").val()
                    });

                    $("#ref-list").append(temp);
                }
            }
            else {
                alert("添加失败");
            }
            $this.clearData();
        });

       
    },
    clearData: function () {
        $("#refid").val("0");
        $("#ref-name").val("");
        $("#ref-phone").val("");
        $("#ref-email").val("") ;
        $("#ref-gender").val("0");
        $("#ref-companyText").val("");
        $("#ref-currentPositionText").val("");
        $("#ref-currentCityText").val("");
    },
    editItem: function (event) {
        var $this = $(event.currentTarget);
        this.itemTag = $this;

        var refif = $this.attr("talentid");
        var name = $this.attr("relname");
        var phone = $this.attr("phone");
        var email = $this.attr("email");
        var gender = $this.attr("gender");
        var company = $this.attr("company");
        var position = $this.attr("position");
        var city = $this.attr("city");

        $("#refid").val(refif);
        $("#ref-name").val(name);
        $("#ref-phone").val(phone);
        $("#ref-email").val(email);
        $("#ref-gender").val(gender);
        $("#ref-companyText").val(company);
        $("#ref-currentPositionText").val(position);
        $("#ref-currentCityText").val(city);

        $("#addref").text("保存");

    }


});