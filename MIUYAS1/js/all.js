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