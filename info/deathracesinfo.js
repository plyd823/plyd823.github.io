//Death Races Page
var deathracesInfo = [["Broken Pipes", "Blackmaws", "/locations/camps/brokenpipes.html", [3060, 700], "Scatter Run"],
                      ["Corner Cut", "Colossus", "/locations/camps/cornercut.html", [4020, 950], "Barrel Bash"],
                      ["Valley of Dust", "Dry Gustie", "/locations/camps/valleyofdust.html", [4340, 2790], "Time Bomb"],
                      ["Crazy Racy", "Fuel Veins", "/locations/camps/crazyracy.html", [2780, 2550], "Barrel Bash"],
                      ["Heat Haze", "Fuel Veins", "/locations/camps/heathaze.html", [3850, 3150], "Scatter Run"],
                      ["Craggy Crew", "Grit Canyons", "/locations/camps/craggycrew.html", [2740, 510], "Scatter Run"],
                      ["Summit of the Mighty", "Parch Moon", "/locations/camps/summitofthemighty.html", [1970, 320], "Barrel Bash"],
                      ["Neck Snappin'", "Reek Hills", "/locations/camps/necksnappin.html", [280, 1210], "Scatter Run"],
                      ["Pothole Ridge", "Cadavanaugh", "/locations/camps/potholeridge.html", [950,  2500], "Time Bomb"],
                      ["Buckle Down", "Chalkies", "/locations/camps/buckledown.html", [1590, 2390], "Barrel Bash"],
                      ["Even Rip", "Knit Sack", "/locations/camps/evenrip.html", [2730, 3120], "Time Bomb"],
                      ["The Reconvene", "Wailing Wind", "/locations/camps/wailingwind.html", [790, 4030], "Scatter Run"],
                      ["Barreling-Barrows", "Grandrise", "/locations/camps/barrelingbarrows.html", [620, 5200], "Barrel Bash"],
                      ["Mortal Bite", "The Heights", "/locations/camps/mortalbite.html", [1570, 5210], "Barrel Bash"],
                      ["Tricky Pass", "Rot 'N' Rusties", "/locations/camps/trickypass.html", [3070, 4240], "Scatter Run"],                      
                                     ];

let deathracesHtmlList = document.getElementById("deathraces-list")
let deathracesListHMTL = `
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
for(drItem of deathracesInfo)
{
    deathracesListHMTL += `
    <tr>
        <td> 
            <a href='${drItem[2]}'>${drItem[0]}</a>
        </td>
        <td>
            ${drItem[1]}
        </td>
        <td>
            (${drItem[3][0]}, ${drItem[3][1]})
        </td>
        <td>
            ${drItem[4]}
        </td>
    </tr>
    `
}
deathracesHtmlList.innerHTML = deathracesListHMTL