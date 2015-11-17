<?php
	require_once "oauth2.php";
	require_once "jssdk.php";
	$jssdk = new JSSDK("wxd32fa03d5ce9cb61", "6b3119937392ce1026528f3ecfe38367", "www.cstrunning.com");
	$signPackage = $jssdk->GetSignPackage();
	//test custom service
	$sendurl = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=".$jssdk->getAccessToken();
	$sendmsg = array(
		"touser" => $cookieInfo['openid'],
		"msgtype" => "text",
		"text" => array()
				);
	$msgtext = array("content" => "Hello World");
	$sendmsg['text'] = $msgtext;
	$jsonSend = json_encode($sendmsg);
	//echo json_encode($sendmsg);
	$result = https_request($sendurl, $jsonSend);
?>

<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>

<script type="text/javascript">
	var played = $.cookie("played");	
	if(played == "true"){
	}else{
		//window.location = "index2.html";
	}
</script>

<script>
	wx.config({
		debug: false,
		appId: '<?php echo $signPackage["appId"];?>',
		timestamp: <?php echo $signPackage["timestamp"];?>,
		nonceStr: '<?php echo $signPackage["nonceStr"];?>',
		signature: '<?php echo $signPackage["signature"];?>',
		jsApiList: [
		  // 所有要调用的 API 都要加到这个列表中
		  //'checkJsApi',
		  'onMenuShareAppMessage',
		  'onMenuShareTimeline'
		]
	});
  
  	wx.ready(function () {
    // 在这里调用 API
		wx.onMenuShareAppMessage({
			title: "九号楼，抹不去的青春印记",
			//desc: "在九号楼寻宝大作战中，我赢得了"+qp_score+"分，看看你能得多少分，不服来挑战!",
			desc: "我在 \"9#考验\" 中打败了"+qp_score/999+"88%的系友，不服来挑战?!",			
			link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd32fa03d5ce9cb61&redirect_uri=http%3A%2F%2Fwww.cstrunning.com%2Fbuilding_no9%2Fgame%2Findex.php&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect',
			imgUrl: 'http://www.cstrunning.com/building_no9/game/img/bg.jpg',
			trigger: function(res) {
				this.desc = "我在 \"9#考验\" 中打败了"+qp_score/999+"88%的系友，不服来挑战?!";
			},
			success: function(res) {
				//document.getElementById('share').style.display='none';
				window.location = "http://alumni.cs.tsinghua.edu.cn/donation/";
			},
			cancel: function (res){
				document.getElementById('share').style.display='none';
			},
			fail: function (res){
				//alert(JSON.stringify(res));		    		
			}
		});
		
		wx.onMenuShareTimeline({
			//title: "在九号楼寻宝大作战中，我赢得了"+qp_score+"分，看看你能得多少分，不服来挑战!",
			title: "我在 \"9#考验\" 中打败了"+qp_score/999+"88%的系友，不服来挑战?!",			
			desc: "九号楼，抹不去的青春印记",
			link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd32fa03d5ce9cb61&redirect_uri=http%3A%2F%2Fwww.cstrunning.com%2Fbuilding_no9%2Fgame%2Findex.php&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect',
			imgUrl: 'http://www.cstrunning.com/building_no9/game/img/bg.jpg',
			trigger: function(res) {
				this.title = "我在 \"9#考验\" 中打败了"+qp_score/999+"88%的系友，不服来挑战?!";
			},
			success: function(res) {
				document.getElementById('share').style.display='none';
			},
			cancel: function (res){
				document.getElementById('share').style.display='none';
			},
			fail: function (res){
				//alert(JSON.stringify(res));
			}    	
		});    
	});	  
</script>