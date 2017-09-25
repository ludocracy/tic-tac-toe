let gameCells = [];
let turns = 0;
let table = document.querySelector('.game-board');
createGameBoard();

// loop through turns
let isXTurn = true;
setTurnHeading();

// make reset button work
document.querySelector('button').addEventListener('click', resetBoard);

// helper functions
function createGameBoard() {
  let tbody = document.createElement('tbody');
  table.appendChild(tbody);
  table.onclick = playTurn;

  for(let i = 0; i < 3; i++) {
    let tr = document.createElement('tr');
    tbody.appendChild(tr);
    gameCells.push([]);
    for(let j = 0; j < 3; j++) {
      let td = document.createElement('td');
      gameCells[gameCells.length-1].push(td);
      tr.appendChild(td);
      td.innerText = '';
      td.setAttribute('class', 'game-cell');;
    }
  }
}

function isGameWon() {
  let win = false;
  [
    [[0,0], [1,0], [2,0]],
    [[0,0], [0,1], [1,2]],
    [[0,0], [1,1], [2,2]],
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]],
    [[2,0], [1,1], [0,2]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]]
  ].forEach(con => {
    if(checkWinCondition(con)) {
      win = true;
      return;
    }
  });
  return win;
}

function checkWinCondition(condition) {
  let isWinning = true;
  condition.forEach(coord => {
    if(gameCells[coord[0]][coord[1]].innerText !== (isXTurn ? 'x' : 'o')) {
      isWinning = false;
      return;
    }
  });

  if(isWinning) {
    condition.forEach(coord => {
      let winningCell = gameCells[coord[0]][coord[1]];
      winningCell.setAttribute('class', `${winningCell.getAttribute('class')} winning`);
    })
  }
  return isWinning;
}

function setTurnHeading(s='') {
  setTimeout(() => {
    let heading = document.querySelector('.whose-turn');
    if(s === '') {
      heading.innerText = 'Turn: ';
      let lastLetter = document.createElement('span');
      lastLetter.innerText = `${isXTurn ? 'x' : 'o'}`;
      heading.appendChild(lastLetter);
    } else {
      heading.innerText = s;
    }
  }, 200);
}

// callbacks
function playTurn(e) {
  let target = e.target;
  let token = isXTurn ? 'x' : 'o';

  if(target.innerText !== '') {
    return;
  }

  turns++;
  target.innerText = token;
  target.setAttribute('class', `${target.getAttribute('class')} played-cell`);

  if(isGameWon()) {
    setTurnHeading(`${token.toUpperCase()} wins! Reset to play again!`);
    table.onclick = null;
  } else if(turns == 9) {
    setTurnHeading('Draw! Reset to play again!');
  } else {
    isXTurn = !isXTurn;
    setTurnHeading();
  }
}

function resetBoard(e) {
  let table = document.querySelector('.game-board');
  table.removeChild(table.children[0]);
  gameCells = [];
  isXTurn = true;
  turns = 0;
  setTurnHeading();
  createGameBoard();
}
