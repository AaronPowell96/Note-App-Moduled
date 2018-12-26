//Read existing notes from local storage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem("notes");
  if (notesJSON !== null) {
    return JSON.parse(notesJSON);
  } else {
    return [];
  }
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
  const noteEl = document.createElement("div");
  const textEl = document.createElement("a");
  const button = document.createElement("button");

  //setup remove note button
  button.textContent = "x";
  noteEl.appendChild(button);
  button.addEventListener("click", function() {
    removeNotes(note.id);
    saveNotes(notes);
    renderNotes(notes, filters);
  });
  //setup note title text
  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = "Untitled Note";
  }
  textEl.setAttribute("href", `/edit.html#${note.id}`);
  noteEl.appendChild(textEl);
  return noteEl;
};

//sort notes by one of the filters
const sortNotes = (notes, sortBy) => {
  if (sortBy === "byEdited") {
    return notes.sort(function(a, b) {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byCreated") {
    return notes.sort(function(a, b) {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byAlphabet") {
    return notes.sort(function(a, b) {
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
  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter(function(note) {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  document.querySelector("#notesDiv").innerHTML = "";
  filteredNotes.forEach(function(note) {
    const noteEl = generateNoteDOM(note);
    document.querySelector("#notesDiv").appendChild(noteEl);
  });
};

//Generate last edited message

const generateLastEdited = timestamp =>
  `Last edited: ${moment(timestamp).fromNow()}`;
