// filepath: frontend/js/visualization/index.js
import { renderCodePanel } from './codePanel.js';
import { renderDebugPanel } from './debugPanel.js';
import { renderChips } from './chips.js';
import { updateGridStates } from './gridStates.js';

export let visitedOrder = [];
let codeString = '';

export function setupVisualization() {
    const stepForwardBtn = document.getElementById('step-forward-btn');
    const algorithmSelect = document.getElementById('algorithm-select');
    const graphTypeSelect = document.getElementById('graph-type-select');
    const rowsInput = document.getElementById('rows-input');
    const colsInput = document.getElementById('cols-input');
    const edgeListInput = document.getElementById('edge-list-input');
    const queuePanel = document.getElementById('queue-panel');
    const visitedSetPanel = document.getElementById('visited-set-panel');
    const startRadio = document.getElementById('start-radio');
    const endRadio = document.getElementById('end-radio');
    const resetBtn = document.getElementById('reset-btn');

    let algoStarted = false;
    let isVisualizing = false;

    window.resetVisualization = function() {
        algoStarted = false;
        isVisualizing = false;
        visitedOrder = [];
        renderChips('visited-set-panel', [], 'visited');
        renderChips('queue-panel', [], 'queue');
    };

    stepForwardBtn.addEventListener('click', () => {
        if (!algoStarted) {
            if (!window.startNode || !window.endNode) {
                alert('Please select both start and end nodes.');
                return;
            }
            if (!algorithmSelect.value) {
                alert('Please select an algorithm.');
                return;
            }
            algoStarted = true;
            isVisualizing = true;
            document.querySelectorAll('.visited, .in-queue, .path').forEach(el => {
                el.classList.remove('visited', 'in-queue', 'path');
            });
            visitedOrder = [];
            renderChips('visited-set-panel', [], 'visited');
            renderChips('queue-panel', [], 'queue');
            const graphType = graphTypeSelect.value;
            let data = {
                graphType,
                algorithm: algorithmSelect.value,
                start: window.startNode,
                end: window.endNode,
                walls: Array.from(window.walls)
            };
            if (graphType === 'grid') {
                data.rows = parseInt(rowsInput.value);
                data.cols = parseInt(colsInput.value);
            } else if (graphType === 'edge_list') {
                const edges = edgeListInput.value
                    .split('\n')
                    .map(line => line.trim())
                    .filter(line => line)
                    .map(line => line.split(',').map(s => s.trim()));
                data.edges = edges;
            }
            window.socket.emit('run_algorithm', data);
            setTimeout(() => window.socket.emit('next_step'), 0);
        } else {
            window.socket.emit('next_step');
        }
    });

    resetBtn.addEventListener('click', () => {
        algoStarted = false;
        isVisualizing = false;
        visitedOrder = [];
        renderChips('visited-set-panel', [], 'visited');
        renderChips('queue-panel', [], 'queue');
        startRadio.disabled = false;
        endRadio.disabled = false;
        // Optionally, re-render the grid to clear all states
        if (typeof window.renderGrid === 'function') {
            const rows = parseInt(document.getElementById('rows-input').value, 10);
            const cols = parseInt(document.getElementById('cols-input').value, 10);
            window.renderGrid(rows, cols);
        }
    });

    window.handleAlgoStep = function(data) {
        if (data.error) {
            alert(data.error);
            isVisualizing = false;
            algoStarted = false;
            return;
        }
        updateGridStates(data, visitedOrder);
        renderChips('visited-set-panel', visitedOrder, 'visited');
        renderChips('queue-panel', data.queue || [], 'queue');
        renderCodePanel(codeString, data.highlight_lines || []);
        renderDebugPanel({
            current_node: data.current_node,
            visited: data.visited,
            neighbors: data.neighbors,
            queue: data.queue
        });
    };

    function fetchAndRenderCode(algo) {
        if (!window.socket) {
            setTimeout(() => fetchAndRenderCode(algo), 100);
            return;
        }
        window.socket.emit('get_code', { algo });
        window.socket.once('code', (data) => {
            if (typeof data.code === 'string') {
                codeString = data.code;
                renderCodePanel(codeString);
            } else if (Array.isArray(data.code)) {
                codeString = data.code.join('');
                renderCodePanel(codeString);
            } else {
                codeString = '';
                renderCodePanel('');
            }
        });
    }

    algorithmSelect.addEventListener('change', () => {
        fetchAndRenderCode(algorithmSelect.value);
    });
    fetchAndRenderCode(algorithmSelect.value);
}
