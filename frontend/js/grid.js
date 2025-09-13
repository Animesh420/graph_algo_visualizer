import { isStartOrEnd, showMessage } from './utils.js';

export let startNode = null;
export let endNode = null;
export let walls = new Set();

export function setupGrid() {
    const gridContainer = document.getElementById('grid-container');
    const rowsInput = document.getElementById('rows-input');
    const colsInput = document.getElementById('cols-input');
    const startCoord = document.getElementById('start-coord');
    const endCoord = document.getElementById('end-coord');

    function createGrid() {
        gridContainer.innerHTML = '';
        startNode = null;
        endNode = null;
        startCoord.textContent = '';
        endCoord.textContent = '';

        const rows = parseInt(rowsInput.value);
        const cols = parseInt(colsInput.value);

        gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const cell = document.createElement('div');
                cell.id = `${r},${c}`;
                cell.className = 'grid-cell';
                gridContainer.appendChild(cell);
                cell.addEventListener('click', handleCellClick);
            }
        }

        showMessage('Grid is ready. Use the controls to select algorithm and nodes.', 'info');
    }

    function handleCellClick(e) {
        const nodeId = e.target.id;
        const startRadio = document.getElementById('start-radio');
        const endRadio = document.getElementById('end-radio');

        if (startRadio.checked) {
            if (startNode && document.getElementById(startNode)) {
                document.getElementById(startNode).classList.remove('start');
            }
            startNode = nodeId;
            e.target.classList.add('start');
            const [row, col] = nodeId.split(',').map(Number);
            startCoord.textContent = `${row},${col}`;
            showMessage('Start node selected. Now select the end node.', 'info');
            return;
        }
        if (endRadio.checked) {
            if (endNode && document.getElementById(endNode)) {
                document.getElementById(endNode).classList.remove('end');
            }
            endNode = nodeId;
            e.target.classList.add('end');
            const [row, col] = nodeId.split(',').map(Number);
            endCoord.textContent = `${row},${col}`;
            showMessage('End node selected. You can now step through the algorithm.', 'info');
            return;
        }
    }

    // Expose createGrid for other modules
    window.createGrid = function() {
        const gridContainer = document.getElementById('grid-container');
        const rows = 10;
        const cols = 10;
        gridContainer.innerHTML = '';
        gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.textContent = ''; // Optional: show coordinates for debug
                gridContainer.appendChild(cell);
            }
        }
    };
    createGrid();

    // Listen for input changes
    rowsInput.addEventListener('change', createGrid);
    colsInput.addEventListener('change', createGrid);
}

export function renderGrid(rows, cols) {
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

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
                    startNode = [r, c];
                    document.getElementById('start-coord').textContent = `${r},${c}`;
                } else if (endRadio && endRadio.checked) {
                    // Remove previous end
                    const prevEnd = gridContainer.querySelector('.grid-cell.end');
                    if (prevEnd) prevEnd.classList.remove('end');
                    cell.classList.remove('start');
                    cell.classList.add('end');
                    endNode = [r, c];
                    document.getElementById('end-coord').textContent = `${r},${c}`;
                }
            });

            gridContainer.appendChild(cell);
        }
    }
}
