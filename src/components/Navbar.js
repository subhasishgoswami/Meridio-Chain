import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css'
import Identicon from 'identicon.js';

class Example extends Component {

  render() {
    return (
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/" id= "navbar_logo">
      <img
        alt="Meridio Chain"
        src="/icon.png"
        width="80"
        height="80"
      />{' '}
    </Navbar.Brand>
    <Nav className="ml-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/profile">Profile</Nav.Link>
      <Nav.Link href="/github">Github</Nav.Link>
    </Nav>
  </Navbar>
    );
  }
}

export default Example;
