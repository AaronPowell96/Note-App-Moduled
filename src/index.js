import { getNotes, createNote, removeNote } from "./notes.js";
import { getFilters, setFilters } from "./filters"
import { renderNotes } from "./views"

renderNotes();

document.querySelector("#createNote").addEventListener("click", e => {
    const id = createNote()
    location.assign(`/edit.html#${id}`);
});
document.querySelector("#searchNotes").addEventListener("input", e => {
    setFilters({
        searchText: e.target.value
    })
    renderNotes();
});

document.querySelector("#filterBy").addEventListener("change", e => {
    setFilters({
        sortBy: e.target.value
    })
    renderNotes();
});

window.addEventListener("storage", e => {
    if (e.key === "notes") {
        renderNotes();
    }
});
