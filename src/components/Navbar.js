import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css'

class Example extends Component {

  render() {
    return (
    <Navbar bg="black" variant="light">
    <Navbar.Brand href="/" id= "navbar_logo">
      <img
        alt="Meridio Chain"
        src="/icon.png"
        width="100"
        height="100"
      />{' '}
    </Navbar.Brand>
    <Nav className="ml-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/profile">Profile</Nav.Link>
      <Nav.Link href="https://github.com/subhasishgosw5/Meridio-Chain">Github</Nav.Link>
    </Nav>
  </Navbar>
    );
  }
}

export default Example;
