// Fifteen puzzle, Javascript
//Namw: OngelSenior 620061303
//INFO2180 Project 2
//Additional feature: End-of-game notification:

var background;
var emptySpaceY;
var emptySpaceX;
var puzzlePieces;
var countMoves=0;

// initialize the page as soon as it's finished loading by creating the fifteen
// puzzlepiece squares and attaching 'shufflebutton' click handler
window.onload = function () {
	var puzzleArea = document.getElementById('puzzlearea');
	puzzlePieces = puzzleArea.getElementsByTagName('div');
	
	for (var i=0; i<puzzlePieces.length; i++) {
		puzzlePieces[i].className = 'puzzlepiece';
		puzzlePieces[i].style.left = (i%4*100)+'px';
		puzzlePieces[i].style.top = (parseInt(i/4)*100) + 'px';
		puzzlePieces[i].style.backgroundPosition= '-' + puzzlePieces[i].style.left + ' ' + '-' + puzzlePieces[i].style.top;
                
        puzzlePieces[i].onclick = function() {
			if (movePossible(parseInt(this.innerHTML))) {
				switchPiece(this.innerHTML-1);
				if (gameOver()) {
					winner();
				}
				return;
		}};
		
		puzzlePieces[i].onmouseover = function() {
			if (movePossible(parseInt(this.innerHTML))) {
				this.style.border = "2px solid red";
				this.style.color = "#006600";
				this.style.textDecoration = 'underline';
		}};
		
		puzzlePieces[i].onmouseout = function() {
			this.style.border = "2px solid black";
			this.style.color = "#000000";
			this.style.textDecoration = 'none';
		};
	}

	emptySpaceX = '300px';
	emptySpaceY = '300px';
// the fucnction to shuffle all the tiles in the puzzle
	var shufflebutton = document.getElementById('shufflebutton');
	shufflebutton.onclick = function() {
		for (var i=0; i<300; i++) {
			var rand = parseInt(Math.random()* 100) %4;
			if (rand == 0) {
				var tmp = movePieceUp(emptySpaceX, emptySpaceY);
				if ( tmp != -1) {
					switchPiece(tmp);
				}}
			if (rand == 1) {
				var tmp = movePieceDown(emptySpaceX, emptySpaceY);
				if ( tmp != -1)  {
					switchPiece(tmp);
				}}
			if (rand == 2) {
				var tmp = movePieceLeft(emptySpaceX, emptySpaceY);
				if ( tmp != -1) {
					switchPiece(tmp);
				}}
			if (rand == 3) {
				var tmp = movePieceRight(emptySpaceX, emptySpaceY);
				if (tmp != -1) {
					switchPiece(tmp);
}}}};};

//Checks if a move is possible
var movePossible = function(state) {
if (movePieceLeft(emptySpaceX, emptySpaceY) == (state-1)) {
		return true;
	}
if (movePieceDown(emptySpaceX, emptySpaceY) == (state-1)) {
		return true;
	}
if (movePieceUp(emptySpaceX, emptySpaceY) == (state-1)) {
		return true;
	}
if (movePieceRight(emptySpaceX, emptySpaceY) == (state-1)) {
		return true;
	}}

//Moves one puzzle peice to the left into an empty space
var movePieceLeft = function (x, y) {
	var xx = parseInt(x);
	var yy = parseInt(y);
	if (xx > 0) {
		for (var i = 0; i < puzzlePieces.length; i++)  	{
			if (parseInt(puzzlePieces[i].style.left) + 100 == xx && parseInt(puzzlePieces[i].style.top) == yy) {
				return i;
			}}}
	else  {
		return -1;
	}}

//Moves one puzzle peice to the right into an empty space
var movePieceRight = function(x, y) {
	var xx = parseInt(x);
	var yy = parseInt(y);
	if (xx < 300) {
		for (var i =0; i<puzzlePieces.length; i++){
			if (parseInt(puzzlePieces[i].style.left) - 100 == xx && parseInt(puzzlePieces[i].style.top) == yy)  {
				return i;
			}}}
	else {
		return -1;
	}}

//Moves one puzzle peice upward into an empty space
var movePieceUp = function(x, y) {
	var xx = parseInt(x);
	var yy = parseInt(y);
	if (yy > 0) {
		for (var i=0; i<puzzlePieces.length; i++) {
			if (parseInt(puzzlePieces[i].style.top) + 100 == yy && parseInt(puzzlePieces[i].style.left) == xx)  {
				return i;
			}}}
	else {
		return -1;
	}}

//Moves one puzzle peice downward into an empty space
var movePieceDown = function(x, y) {
	var xx = parseInt(x);
	var yy = parseInt(y);
	if (yy < 300) {
		for (var i=0; i<puzzlePieces.length; i++) {
			if (parseInt(puzzlePieces[i].style.top) - 100 == yy && parseInt(puzzlePieces[i].style.left) == xx)  {
				return i;
			}}}
	else {
		return -1;
	}}

var switchPiece = function(state) {
	countMoves+=1;
	var temp = puzzlePieces[state].style.top;
	puzzlePieces[state].style.top = emptySpaceY;
	emptySpaceY = temp;
	temp = puzzlePieces[state].style.left;
	puzzlePieces[state].style.left = emptySpaceX;
	emptySpaceX = temp;
}

var gameOver = function() {
	var flag = true;
	for (var i = 0; i < puzzlePieces.length; i++) {
		var y = parseInt(puzzlePieces[i].style.top);
		var x = parseInt(puzzlePieces[i].style.left);

		if (x != (i%4*100) || y != parseInt(i/4)*100) {
			flag = false;
			break;
		}}
	return flag;
}

// Verify that you have won the game
var winner = function() {
	alert("You win mi G!!... it only took you "+countMoves+" move(s)!... Good job!");
	var clear = document.getElementsByClassName('explanation');
	for (var i = 0; i<clear.length; i++){
		clear[i].innerHTML = "";
	}
	var clear2 =document.getElementsByTagName('a');
	for ( var a =0; a<clear2.length; a++){
		clear2[a].innerHTML = "";
	}
	var winning = document.getElementsByTagName('h1');
	winning[0].innerHTML = "WINNER!!!";
	var win = document.getElementsByTagName('div');
	win[0].innerHTML = document.body.style.backgroundImage ="url(http://media.indiedb.com/images/members/4/3945/3944074/profile/pG_o9V.gif)";
				//window.location.reload(true);
};