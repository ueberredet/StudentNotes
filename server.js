const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
const upload = multer({ dest: 'uploads/' });
const NOTES_FILE = './data/notes.json';
const USERS_FILE = './data/users.json';

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post('/signup',upload.single('userFile'), (req,res) => {
  const {username,password} = req.body;
  const users = JSON.parse(fs.readFileSync(USERS_FILE))
  const newUser = {
    id: Date.now(),
    username,
    password
  };
  users.push(newUser);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  res.redirect('/')
});
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(USERS_FILE));
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    return res.json({ success: true, user });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});
app.post('/upload', upload.single('noteFile'), (req, res) => {
  const { title, uploader, category } = req.body; 
  const file = req.file;
  const notes = JSON.parse(fs.readFileSync(NOTES_FILE));

  const newNote = {
    id: Date.now(),
    title,
    uploader,
    category, 
    filename: file.filename,
    originalName: file.originalname,
  };

  notes.push(newNote);
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
  res.redirect('/');
});

app.get('/notes', (req, res) => {
  const allNotes = JSON.parse(fs.readFileSync(NOTES_FILE));
  const category = req.query.category;
  const notes = (!category || category === 'alle')
    ? allNotes
    : allNotes.filter(n => n.category === category);

  res.json(notes);
});



app.get('/download/:id', (req, res) => {
  const notes = JSON.parse(fs.readFileSync(NOTES_FILE));
  const note = notes.find(n => n.id == req.params.id);

  if (!note) return res.status(404).send('Notiz nicht gefunden.');

  const filePath = path.join(__dirname, 'uploads', note.filename);
  res.download(filePath, note.originalName);
});

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});







//Zeile 67!!!!!!!!!!!!!