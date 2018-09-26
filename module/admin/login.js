const express = require('express');
const router = express.Router();
//管理员登录  各种路由处理
router.get('/', (req, res) => {
    // console.log('2');
    res.render('admin/login');
});

//登录验证
router.post('/', (req, res) => {
    let d = req.body;
    // console.log(d);
    // console.log(req.session);
    //验证验证码
    if (!req.session.coder || d.coder.toLowerCase() != req.session.coder.toLowerCase()) {
        res.json({
            r: 'coder_err'
        });
        return;
    }
    let sql = 'select * from admin where status = 1 and aname = ?';
    conn.query(sql, d.aname, (err, result) => {
        //账号不存在
        if (!result.length) {
            res.json({
                r: 'u_not'
            });
            return;
        }
        //判断密码是否正确
        if (md5(d.apasswd) != result[0].apasswd) {
            res.json({
                r: 'p_err'
            });
            return;
        }
        //登录成功
        //保存session信息
        req.session.aid = result[0].aid;
        req.session.aname = result[0].aname;
        
        
        //更新状态
        let sql = 'UPDATE admin SET atime = ? WHERE aid = ?';
        conn.query(sql, [new Date().toLocaleString(), result[0].aid], (err, result) => {
            res.json({
                r: 'ok'
            });
        });
    });
});

//导出模块
module.exports=router;