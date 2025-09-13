// filepath: frontend/js/visualization/codePanel.js
export function renderCodePanel(codeString, highlightLines = []) {
    const codeDisplay = document.getElementById('code-display');
    codeDisplay.innerHTML = '';

    // Split code into lines for collapse logic
    const lines = typeof codeString === 'string' ? codeString.split('\n') : [];
    let inCollapsed = false;
    let collapseStartIdx = null;
    let htmlLines = [];

    lines.forEach((line, idx) => {
        if (line.includes('COLLAPSE START')) {
            collapseStartIdx = idx;
            htmlLines.push(
                `<span class="collapse-toggle" data-collapse-idx="${collapseStartIdx}">
                    <button class="collapse-btn" onclick="window.toggleCollapse(${collapseStartIdx})">▼ Collapse</button>
                    ${escapeHtml(line)}
                </span>`
            );
            inCollapsed = true;
        } else if (line.includes('COLLAPSE END')) {
            htmlLines.push(`<span class="collapse-end">${escapeHtml(line)}</span>`);
            inCollapsed = false;
            collapseStartIdx = null;
        } else if (inCollapsed && collapseStartIdx !== null) {
            htmlLines.push(`<span class="collapsible collapsible-${collapseStartIdx}" style="display:none">${escapeHtml(line)}</span>`);
        } else {
            htmlLines.push(`<span>${escapeHtml(line)}</span>`);
        }
    });

    // Prepare code block with Prism.js classes
    const pre = document.createElement('pre');
    pre.className = 'line-numbers';
    pre.setAttribute('data-start', '1');
    const code = document.createElement('code');
    code.className = 'language-python';
    code.innerHTML = htmlLines.join('\n');
    pre.appendChild(code);
    codeDisplay.appendChild(pre);

    // Prism highlight
    if (window.Prism && window.Prism.highlightElement) {
        window.Prism.highlightElement(code);
    }

    // Highlight specific lines (after Prism renders)
    if (highlightLines.length === 2) {
        const [start, end] = highlightLines;
        setTimeout(() => {
            const rows = pre.querySelectorAll('.line-numbers-rows > span');
            rows.forEach((span, idx) => {
                const lineNum = idx + 1;
                if (lineNum >= start && lineNum <= end) {
                    span.classList.add('prism-highlighted-line');
                } else {
                    span.classList.remove('prism-highlighted-line');
                }
            });
        }, 0);
    }
}

// Helper to escape HTML special characters
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

// Add this to window so inline onclick works
window.toggleCollapse = function(idx) {
    let collapsed = false;
    document.querySelectorAll(`.collapsible-${idx}`).forEach(el => {
        if (el.style.display === 'none') {
            el.style.display = '';
            collapsed = false;
        } else {
            el.style.display = 'none';
            collapsed = true;
        }
    });
    // Change button text
    const btn = document.querySelector(`.collapse-toggle[data-collapse-idx="${idx}"] .collapse-btn`);
    if (btn) btn.textContent = collapsed ? '► Expand' : '▼ Collapse';
};
