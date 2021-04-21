import React from 'react';
import { Button, Col, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser } from '../redux/actions';
import './Navigation.css';

const Navigation = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const logout = () => {
        fetch('/api/v1/users/logout')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    dispatch(setUser(null))
                }
            })
    }

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
            {user ? (
                <Col className="text-right">
                    <Button color='inherit' onClick={logout}>Logout</Button>
                </Col>
            ) : (
                <div>
                    <Button color='inherit' as={Link} to='/login'>Login</Button>
                </div>
            )
            
            }
        </Navbar>
        </>
    )
}

export default Navigation