let sessionNodes = [];
let sessionSegments = [];
let actionStack = [];
let activeParentNode = null;

//writes points to the console for copy/paste
function logNetwork() {
    console.clear();
    console.log("ROAD NETWORK DATA");

    let consoleOutput = "const roadNetwork = {\n  nodes: {\n";

    sessionNodes.forEach(n => {
        consoleOutput += `    "${n.id}": { x: ${n.x}, y: ${n.y} },\n`;
    });

    consoleOutput += "  },\n  segments: [\n";

    sessionSegments.forEach(s => {
        consoleOutput += `    { from: "${s.from}", to: "${s.to}" },\n`;
    });

    consoleOutput += "  ]\n};";

    console.log(consoleOutput);
}

// pops actions from stack to undo last action
function undoLastAction() {
    // no elements in stack - do nothing
    if (actionStack.length === 0) return;
    
    // retrieves last action from stack
    const lastAction = actionStack.pop();

    if (lastAction.type === 'NODE') {
        // remove node from session
        sessionNodes.pop();

        if(lastAction.marker) {
            map.removeLayer(lastAction.marker);
        }
        
        if (lastAction.line) {
            map.removeLayer(lastAction.line);
            sessionSegments.pop(); // this assumes 1 segment per node added, which may not be the case in the future
        }
        activeParentNode = lastAction.previousParent;
        
    } else if (lastAction.type === 'LOOP') {
        if(lastAction.line) {
            map.removeLayer(lastAction.line);
        }

        // this assumes 1 segment per node added, which may not be the case in the future
        sessionSegments.pop();
    }

    // resets all markers to not active color
    map.eachLayer(layer => {
        if (layer instanceof L.CircleMarker) layer.setStyle({ fillColor: "#3b82f6", radius: 6 });
    });

    // find active marker and set it to active color
    if (activeParentNode && activeParentNode.marker) {
        activeParentNode.marker.setStyle({ fillColor: "#f59e0b", radius: 8 });
    }

    logNetwork();
}

// ctrl+z to undo last action
window.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'z') undoLastAction();
});

// adds point to group with left click
map.on('click', function(e) {
    const gx = (e.latlng.lng - CALIBRATION.offsetX) / CALIBRATION.scale;
    const gy = (e.latlng.lat - CALIBRATION.offsetY) / (CALIBRATION.scale * -1);

    const nodeId = `RN_${sessionNodes.length + 1}`;
    
    const newNode = { 
        id: nodeId, 
        x: Math.round(gx), 
        y: Math.round(gy), 
        latlng: e.latlng 
    };

    // create a marker at position
    const marker = L.circleMarker(e.latlng, {
        radius: 8, 
        fillColor: "#f59e0b", 
        color: "#fff", 
        weight: 2, 
        fillOpacity: 1, 
        interactive: true
    }).addTo(map).bindTooltip(
        nodeId, { 
            permanent: false, 
            direction: 'right' 
        }
    );
    
    newNode.marker = marker;
    
    let line = null;
    let previousParent = activeParentNode;

    // connects new node to last active node
    if (activeParentNode) {
        line = L.polyline([activeParentNode.latlng, e.latlng], {
            color: '#3b82f6', 
            weight: 2, 
            dashArray: '5,5', 
            interactive: false
        }).addTo(map);

        sessionSegments.push({ 
            from: activeParentNode.id, 
            to: newNode.id 
        });
    }

    // selects new active node or creates loop
    marker.on('click', function(markerEvent) {
        L.DomEvent.stopPropagation(markerEvent); // stops parent/child event from being handled

        // loop nodes so that they are bidirectional
        if (markerEvent.originalEvent.shiftKey) {
            if (activeParentNode && activeParentNode.id !== newNode.id) {
                const loopLine = L.polyline([activeParentNode.latlng, newNode.latlng], 
                {
                    color: '#10b981', 
                    weight: 3, 
                    dashArray: '2, 5', 
                    interactive: false
                }).addTo(map);
                
                // pushes nodes onto the stack
                sessionSegments.push({ 
                    from: activeParentNode.id, 
                    to: newNode.id 
                });
                actionStack.push({ 
                    type: 'LOOP', 
                    line: loopLine
                });
                
                console.log(`Loop closed: ${activeParentNode.id} -> ${newNode.id}`);
                logNetwork();
            }
            return;
        }

        // if not a loop, set this node as the active node
        activeParentNode = newNode;
        
        // resets nodes to non-active style
        map.eachLayer(layer => {
            if (layer instanceof L.CircleMarker) { 
                layer.setStyle({ 
                    fillColor: "#3b82f6", 
                    radius: 6 
                });
            }
        });
        // sets this node to active style
        marker.setStyle({ 
            fillColor: "#f59e0b", 
            radius: 8 
        });
        
        console.log(`Branching from: ${newNode.id}`);
    }); // end of nested click event

    // this continues from original click event, resets the markers
    map.eachLayer(layer => {
        if (layer instanceof L.CircleMarker && layer !== marker) {
            layer.setStyle({ fillColor: "#3b82f6", radius: 6 });
        }
    });

    // sets top node as active
    sessionNodes.push(newNode);
    activeParentNode = newNode;
    
    actionStack.push({ 
        type: 'NODE', 
        marker: marker, 
        line: line, 
        previousParent: previousParent 
    });

    logNetwork();
});