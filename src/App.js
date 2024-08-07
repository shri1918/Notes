import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Dashboard';
import ReactNotes from './component/ReactNotes';
import axios from 'axios';
import AngularNotes from './component/AngularNotes';
import ReactNativeNotes from './component/ReactNativeNotes';
import Login from './Login';
import Main from './Main';
import ProtectedRoute from './ProtectedRoute';
import apiConfig from '../server/apiConfig';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [notesAngular, setNotesAngular] = useState([]);
  const [notesReactNative, setNotesReactNative] = useState([]);

  useEffect(() => {
    axios.get(`${apiConfig.baseURL}${apiConfig.endpoints.notes}`)
      .then(response => {
        setNotes(response.data.NotesReact);
        setNotesAngular(response.data.NotesAngular);
        setNotesReactNative(response.data.NotesReactNative);
      })
      .catch(error => console.error(error));
  }, []);

  const updateNoteImportance = (id, newImportance, arrayName) => {
    console.log('Start UpdateNotes');
    
    axios.post(`${apiConfig.baseURL}${apiConfig.endpoints.updateImportance}`, { id, newImportance, arrayName })
      .then(response => {
        console.log('Update Importance Response:', response);
        if (arrayName === 'React') {
          setNotes(response.data.NotesReact);
        } else if (arrayName === 'Angular') {
          setNotesAngular(response.data.NotesAngular);
        } else if (arrayName === 'ReactNative') {
          setNotesReactNative(response.data.NotesReactNative);
        }
      })
      .catch(error => {
        console.error('Error updating importance or fetching notes:', error);
      });
  };
  

  return (
    <Router>
      <div>
        <Dashboard />
        <Routes>
          <Route path="/" element={<ReactNotes notes={notes} updateNoteImportance={updateNoteImportance} />} />
          <Route path="/angularNotes" element={<AngularNotes notes={notesAngular} updateNoteImportance={updateNoteImportance} />} />
          <Route path="/reactNativeNotes" element={<ReactNativeNotes notes={notesReactNative} updateNoteImportance={updateNoteImportance} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<ProtectedRoute><Main /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
