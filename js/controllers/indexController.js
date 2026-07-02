import { getPeople,addPerson } from "../services/peopleService.js";

const tdPeople = document.getElementById("tdPeople");
const txtName = document.getElementById("txtName");
const txtEmail = document.getElementById("txtEmail");
const txtPhone = document.getElementById("txtPhone");
const btnAddPerson = document.getElementById("btnAddPerson");
const frmAddPerson = document.getElementById("frmAddPerson");

async function loadPeople() {

    try {
        const people = await getPeople();

        tbPeople.innerHTML = "";
        people.forEach((person) => {

            tbPeople.innerHTML += `
                <tr>
                    <td>${person.id}</td>
                    <td>${person.name}</td>
                    <td>${person.email}</td>
                    <td>${person.phone}</td>
                </tr>
            `;
        });
    } catch (error) {
        alert.error(error);
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", async function(){
    await loadPeople();
})



