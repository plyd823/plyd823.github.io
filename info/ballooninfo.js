//balloons Page
var balloonsInfo = [["Blackmaws", [,], 2, 1, "../images/balloons/blackmaws.jpg"],
                    ["Colossus", [,], 3, 0, "../images/balloons/colossus.jpg"],
                    ["Balefire Flatland", [,], 4, 0, "../images/balloons/balefireflatland.jpg"],
                    ["Fuel Veins", [,], 2, 0, "../images/balloons/fuelveins.jpg"],
                    ["Dry Gustie", [,], 4, 0, "../images/balloons/drygustie.jpg"],
                    ["Parch Moon", [,], 1, 1, "../images/balloons/parchmoon.jpg"],
                    ["Grit Canyons", [,], 1, 1, "../images/balloons/gritcanyons.jpg"],
                    ["Chalkies", [,], 1, 0, "../images/balloons/chalkies.jpg"],
                    ["Cadavanaugh", [,], 1, 1, "../images/balloons/cadavanaugh.jpg"],
                    ["Reek Hills", [,], 1, 0, "../images/balloons/reekhills.jpg"],
                    ["Knit Sack", [,], 1, 0, "../images/balloons/knitsack.jpg"],
                    ["Wailing Wind", [,], 2, 1, "../images/balloons/wailingwind.jpg"],
                    ["Grandrise", [,], 2, 0, "../images/balloons/grandrise.jpg"],
                    ["The Heights", [,], 4, 1, "../images/balloons/theheights.jpg"],
                    ["Rot 'N' Rusties", [,], 2, 0, "../images/balloons/rotnrusties.jpg"],
                    ["The Dumps", [,], 1, 0, "../images/balloons/dumpballoon.jpg"],
                                     ];

let balloonHtmlList = document.getElementById("balloon-list")
let balloonListHMTL = `
    <tr>
        <th style = "text-align: center">
            Name
        </th>
        <th style = "text-align: center">
            Coordinates 
        </th>
        <th style = "text-align: center">
            Total Scrap
        </th>
        <th style = "text-align: center">
            Total History Relics
        </th>
        <th style = "text-align: center" width = "30%">
            Collectibles
        </th>
    </tr>`
for(balloonItem of balloonsInfo)
{
    balloonListHMTL += `
    <tr>
        <td style = "text-align: center; font-size: 120%"> 
            ${balloonItem[0]}
        </td>
        <td style = "text-align: center; font-size: 120%">
            (${balloonItem[1][0]}, ${balloonItem[1][1]})
        </td>
        <td style = "text-align: center; font-size: 120%">
            ${balloonItem[2]}
        </td>
        <td style = "text-align: center; font-size: 120%">
            ${balloonItem[3]}
        </td>
        <td>
            <img src="${balloonItem[4]}" alt="Image of balloon"></img>
        </td>
    </tr>
    `
}
balloonHtmlList.innerHTML = balloonListHMTL

