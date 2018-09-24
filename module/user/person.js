/*这里操作用户的各种页面跳转 */


const express = require('express');
const router = express();

// 个人信息页面

router.post('/info',function(req,res){
    let uid=req.body.uid;
    // console.log(uid);
})

router.get('/person/info', (req, res) => {
    let data = {};
    let sql = `SELECT * FROM user WHERE uid=?`;
    conn.query(sql,uid, (err, result) => {

        if (err) {
            console.log(err);
            res.json({
                r: 'db_err'
            });
            return;
        }
    data.infolist=result;
    console.log(data);
    res.render('./user/info', data);        
    })
})


// 基本信息设置
router.get('setinfo', (req, res) => {
    let data = {};
    let sql = `select username,sex,birth,address,selfdes from user where uid=?`;
    conn.query(sql, (err, result) => {

    })
})


module.exports = router;