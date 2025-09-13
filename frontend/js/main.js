import { setupControls } from './controls.js';
import { setupVisualization } from './visualization/index.js';
import { renderGrid } from './grid.js';

document.addEventListener('DOMContentLoaded', () => {
    setupControls();
    setupVisualization();
   

    // Set default values for graph type, rows, and cols
    document.getElementById('graph-type-select').value = 'grid';
    document.getElementById('rows-input').value = 5;
    document.getElementById('cols-input').value = 5;

    // Render default 5x5 grid
    renderGrid(5, 5);
});

