$(function () {
    var form = layui.form;
    //验证码刷新
    $('#coderimg').click(function () {
        $(this).attr('src', '/coder?' + new Date());
    });

    //用户登录
    form.on('submit(login)',function(data){
        $.ajax({
            url:'login',
            type:'POST',
            dataType:'json',
            data:$('#userlogin').serialize(),
            // data:data.field,
            success:function(result){
                console.log(result);
                if(result.r=='u_not'){
                    layer.msg('账号不存在，请核对账号！', {
                        time: 5000, //5s后自动关闭
                        btn: ['OK']
                      });
                      return;
                }
                if(result.r == 'p_err'){
                    layer.msg('密码错误，请重新输入！', {
                        time: 5000, //5s后自动关闭
                        btn: ['OK']
                      });
                      return;
                }
                if(result.r=='ok'){
                    window.location.href = '/user';
                }
            }
        });
        return false;//阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
    
});