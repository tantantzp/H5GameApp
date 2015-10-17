
var stage, W = 640, H = 960, IS_TOUCH, SCREEN_SHOW_ALL = !1, 
    g_androidsoundtimer = null, g_followAnim = null;
var qp_score = 0, qp_best = 500, qp_step = 0;

var RES_DIR = "";


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
function ProgressBar(a, b) {
	this.initialize();
	this.w = a;
	this.h = b;
	this.progress = new createjs.Shape;
	this.progress.graphics.s("black").r(0, 0, a, b).es();
	this.progress.graphics.lf(["red", "yellow", "blue"], [0, 0.5, 1], 0, 0, a, 0);
	this.progressText = new createjs.Text("\u8d44\u6e90\u52a0\u8f7d\u4e2d..", "bold 24px Arial", "black");
	this.progressText.x = a / 2;
	this.progressText.y = b / 2;
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
	this.progress.graphics.r(0, 0, this.w * a.progress, this.h);
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

