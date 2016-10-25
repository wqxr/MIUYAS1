/*
	@paramas flakeChar:图标
	@paramas minSize：最小尺寸
	@paramas maxSize:最大尺寸
	@paramas newOn:新图标出现的频率
	@paramas flakeColor:颜色
*/
;(function(w,d,u,$){
	$.fn.showPic=function(options){
		var defaults={
			flakeChar:"&#10052",
			minSize:10,
			maxSize:100,
			newOn:100,
			flakeColor:'white'
		};
		$.extend(defaults,options);

		var $flake=$("<div></div>").css({"position":'absolute',"top":"-50"});

		//设置出现的位置
		//页面多大
		var documentHeight=$(d).height();
		var documentWidth=$(d).width();

		$flake.html(defaults.flakeChar);



	setInterval(function(){
		//这是div的x坐标
		var startPositionLeft=Math.random()*documentWidth-100;
		var startOpacity=Math.random()+0.5;//透明度
		//雪花大小
		var sizeFlake=defaults.minSize+Math.random()*defaults.maxSize;
		var endPositionLeft=startPositionLeft-100+Math.random()*200;
		var endPositionTop=documentHeight-defaults.maxSize;
		var durationFall=documentHeight*5+Math.random()*5000;



		$flake.clone()
			.appendTo("body")
			.css({
				left:startPositionLeft,
				opacity:startOpacity,
				'font-size':sizeFlake,
				color:defaults.flakeColor
			})

			.animate({
				top:endPositionTop,
				left:endPositionLeft,
				opacity:0.1
			},durationFall,'linear',function(){
				$(this).remove();
			})

	},100)
}
}) (window,document,undefined,$);