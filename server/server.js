const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const dataPath = path.join(__dirname, '../src/data.js');
let data = require(dataPath);

const app = express();
const port = 5000;
const secretKey = 'your_secret_key';

app.use(cors());
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = data.users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

app.get('/notes', (req, res) => {
    res.json(data);
});

app.post('/updateImportance', (req, res) => {
    const { id, newImportance, arrayName } = req.body;
    if (!data[`Notes${arrayName}`]) {
        return res.status(400).json({ message: 'Invalid array name' });
    }
    data[`Notes${arrayName}`] = data[`Notes${arrayName}`].map(note =>
        note.id === id ? { ...note, imp: newImportance } : note
    );
    fs.writeFile(dataPath, `module.exports = ${JSON.stringify(data, null, 2)};`, (err) => {
        if (err) {
            console.error('Error writing to data.js file:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.json({
            NotesReact: data.NotesReact,
            NotesAngular: data.NotesAngular,
            NotesReactNative: data.NotesReactNative
        });
    });
});

app.post('/createQuestion', authenticateToken, (req, res) => {
    const { title, content, example = '', arrayName } = req.body;

    const newQuestion = {
        id: Date.now(), // A unique ID
        title,
        content,
        imp: 'Imp',
        example
    };

    if (data[`Notes${arrayName}`]) {
        data[`Notes${arrayName}`].push(newQuestion);
        
        fs.writeFileSync(dataPath, `module.exports = ${JSON.stringify(data, null, 2)};`, (err) => {
            if (err) {
                console.error('Error writing to data.js file:', err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.json(data);
        });
    } else {
        res.status(400).json({ message: 'Invalid array name' });
    }
});

// New endpoint to update a note
app.post('/updateNote', authenticateToken, (req, res) => {
    const { id, title, content, example, arrayName } = req.body;
    if (!data[`Notes${arrayName}`]) {
        return res.status(400).json({ message: 'Invalid array name' });
    }
    data[`Notes${arrayName}`] = data[`Notes${arrayName}`].map(note =>
        note.id === id ? { ...note, title, content, example } : note
    );
    fs.writeFile(dataPath, `module.exports = ${JSON.stringify(data, null, 2)};`, (err) => {
        if (err) {
            console.error('Error writing to data.js file:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.json({
            NotesReact: data.NotesReact,
            NotesAngular: data.NotesAngular,
            NotesReactNative: data.NotesReactNative
        });
    });
});

// New endpoint to delete a note
app.delete('/deleteNote/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    let noteFound = false;

    Object.keys(data).forEach(arrayName => {
        if (arrayName.startsWith('Notes')) {
            const initialLength = data[arrayName].length;
            data[arrayName] = data[arrayName].filter(note => note.id !== parseInt(id));
            if (data[arrayName].length < initialLength) {
                noteFound = true;
            }
        }
    });

    if (!noteFound) {
        return res.status(404).json({ message: 'Note not found' });
    }

    fs.writeFile(dataPath, `module.exports = ${JSON.stringify(data, null, 2)};`, (err) => {
        if (err) {
            console.error('Error writing to data.js file:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.json({
            NotesReact: data.NotesReact,
            NotesAngular: data.NotesAngular,
            NotesReactNative: data.NotesReactNative
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        console.log('Token is null');
        return res.sendStatus(401);
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.log('Token verification failed:', err);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}
