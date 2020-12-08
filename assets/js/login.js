$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    // 从layui 中获取form对象  ，layui是个对象，导入即可使用
    var form = layui.form;
    var layer = layui.layer;
    //通过form.verify() 函数自定义校验规则
    form.verify({
        //自定义了一个叫做 pwd 的校验规则
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格']
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        //1.阻止默认的提交行为
        e.preventDefault();
        var pw1 = $('#pw1').val().trim();
        var pw2 = $('#pw2').val().trim();
        if (pw1 !== pw2) {
            return layer.msg('输入的密码不一致');
        }

        //2.发起Ajax的post请求
        var data = {username: $('#form_reg [name=username]').val(),password: $('#form_reg [name=password]').val()}
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录');
            $('#link_login').click();
        })
    })
    //监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        //阻止默认提交行为: 先校验客户提交的数据,格式是否正确,或者你还需要对这些数据进行一个处理再提交,就需要先阻止下默认提交表单的行为
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            //this指$('#form_login')， 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                console.log(res.token);
                //将登陆成功得到的token字符串，到存到localStorage中
                localStorage.setItem('token', res.token);
                //跳转到后台主页
                location.href = './index.html';
            }
        })
    })
})