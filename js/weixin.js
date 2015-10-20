
var myscore = qp_score;
var mylevel = qp_step;
window.shareData = {
        "imgUrl": "./img/icon.png", //分享时的图片
        "timeLineLink": "./index.html",  //分享时的链接
        "tTitle": "酒井猜图", //分享时的title
        "tContent": "酒井猜图" //分享时的内容
};
		
function goHome(){
	//window.location=mebtnopenurl;
}
function clickMore(){
	//goHome();
}
function dp_share(){
	document.title ="我在酒井猜图游戏中获得"+qp_score+"分，你也来试试吧！";
	document.getElementById("share").style.display="";
	window.shareData.tTitle = document.title;
}
function dp_Ranking(){
	//window.location=mebtnopenurl;
}

function showAd(){
}
function hideAd(){
}
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    
    WeixinJSBridge.on('menu:share:appmessage', function(argv) {
        WeixinJSBridge.invoke('sendAppMessage', {
            "img_url": window.shareData.imgUrl,
            "link": window.shareData.timeLineLink,
            "desc": window.shareData.tContent,
            "title": window.shareData.tTitle
        }, onShareComplete);
    });

    WeixinJSBridge.on('menu:share:timeline', function(argv) {
        WeixinJSBridge.invoke('shareTimeline', {
            "img_url": window.shareData.imgUrl,
            "img_width": "640",
            "img_height": "640",
            "link": window.shareData.timeLineLink,
            "desc": window.shareData.tContent,
            "title": window.shareData.tTitle
        }, onShareComplete);
    });
}, false);



var myData = {};
function dp_submitScore(score,level){
	myscore = qp_score;
	mystep = qp_step
	myData.score = qp_score;
	myData.scoreName = qp_score;
	if(score>5){
		if (confirm("真行,你获得了"+qp_score+"分！要不要通知下小伙伴们呢？")){
			dp_share();
		}
	}
}
function onShareComplete(res) {
	//document.location.href = mebtnopenurl;
}