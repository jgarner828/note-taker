const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


const db = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');


app.use(express.static('public')); //for static public folder
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded





// GET /notes should return the notes.html file.
app.get('/notes', (req, res) => {

  console.log(`${req.method} request from /notes`); 
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});




// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {

  console.log(`${req.method} request from /api/notes`);
  res.status(200).json(db);
});




// POST /api/notes should receive a new note received as 'req.body = JSON.stringify(object)' to save on the request body, add it to the db.json file, and then return the new note to the client. give each note a unique id when it's saved using UUID ).
app.post('/api/notes', (req, res) => {

  console.log(`${req.method} request from /api/notes`);

  let { title, text } = req.body;

  if (title && text) {

        // read the file
    fs.readFile('../../../db/db.json', 'utf8', (err, data) => {

      if (err) {
          console.log(`Error reading file from disk: ${err}`);
      } else {
          // parse JSON string to JSON object
          const databases = JSON.parse(data);

          // add a new record
          databases.push({
              title,
              text,
              id: uuidv4()
          });

          

          // write new data back to the file
          fs.writeFile('./db/db.json', JSON.stringify(databases, null, 4), (err) => {
              if (err) {
                  console.log(`Error writing file: ${err}`);
              }
          });
      }
    });

  }

  res.send('Successful POST request');

});




// TODO: DELETE /api/notes/:id should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
app.delete('/api/notes:id', function (req, res) {

  console.log(`${req.method} request from /api/notes:id`);

  let url = req.originalUrl;
  let urlSplit = url.split(':');
  let id = urlSplit[1];


  fs.readFile('./db/db.json', 'utf8', (err, data) => {

    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {

        // parse JSON string to JSON object
        const databases = JSON.parse(data);

        let updatedDb = databases.filter( note => {
          return note.id !== id;
        });

        // match and delete id
        res.send('DELETE method');

        // write new data back to the file
        fs.writeFile('./db/db.json', JSON.stringify(updatedDb, null, 4), (err) => {
            if (err) {
                console.log(`Error writing file: ${err}`);
            }
        });
    }
  });

});




// GET * should return the index.html file.
app.get('*', (req, res) =>  {

  console.log(`${req.method} request from *`);
  res.sendFile(path.join(__dirname, '/public/assets/index.html'))
});




// listen to the port
app.listen(PORT, () => console.log(`Serving static asset routes on port ${PORT}!`));

