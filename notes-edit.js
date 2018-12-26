const noteId = location.hash.substring(1);
console.log(noteId);

let notes = getSavedNotes();

let note = notes.find(note => note.id === noteId);

if (note === undefined) {
  location.assign("/index.html");
}

const noteTitle = document.querySelector("#noteTitle");
const noteBody = document.querySelector("#noteBody");
const noteUpdated = document.querySelector("#updatedInfo");
noteTitle.value = note.title;
noteBody.value = note.body;
console.log(moment(note.updatedAt).fromNow());
noteUpdated.textContent = generateLastEdited(note.updatedAt);

noteTitle.addEventListener("input", function(e) {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  noteUpdated.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});

noteBody.addEventListener("input", function(e) {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  noteUpdated.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});

document.querySelector("#removeNote").addEventListener("click", function() {
  removeNotes(noteId);
  saveNotes(notes);
  location.assign(`/index.html`);
  renderNotes(notes, filters);
});

document.querySelector("#backButton").addEventListener("click", function() {
  location.assign(`/index.html`);
});

window.addEventListener("storage", function(e) {
  if (e.key === "notes") {
    notes = JSON.parse(e.newValue);
  }
  note = notes.find(function(note) {
    return note.id === noteId;
  });

  if (note === undefined) {
    location.assign("/index.html");
  }
  noteTitle.value = note.title;
  noteBody.value = note.body;
  noteUpdated.textContent = generateLastEdited(note.updatedAt);
});
