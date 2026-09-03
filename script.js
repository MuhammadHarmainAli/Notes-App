const noteFormElement = document.querySelector("#noteForm");
const titleInputElement = document.querySelector("#titleInput");
const contentInputElement = document.querySelector("#contentInput");
const emptyStateElement = document.querySelector("#emptyState");
const notesContainerElement = document.querySelector("#notesContainer");

let notes = JSON.parse(localStorage.getItem("note")) || [];

const getInputValue = () => {
  return {
    title: titleInputElement.value,
    content: contentInputElement.value,
  };
};

const createNote = (title, content) => {
  const now = new Date();

  return {
    id: Date.now(),
    title: title,
    content: content,
    date: now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    time: now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

const addNote = (note) => {
  notes.push(note);
};

const resetForm = () => {
  titleInputElement.value = "";
  contentInputElement.value = "";
};

const updateEmptyState = () => {
  if (notes.length === 0) {
    emptyStateElement.classList.remove("hide");
  } else {
    emptyStateElement.classList.add("hide");
  }
};

const renderNotes = () => {
  notesContainerElement.innerHTML = "";

  notes.forEach((note) => {
    const { id, title, content, date, time } = note;

    notesContainerElement.innerHTML += `
      <article class="note-card">
        <div class="note-card-header">
          <h3 class="note-title">
            ${title}
          </h3>
          <button class="delete-btn" data-id="${id}">
            🗑
          </button>
        </div>
        <p class="note-content">
          ${content}
          <a href="#">read more</a>
        </p>
        <div class="note-footer">
          <span class="note-date">
            ${date}
          </span>
          <span class="note-time">
            ${time}
          </span>
        </div>
      </article>
    `;
  });

  updateEmptyState();
};

const saveNote = () => {
  localStorage.setItem("note", JSON.stringify(notes));
};

const deleteNotes = (id) => {};

const handleSubmit = (e) => {
  e.preventDefault();

  const { title, content } = getInputValue();

  const note = createNote(title, content);

  addNote(note);

  resetForm();

  saveNote();

  renderNotes();
};

renderNotes();

noteFormElement.addEventListener("submit", handleSubmit);

const deleteButton = document.querySelectorAll(".delete-btn");

deleteButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    const checkedId = Number(btn.dataset.id);
    
    
  });
});
