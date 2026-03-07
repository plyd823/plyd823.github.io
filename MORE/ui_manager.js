let backgroundArrows, activeArrows; 

function toggleSettings() {
    const menu = document.getElementById('settings-menu');
    menu.classList.toggle('hidden');
}

// Builds region filter dynamically
function initRegionHUD() {
    const regionList = document.getElementById('region-list');

    if (!regionList) return;
    
    const regions = Object.values(locationLibrary)
        .map(function(item) {return item.region; })
        .filter(Boolean);

    // spread operator removes duplicates
    const uniqueRegions = [...new Set(regions)];
    // uniqueRegions.sort(); // could sort but it may be better to have them ordered from neighboring regions, not sure

    // top of region filter
    let html = `
        <button onclick="applyRegionFilter('all')" data-region="all" class="hud-btn active-filter">
            <div class="led">
            </div> 
            <span>
                All Territories
            </span>
        </button>
    `;

    //add territories to the filter
    uniqueRegions.forEach(region => {
        html += `
            <button onclick="applyRegionFilter('${region}')" data-region="${region}" class="hud-btn">
                <div class="led">
                </div> 
                <span>
                    ${region}
                </span>
            </button>`;
    });

    regionList.innerHTML = html;
}

// when region filter is clicked
function applyRegionFilter(region) {
    if (region === 'all') {
        activeRegionFilters = ['all'];
    } else {
        // removes the all filter if selected non-all filter
        activeRegionFilters = activeRegionFilters.filter(r => r !== 'all');

        // add filter to selected list
        if (activeRegionFilters.includes(region)) {
            // toggles off
            activeRegionFilters = activeRegionFilters.filter(r => r !== region);
        } else {
            // toggles on
            activeRegionFilters.push(region);
        }

        // default value if region selected then deselected
        if (activeRegionFilters.length === 0) {
            activeRegionFilters = ['all'];
        }
    }

    refreshMap();
}

// toggles stats panel when clicking chevron
function toggleStats() {
    const content = document.getElementById('stats-content');
    const chevron = document.getElementById('stats-chevron');
    statsExpanded = !statsExpanded;
    
    // animates height and opacity of content, rotates the chevron
    if (statsExpanded) {
        content.style.maxHeight = "500px";
        content.style.opacity = "1";
        chevron.style.transform = "rotate(0deg)";
    } else {
        content.style.maxHeight = "0px";
        content.style.opacity = "0";
        chevron.style.transform = "rotate(-90deg)";
    }
}

// toggles the route lines on the map
function toggleLines() {
    const btn = document.getElementById('line-toggle-led');

    if (linesVisible) {
        map.removeLayer(linesLayer);
        btn.classList.remove('bg-green-500');
        btn.classList.add('bg-red-500');
    } else {
        map.addLayer(linesLayer);
        btn.classList.remove('bg-red-500');
        btn.classList.add('bg-green-500');
    }

    linesVisible = !linesVisible;
}

// clears markers, layers, index, and rerenders the route
function refreshMap() {
    Object.values(markers).forEach(m => map.removeLayer(m));

    for (let key in markers) {
        delete markers[key];
    }

    currentActiveIndex = null;
    renderRoute();
}

// toggles the icons on the map
function toggleIcons() {
    iconsVisible = !iconsVisible;
    const btn = document.getElementById('icon-toggle-led');

    if(!iconsVisible) {
        Object.values(markers).forEach(m => map.removeLayer(m));
        for (let key in markers) {
            delete markers[key];
        }

        // change led color to red
        btn.classList.remove('bg-green-500');
        btn.classList.add('bg-red-500');
    } else {
        // change led color to green
        btn.classList.remove('bg-red-500');
        btn.classList.add('bg-green-500');
    }

    

    renderRoute();
}

// rerenders the map and route with the updated object filters
function applyFilter(type) {
    // set the active filters
    if (type === 'all') {
        activeFilters = ['all'];
    } else {
        activeFilters = activeFilters.filter(f => f !== 'all');

        if (activeFilters.includes(type)) {
            activeFilters = activeFilters.filter(f => f !== type);
        } else {
            activeFilters.push(type);
        }

        if (activeFilters.length === 0) {
            activeFilters = ['all'];
        }
    }

    // update button visuals
    document.querySelectorAll('.hud-btn').forEach(button => {
        const buttonType = button.getAttribute('data-type');

        if (activeFilters.includes(buttonType)) {
            button.classList.add('active-filter');
        } else {
            button.classList.remove('active-filter');
        }
    });

    refreshMap();
}

// TODO: UPDATE THIS TO ACTUALLY WORK LOL
function updateLines(pathPoints, currentLegPoints) {
    backgroundLine = L.polyline(pathPoints, {
        color: '#000000',
        weight: 2,
        opacity: 0.4,
        dashArray: '2, 8',
        interactive: false 
    }).addTo(linesLayer);
}

// updates marker on map
function addMarker(index, coords, data, opacity = 1.0, note = null) {
    if(!iconsVisible) return;

    const iconToUse = icons[data.type] || icons.default;

    if(!markers[index]) {
        
        markers[index] = L.marker(coords, { 
            icon: iconToUse,
            opacity: opacity
        }).addTo(map)
        .bindPopup(`<b class="text-zinc-900">${data.name}</b>`)
        .on('click', () => selectStep(index));
    } else {
        markers[index].setLatLng(coords);
    }
}

// returns the filtered route based on object and region filter
function getFilteredRoute() {
    // TODO: FIX THIS SO IT DOESNT ALWAYS START FROM MISSION_FM_START
    const startPoint = { 
        id: "MISSION_FM_START", 
        note: "Starting Point" 
    };
    
    const filtered = Object.keys(locationLibrary).filter(id => {
        if (id === "MISSION_FM_START") return false;
        
        const data = locationLibrary[id];
        const typeMatch = activeFilters.includes('all') || 
            activeFilters.includes(data.type) || 
            (
                activeFilters.includes('mission') && 
                MISSION_TYPES.includes(data.type)
            );
        const regionMatch = 
            activeRegionFilters.includes('all') || 
            activeRegionFilters.includes(data.region);

        return typeMatch && regionMatch;
    }).map(id => ({ id: id }));

    // appends filtered onto start point using spread operator
    return [startPoint, ...filtered];
}