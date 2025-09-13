import { isStartOrEnd, showMessage } from './utils.js';

export let startNode = null;
export let endNode = null;
export let walls = new Set();

export function renderGrid(rows, cols) {
    const gridContainer = document.getElementById('grid-container');
    const startCoord = document.getElementById('start-coord');
    const endCoord = document.getElementById('end-coord');
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    startNode = null;
    endNode = null;
    if (startCoord) startCoord.textContent = '';
    if (endCoord) endCoord.textContent = '';

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.dataset.row = r;
            cell.dataset.col = c;

            cell.addEventListener('click', () => {
                const startRadio = document.getElementById('start-radio');
                const endRadio = document.getElementById('end-radio');
                if (startRadio && startRadio.checked) {
                    // Remove previous start
                    const prevStart = gridContainer.querySelector('.grid-cell.start');
                    if (prevStart) prevStart.classList.remove('start');
                    cell.classList.remove('end');
                    cell.classList.add('start');
                    startNode = `${r},${c}`;
                    if (startCoord) startCoord.textContent = `${r},${c}`;
                    showMessage('Start node selected. Now select the end node.', 'info');
                } else if (endRadio && endRadio.checked) {
                    // Remove previous end
                    const prevEnd = gridContainer.querySelector('.grid-cell.end');
                    if (prevEnd) prevEnd.classList.remove('end');
                    cell.classList.remove('start');
                    cell.classList.add('end');
                    endNode = `${r},${c}`;
                    if (endCoord) endCoord.textContent = `${r},${c}`;
                    showMessage('End node selected. You can now step through the algorithm.', 'info');
                }
            });

            gridContainer.appendChild(cell);
        }
    }
    showMessage('Grid is ready. Use the controls to select algorithm and nodes.', 'info');
}

export function setupGrid() {
    const rowsInput = document.getElementById('rows-input');
    const colsInput = document.getElementById('cols-input');
    // Initial render
    renderGrid(Number(rowsInput.value), Number(colsInput.value));
    // Listen for input changes
    rowsInput.addEventListener('change', () => {
        renderGrid(Number(rowsInput.value), Number(colsInput.value));
    });
    colsInput.addEventListener('change', () => {
        renderGrid(Number(rowsInput.value), Number(colsInput.value));
    });
}
