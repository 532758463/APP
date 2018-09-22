$(function () {
  
    // 添加分类
$('.formAdd').click(function (e) { 
    e.preventDefault();
    $.ajax({
        url: '/admin/addNovel',
        type: 'POST',
        dataType: 'JSON',
        data: $('#formAdd').serialize(),
        // data:data.field,
        success: function (result) {
            console.log(result);
        }
    });
    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
});
    
});