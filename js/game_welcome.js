			

function LoadWelComeSceneRes() {
	queue.loadManifest({path:RES_DIR + "img/", 
	      manifest:[{src:"banner.jpg", id:"banner"}, 
	                {src:"help.jpg", id:"help"}, 
	                {src:"discription.png", id:"discription"}, 
	                {src:"playbtn.png", id:"playbtn"}, 
	                {src:"topbtn.png", id:"topbtn"}]}, !1);
}
function LoadGameoverSceneRes() {
	queue.loadManifest({path:RES_DIR + "img/", 
	    manifest:[{src:"maxscore.png", id:"maxscore"}, 
	              {src:"gameoverbg.png", id:"gameoverbg"}, 
	              {src:"curscore.png", id:"curscore"}, 
	              {src:"sharebtn.png", id:"sharebtn"}, 
	              {src:"gameover.png", id:"gameover"}]}, !1);
}

var WelComeScene = function (a, b, c) {
	var d = new createjs.Container;
	c.addChild(d);
	var e = new createjs.Shape;
	e.graphics.f(a).r(0, 0, 640, 960).ef();
	d.addChild(e);
	a = new createjs.Bitmap(queue.getResult("banner"));
	d.addChild(a);
	a = new createjs.Bitmap(queue.getResult("help"));
	a.setAnchorPoint(0.5, 0.5);
	a.x = 320;
	a.y = 480;
	d.addChild(a);
	a = new createjs.Bitmap(queue.getResult("discription"));
	a.setAnchorPoint(0.5, 0.5);
	a.x = 320;
	a.y = 700;
	d.addChild(a);
	a = new createjs.Bitmap(queue.getResult("playbtn"));
	a.setAnchorPoint(0.5, 0.5);
	a.x = 155;
	a.y = 850;
	d.addChild(a);
	a.on("mousedown", function (a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent ||
		(this.scaleY = this.scaleX = 0.95);
	}, a);
	a.on("pressup", function (a) {
		this.scaleY = this.scaleX = 1;
		step = score = 0;
		b();
		c.removeChild(d);
	}, a);
	a = new createjs.Bitmap(queue.getResult("topbtn"));
	a.setAnchorPoint(0.5, 0.5);
	a.x = 485;
	a.y = 850;
	d.addChild(a);
	a.on("mousedown", function (a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || 
		(this.scaleY = this.scaleX = 0.95);
	}, a);
	a.on("pressup", function (a) {
		this.scaleY = this.scaleX = 1;
		goHome();
	}, a);
	c.addChild(d);
};

var GameoverNormal = function (a, b, c, d) {
	onNewScore(Math.abs(score));
	var e = new createjs.Container;
	d.addChild(e);
	a = new createjs.Bitmap(queue.getResult("gameoverbg"));
	e.addChild(a);
	a = new createjs.Bitmap(queue.getResult("gameover"));
	a.setAnchorPoint(0.5, 0.5);
	a.x = 320;
	a.y = 190;
	e.addChild(a);
	a = new createjs.Bitmap(queue.getResult("curscore"));
	a.x = 90;
	a.y = 290;
	e.addChild(a);
	a = Math.abs(score);
	a = new createjs.Text(a.toString(), "bold 60px Arial", b);
	a.textBaseline = "middle";
	a.x = 370;
	a.y = 320;
	e.addChild(a);
	a = new createjs.Bitmap(queue.getResult("maxscore"));
	a.x = 90;
	a.y = 390;
	e.addChild(a);
	a = Math.abs(best);
	b = new createjs.Text(a.toString(), "bold 60px Arial", b);
	b.textBaseline = "middle";
	b.x = 370;
	b.y = 420;
	e.addChild(b);
	b = new createjs.Bitmap(queue.getResult("playbtn"));
	b.setAnchorPoint(0.5, 0.5);
	b.x = 185;
	b.y = 560;
	e.addChild(b);
	b.on("mousedown", function (a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || (this.scaleY = this.scaleX = 0.95);
	}, b);
	b.on("pressup", function (a) {
		this.scaleY = this.scaleX = 1;
		score = 0;
		c();
		d.removeChild(e);
	}, b);
	b = new createjs.Bitmap(queue.getResult("topbtn"));
	b.setAnchorPoint(0.5, 0.5);
	b.x = 455;
	b.y = 560;
	e.addChild(b);
	b.on("mousedown", function (a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || (this.scaleY = this.scaleX = 0.95);
	}, b);
	b.on("pressup", function (a) {
		this.scaleY = this.scaleX = 1;
		goHome();
	}, b);
	b = new createjs.Bitmap(queue.getResult("sharebtn"));
	b.setAnchorPoint(0.5, 0.5);
	b.x = 320;
	b.y = 700;
	e.addChild(b);
	b.on("mousedown", function (a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || (this.scaleY = this.scaleX = 0.95);
	}, b);
	b.on("pressup", function (a) {
		this.scaleY = this.scaleX = 1;
		dp_share();
	}, b);
};


