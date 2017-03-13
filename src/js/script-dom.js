var me = true;
var over = false;
var chessBoard = [];
var record = [];

for(var i = 0;i < 15; i++){
	chessBoard[i] = [];
	for(var j = 0; j < 15; j++){
		chessBoard[i][j] = 0;
	}
}

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

var map = [
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0
		];
var cols = Math.sqrt(map.length);
var sizeGird = 30;
var oUl = document.getElementById('ul1');
// 绘制棋盘
function createMap(){
	oUl.style.width = cols * (sizeGird + 1) + 'px';
	oUl.style.height = cols * (sizeGird + 1) + 'px';
	for(var i=0;i<map.length;i++){
		var oLi = document.createElement('li');
		oLi.style.width = sizeGird + 'px';
		oLi.style.height = sizeGird + 'px';
		oUl.appendChild(oLi);
	}
}
createMap();


//落棋的绘制过程
var oneStep = function(i, j, me){
	var o = document.createElement('span');
	o.style.left = (i*31 - 10) + 'px';
	o.style.top = (j*31 - 10) + 'px'; 
	o.className = 'qizi' + ' '+ i+j;
	if(me) {
		o.style.backgroundColor = '#000';
	}else {
		o.style.backgroundColor = 'red';
	}
	oUl.appendChild(o);
}
//手动点击之后，落一颗棋子
oUl.onclick = function(e){
	var x = e.clientX;
	var y = e.clientY;
	console.log(x,y);
	x = x - (window.innerWidth - parseInt(oUl.style.width)) / 2;
	y = y - 20;
	var i = Math.round(x / 31);
	var j = Math.round(y / 31);
	console.log(i,j);
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
	// 悔棋
	record[record.length - 1]['delete'] = true;
	var recordCopy = record.filter((item,index) => {
	 	if(item.delete) return item;
	 });
	for(var i = 0; i<recordCopy.length; i++){
		var posX = recordCopy[i].x;
		var posY = recordCopy[i].y;
		var color = recordCopy[i].color;
		var selector = String(posX) + String(posY);
		if(i === recordCopy.length - 1 && document.getElementsByClassName(selector)[0]){
			var removeDom = document.getElementsByClassName(selector)[0];
			removeDom.parentNode.removeChild(removeDom);
		}
	}
	var i = record[record.length - 1].x;
	var j = record[record.length - 1].y;
	chessBoard[i][j] = 0;
	me = !me;	
}

var forward = document.getElementById('forward');
forward.onclick = function() {
	if(record.length === 0) return;
	if(!record[record.length - 1]['delete']) {
		alert('没有棋可反悔');
		return;
	}
		record[record.length - 1]['delete'] = false;
		 var recordCopy = record.filter((item,index) => {
		 	if(!item.delete) return item;
		 });
		for(var i = 0; i<recordCopy.length; i++){
			var posX = recordCopy[i].x;
			var posY = recordCopy[i].y;
			var color = recordCopy[i].color;
			oneStep(posX,posY,color);
		}
}
