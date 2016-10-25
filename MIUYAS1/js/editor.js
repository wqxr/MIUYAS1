$(function(){
    $.post("getname",null,function(data){
        $(".container_miuyas").append("<a>"+data.uname+"</a>");
    });
    $.post("/saved",null,function(data){
        if(data=="0"){
            alert("数据库连接失败...");
        }else if(data=="1"){
            alert("数据查询失败...");
        }else {
            $.each(data,function(index,item) {

                $(".left_content").find("ul").append("<li><a href='javascript:void(0)' onclick='huocontentall(this)'  class='"+item.Tonid+"' >" +item.Tonname+"</a><br/><p style='float:right;font-size:14px;color:#ccc;'>"+item.publishtime+"</p></li>");
            })
        }
    })
})

function huocontentall(obj){
    var nameid=($(obj).attr("class"));//获取文章编号
    $("#imagesss").css("display","none");
    $.post("/huocontentall",{nameid:nameid},function(data){
        $.each(data,function(index,item){
            $("#title").val(item.Tonname);
            $("#daoyu").val(item.textintroduce);
            $("#tid").html(item.Tonname);
            var contenting=item.content;
            var reg=/^(src)/
            $("#xe").html(item.content);

           var Tonimg= item.Tonimg.split(",");
            var  dd=document.getElementById("pic");
            $(dd).html("");
            for(var i=0;i<Tonimg.length;i++){

                 dd.innerHTML+="<div style='float:left;height:150px;width:150px;'><img style='width:150px;height:150px;margin-top:-150px;' src='"+Tonimg[i]+"'/></div>";
            }

        });
    })

}
function save() {//保存获得页面信息
    var now= new Date();
    var year=now.getFullYear();
    var month=now.getMonth()+1;
    var day=now.getDate();
    var hour=now.getHours();
    var minute=now.getMinutes();
    var second=now.getSeconds();
    var nowdate=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;


var myDate = new Date();
    var title= $.trim($("#title").val());
    var jianjie= $.trim($("#daoyu").val());
    var content= $.trim($("#xe").html());

    var tid= $.trim($("#tid").val());
    $(".left_content").find("ul").append("<li><a href=''>"+title+"</a><br/><p style='float:right;font-size:14px;color:#ccc;'>"+nowdate+"</p></li>");
        //发异步请求到服务器
        $.ajaxFileUpload({
            url:"/savetitle",
            secureuri:false,//ssl用与https协议
            fileElementId:"imagesss",//要上传的文本框的id
            data:{tid:tid,title:title,jianjie:jianjie,content:content},
            dataType:"json",
            success:function(data,status){
                data= $.trim(data);
                if(data=="4"){
                    alert("请登录...");
                    userlo();
                }else if(data=='1'){
                    alert("文章保存成功");
                }else{
                    alert("文章保存失败");
                }
            },
            error:function(data,status,e){
                alert(e);
            }
        });

}
//发表文章
function addpush() {
    var title= $.trim($("#title").val());
    var jianjie= $.trim($("#daoyu").val());
    var content= $.trim($("#xe").html());
    var tid= $.trim($("#tid").val());


        //发异步请求到服务器
    $.ajaxFileUpload({
        url:"/addContent",
        secureuri:false,//ssl用与https协议
        fileElementId:"imagesss",//要上传的文本框的id
        data:{tid:tid,title:title,jianjie:jianjie,content:content},
        dataType:"json",
        success:function(data,status){
                data= $.trim(data);
                if(data=="4"){
                    alert("请登录...");
                    userlo();
                } else if(data=='1'){
                    $("#title").val("");
                    $("#daoyu").val("");
                    $("#xe").html("");
                    $("#pic").html("");
                    alert("文章发表成功");
                }else{
                    alert("文章发表失败");
                }
            },
            error:function(data,status,e){
                alert(e);
            }
          });

}


function addtype(){
    $("#title").val("");
    $("#daoyu").val("");
    $("#xe").html("");
    $("#pic").html("");
}

