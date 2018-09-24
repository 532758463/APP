window.onload = function () {
    let img = document.querySelector('#images');
    //当选择文件时，value值改变会触发change事件
    img.onchange = function () {
        //获取选中的文件信息：文件内容
        console.log(this.files[0]);
        let This = this;
        //使用ajax发送图片到服务器
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/upload');

        //创建一个表单数据对象
        let formdata = new FormData();
        formdata.append('images', This.files[0]); //往表单追加input 名字，值
        xhr.send(formdata);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let data = JSON.parse(xhr.responseText);
                console.log(data);
                document.querySelector('#img').src = "/"+data.path;
                document.querySelector('#imgval').value ="/"+ data.path;
            }
        }
    }
}