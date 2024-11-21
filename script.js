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
const foundWords = new Set();

function renderGrid() {
  const container = document.getElementById('wordSearch');
  container.innerHTML = '';
  grid.forEach((row, i) => {
    row.forEach((letter, j) => {
      const cell = document.createElement('div');
      cell.textContent = letter;
      cell.dataset.row = i;
      cell.dataset.col = j;
      container.appendChild(cell);
    });
  });
}

function checkWordSelection(start, end) {
  const selected = [];
  const cells = document.querySelectorAll('#wordSearch div');
  cells.forEach(cell => {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    if (
      (row >= start.row && row <= end.row) &&
      (col >= start.col && col <= end.col)
    ) {
      selected.push(cell.textContent);
      cell.classList.add('selected');
    }
  });
  return selected.join('');
}

renderGrid();

