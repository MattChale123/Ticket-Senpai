import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions";
import { Form} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import background from '../components/senpailogopurple.svg'
import { Link } from 'react-router-dom';
import '.././App.css';

export default function Login() {
    const [ error, setError ] = useState('')
    const [form, setForm] = useState({
        username: '',
        password: '',
      });
      const history = useHistory();
      const dispatch = useDispatch();
      const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/v1/users/login', {
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
              setError(data.error)
            } else {
              dispatch(setUser(data));
              history.push('/login/stubhub');
            }
          });
      };
      const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
      };
      const errorStyling = {
        color: "red",
        fontWeight: "bold"
      }
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

              <Form onSubmit={handleSubmit}>
                <h1 style={{textAlign: 'center', color: 'black'}} className="login-font">Login</h1>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="login-font" style={{color: 'black'}}>Enter username</Form.Label>

                  <Form.Control type="text" placeholder="Enter username" onChange={handleChange} value={form.username} name='username' />
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label className="login-font" style={{color: 'black'}}>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handleChange} value={form.password} name='password' />
                  </Form.Group>
                {(error === 'password is incorrect' || 'No username with that username. Please register an account.') && <p style={errorStyling}>{error}</p>}
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Button className="neon-button-pink" variant="primary" type="submit">Submit</Button>
              </div>
              <br />
              <p style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="login-font">If you haven't registered, click <Link to={'/register'} style={{color: 'white'}}>&nbsp; here</Link>.</p>
              <p style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black'}}>If you need to login to StubHub, click <Link to={'/login/stubhub'} style={{color: 'white'}}>&nbsp; here</Link>.</p>
              {(error === 'password is incorrect' || 'No username with that username. Please register an account.') && <p style={errorStyling}>{error}</p>}
              </Form>
            </div>
      </div>
    )
  }
