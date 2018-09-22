const express=require('express');
const router=express();


//主页面
router.get('/',(req,res)=>{
	res.render('index');
})

module.exports=router;