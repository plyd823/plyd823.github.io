let currentRouteLine = null;
let routeDecorator = null;

// Converts the in-game coords to the pixel location of the map
function gameToMap(gx, gy) {
    const x = (gx * CALIBRATION.scale) + CALIBRATION.offsetX;
    const y = (gy * -1 * CALIBRATION.scale) + CALIBRATION.offsetY; 
    return [y, x]; 
}

// displays the route on-screen
function renderRoute() {
    const routeList = document.getElementById('route-list');
    const statsContainer = document.getElementById('stats-container');
    const progressPercentText = document.getElementById('total-progress-percent');
    
    routeList.innerHTML = '';
    let pathPoints = [];
    const currentLegPoints = [];
    
    activeRoute = getFilteredRoute();

    linesLayer.clearLayers();

    // Calculate Totals By Category
    const totalsByType = {};
    activeRoute.forEach(step => {
        if (!step.id || step.id.endsWith('_START')) return;

        const locData = locationLibrary[step.id];
        if (!locData) return;
        
        const dataCat = MISSION_TYPES.includes(locData.type) ? 'mission' : locData.type;
        
        if(!totalsByType[dataCat]) {
            totalsByType[dataCat] = 0;
        }
        totalsByType[dataCat] += 1;
    });

    // Calculate Current Progress
    const progressByType = {};
    const lastCompletedIndex = currentActiveIndex !== null ? currentActiveIndex : 0;
    for (let i = 0; i <= lastCompletedIndex; i++) {
        const stepId = activeRoute[i] && activeRoute[i].id;
        if (!stepId || stepId.endsWith('_START')) continue;

        const locData = locationLibrary[stepId];
        const dataCat = MISSION_TYPES.includes(locData.type) ? 'mission' : locData.type;

        if(!progressByType[dataCat]) {
            progressByType[dataCat] = 0;
        }

        progressByType[dataCat] += 1;
    }

    // Display percentage in top-right and avoid dividing by zero
    let percent = 0;
    if(activeRoute.length > 1) {
        percent = Math.round((lastCompletedIndex / (activeRoute.length - 1)) * 100);
    }
    progressPercentText.innerText = percent + '% COMPLETE';

    // Render step by step
    activeRoute.forEach((step, index) => {
        const locData = locationLibrary[step.id];
        if (!locData) return;

        const translatedCoords = gameToMap(
            locData.game_coords.x, 
            locData.game_coords.y
        );

        // Draw path between previous step and current step
        if (index > 0) {
            const prevStep = activeRoute[index - 1];
            const prevData = locationLibrary[prevStep.id];

            if (!step.fast_travel && prevData){
                const startNode = getClosestNode(
                    prevData.game_coords.x, 
                    prevData.game_coords.y
                );
                const endNode = getClosestNode(
                    locData.game_coords.x, 
                    locData.game_coords.y
                );
                const computedPath = findPath(startNode, endNode, roadGraph, roadNetwork);

                // draw from start to end node
                if (computedPath && computedPath.length > 0) {
                    const isIndexActive = index === currentActiveIndex;

                    // Set Waypoints
                    const startWaypoint = gameToMap(
                        prevData.game_coords.x, 
                        prevData.game_coords.y
                    );
                    const firstNode = roadNetwork.nodes[computedPath[0].fromId];
                    const jumpStart = [
                        startWaypoint, 
                        gameToMap(firstNode.x, firstNode.y)
                    ];
                    
                    pathPoints = pathPoints.concat(jumpStart);
                    if (isIndexActive) {
                        L.polyline(jumpStart, { 
                            color: '#00cb00', 
                            weight: 6, 
                            opacity: 0.6, 
                            lineJoin: 'round',
                            lineCap: 'round' 
                        }).addTo(linesLayer);
                    }

                    // draw each segment along road
                    computedPath.forEach(seg => {
                        const nodeA = roadNetwork.nodes[seg.fromId];
                        const nodeB = roadNetwork.nodes[seg.toId];

                        const segmentPoints = [
                            gameToMap(nodeA.x, nodeA.y), 
                            gameToMap(nodeB.x, nodeB.y)
                        ];
                        
                        pathPoints.push(segmentPoints[1]);
                        if (isIndexActive) {
                            L.polyline(segmentPoints, { 
                                color: '#00cb00', 
                                weight: 6, 
                                opacity: seg.type === 'road' ? 1.0 : 0.6, // Road vs Off-road
                            }).addTo(linesLayer);
                        }
                    });

                    const lastNode = roadNetwork.nodes[
                        computedPath[computedPath.length - 1].toId
                    ];
                    const endWaypoint = translatedCoords;
                    const jumpEnd = [
                        gameToMap(lastNode.x, lastNode.y), 
                        endWaypoint
                    ];

                    pathPoints.push(endWaypoint);
                    if (isIndexActive) {
                        L.polyline(jumpEnd, { 
                            color: '#00cb00', 
                            weight: 6, 
                            opacity: 0.6, 
                        }).addTo(linesLayer);
                    }
                }
            }
        } else {
            // first point in route
            pathPoints.push(translatedCoords);
        }

        addMarker(index, translatedCoords, locData);

        // Skip UI Card for for first entry
        if (index === 0) return;

        const isActive = currentActiveIndex === index;

        const card = document.createElement('div');

        card.id = `step-${index}`;
        card.className = 
            `p-6 border-b border-white/5 cursor-pointer transition-all hover:bg-zinc-900/50 
            ${isActive ? 'active-step' : ''}`;

        card.onclick = () => selectStep(index);

        // creates each card, could probably look better
        card.innerHTML = `
            <div class="flex items-start gap-4">
                <div class="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-orange-500 border border-orange-500/20">
                    ${index}
                </div>
                <div class="flex-grow min-w-0">
                    <span class="text-[9px] text-orange-500/50 font-black uppercase tracking-widest truncate">
                        ${locData.type}
                    </span>
                    <h3 class="font-bold text-gray-100 text-lg leading-tight truncate">
                        ${locData.name}
                    </h3>
                </div>
            </div>
        `;

        //actually add card
        routeList.appendChild(card);
    });

    // all object filter types - TODO: FIX DEATH RACE STUFF
    const trackable = [
        'mission', 
        'camp', 
        'scavloc', 
        'minefield', 
        'balloon', 
        'sniper', 
        'encounter', 
        'death race start', 
        'scarecrow'
    ];
    
    let statsHtml = '';
    
    trackable.forEach(t => {
        if (!totalsByType[t]) return;
            
        const currentOfType = progressByType[t] || 0;
        const totalOfType = totalsByType[t];
        const percentOfType = (currentOfType / totalOfType) * 100;
        
        // dynamically adjust brightness of icon based on percentage
        const dynamicBrightness = 0.5 + (percentOfType / 100) * 0.7;
        
        let iconUrl;

        // Set mission icon to icon of feral man (which is mission icon)
        if(t === 'mission') {
            iconUrl = icons['feral man'].options.iconUrl;
        } else {
            if(icons[t] && icons[t].options.iconUrl) {
                iconUrl = icons[t].options.iconUrl;
            } else {
                iconUrl = icons.default.options.iconUrl;
            }
        }


        let label = t;
        if (t === 'scavloc') label = 'scrap';
        if (t === 'death race start') label = 'race';
        
        // create section of route progress
        statsHtml += `
            <div class="flex flex-col items-center group">
                <div class="relative mb-2">
                    <img src="${iconUrl}" 
                        style="filter: brightness(${dynamicBrightness});"
                        class="w-10 h-10 object-contain transition-all duration-500 
                        ${currentOfType === totalOfType ? 'scale-110 drop-shadow-[0_0_8px_#f59e0b]' : ''}">

                    ${
                        currentOfType === totalOfType 
                        ? '<div class="absolute inset-0 bg-orange-500/10 blur-xl rounded-full animate-pulse"></div>' 
                        : ''
                    }
                </div>

                <span class="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">
                    ${label}
                </span>
                
                <div class="flex items-baseline gap-0.5 mb-2">
                    <span class="text-[10px] font-mono font-black text-white">
                        ${currentOfType}
                    </span>

                    <span class="text-[8px] font-mono font-black text-zinc-600">
                        /${totalOfType}
                    </span>
                </div>

                <div class="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div class="h-full bg-orange-500 transition-all duration-700 ease-out" 
                        style="width: ${percentOfType}%">
                    </div>
                </div>
            </div>
        `;
    });
    statsContainer.innerHTML = statsHtml;

    updateLines(pathPoints, currentLegPoints);
}

function drawRouteOnMap(path) {
    // clear any former layers
    if (currentRouteLine) {
        map.removeLayer(currentRouteLine);
    }
    if (routeDecorator) {
        map.removeLayer(routeDecorator);
    }

    // convert node id to map coords
    const latlngs = path.map(id => {
        const node = roadNetwork.nodes[id];
        return gameToMap(node.x, node.y);
    });

    currentRouteLine = L.polyline(latlngs, {
        color: '#00f2ff', 
        weight: 4,
        opacity: 0.8,
        dashArray: '10, 10'
    }).addTo(map);

    // adds arrows to route line
    routeDecorator = L.polylineDecorator(currentRouteLine, {
        patterns: [{
            offset: 20,
            repeat: 50,
            symbol: L.Symbol.arrowHead({
                pixelSize: 10,
                pathOptions: { 
                    fillOpacity: 1, 
                    color: '#00f2ff', 
                    stroke: false 
                }
            })
        }]
    }).addTo(map);
}

// clicking a card in the sidebar
function selectStep(stepIndex) {
    currentActiveIndex = stepIndex;
    
    const currData = locationLibrary[activeRoute[stepIndex].id];
    const prevData = locationLibrary[activeRoute[stepIndex - 1].id];
    
    if (!currData || !prevData) return;

    const targetCoords = gameToMap(
        currData.game_coords.x, 
        currData.game_coords.y
    );
    const startCoords = gameToMap(
        prevData.game_coords.x, 
        prevData.game_coords.y
    );
    
    const legBounds = L.latLngBounds([startCoords, targetCoords]);
    
    // pans camera to leg position
    map.flyToBounds(legBounds, { 
        padding: [100, 100], 
        duration: 1.2,
        maxZoom: 0 // could zoom in but looks weird
    });

    renderRoute(); // redraw the route
    
    // scroll card in sidebar into center
    const card = document.getElementById(`step-${stepIndex}`);
    if (card) {
        card.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
    
    // right now, the pop up kind of just gets in the way. May change it later
    /*
    if (markers[stepIndex]) { 
        markers[stepIndex].openPopup(); 
    }*/
}

window.addEventListener('keydown', function(e) {
    if (!activeRoute || activeRoute.length === 0) return;

    let newIndex;

    if(currentActiveIndex === null) {
        newIndex = 0;
    } else {
        newIndex = currentActiveIndex;
    }

    if (e.key === 'ArrowDown') {
        e.preventDefault(); // prevents screen scroll
        if (newIndex < activeRoute.length - 1) {
            newIndex++;
            selectStep(newIndex);
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault(); // prevents screen scroll
        if (newIndex > 0) {
            newIndex--;
            selectStep(newIndex);
        }
    }
});