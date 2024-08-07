import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import '../App.css';
import { FaStar, FaEdit, FaTrashAlt } from "react-icons/fa";
import { GoDot } from "react-icons/go";

export default function ReactNotes({ notes, updateNoteImportance, editNote, deleteNote }) {
  const handleImportanceClick = (note) => {
    const newImportance = note.imp === 'V-Imp' ? 'Imp' : 'V-Imp';
    updateNoteImportance(note.id, newImportance, 'React');
    console.log('status', newImportance);
  };

  const token = localStorage.getItem('token');

  return (
    <div className='p-lg-5'>
      <Accordion defaultActiveKey="0">
        {notes.map(note => (
          <Accordion.Item eventKey={note.id.toString()} key={note.id}>
            <Accordion.Header>
              <div onClick={() => handleImportanceClick(note)} style={{ cursor: 'pointer' }} className='me-3'>
                {note.imp === 'V-Imp' ? <FaStar/> : <GoDot/>}
              </div>
              <div className="d-flex justify-content-between w-100 pe-5">
              <div>{note.title}</div>
               {token && (
                 <div>
                   <FaEdit style={{ cursor: 'pointer' }} onClick={() => editNote(note.id)} className="me-2" />
                   <FaTrashAlt style={{ cursor: 'pointer' }} onClick={() => deleteNote(note.id)} />
                 </div>
               )}
             </div>
            </Accordion.Header>
            <Accordion.Body>
            <div>{note.content}</div>
             
              {note.example && (
                <div className='mt-3'>
                  <h5>Example:</h5>
                  <pre>{note.example}</pre>
                </div>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}
