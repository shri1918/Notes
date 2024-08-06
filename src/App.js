import React,{useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Dashboard';
import ReactNotes from './component/ReactNotes';
// import data from './data/data'
import axios from 'axios';
// const fs = require('fs');
const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/notes')
      .then(response => setNotes(response.data.NotesReact))
      .catch(error => console.error(error));
  }, []);

  const updateNoteImportance = (id, newImportance) => {
    axios.post('http://localhost:5000/updateImportance', { id, newImportance })
      .then(response => setNotes(response.data.NotesReact))
      .catch(error => console.error(error));
  };
  return (
    <Router>
      <div>
        <Dashboard />
        <Routes>
          <Route path="/reactNotes" element={<ReactNotes notes={notes} updateNoteImportance={updateNoteImportance}/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
