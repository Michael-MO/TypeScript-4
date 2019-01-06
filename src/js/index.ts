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
inputId.addEventListener("submit", GetOne);

let inputPressure = document.getElementById("PostPressure") as HTMLInputElement;
let inputHumidity = document.getElementById("PostHumidity") as HTMLInputElement;
let inputTemperature = document.getElementById("PostTemperature") as HTMLInputElement;

let btnGetOne = document.getElementById("GetOne") as HTMLButtonElement;
btnGetOne.addEventListener("click", GetOne);

let btnPostOne = document.getElementById("PostOne") as HTMLButtonElement;
btnPostOne.addEventListener("click", PostOne);

let tableBody = document.getElementById("tBodyContent") as HTMLTableElement;

function ClearTable(): void
{
    tableBody.innerHTML = "";
    tableBody.innerText = "";
}

function HTMLTableDataRow(obj?: Meassurement): HTMLTableRowElement
{
    let row = document.createElement("tr") as HTMLTableRowElement;

    if(obj)
    {
        let cell = row.insertCell(-1) as HTMLTableCellElement;
        cell.innerText = obj.id.toString();

        let cell2 = row.insertCell(-1) as HTMLTableCellElement;
        cell2.innerText = obj.pressure.toString() + " bar";

        let cell3 = row.insertCell(-1) as HTMLTableCellElement;
        cell3.innerText = obj.humidity.toString() + "%";

        let cell4 = row.insertCell(-1) as HTMLTableCellElement;
        cell4.innerText = obj.temperature.toString() + "°C";

        let cell5 = row.insertCell(-1) as HTMLTableCellElement;
        cell5.innerText = Dates.formatDate(obj.timeOfEntry);
        
        let deleteBtn = document.createElement("button") as HTMLButtonElement;
        deleteBtn.setAttribute("class", "btn btn-danger");
        deleteBtn.innerText = "Delete This";
        deleteBtn.addEventListener("click", function()
        {
            DeleteOne(obj.id);
        });

        let cell6 = row.insertCell(-1) as HTMLTableCellElement;
        cell6.appendChild(deleteBtn);
    }
    else
    {
        let cell = row.appendChild(document.createElement("td") as HTMLTableCellElement);
        cell.setAttribute("colspan", "6");
        cell.innerText = "No records found.";
    }

    return row;
}

// HTTP Method: GET (Multiple)
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
        tableBody.appendChild(HTMLTableDataRow());
    });
}

// HTTP Method: GET
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
            GetAll();
        }
    })
    .catch(function()
    {        
        tableBody.appendChild(HTMLTableDataRow());
    });
}

// Unfinished: Missing API Method
// HTTP Method: POST
async function PostOne(): Promise<any>
{
    await axios.post(baseURI,
    {
        pressure: inputPressure.value,
        humidity: inputHumidity.value,
        temperature: inputTemperature.value
    })
    .then(function()
    {
        GetAll();
    })
    .catch(function()
    {
        alert("ERROR");
    });
}

// Unfinished: Missing API Method
// HTTP Method: PUT
async function PutOne(): Promise<any>
{
    await axios.put(baseURI + "/" + inputId.value)
    .then(function()
    {

    });
}

// HTTP Method: DELETE
async function DeleteOne(id: number): Promise<void>
{
    await axios.delete(baseURI + "/" + id.toString())
    .then(function(response)
    {
        GetAll();
    });
}

// Get all records on page load
GetAll();