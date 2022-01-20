const express = require('express');
const fs = require('fs');
const db = require('../../../db/db.json');

const app = express();
const PORT = 3001;
const path = require('path');
const { response } = require('express');


app.use(express.static('public'));


// GET /notes should return the notes.html file.
app.get('/notes', (req, res) => { 
  res.sendFile(path.join(__dirname, '../notes.html'))
});


// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
  console.log(req)
  res.status(200).json(db);
});


// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
app.post('/api/notes', (req, rec) => {

});



// DELETE /api/notes/:id should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
app.delete('/api/notes:id', function (req, res) {
  res.send('DELETE request to homepage')
});


// GET * should return the index.html file.
app.get('*', (req, res) =>  { 
  res.sendFile(path.join(__dirname, '../index.html'))
});


// listen to the port
app.listen(PORT, () => console.log(`Serving static asset routes on port ${PORT}!`));
