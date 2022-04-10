const getCostForNode = (graph, node, root) => {
    return graph[node][root];
};

const minCost = (graph, baseRoot, currentNode = baseRoot, visited = []) => {
    if (visited.length === Object.keys(graph).length - 1) {
        return getCostForNode(graph, currentNode, baseRoot);
    }

    visited.push(currentNode);

    let minimumCost = Math.min();
    for (let node in graph[currentNode]) {
        if (!visited.includes(node)) {
            const childCost = minCost(graph, baseRoot, node, [...visited]);
            const currentNodeCost = getCostForNode(graph, currentNode, node) + childCost;

            if (currentNodeCost < minimumCost) {
                minimumCost = currentNodeCost;
            }
        }
    }

    return minimumCost;
};

const traverse = (graph, toVisit) => {};

const graph = {
    a: {
        b: 10,
        c: 15,
        d: 20,
    },
    b: {
        a: 5,
        c: 9,
        d: 10,
    },
    c: {
        a: 6,
        b: 13,
        d: 12,
    },
    d: {
        a: 8,
        b: 8,
        c: 9,
    },
};

console.log(minCost(graph, "a"));
