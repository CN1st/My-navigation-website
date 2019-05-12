if ('OVER' != getCookie("FIRSTTIME")) {
	setCookie("_1", "https://www.google.com/");
	setCookie("_2", "https://www.baidu.com/");
	setCookie("_3", "https://cn.bing.com");
	setCookie("_4", "http://www.webcrawler.com/");
	setCookie("_5", "https://duckduckgo.com/");
	setCookie("_6", "https://www.wolframalpha.com/");
	setCookie("_7", "https://www.yandex.com/");
	setCookie("_8", "https://www.ask.com/");
	setCookie("_9", "https://mijisou.com/");
	setCookie("_0", "https://wangxiaohang.com");
	setCookie("_A", "https://www.aliyun.com/");
	setCookie("_B", "");
	setCookie("_C", "https://www.bootcdn.cn/");
	setCookie("_D", "https://docs.microsoft.com/zh-cn/");
	setCookie("_E", "https://qiye.aliyun.com/");
	setCookie("_F", "https://translate.google.cn/");
	setCookie("_G", "https://gitee.com/");
	setCookie("_H", "https://github.com/");
	setCookie("_I", "https://www.iconfont.cn/");
	setCookie("_J", "");
	setCookie("_K", "https://www.kxdao.net/");
	setCookie("_L", "http://miwifi.com/cgi-bin/luci/web");
	setCookie("_M", "https://i.mi.com/");
	setCookie("_N", "https://tool.lu/");
	setCookie("_O", "http://tool.oschina.net/");
	setCookie("_P", "https://www.yunpanjingling.com/");
	setCookie("_Q", "https://mail.qq.com/");
	setCookie("_R", "http://www.runoob.com/");
	setCookie("_S", "http://suo.im/");
	setCookie("_T", "https://tongji.baidu.com/web/welcome/login");
	setCookie("_U", "");
	setCookie("_V", "");
	setCookie("_W", "");
	setCookie("_X", "");
	setCookie("_Y", "https://www.cnblogs.com/youin/");
	setCookie("_Z", "http://stu.ysd3g.com/");
	setCookie("FIRSTTIME", "OVER");
};

var urlcache = {};
var favcache = {};

for (var i = 48; i <= 90; i++) {
	var code = String.fromCharCode(i);
	var v = getCookie("_" + code);
	var f = getCookie("_" + code + "_F");
	if (v != null && v != '' && typeof(v) != 'undefined') {
		urlcache[code] = v;
		if (f != null && f != '' && typeof(f) != 'undefined') {
			favcache[code] = f;
		} else {
			favcache[code] = getico(v);
		}
		$("#LI_" + code).prepend('<img id="' + code + '" class="fav" src="' + favcache[code] + '" align="center">')
	}
};

$(document).keyup(function(ev) {
	if (ev.ctrlKey) return false;
	var code = String.fromCharCode(ev.keyCode);
	$("#LI_" + code).addClass("active");
	setTimeout('$("#LI_' + code + '").removeClass("active");', 300);
	if (urlcache[code] == '' || typeof(urlcache[code]) == 'undefined') {
		$("#message").html('此按键未配置,请注意切换您的输入法');
		setTimeout('$("#message").html("");', 2000)
	} else window.open(urlcache[code]);
});

$("#main li").mouseenter(function() {
	$("#tempdate").val($(this).attr('id').replace("LI_", ""));
	$(this).append(
		'<div class="oper"><span><a onclick="return del()" class="del" title="删除">✖</a></span><span><a onclick="return update()" class="edit" title="编辑">✎</a></span></div>'
	)
}).mouseleave(function() {
	$("#tempdate").val('');
	$(".oper").remove()
});

$("#main li").click(function() {
	var code = $(this).attr('id').replace('LI_', '');
	if (urlcache[code] != '' && typeof(urlcache[code]) != 'undefined') {
		window.open(urlcache[code]);
	}
});

function del() {
	var code = $("#tempdate").val();
	urlcache[code] = '';
	favcache[code] = '';
	$("#" + code).remove();
	deleteCookie("_" + code);
	deleteCookie("_" + code + "_F");
	return false;
};

function update() {
	var code = $("#tempdate").val();
	$("#LI_" + code).css('background', '#ccf');
	var u = window.prompt("请输入键位 [" + code + "] 对应的网站地址", urlcache[code]);
	if (u.indexOf('http://') == -1 && u.indexOf('https://') == -1) {
		u = 'http://' + u;
	};
	if (!IsURL(u)) {
		alert('网站地址输入错误,请核对!');
		return false;
	};
	urlcache[code] = u;
	setCookie("_" + code, u);
	var uf = window.prompt("请输入键位 [" + code + "] 对应的favicon地址,不填则默认使用\n“" + urlcache[code] + "”下的“favicon.ico”", "");
	if (uf != "") {
		if (uf.indexOf('http://') == -1 && uf.indexOf('https://') == -1) {
			uf = 'http://' + uf;
		};
		if (!IsURL(uf)) {
			alert('favicon地址输入错误,请核对!');
			return false;
		};
		favcache[code] = uf;
		setCookie("_" + code + "_F", uf);
	} else {
		favcache[code] = getico(u);
		deleteCookie("_" + code + "_F");
	}
	$("#LI_" + code).css('background', '#fff');
	$("#" + code).remove();
	$("#LI_" + code).prepend('<img id="' + code + '" class="fav" src="' + favcache[code] + '" align="center">');
	return true;
};

function getico(url) {
	var s = url.indexOf("//");
	temp = url.substring(s + 2);
	var s1 = temp.indexOf("/");
	if (s1 == -1) {
		s1 = temp.length
	};
	return url.substring(0, s1 + s + 2) + '/favicon.ico'
};

function setCookie(name, value, path, domain, secure) {
	var expdate = new Date();
	expdate.setTime(expdate.getTime() + (100 * 365 * 24 * 60 * 60 * 1000));
	document.cookie = name + "=" + escape(value) + ((expdate) ? "; expires=" + expdate.toGMTString() : "") + "; path=/";
};

function deleteCookie(name) {
	expdate = new Date();
	expdate.setTime(expdate.getTime() - (86400 * 1000));
	setCookie(name, "", expdate)
};

function getCookie(name) {
	var bikky = document.cookie;
	name += "=";
	var i = 0;
	while (i < bikky.length) {
		var offset = i + name.length;
		if (bikky.substring(i, offset) == name) {
			var endstr = bikky.indexOf(";", offset);
			if (endstr == -1) endstr = bikky.length;
			return decodeURIComponent(bikky.substring(offset, endstr))
		};
		i = bikky.indexOf(" ", i) + 1;
		if (i == 0) break
	};
	return
};

function IsURL(str_url) {
	var strRegex = "^((https|http|ftp|rtsp|mms|chrome)?://)" + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" +
		"(([0-9]{1,3}.){3}[0-9]{1,3}" + "|" + "([0-9a-z_!~*'()-]+.)*" + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]." + "[a-z]{2,6})" +
		"(:[0-9]{1,4})?" + "((/?)|" + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
	var re = new RegExp(strRegex);
	return !!re.test(str_url);
};
