/**
 * Created by lenovo on 2016-10-13.
 */
$(function(){
    $.post("/addhufu",function(data){
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
    })

    $.post("/addhufustream",null,function(data){
            if(data.err=="1"){
                alert("数据库连接失败...");
            }else if(data.err=="2"){
                alert("数据库查询失败...");
            }else {

                datasure = data;

                $.each(datasure,function(index,item){

                 $("#user_talking").find("ul").html("");

                 if(index>=8){

                 var str="<li><a id='aa' href='论坛模板.html#"+item.Tonid+"'>"+item.Tonname+"</a></li>";
                 $("#user_talking").find("ul").eq(0).append(str);

                 }

                 })

                 }

        });

    $.post("/showhufupinlun1",null,function(data){
        if(data=="1"){
            alert("数据库连接错误...");
        }else if(data=="2"){
            alert("数据查询失败...");
        }else{
            $(".talk_address").html("");
            $.each(data,function(index,item){
                var uname=$(".container").find("li").eq(0).find("a").eq(0).html();
                var str="<div><p>用户名:"+item.uname+"</p><div class='content_talk'>"+item.content+"<span>"+item.talktime+"</span></div></div>"
                $(".talk_address").append(str);
            })

        }
    })

    })


$("#btn_article").click(function(){
    $.post("/logintalk",null,function(data){
        if(data=="0"){
            alert("请登录..");
            userlo();
        }else {

            $(".container").find("li").eq(0).find("a").eq(0).attr("class", datasure[0].typeid);
            var value1=$(".blank").eq(0).text();
            var typeid= $(".container").find("li").eq(0).find("a").eq(0).attr("class");
            var userid=$(".container").find("li").eq(0).find("a").eq(0).attr("id");
            $.post("/hufupinlun",{value1:value1,typeid:typeid,userid:userid},function(data){
                    var data= $.trim(data);
                if(data=="1"){
                    alert("数据库连接失败...");
                }else if(data=="2"){
                    alert("数据插入失败...");
                }else if(data=="3"){
                    alert("评论成功..");
                    var value1=$(".blank").eq(0).find("p").text("");
                    $.post("/showhufupinlun",{typeid:typeid},function(data){
                        if(data=="1"){
                            alert("数据库连接错误...");
                        }else if(data=="2"){
                            alert("数据查询失败...");
                        }else{
                            $(".talk_address").html("");
                            $.each(data,function(index,item){
                                var uname=$(".container").find("li").eq(0).find("a").eq(0).html();
                                var str="<div><p>用户名:"+item.uname+"</p><div class='content_talk'>"+item.content+"<span>"+item.talktime+"</span></div></div>"
                                $(".talk_address").append(str);
                            })

                        }
                    })
                }
            })

        }



    })

})