import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

export default function Main() {
  const token = localStorage.getItem('token');
  const [form, setForm] = useState({
    title: '',
    content: '',
    example: '',
    arrayName: 'React'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Token:', token);
      const response = await axios.post(
        'https://notes-uku4.onrender.com/createQuestion',
        {
          title: form.title,
          content: form.content,
          example: form.example,
          arrayName: form.arrayName
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error('There was an error creating the question!', error);
    }
  };

  return (
    <Container className='p-lg-5'>
      <h1 className='text-center'>Add Question</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='formTitle'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            name='title'
            value={form.title}
            onChange={handleChange}
            placeholder='Enter title'
          />
        </Form.Group>

        <Form.Group controlId='formContent'>
          <Form.Label>Content</Form.Label>
          <Form.Control
            as='textarea'
            name='content'
            value={form.content}
            onChange={handleChange}
            rows={3}
            placeholder='Enter content'
          />
        </Form.Group>

        <Form.Group controlId='formExample'>
          <Form.Label>Example</Form.Label>
          <Form.Control
            type='text'
            name='example'
            value={form.example}
            onChange={handleChange}
            placeholder='Enter example (optional)'
          />
        </Form.Group>

        <Form.Group controlId='formArrayName'>
          <Form.Label>Technology</Form.Label>
          <Form.Control
            as='select'
            name='arrayName'
            value={form.arrayName}
            onChange={handleChange}
          >
            <option value='React'>React</option>
            <option value='Angular'>Angular</option>
            <option value='ReactNative'>React Native</option>
          </Form.Control>
        </Form.Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Container>
  );
}
