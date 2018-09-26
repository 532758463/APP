const express = require('express');
const async = require('async');
const multer = require('multer');
const router = express.Router();
router.get("/",(req,res)=>{
    res.render('admin/index');
});


// 添加小说栏目
router.get('/addNovel', (req, res) => {
    res.render('admin/addNovel');
})
router.post('/addNovel', (req, res) => {
    let d = req.body;
    console.log(d);
    if (!d.bname || !d.kinds || !d.author) {
        console.log("请输入内容");
        return;
    }
    let sql = `INSERT INTO books(bname, kinds, author, wordnum,describe1,cover,addtime) VALUES (?,?,?,?,?,?,?)`;
    // let sql= 'UPDATE books SET bname = ?,kinds=?,auther=?,readnum=?,wordnum=?  WHERE bid = ? AND status=1';
    let data = [d.bname, d.kinds, d.author, d.wordnum, d.describe1, d.cover,new Date().toLocaleString()];
    conn.query(sql, data, (err, result) => {
        if (err) {
            console.log(err);
            res.json({r:'db_err'});
            return ;
        }
        res.json({
            r: 'success'
        });
    })
})

// 查询所有用户信息
router.get('/user', (req, res) => {
    let data = {};
    // novel.username = req.session.username;
    //查询所有小说
    let sql = 'SELECT * FROM user WHERE status = 1';
    conn.query(sql, (err, results) => {
        data.user = results;
        // console.log(results);
        res.render('admin/user', data);
    });
});

// 添加用户栏目
router.get('/addUser', (req, res) => {
    res.render('admin/addUser');
})



// 管理员个人资料设置
router.get('/personnal', (req, res) => {
    res.render('admin/personnal');
})



// 小说信息栏目
router.get('/novelAll', (req, res) => {
    let novel = {};
    // novel.username = req.session.username;
    //查询所有小说
    let sql = 'SELECT * FROM books WHERE status = 1';
    conn.query(sql, (err, results) => {
        novel.novelAll = results;
        // console.log(results);
        res.render('admin/novelAll', novel);
    });
});

// 删除小说
router.get('/delete', (req, res) => {
    let sql = 'UPDATE books SET status = 0 WHERE bid = ? LIMIT 1';
    conn.query(sql, req.query.bid, (err, result) => {
        if (err) {
            console.log(err);
            res.json({
                r: 'db_err'
            });
            return;
        }
        res.json({
            r: 'success'
        });
    });
});

// 删除用户
router.get('/delete2', (req, res) => {
    let sql = 'UPDATE user SET status = 0 WHERE uid = ? LIMIT 1';
    conn.query(sql, req.query.uid, (err, result) => {
        if (err) {
            console.log(err);
            res.json({
                r: 'db_err'
            });
            return;
        }
        res.json({
            r: 'success'
        });
    });
});

// 配置小说章节管理界面
router.get('/addChapter', (req, res) => {
    res.render('admin/addChapter');
})

// 查询当前小说目录下的章节信息
let getbid=0;
router.get('/novelAll1', (req, res) => {
     getbid=req.query.bid;
})
router.get('/novelAll/chapter',(req,res)=>{
    let data={};
   
    let bid=getbid;
    // console.log(bid);
    // let sql = `SELECT * FROM section WHERE bid = ${bid};`;
    let sql =`SELECT * FROM section INNER JOIN books on section.bid=books.bid where  section.bid=${bid} AND  section.status=1;`
    conn.query(sql, (err, results) =>{
        data.chapterlist=results;
        res.render('admin/chapter',data);
    })
})




// 章节删除
router.get('/delete3', (req, res) => {
    let sql = 'UPDATE section SET status = 0 WHERE sid=? LIMIT 1';
    // console.log(req.query.sid);
    conn.query(sql,req.query.sid, (err, result) => {
        if (err) {
            res.json({
                r: 'db_err'
            });
            return;
        }
        res.json({
            r: 'success'
        });
        if (result.r == 'success') {
            console.log(result);
            window.location.href="/admin/novelAll/searchNovel";
        }
    });
});

// 章节添加路由
router.get('/novelAll/addChapter',(req,res)=>{
    res.render('admin/addChapter');
});

// 获取章节数据
router.post('/novelAll/getChapter',(req,res)=>{
    let d=req.body;
    let bid =getbid;
    let sql =`INSERT INTO section(sname,scontent,bid,addstime) VALUES(?,?,?,?)`
    let insert=[d.sname,d.scontent,bid,new Date().toLocaleString()];
    conn.query(sql, insert,(err, results) =>{
        if (err) {
            console.log(err);
            res.json({
                r: 'db_err'
            });
            return;
        }
        
        res.json({
            r: 'success'
        });
    })
})

// 查询小说功能(接收ajax发送过来novelTitle)
let getBname;
router.post('/searchNovel2',(req,res)=>{
    let d=req.body;
    let data={};
    getBname=req.body.novelTitle;
    // SELECT * FROM books AS c  where  c.status=1 AND bname like '%?%';
    //  let sql =`SELECT * FROM books WHERE bname=?`;
    let sql =`SELECT * FROM books where status=1 AND bname like '%${d.novelTitle}%';`;
     let str=d.novelTitle;
     console.log(str);
     conn.query(sql,(err, results) =>{
         if (err) {
             res.json({
                 r: 'db_err'
             });
             return;
         }
         console.log(results);
         data.search=results;
         res.json({
             r: 'success'
         });
     })
 })
//  搜索小说
 router.get('/novelAll/searchNovel',(req,res)=>{
     let data={};
     let bname=getBname;
     let sql =`SELECT * FROM books WHERE bname=?`;
     conn.query(sql,bname, (err, results) =>{
         data.search=results;
         res.render('admin/searchNovel',data);
     })
 })
 

module.exports = router;