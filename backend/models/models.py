from dataclasses import dataclass, field
from typing import List, Dict, Set, Optional

@dataclass
class AlgoState:
    graph: Dict[str, List[str]]
    visited: Set[str] = field(default_factory=set)
    queue: List[str] = field(default_factory=list)
    parent_map: Dict[str, Optional[str]] = field(default_factory=dict)
    visited_order: List[str] = field(default_factory=list)
    done: bool = False
    found: bool = False
    path: List[str] = field(default_factory=list)
