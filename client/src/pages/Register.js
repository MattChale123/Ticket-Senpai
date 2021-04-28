import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Button, Col, Form, FormControl, InputGroup } from 'react-bootstrap'
import background from '../img/register-page.jpeg'

export default function Register() {
    const [ error, setError ] = useState('')
    const [form, setForm ] = useState({
        username: '',
        password: '',
        email: ''
    })
    const history = useHistory()
    
    const handleSubmit = e => {
        e.preventDefault()
        fetch('/api/v1/users/register', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                username: form.username,
                password: form.password,
                email: form.email
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                history.push('/login')
            }
        })
    }
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const errorStyling = {
        color: "red",
        fontWeight: "bold"
      }
    const styling = {
        backgroundColor: 'rgba(255, 255, 255, .15)',
        backdropFilter: 'blur(5px)',
        color: 'white',
        flexDirection: 'column',
        display: 'inline-block',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'left',
        opacity: '.85',
        border: '2px solid black',
        width: '35%'
    }
      
    return (
        <div style={{ 
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'noRepeat',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: '100% auto',
            height: '1100px'
           }}>
            <h2>Register</h2>
            <div style={styling}>
            <Form onSubmit={handleSubmit}  style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '10px', marginBottom: '10px' }}>
                    <Form.Group>
                        <Form.Row className="align-items-center">
                            <Col xs="auto">
                                <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                                    Username
                                </Form.Label>
                                <InputGroup className="mb-2">
                                    <InputGroup.Prepend>
                                    <InputGroup.Text>@</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl id="inlineFormInputGroup" placeholder="Username" onChange={handleChange} value={form.username} name='username' />
                                </InputGroup>
                                </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={handleChange} value={form.email} name='email' /><br />
                        <Form.Text className="text-muted" style={{textAlign: 'left', color: 'white'}}>
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={handleChange} value={form.password} name='password' />
                    </Form.Group><br />
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                    {(error === 'Username already in use. Pick another') && <p style={errorStyling}>{error}</p>}
                </Form>
            </div>
        </div>
    )
}
