var  qp_mapWidth = 12, qp_mapHeight = 14, qp_c = 25, qp_d = 27, qp_e = 80, qp_f = 50, qp_g = 0, qp_h = 0,
	COLOR_RED = "#B2151E", COLOR_GREEN = "#15B26D", COLOR_PURPLE = "#64549D", 
	COLOR_YELLOW = "#FEE789", COLOR_BLUE = "#8ECFF5", COLOR_PINK = "#F6AAC4", 
	qp_stepBoard, qp_mapContainer, qp_mapClass = null;


var StepBoard = function (a, b) {
	this.initialize();
	var c = new createjs.Bitmap(queue.getResult(a));
	this.addChild(c);
	var d = Math.abs(score);
	this.stepboardlabel = new createjs.Text(d.toString(), "bold 60px Arial", b);
	this.stepboardlabel.textBaseline = "middle";
	this.stepboardlabel.x = c.getBounds().width + 30;
	this.stepboardlabel.y = c.getBounds().height / 2;
	this.addChild(this.stepboardlabel);
};
StepBoard.prototype = new createjs.Container;
StepBoard.prototype.setStepNum = function () {
	var a = Math.abs(score);
	this.stepboardlabel.text = a.toString();
};
StepBoard.prototype.setStepNum_IncreaseOneStep = function () {
	score--;
	this.setStepNum();
};
StepBoard.prototype.reSet = function () {
	score = 0;
	this.setStepNum();
};
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



function loadResource() {
	SCREEN_SHOW_ALL = !0;
	qp_resourceList = new createjs.LoadQueue;
	var a = new ProgressBar(0.8 * W, 40);
	a.regX = a.w / 2;
	a.regY = a.h / 2;
	a.x = W / 2;
	a.y = H / 2;
	stage.addChild(a);
	queue = qp_resourceList = new createjs.LoadQueue(!1);
	qp_resourceList.on("complete", resourceLoadComplete, null, !0);
	loadGameData();
	USE_NATIVE_SOUND || (IS_NATIVE_ANDROID ? (createjs.Sound.registMySound("do", 0), createjs.Sound.registMySound("re", 2), createjs.Sound.registMySound("me", 4), createjs.Sound.registMySound("fa", 6), createjs.Sound.registMySound("so", 8), createjs.Sound.registMySound("la", 10), createjs.Sound.registMySound("silenttail", 12), qp_resourceList.loadFile({id:"sound", src:RES_DIR + "audio/all.mp3"})) : (createjs.Sound.alternateExtensions = ["ogg"], qp_resourceList.installPlugin(createjs.Sound), qp_resourceList.loadManifest({path:RES_DIR + "audio/", manifest:[{src:"1.mp3", id:"do"}, {src:"2.mp3", id:"re"}, {src:"3.mp3", id:"mi"}, {src:"4.mp3", id:"fa"}, {src:"5.mp3", id:"so"}, {src:"6.mp3", id:"la"}]}, !1)));
	LoadWelComeSceneRes();
	LoadGameoverSceneRes();
	qp_resourceList.loadManifest({path:RES_DIR + "img/", 
	       manifest:[{src:"step.png", id:"step"}, 
	       {src:"bg.jpg", id:"bg"}, 
	       {src:"bluebtn.png", id:"bluebtn"},
	       {src:"greenbtn.png", id:"greenbtn"}, 
	       {src:"pinkbtn.png", id:"pinkbtn"}, 
	       {src:"purplebtn.png", id:"purplebtn"}, 
	       {src:"redbtn.png", id:"redbtn"}, 
	       {src:"yellowbtn.png", id:"yellowbtn"},
	       {src:"block.png", id:"blocktbb"},
	       {src:"thu1.jpg", id:"thu1img"},
	       {src:"thu2.jpg", id:"thu2img"}]}, !1);
	       
	a.forQueue(qp_resourceList);
	qp_resourceList.load();
}
function resourceLoadComplete(a) {
	new WelComeScene("#8de9cb", qp_gameFunc, stage);
}


function qp_gameFunc() {
	var a = [];
	a.push(COLOR_RED);
	a.push(COLOR_YELLOW);
	a.push(COLOR_GREEN);
	a.push(COLOR_PURPLE);
	a.push(COLOR_BLUE);
	a.push(COLOR_PINK);
	
	
	qp_mapClass = new Qp_mapClassBase(a);       //Qp_mapClassBase is the map containing color items
	qp_mapClass.randomMap();
	stage.removeChild(qp_mapContainer);
	qp_mapContainer = new createjs.Container;
	stage.addChild(qp_mapContainer);
	
	a = new createjs.Bitmap(qp_resourceList.getResult("bg"));
	qp_mapContainer.addChild(a);          //add background img
	
	qp_addAllMapItems(qp_mapClass.m_allitems);  //draw maps items
	
	qp_stepBoard = new StepBoard("step", "#000000");    //show the used step number
	qp_stepBoard.x = 450;
	qp_stepBoard.y = 20;
	stage.addChild(qp_stepBoard);
	
	qp_mapClass.initfirstflood();
	qp_mapClass.flood(qp_mapClass.m_allitems[0].color, !0);
	qp_stepBoard.reSet();
	
	a = new createjs.Bitmap(qp_resourceList.getResult("redbtn"));
	a.regX = 47;
	a.regY = 47;
	a.x = 62;
	a.y = 880;
	qp_mapContainer.addChild(a);
	a.on("mousedown", function (a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || 
		(this.scaleY = this.scaleX = 0.95, 
		 qp_mapClass.flood(COLOR_RED), 
		 !0 == qp_mapClass.isGameOver()
		&& new GameoverNormal("#8de9cb", "#000000", qp_gameFunc, stage));
	}, a);
	a.on("pressup", function (a) {
		this.scaleY = this.scaleX = 1;
	}, a);
	a = new createjs.Bitmap(qp_resourceList.getResult("yellowbtn"));
	a.regX = 47;
	a.regY = 47;
	a.x = 165;
	a.y = 880;
	qp_mapContainer.addChild(a);
	a.on("mousedown", function (a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || 
		(this.scaleY = this.scaleX = 0.95, 
		qp_mapClass.flood(COLOR_YELLOW),
		!0 == qp_mapClass.isGameOver()
		&& new GameoverNormal("#8de9cb", "#000000", qp_gameFunc, stage));
	}, a);
	a.on("pressup", function (a) {
		this.scaleY = this.scaleX = 1;
	}, a);
	a = new createjs.Bitmap(qp_resourceList.getResult("purplebtn"));
	a.regX = 47;
	a.regY = 47;
	a.x = 268;
	a.y = 880;
	qp_mapContainer.addChild(a);
	a.on("mousedown", function (a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || 
		(this.scaleY = this.scaleX = 0.95,
		qp_mapClass.flood(COLOR_PURPLE),
		!0 == qp_mapClass.isGameOver()
		&& new GameoverNormal("#8de9cb", "#000000", qp_gameFunc, stage));
	}, a);
	a.on("pressup", function (a) {
		this.scaleY = this.scaleX = 1;
	}, a);
	a = new createjs.Bitmap(qp_resourceList.getResult("bluebtn"));
	a.regX = 47;
	a.regY = 47;
	a.x = 371;
	a.y = 880;
	qp_mapContainer.addChild(a);
	a.on("mousedown", function (a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || 
		(this.scaleY = this.scaleX = 0.95, qp_mapClass.flood(COLOR_BLUE), !0 == qp_mapClass.isGameOver()
		&& new GameoverNormal("#8de9cb", "#000000", qp_gameFunc, stage));
	}, a);
	a.on("pressup", function (a) {
		this.scaleY = this.scaleX = 1;
	}, a);
	a = new createjs.Bitmap(qp_resourceList.getResult("greenbtn"));
	a.regX = 47;
	a.regY = 47;
	a.x = 474;
	a.y = 880;
	qp_mapContainer.addChild(a);
	a.on("mousedown", function (a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || 
		(this.scaleY = this.scaleX = 0.95, qp_mapClass.flood(COLOR_GREEN), 
		!0 == qp_mapClass.isGameOver() && new GameoverNormal("#8de9cb", "#000000", qp_gameFunc, stage));
	}, a);
	a.on("pressup", function (a) {
		this.scaleY = this.scaleX = 1;
	}, a);
	a = new createjs.Bitmap(qp_resourceList.getResult("pinkbtn"));
	a.regX = 47;
	a.regY = 47;
	a.x = 577;
	a.y = 880;
	qp_mapContainer.addChild(a);
	a.on("mousedown", function (a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || 
		(this.scaleY = this.scaleX = 0.95, qp_mapClass.flood(COLOR_PINK),
		!0 == qp_mapClass.isGameOver() && new GameoverNormal("#8de9cb", "#000000", qp_gameFunc, stage));
	}, a);
	a.on("pressup", function (a) {
		this.scaleY = this.scaleX = 1;
	}, a);
}


var Qp_mapClassBase = function (a) {      //Qp_mapClassBase,  Qp_mapItem, Qp_q
	this.m_colorarray = a;
	this.m_allitems = [];     //array of Qp_mapItem
	this.m_stepover = !1;
	this.m_changeditems = [];
	this.m_fxarray = [];
};
Qp_mapClassBase.prototype.randomMap = function () {
	for (var a = 0; a < qp_mapHeight; a++) {
		for (var b = 0; b < qp_mapWidth; b++) {
			var c = Math.floor(Math.random() * this.m_colorarray.length);
			this.m_allitems[a * qp_mapWidth + b] = new Qp_mapItem(this.m_colorarray[c], a, b);
		}
	}
};
Qp_mapClassBase.prototype.initfirstflood = function () {
	this.m_allitems[0].isflooded = !0;
	this.m_changeditems.push(this.m_allitems[0]);
};
Qp_mapClassBase.prototype.floodX = function (a, b) {
	for (var c = 0; c < qp_mapWidth; c++) {
		this.validij(c, b) && !0 == qp_mapClass.m_allitems[b * qp_mapWidth + c].isflooded 
		    && b * qp_mapWidth + c < qp_mapWidth * qp_mapHeight - 1 && b * qp_mapWidth + c < (b + 1) * qp_mapWidth - 1
		    && !1 == qp_mapClass.m_allitems[b * qp_mapWidth + c + 1].isflooded 
		    && qp_mapClass.m_allitems[b * qp_mapWidth + c + 1].color == a 
		    && (this.m_stepover = !1, qp_mapClass.m_allitems[b * qp_mapWidth + c + 1].isflooded = !0,
		    	this.m_fxarray.push(qp_mapClass.m_allitems[b * qp_mapWidth + c + 1]));
	}
	for (c = qp_mapWidth - 1; 0 <= c; c--) {
		this.validij(c, b) && !0 == qp_mapClass.m_allitems[b * qp_mapWidth + c].isflooded 
		&& 0 < b * qp_mapWidth + c && b * qp_mapWidth + c > b * qp_mapWidth
		&& !1 == qp_mapClass.m_allitems[b * qp_mapWidth + c - 1].isflooded 
		&& qp_mapClass.m_allitems[b * qp_mapWidth + c - 1].color == a 
		&& (this.m_stepover = !1, qp_mapClass.m_allitems[b * qp_mapWidth + c - 1].isflooded = !0,
			this.m_fxarray.push(qp_mapClass.m_allitems[b * qp_mapWidth + c - 1]));
	}
};
Qp_mapClassBase.prototype.floodY = function (a, b) {
	for (var c = 0; c < qp_mapHeight; c++) {
		this.validij(b, c) && !0 == qp_mapClass.m_allitems[c * qp_mapWidth + b].isflooded 
		&& (c + 1) * qp_mapWidth + b < qp_mapWidth * qp_mapHeight && !1 == qp_mapClass.m_allitems[(c + 1) * qp_mapWidth + b].isflooded 
		&& qp_mapClass.m_allitems[(c + 1) * qp_mapWidth + b].color == a 
		&& (this.m_stepover = !1, qp_mapClass.m_allitems[(c + 1) * qp_mapWidth + b].isflooded = !0, this.m_fxarray.push(qp_mapClass.m_allitems[(c + 1) * qp_mapWidth + b]));
	}
	for (c = qp_mapHeight - 1; 0 <= c; c--) {
		this.validij(b, c) && !0 == qp_mapClass.m_allitems[c * qp_mapWidth + b].isflooded && 0 < (c - 1) * qp_mapWidth + b && !1 == qp_mapClass.m_allitems[(c - 1) * qp_mapWidth + b].isflooded && qp_mapClass.m_allitems[(c - 1) * qp_mapWidth + b].color == a && (this.m_stepover = !1, qp_mapClass.m_allitems[(c - 1) * qp_mapWidth + b].isflooded = !0, this.m_fxarray.push(qp_mapClass.m_allitems[(c - 1) * qp_mapWidth + b]));
	}
};
Qp_mapClassBase.prototype.flood = function (a, b) {
	for (this.m_fxarray = []; !0 != this.m_stepover; ) {
		this.m_stepover = !0;
		for (var c = 0; c < Math.max(qp_mapWidth, qp_mapHeight); c++) {
			this.floodY(a, c);
		}
		for (c = 0; c < Math.max(qp_mapWidth, qp_mapHeight); c++) {
			this.floodX(a, c);
		}
	}
	0 < this.m_fxarray.length && (qp_q(this.m_fxarray, a, b), qp_stepBoard.setStepNum_IncreaseOneStep());
	this.m_stepover = !1;
};
Qp_mapClassBase.prototype.validij = function (a, b) {
	return 0 > a || a >= qp_mapWidth || 0 > b || b >= qp_mapHeight ? !1 : !0;
};
Qp_mapClassBase.prototype.get1Dindex = function (a, b) {
	return this.validij(a, b) ? b * qp_mapWidth + a : -1;
};
Qp_mapClassBase.prototype.isGameOver = function () {
	return qp_mapClass.m_changeditems.length >= qp_mapWidth * qp_mapHeight ? !0 : !1;
};

function qp_q(a, b, c) {
	for (var d = 0; d < a.length; d++) {
		qp_mapClass.m_changeditems.push(a[d]);
	}
	for (d = 0; d < qp_mapClass.m_changeditems.length; d++) {
		a = (qp_mapClass.m_changeditems[d].indexj + qp_mapClass.m_changeditems[d].indexi + 1) * qp_c, createjs.Tween.get(qp_mapClass.m_changeditems[d].img).to({alpha:1}, a).call(function () {
			this.graphics.clear();
			this.graphics.f(b).r(0, 0, qp_f, qp_f);
		}).to({alpha:1}, 0);
	}
	!0 != c && qp_s(b);
}
function qp_addAllMapItems(a) {
	for (a = 0; a < qp_mapHeight; a++) {
		for (var b = 0; b < qp_mapWidth; b++) {
			var c = (a + b + 1) * qp_c, 
			    d = qp_mapClass.m_allitems[a * qp_mapWidth + b].img;
			d.alpha = 0;
			createjs.Tween.get(d).to({alpha:0}, c).to({alpha:1}, 100);   //animation
			d.x = qp_d + (qp_f + qp_g) * b + qp_f / 2 + qp_h - b;
			d.y = qp_e + (qp_f + qp_g) * a + qp_f / 2 + qp_h - a;
			qp_mapContainer.addChild(d);
		}
	}
}
function qp_o() {
	
}

function qp_s(a) {
	a == COLOR_RED && createjs.Sound.play("do", !0);
	a == COLOR_YELLOW && createjs.Sound.play("re", !0);
	a == COLOR_PURPLE && createjs.Sound.play("mi", !0);
	a == COLOR_BLUE && createjs.Sound.play("fa", !0);
	a == COLOR_GREEN && createjs.Sound.play("so", !0);
	a == COLOR_PINK && createjs.Sound.play("la", !0);
}
var Qp_mapItem = function (a, b, c) {
	this.color = this.m_color = a;
	this.isflooded = this.m_isflooded = !1;
	this.indexi = b;
	this.indexj = c;
	this.img = this.m_img = new createjs.Shape;
//	this.img.on("mousedown", function (this.img) {
//		IS_TOUCH && this.img.nativeEvent instanceof MouseEvent || 
//		(this.scaleY = this.scaleX = 0);
//	}, this.img);
//	this.img = this.m_img = new createjs.Bitmap(qp_resourceList.getResult("redbtn"));
//	this.img.on("pressup", function (this.img) {
//		this.img.scaleY = this.img.scaleX = 0;
//	}, this.img);
	this.m_img.graphics.f(a).r(0, 0, qp_f, qp_f).ef();
	this.m_img.regX = qp_f / 2;
	this.m_img.regY = qp_f / 2;
	this.floodGird = function () {
		this.m_isflooded = !0;
	};
	this.fillcolor = function (a) {
	};
};
Qp_mapItem.prototype = new createjs.Container;

