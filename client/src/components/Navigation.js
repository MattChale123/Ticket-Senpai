import React from 'react';
import { Button, Col, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser } from '../redux/actions';
import SearchBar from './SearchBar'
import './Navigation.css';
import senpaiLogo from './senpailogopurple.svg'

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
        <Navbar collapseOnSelect expand="sm" bg="primary" variant="dark">
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <img class="senpaiLogo" src={senpaiLogo} alt=""></img>
                    <Col> 
                        <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#events">Events</Nav.Link>
                        <Nav.Link href="#favorites">Favorites</Nav.Link>
                        </Nav>
                    </Col>
                    </Navbar.Collapse>
                    <Col>
                        <SearchBar />
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