const grid = [
  ['S', 'E', 'O', 'R', 'A', 'N', 'D', 'O', 'M', 'X'],
  ['C', 'T', 'R', 'F', 'A', 'C', 'E', 'B', 'O', 'O'],
  ['O', 'O', 'O', 'C', 'O', 'N', 'T', 'E', 'N', 'T'],
  ['N', 'S', 'I', 'T', 'R', 'A', 'F', 'F', 'I', 'C'],
  ['T', 'S', 'O', 'C', 'I', 'A', 'L', 'E', 'T', 'R'],
  ['E', 'A', 'N', 'A', 'L', 'Y', 'T', 'I', 'C', 'S'],
  ['N', 'D', 'R', 'A', 'B', 'R', 'A', 'N', 'D', 'I'],
  ['T', 'R', 'A', 'F', 'F', 'I', 'C', 'A', 'B', 'C'],
  ['B', 'O', 'U', 'R', 'B', 'L', 'A', 'B', 'R', 'E'],
  ['D', 'I', 'G', 'I', 'T', 'A', 'L', 'B', 'O', 'G'],
];

const words = ['SEO', 'CONTENT', 'BRANDING', 'ANALYTICS', 'SOCIAL', 'TRAFFIC'];
let score = 0;
let startCell = null;

function renderGrid() {
  const container = document.getElementById('wordSearch');
  container.innerHTML = '';
  grid.forEach((row, i) => {
    row.forEach((letter, j) => {
      const cell = document.createElement('div');
      cell.textContent = letter;
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener('mousedown', handleMouseDown);
      cell.addEventListener('mouseup', handleMouseUp);
      container.appendChild(cell);
    });
  });
}

function handleMouseDown(event) {
  startCell = event.target;
}

function handleMouseUp(event) {
  if (!startCell) return;
  const endCell = event.target;
  const selectedWord = getSelectedWord(startCell, endCell);
  if (words.includes(selectedWord) && !foundWords.has(selectedWord)) {
    highlightSelection(startCell, endCell);
    foundWords.add(selectedWord);
    updateScore();
    markWordFound(selectedWord);
  }
  startCell = null;
}

function getSelectedWord(start, end) {
  const startRow = parseInt(start.dataset.row);
  const startCol = parseInt(start.dataset.col);
  const endRow = parseInt(end.dataset.row);
  const endCol = parseInt(end.dataset.col);

  let word = '';
  if (startRow === endRow) {
    // Horizontal selection
    const minCol = Math.min(startCol, endCol);
    const maxCol = Math.max(startCol, endCol);
    for (let col = minCol; col <= maxCol; col++) {
      word += grid[startRow][col];
    }
  } else if (startCol === endCol) {
    // Vertical selection
    const minRow = Math.min(startRow, endRow);
    const maxRow = Math.max(startRow, endRow);
    for (let row = minRow; row <= maxRow; row++) {
      word += grid[row][startCol];
    }
  }
  return word;
}

function highlightSelection(start, end) {
  const startRow = parseInt(start.dataset.row);
  const startCol = parseInt(start.dataset.col);
  const endRow = parseInt(end.dataset.row);
  const endCol = parseInt(end.dataset.col);

  const cells = document.querySelectorAll('#wordSearch div');
  cells.forEach(cell => {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    if (
      (row >= startRow && row <= endRow || row >= endRow && row <= startRow) &&
      (col >= startCol && col <= endCol || col >= endCol && col <= startCol)
    ) {
      cell.classList.add('selected');
    }
  });
}

function updateScore() {
  score += 10; // Incrementa 10 puntos por cada palabra encontrada.
  document.getElementById('score').textContent = score;
}

function markWordFound(word) {
  const wordListItems = document.querySelectorAll('.word-list li');
  wordListItems.forEach(item => {
    if (item.textContent.toUpperCase() === word.toUpperCase()) {
      item.style.textDecoration = 'line-through';
      item.style.color = 'green';
    }
  });
}

renderGrid();