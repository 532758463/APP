//�������ģ��

const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const session = require('express-session');
global.md5 = require('md5');
const svgCaptcha = require('svg-captcha');
const multer = require('multer');

// ģ�����ò��ֽ���λ��
const app = express();
//������ֲ���
let secret = 'sports.app.myweb.www';

//�����м��
app.use(bodyParser.urlencoded({
extended:true
}));

app.use(cookieParser(secret));

//ģ����������
app.engine('html',ejs.renderFile);
app.set('view engine','html');
app.set('views','./views');

//���ݿ�����
global.conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    port:3306,
    database:'novelapp'
});
conn.connect();



// ����session
// app.use(session({
//     secret:secret,
//     resvae:true,
//     saveUninitialized:true,
//     cookie:{maxAge:30*24*3600*1000}
// }))
// �ϴ��ļ����ļ�������
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, `./uploads/${new Date().getFullYear()}/${(new Date().getMonth()+1).toString().padStart(2, '0')}`);
    },
    //�ļ���
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


//��·��
//����Ա��¼
app.use('/admin', require('./module/admin/admin'))
app.use('/admin/login',require('./module/admin/login'));
// �û���¼
app.use('/login', require('./module/user/login'));

// �û�����
app.use('/',require('./module/user/index'));

//��̬��Դ�й�
app.use('/uploads',express.static('uploads'));
app.use(express.static('static'));
app.use('/uploads',express.static('uploads'));
app.listen(81);
