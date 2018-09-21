const express=require('express');
const router=express.Router();

//登录页面
router.get('/',(req,res)=>{
    res.render('user/login');
})

//登录验证
router.post('/',(req,res)=>{
	let d=req.body;
	//验证码验证
	if(d.coder.toLowerCase()!=req.session.coder.toLowerCase()){
		res.json({r:'coder_err'});
		return;
	}
	//查找数据库
	let sql=`select * from user where username=?`;
	conn.query(sql,d.username,(err,result)=>{
		//找不到账号
		if(!result.length){
			res.json({r:'not_exit'});
			return;
		}
		//密码错误
		if(md5(d.uPasswd)!=result[0].uPasswd){
			res.json({r:'pad_erro'});
			return;
		}
		
		//保存session信息
		req.session.uid=result[0].uid;
		req.session.username=result[0].username;
		
		//更新管理员登录时间
		let sql=`update set admin utime=? where uid=?`;
		conn.query(sql,[new Date().toLocaleString(),result[0].uid],(err,result)=>{
			res.json({r:'success'});
		})
	})
	
})


//导出模块
module.exports=router;