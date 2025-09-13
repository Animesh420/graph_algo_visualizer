// filepath: frontend/js/visualization/debugPanel.js
export function renderDebugPanel({ current_node, visited, neighbors, queue }) {
    const debugPanel = document.getElementById('debug-panel');
    debugPanel.innerHTML = `
        <div class="debug-title">Debug Info</div>
        <div class="debug-var"><b>current_node:</b> ${pyRepr(current_node ?? '')}</div>
        <div class="debug-var"><b>visited:</b> ${pyRepr(visited ?? [])}</div>
        <div class="debug-var"><b>neighbors:</b> ${pyRepr(neighbors ?? [])}</div>
        <div class="debug-var"><b>queue:</b> ${pyRepr(queue ?? [])}</div>
    `;
}

function pyRepr(val) {
    if (Array.isArray(val)) return `[${val.map(pyRepr).join(', ')}]`;
    if (typeof val === 'string') {
        const tupleMatch = val.match(/^(-?\d+),\s*(-?\d+)$/);
        if (tupleMatch) return `(${tupleMatch[1]}, ${tupleMatch[2]})`;
        return `'${val}'`;
    }
    if (val === undefined || val === null) return 'None';
    return String(val);
}
