//Read existing notes from local storage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem("notes");
  return notesJSON !== null ? JSON.parse(notesJSON) : [];
};

//save notes to local storage

const saveNotes = notes => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

//Remove note from list

const removeNotes = id => {
  const noteIndex = notes.findIndex(note => note.id === id);

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
};

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

//sort notes by one of the filters
const sortNotes = (notes, sortBy) => {
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
  }
};

//Render application notes

const renderNotes = (notes, filters) => {
  const notesEl = document.querySelector("#notesDiv");
  notes = sortNotes(notes, filters.sortBy);
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

//Generate last edited message

const generateLastEdited = timestamp =>
  `Last edited: ${moment(timestamp).fromNow()}`;
