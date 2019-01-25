import { initEditPage, generateLastEdited } from "./views"
import { updateNote, removeNote } from "./notes";

const noteTitle = document.querySelector("#noteTitle");
const noteBody = document.querySelector("#noteBody");
const noteUpdated = document.querySelector("#updatedInfo");
const removeEl = document.querySelector("#removeNote");
const noteId = location.hash.substring(1);

initEditPage(noteId)

noteTitle.addEventListener("input", e => {
    const note = updateNote(noteId, {
        title: e.target.value
    })
    noteUpdated.textContent = generateLastEdited(note.updatedAt);
});

noteBody.addEventListener("input", e => {

    const note = updateNote(noteId, {
        body: e.target.value
    })
    noteUpdated.textContent = generateLastEdited(note.updatedAt);
});

removeEl.addEventListener("click", () => {
    removeNote(noteId);
    location.assign(`/index.html`);
});

document.querySelector("#backButton").addEventListener("click", () => {
    location.assign(`/index.html`);
});

window.addEventListener("storage", e => {
    if (e.key === "notes") {
        initEditPage(noteId)
    }
});
