import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaStar, FaEdit, FaTrashAlt } from "react-icons/fa";
import { GoDot } from "react-icons/go";
import apiConfig from '../apiConfig';

export default function Notes({ notes, updateNoteImportance, noteType }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [editedExample, setEditedExample] = useState('');
  const [IMP, setImp] =useState('');

  const handleImportanceClick = (note) => {
    const newImportance = note.imp === 'V-Imp' ? 'Imp' : 'V-Imp';
    updateNoteImportance(note.id, newImportance, noteType);
    console.log('status', newImportance);
  };

  const token = localStorage.getItem('token');

  const handleEditClick = (note) => {
    setCurrentNote(note);
    setEditedTitle(note.title);
    setEditedContent(note.content);
    setEditedExample(note.example || '');
    setShowEditModal(true);
    setImp(note.imp);
  };

  const handleEditSave = async () => {
    const updatedNote = {
      id: currentNote.id,
      title: editedTitle,
      content: editedContent,
      example: editedExample,
      arrayName: noteType,
    };

    const response = await fetch(`${apiConfig.baseURL}${apiConfig.endpoints.updateNote}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(updatedNote),
    });

    if (response.ok) {
      updateNoteImportance(updatedNote.id, IMP, noteType);
      setShowEditModal(false);
    } else {
      console.error('Failed to update note');
    }
  };

  const handleDeleteConfirm = async () => {
    const response = await fetch(`${apiConfig.baseURL}${apiConfig.endpoints.deleteNote}${currentNote.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.ok) {
      updateNoteImportance(currentNote.id, IMP, noteType);
      setShowDeleteModal(false);
    } else {
      console.error('Failed to delete note');
    }
  };

  const handleDeleteClick = (note) => {
    setCurrentNote(note);
    setShowDeleteModal(true);
  };

  return (
    <div className='p-lg-5'>
      <Accordion defaultActiveKey="0">
        {notes.map(note => (
          <Accordion.Item eventKey={note.id.toString()} key={note.id}>
            <Accordion.Header>
              <div onClick={() => handleImportanceClick(note)} style={{ cursor: 'pointer' }} className='me-3'>
                {note.imp === 'V-Imp' ? <FaStar /> : <GoDot />}
              </div>
              {note.title}
            </Accordion.Header>
            <Accordion.Body>
              <div className="d-flex justify-content-between">
                <div style={{ width: token !== '' ? '80%' : '' }}>{note.content}</div>
                {token && (
                  <div>
                    <FaEdit style={{ cursor: 'pointer' }} onClick={() => handleEditClick(note)} className="me-2" />
                    <FaTrashAlt style={{ cursor: 'pointer' }} onClick={() => handleDeleteClick(note)} />
                  </div>
                )}
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

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNoteTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formNoteContent" className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formNoteExample" className="mb-3">
              <Form.Label>Example</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editedExample}
                onChange={(e) => setEditedExample(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this note?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
