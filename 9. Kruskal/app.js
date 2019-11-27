// prim graph



// routes
// Assume costs are already calculated.
let unconnected = [
    {
        point: 1, routes: [2, 4, 5],
        links: [{ to: 4, value: 2 }, { to: 2, value: 4 }, { to: 3, value: 5 },]
    },
    {
        point: 2, routes: [2, 4, 1],
        links: [{ to: 1, value: 4 }, { to: 4, value: 1 }, { to: 5, value: 2 },]
    },
    {
        point: 3, routes: [5, 8, 1],
        links: [{ to: 1, value: 5 }, { to: 4, value: 8 }, { to: 7, value: 1 },]
    },
    {
        point: 4, routes: [1, 3, 2, 7, 4, 8],
        links: [{ to: 1, value: 2 }, { to: 3, value: 8 }, { to: 2, value: 1 }, { to: 7, value: 4 }, { to: 6, value: 7 }, { to: 5, value: 3 }, ]
    },
    {
        point: 5, routes: [2, 10, 3],
        links: [{ to: 2, value: 2 }, { to: 4, value: 3 }, { to: 6, value: 10 },]
    },
    {
        point: 6, routes: [10, 7, 6],
        links: [{ to: 5, value: 10 }, { to: 4, value: 7 },{ to: 7, value: 6 },]
    },
    {
        point: 7, routes: [1, 4, 6],
        links: [{ to: 3, value: 1 }, { to: 4, value: 4 }, { to: 6, value: 6 },]
    },
]
