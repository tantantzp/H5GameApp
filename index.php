<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport"
			content="width=device-width,user-scalable=no,initial-scale=1.0" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<title>9#考验</title>
		<link type="text/css" href="css/game.css" rel="stylesheet" />
				
		<script type="text/javascript" src="js/jquery-2.1.0.min.js"></script>
		<script type="text/javascript" src="js/createjs-2013.12.12.min.js"></script>
		<script type="text/javascript" src="js/close-pixelate.js"></script>
		<script type="text/javascript" src="js/mclose-pixelate.js"></script>
		<script type="text/javascript" src="js/jquery.cookie.js"></script>
		<script type="text/javascript" src="js/createjs_game.js"></script>
		<?php	//whquan
			require_once("auth.php");
		?>
		<script type="text/javascript" src="js/game_welcome.js" ></script>
		<script type="text/javascript" src="js/game_over.js" ></script>
		<script type="text/javascript" src="js/main.js"></script>
	</head>
	<body>

	    </div>
	    
	  	<canvas id="stage">
		您的浏览器不支持html5, 请换用支持html5的浏览器
		</canvas>
		<canvas height = 960 width=640 id="stage2" style= "display: none;">
		您的浏览器不支持html5, 请换用支持html5的浏览器
		</canvas>  	
	    <

		<!--img id ="stageimg" height = 300 width=350 src="img/game/jiujing1.jpg" style="display: "none";position: fixed;z-index: 9999;  top: 200px; left: 40px" 
			-->
		<div id=share style="display: none">
		<img width=100% src="img/share.png"
			style="position: fixed; z-index: 9999; top: 0; left: 0; display: "
			ontouchstart="document.getElementById('share').style.display='none';">
	    </div>
	    <div style="display: none;">
		<script type="text/javascript" src="js/weixin.js" ></script>
	</body>
</html>
