$(function() {

	let form=layui.form;

	//验证码切换
	$('#coder').click(function() {
		$(this).attr('src', '/coder?' + new Date());
	});

	//登录
	form.on('submit(formDemo)', function(data) {
		$.ajax({
			url: '/login',
			type: 'POST',
			dataType: 'JSON',
			data: $('#loginform').serialize(),
			success: function(result) {
				console.log(result);
				//验证码提示
				if(result.r=='coder_err'){
					$('input[name = "coder"]').parent().next().html('验证码错误');	
				}
				//账号提示
				if(result.r == 'not_exit') {
					$('input[name = "coder"]').parent().next().html('');	
					$('input[name = "upasswd"]').parent().next().html('');
					$('input[name = "username"]').parent().next().html('账号不存在');
				}
				//密码提示
				if(result.r == 'pad_erro') {
					$('input[name = "coder"]').parent().next().html('');	
					$('input[name = "username"]').parent().next().html('');
					$('input[name = "upasswd"]').parent().next().html('密码错误');
				}
				//登录验证成功 跳转到小说网主页面
				if(result.r == 'success') {
					window.location.href = '/index';
				}
			}
		});
	});

})