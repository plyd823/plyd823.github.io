//balloons Page
var balloonsInfo = [["Blackmaws", [,], 2, 1, "../images/balloons/blackmaws.jpg"],
                    ["Wailing Wind", [,], 2, 1, "../images/balloons/wailingwind.jpg"],
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
            <img src="${balloonItem[4]}" alt="Image of balloon" width = "900000em"></img>
        </td>
    </tr>
    `
}
balloonHtmlList.innerHTML = balloonListHMTL

