import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { auth } from '../services/firebase';

function Header() {
  return (
    <header>
      <Navbar bg="secondary" expand="lg">
        <LinkContainer to='/'>
  <Navbar.Brand>Anonymous Chat</Navbar.Brand>
  </LinkContainer>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
      {auth().currentUser ? (
    <Nav className="mr-auto">
        <LinkContainer to='/chat'>
        <Nav.Link>Chat</Nav.Link>
        </LinkContainer>
        <Nav.Link onClick={() => auth().signOut()}>Logout</Nav.Link>
      </Nav>
      ) :  (
    <Nav className="mr-auto">
        <LinkContainer to='/login'>
          <Nav.Link>Sign In</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/signup'>
        <Nav.Link>Sign Up</Nav.Link>
      </LinkContainer>
      </Nav>
      )}
  </Navbar.Collapse>
</Navbar>
    </header>
  );
}

export default Header;