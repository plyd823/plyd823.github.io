import { deathracesInfo as deathraces} from "./info.js";

export function deathracesComponent()
{
    let deathraceListHMTL = `
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
    </tr>`;

    deathraces.forEach(deathrace => {
        deathraceListHMTL += `
        <tr>
        <td> 
            <a href='${deathrace[2]}'>${deathrace[0]}</a>
        </td>
        <td>
            ${deathrace[1]}
        </td>
        <td>
            (${deathrace[3][0]}, ${deathrace[3][1]})
        </td>
        <td>
            ${deathrace[4]}
        </td>
    </tr>
    ` })
    return deathraceListHMTL
}

export function deathracesByLocationComponent(location) 
{
    let deathraceListHMTL = `
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
    </tr>`;

    deathraces.forEach(deathrace => {
        if (deathrace[5].toLowerCase() == location.toLowerCase())
        {
            deathraceListHMTL += `
            <tr>
        <td> 
            <a href='${deathrace[2]}'>${deathrace[0]}</a>
        </td>
        <td>
            ${deathrace[1]}
        </td>
        <td>
            (${deathrace[3][0]}, ${deathrace[3][1]})
        </td>
        <td>
            ${deathrace[4]}
        </td>
    </tr>
    `
        }})
    return deathraceListHMTL
}

document.addEventListener("DOMContentLoaded", function() {
    if(document.getElementById("t_deathraces")) document.getElementById("t_deathraces").innerHTML = deathracesComponent();
    if(document.getElementById("t_deathraces_jeet")) document.getElementById("t_deathraces_jeet").innerHTML = deathracesByLocationComponent("jeet");
    if(document.getElementById("t_deathraces_gutgash")) document.getElementById("t_deathraces_gutgash").innerHTML = deathracesByLocationComponent("gutgash");
})