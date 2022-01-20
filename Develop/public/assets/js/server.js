const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


const db = require('../../../db/db.json');

const app = express();
const PORT = 3001;
const path = require('path');

// TODO: Not sure what the response i used for? I believe this is calling express.response but not sure why it's being used.
// TODO: What is up with liveserver and backend servers using different PORTS? how does that work?
const { response } = require('express');


app.use(express.static('public')); //for static public folder
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


// TODO: why does req.ip return only ::1 ?




// GET /notes should return the notes.html file.
app.get('/notes', (req, res) => {
  console.log(`${req.method} request from ${req.ip}`); 
  res.sendFile(path.join(__dirname, '../notes.html'))
});




// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
  console.log(`${req.method} request from ${req.ip}`);
  res.status(200).json(db);
});




// TODO: POST /api/notes should receive a new note recieved as 'req.body = JSON.stringify(object)' to save on the request body, add it to the db.json file, and then return the new note to the client. give each note a unique id when it's saved using UUID ).
app.post('/api/notes', (req, res) => {
  console.log(`${req.method} request from ${req.ip}`);

  let { title, text } = req.body;
  let uuid = uuidv4();

  if (title && text) {
    const newNote = {
      title,
      text,
      uuid
    }
  }


});




// TODO: DELETE /api/notes/:id should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
app.delete('/api/notes:id', function (req, res) {
  console.log(`${req.method} request from ${req.ip}`);

  res.send('DELETE request to /api/notes/:id')
});




// GET * should return the index.html file.
app.get('*', (req, res) =>  { 
  console.log(`${req.method} request from ${req.ip}`);

  res.sendFile(path.join(__dirname, '../index.html'))
});




// listen to the port
app.listen(PORT, () => console.log(`Serving static asset routes on port ${PORT}!`));
