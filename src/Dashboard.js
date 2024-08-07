import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link,useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const DashboardNavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
//   console.log('token chack',token)
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="#">Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">React Notes</Nav.Link>
          <Nav.Link as={Link} to="/angularNotes">Angular Notes</Nav.Link>
          <Nav.Link as={Link} to="/reactNativeNotes">React-Native Notes</Nav.Link>
          {token  ? <Nav.Link as={Link} to="/main">Add Qustions</Nav.Link>: ''}
          {token === null ?
            <button type="button" className="btn btn-primary ms-md-5" onClick={() => navigate('/login')}>
            Login
          </button>
            :
            <button type="button" className="btn btn-danger ms-md-5" onClick={handleLogout}>
            LogOut
          </button>
        }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default DashboardNavBar;
