def bfs_generator(graph, start_node, end_node, wall_nodes):
    import collections
    visited = set(wall_nodes)
    queue = collections.deque([start_node])
    parent_map = {start_node: None}

    while queue:
        current_node = queue.popleft()
        if current_node in visited:
            continue
        visited.add(current_node)

        neighbors = list(graph.get(current_node, []))
        for neighbor in neighbors:
            if neighbor not in visited and neighbor not in queue:
                queue.append(neighbor)
                parent_map[neighbor] = current_node

        # --- COLLAPSE-START ---
        # MAINTENANCE CODE (not part of the algorithm)
        HIGHLIGHT_START = 6
        HIGHLIGHT_END = 17
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
            'current_node': str(current_node),
            'neighbors': [str(n) for n in neighbors],
            'visited': [str(n) for n in visited],
            'queue': [str(n) for n in queue],
            'highlight_lines': [HIGHLIGHT_START, HIGHLIGHT_END],  # Added for highlighting
            'visited_node_raw': current_node,            # (optional, for debugging)
            'done': done,
            'found': done,
            'path': [str(n) for n in path] if done else None,
            'step_id': 'EXPAND',
        }
        if done:
            yield {
                'visited_node': str(current_node),
                'queue': [str(n) for n in queue],
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
    # --- COLLAPSE-END ---
