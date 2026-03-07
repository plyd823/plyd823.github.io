let currentRouteLine = null;
let routeDecorator = null;

let currentStepIndex = 0;
const ICON_WINDOW_SIZE = 3;

const LEG_COLORS = [
    '#24fc03',
    '#03fcbe',
    '#037ffc',
    '#9803fc',
    '#fc0388',
    '#fc0303',
    '#fc7b03',
    '#fcf403',
];

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

    if(!routeList) return;
    
    routeList.innerHTML = '';
    let pathPoints = [];
    const currentLegPoints = [];

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
    const lastCompletedIndex = currentStepIndex !== null ? currentStepIndex : 0;
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

    linesLayer.clearLayers();
    for (let i = 0; i < markers.length; i++) {
        if (markers[i]) {
            map.removeLayer(markers[i]);
        }
    }
    markers = [];

    const startIndex = Math.max(0, currentStepIndex - ICON_WINDOW_SIZE);
    const endIndex = Math.min(activeRoute.length - 1, currentStepIndex + ICON_WINDOW_SIZE);

    // Render step by step
    activeRoute.forEach((step, index) => {
        const locData = locationLibrary[step.id];
        if (!locData) return;

        const translatedCoords = gameToMap(
            locData.game_coords.x, 
            locData.game_coords.y
        );

        if (index >= startIndex && index <= endIndex) {
            let iconOpacity = 0.2;
            if(index === currentStepIndex || index === currentStepIndex - 1) {
                iconOpacity = 1.0;
            } else if (index === currentStepIndex + 1) {
                iconOpacity = 0.5;
            }

            addMarker(index, translatedCoords, locData, iconOpacity);
            
            // Highlight the current active marker
            if (index === currentStepIndex && markers[index]) {
                markers[index].getElement()?.classList.add('active-step-marker');
            }
        }

        const isActive = currentStepIndex === index;

        const card = document.createElement('div');
        
        card.id = `step-${index}`;
        card.className = 
            `p-6 border-b border-white/5 cursor-pointer transition-all hover:bg-zinc-900/50 
            ${isActive ? 'active-step' : ''}`;

        card.onclick = () => selectStep(index);

        // creates each card, could probably look better
        card.innerHTML = `
            <div class="flex items-start gap-4">
                <div class="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-[10px] font-bold 
                    ${step.fast_travel
                        ? `text-purple-500 border border-purple-500/20`
                        : `text-green-500 border border-green-500/20`}">
                    ${index}
                </div>
                <div class="flex-grow min-w-0">
                    <span class="text-[9px] 
                        ${step.fast_travel 
                            ? `text-purple-500/50`
                            : `text-green-500/50`} 
                    font-black uppercase tracking-widest truncate">
                        ${locData.type}
                    </span>
                    <h3 class="font-bold text-gray-100 text-lg leading-tight truncate">
                        ${locData.name}
                    </h3>

                    ${step.note ? `
                        <p class = "text-[14px] text-zinc-200/90">
                            - ${step.note}
                        </p>
                    `: ''}
                </div>
            </div>
        `;

        //actually add card
        routeList.appendChild(card);

        if (index === currentStepIndex && index <= activeRoute.length - 1) {
            const prevData = locationLibrary[activeRoute[index - 1]?.id];

            if (prevData) {
                let numFastTravels = 0;
                for (let i = 0; i <= index; i++) {
                    if (activeRoute[i].fast_travel) {
                        numFastTravels++;
                    }
                }

                const currentColor = LEG_COLORS[numFastTravels % LEG_COLORS.length];

                const isFastTravel = step.fast_travel === true;
                drawPathSegment(prevData, locData, isFastTravel, currentColor);
            }
        }
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

function drawPathSegment(startData, endData, isFastTravel = false, legColor) {
    let latLngs = [];
    
    let lineOptions = {
        color: legColor,
        weight: 8,
        opacity: 0.8,
        lineJoin: 'round'
    };

    if (isFastTravel) {
        latLngs = [
            gameToMap(
                startData.game_coords.x, 
                startData.game_coords.y
            ),
            gameToMap(
                endData.game_coords.x, 
                endData.game_coords.y
            )
        ];

        lineOptions.color = '#a855f7';
        lineOptions.weight = 6;
        lineOptions.dashArray = '5, 25';
    } else {
        const startNodeId = getClosestNode(
            startData.game_coords.x, 
            startData.game_coords.y
        );
        const endNodeId = getClosestNode(
            endData.game_coords.x, 
            endData.game_coords.y
        );

        if (!startNodeId || !endNodeId) return;

        const graph = buildGraph(roadNetwork);
        const path = findPath(startNodeId, endNodeId, graph, roadNetwork);

        if (path && path.length > 0) {
            latLngs = path.map(segment => {
                const node = roadNetwork.nodes[segment.toId];
                return gameToMap(node.x, node.y);
            });

            const firstNode = roadNetwork.nodes[startNodeId];
            latLngs.unshift(gameToMap(firstNode.x, firstNode.y));
        } else {
            latLngs = [
                gameToMap(
                    startData.game_coords.x, 
                    startData.game_coords.y
                ),
                gameToMap(
                    endData.game_coords.x, 
                    endData.game_coords.y
                )
            ];
            lineOptions.dashArray = '5, 10';
        }
    }

    L.polyline(latLngs, lineOptions).addTo(linesLayer);
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
    currentStepIndex = stepIndex;
    
    const currData = locationLibrary[activeRoute[stepIndex].id];
    if(!currData) return;

    const targetCoords = gameToMap(
        currData.game_coords.x, 
        currData.game_coords.y
    );

    if (stepIndex > 0 && activeRoute[stepIndex - 1]) {
        const prevData = locationLibrary[activeRoute[stepIndex - 1].id];
        if (prevData) {
            const startCoords = gameToMap(prevData.game_coords.x, prevData.game_coords.y);
            
            const legBounds = L.latLngBounds([
                startCoords, 
                targetCoords
            ]);

            map.flyToBounds(legBounds, {
                padding: [200, 200],
                duration: 1.2,
                maxZoom: 0
            });
        }
    } else {
        map.flyTo(targetCoords, 0, { duration: 1.2 });
    }

    renderRoute();

    const card = document.getElementById(`step-${stepIndex}`);
    if(card) {
        card.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        }
}

window.addEventListener('keydown', function(e) {
    if (!activeRoute || activeRoute.length === 0) return;

    let newIndex = currentStepIndex;

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