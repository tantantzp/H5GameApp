			

function LoadWelComeSceneRes() {
	queue.loadManifest({path:RES_DIR + "img/", 
	      manifest:[
            {src:"playbtn.png", id:"playbtn"}, 
            {src:"topbtn.png", id:"topbtn"},
            {src:"title.png", id:"title"}
	        ]}, !1);
}


var WelComeScene = function (gameFunc, stage) {
	stage.clear();
	
	var tcontainer = new createjs.Container;
	stage.addChild(tcontainer);
	
	var tbgimg;
	tbgimg = new createjs.Bitmap(qp_resourceList.getResult("bg"));
	tbgimg.x = 0;
	tbgimg.y = 0 ;
	tbgimg.scaleX = (ScreenWidth / tbgimg.image.width);
	tbgimg.scaleY = (ScreenHeight / tbgimg.image.height);
	tcontainer.addChild(tbgimg);          //add background img
		
	var ttitle;
    ttitle = new createjs.Bitmap(qp_resourceList.getResult("title"));
	ttitle.x = 0;
	ttitle.y = 0 ;
	ttitle.scaleX = (ScreenWidth / ttitle.image.width);
	ttitle.scaleY = (ScreenHeight / ttitle.image.height);
	ttitle.alpha = 0;
	createjs.Tween.get(ttitle).to({alpha:1}, 1000);
	
	
   // var pixelDolly1 = ttitle.image.closePixelate( pixelOpts )
    //ClosePixelation( ttitle.image, options );
	console.log("image", ttitle.image.width);
	tcontainer.addChild(ttitle);          //add background img
	
	/*
	var img = qp_resourceList.getResult("title");
	var pixelOpts = [ { resolution: 10 } ];
	var myBlur = new BlurImg( img,  pixelOpts);
    var canvas = document.getElementById("stage2");
    var test = new createjs.Bitmap(canvas);
    tcontainer.addChild(test);
    */
    
   
    var btn1;
	btn1 = new createjs.Bitmap(queue.getResult("playbtn"));
	btn1.setAnchorPoint(0.5, 0.5);

	btn1.x = 305;
	btn1.y = 810;
	btn1.alpha = 0;
	createjs.Tween.get(btn1).wait(1000).to({alpha:1}, 1000);	
	tcontainer.addChild(btn1);
	btn1.on("mousedown", function () {
		IS_TOUCH && this.nativeEvent instanceof MouseEvent ||
		(this.scaleY = this.scaleX = 0.95);
	});
	btn1.on("pressup", function () {
		this.scaleY = this.scaleX = 1;
		var gameIndex = 0;
		gameFunc(gameIndex);
		stage.removeChild(tcontainer);
		
	});
	
	var btn2;
	btn2 = new createjs.Bitmap(queue.getResult("topbtn"));
	btn2.setAnchorPoint(0.5, 0.5);
	btn2.x = 305;
	btn2.y = 900;
	btn2.alpha = 0;
	createjs.Tween.get(btn2).wait(1000).to({alpha:1}, 1000);	
	tcontainer.addChild(btn2);
	btn2.on("mousedown", function () {
		IS_TOUCH && this.nativeEvent instanceof MouseEvent || 
		(this.scaleY = this.scaleX = 0.95);
	});
	btn2.on("pressup", function () {
		this.scaleY = this.scaleX = 1;
	    stage.removeAllChildren();		
		submitScore(qp_score-2);	//whquan
		qp_score1 = qp_score1 + 13;
		GamePreOverScene();//whquan
        //GameoverScene();//whquan
	});
};

