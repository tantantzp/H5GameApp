<?php
	require_once "oauth2.php";
	require_once "jssdk.php";
	$jssdk = new JSSDK("wxd32fa03d5ce9cb61", "6b3119937392ce1026528f3ecfe38367", "www.cstrunning.com");
	$signPackage = $jssdk->GetSignPackage();
?>

<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>

<script type="text/javascript">
	//alert(document.cookie);
	var played = $.cookie("played");	
	if(played == "true"){
	}else{
		//window.location = "index2.html";
	}
</script>

<script>
	//alert(location.href.split('#')[0]);
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
			desc: "在九号楼寻宝大作战中，我打败了93%的系友，看看你能得多少分，不服来挑战!",
			//desc: document.title,
			link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd32fa03d5ce9cb61&redirect_uri=http%3A%2F%2Fwww.cstrunning.com%2Fbuilding_no9%2Fgame%2Findex.php&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect',
			imgUrl: 'http://www.cstrunning.com/building_no9/game/img/bg.jpg',
			success: function(res) {	    		
				document.getElementById('share').style.display='none';
				//alert("qp_score="+qp_score);
			},
			cancel: function (res){
				document.getElementById('share').style.display='none';
			},
			fail: function (res){
				//alert(JSON.stringify(res));		    		
			}    	
		});
		
		wx.onMenuShareTimeline({
			title: "在九号楼寻宝大作战中，我打败了93%的系友，看看你能得多少分，不服来挑战!",
			desc: "九号楼，抹不去的青春印记",
			link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd32fa03d5ce9cb61&redirect_uri=http%3A%2F%2Fwww.cstrunning.com%2Fbuilding_no9%2Fgame%2Findex.php&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect',
			imgUrl: 'http://www.cstrunning.com/building_no9/game/img/bg.jpg',
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