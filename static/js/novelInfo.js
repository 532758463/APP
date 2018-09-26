// 本文件里的代码是玄幻小说界面点击小说或小说名进行跳转至被点击的小说详情页面
// $('.fantasyDis').on('click','.sendbid',function (e) {

$('.sendbid').click(function (e) { 
    e.preventDefault();
    // e.preventDefault();
    let bidInfo=$(this).attr('sendBid');
    console.log(bidInfo);
    $.ajax({
        type: "post",
        url: "/novelInfo",
        data: {
            bidInfo: bidInfo
        },
        dataType: "JSON",
        success: function (result) {
            window.location.href="/novelInfo"
        }
    });
});

// 以下代码是点击小说章节后跳转页面，并将小说内容渲染到界面上
$('.getSid').click(function (e) { 
    e.preventDefault();
    // e.preventDefault();
    let getSid=$(this).attr('sid');
    console.log(getSid);
    $.ajax({
        type: "post",
        url: "/novelInfo/readNovel",
        data: {
            getSid: getSid
        },
        dataType: "JSON",
        success: function (result) {
            window.location.href="/novelInfo/readNovel";
        }
    });
});