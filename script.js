const noteFormElement = document.querySelector("#noteForm");
const titleInputElement = document.querySelector("#titleInput");
const contentInputElement = document.querySelector("#contentInput");
const emptyStateElement = document.querySelector("#emptyState");
const notesContainerElement = document.querySelector("#notesContainer");
const notesCountElement = document.querySelector("#notesCount");

const titleErrorElement = document.querySelector("#titleError");
const contentErrorElement = document.querySelector("#contentError");

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

const notesCount = () => {
  notesCountElement.textContent = notes.length;
};

const validateNote = (title, content) => {
  if (title.trim() === "") {
    return {
      field: "title",
      message: "Title is required",
    };
  }

  if (content.trim() === "") {
    return {
      field: "content",
      message: "Content is required",
    };
  }

  return null;
};

const clearErrors = () => {
  if (titleInputElement.trim().value.length > 0) {
    titleErrorElement.textContent = "";
  }
  if (contentInputElement.trim().value.length > 0) {
    contentErrorElement.textContent = "";
  }
};

const showError = (error) => {
  if (error) {
    if (error.field === "title") {
      titleErrorElement.textContent = error.message;
    }
    if (error.field === "content") {
      contentErrorElement.textContent = error.message;
    }
    return;
  }
};

const handleSubmit = (e) => {
  e.preventDefault();

  const { title, content } = getInputValue();

  const error = validateNote(title, content);

  showError(error);

  const note = createNote(title, content);

  addNote(note);

  resetForm();

  saveNote();

  renderNotes();

  notesCount();
};

renderNotes();

noteFormElement.addEventListener("submit", handleSubmit);

titleInputElement.addEventListener("input", clearErrors);
contentInputElement.addEventListener("input", clearErrors);

notesContainerElement.addEventListener("click", (e) => {
  if (!e.target.classList.contains("delete-btn")) return;

  const clickedId = Number(e.target.dataset.id);

  notes = notes.filter((note) => note.id !== clickedId);

  notesCountElement.textContent = notes.length;

  saveNote();
  renderNotes();
});
