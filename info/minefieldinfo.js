import { minefieldsInfo as minefields} from "./info.js";

export function minefieldsComponent()
{
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
    </tr>`;

    minefields.forEach(minefield => {
        minefieldListHMTL += `
        <tr>
        <td style = "text-align: center; font-size: 120%"> 
            ${minefield[0]}
        </td>
        <td style = "text-align: center; font-size: 120%">
            (${minefield[1][0]}, ${minefield[1][1]})
        </td>
        <td style = "text-align: center; font-size: 120%">
            <img src="${minefield[2]}" alt="Image of minefield"></img>
        </td>
    </tr>
    `  
    })
    return minefieldListHMTL
}

export function minefieldsByLocationComponent(location) 
{
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
    </tr>`;

    minefields.forEach(minefield => {
        if (minefield[3].toLowerCase() == location.toLowerCase())
        {
            minefieldListHMTL += `
            <tr>
        <td style = "text-align: center; font-size: 120%"> 
            ${minefield[0]}
        </td>
        <td style = "text-align: center; font-size: 120%">
            (${minefield[1][0]}, ${minefield[1][1]})
        </td>
        <td style = "text-align: center; font-size: 120%">
            <img src="${minefield[2]}" alt="Image of minefield"></img>
        </td>
    </tr>
    `
        }

        
    })
    return minefieldListHMTL
}

document.addEventListener("DOMContentLoaded", function() {
    if(document.getElementById("t_minefields")) document.getElementById("t_minefields").innerHTML = minefieldsComponent();
    if(document.getElementById("t_minefields_jeet")) document.getElementById("t_minefields_jeet").innerHTML = minefieldsByLocationComponent("jeet");
    if(document.getElementById("t_minefields_gutgash")) document.getElementById("t_minefields_gutgash").innerHTML = minefieldsByLocationComponent("gutgash");
    if(document.getElementById("t_minefields_pinkeye")) document.getElementById("t_minefields_pinkeye").innerHTML = minefieldsByLocationComponent("pinkeye");
    if(document.getElementById("t_minefields_thedumps")) document.getElementById("t_minefields_thedumps").innerHTML = minefieldsByLocationComponent("thedumps");
})