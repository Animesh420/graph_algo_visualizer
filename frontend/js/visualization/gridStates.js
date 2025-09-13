// filepath: frontend/js/visualization/gridStates.js
export function updateGridStates({ visited_node = null, queue = [], path = [], done = false, found = false }, visitedOrder) {
    if (visited_node && !visitedOrder.includes(visited_node)) {
        visitedOrder.push(visited_node);
    }
    document.querySelectorAll('.grid-cell').forEach(cell => {
        cell.classList.remove('visited', 'in-queue', 'path', 'final-path');
        cell.style.animation = 'none';
    });
    visitedOrder.forEach(nodeStr => {
        const [r, c] = nodeStr.split(',').map(Number);
        const cell = document.querySelector(`.grid-cell[data-row="${r}"][data-col="${c}"]`);
        if (cell && !cell.classList.contains('start') && !cell.classList.contains('end')) {
            cell.classList.add('visited');
        }
    });
    queue.forEach(nodeStr => {
        const [r, c] = nodeStr.split(',').map(Number);
        const cell = document.querySelector(`.grid-cell[data-row="${r}"][data-col="${c}"]`);
        if (cell && !cell.classList.contains('start') && !cell.classList.contains('end')) {
            cell.classList.add('in-queue');
        }
    });
    if (path && path.length) {
        path.forEach(nodeStr => {
            const [r, c] = nodeStr.split(',').map(Number);
            const cell = document.querySelector(`.grid-cell[data-row="${r}"][data-col="${c}"]`);
            if (cell) {
                if (done && found) {
                    cell.classList.remove('path');
                    cell.classList.add('final-path');
                    cell.style.animation = 'none';
                    void cell.offsetWidth;
                    cell.style.animation = null;
                } else {
                    cell.classList.add('path');
                }
            }
        });
    }
}
