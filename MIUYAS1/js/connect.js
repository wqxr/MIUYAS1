$(function(){
    userIsLogin();//判断用户是否登录
    $.post("/getAllType",null,function(data){//获取所有类型
        if(data.err){
            if(data.err=="0"){
                 alert("数据库连接失败...");
            }else if(data.err=="1") {
                alert("数据查询失败...");
             }
        }else{
            $.each(data,function(index,item){
                $("#tid").append($("<option value='"+item.typeid+"'>"+item.typename+"</option>"));
            })
        }
    });
    //获取所有的保存的文章

});

//显示所有文章的方法

function check(obj){//验证邮箱
    var reg =/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/g;//邮箱验证
    if(reg.test($(obj).val())){
        $(obj).css("border-color","green");
        $.post("/getelma",{eml:$(obj).val()},function(data){
        })
    }else{
        $(obj).css("border-color","red");
    }
}
function userlogin(){//用户登录
    var uname= $.trim($("#user").val());
    var password= $.trim($("#password").val());
    $.post("login",{uname:uname,password:password},function(data){
        if(data=="1"){
            alert("用户名不能为空...")
        }else if(data=="2"){
            alert("密码不能为空...")
        }else if(data=="3"){
            alert("数据库连接失败...");
        }else if(data=="4"){
            alert("数据库查询失败...");
        }else if(data=="0") {
            alert("用户名或者密码错误..");
        }else{
            $("#submit_div").hide();
            $("#all_content").attr("class","");
            var str='<a id="'+data.userid+'" href="">'+data.uname+'</a>';
            var str1='<a id="tuichu" href="javascript:userOutLogin()">退出</a>';
            $(".container").find("li").eq(0).html(str);
            $(".container").find("li").eq(1).html(str1);

        }

    },"json");
}
function register() {//用户注册
    var sname = $.trim($("#sname").val());
    var pwd = $.trim($(".pwd").val());
    var tel = $.trim($("#tel").val());
    var eml = $.trim($("#eml").val());
    var emlma = $.trim($("#emlma").val());

    if (sname =="") {
     $("#sname").css("border-color", "red");
          return;
     } else if (pwd =="") {
     $("#pwd").css("border-color", "red");
         return;
     } else if (tel =="") {
     $("#tel").css("border-color", "red");
        return;
    } else if (eml=="") {
        $("#eml").css("border-color", "red");
         return;
     } else if (emlma =="") {
        $("#emlma").css("border-color", "red");
         return;
     } else {
        $.post("adduser", {sname: sname, pwd: pwd, tel: tel, eml: eml, emlma: emlma}, function (data) {

            var data = $.trim(data);
            if (data == "1") {
                alert("数据库错误，请检查数据库");
            } else if (data == "2") {
                alert("请把信息填写完整...");
            } else if (data == "3") {
                alert("验证码输入不正确...");
            } else {
                alert("注册成功");
                $("#add_div").hide();
                $("#all_content").attr("class","");

            }
        }, "text");
    }
}
userIsLogin();
function userIsLogin(){//判断用户是否登录
    $.post("userIsLogin",null,function(data){

        var str;
        var str1;
        if(data!="0"){

            str='<a id="'+data.userid+'" href="">'+data.uname+'</a>';
            var str1='<a id="tuichu" href="javascript:userOutLogin()">退出</a>';

        }else{
            str='<a href="javascript:userlo()">登录</a>';
            str1='<a href="javascript:zhuce()">注册</a>';

        }
        $(".container").find("li").eq(0).html(str);
        $(".container").find("li").eq(1).html(str1);

    },"json");

}
function userOutLogin(){
    $.post("exit",null,function(data){
        if(data=="0"){
            str='<a href="javascript:userlo()">登录</a>';
            str1='<a href="javascript:zhuce()">注册</a>';
        }
        $(".container").find("li").eq(0).html(str);
        $(".container").find("li").eq(1).html(str1);

    })

}
//首页点击发表文章
function pushtitle(obj){
    $.post("/pushtitle",null,function(data){
        if(data=="0"){
            alert("请登录");
            userlo();
        }else{
            location.href='../editor.html';
        }
    })
}
//发布后显示在网页上排班
