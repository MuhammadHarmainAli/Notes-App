const noteFormElement = document.querySelector('#noteForm');
const titleInputElement = document.querySelector('#titleInput');
const contentInputElement = document.querySelector('#contentInput');

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
})
