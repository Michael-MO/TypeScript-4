"use strict";
import axios from 'axios';

let baseURI: string = "https://mmo-restservicetest4.azurewebsites.net/api/meassurements";

let inputId = document.getElementById("InputId") as HTMLInputElement;

let btnGetAll = document.getElementById("GetAll") as HTMLButtonElement;
btnGetAll.addEventListener("click", GetAll);

let btnGetOne = document.getElementById("GetOne") as HTMLButtonElement;
btnGetOne.addEventListener("click", GetOne);

let btnDeleteOne = document.getElementById("DeleteOne") as HTMLButtonElement;
btnDeleteOne.addEventListener("click", DeleteOne);

let tableBody = document.getElementById("tBodyContent") as HTMLTableElement;

function HTMLTableDataRow(obj: any): HTMLTableRowElement
{
    let row = document.createElement("tr") as HTMLTableRowElement;
    let cell = row.appendChild(document.createElement("td") as HTMLTableCellElement);
    cell.innerText = obj.id.toString();

    let cell2 = row.appendChild(document.createElement("td") as HTMLTableCellElement);
    cell2.innerText = obj.pressure.toString();

    let cell3 = row.appendChild(document.createElement("td") as HTMLTableCellElement);
    cell3.innerText = obj.humidity.toString();

    let cell4 = row.appendChild(document.createElement("td") as HTMLTableCellElement);
    cell4.innerText = obj.temperature.toString();

    let cell5 = row.appendChild(document.createElement("td") as HTMLTableCellElement);
    cell5.innerText = obj.timeOfEntry.toString();

    return row;
}

async function GetAll(): Promise<any>
{
    await axios.get(baseURI,
    {
        
    })
    .then(function(response)
    {
        tableBody.innerHTML = "";
        tableBody.innerText = "";

        response.data.forEach(obj =>
        {
            tableBody.appendChild(HTMLTableDataRow(obj));
        });
    });
}

async function GetOne(): Promise<any>
{
    await axios.get(baseURI + "/" + inputId.value,
    {
        
    })
    .then(function(response)
    {
        tableBody.innerHTML = "";
        tableBody.innerText = "";

        let obj = response.data;
        tableBody.appendChild(HTMLTableDataRow(obj));
    });
}

async function DeleteOne(): Promise<any>
{
    await axios.delete(baseURI,
    {
        params:
        {
            id: Number(inputId.value)
        }
    })
    .then(function(response)
    {
        GetAll();
    });
}