$(function(){
			

			$("#word").html("<p>美</p><p>伢</p><p>集</p><p>和</p><p>你</p>")
			
			$("#word>p").each(function(i,pi){
				//divi==this
				$(pi).css({
					"float":"left",
					color:'transparent',
					'text-shadow':'30px 0px 60px #D8D6D6'
				})
				.fadeIn(1000,function(){

					setInterval(function(){
						$(pi).css({"display":"inline-block",
							color:'transparent',
							'text-shadow':'30px 0px 0px #333333'});


					},200*(i+0.3))
					
				})
				
			})

			//$("#word").hide();

			$("#word_two").html("<p>做</p><p>独</p><p>一</p><p>无</p><p>二</p><p>的</p><p>自</p><p>己</p>");
			
			
			
			
			$("#word_two>p").each(function(i,p2){
				//divi==this
				$(p2).css({
					"float":"left",
					color:'transparent',
					'text-shadow':'30px 0px 60px #D8D6D6'
				})
				.fadeIn(1000,function(){

					setInterval(function(){
						$(p2).css({"display":"inline-block",
							color:'transparent',
							'text-shadow':'30px 0px 0px #333333'});


					},200*(i+6))
					
				})
				
			})
			setTimeout(function(){
				$("p").css('opacity','1')
				.animate({
					'opacity':"0"
				},2000,"linear",function(){
				$(this).remove();
				})
				$('#enter_img').show()
				.css({
					position:'absolute',
					bottom:'0px',
					left:'35%',
					opacity:'0'
				})
					.animate({
					bottom:'50%',
					opacity:'1',
				},2000,'linear',function(){
					$(this).click(function(){
						//$(this).attr({"src":"images/radio_enter.png","left":"165px"})
						$(this).slideUp(1000,function(){
							location.href="MIUYAS.html";
						})
						
					})
					})
				},4000)
			
			})
