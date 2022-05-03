const container = document.querySelector('.lig4-container')

const criarColunas = (() => {
  for (let i = 1; i <= 7; i++) {
    const column = document.createElement('div');
    column.className = 'columns';
    // column.addEventListener('click', jogabilidade);
    container.appendChild(column);
    for (let j = 1; j <= 6; j++) {
      const cell = document.createElement('div');
      cell.className = 'cells';
      cell.dataset.col = i
      cell.dataset.row = j
      column.appendChild(cell);
    }
  }
})()
