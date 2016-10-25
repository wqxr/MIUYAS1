


function setImagePreviews(imagesObj,divid) {
    var dd = document.getElementById(divid);
    dd.style.display="block";
    dd.innerHTML = "";
    var fileList = imagesObj.files;
    for (var i = 0; i < fileList.length; i++) {
        dd.innerHTML = dd.innerHTML+"<div style='float:left' > <img id='img" + i + "'  /> </div>";
        var imgObjPreview = document.getElementById("img"+i);

        if (imagesObj.files && imagesObj.files[i]) {
            //火狐下，直接设img属性
            imgObjPreview.style.display = 'block';
            imgObjPreview.style.width = "250px";
            imgObjPreview.style.marginLeft = "280px";
            imgObjPreview.style.marginTop = "50px";
            imgObjPreview.style.height = "200px";

            imgObjPreview.src = window.URL.createObjectURL(imagesObj.files[i]);

        }else {
            //IE下，使用滤镜
            imagesObj.select();
            var imgSrc = document.selection.createRange().text; //运用IE滤镜获取数据;
            //alert(imgSrc);
            var localImagId = document.getElementById("img" + i);
            //必须设置初始大小
            localImagId.style.width =(ddWidth/i)+"px";
            localImagId.style.height = (ddHeight/i)+"px";
            //图片异常的捕捉
            try {
                localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader( true,sizingMethod=scale,src = imgSrc)";  //scale：缩放图片以适应对象的尺寸边界。
            }
            catch (e) {
                alert("您上传的图片格式不正确，请重新选择!");
                return false;
            }
            imgObjPreview.style.display = 'none';
            document.selection.empty(); //在当前网页下不能选择对象,也就是鼠标不能选中
        }
    }
    return true;
}
var k=0;

function setImagePreving(imagesObj,divid) {
    var dd = document.getElementById(divid);
    dd.style.display="block";
    var fileList = imagesObj.files;
    $.ajaxFileUpload({
                    url:"/uploads",
                    secureuri:false,//ssl用与https协议
                    fileElementId:"to",//要上传的文本框的id
                    data:null,
                    dataType:"text",
                    success:function(data,status){
                       var data= $.trim(data);
                        if(data=="1"){
                            console.info("没有图片")
                        }else {
                            var picc = data.split(",");
                            // for(var i=0;i<picc.length;i++) {
                            //imgObjPreview.src = ".." + picc[i];

                            for (var i = 0; i < picc.length; i++) {
                                dd.innerHTML += "<div style='z-index:1;contenteditable:true' ><img id='imger" + k + "' /></div>";
                                var imgObjPreview = document.getElementById("imger" + k);
                                if (imagesObj.files && imagesObj.files[i]) {
                                    //火狐下，直接设img属性
                                    // imgObjPreview.style.display = 'block';
                                    imgObjPreview.style.width = "600px";
                                    imgObjPreview.style.height = "400px";
                                    imgObjPreview.style.marginLeft = "100px";
                                    imgObjPreview.style.marginTop = "20px";
                                    imgObjPreview.src = ".." + picc[i];
                                    $(dd).append("<p style='contenteditable:true'>&#8203;</p>");
                                    k++;
                                }
                            }
                        }
                    },
                    error:function(data,status,e){
                        alert(e);
                    }
                });

}