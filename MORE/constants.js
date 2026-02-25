// ICONS THAT APPEAR ON WAYPOINTS
const icons = {
    stronghold: L.icon({ 
        iconUrl: 'icons/stronghold_temp.png', 
        iconSize: [32, 32], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
    hideout: L.icon({ 
        iconUrl: 'icons/hideout.png', 
        iconSize: [24, 24], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
    gastown: L.icon({ 
        iconUrl: 'icons/gastown.png', 
        iconSize: [24, 24], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
    camp: L.icon({ 
        iconUrl: 'icons/transfertankcamp.png', 
        iconSize: [24, 24], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
    scavloc: L.icon({ 
        iconUrl: 'icons/scrap.png', 
        iconSize: [24, 24], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
    scarecrow: L.icon({ 
        iconUrl: 'icons/scarecrow.png', 
        iconSize: [24, 24], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
    "death race start": L.icon({ 
        iconUrl: 'icons/death race.png', 
        iconSize: [24, 24], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
    sniper: L.icon({ 
        iconUrl: 'icons/snipertower.png', 
        iconSize: [24, 24], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
    balloon: L.icon({ 
        iconUrl: 'icons/vantageoutpost.png', 
        iconSize: [24, 24], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
    encounter: L.icon({ 
        iconUrl: 'icons/encounter.png', 
        iconSize: [24, 24], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
    minefield: L.icon({ 
        iconUrl: 'icons/minefield.png',
        iconSize: [24, 24], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
    "feral man": L.icon({ 
        iconUrl: 'icons/objectivemarker.png', 
        iconSize: [20, 20], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
    "magnum opus": L.icon({ 
        iconUrl: 'icons/objectivemarker.png', 
        iconSize: [20, 20], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
    "righteous work": L.icon({ 
        iconUrl: 'icons/objectivemarker.png', 
        iconSize: [20, 20], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
    "into madness": L.icon({ 
        iconUrl: 'icons/objectivemarker.png', 
        iconSize: [20, 20], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
    "wasteland classic": L.icon({ 
        iconUrl: 'icons/objectivemarker.png', 
        iconSize: [20, 20], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
    "a piece tougher": L.icon({ 
        iconUrl: 'icons/objectivemarker.png', 
        iconSize: [20, 20], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
    "black magic": L.icon({ 
        iconUrl: 'icons/objectivemarker.png', 
        iconSize: [20, 20], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
    "smoke rises": L.icon({ 
        iconUrl: 'icons/objectivemarker.png', 
        iconSize: [20, 20], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
    "dance with death": L.icon({ 
        iconUrl: 'icons/objectivemarker.png', 
        iconSize: [20, 20], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
    "fumehead's debt": L.icon({ 
        iconUrl: 'icons/objectivemarker.png', 
        iconSize: [20, 20], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
    "immortal enemy": L.icon({ 
        iconUrl: 'icons/objectivemarker.png', 
        iconSize: [20, 20], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
    "the big chief": L.icon({ 
        iconUrl: 'icons/objectivemarker.png', 
        iconSize: [20, 20], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
    "in it for glory": L.icon({ 
        iconUrl: 'icons/objectivemarker.png', 
        iconSize: [20, 20], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
    "all is lost forever": L.icon({ 
        iconUrl: 'icons/objectivemarker.png',
        iconSize: [20, 20], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
    "paint my name in blood": L.icon({ 
        iconUrl: 'icons/objectivemarker.png', 
        iconSize: [20, 20], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
    "wasteland mission": L.icon({ 
        iconUrl: 'icons/wastelandmission.png', 
        iconSize: [20, 20], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
    default: L.icon({ 
        iconUrl: 'icons/weakgate.png',
        iconSize: [20, 20], 
        iconAnchor: [16, 16], 
        popupAnchor: [0, -15] 
    }),
};

// USED FOR THE BACKGROUND MAP CONVERSION
const CALIBRATION = {
    scale: .5,      
    offsetX: 6650, 
    offsetY: 4600
};

const MISSION_TYPES = [
    "feral man", 
    "magnum opus", 
    "righteous work", 
    "into madness",
    "wasteland classic",
    "black magic",
    "smoke rises",
    "dance with death",
    "fumehead's debt",
    "immortal enemy",
    "the big chief",
    "in it for glory",
    "all is lost forever",
    "paint my name in blood"
];

let activeFilters = ['all'];
let activeRegionFilters = ['all'];
let iconsVisible = true;

let currentActiveIndex = null;
let activeRoute = [];
const markers = {};

let backgroundLine;
let activeLine;
let linesLayer = L.layerGroup().addTo(map);
let linesVisible = true;

let statsExpanded = true;