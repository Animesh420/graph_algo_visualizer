# Graph Algorithm Visualizer

A modular, step-by-step visualizer for BFS and DFS pathfinding algorithms on grids and custom graphs.

---

## Quick Start

[start_project.sh](start_project.sh)
````

graph_algo_visualizer/
│
├── backend/
│   ├── app.py
│   ├── algorithms/
│   │   ├── bfs.py
│   │   ├── dfs.py
│   │   └── graph_utils.py
│   ├── models/
│   │   └── models.py
│   ├── errors/
│   │   └── errors.py
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── js/
│       ├── main.js
│       ├── grid.js
│       ├── controls.js
│       ├── visualization.js
│       ├── socket.js
│       └── utils.js
│
├── start_project.sh
├── README.md
├── README_backend.md
└── README_frontend.md