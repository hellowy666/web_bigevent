// 在这里修改一次全局生效
// 注意：每次调用 $.get() 或者 $.post() 或者 $.ajax() 的时候，会先调用ajaxPrefilter函数
// 在这个函数中可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    //在发起真正的Ajax请求之前，统一拼接请求的根路径，再返回给Ajax拼接后的地址
    options.url = 'http://ajax.frontend.itheima.net' + options.url;

})