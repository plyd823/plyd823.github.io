import { archangelsInfo as archangels} from "./info.js";

export function archangelsComponent()
{
    let archangelListHMTL = `
    <tr>
        <th style = "text-align: center">
            Name
        </th>
        <th style = "text-align: center">
            Ramming Grill 
        </th>
        <th style = "text-align: center">
            Armor
        </th>
        <th style = "text-align: center">
            Engine
        </th>
        <th style = "text-align: center" width = "30%">
            Exhaust
        </th>
        <th style = "text-align: center">
            Tires
        </th>
        <th style = "text-align: center">
            Suspension 
        </th>
        <th style = "text-align: center">
            Rims
        </th>
        <th style = "text-align: center">
            Boarder Spikes
        </th>
        <th style = "text-align: center" width = "30%">
            Car Body
        </th>
        <th style = "text-align: center" width = "30%">
            Body Color
        </th>
    </tr>`;

    archangels.forEach(archangel => {
        archangelListHMTL += `
        <tr>
            <td style = "text-align: center; font-size: 120%"> 
                ${archangel[0]}
            </td>
            <td style = "text-align: center; font-size: 120%">
                ${archangel[1]}
            </td>
            <td style = "text-align: center; font-size: 120%">
                ${archangel[2]}
            </td>
            <td style = "text-align: center; font-size: 120%">
                ${archangel[3]}
            </td>
            <td style = "text-align: center; font-size: 120%">
                ${archangel[4]}
            </td>
            <td style = "text-align: center; font-size: 120%">
                ${archangel[5]}
            </td>
            <td style = "text-align: center; font-size: 120%">
                ${archangel[6]}
            </td>
            <td style = "text-align: center; font-size: 120%">
                ${archangel[7]}
            </td>
            <td style = "text-align: center; font-size: 120%">
                ${archangel[8]}
            </td>
            <td style = "text-align: center; font-size: 120%">
                ${archangel[9]}
            </td>
            <td style = "text-align: center; font-size: 120%">
                ${archangel[10]}
            </td>
        </tr>
        `  
    })
    return archangelListHMTL
}

document.addEventListener("DOMContentLoaded", function() {
    if(document.getElementById("t_archangels")) document.getElementById("t_archangels").innerHTML = archangelsComponent();
})