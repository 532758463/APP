const express = require('express');
const async = require('async');
const multer = require('multer');
const router = express.Router();

// 添加小说栏目
router.get('/',(req,res)=>{
    // let bid = req.query.bid;
    // let sql='SELECT * FROM book WHERE bid = ? LIMIT 1'
    res.render('admin/addNovel');
})
router.post('/addNovel',(req,res)=>{
    let d=req.body;
    console.log(d);
    if(!d.bname||!d.kinds||!d.author){
        console.log("请输入内容");
        return ;
    }
    let sql = `INSERT INTO books(bname, kinds, author, wordnum) VALUES (?,?,?,?)`;
    // let sql= 'UPDATE books SET bname = ?,kinds=?,auther=?,readnum=?,wordnum=?  WHERE bid = ? AND status=1';
    let data=[d.bname,d.kinds,d.author,d.wordnum];
    mydb.query(sql,data,(err,result)=>{
        if(err){
            console.log(err);
            res.json({r:'db_err'});
            return ;
        }
        res.json({r:'success'});
    })
})
// 小说详细信息栏目
router.get('/novelAll',(req,res)=>{
    res.render('admin/novelAll');
})
router.get('/user',(req,res)=>{
    res.render('admin/user');
})

// 添加用户栏目
router.get('/addUser',(req,res)=>{
    res.render('admin/addUser');
})



// 管理员个人资料设置
router.get('/personnal',(req,res)=>{
    res.render('admin/personnal');
})
module.exports=router;