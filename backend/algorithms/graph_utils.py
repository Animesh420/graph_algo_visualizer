def create_grid_graph(rows, cols):
    graph = {}
    for r in range(rows):
        for c in range(cols):
            node = f"{r},{c}"
            neighbors = []
            for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols:
                    neighbors.append(f"{nr},{nc}")
            graph[node] = neighbors
    return graph

def create_edge_list_graph(edge_list):
    graph = {}
    for edge in edge_list:
        if len(edge) != 2:
            continue
        a, b = edge
        graph.setdefault(a, []).append(b)
        graph.setdefault(b, []).append(a)
    return graph
