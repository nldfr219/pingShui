var _contactpositionViewSingleton = null;
function ContactPositionSingleton() {
    if (_contactpositionViewSingleton == null) {
        _contactpositionViewSingleton = new ContactPositionView({ el: $("#positionPage") });
    }

    return _contactpositionViewSingleton;
}

ContactPositionView = Backbone.View.extend({
    initialize: function () {
    },
    backPage: "",
    value: "",
    tagType: 0,
    isMultiple: false,
    callback: null,
    render: function (title, backPage, valueTag, tagType, callback) {
        this.backPage = backPage;
        this.value = valueTag;
        this.tagType = tagType
        this.isMultiple = false;
        this.callback = callback;

        this.renderTagList(Common.userInfo().UserInfoId, tagType);
    },
    template: _.template($("#tag_template").html()),
    events: {
        'click #addpc': 'addTag',
        'click .devtag': 'tagSelect',
        'click .p-save': 'back'
    },
    back: function (event) {
        var val = "";

        $(".tag-g-s").each(function () {
            if (val == "") {
                val = $(this).text();
            }
            else {
                val += "," + $(this).text();
            }
        });

        if (this.callback != null) {
            this.callback(val);
        }

        var talentView = TalentViewSingleton();
        talentView.fixFloatBottom();
        Common.gobackPage(this.backPage);
    },
    addTag: function (event) {
        if ($("#p-company").val() == "")
        {
            alert("请输入公司");
            return;
        }
        if ($("#p-position").val() == "") {
            alert("请输入职位");
            return;
        }

        var tagval = $("#p-company").val() + "-" + $("#p-position").val();
        if ($.trim(tagval) != "") {

            var tag = new TagModel;
            tag.set({ TagName: tagval, RelationId: Common.userInfo().UserInfoId, Type: this.tagType });

            var msg = tag.validate(tag.attributes);
            if (msg != "") {
                alert(msg);
                return false;
            }

            tag.saveTag();

            var temp = this.template({ tagname_label: tagval });


            $("#pclist").prepend(temp);

            if (this.isMultiple) {

                var len = $(".tag-g-s").length;
                if (len < 3) {

                    $("#a-tagg .devtag").first().removeClass("tag-g").addClass("tag-g-s");
                }
            }
            else {
                $(".tag-g-s").removeClass("tag-g-s").addClass("tag-g");
                $("#pclist .devtag").first().removeClass("tag-g").addClass("tag-g-s");

                this.back();
            }

            $("#p-company").val("");
            $("#p-position").val("")

        }
    },
    tagSelect: function (event) {
        var $_this = $(event.currentTarget);
        var cla = $_this.attr("class");
        if (cla.indexOf("tag-g-s") >= 0) {

            $_this.removeClass("tag-g-s");
            $_this.addClass("tag-g");
        }
        else {
            if (this.isMultiple) {
                var len = $(".tag-g-s").length;
                if (len >= 3) {
                    alert("最多只能选三个");
                }
                else {
                    $_this.removeClass("tag-g");
                    $_this.addClass("tag-g-s");
                }
            }
            else {
                $(".tag-g-s").removeClass("tag-g-s").addClass("tag-g");

                $_this.removeClass("tag-g");
                $_this.addClass("tag-g-s");

                this.back();
            }
        }
    },
    renderTagList: function (userInfoId, type) {
        $("#pclist").html("");
        var param = {
            pageIndex: 1,
            pageSize: 999,
            relationId: userInfoId,
            type: type
        };
        if (userInfoId != "") {
            var $_this = this;
            $.ajax({
                url: Common.getServerHost() + "/api/Tag/GetTagList?" + Common.obj2param(param),
                method: "get",
                async: false,
                success: function (rtnmsg) {
                    var list = rtnmsg.list;

                    for (var i = 0; i < list.length; i++) {
                        var tagname = list[i].TagName;
                        var temp = $_this.template({ tagname_label: tagname });

                        $("#pclist").append(temp);
                    }

                    var val = $_this.value;
                    if ($.trim(val) != "") {
                        var valArr = val.split(',');
                        $(".devtag").each(function () {
                            if (valArr.indexOf($(this).text()) >= 0) {
                                $(this).removeClass("tag-g").addClass("tag-g-s");
                            }
                        });
                    }

                },
                error: function (request, status, error) {

                },
                timeout: 30000
            });
        }
    }
});