$(function(){


    //保存数据到数据库
    $('#sub').click(function(){
        let Time;
        $.ajax({
            url:'/user/register/newuser',
            type:'post',
            dataType:'json',
            data:$('#register').serialize(),
            success:function(result){
                console.log(result);
                if(result.r=='null'){
                    layer.msg('账号/密码不能为空，请重新输入！', {
                        time: 5000, //5s后自动关闭
                        btn: ['OK']
                      });
                      return;
                }
                if(result.r == 'p_err'){
                    layer.msg('密码不一致，请重新核对！', {
                        time: 5000, //5s后自动关闭
                        btn: ['OK']
                      });
                      return;
                }
                if(result.r=='ok'){
                    layer.msg('恭喜注册成功，5秒后自动返回登录界面！', {
                        time: 5000, //5s后自动关闭
                        btn: ['OK']
                      });
                    Time = setTimeout(function(){
                        window.location.href = '/user/login';
                    },5000);
                }
            }
        });
        clearTimeout(Time);
        return false;
    });
});