
function LoadGameoverSceneRes() {
	queue.loadManifest({path:RES_DIR + "img/", 
	    manifest:[{src:"maxscore.png", id:"maxscore"}, 
	              {src:"gameoverbg.png", id:"gameoverbg"}, 
	              {src:"curscore.png", id:"curscore"}, 
	              {src:"sharebtn.png", id:"sharebtn"}, 
	              {src:"gameover.png", id:"gameover"}]}, !1);
}


var GameoverScene = function () {
	
	var overContainer = new createjs.Container;
	stage.addChild(overContainer);
	var a, b;
	a = new createjs.Bitmap(queue.getResult("blurBg"));
	overContainer.addChild(a);
//	a = new createjs.Bitmap(queue.getResult("gameover"));
//	a.setAnchorPoint(0.5, 0.5);
//	a.x = 320;
//	a.y = 190;
//	overContainer.addChild(a);
	a = new createjs.Bitmap(queue.getResult("curscore"));
	a.x = 90;
	a.y = 290;
	overContainer.addChild(a);
	a = Math.abs(qp_score);
	a = new createjs.Text(a.toString(), "bold 60px Arial");
	a.textBaseline = "middle";
	a.x = 370;
	a.y = 320;
	overContainer.addChild(a);
	a = new createjs.Bitmap(queue.getResult("maxscore"));
	a.x = 90;
	a.y = 390;
	overContainer.addChild(a);
	
	a = Math.abs(qp_best);
	b = new createjs.Text(a.toString(), "bold 60px Arial");
	b.textBaseline = "middle";
	b.x = 370;
	b.y = 420;
	overContainer.addChild(b);

	b = new createjs.Bitmap(queue.getResult("sharebtn"));
	b.setAnchorPoint(0.5, 0.5);
	b.x = 320;
	b.y = 700;
	overContainer.addChild(b);
	b.on("mousedown", function (evt) {
		IS_TOUCH && evt.nativeEvent instanceof MouseEvent 
		|| (this.scaleY = this.scaleX = 0.95);
	});
	b.on("pressup", function (evt) {
		this.scaleY = this.scaleX = 1;
		dp_share();
	});
};

