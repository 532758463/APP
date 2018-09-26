const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.render('user/register');
});
router.post('/newuser', (req, res) => {
    let d = req.body;
    let select = `select username from user`;
    let sql = 'insert into user(username,upasswd,tel,sex,selfdes) values(?,?,?,?,?)';
    if (!d.username || !d.upasswd) {
        res.json({
            r: 'null'
        });
        return;
    }
    conn.query(select, (err, result) => {
        for (let i = 0; i < result.length; i++) {
            //账号重复
            // if (d.username === result[i].username) {
            //     res.json({
            //         r: 'name_err'
            //     });
            //     return;
            // }
        }
    });
    if (d.upasswd1 != d.upasswd) {
        //密码不一致
        res.json({
            r: 'p_err'
        });
        return;
    }
    conn.query(sql, [d.username, md5(d.upasswd), d.tel, d.sex, d.selfdes], (err, result) => {
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
})




//导出模块
module.exports = router;