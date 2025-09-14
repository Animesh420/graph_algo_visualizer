export function toggleCollapse(idx) {
    let collapsed = true;
    document.querySelectorAll(`.collapsible-${idx}`).forEach(el => {
        if (el.style.display === 'none') {
            el.style.display = '';
            collapsed = false;
        } else {
            el.style.display = 'none';
            collapsed = true;
        }
    });
    return collapsed;
}