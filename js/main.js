var  ScreenWidth = 640, screenHeight = 960, qp_blockXNum = 8, qp_blockYNum = 8, qp_c = 25, qp_xoffset = 27, qp_yoffset = 80, qp_blockSize = 70, 
	COLOR_RED = "#B2151E", COLOR_GREEN = "#15B26D", COLOR_PURPLE = "#64549D", 
	COLOR_YELLOW = "#FEE789", COLOR_BLUE = "#8ECFF5", COLOR_PINK = "#F6AAC4", 
	qp_stepBoard, qp_mapContainer, qp_mapClass = null;


function resourceLoadComplete(a) {
	new WelComeScene("#8de9cb", qp_gameFunc, stage);
}

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
	       {src:"block.png", id:"block"},
	       {src:"thu1.jpg", id:"thu1"},
	       {src:"thu2.jpg", id:"thu2"}]}, !1);
	       
	a.forQueue(qp_resourceList);
	qp_resourceList.load();
}


function qp_gameFunc() {
	var a = [];
	a.push(COLOR_RED);
	a.push(COLOR_YELLOW);
	a.push(COLOR_GREEN);
	a.push(COLOR_PURPLE);
	a.push(COLOR_BLUE);
	a.push(COLOR_PINK);
	
	stage.removeChild(qp_mapContainer);
	qp_mapContainer = new createjs.Container;
	stage.addChild(qp_mapContainer);	
	
	

	
	a = new createjs.Bitmap(qp_resourceList.getResult("bg"));
	a.x = 0;
	a.y = 0 ;
	a.alpha = 0.5
	//console.log('a.width:', a.image.width);
	
	a.scaleX = (ScreenWidth / a.image.width);
	a.scaleY = (screenHeight / a.image.height);

	qp_mapContainer.addChild(a);          //add background img
	
	a = new createjs.Bitmap(qp_resourceList.getResult("thu1"));
	a.scaleX = (qp_blockXNum * qp_blockSize / a.image.width);
	a.scaleY = (qp_blockYNum * qp_blockSize / a.image.height);	
	a.x = qp_xoffset ;
	a.y = qp_yoffset ;
	qp_mapContainer.addChild(a);
	
	
	qp_blockCollection = new Qp_imgBlockCollection();
	qp_blockCollection.initBlocks();
	qp_addBlocks(qp_blockCollection);
	
	//qp_mapClass = new Qp_mapClassBase(a);       //Qp_mapClassBase is the map containing color items
	//qp_mapClass.randomMap();
	//qp_addAllMapItems(qp_mapClass.m_allitems);  //draw maps items
	
	qp_stepBoard = new StepBoard("step", "#000000");    //show the used step number
	qp_stepBoard.x = 450;
	qp_stepBoard.y = 20;
	stage.addChild(qp_stepBoard);
	
	//qp_mapClass.initfirstflood();
	//qp_mapClass.flood(qp_mapClass.m_allitems[0].color, !0);
	qp_stepBoard.reSet();
	
	a = new createjs.Bitmap(qp_resourceList.getResult("redbtn"));
	a.regX = 47;
	a.regY = 47;
	a.x = 62;
	a.y = 880;
	qp_mapContainer.addChild(a);
	a.on("mousedown", function (a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || 
		(this.scaleY = this.scaleX = 0.95);
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
		(this.scaleY = this.scaleX = 0.95);
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
		(this.scaleY = this.scaleX = 0.95);
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
		(this.scaleY = this.scaleX = 0.95);
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
		(this.scaleY = this.scaleX = 0.95);
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
		(this.scaleY = this.scaleX = 0.95);
	}, a);
	a.on("pressup", function (a) {
		this.scaleY = this.scaleX = 1;
	}, a);
}
var Qp_imgBlock = function (locationX, locationY) {
	this.visible = 1;
	this.indexi = locationX;
	this.indexj = locationY;
	//this.img = this.m_img = new createjs.Shape;
	this.img = new createjs.Bitmap(qp_resourceList.getResult("block"));
    
    this.img.scaleX = (qp_blockSize / this.img.image.width);
	this.img.scaleY = (qp_blockSize / this.img.image.height);
	//this.img.regX = qp_blockSize / 2;
	//this.img.regY = qp_blockSize / 2;
	//this.img.scaleX = this.img.scaleY= 0.95;	
	
	this.img.on("mousedown", function () {
		this.scaleY = this.scaleX = 0;
		qp_stepBoard.setStepNum_IncreaseOneStep()
		//this.alpha = 0;
	});	
};
Qp_imgBlock.prototype = new createjs.Container;
Qp_imgBlock.prototype.hide = function(){
	this.img.alpha = 0;
}


var Qp_imgBlockCollection = function () {      
	this.m_allblocks = [];     
	this.m_visibleMap = [];

};
Qp_imgBlockCollection.prototype.initBlocks = function () {
	for (var x = 0; x < qp_blockYNum; x++) {
		for (var y = 0; y < qp_blockXNum; y++) {
			this.m_allblocks[x * qp_blockXNum + y] = new Qp_imgBlock(x, y);
		
		}
	}
};
function qp_addBlocks(blockCollection) {
	for (var x = 0; x < qp_blockYNum; x++) {
		for (var y = 0; y < qp_blockXNum; y++) {
			var  timg = blockCollection.m_allblocks[x * qp_blockXNum + y].img;
			timg.alpha = 0;
			createjs.Tween.get(timg).to({alpha:0}, 10).to({alpha:1}, 100);   //animation
			timg.x = qp_xoffset + qp_blockSize * x ;
			timg.y = qp_yoffset + qp_blockSize * y ;
			qp_mapContainer.addChild(timg);
		}
	}
}



//
//var Qp_mapClassBase = function (a) {      //Qp_mapClassBase,  Qp_mapItem, Qp_q
//	this.m_colorarray = a;
//	this.m_allitems = [];     //array of Qp_mapItem
//	this.m_stepover = !1;
//	this.m_changeditems = [];
//	this.m_fxarray = [];
//};
//Qp_mapClassBase.prototype.randomMap = function () {
//	for (var a = 0; a < qp_blockYNum; a++) {
//		for (var b = 0; b < qp_blockXNum; b++) {
//			var c = Math.floor(Math.random() * this.m_colorarray.length);
//			this.m_allitems[a * qp_blockXNum + b] = new Qp_mapItem(this.m_colorarray[c], a, b);
//		}
//	}
//};
//Qp_mapClassBase.prototype.initfirstflood = function () {
//	this.m_allitems[0].isflooded = !0;
//	this.m_changeditems.push(this.m_allitems[0]);
//};
//Qp_mapClassBase.prototype.floodX = function (a, b) {
//	for (var c = 0; c < qp_blockXNum; c++) {
//		this.validij(c, b) && !0 == qp_mapClass.m_allitems[b * qp_blockXNum + c].isflooded 
//		    && b * qp_blockXNum + c < qp_blockXNum * qp_blockYNum - 1 && b * qp_blockXNum + c < (b + 1) * qp_blockXNum - 1
//		    && !1 == qp_mapClass.m_allitems[b * qp_blockXNum + c + 1].isflooded 
//		    && qp_mapClass.m_allitems[b * qp_blockXNum + c + 1].color == a 
//		    && (this.m_stepover = !1, qp_mapClass.m_allitems[b * qp_blockXNum + c + 1].isflooded = !0,
//		    	this.m_fxarray.push(qp_mapClass.m_allitems[b * qp_blockXNum + c + 1]));
//	}
//	for (c = qp_blockXNum - 1; 0 <= c; c--) {
//		this.validij(c, b) && !0 == qp_mapClass.m_allitems[b * qp_blockXNum + c].isflooded 
//		&& 0 < b * qp_blockXNum + c && b * qp_blockXNum + c > b * qp_blockXNum
//		&& !1 == qp_mapClass.m_allitems[b * qp_blockXNum + c - 1].isflooded 
//		&& qp_mapClass.m_allitems[b * qp_blockXNum + c - 1].color == a 
//		&& (this.m_stepover = !1, qp_mapClass.m_allitems[b * qp_blockXNum + c - 1].isflooded = !0,
//			this.m_fxarray.push(qp_mapClass.m_allitems[b * qp_blockXNum + c - 1]));
//	}
//};
//Qp_mapClassBase.prototype.floodY = function (a, b) {
//	for (var c = 0; c < qp_blockYNum; c++) {
//		this.validij(b, c) && !0 == qp_mapClass.m_allitems[c * qp_blockXNum + b].isflooded 
//		&& (c + 1) * qp_blockXNum + b < qp_blockXNum * qp_blockYNum && !1 == qp_mapClass.m_allitems[(c + 1) * qp_blockXNum + b].isflooded 
//		&& qp_mapClass.m_allitems[(c + 1) * qp_blockXNum + b].color == a 
//		&& (this.m_stepover = !1, qp_mapClass.m_allitems[(c + 1) * qp_blockXNum + b].isflooded = !0, this.m_fxarray.push(qp_mapClass.m_allitems[(c + 1) * qp_blockXNum + b]));
//	}
//	for (c = qp_blockYNum - 1; 0 <= c; c--) {
//		this.validij(b, c) && !0 == qp_mapClass.m_allitems[c * qp_blockXNum + b].isflooded 
//		&& 0 < (c - 1) * qp_blockXNum + b && !1 == qp_mapClass.m_allitems[(c - 1) * qp_blockXNum + b].isflooded 
//		&& qp_mapClass.m_allitems[(c - 1) * qp_blockXNum + b].color == a 
//		&& (this.m_stepover = !1, qp_mapClass.m_allitems[(c - 1) * qp_blockXNum + b].isflooded = !0, this.m_fxarray.push(qp_mapClass.m_allitems[(c - 1) * qp_blockXNum + b]));
//	}
//};
//Qp_mapClassBase.prototype.flood = function (a, b) {
//	for (this.m_fxarray = []; !0 != this.m_stepover; ) {
//		this.m_stepover = !0;
//		for (var c = 0; c < Math.max(qp_blockXNum, qp_blockYNum); c++) {
//			this.floodY(a, c);
//		}
//		for (c = 0; c < Math.max(qp_blockXNum, qp_blockYNum); c++) {
//			this.floodX(a, c);
//		}
//	}
//	0 < this.m_fxarray.length && (qp_q(this.m_fxarray, a, b), qp_stepBoard.setStepNum_IncreaseOneStep());
//	this.m_stepover = !1;
//};
//Qp_mapClassBase.prototype.validij = function (a, b) {
//	return 0 > a || a >= qp_blockXNum || 0 > b || b >= qp_blockYNum ? !1 : !0;
//};
//Qp_mapClassBase.prototype.get1Dindex = function (a, b) {
//	return this.validij(a, b) ? b * qp_blockXNum + a : -1;
//};
//Qp_mapClassBase.prototype.isGameOver = function () {
//	return qp_mapClass.m_changeditems.length >= qp_blockXNum * qp_blockYNum ? !0 : !1;
//};
//
//function qp_q(a, b, c) {
//	for (var d = 0; d < a.length; d++) {
//		qp_mapClass.m_changeditems.push(a[d]);
//	}
//	for (d = 0; d < qp_mapClass.m_changeditems.length; d++) {
//		a = (qp_mapClass.m_changeditems[d].indexj + qp_mapClass.m_changeditems[d].indexi + 1) * qp_c, createjs.Tween.get(qp_mapClass.m_changeditems[d].img).to({alpha:1}, a).call(function () {
//			this.graphics.clear();
//			this.graphics.f(b).r(0, 0, qp_blockSize, qp_blockSize);
//		}).to({alpha:1}, 0);
//	}
//	!0 != c && qp_s(b);
//}
//
//function qp_addAllMapItems(a) {
//	for (a = 0; a < qp_blockYNum; a++) {
//		for (var b = 0; b < qp_blockXNum; b++) {
//			var c = (a + b + 1) * qp_c, 
//			    d = qp_mapClass.m_allitems[a * qp_blockXNum + b].img;
//			d.alpha = 0;
//			createjs.Tween.get(d).to({alpha:0}, c).to({alpha:1}, 100);   //animation
//			d.x = qp_xoffset + qp_blockSize * b + qp_blockSize / 2  - b;
//			d.y = qp_yoffset + qp_blockSize * a + qp_blockSize / 2  - a;
//			qp_mapContainer.addChild(d);
//		}
//	}
//}
//
//function qp_s(a) {
//	a == COLOR_RED && createjs.Sound.play("do", !0);
//	a == COLOR_YELLOW && createjs.Sound.play("re", !0);
//	a == COLOR_PURPLE && createjs.Sound.play("mi", !0);
//	a == COLOR_BLUE && createjs.Sound.play("fa", !0);
//	a == COLOR_GREEN && createjs.Sound.play("so", !0);
//	a == COLOR_PINK && createjs.Sound.play("la", !0);
//}
//var Qp_mapItem = function (a, b, c) {
//	this.color = this.m_color = a;
//	this.isflooded = this.m_isflooded = !1;
//	this.indexi = b;
//	this.indexj = c;
//	this.img = this.m_img = new createjs.Shape;
//	//this.img = this.m_img = new createjs.Bitmap(qp_resourceList.getResult("block"));
//	this.img.on("mousedown", function () {
//		this.scaleY = this.scaleX = 0;
//		//this.alpha = 0;
//	});	
//	this.m_img.graphics.f(a).r(0, 0, qp_blockSize, qp_blockSize).ef();
//	this.m_img.regX = qp_blockSize / 2;
//	this.m_img.regY = qp_blockSize / 2;
//	
//	this.img.scaleX = this.img.scaleY= 0.95;
//	this.floodGird = function () {
//		this.m_isflooded = !0;
//	};
//	this.fillcolor = function (a) {
//	};
//};
//Qp_mapItem.prototype = new createjs.Container;

