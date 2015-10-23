var _tagViewSingleton = null;
function TagViewSingleton()
{
    if (_tagViewSingleton == null) {
        _tagViewSingleton = new TagView({ el: $("#gtags") });
    }

    return _tagViewSingleton;
}

TagModel = Backbone.Model.extend({
    initialize: function () {

    },
    default: {
        TagId: null,
        TagName: null,
        RelationId: null,
        Type:null
    },
    validate: function (attributes) {
        if ($.trim(attributes.TagName) == "")
        {
            return "标签名称不能为空!";
        }

        if (attributes.Type == 6)
        {
            if (isNaN(attributes.TagName))
            {
                return "年薪只能为数字!";
            }
        }

        if (attributes.TagName.length > 50) {
            return "标签名称不能超过50个字符!";
        }

        if (attributes.Type == null) {
            return "标签类型不能为空!";
        }

        return "";
    },
    saveTag: function () {

        var msg = this.validate(this.attributes);

        if (msg != "")
        {
            alert(msg);
            return false;
        }

        var param = {
            RelationId: this.get("RelationId"),
            TagName: this.get("TagName"),
            Type: this.get("Type")
        };

        $.ajax({
            url: Common.getServerHost() + "/api/Tag/Add",
            method: "post",
            data: Common.obj2param(param),
            async: true,
            success: function (rtnmsg) {


            },
            error: function (request, status, error) {

            },
            timeout: 30000
        });

    }
});

TagList = Backbone.Collection.extend({
    model:TagModel
});

TagView = Backbone.View.extend({
    initialize: function () {
    },
    backPage: "",
    value: "",
    tagType: 0,
    isMultiple: false,
    callback:null,
    render: function (title, backPage, valueTag, tagType, isMultiple,callback) {
        this.backPage = backPage;
        this.value = valueTag;
        this.tagType = tagType
        this.isMultiple = isMultiple;
        this.callback = callback;

        this.renderTagList(Common.userInfo().UserInfoId, tagType);
        $("#tagTitle").text(title);
    },
    template:_.template($("#tag_template").html()),
    events: {
        'click #addgtag': 'addTag',
        'click .devtag': 'tagSelect',
        'click .gtag-save':'back'
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

        if (this.callback != null)
        {
            this.callback(val);
        }

        var talentView = TalentViewSingleton();
        talentView.fixFloatBottom();
        Common.gobackPage(this.backPage);
    },
    addTag: function (event) {
        var tagval = $("#addgtagText").val();
        if ($.trim(tagval) != "") {

            var tag = new TagModel;
            tag.set({ TagName: tagval, RelationId: Common.userInfo().UserInfoId, Type: this.tagType });

            var msg = tag.validate(tag.attributes);
            if (msg != "")
            {
                alert(msg);
                return false;
            }

            tag.saveTag();

            var temp = this.template({ tagname_label: tagval });

            
            $("#a-tagg").prepend(temp);

            if (this.isMultiple) {

                var len = $(".tag-g-s").length;
                if (len < 3) {
                    
                    $("#a-tagg .devtag").first().removeClass("tag-g").addClass("tag-g-s");
                }
            }
            else {
                $(".tag-g-s").removeClass("tag-g-s").addClass("tag-g");
                $("#a-tagg .devtag").first().removeClass("tag-g").addClass("tag-g-s");

                this.back();
            }

            $("#addgtagText").val("");
            
        }
        else {
            alert("请输入标签名称");
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
            if (this.isMultiple)
            {
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
    renderTagList: function (userInfoId,type)
    {
        $("#a-tagg").html("");
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
                        var tagname=list[i].TagName;
                        var temp = $_this.template({ tagname_label: tagname });

                        $("#a-tagg").append(temp);
                    }

                    $_this.renderHotData();

                    var val = $_this.value;
                    if ($.trim(val) != "") {
                        var valArr = val.split(',');
                        $(".devtag").each(function () {
                            if (valArr.indexOf($(this).text()) >= 0)
                            {
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
    },
    renderHotData: function () {
        $("#hotTag").html("");
        var bln = false;
        var hotdata = null;
        switch (this.tagType)
        {
            case 8:
                bln = true;
                hotdata = hotCity;
                break;
            default:
                bln = false;
                hotdata = null;
                break;
        }

        if (bln)
        {
            
            for (var i = 0; i < hotdata.length; i++) {
                var tagname = hotdata[i].Name;
                var temp = this.template({ tagname_label: tagname });

                $("#hotTag").append(temp);
            }
        }
    }
});