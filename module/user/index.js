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
			return;
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
			return;
		}
		data.userlist = result;
		res.render('./user/user', data);
	})
})


// 获取该用户的id (应该在一登录进来就获取到)
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
		// 把从数据库查询到的该用户的信息保存并传给个人页面进行渲染
		let data={};
		// data.person_info=result;
		console.log(data);
		res.render('./user/person',data);
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
      	return;
        }
        res.json({
        r: 'success'
        })
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
	let sql = `SELECT * from book_kinds WHERE status=1`;
	conn.query(sql, (err, result) => {
		if (err) {
			console.log(err);
			res.json({
				r: 'db_err'
			});
			return ;
		}
		data.bookkinds = result;
		res.render('./user/homepage', data);
	})

})

// 我的书架
router.get('/person/bookshelf', (req, res) => {
	console.log(uid);
	let collect = `SELECT * FROM collection AS c INNER JOIN books AS b ON c.bid=b.bid where uid=${uid} AND c.status=1`;
	conn.query(collect, (err, results) => {
		if (err) {
			console.log(err);
			res.json({
				r: 'db_err'
			});
			return;
		}
		data.col_list = results;
		console.log(data);
		res.render('./user/bookshelf', data);
	})

})



// 删除书单
router.get('/person/delcate', (req, res)=>{
    let sql = 'UPDATE collection SET status = 0 WHERE id = ? LIMIT 1';
    conn.query(sql, req.query.id, (err, result)=>{
        if(err){
            console.log(err);
            res.json({r:'db_err'});
            return ;
        }
        res.json({r:'success'});
    });
});



// 搜索书单
router.post('/person/search_col', (req, res) => {
	console.log(uid);
	let d = req.body;
	let sql = `SELECT * FROM collection AS c INNER JOIN books AS b ON c.bid=b.bid where uid=? AND c.status=1 AND bname like '%${d.bname}%' `;
	conn.query(sql, [uid] ,(err, result) => {
		if (err) {
			console.log(err);
			res.json({
				r: 'db_err'
			});
			return;
		}
		data.col_search = result;
		res.json({r:"success"});
	})
})

router.get('/person/bookcollect',(req,res)=>{
	console.log(data);
	res.render('./user/bookcollect',data);
})

// 分类小说（玄幻小说)路由
router.get('/FantasyNovel',(req,res)=>{
	let sql=`SELECT * FROM books WHERE status=1 AND kinds='玄幻'`;
	conn.query(sql,(err,result)=>{
		if(err){
			console.log(err);
			return;
		}
		// 把从数据库查询到的该用户的信息保存并传给个人页面进行渲染
		let data={};
		data.books=result;
		res.render('user/FantasyNovel',data);
	})
	
})






let bidInfo=0;
// 获取被点击小说的详情
router.post('/novelInfo',(req,res)=>{
	bidInfo=req.body.bidInfo;
	// console.log(bidInfo);
	let sql = `SELECT * FROM section INNER JOIN books on section.bid=books.bid where  section.bid=${bidInfo} AND  section.status=1;`
	conn.query(sql,(err,result)=>{
		if(err){
			console.log(err);
			return;
		}

		res.json({
            r: 'success'
        });
	})
})
// 配置小说详情页的路由,并且获得数据
router.get('/novelInfo',(req,res)=>{
	let bid=bidInfo;
	console.log(bid);
	let sql = `SELECT * FROM section INNER JOIN books on section.bid=books.bid where  section.bid=${bid} AND  section.status=1;`
	conn.query(sql,(err,result)=>{
		if(err){
			console.log(err);
			return;
		}
		// 把从数据库查询到的该用户的信息保存并传给个人页面进行渲染
		let data={};
		data.books=result;
		// console.log(data.books);
		res.render('user/novelInfo',data);
})
});


// 阅读小说的界面路由
// router.get('/novelInfo/readNovel',(req,res)=>{
// 	res.render('user/readNovel');
// })
// 获得被点击章节的sid
let readSid=0;
router.post('/novelInfo/readNovel',(req,res)=>{
	readSid=req.body.getSid;
	// console.log(bidInfo);
	let sql = `SELECT * FROM section INNER JOIN books on section.bid=books.bid where  section.sid=${readSid} AND  section.status=1;`
	conn.query(sql,(err,result)=>{
		if(err){
			console.log(err);
			return;
		}

		res.json({
            r: 'success'
        });
	})
});
// 获得小说章节数据并且渲染到页面（将数据发送到模板文件里）
router.get('/novelInfo/readNovel',(req,res)=>{
	let sql = `SELECT * FROM section INNER JOIN books on section.bid=books.bid where  section.sid=${readSid} AND  section.status=1;`
	conn.query(sql,(err,result)=>{
		if(err){
			console.log(err);
			return;
		}
		// 把从数据库查询到的该用户的信息保存并传给个人页面进行渲染
		let data={};
		data.books=result;
		console.log(data.books);
		res.render('user/readNovel',data);
})
});
module.exports = router;