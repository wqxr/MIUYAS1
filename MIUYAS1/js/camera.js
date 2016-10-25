var imgs=$("#img_show img");
var aa=$("#img_show a")
$(function(){
	$.post("/getcamera",function(data){
				if(data=="0"){
					alert("数据库连接失败");
				}else if(data=="1"){
					alert("数据库查询失败");
				}else{
					$.each(data,function(index,item){
						if(index<=imgs.length){
							imgs.eq(index).attr({"title":item.Tonname,"src":item.Tonimg});
							aa.eq(index).attr("href","论坛模板.html#"+item.Tonid);
						}else{
							$("#img_show").append('<a href="论坛模板.html#'+item.Tonid+'"><img src="'+item.Tonimg+'" draggable="true"></a>')
						
						}
						
					})
				}
			})
})


		for(var i=0;i<imgs.length;i++){
			imgs[i].style.webkitTransform="rotate("+Math.random()*100+"deg)";
			imgs[i].style.MozTransform="rotate("+Math.random()*100+"deg)";
			imgs[i].style.left=Math.random()*1000+"px";
			imgs[i].style.top=Math.random()*400+"px";
			var zindex=1;

			(function(index){
				imgs[index].addEventListener("drag",function(event){
						var x=event.clientX;
						var y=event.clientY;
						if(x==0){
							return;
						}
						this.style.left=x+"px";
						this.style.top=y+"px";
					},false)
				imgs[index].onmouseover=function(e){
					this.style.webkitTransform="rotate(0deg)";
					this.style.MozTransform="rotate(0deg)";
					this.style.width="400px";
					this.style.height="250px";
					this.style.zIndex=zindex;
					this.style.opacity="1";
					this.style.cursor="pointer";
					

					var x=10;
   					var y=20;

					this.temp=this.title;//temp是一个临时变量
			   		this.title="";
			   		this.temp=(this.temp?this.temp:"&nbsp;");
			   		//添加一个层在body后面
			   		$("#img_show").append("<div id='newtooltip'>"+this.temp+"</div>");
			   		$("#newtooltip").css({"top":(e.pageY+y)+"px","left":(e.pageX+x)+"px",
			   			"border-radius":"15px","background":"rgba(0,0,0,0.7)",
			   			 "height":"40px","color":"white","z-index":""+zindex,"white-space":"nowrap","text-overflow":"ellipsis"})
					zindex++;

					imgs[index].onmousemove=function(e){
						$("#newtooltip").css({"top":(e.pageY+y)+"px","left":(e.pageX+x)+"px"})
					}


					
				}

				imgs[index].onmouseout=function(event){
						this.style.webkitTransform="rotate("+Math.random()*100+"deg)";
						this.style.MozTransform="rotate("+Math.random()*100+"deg)";
						this.style.width="180px";
						this.style.height="100px";
						this.style.opacity="0.8";
						//this.webkitTransition=1+"s";
						this.title=this.temp;
				   		this.temp="";
				   		$("#newtooltip").remove();
					}



			})(i);
		}






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