//@ sourceURL=dynamicScript.js
$(function() {
	//加载右下角小人
	L2Dwidget.init();
	//jq22.com iframe来自jq22.com
	var rand = parseInt(Math.random() * 17, 10) + 1;
	if (rand === 6 || rand === 9) {
		rand = 1;
	}
	$("#se").attr("src", "static/iframe/a" + rand + ".html");
	//百度统计代码
	var _hmt = _hmt || [];
	(function() {
		var hm = document.createElement("script");
		hm.src = "https://hm.baidu.com/hm.js?725f6480a444b27b9c479f473bdebeff";
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(hm, s);
	})();
	//一言接口
	fetch('https://v1.hitokoto.cn')
		.then(function(res) {
			return res.json();
		})
		.then(function(data) {
			$("#hitokoto").html(data.hitokoto);
			$("#hitokoto").attr('title', '——from：' + data.from);
			$(".header-p").qin({
				offset: 20, // default , 最大偏移量
				duration: 500, // default , 晃动时间
				recline: 0.2 // default , 每像素偏移量，越小“琴弦绷的越紧”
			});
		})
		.catch(function(err) {
			console.error(err);
		})
	//清除console.log
	console.clear();
	//控制台输出去版权
	console.log("%c您正在访问的是wangxiaohang.com 前端无秘密 取之请珍惜",
		" text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:3em"
	);
})
