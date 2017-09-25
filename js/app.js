let gameCells, turns, isXTurn;
let table = document.querySelector('.game-board');

resetBoard();
setTurnHeading();

document.querySelector('button').addEventListener('click', resetBoard);

// helper functions
function createGameBoard() {
  let tbody = document.createElement('tbody');
  table.appendChild(tbody);
  table.onclick = playTurn;

  for(let i = 0; i < 3; i++) {
    let tr = document.createElement('tr');
    tbody.appendChild(tr);
    for(let j = 0; j < 3; j++) {
      let td = document.createElement('td');
      td.className = 'game-cell';
      gameCells.push(td);
      tr.appendChild(td);
    }
  }
}

function isGameWon() {
  let win = false;
  [
    [0,1,2], [3,4,5], [6,7,8], [0,4,8], [0,3,6], [1,4,7], [2,4,6], [2,5,8]
  ].forEach(con => {
    if(checkWinCondition(con)) {
      win = true;
      con.forEach(index => {
        gameCells[index].className += ' winning';
      });
      return;
    }
  });
  return win;
}

function checkWinCondition(condition) {
  let isWinning = true;
  condition.forEach(index => {
    if(gameCells[index].innerText !== getToken()) {
      isWinning = false;
      return;
    }
  });

  return isWinning;
}

function setTurnHeading(s='') {
  setTimeout(() => {
    let heading = document.querySelector('.whose-turn');
    if(s === '') {
      heading.innerText = 'Turn: ';
      let lastLetter = document.createElement('span');
      lastLetter.innerText = getToken();
      heading.appendChild(lastLetter);
    } else {
      heading.innerText = s;
    }
  }, 200);
}

// callbacks
function playTurn(e) {
  let target = e.target;

  if(target.innerText !== '') { return; }

  resetMainHeading();
  document.querySelectorAll('h1 div')[turns%3].className = 'rotator';
  turns++;
  target.innerText = getToken();
  target.className += ' played-cell';

  if(isGameWon()) {
    setTurnHeading(`${getToken().toUpperCase()} wins! Reset to play again!`);
    table.onclick = null;
  } else if(turns == 9) {
    setTurnHeading('Draw! Reset to play again!');
  } else {
    isXTurn = !isXTurn;
    setTurnHeading();
  }
}

function getToken() {
  return isXTurn ? 'x' : 'o';
}

function resetBoard(e) {
  table.children[0] ? table.removeChild(table.children[0]) : null;
  gameCells = [];
  isXTurn = true;
  turns = 0;
  resetMainHeading();
  setTurnHeading();
  createGameBoard();
}

// removes classes from h1's inner divs
function resetMainHeading() {
  document.querySelectorAll('h1 div').forEach(div => {
    div.className = '';
  });
}
