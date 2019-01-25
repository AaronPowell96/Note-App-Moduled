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
    return newId
}

//Remove note from list

const removeNote = id => {
    const noteIndex = notes.findIndex(note => note.id === id);

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1);
        saveNotes();
    }
};

//sort notes by one of the filters
const sortNotes = (sortBy) => {
    if (sortBy === "byEdited") {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1;
            } else if (a.updatedAt < b.updatedAt) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortBy === "byCreated") {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1;
            } else if (a.createdAt < b.createdAt) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortBy === "byAlphabet") {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else {
                return 0;
            }
        });
    } else {
        return notes;
    }
};

const updateNote = (id, updates) => {
    const note = notes.find((note) => note.id === id)
    if (!note) return;
    if (typeof updates.title === "string") {
        note.title = updates.title
        note.updatedAt = moment().valueOf()
        saveNotes();
    }
    if (typeof updates.body === "string") {
        note.body = updates.body
        note.updatedAt = moment().valueOf()
        saveNotes();
    }
    return note;
}
notes = loadNotes();

export { getNotes, createNote, removeNote, sortNotes, updateNote }