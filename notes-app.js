let notes = getSavedNotes();

const filters = {
  searchText: "",
  sortBy: "byEdited"
};

renderNotes(notes, filters);

document.querySelector("#createNote").addEventListener("click", function(e) {
  const newId = uuidv4();
  const timestamp = moment().valueOf();
  notes.push({
    id: newId,
    title: "",
    body: "",
    createdAt: timestamp,
    updatedAt: timestamp
  });
  saveNotes(notes);
  location.assign(`/edit.html#${newId}`);
});
document.querySelector("#searchNotes").addEventListener("input", function(e) {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

document.querySelector("#filterBy").addEventListener("change", function(e) {
  filters.sortBy = e.target.value;
  renderNotes(notes, filters);
});

window.addEventListener("storage", function(e) {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
    renderNotes(notes, filters);
  }
});
const now = moment();

console.log(now.fromNow());
