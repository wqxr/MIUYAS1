$(function(){
	var tonid=location.hash;
	var a=tonid.substr(1);
	var uname=$(".container").find("li").eq(0).text();
			uname=$.trim(uname);
	$.post("/getcontent",{id:a},function(data){
		$("#text p").eq(0).html(data.Tonname);
		$("#text p").eq(1).html(data.textintroduce);
		$("#content-total").html(data.content);
		$.post("/getallprise",{tonid:a},function(data){
				if(data=="0"){
					alert("数据库连接失败")
				}else if(data=="1"){
					alert("数据查询失败")
				
				}else{
					$("#zan_kuai p").eq(0).html("DIANZAN("+data.length+")");
				}
			})
	})
	$("#click_zan").click(function(){
		if( $(".container").find("li").eq(0).text()=="登录"){
			alert("请登录");
			userlo();
		}else{
			var uname=$(".container").find("li").eq(0).text();
			uname=$.trim(uname);
			$.post("/getprise",{uname:uname,tonid:a},function(data){
				if(data=="0"){
					alert("数据库连接失败")
				}else if(data=="1"){
					alert("数据查询失败")
				}else if(data=="2"){
					alert("数据插入失败");
				}else if(data=="3"){
					alert("数据库查询点赞数失败")
				}else if(data=="have prised"){
					alert("小主已经点过赞了")
				}else{
					alert("您已成功点赞")
					$("#zan_kuai p").eq(0).html("DIANZAN(+"+data.length+")");
				}
			})
		}
	})

})