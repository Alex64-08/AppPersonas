//URL de la API o EndPoint
const API_URL = "https://retoolapi.dev/xRg4zj/people/";

export async function getPeople() {
    try {
        const response = await fetch(API_URL); //GET por defecto
        if(!response.ok) {
            throw new Error("Error al obtener personas")
        }

        const people = await response.json();
        return people;
    }
    catch (error) {
        console.error("Error al obtener personas: " + error);
        throw error;
    }
}

export async function addPerson(person) {
    try {
        const response = await fetch(API_URL,{
            method: "POST",
            headers: {
                "content-Type":"application/json"
            },
            body: JSON.stringify(person)
        });

        if(!response.ok) {
            throw new Error("Error al agregar el registro:" + response.status + " " + response.statusText);
        }

        //Retornamos newPerson
        const newPerson = await response.json();
        return newPerson;

    } catch (error) {
        console.error("Error al agregar el registro: " + error);
        throw error;
    }
}