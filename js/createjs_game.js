
var stage, W = 640, H = 960, IS_TOUCH, SCREEN_SHOW_ALL = !1, 
    g_androidsoundtimer = null, g_followAnim = null;
var qp_score = 0, qp_best = 500, qp_step = 0;

var RES_DIR = "";
var USE_NATIVE_SOUND = !1;
var USE_NATIVE_SHARE = !1;
var IS_IOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? !0 : !1;
var IS_ANDROID = false;//-1 < navigator.userAgent.indexOf("Android");
var IS_NATIVE_ANDROID = IS_ANDROID && -1 < navigator.userAgent.indexOf("Version");

onload = function () {
	stage = new createjs.Stage("stage");
	if (IS_TOUCH = createjs.Touch.isSupported()) {
		createjs.Touch.enable(stage, !0);
		var a = new createjs.Shape;
		a.graphics.f("white").r(0, 0, W, H);
		stage.addChild(a);
	}
	createjs.Ticker.setFPS(60);
	setTimeout(setCanvas, 100);
	createjs.Ticker.on("tick", stage);
	loadResource();

};


onresize = setCanvas;
function setCanvas() {
	var a = stage.canvas, b = window.innerWidth, c = window.innerHeight - 3;
	if (SCREEN_SHOW_ALL) {
		var d = c;
		b / c > W / H ? b = W * c / H : c = H * b / W;
		a.style.marginTop = (d - c) / 2 + "px";
	} else {
		d = W * c / H, b >= d ? (b = d, stage.x = 0) : stage.x = (b - d) / 2;
	}
	a.width = W;
	a.height = H;
	a.style.width = b + "px";
	a.style.height = c + "px";
}
createjs.DisplayObject.prototype.do_cache = function () {
	var a = this.getBounds();
	this.cache(a.x, a.y, a.width, a.height);
};
createjs.DisplayObject.prototype.setAnchorPoint = function (a, b) {
	var c = this.getBounds();
	this.regX = c.width * a;
	this.regY = c.height * b;
};
createjs.Container.prototype.addCenterChild = function (a) {
	a.setAnchorPoint(0.5, 0.5);
	var b = this.getBounds();
	a.x = b.x + 0.5 * b.width;
	a.y = b.y + 0.5 * b.height;
	this.addChild(a);
};

USE_NATIVE_SOUND ? createjs.Sound.play = function (a) {
	window.open("qipa://sound/" + GID + "/" + a);
} : IS_NATIVE_ANDROID && (createjs.Sound.play = function (a, b) {
	var c = queue.getResult("sound");
	c.currentTime = this.soundSprite[a];
	c.play();
	void 0 != b && !0 == b && (null != g_androidsoundtimer && (clearTimeout(g_androidsoundtimer), g_androidsoundtimer = null), g_androidsoundtimer = setTimeout(function () {
		createjs.Sound.play("silenttail");
	}, 1000));
}, createjs.Sound.registMySound = function (a, b) {
	this.soundSprite || (this.soundSprite = {});
	this.soundSprite[a] = b;
});

function showFPS() {
	var a = new createjs.Text("", "bold 24px Arial", "red");
	a.x = W;
	a.textAlign = "right";
	a.textBaseline = "top";
	stage.addChild(a);
	createjs.Ticker.on("tick", function () {
		a.text = "FPS:" + createjs.Ticker.getMeasuredFPS(10).toFixed(2);
	});
}
function ProgressBar(barWidth, barHeight) {
	this.initialize();
	this.barWidth = barWidth;
	this.barHeight = barHeight;
	this.w = W;
	this.h = H;
	this.background1 = new createjs.Bitmap("img/jiujingBg1.jpg");
	//console.log("background1", this.background1.image);
	this.background1.alpha = 0.5;
	this.background1.x = this.background1.y = 0;
	this.background1.scaleX = W / 567; 
	this.background1.scaleY = H /  1008;//this.background1.image.height;
    createjs.Tween.get(this.background1).to({alpha:1}, 200);
  
  
  	this.background2 = new createjs.Bitmap("img/jiujingBg2.jpg");
	this.background2.alpha = 0;
	this.background2.x = this.background2.y = 0;
	this.background2.scaleX = W / 567;
	this.background2.scaleY = H / 1008 ;//this.background2.image.height;
  
    this.background3 = new createjs.Bitmap("img/jiujingBg3.jpg");
	this.background3.alpha = 0;
	this.background3.x = this.background3.y = 0;
	this.background3.scaleX = W / 567;
	this.background3.scaleY = H / 1008 ;//this.background2.image.height;
   
    this.flag2 = true;
    this.flag3 = true;
	this.addChild(this.background1);
	this.addChild(this.background2);
	this.addChild(this.background3);
	//this.background2 = new createjs.Bitmap("img/jiujingBg2.jpg");
	
	this.progressW = (W - this.barWidth) / 2; 
	this.progressH = 6 * H / 7;
	
	this.progress = new createjs.Shape;
	//this.progress.graphics.s("black").r(this.progressW , this.progressH, this.barWidth, this.barHeight).es();
	this.progress.graphics.lf(["gray", "white"], [0, 0.5], this.progressW , this.progressH,  this.barWidth, this.barHeight);
	//this.progress.x = 0;
	this.progress.alpha = 0.4;
	
	this.progressText = new createjs.Text("\u8d44\u6e90\u52a0\u8f7d\u4e2d..", "bold 35px Arial", "black");
	this.progressText.x = W / 2;
	this.progressText.y = this.progressH + 30
	this.progressText.textAlign = "center";
	this.progressText.textBaseline = "middle";
	this.addChild(this.progress);
	this.addChild(this.progressText);
}
ProgressBar.prototype = new createjs.Container;
ProgressBar.prototype.completeCallback = function (a) {
	this.parent.removeChild(this);
};
ProgressBar.prototype.progressCallback = function (a) {
	var tmp = parseInt(100 * a.progress);
	if(tmp >= 33 && tmp < 66) {
		if(this.flag2){
			createjs.Tween.get(this.background2).to({alpha:1}, 200);
		    this.flag2 = false;
		}
	}
	if(tmp >= 66) {
		if(this.flag3){
			createjs.Tween.get(this.background3).to({alpha:1}, 200);
		    this.flag3 = false;
		}
	}
	this.progress.graphics.r(this.progressW , this.progressH,  this.barWidth * a.progress, this.barHeight);
	this.progressText.text = "\u5df2\u52a0\u8f7d: " + parseInt(100 * a.progress) + "%";
};
ProgressBar.prototype.forQueue = function (a) {
	this.errorList = [];
	a.on("complete", this.completeCallback, this, !0);
	a.on("progress", this.progressCallback, this);
	a.on("error", function (a) {
		//alert("\xcd\xf8\xcb\xd9\xb2\xbb\xb8\xf8\xc1\xa6\xa3\xac\xcb\xa2\xd0\xc2\xd2\xbb\xcf\xc2\xb0\xc9!");
	}, null, !0);
	a.on("error", function (a) {
		this.errorList.push(a.item.src);
	}, this);
};

