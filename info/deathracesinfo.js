//Death Races Page
var deathracesInfo = [["Broken Pipes", "Blackmaws", "/locations/camps/brokenpipes.html", [3060, 700], "Scatter Run"],
                      ["Corner Cut", "Colossus", "/locations/camps/cornercut.html", [4020, 950], "Barrel Bash"],
                      ["Valley of Dust", "Dry Gustie", "/locations/camps/.html", [, ], ""],
                      ["", "", "/locations/camps/.html", [, ], ""],
                      ["", "", "/locations/camps/.html", [, ], ""],
                      ["", "", "/locations/camps/.html", [, ], ""],
                      ["", "", "/locations/camps/.html", [, ], ""],
                      ["", "", "/locations/camps/.html", [, ], ""],
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