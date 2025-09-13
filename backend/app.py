import collections
import random
import os
from flask import Flask, send_from_directory, request, jsonify
from flask_socketio import SocketIO, emit
from gevent import monkey
from algorithms.bfs import bfs_generator
from algorithms.dfs import dfs_generator
from algorithms.graph_utils import create_grid_graph, create_edge_list_graph

monkey.patch_all()

app = Flask(__name__, static_folder='../frontend', template_folder='../frontend')
app.config['SECRET_KEY'] = 'a_very_secret_key'
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='gevent')

# --- Algorithm State ---
algo_states = {}

def get_code_path(algo):
    """
    Returns the file path for the requested algorithm code.
    """
    # Map algorithm names to filenames
    algo_map = {
        'bfs': 'bfs.py',
        'dfs': 'dfs.py',
        # Add more algorithms here as needed
    }
    filename = algo_map.get(algo.lower())
    if not filename:
        raise ValueError(f"Unknown algorithm: {algo}")

    # Assuming all algorithm files are in 'backend/algorithms'
    base_dir = os.path.dirname(os.path.abspath(__file__))
    algo_dir = os.path.join(base_dir, 'algorithms')
    code_path = os.path.join(algo_dir, filename)

    if not os.path.isfile(code_path):
        raise FileNotFoundError(f"Algorithm code file not found: {code_path}")

    return code_path

# --- SocketIO Handlers ---
@socketio.on('run_algorithm')
def handle_run_algorithm(data):
    graph_type = data.get('graphType')
    algorithm = data.get('algorithm')
    start_node = data.get('start')
    end_node = data.get('end')
    walls = data.get('walls', [])

    if graph_type == 'grid':
        rows = data['rows']
        cols = data['cols']
        graph = create_grid_graph(rows, cols)
    elif graph_type == 'edge_list':
        edge_list = data.get('edges', [])
        graph = create_edge_list_graph(edge_list)
    else:
        emit('algo_step', {'error': 'Unknown graph type.'})
        return

    # Convert start_node and end_node to string if they are lists or tuples
    if isinstance(start_node, (list, tuple)):
        start_node = f"{start_node[0]},{start_node[1]}"
    if isinstance(end_node, (list, tuple)):
        end_node = f"{end_node[0]},{end_node[1]}"

 

    if start_node not in graph or end_node not in graph:
        emit('algo_step', {'error': 'Start or end node not found in the graph.'})
        return

    if algorithm == 'bfs':
        algo_states[request.sid] = {
            'type': 'bfs',
            'generator': bfs_generator(graph, start_node, end_node, walls)
        }
    elif algorithm == 'dfs':
        algo_states[request.sid] = {
            'type': 'dfs',
            'generator': dfs_generator(graph, start_node, end_node, walls)
        }
    else:
        emit('algo_step', {'error': 'Invalid algorithm specified.'})

@socketio.on('next_step')
def handle_next_step():
    algo = algo_states.get(request.sid)
    if not algo:
        emit('algo_step', {'error': 'No algorithm running.'})
        return
    try:
        result = next(algo['generator'])
        emit('algo_step', result)
    except StopIteration:
        emit('algo_step', {'done': True, 'found': False})

@socketio.on('get_code')
def handle_get_code(data):
    algo = data['algo']
    code_path = get_code_path(algo)
    with open(code_path, 'r') as f:
        code = f.read()
    emit('code', {'code': code})

# --- Static file serving and app run
if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)