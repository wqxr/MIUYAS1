/**
 * Created by lenovo on 2016-10-12.
 */
$(function(){
    $.post("/addstream",function(data){
        if(data.err=="1"){
            alert("数据库连接失败...");
        }else if(data.err=="2"){
            alert("数据库查询失败...");
        }else{
            $.each(data,function(index,item){
                if(index==0) {
                    $("#d1").find("p").html(item.Tonname);
                    var aa = item.content;
                    var reg = /src="\S*"/igm;
                    var pics = aa.match(reg);
                    for (var pic in pics) {
                        var img = pics[pic].replace("src=", "").replace(/"/, "").replace(/"/, "");
                        if(pic<6) {
                            $(".img_show_div").append("<img src='" + pics[pic].replace("src=", "").replace(/"/, "").replace(/"/, "") + "'/>");
                            $(".one").find("h3").html("时间:" + item.publishtime + item.textintroduce);
                        }
                    }
                }
            });
        }
    });

});