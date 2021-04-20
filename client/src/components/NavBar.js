import React from 'react';
import { Button, Col, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import './NavBar.css';

export default function NavBar() {
    return (
        <>
        <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#home">Ticket-Senpai</Navbar.Brand>
            <Col> 
                <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Events</Nav.Link>
                <Nav.Link href="#pricing">Favorites</Nav.Link>
                </Nav>
            </Col>
            <Col>
                <Form inline className="search-form">
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-light">Search</Button>
                </Form>
            </Col>
            <Col className="text-right">
                <Button>Logout</Button>
                <Button>Username</Button>
            </Col>
        </Navbar>
        </>
    )
}
