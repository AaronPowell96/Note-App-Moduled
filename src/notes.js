import uuidv4 from "uuid/v4"
import moment from "moment"

let notes = [];

//Read existing notes from local storage
const loadNotes = () => {
    const notesJSON = localStorage.getItem("notes");
    return notesJSON !== null ? JSON.parse(notesJSON) : [];
};

//save notes to local storage

const saveNotes = () => {
    localStorage.setItem("notes", JSON.stringify(notes));
};

//Expose notes from modules, exported.
const getNotes = () => notes

const createNote = () => {
    const newId = uuidv4();
    const timestamp = moment().valueOf();
    notes.push({
        id: newId,
        title: "",
        body: "",
        createdAt: timestamp,
        updatedAt: timestamp
    });
    saveNotes();
}
notes = loadNotes();

export { getNotes, createNote }