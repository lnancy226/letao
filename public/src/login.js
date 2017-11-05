define(['jquery'],function($) {
  // 提交表单
  $('form').on('submit',function(){
    // 缓存外部this
    var _this = $(this);
    $.ajax({
      url: '/api/employee/employeeLogin',
      type: 'post',
      data: _this.serialize(),
      success: function(info){
        // 如果登录失败
        if(info.error){
          return alert(info.message);
        }

        // 如果登录成功，跳转到首页面
        location.href = '/';
      }
    });
    // 阻止默认提交
    return false;
  });
});