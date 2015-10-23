var _talentListViewSingleton = null;
function TalentListViewSingleton() {
    if (_talentListViewSingleton == null) {
        _talentListViewSingleton = new TalentListView({ el: $("#talentlist") });
    }

    return _talentListViewSingleton;
}

TalentListModel = Backbone.Model.extend({
    initialize: function () {

    },
    default: {
        Avatar : null,
        Name: null,
        Position: null,
        City: null,
        Company: null,
        Salary:null
    }
});


TalentListView = Backbone.View.extend({
    initialize: function () {

    },
    render: function () {
        this.renderList();
    },
    template: _.template($("#list_template").html()),
    events: {
        'click #addTalent':'addTalent',
        'click #left': 'loginout',
        'click #exportlist': 'exportlist'
    },
    renderList: function () {
        $("#listdiv").html("");
        var param = {
            pageIndex: 1,
            pageSize: 10,
            advisorId: Common.userInfo().UserInfoId,
            startTime: null,
            endTime: null
        };

        var $_this = this;
        $.ajax({
            url: Common.getServerHost() + "/api/Talent/GetPageListWithAdvisorId?" + Common.obj2param(param),
            method: "get",
            async: false,
            success: function (rtnmsg) {
                var list = rtnmsg.list;
                

                for (var i = 0; i < list.length; i++) {
                    var item = list[i];
                    var salary = "";
                    if (item.Salary != 0) {
                        salary = "薪资低于「" + item.Salary + "W」不考虑";
                    }

                    var temp = $_this.template({
                        tmp_avatar: "/img/anonymous.png",
                        tmp_name: item.Name,
                        tmp_position: item.Position,
                        tmp_city: item.City,
                        tmp_company: item.Company,
                        tmp_salary: salary
                    });

                    $("#listdiv").append(temp);
                }

            },
            error: function (request, status, error) {

            },
            timeout: 5000
        });

    },
    addTalent: function () {
        location.href = "/Talent/TalentInfo";
    },
    loginout: function () {
        Common.removeUserInfo();
        location.href = "/home.html";
    },
    exportlist: function () {
        var param = {
            userInfoId: Common.userInfo().UserInfoId
        };

        var $_this = this;
        $.ajax({
            url: Common.getServerHost() + "/api/Email/ExportTalentListExcel?" + Common.obj2param(param),
            method: "get",
            async: true,
            success: function (rtnmsg) {
               

            },
            error: function (request, status, error) {

            },
            timeout: 5000
        });

        alert("您的请求已发送到服务器");
    }
});