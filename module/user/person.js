/*这里操作用户的各种页面跳转 */


const express = require('express');
const router = express();

// 个人信息管理
router.get('/',(req,res)=>{
    res.render('user/info');
})

module.exports = router;