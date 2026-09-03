const noteFormElement = document.querySelector('#noteForm');
const titleInputElement = document.querySelector('#titleInput');
const contentInputElement = document.querySelector('#contentInput');
const emptyStateElement = document.querySelector('#emptyState');
const notesContainerElement = document.querySelector('#notesContainer');

const notes = [];

noteFormElement.addEventListener('submit', (e) => {
  e.preventDefault();

  const titleValue = titleInputElement.value;
  const contentValue = contentInputElement.value;

  const now = new Date();

  const note = {
    id: Date.now(),
    title: titleValue,
    content: contentValue,
    date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    time: now.toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit' })
  }
  
  notes.push(note);

  emptyStateElement.classList.add('hide');

  notesContainerElement.innerHTML = '';

  notes.forEach((note) => {
    const {id, title, content, date, time} = notes;
    
    noteFormElement.innerHTML = `
    <article class="note-card">
          <div class="note-card-header">
            <h3 class="note-title">
              JavaScript Learning
            </h3>
            <button class="delete-btn" data-id="123">
              🗑
            </button>
          </div>
          <p class="note-content">
            Today I learned about state, render and localStorage.
            <a href="#">read more</a>
          </p>
          <div class="note-footer">
            <span class="note-date">
              Sep 1, 2026
            </span>
            <span class="note-time">
              7:30 PM
            </span>
          </div>
        </article>
  `
  })
})

