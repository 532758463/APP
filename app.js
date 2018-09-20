//引入各种模块

const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const session = require('express-session');
global.md5 = require('md5');
const svgCaptcha = require('svg-captcha');
const multer = require('multer');

// 模块引用部分结束位置
const app = express();
//定义各种参数
let secret = 'sports.app.myweb.www';

//启用中间件
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser(secret));

//模板引擎设置
app.engine('html',ejs.renderFile);
app.set('view engine','html');
app.set('views','./views');

//数据库连接
global.conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'jian5802',
    port:3306,
    database:'novelapp'
});
conn.connect();

//启用session
app.use(session({
    secret:secret,
    resave:true,
    saveUninitialized:true,
    cookie:{maxAge:30*24*3600*1000}
}));


//文件上传
const diskstorage = multer.diskStorage({
    //路径
    destination:function(req,file,cb){
        cb(null, `./uploads/${new Date().getFullYear()}/${(new Date().getMonth()+1).toString().padStart(2, '0')}`);
    },
    //文件名
    filename: function (req, file, cb) {
        let filename = new Date().valueOf() + '_' +  Math.random().toString().substr(2, 8) + '.' + file.originalname.split('.').pop();
        cb(null, filename);
    }
});
const upload = multer({storage:diskstorage});

//验证码图片
app.get('/coder',(req,res)=>{
    var captcha = svgCaptcha.create({noise:4,ignoreChars: '0o1i', size:1,background: '#cc9966',height:38, width:90});
	req.session.coder = captcha.text;
	
	res.type('svg'); // 使用ejs等模板时如果报错 res.type('html')
	res.status(200).send(captcha.data);
});

//上传图片接口
app.post('/uploads',upload.array('images',1000),(req,res)=>{
    console.log(req.files);
    let data = [];
    for (const ad of req.files) {
        //把反斜线转成斜线，防止各种转义引起的路径错误
        let path = hostname +  ad.path.replace(/\\/g, '/');
        data.push(path);
    }
    res.json({
        "errno": 0,
        "data": data
    });
});


//子路由
//管理员登录
app.use('/admin/login',require('./module/admin/login'));





//静态资源托管
app.use('/uploads',express.static('uploads'));
app.use(express.static('static'));

app.listen(8088,()=>{
    console.log('服务器启动成功...');
});