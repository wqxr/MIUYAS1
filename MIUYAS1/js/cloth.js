/*$(function(){
    $.post("/getcloth",function(data){
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

                                $(".img_show_div").append("<img src='" + pics[pic].replace("src=", "").replace(/"/, "").replace(/"/, "") + "'/>");
                                $(".one").find("h3").html("时间:"+item.publishtime+item.textintroduce);

                            }
                }
            });
        }
    })
});*/
$(function(){
    $.post("/getcloth",function(data){
        $.each(data,function(index,item) {
            $("#total").find("div").eq(index).find("img").attr("src", item.Tonimg);
            $("#total").find("div").eq(index).find("strong").html(item.Tonname);
            $("#total").find("div").eq(index).find("p").html(item.textintroduce);
            $("#total").find("div").eq(index).find("a").attr("href","论坛模板.html#"+item.Tonid);
        })
    });

})
