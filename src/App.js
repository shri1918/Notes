import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Dashboard';
import axios from 'axios';
import ProtectedRoute from './ProtectedRoute';
import apiConfig from './apiConfig';
const Notes = lazy(()=> import('./component/Notes'));
const Login = lazy(()=> import('./Login'));
const Main = lazy(()=> import('./Main'));

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
    axios.post(`${apiConfig.baseURL}${apiConfig.endpoints.updateImportance}`, { id, newImportance, arrayName })
      .then(response => {
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
      <Suspense fallback={<div>Loading...</div>}>
        <Dashboard />
        <Routes>
          <Route path="/" element={<Notes notes={notes} updateNoteImportance={updateNoteImportance} noteType="React" />} />
          <Route path="/angularNotes" element={<Notes notes={notesAngular} updateNoteImportance={updateNoteImportance} noteType="Angular" />} />
          <Route path="/reactNativeNotes" element={<Notes notes={notesReactNative} updateNoteImportance={updateNoteImportance} noteType="ReactNative" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<ProtectedRoute><Main /></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
