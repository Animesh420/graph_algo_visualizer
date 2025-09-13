// filepath: frontend/js/visualization/chips.js
export function renderChips(panelId, nodes, type) {
    const panel = document.getElementById(panelId);
    panel.innerHTML = '';
    nodes.forEach(nodeStr => {
        const chip = document.createElement('span');
        chip.className = `node-chip ${type}`;
        chip.textContent = nodeStr;
        panel.appendChild(chip);
    });
}
