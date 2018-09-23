const express = require('express');
const async = require('async');
const multer = require('multer');
const router = express.Router();

// ���С˵��Ŀ
router.get('/',(req,res)=>{
    // let bid = req.query.bid;
    // let sql='SELECT * FROM book WHERE bid = ? LIMIT 1'
    res.render('admin/addNovel');
})
router.post('/addNovel',(req,res)=>{
    let d=req.body;
    console.log(d);
    if(!d.bname||!d.kinds||!d.author){
        console.log("����������");
        return ;
    }
    let sql = `INSERT INTO books(bname, kinds, author, wordnum,readnum,cover) VALUES (?,?,?,?,?,?)`;
    // let sql= 'UPDATE books SET bname = ?,kinds=?,auther=?,readnum=?,wordnum=?  WHERE bid = ? AND status=1';
    let data = [d.bname, d.kinds, d.author, d.wordnum, d.readnum, d.cover];
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

// ��ѯ�����û���Ϣ
router.get('/user', (req, res) => {
    let data = {};
    // novel.username = req.session.username;
    //��ѯ����С˵
    let sql = 'SELECT * FROM user WHERE status = 1';
    conn.query(sql, (err, results) => {
        data.user = results;
        console.log(results);
        res.render('admin/user', data);
    });
});

// ����û���Ŀ
router.get('/addUser',(req,res)=>{
    res.render('admin/addUser');
})



// ����Ա������������
router.get('/personnal',(req,res)=>{
    res.render('admin/personnal');
})



// С˵��Ϣ��Ŀ
router.get('/novelAll', (req, res) => {
    let novel = {};
    // novel.username = req.session.username;
    //��ѯ����С˵
    let sql = 'SELECT * FROM books WHERE status = 1';
    conn.query(sql, (err, results) => {
        novel.novelAll = results;
        console.log(results);
        res.render('admin/novelAll', novel);
    });
});

// ɾ��С˵
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

// ɾ���û�
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

// ����С˵�½ڹ������
router.get('/addChapter', (req, res) => {

    res.render('admin/addChapter');
})
// router.get('/novelAll/chapter', (req, res) => {

//     res.render('admin/chapter');
// })
// ��ѯ��ǰС˵Ŀ¼�µ��½���Ϣ
router.get('/novelAll/chapter', (req, res) => {
    let data = {};
    console.log(req.query.bid)
    let bid=req.query.bid;
    // novel.username = req.session.username;
    //��ѯ����С˵
    let sql = `SELECT * FROM section WHERE belong = ${bid}`;
    conn.query(sql, (err, results) =>{
      
        if (err) {
            console.log(err);
            res.json({
                r: 'db_err'
            });
            return;
        }  
        data.chapterlist = results;
        console.log(results);
      
        res.render('admin/chapter',data);
        //   res.json({
        //     r: 'success'
        // });
    });
    // conn.query(sql, (err, results) => {
    //     novel.novelAll = results;
    //     console.log(results);
    //     res.render('admin/novelAll', novel);
    // });
})
module.exports = router;