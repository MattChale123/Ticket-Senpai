import React from 'react';
import { Button, Col, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { setUser } from '../redux/actions';
import SearchBar from './SearchBar';
import './Navigation.css';
import senpaiLogo from './senpailogopurple.svg';
import senpaiBanner from './realSenpaiBanner.svg';

const Navigation = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const logout = () => {
        fetch('/api/v1/users/logout')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    dispatch(setUser(null))
                    history.push('/')
                }
            })
    }

    const history = useHistory();

    const handleClick = (pageURL) => {
        history.push(pageURL);
    }

    return (
        <>
        <Navbar collapseOnSelect expand="sm" bg="primary" variant="dark" className="navbar">
                        <img onClick={() => handleClick('/')}  className="senpaiLogo" src={senpaiLogo} alt=""></img>
                        <img onClick={() => handleClick('/')}  className="senpaiBanner" src={senpaiBanner} alt=""></img>
                        <div className="mb-3">
                    {user ? (
                        <div>
                            <Button className="neon-button-pink" color='inherit' onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                        <div>
                            <Button className="neon-button-pink" color='inherit' as={Link} to='/login'>Login</Button>
                        </div>
                    )
                }
                        </div>
                </Navbar>
                <SearchBar />
        </>
    )
}

export default Navigation