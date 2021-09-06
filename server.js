const express = require('express');
const path = require('path');
//change
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js.js');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

//test test test 
// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/feedback', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/feedback.html'))
);

app.get('*', (req, res) =>
res.sendFile(path.join(__dirname, '/public/pages/404.html')));

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);



