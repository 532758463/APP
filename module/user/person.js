/*��������û��ĸ���ҳ����ת */


const express = require('express');
const router = express();

// ������Ϣҳ��

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


// ������Ϣ����
router.get('setinfo', (req, res) => {
    let data = {};
    let sql = `select username,sex,birth,address,selfdes from user where uid=?`;
    conn.query(sql, (err, result) => {

    })
})


module.exports = router;