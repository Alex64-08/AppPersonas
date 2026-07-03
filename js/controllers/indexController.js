import { getPeople,addPerson, deletePerson } from "../services/peopleService.js";

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
                    <td>
                        <button class="btn btn-danger" onclick="removePerson(${person.id})">Eliminar</button>
                        <button class="btn btn-warning">Editar</button>
                    <td>
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

frmAddPerson.addEventListener("submit", async function(event) {
    
    event.preventDefault();

    const name = txtName.value.trim();
    const email = txtEmail.value.trim();
    const phone = txtPhone.value.trim();

    if(name == "" || email == "" || phone == "") {
        alert("Todos los campos son obligatorios.")
        return;
    }

    const person = {
        name: name,
        email: email,
        phone: phone
    }

    try {
        await addPerson(person);
        alert("Persona guardada correctamente.");

        resetForm();

        await loadPeople();

    } catch (error) {
        alert("No se pudo guardar la persona: " + error);
    }
});

function resetForm() {
    frmAddPerson.reset();
}

async function removePerson(id) {
    const confirmDelete = confirm('¿Deseas eliminar esta persona?');

    if(!confirmDelete) {
        return;
    }

    try {
        await deletePerson(id);
        alert("Persona eliminada correctamente.");
        resetForm();
        await loadPeople();
    } catch (error) {
        alert("No se pudo eliminar este registro.");
    }
}

window.removePerson = removePerson;
