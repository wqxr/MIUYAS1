
$(function(){
    var aa=location.hash;
    var contentclear=aa.substr(1);
    // $("#content-total").html(content);
    $.post("/addcontentclear",{contentclear:contentclear},function(data){
        $("#content-total").html(data.content);
    })
    $("#textarea textarea").val("");
    $.post("/findpinlun",{contentclear:contentclear},function(data){
        $.each(data,function(index,item){
            $("#luntan_1").append("<div class='luntan_5'><p style='margin-left:10px'>用户名："+item.uname+"</p><p style='margin-left:20px;font-weight:bold;'>"+item.content+"</p><p style='float:right;margin-right:10px;'>"+item.talktime+"</p><br/><hr></div>");

        })
    })
});

$("#textarea textarea").keyup(function(){
    //$("h5").html(140-$(this).val().length);
    if($(this).val().length<140){
        $("h5").html(140-$(this).val().length);

    }else{
        $("span").html("您超出了:"+($(this).val().length-140)+"个字");
    }
});
$("#fabu").click(function(){
    $.post("/userloging",function(data) {
        if (data == "0") {
            alert("请登录...");
            userlo();
        } else {
            var aa = location.hash;
            var contentclear = aa.substr(1);
            var userid = $(".container").find("li").eq(0).find("a").attr("id");
            var talkabout = $("#textarea textarea").val();
            $.post("/submittalk", {talkabout: talkabout, userid: userid, Tonid: contentclear}, function (data) {
                if (data == "6") {
                    alert("评论发布成功...");
                    $("#textarea textarea").val("");
                    var aa = location.hash;
                    var contentclear = aa.substr(1);
                    $.post("/showpinlun", {Tonid: contentclear}, function (data) {
                        if (data == "1") {
                            alert("数据库连接失败...");
                        } else if (data == "2") {
                            alert("数据查询失败...");
                        } else if (data == "0") {
                            alert("您没有选择文章...")
                        } else {
                            $(".luntan_5").remove();
                            $.each(data, function (index, item) {
                                $("#luntan_1").append("<div class='luntan_5'><p style='margin-left:10px'>用户名："+item.uname+"</p><p style='margin-left:20px;font-weight:bold;'>"+item.content+"</p><p style='float:right;margin-right:10px;'>"+item.talktime+"</p></div><br/><hr>");
                            })
                        }
                    })
                } else {
                    alert("评论失败...");
                }
            })
        }
    })
})





