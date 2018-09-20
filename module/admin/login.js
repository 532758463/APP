const express = require('express');
const router = express.Router();
//管理员登录  各种路由处理
router.get('/', (req, res)=>{
    // console.log('2');
    res.render('admin/login');
});


module.exports = router;