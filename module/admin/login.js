const express = require('express');
const router = express.Router();
//管理员登录  各种路由处理
router.get('/', (req, res)=>{
    // console.log('2');
    res.render('admin/login');
});

//登录验证
router.post('/',(req,res)=>{
	let d=req.body;
	console.log(d);
	//验证码验证
	if(d.coder.toLowerCase()!=req.session.coder.toLowerCase()){
		res.json({r:'coder_err'});
		return;
	}
	//查找数据库
	let sql=`select * from admin where aname=?`;
	conn.query(sql,d.aname,(err,result)=>{
		//找不到账号
		if(!result.length){
			res.json({r:'not_exit'});
			return;
		}
		//密码错误
		if(md5(d.apasswd)!=result[0].apasswd){
			res.json({r:'pad_erro'});
			return;
		}
		
		//保存session信息
		req.session.aid=result[0].aid;
		req.session.aname=result[0].aname;
		
		//更新管理员登录时间
		let sql=`update set admin atime=? where aid=?`;
		conn.query(sql,[new Date().toLocaleString(),result[0].aid],(err,result)=>{
			res.json({r:'success'});
		})
	})
	
})

module.exports = router;