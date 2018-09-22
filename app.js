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
app.use(bodyParser.urlencoded({
extended:true
}));

app.use(cookieParser(secret));

//模板引擎设置
app.engine('html',ejs.renderFile);
app.set('view engine','html');
app.set('views','./views');

//数据库连接
global.conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    port:3306,
    database:'novelapp'
});
conn.connect();



// 启用session
// app.use(session({
//     secret:secret,
//     resvae:true,
//     saveUninitialized:true,
//     cookie:{maxAge:30*24*3600*1000}
// }))
// 上传文件的文件夹设置
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, `./uploads/${new Date().getFullYear()}/${(new Date().getMonth()+1).toString().padStart(2, '0')}`);
    },
    //文件名
    filename: function (req, file, cb) {
        let filename = new Date().valueOf() + '_' +  Math.random().toString().substr(2, 8) + '.' + file.originalname.split('.').pop();
        cb(null, filename);
    }
})
global.upload = multer({
    storage: storage
});

// 
app.get('/admin',(req,res)=>{
    res.render('admin/addNovel')
})
app.post('/upload', upload.single('images'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.json(req.file);
});


//子路由
//管理员登录
app.use('/admin', require('./module/admin/admin'))
app.use('/admin/login',require('./module/admin/login'));
// 用户登录
app.use('/login', require('./module/user/login'));

// 用户操作
app.use('/',require('./module/user/index'));

//静态资源托管
app.use('/uploads',express.static('uploads'));
app.use(express.static('static'));
app.use('/uploads',express.static('uploads'));
app.listen(81);
