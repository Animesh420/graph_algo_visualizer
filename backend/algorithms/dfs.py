import random

def dfs_generator(graph, start_node, end_node, wall_nodes):
    stack = [start_node]
    visited = set(wall_nodes)
    parent_map = {start_node: None}

    while stack:
        current_node = stack.pop()
        if current_node in visited:
            continue
        visited.add(current_node)

        added_nodes = []
        neighbors = list(graph.get(current_node, []))
        for neighbor in neighbors:
            if neighbor not in visited and neighbor not in stack:
                stack.append(neighbor)
                parent_map[neighbor] = current_node
                added_nodes.append(neighbor)
        done = current_node == end_node
        path = []
        if done:
            n = current_node
            while n is not None:
                path.append(n)
                n = parent_map.get(n)
            path = path[::-1]
        yield {
            'visited_node': str(current_node),           # Only the node just visited
            'queue': [str(n) for n in stack],            # The whole stack
            'visited_node_raw': current_node,            # (optional, for debugging)
            'added_nodes': [str(n) for n in added_nodes],
            'done': done,
            'found': done,
            'path': [str(n) for n in path] if done else None,
            'step_id': 'EXPAND'
        }
        if done:
            yield {
                'visited_node': str(current_node),
                'queue': [str(n) for n in stack],
                'path': [str(n) for n in path],
                'found': True,
                'done': True
            }
            return
    yield {
        'done': True,
        'found': False,
        'queue': [],
        'path': None,
        'step_id': 'DONE'
    }
