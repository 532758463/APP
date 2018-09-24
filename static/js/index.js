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

  let uid;

  // 点击用户头像，跳转到个人中心
  $('#myheader').click(function () {
    uid = $('#myself').attr('uid');
    // console.log(uid);
    $.ajax({
      url: '/user/person',
      type: 'POST',
      dataType: 'JSON',
      data: {
        uid: uid
      },
      success: function (result) {
        if (result.r == 'success') {
          console.log(result);
        }
      }
    })
  })

  // 基本信息设置
  $("#basic_info").click(function () {
    $.ajax({
      url: '/person/setinfo',
      type: 'POST',
      dataType: 'JSON',
      data: $('#forminfo').serialize(),
      success: function (result) {
        console.log(result);
      }
    })
  })

  // 头像设置
  $("#up_img").click(function () {
    let uimg=$("#imgval").attr('value');
    console.log(uimg);
    $.ajax({
      url: '/person/setheader',
      type: 'POST',
      dataType: 'JSON',
      data: {uimg:uimg},
      success: function (result) {
        window.location.reload();
      }
    })
  })

  //书架 
  // $('#shelfs').click(function(){
  //   $.ajax({
  //     url:'/person/bookshelf',
  //     type: 'POST',
  //     dataType: 'JSON',
  //     data: {uid:uid},
  //     success: function (result) {
  //     console.log(result);
  //     }
  //   })
  // })

})