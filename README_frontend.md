# Frontend

## Structure

- `index.html` — Main HTML file.
- `style.css` — Styling (uses Tailwind-inspired palette and custom CSS).
- `js/` — Modular JavaScript:
  - `main.js` — Entry point.
  - `grid.js` — Grid creation and cell logic.
  - `controls.js` — UI controls and event handling.
  - `visualization.js` — Step-by-step visualization logic.
  - `socket.js` — Socket.IO communication.
  - `utils.js` — Helper functions.

## Development

- Edit JS modules in `frontend/js/` for logic changes.
- Use `<script type="module" src="js/main.js"></script>` in `index.html`.
- The frontend is served by Flask at [http://localhost:5000](http://localhost:5000).

## Customization

- To add new UI features, create new JS modules or extend existing ones.
- For new styles, update `style.css`.
- You can also modify `index.html` to change the layout or add new UI elements.

## Tips

- Use the browser console for debugging JavaScript modules.
- Hot-reload by refreshing the browser after making changes.
- Ensure your JS modules use ES6 `export`/