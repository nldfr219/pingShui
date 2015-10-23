

var EditShareCard = function () {
    
};

EditShareCard.prototype.init = function () {
    var tbwidth = $(window).width();
    $("#user-info-icon").width(tbwidth).height(tbwidth); 

    //上传照片 start
    $("#selectPhoto").click(function () {
        $("#cameraInput").click();
    });

    $("#cameraInput").change(function (event) {
        if ($(this).val() != '')
        {
            var files = event.target.files,file;
            if (files && files.length > 0) {
                file = files[0];
            }
                     
            var reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = function (e) { // reader onload start  
                Common.loading();
                // ajax 上传图片  
                try {
                    $.post(Common.getServerHost() + "/api/users/SaveBase64File?type=shareAvatar", { img: e.target.result }, function (ret) {
                        if (ret.result != '') {
                            $("#user-info-icon").attr("src", Common.getImgServerHost() + ret.result);
                            $("#Avatar").val(ret.result);
                            //$('#showimg').html('<img src="' + ret.img + '">');
                            Common.stopload();
                        } else {
                            alert('upload fail');
                            Common.stopload();
                        }
                    }, 'json');
                }
                catch (e)
                {
                    Common.stopload();
                }
            }
        }
    });

    $("#showCard").click(function () {
        var param = {
            Avatar: $("#Avatar").val(),
            Name: $("input[name='Name']").val(),
            Position: $("input[name='Position']").val(),
            Company: $("input[name='Company']").val(),
            Weixin: $("input[name='Weixin']").val(),
            Phone: $("input[name='Phone']").val(),
        };
        var bln = false;
        Common.loading();
        $.ajax({
            url:  "/users/SaveCard",
            method: "post",
            data: Common.obj2param(param),
            async: false,
            success: function (rtnmsg) {
                location.href = "/Users/CusCard?" + Common.obj2param(param);
            },
            error: function (request, status, error) {
                alert(error);
                bln = false;
            },
            timeout: 30000
        });
    });
}