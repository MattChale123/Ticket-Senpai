import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions";
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

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
      const errorStyling = {
        color: "red",
        fontWeight: "bold"
      }
    return (
        <div>
            <h1>Login</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" onChange={handleChange} value={form.username} name='username' />
                  <Form.Text className="text-muted">
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handleChange} value={form.password} name='password' />
                  </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
              </Form>
                {(error === 'password is incorrect' || 'No username with that username. Please register an account.') && <p style={errorStyling}>{error}</p>}
        </div>
    )
}