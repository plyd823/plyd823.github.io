const mapSize = 8192;
const mapBounds = [[0, 0], [mapSize, mapSize]];
const map = L.map('map', { 
    crs: L.CRS.Simple, 
    minZoom: -5,
    maxZoom: 2,
    zoomSnap: 0.1,
    maxBounds: mapBounds
});

// ADD BACKGROUND MAP
L.imageOverlay('images/mad_max_full_map.png', mapBounds).addTo(map);

// ADD ROAD LINES
const ROAD_LINE_CALIBRATION = {
    scale: 1,
    offsetX: 0,
    offsetY: 0
};
const road_sw_corner = [
    ROAD_LINE_CALIBRATION.offsetY,
    ROAD_LINE_CALIBRATION.offsetX
];
const road_ne_corner = [
    (mapSize * ROAD_LINE_CALIBRATION.scale) + ROAD_LINE_CALIBRATION.offsetY,
    (mapSize * ROAD_LINE_CALIBRATION.scale) + ROAD_LINE_CALIBRATION.offsetX
]
const roadBounds = [road_sw_corner, road_ne_corner]; 

L.imageOverlay('images/road_lines.png', roadBounds, { 
    interactive: false, 
    opacity: 0.7
}).addTo(map);

// ADD TERRITORY LINES
const TERR_LINE_CALIBRATION = {
    scale: 0.7,
    offsetX: 1330,
    offsetY: 850
};
const terr_sw_corner = [
    TERR_LINE_CALIBRATION.offsetY,
    TERR_LINE_CALIBRATION.offsetX
];
const terr_ne_corner = [
    (mapSize * TERR_LINE_CALIBRATION.scale) + TERR_LINE_CALIBRATION.offsetY,
    (mapSize * TERR_LINE_CALIBRATION.scale) + TERR_LINE_CALIBRATION.offsetX
]
const territoryBounds = [terr_sw_corner, terr_ne_corner];

L.imageOverlay('images/territory_lines.png', territoryBounds, { 
    interactive: false, 
    opacity: 1
}).addTo(map);

// CONFIGURE MAP TO BOUNDS
map.fitBounds(mapBounds);