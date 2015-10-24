var qp_numplayText, qp_numPlay = 0, qp_bestScoreText, qp_bestScore = 0;


function LoadGameoverSceneRes() {
	queue.loadManifest({path:RES_DIR + "img/", 
	    manifest:[{src:"maxscore.png", id:"maxscore"}, 
	              {src:"gameoverbg.png", id:"gameoverbg"}, 
	              {src:"curscore.png", id:"curscore"}, 
	              {src:"sharebtn.png", id:"sharebtn"}, 
	              {src:"donatebtn.png", id:"donatebtn"}, 
	              {src:"gameovertext.png", id:"gameovertext"},
	              {src:"gameover.png", id:"gameover"}]}, !1);
}


var GameoverScene = function () {
	
	var overContainer = new createjs.Container;
	stage.addChild(overContainer);
	var a, b;
	a = new createjs.Bitmap(queue.getResult("blurBg"));
	overContainer.addChild(a);
	
	a = new createjs.Bitmap(queue.getResult("gameovertext"));
	a.alpha = 0;
	createjs.Tween.get(a).to({alpha:1}, 200);
	overContainer.addChild(a);
	
	a  = new createjs.Text(" 你的得分:", "bold 35px 幼圆");
	a.textBaseline = "middle";
	a.x = 70;
	a.y = 100;
	overContainer.addChild(a);
	
	scoreText  = new createjs.Text(qp_score.toString(), "bold 35px 幼圆");
	scoreText.textBaseline = "middle";
	scoreText.x = 70 + a.getBounds().width;
	scoreText.y = 100;
	overContainer.addChild(scoreText);
	
	a  = new createjs.Text(" 当前排名:", "bold 35px 幼圆");
	a.textBaseline = "middle";
	a.x = 330;
	a.y = 100;
	overContainer.addChild(a);

	qp_numplayText  = new createjs.Text(qp_numPlay.toString(), "bold 35px 幼圆");
	qp_numplayText.textBaseline = "middle";
	qp_numplayText.x = 330 + a.getBounds().width;
	qp_numplayText.y = 100;
	overContainer.addChild(qp_numplayText);
	
	
	var tstr ="获得称号：";
	
	a = new createjs.Text(tstr, "bold 40px 幼圆");
	a.textBaseline = "middle";
	a.x = 100;
	a.y = 180;
	overContainer.addChild(a);
	
	var title = "一级居士";
	if(qp_score >= 600) title = "楼    长";
	if(qp_score >= 500 && qp_score < 600) title = "一级居士";
	if(qp_score >= 400 && qp_score < 500) title = "二级居士";
	if(qp_score >= 300 && qp_score < 400) title = "三级居士";
	if(qp_score < 300) title = "过   客";
	b = new createjs.Text(title, "bold 55px 幼圆");
	b.textBaseline = "middle";
	b.x = 100 + a.getBounds().width;
	b.y = 180;
	overContainer.addChild(b);


//	a = new createjs.Bitmap(queue.getResult("curscore"));
//	a.x = 120;
//	a.y = 350;
//	overContainer.addChild(a);
//	a = Math.abs(qp_score);
//	a = new createjs.Text(a.toString(), "bold 60px Arial");
//	a.textBaseline = "middle";
//	a.x = 400;
//	a.y = 380;
//	overContainer.addChild(a);
//	a = new createjs.Bitmap(queue.getResult("maxscore"));
//	a.x = 120;
//	a.y = 450;
//	overContainer.addChild(a);
//	
//	//a = Math.abs(qp_best);
//	qp_bestScoreText = new createjs.Text(qp_bestScore.toString(), "bold 60px Arial");
//	qp_bestScoreText.textBaseline = "middle";
//	qp_bestScoreText.x = 420;
//	qp_bestScoreText.y = 480;
//	overContainer.addChild(qp_bestScoreText);

	//whquan
	b = new createjs.Bitmap(queue.getResult("donatebtn"));
	b.setAnchorPoint(0.5, 0.5);
	b.x = 160;
	b.y = 850;
	overContainer.addChild(b);
	b.on("mousedown", function (evt) {
		IS_TOUCH && evt.nativeEvent instanceof MouseEvent 
		|| (this.scaleY = this.scaleX = 0.95);
	});
	b.on("pressup", function (evt) {
		this.scaleY = this.scaleX = 1;
		window.location.href = "http://alumni.cs.tsinghua.edu.cn/donation/";
	});
	
	b = new createjs.Bitmap(queue.getResult("sharebtn"));
	b.setAnchorPoint(0.5, 0.5);
	b.x = 460;	//whquan
	b.y = 850;
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

