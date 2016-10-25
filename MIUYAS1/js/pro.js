// JavaScript Document
$(function(){
	var change=$("#fa1").find("a");
	$(change).each(function(index,item1){
		$(item1).mouseover(function(){
			$("#image").attr("src","images/fa"+(index+1)+".jpg");
			})
		})
	/*$("#five").find("strong").hover(
	function(){
		$("#five").find("p").fadeIn("slow");
	
		
		},
		function(){
			$("#five").find("p").fadeOut("slow")
			
			
			}
		
		);*/
		
		
		
	})


