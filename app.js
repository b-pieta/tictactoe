const gameBoard = document.querySelector('#board');
const info = document.querySelector('#info');
const newGameButton = document.querySelector('#new-game');
let turn;
const winningCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

function createGameboard() {
	const emptyTiles = ' '.repeat(9).split('');
	const tileGrid = emptyTiles
		.map((t) => `<button class="tile"></button>`)
		.join('');

	gameBoard.innerHTML = tileGrid;
	turn = 'X';
	info.textContent = `${turn}'s turn`;

	gameBoard.addEventListener('click', handleGameBoardClick);
}

createGameboard();

function updateTurn() {
	turn = turn === 'X' ? 'O' : 'X';
	info.textContent = `${turn}'s turn`;
}

function computerMove() {
	const emptyTiles = [...document.querySelectorAll('.tile:not([data-value])')];
	const randomIndex = Math.floor(Math.random() * emptyTiles.length);
	emptyTiles[randomIndex].dataset.value = turn;
	if (!checkScore()) {
	  updateTurn();
	}
  }

function checkScore() {
	const allTiles = [...document.querySelectorAll('.tile')];
	const tileValues = allTiles.map((t) => t.dataset.value);
	const isWinner = winningCombos.some((combo) => {
		const [a, b, c] = combo;
		return (
			tileValues[a] &&
			tileValues[a] === tileValues[b] &&
			tileValues[b] === tileValues[c]
		);
	});

	if (isWinner) {
		info.textContent = `${turn} won!`;
		gameBoard.removeEventListener('click', handleGameBoardClick);
		return true;
	}
	return false;
}

function handleGameBoardClick(e) {
	const valueExists = e.target.dataset.value;
	if (!valueExists) {
		e.target.dataset.value = turn;
		if (!checkScore()) {
			updateTurn();
			computerMove();
		}
	}
}



function resetGame() {
	const allTiles = [...document.querySelectorAll('.tile')];
	allTiles.forEach((tile) => {
		tile.removeAttribute('data-value');
	});
	gameBoard.addEventListener('click', handleGameBoardClick);
	turn = 'X';
	info.textContent = `${turn}'s turn`;
}

newGameButton.addEventListener('click', resetGame);
