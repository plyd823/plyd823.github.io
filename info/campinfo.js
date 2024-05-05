import { campsInfo as camps} from "./info.js";

export function campsComponent()
{
    let campListHMTL = `
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

    camps.forEach(camp => {
        campListHMTL += `
        <tr>
            <td> 
                <a href='${camp[2]}'>${camp[0]}</a>
            </td>
            <td>
                ${camp[1]}
            </td>
            <td>
                (${camp[3][0]}, ${camp[3][1]})
            </td>
            <td>
                ${camp[4]}
            </td>
        </tr>`   
    })
    return campListHMTL
}

export function campsByLocationComponent(location) 
{
    let campListHMTL = `
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

    camps.forEach(camp => {
        if (camp[5].toLowerCase() == location.toLowerCase())
        {
            campListHMTL += `
            <tr>
                <td> 
                    <a href='${camp[2]}'>${camp[0]}</a>
                </td>
                <td>
                    ${camp[1]}
                </td>
                <td>
                    (${camp[3][0]}, ${camp[3][1]})
                </td>
                <td>
                    ${camp[4]}
                </td>
            </tr>
            `
        }

        
    })
    return campListHMTL
}

document.addEventListener("DOMContentLoaded", function() {
    if(document.getElementById("t_camps")) document.getElementById("t_camps").innerHTML = campsComponent();
    if(document.getElementById("t_camps_jeet")) document.getElementById("t_camps_jeet").innerHTML = campsByLocationComponent("jeet");
    if(document.getElementById("t_camps_gutgash")) document.getElementById("t_camps_gutgash").innerHTML = campsByLocationComponent("gutgash");
    if(document.getElementById("t_camps_pinkeye")) document.getElementById("t_camps_pinkeye").innerHTML = campsByLocationComponent("pinkeye");
    if(document.getElementById("t_camps_thedumps")) document.getElementById("t_camps_thedumps").innerHTML = campsByLocationComponent("thedumps");
})