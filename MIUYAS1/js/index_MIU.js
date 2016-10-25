$(function() {
	//     滚动导航栏效果

	$(window).scroll(function () {
		// console.info($(window).scrollTop());

		if ($(window).scrollTop() >= 48) {
			$("#myCollapse").css({"position": "fixed", "top": "0px", "left": "0px", "z-index": 999});
		} else {
			$("#myCollapse").css({"position": "relative"});
		}
	})
	var index = 0;
		//图片自动转换
	function pic_change() {
		$(".bg_pic>a>img")[index].className = "hide";
		// $(".bg_pic>a").eq(index).find($(".pic_title")).hide();
		index++;
		if (index > ($(".bg_pic>a>img").length - 1)) {
			index = 0;
		}
		$(".bg_pic>a>img")[index].className = "show";
		// $(".bg_pic>a").eq(index).find($(".pic_title")).show();
	}

	var int = setInterval(pic_change, 2000);//给定时器取名

	

	$(".img_prev").click(function () {

		$(".bg_pic>a>img")[index].className = "hide";
		index--;
		if (index < 0) {
			index = $(".bg_pic>a>img").length - 1;
		}
		$(".bg_pic>a>img")[index].className = "show";
	})

	$(".img_next").click(function () {
		$(".bg_pic>a>img")[index].className = "hide";
		index++;
		if (index > ($(".bg_pic>a>img").length - 1)) {
			index = 0;
		}
		$(".bg_pic>a>img")[index].className = "show";
	})
	$.post("/getmiuyasbg",null,function(data){
		if(data=="0"){
			alert("数据库连接失败");
		}else if(data=="1"){
			alert("数据库查询失败")
		}else{
			$("#hot ol li").each(function(i,item){
				$(item).html(data[i+30].Tonname)
				.click(function(){
					location.href="论坛模板.html#"+data[index+30].Tonid;
				})
			})
			$(".bg_pic>a>img").each(function(index,item){
				$(item).attr("src",data[index+14].Tonimg);
				$(item).hover(function () {
					clearInterval(int);//清除定时器
					$(".bg_pic>a").append("<div class='pic_title'>"+data[index+14].Tonname+"</div>");
					$("pic_title").css("z-index", "2");

				}, function () {
					int = setInterval(pic_change, 2000);//重启定时器
					$(".pic_title").remove();
				})
				$(item).parent().attr("href","论坛模板.html#"+data[index+14].Tonid);
			})
		}
	})
	//摄影
	$(".camera_page").css("cursor","pointer").click(function(){
		location.href="camera.html";
	})
	
	
	$(".camera_img_content").hover(function(){
		$(this).css("position","relative")
		.prepend("<div id='camera_img'><p>给你一些拍摄灵感 八一八明星的个性婚纱照</p></div>");
		$("#camera_img").css({"display":"block","background":"rgba(0,0,0,0.5)","z-index":"2"})
		.stop()
		.animate({
			height:"346px"
		},1000,"linear")
		$("#camera_img p").click(function(){
			var ptext=$(this).text();
		$.post("/getneedCamera",{text:ptext},function(data){
			if(data=="0"){
				alert("数据库连接失败");
			}else if(data=="1"){
				alert("数据库查询失败");
			}else{
				location.href="论坛模板.html#"+data.Tonid;
			}
		})
		})
		
	},function(){
		$("#camera_img").remove();
	})
	$(".camera_right_img").hover(function(){
		$(this).css({"position":"relative","width":"439px","height":"516px"})
		.prepend("<div id='camera_img_jialin'><p>刘嘉玲晒性感复古写真 全裸美背曲线迷人</p></div>");
		$("#camera_img_jialin").css({"display":"block","background":"rgba(0,0,0,0.5)","z-index":"2"})
		.stop()
		.animate({
			height:"516px"
		},1000,"linear")
		$("#camera_img_jialin p").click(function(){
			var ptext=$(this).text();
		$.post("/getneedCamera",{text:ptext},function(data){
			if(data=="0"){
				alert("数据库连接失败");
			}else if(data=="1"){
				alert("数据库查询失败");
			}else{
				location.href="论坛模板.html#"+data.Tonid;
			}
		})
		})
		
	},function(){
		$("#camera_img_jialin").remove();
	})
	$(".camera_list p").each(function(i,item){
		$(item).click(function(){
		var text=$(item).text();
		$.post("/getneedCamera",{text:text},function(data){
			if(data=="0"){
				alert("数据库连接失败");
			}else if(data=="1"){
				alert("数据库查询失败");
			}else{
				location.href="论坛模板.html#"+data.Tonid;
			}
		})
	})
})





	//穿搭FASHION
	$(".style_page").css("cursor","pointer").click(function(){
		location.href="穿搭.html";
	})

	
	$.post("/getstyle",function(data){
				if(data=="0"){
					alert("数据库连接失败");
				}else if(data=="1"){
					alert("数据库查询失败");
				}else{
					$.each(data,function(index,item){
						$(".div_img img").eq(index).attr("src",item.Tonimg);
						$(".div_img").eq(index).hover(function () {

		var img = $(this).children("img");
		var width = img.width();
		var height = img.height();

		$(this).prepend("<div class='mouse_div' style='background-color:rgba(0,0,0,0.7);position:inherit;top:0px;left:0px;width:" + width + "px;height:" + height + "px;padding-top:25%;z-index:3;cursor:pointer'><p class='div_p'></p></div>");

		$('.div_p').text(item.Tonname)
			.css("opacity", "0")
			.stop()
			.animate({
				opacity: "1"
			}, 2000, "linear")
			.click(function(){
				location.href="论坛模板.html#"+item.Tonid;
			})
		img.stop().animate({
			width: width + Number(20),
			height: height + Number(20)
		}, 1000, 'linear');


	}, function () {
		var img = $(this).children("img");
		//img.css("z-index","2");
		var width = $(this).width();
		var height = $(this).height();
		$(".mouse_div").remove();
		img.stop()
			.animate({
				width: width,
				height: height
			}, 500, 'linear')

	})

					})
				}
			})

	//健身
	$(".health_page").css("cursor","pointer").click(function(){
		location.href="健身.html";
	})
	$.post("/gethealth",function(data){
		if(data=="0"){
				alert("数据库连接失败");
			}else if(data=="1"){
				alert("数据库查询失败");
			}else{
				$(".health_div_list ul li").each(function(i,item){
					 $(this).find("a").text(data[i].Tonname)
					 .attr("href","论坛模板.html#"+data[i].Tonid)

				})

				
			}
	})

	//美妆
	$(".beaty_page ").css("cursor","pointer").click(function(){
		location.href="beaty.html";
	})
	$.post("/getbeaty",function(data){
		if(data=="0"){
				alert("数据库连接失败");
			}else if(data=="1"){
				alert("数据库查询失败");
			}else{
				$(".dl_div dl").each(function(i,item){
					$(this).find("img").attr("src",data[i].Tonimg)
					.click(function(){
						location.href="论坛模板.html#"+data[i].Tonid;
					})
					$(this).find("dd").text(data[i].Tonname)
				})
			}
	})

	//造型
	$(".i_page ").css("cursor","pointer").click(function(){
		location.href="护肤.html";
	})
	$.post("/getib",function(data){
		if(data=="0"){
				alert("数据库连接失败");
			}else if(data=="1"){
				alert("数据库查询失败");
			}else{
				$(".skin_div_list ul li").each(function(i,item){
					$(item).find("a").text(data[i].Tonname)
					.attr("href","论坛模板.html#"+data[i].Tonid)

				})
				
			}
	})

})
			
	
	//登录注册页面
	
		//*$(".brand_menu li").eq(0).click(function() {
			function userlo() {
				$("#all_content").attr("class", "frosted-glasss");
				$("#submit_div").show();
				$("#add_div").hide();
				$(".close_x_add").click(function () {
					$("#all_content").attr("class", "");
					$("#submit_div").fadeOut(function () {
						$(this).hide();
					});
				});
			}


			//$(".brand_menu li").eq(1).click(function() {
				function zhuce() {
					$("#all_content").attr("class", "frosted-glasss");
					$("#add_div").show();
					$("#submit_div").hide();
					$(".close_x_add").click(function () {
						$("#all_content").attr("class", "");
						$("#add_div").fadeOut(function () {
							$(this).hide();
						})
					})
				}

