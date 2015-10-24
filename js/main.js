var  ScreenWidth = 640, ScreenHeight = 960;
var	qp_stepBoard, qp_scoreBoard, qp_mapContainer, 
	qp_answerCollection, qp_mapClass, qp_imgBlockCollection,  qp_nextbtn, qp_topbtn;
var  qp_curIndex, qp_textImg;;

//game json information 
//var  qp_gameJsonText = '{"gameInfo":[' +
//  '{"img":"thu1", "ansArray":[{"text": "place1_1", "isans": 0}, {"text": "place1_2", "isans": 0}, {"text": "place1_3", "isans": 1},{"text": "place1_4", "isans": 0}] },' +
//  '{"img":"thu2", "ansArray":[{"text": "place2_1", "isans": 1}, {"text": "place2_2", "isans": 0}, {"text": "place2_3", "isans": 0},{"text": "place2_4", "isans": 0}] },'+
//  '{"img":"thu1", "ansArray":[{"text": "place3_1", "isans": 0}, {"text": "place3_2", "isans": 1}, {"text": "place3_3", "isans": 0},{"text": "place3_4", "isans": 0}] },' +
//  '{"img":"thu2", "ansArray":[{"text": "place4_1", "isans": 0}, {"text": "place4_2", "isans": 0}, {"text": "place4_3", "isans": 0},{"text": "place4_4", "isans": 1}] }'+
// ']}';

var qp_gameJsonArray;// = eval("(" + qp_gameJsonText + ")");
//var qp_gameJsonArray = eval("(" + qp_txt + ")");
var qp_answerNum;// = 4;


function resourceLoadComplete(a) {
	new WelComeScene(qp_gameFunc, stage);
};

function loadResource() {
	SCREEN_SHOW_ALL = !0;
	//qp_resourceList = new createjs.LoadQueue;
	var loadProgress = new ProgressBar(0.8 * W, 50);
	loadProgress.regX = loadProgress.w / 2;
	loadProgress.regY = loadProgress.h / 2;
	loadProgress.x = W / 2;
	loadProgress.y = H / 2;
	stage.addChild(loadProgress);
	$.getJSON("game.txt", function(data) {	//whquan
		qp_gameJsonArray = data;	
		qp_answerNum = qp_gameJsonArray.gameInfo.length;
		//console.log("game number:", qp_answerNum);
	});
	
	
	queue = qp_resourceList = new createjs.LoadQueue(!1);
	
	queue.on("complete", resourceLoadComplete, null, !0);
	LoadWelComeSceneRes();
	LoadGameoverSceneRes();
	queue.loadManifest({path:RES_DIR + "img/", 
	       manifest:[
	       {src:"bg.jpg", id:"bg"}, 
	       {src:"gamebg.jpg", id:"gameBg"}, 
	       {src:"blurbg.jpg", id:"blurBg"}, 
	       {src:"bggray.png", id:"bggray"},	       
	       {src:"block.png", id:"block"},
	       {src:"game/jiujing1.jpg", id:"jiujing1"},
	       {src:"game/jiujing2.jpg", id:"jiujing2"},
	       {src:"game/jiujing3.jpg", id:"jiujing3"},
	       {src:"game/jiujing4.jpg", id:"jiujing4"},
	       {src:"game/jiujing5.jpg", id:"jiujing5"},
	       {src:"game/jiujing6.jpg", id:"jiujing6"},
	       {src:"game/jiujing7.jpg", id:"jiujing7"},
	       {src:"game/jiujing8.jpg", id:"jiujing8"},
	       {src:"game/jiujing9.jpg", id:"jiujing9"},
	       {src:"game/jiujing10.jpg", id:"jiujing10"},
	       {src:"game/gametext1.png", id:"gametext1"},
	       {src:"game/gametext2.png", id:"gametext2"},
	       {src:"game/gametext3.png", id:"gametext3"},
	       {src:"game/gametext4.png", id:"gametext4"},
	       {src:"game/gametext5.png", id:"gametext5"},
	       {src:"game/gametext6.png", id:"gametext6"},
	       {src:"game/gametext7.png", id:"gametext7"},
	       {src:"game/gametext8.png", id:"gametext8"},
	       {src:"game/gametext9.png", id:"gametext9"},
	       {src:"game/gametext10.png", id:"gametext10"},
	       {src:"thu1.jpg", id:"thu1"},
	       {src:"thu2.jpg", id:"thu2"},
	       {src:"btn.png", id:"btn"},
	       {src:"btnTrue.png", id:"btnTrue"},
	       {src:"btnFalse.png", id:"btnFalse"},
	       {src:"nextbtn.png", id:"nextbtn"}]}, !1);
	USE_NATIVE_SOUND || (IS_NATIVE_ANDROID ? 
		(createjs.Sound.registMySound("flip", 0), 
		 createjs.Sound.registMySound("bonus", 2), 
		queue.loadFile({id:"sound", src:RES_DIR + "audio/all.mp3"})) 
		: (createjs.Sound.alternateExtensions = ["ogg"],
		   queue.installPlugin(createjs.Sound), 
		   queue.loadManifest({path:RES_DIR + "audio/",
		        manifest:[
		        {src:"flip.mp3", id:"flip"} ,
		        {src:"bonus.mp3", id:"bonus"}
		        ]}, !1))
		   );
	loadProgress.forQueue(queue);
	queue.load();
};


//whquan
function submitScore(score){
	$.post("score.php", {"score":score}, function(data){
		
		//alert(data);
		var resJson = eval("(" + data + ")");
		
		qp_numPlay = resJson.numPlay;
		qp_bestScore = resJson.bestScore;
		qp_numplayText.text = qp_numPlay.toString();
		//qp_bestScoreText.text = qp_bestScore.toString();
	});
}

function qp_gameFunc(index) {
	this.index = index;
	qp_curIndex = index;
	var blockNum = 6 + Math.floor(index);
	
	
	qp_mapContainer = new createjs.Container;
	stage.addChild(qp_mapContainer);	
	
	//add  backgroud
	var tbgmap;
	tbgmap = new createjs.Bitmap(qp_resourceList.getResult("gameBg"));
	tbgmap.x = 0;
	tbgmap.y = 0 ;
	//tbgmap.alpha = 0.5
	tbgmap.scaleX = (ScreenWidth / tbgmap.image.width) ;
	tbgmap.scaleY = (ScreenHeight / tbgmap.image.height);
	qp_mapContainer.addChild(tbgmap);          //add background img
	
//	var tbggray;
//	tbggray = new createjs.Bitmap(qp_resourceList.getResult("bggray"));
//	tbggray.x = 0;
//	tbggray.y = 0 ;
//	tbggray.scaleX = (ScreenWidth / tbggray.image.width);
//	tbggray.scaleY = (ScreenHeight / tbggray.image.height);
//	qp_mapContainer.addChild(tbggray);          //add background img
//	

	//read game infomation from json obj
	var thuImg = qp_gameJsonArray.gameInfo[index].img;
	var ansTextArray = [];
	var isAnsArray = [];
	for(var i = 0; i < 4; i++) {
		ansTextArray[i] = qp_gameJsonArray.gameInfo[index].ansArray[i].text;
		isAnsArray[i] = qp_gameJsonArray.gameInfo[index].ansArray[i].isans;
	}
	
	//game page block set
    var xoffset = 60, yoffset = 120;
    var allBlockWidth = ScreenWidth - xoffset * 2;
    var allBlockHeight = allBlockWidth;
   
    var ansY = allBlockHeight + 150;
    var ansWidth = allBlockWidth;
    var ansHeight = ScreenHeight - allBlockHeight - 250;
    
    //create img block collection 
	qp_imgBlockCollection = new C_imgBlockCollection(thuImg, allBlockWidth, allBlockHeight, blockNum);
	qp_imgBlockCollection.x = xoffset;
	qp_imgBlockCollection.y = yoffset;
    qp_mapContainer.addChild(qp_imgBlockCollection);

	qp_imgBlockCollection.initBlocks();
	qp_imgBlockCollection.addBlocks();
    //create answer items
   
    qp_answerCollection = new C_answerCollection(ansTextArray, isAnsArray);
    qp_answerCollection.x = xoffset;
    qp_answerCollection.y = ansY;
    
    qp_answerCollection.scaleX = (ansWidth / qp_answerCollection.getBounds().width);
	qp_answerCollection.scaleY =  (ansHeight / qp_answerCollection.getBounds().height);
	
	qp_mapContainer.addChild(qp_answerCollection);
    
	//create stepBoard and socreBoard
//	qp_stepBoard = new StepBoard("step");    //show the used step number
//	qp_stepBoard.x = 50;
//	qp_stepBoard.y = 20;
//	qp_stepBoard.scaleX = (100 / qp_stepBoard.getBounds().width);
//	qp_stepBoard.scaleY =  (50 / qp_stepBoard.getBounds().height);
//	qp_mapContainer.addChild(qp_stepBoard);

	var gameText = qp_gameJsonArray.gameInfo[index].text;
	
	qp_textImg = new createjs.Bitmap(qp_resourceList.getResult(gameText));
	qp_textImg.x = 0;
	qp_textImg.y = 30 ;
	qp_textImg.alpha = 0;
	qp_textImg.scaleX = (ScreenWidth / qp_textImg.image.width) ;
	qp_textImg.scaleY = (ScreenHeight / qp_textImg.image.height);
	createjs.Tween.get(qp_textImg).wait(1000).to({alpha:1, y:0}, 500);
	//qp_mapContainer.addChild(qp_textImg);          //add background img


	
	qp_scoreBoard = new C_ScoreBoard("curscore");    //show the used step number
	qp_scoreBoard.x = 490
	qp_scoreBoard.y = 12; 
	//qp_scoreBoard.scaleX = (30 / qp_scoreBoard.getBounds().width);
	//qp_scoreBoard.scaleY =  (40 / qp_scoreBoard.getBounds().height);
	qp_mapContainer.addChild(qp_scoreBoard);	
	
	
	//var qp_nextbtn;
	qp_nextbtn = new createjs.Bitmap(qp_resourceList.getResult("nextbtn"));
	qp_nextbtn.regX = 47;
	qp_nextbtn.regY = 47;
	qp_nextbtn.x = 420;
	qp_nextbtn.y = 920;
	
	qp_nextbtn.alpha = 0;
	createjs.Tween.get(qp_nextbtn).to({alpha:1}, 1000)
	//qp_mapContainer.addChild(qp_nextbtn);
	qp_nextbtn.on("mousedown", function () {
		IS_TOUCH && this.nativeEvent instanceof MouseEvent || 
		(this.scaleY = this.scaleX = 0.95);
	});
	qp_nextbtn.on("pressup", function (evt, data) {
		this.scaleY = this.scaleX = 1;
		var gameindex = data.obj.index + 1;
		if(gameindex < qp_answerNum) {
			qp_imgBlockCollection.removeAllChildren();
			qp_answerCollection.removeAllChildren();
			qp_mapContainer.removeAllChildren();
			stage.removeAllChildren();
			qp_gameFunc(data.obj.index + 1);			
		}
		else {
		    alert("no more game");			
		}
	},null, false, {obj: this});
	
    qp_topbtn = new createjs.Bitmap(qp_resourceList.getResult("topbtn"));
	qp_topbtn.regX = 47;
	qp_topbtn.regY = 47;
	qp_topbtn.x = 420;
	qp_topbtn.y = 920;
	
	qp_topbtn.alpha = 0;
	createjs.Tween.get(qp_topbtn).to({alpha:1}, 1000)
	
	qp_topbtn.on("mousedown", function () {
		IS_TOUCH && this.nativeEvent instanceof MouseEvent || 
		(this.scaleY = this.scaleX = 0.95);
	});
	qp_topbtn.on("pressup", function (evt, data) {
		this.scaleY = this.scaleX = 1;
		var gameindex = data.obj.index + 1;
		
		qp_imgBlockCollection.removeAllChildren();
		qp_answerCollection.removeAllChildren();
		qp_mapContainer.removeAllChildren();
		stage.removeAllChildren();
		//whquan
		submitScore(qp_score);	
	
        GameoverScene();
	},null, false, {obj: this});
	
};

var C_imgBlock = function (locationX, locationY) {
	this.initialize();	
	this.clicked = 0;
	this.visible = 1;
	this.img = new createjs.Bitmap(qp_resourceList.getResult("block"));
	this.img.on("mousedown", function (evt, data) {
		if(data.obj.clicked == 0) {
			createjs.Sound.play("flip", !0);
			console.log("sound flip:", "flip");
			createjs.Tween.get(data.obj.img).to({alpha:0}, 100);
			//this.scaleY = this.scaleX = 0;
			//qp_stepBoard.setStepNum_IncreaseOneStep();
			qp_scoreBoard.decreaseScore(10);
			data.obj.clicked = 1;	
		}
	}, null, false, {obj: this});	
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
	this.allblocks = [];
	//this.m_visibleMap = [];

};
C_imgBlockCollection.prototype = new createjs.Container;
C_imgBlockCollection.prototype.initBlocks = function () {
	for (var x = 0; x < this.blockNum; x++) {
		for (var y = 0; y < this.blockNum; y++) {
			this.allblocks[x * this.blockNum + y] = new C_imgBlock(x, y);
		
		}
	}
};


C_imgBlockCollection.prototype.addBlocks = function() {
	
	for (var x = 0; x < this.blockNum; x++) {
		var remove;
		if(x % 2 == 0) {
		    remove = Math.floor(Math.random() * 2);			
		}
		else {
			remove = this.blockNum - 1 - Math.floor(Math.random() * 2);
		}
		for (var y = 0; y < this.blockNum; y++) {
			if(y == remove) continue;
			var tidx = x * this.blockNum + y;
			var  tblock = this.allblocks[tidx];
			tblock.alpha = 0;
			createjs.Tween.get(tblock).to({alpha:1}, 300).call(function() {
	                    qp_imgBlockCollection.thuImg.alpha =1;
                    } );   //animation
			tblock.scaleX = this.blocksizex / tblock.getBounds().width;
			tblock.scaleY= this.blocksizey / tblock.getBounds().height;
			tblock.x = this.blocksizex * x ;
			tblock.y = this.blocksizey * y ;
			//qp_mapontainer.addChild(timg);
			this.addChild(tblock);
			
		}
	}
};
C_imgBlockCollection.prototype.removeAllBlocks = function() {
	for (var x = 0; x < this.blockNum; x++) {
		for (var y = 0; y < this.blockNum; y++) {
			var  tblock = this.allblocks[x * this.blockNum + y];
			createjs.Tween.get(tblock).to({alpha:0}, 500);
	   }
	}
}

var C_answerItem = function( text, isanswer, ansCollection) {
	this.initialize();
	
	this.btn = new createjs.Bitmap(qp_resourceList.getResult("btn"));
	this.btnTrue = new createjs.Bitmap(qp_resourceList.getResult("btnTrue"));
	this.btnFalse = new createjs.Bitmap(qp_resourceList.getResult("btnFalse"));
	this.ansText = new createjs.Text(text , "bold 23px 幼圆");
	this.ansText.alpha = 0.7;
	this.isans = isanswer; //1 means this is the rigth answer
	this.pressed = 0; //1 means is pressed
	
//	var ansBtnSize = 30;
	this.btn.scaleX = this.btnTrue.scaleX = this.btnFalse.scaleX = 0.6;
//    (ansBtnSize / this.btn.getBounds().width);
	this.btn.scaleY = this.btnTrue.scaleY = this.btnFalse.scaleY = 0.6;
	//    (ansBtnSize / this.btn.getBounds().height);

	//this.btnTrue.alpha = 0;
	//this.btnFalse.appha = 0;
	
	this.ansText.x = 15;//this.btn.getBounds().width - 20;
	this.ansText.y = 10;
	
	this.addChild(this.btn);
	this.addChild(this.ansText);	

    
	this.btn.on("mousedown", function (evt, data) {
		if(data.obj2.haveChosed == 0 && data.obj.pressed == 0) {
			IS_TOUCH && this.nativeEvent instanceof MouseEvent || 
			(this.scaleY = this.scaleX = 0.58);			
		}
		

	}, null, false,  {obj: this, obj2: ansCollection});
	this.btn.on("pressup", function (evt, data) {
		if(data.obj2.haveChosed == 0 &&data.obj.pressed == 0) {
			this.scaleY = this.scaleX = 0.6;
			//console.log("data.obj", data.obj);
			
			if(data.obj.isans == 1) {
				createjs.Sound.play("bonus", !0);
				data.obj.addChild(data.obj.btnTrue);	
				qp_score += 150;
				qp_scoreBoard.setScoreNum();
				
				qp_imgBlockCollection.removeAllBlocks();
			}
			else {
				data.obj.addChild(data.obj.btnFalse);
				qp_score -= 50;
				qp_scoreBoard.setScoreNum();
				qp_imgBlockCollection.removeAllBlocks();
				data.obj2.showAnswer();
			}
			qp_mapContainer.addChild(qp_textImg);  
			
			if(qp_curIndex + 1 < qp_answerNum) {
				qp_mapContainer.addChild(qp_nextbtn);	
			}
			else {
				qp_mapContainer.addChild(qp_topbtn);
			}

			
			data.obj.pressed = 1;
			data.obj2.haveChosed = 1;
		}
	}, null, false, {obj: this, obj2: ansCollection});
	
};
C_answerItem.prototype = new createjs.Container;
C_answerItem.prototype.showAnswer = function() {
	if(this.isans == 1 && this.pressed == 0) {
		this.addChild(this.btnTrue);	
	}	
}

var C_answerCollection = function(ansText, isAns) {
	
	this.isAns = isAns;
	this.allAnsItems = [];
	this.haveChosed = 0;
	
	for(var i = 0; i < 4; i++ ) {
		this.allAnsItems[i] = new C_answerItem(ansText[i], isAns[i], this);
		this.addChild(this.allAnsItems[i]);
	}
	this.allAnsItems[1].x = this.allAnsItems[0].getBounds().width + 20;
	this.allAnsItems[2].y = this.allAnsItems[0].getBounds().height + 10;
	this.allAnsItems[3].x = this.allAnsItems[0].getBounds().width + 20;
	this.allAnsItems[3].y = this.allAnsItems[0].getBounds().height + 10;
	
};
C_answerCollection.prototype = new createjs.Container;
C_answerCollection.prototype.showAnswer = function() {
	for(var i = 0; i < 4; i++ ) {
		this.allAnsItems[i].showAnswer();
	}
	
	
}

var StepBoard = function (img) {
	this.initialize();
	//this.stepnum = qp_step;
	
	//var c = new createjs.Bitmap(queue.getResult(img));
	//this.addChild(c);
	var word = new createjs.Text("Step:", "bold 60px Arial");
    this.addChild(word);
	//var d = Math.abs(score);
	this.stepboardlabel = new createjs.Text(qp_step.toString(), "50px Arial");
	//this.stepboardlabel.textBaseline = "middle";
	this.stepboardlabel.x = word.getBounds().width + 10;
	this.stepboardlabel.y = 10;
	this.addChild(this.stepboardlabel);
};
StepBoard.prototype = new createjs.Container;
StepBoard.prototype.setStepNum = function () {
	//var a = Math.abs(score);
	this.stepboardlabel.text = qp_step.toString();
};
StepBoard.prototype.setStepNum_IncreaseOneStep = function () {
	//score--;
	qp_step++;
	this.setStepNum();
};
StepBoard.prototype.reSet = function () {
	//score = 0;
	qp_step = 0;
	this.setStepNum();
};


var C_ScoreBoard = function (img) {
	this.initialize();
	//this.tscore = qp_score;
	
	//var c = new createjs.Bitmap(queue.getResult(img));
	//this.addChild(c);
	//var word = new createjs.Text("Score:", "bold 60px Arial");
    //this.addChild(word);
	this.stepboardlabel = new createjs.Text(qp_score.toString(), "45px Arial");
	//this.stepboardlabel.textBaseline = "middle";
	this.stepboardlabel.x = 10;//word.getBounds().width + 10;
	this.stepboardlabel.y = 10;
	this.addChild(this.stepboardlabel);
};
C_ScoreBoard.prototype = new createjs.Container;
C_ScoreBoard.prototype.setScoreNum = function () {
	
	this.stepboardlabel.text = qp_score.toString();
};
C_ScoreBoard.prototype.increaseScore = function (num) {
	qp_score = qp_score + num;
	this.setScoreNum();
};
C_ScoreBoard.prototype.decreaseScore = function (num) {
	qp_score = qp_score - num;
	this.setScoreNum();
};
C_ScoreBoard.prototype.reSet = function () {
	qp_score = 500;
	this.setScoreNum();
};
