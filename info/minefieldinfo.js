//minefields Page
var minefieldsInfo = [["East Blackmaws", [,], "/images/minefields/eastblackmawsminefield.jpg"],
                      ["West Blackmaws", [,], "/images/minefields/westblackmawsminefield.jpg"],
                      ["North Colossus", [,], "/images/minefields/northcolossusminefield.jpg"],
                      ["NW Balefire Flatland", [,], "/images/minefields/nwbalefireflatlandminefield.jpg"],
                      ["North Balefire Flatland", [,], "/images/minefields/northbalefireflatlandminefield.jpg"],
                      ["West Dry Gustie", [,], "/images/minefields/westdrygustieminefield.jpg"],
                      ["North Dry Gustie", [,], "/images/minefields/northdrygustieminefield.jpg"],
                      ["Central Fuel Veins", [,], "/images/minefields/centralfuelveinsminefield.jpg"],
                      ["NE Fuel Veins ", [,], "/images/minefields/nefuelveinsminefield.jpg"],
                      ["North Grit Canyons", [,], "/images/minefields/northgritcanyonsminefield.jpg"],
                      ["South Grit Canyons ", [,], "/images/minefields/southgritcanyonsminefield.jpg"],
                      ["Central Parch Moon", [,], "/images/minefields/centralparchmoonminefield.jpg"],
                      ["North Parch Moon", [,], "/images/minefields/northparchmoonminefield.jpg"],
                      ["East Reek Hills", [,], "/images/minefields/eastreekhillsminefield.jpg"],
                      ["NW Reek Hills ", [,], "/images/minefields/nwreekhillsminefield.jpg"],
                      ["East Cadavanaugh", [,], "/images/minefields/eastcadavanaughminefield.jpg"],
                      ["Central Cadavanaugh", [,], "/images/minefields/centralcadavanaughminefield.jpg"],
                      ["West Central Chalkies", [,], "/images/minefields/westcentralchalkiesminefield.jpg"],
                      ["East Central Chalkies ", [,], "/images/minefields/eastcentralchalkiesminefield.jpg"],
                      ["South Knit Sack", [,], "/images/minefields/southknitsackminefield.jpg"],
                      ["SE Knit Sack", [,], "/images/minefields/seknitsackminefield.jpg"],
                      ["South Rot 'N' Rusties", [,], "/images/minefields/southrotnrustiesminefield.jpg"],
                      ["Central Rot 'N' Rusties", [,], "/images/minefields/centralrotnrustiesminefield.jpg"],
                      ["Central Wailing Wind", [,], "/images/minefields/centralwailingwindminefield.jpg"],
                      ["North Wailing Wind", [,], "/images/minefields/northwailingwindminefield.jpg"],
                      ["South Central Grandrise", [,], "/images/minefields/southcentralgrandriseminefield.jpg"],
                      ["East Central Grandrise", [,], "/images/minefields/eastcentralgrandriseminefield.jpg"],
                      ["SE The Heights", [,], "/images/minefields/setheheightsminefield.jpg"],
                      ["West The Heights", [,], "/images/minefields/westtheheightsminefield.jpg"],
                      ["East The Dump", [,], "/images/minefields/eastthedumpminefield.jpg"], 
                                     ];

let minefieldHtmlList = document.getElementById("minefield-list")
let minefieldListHMTL = `
    <tr>
        <th style = "text-align: center">
            Name
        </th>
        <th style = "text-align: center">
            Coordinates 
        </th>
        <th style = "text-align: center" width = "30%">
            Mines (Top is North)
        </th>
    </tr>`
for(minefieldItem of minefieldsInfo)
{
    minefieldListHMTL += `
    <tr>
        <td style = "text-align: center; font-size: 120%"> 
            ${minefieldItem[0]}
        </td>
        <td style = "text-align: center; font-size: 120%">
            (${minefieldItem[1][0]}, ${minefieldItem[1][1]})
        </td>
        <td style = "text-align: center; font-size: 120%">
            <img src="${minefieldItem[2]}" alt="Image of minefield"></img>
        </td>
    </tr>
    `
}
minefieldHtmlList.innerHTML = minefieldListHMTL

