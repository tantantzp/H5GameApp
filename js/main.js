var  ScreenWidth = 640, screenHeight = 960, qp_blockXNum = 8, qp_blockYNum = 8, qp_c = 25, qp_xoffset = 27, qp_yoffset = 80, qp_blockSize = 70, 
	COLOR_RED = "#B2151E", COLOR_GREEN = "#15B26D", COLOR_PURPLE = "#64549D", 
	COLOR_YELLOW = "#FEE789", COLOR_BLUE = "#8ECFF5", COLOR_PINK = "#F6AAC4", 
	qp_stepBoard,qp_scoreBoard, qp_mapContainer, qp_mapClass = null, qp_imgBlockCollection = null;


function resourceLoadComplete(a) {
	new WelComeScene("#8de9cb", qp_gameFunc, stage);
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
	USE_NATIVE_SOUND || (IS_NATIVE_ANDROID ? (createjs.Sound.registMySound("do", 0), createjs.Sound.registMySound("re", 2), createjs.Sound.registMySound("me", 4), createjs.Sound.registMySound("fa", 6), createjs.Sound.registMySound("so", 8), createjs.Sound.registMySound("la", 10), createjs.Sound.registMySound("silenttail", 12), qp_resourceList.loadFile({id:"sound", src:RES_DIR + "audio/all.mp3"})) : (createjs.Sound.alternateExtensions = ["ogg"], qp_resourceList.installPlugin(createjs.Sound), qp_resourceList.loadManifest({path:RES_DIR + "audio/", manifest:[{src:"1.mp3", id:"do"}, {src:"2.mp3", id:"re"}, {src:"3.mp3", id:"mi"}, {src:"4.mp3", id:"fa"}, {src:"5.mp3", id:"so"}, {src:"6.mp3", id:"la"}]}, !1)));
	LoadWelComeSceneRes();
	LoadGameoverSceneRes();
	qp_resourceList.loadManifest({path:RES_DIR + "img/", 
	       manifest:[
	       {src:"step.png", id:"step"},
	       {src:"curscore.png", id:"curscore"},
	       {src:"bg.jpg", id:"bg"}, 
	       {src:"bluebtn.png", id:"bluebtn"},
	       {src:"greenbtn.png", id:"greenbtn"}, 
	       {src:"pinkbtn.png", id:"pinkbtn"}, 
	       {src:"purplebtn.png", id:"purplebtn"}, 
	       {src:"redbtn.png", id:"redbtn"}, 
	       {src:"yellowbtn.png", id:"yellowbtn"},
	       {src:"block.png", id:"block"},
	       {src:"thu1.jpg", id:"thu1"},
	       {src:"thu2.jpg", id:"thu2"},
	       {src:"btn.png", id:"btn"},
	       {src:"btnTrue.png", id:"btnTrue"},
	       {src:"btnFalse.png", id:"btnFalse"}]}, !1);
	       
	a.forQueue(qp_resourceList);
	qp_resourceList.load();
};


function qp_gameFunc() {
	qp_mapContainer = new createjs.Container;
	stage.addChild(qp_mapContainer);	
	
	var tbigmap;
	tbigmap = new createjs.Bitmap(qp_resourceList.getResult("bg"));
	tbigmap.x = 0;
	tbigmap.y = 0 ;
	tbigmap.alpha = 0.5
	tbigmap.scaleX = (ScreenWidth / tbigmap.image.width) + 0.2;
	tbigmap.scaleY = (screenHeight / tbigmap.image.height);
	qp_mapContainer.addChild(tbigmap);          //add background img
	

	var thuImg = "thu1";
//	qp_imgBlockCollection = new C_imgBlockCollection(thuImg);
//	qp_imgBlockCollection.initBlocks();
//	qp_imgBlockCollection.addBlocks(qp_imgBlockCollection);
    var xoffset = 30, yoffset = 80;
    var allBlockWidth = ScreenWidth - xoffset * 2;
    var allBlockHeight = allBlockWidth;
    var blockNum = 5;
	qp_imgBlockCollection = new C_imgBlockCollection(thuImg, allBlockWidth, allBlockHeight, blockNum);
	qp_imgBlockCollection.x = xoffset;
	qp_imgBlockCollection.y = yoffset;
    qp_mapContainer.addChild(qp_imgBlockCollection);

	qp_imgBlockCollection.initBlocks();
	qp_imgBlockCollection.addBlocks();

	//qp_mapClass = new C_mapClassBase(a);       //C_mapClassBase is the map containing color items
	//qp_mapClass.randomMap();
	//qp_addAllMapItems(qp_mapClass.m_allitems);  //draw maps items
	
	qp_stepBoard = new StepBoard("step");//, "#000000");    //show the used step number
	qp_stepBoard.x = 450;
	qp_stepBoard.y = 20;
	qp_stepBoard.scaleX = (100 / qp_stepBoard.getBounds().width);
	qp_stepBoard.scaleY =  (50 / qp_stepBoard.getBounds().height);
	qp_mapContainer.addChild(qp_stepBoard);
	qp_stepBoard.reSet();	
	
	qp_scoreBoard = new C_ScoreBoard("curscore", 1000);    //show the used step number
	qp_scoreBoard.x = 50;
	qp_scoreBoard.y = 20;
	qp_scoreBoard.scaleX = (150 / qp_scoreBoard.getBounds().width);
	qp_scoreBoard.scaleY =  (50 / qp_scoreBoard.getBounds().height);
	qp_mapContainer.addChild(qp_scoreBoard);	
	
	
	//qp_mapClass.initfirstflood();
	//qp_mapClass.flood(qp_mapClass.m_allitems[0].color, !0);

	
	var tbtn1;
	tbtn1 = new createjs.Bitmap(qp_resourceList.getResult("redbtn"));
	tbtn1.regX = 47;
	tbtn1.regY = 47;
	tbtn1.x = 72;
	tbtn1.y = 770;
	qp_mapContainer.addChild(tbtn1);
	tbtn1.on("mousedown", function () {
		IS_TOUCH && this.nativeEvent instanceof MouseEvent || 
		(this.scaleY = this.scaleX = 0.95);
	});
	tbtn1.on("pressup", function () {
		this.scaleY = this.scaleX = 1;
	});
	
	var tbtn2;
	tbtn2 = new createjs.Bitmap(qp_resourceList.getResult("bluebtn"));
	tbtn2.regX = 47;
	tbtn2.regY = 47;
	tbtn2.x = 371;
	tbtn2.y = 770;
	qp_mapContainer.addChild(tbtn2);
	tbtn2.on("mousedown", function () {
		IS_TOUCH && this.nativeEvent instanceof MouseEvent || 
		(this.scaleY = this.scaleX = 0.95);
	});
	tbtn2.on("pressup", function () {
		this.scaleY = this.scaleX = 1;
	});
	
	var tbtn3;
	tbtn3 = new createjs.Bitmap(qp_resourceList.getResult("purplebtn"));
	tbtn3.regX = 47;
	tbtn3.regY = 47;
	tbtn3.x = 72;
	tbtn3.y = 880;
	qp_mapContainer.addChild(tbtn3);
	tbtn3.on("mousedown", function () {
		IS_TOUCH && this.nativeEvent instanceof MouseEvent || 
		(this.scaleY = this.scaleX = 0.95);
	});
	tbtn3.on("pressup", function () {
		this.scaleY = this.scaleX = 1;
	});
	
	var tbtn4;
	tbtn4 = new createjs.Bitmap(qp_resourceList.getResult("yellowbtn"));
	tbtn4.regX = 47;
	tbtn4.regY = 47;
	tbtn4.x = 371;
	tbtn4.y = 880;
	qp_mapContainer.addChild(tbtn4);
	tbtn4.on("mousedown", function () {
		IS_TOUCH && this.nativeEvent instanceof MouseEvent || 
		(this.scaleY = this.scaleX = 0.95);
	});
	tbtn4.on("pressup", function () {
		this.scaleY = this.scaleX = 1;
	});
	


};

var C_imgBlock = function (locationX, locationY) {
	this.initialize();
	
	this.visible = 1;
	this.indexi = locationX;
	this.indexj = locationY;
	//this.img = this.m_img = new createjs.Shape;
	this.img = new createjs.Bitmap(qp_resourceList.getResult("block"));
    
    //this.img.scaleX = (qp_blockSize / this.img.image.width);
	//this.img.scaleY = (qp_blockSize / this.img.image.height);

	this.img.on("mousedown", function () {
		createjs.Tween.get(this).to({alpha:0}, 1000);
		//this.scaleY = this.scaleX = 0;
		qp_stepBoard.setStepNum_IncreaseOneStep();
		qp_scoreBoard.decreaseScore(10);
		this.visible = 0;
	});	
	this.addChild(this.img);
};
C_imgBlock.prototype = new createjs.Container;
C_imgBlock.prototype.hide = function(){
	this.img.alpha = 0;
};


var C_imgBlockCollection = function (thuImgName, width, height, blockNum) {   
	this.initialize();
	this.thuImg = new createjs.Bitmap(qp_resourceList.getResult(thuImgName));
	this.imgWidth = this.thuImg.getBounds().width;
	this.imgHeigth = this.thuImg.getBounds().height;
	this.thuImg.scaleX = (width / this.imgWidth);
	this.thuImg.scaleY = (height / this.imgHeigth);	
	this.thuImg.alpha = 0;
	this.blockNum = blockNum;
	this.blocksizex = width / blockNum;
	this.blocksizey = height / blockNum;
	
	//qp_mapContainer.addChild(this.thuImg);	
	this.addChild(this.thuImg);
	this.m_allblocks = [];
	this.m_visibleMap = [];

};
C_imgBlockCollection.prototype = new createjs.Container;
C_imgBlockCollection.prototype.initBlocks = function () {
	for (var x = 0; x < qp_blockYNum; x++) {
		for (var y = 0; y < qp_blockXNum; y++) {
			this.m_allblocks[x * qp_blockXNum + y] = new C_imgBlock(x, y);
		
		}
	}
};


C_imgBlockCollection.prototype.addBlocks = function() {
	for (var x = 0; x < this.blockNum; x++) {
		for (var y = 0; y < this.blockNum; y++) {
			var  tblock = this.m_allblocks[x * qp_blockXNum + y];
			tblock.alpha = 0;
			createjs.Tween.get(tblock).to({alpha:1}, 1000).call(showThuImg);   //animation
			tblock.scaleX = this.blocksizex / tblock.getBounds().width;
			tblock.scaleY= this.blocksizey / tblock.getBounds().height;
			tblock.x = this.blocksizex * x ;
			tblock.y = this.blocksizey * y ;
			//qp_mapontainer.addChild(timg);
			this.addChild(tblock);
			
		}
	}
};
var showThuImg = function() {
	createjs.Tween.get(qp_imgBlockCollection.thuImg).to({alpha:1}, 1000); 
};


var C_answerItem = function(xoff, yoff, isanswer) {
	this.initialize();
	
	this.btn = new createjs.Bitmap(qp_resourceList.getResult("btn"));
	this.btnTrue = new createjs.Bitmap(qp_resourceList.getResult("btnTrue"));
	this.btnFalse = new createjs.Bitmap(qp_resourceList.getResult("btnFalse"));
	this.isans = isanswer; //1 means this is the rigth answer
	this.pressed = 0; //1 means is pressed
	
	this.btn.x = this.btnTrue.x = this.btnFalse.x = xoff;
	this.btn.y = this.btnTrue.y = this.btnFalse.y = yoff;
	this.btnTrue.alpha = 0;
	this.btnFalse.appha = 0;
	

	this.btn.on("mousedown", function () {
		IS_TOUCH && this.nativeEvent instanceof MouseEvent || 
		(this.scaleY = this.scaleX = 0.95);
	});
	this.btn.on("pressup", function () {
		this.scaleY = this.scaleX = 1;
		if(isans) {
			qp_mapContainer.addChild(this.btnTrue);
		}
		else {
			qp_mapContainer.addChild(this.btnFalse);
		}
		this.pressed = 1;
	});
	
};
C_answerItem.prototype = new createjs.Container;


var StepBoard = function (img) {
	this.initialize();
	this.stepnum = 0;
	
	//var c = new createjs.Bitmap(queue.getResult(img));
	//this.addChild(c);
	var word = new createjs.Text("Step:", "bold 60px Arial");
    this.addChild(word);
	//var d = Math.abs(score);
	this.stepboardlabel = new createjs.Text(this.stepnum.toString(), "50px Arial");
	//this.stepboardlabel.textBaseline = "middle";
	this.stepboardlabel.x = word.getBounds().width + 10;
	this.stepboardlabel.y = 10;
	this.addChild(this.stepboardlabel);
};
StepBoard.prototype = new createjs.Container;
StepBoard.prototype.setStepNum = function () {
	//var a = Math.abs(score);
	this.stepboardlabel.text = this.stepnum.toString();
};
StepBoard.prototype.setStepNum_IncreaseOneStep = function () {
	//score--;
	this.stepnum++;
	this.setStepNum();
};
StepBoard.prototype.reSet = function () {
	//score = 0;
	this.stepnum = 0;
	this.setStepNum();
};


var C_ScoreBoard = function (img, tscore) {
	this.initialize();
	this.tscore = tscore;
	
	//var c = new createjs.Bitmap(queue.getResult(img));
	//this.addChild(c);
	var word = new createjs.Text("Score:", "bold 60px Arial");
    this.addChild(word);
	this.stepboardlabel = new createjs.Text(this.tscore.toString(), "50px Arial");
	//this.stepboardlabel.textBaseline = "middle";
	this.stepboardlabel.x = word.getBounds().width + 10;
	this.stepboardlabel.y = 10;
	this.addChild(this.stepboardlabel);
};
C_ScoreBoard.prototype = new createjs.Container;
C_ScoreBoard.prototype.setStepNum = function () {
	
	this.stepboardlabel.text = this.tscore.toString();
};
C_ScoreBoard.prototype.increaseScore = function (num) {
	this.tscore = this.tscore + num;
	this.setStepNum();
};
C_ScoreBoard.prototype.decreaseScore = function (num) {
	this.tscore = this.tscore - num;
	this.setStepNum();
};
C_ScoreBoard.prototype.reSet = function () {
	this.tscore = 1000;
	this.setStepNum();
};

//
//var C_mapClassBase = function (a) {      //C_mapClassBase,  C_mapItem, C_q
//	this.m_colorarray = a;
//	this.m_allitems = [];     //array of C_mapItem
//	this.m_stepover = !1;
//	this.m_changeditems = [];
//	this.m_fxarray = [];
//};
//C_mapClassBase.prototype.randomMap = function () {
//	for (var a = 0; a < qp_blockYNum; a++) {
//		for (var b = 0; b < qp_blockXNum; b++) {
//			var c = Math.floor(Math.random() * this.m_colorarray.length);
//			this.m_allitems[a * qp_blockXNum + b] = new C_mapItem(this.m_colorarray[c], a, b);
//		}
//	}
//};
//C_mapClassBase.prototype.initfirstflood = function () {
//	this.m_allitems[0].isflooded = !0;
//	this.m_changeditems.push(this.m_allitems[0]);
//};
//C_mapClassBase.prototype.floodX = function (a, b) {
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
//C_mapClassBase.prototype.floodY = function (a, b) {
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
//C_mapClassBase.prototype.flood = function (a, b) {
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
//C_mapClassBase.prototype.validij = function (a, b) {
//	return 0 > a || a >= qp_blockXNum || 0 > b || b >= qp_blockYNum ? !1 : !0;
//};
//C_mapClassBase.prototype.get1Dindex = function (a, b) {
//	return this.validij(a, b) ? b * qp_blockXNum + a : -1;
//};
//C_mapClassBase.prototype.isGameOver = function () {
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
//var C_mapItem = function (a, b, c) {
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
//C_mapItem.prototype = new createjs.Container;

