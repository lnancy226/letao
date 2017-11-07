define(['jquery','template','ckeditor','./utils','uploadify'],function($,template,CKEDITOR){
	CKEDITOR.replace('ck');
	// 提交表单
	$('form').on('submit',function(){
			var _this = $(this);
			$.ajax({
				url: '/api/product/addProduct',
				type: 'post',
				data: _this.serialize(),
				success: function(info){
					if(info.success){
						location.href = '/goods_list.php';
					}
				}
			})

		return false;
	});

	// 品牌列表
	$.ajax({
		url: '/api/category/querySecondCategoryPaging',
		type: 'get',
		data: {
			page: 1,
			pageSize: 100
		},
		success: function(info){
			// console.log(info);
			var html = template('brands',info);
			// 如果用html()会将里面原有的内容（请选择品牌）覆盖，所以应使用append();
			$('.brand').append(html);
		}
	});

	// 图片上传
	// 使用jquery插件uploadify
	// jquery插件的 一般 使用规律是 $(DOM).插件方法(对象格式数据)
	$('#upfile').uploadify({
		// 设置上传按钮文字
		buttonText: '',
		// 修改上传按钮宽度
		width: 120,
		// 修改上传按钮高度
		height: 120,
		// 上传文件name属性
		fileObjName: 'pic1',
		// 用于设置上传队列的HTML模版;自定义上传进度条样式
		itemTemplate: '<span></span>',
		// 使用flash
		swf: '/public/assets/uploadify/uploadify.swf',
		// 文件上传地址
		uploader: '/api/product/addProductPic',
		onUploadSuccess: function(file,data){
			// json字符串
			// console.log(data);
			var res = JSON.parse(data);
			// 从后台取出实现预览效果
			$('.preview img').attr('src','http://localhost:3000' + res.picAddr);
			// 将图片上传地址放到表单中等待提交
			$('input[name="pic"]').val(res.picAddr);
		}
	});
});