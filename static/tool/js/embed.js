layui.use(['layer','form'],function(){var form=layui.form;var layer=layui.layer;});$(document).ready(function(){var getip=$("#getip").text();$.get("./GetInfo.php?type=ipip"+"&ip="+getip,function(data,status){if(status=='success'){var myip=eval('('+data+')');$("#mylocation").text(myip.country+' '+myip.region+' '+myip.city+' '+myip.county+' '+myip.isp);}});$("#btn").click(function(){$("#myip").hide();$("#ipinfo").hide();$("#allinfo").hide();$("#loading").show();var ip=$("#ip").val();ip=ip.replace(/ /g,"");var type=$("#type").val();switch(type){case 'default':$("#api").text("IPIP.NET");break;case 'ipip':$("#api").text("IPIP.NET");break;case 'taobao':$("#api").text("淘宝");break;case 'sina':$("#sina").text("新浪");break;case 'geoip':$("#api").text("GeoIP");break;}
if(type=='all'){$.get("./AllInfo.php?ip="+ip,function(data,status){var ipinfo=eval('('+data+')');if(status=='success'){$("#allip").text(ipinfo.ip);if(ipinfo.status==1){$("#ipip").text(ipinfo.ipip);$("#taobao").text(ipinfo.taobao);$("#sina").text(ipinfo.sina);$("#geoip").text(ipinfo.geoip);$("#qqwry").text(ipinfo.qqwry);$("#allinfo").show();$("#loading").hide();}
else if(ipinfo.status==0){layer.open({title:'错误提示',content:ipinfo.msg,});$("#loading").hide();}}})}
else{$.get("./GetInfo.php?type="+type+"&ip="+ip,function(data,status){if(status=='success'){var ipinfo=eval('('+data+')');if(ipinfo.status==1){$("#reip").text(ipinfo.ip);$("#country").text(ipinfo.country);$("#region").text(ipinfo.region);$("#city").text(ipinfo.city);$("#isp").text(ipinfo.isp);$("#county").text(ipinfo.county);$("#ipinfo").show();$("#loading").hide();}
else if(ipinfo.status==0){layer.open({title:'错误提示',content:ipinfo.msg,});$("#loading").hide();}}});}});});function mobile(){var protocol=window.location.protocol;var host=window.location.host;var pathname=window.location.pathname;var url=protocol+'//'+host+pathname;var qrcode="https://pan.baidu.com/share/qrcode?w=200&h=200&url="+url;var qrimg="<center><img src = '"+qrcode+"' /></center>";layer.open({type:1,title:'请用手机扫描访问',content:qrimg});}
function api(){layer.open({title:'温馨提示：',content:'API正在开发中...敬请期待。'});}
function about(){layer.open({type:2,title:'关于',area:['800px','600px'],content:'./static/about.html'});}
function getIPs(callback){var ip_dups={};var RTCPeerConnection=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection;var useWebKit=!!window.webkitRTCPeerConnection;if(!RTCPeerConnection){var win=iframe.contentWindow;RTCPeerConnection=win.RTCPeerConnection||win.mozRTCPeerConnection||win.webkitRTCPeerConnection;useWebKit=!!win.webkitRTCPeerConnection;}
var mediaConstraints={optional:[{RtpDataChannels:true}]};var servers={iceServers:[{urls:"stun:stun.services.mozilla.com"}]};var pc=new RTCPeerConnection(servers,mediaConstraints);function handleCandidate(candidate){var ip_regex=/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
var ip_addr=ip_regex.exec(candidate)[1];if(ip_dups[ip_addr]===undefined)
callback(ip_addr);ip_dups[ip_addr]=true;}
pc.onicecandidate=function(ice){if(ice.candidate)
handleCandidate(ice.candidate.candidate);};pc.createDataChannel("");pc.createOffer(function(result){pc.setLocalDescription(result,function(){},function(){});},function(){});setTimeout(function(){var lines=pc.localDescription.sdp.split('\n');lines.forEach(function(line){if(line.indexOf('a=candidate:')===0)
handleCandidate(line);});},1000);}
getIPs(function(ip){if(ip.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/))
$("#localip").append(ip);});