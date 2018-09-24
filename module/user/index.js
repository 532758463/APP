/*这里操作主页面的各种跳转 */

const express = require('express');
const router = express();

let uid;
let data = {};


//主页面
router.get('/', (req, res) => {
	let sql = `SELECT * FROM adimg where ad_status=1`;
	conn.query(sql, (err, result) => {
		if (err) {
			console.log(err);
			res.json({
				r: 'db_err'
			});
			result;
		}
		data.adlist = result;
		res.render('index', data);
	})
	// res.render('index');
})


// 获取所有用户的信息 并显示用户主界面
router.get('/user', (req, res) => {
	let sql = `SELECT * from user where status=1`;
	conn.query(sql, (err, result) => {
		if (err) {
			console.log(err);
			res.json({
				r: 'db_err'
			});
			result;
		}
		data.userlist = result;
		res.render('./user/user', data);
	})
})


// 获取该用户的id
router.post('/user/person', (req, res) => {
	console.log(req.body.uid);
	uid = req.body.uid;
})

//跳转到用户的个人中心
router.get('/user/person', (req, res) => {
	// 从数据库查询用户的信息
	let sql = `SELECT * FROM user WHERE uid=?`;
	conn.query(sql, uid, (err, result) => {
		if (err) {
			console.log(err);
			res.json({
				r: 'db_err'
			});
			return;
		}
		data.userinfo = result;
		// console.log(data);
		res.render('./user/person', data);
	})

})

// 个人信息页面
router.get('/person/info', (req, res) => {
	res.render('./user/info', data);
})


// 个人信息设置
router.post('/person/setinfo', (req, res) => {
	let d = req.body;
	let sql = `UPDATE user SET username=?,sex=?,birth=?,address=?,selfdes=? WHERE uid = ? LIMIT 1`;
	conn.query(sql, [d.username, d.sex, d.birth, d.address, d.selfdes, uid], (err, result) => {
		if (err) {
			console.log(err);
			res.json({
				r: 'db_err'
			});
			result;
		}
		res.json({
			r: 'success'
		});
	})
})

//保存修改的头像信息到数据库          
router.post('/person/setheader', (req, res) => {
	// console.log(req.body);
	let d = req.body;
	let sql = `UPDATE user SET uimg=? WHERE uid = ${uid} LIMIT 1`;
	conn.query(sql, d.uimg, (err, result) => {
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
	})
})


// 我的主页 
router.get('/person/homepage', (req, res) => {
	// 书目
	let sql = `SELECT * from books WHERE status=1`;
	conn.query(sql, (err, result) => {
		if (err) {
			console.log(err);
			res.json({
				r: 'db_err'
			});
			result;
		}
		data.bookkinds = result;
		res.render('./user/homepage', data);
	})

})



// 我的书架
router.get('/person/bookshelf', (req, res) => {

	let collect = `SELECT * FROM collection AS c INNER JOIN books AS b ON c.bid=b.bid where uid=${uid}`;
	conn.query(collect, (err, results) => {
		if (err) {
			console.log(err);
			res.json({
				r: 'db_err'
			});
			result;
		}
		data.col_list = results;
		console.log(data);
		res.render('./user/bookshelf', data);
	})

})




module.exports = router;