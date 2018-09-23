
/*这里操作主页面的各种跳转 */

const express = require('express');
const router = express();


//主页面
router.get('/',(req,res)=>{
	res.render('index');
})


//登录成功后 渲染个人页面信息
router.post('/person',(req,res)=>{
	// 查询数据库
	let sql=`SELECT uimg FROM user WHERE uid=?`;
	conn.query(sql,req.session.uid,(err,result)=>{
		if(err){
			console.log(err);
			res.json({r:'db_err'});
			result;
		}
		// 把从数据库查询到的该用户的信息保存并传给个人页面进行渲染
		let data={};
		// data.person_info=result;
		console.log(data);
		res.render('./user/person',data);
	})
})


// 测试用（个人中心主页面）
router.get('/personinfo',(req,res)=>{
	res.render('./user/personinfo');
})

module.exports = router;