//create player objects
var player1 = {id: 'p1', name: 'Player 1'};
var player2 = {id: 'p2', name: 'Player 2'};

//start with player1's turn
var whoseTurn = player1;

var clearBtn = document.querySelector('#clear');

//build the board grid collection
var board = document.querySelectorAll('#board div');
var gridCount = board.length;

//square is played
function markPlayed(what,who) {
	what.p = who.id;
	what.className = 'played by ';
	what.className += who.id;

	console.log(what + " was played by " + who.name);
}

//Announce Winner
function announceWinner(player) {
	console.log(player + ' is the WINNER!');
}

//lock the board
function lockBoard(){
	for(var i = 0; i < board.length; i ++) {
		board[i].removeEventListener('click', playMove);
	}
}

function checkForWinner() {
	//check rows
	if((board[0].p == board[1].p && board[0].p == board[2].p) || (board[3].p == board[4].p && board[3].p == board[5].p) || board[6].p == board[7].p && board[6].p == board[8].p) {
		announceWinner(whoseTurn.name);
		lockBoard();
	}
	//check columns
	else if((board[0].p == board[3].p && board[0].p == board[6].p) || (board[1].p == board[4].p && board[1].p == board[7].p) || (board[2].p == board[5].p && board[2].p == board[8].p)) {
		announceWinner(whoseTurn.name);
		lockBoard();
	}
	//check diagonals
	else if((board[0].p == board[4].p && board[0].p == board[8].p) || (board[2].p == board[4].p && board[2].p == board[6].p)) {
		announceWinner(whoseTurn.name);
		lockBoard();
	}
	//check cats cradle
	else if(plays == gridCount) {
		console.log("It's a tie!");
	}
}

//make a move
function playMove(){
	if(!this.classList.contains('played')){
		markPlayed(this, whoseTurn);

		//add 1 to number of plays
		plays ++;
		checkForWinner();

		if(whoseTurn == player1) {
			this.innerHTML = "<i class='fa fa-times'></i>";
			whoseTurn = player2;

		} else {
			this.innerHTML = "<i class='fa fa-circle-o'></i>";
			whoseTurn = player1;
		}
	}
}

function initBoard() {
	for(var i = 0; i < board.length; i ++) {
		//reset board and square classes to ""
		board[i].className = "";
		board[i].innerHTML = "";

		//add click listeners to all squares:
		board[i].addEventListener('click', playMove);

		//make sure none of the board[i].p are equivalent:
		board[i].p = i;
	}
	plays = 0;
	whoseTurn = player1;
}

clearBtn.addEventListener('click', initBoard);
initBoard();

