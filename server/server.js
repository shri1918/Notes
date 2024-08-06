const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../src/data.js');
let data = require(dataPath);

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/notes', (req, res) => {
    res.json(data);
});

app.post('/updateImportance', (req, res) => {
    const { id, newImportance } = req.body;
    data.NotesReact = data.NotesReact.map(note => 
        note.id === id ? { ...note, imp: newImportance } : note
    );

    fs.writeFileSync(dataPath, `module.exports = ${JSON.stringify(data, null, 2)};`, (err) => {
        if (err) {
            console.error('Error writing to data.js file:', err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });

    res.json(data);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
