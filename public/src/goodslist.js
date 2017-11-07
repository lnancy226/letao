define(['jquery','template','./utils'],function($,template){
	// 设置每页展示的商品数
	var size = 2;
	// 在请求的参数中匹配页码的正则表达式
	var reg = /\?[a-z]+=(\d+)/;
	// 获得请求参数(获取url中“？”及之后部分字符串)
	var search = location.search || '';
	// console.log(search);
	// 匹配查找页数  RegExpObject.exec(string) 方法用于检索字符串中的正则表达式的匹配。返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null。
	var page = reg.exec(search) && reg.exec(search)[1];
	// console.log(page);
	page = page || 1;

	$.ajax({
		url: '/api/product/queryProductDetailList',
		type: 'get',
		data: {
			page: page,
			pageSize: size
		},
		success: function(info){
			// 获取返回的总的产品数量(为求总页数)
			var total = info.total;
			// 总页数--向上取整
			var pageLen = Math.ceil(total / size);
			// 调用模板引擎处理商品列表
			var html = template('tpl',info);
			$('.goods').html(html);

			// 调用模板引擎处理分页
			var pagehtml = template('page',{
				pageLen: pageLen,
				page: page
			});
			$('.pagination').html(pagehtml);
		}
	});
});