
const notesList = document.getElementById('notes-list');
const categoryLinks = document.querySelectorAll('.dropdown-content a');

function loadNotes(category = 'alle') {
  fetch(`/notes?category=${category}`)
    .then(res => res.json())
    .then(notes => {
      notesList.innerHTML = '';

      if (notes.length === 0) {
        notesList.innerHTML = '<li>Keine Notizen vorhanden</li>';
        return;
      }

      notes.forEach(note => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${note.title}</strong> - hochgeladen von <em>${note.uploader}</em>
          <br><a href="/download/${note.id}">Download</a>`;
        notesList.appendChild(li); //listenelement hinzufügen zur notizenliste
      });
    })
 
}

// eventlistener für kategorien
categoryLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const category = e.target.dataset.category;
    loadNotes(category);
  });
});

loadNotes();

