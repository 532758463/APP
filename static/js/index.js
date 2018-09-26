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
        window.location.href='/user';
        // console.log(result);
      }
    })
  })

  // 头像设置
  $("#up_img").click(function () {
    let uimg = $("#imgval").attr('value');
    console.log(uimg);
    $.ajax({
      url: '/person/setheader',
      type: 'POST',
      dataType: 'JSON',
      data: {
        uimg: uimg
      },
      success: function (result) {
        window.location.href='/user';
      }
    })
  })


  // 删除书单
  $('.operate').on('click', '.delcate', function () {

    if (!confirm("确定删除吗？")) {
      return;
    };

    console.log($(this).attr('id'));
    let id = $(this).attr('id');
    $.ajax({
      url: '/person/delcate',
      type: 'GET',
      dataType: 'JSON',
      data: {
        id: id
      },
      success: function (result) {
        console.log(result);
        if (result.r == 'success') {
          window.location.reload();
        }
      }
    });
  });

  // 搜索收藏的书
  $(".search_btn").click(function () {
    let val = $('input[name="bookname"]').val();
    $.ajax({
      url: '/person/search_col',
      type: 'POST',
      dataType: 'JSON',
      data: {
        bname: val
      },
      success: function (result) {
        console.log(result);
        if (result.r == "success") {
          window.location.href = '/person/bookcollect';
        }
      }
    })
  })






  // 分页
  // layui.use('laypage', function(){
  //   var count=$("#colpage").attr('count');
  //   var laypage = layui.laypage;
  //   laypage.render({
  //     elem: 'colpage', //注意，这里的 test1 是 ID，不用加 # 号
  //     count: count, //数据总数，从服务端得到
  //     limit:3

  //   });
  // });
 

})