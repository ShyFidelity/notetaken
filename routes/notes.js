const notes = require('express').Router();
const { readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');
const notesData = require('../db/db.json');
const fs = require('fs');

// GET Route for retrieving all the notes
notes.get('/api/notes', (req, res) => {
  const dataBase = fs.readFileSync('./db/db.json');
  const parsedData = JSON.parse(dataBase);
  res.json(parsedData);
});

// POST Route for a new note
notes.post('/api/notes', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };


//   const { username, topic, tip } = req.body;

//   if (req.body) {
//     const newTip = {
//       username,
//       tip,
//       topic,
//       tip_id: uuid(),
//     };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added! You organized person!`);
  } else {
    res.error('Error in adding note');
  }
});


notes.delete('/api/notes/:id',(req, res)  => {
  const dataBase = fs.readFileSync('./db/db.json');
  const parsedData = JSON.parse(dataBase);
  const filteredData = parsedData.filter((note) => note.id !== req.params.id)
  fs.writeFileSync('db/db.json', JSON.stringify(filteredData));
  res.json(filteredData)

})

module.exports = notes;
