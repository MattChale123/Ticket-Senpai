import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useDispatch } from "react-redux";
import { setStubHub } from "../redux/actions";
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import background from '../components/senpailogopurple.svg';
import { Link } from 'react-router-dom';

export default function StubHubLogin() {
    const [form, setForm] = useState({
        username: '',
        password: '',
      });
      const history = useHistory();
      const dispatch = useDispatch();
      const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/v1/stubhub/accesstoken', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify({
            username: form.username,
            password: form.password,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.error) {
              alert(data.error);
            } else {
              dispatch(setStubHub(data));
              history.push('/');
            }
          });
      };
      const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };
      const styling = {
        backgroundColor: 'rgba(255, 255, 255, .15)',
        backdropFilter: 'blur(5px)',
        color: 'black',
        flexDirection: 'column',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'left',
        opacity: '.85',
        border: '2px solid black',
        width: '35%',
        padding: '10px',
        minWidth: '325px'
    }

    return (
        <div style={{ 
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'noRepeat',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: '90% 100%',
          height: '1100px'
         }}><br />
          <div style={styling}>
            <h1 style={{textAlign: 'center', color: 'black'}}>StubHub Login</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label style={{color: 'black'}}>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" onChange={handleChange} value={form.username} name='username' />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label style={{color: 'black'}}>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={handleChange} value={form.password} name='password' />
              </Form.Group>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="mb-3">
                <Button variant="primary" className="neon-button-pink" type="submit">Login</Button>
              </div>
              <p style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black'}}>Already logged into StubHub, click <Link to={'/login'} style={{color: 'white'}}>here</Link></p>
              <p style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black'}}>Don't want to log into StubHub, click <Link to={'/'} style={{color: 'white'}}>here</Link></p>
            </Form>
          </div>
        </div>
    )
}
