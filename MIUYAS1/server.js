/**
 * Created by lenovo on 2016-10-05.
 */
var express=require("express");//创建服务器的
var cookieparser=require("cookie-parser");//cookie的
var session=require("express-session");//session
var mysql=require("mysql");
var fs=require("fs");
var bodyparser=require("body-parser");//处理post请求的
var multer=require("multer");//处理文件上传的
var nodemailer=require("nodemailer");

var moment = require('moment');
var app=express();

//使用静态中间件
app.use(session({
    secret:'keyboard cat',// 私密 session id的标识
    resave:true,//每次请求是否重新设置session cookie，意思是浏览页面，过晚了59秒，如果在刷新一次页面，过期时间重新计算
    saveUninitialized:true,//session cookie 默认值为connect.sid
    cookie:{secure:false,maxAge:1000*60*200}//maxAge:意思是过期时间为1分钟 最大失效时间  secure:用于https
    //secure为true是时，cookie在http中无效 在https中才有效
}));


var fileUploadPath="/pic";

//配置文件上传的中间件
var upload=multer({dest:"."+fileUploadPath});//上传文件的目录设定

//配置文件上传的中间件
var upload=multer({dest:"."+fileUploadPath});//上传文件的目录设定
app.use(bodyparser.urlencoded({extended:false}));


//配置文件上传的中间件
//配置数据库连接池
var pool=mysql.createPool({
    host:"127.0.0.1",
    port:3306,
    database:"wqhz",
    user:"root",
    password:"aaaa"
});
var transporter=nodemailer.createTransport({
    host: "smtp.qq.com",
    secureConnection:false,//使用ssl
    port:465,//stmp端口号必须用465
    auth:{
        user:"1638868997@qq.com",//账号
        pass:"vcrsxhrxieswfaaj"//授权码
    }
});
//监听所有类型的请求
app.all("/"+__dirname+"/*",function(req,res,next){
    console.info(req.session.currentLoginUser);
    res.sendFile(__dirname+"/index.html");
    if(req.session.currentLoginUser==undefined){
         console.info("aa");
        res.send("<script>alert('请先登录..');location.href='/MIUYAS.html';</script>");
    }else{//说明已经登录
        next();//将请求往下传递给对应的处理方法
    }


});

var range=function(start,end)
{
    var array=[];
    for(var i=start;i<end;++i) array.push(i);
    return array;
};
//console.info(range(0,5));//[ 0, 1, 2, 3, 4 ]
var randomstr = range(0,5).map(function(x){//将一个数组中的元素转换到另一个数组中。
    return Math.floor(Math.random()*10);
}).join('')

//得到邮箱验证码
app.post("/getelma",function(req,res){
    if(req.body.eml==""){
        res.send("0");
    }else{
        req.session.yanzhengma=randomstr;//将验证码存到session中以便将来引用
        console.info(randomstr);
        var mailOptions={
            from:"wq  1638868997@qq.com",
            to:req.body.eml,//收件人
            subject:randomstr,//纯文本
            html:randomstr
        };//发送邮件
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                return console.info(error);
            }
            console.info("Message sent:"+info.response);
            res.end();
        });

    };
});
app.post("/login",function(req,res){//登录
    if(req.body.uname==""){
        res.send("1");
    }else if(req.body.password==""){
        res.send("2");
    }else{
        pool.getConnection(function(err,conn){
            res.header("Content-Type","application/json");
            if(err){
                res.send("3");
            }else{
                conn.query("select * from register where uname=? and pwd=?",[req.body.uname,req.body.password],function(err,result){
                    conn.release();
                    if(err){
                        res.send("4");
                        res.end()
                    }else{
                        if (result.length == 0) {
                            res.send("0");
                        } else {
                            console.info(result[0]);
                            req.session.currentLoginUser=result[0];
                            res.send(result[0]);
                        }

                    }
                });
            }
        })
    }
})

app.post("/adduser",function(req,res){
    if (req.body.sname != "" && req.body.pwd != "" && req.body.tel != "" && req.body.eml != "" && req.body. emlma != "") {
        if (req.body.emlma == req.session.yanzhengma) {
            pool.getConnection(function (error, conn) {
                if (error) {
                    res.send("1");
                } else {
                    conn.query("insert into register values(0,?,?,?,?,?)",[req.body.sname,req.body.pwd,req.body.tel,req.body.eml,1],function(err,result){
                       conn.release;
                        if(err){
                            console.info(err);
                        }else{
                            res.send("4");//用户注册成功
                        }
                    })
                }
            })
        } else {
            res.send("3");
        }
    } else {
        res.send("2")
    }
});

app.post("/userIsLogin",function(req,res){
    res.header("Content-Type","application/json");
    if(req.session.currentLoginUser==undefined){
        res.send("0");
    }else{
        res.send(req.session.currentLoginUser);
    }
});
app.post("/exit",function(req,res){
    req.session.currentLoginUser=null;
    res.send("0");
})

app.post("/addContent",upload.array("file"),function(req,res){
    if(req.session.currentLoginUser==undefined) {
        res.send("4");
    }else if(req.body.tid==""||req.body.title==""||req.body.jianjie==""||req.body.content==""){
        res.send("0");
    }else {
        pool.getConnection(function(err, conn) {
            if (err) {
                res.send("2");
            } else {
                var fileName="";
                var filePath="";
                var file;
                if (req.files != undefined) {
                    for (var i in req.files) {
                        file = req.files[i];
                        fileName=new Date().getTime() + "_" + file.originalname;
                        fs.renameSync(file.path,__dirname+fileUploadPath+"/"+fileName);
                        if (filePath!=""){   //var fileUploadPath="/page/pic";
                            //var fileUploadPathData="/pic";

                            filePath += ",";
                        }
                        filePath+= fileUploadPath+"/"+fileName;
                    }
                }
                conn.query("insert into toninginfo values(0,?,?,?,?,?,now(),?,?)", [req.body.title,req.body.tid,req.session.currentLoginUser.userid,filePath, req.body.content,req.body.jianjie,1],function(err,result){
                    conn.release();
                    if (err) {
                        console.info(err);
                        res.send("3");
                    } else {
                        res.send("1");
                    }
                });
            }

        });
    }
})
app.post("/getAllType",function(req,res){
    pool.getConnection(function(err,conn){
        res.header("Content-Type","application/json");
        if(err){
           res.send('{"err":"0"}');
        }else{
            conn.query("select * from toningtype",function(err,result){
                conn.release;
                if(err){
                    res.send('{"err":"1"}');
                }else{
                    res.send(result);
                    }
            })
        }
    })
});
app.post("/savetitle",upload.array("file"),function(req,res){
    if(req.session.currentLoginUser==undefined){
        res.send("4");
    }else if(req.body.tid==""||req.body.title==""||req.body.jianjie==""||req.body.content==""){
        res.send("0");
    }else {
        pool.getConnection(function(err, conn) {
            if (err) {
                res.send("2");
            } else {
                var fileName="";
                var filePath="";
                var file;
                if (req.files != undefined) {
                    for (var i in req.files) {
                        file = req.files[i];
                        fileName=new Date().getTime() + "_" + file.originalname;
                        fs.renameSync(file.path,__dirname+fileUploadPath+"/"+fileName);
                        if (filePath!=""){   //var fileUploadPath="/page/pic";
                            //var fileUploadPathData="/pic";

                            filePath += ",";
                        }
                        filePath+= fileUploadPath+"/"+fileName;

                    }

                }
                conn.query("insert into toninginfo values(0,?,?,?,?,?,now(),?,?)", [req.body.title,req.body.tid,req.session.currentLoginUser.userid,filePath, req.body.content,req.body.jianjie,0],function(err,result){
                    conn.release();
                    if (err) {
                        console.info(err);
                        res.send("3");
                    } else {
                        res.send("1");
                    }
                });
            }

        });
    }
});
//获取所有保存的文章
app.post("/saved",upload.array("file"),function(req,res){
    pool.getConnection(function(err,conn){
        if(err){
            res.send("0");
        }else{
            conn.query("select Tonname,Tonid,publishtime from toninginfo where status=0 and userid=?",[req.session.currentLoginUser.userid],function(err,result){
                conn.release();
                if(err){
                    res.send("1");
                }else{
                    res.send(result);
                }
            })
        }
    })
});
app.post("/huocontentall",function(req,res){
    if(req.body.nameid==""){
        res.send("0")
    }else {
        pool.getConnection(function (err, conn) {
            res.header("Content-Type", "application/json");
            if (err) {
                res.send("0");
            } else {
                conn.query("select t.* ,typename from toninginfo t,toningtype ty where status=0 and t.typeid=ty.typeid and Tonid=?",[req.body.nameid],function (err, result) {
                    if (err) {
                        res.send("1");
                    } else {

                        res.send(result)
                    }
                });
            }
        });
    }
})
app.post("/pushtitle",function(req,res){
    if(req.session.currentLoginUser==undefined) {
        res.send("0");
    }else{
        res.send("1");
    }
});
app.post("/getname",function(req,res){
    if(req.session.currentLoginUser==undefined) {
        res.send("0");
    }else{
        res.send(req.session.currentLoginUser);
    }
})

app.post("/uploads",upload.array("files"),function(req,res){
    var fileName="";
    var filePath="";
    var file;
    if (req.files != undefined) {
        console.info(req.files);
        for (var i in req.files) {
            file = req.files[i];
            fileName=new Date().getTime() + "_" + file.originalname;
            fs.renameSync(file.path,__dirname+fileUploadPath+"/"+fileName);
            if (filePath!=""){   //var fileUploadPath="/page/pic";
                //var fileUploadPathData="/pic";

                filePath += ",";
            }
            filePath+= fileUploadPath+"/"+fileName;
        }
        console.info(filePath);
        res.send(filePath);
    }else {
        res.send("1");
    }
});
app.post("/getcloth",function(req,res){
    pool.getConnection(function(err,conn){
        res.header("Content-Type", "application/json");
        if(err){
            console.info(err);
            res.send("{'err':'1'}");
        }else{
            conn.query("select *  from toninginfo  where status=0 and typeid=1005",function (err, result) {
                conn.release;
                if(err){
                    console.info(err);
                    res.send("{'err':'2'}")
                }else{

                    res.send(result);
                }
            })
        }
    })
});
app.post("/addstream",function(req,res){

    pool.getConnection(function(err,conn){
        res.header("Content-Type", "application/json");
        if(err){
            console.info(err);
            res.send("{'err':'1'}");
        }else{
            conn.query("select *  from toninginfo  where status=1 and typeid=1004",function (err, result) {
                conn.release;
                if(err){
                    console.info(err);
                    res.send("{'err':'2'}")
                }else{

                    res.send(result);
                }
            })
        }
    })

});
app.post("/getallsport",function(req,res){
    pool.getConnection(function(err,conn){
        res.header("Content-Type", "application/json");
        if(err){
            console.info(err);
            res.send("{'err':'1'}");
        }else{
            conn.query("select *  from toninginfo  where status=0 and typeid=1004",function (err, result) {
                conn.release;
                if(err){
                    console.info(err);
                    res.send("{'err':'2'}")
                }else{

                    res.send(result);
                }
            })
        }
    })
});
app.post("/addcontentclear",function(req,res){
    var Tonidd=req.body.contentclear;
    pool.getConnection(function(err,conn){
        res.header("Content-Type", "application/json");
            if(err){
                console.info(err);
                res.send("{'err':'1'}");
            }else{
                conn.query("select *  from toninginfo  where status=1 and Tonid="+Tonidd,function (err, result) {
                   conn.release;
                    if(err){
                        console.info(err);
                        res.send("{'err':'2'}")
                    }else{

                        res.send(result[0]);
                    }
                })
            }
        })
});
app.post("/addhufu",function(req,res){
    pool.getConnection(function(err,conn){
        res.header("Content-Type", "application/json");
        if(err){
            console.info(err);
            res.send("{'err':'1'}");
        }else{
            conn.query("select *  from toninginfo  where status=0 and typeid=1002",function (err, result) {
                conn.release;
                if(err){
                    console.info(err);
                    res.send("{'err':'2'}")
                }else{

                    res.send(result);
                }
            })
        }
    })
});
app.post("/addhufustream",function(req,res){
    pool.getConnection(function(err,conn){
        res.header("Content-Type", "application/json");
        if(err){
            console.info(err);
            res.send("{'err':'1'}");
        }else{
            conn.query("select t.*,r.uname from toninginfo t,register r  where t.status=1 and t.userid=r.userid and typeid=1002",function (err, result) {
                conn.release;
                if(err){
                    console.info(err);
                    res.send("{'err':'2'}")
                }else{
                    console.info(result);
                    res.send(result);
                }
            })
        }
    })

});
//提交评论
app.post("/submittalk",function(req,res){
    if(req.body.userid==""){
        res.send("1");
    }else if( req.body.talkabout==""){
       res.send("2");
    }else if(req.body.Tonid==""){
        res.send("3");
    }else{
        pool.getConnection(function(err,conn){
            if(err){
                res.send("4");
            }else{
                conn.query("insert into talk values(0,?,?,?,now())",[req.body.Tonid,req.body.userid,req.body.talkabout],function(err,result){
                    conn.release;
                    if(err){
                        res.send("5");
                        console.info(err);
                    }else{
                        res.send("6");
                    }
                });
            }
        })
    };

});
app.post("/showpinlun",function(req,res){
    if(req.body.Tonid==""){
        res.send("0")
    }else {
        pool.getConnection(function (err, conn) {
            if (err) {
                res.send("1");
            } else {
                conn.query("select t.*,r.uname from talk t,register r  where t.userid=r.userid and Tonid=?",[req.body.Tonid], function (err, result) {
                    conn.release;
                    if (err) {
                        console.info(err);
                        res.send("2");

                    } else {

                        res.send(result);
                    }
                })
            }
        })
    }
});
app.post("/logintalk",function(req,res){
    if(req.session.currentLoginUser==undefined) {
        res.send("0");
    }else{
        res.send("1");
    }
});
app.post("/hufupinlun",function(req,res){
    pool.getConnection(function(err,conn){
        if(err){
            res.send("1");
        }else{
            conn.query("insert into talktype values(0,?,?,?,now())",[req.body.typeid,req.body.userid,req.body.value1],function(err,result){
                if(err){
                    res.send("2");
                }else{
                    res.send("3");
                }
            })
        }
    })
});
app.post("/showhufupinlun",function(req,res){
    pool.getConnection(function(err,conn){
        if(err){
            res.send("1");
        }else{
            conn.query("select t.*, uname from talktype t,register r where r.userid=t.userid and typeid=?",[req.body.typeid],function(err,result){
                conn.release;
                if(err){
                    res.send("2");
                }else{
                    res.send(result);
                }
            })
        }
    })
});
app.post("/showhufupinlun1",function(req,res){
    pool.getConnection(function(err,conn){
        if(err){
            res.send("1");
        }else{
            conn.query("select t.*, uname from talktype t,register r where r.userid=t.userid and typeid=1002",function(err,result){
                if(err){
                    res.send("2");
                }else{
                    res.send(result);
                }

            })
        }
    })
});
app.post("/getcamera",function(req,res){
    pool.getConnection(function(err,conn){
        if(err){
            res.send(0);//数据库连接失败
        }else{
            conn.query("select * from toninginfo where typeid=1001",function(err,result){
                conn.release();
                if(err){
                    res.send("1");
                }else{
                    res.send(result);
                }
            })
        }
    })
})
app.post("/getcontent",function(req,res){
    pool.getConnection(function(err,conn){
        if(err){
            res.send(0);
        }else{
            conn.query("select * from toninginfo where Tonid="+req.body.id,function(err,result){
                conn.release();
                if(err){
                    res.send(1);
                }else{
                    res.send(result[0]);
                }
            })
        }
    })
})
app.post("/getmiuyasbg",function(req,res){
    pool.getConnection(function(err,conn){
        if(err){
            res.send(0);
        }else{
            conn.query("select * from toninginfo",function(err,result){
                conn.release();
                if(err){
                    res.send(1);
                }else{
                    res.send(result);
                    res.end();
                }
            })
        }
    })
})
app.post("/getneedCamera",function(req,res){
    var text=req.body.text;
    pool.getConnection(function(err,conn){
        if(err){
            console.info("0");
            res.send(0);
        }else{
            conn.query("select * from toninginfo where  Tonname='"+text+"'",function(err,result){
                conn.release();
                if(err){
                    console.info("1");
                    res.send(1);
                }else{
                    res.send(result[0]);
                    res.end();
                }
            })
        }
    })
})
app.post("/getstyle",function(req,res){
    pool.getConnection(function(err,conn){
        if(err){
            res.send(0);//数据库连接失败
        }else{
            conn.query("select * from toninginfo where typeid=1005 and  status=1",function(err,result){
                conn.release();

                if(err){
                    res.send("1");
                }else{

                    res.send(result);
                }
            })
        }
    })
})
app.post("/gethealth",function(req,res){
    pool.getConnection(function(err,conn){
        if(err){
            res.send(0);//数据库连接失败
        }else{
            conn.query("select * from toninginfo where typeid=1004 and status=1",function(err,result){
                conn.release();
                if(err){
                    res.send("1");
                }else{
                    res.send(result);
                }
            })
        }
    })
})
app.post("/getib",function(req,res){
    pool.getConnection(function(err,conn){
        if(err){
            res.send(0);//数据库连接失败
        }else{
            conn.query("select * from toninginfo where typeid=1002 and status=0",function(err,result){
                conn.release();
                if(err){
                    res.send("1");
                }else{
                    res.send(result);
                }
            })
        }
    })
})
app.post("/getbeaty",function(req,res){
    pool.getConnection(function(err,conn){
        if(err){
            res.send(0);//数据库连接失败
        }else{
            conn.query("select * from toninginfo where typeid=1003",function(err,result){
                conn.release();
                if(err){
                    res.send("1");
                }else{
                    res.send(result);
                }
            })
        }
    })
})

app.post("/getallbeauty",function(req,res){
    pool.getConnection(function(err,conn){
        if(err){
            res.send(0);//数据库连接失败
        }else{
            conn.query("select * from toninginfo where typeid=1003",function(err,result){
                conn.release();
                if(err){
                    res.send("1");
                }else{
                    console.info(result);
                    res.send(result);
                }
            })
        }
    })
})
app.post("/getprise",function(req,res){
    var uname=req.body.uname;
    var Tonid=req.body.tonid;
    pool.getConnection(function(err,conn){
        if(err){
            res.send("0");
        }else{
            conn.query("select userid from register where uname='"+uname+"'",function(err,result){

                if(err){
                    res.send("1");
                }else{
                    var userid=result[0].userid;
                    conn.query("select "+userid+" from prise where Tonid="+Tonid,function(err,resu){
                        if(err){
                            console.info(err);
                            res.send("5")
                        }else if(resu!=null&&resu.length>0){
                            res.send("have prised");
                        }else{
                            conn.query("insert into prise values(0,?,?)",[Tonid,userid.userid],function(err,result_end){

                                if(err){
                                    console.info(err);
                                    res.send("2");
                                }else{
                                    conn.query("select * from prise where Tonid="+Tonid,function(err,result_zan){
                                        if(err){
                                            res.send("3")
                                        }else{
                                            res.send(result_zan);//点赞成功
                                            res.end();
                                        }
                                    })

                                }
                            })
                        }
                    })

                }
            })

        }
    })
})

app.post("/getallprise",function(req,res){
    var Tonid=req.body.tonid;
    pool.getConnection(function(err,conn){
        if(err){
            res.send("0");
        }else{
            conn.query("select * from prise where Tonid="+Tonid,function(err,result){
                if(err){
                    res.send("1");
                }else{
                    res.send(result);
                    res.end();
                }
            })
        }

    })
})
app.post("/userloging",function(req,res){
    if(req.session.currentLoginUser==undefined) {
        res.send("0");
    }else{
        res.send("1");
    }
});
app.post("/findpinlun",function(req,res){
    pool.getConnection(function(err,conn){
        if(err){
            res.send("1");
        }else{
            conn.query("select t.*,r.uname from talk t,register r  where t.userid=r.userid and Tonid=?",[req.body.contentclear], function (err, result) {
                if(err){
                    res.send("2");
                }else{
                    console.info(result);
                    res.send(result);
                }
            })
        }
    })
})
app.use(express.static(__dirname));
app.listen(8022,function(err){
    if(err){
        console.info(err);
    }else{
        console.info("应用程序启动成功...");
    }
});

