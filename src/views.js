import moment from "moment"
import { getFilters } from "./filters"
import { sortNotes, getNotes } from "./notes"
//Generate notes DOM structure

const generateNoteDOM = note => {
    const noteEl = document.createElement("a");
    const textEl = document.createElement("p");
    const statusEl = document.createElement("p");

    //setup note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title;
    } else {
        textEl.textContent = "Untitled Note";
    }
    textEl.classList.add("list-item__title");
    noteEl.appendChild(textEl);

    //Setup the link

    noteEl.setAttribute("href", `/edit.html#${note.id}`);
    noteEl.classList.add("list-item");

    //setup status message

    statusEl.textContent = generateLastEdited(note.updatedAt);
    statusEl.classList.add("list-item__subtitle");
    noteEl.appendChild(statusEl);
    return noteEl;
};

//Render application notes

const renderNotes = () => {

    const notesEl = document.querySelector("#notesDiv");
    const filters = getFilters()
    const notes = sortNotes(getFilters().sortBy);
    console.log(getFilters().sortBy)
    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    );

    notesEl.innerHTML = "";

    if (filteredNotes.length > 0) {
        filteredNotes.forEach(note => {
            const noteEl = generateNoteDOM(note);
            notesEl.appendChild(noteEl);
        });
    } else {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "No notes to show";
        emptyMessage.classList.add("empty-message");
        notesEl.appendChild(emptyMessage);
    }
};

const initEditPage = (noteId) => {

    const noteTitle = document.querySelector("#noteTitle");
    const noteBody = document.querySelector("#noteBody");
    const noteUpdated = document.querySelector("#updatedInfo");
    const notes = getNotes();
    const note = notes.find(note => note.id === noteId);

    if (note === undefined) {
        location.assign("/index.html");
    }

    noteTitle.value = note.title;
    noteBody.value = note.body;
    noteUpdated.textContent = generateLastEdited(note.updatedAt);


}
const generateLastEdited = timestamp =>
    `Last edited: ${moment(timestamp).fromNow()}`;

export { initEditPage, generateNoteDOM, renderNotes, generateLastEdited }