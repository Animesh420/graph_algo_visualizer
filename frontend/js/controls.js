import { renderGrid } from './grid.js';

export function setupControls() {
    const graphTypeSelect = document.getElementById('graph-type-select');
    const edgeListInputContainer = document.getElementById('edge-list-input-container');
    const rowsInput = document.getElementById('rows-input');
    const colsInput = document.getElementById('cols-input');
    const visualizeBtn = document.getElementById('visualize-btn');

    graphTypeSelect.addEventListener('change', () => {
        if (graphTypeSelect.value === 'edge_list') {
            edgeListInputContainer.classList.remove('hidden');
            rowsInput.disabled = true;
            colsInput.disabled = true;
        } else {
            edgeListInputContainer.classList.add('hidden');
            rowsInput.disabled = false;
            colsInput.disabled = false;
        }
    });

    visualizeBtn.addEventListener('click', () => {
        if (graphTypeSelect.value === 'grid') {
            const rows = parseInt(rowsInput.value, 10);
            const cols = parseInt(colsInput.value, 10);
            renderGrid(rows, cols);
        }
        // else: handle edge_list visualization if needed
    });
}
