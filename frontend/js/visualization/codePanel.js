import { toggleCollapse } from './collapse.js';

export function renderCodePanel(codeString, highlightLines = []) {
    const codeDisplay = document.getElementById('code-display');
    codeDisplay.innerHTML = '';

    const lines = codeString.split('\n');
    let collapseIdx = lines.findIndex(line => line.includes('COLLAPSE-START'));

    // If no COLLAPSE-START, highlight everything
    if (collapseIdx === -1) collapseIdx = lines.length;

    // Code before COLLAPSE-START (always visible)
    const visibleCode = lines.slice(0, collapseIdx).join('\n');
    // COLLAPSE-START line (toggle button)
    const collapseStartLine = lines[collapseIdx] || '';
    // Code after COLLAPSE-START (collapsed)
    const collapsedCode = lines.slice(collapseIdx + 1).join('\n');

    // Visible section
    const preVisible = document.createElement('pre');
    preVisible.className = 'line-numbers';
    preVisible.setAttribute('data-start', '1');
    if (highlightLines.length === 2 && highlightLines[0] <= collapseIdx) {
        preVisible.setAttribute('data-line', `${highlightLines[0]}-${Math.min(highlightLines[1], collapseIdx)}`);
    }
    const codeVisible = document.createElement('code');
    codeVisible.className = 'language-python';
    codeVisible.textContent = visibleCode;
    preVisible.appendChild(codeVisible);
    codeDisplay.appendChild(preVisible);

    // Collapsed section (if any)
    if (collapseIdx < lines.length) {
        // Toggle button (shows COLLAPSE-START line)
        const toggleDiv = document.createElement('div');
        toggleDiv.className = 'collapse-toggle';
        toggleDiv.style.cursor = 'pointer';
        toggleDiv.textContent = collapseStartLine + ' ▼';
        codeDisplay.appendChild(toggleDiv);

        // Collapsed code block
        const preCollapsed = document.createElement('pre');
        preCollapsed.className = 'line-numbers collapsible';
        preCollapsed.setAttribute('data-start', (collapseIdx + 2).toString());
        preCollapsed.style.display = 'none';
        // Highlight lines only if they are in the collapsed section
        if (highlightLines.length === 2 && highlightLines[1] > collapseIdx) {
            preCollapsed.setAttribute(
                'data-line',
                `${Math.max(1, highlightLines[0] - collapseIdx - 1)}-${highlightLines[1] - collapseIdx - 1}`
            );
        }
        const codeCollapsed = document.createElement('code');
        codeCollapsed.className = 'language-python';
        codeCollapsed.textContent = collapsedCode;
        preCollapsed.appendChild(codeCollapsed);
        codeDisplay.appendChild(preCollapsed);

        // Toggle logic
        toggleDiv.addEventListener('click', () => {
            if (preCollapsed.style.display === 'none') {
                preCollapsed.style.display = '';
                toggleDiv.textContent = collapseStartLine + ' ▲';
            } else {
                preCollapsed.style.display = 'none';
                toggleDiv.textContent = collapseStartLine + ' ▼';
            }
        });

        // Prism highlight for collapsed section
        if (typeof Prism !== 'undefined' && Prism.highlightElement) {
            Prism.highlightElement(codeCollapsed);
        }
    }

    // Prism highlight for visible section
    if (typeof Prism !== 'undefined' && Prism.highlightElement) {
        Prism.highlightElement(codeVisible);
    }
}
