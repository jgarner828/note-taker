const express = require('express');
const fs = require('fs');
const db = require('../../../db/db.json');

const app = express();
const PORT = 3001;
const path = require('path');


app.use(express.static('public'));


app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '../../notes.html')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../../index.html')));


app.get('/api/notes', (req, res) => {}
    // * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
);

app.post('/api/notes', (req, rec) => {
  // * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

})


app.listen(PORT, () =>
  console.log(`Serving static asset routes on port ${PORT}!`)
);
