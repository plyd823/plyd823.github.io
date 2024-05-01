var campsInfo = [["Undertow", "Outer Graves", "undertow.html", [3980, 300], "Pump"],
                 ["The Edge", "Blackmaws", "theedge.html", [3310, 620], "Pump"],
                 ["Bonecrack", "Blackmaws", "bonecrack.html", [3560, 870], "Pump"],
                 ["Gas Works", "Blackmaws", "gasworks.html", [3010, 970], "Top Dog"],
                 ["Rust Bird", "Colossus", "rustbird.html", [4260, 1220], "Legion"],
                 ["Great Watcher", "Colossus", "greatwatcher.html", [4440, 1670], "Top Dog"],
                 ["The Dredges", "Balefire Flatland", "thedredges.html", [3410, 1310], "Tanks"],
                 ["Sand Sifter", "Balefire Flatland", "sandsifter.html", [3020, 1650], "Tanks"],
                 ["Hollow Point", "Balefire Flatland", "hollowpoint.html", [3510, 2180], "Pump"],
                 ["Wreck Hill", "Dry Gustie", "wreckhill.html", [3840, 1730], "Tanks"],
                 ["Ironclad", "Dry Gustie", "ironclad.html", [3740, 2580], "Legion"],
                 ["The Pipes", "Fuel Veins", "thepipes.html", [3030, 2300], "Pump"],
                 ["Black Sands", "Fuel Veins", "blacksands.html", [3300, 2710], "Pump"],
                                     ];

let htmlList = document.getElementById("camps-list")
let listHMTL = `
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
for(item of campsInfo)
{
    listHMTL += `
    <tr>
        <td> 
            <a href='" + item[2] + "'>${item[0]}</a>
        </td>
        <td>
            ${item[1]}
        </td>
        <td>
            (${item[3][0]}, ${item[3][1]})
        </td>
        <td>
            ${item[4]}
        </td>
    </tr>
    `
}
htmlList.innerHTML = listHMTL