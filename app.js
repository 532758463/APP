//ÒýÈë¸÷ÖÖÄ£¿é

const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const session = require('express-session');
global.md5 = require('md5');
const svgCaptcha = require('svg-captcha');
const multer = require('multer');

// Ä£¿éÒýÓÃ²¿·Ö½áÊøÎ»ÖÃ
const app = express();
//¶¨Òå¸÷ÖÖ²ÎÊý
let secret = 'sports.app.myweb.www';

//ÆôÓÃÖÐ¼ä¼þ
app.use(bodyParser.urlencoded({
extended:true
}));

app.use(cookieParser(secret));

//Ä£°åÒýÇæÉèÖÃ
app.engine('html',ejs.renderFile);
app.set('view engine','html');
app.set('views','./views');

//Êý¾Ý¿âÁ¬½Ó
global.conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    port:3306,
    database:'novelapp'
});
conn.connect();



// ÆôÓÃsession
// app.use(session({
//     secret:secret,
//     resvae:true,
//     saveUninitialized:true,
//     cookie:{maxAge:30*24*3600*1000}
// }))
// ÉÏ´«ÎÄ¼þµÄÎÄ¼þ¼ÐÉèÖÃ
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, `./uploads/${new Date().getFullYear()}/${(new Date().getMonth()+1).toString().padStart(2, '0')}`);
    },
    //ÎÄ¼þÃû
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

//验证码图片
app.get('/coder',(req,res)=>{
    var captcha = svgCaptcha.create({noise:4,ignoreChars: '0o1i', size:4,background: '#cc9966',height:38, width:90});
	req.session.coder = captcha.text;
    res.type('svg');
	res.status(200).send(captcha.data);
});
app.post('/upload', upload.single('images'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    res.json(req.file);
});


/
app.use('/admin', require('./module/admin/admin'))
app.use('/admin/login',require('./module/admin/login'));
// 
app.use('/login', require('./module/user/login'));

//用户登录
app.use('/user/login',require('./module/user/login'));

// 
app.use('/',require('./module/user/index'));

//
app.use('/uploads',express.static('uploads'));
app.use(express.static('static'));
app.use('/uploads',express.static('uploads'));
app.listen(81);
