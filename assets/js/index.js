$(function () {
    //调用getUserInfo 获取用户基本信息
    getUserInfo();
    var later = layui.layer;
    // 点击按钮实现退出功能
    $('#btnLogout').on('click', function() {
        //提示用户是否确认退出
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'},
            function(index){
                //do something
                //1. 清空本地token
                localStorage.removeItem('token');
                //2. 重新跳转到登录页面
                location.href = './login.html';
                // 关闭 confirm 询问框
                layer.close(index);
            });
    })
})

//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            // 调用获取用户头像的方法
            renderAvator(res.data);
        },
        // 不论成功还是失败，最终都会调用 complete 回调函数
        /*complete: function(res) {
            console.log(res);
            //在complete 回调函数中可以使用 res.responseJSON 拿到服务器响应回来的数据
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                //1. 强制清空token
                localStorage.removeItem('token');
                //2. 强制跳转到登录页面
                location.href = './login.html'
            }
        }*/
    })
}
// 渲染用户头像的方法
function renderAvator(user) {
    //1. 获取用户的名称
    var name = user.nickname || user.username;
    //2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    //3. 按需渲染用户头像
    if (user.user_pic !== null) {
        //3.1 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        //3.2. 渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}