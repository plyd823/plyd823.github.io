//Camps Page
var campsInfo = [["Undertow", "Outer Graves", "locations/camps/undertow.html", [3980, 300], "Pump"],
                 ["The Edge", "Blackmaws", "locations/camps/theedge.html", [3310, 620], "Pump"],
                 ["Bonecrack", "Blackmaws", "locations/camps/bonecrack.html", [3560, 870], "Pump"],
                 ["Gas Works", "Blackmaws", "locations/camps/gasworks.html", [3010, 970], "Top Dog"],
                 ["Rust Bird", "Colossus", "locations/camps/rustbird.html", [4260, 1220], "Legion"],
                 ["Great Watcher", "Colossus", "locations/camps/greatwatcher.html", [4440, 1670], "Top Dog"],
                 ["The Dredges", "Balefire Flatland", "locations/camps/thedredges.html", [3410, 1310], "Tanks"],
                 ["Sand Sifter", "Balefire Flatland", "locations/camps/sandsifter.html", [3020, 1650], "Tanks"],
                 ["Hollow Point", "Balefire Flatland", "locations/camps/hollowpoint.html", [3510, 2180], "Pump"],
                 ["Wreck Hill", "Dry Gustie", "locations/camps/wreckhill.html", [3840, 1730], "Tanks"],
                 ["Ironclad", "Dry Gustie", "locations/camps/ironclad.html", [3740, 2580], "Legion"],
                 ["The Pipes", "Fuel Veins", "locations/camps/thepipes.html", [3030, 2300], "Pump"],
                 ["Black Sands", "Fuel Veins", "locations/camps/blacksands.html", [3300, 2710], "Pump"],
                 ["Gob Stone", "Grit Canyons", "locations/camps/gobstone.html", [2440, 670], "Pump"],
                 ["Black Cove", "Grit Canyons", "locations/camps/blackcove.html", [2200, 1380], "Pump"],
                 ["Overlook", "Grit Canyons", "locations/camps/overlook.html", [2550, 1610], "Tanks"],
                 ["Rook Nest", "Parch Moon", "locations/camps/rooknest.html", [1750, 890], "Tanks"],
                 ["Storm Shelter", "Reek Hills ", "locations/camps/stormshelter.html", [960, 970], "Tanks"],
                 ["Scorched Sands", "Reek Hills", "locations/camps/scorchedsands.html", [590, 1310], "Tanks"], 
                 ["Proving Grounds", "Cadavanaugh", "locations/camps/provinggrounds.html", [1220, 1660], "Top Dog"], 
                 ["Blood Ridge", "Cadavanaugh", "locations/camps/bloodridge.html", [700, 2020], "Pump"], 
                 ["Large Blade", "Chalkies", "locations/camps/largeblade.html", [2310, 1940], "Top Dog"], 
                 ["Jugular Canyon", "Chalkies", "locations/camps/jugularcanyon.html", [1800, 2010], "Legion"], 
                 ["Blood Beach", "Chalkies", "locations/camps/bloodbeach.html", [1610, 2670], "Tanks"],  
                 ["Finger Peak", "Chalkies", "locations/camps/fingerpeak.html", [1190, 2550], "Legion"], 
                 ["Havoc Point", "Knit Sack", "locations/camps/havocpoint.html", [1820, 3300], "Pump"], 
                 ["Grave Bridge", "Knit Sack", "locations/camps/gravebridge.html", [2270, 3430], "Legion"], 
                 ["Dead End", "Rot 'N' Rusties", "locations/camps/deadend.html", [2830, 3600], "Tanks"], 
                 ["Tyrant's Lash", "Rot 'N' Rusties", "locations/camps/tyrantslash.html", [2580, 4020], "Top Dog"], 
                 ["Twin Sisters", "Rot 'N' Rusties", "locations/camps/twinsisters.html", [2430, 4420], "Legion"], 
                 ["Stonehold", "Wailing Wind", "locations/camps/stonehold.html", [1270, 3470], "Pump"], 
                 ["Hell's Grill", "Wailing Wind", "locations/camps/hellsgrill.html", [940, 4000], "Tanks"], 
                 ["Old Hole", "Grandrise", "locations/camps/oldhole.html", [500, 4150], "Pump"], 
                 ["The Drop", "Grandrise", "locations/camps/thedrop.html", [330, 4700], "Top Dog"], 
                 ["The Choke", "Grandrise", "locations/camps/thechoke.html", [1390, 5110], "Tanks"], 
                 ["Skull Top", "The Heights", "locations/camps/skulltop.html", [1570, 4360], "Tanks"], 
                 ["Wheel Greaser", "The Heights", "locations/camps/wheelgreaser.html", [2620, 5480], "Pump"], 
                                     ];

let campHtmlList = document.getElementById("camps-list")
let campListHMTL = `
    <tr>
        <th style = "text-align: center">
            Name
        </th>
        <th style = "text-align: center">
            Location 
        </th>
        <th style = "text-align: center">
            Coordinates
        </th>
        <th style = "text-align: center">
            Type
        </th>
    </tr>`
for(campItem of campsInfo)
{
    campListHMTL += `
    <tr>
        <td> 
            <a href='${campItem[2]}'>${campItem[0]}</a>
        </td>
        <td>
            ${campItem[1]}
        </td>
        <td>
            (${campItem[3][0]}, ${campItem[3][1]})
        </td>
        <td>
            ${campItem[4]}
        </td>
    </tr>
    `
}
campHtmlList.innerHTML = campListHMTL