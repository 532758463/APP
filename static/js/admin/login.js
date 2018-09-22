$(function () {
    var form = layui.form;
    //验证码刷新
    $('#coderimg').click(function () {
        $(this).attr('src', '/coder?' + new Date());
    });

    //管理员登录
    form.on('submit(login)',function(data){
        $.ajax({
            url:'login',
            type:'POST',
            dataType:'json',
            data:$('#adminlogin').serialize(),
            // data:data.field,
            success:function(result){
                console.log(result);
                if(result.r=='u_not'){

                }
            }
        });
    });
    layer.msg('账号不存在！', {
        time: 20000, //20s后自动关闭
        // btn: ['明白了', '知道了', '哦']
      });
    
});