export function showMessage(message, type) {
    const messageBox = document.getElementById('message-box');
    let colorClass = '';
    switch (type) {
        case 'success':
            colorClass = 'bg-emerald-800 text-white';
            break;
        case 'error':
            colorClass = 'bg-red-800 text-white';
            break;
        case 'info':
            colorClass = 'bg-blue-800 text-white';
            break;
        case 'warn':
            colorClass = 'bg-yellow-800 text-white';
            break;
        default:
            colorClass = 'bg-gray-800 text-white';
    }
    messageBox.textContent = message;
    messageBox.className = `mt-2 text-center text-sm font-medium p-3 rounded-lg opacity-100 transition-opacity duration-300 ${colorClass}`;
}

export function renderNodeChips(panel, nodes, type) {
    panel.innerHTML = '';
    nodes.forEach(nodeId => {
        const chip = document.createElement('span');
        chip.className = `node-chip inline-block px-3 py-1 rounded-full font-mono text-xs font-bold mr-1 mb-1 ${type}`;
        chip.textContent = nodeId;
        panel.appendChild(chip);
    });
}

export function isStartOrEnd(nodeElement) {
    return nodeElement.classList.contains('start') || nodeElement.classList.contains('end');
}
