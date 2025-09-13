export function toggleCollapse(idx) {
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
}