import { balloonsInfo as balloons} from "./info.js";

export function BalloonsComponent()
{
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
    </tr>`;

    balloons.forEach(balloon => {
        balloonListHMTL += `
        <tr>
        <td style = "text-align: center; font-size: 120%"> 
            ${balloon[0]}
        </td>
        <td style = "text-align: center; font-size: 120%">
            (${balloon[1][0]}, ${balloon[1][1]})
        </td>
        <td style = "text-align: center; font-size: 120%">
            ${balloon[2]}
        </td>
        <td style = "text-align: center; font-size: 120%">
            ${balloon[3]}
        </td>
        <td>
            <img src="${balloon[4]}" alt="Image of balloon"></img>
        </td>
    </tr>
        `

        
    })
    return balloonListHMTL
}

export function BalloonsByLocationComponent(location) 
{
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
    </tr>`;

    balloons.forEach(balloon => {
        if (balloon[5].toLowerCase() == location.toLowerCase())
        {
            balloonListHMTL += `
            <tr>
            <td style = "text-align: center; font-size: 120%"> 
                ${balloon[0]}
            </td>
            <td style = "text-align: center; font-size: 120%">
                (${balloon[1][0]}, ${balloon[1][1]})
            </td>
            <td style = "text-align: center; font-size: 120%">
                ${balloon[2]}
            </td>
            <td style = "text-align: center; font-size: 120%">
                ${balloon[3]}
            </td>
            <td>
                <img src="${balloon[4]}" alt="Image of balloon"></img>
            </td>
            </tr>
            `
        }

        
    })
    return balloonListHMTL
}

document.addEventListener("DOMContentLoaded", function() {
    if(document.getElementById("t_balloons")) document.getElementById("t_balloons").innerHTML = BalloonsComponent();
    if(document.getElementById("t_balloons_jeet")) document.getElementById("t_balloons_jeet").innerHTML = BalloonsByLocationComponent("jeet");
    if(document.getElementById("t_balloons_gutgash")) document.getElementById("t_balloons_gutgash").innerHTML = BalloonsByLocationComponent("gutgash");
    if(document.getElementById("t_balloons_pinkeye")) document.getElementById("t_balloons_pinkeye").innerHTML = BalloonsByLocationComponent("pinkeye");
    if(document.getElementById("t_balloons_thedumps")) document.getElementById("t_balloons_thedumps").innerHTML = BalloonsByLocationComponent("thedumps");
})