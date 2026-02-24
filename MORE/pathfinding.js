// builds adjancency list of nodes
function buildGraph(network) {
    const graph = {};

    // initialize as empty
    for (let id in network.nodes) {
        graph[id] = []; 
    }

    // fill graph with each to and from
    network.segments.forEach(seg => {
        graph[seg.from].push(seg.to);
        graph[seg.to].push(seg.from);
    });

    return graph;
}

// pq used for path finding A* algorithm
class PriorityQueue {
    constructor() { 
        this.values = [];
    }
    enqueue(node, priority) {
        this.values.push({ node, priority });
        this.sort();
    }
    dequeue() { 
        return this.values.shift(); 
    }
    sort() { 
        this.values.sort((a, b) => a.priority - b.priority); 
    }
    isEmpty() { 
        return this.values.length === 0; 
    }
}

// calculates distance between node 1 and node 2 using Pythagorus :D
const getDistance = (n1, n2) => Math.sqrt((n2.x - n1.x) ** 2 + (n2.y - n1.y) ** 2);

// A* pathfinding algorithm to find shortest path
function findPath(startId, endId, graph, network) {
    if (!startId || !endId || !network.nodes[startId] || !network.nodes[endId]) return null;

    let nodes = network.nodes;
    let openSet = new PriorityQueue();
    let cameFrom = {};
    let gScore = {}; // cost of the past
    let fScore = {}; // cost of the future

    // initialize nodes to max
    for (let id in nodes) {
        gScore[id] = Infinity;
        fScore[id] = Infinity;
    }

    // set f score to straight line, optimize from there
    gScore[startId] = 0;
    fScore[startId] = getDistance(nodes[startId], nodes[endId]);

    openSet.enqueue(startId, fScore[startId]);

    while (!openSet.isEmpty()) {
        let currentEntry = openSet.dequeue().node;
        if(!currentEntry) break;

        // at the end
        if (currentEntry === endId) {
            return reconstructPath(cameFrom, currentEntry);
        }

        let neighbors = graph[currentEntry] || [];

        // calculates scores for each neighbor
        neighbors.forEach(neighbor => {
            let weight = getDistance(nodes[currentEntry], nodes[neighbor]);
            
            // curent gscore + position and the cost of a straight line from current position
            let tentativeGScore = gScore[currentEntry] + weight;

            // will using another road path be better than a straight line
            if (tentativeGScore < gScore[neighbor]) {
                cameFrom[neighbor] = { 
                    from: currentEntry, 
                    type: 'road' 
                }; 
                gScore[neighbor] = tentativeGScore;
                fScore[neighbor] = gScore[neighbor] + getDistance(nodes[neighbor], nodes[endId]);
                openSet.enqueue(neighbor, fScore[neighbor]);
            }
        });

        // calcualate off road with remaining non-neighboring nodes
        for (let otherId in nodes) {
            if (otherId === currentEntry || neighbors.includes(otherId)) continue;

            let dist = getDistance(nodes[currentEntry], nodes[otherId]);

            // number of pixels on map, only tweaked for Outer Graves, will need to either update this in the future (TODO) or
            // create a list of areas that are not traversible (like mountains or walls) that get checked if the path goes through

            // NOT USING THIS FOR NOW BECAUSE IT DOESNT WORK VERY WELL
            /*
            if (dist < 300) { 
                let offRoadWeight = dist * 5; 
                let tentativeGScore = gScore[currentEntry] + offRoadWeight;

                // same as other score check but for offroads
                if (tentativeGScore < gScore[otherId]) {
                    cameFrom[otherId] = { 
                        from: currentEntry, 
                        type: 'offroad' 
                    };

                    gScore[otherId] = tentativeGScore;
                    fScore[otherId] = gScore[otherId] + getDistance(nodes[otherId], nodes[endId]);
                    openSet.enqueue(otherId, fScore[otherId]);
                }
            }*/
        }
    }

    // no path was found
    return null;
}

// rebuilds the path from the end to the start to get them all in order
function reconstructPath(cameFrom, current) {
    let totalPath = [];

    while (current in cameFrom) {
        let entry = cameFrom[current];
        totalPath.unshift({
            fromId: entry.from,
            toId: current,
            type: entry.type
        });
        current = entry.from;
    }
    return totalPath;
}

// calculates closest node to a position on the map
function getClosestNode(x, y) {
    let closestNodeID = null;
    let minDistance = Infinity;

    for (let id in roadNetwork.nodes) {
        let node = roadNetwork.nodes[id];

        let dist = Math.sqrt(Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2));

        if (dist < minDistance) {
            minDistance = dist;
            closestNodeID = id;
        }
    }
    return closestNodeID;
}

// builds the graph at load time
const roadGraph = buildGraph(roadNetwork);