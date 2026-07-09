import { getPeople,addPerson, deletePerson, getPerson , updatePerson } from "../services/peopleService.js";

const tbPeople = document.getElementById("tbPeople");
const txtName = document.getElementById("txtName");
const txtEmail = document.getElementById("txtEmail");
const txtPhone = document.getElementById("txtPhone");
const btnAddPerson = document.getElementById("btnAddPerson");
const frmAddPerson = document.getElementById("frmAddPerson");
const idPerson = document.getElementById("idPerson");
const btnCancel = document.getElementById("btnCancel");

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
                        <button class="btn btn-warning" onclick="loadPersonData(${person.id})">Editar</button>
                    </td>
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

    const id = idPerson.value.trim();
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
        if(id != "") {
            await updatePerson(id,person);
            alert("Se ha actualizado a la persona correctamente.");
        }
        else{
            await addPerson(person);
            alert("Persona guardada correctamente.");
        }

        resetForm();

        await loadPeople();

    } catch (error) {
        alert("No se pudo guardar la persona: " + error);
    }
});

function resetForm() {
    frmAddPerson.reset();
    idPerson.value = "";
    btnAddPerson.textContent = "Guardar";
    btnCancel.classList.add("d-none");
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

async function loadPersonData(id) {
    try {
        const person = await getPerson(id);

        idPerson.value = person.id;
        txtName.value = person.name;
        txtEmail.value = person.email;
        txtPhone.value = person.phone;

        btnAddPerson.textContent = "Actualizar"
        btnCancel.classList.remove("d-none");

        frmAddPerson.scrollIntoView({behavior: 'smooth', block: 'start'})
    } catch (error) {
        alert("No se pudo cargar los datos de la persona: " + error);
        console.error(error);
    }
}
btnCancel.addEventListener("click",resetForm );

window.removePerson = removePerson;
window.loadPersonData = loadPersonData;
