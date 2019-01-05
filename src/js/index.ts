"use strict";
import axios, { AxiosResponse } from 'axios';
import { Dates } from './dates';

interface Meassurement
{
    id: number,
    pressure: number,
    humidity: number,
    temperature: number,
    timeOfEntry: Date
}

let baseURI: string = "https://mmo-restservicetest4.azurewebsites.net/api/meassurements";

let inputId = document.getElementById("InputId") as HTMLInputElement;

let btnGetAll = document.getElementById("GetAll") as HTMLButtonElement;
btnGetAll.addEventListener("click", GetAll);

let btnGetOne = document.getElementById("GetOne") as HTMLButtonElement;
btnGetOne.addEventListener("click", GetOne);

let btnDeleteOne = document.getElementById("DeleteOne") as HTMLButtonElement;
btnDeleteOne.addEventListener("click", DeleteOne);

let tableBody = document.getElementById("tBodyContent") as HTMLTableElement;

function ClearTable(): void
{
    tableBody.innerHTML = "";
    tableBody.innerText = "";
}

function HTMLTableDataRow(obj: Meassurement): HTMLTableRowElement
{
    let row = document.createElement("tr") as HTMLTableRowElement;
    let cell = row.appendChild(document.createElement("td") as HTMLTableCellElement);
    cell.innerText = obj.id.toString();

    let cell2 = row.appendChild(document.createElement("td") as HTMLTableCellElement);
    cell2.innerText = obj.pressure.toString() + " bar";

    let cell3 = row.appendChild(document.createElement("td") as HTMLTableCellElement);
    cell3.innerText = obj.humidity.toString() + "%";

    let cell4 = row.appendChild(document.createElement("td") as HTMLTableCellElement);
    cell4.innerText = obj.temperature.toString() + "°C";

    let cell5 = row.appendChild(document.createElement("td") as HTMLTableCellElement);
    cell5.innerText = Dates.formatDate(obj.timeOfEntry);

    return row;
}

async function GetAll(): Promise<any>
{
    await axios.get(baseURI)
    .then(function(response)
    {
        ClearTable();

        response.data.forEach((obj: Meassurement) =>
        {
            tableBody.appendChild(HTMLTableDataRow(obj));
        });
    })
    .catch(function()
    {
        let row = document.createElement("tr") as HTMLTableRowElement;
        let cell = row.appendChild(document.createElement("td") as HTMLTableCellElement);
        cell.setAttribute("colspan", "5");
        cell.innerText = "No records found.";

        tableBody.appendChild(row);
    });
}

async function GetOne(): Promise<any>
{
    await axios.get(baseURI + "/" + inputId.value)
    .then(function(response)
    {
        ClearTable();
        
        if(inputId.value != "")
        {
            let obj: Meassurement = response.data;
            tableBody.appendChild(HTMLTableDataRow(obj));
        }
        else
        {
            let row = document.createElement("tr") as HTMLTableRowElement;
            let cell = row.appendChild(document.createElement("td") as HTMLTableCellElement);
            cell.setAttribute("colspan", "5");
            cell.innerText = "No record(s) found.";

            tableBody.appendChild(row);
        }
    })
    .catch(function()
    {
        let row = document.createElement("tr") as HTMLTableRowElement;
        let cell = row.appendChild(document.createElement("td") as HTMLTableCellElement);
        cell.setAttribute("colspan", "5");
        cell.innerText = "No record of Id = '" + inputId.value + "' found.";

        tableBody.appendChild(row);
    });
}

async function DeleteOne(): Promise<any>
{
    await axios.delete(baseURI + "/" + inputId.value)
    .then(function(response)
    {
        GetAll();
    });
}