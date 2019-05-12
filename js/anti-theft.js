window.document.onkeydown = function() {
	var e = window.event || arguments[0];
	//屏蔽F12
	if (e.keyCode == 123) {
		alert("抱歉本页不支持直接打开控制台！");
		return false;
		//屏蔽Ctrl+Shift+I
	} else if ((e.ctrlKey) && (e.shiftKey) && (e.keyCode == 73)) {
		alert("抱歉本页不支持直接ctrl+shift+i！");
		return false;
		//屏蔽Shift+F10
	} else if ((e.shiftKey) && (e.keyCode == 121)) {
		alert("抱歉本页不支持直接shift+f10！");
		return false;
	}
};
//屏蔽右键单击
document.oncontextmenu = function() {
	alert("抱歉本页不支持右键！");
	return false;
}
//防止被iframe加载
if ((parent.window.location.host != window.location.host) && (top.window.location.href != window.location.href)) {
    top.window.location.href = 'https://wangxiaohang.com'
}