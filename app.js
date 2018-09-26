//

const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const session = require('express-session');
global.md5 = require('md5');
const svgCaptcha = require('svg-captcha');
const multer = require('multer');

// 
const app = express();
//
let secret = 'sports.app.myweb.www';

//
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser(secret));

//
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', './views');


//
global.conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jian5802',
    port: 3306,
    database: 'novelapp'
});
conn.connect();

//session
app.use(session({
    secret:secret,
    resave:true,
    saveUninitialized:true,
    cookie:{maxAge:30*24*3600*1000}
}));


//文件上传
const storage = multer.diskStorage({
    //file 上传上来的文件的相关信息
    destination: function (req, file, cb) {
        //按照月份存放路径
        cb(null, `./uploads/${new Date().getFullYear()}/${(new Date().getMonth()+1).toString().padStart(2,'0')}`);
    },
    filename: function (req, file, cb) {
        //保证文件名的不重复 时间+随机数+文件后缀
        // new Date().valueOf() 把时间转化为时间戳
        let filename = new Date().valueOf() + Math.random().toString().substr(2, 8) + '.' + file.originalname.split('.').pop();
        cb(null, filename);
    }
})
global.upload = multer({
    storage: storage
});


//显示上传页面
app.get('/upload', (req, res) => {
    let data = {};
    let sql = `select aimg from admin where aid = ?`;
    conn.query(sql,req.session.aid,(err,result)=>{
        if(err){
            console.log(err);
            res.json({
                r:'db_err'
            });
            return;
        }
        data.path = result;
        req.session.img_path = result;
        res.render('admin/personnal',data);
    });
});

//接收上传数据 使用第三方模块 multer
//头像更新处理
app.post('/uploadimg', upload.single('images'), (req, res) => {
    //req.body
    // let sql = `update admin set aimg = ? where aid = ?`;
    // if(!req.file.path){
    //     res.json({
    //         r:'img_null'
    //     });
    //     return;
    // }
    
    req.session.img_path = req.file.path;
    console.log(req.file);
    res.json(req.file);
});

//个人信息表单更新处理
app.post('/uploadinfo', upload.single('images'), (req, res) => {
    let d = req.body;
    console.log(req.session.aid);
    console.log(req.body);
    let sql = `update admin set aname=?, apasswd=?, tel=?, sex=?, selfdes=?, aimg=? where aid = ?`;
    if (!d.aname || !d.apasswd) {
        res.json({
            r: 'null'
        });
        return;
    }
    if(d.apasswd!=d.apasswd1){
        res.json({
            r:'p_err'
        });
        return;
    }
    conn.query(sql, [d.aname, md5(d.apasswd), d.tel, d.sex, d.selfdes, req.session.img_path, req.session.aid], (err, result) => {
        if (err) {
            console.log(err);
            res.json({
                r: 'db_err'
            });
            return;
        }
        res.json({
            r: 'ok'
        });
    });
});
//验证码图片
app.get('/coder', (req, res) => {
    var captcha = svgCaptcha.create({
        noise: 4,
        ignoreChars: '0o1i',
        size: 4,
        background: '#cc9966',
        height: 38,
        width: 90
    });
    req.session.coder = captcha.text;
    res.type('svg');
	res.status(200).send(captcha.data);
});

//处理富文本编辑器图片上传
app.post('/uploads', upload.array('images', 1000), (req, res) => {
    console.log(req.files);
    let data = [];
    for (const ad of req.files) {
        let path = hostname +  ad.path.replace(/\\/g, '/');
        data.push(path);
    }
    res.json({
        "errno": 0,
        "data": data
    });
});

//管理员登录
app.use('/admin/login',require('./module/admin/login'));
//管理员主界面
app.use('/admin',require('./module/admin/admin'));

//主页面各种操作
app.use('/',require('./module/user/index'));

//用户登录
app.use('/user/login', require('./module/user/login'));
app.use('/user', require('./module/user/index'));
//用户注册
app.use('/user/register', require('./module/user/register'));

// 托管上传的文件
app.use('/uploads', express.static('uploads'));
app.use(express.static('static'));

app.listen(8088,()=>{
    console.log('...');
});