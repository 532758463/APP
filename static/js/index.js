$(function () {
  //轮播图
  layui.use('carousel', function () {
    var carousel = layui.carousel;
    //建造实例
    carousel.render({
      elem: '#curle',
      width: '100%', //设置容器宽度
      arrow: 'always' //始终显示箭头
      //,anim: 'updown' //切换动画方式
    });
  });


  // 点击头像，跳转到个人中心
  // $('#myheader').click(function(){
  //     window.location.href='../../views/user/personinfo.html'; 
  // })

})