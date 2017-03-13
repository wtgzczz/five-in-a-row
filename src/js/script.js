var me = true;
var over = false;
var chessBoard = [];
var record = [];
// 所有赢法
var wins= [];
//赢法的计数
var myWin = [];
var computerWin = [];

for(var i = 0;i < 15; i++){
	chessBoard[i] = [];
	for(var j = 0; j < 15; j++){
		chessBoard[i][j] = 0;
	}
}
//初始化
for(var i = 0; i<15; i++){
	wins[i] = [];
	for(var j = 0; j<15; j++){
		wins[i][j] = [];
	}
}
// 横
var count = 0;
for(var i = 0; i<15; i++){
	for(var j = 0; j<11; j++){
		for(var k = 0; k<5; k++){
			wins[i][j+k][count] = true;
		}
		count++;
	}
}

//纵

for(var i = 0; i<15; i++){
	for(var j = 0; j<11; j++){
		for(var k = 0; k<5; k++){
			wins[j+k][i][count] = true;
		}
		count++;
	}
}
//斜

for(var i = 0; i<11; i++){
	for(var j = 0; j<11; j++){
		for(var k = 0; k<5; k++){
			wins[i+k][j+k][count] = true;
		}
		count++;
	}
}
//反斜
for(var i = 0; i<11; i++){
	for(var j = 14; j>3; j--){
		for(var k = 0; k<5; k++){
			wins[i+k][j-k][count] = true;
		}
		count++;
	}
}
// 初始化计数数组
for(var i = 0; i<count; i++){
	myWin[i] = 0;
	computerWin[i] = 0;
}

var chess = document.getElementById('chess');
var context = chess.getContext('2d');

var logo = new Image();
logo.src= '../src/img/logo1.png';
logo.onload = function() {
	context.drawImage(logo,0,0,450,450);
	drawChessBoard();
}

//绘制格子
var drawChessBoard = function() {
	context.strokeStyle = "#bfbfbf";
	for(var i = 0; i < 15; i++) {
		context.moveTo(15 + i*30, 15);
		context.lineTo(15 + i*30, 435);
		context.stroke();
		context.moveTo(15,15 + i*30);
		context.lineTo(435,15 + i*30);
		context.stroke();
	}
}
//落棋的绘制过程
var oneStep = function(i, j, me){
	context.beginPath();
	context.arc(i*30 + 15, j*30 + 15, 13, 0, 2 * Math.PI)
	context.closePath();
	if(me) {
		context.fillStyle = '#000';
	}else {
		context.fillStyle = '#fff';
	}
	context.fill();
}
//手动点击之后，落一颗棋子
chess.onclick = function(e){
	if(over){
		return;
	}
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x / 30);
	var j = Math.floor(y / 30);
	if(chessBoard[i][j] === 0){
		oneStep(i,j,me);
		if(me) {
			chessBoard[i][j] = 1;
		}else {
			chessBoard[i][j] = 2;
		}
		me = !me;
		record.push({x:i, y:j, color:!me, delete:false});
		if(!me){
			for(var k = 0;k<count;k++){
				if(wins[i][j][k]) {
					myWin[k]++;
					computerWin[k] = 6;
					if(myWin[k] == 5) {
						alert('你赢了');
						over = true;
					}
				}
			}
		}
	}
}

var back = document.getElementById('back');
back.onclick = function() {
	if(record.length === 0) return;
	if(record[record.length - 1]['delete']) {
		alert('只能悔棋一步');
		return;
	}
	chess.width = 450;
	//context.clearRect(0,0,450,450);
	// 复原画布
	var logo = new Image();
	logo.src= '../src/img/logo1.png';
	logo.onload = function() {
		context.drawImage(logo,0,0,450,450);
		drawChessBoard();
		// 悔棋
		record[record.length - 1]['delete'] = true;
		var recordCopy = record.filter((item,index) => {
		 	if(!item.delete) return item;
		 });
		for(var i = 0;i<recordCopy.length;i++){
			var posX = recordCopy[i].x;
			var posY = recordCopy[i].y;
			var color = recordCopy[i].color;
			oneStep(posX,posY,color);
		}
		var i = record[record.length - 1].x;
		var j = record[record.length - 1].y;
		chessBoard[i][j] = 0;
		me = !me;
	}	
}

var forward = document.getElementById('forward');
forward.onclick = function() {
	if(record.length === 0) return;
	chess.width = 450;
	//context.clearRect(0,0,450,450);
	//复原画布
	var logo = new Image();
	logo.src = '../src/img/logo1.png';
	logo.onload = function(){
		context.drawImage(logo,0,0,450,450);
		drawChessBoard();
		record[record.length - 1]['delete'] = false;
		 var recordCopy = record.filter((item,index) => {
		 	if(!item.delete) return item;
		 });
		for(var i = 0;i<recordCopy.length;i++){
			var posX = recordCopy[i].x;
			var posY = recordCopy[i].y;
			var color = recordCopy[i].color;
			oneStep(posX,posY,color);
		}
	}
}
	
	



