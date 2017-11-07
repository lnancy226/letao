// 模块公共配置
require.config({
	// 基础路径
	baseUrl: '/public',
	// 详细路径；不加后缀，会自动补全
	paths: {
	// 路径深且长，配置代名称（相当于一个变量），代表此路径
		jquery: 'assets/jquery/jquery.min',
		template: 'assets/artTemplate/template-web',
		uploadify: 'assets/uploadify/jquery.uploadify.min',
		nprogress: 'assets/nprogress/nprogress',
		ckeditor: 'assets/ckeditor/ckeditor'
	},
	// 如果使用的第三方类库不支持AMD，通过shim可以实现类似模块的用法
	// 模块的特点：1.有return出的接口 2.可以依赖其他块
	shim: {
		uploadify: {
			// 1.通过exports可以将非模块的方法或属性公开出来（相当于标准模块中return的作用）；如果不需要公开就不用使用
			// exports:

			// 2.通过deps可以依赖其他模块
			deps: ['jquery']
		},
		ckeditor: {
			exports: 'CKEDITOR'
		}

	}
});

// 全局执行进度条
require(['jquery','nprogress'],function($,NProgress){
	// 打开html页面显示进度条效果
	NProgress.start();
	NProgress.done();
	// 当发送ajax请求时，显示进度
	$(document).ajaxStart(function(){
		NProgress.start();
	}).ajaxStop(function(){
		NProgress.done();
	})
});