import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import '../App.css';
import { FaStar } from "react-icons/fa";
import { GoDot } from "react-icons/go";

export default function ReactNativeNotes({ notes, updateNoteImportance }) {
  const handleImportanceClick = (note) => {
    const newImportance = note.imp === 'V-Imp' ? 'Imp' : 'V-Imp';
    updateNoteImportance(note.id, newImportance, 'ReactNative');
  };

  return (
    <div className='p-lg-5'>
      <Accordion defaultActiveKey="0">
        {notes.map(note => (
          <Accordion.Item eventKey={note.id.toString()} key={note.id}>
            <Accordion.Header>
              <div onClick={() => handleImportanceClick(note)} style={{ cursor: 'pointer' }} className='me-3'>
                {note.imp === 'V-Imp' ? <FaStar/> : <GoDot/>}
              </div>
              {note.title}
            </Accordion.Header>
            <Accordion.Body>
              <div className="d-flex justify-content-between">
                {note.content}
              </div>
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
