  $(".index_list").mouseenter(function(){
	$(this).stop().animate({
		width:"160px"
	},500,"linear")
})

$(".index_list").mouseleave(function(){
	$(this).stop().animate({
		width:"5px"
	},500,"linear")
});

$.post("/getallbeauty",function(data){
	if (data=="0"){
		alert("数据库连接失败")
	}else if(data=="1"){
		alert("数据库查询失败")
	}else{
		$(".today_show dd").css("background","url("+data[5].Tonimg+") no-repeat");
		$(".today_show p").text(data[5].Tonname)
		.click(function(){
			location.href="论坛模板.html#"+data[5].Tonid;
		})
	}
})
//旋转出导航
		var oHome=document.getElementById("home");
		var flag=true;
   		oHome.onmouseover=function(e){
   			var x=10;
   			var y=20;

   			if (flag) {
   				this.title="点击我开启洪荒之力~";
   			}else{
   				this.title="关闭洪荒之力~";
   			}
   			
   			
			this.temp=this.title;//temp是一个临时变量
			this.title="";
			this.temp=(this.temp?this.temp:"&nbsp;");
	   		//添加一个层在body后面
			$("body").append("<div id='newtooltip'>"+this.temp+"</div>");
			$("#newtooltip").css({"top":(e.pageY+y)+"px","left":(e.pageX+x)+"px",
			"border-radius":"15px","background":"rgba(0,0,0,0.7)",
			 "height":"40px","color":"white"})
			this.onmousemove=function(e){
				$("#newtooltip").css({"top":(e.pageY+y)+"px","left":(e.pageX+x)+"px"})
			}		
			oHome.onmouseout=function(event){
						//this.webkitTransition=1+"s";
						this.title=this.temp;
				   		this.temp="";
				   		$("#newtooltip").remove();
					}
		}
		var aImg=document.getElementById("menu_list").getElementsByTagName("img");
		var rTure=true;
		
		oHome.onclick=function(){
   			flag=!flag;
			
			var rDis=120;//飞出去的半径
			if(rTure){ //为真的时候飞出去
				for(var i=0;i<aImg.length;i++){
					//$("#menu_list img").css("to"p,"100px");
					
					$(oHome).stop().animate({
						width:"50px",
						height:"50px"
						
					},500,"linear",function(){
						$(".div_show").css("margin-top","15%")
						$("#mydivshow").attr("class","div_show col-lg-1 col-lg-push-3")
					})

					aImg[i].style.WebkitTransition="0.5s "+i*100+"ms";//设置出来的图标的过渡时间和延迟时间
					aImg[i].style.MozTransition="0.5s "+i*100+"ms";//设置出来的图标的过渡时间和延迟时间
					
					var olt=ToLT(rDis,90/4*i);  //飞出来正好构成四个角，根据角度求距左距右的值
					aImg[i].style.left=olt.l+"px";
					aImg[i].style.top=olt.t+"px";
					aImg[i].style.WebkitTransform="rotate(-360deg)";
					aImg[i].style.MozTransform="rotate(-360deg)";
					aImg[i].style.cursor="pointer";
					aImg[i].style.borderRadius="15px";
					

				}
				setTimeout(function(){
						$("#all_content").attr("class","frosted-glass")
						.after("<div id='filter_div' style='display:none'><div class='abso_div'></div><div class='close_x'></div></div>");
						//将在此处添加ul li 即文章标题
						$(".abso_div").html("<p class='title'>美妆课堂冷知识</p><ul class='beaty_title_list'></ul>");
						$(".beaty_title_list").append("<li>你好</li><li>w叫凌红竹</li><li>么么哒</li><li>么么哒</li><li>么么哒</li><li>么么哒</li><li>么么哒</li><li>么么哒</li><li>么么哒</li><li>么么哒</li><li>么么哒</li>")
						$.post("/getallbeauty",function(data){
							if (data=="0"){
								alert("数据库连接失败")
							}else if(data=="1"){
								alert("数据库查询失败")
							}else{

								$.each(data,function(i,item){
								
									if(i<=$(".beaty_title_list>li").length){
										$(".beaty_title_list>li").eq(i).text(item.Tonname)
										.click(function(){
											location.href="论坛模板.html#"+item.Tonid;
										})
										
									}else{
										$(".beaty_title_list").append("<li>"+item.Tonname+"</li>")
										$(".beaty_title_list>li").eq(i).click(function(){
											location.href="论坛模板.html#"+item.Tonid;
										})
									}
								})
							}
						})

						$(".close_x").click(function(){
							$("#all_content").attr("class","");
							$("#filter_div").remove();
						})
						$("#filter_div").fadeIn("1000");
					},1500)
				
			}else{
				for(var i=0;i<aImg.length;i++){
					$(oHome).stop().animate({
						width:"350px",
						height:"350px"
						
					},1000,"linear",function(){
						$(".div_show").css("margin-top","10%")
						$("#mydivshow").attr("class","div_show col-lg-1 col-lg-push-2")
					})

					aImg[i].style.webkitTransition="0.5s "+(aImg.length-i-1)*100+"ms";
					aImg[i].style.MozTransition="0.5s "+(aImg.length-i-1)*100+"ms";
					aImg[i].style.left="0px";
					aImg[i].style.top="0px";
					aImg[i].style.WebkitTransform="rotate(0deg)";
					aImg[i].style.MozTransform="rotate(0deg)";
				}
			}
			rTure=!rTure;
		}

		//已经知道斜边和角度，求直角边，用sin cos
		function ToLT(rdis,iDeg){
			var oLeft=Math.round(Math.sin(iDeg/180*Math.PI)*rdis);///180*Math.PI即为单位
			var oTop=Math.round(Math.cos(iDeg/180*Math.PI)*rdis);
			return {l:oLeft,t:oTop};
		}
	


	//登录注册页面
	
			$(".brand_menu a").eq(0).click(function(){
				$("#all_content").attr("class","frosted-glasss")
				$("#submit_div").show()
							$(".close_x_add").click(function(){
								$("#all_content").attr("class","");
								$("#submit_div").fadeOut(function(){
									$(this).hide();
								})
							})
			})

			$(".brand_menu a").eq(1).click(function(){
				$("#all_content").attr("class","frosted-glasss")
				$("#add_div").show()
							$(".close_x_add").click(function(){
								$("#all_content").attr("class","");
								$("#add_div").fadeOut(function(){
									$(this).hide();
								})
							})
			})

			$(".add_user").click(function(){
					$("#submit_div").hide();
					$("#all_content").attr("class","frosted-glasss")
					$("#add_div").show("slow",function(){
						$(".close_x_add").click(function(){
								$("#all_content").attr("class","");
								$("#add_div").fadeOut(function(){
									$(this).hide();
								})
						})
					});
				})

	//}