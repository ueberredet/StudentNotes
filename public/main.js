const notesList = document.getElementById('notes-list');
const categoryLinks = document.querySelectorAll('.dropdown-content a');
const notizenTitel = document.getElementById('notizenTitel');

let currentCategory = localStorage.getItem('selectedCategory') || "";

function loadNotes(category = currentCategory) {
  fetch(`/notes?category=${category}`)
    .then(res => res.json())
    .then(notes => {
      if (!notesList) return; 
      
      notesList.innerHTML = '';
      if (notizenTitel) {
        notizenTitel.innerHTML = category ? category.toUpperCase() : 'ALLE NOTIZEN';
      }

      if (notes.length === 0) {
        notesList.innerHTML = '<li>Keine Notizen vorhanden</li>';
        return;
      }
      
      notes.forEach(note => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${note.title}</strong> - hochgeladen von <em>${note.uploader}</em>
          <br><a href="/download/${note.id}" class="file-link">Download (${note.originalName})</a>`;
        notesList.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Error loading notes:', error);
      if (notesList) {
        notesList.innerHTML = '<li>Fehler beim Laden der Notizen</li>';
      }
    });
}


document.addEventListener('DOMContentLoaded', () => {

  if (notesList) {
    loadNotes(currentCategory);
  }


  const homeLink = document.querySelector('a[href="index.html"]');
  if (homeLink) {
    homeLink.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.setItem('selectedCategory', '');
      window.location.href = 'index.html';
    });
  }

  categoryLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const category = e.target.dataset.category;
      currentCategory = category === 'alle' ? '' : category;
      

      localStorage.setItem('selectedCategory', currentCategory);

      if (window.location.pathname.includes('upload.html')) {

        window.location.href = 'index.html';
      } else {
        loadNotes(currentCategory);
      }
    });
  });
});